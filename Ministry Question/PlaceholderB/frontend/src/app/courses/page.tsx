"use client";

import React, { useState, useEffect } from "react";
import CourseModal from "@/components/CourseModal";

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

const INITIAL_COURSES: Course[] = [
  { id: 1, name: "Advanced Python Programming & API Engineering", provider: "SVTE", duration: "6 months", enrolled: 342, placement: 89, alignment: 91, status: "Aligned", skills: ["Python", "FastAPI", "Data Structures", "REST APIs", "PostgreSQL"], curriculum_summary: "Comprehensive backend development covering modern asynchronous Python, API design, and cloud deployment.", missing_skills: ["Kafka", "GraphQL"], last_reviewed: "2026-07-15" },
  { id: 2, name: "Full-Stack Web Development (Next.js & React)", provider: "SVTE", duration: "8 months", enrolled: 567, placement: 74, alignment: 78, status: "Update Needed", skills: ["React", "Node.js", "MongoDB", "Express", "CSS3"], curriculum_summary: "Web development fundamentals. Current syllabus lacks TypeScript, Next.js App Router, and modern CI/CD pipelines.", missing_skills: ["TypeScript", "Next.js", "Docker", "Tailwind CSS"], last_reviewed: "2026-06-20" },
  { id: 3, name: "Cloud Infrastructure & DevOps (AWS/Azure)", provider: "SVTE", duration: "4 months", enrolled: 234, placement: 82, alignment: 62, status: "Update Needed", skills: ["AWS Basics", "EC2", "S3", "Linux Basics"], curriculum_summary: "Introductory cloud concepts. Needs modernization for Kubernetes, Terraform IaC, and Serverless architectures.", missing_skills: ["Kubernetes", "Terraform", "CI/CD", "Docker"], last_reviewed: "2026-05-10" },
  { id: 4, name: "Data Science & Machine Learning Foundations", provider: "SVTE", duration: "6 months", enrolled: 445, placement: 86, alignment: 87, status: "Aligned", skills: ["Python", "Pandas", "Scikit-Learn", "Statistics", "Data Viz"], curriculum_summary: "Applied data science with real-world industry case studies, exploratory data analysis, and predictive modeling.", missing_skills: ["MLOps", "Model Deployment"], last_reviewed: "2026-08-01" },
  { id: 5, name: "Applied Generative AI & Deep Learning", provider: "SVTE", duration: "8 months", enrolled: 189, placement: 91, alignment: 94, status: "Aligned", skills: ["PyTorch", "Transformers", "LLMs", "RAG", "Prompt Engineering"], curriculum_summary: "Cutting-edge syllabus covering Foundation Models, embeddings, vector databases, and enterprise AI workflows.", missing_skills: ["Agentic Workflows"], last_reviewed: "2026-08-10" },
  { id: 6, name: "Cybersecurity & SOC Operations", provider: "SVTE", duration: "5 months", enrolled: 312, placement: 88, alignment: 89, status: "Aligned", skills: ["Network Security", "Ethical Hacking", "SIEM", "Incident Response", "Firewalls"], curriculum_summary: "Practical cybersecurity operations with simulated virtual cyber-range labs.", missing_skills: ["Cloud Security Auditing"], last_reviewed: "2026-07-28" },
  { id: 7, name: "Digital Marketing & Growth Analytics", provider: "SVTE", duration: "3 months", enrolled: 678, placement: 65, alignment: 52, status: "Oversupplied", skills: ["SEO", "SEM", "Social Media", "Email Marketing"], curriculum_summary: "High enrollment but low hiring demand due to oversupply in basic marketing roles.", missing_skills: ["Programmatic Ads", "SQL for Marketers"], last_reviewed: "2026-04-12" },
  { id: 8, name: "Mobile App Development (Flutter & React Native)", provider: "SVTE", duration: "6 months", enrolled: 298, placement: 79, alignment: 81, status: "Aligned", skills: ["Flutter", "Dart", "React Native", "Firebase", "State Management"], curriculum_summary: "Cross-platform mobile app development with end-to-end publishing pipelines.", missing_skills: ["Offline-first Architecture"], last_reviewed: "2026-06-30" },
  { id: 9, name: "DevOps & Site Reliability Engineering", provider: "SVTE", duration: "5 months", enrolled: 156, placement: 85, alignment: 90, status: "Aligned", skills: ["Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Terraform"], curriculum_summary: "Intensive infrastructure automation and reliability engineering track.", missing_skills: ["Service Meshes"], last_reviewed: "2026-07-19" },
  { id: 10, name: "Basic Computer Applications & Typing", provider: "SVTE", duration: "2 months", enrolled: 890, placement: 34, alignment: 28, status: "Oversupplied", skills: ["MS Office", "Typing", "Internet Browsing"], curriculum_summary: "Outdated introductory track with severely diminished industry placement value.", missing_skills: ["Digital Tools", "Spreadsheet Automation"], last_reviewed: "2026-03-01" },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [inspectingCourse, setInspectingCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("http://localhost:8000/api/courses");
        if (res.ok) {
          const data = await res.json();
          if (data.courses && data.courses.length > 0) {
            setCourses(data.courses);
          }
        }
      } catch (err) {
        console.log("Using initial courses state", err);
      }
    }
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      selectedStatus === "All" || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const alignedCount = courses.filter((c) => c.status === "Aligned").length;
  const updateCount = courses.filter((c) => c.status === "Update Needed").length;
  const oversuppliedCount = courses.filter((c) => c.status === "Oversupplied").length;

  const handleCourseUpdated = (updated: Course) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    if (inspectingCourse && inspectingCourse.id === updated.id) {
      setInspectingCourse(updated);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              VOCATIONAL CATALOG
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{courses.length} Active Tracks</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">
            Course Alignment Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Audit vocational syllabus relevance, spot deprecated modules, and modernize curriculum content.
          </p>
        </div>

        {/* Status Counters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="badge-aligned px-3 py-1 rounded-full text-xs font-semibold">
            {alignedCount} Aligned
          </span>
          <span className="badge-update px-3 py-1 rounded-full text-xs font-semibold">
            {updateCount} Update Needed
          </span>
          <span className="badge-critical px-3 py-1 rounded-full text-xs font-semibold">
            {oversuppliedCount} Oversupplied
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="glass-card p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search courses or skills (e.g. Python, AWS, React, Docker)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <svg
            className="w-4 h-4 text-slate-500 absolute left-3 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {["All", "Aligned", "Update Needed", "Oversupplied"].map((st) => (
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
          filteredCourses.map((c) => (
            <div
              key={c.id}
              onClick={() => setInspectingCourse(c)}
              className="glass-card glass-card-interactive p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {c.name}
                  </h3>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      c.status === "Aligned"
                        ? "badge-aligned"
                        : c.status === "Update Needed"
                        ? "badge-update"
                        : "badge-critical"
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ID: CRS-{c.id.toString().padStart(3, "0")}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-3">
                  Provider: <span className="text-slate-300">{c.provider}</span> • Duration:{" "}
                  <span className="text-slate-300">{c.duration}</span> • Enrolled:{" "}
                  <span className="text-blue-400 font-semibold">{c.enrolled}</span> • Reviewed:{" "}
                  <span className="font-mono text-slate-400">{c.last_reviewed || "Recent"}</span>
                </p>

                {/* Skills tags */}
                <div className="flex gap-1.5 flex-wrap">
                  {c.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {c.missing_skills && c.missing_skills.length > 0 && (
                    <span className="bg-rose-950/40 text-rose-300 border border-rose-800/40 px-2 py-0.5 rounded text-[11px] font-semibold">
                      +{c.missing_skills.length} missing modern modules
                    </span>
                  )}
                </div>
              </div>

              {/* Right Metrics & Action */}
              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                <div className="text-right">
                  <div className="text-xs text-slate-400 flex items-center justify-end gap-1.5">
                    <span>Alignment Score:</span>
                    <strong className="text-white font-mono">{c.alignment}%</strong>
                  </div>
                  <div className="w-28 bg-slate-900 rounded-full h-2 mt-1.5 p-[1px] border border-slate-800">
                    <div
                      className={`h-full rounded-full ${
                        c.alignment >= 80
                          ? "bg-emerald-500"
                          : c.alignment >= 60
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${c.alignment}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Placement: <strong className="text-emerald-400">{c.placement}%</strong>
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectingCourse(c);
                  }}
                  className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition-all flex items-center gap-1.5"
                >
                  <span>Inspect</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Course Detail & Modernization Modal */}
      <CourseModal
        course={inspectingCourse}
        onClose={() => setInspectingCourse(null)}
        onCourseUpdated={handleCourseUpdated}
      />
    </main>
  );
}
