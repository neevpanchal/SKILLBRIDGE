import { NextResponse } from "next/server";
import {
  SKILL_INTELLIGENCE_DATA,
  COURSES_CATALOG,
  EMPLOYER_PARTNERS_DATA,
  DISTRICT_INTELLIGENCE_DATA,
  EARLY_WARNING_ALERTS,
  POLICY_DECISIONS_DATA,
  CAREER_PATHWAYS_DATA
} from "@/lib/intelligenceData";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json({
    status: "online",
    courses_tracked: 1247,
    skill_gaps_identified: 389,
    critical_deficits_count: SKILL_INTELLIGENCE_DATA.filter((s) => s.priority === "CRITICAL").length,
    placement_rate: "67.4%",
    projected_modernized_placement_rate: "79.0%",
    total_openings: SKILL_INTELLIGENCE_DATA.reduce((acc, s) => acc + s.openings, 0),
    employer_partners: EMPLOYER_PARTNERS_DATA.length,
    skills: SKILL_INTELLIGENCE_DATA,
    courses: COURSES_CATALOG,
    districts: DISTRICT_INTELLIGENCE_DATA,
    alerts: EARLY_WARNING_ALERTS,
    policy_actions: POLICY_DECISIONS_DATA,
    pathways: CAREER_PATHWAYS_DATA
  });
}
