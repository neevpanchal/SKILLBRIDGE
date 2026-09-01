import sqlite3
import os
import json
from typing import List, Dict, Any, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "data.db")


def _get_conn() -> sqlite3.Connection:
    """Get a connection to the SQLite database. Creates file if missing."""
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def init_db():
    """Create tables and seed initial data if missing. Safe to call multiple times."""
    try:
        with _get_conn() as conn:
            # 1. Courses Table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS courses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    provider TEXT NOT NULL,
                    duration TEXT NOT NULL,
                    enrolled INTEGER NOT NULL DEFAULT 0,
                    placement INTEGER NOT NULL DEFAULT 0,
                    alignment INTEGER NOT NULL DEFAULT 0,
                    status TEXT NOT NULL,
                    skills_json TEXT NOT NULL,
                    curriculum_summary TEXT,
                    missing_skills_json TEXT,
                    last_reviewed TEXT
                )
            """)

            # 2. Skill Gaps Table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS skill_gaps (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    skill TEXT NOT NULL,
                    demand INTEGER NOT NULL,
                    supply INTEGER NOT NULL,
                    gap INTEGER NOT NULL,
                    severity TEXT NOT NULL,
                    courses_count INTEGER NOT NULL DEFAULT 0,
                    recommendation TEXT NOT NULL,
                    growth_rate TEXT NOT NULL,
                    target_roles_json TEXT NOT NULL
                )
            """)

            # 3. Employers Table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS employers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    industry TEXT NOT NULL,
                    openings INTEGER NOT NULL,
                    skills_needed_json TEXT NOT NULL,
                    satisfaction INTEGER NOT NULL,
                    hired INTEGER NOT NULL,
                    location TEXT NOT NULL,
                    partnership_tier TEXT NOT NULL
                )
            """)

            # 4. Districts Table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS districts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    district TEXT NOT NULL UNIQUE,
                    placements INTEGER NOT NULL,
                    rate TEXT NOT NULL,
                    courses INTEGER NOT NULL,
                    active_trainees INTEGER NOT NULL,
                    top_industry TEXT NOT NULL,
                    key_skill_needed TEXT NOT NULL
                )
            """)

            # 5. Curriculum Audits Table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS curriculum_audits (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    course_name TEXT NOT NULL,
                    submitted_syllabus TEXT NOT NULL,
                    alignment_score INTEGER NOT NULL,
                    missing_skills_json TEXT NOT NULL,
                    recommendations_json TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            conn.commit()

            # Seed if courses table is empty
            count = conn.execute("SELECT COUNT(*) FROM courses").fetchone()[0]
            if count == 0:
                _seed_database(conn)

    except sqlite3.Error as e:
        print(f"Database init error: {e}")


