import { ProjectModel } from "@/models/Project";
import { connectDB } from "./mongodb";

const githubProfile = "https://github.com/gunwoo08281-star";

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
};

type ProjectDocLike = {
  _id: unknown;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
};

const initialProjects = [
  {
    title: "웹보안프로그래밍 실습 사이트",
    description:
      "Next.js App Router 기반의 풀스택 웹 애플리케이션. 공지사항 CRUD, 상품 목록, 인증 기능 포함.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    github: githubProfile,
    demo: "#",
    order: 1,
  },
  {
    title: "개인 포트폴리오 사이트",
    description:
      "웹 중간고사 과제로 제작한 개인 포트폴리오. 자기소개, 기술 스택, 프로젝트 페이지 구성.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    github: githubProfile,
    demo: "#",
    order: 2,
  },
];

function toProject(doc: ProjectDocLike): Project {
  return {
    id: String(doc._id),
    title: doc.title,
    description: doc.description,
    tech: doc.tech,
    github: doc.github,
    demo: doc.demo,
  };
}

async function seedIfEmpty() {
  if ((await ProjectModel.countDocuments()) > 0) return;
  await ProjectModel.insertMany(initialProjects);
}

export async function getProjects(): Promise<Project[]> {
  await connectDB();
  await ProjectModel.deleteOne({ title: "보안 취약점 분석 보고서" });
  await ProjectModel.updateMany({}, { $set: { github: githubProfile } });
  await seedIfEmpty();

  const docs = await ProjectModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return docs.map((doc) => toProject(doc as ProjectDocLike));
}
