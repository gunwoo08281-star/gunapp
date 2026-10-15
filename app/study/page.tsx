import Link from "next/link";
import { Counter } from "@/components/Counter";

const weeks = [
  {
    week: "3주차",
    title: "클라이언트 컴포넌트와 상태",
    desc: "\"use client\"와 useState로 만든 카운터입니다.",
  },
  {
    week: "4주차",
    title: "라우팅과 Route Handler",
    desc: "동적 라우트, loading.tsx, API 응답(/api/hello)을 실습했습니다.",
    links: [
      { href: "/products", label: "상품 목록 (좋아요 · 서버 액션)" },
      { href: "/api/hello", label: "/api/hello (JSON 응답)" },
    ],
  },
  {
    week: "6주차",
    title: "MongoDB 연동",
    desc: "Mongoose 모델로 공지사항을 DB에 저장하고 조회합니다.",
    links: [{ href: "/notices", label: "공지사항 게시판" }],
  },
  {
    week: "인증",
    title: "Auth.js 로그인",
    desc: "Credentials Provider와 bcrypt로 이메일/비밀번호 로그인을 구현하고, 쓰기 기능을 보호했습니다.",
    links: [{ href: "/login", label: "로그인" }],
  },
];

export default function StudyPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-8 py-16">
      <div className="w-full max-w-3xl flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Study
          </span>
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            웹서버보안프로그래밍 학습
          </h1>
          <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            2026학기에 배운 내용을 주차별로 정리하고, 직접 만든 실습 결과로 연결했습니다.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://my-app-rouge-eight-47.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
            >
              실습 사이트 (Vercel) →
            </a>
            <a
              href="https://github.com/gunwoo08281-star/my-app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
            >
              GitHub →
            </a>
          </div>
        </div>

        <ul className="flex flex-col gap-4">
          {weeks.map((w) => (
            <li
              key={w.week}
              className="flex flex-col gap-3 rounded-xl border border-black/8 px-6 py-5 dark:border-white/[.145]"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {w.week}
                </span>
                <p className="font-semibold text-black dark:text-zinc-50">{w.title}</p>
                <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">{w.desc}</p>
              </div>
              {w.week === "3주차" && <Counter />}
              {w.links && (
                <div className="flex flex-wrap gap-4 text-sm">
                  {w.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
                    >
                      {l.label} →
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

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
