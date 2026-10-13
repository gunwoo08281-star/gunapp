import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getProjects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-8 py-16">
      <div className="w-full max-w-3xl flex flex-col gap-10">
        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Projects
          </span>
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            프로젝트
          </h1>
        </div>

        {/* 프로젝트 목록 */}
        <Suspense fallback={<p>프로젝트를 불러오는 중...</p>}>
          <ProjectList />
        </Suspense>

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

async function ProjectList() {
  await connection();
  const projects = await getProjects();

  return (
    <ul className="flex flex-col gap-4">
      {projects.map((p) => (
        <li key={p.id}>
          <div className="rounded-xl border border-black/[.08] px-6 py-5 flex flex-col gap-3 dark:border-white/[.145]">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-black dark:text-zinc-50">{p.title}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-6">
                {p.description}
              </p>
            </div>

            {/* 기술 태그 */}
            <div className="flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-black/[.06] px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* 링크 */}
            <div className="flex gap-3 text-sm">
              <a
                href={p.github}
                className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
              >
                GitHub →
              </a>
              <a
                href={p.demo}
                className="font-medium text-zinc-500 underline underline-offset-4 dark:text-zinc-400"
              >
                Demo →
              </a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
