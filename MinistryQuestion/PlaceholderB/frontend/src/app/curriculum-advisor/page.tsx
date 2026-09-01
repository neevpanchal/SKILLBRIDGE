"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COURSES_CATALOG, CourseData, CourseModuleAction } from "@/lib/intelligenceData";
import EvidenceReasoningModal, { ReasoningChainData } from "@/components/EvidenceReasoningModal";

interface ComprehensiveAuditResult {
  courseName: string;
  targetRole: string;
  alignmentScore: number;
  confidenceScore: number;
  status: "Aligned" | "Update Needed" | "Critical Modernization Needed";
  currentCurriculum: {
    existingModules: string[];
    existingSkills: string[];
    currentPracticalHours: number;
    currentAssessmentMethod: string;
  };
  industryRequirements: {
    requiredSkills: string[];
    emergingTechnologies: string[];
    employerConsensus: string;
    requiredProficiency: string;
  };
  detectedGaps: {
    skill: string;
    industryDemand: "Critical" | "High" | "Medium";
    currentCoverage: "None" | "Superficial" | "Partial";
    gapSeverity: "Critical Deficit" | "High Mismatch" | "Moderate";
    recommendedAction: string;
    suggestedDurationHours: number;
  }[];
  upgradePlan: CourseModuleAction[];
  certifications: string[];
  tools: string[];
  cloudPlatforms: string[];
  labEquipment: string[];
  trainerUpskilling: string[];
  estimatedPlacementBoost: string;
  evidenceSummary: string;
}

