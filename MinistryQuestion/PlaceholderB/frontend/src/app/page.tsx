"use client";

import React, { useState } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import IntelligenceLoop from "@/components/IntelligenceLoop";
import SihDemoModal from "@/components/SihDemoModal";
import DataSourcesModal from "@/components/DataSourcesModal";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDataSourcesModalOpen, setIsDataSourcesModalOpen] = useState(false);

  const problemToImpactFlow = [
    {
      step: "01",
      phase: "PROBLEM",
      title: "Rapid Industry Shifts vs Obsolete Curricula",
      desc: "Technologies, job roles, and employer expectations evolve rapidly, while vocational syllabus revisions lag by 3–5 years.",
      icon: "⚠️",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30"
    },
    {
      step: "02",
      phase: "DETECTION",
      title: "Real-Time Labour Signal Ingestion",
      desc: "SkillBridge continuously aggregates 14,800+ recruiter postings, employer surveys, and regional industrial indices.",
      icon: "📡",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30"
    },
    {
      step: "03",
      phase: "INTELLIGENCE",
      title: "Automated Deficit & Gap Radar",
      desc: "NLP engine extracts skills, maps demand-supply deficits, and computes explainable Course Modernization Scores (0–100).",
      icon: "🧠",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30"
    },
    {
      step: "04",
      phase: "ACTION",
      title: "Curriculum, Trainer & District Quotas",
      desc: "Generates module upgrade plans, trainer upskilling blueprints, lab capex budgets, and district seat allocations.",
      icon: "⚡",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30"
    },
    {
      step: "05",
      phase: "IMPACT",
      title: "Higher Placement & Employer Satisfaction",
      desc: "Course alignment jumps to 87%, placement rate surges from 64% to 79%, and employer satisfaction climbs to 82%.",
      icon: "🎯",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    }
  ];

  const liveSignals = [
    { title: "Generative AI & LLMs", growth: "+42% YoY", badge: "Critical Deficit (Gap +54)", color: "text-purple-400" },
    { title: "Cloud Infrastructure & DevOps", growth: "+34% YoY", badge: "High Deficit (Gap +36)", color: "text-blue-400" },
    { title: "Cybersecurity SOC", growth: "+29% YoY", badge: "Priority Ingestion", color: "text-emerald-400" },
    { title: "Basic Computer Applications", growth: "-8% YoY", badge: "Oversupplied (-51% Gap)", color: "text-rose-400" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top SIH Quick Banner */}
      <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/90 to-purple-950/80 border border-blue-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400 flex items-center justify-center text-xl">
            🚀
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/40">
                SIH EVALUATION READY
              </span>
              <span className="text-xs text-slate-400">Complete 10-Step Guided Walkthrough</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Demonstrate the complete labour intelligence pipeline for the Pune IT/Cloud scenario in 2–3 minutes.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsDemoModalOpen(true)}
          className="btn-glow text-xs py-2.5 px-6 font-black tracking-wide whitespace-nowrap shadow-lg shadow-blue-500/20"
        >
          <span>🚀 Launch SIH Demo Mode</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-4 pb-10 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 bg-blue-950/70 border border-blue-800/80 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-300 mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Labour-Market Intelligence & Continuous Curriculum-Alignment Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Aligning State Vocational Training with <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Real-Time Industry Demand
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
          An AI-powered decision-support suite enabling state training directors to identify skill gaps, modernize curricula, upskill faculty, rebalance district quotas, and maximize graduate hiring outcomes.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="btn-glow text-sm py-3 px-6 font-bold flex items-center gap-2"
          >
            <span>🚀 SIH Demo Mode (2 Min Tour)</span>
          </button>
          <Link href="/dashboard" className="btn-secondary text-sm py-3 px-5">
            <span>Executive Cockpit</span>
          </Link>
          <Link href="/curriculum-advisor" className="btn-secondary text-sm py-3 px-5">
            <span>AI Syllabus Auditor</span>
          </Link>
          <Link href="/skill-matrix" className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-all">
            Skill Matrix ➔
          </Link>
        </div>
      </section>

      {/* Live Market Signals Ticker */}
      <section>
        <div className="glass-card p-4 border-slate-800/80">
          <div className="flex items-center justify-between gap-4 mb-3 border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-200 tracking-wider uppercase">
                Regional Industry Demand Signals (Q3 2026 Telemetry)
              </span>
            </div>
            <button
              onClick={() => setIsDataSourcesModalOpen(true)}
              className="text-[10px] font-mono text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Methodology & Sources</span>
              <span>ℹ️</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {liveSignals.map((sig) => (
              <div key={sig.title} className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-white truncate">{sig.title}</span>
                  <span className={`text-[10px] font-mono font-bold ${sig.color}`}>{sig.growth}</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-medium">
                  {sig.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Stage Problem -> Solution -> Impact Visual Flow */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 uppercase tracking-widest">
            CORE VALUE PROPOSITION
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Problem ➔ Detection ➔ Intelligence ➔ Action ➔ Impact
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            How SkillBridge solves the fundamental vocational mismatch in five clear steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {problemToImpactFlow.map((flow) => (
            <div
              key={flow.step}
              className="glass-card p-5 relative flex flex-col justify-between hover:border-blue-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${flow.badgeColor}`}>
                    {flow.phase}
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">{flow.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">{flow.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{flow.desc}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                Step {flow.step} of 05
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Central Intelligence Loop Component */}
      <section className="pt-4">
        <IntelligenceLoop />
      </section>

      {/* Platform Key Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Courses Tracked"
          value="1,247"
          change="+14% MoM"
          isPositive={true}
          subtitle="Active & pending vocational syllabus catalog"
          icon="📚"
          accentColor="blue"
        />
        <StatCard
          label="Active Deficits Detected"
          value="389"
          change="8 Critical"
          isPositive={false}
          subtitle="Real-time demand vs trained supply bottlenecks"
          icon="⚡"
          accentColor="rose"
        />
        <StatCard
          label="Verified Placement Rate"
          value="67.4%"
          change="+15.0% Post-AI"
          isPositive={true}
          subtitle="Post-curriculum modernization placements"
          icon="🎯"
          accentColor="emerald"
        />
        <StatCard
          label="Corporate Hiring Partners"
          value="856"
          change="+48 Surveyed"
          isPositive={true}
          subtitle="TCS, Infosys, Wipro, L&T & Persistent"
          icon="🏢"
          accentColor="indigo"
        />
      </section>

      {/* Complete SIH Direct Access Launchpad (All 10 Core Modules) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🚀</span>
              <span>SIH Complete Intelligence Launchpad</span>
            </h3>
            <p className="text-xs text-slate-400">
              Direct access to all 10 specialized intelligence and policy-decision modules.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/dashboard" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Executive Labour Cockpit
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Bird's-eye view of state skill health, live alerts, and regional placement radar.
            </p>
          </Link>

          <Link href="/skill-matrix" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">🔥</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Skill Intelligence Matrix
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Granular demand vs supply differential heatmap, openings count, and salary indicators.
            </p>
          </Link>

          <Link href="/curriculum-advisor" className="glass-card glass-card-interactive p-5 block group border-blue-500/40 bg-blue-950/20">
            <div className="text-2xl mb-2">🤖</div>
            <h4 className="text-sm font-bold text-blue-300 group-hover:text-blue-200 transition-colors">
              AI Curriculum Advisor (Instant Audit)
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Upload any course syllabus to generate instant 4-stage modernization plans.
            </p>
          </Link>

          <Link href="/courses" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">🎓</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Course Modernization Scores
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Audit course alignment scores (0–100) and trigger the Course Decision Engine.
            </p>
          </Link>

          <Link href="/policy-decisions" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">🏛️</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Policy Decision Center
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Government cockpit to authorize syllabus updates, seat reductions, and lab grants.
            </p>
          </Link>

          <Link href="/skill-gaps" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              What-If Policy Simulator
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Model mathematical outcomes of adjusting seats, trainers, and capex investments.
            </p>
          </Link>

          <Link href="/employers" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Employer Validation Network
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Review recruiter survey consensus, requested competencies, and hiring pipelines.
            </p>
          </Link>

          <Link href="/career-pathways" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">🗺️</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Career Pathways & Roadmaps
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Job Role ➔ Skill ➔ Course mapping with structured 8-stage learning paths.
            </p>
          </Link>

          <Link href="/district-plans" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">📍</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              District Training Plans
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Decentralized training roadmaps calibrated to local industrial corridors.
            </p>
          </Link>

          <Link href="/capacity-planner" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">👥</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Trainer & Equipment Planner
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Evaluate instructor shortages, virtual lab sandboxes, and Capex requirements.
            </p>
          </Link>

          <Link href="/placement-analytics" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Placement Outcome Analytics
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Feedback loop verifying graduate employment conversion and wage premiums.
            </p>
          </Link>
        </div>
      </section>

      {/* SIH Demo Mode Modal */}
      <SihDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* Data Sources Modal */}
      <DataSourcesModal
        isOpen={isDataSourcesModalOpen}
        onClose={() => setIsDataSourcesModalOpen(false)}
      />
    </main>
  );
}
