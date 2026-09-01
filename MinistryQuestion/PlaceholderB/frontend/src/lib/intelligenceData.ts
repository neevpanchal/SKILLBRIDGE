// Centralized Intelligence Dataset & Types for SkillBridge AI
// Single Source of Truth ensuring 100% numerical and categorical consistency across all dashboards

export interface SkillItem {
  id: number;
  skill: string;
  sector: string;
  demandScore: number;
  supplyScore: number;
  gap: number;
  growthRate: string;
  growthNum: number;
  openings: number;
  avgSalary: string;
  salaryNum: number;
  districtDemand: string[];
  requiredProficiency: "Beginner" | "Intermediate" | "Advanced";
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "OVERSUPPLIED";
  mappedCourses: string[];
  targetRoles: string[];
  keyMissingSubskills: string[];
  evidenceText: string;
}

export interface CourseModuleAction {
  moduleName: string;
  action: "Keep" | "Modify" | "Remove" | "Add";
  reason: string;
  skillsCovered: string[];
  suggestedHours: number;
  practicalLabRequirement: string;
  assessmentMethod: string;
  industryRelevance: string;
  expectedImpact: string;
}

export interface CourseData {
  id: number;
  code: string;
  name: string;
  provider: string;
  duration: string;
  annualIntake: number;
  enrolled: number;
  placed: number;
  placementRate: number;
  alignmentScore: number; // 0 - 100
  scoreBreakdown: {
    skillRelevance: number; // 25% max
    jobMarketDemand: number; // 20% max
    emergingTechCoverage: number; // 15% max
    employerValidation: number; // 15% max
    placementOutcome: number; // 15% max
    practicalLabReadiness: number; // 10% max
  };
  scoreExplanation: string;
  decisionStatus: "ALIGNED" | "UPDATE REQUIRED" | "OBSOLETE / OVERSUPPLIED" | "EMERGING / HIGH PRIORITY";
  recommendedAction: "KEEP" | "MODERNIZE" | "REDUCE SEATS" | "MERGE" | "RETIRE" | "LAUNCH NEW COURSE";
  policyActionDetails: string;
  activeSkills: string[];
  missingSkills: string[];
  deprecatedModules: string[];
  curriculumSummary: string;
  lastReviewed: string;
  trainerRequirement: {
    required: number;
    available: number;
    gap: number;
    skillsNeeded: string[];
  };
  equipmentRequirement: {
    requiredLabs: string[];
    availableLabs: string[];
    labGap: string[];
    estimatedCapex: string;
  };
  recommendedCertifications: string[];
  recommendedTools: string[];
  recommendedCloudPlatforms: string[];
  upgradeModules: CourseModuleAction[];
}

export interface DistrictIntelligence {
  id: number;
  district: string;
  regionCode: string;
  majorIndustries: string[];
  jobDemandScore: number;
  totalVacancies: number;
  topRoles: string[];
  topSkillsDemanded: string[];
  existingCoursesCount: number;
  activeTrainees: number;
  placedTrainees: number;
  placementRate: string;
  placementRateNum: number;
  criticalSkillGap: string;
  recommendedSeatAdjustment: string;
  recommendedNewCourses: string[];
  trainerUpskillQuota: number;
  labUpgradesRequired: number;
  priorityLevel: "Critical Focus" | "High Growth" | "Modernization" | "Emerging";
}

export interface EmployerPartner {
  id: number;
  name: string;
  industry: string;
  location: string;
  partnershipTier: "Tier 1 Platinum" | "Tier 2 Gold" | "Tier 3 Silver";
  openings: number;
  hired: number;
  satisfactionRate: number;
  skillsNeeded: string[];
  validatedCoursesCount: number;
  topRequestedSkills: string[];
}

export interface EarlyWarningAlert {
  id: number;
  level: "CRITICAL" | "WARNING" | "CURRICULUM ALERT" | "EMERGING TECHNOLOGY";
  issue: string;
  evidence: string;
  impact: string;
  recommendedAction: string;
  expectedBenefit: string;
  affectedDistricts: string[];
  timestamp: string;
}

export interface GovernmentPolicyAction {
  id: number;
  title: string;
  category: "Curriculum Modernization" | "Capacity Expansion" | "Seat Reduction" | "Trainer Upskilling" | "Lab Infrastructure" | "Employer Validation";
  urgency: "Immediate (Q3 2026)" | "Medium-term" | "Strategic Policy";
  affectedCourseOrSector: string;
  targetMetric: string;
  description: string;
  evidenceSummary: string;
  projectedROI: string;
  approved: boolean;
}

export interface DataSourceItem {
  name: string;
  source: string;
  lastUpdated: string;
  dataType: string;
  confidence: "High Confidence" | "Medium Confidence" | "Low Confidence";
  recordsSampled: string;
  isPrototypeSimulation: boolean;
}

// =========================================================================
// 1. SKILL INTELLIGENCE CATALOG (Heatmap / Matrix Dataset)
// =========================================================================
export const SKILL_INTELLIGENCE_DATA: SkillItem[] = [
  {
    id: 1,
    skill: "Generative AI & LLMs",
    sector: "AI & Data Engineering",
    demandScore: 92,
    supplyScore: 38,
    gap: 54,
    growthRate: "+42% YoY",
    growthNum: 42,
    openings: 1250,
    avgSalary: "₹8.5 LPA",
    salaryNum: 8.5,
    districtDemand: ["Pune", "Mumbai Metropolitan", "Nagpur"],
    requiredProficiency: "Advanced",
    priority: "CRITICAL",
    mappedCourses: ["Applied Generative AI & Deep Learning", "AI & Data Engineering Foundations"],
    targetRoles: ["GenAI Developer", "AI Research Assistant", "Prompt Architect", "RAG Systems Engineer"],
    keyMissingSubskills: ["LangChain", "Vector Embeddings", "RAG Pipelines", "Model Fine-Tuning", "AI Agents"],
    evidenceText: "1,250 verified job postings across Pune and Mumbai tech hubs require LLM integration, while existing state course syllabi lack hands-on vector database modules."
  },
  {
    id: 2,
    skill: "Cloud Computing & DevOps",
    sector: "IT & Cloud Infrastructure",
    demandScore: 87,
    supplyScore: 51,
    gap: 36,
    growthRate: "+34% YoY",
    growthNum: 34,
    openings: 980,
    avgSalary: "₹7.8 LPA",
    salaryNum: 7.8,
    districtDemand: ["Pune", "Nagpur", "Mumbai Metropolitan"],
    requiredProficiency: "Intermediate",
    priority: "HIGH",
    mappedCourses: ["Cloud Infrastructure & DevOps (AWS/Azure)", "DevOps & Site Reliability Engineering"],
    targetRoles: ["Cloud Solutions Architect", "DevOps Engineer", "Cloud Security Admin"],
    keyMissingSubskills: ["Kubernetes Cluster Ops", "Terraform IaC", "GitHub Actions CI/CD", "AWS Serverless"],
    evidenceText: "71% of regional cloud job postings specify Kubernetes orchestration and Terraform, yet traditional curricula only cover fundamental virtual machine provisioning."
  },
  {
    id: 3,
    skill: "Cybersecurity SOC & Threat Analysis",
    sector: "Cybersecurity & Compliance",
    demandScore: 81,
    supplyScore: 48,
    gap: 33,
    growthRate: "+29% YoY",
    growthNum: 29,
    openings: 720,
    avgSalary: "₹7.2 LPA",
    salaryNum: 7.2,
    districtDemand: ["Pune", "Mumbai Metropolitan", "Nashik"],
    requiredProficiency: "Intermediate",
    priority: "HIGH",
    mappedCourses: ["Cybersecurity & SOC Operations"],
    targetRoles: ["SOC Analyst", "Security Incident Responder", "Penetration Tester", "Cloud Security Auditor"],
    keyMissingSubskills: ["SIEM (Splunk/ELK)", "Cloud Threat Hunting", "Zero Trust Architecture", "MITRE ATT&CK"],
    evidenceText: "BFSI employers in Mumbai and Pune report a 33-point talent shortage in certified security analysts with live incident response sandbox experience."
  },
  {
    id: 4,
    skill: "Full-Stack TypeScript & Next.js",
    sector: "Software Development",
    demandScore: 88,
    supplyScore: 45,
    gap: 43,
    growthRate: "+26% YoY",
    growthNum: 26,
    openings: 840,
    avgSalary: "₹6.8 LPA",
    salaryNum: 6.8,
    districtDemand: ["Pune", "Mumbai Metropolitan", "Chhatrapati Sambhajinagar"],
    requiredProficiency: "Intermediate",
    priority: "HIGH",
    mappedCourses: ["Full-Stack Web Development (Next.js & React)"],
    targetRoles: ["Full-Stack Engineer", "Frontend Architect", "API Specialist"],
    keyMissingSubskills: ["TypeScript Strict Typing", "Next.js App Router", "Tailwind CSS", "Dockerized Microfrontends"],
    evidenceText: "Software recruitment pipelines indicate modern enterprise teams have phased out PHP/jQuery in favor of Next.js and TypeScript."
  },
  {
    id: 5,
    skill: "Industrial IoT & PLC Automation",
    sector: "Automotive & Manufacturing",
    demandScore: 84,
    supplyScore: 42,
    gap: 42,
    growthRate: "+31% YoY",
    growthNum: 31,
    openings: 610,
    avgSalary: "₹6.2 LPA",
    salaryNum: 6.2,
    districtDemand: ["Pune", "Nashik", "Chhatrapati Sambhajinagar", "Kolhapur"],
    requiredProficiency: "Intermediate",
    priority: "HIGH",
    mappedCourses: ["Smart Manufacturing & Industrial Automation"],
    targetRoles: ["Automation Engineer", "SCADA Specialist", "IIoT Interface Developer"],
    keyMissingSubskills: ["Siemens/Allen-Bradley PLC", "SCADA Integration", "Edge Telemetry", "Predictive Maintenance"],
    evidenceText: "Automotive and engineering clusters in Pune-Chakan and Nashik require smart factory technician skills that are missing in conventional mechanical trades."
  },
  {
    id: 6,
    skill: "Data Engineering & Stream Pipelines",
    sector: "AI & Data Engineering",
    demandScore: 78,
    supplyScore: 44,
    gap: 34,
    growthRate: "+22% YoY",
    growthNum: 22,
    openings: 490,
    avgSalary: "₹7.5 LPA",
    salaryNum: 7.5,
    districtDemand: ["Pune", "Mumbai Metropolitan", "Nagpur"],
    requiredProficiency: "Intermediate",
    priority: "MEDIUM",
    mappedCourses: ["Data Science & Machine Learning Foundations"],
    targetRoles: ["Data Engineer", "ETL Developer", "Analytics Engineer"],
    keyMissingSubskills: ["Apache Spark", "Kafka Event Streams", "dbt Data Modeling", "Snowflake/BigQuery"],
    evidenceText: "Enterprise data teams have shifted from batch SQL querying to real-time distributed streaming frameworks."
  },
  {
    id: 7,
    skill: "Cross-Platform Mobile (Flutter/RN)",
    sector: "Software Development",
    demandScore: 70,
    supplyScore: 52,
    gap: 18,
    growthRate: "+15% YoY",
    growthNum: 15,
    openings: 320,
    avgSalary: "₹5.8 LPA",
    salaryNum: 5.8,
    districtDemand: ["Pune", "Mumbai Metropolitan"],
    requiredProficiency: "Intermediate",
    priority: "MEDIUM",
    mappedCourses: ["Mobile App Development (Flutter & React Native)"],
    targetRoles: ["Mobile App Developer", "Flutter Engineer", "React Native Developer"],
    keyMissingSubskills: ["Offline-first Storage", "Native Bridge Interop", "State Management (Bloc/Riverpod)"],
    evidenceText: "App publisher demand is steady with moderate supply capacity across regional polytechnics."
  },
  {
    id: 8,
    skill: "Basic Office Tools & Data Entry",
    sector: "General Computing",
    demandScore: 31,
    supplyScore: 82,
    gap: -51,
    growthRate: "-8% YoY",
    growthNum: -8,
    openings: 210,
    avgSalary: "₹3.1 LPA",
    salaryNum: 3.1,
    districtDemand: ["All Districts"],
    requiredProficiency: "Beginner",
    priority: "OVERSUPPLIED",
    mappedCourses: ["Basic Computer Applications & Typing"],
    targetRoles: ["Data Entry Clerk", "Front Office Assistant"],
    keyMissingSubskills: ["Modern Spreadsheet Automation", "Generative Productivity Tools", "Digital Data Literacy"],
    evidenceText: "Candidate supply exceeds employer demand by 3.2× with declining placement rates (34%) and stagnant wages."
  }
];

