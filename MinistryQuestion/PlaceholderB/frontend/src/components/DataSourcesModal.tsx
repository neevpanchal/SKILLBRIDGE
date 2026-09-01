"use client";

import React from "react";
import { DATA_SOURCES_LIST, PROTOTYPE_DISCLAIMER_TEXT } from "@/lib/intelligenceData";

interface DataSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DataSourcesModal({ isOpen, onClose }: DataSourcesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              AUDIT & TRANSPARENCY
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-mono text-blue-400">Methodology & Confidence</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Data Sources & Intelligence Methodology
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            SkillBridge combines multi-source signals to ensure explainability and eliminate algorithmic hallucination.
          </p>
        </div>

        {/* Simulation Notice Alert */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/50 mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Prototype Evaluation Dataset Notice
            </h4>
            <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
              {PROTOTYPE_DISCLAIMER_TEXT} The intelligence engine models live data pipelines using representative regional industry datasets.
            </p>
          </div>
        </div>

        {/* Sources Table */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Telemetry Ingestion Channels
          </h3>

          <div className="space-y-3">
            {DATA_SOURCES_LIST.map((src, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="text-xs font-bold text-white">{src.name}</h4>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        src.confidence === "High Confidence"
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                          : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                      }`}
                    >
                      {src.confidence}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
                      Sample: {src.recordsSampled}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{src.source}</p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Data Type: <span className="text-slate-300 font-mono">{src.dataType}</span>
                  </p>
                </div>

                <div className="text-right flex-shrink-0 text-[11px] font-mono text-slate-400 border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                  <span>Updated: {src.lastUpdated}</span>
                  <p className="text-[10px] text-emerald-400 mt-0.5">Prototype Simulation Model</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Flow */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 space-y-2 text-xs text-slate-300">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Scoring & Recommendation Formula
          </h4>
          <p className="leading-relaxed">
            Every curriculum recommendation undergoes a 3-tier validation:
            <strong className="text-white"> (1) Statistical demand differential</strong> (&gt;20% gap threshold),
            <strong className="text-white"> (2) Recruiter survey consensus</strong> (&gt;70% employer endorsement), and
            <strong className="text-white"> (3) Faculty & lab capacity feasibility modeling</strong>.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="btn-glow text-xs py-2.5 px-6 font-bold"
          >
            Close Methodology Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
