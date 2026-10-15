import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { login } from "../skills/auth-actions";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-8 py-16">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">로그인</h1>
        <AuthForm action={login} submitLabel="로그인" />
        <Link href="/register" className="text-sm underline underline-offset-4 text-zinc-950 dark:text-zinc-50">
          계정 만들기 →
        </Link>
      </div>
    </div>
  );
}
