import { Schema, model, models } from "mongoose";

// 로그인용 사용자 스키마 — 비밀번호는 평문이 아니라 bcrypt 해시만 저장합니다.
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);
