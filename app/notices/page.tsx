import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getNotices } from "@/lib/notices";

export default function NoticesPage() {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-8 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">공지사항</h1>
        <Link
          href="/notices/new"
          className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          + 새 글 작성
        </Link>
      </div>
      <Suspense fallback={<p>공지사항을 불러오는 중...</p>}>
        <NoticeList />
      </Suspense>
    </div>
  );
}

async function NoticeList() {
  await connection();
  let notices;
  try {
    notices = await getNotices();
  } catch (error) {
    console.error("[notices] DB 오류:", error);
    return <p className="text-sm text-red-600">공지사항을 불러오지 못했습니다.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {notices.map((n) => (
        <li key={n.id}>
          <Link
            href={`/notices/${n.id}`}
            className="block rounded-lg border border-black/8 px-5 py-4 transition-colors hover:bg-black/3 dark:border-white/[.145] dark:hover:bg-white/5"
          >
            <p className="font-medium text-black dark:text-zinc-50">{n.title}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {n.author} · {n.createdAt}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
