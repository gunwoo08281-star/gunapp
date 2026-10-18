import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getProjects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-12 py-20 px-8 text-center">
        <section className="flex flex-col items-center gap-8">
          <span className="rounded-full bg-black/[.06] px-3 py-1 text-xs font-medium tracking-wide text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300">
            정보보호학과 · 중부대학교 2학년
          </span>

          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
              안녕하세요, 👋
              <br />
              곽건우입니다
            </h1>
            <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
              웹 개발과 보안에 관심 있는 학생입니다.
              <br />
              Next.js · React · TypeScript로 직접 만들며 배우고 있습니다.
            </p>
          </div>
        </section>

        <section className="flex w-full flex-col gap-4 text-left">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
              대표 프로젝트
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-zinc-500 underline underline-offset-4 dark:text-zinc-400"
            >
              전체 보기
            </Link>
          </div>
          <Suspense fallback={<p className="text-sm text-zinc-500">불러오는 중...</p>}>
            <FeaturedProjects />
          </Suspense>
        </section>

        <Link
          href="/skills"
          className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          보유 기술 스택 확인 →
        </Link>
      </main>
    </div>
  );
}

async function FeaturedProjects() {
  await connection();
  let projects;
  try {
    projects = (await getProjects()).slice(0, 2);
  } catch (error) {
    console.error("[home] 프로젝트 로딩 오류:", error);
    return null;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {projects.map((p) => (
        <li key={p.id}>
          <Link
            href="/projects"
            className="flex h-full flex-col gap-2 rounded-xl border border-black/[.08] px-5 py-4 transition-colors hover:bg-black/[.03] dark:border-white/[.145] dark:hover:bg-white/[.05]"
          >
            {p.role && (
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{p.role}</span>
            )}
            <span className="font-semibold text-black dark:text-zinc-50">{p.title}</span>
            <span className="line-clamp-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {p.description}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
