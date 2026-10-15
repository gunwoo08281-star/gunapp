"use client";

import { useState, useTransition } from "react";
import { likeProductAction } from "@/lib/study-actions";

// useTransition + 서버 액션으로 좋아요 수를 갱신합니다.
export function LikeButton({ id, initialLikes }: { id: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      className="self-start rounded-lg border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/5 disabled:opacity-50 dark:border-white/20 dark:hover:bg-white/10"
      onClick={() => {
        startTransition(async () => {
          setLikes(await likeProductAction(id));
        });
      }}
    >
      {isPending ? "저장 중..." : `♥ 좋아요 ${likes}`}
    </button>
  );
}