// =========================================================================
// 2. VOCATIONAL COURSES CATALOG & MODERNIZATION SCORES
// =========================================================================
export const COURSES_CATALOG: CourseData[] = [
  {
    id: 1,
    code: "CRS-001",
    name: "Advanced Python Programming & API Engineering",
    provider: "State Vocational Board (SVTE)",
    duration: "6 months",
    annualIntake: 450,
    enrolled: 342,
    placed: 304,
    placementRate: 89,
    alignmentScore: 92,
    scoreBreakdown: {
      skillRelevance: 24, // out of 25
      jobMarketDemand: 19, // out of 20
      emergingTechCoverage: 13, // out of 15
      employerValidation: 14, // out of 15
      placementOutcome: 14, // out of 15
      practicalLabReadiness: 8 // out of 10
    },
    scoreExplanation: "High alignment driven by strong asynchronous Python 3.11+, FastAPI, and PostgreSQL curriculum. 89% placement verified by top IT recruiters.",
    decisionStatus: "ALIGNED",
    recommendedAction: "KEEP",
    policyActionDetails: "Maintain current seat allocation; integrate optional microservices capstone module for additional hiring velocity.",
    activeSkills: ["Python", "FastAPI", "Data Structures", "REST APIs", "PostgreSQL", "AsyncIO"],
    missingSkills: ["Kafka Event Bus", "GraphQL"],
    deprecatedModules: [],
    curriculumSummary: "Comprehensive modern backend development covering asynchronous API design, microservices, and database query optimization.",
    lastReviewed: "2026-07-15",
    trainerRequirement: {
      required: 14,
      available: 13,
      gap: 1,
      skillsNeeded: ["FastAPI Microservices", "PostgreSQL Index Tuning"]
    },
    equipmentRequirement: {
      requiredLabs: ["Linux Cloud Sandbox", "REST Client Testing Suite"],
      availableLabs: ["Standard Computer Lab", "Linux Sandbox"],
      labGap: [],
      estimatedCapex: "₹2.5 Lakhs"
    },
    recommendedCertifications: ["PCAP Python Certified", "FastAPI Backend Developer Credential"],
    recommendedTools: ["Postman", "Docker", "VS Code", "GitHub"],
    recommendedCloudPlatforms: ["AWS Elastic Beanstalk", "Render", "Supabase"],
    upgradeModules: [
      {
        moduleName: "Module 1: Advanced Async Python & Design Patterns",
        action: "Keep",
        reason: "Core industry standard for high-concurrency services.",
        skillsCovered: ["Python 3.12", "AsyncIO", "OOP Patterns"],
        suggestedHours: 36,
        practicalLabRequirement: "18 Lab Hours (Async Web Scraping & Telemetry)",
        assessmentMethod: "Automated Unit Test Evaluation (PyTest)",
        industryRelevance: "High",
        expectedImpact: "Solid foundation for API performance"
      },
      {
        moduleName: "Module 2: High-Performance FastAPI Microservices",
        action: "Keep",
        reason: "Primary framework requested in 80%+ modern Python job roles.",
        skillsCovered: ["FastAPI", "Pydantic v2", "OAuth2 / JWT"],
        suggestedHours: 42,
        practicalLabRequirement: "24 Lab Hours (Secured Auth & CRUD Pipeline)",
        assessmentMethod: "Live API Stress Test Benchmark",
        industryRelevance: "Critical",
        expectedImpact: "Direct job readiness for backend engineer roles"
      },
      {
        moduleName: "Module 3: Distributed Event Streams with Kafka",
        action: "Add",
        reason: "Bridge enterprise gap where message queues are mandated by recruiters.",
        skillsCovered: ["Apache Kafka", "Event-Driven Pub/Sub", "RabbitMQ"],
        suggestedHours: 24,
        practicalLabRequirement: "14 Lab Hours (Real-Time Order Processing Simulation)",
        assessmentMethod: "Capstone Project Evaluation",
        industryRelevance: "High",
        expectedImpact: "+12% hiring conversion in enterprise product firms"
      }
    ]
  },
  {
    id: 2,
    code: "CRS-002",
    name: "Full-Stack Web Development (Next.js & React)",
    provider: "State Vocational Board (SVTE)",
    duration: "8 months",
    annualIntake: 600,
    enrolled: 567,
    placed: 420,
    placementRate: 74,
    alignmentScore: 78,
    scoreBreakdown: {
      skillRelevance: 20,
      jobMarketDemand: 17,
      emergingTechCoverage: 11,
      employerValidation: 12,
      placementOutcome: 11,
      practicalLabReadiness: 7
    },
    scoreExplanation: "Good fundamentals in React and Node.js, but alignment is weighed down by legacy jQuery/PHP remnants and omission of TypeScript & Next.js App Router.",
    decisionStatus: "UPDATE REQUIRED",
    recommendedAction: "MODERNIZE",
    policyActionDetails: "Mandate TypeScript 5 and Next.js 14 App Router. Decommission legacy PHP 5 module to recover 30 practical lab hours.",
    activeSkills: ["React", "Node.js", "MongoDB", "Express", "CSS3", "JavaScript ES6"],
    missingSkills: ["TypeScript", "Next.js App Router", "Docker", "Tailwind CSS"],
    deprecatedModules: ["PHP 5 Relational Queries", "jQuery DOM Manipulation"],
    curriculumSummary: "Full-stack web architecture. Requires transition from legacy stack into production-grade TypeScript, modern SSR, and automated CI pipelines.",
    lastReviewed: "2026-06-20",
    trainerRequirement: {
      required: 18,
      available: 12,
      gap: 6,
      skillsNeeded: ["Next.js Server Components", "TypeScript Strict Mode", "Tailwind CSS"]
    },
    equipmentRequirement: {
      requiredLabs: ["Node/Next.js Dev Workstations", "Docker Sandbox"],
      availableLabs: ["Standard Computer Lab"],
      labGap: ["Containerized Sandbox Environment"],
      estimatedCapex: "₹5.0 Lakhs"
    },
    recommendedCertifications: ["Meta Certified Frontend Developer", "Vercel Next.js Practitioner"],
    recommendedTools: ["VS Code", "Vite", "Next.js", "Tailwind", "Docker"],
    recommendedCloudPlatforms: ["Vercel", "AWS Amplify", "Supabase"],
    upgradeModules: [
      {
        moduleName: "Module 1: Legacy PHP & MySQL Scripts",
        action: "Remove",
        reason: "Deprecated by 94% of modern frontend and full-stack hiring partners.",
        skillsCovered: ["PHP 5", "Procedural SQL"],
        suggestedHours: 0,
        practicalLabRequirement: "None (Reclaim 30 hours for TypeScript)",
        assessmentMethod: "Decommissioned",
        industryRelevance: "Obsolete",
        expectedImpact: "Eliminates outdated candidate perceptions"
      },
      {
        moduleName: "Module 2: TypeScript & Modern React 18 Architecture",
        action: "Modify",
        reason: "Replace vanilla JS modules with strict typing and modern state management.",
        skillsCovered: ["TypeScript 5", "React Hooks", "Zustand"],
        suggestedHours: 48,
        practicalLabRequirement: "28 Lab Hours (Interactive SaaS UI Components)",
        assessmentMethod: "Type-Checked Pull Request Review",
        industryRelevance: "Critical",
        expectedImpact: "+18% placement readiness in high-paying web firms"
      },
      {
        moduleName: "Module 3: Next.js App Router, SSR & Server Actions",
        action: "Add",
        reason: "Industry standard for performant production web apps.",
        skillsCovered: ["Next.js 14", "Server Actions", "SEO & Core Web Vitals"],
        suggestedHours: 38,
        practicalLabRequirement: "20 Lab Hours (Full-Stack E-Commerce Portal)",
        assessmentMethod: "Lighthouse Performance & Deployment Audit",
        industryRelevance: "Critical",
        expectedImpact: "+15% employer satisfaction rating"
      }
    ]
  },
  {
    id: 3,
    code: "CRS-003",
    name: "Cloud Infrastructure & DevOps (AWS/Azure)",
    provider: "State Vocational Board (SVTE)",
    duration: "6 months",
    annualIntake: 350,
    enrolled: 234,
    placed: 192,
    placementRate: 82,
    alignmentScore: 64,
    scoreBreakdown: {
      skillRelevance: 16,
      jobMarketDemand: 18,
      emergingTechCoverage: 8,
      employerValidation: 9,
      placementOutcome: 8,
      practicalLabReadiness: 5
    },
    scoreExplanation: "Introductory AWS concepts (EC2, S3) are taught well, but lacks critical Kubernetes, Terraform, and CI/CD modules required by 71% of recruiters.",
    decisionStatus: "UPDATE REQUIRED",
    recommendedAction: "MODERNIZE",
    policyActionDetails: "Integrate Kubernetes container orchestration, Terraform IaC, and cloud lab sandbox. Upskill 7 trainers.",
    activeSkills: ["AWS Basics", "EC2", "S3", "Linux Basics", "Networking Fundamentals"],
    missingSkills: ["Kubernetes", "Terraform", "GitHub Actions CI/CD", "Docker", "Cloud Security"],
    deprecatedModules: ["Manual FTP Deployment", "Single-Server Apache Configs"],
    curriculumSummary: "Cloud system administration fundamentals. Requires major update to include multi-cloud DevOps, automated pipelines, and IaC.",
    lastReviewed: "2026-05-10",
    trainerRequirement: {
      required: 18,
      available: 11,
      gap: 7,
      skillsNeeded: ["Kubernetes CKA", "HashiCorp Terraform", "AWS Solutions Architect"]
    },
    equipmentRequirement: {
      requiredLabs: ["Dedicated Cloud Sandbox Lab", "Linux High-Memory Nodes", "Networking Lab"],
      availableLabs: ["Basic Networking Lab"],
      labGap: ["Cloud Credits Pool", "Virtual K8s Cluster Lab"],
      estimatedCapex: "₹12.0 Lakhs"
    },
    recommendedCertifications: ["AWS Certified Solutions Architect", "Certified Kubernetes Administrator (CKA)", "Terraform Associate"],
    recommendedTools: ["Docker", "Kubernetes (kubectl/k9s)", "Terraform", "Helm", "Prometheus"],
    recommendedCloudPlatforms: ["AWS", "Azure", "Google Cloud Platform"],
    upgradeModules: [
      {
        moduleName: "Module 1: Cloud Fundamentals & Core Services",
        action: "Keep",
        reason: "Essential groundwork for compute, storage, and networking.",
        skillsCovered: ["IAM", "VPC", "EC2", "S3", "CloudWatch"],
        suggestedHours: 32,
        practicalLabRequirement: "16 Lab Hours (VPC Peering & High Availability Setup)",
        assessmentMethod: "Scenario-based Cloud Infrastructure Exam",
        industryRelevance: "High",
        expectedImpact: "Strong base for junior cloud operations"
      },
      {
        moduleName: "Module 2: Containerization & Kubernetes Orchestration",
        action: "Add",
        reason: "Appears in 71% of relevant cloud job postings across Maharashtra.",
        skillsCovered: ["Docker Containers", "K8s Deployments", "Ingress", "Helm Charts"],
        suggestedHours: 40,
        practicalLabRequirement: "24 Lab Hours (Multi-Container Microservice Cluster)",
        assessmentMethod: "Live Cluster Deployment & Fault Recovery Challenge",
        industryRelevance: "Critical",
        expectedImpact: "+24% placement conversion rate"
      },
      {
        moduleName: "Module 3: Infrastructure as Code with Terraform & CI/CD",
        action: "Add",
        reason: "Mandated by enterprise employers for automated governance.",
        skillsCovered: ["Terraform HCL", "State Management", "GitHub Actions", "ArgoCD"],
        suggestedHours: 34,
        practicalLabRequirement: "18 Lab Hours (Automated GitOps Infrastructure Provisioning)",
        assessmentMethod: "Automated Pipeline PR Validation",
        industryRelevance: "Critical",
        expectedImpact: "Boosts starting graduate salary by +₹2.2 LPA"
      }
    ]
  },
  {
    id: 4,
    code: "CRS-004",
    name: "Applied Generative AI & Deep Learning",
    provider: "State Vocational Board (SVTE)",
    duration: "8 months",
    annualIntake: 250,
    enrolled: 189,
    placed: 172,
    placementRate: 91,
    alignmentScore: 95,
    scoreBreakdown: {
      skillRelevance: 25,
      jobMarketDemand: 20,
      emergingTechCoverage: 15,
      employerValidation: 14,
      placementOutcome: 13,
      practicalLabReadiness: 8
    },
    scoreExplanation: "Top tier alignment. Comprehensive coverage of PyTorch, Transformers, LLM fine-tuning, and RAG pipelines. Very high recruiter satisfaction (88%).",
    decisionStatus: "EMERGING / HIGH PRIORITY",
    recommendedAction: "KEEP",
    policyActionDetails: "Expand annual intake by +150 seats across Pune and Mumbai centers; provide GPU lab infrastructure grant.",
    activeSkills: ["PyTorch", "Transformers", "LLMs", "RAG Pipelines", "Prompt Engineering", "Vector DBs", "FastAPI"],
    missingSkills: ["Autonomous AI Agents", "Quantization (GGUF/Ollama)"],
    deprecatedModules: [],
    curriculumSummary: "State-of-the-art syllabus covering Foundation Models, embeddings, vector search, LangChain, and enterprise generative AI solutions.",
    lastReviewed: "2026-08-10",
    trainerRequirement: {
      required: 12,
      available: 8,
      gap: 4,
      skillsNeeded: ["LLM Fine-Tuning", "GPU Compute Optimization", "Vector Indexing"]
    },
    equipmentRequirement: {
      requiredLabs: ["NVIDIA RTX/A4000 GPU Cluster", "High-Throughput Vector DB Server"],
      availableLabs: ["Standard Computer Lab", "Cloud Compute Credits"],
      labGap: ["Dedicated On-Prem GPU Hardware"],
      estimatedCapex: "₹18.5 Lakhs"
    },
    recommendedCertifications: ["DeepLearning.AI GenAI Specialization", "Hugging Face Transformers Credential"],
    recommendedTools: ["LangChain", "LlamaIndex", "ChromaDB", "Pinecone", "Ollama", "Hugging Face"],
    recommendedCloudPlatforms: ["AWS SageMaker", "Google Vertex AI", "Modal / Replicate"],
    upgradeModules: [
      {
        moduleName: "Module 1: Deep Learning & Transformer Architectures",
        action: "Keep",
        reason: "Theoretical and practical foundation for modern NLP and Vision.",
        skillsCovered: ["PyTorch", "Attention Mechanisms", "Hugging Face"],
        suggestedHours: 40,
        practicalLabRequirement: "20 Lab Hours (Custom Transformer from Scratch)",
        assessmentMethod: "Model Loss Convergence & Benchmark Evaluation",
        industryRelevance: "Critical",
        expectedImpact: "Core AI competency"
      },
      {
        moduleName: "Module 2: Enterprise RAG & Vector Database Systems",
        action: "Keep",
        reason: "Highest employer demand for internal enterprise search and assistants.",
        skillsCovered: ["Embeddings", "ChromaDB", "RAG", "Hybrid Search"],
        suggestedHours: 44,
        practicalLabRequirement: "24 Lab Hours (Enterprise PDF Semantic Search Engine)",
        assessmentMethod: "Retrieval Accuracy & Latency Benchmark",
        industryRelevance: "Critical",
        expectedImpact: "Direct deployment in BFSI and IT services"
      },
      {
        moduleName: "Module 3: Autonomous Multi-Agent Workflows",
        action: "Add",
        reason: "Emerging enterprise architecture for automated multi-step reasoning.",
        skillsCovered: ["CrewAI", "LangGraph", "Tool Calling", "Agentic Loops"],
        suggestedHours: 28,
        practicalLabRequirement: "16 Lab Hours (Multi-Agent Market Research Bot)",
        assessmentMethod: "Agentic Task Completion Success Metric",
        industryRelevance: "Emerging",
        expectedImpact: "Future-proofs syllabus for next 24 months"
      }
    ]
  },
  {
    id: 5,
    code: "CRS-005",
    name: "Cybersecurity & SOC Operations",
    provider: "State Vocational Board (SVTE)",
    duration: "5 months",
    annualIntake: 400,
    enrolled: 312,
    placed: 275,
    placementRate: 88,
    alignmentScore: 89,
    scoreBreakdown: {
      skillRelevance: 23,
      jobMarketDemand: 18,
      emergingTechCoverage: 13,
      employerValidation: 14,
      placementOutcome: 13,
      practicalLabReadiness: 8
    },
    scoreExplanation: "Strong practical alignment with virtual cyber-range labs, SIEM analysis, and incident response. High demand in BFSI and IT services.",
    decisionStatus: "ALIGNED",
    recommendedAction: "KEEP",
    policyActionDetails: "Increase intake capacity by 25%; partner with CERT-In for real-world threat telemetry case studies.",
    activeSkills: ["Network Security", "Ethical Hacking", "SIEM (Splunk)", "Incident Response", "Firewalls", "Wireshark"],
    missingSkills: ["Cloud Security Auditing (AWS/Azure)", "Zero Trust Architecture"],
    deprecatedModules: [],
    curriculumSummary: "Hands-on cybersecurity operations focusing on defensive telemetry, attack simulation, vulnerability triage, and forensic incident handling.",
    lastReviewed: "2026-07-28",
    trainerRequirement: {
      required: 14,
      available: 11,
      gap: 3,
      skillsNeeded: ["SOC Tier-2 Forensics", "Cloud Security Auditing"]
    },
    equipmentRequirement: {
      requiredLabs: ["Isolated Cyber Range Sandbox", "SIEM Telemetry Server"],
      availableLabs: ["Cyber Lab Sandbox", "Standard Lab"],
      labGap: [],
      estimatedCapex: "₹4.0 Lakhs"
    },
    recommendedCertifications: ["CompTIA Security+", "Certified SOC Analyst (CSA)", "CEH"],
    recommendedTools: ["Splunk", "Wireshark", "Burp Suite", "Nmap", "Suricata"],
    recommendedCloudPlatforms: ["AWS GuardDuty", "Azure Sentinel"],
    upgradeModules: [
      {
        moduleName: "Module 1: SOC Threat Analysis & SIEM Telemetry",
        action: "Keep",
        reason: "Core role requirement for junior SOC analysts.",
        skillsCovered: ["Splunk", "Log Ingestion", "Alert Rule Authoring"],
        suggestedHours: 36,
        practicalLabRequirement: "20 Lab Hours (Live Log Analysis on Simulated Attack)",
        assessmentMethod: "Attack Timeline Reconstruction & Report",
        industryRelevance: "Critical",
        expectedImpact: "Direct hiring by Managed Security Service Providers"
      },
      {
        moduleName: "Module 2: Cloud Threat Auditing & Zero Trust Architecture",
        action: "Add",
        reason: "Most enterprise breaches target misconfigured cloud permissions.",
        skillsCovered: ["AWS IAM Policies", "CloudTrail Audits", "Zero Trust"],
        suggestedHours: 26,
        practicalLabRequirement: "14 Lab Hours (Cloud Security Posture Audit)",
        assessmentMethod: "Vulnerability Remediation Lab",
        industryRelevance: "High",
        expectedImpact: "+10% starting wage bump"
      }
    ]
  },
  {
    id: 6,
    code: "CRS-006",
    name: "Smart Manufacturing & Industrial IoT",
    provider: "State Vocational Board (SVTE)",
    duration: "6 months",
    annualIntake: 300,
    enrolled: 220,
    placed: 180,
    placementRate: 82,
    alignmentScore: 84,
    scoreBreakdown: {
      skillRelevance: 22,
      jobMarketDemand: 17,
      emergingTechCoverage: 12,
      employerValidation: 13,
      placementOutcome: 12,
      practicalLabReadiness: 8
    },
    scoreExplanation: "Well-calibrated to auto-industrial corridors in Pune-Chakan and Nashik. Good PLC/SCADA integration.",
    decisionStatus: "ALIGNED",
    recommendedAction: "KEEP",
    policyActionDetails: "Deploy supplementary Edge Computing kits to 4 district polytechnics in manufacturing zones.",
    activeSkills: ["PLC Programming", "SCADA Systems", "Industrial IoT Sensors", "CAD/CAM", "Predictive Maintenance"],
    missingSkills: ["Edge AI for Quality Inspection", "ROS (Robot Operating System)"],
    deprecatedModules: ["Manual Relay Logic Only"],
    curriculumSummary: "Applied industrial automation, telemetry networking, PLC ladder logic programming, and smart factory sensory interfaces.",
    lastReviewed: "2026-07-02",
    trainerRequirement: {
      required: 12,
      available: 9,
      gap: 3,
      skillsNeeded: ["Siemens TIA Portal", "IIoT MQTT Gateways"]
    },
    equipmentRequirement: {
      requiredLabs: ["Siemens/ABB PLC Workstations", "IIoT Sensor Testbed", "Pneumatics Kit"],
      availableLabs: ["Basic PLC Workstations"],
      labGap: ["IIoT Sensor Gateway Testbed"],
      estimatedCapex: "₹8.0 Lakhs"
    },
    recommendedCertifications: ["Siemens Certified Automation Associate", "ISA IIoT Specialist"],
    recommendedTools: ["Siemens TIA Portal", "Node-RED", "AutoCAD", "MATLAB"],
    recommendedCloudPlatforms: ["AWS IoT Core", "ThingsBoard"],
    upgradeModules: [
      {
        moduleName: "Module 1: Advanced PLC & SCADA Programming",
        action: "Keep",
        reason: "Standard equipment in all modern auto assembly lines.",
        skillsCovered: ["Ladder Logic", "Function Block Diagram", "SCADA GUI"],
        suggestedHours: 42,
        practicalLabRequirement: "24 Lab Hours (Automated Conveyor & Sorter Logic)",
        assessmentMethod: "PLC Fault Simulation & Debug Test",
        industryRelevance: "Critical",
        expectedImpact: "Guaranteed placement in manufacturing hubs"
      },
      {
        moduleName: "Module 2: Edge Telemetry & Computer Vision QA",
        action: "Add",
        reason: "Auto OEMs require automated visual defect inspection.",
        skillsCovered: ["OpenCV on Raspberry Pi", "MQTT Protocols", "Edge Inference"],
        suggestedHours: 28,
        practicalLabRequirement: "16 Lab Hours (Camera-based Defect Detection Lab)",
        assessmentMethod: "Defect Detection Accuracy Benchmark",
        industryRelevance: "High",
        expectedImpact: "+16% salary premium in tier-1 auto ancillaries"
      }
    ]
  },
  {
    id: 7,
    code: "CRS-007",
    name: "Data Science & Machine Learning Foundations",
    provider: "State Vocational Board (SVTE)",
    duration: "6 months",
    annualIntake: 500,
    enrolled: 445,
    placed: 382,
    placementRate: 86,
    alignmentScore: 87,
    scoreBreakdown: {
      skillRelevance: 23,
      jobMarketDemand: 18,
      emergingTechCoverage: 13,
      employerValidation: 13,
      placementOutcome: 12,
      practicalLabReadiness: 8
    },
    scoreExplanation: "Solid grounding in Python, Pandas, statistical testing, and Scikit-Learn. High placement in IT and analytics centers.",
    decisionStatus: "ALIGNED",
    recommendedAction: "KEEP",
    policyActionDetails: "Incorporate MLOps and dbt pipeline units; maintain intake volume.",
    activeSkills: ["Python", "Pandas", "Scikit-Learn", "Statistics", "Data Viz", "SQL"],
    missingSkills: ["MLOps (MLflow)", "dbt Data Pipelines"],
    deprecatedModules: [],
    curriculumSummary: "Applied data science with exploratory data analysis, hypothesis testing, predictive regression/classification, and BI dashboards.",
    lastReviewed: "2026-08-01",
    trainerRequirement: {
      required: 16,
      available: 13,
      gap: 3,
      skillsNeeded: ["MLOps Pipelines", "Feature Stores"]
    },
    equipmentRequirement: {
      requiredLabs: ["Data Science Computing Lab", "Jupyter Hub Server"],
      availableLabs: ["Standard Computer Lab", "Jupyter Server"],
      labGap: [],
      estimatedCapex: "₹3.0 Lakhs"
    },
    recommendedCertifications: ["Google Data Analytics Professional", "Databricks Certified Associate"],
    recommendedTools: ["Jupyter", "Pandas", "Tableau", "MLflow", "Git"],
    recommendedCloudPlatforms: ["Google BigQuery", "AWS QuickSight"],
    upgradeModules: [
      {
        moduleName: "Module 1: Exploratory Data Analysis & Feature Pipelines",
        action: "Keep",
        reason: "Core daily task of data analysts and junior data scientists.",
        skillsCovered: ["Pandas", "Seaborn", "Feature Engineering"],
        suggestedHours: 36,
        practicalLabRequirement: "20 Lab Hours (Telecom Churn Dataset Analysis)",
        assessmentMethod: "EDA Report & Statistical Validation",
        industryRelevance: "High",
        expectedImpact: "High competence in data manipulation"
      },
      {
        moduleName: "Module 2: MLOps Model Deployment & Tracking",
        action: "Add",
        reason: "Recruiters require models deployed via REST APIs, not just notebooks.",
        skillsCovered: ["FastAPI Model Serving", "MLflow Tracking", "Docker"],
        suggestedHours: 26,
        practicalLabRequirement: "14 Lab Hours (Containerized ML Inference API)",
        assessmentMethod: "API Latency & Uptime Test",
        industryRelevance: "High",
        expectedImpact: "+14% placement boost in tech firms"
      }
    ]
  },
  {
    id: 8,
    code: "CRS-008",
    name: "Digital Marketing & Growth Analytics",
    provider: "State Vocational Board (SVTE)",
    duration: "3 months",
    annualIntake: 800,
    enrolled: 678,
    placed: 440,
    placementRate: 65,
    alignmentScore: 52,
    scoreBreakdown: {
      skillRelevance: 12,
      jobMarketDemand: 11,
      emergingTechCoverage: 7,
      employerValidation: 8,
      placementOutcome: 9,
      practicalLabReadiness: 5
    },
    scoreExplanation: "High enrollment but declining placement rate (65%). Generic social media and basic SEO syllabus is commoditized and oversupplied.",
    decisionStatus: "OBSOLETE / OVERSUPPLIED",
    recommendedAction: "REDUCE SEATS",
    policyActionDetails: "Reduce annual seats by 40% (800 ➔ 480). Pivot remaining syllabus to Performance Marketing, SQL for Marketers, and MarTech automation.",
    activeSkills: ["Basic SEO", "Social Media Posting", "Email Campaigns", "Canva Design"],
    missingSkills: ["Programmatic Ads (Meta/Google Ads API)", "SQL for Marketing Attribution", "GA4 Analytics", "Conversion Optimization"],
    deprecatedModules: ["Manual Backlink Spamming", "Generic Forum Posting"],
    curriculumSummary: "Digital marketing fundamentals. Oversupplied in entry-level posting skills; lacks data-driven attribution and MarTech tooling.",
    lastReviewed: "2026-04-12",
    trainerRequirement: {
      required: 12,
      available: 14,
      gap: -2, // Surplus of traditional trainers
      skillsNeeded: ["GA4 Attribution Modeling", "Performance Marketing"]
    },
    equipmentRequirement: {
      requiredLabs: ["Standard Computer Lab", "Ad Spend Sandbox"],
      availableLabs: ["Standard Computer Lab"],
      labGap: [],
      estimatedCapex: "₹1.5 Lakhs"
    },
    recommendedCertifications: ["Google Ads Search Certified", "HubSpot Inbound Marketing"],
    recommendedTools: ["Google Analytics 4", "Meta Ads Manager", "Semrush", "Looker Studio"],
    recommendedCloudPlatforms: ["Google Cloud for Marketing"],
    upgradeModules: [
      {
        moduleName: "Module 1: Performance Marketing & Paid Acquisition",
        action: "Modify",
        reason: "Shift from organic posting to data-driven ad spend optimization.",
        skillsCovered: ["Meta Ads", "Google Search Ads", "ROAS Optimization"],
        suggestedHours: 32,
        practicalLabRequirement: "18 Lab Hours (Simulated ₹10K Ad Campaign Setup)",
        assessmentMethod: "Campaign ROAS & Conversion Audit",
        industryRelevance: "High",
        expectedImpact: "+18% placement into digital agencies"
      },
      {
        moduleName: "Module 2: Marketing Analytics with SQL & GA4",
        action: "Add",
        reason: "Required for mid-to-high paying growth analyst roles.",
        skillsCovered: ["GA4 Events", "SQL Queries for Attribution", "Looker Dashboards"],
        suggestedHours: 24,
        practicalLabRequirement: "12 Lab Hours (E-Commerce Funnel Drop-off Analysis)",
        assessmentMethod: "Attribution Dashboard Project",
        industryRelevance: "High",
        expectedImpact: "+22% average starting salary"
      }
    ]
  },
  {
    id: 9,
    code: "CRS-009",
    name: "DevOps & Site Reliability Engineering",
    provider: "State Vocational Board (SVTE)",
    duration: "5 months",
    annualIntake: 200,
    enrolled: 156,
    placed: 133,
    placementRate: 85,
    alignmentScore: 90,
    scoreBreakdown: {
      skillRelevance: 24,
      jobMarketDemand: 19,
      emergingTechCoverage: 14,
      employerValidation: 13,
      placementOutcome: 12,
      practicalLabReadiness: 8
    },
    scoreExplanation: "High alignment with strong containerization, GitHub Actions, Prometheus monitoring, and Terraform labs.",
    decisionStatus: "ALIGNED",
    recommendedAction: "KEEP",
    policyActionDetails: "Increase intake by 50 seats; integrate chaos engineering and eBPF observability fundamentals.",
    activeSkills: ["Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Terraform", "Linux Hardening"],
    missingSkills: ["Service Meshes (Istio)", "Chaos Engineering"],
    deprecatedModules: [],
    curriculumSummary: "Infrastructure automation, distributed reliability engineering, CI/CD pipeline authoring, and telemetry observability.",
    lastReviewed: "2026-07-19",
    trainerRequirement: {
      required: 10,
      available: 7,
      gap: 3,
      skillsNeeded: ["Kubernetes SRE Practices", "Prometheus/Grafana Alerting"]
    },
    equipmentRequirement: {
      requiredLabs: ["Multi-Node Linux Cluster", "Observability Dashboard Lab"],
      availableLabs: ["Linux Sandbox"],
      labGap: ["Telemetry Ingestion Node"],
      estimatedCapex: "₹4.5 Lakhs"
    },
    recommendedCertifications: ["CKA (Certified Kubernetes Admin)", "GitHub Actions Specialist"],
    recommendedTools: ["Docker", "Kubernetes", "Helm", "Prometheus", "Grafana", "ArgoCD"],
    recommendedCloudPlatforms: ["AWS EKS", "Azure AKS"],
    upgradeModules: [
      {
        moduleName: "Module 1: Container Orchestration & CI/CD Pipelines",
        action: "Keep",
        reason: "Core foundation of SRE practices in product companies.",
        skillsCovered: ["K8s", "Helm", "GitHub Actions"],
        suggestedHours: 36,
        practicalLabRequirement: "20 Lab Hours (Blue-Green Deployment Pipeline)",
        assessmentMethod: "Zero-Downtime Pipeline Deployment Test",
        industryRelevance: "Critical",
        expectedImpact: "High hiring velocity"
      },
      {
        moduleName: "Module 2: Observability, Metrics & SRE On-Call Operations",
        action: "Keep",
        reason: "Ensures trainees understand production incident handling and SLIs/SLOs.",
        skillsCovered: ["Prometheus", "Grafana", "Alertmanager", "Incident Postmortems"],
        suggestedHours: 28,
        practicalLabRequirement: "16 Lab Hours (High-Load Simulation & Alerting Setup)",
        assessmentMethod: "Simulated Outage Triage Challenge",
        industryRelevance: "Critical",
        expectedImpact: "+20% starting salary boost"
      }
    ]
  },
  {
    id: 10,
    code: "CRS-010",
    name: "Basic Computer Applications & Typing",
    provider: "State Vocational Board (SVTE)",
    duration: "2 months",
    annualIntake: 1200,
    enrolled: 890,
    placed: 302,
    placementRate: 34,
    alignmentScore: 28,
    scoreBreakdown: {
      skillRelevance: 6,
      jobMarketDemand: 5,
      emergingTechCoverage: 3,
      employerValidation: 4,
      placementOutcome: 5,
      practicalLabReadiness: 5
    },
    scoreExplanation: "Severely outdated introductory curriculum. Lowest alignment score in state catalog (28/100). Low placement (34%) and extreme supply mismatch (3.2x oversupply).",
    decisionStatus: "OBSOLETE / OVERSUPPLIED",
    recommendedAction: "REDUCE SEATS",
    policyActionDetails: "Cut annual seats by 65% (1200 ➔ 420). Merge remaining capacity into Modern Digital Productivity + AI Tools + Data Literacy track.",
    activeSkills: ["MS Word Basics", "English Typing", "Internet Browsing", "Basic Windows OS"],
    missingSkills: ["Modern Spreadsheet Automation", "Generative AI Productivity Tools", "Cloud Collaboration", "Data Hygiene"],
    deprecatedModules: ["Typing Master Drills", "MS Word 2007 Mail Merge Only", "Floppy/CD Handling"],
    curriculumSummary: "Outdated clerical typing course. Substantially disconnected from modern digital workplace expectations.",
    lastReviewed: "2026-03-01",
    trainerRequirement: {
      required: 15,
      available: 28,
      gap: -13, // Massive surplus of legacy typing instructors
      skillsNeeded: ["Digital Tools Upskilling", "AI Prompting for Productivity"]
    },
    equipmentRequirement: {
      requiredLabs: ["Basic Desktop PCs"],
      availableLabs: ["Legacy Desktop Labs"],
      labGap: [],
      estimatedCapex: "₹0 (Reallocate funds to Cloud/AI labs)"
    },
    recommendedCertifications: ["Microsoft Digital Literacy", "Google Workspace Certified"],
    recommendedTools: ["Google Docs/Sheets", "ChatGPT for Office", "Slack", "Notion"],
    recommendedCloudPlatforms: ["Google Cloud Workspace", "Microsoft 365 Cloud"],
    upgradeModules: [
      {
        moduleName: "Module 1: Legacy 30 WPM Mechanical Typing Drills",
        action: "Remove",
        reason: "Mechanical typing speed has zero market value without digital tooling fluency.",
        skillsCovered: ["Typing Tutor"],
        suggestedHours: 0,
        practicalLabRequirement: "None (Reclaim 24 hours)",
        assessmentMethod: "Decommissioned",
        industryRelevance: "Obsolete",
        expectedImpact: "Frees lab hours for modern productivity"
      },
      {
        moduleName: "Module 2: Cloud Workplace Collaboration & Spreadsheet Automation",
        action: "Add",
        reason: "Essential for modern administrative assistants, ops coordinators, and clerks.",
        skillsCovered: ["Advanced Excel / Sheets", "VLOOKUP/XLOOKUP", "Pivot Tables", "Cloud Docs"],
        suggestedHours: 32,
        practicalLabRequirement: "20 Lab Hours (Automated Monthly Expense Ledger)",
        assessmentMethod: "Automated Spreadsheet Formula Audit",
        industryRelevance: "High",
        expectedImpact: "Boosts placement rate from 34% to 68%"
      },
      {
        moduleName: "Module 3: Generative AI for Workplace Productivity",
        action: "Add",
        reason: "Equips clerks with modern AI drafting, summarizing, and data cleanup tools.",
        skillsCovered: ["AI Prompting for Drafting", "Meeting Summarization", "Data Cleanup"],
        suggestedHours: 20,
        practicalLabRequirement: "12 Lab Hours (AI-assisted Office Workflow Simulation)",
        assessmentMethod: "Task Turnaround Speed Benchmark",
        industryRelevance: "Emerging",
        expectedImpact: "+35% workplace efficiency"
      }
    ]
  }
];

