"use client";

import React, { useState } from "react";
import Link from "next/link";

interface SihDemoStep {
  stepNumber: number;
  title: string;
  badge: string;
  category: string;
  headline: string;
  narrative: string;
  visualData: {
    label: string;
    value: string;
    subtext: string;
    color?: string;
  }[];
  systemActionTaken: string;
  evidenceQuote: string;
  targetModuleRoute: string;
  targetModuleLabel: string;
}

const SIH_DEMO_STEPS: SihDemoStep[] = [
  {
    stepNumber: 1,
    title: "1. Demand Detected",
    badge: "Pune IT Hub • Q3 2026",
    category: "Macro Labour Demand",
    headline: "Surge in Cloud & AI Hiring in Pune Industrial Corridor",
    narrative: "SkillBridge telemetry crawlers detected 1,850 open tech vacancies across Pune (Hinjawadi, Magarpatta, Chakan). Hiring demand for Cloud Solutions and Generative AI specialists increased +42% YoY.",
    visualData: [
      { label: "Pune Vacancies", value: "1,850 Roles", subtext: "IT, Cloud & Auto Telemetry", color: "text-blue-400" },
      { label: "Cloud/AI Growth", value: "+42% YoY", subtext: "Highest in Maharashtra", color: "text-purple-400" },
      { label: "Average Salary", value: "₹7.8 – ₹8.5 LPA", subtext: "Verified Recruiter Benchmark", color: "text-emerald-400" }
    ],
    systemActionTaken: "Aggregated vacancy feeds from TCS, Infosys, Wipro, and Persistent Systems.",
    evidenceQuote: "1,250 postings mandate LLM fine-tuning and 980 postings require Kubernetes containerization.",
    targetModuleRoute: "/dashboard",
    targetModuleLabel: "View Executive Cockpit"
  },
  {
    stepNumber: 2,
    title: "2. Skill Gap Identified",
    badge: "Differential Radar",
    category: "Deficit Computation",
    headline: "Severe 54-Point Deficit in Cloud & GenAI Trained Talent",
    narrative: "Comparing corporate vacancy demand (Score 92) against existing state vocational supply (Score 38) reveals a massive 54-point talent shortage. Traditional colleges are producing generalists with no containerization or vector search skills.",
    visualData: [
      { label: "Industry Demand", value: "92 / 100", subtext: "High Employer Urgency", color: "text-rose-400" },
      { label: "State Supply", value: "38 / 100", subtext: "Trained Graduate Capacity", color: "text-amber-400" },
      { label: "Net Talent Gap", value: "+54 Deficit", subtext: "Critical Bottleneck", color: "text-rose-500" }
    ],
    systemActionTaken: "Flagged 'Cloud Computing' and 'Generative AI' as CRITICAL deficit priorities on state radar.",
    evidenceQuote: "Recruiters report rejecting 72% of applicants due to lack of practical cloud sandbox experience.",
    targetModuleRoute: "/skill-matrix",
    targetModuleLabel: "Explore Skill Intelligence Matrix"
  },
  {
    stepNumber: 3,
    title: "3. Courses Affected",
    badge: "Course Alignment Audit",
    category: "Curriculum Screening",
    headline: "Two Major Vocational Programs Scored with Urgent Alignment Deficits",
    narrative: "SkillBridge scanned the active course catalog and flagged 'Cloud Infrastructure & DevOps' (CRS-003, Alignment: 64/100) and 'Full-Stack Web Development' (CRS-002, Alignment: 78/100) for missing critical industry modules.",
    visualData: [
      { label: "CRS-003 Alignment", value: "64 / 100", subtext: "Update Required", color: "text-amber-400" },
      { label: "CRS-002 Alignment", value: "78 / 100", subtext: "Modernization Candidate", color: "text-yellow-400" },
      { label: "Legacy Office Typing", value: "28 / 100", subtext: "Oversupplied (-51% Gap)", color: "text-rose-400" }
    ],
    systemActionTaken: "Triggered the automated Course Decision Engine: MODERNIZE CRS-003 and REDUCE SEATS in CRS-010.",
    evidenceQuote: "CRS-003 syllabus still taught manual FTP deployment and lacked Docker/Kubernetes entirely.",
    targetModuleRoute: "/courses",
    targetModuleLabel: "Inspect Course Alignment Tracker"
  },
  {
    stepNumber: 4,
    title: "4. Employer Requirements",
    badge: "Industry Consultation",
    category: "Employer Validation",
    headline: "48 Recruiters Validate Missing Competencies",
    narrative: "Direct survey telemetry from TCS, Infosys, Wipro, and L&T confirmed exact employer needs: 38 employers requested Kubernetes, 34 requested RAG pipelines, and 27 requested Terraform IaC.",
    visualData: [
      { label: "Surveyed Employers", value: "48 Enterprises", subtext: "Maharashtra Hiring Network", color: "text-blue-400" },
      { label: "Kubernetes Requests", value: "38 Employers", subtext: "79.1% Recruiter Consensus", color: "text-emerald-400" },
      { label: "Curriculum Approval", value: "78.4% Endorsed", subtext: "Proposed Upgrade Draft", color: "text-purple-400" }
    ],
    systemActionTaken: "Incorporate employer validation feedback directly into syllabus modernization prompts.",
    evidenceQuote: "'Candidates need hands-on cluster debugging skills, not theoretical cloud slides.' — Infosys Lead Recruiter",
    targetModuleRoute: "/employers",
    targetModuleLabel: "View Employer Validation Network"
  },
  {
    stepNumber: 5,
    title: "5. AI Curriculum Recommendations",
    badge: "AI Syllabus Auditor",
    category: "Generative Modernization",
    headline: "Instant Module-by-Module Upgrade Plan Generated",
    narrative: "The AI Curriculum Advisor generated an upgraded syllabus for CRS-003 in 3 seconds: Add 24-hr Kubernetes Lab, Add 18-hr Terraform IaC Unit, Keep Cloud Fundamentals, and Remove 20 hours of manual server configs.",
    visualData: [
      { label: "Updated Alignment", value: "92 / 100", subtext: "Up from 64/100 (+28 pts)", color: "text-emerald-400" },
      { label: "Lab Hours Added", value: "+42 Practical Hrs", subtext: "Virtual Cloud Sandbox", color: "text-blue-400" },
      { label: "Recommended Credential", value: "CKA & AWS Arch", subtext: "Industry-recognized", color: "text-purple-400" }
    ],
    systemActionTaken: "Exported accredited syllabus module specifications ready for State Board authorization.",
    evidenceQuote: "Estimated placement rate jump from 82% to 94% with upgraded Kubernetes coursework.",
    targetModuleRoute: "/curriculum-advisor",
    targetModuleLabel: "Run AI Curriculum Advisor"
  },
  {
    stepNumber: 6,
    title: "6. Seat Allocation Recommendation",
    badge: "What-If Simulator",
    category: "Capacity Optimization",
    headline: "Simulating +300 Modern Seats & -65% Legacy Typing Cut",
    narrative: "The Policy Simulator modeled a reallocation strategy: Expand Cloud (+150 seats) and GenAI (+150 seats) in Pune while reducing oversupplied Basic Typing by -450 seats. Deficit drops by 48% with net-zero state budget increase.",
    visualData: [
      { label: "Cloud & AI Seats", value: "+300 Seats", subtext: "Pune & Mumbai Centers", color: "text-emerald-400" },
      { label: "Legacy Typing Seats", value: "-450 Seats", subtext: "Reallocate ₹28L Subsidy", color: "text-rose-400" },
      { label: "Projected Deficit", value: "Drops to 18%", subtext: "Down from 54% shortage", color: "text-blue-400" }
    ],
    systemActionTaken: "Generated balanced district seat quota schedule.",
    evidenceQuote: "Reallocating redundant typing budgets covers 100% of the new cloud compute credits.",
    targetModuleRoute: "/skill-gaps",
    targetModuleLabel: "Test Policy Simulator"
  },
  {
    stepNumber: 7,
    title: "7. Trainer Requirement",
    badge: "Faculty Capacity",
    category: "Trainer Planning",
    headline: "27 State Instructors Scheduled for Industry Upskilling",
    narrative: "Identified a 7-instructor deficit for Pune Cloud courses and 4 for GenAI. Generated a 4-week industry-sponsored bootcamp blueprint with AWS and Google Cloud to certify existing polytechnic faculty.",
    visualData: [
      { label: "Trainers Required", value: "18 Instructors", subtext: "For Expanded Pune Cohort", color: "text-blue-400" },
      { label: "Faculty Deficit", value: "7 Instructors", subtext: "Certified in Kubernetes/IaC", color: "text-amber-400" },
      { label: "Bootcamp Duration", value: "4 Weeks", subtext: "AWS & CKA Certified", color: "text-emerald-400" }
    ],
    systemActionTaken: "Created Trainer Capacity Planner schedule with institutional quotas.",
    evidenceQuote: "Partnering with AWS Academy provides free instructor training vouchers for state educators.",
    targetModuleRoute: "/capacity-planner",
    targetModuleLabel: "Open Trainer Capacity Planner"
  },
  {
    stepNumber: 8,
    title: "8. Equipment & Lab Requirement",
    badge: "Infrastructure Planning",
    category: "Lab Upgrades",
    headline: "Deploying 4 Containerized Virtual Cloud Sandboxes in Pune",
    narrative: "Calculated exact infrastructure capex: ₹12.0 Lakhs for virtual Kubernetes cluster nodes and high-memory Linux workstations across 4 Pune government vocational institutes.",
    visualData: [
      { label: "Labs Upgraded", value: "4 Pune Centers", subtext: "Government ITIs", color: "text-blue-400" },
      { label: "Estimated Capex", value: "₹12.0 Lakhs", subtext: "Funded via Seat Rebalancing", color: "text-emerald-400" },
      { label: "Lab Readiness", value: "9 / 10 Score", subtext: "Up from 5/10", color: "text-purple-400" }
    ],
    systemActionTaken: "Provisioned hardware and cloud credit budget breakdown.",
    evidenceQuote: "Cloud credits pool allows 500+ trainees to provision real AWS/K8s clusters simultaneously.",
    targetModuleRoute: "/capacity-planner",
    targetModuleLabel: "Inspect Equipment Planner"
  },
  {
    stepNumber: 9,
    title: "9. Projected Placement Improvement",
    badge: "Outcome Modeling",
    category: "Placement ROI",
    headline: "Projected 94% Placement & +₹2.2 LPA Graduate Salary Bump",
    narrative: "The mathematical forecasting engine projects Pune tech graduate placements will rise from 69% to 88.5%, with average starting salaries climbing from ₹4.8 LPA to ₹7.8 LPA.",
    visualData: [
      { label: "Baseline Placement", value: "69.0%", subtext: "Current Pune Average", color: "text-slate-400" },
      { label: "Projected Placement", value: "88.5%", subtext: "+19.5% Improvement", color: "text-emerald-400" },
      { label: "Recruiter Satisfaction", value: "89.0%", subtext: "Up from 74%", color: "text-purple-400" }
    ],
    systemActionTaken: "Fed projected cohort outcomes into the Policy Decision Center.",
    evidenceQuote: "Verified historical data from CRS-001 showed an 89% placement rate following similar API modernizations.",
    targetModuleRoute: "/placement-analytics",
    targetModuleLabel: "View Placement Analytics"
  },
  {
    stepNumber: 10,
    title: "10. District Action Plan",
    badge: "Policy Decision Center",
    category: "Executive Governance",
    headline: "Pune District Strategic Training Dossier Approved",
    narrative: "SkillBridge summarizes all findings into a unified executive action plan ready for the Director of Vocational Training to sign off. The entire 10-step intelligence loop is complete and repeatable.",
    visualData: [
      { label: "Immediate Actions", value: "6 Interventions", subtext: "Fully Costed & Scheduled", color: "text-blue-400" },
      { label: "District Dossier", value: "Pune Approved", subtext: "Exportable PDF Briefing", color: "text-emerald-400" },
      { label: "Confidence Score", value: "94.2% AI Model", subtext: "High Evidence Backing", color: "text-purple-400" }
    ],
    systemActionTaken: "Ready for one-click ministerial approval and district execution.",
    evidenceQuote: "A complete evidence-based decision pipeline delivered in under 3 minutes.",
    targetModuleRoute: "/policy-decisions",
    targetModuleLabel: "Go to Policy Decision Center"
  }
];

