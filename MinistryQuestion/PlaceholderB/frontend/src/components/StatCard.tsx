import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon?: string;
  accentColor?: "blue" | "emerald" | "amber" | "rose" | "indigo";
}

export default function StatCard({
  label,
  value,
  change,
  isPositive = true,
  subtitle,
  icon,
  accentColor = "blue",
}: StatCardProps) {
  const colorMap = {
    blue: "from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20",
    emerald: "from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20",
    amber: "from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20",
    rose: "from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/20",
    indigo: "from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/20",
  };

  return (
    <div className="glass-card p-5 relative overflow-hidden group">
      {/* Background glow orb */}
      <div
        className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 bg-gradient-to-br ${colorMap[accentColor]} pointer-events-none group-hover:opacity-40 transition-opacity`}
      />

      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
          {label}
        </span>
        {icon && (
          <span className="text-lg bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/50">
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="text-3xl font-black text-white tracking-tight">
          {value}
        </span>
        {change && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 ${
              isPositive
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
            }`}
          >
            {isPositive ? "↑" : "↓"} {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-slate-400 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
