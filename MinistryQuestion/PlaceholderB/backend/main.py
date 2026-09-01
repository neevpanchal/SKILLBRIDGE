from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List

from models import (
    Course,
    CourseStatusUpdateRequest,
    SkillGap,
    SkillSimulationRequest,
    SkillSimulationResponse,
    Employer,
    NewEmployerRequest,
    DistrictTraining,
    DashboardStats,
    CurriculumAuditRequest,
    CurriculumAuditResponse,
)
import storage

app = FastAPI(
    title="SkillBridge Intelligence Engine API",
    description="Backend API powering Labour-Market Intelligence and Curriculum Alignment",
    version="1.0.0"
)

# Enable CORS for Next.js development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    storage.init_db()


@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "SkillBridge Intelligence Platform",
        "database": "SQLite (WAL mode)",
        "version": "1.0.0"
    }


# =========================================================================
# Dashboard Routes
# =========================================================================

@app.get("/api/dashboard")
def get_dashboard():
    """Retrieve full dashboard overview statistics and metrics."""
    return storage.get_dashboard_summary()


# =========================================================================
# Course Routes
# =========================================================================

@app.get("/api/courses")
def get_courses(
    search: Optional[str] = Query(None, description="Search course name or skills"),
    status: Optional[str] = Query(None, description="Filter by status: Aligned, Update Needed, Oversupplied")
):
    """List all tracked courses with optional search and status filter."""
    courses = storage.get_all_courses(search=search, status=status)
    return {"courses": courses, "total": len(courses)}


