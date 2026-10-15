import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { connection } from "next/server";
import { getNotice } from "@/lib/notices";

type Props = { params: Promise<{ id: string }> };

export default function NoticeDetailPage({ params }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-8 py-16">
      <Link href="/notices" className="text-sm text-zinc-500 hover:underline">
        ← 목록으로
      </Link>
      <Suspense fallback={<p>불러오는 중...</p>}>
        <NoticeDetail params={params} />
      </Suspense>
    </div>
  );
}

async function NoticeDetail({ params }: Props) {
  await connection();
  const { id } = await params;
  const notice = await getNotice(id);
  if (!notice) notFound();

  return (
    <>
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">{notice.title}</h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {notice.author} · {notice.createdAt}
      </p>
      <p className="whitespace-pre-wrap leading-7 text-zinc-700 dark:text-zinc-300">
        {notice.content}
      </p>
    </>
  );
}
