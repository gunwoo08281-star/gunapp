import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { register } from "../skills/auth-actions";

export default function RegisterPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-8 py-16">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">회원가입</h1>
        <AuthForm action={register} withName submitLabel="회원가입" />
        <Link href="/login" className="text-sm underline underline-offset-4 text-zinc-950 dark:text-zinc-50">
          로그인으로 →
        </Link>
      </div>
    </div>
  );
}
