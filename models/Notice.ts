import { Schema, model, models } from "mongoose";

// 공지사항 스키마 (6주차: MongoDB 연동)
const noticeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// hot-reload로 모델이 중복 정의되는 것을 막기 위해 이미 있으면 재사용합니다.
export const Notice = models.Notice || model("Notice", noticeSchema);
