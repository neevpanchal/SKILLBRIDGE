"use client";

import React, { useState, useEffect } from "react";

const INITIAL_TOPICS = [
  { id: 1, name: "Variables & Data Types", subject: "Python Fundamentals", icon: "📦", mastery: 85, attempts: 1 },
  { id: 2, name: "Conditional Logic (if/else)", subject: "Control Flow", icon: "🔀", mastery: 70, attempts: 1 },
  { id: 3, name: "Loops & Iterations (for/while)", subject: "Control Flow", icon: "🔁", mastery: 40, attempts: 1 },
  { id: 4, name: "Data Structures (Lists, Dicts)", subject: "Core Collections", icon: "📚", mastery: 90, attempts: 1 },
  { id: 5, name: "Functions & Scope", subject: "Modular Code", icon: "⚙️", mastery: 55, attempts: 1 },
  { id: 6, name: "Error Handling & Exceptions", subject: "Robust Systems", icon: "🛡️", mastery: 30, attempts: 1 },
];

export default function StudentHome() {
  const [topics, setTopics] = useState(INITIAL_TOPICS);
  const [activeTab, setActiveTab] = useState<"dashboard" | "practice" | "plan">("dashboard");

  const overallMastery = Math.round(
    topics.reduce((acc, t) => acc + t.mastery, 0) / (topics.length || 1)
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
            LP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white">LearnPilot AI</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono font-semibold">
                STUDENT INNOVATION
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Adaptive Diagnostic Assessment & Knowledge Mastery Tracker
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === "dashboard" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Mastery Profile
          </button>
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === "plan" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Adaptive Plan
          </button>
        </div>
      </div>

      {/* Hero Overview */}
      <section className="glass-card p-6 mb-8 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Diagnostic Mastery Assessment
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Learn What You Need, Skip What You Know.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              LearnPilot pinpoints your precise topic weaknesses using targeted diagnostic questions and automatically generates a daily micro-study schedule.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
            <span className="text-xs text-slate-400 uppercase font-semibold">Estimated Mastery</span>
            <p className="text-4xl font-black text-indigo-400 mt-1">{overallMastery}%</p>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                style={{ width: `${overallMastery}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              2 topics require critical focus
            </p>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>📊</span>
          <span>Topic-Wise Knowledge Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((t) => (
            <div key={t.id} className="glass-card p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{t.icon}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      t.mastery >= 75
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : t.mastery >= 50
                        ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                        : "bg-rose-500/15 text-rose-300 border-rose-500/30"
                    }`}
                  >
                    {t.mastery >= 75 ? "Proficient" : t.mastery >= 50 ? "Needs Practice" : "Critical Focus"}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{t.name}</h4>
                <p className="text-[11px] text-slate-400">{t.subject}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Topic Mastery</span>
                  <span className="font-mono font-bold text-white">{t.mastery}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      t.mastery >= 75 ? "bg-emerald-500" : t.mastery >= 50 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${t.mastery}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
