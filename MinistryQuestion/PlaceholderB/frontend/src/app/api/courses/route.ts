import { NextResponse } from "next/server";
import { COURSES_CATALOG } from "@/lib/intelligenceData";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json({
    courses: COURSES_CATALOG,
    total: COURSES_CATALOG.length
  });
}
