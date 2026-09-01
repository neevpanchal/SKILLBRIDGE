"use client";

import React, { useState, useEffect } from "react";
import SkillGapBar from "@/components/SkillGapBar";
import CurriculumSimulator from "@/components/CurriculumSimulator";

interface SkillGapItem {
  id: number;
  skill: string;
  demand: number;
  supply: number;
  gap: number;
  severity: string;
  courses_count?: number;
  recommendation?: string;
  growth_rate?: string;
  target_roles?: string[];
}

const INITIAL_GAPS: SkillGapItem[] = [
  { id: 1, skill: "Cloud Computing (AWS/Azure/GCP)", demand: 85, supply: 33, gap: 52, severity: "Critical", courses_count: 2, recommendation: "Launch 3-month intensive AWS/Azure certified practitioner & solutions architect track with cloud lab credits.", growth_rate: "+34% YoY", target_roles: ["Cloud Architect", "Cloud DevOps Engineer", "SysOps Administrator"] },
  { id: 2, skill: "AI & Machine Learning Engineering", demand: 82, supply: 28, gap: 54, severity: "Critical", courses_count: 1, recommendation: "Expand AI/ML cohort capacity by 200%, establish GPU compute labs, and integrate LLM fine-tuning modules.", growth_rate: "+42% YoY", target_roles: ["ML Engineer", "AI Solutions Developer", "Data Scientist"] },
  { id: 3, skill: "Full-Stack Development (Modern React/Next.js/TypeScript)", demand: 88, supply: 41, gap: 47, severity: "High", courses_count: 3, recommendation: "Mandate TypeScript and Next.js in state web curriculum and decommission legacy PHP-only syllabus.", growth_rate: "+26% YoY", target_roles: ["Full-Stack Engineer", "Frontend Architect", "API Developer"] },
  { id: 4, skill: "Cybersecurity & Threat Intelligence", demand: 79, supply: 35, gap: 44, severity: "High", courses_count: 1, recommendation: "Partner with CERT-In and industry security leaders to deploy automated SOC sandbox simulations.", growth_rate: "+29% YoY", target_roles: ["SOC Analyst", "Security Engineer", "Penetration Tester"] },
  { id: 5, skill: "DevOps & Infrastructure Automation", demand: 74, supply: 30, gap: 44, severity: "High", courses_count: 1, recommendation: "Incorporate hands-on Docker and CI/CD pipelines across all vocational computing institutions.", growth_rate: "+31% YoY", target_roles: ["DevOps Specialist", "Site Reliability Engineer", "Platform Engineer"] },
  { id: 6, skill: "Data Engineering & Pipeline Architecture", demand: 72, supply: 31, gap: 41, severity: "Medium", courses_count: 2, recommendation: "Introduce Apache Spark, Kafka, and dbt modules for modern big data ecosystem alignment.", growth_rate: "+22% YoY", target_roles: ["Data Engineer", "ETL Developer", "Analytics Engineer"] },
  { id: 7, skill: "Cross-Platform Mobile Development", demand: 71, supply: 48, gap: 23, severity: "Medium", courses_count: 2, recommendation: "Align mobile curriculum with Flutter 3.x and React Native Expo workflows.", growth_rate: "+15% YoY", target_roles: ["Mobile App Developer", "Flutter Specialist"] },
  { id: 8, skill: "Digital Marketing & SEO", demand: 76, supply: 62, gap: 14, severity: "Low", courses_count: 5, recommendation: "Cap general digital marketing intake; pivot seats to Growth Product Analytics.", growth_rate: "+5% YoY", target_roles: ["Growth Marketer", "Performance Marketing Specialist"] },
  { id: 9, skill: "Basic Computer Literacy & Office Tools", demand: 30, supply: 65, gap: -35, severity: "Oversupplied", courses_count: 4, recommendation: "Decommission 60% of legacy basic typing seats and divert funding to modern IT skill tracks.", growth_rate: "-12% YoY", target_roles: ["Data Entry Operator", "Office Assistant"] },
];

