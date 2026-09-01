# SkillBridge AI — SIH 26134 Platform

**Labour-Market Intelligence & Real-Time Curriculum Alignment Engine**  
*Submitted for Smart India Hackathon (SIH 2026) — Government of Maharashtra (MSDSVE)*  
*Team: Syntax Squad*

---

## 🎯 Problem Statement Overview
Skill-development and vocational training programs frequently lag behind rapid technological advancements and evolving industry expectations. Course curricula, lab equipment, and evaluation methods are slow to update, resulting in severe talent shortages in high-growth sectors (Cloud, AI/ML, DevOps) while other basic tracks are oversupplied.

**SkillBridge** provides a continuous, evidence-based intelligence mechanism that maps real-time employer demand, spots curriculum deficits, generates AI-powered syllabus modernizations, and outputs district-level strategic training quotas.

---

## 🚀 Key Modules & Capabilities

1. **Executive Intelligence Cockpit (`/dashboard`)**:
   - High-level KPIs: Courses Tracked, Active Deficits, Placement Rates, and Partner Network.
   - Comparative Demand vs Supply double-bar matrix with YoY growth velocity.
   - Real-time strategic action alerts and regional placement heatmaps.

2. **Course Alignment Tracker (`/courses`)**:
   - Searchable, filterable catalog of all active MSDSVE vocational programs.
   - Interactive Course Inspector Modal with syllabus module breakdowns.
   - One-click **Authorize Curriculum Modernization** action.

3. **Skill Gap Radar & Policy Simulator (`/skill-gaps`)**:
   - Deficit severity classification (Critical, High, Moderate, Oversupplied).
   - Interactive **"What-If" Capacity Simulator** to mathematically model the placement boost and deficit reduction of seat expansion.

4. **Employer Demand Network (`/employers`)**:
   - Live vacancy signals from major hiring partners (TCS, Infosys, Wipro, L&T, etc.).
   - Interactive modal to register new corporate hiring pipelines.

5. **District Strategic Training Plans (`/district-plans`)**:
   - Localized training roadmaps for all 36 Maharashtra districts (Mumbai, Pune, Nagpur, Nashik, Sambhajinagar, etc.).
   - Exportable / Printable Executive Government Briefing dossier.

6. **AI Course Syllabus Auditor (`/curriculum-advisor`)**:
   - Instant AI-driven syllabus compatibility auditor.
   - Detects obsolete modules (PHP 5, jQuery) and flags critical missing industry tools (Docker, Next.js, PyTorch).

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript 5, Tailwind CSS 3 (Dark Glassmorphic UI)
- **Backend**: Python 3.11+ / FastAPI, Pydantic v2 schemas
- **Database**: SQLite (WAL mode) with stdlib fail-safe storage engine
- **Server**: Uvicorn ASGI

---

## 💻 Local Setup & Execution

### 1. Backend (FastAPI + SQLite)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
- API Health: `http://localhost:8000/health`
- Interactive Swagger Docs: `http://localhost:8000/docs`

### 2. Frontend (Next.js 14)
```bash
cd frontend
npm install
npm run dev
```
- Open in browser: `http://localhost:3000`
