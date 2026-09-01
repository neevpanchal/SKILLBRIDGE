# Taskflow.md — Hackathon Roadmap

## Status

| Site  | Problem Statement | Frontend | Backend | Status    |
|-------|-------------------|----------|---------|-----------|
| Site-A | LearnPilot (Student Innovation) | Complete | Complete | Complete |
| Site-B | SkillBridge (SIH 26134 - Ministry) | Complete | Complete | Complete |

---

## Site-B — SkillBridge (Ministry Problem Statement SIH 26134)

### Phase 1: Scaffold (DONE)
- [x] Create folder structure
- [x] Frontend boilerplate (Next.js 14+, Tailwind, TypeScript)
- [x] Backend boilerplate (FastAPI, Pydantic, SQLite)
- [x] README with run instructions

### Phase 2: Core Features (DONE)
- [x] Define data models and DB schema (`storage.py`, `models.py`)
- [x] Backend API endpoints (Dashboard, Courses, Skill Gaps, Capacity Simulator, Employers, Districts, AI Curriculum Auditor)
- [x] Frontend pages and routing (`/`, `/dashboard`, `/courses`, `/skill-gaps`, `/employers`, `/district-plans`, `/curriculum-advisor`)
- [x] Interactive UI components (Navbar, Footer, StatCard, SkillGapBar, CourseModal, CurriculumSimulator, EmployerModal)
- [x] Frontend ↔ Backend integration with live failover fallback

### Phase 3: Polish (DONE)
- [x] UI/UX refinement (Dark glassmorphism, responsive charts, glowing badges, animations)
- [x] Error handling, search queries, and real-time state mutations
- [x] Automated testing and compilation checks
- [x] Documentation & run instructions

---

## Site-A — LearnPilot (SIH Student Innovation)

### Phase 1: Scaffold (DONE)
- [x] Create folder structure
- [x] Frontend boilerplate (Next.js 14+, Tailwind, TypeScript)
- [x] Backend boilerplate (FastAPI, Pydantic, SQLite)
- [x] README with run instructions

### Phase 2: Core Features (DONE)
- [x] Define data models and DB schema (Topics, Questions, Mastery progress)
- [x] Backend API endpoints (`/api/dashboard`, `/api/questions`, `/api/submit-test`)
- [x] Frontend pages and routing
- [x] Diagnostic assessment & mastery tracking

### Phase 3: Polish (DONE)
- [x] UI/UX refinement & consistent theme
- [x] Testing & validation

---

## Fixed so far

- Fixed missing SQLite tables in `storage.py` and populated seed data for all 36 Maharashtra districts, MSDSVE courses, and employer partners.
- Upgraded Next.js frontend with dark mode glassmorphism, dynamic capacity simulation calculations, and instant curriculum audit engine.
- Configured and validated production build (`npm run build`) for both Site-A and Site-B; both apps are 100% Vercel-ready with zero errors.
- Launched local frontend on `http://localhost:3000` connected with FastAPI SQLite backend on `http://localhost:8000`.
- Deployed Site-B production build to Vercel live at `https://frontend-tau-weld-11.vercel.app`.
- Purged all Hackathon and SIH Problem Statement #26134 text across headers, metadata, footers, copyable reports, and challenge modules; verified live production redeployment.
- Removed all Maharashtra Skill Development Department (MSDSVE) branding, region tags, and the state policy document from the footer; successfully redeployed to Vercel.
- Integrated interactive Dashboard Precision Calibration Suite on `/dashboard` allowing users to enter custom Region, Industry Sector, Trainee Cohort Size, Placement Target, and Focus Competencies with instant dynamic recalculation of all KPIs, skill deficit charts, syllabus alignment, and strategic alerts; redeployed to Vercel.
- Built Centralized Intelligence Dataset (`src/lib/intelligenceData.ts`) establishing a single source of truth across all 10 dashboards and modules with 100% numerical consistency.
- Built interactive 12-stage Central Intelligence Loop (`IntelligenceLoop.tsx`) mapping the complete pipeline from Industry Demand to Continuous Curriculum Updates.
- Created Skill Intelligence Matrix page (`/skill-matrix`) with multi-dimensional filtering (District, Sector, Skill, Proficiency, Priority, Time Period), salary indicators, opening counts, and heatmaps.
- Upgraded AI Curriculum Advisor (`/curriculum-advisor`) with comprehensive 4-stage audit (Current Baseline, Industry Requirements, Detected Gaps with hours/severity, AI Upgrade Plan with Keep/Modify/Remove/Add, Lab & Trainer requirements, Confidence Scores with explainability).
- Created explainable Course Modernization Score component (`ScoreExplainerModal.tsx`) with 6-factor weighted breakdown and Course Decision Engine classifications on `/courses`.
- Upgraded What-If Policy Simulator (`CurriculumSimulator.tsx`) with 9 policy levers and real-time Before vs After analytics.
- Added Employer Validation System on `/employers` with recruiter survey consensus breakdown and "Request Skill / Submit Validation" workflow.
- Built Career Pathways page (`/career-pathways`) mapping Job Role ➔ Skill ➔ Course with structured 8-stage learning paths.
- Built Training Capacity Planner (`/capacity-planner`) tracking instructor shortages, virtual lab sandboxes, and Capex requirements.
- Built Placement Outcome Analytics (`/placement-analytics`) closing the feedback loop with verified hiring conversion and wage premiums.
- Built Policy Decision Center (`/policy-decisions`) with one-click ministerial action authorizations and visual evidence chain inspection (`EvidenceReasoningModal.tsx`).
- Created 🚀 SIH Demo Mode (`SihDemoModal.tsx`) with a 10-step guided tour walking judges through the realistic Pune IT/Cloud scenario in 2–3 minutes.
- Added Data Sources & Methodology modal (`DataSourcesModal.tsx`) and verified production build passing (`npm run build`).
