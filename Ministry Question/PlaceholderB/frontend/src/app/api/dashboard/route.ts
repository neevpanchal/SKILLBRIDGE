import { NextResponse } from "next/server";
import { getLiveDataset, DATA_TTL_SECONDS } from "@/lib/live-data";

export const revalidate = DATA_TTL_SECONDS;

export async function GET() {
  const data = await getLiveDataset();
  return NextResponse.json({
    stats: data.stats,
    top_skill_gaps: data.skill_gaps.slice(0, 6),
    recent_courses: data.courses.slice(0, 6),
    district_training: data.districts.slice(0, 6),
    top_employers: data.employers.slice(0, 5),
    source: data.source,
    generated_at: data.generated_at,
  });
}