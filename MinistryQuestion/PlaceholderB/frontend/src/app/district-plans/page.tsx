"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DISTRICT_INTELLIGENCE_DATA, DistrictIntelligence } from "@/lib/intelligenceData";

export default function DistrictPlansPage() {
  const [districts] = useState<DistrictIntelligence[]>(DISTRICT_INTELLIGENCE_DATA);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictIntelligence>(DISTRICT_INTELLIGENCE_DATA[0]);
  const [copied, setCopied] = useState(false);

  const handlePrintBriefing = () => {
    window.print();
  };

  const handleCopyReport = () => {
    const reportText = `REGIONAL DISTRICT STRATEGIC TRAINING REPORT (2026)\nDistrict: ${selectedDistrict.district} (${selectedDistrict.regionCode})\nMajor Industries: ${selectedDistrict.majorIndustries.join(", ")}\nTotal Open Vacancies: ${selectedDistrict.totalVacancies.toLocaleString()}\nTop Roles: ${selectedDistrict.topRoles.join(", ")}\nTop Skills Demanded: ${selectedDistrict.topSkillsDemanded.join(", ")}\nCritical Skill Gap: ${selectedDistrict.criticalSkillGap}\nRecommended Seat Action: ${selectedDistrict.recommendedSeatAdjustment}\nTrainer Upskilling Quota: ${selectedDistrict.trainerUpskillQuota} Faculty\nLab Sandboxes to Upgrade: ${selectedDistrict.labUpgradesRequired} Labs\nVerified Placement Rate: ${selectedDistrict.placementRate}\nActive Trainees: ${selectedDistrict.activeTrainees.toLocaleString()}\nGenerated via SkillBridge AI Decision Intelligence Suite.`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              DECENTRALIZED CAPACITY ROADMAP
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">8 Core Industrial Clusters</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            District Strategic Training Plans
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Localized vocational seat quotas, faculty upskilling quotas, and lab infrastructure grants tailored to regional industrial corridors.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleCopyReport}
            className="btn-secondary text-xs py-2 px-3.5"
          >
            {copied ? "✓ Copied Briefing" : "Copy Briefing Text"}
          </button>
          <button
            onClick={handlePrintBriefing}
            className="btn-glow text-xs py-2 px-4"
          >
            🖨️ Export PDF Briefing
          </button>
        </div>
      </div>

      {/* Main Grid: District List (Left 5 cols) vs District Deep Dive Dossier (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: District Corridor Selector */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Select Regional Corridor
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              Click to inspect dossier
            </span>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {districts.map((d) => {
              const isSelected = selectedDistrict.id === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDistrict(d)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? "bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-950/40 ring-1 ring-blue-400"
                      : "bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{d.district}</h4>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                        {d.regionCode}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {d.placementRate}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-2 truncate">
                    {d.majorIndustries.slice(0, 2).join(" • ")}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-800/80 pt-2">
                    <span className="text-blue-400 font-semibold">{d.totalVacancies.toLocaleString()} Vacancies</span>
                    <span className="text-slate-400">{d.activeTrainees.toLocaleString()} Trainees</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Strategic Action Plan Dossier */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 border-blue-500/30 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                  DISTRICT DOSSIER • {selectedDistrict.regionCode}
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  {selectedDistrict.district} Strategic Training Roadmap
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Priority: <strong className="text-amber-300">{selectedDistrict.priorityLevel}</strong>
                </p>
              </div>

              <div className="text-right bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex-shrink-0">
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {selectedDistrict.placementRate}
                </span>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Placement Rate</p>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Open Vacancies</span>
                <p className="text-xl font-black text-blue-400 mt-0.5">
                  {selectedDistrict.totalVacancies.toLocaleString()}
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Active Trainees</span>
                <p className="text-xl font-black text-white mt-0.5">
                  {selectedDistrict.activeTrainees.toLocaleString()}
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Placements Recorded</span>
                <p className="text-xl font-black text-emerald-400 mt-0.5">
                  {selectedDistrict.placedTrainees.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Anchor Sectors & Demanded Competencies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Major Anchor Sectors
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDistrict.majorIndustries.map((ind) => (
                    <span
                      key={ind}
                      className="bg-slate-900 text-slate-200 border border-slate-700 px-2 py-0.5 rounded text-[11px]"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Top Demanded Competencies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDistrict.topSkillsDemanded.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-950/70 text-blue-300 border border-blue-800 px-2 py-0.5 rounded text-[11px]"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Quota & Capacity Interventions */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-3">
              <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Mandated District Policy Interventions
              </h4>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <span className="text-blue-400 font-bold">1.</span>
                  <div>
                    <strong className="text-white">Seat Quota Adjustment: </strong>
                    <span>{selectedDistrict.recommendedSeatAdjustment}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <span className="text-blue-400 font-bold">2.</span>
                  <div>
                    <strong className="text-white">Faculty Upskilling Quota: </strong>
                    <span>Schedule industry certification for <strong className="text-amber-300">{selectedDistrict.trainerUpskillQuota} instructors</strong>.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <span className="text-blue-400 font-bold">3.</span>
                  <div>
                    <strong className="text-white">Lab Infrastructure Grants: </strong>
                    <span>Upgrade <strong className="text-purple-300">{selectedDistrict.labUpgradesRequired} vocational institute labs</strong> with virtual sandboxes.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended New Programs */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Recommended New Program Launches for {selectedDistrict.district}:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedDistrict.recommendedNewCourses.map((crs) => (
                  <span
                    key={crs}
                    className="bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 px-3 py-1 rounded-lg text-xs font-semibold"
                  >
                    + {crs}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
