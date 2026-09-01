import React from "react";

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

interface SkillGapBarProps {
  item: SkillGapItem;
  showRecommendation?: boolean;
  onSimulateClick?: (skillId: number) => void;
}

export default function SkillGapBar({
  item,
  showRecommendation = false,
  onSimulateClick,
}: SkillGapBarProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "badge-critical";
      case "High":
        return "badge-update";
      case "Medium":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "Low":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      default:
        return "badge-oversupplied";
    }
  };

  return (
    <div className="glass-card p-4 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h4 className="text-sm font-bold text-white tracking-tight">
              {item.skill}
            </h4>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getSeverityBadge(
                item.severity
              )}`}
            >
              {item.severity}
            </span>
            {item.growth_rate && (
              <span className="text-[10px] text-emerald-400 font-mono font-medium">
                {item.growth_rate} demand
              </span>
            )}
          </div>
          {item.target_roles && item.target_roles.length > 0 && (
            <p className="text-[11px] text-slate-400 mt-0.5">
              Target roles: {item.target_roles.join(" • ")}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="text-right">
            <div
              className={`text-lg font-black ${
                item.gap > 0 ? "text-rose-400" : "text-cyan-400"
              }`}
            >
              {item.gap > 0 ? `+${item.gap}%` : `${item.gap}%`}
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              {item.gap > 0 ? "Talent Deficit" : "Surplus"}
            </span>
          </div>

          {onSimulateClick && (
            <button
              onClick={() => onSimulateClick(item.id)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all"
            >
              Simulate
            </button>
          )}
        </div>
      </div>

      {/* Comparative Progress Bars */}
      <div className="space-y-2 mb-2">
        {/* Demand Bar */}
        <div>
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Industry Demand Signal
            </span>
            <span className="font-mono font-semibold text-blue-400">
              {item.demand}%
            </span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden p-[1px] border border-slate-800">
            <div
              className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, item.demand)}%` }}
            />
          </div>
        </div>

        {/* Supply Bar */}
        <div>
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Current Trained Supply
            </span>
            <span className="font-mono font-semibold text-emerald-400">
              {item.supply}%
            </span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden p-[1px] border border-slate-800">
            <div
              className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, item.supply)}%` }}
            />
          </div>
        </div>
      </div>

      {showRecommendation && item.recommendation && (
        <div className="mt-3 p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40 flex items-start gap-2">
          <svg
            className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xs text-blue-200/90 leading-relaxed">
            <strong className="text-blue-300">Action Plan: </strong>
            {item.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}
