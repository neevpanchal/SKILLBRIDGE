import { NextResponse } from "next/server";
import { SKILL_INTELLIGENCE_DATA } from "@/lib/intelligenceData";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json({
    skill_gaps: SKILL_INTELLIGENCE_DATA,
    total: SKILL_INTELLIGENCE_DATA.length
  });
}
