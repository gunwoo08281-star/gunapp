import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getSkillsByCategory } from "@/lib/skills";

const levelColor: Record<string, string> = {
  상: "bg-black text-white dark:bg-white dark:text-black",
  중: "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200",
  하: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

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
  const skillGroups = await getSkillsByCategory();

  return (
    <>
      {skillGroups.map((section) => (
        <div key={section.category} className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
            {section.category}
          </h2>
          <ul className="flex flex-col gap-2">
            {section.items.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center justify-between rounded-lg border border-black/[.08] px-5 py-3 dark:border-white/[.145]"
              >
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {skill.name}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${levelColor[skill.level]}`}
                >
                  {skill.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
