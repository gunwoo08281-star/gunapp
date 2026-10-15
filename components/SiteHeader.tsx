import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { auth } from "@/auth";
import { logout } from "@/app/skills/auth-actions";

export function SiteHeader() {
  return (
    <header className="border-b border-black/8 dark:border-white/[.145]">
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
          <Link href="/study" className="hover:text-black dark:hover:text-zinc-50">
            학습
          </Link>
          <Link href="/contact" className="hover:text-black dark:hover:text-zinc-50">
            정보
          </Link>
          <Suspense fallback={null}>
            <AuthLink />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}

async function AuthLink() {
  await connection();
  const session = await auth();
  if (!session?.user) {
    return (
      <Link href="/login" className="rounded-md border border-black/8 px-3 py-1.5 hover:bg-black/3 dark:border-white/[.145] dark:hover:bg-white/5">
        로그인
      </Link>
    );
  }
  return (
    <form action={logout}>
      <button type="submit" className="rounded-md border border-black/8 px-3 py-1.5 hover:bg-black/3 dark:border-white/[.145] dark:hover:bg-white/5">
        로그아웃
      </button>
    </form>
  );
}
