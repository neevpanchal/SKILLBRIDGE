import { NextResponse } from "next/server";
import { DISTRICT_INTELLIGENCE_DATA } from "@/lib/intelligenceData";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json({
    districts: DISTRICT_INTELLIGENCE_DATA,
    total: DISTRICT_INTELLIGENCE_DATA.length
  });
}
