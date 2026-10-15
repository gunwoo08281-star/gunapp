"use client";

import { useState } from "react";

// 3주차: 클라이언트 컴포넌트와 useState
export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      type="button"
      className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      onClick={() => setCount((c) => c + 1)}
    >
      카운터 - {count}
    </button>
  );
}
