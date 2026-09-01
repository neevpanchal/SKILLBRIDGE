"use client";

import React, { useState } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import SkillGapBar from "@/components/SkillGapBar";
import {
  SKILL_INTELLIGENCE_DATA,
  COURSES_CATALOG,
  EARLY_WARNING_ALERTS,
  DISTRICT_INTELLIGENCE_DATA,
  EarlyWarningAlert,
  SkillItem,
  CourseData,
  DistrictIntelligence
} from "@/lib/intelligenceData";
import EvidenceReasoningModal, { ReasoningChainData } from "@/components/EvidenceReasoningModal";
import ScoreExplainerModal from "@/components/ScoreExplainerModal";

export default function Dashboard() {
  const [skills] = useState<SkillItem[]>(SKILL_INTELLIGENCE_DATA);
  const [courses] = useState<CourseData[]>(COURSES_CATALOG);
  const [alerts] = useState<EarlyWarningAlert[]>(EARLY_WARNING_ALERTS);
  const [districts] = useState<DistrictIntelligence[]>(DISTRICT_INTELLIGENCE_DATA);
  const [timePeriod, setTimePeriod] = useState("Q3 2026");

  // Evidence Modal & Score Explainer Modal
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [activeReasoningData, setActiveReasoningData] = useState<ReasoningChainData | undefined>(undefined);
  const [explainingCourse, setExplainingCourse] = useState<CourseData | null>(null);

  const totalCoursesTracked = 1247;
  const activeDeficitsCount = 389;
  const criticalDeficitsCount = skills.filter((s) => s.priority === "CRITICAL").length;
  const totalOpenings = skills.reduce((acc, s) => acc + s.openings, 0);

  const handleOpenAlertEvidence = (alert: EarlyWarningAlert) => {
    setActiveReasoningData({
      evidence: alert.evidence,
      skillRequirement: "Cross-checked with multi-source recruitment feeds and verified employer surveys.",
      currentCourse: "State Vocational Catalog",
      detectedGap: alert.issue,
      recommendation: alert.recommendedAction,
      trainingImpact: `Affects ${alert.affectedDistricts.join(", ")} training centers.`,
      expectedOutcome: alert.expectedBenefit,
      confidenceScore: alert.level === "CRITICAL" ? 95 : 88
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
              EXECUTIVE COCKPIT
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Telemetry Active
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
            Executive Labour-Market Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Real-time state skill health, regional demand-supply differential radar, and early warning action alerts.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/policy-decisions"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-blue-300 bg-blue-950/80 border border-blue-700/60 hover:bg-blue-900 transition-all flex items-center gap-1.5"
          >
            <span>🏛️ Policy Decision Center</span>
          </Link>

          <Link href="/curriculum-advisor" className="btn-glow text-xs py-2.5 px-4">
            <span>+ AI Syllabus Audit</span>
          </Link>
        </div>
      </div>

      {/* Top Status Bar with Time Period Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono font-semibold border border-blue-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            State Coverage: Maharashtra (All 36 Districts)
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300 font-medium">
            Active Cohort: <strong className="text-white font-mono">12,400</strong> Trainees
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300 font-medium">
            Average Modernized Placement: <strong className="text-emerald-400 font-mono">79.0%</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {["Q1 2026", "Q2 2026", "Q3 2026", "Full Year"].map((period) => (
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

      {/* KPI Cards Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Courses Tracked"
          value={totalCoursesTracked}
          change="+14% MoM"
          isPositive={true}
          subtitle="Accredited vocational programs"
          icon="📚"
          accentColor="blue"
        />
        <StatCard
          label="Active Deficits Detected"
          value={activeDeficitsCount}
          change={`${criticalDeficitsCount} Critical Priorities`}
          isPositive={false}
          subtitle="Identified competency shortages"
          icon="⚡"
          accentColor="rose"
        />
        <StatCard
          label="Verified Placement Rate"
          value="67.4%"
          change="+15% Post-Modernization"
          isPositive={true}
          subtitle="Graduate employment rate"
          icon="🎯"
          accentColor="emerald"
        />
        <StatCard
          label="Corporate Openings"
          value={totalOpenings.toLocaleString()}
          change="48 Enterprise Partners"
          isPositive={true}
          subtitle="Active recruitment vacancies"
          icon="🏢"
          accentColor="indigo"
        />
      </section>

      {/* Main Grid: Top Skill Deficits vs Early Warning Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Top Skill Deficits (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🔥</span> Top Competency Deficits Radar
              </h2>
              <p className="text-xs text-slate-400">
                Demand score vs trained supply capacity across core technological and manufacturing disciplines.
              </p>
            </div>
            <Link
              href="/skill-matrix"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              Skill Matrix →
            </Link>
          </div>

          <div className="space-y-3">
            {skills.slice(0, 5).map((gap) => (
              <SkillGapBar
                key={gap.id}
                item={{
                  id: gap.id,
                  skill: gap.skill,
                  demand: gap.demandScore,
                  supply: gap.supplyScore,
                  gap: gap.gap,
                  severity: gap.priority === "CRITICAL" ? "Critical" : gap.priority === "HIGH" ? "High" : "Medium",
                  growth_rate: gap.growthRate,
                  target_roles: gap.targetRoles
                }}
                showRecommendation={false}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Early Warning System Alerts (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-5 border-rose-500/30">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>Early Warning Alert Engine</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Autonomous Radar</span>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {alerts.map((alert) => {
                const isCrit = alert.level === "CRITICAL";
                const isWarn = alert.level === "WARNING";
                const isCurr = alert.level === "CURRICULUM ALERT";

                return (
                  <div
                    key={alert.id}
                    onClick={() => handleOpenAlertEvidence(alert)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all hover:scale-[1.01] ${
                      isCrit
                        ? "bg-rose-950/30 border-rose-800/40 text-rose-200 hover:border-rose-600"
                        : isWarn
                        ? "bg-amber-950/30 border-amber-800/40 text-amber-200 hover:border-amber-600"
                        : isCurr
                        ? "bg-yellow-950/30 border-yellow-800/40 text-yellow-200 hover:border-yellow-600"
                        : "bg-blue-950/30 border-blue-800/40 text-blue-200 hover:border-blue-600"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-[11px] mb-1">
                      <span className="uppercase font-mono tracking-wider">{alert.level}</span>
                      <span className="opacity-70 font-mono text-[10px]">{alert.timestamp}</span>
                    </div>
                    <p className="text-xs font-bold text-white mb-1">{alert.issue}</p>
                    <p className="text-[11px] opacity-85 line-clamp-2 leading-relaxed">{alert.recommendedAction}</p>
                    <div className="mt-2 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                      <span>{alert.affectedDistricts.join(", ")}</span>
                      <span className="underline">View Evidence ➔</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Course Alignment Status Overview */}
      <section className="glass-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>🎓</span> Course Modernization & Alignment Overview
            </h2>
            <p className="text-xs text-slate-400">
              State vocational tracks evaluated against 6-factor industry criteria.
            </p>
          </div>
          <Link href="/courses" className="text-xs text-blue-400 hover:text-blue-300 font-semibold">
            View All 10 Courses →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {courses.slice(0, 6).map((c) => (
            <div
              key={c.id}
              onClick={() => setExplainingCourse(c)}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">{c.code}</span>
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
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-1">{c.name}</h4>
              <div className="flex items-center justify-between text-[11px] font-mono border-t border-slate-800/80 pt-2 text-slate-400">
                <span>Score: <strong className="text-white">{c.alignmentScore}%</strong></span>
                <span className="text-emerald-400">Placement: {c.placementRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regional District Training Matrix Preview */}
      <section className="glass-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>🗺️</span> Regional District Training & Quota Matrix
            </h2>
            <p className="text-xs text-slate-400">
              Decentralized quotas across 8 core Maharashtra industrial corridors.
            </p>
          </div>
          <Link href="/district-plans" className="text-xs text-blue-400 hover:text-blue-300 font-semibold">
            Explore District Strategy →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-bold">District Hub</th>
                <th className="pb-3 font-bold">Anchor Sectors</th>
                <th className="pb-3 font-bold text-center">Vacancies</th>
                <th className="pb-3 font-bold text-center">Trainees</th>
                <th className="pb-3 font-bold text-center">Placement</th>
                <th className="pb-3 font-bold">Recommended Seat Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {districts.slice(0, 5).map((d) => (
                <tr key={d.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 font-bold text-white">{d.district}</td>
                  <td className="py-3 text-slate-300 text-[11px]">{d.majorIndustries.slice(0, 2).join(", ")}</td>
                  <td className="py-3 text-center font-mono font-bold text-blue-400">{d.totalVacancies.toLocaleString()}</td>
                  <td className="py-3 text-center font-mono text-slate-300">{d.activeTrainees.toLocaleString()}</td>
                  <td className="py-3 text-center font-mono font-bold text-emerald-400">{d.placementRate}</td>
                  <td className="py-3 text-slate-300 text-[11px]">{d.recommendedSeatAdjustment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Evidence Reasoning Modal */}
      <EvidenceReasoningModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        data={activeReasoningData}
      />

      {/* Score Explainer Modal */}
      <ScoreExplainerModal
        course={explainingCourse}
        onClose={() => setExplainingCourse(null)}
      />
    </main>
  );
}
