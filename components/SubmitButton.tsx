"use client";

import { useFormStatus } from "react-dom";

// useFormStatus로 제출 중 상태를 표시합니다.
export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
    >
      {pending ? "저장 중..." : label}
    </button>
  );
}
