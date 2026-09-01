import { NextResponse } from "next/server";
import { getLiveDataset, DATA_TTL_SECONDS } from "@/lib/live-data";

export const revalidate = DATA_TTL_SECONDS;

export async function GET() {
  const data = await getLiveDataset();
  return NextResponse.json({
    skill_gaps: data.skill_gaps,
    total: data.skill_gaps.length,
    source: data.source,
    generated_at: data.generated_at,
  });
}