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
