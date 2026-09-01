"use client";

import React, { useState, useEffect } from "react";

interface District {
  id: number;
  district: string;
  placements: number;
  rate: string;
  courses: number;
  active_trainees: number;
  top_industry: string;
  key_skill_needed: string;
}

const INITIAL_DISTRICTS: District[] = [
  { id: 1, district: "Mumbai Metropolitan", placements: 1240, rate: "72%", courses: 89, active_trainees: 3450, top_industry: "Financial Services & IT Hub", key_skill_needed: "Cloud & Full-Stack Development" },
  { id: 2, district: "Pune", placements: 980, rate: "69%", courses: 76, active_trainees: 2890, top_industry: "Automotive & Enterprise Software", key_skill_needed: "AI/ML & DevOps Engineering" },
  { id: 3, district: "Nagpur", placements: 540, rate: "61%", courses: 52, active_trainees: 1620, top_industry: "Logistics & Emerging IT Hub", key_skill_needed: "Data Engineering & Cybersecurity" },
  { id: 4, district: "Nashik", placements: 420, rate: "58%", courses: 44, active_trainees: 1250, top_industry: "Manufacturing & Defense Electronics", key_skill_needed: "Industrial IoT & Embedded Systems" },
  { id: 5, district: "Chhatrapati Sambhajinagar (Aurangabad)", placements: 380, rate: "55%", courses: 38, active_trainees: 1100, top_industry: "Automotive & Heavy Engineering", key_skill_needed: "PLC Automation & CAD/CAM" },
  { id: 6, district: "Kolhapur", placements: 290, rate: "53%", courses: 31, active_trainees: 870, top_industry: "Textile & Foundry Engineering", key_skill_needed: "Digital Manufacturing" },
  { id: 7, district: "Solapur", placements: 240, rate: "50%", courses: 27, active_trainees: 720, top_industry: "Textile & Renewable Energy", key_skill_needed: "Solar Installation & Maintenance" },
  { id: 8, district: "Amravati", placements: 195, rate: "48%", courses: 22, active_trainees: 590, top_industry: "Agri-tech & Small Industry", key_skill_needed: "Agri-Data Analysis & Farm Automation" },
];

export default function DistrictPlansPage() {
  const [districts, setDistricts] = useState<District[]>(INITIAL_DISTRICTS);
  const [selectedDistrict, setSelectedDistrict] = useState<District>(INITIAL_DISTRICTS[0]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchDistricts() {
      try {
        const res = await fetch("/api/districts");
        if (res.ok) {
          const data = await res.json();
          if (data.districts && data.districts.length > 0) {
            setDistricts(data.districts);
            setSelectedDistrict(data.districts[0]);
          }
        }
      } catch (err) {
        console.log("Using initial districts", err);
      }
    }
    fetchDistricts();
  }, []);

  const handlePrintBriefing = () => {
    window.print();
  };

  const handleCopyReport = () => {
    const reportText = `REGIONAL DISTRICT STRATEGIC TRAINING REPORT (2026)\nDistrict: ${selectedDistrict.district}\nTop Industry: ${selectedDistrict.top_industry}\nCritical Skill Needed: ${selectedDistrict.key_skill_needed}\nPlacement Rate: ${selectedDistrict.rate}\nActive Trainees: ${selectedDistrict.active_trainees}\nAuthorized Courses: ${selectedDistrict.courses}\nGenerated via SkillBridge Intelligence Suite.`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              REGIONAL CAPACITY MAPPING
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">36 Districts Active</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            District Strategic Training Plans
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Decentralized vocational seat quotas calibrated to local industrial corridors and employer clusters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyReport}
            className="btn-secondary text-xs py-2 px-3.5"
          >
            {copied ? "✓ Copied to Clipboard" : "Copy Briefing Text"}
          </button>
          <button
            onClick={handlePrintBriefing}
            className="btn-glow text-xs py-2 px-4"
          >
            🖨️ Export PDF Briefing
          </button>
        </div>
      </div>

      {/* Main Grid: District Selector + Deep Dive Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Left Column: District List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">
            Select District Corridor
          </h3>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {districts.map((d) => {
              const isSelected = selectedDistrict.id === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDistrict(d)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? "bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-950/40"
                      : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white">{d.district}</h4>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {d.rate} Placement
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{d.top_industry}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-800/80 pt-2">
                    <span>{d.active_trainees} Trainees</span>
                    <span className="text-blue-400 font-medium">{d.courses} Tracks</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Strategic District Action Plan (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 border-blue-500/30">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                  DISTRICT DOSSIER
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {selectedDistrict.district} Training Roadmap
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-400">{selectedDistrict.rate}</span>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Placement Rate</p>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Active Trainees</span>
                <p className="text-xl font-black text-white mt-0.5">
                  {selectedDistrict.active_trainees.toLocaleString()}
                </p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Placements Recorded</span>
                <p className="text-xl font-black text-emerald-400 mt-0.5">
                  {selectedDistrict.placements.toLocaleString()}
                </p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Active Courses</span>
                <p className="text-xl font-black text-blue-400 mt-0.5">
                  {selectedDistrict.courses}
                </p>
              </div>
            </div>

            {/* Priority Focus Area */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 mb-6 space-y-2">
              <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Industrial Anchor & Critical Competency Shortage
              </h4>
              <p className="text-xs text-slate-300">
                Primary Industry Cluster: <strong className="text-white">{selectedDistrict.top_industry}</strong>
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-400">Mandated Curriculum Focus:</span>
                <span className="text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-lg">
                  {selectedDistrict.key_skill_needed}
                </span>
              </div>
            </div>

            {/* Strategic Interventions */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Actionable Strategic Interventions for {selectedDistrict.district}
              </h4>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <span className="text-blue-400 font-bold">1.</span>
                  <p>
                    Expand capacity in <strong className="text-white">{selectedDistrict.key_skill_needed}</strong> by +120 seats for the next academic cohort.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <span className="text-blue-400 font-bold">2.</span>
                  <p>
                    Establish specialized virtual lab credits in collaboration with regional anchor employers in <strong className="text-white">{selectedDistrict.top_industry}</strong>.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <span className="text-blue-400 font-bold">3.</span>
                  <p>
                    Reallocate 35% of underperforming office computing seats into certified hands-on technical bootcamps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