// =========================================================================
// 3. DISTRICT-LEVEL INTELLIGENCE DATASET (All 8 Core Maharashtra Clusters)
// =========================================================================
export const DISTRICT_INTELLIGENCE_DATA: DistrictIntelligence[] = [
  {
    id: 1,
    district: "Pune",
    regionCode: "MH-PUN",
    majorIndustries: ["IT & Cloud Services", "Automotive & EV", "Industrial IoT & Manufacturing", "FinTech"],
    jobDemandScore: 94,
    totalVacancies: 1850,
    topRoles: ["Cloud Solutions Engineer", "AI/ML Developer", "PLC Automation Engineer", "Full-Stack Dev"],
    topSkillsDemanded: ["Cloud Infrastructure", "Generative AI", "Kubernetes", "PLC Automation", "TypeScript"],
    existingCoursesCount: 76,
    activeTrainees: 2890,
    placedTrainees: 1994,
    placementRate: "69.0%",
    placementRateNum: 69.0,
    criticalSkillGap: "Cloud & AI Engineering Deficit (+54% Shortage)",
    recommendedSeatAdjustment: "+30% Cloud & AI Seats; -40% Basic Typing Seats",
    recommendedNewCourses: ["Applied Generative AI & Deep Learning", "Kubernetes & Cloud Native Systems"],
    trainerUpskillQuota: 18,
    labUpgradesRequired: 6,
    priorityLevel: "Critical Focus"
  },
  {
    id: 2,
    district: "Mumbai Metropolitan",
    regionCode: "MH-MUM",
    majorIndustries: ["BFSI & FinTech", "Enterprise Software", "Cybersecurity", "Media & Digital Services"],
    jobDemandScore: 96,
    totalVacancies: 2240,
    topRoles: ["Cybersecurity SOC Analyst", "Full-Stack TypeScript Engineer", "FinTech Data Analyst", "Cloud Architect"],
    topSkillsDemanded: ["SOC Threat Intelligence", "Next.js / TypeScript", "Cloud Security", "SQL Analytics", "Python"],
    existingCoursesCount: 89,
    activeTrainees: 3450,
    placedTrainees: 2484,
    placementRate: "72.0%",
    placementRateNum: 72.0,
    criticalSkillGap: "Cybersecurity SOC & Secure API Engineering",
    recommendedSeatAdjustment: "+25% SOC Security Seats; +20% Full-Stack TypeScript",
    recommendedNewCourses: ["FinTech Security & Compliance", "Next.js Enterprise Systems"],
    trainerUpskillQuota: 14,
    labUpgradesRequired: 4,
    priorityLevel: "Critical Focus"
  },
  {
    id: 3,
    district: "Nagpur",
    regionCode: "MH-NAG",
    majorIndustries: ["Logistics & Supply Chain", "Emerging IT Hub (MIHAN)", "Aviation Maintenance", "Data Operations"],
    jobDemandScore: 78,
    totalVacancies: 920,
    topRoles: ["Data Pipeline Engineer", "Cloud Ops Associate", "Logistics Telemetry Specialist", "Web Developer"],
    topSkillsDemanded: ["Data Engineering", "AWS Fundamentals", "Python", "Supply Chain Systems", "Docker"],
    existingCoursesCount: 52,
    activeTrainees: 1620,
    placedTrainees: 988,
    placementRate: "61.0%",
    placementRateNum: 61.0,
    criticalSkillGap: "Data Pipelines & Cloud Infrastructure",
    recommendedSeatAdjustment: "+35% Data Engineering Seats; -30% Clerical Computing",
    recommendedNewCourses: ["Data Pipelines & Cloud Storage", "Logistics Digital Telemetry"],
    trainerUpskillQuota: 11,
    labUpgradesRequired: 3,
    priorityLevel: "High Growth"
  },
  {
    id: 4,
    district: "Nashik",
    regionCode: "MH-NSK",
    majorIndustries: ["Defense Electronics (HAL)", "Automotive Ancillaries", "Precision Engineering", "Agri-Tech"],
    jobDemandScore: 74,
    totalVacancies: 710,
    topRoles: ["Industrial IoT Specialist", "CAD/CAM Tool Designer", "Embedded C++ Developer", "Quality Engineer"],
    topSkillsDemanded: ["PLC / SCADA", "Embedded Systems", "CAD/CAM", "Sensory Telemetry", "Quality Automation"],
    existingCoursesCount: 44,
    activeTrainees: 1250,
    placedTrainees: 725,
    placementRate: "58.0%",
    placementRateNum: 58.0,
    criticalSkillGap: "Industrial Automation & Embedded Sensor Networks",
    recommendedSeatAdjustment: "+40% Smart Manufacturing Seats; Upgrade 3 Electronics Labs",
    recommendedNewCourses: ["Smart Factory Automation & Robotics", "Embedded Defense Electronics"],
    trainerUpskillQuota: 9,
    labUpgradesRequired: 3,
    priorityLevel: "Modernization"
  },
  {
    id: 5,
    district: "Chhatrapati Sambhajinagar",
    regionCode: "MH-CSB",
    majorIndustries: ["Automotive & Heavy Engineering", "Pharmaceuticals", "Plastics & Tooling", "Brewery & Biotech"],
    jobDemandScore: 71,
    totalVacancies: 640,
    topRoles: ["Automation Technician", "Biotech Lab Systems Operator", "PLC Maintenance Engineer", "Quality Auditor"],
    topSkillsDemanded: ["PLC Programming", "SCADA Maintenance", "Pharma QA Automation", "Digital Metrology"],
    existingCoursesCount: 38,
    activeTrainees: 1100,
    placedTrainees: 605,
    placementRate: "55.0%",
    placementRateNum: 55.0,
    criticalSkillGap: "PLC / SCADA & Pharma Process Automation",
    recommendedSeatAdjustment: "+25% Mechatronics Seats; Decommission legacy manual machining",
    recommendedNewCourses: ["Pharma Process Automation", "Industrial Robotics Maintenance"],
    trainerUpskillQuota: 8,
    labUpgradesRequired: 2,
    priorityLevel: "Modernization"
  },
  {
    id: 6,
    district: "Kolhapur",
    regionCode: "MH-KLP",
    majorIndustries: ["Foundry & Casting", "Textile Machinery", "Auto Ancillaries", "Sugar & Bio-Energy"],
    jobDemandScore: 66,
    totalVacancies: 480,
    topRoles: ["Foundry Digital Metrology Tech", "CNC Programmer", "Solar Grid Technician", "Quality Inspector"],
    topSkillsDemanded: ["CNC Automation", "Digital Foundry Controls", "Solar Grid Inverters", "CAD 3D Modeling"],
    existingCoursesCount: 31,
    activeTrainees: 870,
    placedTrainees: 461,
    placementRate: "53.0%",
    placementRateNum: 53.0,
    criticalSkillGap: "CNC Precision & Digital Foundry Controls",
    recommendedSeatAdjustment: "+30% CNC / Foundry Automation; -50% Basic Typing",
    recommendedNewCourses: ["Digital Foundry Engineering", "Solar Power Systems"],
    trainerUpskillQuota: 6,
    labUpgradesRequired: 2,
    priorityLevel: "Emerging"
  },
  {
    id: 7,
    district: "Solapur",
    regionCode: "MH-SLP",
    majorIndustries: ["Textiles & Garment Clusters", "Renewable Energy (Solar/Wind)", "Small Scale Metal Works"],
    jobDemandScore: 62,
    totalVacancies: 390,
    topRoles: ["Solar PV Installation Lead", "Textile CAD Pattern Designer", "Electrical Maintenance Tech"],
    topSkillsDemanded: ["Solar Installation", "Textile CAD", "Inverter Maintenance", "Electrical Safety"],
    existingCoursesCount: 27,
    activeTrainees: 720,
    placedTrainees: 360,
    placementRate: "50.0%",
    placementRateNum: 50.0,
    criticalSkillGap: "Clean Energy Grid Tech & Modern Textile CAD",
    recommendedSeatAdjustment: "+50% Solar / Renewable Energy Seats",
    recommendedNewCourses: ["Solar Plant Maintenance & Grid Tie", "Digital Textile Design"],
    trainerUpskillQuota: 5,
    labUpgradesRequired: 1,
    priorityLevel: "Emerging"
  },
  {
    id: 8,
    district: "Amravati",
    regionCode: "MH-AMR",
    majorIndustries: ["Agri-Processing & Agro-Chemicals", "Cotton Ginning", "Small Engineering Workshops"],
    jobDemandScore: 59,
    totalVacancies: 310,
    topRoles: ["Agri-Drone Pilot & Technician", "Cold Storage Controller", "Agri-Data Operator"],
    topSkillsDemanded: ["Drone Maintenance", "Agri-Sensor Networks", "Cold Chain Telemetry", "Basic Python"],
    existingCoursesCount: 22,
    activeTrainees: 590,
    placedTrainees: 283,
    placementRate: "48.0%",
    placementRateNum: 48.0,
    criticalSkillGap: "Agri-Tech Telemetry & Drone Operations",
    recommendedSeatAdjustment: "Launch first Agri-Drone and Cold Chain Certification cohort",
    recommendedNewCourses: ["Agri-Drone Piloting & Precision Farming", "Cold Chain Telemetry"],
    trainerUpskillQuota: 4,
    labUpgradesRequired: 1,
    priorityLevel: "Emerging"
  }
];

