"use client";

import React, { useState } from "react";
import { EMPLOYER_PARTNERS_DATA, EMPLOYER_SURVEY_SUMMARY, EmployerPartner } from "@/lib/intelligenceData";
import EmployerModal from "@/components/EmployerModal";

export default function EmployersPage() {
  const [employers, setEmployers] = useState<EmployerPartner[]>(EMPLOYER_PARTNERS_DATA);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Form state for Employer Feedback & Skill Request
  const [feedbackRole, setFeedbackRole] = useState("Cloud Solutions Architect");
  const [feedbackRating, setFeedbackRating] = useState("Approved (78% Industry Aligned)");
  const [requestedSkillInput, setRequestedSkillInput] = useState("Kubernetes Orchestration, Terraform IaC");
  const [expectedOpeningsInput, setExpectedOpeningsInput] = useState(45);
  const [requiredProficiency, setRequiredProficiency] = useState("Intermediate");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const totalOpenings = employers.reduce((acc, e) => acc + e.openings, 0);
  const totalHired = employers.reduce((acc, e) => acc + e.hired, 0);
  const avgSatisfaction = (
    employers.reduce((acc, e) => acc + e.satisfactionRate, 0) / (employers.length || 1)
  ).toFixed(1);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setIsFeedbackModalOpen(false);
    }, 2500);
  };

  const handleEmployerAdded = (newEmp: any) => {
    const formatted: EmployerPartner = {
      id: employers.length + 1,
      name: newEmp.name,
      industry: newEmp.industry,
      location: newEmp.location || "Maharashtra",
      partnershipTier: "Tier 2 Gold",
      openings: newEmp.openings || 50,
      hired: 0,
      satisfactionRate: 80,
      skillsNeeded: newEmp.skills_needed || ["Cloud", "Python"],
      validatedCoursesCount: 1,
      topRequestedSkills: ["Next.js", "Docker"]
    };
    setEmployers([formatted, ...employers]);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              INDUSTRY VALIDATION NETWORK
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-mono">
              {totalOpenings.toLocaleString()} Verified Open Vacancies
            </span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            Employer Demand Signals & Validation Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Recruiter consultation telemetry, requested competency requisitions, and digital curriculum sign-off pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-blue-300 bg-blue-950/80 border border-blue-700/60 hover:bg-blue-900 transition-all flex items-center gap-1.5"
          >
            <span>✍️ Submit Employer Validation</span>
          </button>

          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="btn-glow text-xs py-2.5 px-4"
          >
            <span>+ Register Hiring Pipeline</span>
          </button>
        </div>
      </div>

      {/* Aggregate Employer Survey Dashboard (Requirement #7) */}
      <div className="glass-card p-6 border-indigo-500/30 relative overflow-hidden bg-gradient-to-r from-indigo-950/30 via-slate-900/50 to-slate-950/80">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">📊</span>
              <h2 className="text-base font-bold text-white">
                Aggregated Recruiter Survey & Curriculum Endorsement Telemetry
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Derived from direct consultations with {EMPLOYER_SURVEY_SUMMARY.totalEmployersSurveyed} enterprise technology and manufacturing employers.
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
            Prototype Survey Dataset (Q3 2026)
          </span>
        </div>

        {/* Survey Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Validation Percentages (5 cols) */}
          <div className="md:col-span-5 space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Curriculum Endorsement Breakdown
            </span>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">✓ Approved (Direct Job Readiness)</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {EMPLOYER_SURVEY_SUMMARY.averageCurriculumApprovalRate}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${EMPLOYER_SURVEY_SUMMARY.averageCurriculumApprovalRate}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">⚠️ Needs Module Modernization</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {EMPLOYER_SURVEY_SUMMARY.needsModificationRate}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${EMPLOYER_SURVEY_SUMMARY.needsModificationRate}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">🚫 Not Industrially Relevant</span>
                  <span className="text-rose-400 font-mono font-bold">
                    {EMPLOYER_SURVEY_SUMMARY.notRelevantRate}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-rose-500 h-2 rounded-full"
                    style={{ width: `${EMPLOYER_SURVEY_SUMMARY.notRelevantRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Most Requested Competencies (7 cols) */}
          <div className="md:col-span-7 space-y-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Top Competencies Requested by Surveyed Recruiters
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EMPLOYER_SURVEY_SUMMARY.mostRequestedSkills.map((req) => (
                <div
                  key={req.skill}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{req.skill}</p>
                    <span className="text-[10px] text-slate-400">
                      {req.requestCount} of {EMPLOYER_SURVEY_SUMMARY.totalEmployersSurveyed} Employers Mandated
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      req.priority === "Critical"
                        ? "bg-rose-950/60 text-rose-300 border border-rose-800/60"
                        : "bg-blue-950/60 text-blue-300 border border-blue-800/60"
                    }`}
                  >
                    {req.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Absorption & Satisfaction Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Open Vacancies
          </span>
          <p className="text-3xl font-black text-blue-400 mt-1">{totalOpenings.toLocaleString()}</p>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
            Across {employers.length} Corporate Partners
          </span>
        </div>

        <div className="glass-card p-4 text-center border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Trainees Placed
          </span>
          <p className="text-3xl font-black text-emerald-400 mt-1">{totalHired.toLocaleString()}</p>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
            Verified Employment Records
          </span>
        </div>

        <div className="glass-card p-4 text-center border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Recruiter Satisfaction
          </span>
          <p className="text-3xl font-black text-purple-400 mt-1">{avgSatisfaction}%</p>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
            For Modernized Syllabus Alum
          </span>
        </div>

        <div className="glass-card p-4 text-center border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Feedback Consensus
          </span>
          <p className="text-3xl font-black text-cyan-400 mt-1">78.4%</p>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
            Accredited Curriculum Approval
          </span>
        </div>
      </div>

      {/* Corporate Partner Profiles List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>🏢</span> Active Hiring Partners & Required Competency Profiles
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {employers.length} Enterprise Networks
          </span>
        </div>

        <div className="space-y-3">
          {employers.map((e) => (
            <div
              key={e.id}
              className="glass-card p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-slate-700 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h4 className="text-base font-bold text-white">{e.name}</h4>
                  <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-medium">
                    {e.industry}
                  </span>
                  <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded font-mono">
                    {e.partnershipTier}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-2">
                  Region: <span className="text-slate-300">{e.location}</span> • Recruiter Satisfaction:{" "}
                  <strong className="text-emerald-400 font-mono font-bold">{e.satisfactionRate}%</strong> • Validated Curricula:{" "}
                  <span className="text-blue-400 font-mono font-bold">{e.validatedCoursesCount} Courses</span>
                </p>

                <div className="flex gap-1.5 flex-wrap items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Hiring For:</span>
                  {e.skillsNeeded.map((s) => (
                    <span
                      key={s}
                      className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded text-[11px] font-medium"
                    >
                      {s}
                    </span>
                  ))}
                  {e.topRequestedSkills.map((tr) => (
                    <span
                      key={tr}
                      className="bg-purple-950/40 text-purple-300 border border-purple-800/40 px-2 py-0.5 rounded text-[11px] font-medium"
                    >
                      + Requested: {tr}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right flex sm:flex-col justify-between sm:justify-center border-t lg:border-t-0 border-slate-800 pt-3 lg:pt-0 flex-shrink-0">
                <div>
                  <span className="text-2xl font-black text-white font-mono">{e.openings}</span>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Active Openings</p>
                </div>
                <p className="text-xs text-emerald-400 font-semibold mt-1">
                  {e.hired} Trainees Placed
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employer Feedback / Request Skill Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 relative">
            <button
              onClick={() => setIsFeedbackModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>

            <div className="mb-5 border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                EMPLOYER VALIDATION WORKFLOW
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Submit Industry Curriculum Feedback & Skill Requests
              </h3>
            </div>

            {feedbackSubmitted ? (
              <div className="p-6 text-center space-y-2 bg-emerald-950/40 border border-emerald-500/30 rounded-xl">
                <span className="text-3xl">✅</span>
                <h4 className="text-base font-bold text-white">Employer Feedback Submitted!</h4>
                <p className="text-xs text-slate-300">
                  Your skill request and curriculum validation ratings have been fed directly into the State Curriculum Modernization Engine.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Select Target Job Role
                  </label>
                  <select
                    value={feedbackRole}
                    onChange={(e) => setFeedbackRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Cloud Solutions Architect">Cloud Solutions & DevOps Architect</option>
                    <option value="Generative AI Developer">Generative AI & LLM Systems Engineer</option>
                    <option value="Cybersecurity SOC Analyst">Cybersecurity SOC & Threat Analyst</option>
                    <option value="Full-Stack Developer">Full-Stack TypeScript & Next.js Developer</option>
                    <option value="Industrial IoT Specialist">Industrial IoT & Smart Automation Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Rate Current Vocational Curriculum
                  </label>
                  <select
                    value={feedbackRating}
                    onChange={(e) => setFeedbackRating(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Approved">✓ Approved (85%+ Job Readiness)</option>
                    <option value="Needs Modernization">⚠️ Needs Modernization (Missing Modern Tools)</option>
                    <option value="Obsolete">🚫 Severely Obsolete (Requires Total Redesign)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Request New Competencies / Tools (Comma-separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={requestedSkillInput}
                    onChange={(e) => setRequestedSkillInput(e.target.value)}
                    placeholder="e.g. Kubernetes, RAG Pipelines, Docker, Terraform"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Expected Annual Openings
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="1000"
                      value={expectedOpeningsInput}
                      onChange={(e) => setExpectedOpeningsInput(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Required Proficiency
                    </label>
                    <select
                      value={requiredProficiency}
                      onChange={(e) => setRequiredProficiency(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Beginner">Beginner (Foundational)</option>
                      <option value="Intermediate">Intermediate (Project Ready)</option>
                      <option value="Advanced">Advanced (Independent Ops)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-glow w-full justify-center py-2.5 font-bold mt-4"
                >
                  Submit Employer Validation & Requisition →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Employer Registration Modal */}
      <EmployerModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onEmployerAdded={handleEmployerAdded}
      />
    </main>
  );
}
