import Link from "next/link";
import StatCard from "@/components/StatCard";

export default function Home() {
  const liveSignals = [
    { title: "Cloud Infrastructure", growth: "+34% YoY", badge: "Critical Gap", color: "text-rose-400" },
    { title: "Generative AI / LLMs", growth: "+42% YoY", badge: "High Demand", color: "text-purple-400" },
    { title: "Next.js / TypeScript", growth: "+26% YoY", badge: "Curriculum Shift", color: "text-blue-400" },
    { title: "Cybersecurity SOC", growth: "+29% YoY", badge: "Priority Intake", color: "text-emerald-400" },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Real-Time Signal Ingestion",
      desc: "Scrapes and aggregates live job postings, corporate recruiter surveys, and industrial growth indices across all regional industrial districts.",
      icon: "📡",
    },
    {
      step: "02",
      title: "Automated Skill Gap Mapping",
      desc: "Cross-references active state vocational curricula against employer requirements to detect severe deficits and obsolete courses.",
      icon: "🎯",
    },
    {
      step: "03",
      title: "AI Curriculum Alignment",
      desc: "Generates recommended syllabus revisions, practical cloud lab integrations, and modern certification modules for course directors.",
      icon: "⚡",
    },
    {
      step: "04",
      title: "District Plan Execution",
      desc: "Delivers localized training seat allocations, trainer upskilling schedules, and guaranteed employer placement pipelines.",
      icon: "📈",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Section */}
      <section className="relative pt-6 pb-16 text-center overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/60 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-300 mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
          <span>State Intelligence Suite • Labour-Market Demand & Curriculum Alignment</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Bridging the Gap Between <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Vocational Skills & Industry Demand
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
          A real-time labour-market intelligence and curriculum-alignment engine that equips the
          <strong className="text-white"> State Skill & Vocational Training Directorate </strong>
          to dynamically align training programs with emerging industrial expectations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard" className="btn-glow text-sm py-3.5 px-7 w-full sm:w-auto justify-center">
            <span>Explore Executive Cockpit →</span>
          </Link>
          <Link href="/curriculum-advisor" className="btn-secondary text-sm py-3.5 px-6 w-full sm:w-auto justify-center">
            <span>AI Curriculum Auditor</span>
          </Link>
          <Link href="/skill-gaps" className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white border border-transparent hover:border-slate-800 transition-all">
            Capacity Simulator ➔
          </Link>
        </div>
      </section>

      {/* Live Market Signals Ticker */}
      <section className="mb-14">
        <div className="glass-card p-4 border-slate-800/80">
          <div className="flex items-center justify-between gap-4 mb-3 border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-200 tracking-wider uppercase">
                Real-Time Industry Demand Signals (Regional Q3 2026)
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Live Ingestion Active</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {liveSignals.map((sig) => (
              <div key={sig.title} className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-white truncate">{sig.title}</span>
                  <span className={`text-[10px] font-mono font-bold ${sig.color}`}>{sig.growth}</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-medium">
                  {sig.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Key Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <StatCard
          label="Courses Tracked"
          value="1,247"
          change="+14% MoM"
          isPositive={true}
          subtitle="Active & pending vocational syllabus catalog"
          icon="📚"
          accentColor="blue"
        />
        <StatCard
          label="Active Deficits Detected"
          value="389"
          change="8 Critical"
          isPositive={false}
          subtitle="Real-time demand vs trained supply bottlenecks"
          icon="⚡"
          accentColor="rose"
        />
        <StatCard
          label="Avg Placement Rate"
          value="67.4%"
          change="+8.2% YoY"
          isPositive={true}
          subtitle="Post-curriculum modernization verified placements"
          icon="🎯"
          accentColor="emerald"
        />
        <StatCard
          label="Corporate Hiring Partners"
          value="856"
          change="+45 New"
          isPositive={true}
          subtitle="TCS, Infosys, Wipro, Persistent, L&T, TechM & more"
          icon="🏢"
          accentColor="indigo"
        />
      </section>

      {/* Interactive Workflow & Architecture */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
            Continuous Intelligence Loop
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            How SkillBridge Transforms State Vocational Training
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto mt-2">
            Replacing slow, multi-year syllabus updates with an evidence-based, data-driven pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((wf) => (
            <div key={wf.step} className="glass-card p-6 relative group hover:border-blue-500/50">
              <div className="text-3xl mb-4 bg-slate-900 w-12 h-12 rounded-xl border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                {wf.icon}
              </div>
              <span className="text-[11px] font-mono font-bold text-blue-400">PHASE {wf.step}</span>
              <h3 className="text-base font-bold text-white mt-1 mb-2">{wf.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{wf.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Challenge & Solution Matrix */}
      <section className="glass-card p-8 sm:p-10 mb-16 border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
              The Industry Challenge
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Why Traditional Vocational Training Lags Behind Industry Reality
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Skill-development programmes have historically relied on obsolete occupational frameworks.
              Curricula, workshop equipment, trainer qualifications, and evaluation models fail to reflect modern cloud-native architectures, AI tooling, and specialized industrial requirements.
            </p>
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 space-y-2">
              <p className="text-xs font-bold text-rose-300">Impact on Candidates & Industry:</p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Trainees graduate with low hiring readiness and weak placement rates.</li>
                <li>Over 40% of IT seats remain tied up in obsolete office tooling.</li>
                <li>Employers struggle to source certified talent in Cloud, DevOps & AI.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              The SkillBridge Solution
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              An Evidence-Based, Real-Time Translation Mechanism
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              SkillBridge provides continuous translation of live labour signals into direct actionable recommendations for curriculum designers, district directors, and training providers.
            </p>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/40 space-y-2">
              <p className="text-xs font-bold text-emerald-300">Platform Deliverables:</p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Automated AI Curriculum Audit with gap detection in seconds.</li>
                <li>Interactive "What-If" Capacity & Policy Simulator for seat adjustments.</li>
                <li>District-specific strategic roadmaps tailored to local industrial hubs.</li>
                <li>Direct partnership intake channel for corporate employers.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Launchpad Navigation */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🚀</span>
          <span>Direct Access Launchpad</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/dashboard" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Executive Intelligence Dashboard
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Complete bird's-eye view of state skill health, regional heatmaps, and placement KPIs.
            </p>
          </Link>

          <Link href="/courses" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">🎓</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Course Alignment Tracker
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Search and filter state vocational courses, inspect syllabus gaps, and authorize modernization.
            </p>
          </Link>

          <Link href="/skill-gaps" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Skill Gaps & Capacity Simulator
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Model the mathematical outcome of adding training seats and modernizing syllabus units.
            </p>
          </Link>

          <Link href="/employers" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Employer Hiring Signals
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              View vacancy feeds from TCS, Infosys, Wipro, and register new hiring partnerships.
            </p>
          </Link>

          <Link href="/district-plans" className="glass-card glass-card-interactive p-5 block group">
            <div className="text-2xl mb-2">🗺️</div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              District Training Plans
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Examine district-level industrial specialization (Mumbai, Pune, Nagpur, Nashik, Sambhajinagar).
            </p>
          </Link>

          <Link href="/curriculum-advisor" className="glass-card glass-card-interactive p-5 block group border-blue-500/40 bg-blue-950/20">
            <div className="text-2xl mb-2">🤖</div>
            <h4 className="text-sm font-bold text-blue-300 group-hover:text-blue-200 transition-colors">
              AI Curriculum Advisor (Instant Audit)
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Paste any course syllabus to generate an instant industry compatibility score and upgrade plan.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