// =========================================================================
// 4. EMPLOYER VALIDATION & HIRING NETWORK DATASET
// =========================================================================
export const EMPLOYER_PARTNERS_DATA: EmployerPartner[] = [
  {
    id: 1,
    name: "Tata Consultancy Services (TCS)",
    industry: "IT Services & Enterprise Consulting",
    location: "Mumbai / Pune",
    partnershipTier: "Tier 1 Platinum",
    openings: 320,
    hired: 215,
    satisfactionRate: 84,
    skillsNeeded: ["Cloud Architecture", "FastAPI", "Next.js", "Cybersecurity", "Python"],
    validatedCoursesCount: 4,
    topRequestedSkills: ["Kubernetes", "Generative AI Prompting", "Terraform", "Cloud Security"]
  },
  {
    id: 2,
    name: "Infosys Limited",
    industry: "IT Services & Cloud Transformation",
    location: "Pune / Nagpur",
    partnershipTier: "Tier 1 Platinum",
    openings: 280,
    hired: 184,
    satisfactionRate: 82,
    skillsNeeded: ["AI/ML Pipelines", "DevOps", "Kubernetes", "PyTorch", "TypeScript"],
    validatedCoursesCount: 4,
    topRequestedSkills: ["RAG Pipelines", "Docker CI/CD", "Next.js App Router", "Prometheus"]
  },
  {
    id: 3,
    name: "Wipro Technologies",
    industry: "IT & Digital Operations",
    location: "Pune / Mumbai",
    partnershipTier: "Tier 2 Gold",
    openings: 210,
    hired: 142,
    satisfactionRate: 79,
    skillsNeeded: ["Full-Stack TypeScript", "AWS Cloud", "SOC Telemetry", "PostgreSQL"],
    validatedCoursesCount: 3,
    topRequestedSkills: ["Cloud Security Auditing", "TypeScript Strict Mode", "Kafka"]
  },
  {
    id: 4,
    name: "L&T Heavy Engineering & Technology",
    industry: "Industrial Automation & Engineering R&D",
    location: "Mumbai / Pune / Nashik",
    partnershipTier: "Tier 1 Platinum",
    openings: 175,
    hired: 118,
    satisfactionRate: 86,
    skillsNeeded: ["PLC Programming", "SCADA Systems", "Industrial IoT", "AutoCAD 3D"],
    validatedCoursesCount: 3,
    topRequestedSkills: ["Siemens TIA Portal", "Edge Sensor Telemetry", "Robotics Maintenance"]
  },
  {
    id: 5,
    name: "Persistent Systems",
    industry: "Product Engineering & Software R&D",
    location: "Pune / Nagpur",
    partnershipTier: "Tier 1 Platinum",
    openings: 140,
    hired: 96,
    satisfactionRate: 89,
    skillsNeeded: ["Generative AI", "Vector Databases", "Python AsyncIO", "Kubernetes"],
    validatedCoursesCount: 2,
    topRequestedSkills: ["LangChain", "Vector Embeddings", "FastAPI Microservices"]
  },
  {
    id: 6,
    name: "Tech Mahindra",
    industry: "Telecom & Next-Gen Network IT",
    location: "Mumbai / Pune",
    partnershipTier: "Tier 2 Gold",
    openings: 155,
    hired: 104,
    satisfactionRate: 77,
    skillsNeeded: ["Cloud Native", "5G Core Protocols", "Python", "Network Security"],
    validatedCoursesCount: 3,
    topRequestedSkills: ["Linux Networking", "Dockerized Microservices", "Wireshark"]
  },
  {
    id: 7,
    name: "HCLTech",
    industry: "Digital Transformation & Infrastructure",
    location: "Nagpur / Pune",
    partnershipTier: "Tier 2 Gold",
    openings: 130,
    hired: 88,
    satisfactionRate: 80,
    skillsNeeded: ["DevOps SRE", "Cloud Infra", "React", "PostgreSQL"],
    validatedCoursesCount: 2,
    topRequestedSkills: ["Terraform", "GitHub Actions", "Kubernetes"]
  },
  {
    id: 8,
    name: "Mahindra & Mahindra Automotive",
    industry: "Automotive & Electric Vehicles",
    location: "Pune (Chakan) / Nashik",
    partnershipTier: "Tier 1 Platinum",
    openings: 165,
    hired: 112,
    satisfactionRate: 85,
    skillsNeeded: ["EV Battery Telemetry", "PLC SCADA", "CAN Bus Diagnostics", "Industrial Robotics"],
    validatedCoursesCount: 2,
    topRequestedSkills: ["EV Powertrain Basics", "Predictive Telemetry", "Siemens PLC"]
  }
];

