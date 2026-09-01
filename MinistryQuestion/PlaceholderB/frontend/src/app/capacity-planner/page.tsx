"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COURSES_CATALOG, CourseData } from "@/lib/intelligenceData";

export default function CapacityPlannerPage() {
  const [courses] = useState<CourseData[]>(COURSES_CATALOG);
  const [filterType, setFilterType] = useState<"All" | "Trainer Deficit" | "Lab Gap">("All");

  const totalRequiredTrainers = courses.reduce((acc, c) => acc + c.trainerRequirement.required, 0);
  const totalAvailableTrainers = courses.reduce((acc, c) => acc + c.trainerRequirement.available, 0);
  const netTrainerGap = totalRequiredTrainers - totalAvailableTrainers;
  const coursesWithTrainerGap = courses.filter((c) => c.trainerRequirement.gap > 0).length;
  const coursesWithLabGap = courses.filter((c) => c.equipmentRequirement.labGap.length > 0).length;

  const filteredCourses = courses.filter((c) => {
    if (filterType === "Trainer Deficit") return c.trainerRequirement.gap > 0;
    if (filterType === "Lab Gap") return c.equipmentRequirement.labGap.length > 0;
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              FACULTY & INFRASTRUCTURE READINESS
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-mono">
              State Vocational Capacity Mapping
            </span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            Trainer & Equipment Capacity Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Evaluate instructor certified capacity, specialized virtual lab equipment, and Capex investment quotas before launching courses.
          </p>
        </div>

        <Link
          href="/policy-decisions"
          className="btn-glow text-xs py-2.5 px-4 self-start sm:self-auto"
        >
          <span>📋 View Policy Decision Center</span>
        </Link>
      </div>

      {/* Summary KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 border-amber-500/30 text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            State Trainer Deficit
          </span>
          <p className="text-3xl font-black text-amber-400 mt-1">
            {netTrainerGap} Instructors
          </p>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
            Across {coursesWithTrainerGap} technical tracks
          </span>
        </div>

        <div className="glass-card p-5 border-blue-500/30 text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Lab Upgrades Required
          </span>
          <p className="text-3xl font-black text-blue-400 mt-1">
            {coursesWithLabGap} Specialized Labs
          </p>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
            Virtual Cloud & IIoT Sandboxes
          </span>
        </div>

        <div className="glass-card p-5 border-emerald-500/30 text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Technical Faculty
          </span>
          <p className="text-3xl font-black text-emerald-400 mt-1">
            {totalAvailableTrainers} Certified
          </p>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
            Target: {totalRequiredTrainers} Instructors
          </span>
        </div>

        <div className="glass-card p-5 border-purple-500/30 text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Estimated Capex Required
          </span>
          <p className="text-3xl font-black text-purple-400 mt-1">
            ₹48.5 Lakhs
          </p>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
            Offset by Typing Seat Reallocations
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 glass-card p-4">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Filter Capacity Readiness:
        </span>
        <div className="flex items-center gap-2">
          {(["All", "Trainer Deficit", "Lab Gap"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === t
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table / Grid */}
      <div className="space-y-4">
        {filteredCourses.map((c) => {
          const hasTrainerGap = c.trainerRequirement.gap > 0;
          const hasTrainerSurplus = c.trainerRequirement.gap < 0;
          const hasLabGap = c.equipmentRequirement.labGap.length > 0;

          return (
            <div
              key={c.id}
              className="glass-card p-5 border-slate-800 space-y-4 hover:border-slate-700 transition-all"
            >
              {/* Row Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400">{c.code}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{c.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">{c.name}</h3>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      hasTrainerGap || hasLabGap ? "badge-update" : "badge-aligned"
                    }`}
                  >
                    {hasTrainerGap ? `Trainer Gap: -${c.trainerRequirement.gap}` : "Faculty Aligned"}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                    Capex: {c.equipmentRequirement.estimatedCapex}
                  </span>
                </div>
              </div>

              {/* Grid: Trainer Capacity vs Equipment Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Trainer Capacity Box */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>👥</span> Instructor Capacity
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Req: <strong className="text-white">{c.trainerRequirement.required}</strong> | Avail:{" "}
                      <strong className="text-slate-300">{c.trainerRequirement.available}</strong>
                    </span>
                  </div>

                  {hasTrainerGap && (
                    <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-900/40 text-[11px] text-amber-200">
                      ⚠️ <strong>Faculty Shortage: {c.trainerRequirement.gap} Certified Trainers needed.</strong>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {c.trainerRequirement.skillsNeeded.map((sn) => (
                          <span key={sn} className="bg-amber-900/40 text-amber-300 px-1.5 py-0.5 rounded font-mono text-[10px]">
                            {sn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {hasTrainerSurplus && (
                    <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-900/40 text-[11px] text-cyan-200">
                      ℹ️ <strong>Faculty Surplus: {Math.abs(c.trainerRequirement.gap)} traditional typing instructors available for digital upskilling.</strong>
                    </div>
                  )}

                  {!hasTrainerGap && !hasTrainerSurplus && (
                    <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-[11px] text-emerald-200">
                      ✓ Faculty capacity fully staffed for active cohort.
                    </div>
                  )}
                </div>

                {/* Equipment & Virtual Labs Box */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>🖥️</span> Equipment & Lab Sandbox
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Readiness Score: <strong className="text-white">{c.scoreBreakdown.practicalLabReadiness}/10</strong>
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1">
                    <p className="text-[11px] text-slate-400">
                      Required Labs: <span className="text-slate-200">{c.equipmentRequirement.requiredLabs.join(", ")}</span>
                    </p>
                    {hasLabGap ? (
                      <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-900/40 text-[11px] text-rose-200">
                        ⚠️ <strong>Missing Hardware / Sandboxes:</strong> {c.equipmentRequirement.labGap.join(", ")}
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-[11px] text-emerald-200">
                        ✓ All required virtual and physical lab sandboxes available.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recommended Policy Action Bar */}
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-blue-300 uppercase font-mono text-[11px]">
                    Recommended Capacity Action:
                  </span>
                  <p className="text-slate-200 mt-0.5">{c.policyActionDetails}</p>
                </div>
                <Link
                  href="/curriculum-advisor"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all whitespace-nowrap self-start sm:self-auto"
                >
                  Audit Syllabus ➔
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
