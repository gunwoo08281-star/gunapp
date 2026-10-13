import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-8 py-4">
        <Link href="/" className="text-sm font-semibold text-black dark:text-zinc-50">
          곽건우 포트폴리오
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/about" className="hover:text-black dark:hover:text-zinc-50">
            소개
          </Link>
          <Link href="/skills" className="hover:text-black dark:hover:text-zinc-50">
            스킬
          </Link>
          <Link href="/projects" className="hover:text-black dark:hover:text-zinc-50">
            프로젝트
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-black/[.08] px-3 py-1.5 hover:bg-black/[.03] dark:border-white/[.145] dark:hover:bg-white/[.05]"
          >
            연락처
          </Link>
        </nav>
      </div>
    </header>
  );
}