export default function SkillGapsPage() {
  const [gaps, setGaps] = useState<SkillGapItem[]>(INITIAL_GAPS);
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [activeTab, setActiveTab] = useState<"matrix" | "simulator">("matrix");

  useEffect(() => {
    async function fetchGaps() {
      try {
        const res = await fetch("/api/skill-gaps");
        if (res.ok) {
          const data = await res.json();
          if (data.skill_gaps && data.skill_gaps.length > 0) {
            setGaps(data.skill_gaps);
          }
        }
      } catch (err) {
        console.log("Using initial gaps state", err);
      }
    }
    fetchGaps();
  }, []);

  const filteredGaps = gaps.filter(
    (g) => selectedSeverity === "All" || g.severity === selectedSeverity
  );

  const criticalCount = gaps.filter((g) => g.severity === "Critical").length;
  const highCount = gaps.filter((g) => g.severity === "High").length;
  const mediumCount = gaps.filter((g) => g.severity === "Medium").length;
  const lowCount = gaps.filter(
    (g) => g.severity === "Low" || g.severity === "Oversupplied"
  ).length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
              LABOUR DEFICIT RADAR
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{gaps.length} Core Sectors Tracked</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            Skill Gap Intelligence & Capacity Planning
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time differential mapping between employer vacancies and vocational graduate supply.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center text-xs">
          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === "matrix"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Gap Matrix
          </button>
          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === "simulator"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚡ What-If Simulator
          </button>
        </div>
      </div>

      {/* Severity Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 border-rose-500/30 text-center">
          <p className="text-2xl font-black text-rose-400">{criticalCount}</p>
          <p className="text-xs font-bold text-slate-300 mt-0.5">Critical Deficits</p>
          <p className="text-[10px] text-slate-500">&gt;50% talent shortage</p>
        </div>

        <div className="glass-card p-4 border-amber-500/30 text-center">
          <p className="text-2xl font-black text-amber-400">{highCount}</p>
          <p className="text-xs font-bold text-slate-300 mt-0.5">High Gaps</p>
          <p className="text-[10px] text-slate-500">40% - 50% shortage</p>
        </div>

        <div className="glass-card p-4 border-yellow-500/30 text-center">
          <p className="text-2xl font-black text-yellow-400">{mediumCount}</p>
          <p className="text-xs font-bold text-slate-300 mt-0.5">Moderate Gaps</p>
          <p className="text-[10px] text-slate-500">20% - 40% shortage</p>
        </div>

        <div className="glass-card p-4 border-blue-500/30 text-center">
          <p className="text-2xl font-black text-cyan-400">{lowCount}</p>
          <p className="text-xs font-bold text-slate-300 mt-0.5">Low / Oversupplied</p>
          <p className="text-[10px] text-slate-500">Curriculum pivot candidates</p>
        </div>
      </div>

      {/* Simulator or Matrix View */}
      {activeTab === "simulator" ? (
        <div className="mb-12">
          <CurriculumSimulator skillGaps={gaps} />
        </div>
      ) : (
        <>
          {/* Severity Filter Pills */}
          <div className="glass-card p-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Filter by Deficit Severity:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {["All", "Critical", "High", "Medium", "Low", "Oversupplied"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedSeverity === sev
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Gap Cards List */}
          <div className="space-y-4 mb-12">
            {filteredGaps.map((gap) => (
              <SkillGapBar
                key={gap.id}
                item={gap}
                showRecommendation={true}
                onSimulateClick={() => setActiveTab("simulator")}
              />
            ))}
          </div>

          {/* Embedded Simulator Section */}
          <div className="mt-12">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>⚡</span>
              <span>Run State Capacity Planning Simulation</span>
            </h3>
            <CurriculumSimulator skillGaps={gaps} />
          </div>
        </>
      )}
    </main>
  );
}