// Employer Survey Aggregate Feedback
export const EMPLOYER_SURVEY_SUMMARY = {
  totalEmployersSurveyed: 48,
  activeCurriculaReviewed: 10,
  averageCurriculumApprovalRate: 78.4,
  needsModificationRate: 14.2,
  notRelevantRate: 7.4,
  mostRequestedSkills: [
    { skill: "Kubernetes & Container Orchestration", requestCount: 38, priority: "Critical" },
    { skill: "Generative AI & RAG Pipelines", requestCount: 34, priority: "Critical" },
    { skill: "Cloud Security & Zero Trust", requestCount: 29, priority: "High" },
    { skill: "Terraform Infrastructure as Code", requestCount: 27, priority: "High" },
    { skill: "TypeScript & Next.js App Router", requestCount: 25, priority: "High" },
    { skill: "PLC / SCADA Smart Automation", requestCount: 22, priority: "High" }
  ]
};

// =========================================================================
// 5. EARLY WARNING SYSTEM ALERTS
// =========================================================================
export const EARLY_WARNING_ALERTS: EarlyWarningAlert[] = [
  {
    id: 1,
    level: "CRITICAL",
    issue: "Cloud Security & Threat Intelligence demand surged +38% YoY, but state training capacity is unchanged.",
    evidence: "720 active job openings detected across Mumbai & Pune; only 1 state course offers dedicated SOC training.",
    impact: "Severe regional deficit forcing corporate employers to outsource or hire candidates outside the state.",
    recommendedAction: "Authorize +200 seats in Cybersecurity & SOC Operations; establish virtual cyber-range sandbox labs.",
    expectedBenefit: "+₹7.2 LPA starting salary absorption for 180+ graduates within 6 months.",
    affectedDistricts: ["Mumbai Metropolitan", "Pune"],
    timestamp: "12 mins ago"
  },
  {
    id: 2,
    level: "WARNING",
    issue: "Basic Computer Applications has 3.2× more trainee capacity than estimated regional hiring demand.",
    evidence: "1,200 annual seats enrolled while total clerical vacancies dropped to 210 with a low 34% placement rate.",
    impact: "High graduate underemployment and misallocation of state training subsidies (~₹42 Lakhs annually).",
    recommendedAction: "Reduce annual basic typing seats by 65% (1200 ➔ 420) and divert budget to Cloud & AI bootcamps.",
    expectedBenefit: "Immediate reallocation of ₹28 Lakhs into modern high-yield IT certifications.",
    affectedDistricts: ["All 8 Districts", "Solapur", "Amravati"],
    timestamp: "45 mins ago"
  },
  {
    id: 3,
    level: "CURRICULUM ALERT",
    issue: "Kubernetes appears in 71% of cloud job postings but is missing from Cloud Infrastructure (CRS-003).",
    evidence: "Employer survey validation shows 38 of 48 surveyed recruiters mandate container orchestration.",
    impact: "Graduates face hiring rejection or require 3-6 months of remedial corporate training.",
    recommendedAction: "Authorize instant Curriculum Modernization Plan for CRS-003 to add 24-hour hands-on K8s lab unit.",
    expectedBenefit: "Course Modernization Score jumps from 64/100 to 92/100; placement rate improves from 82% to 94%.",
    affectedDistricts: ["Pune", "Nagpur", "Mumbai Metropolitan"],
    timestamp: "2 hours ago"
  },
  {
    id: 4,
    level: "EMERGING TECHNOLOGY",
    issue: "Generative AI & LLM role openings grew +42% in Q3 2026 with an average package of ₹8.5 LPA.",
    evidence: "1,250 vacancies recorded in AI engineering, RAG development, and enterprise intelligent agents.",
    impact: "State has early-mover advantage to position Maharashtra as the national hub for GenAI talent.",
    recommendedAction: "Scale Applied GenAI Program (CRS-004) to all tier-1 polytechnics with GPU cloud infrastructure grants.",
    expectedBenefit: "Projected 350+ certified GenAI technicians placed at premium salaries.",
    affectedDistricts: ["Pune", "Mumbai Metropolitan"],
    timestamp: "4 hours ago"
  }
];

