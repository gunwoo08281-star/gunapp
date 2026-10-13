import { connectDB } from "./mongodb";
import { Skill as SkillModel } from "@/models/Skill";
import { SkillSeed } from "@/models/SkillSeed";

// 타입 정의
export type Skill = {
  id: string;
  category: string;
  name: string;
  level: "상" | "중" | "하";
};

type SkillDocLike = {
  _id: unknown;
  category: string;
  name: string;
  level: string;
};

function toSkill(doc: SkillDocLike): Skill {
  return {
    id: String(doc._id),
    category: doc.category,
    name: doc.name,
    level: doc.level as "상" | "중" | "하",
  };
}

// DB가 비어있으면 초기 데이터를 넣어줌
async function seedIfEmpty() {
  const seedId = "default-skills-v1";
  const marker = await SkillSeed.updateOne(
    { _id: seedId },
    { $setOnInsert: { _id: seedId } },
    { upsert: true },
  );

  // 마커를 처음 만든 요청만 초기 예시 데이터를 추가합니다.
  if (marker.upsertedCount === 0) return;

  const count = await SkillModel.countDocuments();
  if (count > 0) return;

  try {
    await SkillModel.insertMany([
      { category: "Frontend", name: "HTML / CSS", level: "상" },
      { category: "Frontend", name: "JavaScript", level: "중" },
      { category: "Frontend", name: "TypeScript", level: "중" },
      { category: "Frontend", name: "React", level: "중" },
      { category: "Frontend", name: "Next.js", level: "중" },
      { category: "Frontend", name: "Tailwind CSS", level: "중" },
      { category: "Backend", name: "Node.js", level: "중" },
      { category: "Backend", name: "Express", level: "하" },
      { category: "Backend", name: "MongoDB / Mongoose", level: "중" },
      { category: "Backend", name: "REST API", level: "중" },
      { category: "보안", name: "웹 보안 기초", level: "중" },
      { category: "보안", name: "인증/인가 (JWT, OAuth)", level: "중" },
      { category: "보안", name: "HTTPS / TLS", level: "하" },
      { category: "도구", name: "Git / GitHub", level: "중" },
      { category: "도구", name: "VS Code", level: "상" },
      { category: "도구", name: "Vercel", level: "중" },
    ]);
  } catch (error) {
    await SkillSeed.deleteOne({ _id: seedId });
    throw error;
  }
}

// 전체 스킬 조회
export async function getSkills(): Promise<Skill[]> {
  await connectDB();
  await seedIfEmpty();

  const docs = await SkillModel.find().sort({ category: 1, createdAt: 1 }).lean();
  return docs.map((doc) => toSkill(doc as SkillDocLike));
}

// 카테고리별로 그룹핑해서 반환
export async function getSkillsByCategory(): Promise<
  { category: string; items: Skill[] }[]
> {
  const skills = await getSkills();

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return Object.entries(grouped).map(([category, items]) => ({
    category,
    items,
  }));
}