@app.get("/api/courses/{course_id}")
def get_course_detail(course_id: int):
    """Retrieve deep details of a specific course by ID."""
    course = storage.get_course_by_id(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@app.post("/api/courses/{course_id}/update-status")
def update_course_status(course_id: int, payload: CourseStatusUpdateRequest):
    """Update alignment status and added skills after curriculum revision."""
    updated = storage.update_course_curriculum(
        course_id=course_id,
        new_status=payload.status,
        added_skills=payload.added_skills,
        new_alignment=payload.alignment
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"success": True, "course": updated}


# =========================================================================
# Skill Gap Routes & What-If Simulation
# =========================================================================

@app.get("/api/skill-gaps")
def get_skill_gaps():
    """Retrieve all identified skill gaps with demand vs supply statistics."""
    gaps = storage.get_all_skill_gaps()
    return {"skill_gaps": gaps, "total": len(gaps)}


@app.post("/api/skill-gaps/simulate", response_model=SkillSimulationResponse)
def simulate_skill_capacity(payload: SkillSimulationRequest):
    """Simulate the impact of expanding cohort seats and upgrading syllabus."""
    gaps = storage.get_all_skill_gaps()
    target_gap = next((g for g in gaps if g["id"] == payload.skill_id), None)
    if not target_gap:
        raise HTTPException(status_code=404, detail="Skill gap ID not found")

    original_gap = target_gap["gap"]
    demand = target_gap["demand"]
    supply = target_gap["supply"]

    # Calculate projected supply boost
    # Each 50 seats added increases supply metric by ~6-8 points
    supply_boost = min(45, round((payload.added_capacity_seats / 50.0) * 7.5))
    if payload.curriculum_upgrade:
        supply_boost += 6  # Higher curriculum relevance boosts effective supply absorption

    new_supply = min(demand, supply + supply_boost)
    projected_gap = max(2, demand - new_supply)
    gap_reduction = round(((original_gap - projected_gap) / original_gap) * 100, 1)

    new_severity = "Low" if projected_gap < 20 else ("Medium" if projected_gap < 38 else "High")
    projected_placements = int(payload.added_capacity_seats * (0.84 if payload.curriculum_upgrade else 0.62))

    return SkillSimulationResponse(
        skill_id=target_gap["id"],
        skill_name=target_gap["skill"],
        original_gap=original_gap,
        projected_gap=projected_gap,
        gap_reduction_percent=gap_reduction,
        new_severity=new_severity,
        projected_placements=projected_placements,
        summary_message=f"Adding {payload.added_capacity_seats} training seats and updating the curriculum closes the deficit by {gap_reduction}%, dropping severity from {target_gap['severity']} to {new_severity}."
    )


# =========================================================================
# Employer Routes
# =========================================================================

@app.get("/api/employers")
def get_employers():
    """Retrieve list of industry employer partners and hiring demand."""
    employers = storage.get_all_employers()
    return {"employers": employers, "total": len(employers)}


@app.post("/api/employers")
def add_employer(payload: NewEmployerRequest):
    """Register a new industry hiring partner."""
    new_emp = storage.add_employer_partner(
        name=payload.name,
        industry=payload.industry,
        openings=payload.openings,
        skills=payload.skills_needed,
        location=payload.location
    )
    return {"success": True, "employer": new_emp}


# =========================================================================
# District Routes
# =========================================================================

@app.get("/api/districts")
def get_districts():
    """Retrieve district-level training plans and placement rates."""
    districts = storage.get_all_districts()
    return {"districts": districts, "total": len(districts)}


# =========================================================================
# AI Curriculum Alignment Engine
# =========================================================================

@app.post("/api/curriculum-audit", response_model=CurriculumAuditResponse)
def audit_curriculum(payload: CurriculumAuditRequest):
    """Analyze a proposed course syllabus against live industry demand signals."""
    text_lower = payload.syllabus_text.lower()
    
    # Keyword detection rules based on target role
    keywords_database = {
        "Cloud": ["aws", "azure", "docker", "kubernetes", "terraform", "ci/cd", "linux", "cloud security", "microservices"],
        "Web": ["react", "next.js", "typescript", "tailwind", "node.js", "rest api", "graphql", "testing", "postgresql"],
        "AI": ["python", "pytorch", "transformers", "llm", "rag", "langchain", "embeddings", "pandas", "mlops"],
        "Cyber": ["network security", "soc", "siem", "ethical hacking", "incident response", "firewalls", "wireshark"],
        "Data": ["sql", "spark", "kafka", "dbt", "python", "data warehouse", "etl", "airflow", "snowflake"]
    }

    # Match target domain
    matched_domain = "Web"
    for domain in keywords_database:
        if domain.lower() in payload.target_job_role.lower() or domain.lower() in payload.course_name.lower():
            matched_domain = domain
            break

    target_keywords = keywords_database.get(matched_domain, keywords_database["Web"])
    
    found_keywords = [kw for kw in target_keywords if kw in text_lower]
    missing_keywords = [kw for kw in target_keywords if kw not in text_lower]

    # Outdated modules detection
    outdated_tokens = ["jquery", "php 5", "flash", "vb.net", "pascal", "perl", "windows xp", "subversion", "ms frontpage"]
    outdated_found = [token.title() for token in outdated_tokens if token in text_lower]

    match_ratio = len(found_keywords) / len(target_keywords) if target_keywords else 0.5
    raw_score = int(match_ratio * 90) + (10 if not outdated_found else -15)
    score = max(25, min(96, raw_score))

    status = "Aligned" if score >= 80 else ("Update Needed" if score >= 55 else "Critically Outdated")
    
    recs = []
    if missing_keywords:
        recs.append(f"Add dedicated module units for: {', '.join([k.title() for k in missing_keywords[:3]])}.")
    if outdated_found:
        recs.append(f"Remove deprecated topics ({', '.join(outdated_found)}) to free up 20+ teaching hours for cloud-native tools.")
    recs.append("Incorporate hands-on capstone project with industry-standard Git pull request workflow.")
    recs.append("Integrate 2 mock assessment vouchers for recognized industry certifications.")

    storage.save_curriculum_audit(
        course_name=payload.course_name,
        syllabus=payload.syllabus_text,
        score=score,
        missing=[k.title() for k in missing_keywords],
        recommendations=recs
    )

    return CurriculumAuditResponse(
        course_name=payload.course_name,
        target_job_role=payload.target_job_role,
        alignment_score=score,
        status=status,
        detected_strengths=[k.title() for k in found_keywords] if found_keywords else ["Core Fundamentals"],
        critical_missing_skills=[k.title() for k in missing_keywords[:4]],
        outdated_modules_found=outdated_found,
        actionable_recommendations=recs,
        estimated_placement_boost="+18% to +26% post-revision"
    )
