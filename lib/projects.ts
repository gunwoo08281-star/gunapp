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
    title: "Museum of Cryptography",
    description:
      "중부대 팀 프로젝트로 만든 가상 암호학 박물관. 고대(스키테일, 카이사르), 근대(에니그마), 현대(양자암호, 블록체인) 전시관으로 암호의 역사를 소개합니다.",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    github: "https://github.com/gunwoo08281-star/web-peam-project",
    demo: "https://web-peam-project.vercel.app",
    order: 1,
  },
  {
    title: "스마트 디지털 냉장고",
    description:
      "팀장 겸 프론트엔드 개발로 참여한 팀 프로젝트. 집 안 식품과 유통기한을 관리하고, 실시간 추가/삭제와 상태 표시, 반응형 그리드, 입력 폼 검증을 구현했습니다.",
    tech: ["HTML5", "CSS3", "JavaScript", "GitHub"],
    github: "https://github.com/gunwoo08281-star/refrigerator",
    demo: "#",
    order: 2,
  },
  {
    title: "웹서버보안프로그래밍 학습 사이트 (my-app)",
    description:
      "웹서버보안프로그래밍 수업 내용을 따라 만든 풀스택 사이트. 공지사항 게시판(MongoDB 연동), 상품 목록과 좋아요(서버 액션), 이메일/비밀번호 로그인(Auth.js + bcrypt)을 구현했습니다.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Auth.js", "Tailwind CSS"],
    github: "https://github.com/gunwoo08281-star/my-app",
    demo: "https://my-app-rouge-eight-47.vercel.app",
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

// 제목 기준으로 없으면 추가, 있으면 내용을 최신으로 맞춤
async function syncInitialProjects() {
  await ProjectModel.bulkWrite(
    initialProjects.map((project) => ({
      updateOne: {
        filter: { title: project.title },
        update: { $set: project },
        upsert: true,
      },
    })),
  );
}

export async function getProjects(): Promise<Project[]> {
  await connectDB();
  await ProjectModel.deleteMany({
    title: {
      $in: ["보안 취약점 분석 보고서", "웹보안프로그래밍 실습 사이트", "개인 포트폴리오 사이트"],
    },
  });
  await syncInitialProjects();

  const docs = await ProjectModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return docs.map((doc) => toProject(doc as ProjectDocLike));
}