interface SihDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SihDemoModal({ isOpen, onClose }: SihDemoModalProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = SIH_DEMO_STEPS[activeStepIndex];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-blue-500/40 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col justify-between">
        {/* Top Floating Badge Bar */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400 flex items-center justify-center text-lg">
              🚀
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  SIH 2026 EVALUATION DEMO MODE
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-mono text-emerald-400">Realistic Pune Scenario</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                SkillBridge AI — End-to-End Decision Walkthrough
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator Timeline */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-800/80 bg-slate-950/60 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max pb-2">
            {SIH_DEMO_STEPS.map((s, idx) => {
              const isCurrent = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;
              return (
                <button
                  key={s.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400"
                      : isPast
                      ? "bg-slate-800/80 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300"
                  }`}
                >
                  <span>{isPast ? "✓" : s.stepNumber}</span>
                  <span className="truncate max-w-[120px]">{s.title.split(". ")[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 space-y-6 flex-1">
          {/* Header of Step */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                  STAGE {currentStep.stepNumber} OF 10
                </span>
                <span className="text-xs text-slate-600">•</span>
                <span className="text-[11px] font-semibold bg-blue-950 text-blue-300 border border-blue-800 px-2.5 py-0.5 rounded-full">
                  {currentStep.badge}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mt-1">
                {currentStep.headline}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-lg self-start sm:self-auto">
              Category: <strong className="text-slate-200">{currentStep.category}</strong>
            </span>
          </div>

          {/* Narrative Text */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2">
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {currentStep.narrative}
            </p>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentStep.visualData.map((v, i) => (
              <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  {v.label}
                </span>
                <p className={`text-2xl font-black font-mono mt-1 ${v.color || "text-white"}`}>
                  {v.value}
                </p>
                <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">{v.subtext}</span>
              </div>
            ))}
          </div>

          {/* System Action & Evidence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-1">
              <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider block">
                ⚡ SkillBridge Automated Action:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStep.systemActionTaken}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/40 space-y-1">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                🔍 Verified Telemetry Evidence:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{currentStep.evidenceQuote}"
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link
              href={currentStep.targetModuleRoute}
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-blue-300 bg-blue-950/60 border border-blue-800 hover:bg-blue-900/80 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>🔍 Open {currentStep.targetModuleLabel}</span>
              <span>➔</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              ← Previous Step
            </button>

            {activeStepIndex < SIH_DEMO_STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveStepIndex((prev) => Math.min(SIH_DEMO_STEPS.length - 1, prev + 1))}
                className="btn-glow text-xs py-2.5 px-6 font-bold flex items-center gap-2"
              >
                <span>Next Step ({activeStepIndex + 2}/10)</span>
                <span>➔</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <span>✓ Complete Demo Walkthrough</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
