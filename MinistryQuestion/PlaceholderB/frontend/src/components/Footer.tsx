"use client";

import React, { useState } from "react";
import Link from "next/link";
import DataSourcesModal from "@/components/DataSourcesModal";
import { PROTOTYPE_DISCLAIMER_TEXT } from "@/lib/intelligenceData";

export default function Footer() {
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Col 1: Brand & Status */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  SB
                </div>
                <span className="text-sm font-bold text-white tracking-wide">
                  SkillBridge AI Suite
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Automated labour-market intelligence, real-time curriculum alignment, and district capacity planning platform for SIH.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                <span>Status: Prototype Intelligence Engine Active</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
            </div>

            {/* Col 2: Intelligence & Gaps */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">
                Intelligence Modules
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                    Executive Labour Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/skill-matrix" className="hover:text-blue-400 transition-colors">
                    Skill Intelligence Matrix
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-blue-400 transition-colors">
                    Course Modernization Scores
                  </Link>
                </li>
                <li>
                  <Link href="/curriculum-advisor" className="hover:text-blue-400 transition-colors">
                    AI Curriculum Advisor
                  </Link>
                </li>
                <li>
                  <Link href="/skill-gaps" className="hover:text-blue-400 transition-colors">
                    What-If Policy Simulator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Planning & Outcomes */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">
                Planning & Outcomes
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/policy-decisions" className="hover:text-blue-400 transition-colors">
                    Policy Decision Center
                  </Link>
                </li>
                <li>
                  <Link href="/employers" className="hover:text-blue-400 transition-colors">
                    Employer Validation Network
                  </Link>
                </li>
                <li>
                  <Link href="/career-pathways" className="hover:text-blue-400 transition-colors">
                    Career Pathways & Learning Paths
                  </Link>
                </li>
                <li>
                  <Link href="/district-plans" className="hover:text-blue-400 transition-colors">
                    District Training Plans
                  </Link>
                </li>
                <li>
                  <Link href="/capacity-planner" className="hover:text-blue-400 transition-colors">
                    Trainer & Equipment Planner
                  </Link>
                </li>
                <li>
                  <Link href="/placement-analytics" className="hover:text-blue-400 transition-colors">
                    Placement Outcome Analytics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Authority & Methodology */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">
                Transparency & Governance
              </h4>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                <p className="text-white font-semibold text-xs">SkillBridge Decision Support Cell</p>
                <p className="text-[11px] text-blue-400 font-mono">SIH 2026 Prototype Engine</p>
                <button
                  type="button"
                  onClick={() => setIsSourcesModalOpen(true)}
                  className="w-full text-left text-[11px] text-slate-300 hover:text-white bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center justify-between transition-colors"
                >
                  <span>Data Sources & Methodology</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mandatory SIH Prototype Disclaimer */}
          <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/30 text-center text-xs text-slate-400 leading-relaxed mb-6">
            <p className="italic">
              "{PROTOTYPE_DISCLAIMER_TEXT}"
            </p>
          </div>

          {/* Copyright Row */}
          <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 SkillBridge AI • Smart India Hackathon Prototype • Team: Syntax Squad.</p>
            <div className="flex items-center gap-4">
              <span>Security Compliant Architecture</span>
              <span>•</span>
              <button
                onClick={() => setIsSourcesModalOpen(true)}
                className="hover:text-slate-300 underline"
              >
                Methodology Telemetry
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Data Sources Modal */}
      <DataSourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
      />
    </>
  );
}
