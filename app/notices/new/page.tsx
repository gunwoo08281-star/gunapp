import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { createNoticeAction } from "@/lib/study-actions";
import { SubmitButton } from "@/components/SubmitButton";

const inputClass =
  "rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/20";

export default function NewNoticePage() {
  return (
    <Suspense fallback={<p className="p-8">확인 중...</p>}>
      <NewNoticeForm />
    </Suspense>
  );
}

async function NewNoticeForm() {
  await connection();
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) redirect("/login");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-8 py-16">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">새 공지 작성</h1>
      <form action={createNoticeAction} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          제목
          <input name="title" type="text" required maxLength={100} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          내용
          <textarea
            name="content"
            rows={6}
            required
            maxLength={5000}
            className={`${inputClass} resize-none`}
          />
        </label>
        <SubmitButton label="등록하기" />
      </form>
    </div>
  );
}
