"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COURSES_CATALOG, CourseData } from "@/lib/intelligenceData";
import ScoreExplainerModal from "@/components/ScoreExplainerModal";
import CourseModal from "@/components/CourseModal";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>(COURSES_CATALOG);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [explainingCourse, setExplainingCourse] = useState<CourseData | null>(null);
  const [inspectingCourse, setInspectingCourse] = useState<CourseData | null>(null);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.activeSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.missingSkills.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Aligned" && c.decisionStatus === "ALIGNED") ||
      (selectedStatus === "Update Needed" && c.decisionStatus === "UPDATE REQUIRED") ||
      (selectedStatus === "Oversupplied" && c.decisionStatus === "OBSOLETE / OVERSUPPLIED") ||
      (selectedStatus === "Emerging" && c.decisionStatus === "EMERGING / HIGH PRIORITY");

    return matchesSearch && matchesStatus;
  });

  const alignedCount = courses.filter((c) => c.decisionStatus === "ALIGNED").length;
  const updateCount = courses.filter((c) => c.decisionStatus === "UPDATE REQUIRED").length;
  const oversuppliedCount = courses.filter((c) => c.decisionStatus === "OBSOLETE / OVERSUPPLIED").length;
  const emergingCount = courses.filter((c) => c.decisionStatus === "EMERGING / HIGH PRIORITY").length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              STATE VOCATIONAL CATALOG
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{courses.length} Accredited Programs</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            Course Modernization & Alignment Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Audit 6-factor Course Modernization Scores (0–100), inspect missing industry modules, and execute policy decisions.
          </p>
        </div>

        {/* Status Counters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="badge-aligned px-3 py-1 rounded-full text-xs font-bold">
            {alignedCount} Aligned
          </span>
          <span className="badge-update px-3 py-1 rounded-full text-xs font-bold">
            {updateCount} Update Needed
          </span>
          <span className="badge-critical px-3 py-1 rounded-full text-xs font-bold">
            {oversuppliedCount} Oversupplied
          </span>
          <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-3 py-1 rounded-full text-xs font-bold">
            {emergingCount} Emerging
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search courses, codes or skills (e.g. Python, AWS, Next.js, K8s)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-slate-500 text-sm">🔍</span>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {["All", "Aligned", "Update Needed", "Oversupplied", "Emerging"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedStatus === st
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="glass-card p-12 text-center text-slate-400">
            <p className="text-lg font-bold text-white mb-1">No matching courses found</p>
            <p className="text-xs">Try adjusting your search terms or filter selection.</p>
          </div>
        ) : (
          filteredCourses.map((c) => {
            const isAligned = c.decisionStatus === "ALIGNED";
            const isUpdateNeeded = c.decisionStatus === "UPDATE REQUIRED";
            const isOversupplied = c.decisionStatus === "OBSOLETE / OVERSUPPLIED";
            const isEmerging = c.decisionStatus === "EMERGING / HIGH PRIORITY";

            return (
              <div
                key={c.id}
                className={`glass-card p-5 transition-all border space-y-4 ${
                  isAligned
                    ? "hover:border-emerald-500/40"
                    : isUpdateNeeded
                    ? "hover:border-amber-500/40"
                    : isOversupplied
                    ? "hover:border-rose-500/40"
                    : "hover:border-purple-500/40"
                }`}
              >
                {/* Top Row: Details & Score */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Column: Course Name & Metadata */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {c.name}
                      </h3>

                      {/* Decision Status Badge */}
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isAligned
                            ? "badge-aligned"
                            : isUpdateNeeded
                            ? "badge-update"
                            : isEmerging
                            ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                            : "badge-critical"
                        }`}
                      >
                        {c.decisionStatus}
                      </span>

                      <span className="text-[10px] text-slate-500 font-mono">
                        {c.code} • {c.duration}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3">
                      Enrolled: <strong className="text-blue-400 font-mono">{c.enrolled}</strong> • Placed:{" "}
                      <strong className="text-emerald-400 font-mono">{c.placed}</strong> ({c.placementRate}% placement rate) • Annual Intake:{" "}
                      <span className="font-mono text-slate-300">{c.annualIntake} seats</span>
                    </p>

                    {/* Active and Missing Skills */}
                    <div className="flex gap-1.5 flex-wrap items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Syllabus:</span>
                      {c.activeSkills.slice(0, 5).map((skill) => (
                        <span
                          key={skill}
                          className="bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}

                      {c.missingSkills && c.missingSkills.length > 0 && (
                        <span className="bg-rose-950/40 text-rose-300 border border-rose-800/40 px-2 py-0.5 rounded text-[11px] font-semibold">
                          ⚠️ Missing: {c.missingSkills.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Score & Action Controls */}
                  <div className="flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0 flex-shrink-0">
                    {/* Modernization Score Radial */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1.5 text-xs text-slate-400">
                        <span>Alignment Score:</span>
                        <strong
                          className={`font-mono font-black text-sm ${
                            c.alignmentScore >= 85
                              ? "text-emerald-400"
                              : c.alignmentScore >= 60
                              ? "text-amber-400"
                              : "text-rose-400"
                          }`}
                        >
                          {c.alignmentScore} / 100
                        </strong>
                      </div>

                      <div className="w-32 bg-slate-900 rounded-full h-2 mt-1.5 p-[1px] border border-slate-800">
                        <div
                          className={`h-full rounded-full ${
                            c.alignmentScore >= 85
                              ? "bg-emerald-500"
                              : c.alignmentScore >= 60
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                          style={{ width: `${c.alignmentScore}%` }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setExplainingCourse(c)}
                        className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold mt-1 inline-flex items-center gap-1"
                      >
                        <span>Explain Score</span>
                        <span>ℹ️</span>
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInspectingCourse(c)}
                        className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all"
                      >
                        Inspect
                      </button>

                      <Link
                        href="/curriculum-advisor"
                        className="px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all flex items-center gap-1"
                      >
                        <span>AI Upgrade</span>
                        <span>➔</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Policy Decision Engine Bar */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                      ACTION: {c.recommendedAction}
                    </span>
                    <span className="text-slate-300">{c.policyActionDetails}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                    Last Reviewed: {c.lastReviewed}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Score Explainer Modal */}
      <ScoreExplainerModal
        course={explainingCourse}
        onClose={() => setExplainingCourse(null)}
      />

      {/* Course Detail Modal */}
      {inspectingCourse && (
        <CourseModal
          course={{
            id: inspectingCourse.id,
            name: inspectingCourse.name,
            provider: inspectingCourse.provider,
            duration: inspectingCourse.duration,
            enrolled: inspectingCourse.enrolled,
            placement: inspectingCourse.placementRate,
            alignment: inspectingCourse.alignmentScore,
            status: inspectingCourse.decisionStatus === "ALIGNED" ? "Aligned" : inspectingCourse.decisionStatus === "UPDATE REQUIRED" ? "Update Needed" : "Oversupplied",
            skills: inspectingCourse.activeSkills,
            curriculum_summary: inspectingCourse.curriculumSummary,
            missing_skills: inspectingCourse.missingSkills,
            last_reviewed: inspectingCourse.lastReviewed
          }}
          onClose={() => setInspectingCourse(null)}
          onCourseUpdated={(updated) => {
            setCourses((prev) =>
              prev.map((c) =>
                c.id === updated.id
                  ? {
                      ...c,
                      alignmentScore: updated.alignment,
                      placementRate: updated.placement,
                      activeSkills: updated.skills,
                      missingSkills: updated.missing_skills || [],
                      decisionStatus: "ALIGNED",
                      recommendedAction: "KEEP"
                    }
                  : c
              )
            );
          }}
        />
      )}
    </main>
  );
}
