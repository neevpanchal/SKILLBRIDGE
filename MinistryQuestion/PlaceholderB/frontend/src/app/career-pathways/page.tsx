"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CAREER_PATHWAYS_DATA, CareerPathway } from "@/lib/intelligenceData";

export default function CareerPathwaysPage() {
  const [selectedPathway, setSelectedPathway] = useState<CareerPathway>(CAREER_PATHWAYS_DATA[0]);
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              CAREER INTELLIGENCE PIPELINE
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-mono">
              Job Role ➔ Skill ➔ Course Mapping
            </span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            Career Pathways & Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Transparent industry progression maps connecting high-growth corporate roles to verified state courses and structured 8-stage curricula.
          </p>
        </div>

        <Link
          href="/curriculum-advisor"
          className="btn-glow text-xs py-2.5 px-4 self-start sm:self-auto"
        >
          <span>🤖 AI Syllabus Auditor</span>
        </Link>
      </div>

      {/* Target Job Role Selector */}
      <div className="glass-card p-4 space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Select Target Industrial Career Pathway:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CAREER_PATHWAYS_DATA.map((p) => {
            const isSelected = selectedPathway.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedPathway(p);
                  setActiveStep(1);
                }}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-950/40 ring-1 ring-blue-400"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                }`}
              >
                <span className="text-[10px] font-mono text-blue-400 font-semibold uppercase">
                  {p.industrySector}
                </span>
                <h3 className="text-sm font-bold text-white mt-1 mb-2">{p.roleTitle}</h3>
                <div className="flex items-center justify-between text-[11px] font-mono border-t border-slate-800/80 pt-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">{p.averageSalary}</span>
                  <span className="text-purple-400 font-semibold">{p.growthVelocity}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Required Skills + Mapped Courses (Left 5 cols) vs 8-Stage Learning Path (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Skills & Course Alignment */}
        <div className="lg:col-span-5 space-y-6">
          {/* Role Summary Card */}
          <div className="glass-card p-5 border-blue-500/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                  ROLE PROFILE
                </span>
                <h2 className="text-xl font-black text-white mt-1">
                  {selectedPathway.roleTitle}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-emerald-400">{selectedPathway.averageSalary}</span>
                <p className="text-[10px] text-slate-400">Avg Benchmark</p>
              </div>
            </div>

            {/* Required Skills Matrix */}
            <div className="space-y-3 mb-5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Mandatory Industry Competencies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedPathway.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-slate-900 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg text-xs font-medium"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Mapped State Courses */}
            <div className="space-y-3 mb-5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Mapped State Vocational Curricula
              </h4>
              <div className="space-y-2">
                {selectedPathway.mappedCourses.map((mc) => (
                  <div
                    key={mc.courseCode}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{mc.courseName}</p>
                      <span className="text-[10px] font-mono text-slate-500">{mc.courseCode}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-blue-400">
                        {mc.coveragePercent}%
                      </span>
                      <p className="text-[10px] text-slate-500">Coverage</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detected Skill Deficits */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 space-y-2">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                ⚠️ Critical Mismatch Deficits
              </h4>
              <div className="space-y-2 text-xs">
                {selectedPathway.skillGaps.map((sg) => (
                  <div key={sg.skill} className="border-b border-rose-900/30 pb-1.5 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <strong className="text-white">{sg.skill}</strong>
                      <span className="text-[10px] font-mono bg-rose-900/60 text-rose-200 px-1.5 py-0.5 rounded">
                        {sg.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">{sg.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 8-Stage Step-by-Step Learning Path */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🗺️</span> Recommended 8-Stage Progressive Learning Path
                </h3>
                <p className="text-xs text-slate-400">
                  Step-by-step modular progression from fundamentals to enterprise capstone.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                Total Duration: ~28 Weeks
              </span>
            </div>

            {/* Steps Vertical Timeline */}
            <div className="space-y-3">
              {selectedPathway.learningPathStages.map((stage) => {
                const isCurrent = stage.step === activeStep;
                return (
                  <div
                    key={stage.step}
                    onClick={() => setActiveStep(stage.step)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isCurrent
                        ? "bg-blue-950/60 border-blue-500 shadow-md ring-1 ring-blue-400"
                        : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center ${
                            isCurrent ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {stage.step}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          {stage.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {stage.durationWeeks} Weeks
                      </span>
                    </div>

                    <div className="pl-8 space-y-1.5">
                      <div className="flex flex-wrap gap-1">
                        {stage.skillsCovered.map((sc) => (
                          <span
                            key={sc}
                            className="bg-slate-950 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800"
                          >
                            {sc}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] text-emerald-300 font-medium pt-1 flex items-center gap-1.5">
                        <span>🧪 Practical Project:</span>
                        <span className="text-slate-200">{stage.practicalProject}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