def _seed_database(conn: sqlite3.Connection):
    """Seed comprehensive initial datasets for demo."""
    courses_data = [
        (1, "Advanced Python Programming & API Engineering", "SVTE", "6 months", 342, 89, 91, "Aligned",
         json.dumps(["Python", "FastAPI", "Data Structures", "REST APIs", "PostgreSQL"]),
         "Comprehensive backend development covering modern asynchronous Python, API design, and cloud deployment.",
         json.dumps(["Kafka", "GraphQL"]), "2026-07-15"),
        (2, "Full-Stack Web Development (Next.js & React)", "SVTE", "8 months", 567, 74, 78, "Update Needed",
         json.dumps(["React", "Node.js", "MongoDB", "Express", "CSS3"]),
         "Web development fundamentals. Current syllabus lacks TypeScript, Next.js App Router, and modern CI/CD pipelines.",
         json.dumps(["TypeScript", "Next.js", "Docker", "Tailwind CSS"]), "2026-06-20"),
        (3, "Cloud Infrastructure & DevOps (AWS/Azure)", "SVTE", "4 months", 234, 82, 62, "Update Needed",
         json.dumps(["AWS Basics", "EC2", "S3", "Linux Basics"]),
         "Introductory cloud concepts. Needs modernization for Kubernetes, Terraform IaC, and Serverless architectures.",
         json.dumps(["Kubernetes", "Terraform", "CI/CD", "Docker"]), "2026-05-10"),
        (4, "Data Science & Machine Learning Foundations", "SVTE", "6 months", 445, 86, 87, "Aligned",
         json.dumps(["Python", "Pandas", "Scikit-Learn", "Statistics", "Data Viz"]),
         "Applied data science with real-world industry case studies, exploratory data analysis, and predictive modeling.",
         json.dumps(["MLOps", "Model Deployment"]), "2026-08-01"),
        (5, "Applied Generative AI & Deep Learning", "SVTE", "8 months", 189, 91, 94, "Aligned",
         json.dumps(["PyTorch", "Transformers", "LLMs", "RAG", "Prompt Engineering"]),
         "Cutting-edge syllabus covering Foundation Models, embeddings, vector databases, and enterprise AI workflows.",
         json.dumps(["Agentic Workflows"]), "2026-08-10"),
        (6, "Cybersecurity & SOC Operations", "SVTE", "5 months", 312, 88, 89, "Aligned",
         json.dumps(["Network Security", "Ethical Hacking", "SIEM", "Incident Response", "Firewalls"]),
         "Practical cybersecurity operations with simulated virtual cyber-range labs.",
         json.dumps(["Cloud Security Auditing"]), "2026-07-28"),
        (7, "Digital Marketing & Growth Analytics", "SVTE", "3 months", 678, 65, 52, "Oversupplied",
         json.dumps(["SEO", "SEM", "Social Media", "Email Marketing"]),
         "High enrollment but low hiring demand due to oversupply in basic marketing roles.",
         json.dumps(["Programmatic Ads", "SQL for Marketers"]), "2026-04-12"),
        (8, "Mobile App Development (Flutter & React Native)", "SVTE", "6 months", 298, 79, 81, "Aligned",
         json.dumps(["Flutter", "Dart", "React Native", "Firebase", "State Management"]),
         "Cross-platform mobile app development with end-to-end publishing pipelines.",
         json.dumps(["Offline-first Architecture"]), "2026-06-30"),
        (9, "DevOps & Site Reliability Engineering", "SVTE", "5 months", 156, 85, 90, "Aligned",
         json.dumps(["Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Terraform"]),
         "Intensive infrastructure automation and reliability engineering track.",
         json.dumps(["Service Meshes"]), "2026-07-19"),
        (10, "Basic Computer Applications & Typing", "SVTE", "2 months", 890, 34, 28, "Oversupplied",
         json.dumps(["MS Office", "Typing", "Internet Browsing"]),
         "Outdated introductory track with severely diminished industry placement value.",
         json.dumps(["Digital Tools", "Spreadsheet Automation"]), "2026-03-01"),
    ]

    conn.executemany("""
        INSERT INTO courses (id, name, provider, duration, enrolled, placement, alignment, status, skills_json, curriculum_summary, missing_skills_json, last_reviewed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, courses_data)

    skill_gaps_data = [
        (1, "Cloud Computing (AWS/Azure/GCP)", 85, 33, 52, "Critical", 2,
         "Launch 3-month intensive AWS/Azure certified practitioner & solutions architect track with cloud lab credits.",
         "+34% YoY", json.dumps(["Cloud Architect", "Cloud DevOps Engineer", "SysOps Administrator"])),
        (2, "AI & Machine Learning Engineering", 82, 28, 54, "Critical", 1,
         "Expand AI/ML cohort capacity by 200%, establish GPU compute labs, and integrate LLM fine-tuning modules.",
         "+42% YoY", json.dumps(["ML Engineer", "AI Solutions Developer", "Data Scientist"])),
        (3, "Full-Stack Development (Modern React/Next.js/TypeScript)", 88, 41, 47, "High", 3,
         "Mandate TypeScript and Next.js in state web curriculum and decommission legacy PHP-only syllabus.",
         "+26% YoY", json.dumps(["Full-Stack Engineer", "Frontend Architect", "API Developer"])),
        (4, "Cybersecurity & Threat Intelligence", 79, 35, 44, "High", 1,
         "Partner with CERT-In and industry security leaders to deploy automated SOC sandbox simulations.",
         "+29% YoY", json.dumps(["SOC Analyst", "Security Engineer", "Penetration Tester"])),
        (5, "DevOps & Infrastructure Automation", 74, 30, 44, "High", 1,
         "Incorporate hands-on Docker and CI/CD pipelines across all vocational computing institutions.",
         "+31% YoY", json.dumps(["DevOps Specialist", "Site Reliability Engineer", "Platform Engineer"])),
        (6, "Data Engineering & Pipeline Architecture", 72, 31, 41, "Medium", 2,
         "Introduce Apache Spark, Kafka, and dbt modules for modern big data ecosystem alignment.",
         "+22% YoY", json.dumps(["Data Engineer", "ETL Developer", "Analytics Engineer"])),
        (7, "Cross-Platform Mobile Development", 71, 48, 23, "Medium", 2,
         "Align mobile curriculum with Flutter 3.x and React Native Expo workflows.",
         "+15% YoY", json.dumps(["Mobile App Developer", "Flutter Specialist"])),
        (8, "Digital Marketing & SEO", 76, 62, 14, "Low", 5,
         "Cap general digital marketing intake; pivot seats to Growth Product Analytics.",
         "+5% YoY", json.dumps(["Growth Marketer", "Performance Marketing Specialist"])),
        (9, "Basic Computer Literacy & Office Tools", 30, 65, -35, "Oversupplied", 4,
         "Decommission 60% of legacy basic typing seats and divert funding to modern IT skill tracks.",
         "-12% YoY", json.dumps(["Data Entry Operator", "Office Assistant"])),
    ]

    conn.executemany("""
        INSERT INTO skill_gaps (id, skill, demand, supply, gap, severity, courses_count, recommendation, growth_rate, target_roles_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, skill_gaps_data)

    employers_data = [
        (1, "Tata Consultancy Services (TCS)", "IT Services & Consulting", 234,
         json.dumps(["Java", "Cloud Infrastructure", "Data Analysis", "Python", "Microservices"]), 78, 89, "Mumbai / Pune", "Tier 1 Platinum"),
        (2, "Infosys Limited", "IT Services & Enterprise Software", 189,
         json.dumps(["Python", "AI/ML", "DevOps", "Kubernetes", "Angular"]), 82, 67, "Pune / Nagpur", "Tier 1 Platinum"),
        (3, "Wipro Technologies", "IT & Cloud Services", 156,
         json.dumps(["Full-Stack", "AWS", "Cybersecurity", "React", "Node.js"]), 75, 54, "Pune / Mumbai", "Tier 2 Gold"),
        (4, "HCLTech", "IT & Engineering R&D", 134,
         json.dumps(["Java", "React", "Docker", "FastAPI", "PostgreSQL"]), 80, 45, "Nagpur / Pune", "Tier 2 Gold"),
        (5, "Tech Mahindra", "Telecom & Next-Gen IT", 112,
         json.dumps(["5G Core", "Cloud Native", "AI Solutions", "Python", "Networking"]), 73, 38, "Mumbai / Pune", "Tier 2 Gold"),
        (6, "Persistent Systems", "Product Engineering", 89,
         json.dumps(["Python", "Machine Learning", "System Design", "Cloud", "Go"]), 88, 32, "Pune / Nagpur", "Tier 1 Platinum"),
        (7, "LTIMindtree", "IT Services & Digital Transformation", 78,
         json.dumps(["SAP S/4HANA", "Cloud Architecture", "Data Engineering", "SQL"]), 71, 28, "Mumbai / Navi Mumbai", "Tier 3 Silver"),
        (8, "Mphasis Digital", "Cloud & Cognitive Services", 67,
         json.dumps(["Full-Stack", "AWS Serverless", "Agile", "TypeScript"]), 77, 24, "Pune", "Tier 3 Silver"),
    ]

    conn.executemany("""
        INSERT INTO employers (id, name, industry, openings, skills_needed_json, satisfaction, hired, location, partnership_tier)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, employers_data)

    districts_data = [
        (1, "Mumbai Metropolitan", 1240, "72%", 89, 3450, "Financial Services & IT Hub", "Cloud & Full-Stack Development"),
        (2, "Pune", 980, "69%", 76, 2890, "Automotive & Enterprise Software", "AI/ML & DevOps Engineering"),
        (3, "Nagpur", 540, "61%", 52, 1620, "Logistics & Emerging IT Hub", "Data Engineering & Cybersecurity"),
        (4, "Nashik", 420, "58%", 44, 1250, "Manufacturing & Defense Electronics", "Industrial IoT & Embedded Systems"),
        (5, "Chhatrapati Sambhajinagar (Aurangabad)", 380, "55%", 38, 1100, "Automotive & Heavy Engineering", "PLC Automation & CAD/CAM"),
        (6, "Kolhapur", 290, "53%", 31, 870, "Textile & Foundry Engineering", "Digital Manufacturing"),
        (7, "Solapur", 240, "50%", 27, 720, "Textile & Renewable Energy", "Solar Installation & Maintenance"),
        (8, "Amravati", 195, "48%", 22, 590, "Agri-tech & Small Industry", "Agri-Data Analysis & Farm Automation"),
    ]

    conn.executemany("""
        INSERT INTO districts (id, district, placements, rate, courses, active_trainees, top_industry, key_skill_needed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, districts_data)

    conn.commit()


# =========================================================================
# Query Helpers
# =========================================================================

def get_all_courses(search: Optional[str] = None, status: Optional[str] = None) -> List[Dict[str, Any]]:
    """Retrieve courses with optional search and status filtering."""
    init_db()
    with _get_conn() as conn:
        query = "SELECT * FROM courses WHERE 1=1"
        params = []

        if search:
            query += " AND (name LIKE ? OR skills_json LIKE ?)"
            term = f"%{search}%"
            params.extend([term, term])

        if status and status != "All":
            query += " AND status = ?"
            params.append(status)

        query += " ORDER BY alignment DESC"
        rows = conn.execute(query, params).fetchall()

        courses = []
        for r in rows:
            c = dict(r)
            c["skills"] = json.loads(c["skills_json"])
            c["missing_skills"] = json.loads(c["missing_skills_json"]) if c.get("missing_skills_json") else []
            courses.append(c)
        return courses


def get_course_by_id(course_id: int) -> Optional[Dict[str, Any]]:
    """Retrieve a single course by ID."""
    init_db()
    with _get_conn() as conn:
        row = conn.execute("SELECT * FROM courses WHERE id = ?", (course_id,)).fetchone()
        if not row:
            return None
        c = dict(row)
        c["skills"] = json.loads(c["skills_json"])
        c["missing_skills"] = json.loads(c["missing_skills_json"]) if c.get("missing_skills_json") else []
        return c


def update_course_curriculum(course_id: int, new_status: str, added_skills: List[str], new_alignment: int) -> Optional[Dict[str, Any]]:
    """Update course alignment status after curriculum review."""
    init_db()
    with _get_conn() as conn:
        row = conn.execute("SELECT * FROM courses WHERE id = ?", (course_id,)).fetchone()
        if not row:
            return None
        c = dict(row)
        current_skills = json.loads(c["skills_json"])
        for s in added_skills:
            if s not in current_skills:
                current_skills.append(s)

        conn.execute("""
            UPDATE courses
            SET status = ?, alignment = ?, skills_json = ?, last_reviewed = CURRENT_TIMESTAMP
            WHERE id = ?
        """, (new_status, new_alignment, json.dumps(current_skills), course_id))
        conn.commit()
        return get_course_by_id(course_id)


def get_all_skill_gaps() -> List[Dict[str, Any]]:
    """Retrieve all tracked skill gaps."""
    init_db()
    with _get_conn() as conn:
        rows = conn.execute("SELECT * FROM skill_gaps ORDER BY gap DESC").fetchall()
        gaps = []
        for r in rows:
            g = dict(r)
            g["target_roles"] = json.loads(g["target_roles_json"])
            gaps.append(g)
        return gaps


def get_all_employers() -> List[Dict[str, Any]]:
    """Retrieve all employer partners."""
    init_db()
    with _get_conn() as conn:
        rows = conn.execute("SELECT * FROM employers ORDER BY openings DESC").fetchall()
        employers = []
        for r in rows:
            e = dict(r)
            e["skills_needed"] = json.loads(e["skills_needed_json"])
            employers.append(e)
        return employers


def add_employer_partner(name: str, industry: str, openings: int, skills: List[str], location: str) -> Dict[str, Any]:
    """Add a new employer partner."""
    init_db()
    with _get_conn() as conn:
        cur = conn.execute("""
            INSERT INTO employers (name, industry, openings, skills_needed_json, satisfaction, hired, location, partnership_tier)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (name, industry, openings, json.dumps(skills), 90, 0, location, "Tier 2 Gold"))
        conn.commit()
        new_id = cur.lastrowid
        return {
            "id": new_id,
            "name": name,
            "industry": industry,
            "openings": openings,
            "skills_needed": skills,
            "satisfaction": 90,
            "hired": 0,
            "location": location,
            "partnership_tier": "Tier 2 Gold"
        }


def get_all_districts() -> List[Dict[str, Any]]:
    """Retrieve district training plans."""
    init_db()
    with _get_conn() as conn:
        rows = conn.execute("SELECT * FROM districts ORDER BY placements DESC").fetchall()
        return [dict(r) for r in rows]


def get_dashboard_summary() -> Dict[str, Any]:
    """Aggregate high level KPIs for executive dashboard."""
    init_db()
    courses = get_all_courses()
    gaps = get_all_skill_gaps()
    employers = get_all_employers()
    districts = get_all_districts()

    total_placements = sum(d["placements"] for d in districts)
    total_openings = sum(e["openings"] for e in employers)
    critical_gaps = len([g for g in gaps if g["severity"] == "Critical"])

    return {
        "stats": {
            "courses_tracked": len(courses),
            "skill_gaps_identified": len(gaps),
            "critical_gaps_count": critical_gaps,
            "placement_rate": "67.4%",
            "total_placements": total_placements,
            "total_openings": total_openings,
            "employer_partners": len(employers),
            "active_districts": len(districts),
        },
        "top_skill_gaps": gaps[:6],
        "recent_courses": courses[:6],
        "district_training": districts[:6],
        "top_employers": employers[:5]
    }


def save_curriculum_audit(course_name: str, syllabus: str, score: int, missing: List[str], recommendations: List[str]) -> Dict[str, Any]:
    """Save an AI curriculum audit run."""
    init_db()
    with _get_conn() as conn:
        cur = conn.execute("""
            INSERT INTO curriculum_audits (course_name, submitted_syllabus, alignment_score, missing_skills_json, recommendations_json)
            VALUES (?, ?, ?, ?, ?)
        """, (course_name, syllabus, score, json.dumps(missing), json.dumps(recommendations)))
        conn.commit()
        return {
            "id": cur.lastrowid,
            "course_name": course_name,
            "alignment_score": score,
            "missing_skills": missing,
            "recommendations": recommendations,
        }
