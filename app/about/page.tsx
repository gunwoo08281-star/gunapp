import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-8 py-16">
      <div className="w-full max-w-3xl flex flex-col gap-10">
        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            About Me
          </span>
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            자기소개
          </h1>
        </div>

        {/* 프로필 카드 */}
        <div className="rounded-xl border border-black/[.08] px-8 py-8 flex flex-col gap-4 dark:border-white/[.145]">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-black dark:text-zinc-50">곽건우</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              🏫 웹보안프로그래밍학과 · 📍 대한민국
            </p>
          </div>
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
            안녕하세요! 저는 웹 보안과 풀스택 개발에 관심 있는 대학생 곽건우입니다.
            Next.js와 React를 활용한 웹 애플리케이션 개발을 공부하고 있으며,
            보안을 고려한 안전한 웹 서비스를 만드는 것을 목표로 하고 있습니다.
          </p>
        </div>

        {/* 학력 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-black dark:text-zinc-50">학력</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                school: "○○대학교",
                major: "컴퓨터공학과",
                period: "2022.03 ~ 현재",
              },
            ].map((item) => (
              <div
                key={item.school}
                className="rounded-lg border border-black/[.08] px-5 py-4 dark:border-white/[.145]"
              >
                <p className="font-medium text-black dark:text-zinc-50">{item.school}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item.major} · {item.period}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 관심 분야 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-black dark:text-zinc-50">관심 분야</h2>
          <div className="flex flex-wrap gap-2">
            {["웹 보안", "풀스택 개발", "Next.js", "TypeScript", "데이터베이스", "클라우드"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/[.06] px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-white/[.08] dark:text-zinc-300"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

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
