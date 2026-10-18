import { Schema, deleteModel, model, models } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    tech: { type: [String], required: true },
    github: { type: String, required: true, trim: true },
    demo: { type: String, required: true, trim: true },
    role: { type: String, default: "", trim: true },
    features: { type: [String], default: [] },
    challenge: { type: String, default: "", trim: true },
    part: { type: String, default: "", trim: true },
    contribution: { type: String, default: "", trim: true },
    result: { type: String, default: "", trim: true },
    image: { type: String, default: "", trim: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

// 개발 중 스키마가 바뀌어도 옛 모델이 캐시되지 않도록 다시 등록
if (models.Project) deleteModel("Project");

export const ProjectModel = model("Project", projectSchema);
