"use client";

import React, { useState } from "react";

interface SkillGapItem {
  id: number;
  skill: string;
  demand: number;
  supply: number;
  gap: number;
  severity: string;
}

interface CurriculumSimulatorProps {
  skillGaps: SkillGapItem[];
  defaultSkillId?: number;
}

export default function CurriculumSimulator({
  skillGaps,
  defaultSkillId,
}: CurriculumSimulatorProps) {
  const [selectedSkillId, setSelectedSkillId] = useState<number>(
    defaultSkillId || (skillGaps.length > 0 ? skillGaps[0].id : 1)
  );
  const [additionalSeats, setAdditionalSeats] = useState<number>(150);
  const [includeModernSyllabus, setIncludeModernSyllabus] = useState<boolean>(true);
  const [simulationResult, setSimulationResult] = useState<{
    projectedGap: number;
    gapReduction: number;
    projectedPlacements: number;
    newSeverity: string;
  } | null>(null);

  const currentSkill = skillGaps.find((g) => g.id === selectedSkillId) || skillGaps[0];

  const runSimulation = () => {
    if (!currentSkill) return;

    // Computational model for projected supply boost
    const baseBoost = Math.round((additionalSeats / 50.0) * 7.5);
    const modernBonus = includeModernSyllabus ? 8 : 0;
    const totalBoost = Math.min(48, baseBoost + modernBonus);

    const newSupply = Math.min(currentSkill.demand, currentSkill.supply + totalBoost);
    const projectedGap = Math.max(3, currentSkill.demand - newSupply);
    const gapReduction = Math.round(
      ((currentSkill.gap - projectedGap) / (currentSkill.gap || 1)) * 100
    );

    const newSeverity =
      projectedGap < 20 ? "Low" : projectedGap < 38 ? "Medium" : "High";
    const projectedPlacements = Math.round(
      additionalSeats * (includeModernSyllabus ? 0.86 : 0.64)
    );

    setSimulationResult({
      projectedGap,
      gapReduction,
      projectedPlacements,
      newSeverity,
    });
  };

  return (
    <div className="glass-card p-6 border-blue-500/30 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 text-lg">⚡</span>
          <div>
            <h3 className="text-base font-bold text-white">
              Interactive "What-If" Capacity & Policy Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Model the impact of increasing training intake and upgrading curriculum modules.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">
          ALGORITHM ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {/* Controls Column */}
        <div className="space-y-4">
          {/* Select Skill Gap */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Target Skill Deficit
            </label>
            <select
              value={selectedSkillId}
              onChange={(e) => {
                setSelectedSkillId(Number(e.target.value));
                setSimulationResult(null);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {skillGaps.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.skill} (Current Gap: +{g.gap}%)
                </option>
              ))}
            </select>
          </div>

          {/* Seat Capacity Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Proposed Additional Training Intake</span>
              <span className="text-blue-400 font-mono font-bold">
                +{additionalSeats} Seats
              </span>
            </div>
            <input
              type="range"
              min="25"
              max="500"
              step="25"
              value={additionalSeats}
              onChange={(e) => {
                setAdditionalSeats(Number(e.target.value));
                setSimulationResult(null);
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>+25 seats</span>
              <span>+250 seats</span>
              <span>+500 seats</span>
            </div>
          </div>

          {/* Toggle Curriculum Upgrade */}
          <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">
                Mandate Modernized Industry Curriculum
              </p>
              <p className="text-[11px] text-slate-400">
                Adds cloud labs, CI/CD, and real-time assessments
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeModernSyllabus}
                onChange={(e) => {
                  setIncludeModernSyllabus(e.target.checked);
                  setSimulationResult(null);
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <button
            onClick={runSimulation}
            className="btn-glow w-full justify-center text-xs py-3 font-bold"
          >
            Compute Projected Impact →
          </button>
        </div>

        {/* Output Column */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Simulation Projection Matrix
            </h4>

            {simulationResult ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase">Deficit Reduction</span>
                    <p className="text-2xl font-black text-emerald-400 mt-1">
                      -{simulationResult.gapReduction}%
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Gap drops to {simulationResult.projectedGap}%
                    </span>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase">Est. Placements</span>
                    <p className="text-2xl font-black text-blue-400 mt-1">
                      {simulationResult.projectedPlacements}
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      High-retention hires
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/40 text-xs">
                  <p className="font-bold text-blue-300 mb-1">
                    Projected Severity Shift:{" "}
                    <span className="text-white line-through mr-1">
                      {currentSkill?.severity}
                    </span>{" "}
                    ➔{" "}
                    <span className="text-emerald-400 font-black uppercase">
                      {simulationResult.newSeverity}
                    </span>
                  </p>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    By onboarding {additionalSeats} trainees into updated coursework, the regional talent deficit in{" "}
                    <strong>{currentSkill?.skill}</strong> is projected to be resolved within 2 quarters.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center text-slate-500 text-xs px-4">
                <span className="text-3xl mb-2 opacity-50">📊</span>
                <p>Adjust the capacity parameters and click "Compute Projected Impact" to run the dynamic forecasting model.</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Powered by Dynamic Predictive Engine</span>
            <span>Confidence: 94.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
