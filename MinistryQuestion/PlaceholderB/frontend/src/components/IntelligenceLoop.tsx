"use client";

import React, { useState } from "react";
import Link from "next/link";

interface LoopStage {
  id: number;
  number: string;
  title: string;
  shortDesc: string;
  category: "Demand Ingestion" | "AI Intelligence" | "Action & Planning" | "Feedback & Polish";
  icon: string;
  badge: string;
  route: string;
  metrics: { label: string; value: string; color?: string }[];
  detailText: string;
  evidenceSample: string;
  actionItem: string;
}

const LOOP_STAGES: LoopStage[] = [
  {
    id: 1,
    number: "01",
    title: "Industry Demand",
    shortDesc: "Aggregates macro industrial hiring growth, sector capital investments, and regional economic velocity.",
    category: "Demand Ingestion",
    icon: "🏭",
    badge: "Macro Ingestion",
    route: "/dashboard",
    metrics: [
      { label: "Sectors Tracked", value: "8 Key Domains", color: "text-blue-400" },
      { label: "Growth Velocity", value: "+34% YoY (Cloud/AI)", color: "text-emerald-400" }
    ],
    detailText: "Monitors economic corridors across IT, BFSI, Auto, and Manufacturing in Maharashtra to anticipate where hiring demand will peak.",
    evidenceSample: "Pune & Mumbai IT/Cloud investment surge indicated 42% growth in cloud-native workloads.",
    actionItem: "Feed regional investment signals into vacancy ingestion crawlers."
  },
  {
    id: 2,
    number: "02",
    title: "Job & Employer Signals",
    shortDesc: "Scrapes 14,800+ live recruiter postings and ingests structured surveys from 48+ hiring partners.",
    category: "Demand Ingestion",
    icon: "📡",
    badge: "Telemetry Engine",
    route: "/employers",
    metrics: [
      { label: "Job Postings", value: "14,820 Active", color: "text-purple-400" },
      { label: "Partner Network", value: "48 Enterprises", color: "text-blue-400" }
    ],
    detailText: "Continuous ingestion from TCS, Infosys, Wipro, L&T, and recruitment platforms ensures fresh demand telemetry updated hourly.",
    evidenceSample: "980 open vacancies detected for Cloud Engineers requiring multi-cloud & Docker experience.",
    actionItem: "Normalize job descriptions into standardized competency taxonomy."
  },
  {
    id: 3,
    number: "03",
    title: "Skill Extraction",
    shortDesc: "NLP algorithms extract granular technical skills, proficiencies, tools, and certifications from job postings.",
    category: "Demand Ingestion",
    icon: "🔬",
    badge: "NLP Parsing",
    route: "/skill-matrix",
    metrics: [
      { label: "Skills Extracted", value: "320+ Competencies", color: "text-cyan-400" },
      { label: "Taxonomy Match", value: "98.4% Accuracy", color: "text-emerald-400" }
    ],
    detailText: "Parses unstructured vacancy text to distinguish between foundational requirements (e.g. Python) and high-value emerging modules (e.g. RAG Pipelines, Kubernetes).",
    evidenceSample: "Kubernetes extracted in 71% of cloud job postings; LangChain in 64% of AI roles.",
    actionItem: "Map extracted skills to the State Vocational Qualifications Framework."
  },
  {
    id: 4,
    number: "04",
    title: "Demand-Supply Analysis",
    shortDesc: "Cross-references industry demand against annual enrolled student cohorts across all 36 state districts.",
    category: "AI Intelligence",
    icon: "⚖️",
    badge: "Differential Radar",
    route: "/skill-matrix",
    metrics: [
      { label: "State Trainees", value: "12,400 Tracked", color: "text-blue-400" },
      { label: "Balance Index", value: "62/100 Balanced", color: "text-amber-400" }
    ],
    detailText: "Quantifies the exact mathematical deficit between corporate talent requisitions and trained candidate output by sector and district.",
    evidenceSample: "Cloud demand index (87) exceeds trained supply capacity (51) by 36 points.",
    actionItem: "Flag critical shortages to the Curriculum Modernization Committee."
  },
  {
    id: 5,
    number: "05",
    title: "Skill Gap Detection",
    shortDesc: "Classifies deficits into Critical, High, Moderate, and Oversupplied severity bands.",
    category: "AI Intelligence",
    icon: "🎯",
    badge: "Gap Radar",
    route: "/skill-gaps",
    metrics: [
      { label: "Critical Gaps", value: "2 Major Deficits", color: "text-rose-400" },
      { label: "Oversupplied", value: "1 Track Flagged", color: "text-cyan-400" }
    ],
    detailText: "Flags urgent bottlenecks like Generative AI (+54% gap) while identifying redundant legacy tracks like Basic Typing (-51% oversupplied).",
    evidenceSample: "Basic Computer Applications has 3.2x more capacity than industry demand.",
    actionItem: "Generate automated Policy Intervention Alerts for Government Administrators."
  },
  {
    id: 6,
    number: "06",
    title: "Course Mapping",
    shortDesc: "Maps every identified deficit directly to active courses and calculates Course Modernization Scores (0–100).",
    category: "AI Intelligence",
    icon: "🗺️",
    badge: "Catalog Linker",
    route: "/courses",
    metrics: [
      { label: "Courses Tracked", value: "10 Core Tracks", color: "text-blue-400" },
      { label: "Avg Alignment", value: "76.8 / 100", color: "text-emerald-400" }
    ],
    detailText: "Determines which specific vocational syllabus units are causing the mismatch, pinpointing outdated modules like PHP 5 and missing modules like Docker.",
    evidenceSample: "Course CRS-003 scored 64/100 due to absence of container orchestration and IaC.",
    actionItem: "Trigger Course Decision Engine: Modernize, Reduce Seats, or Keep."
  },
  {
    id: 7,
    number: "07",
    title: "AI Curriculum Recommendation",
    shortDesc: "Generates module-by-module Keep / Modify / Remove / Add upgrade plans with lab hour requirements.",
    category: "AI Intelligence",
    icon: "🤖",
    badge: "AI Syllabus Auditor",
    route: "/curriculum-advisor",
    metrics: [
      { label: "AI Recommendations", value: "24 Active Modules", color: "text-purple-400" },
      { label: "Avg Placement Boost", value: "+18% Projected", color: "text-emerald-400" }
    ],
    detailText: "Provides syllabus revisions, practical cloud lab exercises, required industry certifications, and trainer upskilling blueprints in seconds.",
    evidenceSample: "CRS-003 upgrade adds 24-hr K8s lab, 18-hr Terraform unit, and recovers 20 hours from legacy topics.",
    actionItem: "Submit proposed syllabus to employer validation network for digital sign-off."
  },
  {
    id: 8,
    number: "08",
    title: "Capacity & Trainer Planning",
    shortDesc: "Calculates trainer upskilling quotas, lab capex investments, and required software/equipment.",
    category: "Action & Planning",
    icon: "👥",
    badge: "Resource Planner",
    route: "/capacity-planner",
    metrics: [
      { label: "Trainer Deficit", value: "27 Instructors", color: "text-amber-400" },
      { label: "Lab Capex Needed", value: "₹48.5 Lakhs", color: "text-blue-400" }
    ],
    detailText: "Prevents paper-only curriculum updates by calculating instructor certifications and virtual sandbox equipment required before launching courses.",
    evidenceSample: "Cloud & DevOps track requires 7 certified instructors and 4 Linux/K8s sandbox upgrades.",
    actionItem: "Schedule faculty bootcamps with AWS/Google Cloud partners."
  },
  {
    id: 9,
    number: "09",
    title: "District Training Plan",
    shortDesc: "Decentralizes seat allocations and funding quotas tailored to local district industrial clusters.",
    category: "Action & Planning",
    icon: "📍",
    badge: "District Quotas",
    route: "/district-plans",
    metrics: [
      { label: "Districts Mapped", value: "8 Core Clusters", color: "text-emerald-400" },
      { label: "Seat Adjustments", value: "+1,250 Modern", color: "text-cyan-400" }
    ],
    detailText: "Tailors Pune for IT/AI (+30% seats), Mumbai for BFSI Security (+25%), and Nashik for Industrial Automation (+40%), avoiding one-size-fits-all quotas.",
    evidenceSample: "Pune allocated +150 GenAI seats; Solapur prioritized for Solar Grid Maintenance.",
    actionItem: "Export printable Executive Briefing for District Vocational Officers."
  },
  {
    id: 10,
    number: "10",
    title: "Placement Tracking",
    shortDesc: "Tracks graduate employment, starting salaries, hiring roles, and time-to-hire in real-time.",
    category: "Feedback & Polish",
    icon: "🎯",
    badge: "Outcome Telemetry",
    route: "/placement-analytics",
    metrics: [
      { label: "State Placement", value: "67.4% Current", color: "text-emerald-400" },
      { label: "Modernized Courses", value: "88.2% Placement", color: "text-purple-400" }
    ],
    detailText: "Closes the feedback loop by verifying whether modernized courses achieve the projected 80%+ placement rates and higher starting salaries.",
    evidenceSample: "Graduates of modernized Python API track achieved 89% placement at ₹6.8 LPA average package.",
    actionItem: "Feed verified placement conversion rates back into course scoring."
  },
  {
    id: 11,
    number: "11",
    title: "Employer Feedback",
    shortDesc: "Surveys hiring managers on graduate productivity, missing practical skills, and on-the-job readiness.",
    category: "Feedback & Polish",
    icon: "💬",
    badge: "Employer Validation",
    route: "/employers",
    metrics: [
      { label: "Satisfaction Rate", value: "78.4% Recruiter", color: "text-blue-400" },
      { label: "Feedback Signals", value: "48 Surveys", color: "text-emerald-400" }
    ],
    detailText: "Allows corporate partners to rate syllabus relevance, request emerging competencies (e.g. AI Agents), and register direct hiring pipelines.",
    evidenceSample: "78% of surveyed employers approved the modernized Next.js & TypeScript syllabus.",
    actionItem: "Incorporate employer requested skills into the next quarterly curriculum review."
  },
  {
    id: 12,
    number: "12",
    title: "Continuous Curriculum Update",
    shortDesc: "Translates feedback into recurring quarterly course modernizations, eliminating multi-year syllabus lag.",
    category: "Feedback & Polish",
    icon: "🔄",
    badge: "Continuous Loop",
    route: "/policy-decisions",
    metrics: [
      { label: "Update Cycle", value: "Quarterly (90 Days)", color: "text-cyan-400" },
      { label: "Skill Mismatch", value: "-48% Projected", color: "text-emerald-400" }
    ],
    detailText: "Replaces traditional 3-5 year bureaucratic syllabus revision cycles with continuous data-driven micro-updates and policy recommendations.",
    evidenceSample: "State alignment index improved from 58% to 87% within 2 evaluation cycles.",
    actionItem: "Feed updated course standards back to Step 01 to maintain continuous alignment."
  }
];

