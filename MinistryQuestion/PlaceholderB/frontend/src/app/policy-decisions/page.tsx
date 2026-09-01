"use client";

import React, { useState } from "react";
import Link from "next/link";
import { POLICY_DECISIONS_DATA, GovernmentPolicyAction } from "@/lib/intelligenceData";
import EvidenceReasoningModal, { ReasoningChainData } from "@/components/EvidenceReasoningModal";

export default function PolicyDecisionsPage() {
  const [actions, setActions] = useState<GovernmentPolicyAction[]>(POLICY_DECISIONS_DATA);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [activeReasoningData, setActiveReasoningData] = useState<ReasoningChainData | undefined>(undefined);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const approvedCount = actions.filter((a) => a.approved).length;
  const pendingCount = actions.filter((a) => !a.approved).length;

  const handleToggleApprove = (actionId: number) => {
    setActions((prev) =>
      prev.map((a) => {
        if (a.id === actionId) {
          const newStatus = !a.approved;
          if (newStatus) {
            setSuccessToast(`✓ Policy Action "${a.title}" officially authorized by Directorate!`);
            setTimeout(() => setSuccessToast(null), 3500);
          }
          return { ...a, approved: newStatus };
        }
        return a;
      })
    );
  };

  const handleViewEvidence = (action: GovernmentPolicyAction) => {
    setActiveReasoningData({
      evidence: action.evidenceSummary,
      skillRequirement: "Cross-checked with 48 enterprise employers and regional job vacancies.",
      currentCourse: action.affectedCourseOrSector,
      detectedGap: action.description,
      recommendation: action.title,
      trainingImpact: action.targetMetric,
      expectedOutcome: action.projectedROI,
      confidenceScore: 94
    });
    setIsEvidenceModalOpen(true);
  };

  const filteredActions = actions.filter((a) =>
    selectedCategory === "All" ? true : a.category === selectedCategory
  );

  const categories = [
    "All",
    "Curriculum Modernization",
    "Capacity Expansion",
    "Seat Reduction",
    "Trainer Upskilling",
    "Lab Infrastructure",
    "Employer Validation"
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              STATE GOVERNANCE COCKPIT
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-mono">
              Evidence-Based Policy Authorizations
            </span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            Policy Decision Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Executive control panel for state vocational training directors to authorize curriculum revisions, seat quotas, and trainer upskilling grants.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="badge-aligned px-3 py-1 rounded-full text-xs font-bold">
            {approvedCount} Authorized Actions
          </span>
          <span className="badge-update px-3 py-1 rounded-full text-xs font-bold">
            {pendingCount} Pending Review
          </span>
        </div>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center justify-between shadow-xl animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🏛️</span>
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Category Filter Bar */}
      <div className="glass-card p-4 flex items-center justify-between gap-4 flex-wrap">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Filter Interventions by Action Category:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Policy Action Cards Grid */}
      <div className="space-y-4">
        {filteredActions.map((action) => (
          <div
            key={action.id}
            className={`glass-card p-6 border transition-all ${
              action.approved
                ? "border-emerald-500/40 bg-emerald-950/15"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-mono font-bold text-blue-400">ACT-2026-0{action.id}</span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-[11px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {action.category}
                  </span>
                  <span className="text-[11px] font-mono text-amber-300 bg-amber-950/50 border border-amber-800 px-2 py-0.5 rounded">
                    {action.urgency}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{action.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sector/Course: <strong className="text-slate-200">{action.affectedCourseOrSector}</strong>
                </p>
              </div>

              {/* Status Badge & Primary Action */}
              <div className="flex items-center gap-3 self-start lg:self-auto">
                <button
                  type="button"
                  onClick={() => handleViewEvidence(action)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>🔍 View Evidence</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleApprove(action.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-lg ${
                    action.approved
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 ring-1 ring-blue-400"
                  }`}
                >
                  <span>{action.approved ? "✓ Authorized" : "⚡ Authorize Policy Action"}</span>
                </button>
              </div>
            </div>

            {/* Description & Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
              <div className="md:col-span-8 space-y-2">
                <p className="text-slate-300 leading-relaxed font-normal">
                  {action.description}
                </p>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400">
                  <span className="font-bold text-slate-300 uppercase tracking-wider block text-[10px] mb-0.5">
                    Verified Evidence Base:
                  </span>
                  <p className="text-slate-300">{action.evidenceSummary}</p>
                </div>
              </div>

              <div className="md:col-span-4 space-y-2.5 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Target Policy Metric:
                  </span>
                  <p className="text-xs font-mono font-bold text-blue-400 mt-0.5">
                    {action.targetMetric}
                  </p>
                </div>
                <div className="border-t border-slate-800/80 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Projected Outcome / ROI:
                  </span>
                  <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                    {action.projectedROI}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Evidence Reasoning Modal */}
      <EvidenceReasoningModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        data={activeReasoningData}
      />
    </main>
  );
}
