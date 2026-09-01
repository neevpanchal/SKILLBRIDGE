"use client";

import React from "react";
import Link from "next/link";
import { COURSES_CATALOG } from "@/lib/intelligenceData";

export default function PlacementAnalyticsPage() {
  const courses = COURSES_CATALOG;

  const totalEnrolled = courses.reduce((acc, c) => acc + c.enrolled, 0);
  const totalPlaced = courses.reduce((acc, c) => acc + c.placed, 0);
  const overallPlacementRate = Math.round((totalPlaced / (totalEnrolled || 1)) * 100);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OUTCOME VERIFICATION RADAR
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-mono">
              Training ➔ Placement Feedback Loop
            </span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            Placement Outcome Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Real-time telemetry tracking graduate hiring conversion, salary benchmarks, and employer satisfaction to feed continuous curriculum alignment.
          </p>
        </div>

        <Link
          href="/policy-decisions"
          className="btn-glow text-xs py-2.5 px-4 self-start sm:self-auto"
        >
          <span>📋 Policy Decision Center</span>
        </Link>
      </div>

      {/* Before vs After Impact Simulator (Requirement #14) */}
      <div className="glass-card p-6 border-blue-500/40 relative overflow-hidden bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-950/60 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <div>
              <h2 className="text-lg font-black text-white">
                Before ➔ After Policy Impact Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Macro-level state vocational health transformation through targeted course modernization and seat rebalancing.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg self-start sm:self-auto">
            Projected / Simulated Outcomes
          </span>
        </div>

        {/* 3-Stage Transformation Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Col 1: Current State (4 cols) */}
          <div className="lg:col-span-4 bg-slate-950/90 p-4 rounded-xl border border-rose-900/40 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                1. Current Baseline State
              </span>
              <span className="text-[10px] font-mono text-slate-500">Unreformed</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Skill Alignment</span>
                <p className="text-lg font-black font-mono text-rose-400 mt-0.5">58%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Placement Rate</span>
                <p className="text-lg font-black font-mono text-amber-400 mt-0.5">67%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Employer Satisfaction</span>
                <p className="text-lg font-black font-mono text-amber-400 mt-0.5">64%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">State Skill Gap</span>
                <p className="text-lg font-black font-mono text-rose-400 mt-0.5">42%</p>
              </div>
            </div>
          </div>

          {/* Col 2: SkillBridge Recommended Interventions (4 cols) */}
          <div className="lg:col-span-4 bg-blue-950/40 p-4 rounded-xl border border-blue-600/40 space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-blue-800/60 pb-2">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                2. Mandated Interventions
              </span>
              <span className="text-[10px] font-mono text-blue-400">AI Blueprint</span>
            </div>

            <ul className="space-y-1.5 text-slate-200">
              <li className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">✓</span>
                <span>Modernize <strong>8 vocational curricula</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">✓</span>
                <span>Launch <strong>3 emerging technology tracks</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">✓</span>
                <span>Upskill <strong>27 certified trainers</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">✓</span>
                <span>Upgrade <strong>14 virtual sandbox labs</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">✓</span>
                <span>Reallocate <strong>650 oversupplied seats</strong></span>
              </li>
            </ul>
          </div>

          {/* Col 3: Projected Scenario (4 cols) */}
          <div className="lg:col-span-4 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                3. Projected Scenario
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Simulated Target</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Skill Alignment</span>
                <p className="text-lg font-black font-mono text-emerald-400 mt-0.5">87%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Placement Rate</span>
                <p className="text-lg font-black font-mono text-emerald-400 mt-0.5">79%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">Employer Satisfaction</span>
                <p className="text-lg font-black font-mono text-emerald-400 mt-0.5">82%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400">State Skill Gap</span>
                <p className="text-lg font-black font-mono text-emerald-400 mt-0.5">19%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Placement Table */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🎓</span> Course-by-Course Placement Outcome Register
            </h3>
            <p className="text-xs text-slate-400">
              Correlating curriculum modernization score directly against verified hiring velocity.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            Overall Placement: <strong className="text-emerald-400">{overallPlacementRate}%</strong> ({totalPlaced.toLocaleString()} / {totalEnrolled.toLocaleString()})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-bold">Course Title & ID</th>
                <th className="pb-3 font-bold text-center">Alignment</th>
                <th className="pb-3 font-bold text-center">Enrolled</th>
                <th className="pb-3 font-bold text-center">Placed</th>
                <th className="pb-3 font-bold text-center">Placement Rate</th>
                <th className="pb-3 font-bold text-center">Avg Package</th>
                <th className="pb-3 font-bold text-center">Time to Hire</th>
                <th className="pb-3 font-bold text-center">Status</th>
                <th className="pb-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/60 transition-colors">
                  {/* Course Title */}
                  <td className="py-3.5 pr-3">
                    <p className="font-bold text-white text-xs">{c.name}</p>
                    <span className="text-[10px] font-mono text-slate-500">{c.code} • {c.duration}</span>
                  </td>

                  {/* Alignment Score */}
                  <td className="py-3.5 px-2 text-center font-mono font-bold text-white">
                    <span
                      className={`px-2 py-1 rounded border ${
                        c.alignmentScore >= 85
                          ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/60"
                          : c.alignmentScore >= 60
                          ? "bg-amber-950/60 text-amber-300 border-amber-800/60"
                          : "bg-rose-950/60 text-rose-300 border-rose-800/60"
                      }`}
                    >
                      {c.alignmentScore}%
                    </span>
                  </td>

                  {/* Enrolled */}
                  <td className="py-3.5 px-2 text-center font-mono text-slate-300">
                    {c.enrolled}
                  </td>

                  {/* Placed */}
                  <td className="py-3.5 px-2 text-center font-mono font-bold text-emerald-400">
                    {c.placed}
                  </td>

                  {/* Placement Rate */}
                  <td className="py-3.5 px-2 text-center">
                    <span className="text-xs font-mono font-black text-white">
                      {c.placementRate}%
                    </span>
                  </td>

                  {/* Avg Package */}
                  <td className="py-3.5 px-2 text-center font-mono font-bold text-emerald-300">
                    {c.alignmentScore > 80 ? "₹7.8 LPA" : c.alignmentScore > 60 ? "₹5.6 LPA" : "₹3.1 LPA"}
                  </td>

                  {/* Time to Hire */}
                  <td className="py-3.5 px-2 text-center font-mono text-slate-400">
                    {c.alignmentScore > 80 ? "42 Days" : c.alignmentScore > 60 ? "75 Days" : "130+ Days"}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-2 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        c.decisionStatus === "ALIGNED"
                          ? "badge-aligned"
                          : c.decisionStatus === "UPDATE REQUIRED"
                          ? "badge-update"
                          : c.decisionStatus === "EMERGING / HIGH PRIORITY"
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                          : "badge-critical"
                      }`}
                    >
                      {c.decisionStatus.split(" / ")[0]}
                    </span>
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 pl-2 text-right">
                    <Link
                      href="/courses"
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all"
                    >
                      Audit ➔
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