// =========================================================================
// 6. GOVERNMENT POLICY DECISION CENTER (Actionable Items)
// =========================================================================
export const POLICY_DECISIONS_DATA: GovernmentPolicyAction[] = [
  {
    id: 1,
    title: "Modernize Cloud & DevOps Curriculum (CRS-003)",
    category: "Curriculum Modernization",
    urgency: "Immediate (Q3 2026)",
    affectedCourseOrSector: "Cloud Infrastructure & DevOps",
    targetMetric: "Alignment Score 64 ➔ 92 | Placement 82% ➔ 94%",
    description: "Authorize immediate syllabus update to inject Kubernetes, Terraform IaC, and GitHub Actions CI/CD modules across all 24 regional centers.",
    evidenceSummary: "71% of regional cloud job postings specify K8s; 38 employers requested container orchestration in latest survey.",
    projectedROI: "Boosts graduate average salary by +₹2.2 LPA and resolves 36-point regional cloud gap.",
    approved: false
  },
  {
    id: 2,
    title: "Scale Generative AI & Deep Learning Intake by +150 Seats",
    category: "Capacity Expansion",
    urgency: "Immediate (Q3 2026)",
    affectedCourseOrSector: "Applied Generative AI (CRS-004)",
    targetMetric: "Enrolled Trainees 189 ➔ 340 | Annual Placements 172 ➔ 310",
    description: "Allocate ₹18.5L capital grant for GPU cloud compute credits and establish specialized AI labs in Pune and Mumbai.",
    evidenceSummary: "1,250 verified GenAI job openings; top recruiter satisfaction rating at 88%.",
    projectedROI: "Estimated 91% placement at ₹8.5 LPA average package within 90 days of graduation.",
    approved: false
  },
  {
    id: 3,
    title: "Decommission 65% of Legacy Basic Computer Typing Seats",
    category: "Seat Reduction",
    urgency: "Immediate (Q3 2026)",
    affectedCourseOrSector: "Basic Computer Applications (CRS-010)",
    targetMetric: "Annual Intake 1,200 ➔ 420 | Subsidy Reallocated: ₹28 Lakhs",
    description: "Reduce oversupplied clerical typing seats across all 8 districts. Merge remaining seats into Modern Digital Workplace & AI Tools track.",
    evidenceSummary: "Supply exceeds demand by 3.2×; lowest placement rate in catalog (34%) with negative growth (-8% YoY).",
    projectedROI: "Saves ₹28 Lakhs in redundant state subsidies for direct reinvestment into high-wage courses.",
    approved: true
  },
  {
    id: 4,
    title: "Mandate Trainer Upskilling Program for 27 Technical Instructors",
    category: "Trainer Upskilling",
    urgency: "Immediate (Q3 2026)",
    affectedCourseOrSector: "Cloud, AI, and Industrial Automation Faculty",
    targetMetric: "Trainer Deficit: 27 ➔ 0 Certified Faculty",
    description: "Launch 4-week industry-sponsored bootcamp in partnership with AWS, Google Cloud, and Siemens to certify 27 state instructors.",
    evidenceSummary: "Trainer gap is the primary bottleneck preventing seat expansion in Pune, Nagpur, and Nashik.",
    projectedROI: "Enables safe expansion of +500 high-demand seats across 12 government training institutes.",
    approved: false
  },
  {
    id: 5,
    title: "Upgrade 14 District Virtual Labs with Cloud & PLC Sandbox Grants",
    category: "Lab Infrastructure",
    urgency: "Medium-term",
    affectedCourseOrSector: "14 Vocational Institutes in Pune, Nashik, Sambhajinagar",
    targetMetric: "Practical Lab Readiness Score 5/10 ➔ 9/10",
    description: "Disburse infrastructure grants for containerized Linux sandboxes, PLC workstations, and cloud lab testing suites.",
    evidenceSummary: "Hands-on lab hours currently account for only 35% of course duration; employer expectation is 60%+.",
    projectedROI: "Increases candidate hands-on hiring readiness by +32%.",
    approved: false
  },
  {
    id: 6,
    title: "Institutionalize Employer Validation Cycle for All 10 Catalog Courses",
    category: "Employer Validation",
    urgency: "Strategic Policy",
    affectedCourseOrSector: "State Vocational Training Directorate (SVTE)",
    targetMetric: "Curriculum Revision Cycle: 3 Years ➔ Real-Time (Quarterly)",
    description: "Mandate bi-annual digital curriculum review signed off by minimum 10 enterprise employers per vocational track.",
    evidenceSummary: "Prevents curriculum lag and keeps alignment score permanently above 85/100.",
    projectedROI: "Sustained state placement rate above 80% with zero structural skill mismatch.",
    approved: true
  }
];

