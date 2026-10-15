'use server'

import { revalidatePath } from 'next/cache'
import { Types } from 'mongoose'
import { Skill as SkillModel } from '@/models/Skill'
import { connectDB } from '@/lib/mongodb'
import { requireAdmin } from '@/lib/admin'

const allowedLevels = new Set(['상', '중', '하'])

function readText(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key)
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed && trimmed.length <= maxLength ? trimmed : null
}

export async function addSkill(formData: FormData) {
  await requireAdmin()
  const category = readText(formData, 'category', 40)
  const name = readText(formData, 'name', 80)
  const level = readText(formData, 'level', 1)

  if (!category || !name || !level || !allowedLevels.has(level)) {
    throw new Error('분류, 기술명, 숙련도를 올바르게 입력해주세요.')
  }

  await connectDB()
  await SkillModel.create({ category, name, level })
  revalidatePath('/skills')
  revalidatePath('/skills/manage')
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin()
  const id = formData.get('id')
  if (typeof id !== 'string' || !Types.ObjectId.isValid(id)) {
    throw new Error('삭제할 기술 항목을 확인할 수 없습니다.')
  }

  await connectDB()
  await SkillModel.deleteOne({ _id: id })
  revalidatePath('/skills')
  revalidatePath('/skills/manage')
}
