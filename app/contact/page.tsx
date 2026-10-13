import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-8 py-16">
      <div className="w-full max-w-3xl flex flex-col gap-10">
        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Contact
          </span>
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            연락처
          </h1>
        </div>

        {/* 연락처 카드 */}
        <div className="flex flex-col gap-3">
          {[
            {
              label: "이메일",
              value: "example@email.com",
              href: "mailto:example@email.com",
              icon: "✉️",
            },
            {
              label: "GitHub",
              value: "github.com/username",
              href: "https://github.com",
              icon: "🐙",
            },
            {
              label: "학교",
              value: "○○대학교 컴퓨터공학과",
              href: "#",
              icon: "🏫",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 rounded-xl border border-black/[.08] px-6 py-4 transition-colors hover:bg-black/[.03] dark:border-white/[.145] dark:hover:bg-white/[.05]"
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {item.value}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* 메시지 */}
        <div className="rounded-xl border border-black/[.08] px-8 py-6 dark:border-white/[.145]">
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400 text-center">
            프로젝트 협업, 질문, 피드백 등 언제든지 연락주세요! 😊
          </p>
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
