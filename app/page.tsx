import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-8 py-24 px-8 text-center">
        {/* 뱃지 */}
        <span className="rounded-full bg-black/[.06] px-3 py-1 text-xs font-medium tracking-wide text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300">
          웹서버보안프로그래밍
        </span>

        {/* 이름 & 소개 */}
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
            안녕하세요, 👋
            <br />
            곽건우입니다
          </h1>
          <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
            중부대학교 2학년 재학중인 곽건우 입니다.
            <br />
            Next.js · React · TypeScript를 공부하고 있습니다.
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 text-sm flex-wrap justify-center">
          <Link
            href="/about"
            className="rounded-full bg-foreground px-5 py-2.5 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            자기소개 보기 →
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-black/[.08] px-5 py-2.5 font-medium text-zinc-700 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-300 dark:hover:bg-white/[.05]"
          >
            프로젝트 보기
          </Link>
        </div>

        {/* 빠른 링크 */}
        <div className="flex flex-col gap-2 text-sm mt-4">
          <Link
            href="/skills"
            className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
          >
            보유 기술 스택 확인 →
          </Link>
          <Link
            href="/contact"
            className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
          >
            정보 →
          </Link>
        </div>
      </main>
    </div>
  );
}