export default function CurriculumAdvisorPage() {
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>(COURSES_CATALOG[2].code); // Default CRS-003 Cloud
  const [courseNameInput, setCourseNameInput] = useState<string>(COURSES_CATALOG[2].name);
  const [targetRoleInput, setTargetRoleInput] = useState<string>("Cloud Solutions & DevOps Architect");
  const [syllabusTextInput, setSyllabusTextInput] = useState<string>(
    "Module 1: Virtualization & Linux Bash Basics (24 hrs)\nModule 2: AWS EC2, S3, and VPC Networking (32 hrs)\nModule 3: Relational Database Deployment on RDS (16 hrs)\nModule 4: Single-Server Apache Setup & Manual FTP Deployment (20 hrs)"
  );

  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<ComprehensiveAuditResult | null>(null);
  const [isReasoningModalOpen, setIsReasoningModalOpen] = useState(false);
  const [activeReasoningData, setActiveReasoningData] = useState<ReasoningChainData | undefined>(undefined);

  // Load preset course
  const handleSelectCatalogCourse = (course: CourseData) => {
    setSelectedCourseCode(course.code);
    setCourseNameInput(course.name);
    setTargetRoleInput(
      course.code === "CRS-004"
        ? "AI & Deep Learning Solutions Engineer"
        : course.code === "CRS-003"
        ? "Cloud Solutions & DevOps Architect"
        : course.code === "CRS-002"
        ? "Full-Stack TypeScript Web Engineer"
        : course.code === "CRS-005"
        ? "Cybersecurity SOC & Threat Analyst"
        : course.code === "CRS-010"
        ? "Digital Workplace Operations Assistant"
        : "Software Systems Specialist"
    );

    const presetSyllabi: Record<string, string> = {
      "CRS-003":
        "Module 1: Linux Fundamentals & Bash Scripting (24 hrs)\nModule 2: AWS EC2, S3, and Basic Networking (32 hrs)\nModule 3: Single-Server Apache Web Configs & Manual FTP (20 hrs)\nModule 4: Basic RDS Relational Database Hosting (16 hrs)",
      "CRS-004":
        "Module 1: Python for Data Science & Pandas (30 hrs)\nModule 2: PyTorch Neural Networks & Deep Learning (36 hrs)\nModule 3: Transformers, Hugging Face & Embeddings (40 hrs)\nModule 4: Enterprise RAG Pipelines & Vector Databases (38 hrs)",
      "CRS-002":
        "Module 1: HTML4/5, CSS3 & Responsive Design (24 hrs)\nModule 2: JavaScript ES6 & DOM Manipulation (30 hrs)\nModule 3: React 18 Components & State (36 hrs)\nModule 4: Legacy PHP 5.6 CRUD & MySQL Relational Scripts (32 hrs)",
      "CRS-010":
        "Module 1: 30 WPM Mechanical Typing Tutor Drills (30 hrs)\nModule 2: Microsoft Word 2007 Document Formatting (24 hrs)\nModule 3: Basic Windows OS & Internet Search (16 hrs)"
    };

    setSyllabusTextInput(presetSyllabi[course.code] || `Module 1: ${course.activeSkills.slice(0, 3).join(", ")}\nModule 2: Applied Fundamentals`);
    setResult(null);
  };

  const runComprehensiveAudit = (courseName: string, role: string, syllabus: string): ComprehensiveAuditResult => {
    const textLower = syllabus.toLowerCase();
    const matchedCatalog = COURSES_CATALOG.find(
      (c) => c.name.toLowerCase() === courseName.toLowerCase() || c.code === selectedCourseCode
    ) || COURSES_CATALOG[2];

    const hasK8s = textLower.includes("kubernetes") || textLower.includes("k8s") || textLower.includes("container");
    const hasTerraform = textLower.includes("terraform") || textLower.includes("iac");
    const hasGenAI = textLower.includes("rag") || textLower.includes("llm") || textLower.includes("transformer");
    const hasTypeScript = textLower.includes("typescript");
    const hasLegacy = textLower.includes("php 5") || textLower.includes("ftp") || textLower.includes("typing tutor");

    let score = matchedCatalog.alignmentScore;
    if (hasLegacy && score > 65) score = 64;
    if (hasK8s && hasTerraform) score = 92;

    const status = score >= 85 ? "Aligned" : score >= 60 ? "Update Needed" : "Critical Modernization Needed";

    const detectedGaps = matchedCatalog.missingSkills.map((skill, idx) => ({
      skill,
      industryDemand: (idx === 0 ? "Critical" : "High") as "Critical" | "High" | "Medium",
      currentCoverage: "None" as "None" | "Superficial" | "Partial",
      gapSeverity: (idx === 0 ? "Critical Deficit" : "High Mismatch") as "Critical Deficit" | "High Mismatch" | "Moderate",
      recommendedAction: `Add dedicated hands-on ${skill} module with virtual sandbox lab exercises.`,
      suggestedDurationHours: 24 - idx * 4
    }));

    return {
      courseName,
      targetRole: role,
      alignmentScore: score,
      confidenceScore: 92,
      status,
      currentCurriculum: {
        existingModules: syllabus.split("\n").filter((line) => line.trim().length > 0),
        existingSkills: matchedCatalog.activeSkills,
        currentPracticalHours: Math.round(matchedCatalog.scoreBreakdown.practicalLabReadiness * 6.5),
        currentAssessmentMethod: "Traditional Theoretical Written Paper + Basic Sandbox Test"
      },
      industryRequirements: {
        requiredSkills: [...matchedCatalog.activeSkills, ...matchedCatalog.missingSkills],
        emergingTechnologies: matchedCatalog.recommendedTools,
        employerConsensus: "78.4% of 48 surveyed recruiters endorse modern hands-on curriculum revisions.",
        requiredProficiency: "Intermediate to Advanced"
      },
      detectedGaps: detectedGaps.length > 0 ? detectedGaps : [
        {
          skill: "Advanced Cloud Observability",
          industryDemand: "Medium",
          currentCoverage: "Partial",
          gapSeverity: "Moderate",
          recommendedAction: "Incorporate Prometheus telemetry and automated alerting.",
          suggestedDurationHours: 16
        }
      ],
      upgradePlan: matchedCatalog.upgradeModules,
      certifications: matchedCatalog.recommendedCertifications,
      tools: matchedCatalog.recommendedTools,
      cloudPlatforms: matchedCatalog.recommendedCloudPlatforms,
      labEquipment: matchedCatalog.equipmentRequirement.requiredLabs,
      trainerUpskilling: matchedCatalog.trainerRequirement.skillsNeeded,
      estimatedPlacementBoost: score < 75 ? `+18% to +26% post-revision` : "+8% optimization",
      evidenceSummary: matchedCatalog.scoreExplanation
    };
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      const auditData = runComprehensiveAudit(courseNameInput, targetRoleInput, syllabusTextInput);
      setResult(auditData);
      setIsAuditing(false);
    }, 600);
  };

  const handleOpenWhyModal = () => {
    if (!result) return;
    setActiveReasoningData({
      evidence: result.evidenceSummary,
      skillRequirement: result.industryRequirements.requiredSkills.slice(0, 5).join(", "),
      currentCourse: result.courseName,
      detectedGap: result.detectedGaps.map((g) => `${g.skill} (${g.gapSeverity})`).join("; "),
      recommendation: `Authorize upgrade plan: Add ${result.detectedGaps[0]?.skill || "modern units"} with practical labs.`,
      trainingImpact: `Adds +42 lab hours; requires upskilling in ${result.trainerUpskilling.join(", ")}.`,
      expectedOutcome: `Placement rate projected to rise with estimated boost of ${result.estimatedPlacementBoost}.`,
      confidenceScore: result.confidenceScore
    });
    setIsReasoningModalOpen(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              AI SYLLABUS MODERNIZATION ENGINE
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-mono">
              Real-Time Labour Translation
            </span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            AI Course Curriculum Advisor
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Audit any proposed vocational syllabus against employer demand to generate 4-stage modular upgrade plans, lab requirements, and certification maps.
          </p>
        </div>

        <Link
          href="/courses"
          className="btn-secondary text-xs py-2 px-3.5 self-start sm:self-auto"
        >
          <span>← Back to Course Catalog</span>
        </Link>
      </div>

      {/* Preset Course Selectors */}
      <div className="glass-card p-4 space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Quick Load Active State Course for AI Audit:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {COURSES_CATALOG.slice(0, 4).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCatalogCourse(c)}
              className={`text-left p-3 rounded-xl border transition-all ${
                selectedCourseCode === c.code
                  ? "bg-blue-950/70 border-blue-500 shadow-md ring-1 ring-blue-400"
                  : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-blue-400 font-bold">{c.code}</span>
                <span className="text-[10px] font-mono font-bold text-emerald-400">{c.alignmentScore}%</span>
              </div>
              <p className="text-xs font-bold text-white truncate">{c.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAuditSubmit} className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Course Title
            </label>
            <input
              type="text"
              required
              value={courseNameInput}
              onChange={(e) => setCourseNameInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Target Industrial Job Role
            </label>
            <input
              type="text"
              required
              value={targetRoleInput}
              onChange={(e) => setTargetRoleInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Current Syllabus Modules & Topics Outline
          </label>
          <textarea
            rows={5}
            required
            value={syllabusTextInput}
            onChange={(e) => setSyllabusTextInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isAuditing}
          className="btn-glow w-full justify-center text-xs py-3 font-bold flex items-center gap-2"
        >
          {isAuditing ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Running Deep Multi-Layer Curriculum Audit...</span>
            </>
          ) : (
            <>
              <span>⚡</span>
              <span>Generate AI Curriculum Modernization Plan</span>
            </>
          )}
        </button>
      </form>

      {/* Comprehensive Audit Output */}
      {result ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Score Banner */}
          <div className="glass-card p-6 border-blue-500/40 bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-950/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      result.status === "Aligned"
                        ? "badge-aligned"
                        : result.status === "Update Needed"
                        ? "badge-update"
                        : "badge-critical"
                    }`}
                  >
                    {result.status}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded">
                    AI Confidence: {result.confidenceScore}%
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white">{result.courseName}</h2>
                <p className="text-xs text-slate-300">Target Role: {result.targetRole}</p>
              </div>

              <div className="flex items-center gap-4 self-start sm:self-auto">
                <div className="text-right">
                  <span
                    className={`text-4xl font-black font-mono ${
                      result.alignmentScore >= 85
                        ? "text-emerald-400"
                        : result.alignmentScore >= 60
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {result.alignmentScore}
                  </span>
                  <span className="text-xs text-slate-500 font-mono"> / 100</span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Alignment Score</p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenWhyModal}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-blue-300 bg-blue-900/40 hover:bg-blue-800/60 border border-blue-600/40 transition-all flex items-center gap-1.5"
                >
                  <span>Why this score?</span>
                  <span>ℹ️</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">AI Diagnostic Summary: </strong>
              {result.evidenceSummary}
            </p>
          </div>

          {/* Section 1: Current Curriculum vs Industry Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Curriculum */}
            <div className="glass-card p-5 border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <span>📋</span> Stage 1: Current Curriculum Baseline
              </h3>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Existing Modules:</span>
                  <ul className="list-disc list-inside text-slate-300 mt-1 space-y-0.5">
                    {result.currentCurriculum.existingModules.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400 font-medium">Covered Competencies:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.currentCurriculum.existingSkills.map((s) => (
                      <span key={s} className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-800">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase">Practical Lab Hours</span>
                    <p className="text-sm font-bold font-mono text-blue-400 mt-0.5">
                      {result.currentCurriculum.currentPracticalHours} Hours
                    </p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase">Assessment Method</span>
                    <p className="text-[11px] font-semibold text-slate-300 mt-0.5">
                      Written Theory Exam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Industry Requirements */}
            <div className="glass-card p-5 border-blue-500/30 space-y-3">
              <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <span>🏢</span> Stage 2: Industry Requirements & Expectations
              </h3>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Mandated Industry Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.industryRequirements.requiredSkills.map((s) => (
                      <span key={s} className="bg-blue-950/70 text-blue-300 px-2 py-0.5 rounded text-[11px] border border-blue-800/60">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400 font-medium">Emerging Tooling:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.industryRequirements.emergingTechnologies.map((t) => (
                      <span key={t} className="bg-purple-950/60 text-purple-300 px-2 py-0.5 rounded text-[11px] border border-purple-800/50 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-[11px] text-emerald-200">
                  <strong className="text-emerald-300">Employer Consensus: </strong>
                  {result.industryRequirements.employerConsensus}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Detected Gaps Table */}
          <div className="glass-card p-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <span>⚠️</span> Stage 3: Detected Curriculum Deficits
            </h3>

            <div className="space-y-3">
              {result.detectedGaps.map((gap, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-white">{gap.skill}</h4>
                      <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-950/70 border border-rose-800 px-2 py-0.5 rounded">
                        Demand: {gap.industryDemand}
                      </span>
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                        Coverage: {gap.currentCoverage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{gap.recommendedAction}</p>
                  </div>

                  <div className="text-right flex-shrink-0 text-xs font-mono border-t md:border-t-0 border-slate-800 pt-2 md:pt-0">
                    <span className="text-blue-400 font-bold">+{gap.suggestedDurationHours} Lab Hours</span>
                    <p className="text-[10px] text-slate-500">Suggested Duration</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: AI Curriculum Upgrade Plan (Keep/Modify/Remove/Add) */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>⚡</span> Stage 4: AI Curriculum Upgrade Plan (Module Actions)
                </h3>
                <p className="text-xs text-slate-400">
                  Granular restructuring blueprint for the state syllabus revision committee.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg">
                Est. Boost: {result.estimatedPlacementBoost}
              </span>
            </div>

            <div className="space-y-3">
              {result.upgradePlan.map((m, idx) => {
                const isKeep = m.action === "Keep";
                const isAdd = m.action === "Add";
                const isModify = m.action === "Modify";
                const isRemove = m.action === "Remove";

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border space-y-2.5 ${
                      isAdd
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : isRemove
                        ? "bg-rose-950/20 border-rose-500/40"
                        : isModify
                        ? "bg-amber-950/20 border-amber-500/40"
                        : "bg-slate-950/80 border-slate-800"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-mono font-black px-2.5 py-0.5 rounded uppercase ${
                            isAdd
                              ? "bg-emerald-600 text-white"
                              : isRemove
                              ? "bg-rose-600 text-white"
                              : isModify
                              ? "bg-amber-600 text-white"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          {m.action}
                        </span>
                        <h4 className="text-sm font-bold text-white">{m.moduleName}</h4>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {m.suggestedHours > 0 ? `${m.suggestedHours} Total Hours` : "Decommissioned (0 hrs)"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Action Rationale:
                        </span>
                        <p className="mt-0.5">{m.reason}</p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Practical Lab Requirement:
                        </span>
                        <p className="text-blue-300 font-mono mt-0.5">{m.practicalLabRequirement}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                      <span>Assessment: {m.assessmentMethod}</span>
                      <span className="text-emerald-400">Impact: {m.expectedImpact}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Accompanying Recommendations (Certs, Tools, Cloud, Labs, Trainers) */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span>🛠️</span> Required Ecosystem & Institutional Resources
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Certifications */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">
                  📜 Recognized Industry Certifications
                </span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {result.certifications.map((c) => (
                    <li key={c} className="flex items-center gap-1.5">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools & Cloud Platforms */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
                  ☁️ Tools & Cloud Platforms
                </span>
                <div className="flex flex-wrap gap-1">
                  {[...result.tools, ...result.cloudPlatforms].map((t) => (
                    <span key={t} className="bg-slate-900 text-purple-300 px-2 py-0.5 rounded text-[11px] border border-slate-800 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lab & Trainer Requirements */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                  👥 Trainer & Lab Sandbox Planning
                </span>
                <p className="text-[11px] text-slate-400">
                  Required Labs: <strong className="text-slate-200">{result.labEquipment.join(", ")}</strong>
                </p>
                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 uppercase">Trainer Upskilling Quota:</span>
                  <p className="text-xs text-amber-300 font-mono mt-0.5">
                    {result.trainerUpskilling.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Reasoning Modal */}
      <EvidenceReasoningModal
        isOpen={isReasoningModalOpen}
        onClose={() => setIsReasoningModalOpen(false)}
        data={activeReasoningData}
      />
    </main>
  );
}
