import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getSkillsByCategory } from "@/lib/skills";
import { SkillGroupList } from "@/components/SkillGroupList";

export default function SkillsPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-8 py-16">
      <div className="w-full max-w-3xl flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Skills
          </span>
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            기술 스택
          </h1>
        </div>

        <div className="flex flex-col gap-8">
          <Suspense fallback={<p>기술 스택을 불러오는 중...</p>}>
            <SkillGroups />
          </Suspense>
        </div>

        <Link
          href="/skills/manage"
          className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          기술 목록 관리 →
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          ← 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

async function SkillGroups() {
  await connection();
  try {
    const skillGroups = await getSkillsByCategory();
    return <SkillGroupList groups={skillGroups} />;
  } catch (error) {
    console.error("[skills] DB 오류:", error);
    return (
      <p className="text-sm text-red-600">
        데이터를 불러오지 못했습니다. (MONGODB_URI 환경변수와 MongoDB Atlas Network Access 설정을 확인하세요)
      </p>
    );
  }
}
