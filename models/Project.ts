import { Schema, model, models } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tech: { type: [String], required: true },
    github: { type: String, required: true, trim: true },
    demo: { type: String, required: true, trim: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const ProjectModel =
  models.Project || model("Project", projectSchema);
