"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SKILL_INTELLIGENCE_DATA, SkillItem } from "@/lib/intelligenceData";
import EvidenceReasoningModal, { ReasoningChainData } from "@/components/EvidenceReasoningModal";
import DataSourcesModal from "@/components/DataSourcesModal";

export default function SkillMatrixPage() {
  const [skills] = useState<SkillItem[]>(SKILL_INTELLIGENCE_DATA);
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedProficiency, setSelectedProficiency] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [timePeriod, setTimePeriod] = useState("Q3 2026");
  const [viewMode, setViewMode] = useState<"table" | "heatmap">("table");

  // Evidence modal state
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [activeReasoningData, setActiveReasoningData] = useState<ReasoningChainData | undefined>(undefined);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);

  // Filter skills
  const filteredSkills = skills.filter((item) => {
    const matchesSearch =
      item.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetRoles.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.keyMissingSubskills.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSector = selectedSector === "All" || item.sector === selectedSector;
    const matchesDistrict =
      selectedDistrict === "All" ||
      item.districtDemand.includes("All Districts") ||
      item.districtDemand.includes(selectedDistrict);
    const matchesProficiency =
      selectedProficiency === "All" || item.requiredProficiency === selectedProficiency;
    const matchesPriority = selectedPriority === "All" || item.priority === selectedPriority;

    return matchesSearch && matchesSector && matchesDistrict && matchesProficiency && matchesPriority;
  });

  const sectors = ["All", ...Array.from(new Set(skills.map((s) => s.sector)))];
  const districts = ["All", "Pune", "Mumbai Metropolitan", "Nagpur", "Nashik", "Chhatrapati Sambhajinagar", "Kolhapur"];

  const handleOpenReasoning = (item: SkillItem) => {
    setActiveReasoningData({
      evidence: item.evidenceText,
      skillRequirement: item.keyMissingSubskills.join(", "),
      currentCourse: item.mappedCourses[0] || "State Vocational Catalog",
      detectedGap: `${item.skill} shows a +${item.gap} demand-supply deficit with ${item.openings} open vacancies.`,
      recommendation: `Launch dedicated modernization track with ${item.requiredProficiency} certification vouchers.`,
      trainingImpact: `Projected +40 lab hours and seat expansion in ${item.districtDemand.slice(0, 2).join(", ")}.`,
      expectedOutcome: `Average salary absorption: ${item.avgSalary} with +${item.growthNum}% YoY growth velocity.`,
      confidenceScore: item.priority === "CRITICAL" ? 94 : item.priority === "HIGH" ? 89 : 82
    });
    setIsEvidenceModalOpen(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              LABOUR-MARKET DEFICIT MATRIX
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-mono">
              Simulated / Prototype Data
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
            Skill Intelligence Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Granular demand-supply differential index mapping emerging tech requirements, salary benchmarks, and district deficits.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsSourcesModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>ℹ️</span>
            <span>Data Transparency</span>
          </button>

          <Link href="/skill-gaps" className="btn-glow text-xs py-2 px-3.5">
            ⚡ What-If Policy Simulator
          </Link>
        </div>
      </div>

      {/* Simulated Prototype Banner */}
      <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-300">
          <span className="text-base">📊</span>
          <span>
            <strong className="text-white">Prototype Intelligence Engine:</strong> Metrics reflect synthesized regional job postings and employer survey forecasts for {timePeriod}.
          </span>
        </div>
        <div className="flex items-center gap-2">
          {["Q1 2026", "Q2 2026", "Q3 2026", "Annual Forecast"].map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                timePeriod === period
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Dimensional Filter Suite */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search skill, tool, or target job role (e.g. GenAI, Kubernetes, PLC, TypeScript)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <span className="absolute left-3 top-2.5 text-slate-500 text-sm">🔍</span>
          </div>

          {/* View mode toggle */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center text-xs self-start lg:self-auto">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === "table" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              📋 Intelligence Table
            </button>
            <button
              onClick={() => setViewMode("heatmap")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === "heatmap" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🔥 Deficit Heatmap
            </button>
          </div>
        </div>

        {/* Dropdowns row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Sector
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Proficiency
            </label>
            <select
              value={selectedProficiency}
              onChange={(e) => setSelectedProficiency(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Proficiencies</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Deficit Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Priorities</option>
              <option value="CRITICAL">🔴 CRITICAL</option>
              <option value="HIGH">🟠 HIGH</option>
              <option value="MEDIUM">🟡 MEDIUM</option>
              <option value="OVERSUPPLIED">🔵 OVERSUPPLIED</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Display: Heatmap or Table */}
      {viewMode === "heatmap" ? (
        /* Heatmap Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((item) => {
            const isCritical = item.priority === "CRITICAL";
            const isHigh = item.priority === "HIGH";
            const isOversupplied = item.priority === "OVERSUPPLIED";

            return (
              <div
                key={item.id}
                onClick={() => handleOpenReasoning(item)}
                className={`glass-card p-5 cursor-pointer transition-all hover:scale-[1.02] relative group ${
                  isCritical
                    ? "border-rose-500/50 bg-rose-950/20 shadow-lg shadow-rose-950/30"
                    : isHigh
                    ? "border-amber-500/40 bg-amber-950/20"
                    : isOversupplied
                    ? "border-cyan-500/40 bg-cyan-950/20"
                    : "border-slate-800 bg-slate-900/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isCritical
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                        : isHigh
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : isOversupplied
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                        : "bg-blue-500/20 text-blue-300 border-blue-500/40"
                    }`}
                  >
                    {item.priority}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-400">
                    {item.growthRate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {item.skill}
                </h3>
                <p className="text-[11px] text-slate-400 mb-3">{item.sector}</p>

                {/* Demand vs Supply Gauge */}
                <div className="space-y-1.5 mb-3 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Demand: <strong className="text-white font-mono">{item.demandScore}</strong></span>
                    <span className="text-slate-400">Supply: <strong className="text-slate-300 font-mono">{item.supplyScore}</strong></span>
                    <span className={`font-bold font-mono ${item.gap > 0 ? "text-rose-400" : "text-cyan-400"}`}>
                      {item.gap > 0 ? `+${item.gap} Gap` : `${item.gap} Surplus`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.gap > 45 ? "bg-rose-500" : item.gap > 25 ? "bg-amber-500" : "bg-cyan-400"
                      }`}
                      style={{ width: `${Math.min(100, (item.demandScore / 100) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <span>{item.openings} Openings</span>
                  <span className="font-mono text-emerald-400 font-bold">{item.avgSalary}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Full Intelligence Table View */
        <div className="glass-card p-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-bold">Skill Competency</th>
                <th className="pb-3 font-bold text-center">Industry Demand</th>
                <th className="pb-3 font-bold text-center">Trained Supply</th>
                <th className="pb-3 font-bold text-center">Deficit Gap</th>
                <th className="pb-3 font-bold text-center">YoY Growth</th>
                <th className="pb-3 font-bold text-center">Openings</th>
                <th className="pb-3 font-bold text-right">Avg Salary</th>
                <th className="pb-3 font-bold">District Demand</th>
                <th className="pb-3 font-bold text-center">Proficiency</th>
                <th className="pb-3 font-bold text-center">Priority</th>
                <th className="pb-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSkills.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/60 transition-colors group">
                  {/* Skill Name */}
                  <td className="py-3.5 pr-3">
                    <p className="font-bold text-white text-xs">{item.skill}</p>
                    <span className="text-[10px] text-slate-400">{item.sector}</span>
                  </td>

                  {/* Demand Score */}
                  <td className="py-3.5 px-2 text-center font-mono font-bold text-white">
                    <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      {item.demandScore}
                    </span>
                  </td>

                  {/* Supply Score */}
                  <td className="py-3.5 px-2 text-center font-mono text-slate-300">
                    <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      {item.supplyScore}
                    </span>
                  </td>

                  {/* Gap */}
                  <td className="py-3.5 px-2 text-center">
                    <span
                      className={`font-mono font-black px-2 py-0.5 rounded text-[11px] ${
                        item.gap > 45
                          ? "bg-rose-950/60 text-rose-300 border border-rose-800/60"
                          : item.gap > 25
                          ? "bg-amber-950/60 text-amber-300 border border-amber-800/60"
                          : item.gap < 0
                          ? "bg-cyan-950/60 text-cyan-300 border border-cyan-800/60"
                          : "bg-blue-950/60 text-blue-300 border border-blue-800/60"
                      }`}
                    >
                      {item.gap > 0 ? `+${item.gap}` : item.gap}
                    </span>
                  </td>

                  {/* Growth Rate */}
                  <td className="py-3.5 px-2 text-center font-mono font-bold text-emerald-400">
                    {item.growthRate}
                  </td>

                  {/* Openings */}
                  <td className="py-3.5 px-2 text-center font-mono font-bold text-slate-200">
                    {item.openings.toLocaleString()}
                  </td>

                  {/* Avg Salary */}
                  <td className="py-3.5 px-2 text-right font-mono font-bold text-emerald-300">
                    {item.avgSalary}
                  </td>

                  {/* Districts */}
                  <td className="py-3.5 px-2 text-slate-300 text-[11px]">
                    {item.districtDemand.join(", ")}
                  </td>

                  {/* Proficiency */}
                  <td className="py-3.5 px-2 text-center">
                    <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                      {item.requiredProficiency}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-2 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.priority === "CRITICAL"
                          ? "badge-critical"
                          : item.priority === "HIGH"
                          ? "badge-update"
                          : item.priority === "OVERSUPPLIED"
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                          : "badge-aligned"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  {/* Evidence Trigger */}
                  <td className="py-3.5 pl-2 text-right">
                    <button
                      onClick={() => handleOpenReasoning(item)}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all"
                    >
                      Explain ➔
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Evidence Reasoning Modal */}
      <EvidenceReasoningModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        data={activeReasoningData}
      />

      {/* Data Sources Modal */}
      <DataSourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
      />
    </main>
  );
}
