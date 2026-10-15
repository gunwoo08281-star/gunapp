'use server'

import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'
import { signIn, signOut } from '@/auth'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/User'

export type AuthFormState = { error?: string } | undefined

function readText(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key)
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed && trimmed.length <= maxLength ? trimmed : null
}

export async function login(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = readText(formData, 'email', 100)
  const password = readText(formData, 'password', 100)
  if (!email || !password) return { error: '이메일과 비밀번호를 입력해주세요.' }

  try {
    await signIn('credentials', { email, password, redirectTo: '/skills/manage' })
  } catch (error) {
    if (error instanceof AuthError) return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
    throw error // redirect는 에러로 던져지므로 그대로 다시 던집니다.
  }
}

export async function register(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const name = readText(formData, 'name', 40)
  const email = readText(formData, 'email', 100)
  const password = readText(formData, 'password', 100)
  if (!name || !email || !password) return { error: '모든 항목을 입력해주세요.' }
  if (password.length < 8) return { error: '비밀번호는 8자 이상이어야 합니다.' }

  await connectDB()
  if (await User.exists({ email: email.toLowerCase() })) {
    return { error: '이미 가입된 이메일입니다.' }
  }
  const passwordHash = await bcrypt.hash(password, 12)
  await User.create({ name, email, passwordHash })
  redirect('/login')
}

export async function logout() {
  await signOut({ redirectTo: '/' })
}
