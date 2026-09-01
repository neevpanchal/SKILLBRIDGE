"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SKILL_INTELLIGENCE_DATA, SkillItem } from "@/lib/intelligenceData";

interface CurriculumSimulatorProps {
  skillGaps?: any[];
  defaultSkillId?: number;
}

export default function CurriculumSimulator({
  defaultSkillId
}: CurriculumSimulatorProps) {
  const skillsList: SkillItem[] = SKILL_INTELLIGENCE_DATA;

  // 9 Policy Parameters (Requirement #6)
  const [selectedSkillId, setSelectedSkillId] = useState<number>(defaultSkillId || skillsList[0].id);
  const [trainingSeats, setTrainingSeats] = useState<number>(300); // Seats added
  const [courseDurationMonths, setCourseDurationMonths] = useState<number>(6);
  const [additionalTrainers, setAdditionalTrainers] = useState<number>(12);
  const [trainerSkillLevel, setTrainerSkillLevel] = useState<"Certified Faculty" | "Master Industry Practitioner">("Certified Faculty");
  const [equipmentInvestmentLakhs, setEquipmentInvestmentLakhs] = useState<number>(15);
  const [mandateModernCurriculum, setMandateModernCurriculum] = useState<boolean>(true);
  const [launchNewCourse, setLaunchNewCourse] = useState<boolean>(true);
  const [retireOversuppliedSeats, setRetireOversuppliedSeats] = useState<number>(250); // basic typing cut
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Pune Hub");

  // Output State
  const [isSimulated, setIsSimulated] = useState<boolean>(true);

  const currentSkill = skillsList.find((s) => s.id === selectedSkillId) || skillsList[0];

  // Computational Math Model
  const baseDeficit = currentSkill.gap; // e.g. 54
  const seatImpact = (trainingSeats / 50) * 4.2;
  const trainerBonus = additionalTrainers * 0.9;
  const equipmentBonus = (equipmentInvestmentLakhs / 5) * 1.8;
  const modernBonus = mandateModernCurriculum ? 8.5 : 0;
  const newCourseBonus = launchNewCourse ? 5.0 : 0;
  const totalSupplyBoost = Math.round(seatImpact + trainerBonus + equipmentBonus + modernBonus + newCourseBonus);

  const projectedGap = Math.max(4, Math.round(baseDeficit - totalSupplyBoost * 0.7));
  const gapReductionPercent = Math.min(92, Math.round(((baseDeficit - projectedGap) / (baseDeficit || 1)) * 100));

  // Placement calculation
  const baselinePlacement = 67;
  const placementSurge = Math.min(
    28,
    Math.round((trainingSeats / 100) * 2.5 + (mandateModernCurriculum ? 9 : 2) + (equipmentInvestmentLakhs > 10 ? 4 : 1))
  );
  const projectedPlacementRate = Math.min(95, baselinePlacement + placementSurge);

  // Employer satisfaction calculation
  const baselineSatisfaction = 68;
  const projectedSatisfaction = Math.min(
    92,
    baselineSatisfaction + (mandateModernCurriculum ? 12 : 2) + (trainerSkillLevel === "Master Industry Practitioner" ? 6 : 3)
  );

  // Financials & ROI
  const grossCostLakhs = equipmentInvestmentLakhs + Math.round(additionalTrainers * 0.6) + Math.round((trainingSeats / 100) * 2.5);
  const savingsFromSeatCutsLakhs = Math.round((retireOversuppliedSeats / 100) * 4.2);
  const netStateCostLakhs = Math.max(1, grossCostLakhs - savingsFromSeatCutsLakhs);
  const estimatedPlacedCandidates = Math.round((trainingSeats * projectedPlacementRate) / 100);
  const annualGraduateIncomeGeneratedCr = ((estimatedPlacedCandidates * currentSkill.salaryNum) / 100).toFixed(2);
  const calculatedROI = ((parseFloat(annualGraduateIncomeGeneratedCr) * 100) / (netStateCostLakhs || 1)).toFixed(1);

  return (
    <div className="glass-card p-6 border-blue-500/40 relative overflow-hidden space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-base">⚡</span>
            <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
              WHAT-IF POLICY SIMULATOR v2.4
            </span>
          </div>
          <h3 className="text-xl font-black text-white mt-0.5">
            Multi-Parameter Policy Forecasting & Budget Rebalancing Engine
          </h3>
          <p className="text-xs text-slate-400">
            Dynamically adjust 9 policy levers to model deficit reduction, placement rates, employer satisfaction, and economic ROI.
          </p>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg self-start sm:self-auto">
          Projected / Simulated Outcomes
        </span>
      </div>

      {/* Grid: 9 Policy Levers (Left 6 cols) vs Projected Outcomes Matrix (Right 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 9 Policy Levers */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            1. Configure Policy Levers & Investment Inputs
          </h4>

          {/* 1. Target Deficit Skill */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Target Competency Deficit
            </label>
            <select
              value={selectedSkillId}
              onChange={(e) => setSelectedSkillId(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
            >
              {skillsList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.skill} (Current Gap: +{s.gap}% | Demand: {s.demandScore})
                </option>
              ))}
            </select>
          </div>

          {/* 2. District Allocation */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Target District / Regional Corridor
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="Pune Hub">Pune Technology & Auto Corridor</option>
              <option value="Mumbai Metropolitan">Mumbai BFSI & Cloud Corridor</option>
              <option value="Nagpur MIHAN">Nagpur MIHAN & Logistics Hub</option>
              <option value="Nashik Industrial">Nashik Smart Manufacturing Zone</option>
            </select>
          </div>

          {/* Sliders: Seats & Trainers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Additional Seats */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Training Intake</span>
                <strong className="text-blue-400 font-mono">+{trainingSeats} Seats</strong>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="50"
                value={trainingSeats}
                onChange={(e) => setTrainingSeats(Number(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Trainers Added */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Faculty Upskilling</span>
                <strong className="text-emerald-400 font-mono">+{additionalTrainers} Trainers</strong>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="2"
                value={additionalTrainers}
                onChange={(e) => setAdditionalTrainers(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Sliders: Lab Capex & Seat Cuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Lab Investment */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Lab Sandbox Capex</span>
                <strong className="text-purple-400 font-mono">₹{equipmentInvestmentLakhs} Lakhs</strong>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="5"
                value={equipmentInvestmentLakhs}
                onChange={(e) => setEquipmentInvestmentLakhs(Number(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Retire Oversupplied Seats */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Cut Legacy Seats</span>
                <strong className="text-rose-400 font-mono">-{retireOversuppliedSeats} Seats</strong>
              </div>
              <input
                type="range"
                min="0"
                max="600"
                step="50"
                value={retireOversuppliedSeats}
                onChange={(e) => setRetireOversuppliedSeats(Number(e.target.value))}
                className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Toggles: Modernize & New Course */}
          <div className="space-y-2 pt-1">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Mandate AI Modernized Curriculum</p>
                <p className="text-[11px] text-slate-400">Adds practical cloud sandboxes & CKA/AWS credentials</p>
              </div>
              <input
                type="checkbox"
                checked={mandateModernCurriculum}
                onChange={(e) => setMandateModernCurriculum(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Authorize Accelerated Certification Bootcamps</p>
                <p className="text-[11px] text-slate-400">Launch 8-week intensive enterprise hiring cohort</p>
              </div>
              <input
                type="checkbox"
                checked={launchNewCourse}
                onChange={(e) => setLaunchNewCourse(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Projected Outcomes & Before vs After Matrix */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>2. Dynamic Projected Outcomes Matrix</span>
            <span className="text-emerald-400 font-mono">Live Recalculation</span>
          </h4>

          {/* Before vs After Comparison Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Deficit Reduction */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Skill Gap Deficit</span>
              <p className="text-xl font-black text-white">
                <span className="line-through text-slate-500 text-sm">+{baseDeficit}%</span> ➔{" "}
                <span className="text-emerald-400 font-mono">+{projectedGap}%</span>
              </p>
              <span className="text-[11px] font-mono font-bold text-emerald-400 block">
                -{gapReductionPercent}% Deficit Reduction
              </span>
            </div>

            {/* Placement Rate */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Placement Rate</span>
              <p className="text-xl font-black text-white">
                <span className="line-through text-slate-500 text-sm">{baselinePlacement}%</span> ➔{" "}
                <span className="text-emerald-400 font-mono">{projectedPlacementRate}%</span>
              </p>
              <span className="text-[11px] font-mono font-bold text-emerald-400 block">
                +{placementSurge}% Placement Surge
              </span>
            </div>

            {/* Employer Satisfaction */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Recruiter Satisfaction</span>
              <p className="text-xl font-black text-white">
                <span className="line-through text-slate-500 text-sm">{baselineSatisfaction}%</span> ➔{" "}
                <span className="text-purple-400 font-mono">{projectedSatisfaction}%</span>
              </p>
              <span className="text-[11px] font-mono text-purple-300 block">
                +{(projectedSatisfaction - baselineSatisfaction)}% Endorsement
              </span>
            </div>

            {/* Economic ROI */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">State Economic ROI</span>
              <p className="text-2xl font-black font-mono text-cyan-400">
                {calculatedROI}×
              </p>
              <span className="text-[10px] text-slate-400 font-mono block">
                Annual Wage Multiple
              </span>
            </div>
          </div>

          {/* Financials & Budget Offsetting Dossier */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50 space-y-2 text-xs">
            <div className="flex justify-between border-b border-blue-900/40 pb-2">
              <span className="text-slate-300">Gross Modernization Investment:</span>
              <span className="font-mono text-white font-bold">₹{grossCostLakhs} Lakhs</span>
            </div>
            <div className="flex justify-between border-b border-blue-900/40 pb-2">
              <span className="text-slate-300">Savings Recovered (Cut {retireOversuppliedSeats} typing seats):</span>
              <span className="font-mono text-emerald-400 font-bold">-₹{savingsFromSeatCutsLakhs} Lakhs</span>
            </div>
            <div className="flex justify-between pt-1 font-bold">
              <span className="text-white">Net State Budget Impact:</span>
              <span className="font-mono text-cyan-300">₹{netStateCostLakhs} Lakhs</span>
            </div>
            <div className="pt-2 text-[11px] text-slate-300">
              Generated annual graduate earning capacity: <strong className="text-emerald-400 font-mono">₹{annualGraduateIncomeGeneratedCr} Crores</strong> for {estimatedPlacedCandidates} placed candidates.
            </div>
          </div>

          {/* Action Link to Policy Decision Center */}
          <Link
            href="/policy-decisions"
            className="btn-glow w-full justify-center text-xs py-3 font-bold flex items-center gap-2"
          >
            <span>Authorize Policy Intervention in Decision Center</span>
            <span>➔</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
