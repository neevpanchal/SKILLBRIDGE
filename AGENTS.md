# AGENTS.md — Syntax Squad Hackathon

## Project overview

Two-site hackathon submission for Smart India Hackathon (SIH). Each problem statement gets its own standalone website in its own subfolder — completely independent codebases, no shared code between sites.

- **Site-A**: `Site-A/[PROBLEM-A-SLUG]/` — Problem Statement A
- **Site-B**: `Site-B/[PROBLEM-B-SLUG]/` — Problem Statement B

Team: Syntax Squad

## Layout

- `D:\SIH\Hackathon\` — workspace root
- `Site-A/` — first problem statement (own frontend + backend)
- `Site-B/` — second problem statement (own frontend + backend)
- Each site is fully self-contained: separate `package.json`, separate `requirements.txt`, separate database files

## Tech stack

### Frontend (both sites)
- Next.js 14+ with App Router
- React 18, TypeScript 5
- Tailwind CSS 3

### Backend (both sites)
- Python 3.11+ / FastAPI
- SQLite via stdlib `sqlite3` (fail-safe, same pattern as Student-Analytics `storage.py`)
- Pydantic v2 for schemas
- Uvicorn ASGI server

## Commands

### Frontend (per site)
```bash
cd Site-A/[SLUG]/frontend   # or Site-B/[SLUG]/frontend
npm install
npm run dev                  # http://localhost:3000
```

### Backend (per site)
```bash
cd Site-A/[SLUG]/backend    # or Site-B/[SLUG]/backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

## Conventions

- Keep all API/business logic in `backend/services/`; no framework coupling there.
- Frontend pages live in `src/app/` (App Router). One folder per route.
- Reusable components go in `src/components/`.
- Fetch helpers, types, constants go in `src/lib/`.
- Storage pattern: `storage.py` with stdlib SQLite; all functions fail-safe (locked/missing DB must never crash).
- Never hardcode credentials. Use env vars or `.env` files (gitignored).

## Workflow

- After every edit, update `Taskflow.md`: tick completed items, log bug fixes.
- Log bugs in `Bug Tracker.md` with unified status table.
- Verify changes: `npm run build` (frontend), `python -m py_compile main.py` (backend).
- Port conflicts: frontend default 3000, backend default 8000.
