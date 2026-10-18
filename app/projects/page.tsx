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
  let projects;
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("[projects] DB 오류:", error);
    return (
      <p className="text-sm text-red-600">
        데이터를 불러오지 못했습니다. (MONGODB_URI 환경변수와 MongoDB Atlas Network Access 설정을 확인하세요)
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {projects.map((p) => (
        <li key={p.id}>
          <div className="rounded-xl border border-black/[.08] px-6 py-5 flex flex-col gap-3 dark:border-white/[.145]">
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt={`${p.title} 스크린샷`}
                className="w-full rounded-lg border border-black/[.08] dark:border-white/[.145]"
              />
            )}

            <div className="flex flex-col gap-1">
              {p.role && (
                <span className="w-fit rounded-full bg-black px-2.5 py-0.5 text-xs font-medium text-white dark:bg-white dark:text-black">
                  {p.role}
                </span>
              )}
              <p className="font-semibold text-black dark:text-zinc-50">{p.title}</p>
              {p.description && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-6">
                  {p.description}
                </p>
              )}
            </div>

            {/* 더보기 (아래 화살표를 누르면 펼쳐짐) */}
            <details className="group">
              <summary className="flex w-fit cursor-pointer list-none items-center gap-1 text-sm font-medium text-zinc-600 select-none dark:text-zinc-300 [&::-webkit-details-marker]:hidden">
                더보기
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </summary>

              <div className="mt-3 flex flex-col gap-4">
                {p.challenge && (
                  <p className="rounded-lg bg-black/[.04] px-4 py-3 text-sm leading-6 text-zinc-600 dark:bg-white/[.06] dark:text-zinc-300">
                    <span className="font-semibold text-black dark:text-zinc-50">문제 해결 · </span>
                    {p.challenge}
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-black dark:text-zinc-50">사용한 언어</p>
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
                </div>

                {p.part && (
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-black dark:text-zinc-50">내 파트</p>
                    <p
                      className="text-sm leading-6 text-zinc-600 dark:text-zinc-300"
                    >
                      {p.part}
                    </p>
                    {p.features.length > 0 && (
                      <ul className="mt-1 flex list-disc flex-col gap-1 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                        {p.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-black dark:text-zinc-50">배운 점</p>
                  <p
                    className={`text-sm leading-6 ${p.result ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-500"}`}
                  >
                    {p.result || "작성 예정"}
                  </p>
                </div>

                {p.contribution && (
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-black dark:text-zinc-50">내 기여 범위</p>
                    <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      {p.contribution}
                    </p>
                  </div>
                )}
              </div>
            </details>

            {/* 링크 */}
            <div className="flex gap-3 text-sm">
              <a
                href={p.github}
                className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
              >
                GitHub →
              </a>
              {p.demo !== "#" && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-500 underline underline-offset-4 dark:text-zinc-400"
                >
                  Demo →
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