export default function IntelligenceLoop() {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const activeStage = LOOP_STAGES.find((s) => s.id === activeStageId) || LOOP_STAGES[0];

  return (
    <div className="glass-card p-6 sm:p-8 border-blue-500/30 relative overflow-hidden shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
              CENTRAL INTELLIGENCE PIPELINE
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-mono">12 Connected Stages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            The Complete Labour-Market Intelligence Loop
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
            An end-to-end translation mechanism converting live employer signals into modernized curricula, trained faculty, district seat allocations, and verified placements.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            Stage <strong className="text-white font-bold">{activeStage.number}</strong> of 12
          </span>
        </div>
      </div>

      {/* 12-Stage Visual Stepper Bar */}
      <div className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
          {LOOP_STAGES.map((st) => {
            const isActive = st.id === activeStageId;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStageId(st.id)}
                className={`text-left p-2.5 rounded-xl border transition-all relative group flex flex-col justify-between ${
                  isActive
                    ? "bg-gradient-to-b from-blue-900/60 to-indigo-950/80 border-blue-400 shadow-lg shadow-blue-500/20 ring-1 ring-blue-400"
                    : "bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? "text-blue-300" : "text-slate-500"}`}>
                    {st.number}
                  </span>
                  <span className="text-base group-hover:scale-110 transition-transform">{st.icon}</span>
                </div>
                <p className={`text-[11px] font-bold leading-tight line-clamp-2 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                  {st.title}
                </p>

                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-blue-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep Dive Card */}
      <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Summary & Details (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                {activeStage.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400">PHASE {activeStage.number}</span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-[11px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {activeStage.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {activeStage.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {activeStage.shortDesc}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                How It Operates in SkillBridge:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStage.detailText}
              </p>
            </div>

            {/* Evidence & Action Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40">
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block mb-1">
                  🔍 Live Telemetry Signal:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeStage.evidenceSample}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                  ⚡ Downstream Action Generated:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeStage.actionItem}
                </p>
              </div>
            </div>
          </div>

          {/* Right Metrics & Quick Jump (5 cols) */}
          <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Stage {activeStage.number} Telemetry KPIs
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Telemetry
              </span>
            </div>

            {/* Metrics list */}
            <div className="grid grid-cols-2 gap-3">
              {activeStage.metrics.map((m, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">{m.label}</span>
                  <p className={`text-base font-black font-mono mt-1 ${m.color || "text-white"}`}>
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation controls */}
            <div className="pt-2 space-y-2">
              <Link
                href={activeStage.route}
                className="btn-glow w-full justify-center text-xs py-2.5 flex items-center gap-2"
              >
                <span>Inspect {activeStage.title} Module</span>
                <span>➔</span>
              </Link>

              <div className="flex items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  disabled={activeStageId === 1}
                  onClick={() => setActiveStageId((prev) => Math.max(1, prev - 1))}
                  className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all text-center"
                >
                  ← Previous Stage
                </button>
                <button
                  type="button"
                  disabled={activeStageId === 12}
                  onClick={() => setActiveStageId((prev) => Math.min(12, prev + 1))}
                  className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-blue-300 hover:text-white bg-blue-900/30 hover:bg-blue-800/40 border border-blue-700/50 disabled:opacity-40 disabled:pointer-events-none transition-all text-center"
                >
                  Next Stage →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
