"use client";

import React, { useState } from "react";
import Link from "next/link";
import SkillGapBar from "@/components/SkillGapBar";
import CurriculumSimulator from "@/components/CurriculumSimulator";
import { SKILL_INTELLIGENCE_DATA } from "@/lib/intelligenceData";

export default function SkillGapsPage() {
  const [activeTab, setActiveTab] = useState<"simulator" | "radar">("simulator");
  const [selectedSeverity, setSelectedSeverity] = useState("All");

  const skillGaps = SKILL_INTELLIGENCE_DATA.map((s) => ({
    id: s.id,
    skill: s.skill,
    demand: s.demandScore,
    supply: s.supplyScore,
    gap: s.gap,
    severity: s.priority === "CRITICAL" ? "Critical" : s.priority === "HIGH" ? "High" : s.priority === "MEDIUM" ? "Medium" : "Oversupplied",
    courses_count: s.mappedCourses.length,
    recommendation: s.evidenceText,
    growth_rate: s.growthRate,
    target_roles: s.targetRoles
  }));

  const filteredGaps = skillGaps.filter(
    (g) => selectedSeverity === "All" || g.severity === selectedSeverity
  );

  const criticalCount = skillGaps.filter((g) => g.severity === "Critical").length;
  const highCount = skillGaps.filter((g) => g.severity === "High").length;
  const mediumCount = skillGaps.filter((g) => g.severity === "Medium").length;
  const oversuppliedCount = skillGaps.filter((g) => g.severity === "Oversupplied").length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              POLICY SIMULATION RADAR
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">8 Core Competency Domains</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            Skill Gap Radar & Policy Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Model the systemic outcome of expanding seats, certifying trainers, and cutting oversupplied tracks.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === "simulator"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚡ What-If Policy Simulator
          </button>
          <button
            onClick={() => setActiveTab("radar")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === "radar"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🎯 Deficit Radar List
          </button>
        </div>
      </div>

      {/* Severity Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 border-rose-500/30 text-center">
          <p className="text-2xl font-black text-rose-400">{criticalCount}</p>
          <p className="text-xs font-bold text-slate-300 mt-0.5">Critical Deficits</p>
          <p className="text-[10px] text-slate-500">&gt;50% talent shortage</p>
        </div>

        <div className="glass-card p-4 border-amber-500/30 text-center">
          <p className="text-2xl font-black text-amber-400">{highCount}</p>
          <p className="text-xs font-bold text-slate-300 mt-0.5">High Gaps</p>
          <p className="text-[10px] text-slate-500">30% - 50% shortage</p>
        </div>

        <div className="glass-card p-4 border-yellow-500/30 text-center">
          <p className="text-2xl font-black text-yellow-400">{mediumCount}</p>
          <p className="text-xs font-bold text-slate-300 mt-0.5">Moderate Gaps</p>
          <p className="text-[10px] text-slate-500">15% - 30% shortage</p>
        </div>

        <div className="glass-card p-4 border-cyan-500/30 text-center">
          <p className="text-2xl font-black text-cyan-400">{oversuppliedCount}</p>
          <p className="text-xs font-bold text-slate-300 mt-0.5">Oversupplied</p>
          <p className="text-[10px] text-slate-500">Seat cut candidates</p>
        </div>
      </div>

      {/* Simulator or Radar View */}
      {activeTab === "simulator" ? (
        <div className="space-y-6">
          <CurriculumSimulator />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Severity Filter Pills */}
          <div className="glass-card p-4 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Filter by Deficit Severity:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {["All", "Critical", "High", "Medium", "Oversupplied"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedSeverity === sev
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Gap Cards List */}
          <div className="space-y-4">
            {filteredGaps.map((gap) => (
              <SkillGapBar
                key={gap.id}
                item={gap}
                showRecommendation={true}
                onSimulateClick={() => setActiveTab("simulator")}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
