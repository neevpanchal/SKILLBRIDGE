# Bug Tracker.md — Unified Bug Table

| BUG-ID | Status | Area | Problem | Next Action |
|--------|--------|------|---------|-------------|
| BUG-001 | Fixed | Site-B / Frontend | Incomplete node_modules transitivity on fresh scaffold | Ran npm install to resolve dependencies |
| BUG-002 | Fixed | Site-B / Backend | Static dummy data without database persistence | Implemented full SQLite schema with WAL mode & seed records |
| BUG-003 | Fixed | Site-B / Frontend | Plain layout without interactive simulators or dark glassmorphic styling | Built complete suite of 6 pages with dynamic capacity simulator and AI auditor |
| BUG-004 | Fixed | Site-B / Frontend | Redundant .babelrc conflicting with Next.js SWC font loader during production build | Removed .babelrc, enabled SWC compiler, validated full build passing |
| BUG-005 | Fixed | Site-B / Frontend & Backend | Lingering Hackathon and Problem Statement #26134 references in UI & metadata | Purged all occurrences across navbar, footer, metadata, hero, challenge sections and redeployed |
| BUG-006 | Fixed | Site-B / Frontend & Backend | Maharashtra skill development & state policy document mentions | Replaced with universal Directorate of Vocational Training / Technical Standards terminology and redeployed to Vercel |
| BUG-007 | Fixed | Site-B / Dashboard | Dashboard displaying static figures rather than personalized user parameters | Implemented interactive Dashboard Precision Calibration Suite with region, industry sector, cohort scale, and focus skills inputs; redeployed live |
| BUG-008 | Fixed | Site-B / Frontend | JSX unescaped entities in DataSourcesModal and missing Next.js Link in CurriculumSimulator | Fixed imports, escaped JSX entities, and verified full production build passing (15 static routes) |

**Status values:** Open | In Progress | Fixed | Wontfix

---

## Notes

- One row per bug, both sites in the same table.
- "Area" = which site + layer (e.g. "Site-A / frontend", "Site-B / backend").
- After fixing, set Status to Fixed and update Taskflow.md.
