# LearnPilot AI — SIH Student Innovation

**Adaptive Diagnostic Assessment & Mastery Tracking Platform**  
*Submitted for Smart India Hackathon (SIH 2026)*  
*Team: Syntax Squad*

---

## 🎯 Project Overview
LearnPilot identifies learning gaps at the granular topic level and generates an adaptive daily micro-study plan so learners master weak topics faster.

---

## 🚀 Key Features
1. **Diagnostic Assessment Engine**: Multi-topic quiz evaluating foundational comprehension.
2. **Topic-Wise Mastery Matrix**: Visual tracking of proficient vs critical focus areas.
3. **Adaptive Study Roadmaps**: Micro-session recommendations prioritized by deficit severity.
4. **Persistent Progress DB**: SQLite-backed score retention and historical progress curves.

---

## 🛠️ Quick Start

### Frontend (Next.js 14)
```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
```

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
