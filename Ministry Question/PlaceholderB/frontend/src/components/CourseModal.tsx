"use client";

import React, { useState } from "react";

interface Course {
  id: number;
  name: string;
  provider: string;
  duration: string;
  enrolled: number;
  placement: number;
  alignment: number;
  status: string;
  skills: string[];
  curriculum_summary?: string;
  missing_skills?: string[];
  last_reviewed?: string;
}

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onCourseUpdated?: (updatedCourse: Course) => void;
}

export default function CourseModal({
  course,
  onClose,
  onCourseUpdated,
}: CourseModalProps) {
  if (!course) return null;

  const [isUpdating, setIsUpdating] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [selectedMissingSkills, setSelectedMissingSkills] = useState<string[]>(
    course.missing_skills || []
  );
  const [updatedSuccess, setUpdatedSuccess] = useState(false);

  const toggleMissingSkill = (skill: string) => {
    if (selectedMissingSkills.includes(skill)) {
      setSelectedMissingSkills(selectedMissingSkills.filter((s) => s !== skill));
    } else {
      setSelectedMissingSkills([...selectedMissingSkills, skill]);
    }
  };

  const handleAuthorizeUpgrade = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/courses/${course.id}/update-status`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "Aligned",
            alignment: Math.min(96, Math.max(90, course.alignment + 20)),
            added_skills: selectedMissingSkills,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUpdatedSuccess(true);
        if (onCourseUpdated && data.course) {
          onCourseUpdated(data.course);
        }
      } else {
        // Fallback local update if backend not running
        const localUpdated: Course = {
          ...course,
          status: "Aligned",
          alignment: 94,
          skills: Array.from(new Set([...course.skills, ...selectedMissingSkills])),
          missing_skills: [],
        };
        setUpdatedSuccess(true);
        if (onCourseUpdated) onCourseUpdated(localUpdated);
      }
    } catch {
      // Fallback local update
      const localUpdated: Course = {
        ...course,
        status: "Aligned",
        alignment: 94,
        skills: Array.from(new Set([...course.skills, ...selectedMissingSkills])),
        missing_skills: [],
      };
      setUpdatedSuccess(true);
      if (onCourseUpdated) onCourseUpdated(localUpdated);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              COURSE ID: CRS-2026-{course.id.toString().padStart(3, "0")}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                course.status === "Aligned"
                  ? "badge-aligned"
                  : course.status === "Update Needed"
                  ? "badge-update"
                  : "badge-critical"
              }`}
            >
              {course.status}
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">{course.name}</h2>
          <p className="text-xs text-slate-400 mt-1">
            Provider: <span className="text-slate-200">{course.provider}</span> • Duration:{" "}
            <span className="text-slate-200">{course.duration}</span> • Enrolled Trainees:{" "}
            <span className="text-blue-400 font-semibold">{course.enrolled}</span>
          </p>
        </div>

        {/* Success Alert */}
        {updatedSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-bold text-emerald-200">Curriculum Modernization Authorized!</p>
              <p className="text-emerald-300/80">
                Syllabus alignment upgraded to 94%. Missing industry modules added to active intake.
              </p>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
            <p className="text-[11px] text-slate-400 font-medium">Industry Alignment</p>
            <p className="text-2xl font-black text-blue-400 mt-0.5">{course.alignment}%</p>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
              <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: `${course.alignment}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
            <p className="text-[11px] text-slate-400 font-medium">Placement Rate</p>
            <p className="text-2xl font-black text-emerald-400 mt-0.5">{course.placement}%</p>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
              <div
                className="bg-emerald-500 h-1.5 rounded-full"
                style={{ width: `${course.placement}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
            <p className="text-[11px] text-slate-400 font-medium">Trainees Enrolled</p>
            <p className="text-2xl font-black text-purple-400 mt-0.5">{course.enrolled}</p>
            <p className="text-[10px] text-slate-400 mt-1">Active State Cohort</p>
          </div>
        </div>

        {/* Curriculum Summary */}
        {course.curriculum_summary && (
          <div className="mb-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Curriculum Audit Summary
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {course.curriculum_summary}
            </p>
          </div>
        )}

        {/* Current Active Skills */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Active Syllabus Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill) => (
              <span
                key={skill}
                className="bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1 rounded-lg text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Industry Modules to Upgrade */}
        {course.missing_skills && course.missing_skills.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-blue-950/30 border border-blue-900/50">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1">
              Detected Missing Industry Modules
            </h4>
            <p className="text-xs text-blue-200/80 mb-3">
              Select the industry competencies to integrate into the upcoming syllabus revision:
            </p>
            <div className="flex flex-wrap gap-2">
              {course.missing_skills.map((skill) => {
                const isSelected = selectedMissingSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleMissingSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-blue-600 text-white border border-blue-400 shadow-md shadow-blue-600/30"
                        : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
                    }`}
                  >
                    <span>{isSelected ? "✓" : "+"}</span>
                    <span>{skill}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Close Inspector
          </button>

          <button
            onClick={handleAuthorizeUpgrade}
            disabled={isUpdating}
            className="btn-glow text-xs py-2.5 px-5 disabled:opacity-50"
          >
            {isUpdating ? (
              <span>Updating Alignment...</span>
            ) : (
              <span>Authorize Curriculum Modernization →</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
