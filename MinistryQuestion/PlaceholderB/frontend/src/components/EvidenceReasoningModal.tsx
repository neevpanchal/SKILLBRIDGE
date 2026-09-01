"use client";

import React from "react";

export interface ReasoningChainData {
  evidence: string;
  skillRequirement: string;
  currentCourse: string;
  detectedGap: string;
  recommendation: string;
  trainingImpact: string;
  expectedOutcome: string;
  confidenceScore: number;
}

interface EvidenceReasoningModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: ReasoningChainData;
}

const DEFAULT_REASONING: ReasoningChainData = {
  evidence: "+42% YoY verified demand surge for Generative AI & LLM roles (1,250 vacancies across Pune and Mumbai).",
  skillRequirement: "LLM Fine-Tuning, RAG Pipelines, Vector Databases (ChromaDB/Pinecone), Autonomous AI Agents.",
  currentCourse: "Applied Generative AI & Deep Learning (CRS-004)",
  detectedGap: "Autonomous AI Agents and Local LLM Quantization missing from practical lab units.",
  recommendation: "Inject 28-hour Multi-Agent Development module (CrewAI/LangGraph) + allocate GPU compute credits.",
  trainingImpact: "+40 practical lab sandbox hours with virtual GPU cluster access.",
  expectedOutcome: "Course alignment jumps to 95/100; projected starting package increases to ₹8.5 LPA with 91% placement.",
  confidenceScore: 94
};

export default function EvidenceReasoningModal({
  isOpen,
  onClose,
  data = DEFAULT_REASONING
}: EvidenceReasoningModalProps) {
  if (!isOpen) return null;

  const chain = [
    {
      step: "01",
      title: "1. Verified Market Evidence",
      content: data.evidence,
      badge: "Labour Ingestion",
      color: "border-blue-500/40 bg-blue-950/30 text-blue-300",
      icon: "📡"
    },
    {
      step: "02",
      title: "2. Industry Skill Requirement",
      content: data.skillRequirement,
      badge: "Competency Spec",
      color: "border-indigo-500/40 bg-indigo-950/30 text-indigo-300",
      icon: "🎯"
    },
    {
      step: "03",
      title: "3. Target Course Mapped",
      content: data.currentCourse,
      badge: "Catalog Link",
      color: "border-purple-500/40 bg-purple-950/30 text-purple-300",
      icon: "📚"
    },
    {
      step: "04",
      title: "4. Curriculum Gap Detected",
      content: data.detectedGap,
      badge: "Deficit Alert",
      color: "border-rose-500/40 bg-rose-950/30 text-rose-300",
      icon: "⚠️"
    },
    {
      step: "05",
      title: "5. Actionable AI Recommendation",
      content: data.recommendation,
      badge: "AI Syllabus Plan",
      color: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
      icon: "⚡"
    },
    {
      step: "06",
      title: "6. Institutional Training Impact",
      content: data.trainingImpact,
      badge: "Resource Planning",
      color: "border-cyan-500/40 bg-cyan-950/30 text-cyan-300",
      icon: "👥"
    },
    {
      step: "07",
      title: "7. Projected Employment Outcome",
      content: data.expectedOutcome,
      badge: "ROI Projection",
      color: "border-amber-500/40 bg-amber-950/30 text-amber-300",
      icon: "📈"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-blue-500/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
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
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              EXPLAINABLE AI • REASONING CHAIN
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              Confidence Score: {data.confidenceScore}%
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Evidence ➔ Recommendation Reasoning Pipeline
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visual breakdown demonstrating how raw labor signals translate through every layer into policy recommendations.
          </p>
        </div>

        {/* Vertical Chain Flow */}
        <div className="space-y-3 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-800">
          {chain.map((c, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-lg flex-shrink-0 z-10 shadow-md">
                {c.icon}
              </div>

              <div className={`flex-1 p-3.5 rounded-xl border ${c.color} space-y-1`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{c.title}</span>
                  <span className="text-[10px] font-mono font-bold uppercase opacity-80">
                    {c.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info & CTA */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            Model Validation: Multi-source verified (Recruiters, Job Feeds, Placement Records).
          </p>
          <button
            onClick={onClose}
            className="btn-glow text-xs py-2 px-5 font-bold"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
}
