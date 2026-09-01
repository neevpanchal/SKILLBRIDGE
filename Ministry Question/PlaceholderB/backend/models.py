from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class Course(BaseModel):
    id: int
    name: str
    provider: str
    duration: str
    enrolled: int
    placement: int
    alignment: int
    status: str
    skills: List[str]
    curriculum_summary: Optional[str] = None
    missing_skills: Optional[List[str]] = []
    last_reviewed: Optional[str] = None


class CourseStatusUpdateRequest(BaseModel):
    status: str
    alignment: int
    added_skills: List[str] = []


class SkillGap(BaseModel):
    id: int
    skill: str
    demand: int
    supply: int
    gap: int
    severity: str
    courses_count: int
    recommendation: str
    growth_rate: str
    target_roles: List[str]


class SkillSimulationRequest(BaseModel):
    skill_id: int
    added_capacity_seats: int
    curriculum_upgrade: bool = True


class SkillSimulationResponse(BaseModel):
    skill_id: int
    skill_name: str
    original_gap: int
    projected_gap: int
    gap_reduction_percent: float
    new_severity: str
    projected_placements: int
    summary_message: str


class Employer(BaseModel):
    id: int
    name: str
    industry: str
    openings: int
    skills_needed: List[str]
    satisfaction: int
    hired: int
    location: str
    partnership_tier: str


class NewEmployerRequest(BaseModel):
    name: str
    industry: str
    openings: int
    skills_needed: List[str]
    location: str


class DistrictTraining(BaseModel):
    id: int
    district: str
    placements: int
    rate: str
    courses: int
    active_trainees: int
    top_industry: str
    key_skill_needed: str


class DashboardStats(BaseModel):
    courses_tracked: int
    skill_gaps_identified: int
    critical_gaps_count: int
    placement_rate: str
    total_placements: int
    total_openings: int
    employer_partners: int
    active_districts: int


class CurriculumAuditRequest(BaseModel):
    course_name: str
    target_job_role: str
    syllabus_text: str


class CurriculumAuditResponse(BaseModel):
    course_name: str
    target_job_role: str
    alignment_score: int
    status: str
    detected_strengths: List[str]
    critical_missing_skills: List[str]
    outdated_modules_found: List[str]
    actionable_recommendations: List[str]
    estimated_placement_boost: str
