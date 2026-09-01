"use client";

import React, { useState, useEffect } from "react";
import EmployerModal from "@/components/EmployerModal";

interface Employer {
  id: number;
  name: string;
  industry: string;
  openings: number;
  skills_needed: string[];
  satisfaction: number;
  hired: number;
  location: string;
  partnership_tier: string;
}

const INITIAL_EMPLOYERS: Employer[] = [
  { id: 1, name: "Tata Consultancy Services (TCS)", industry: "IT Services & Consulting", openings: 234, skills_needed: ["Java", "Cloud Infrastructure", "Data Analysis", "Python", "Microservices"], satisfaction: 78, hired: 89, location: "Mumbai / Pune", partnership_tier: "Tier 1 Platinum" },
  { id: 2, name: "Infosys Limited", industry: "IT Services & Enterprise Software", openings: 189, skills_needed: ["Python", "AI/ML", "DevOps", "Kubernetes", "Angular"], satisfaction: 82, hired: 67, location: "Pune / Nagpur", partnership_tier: "Tier 1 Platinum" },
  { id: 3, name: "Wipro Technologies", industry: "IT & Cloud Services", openings: 156, skills_needed: ["Full-Stack", "AWS", "Cybersecurity", "React", "Node.js"], satisfaction: 75, hired: 54, location: "Pune / Mumbai", partnership_tier: "Tier 2 Gold" },
  { id: 4, name: "HCLTech", industry: "IT & Engineering R&D", openings: 134, skills_needed: ["Java", "React", "Docker", "FastAPI", "PostgreSQL"], satisfaction: 80, hired: 45, location: "Nagpur / Pune", partnership_tier: "Tier 2 Gold" },
  { id: 5, name: "Tech Mahindra", industry: "Telecom & Next-Gen IT", openings: 112, skills_needed: ["5G Core", "Cloud Native", "AI Solutions", "Python", "Networking"], satisfaction: 73, hired: 38, location: "Mumbai / Pune", partnership_tier: "Tier 2 Gold" },
  { id: 6, name: "Persistent Systems", industry: "Product Engineering", openings: 89, skills_needed: ["Python", "Machine Learning", "System Design", "Cloud", "Go"], satisfaction: 88, hired: 32, location: "Pune / Nagpur", partnership_tier: "Tier 1 Platinum" },
  { id: 7, name: "LTIMindtree", industry: "IT Services & Digital Transformation", openings: 78, skills_needed: ["SAP S/4HANA", "Cloud Architecture", "Data Engineering", "SQL"], satisfaction: 71, hired: 28, location: "Mumbai / Navi Mumbai", partnership_tier: "Tier 3 Silver" },
  { id: 8, name: "Mphasis Digital", industry: "Cloud & Cognitive Services", openings: 67, skills_needed: ["Full-Stack", "AWS Serverless", "Agile", "TypeScript"], satisfaction: 77, hired: 24, location: "Pune", partnership_tier: "Tier 3 Silver" },
];

const DEMAND_TRENDS = [
  { role: "Generative AI & LLM Specialist", trend: "+42%", period: "Q3 2026", color: "text-purple-400" },
  { role: "Cloud Solutions Architect (AWS/GCP)", trend: "+34%", period: "Q3 2026", color: "text-blue-400" },
  { role: "DevOps & SRE Engineer", trend: "+31%", period: "Q3 2026", color: "text-cyan-400" },
  { role: "Cybersecurity SOC Analyst", trend: "+29%", period: "Q3 2026", color: "text-emerald-400" },
  { role: "Full-Stack TypeScript Developer", trend: "+26%", period: "Q3 2026", color: "text-indigo-400" },
  { role: "Data Pipeline & Analytics Engineer", trend: "+22%", period: "Q3 2026", color: "text-amber-400" },
];

export default function EmployersPage() {
  const [employers, setEmployers] = useState<Employer[]>(INITIAL_EMPLOYERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEmployers() {
      try {
        const res = await fetch("http://localhost:8000/api/employers");
        if (res.ok) {
          const data = await res.json();
          if (data.employers && data.employers.length > 0) {
            setEmployers(data.employers);
          }
        }
      } catch (err) {
        console.log("Using initial employers", err);
      }
    }
    fetchEmployers();
  }, []);

  const totalOpenings = employers.reduce((acc, e) => acc + e.openings, 0);
  const totalHired = employers.reduce((acc, e) => acc + e.hired, 0);

  const handleEmployerAdded = (newEmp: Employer) => {
    setEmployers([newEmp, ...employers]);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              INDUSTRY PARTNERSHIP NETWORK
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{totalOpenings} Active Vacancies</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            Employer Demand Signals & Corporate Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Direct vacancy pipelines from leading IT, Engineering, and Manufacturing employers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-glow text-xs py-2.5 px-4 self-start sm:self-auto"
        >
          <span>+ Register Vacancy Pipeline</span>
        </button>
      </div>

      {/* Demand Trends + Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column: Hiring Growth Signals (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>📈</span> Fast-Growing Role Demands
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">YoY Velocity</span>
            </div>

            <div className="space-y-3">
              {DEMAND_TRENDS.map((t) => (
                <div
                  key={t.role}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{t.role}</p>
                    <p className="text-[10px] text-slate-400">{t.period}</p>
                  </div>
                  <span className={`text-sm font-black font-mono ${t.color}`}>
                    {t.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Conversion Card */}
          <div className="glass-card p-5 border-emerald-500/20">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Cohort Absorption Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400">Open Vacancies</span>
                <p className="text-2xl font-black text-blue-400 mt-0.5">{totalOpenings}</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400">Trainees Placed</span>
                <p className="text-2xl font-black text-emerald-400 mt-0.5">{totalHired}</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Employers report an average satisfaction rating of <strong className="text-white">78.6%</strong> for candidates graduating from modernized curricula.
            </p>
          </div>
        </div>

        {/* Right Column: Corporate Partner Profiles (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🏢</span> Active Hiring Partners & Required Competencies
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {employers.length} Enterprises
            </span>
          </div>

          <div className="space-y-3">
            {employers.map((e) => (
              <div
                key={e.id}
                className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="text-sm font-bold text-white">{e.name}</h4>
                    <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-medium">
                      {e.industry}
                    </span>
                    <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded font-mono">
                      {e.partnership_tier}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mb-2">
                    Region: <span className="text-slate-300">{e.location}</span> • Recruiter Satisfaction:{" "}
                    <span className="text-emerald-400 font-bold">{e.satisfaction}%</span>
                  </p>

                  <div className="flex gap-1.5 flex-wrap">
                    {e.skills_needed.map((s) => (
                      <span
                        key={s}
                        className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded text-[10px] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right flex sm:flex-col justify-between sm:justify-center border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                  <div>
                    <span className="text-lg font-black text-white">{e.openings}</span>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Open Roles</p>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                    {e.hired} Hired
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employer Registration Modal */}
      <EmployerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEmployerAdded={handleEmployerAdded}
      />
    </main>
  );
}
