import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                SB
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                SkillBridge Intelligence
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Automated labour-market demand-supply mapping, curriculum gap detection, and district-level strategic training intelligence.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span>Status: All Nodes Operational</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">
              Intelligence Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                  Executive Intelligence Dashboard
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-blue-400 transition-colors">
                  Vocational Course Alignment Tracker
                </Link>
              </li>
              <li>
                <Link href="/skill-gaps" className="hover:text-blue-400 transition-colors">
                  Skill Gap Matrix & Capacity Simulator
                </Link>
              </li>
              <li>
                <Link href="/employers" className="hover:text-blue-400 transition-colors">
                  Corporate Employer Demand Signals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">
              Planning & Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/district-plans" className="hover:text-blue-400 transition-colors">
                  District Strategic Training Plans
                </Link>
              </li>
              <li>
                <Link href="/curriculum-advisor" className="hover:text-blue-400 transition-colors">
                  AI Course Syllabus Auditor
                </Link>
              </li>
              <li>
                <span className="text-slate-500">API Documentation & Schemas</span>
              </li>
              <li>
                <span className="text-slate-500">Technical Skilling Standards 2026</span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">
              Institutional Authority
            </h4>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <p className="text-white font-semibold text-xs">Directorate of Vocational Training</p>
              <p className="text-[11px] text-blue-400 font-mono">Labour-Market Analytics Cell</p>
              <p className="text-[11px] text-slate-400">SkillBridge Enterprise Suite</p>
              <p className="text-[10px] text-slate-500 pt-1">
                Vocational Training Alignment Initiative
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 SkillBridge Platform • State Skill & Vocational Training Directorate.</p>
          <div className="flex items-center gap-6">
            <span>Security Compliant (CERT-In Standards)</span>
            <span>Real-Time Ingestion Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