// =========================================================================
// 7. CAREER PATHWAYS (Job Role -> Skill -> Course Mapping)
// =========================================================================
export interface CareerPathway {
  id: number;
  roleTitle: string;
  industrySector: string;
  averageSalary: string;
  growthVelocity: string;
  openingsEstimate: number;
  requiredSkills: string[];
  mappedCourses: {
    courseName: string;
    courseCode: string;
    coveragePercent: number;
  }[];
  skillGaps: {
    skill: string;
    severity: "Critical" | "High" | "Medium";
    description: string;
  }[];
  learningPathStages: {
    step: number;
    title: string;
    durationWeeks: number;
    skillsCovered: string[];
    practicalProject: string;
  }[];
}

export const CAREER_PATHWAYS_DATA: CareerPathway[] = [
  {
    id: 1,
    roleTitle: "Cloud & DevOps Solutions Engineer",
    industrySector: "IT & Cloud Infrastructure",
    averageSalary: "₹7.8 LPA",
    growthVelocity: "+34% YoY",
    openingsEstimate: 980,
    requiredSkills: ["Linux CLI", "AWS Cloud Core", "Docker Containers", "Kubernetes", "Terraform IaC", "GitHub Actions CI/CD", "Cloud Security"],
    mappedCourses: [
      { courseName: "Cloud Infrastructure & DevOps (AWS/Azure)", courseCode: "CRS-003", coveragePercent: 68 },
      { courseName: "DevOps & Site Reliability Engineering", courseCode: "CRS-009", coveragePercent: 88 },
      { courseName: "Cybersecurity & SOC Operations", courseCode: "CRS-005", coveragePercent: 35 }
    ],
    skillGaps: [
      { skill: "Kubernetes Cluster Ops", severity: "Critical", description: "Mandated in 71% of vacancies; missing from introductory cloud tracks." },
      { skill: "Terraform IaC", severity: "High", description: "Required for automated multi-cloud provisioning." },
      { skill: "Cloud Security Auditing", severity: "Medium", description: "IAM least-privilege compliance." }
    ],
    learningPathStages: [
      { step: 1, title: "Linux Fundamentals & Shell Scripting", durationWeeks: 3, skillsCovered: ["Bash", "Linux Permissions", "Networking (TCP/DNS)"], practicalProject: "Automated System Resource Telemetry Script" },
      { step: 2, title: "Cloud Fundamentals & AWS Architecture", durationWeeks: 4, skillsCovered: ["IAM", "VPC", "EC2", "S3", "Security Groups"], practicalProject: "High-Availability Multi-AZ Web Infrastructure" },
      { step: 3, title: "Containerization with Docker", durationWeeks: 3, skillsCovered: ["Dockerfile Optimization", "Multi-stage Builds", "Docker Compose"], practicalProject: "Containerized Microservices Cluster" },
      { step: 4, title: "Kubernetes Cluster Orchestration", durationWeeks: 5, skillsCovered: ["Pods", "Deployments", "Services", "Ingress", "Helm"], practicalProject: "Production Zero-Downtime Rolling Update Pipeline" },
      { step: 5, title: "Infrastructure as Code (Terraform)", durationWeeks: 4, skillsCovered: ["Terraform HCL", "State Backends", "Reusable Modules"], practicalProject: "Git-Triggered Complete Cloud VPC Deployment" },
      { step: 6, title: "CI/CD Pipeline Automation", durationWeeks: 3, skillsCovered: ["GitHub Actions", "Docker Registry", "Automated Testing"], practicalProject: "End-to-End Push-to-Deploy Delivery Pipeline" },
      { step: 7, title: "Observability & Site Reliability", durationWeeks: 3, skillsCovered: ["Prometheus", "Grafana", "Log Rotation"], practicalProject: "Real-time Metrics Dashboard & Alertmanager" },
      { step: 8, title: "Capstone Enterprise Project", durationWeeks: 3, skillsCovered: ["Full Cloud Architecture", "Security Audit", "Cost Optimization"], practicalProject: "Multi-Region Cloud Deployment with Live Failover" }
    ]
  },
  {
    id: 2,
    roleTitle: "Generative AI & LLM Solutions Engineer",
    industrySector: "Artificial Intelligence & Data",
    averageSalary: "₹8.5 LPA",
    growthVelocity: "+42% YoY",
    openingsEstimate: 1250,
    requiredSkills: ["Python 3.12", "PyTorch", "Transformers (Hugging Face)", "Prompt Engineering", "Vector Embeddings", "RAG Pipelines", "FastAPI Serving"],
    mappedCourses: [
      { courseName: "Applied Generative AI & Deep Learning", courseCode: "CRS-004", coveragePercent: 92 },
      { courseName: "Data Science & Machine Learning Foundations", courseCode: "CRS-007", coveragePercent: 65 },
      { courseName: "Advanced Python Programming", courseCode: "CRS-001", coveragePercent: 45 }
    ],
    skillGaps: [
      { skill: "Enterprise RAG Indexing", severity: "Critical", description: "Hybrid vector search and reranking." },
      { skill: "Autonomous AI Agents", severity: "High", description: "Multi-agent task orchestration with tool calling." },
      { skill: "Model Serving Latency", severity: "Medium", description: "FastAPI token streaming and quantization." }
    ],
    learningPathStages: [
      { step: 1, title: "Python for Deep Learning & Math", durationWeeks: 4, skillsCovered: ["NumPy", "PyTorch Tensors", "Linear Algebra", "AsyncIO"], practicalProject: "Custom Neural Network from Scratch" },
      { step: 2, title: "Transformer Architecture & NLP", durationWeeks: 4, skillsCovered: ["Self-Attention", "BERT/GPT Architecture", "Hugging Face"], practicalProject: "Fine-Tuned Domain Classifier on Legal Documents" },
      { step: 3, title: "Vector Embeddings & Semantic Search", durationWeeks: 3, skillsCovered: ["Embedding Models", "ChromaDB", "Cosine Distance"], practicalProject: "Multi-Modal Document Semantic Search Engine" },
      { step: 4, title: "Retrieval-Augmented Generation (RAG)", durationWeeks: 5, skillsCovered: ["LangChain", "LlamaIndex", "Chunking Strategies", "Reranking"], practicalProject: "Enterprise Compliance Q&A Assistant with Citations" },
      { step: 5, title: "Model Optimization & Quantization", durationWeeks: 3, skillsCovered: ["LoRA / QLoRA", "GGUF Formats", "Ollama On-Prem"], practicalProject: "Local 7B LLM Inference Running on Edge Hardware" },
      { step: 6, title: "Autonomous Agentic Workflows", durationWeeks: 4, skillsCovered: ["CrewAI", "LangGraph", "Tool Calling", "Memory"], practicalProject: "Multi-Agent Financial Research Analyst Bot" },
      { step: 7, title: "Production AI API Deployment", durationWeeks: 3, skillsCovered: ["FastAPI SSE Streaming", "Token Rate Limiting", "Docker"], practicalProject: "Production-ready GenAI API with JWT Authentication" },
      { step: 8, title: "Capstone Enterprise AI Solution", durationWeeks: 4, skillsCovered: ["Full RAG Stack", "Security Guardrails", "Evaluation Metrics"], practicalProject: "Autonomous Customer Operations Copilot" }
    ]
  },
  {
    id: 3,
    roleTitle: "Cybersecurity SOC & Threat Analyst",
    industrySector: "Cybersecurity & Governance",
    averageSalary: "₹7.2 LPA",
    growthVelocity: "+29% YoY",
    openingsEstimate: 720,
    requiredSkills: ["Network Protocols (TCP/IP)", "Linux Forensics", "SIEM (Splunk)", "Wireshark Packet Analysis", "Threat Hunting", "Incident Triage", "Cloud Security"],
    mappedCourses: [
      { courseName: "Cybersecurity & SOC Operations", courseCode: "CRS-005", coveragePercent: 88 },
      { courseName: "Cloud Infrastructure & DevOps", courseCode: "CRS-003", coveragePercent: 40 }
    ],
    skillGaps: [
      { skill: "Cloud Security Posture (CSPM)", severity: "Critical", description: "AWS IAM and CloudTrail log analysis." },
      { skill: "Threat Intel Automation", severity: "High", description: "SOAR workflow integrations." }
    ],
    learningPathStages: [
      { step: 1, title: "Network Architecture & Protocols", durationWeeks: 3, skillsCovered: ["TCP/IP", "DNS/DHCP", "Wireshark", "Firewall Rules"], practicalProject: "Deep Packet Inspection on Suspicious Traffic" },
      { step: 2, title: "Linux & Windows Security Fundamentals", durationWeeks: 3, skillsCovered: ["User Permissions", "Syslog", "Event Viewer", "Powershell"], practicalProject: "System Hardening Benchmark (CIS Standards)" },
      { step: 3, title: "Threat Vectors & Attack Simulation", durationWeeks: 4, skillsCovered: ["MITRE ATT&CK", "OWASP Top 10", "Burp Suite", "Nmap"], practicalProject: "Vulnerability Assessment of Web Application" },
      { step: 4, title: "SIEM Deployment & Telemetry Ingestion", durationWeeks: 5, skillsCovered: ["Splunk SPL", "Elasticsearch", "Log Forwarding"], practicalProject: "Custom SIEM Dashboard & Brute-Force Alert Rule" },
      { step: 5, title: "Incident Response & Forensics", durationWeeks: 4, skillsCovered: ["Memory Dumps", "Volatilty", "Chain of Custody", "Playbooks"], practicalProject: "Ransomware Attack Triage & Root Cause Analysis" },
      { step: 6, title: "Cloud Security & Identity Defense", durationWeeks: 3, skillsCovered: ["AWS GuardDuty", "CloudTrail", "Zero Trust IAM"], practicalProject: "Cloud Misconfiguration Triage & Remediation" },
      { step: 7, title: "Security Automation (SOAR)", durationWeeks: 3, skillsCovered: ["Python for Security", "API Webhooks", "Automated Blocklist"], practicalProject: "Automated Phishing Alert Quarantine Script" },
      { step: 8, title: "Capstone Virtual Cyber Range", durationWeeks: 3, skillsCovered: ["Live Blue Team Simulation", "Incident Report", "Executive Debrief"], practicalProject: "Full Cyber Incident Containment and Postmortem" }
    ]
  }
];

