import { NextResponse } from "next/server";

// 4주차: Route Handler — GET /api/hello
export async function GET() {
  return NextResponse.json({
    message: "/api/hello 에서 응답한 JSON 입니다",
    week: 4,
    date: new Date().toISOString().slice(0, 10),
  });
}
