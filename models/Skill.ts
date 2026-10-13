import { Schema, model, models } from "mongoose";

// 기술 스택 하나의 항목 스키마
const skillSchema = new Schema(
  {
    category: { type: String, required: true, trim: true }, // 예: "Frontend", "Backend"
    name: { type: String, required: true, trim: true },     // 예: "Next.js"
    level: { type: String, required: true, enum: ["상", "중", "하"] }, // 숙련도
  },
  { timestamps: true } // createdAt / updatedAt 자동 추가
);

export const Skill = models.Skill || model("Skill", skillSchema);
