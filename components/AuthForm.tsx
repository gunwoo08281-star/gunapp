'use client'

import { useActionState } from 'react'
import type { AuthFormState } from '@/app/skills/auth-actions'

const inputClass =
  'rounded-lg border border-black/15 bg-transparent px-3 py-2 dark:border-white/20'

export function AuthForm({
  action,
  withName,
  submitLabel,
}: {
  action: (prev: AuthFormState, formData: FormData) => Promise<AuthFormState>
  withName?: boolean
  submitLabel: string
}) {
  const [state, formAction, pending] = useActionState(action, undefined)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {withName && (
        <label className="flex flex-col gap-1 text-sm">
          이름
          <input name="name" required maxLength={40} className={inputClass} />
        </label>
      )}
      <label className="flex flex-col gap-1 text-sm">
        이메일
        <input name="email" type="email" required maxLength={100} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        비밀번호
        <input
          name="password"
          type="password"
          required
          minLength={withName ? 8 : undefined}
          maxLength={100}
          className={inputClass}
        />
      </label>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {pending ? '처리 중...' : submitLabel}
      </button>
    </form>
  )
}
