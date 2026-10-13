import { Schema, model, models } from 'mongoose'

const skillSeedSchema = new Schema({
  _id: { type: String, required: true },
})

export const SkillSeed = models.SkillSeed || model('SkillSeed', skillSeedSchema)
