import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { getSkillsByCategory } from "@/lib/skills";
import { addSkill, deleteSkill } from "../actions";
import { SkillGroupList } from "@/components/SkillGroupList";

export default function ManageSkillsPage() {
  return (
    <Suspense fallback={<p className="p-8">확인 중...</p>}>
      <ManageSkillsContent />
    </Suspense>
  );
}

async function ManageSkillsContent() {
  await connection();
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!isAdminEmail(session.user.email)) {
    return (
      <div className="flex flex-1 flex-col items-center gap-4 px-8 py-16">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          권한이 없습니다
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {session.user.email} 계정은 기술 목록을 수정할 수 없습니다. 관리자 계정으로 로그인해주세요.
        </p>
        <Link
          href="/skills"
          className="text-sm font-medium underline underline-offset-4"
        >
          ← 기술 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center px-8 py-16">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Manage Skills
          </span>
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            기술 목록 관리
          </h1>
        </div>

        <section className="flex flex-col gap-4 rounded-xl border border-black/[.08] p-5 dark:border-white/[.145]">
          <div>
            <h2 className="font-semibold text-black dark:text-zinc-50">
              기술 추가
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              추가한 항목은 MongoDB에 저장됩니다.
            </p>
          </div>
          <form action={addSkill} className="grid gap-3 sm:grid-cols-4">
            <label className="flex flex-col gap-1 text-sm">
              분류
              <input
                name="category"
                required
                maxLength={40}
                placeholder="Frontend"
                className="rounded-lg border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              기술명
              <input
                name="name"
                required
                maxLength={80}
                placeholder="React"
                className="rounded-lg border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              숙련도
              <select
                name="level"
                defaultValue="중"
                className="rounded-lg border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
              >
                <option value="상">상</option>
                <option value="중">중</option>
                <option value="하">하</option>
              </select>
            </label>
            <button
              type="submit"
              className="self-end rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              추가하기
            </button>
          </form>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
            등록된 기술
          </h2>
          <Suspense fallback={<p>기술 목록을 불러오는 중...</p>}>
            <ManageSkillGroups />
          </Suspense>
        </section>

        <Link
          href="/skills"
          className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          ← 기술 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

async function ManageSkillGroups() {
  await connection();
  const skillGroups = await getSkillsByCategory();
  return <SkillGroupList groups={skillGroups} allowDelete />;
}
