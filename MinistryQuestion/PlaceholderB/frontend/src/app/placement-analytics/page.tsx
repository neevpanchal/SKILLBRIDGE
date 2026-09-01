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

      {/* Before vs After Modernization Impact Banner */}
      <div className="glass-card p-6 border-blue-500/40 relative overflow-hidden bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-950/60">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">📈</span>
            <h2 className="text-base font-bold text-white">
              State Modernization Impact Telemetry (Before vs. After AI Alignment)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            Verified Outcome Cycle
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Curriculum Alignment
            </span>
            <p className="text-2xl font-black text-blue-400 mt-1">
              58% ➔ <span className="text-emerald-400 font-mono">87%</span>
            </p>
            <span className="text-[11px] text-emerald-400 font-mono font-bold block mt-0.5">
              +29 pts Improvement
            </span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Average Placement Rate
            </span>
            <p className="text-2xl font-black text-blue-400 mt-1">
              64% ➔ <span className="text-emerald-400 font-mono">79%</span>
            </p>
            <span className="text-[11px] text-emerald-400 font-mono font-bold block mt-0.5">
              +15.0% Hiring Surge
            </span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Employer Satisfaction
            </span>
            <p className="text-2xl font-black text-blue-400 mt-1">
              67% ➔ <span className="text-emerald-400 font-mono">82%</span>
            </p>
            <span className="text-[11px] text-emerald-400 font-mono font-bold block mt-0.5">
              +15.0% Recruiter Approval
            </span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Average Starting Package
            </span>
            <p className="text-2xl font-black text-blue-400 mt-1">
              ₹4.8L ➔ <span className="text-emerald-400 font-mono">₹7.2 LPA</span>
            </p>
            <span className="text-[11px] text-emerald-400 font-mono font-bold block mt-0.5">
              +50.0% Wage Premium
            </span>
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
