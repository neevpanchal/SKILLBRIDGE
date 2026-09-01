import { NextResponse } from "next/server";
import { EMPLOYER_PARTNERS_DATA, EMPLOYER_SURVEY_SUMMARY } from "@/lib/intelligenceData";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json({
    employers: EMPLOYER_PARTNERS_DATA,
    total: EMPLOYER_PARTNERS_DATA.length,
    survey_summary: EMPLOYER_SURVEY_SUMMARY
  });
}
