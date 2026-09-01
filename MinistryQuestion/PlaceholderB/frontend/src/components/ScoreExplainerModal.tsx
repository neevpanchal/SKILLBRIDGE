"use client";

import React from "react";
import { CourseData } from "@/lib/intelligenceData";

interface ScoreExplainerModalProps {
  course: CourseData | null;
  onClose: () => void;
}

export default function ScoreExplainerModal({ course, onClose }: ScoreExplainerModalProps) {
  if (!course) return null;

  const factors = [
    {
      name: "Skill Relevance",
      weight: "25% Weight",
      earned: course.scoreBreakdown.skillRelevance,
      max: 25,
      desc: "Measures whether active curriculum competencies match currently demanded industrial tools and frameworks.",
      color: "bg-blue-500",
      textColor: "text-blue-400"
    },
    {
      name: "Job-Market Demand",
      weight: "20% Weight",
      earned: course.scoreBreakdown.jobMarketDemand,
      max: 20,
      desc: "Derived from regional hiring volume, vacancy growth velocity, and recruitment advertisements in target districts.",
      color: "bg-indigo-500",
      textColor: "text-indigo-400"
    },
    {
      name: "Emerging Tech Coverage",
      weight: "15% Weight",
      earned: course.scoreBreakdown.emergingTechCoverage,
      max: 15,
      desc: "Evaluates inclusion of cutting-edge paradigms (e.g. LLMs, Kubernetes, Cloud Security, IIoT) over deprecated tools.",
      color: "bg-purple-500",
      textColor: "text-purple-400"
    },
    {
      name: "Employer Validation",
      weight: "15% Weight",
      earned: course.scoreBreakdown.employerValidation,
      max: 15,
      desc: "Aggregated approval ratings from corporate recruiter surveys and hiring partner curriculum reviews.",
      color: "bg-emerald-500",
      textColor: "text-emerald-400"
    },
    {
      name: "Placement Outcomes",
      weight: "15% Weight",
      earned: course.scoreBreakdown.placementOutcome,
      max: 15,
      desc: "Historical conversion of course graduates into full-time employment within 180 days of course completion.",
      color: "bg-cyan-500",
      textColor: "text-cyan-400"
    },
    {
      name: "Practical / Lab Readiness",
      weight: "10% Weight",
      earned: course.scoreBreakdown.practicalLabReadiness,
      max: 10,
      desc: "Ratio of hands-on virtual sandbox, simulator, or hardware workshop hours relative to theoretical lecture hours.",
      color: "bg-amber-500",
      textColor: "text-amber-400"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              ALGORITHM EXPLAINER: {course.code}
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                course.alignmentScore >= 85
                  ? "badge-aligned"
                  : course.alignmentScore >= 60
                  ? "badge-update"
                  : "badge-critical"
              }`}
            >
              {course.decisionStatus}
            </span>
          </div>

          <h2 className="text-2xl font-black text-white">{course.name}</h2>
          <p className="text-xs text-slate-400 mt-1">
            Industry Alignment Score Audit: <strong className="text-white font-mono">{course.alignmentScore} / 100</strong>
          </p>
        </div>

        {/* Summary Score Card */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Automated Score Rationale:
            </span>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              {course.scoreExplanation}
            </p>
          </div>

          <div className="text-center sm:text-right flex-shrink-0 bg-slate-900 px-5 py-3 rounded-xl border border-slate-800">
            <span className="text-3xl font-black font-mono text-emerald-400">
              {course.alignmentScore}
            </span>
            <span className="text-xs text-slate-500 font-mono"> / 100</span>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Composite Score</p>
          </div>
        </div>

        {/* 6-Factor Weighted Breakdown */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Weighted Component Matrix (100% Total)
          </h3>

          <div className="space-y-3">
            {factors.map((f) => (
              <div key={f.name} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{f.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {f.weight}
                    </span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${f.textColor}`}>
                    {f.earned} / {f.max} pts
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full ${f.color} rounded-full`}
                    style={{ width: `${(f.earned / f.max) * 100}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Decision Recommendation */}
        <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/50 mb-6 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Course Decision Engine Verdict:
            </span>
            <span className="text-xs font-mono font-black text-white bg-blue-600 px-2.5 py-0.5 rounded">
              ACTION: {course.recommendedAction}
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {course.policyActionDetails}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="btn-glow text-xs py-2.5 px-6 font-bold"
          >
            Close Audit Breakdown
          </button>
        </div>
      </div>
    </div>
  );
}
