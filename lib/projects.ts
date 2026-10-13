import { ProjectModel } from "@/models/Project";
import { connectDB } from "./mongodb";

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
    github: "#",
    demo: "#",
    order: 1,
  },
  {
    title: "개인 포트폴리오 사이트",
    description:
      "웹 중간고사 과제로 제작한 개인 포트폴리오. 자기소개, 기술 스택, 프로젝트 페이지 구성.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    github: "#",
    demo: "#",
    order: 2,
  },
  {
    title: "보안 취약점 분석 보고서",
    description:
      "XSS, CSRF, SQL Injection 등 주요 웹 취약점을 분석하고 대응 방안을 정리한 문서 프로젝트.",
    tech: ["보안분석", "OWASP", "보고서"],
    github: "#",
    demo: "#",
    order: 3,
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
  await seedIfEmpty();

  const docs = await ProjectModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return docs.map((doc) => toProject(doc as ProjectDocLike));
}