// =========================================================================
// 8. DATA SOURCES & METHODOLOGY TRANSPARENCY
// =========================================================================
export const DATA_SOURCES_LIST: DataSourceItem[] = [
  {
    name: "Job Postings Aggregation Engine",
    source: "Automated telemetry across major enterprise career boards and recruitment feeds",
    lastUpdated: "Today (Hourly Cycle)",
    dataType: "Unstructured Vacancy Postings & Skill Tagging",
    confidence: "High Confidence",
    recordsSampled: "14,820 Postings (Maharashtra Regional)",
    isPrototypeSimulation: true
  },
  {
    name: "Employer Survey & Recruiter Consultations",
    source: "Direct bi-annual recruiter survey network (TCS, Infosys, Wipro, L&T, etc.)",
    lastUpdated: "Q3 2026",
    dataType: "Structured Hiring Forecasts & Skill Requisitions",
    confidence: "High Confidence",
    recordsSampled: "48 Enterprise Employers Surveyed",
    isPrototypeSimulation: true
  },
  {
    name: "State Vocational Catalog & Enrollment Records",
    source: "State Skill & Vocational Training Directorate (SVTE)",
    lastUpdated: "Academic Session 2026-27",
    dataType: "Curriculum Syllabi, Seat Quotas & Enrolled Cohort Data",
    confidence: "High Confidence",
    recordsSampled: "10 Vocational Programs (12,400 Total Seats)",
    isPrototypeSimulation: true
  },
  {
    name: "Placement & Graduate Outcomes Register",
    source: "Institutional Placement Records & Verified Alum Telemetry",
    lastUpdated: "Q2 2026 Verified",
    dataType: "Candidate Employment, Salaries & Time to Hire",
    confidence: "Medium Confidence",
    recordsSampled: "8,940 Graduate Records Tracked",
    isPrototypeSimulation: true
  },
  {
    name: "Industrial Growth & Sector Indicators",
    source: "Regional Chamber of Commerce & Industrial Development Corridors",
    lastUpdated: "Semi-Annual Review 2026",
    dataType: "Sector YoY Investment Velocity & New Plant Capacity",
    confidence: "High Confidence",
    recordsSampled: "8 Major Maharashtra District Corridors",
    isPrototypeSimulation: true
  }
];

// Prototype Disclaimer constant for consistency
export const PROTOTYPE_DISCLAIMER_TEXT =
  "SkillBridge AI is a prototype decision-support platform developed for SIH. Demonstration datasets and projected outcomes are simulated for evaluation purposes.";
