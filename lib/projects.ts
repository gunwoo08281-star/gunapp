import { ProjectModel } from "@/models/Project";
import { connectDB } from "./mongodb";

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  role: string;
  features: string[];
  challenge: string;
  part: string;
  contribution: string;
  result: string;
  image: string;
};

type ProjectDocLike = {
  _id: unknown;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  role?: string;
  features?: string[];
  challenge?: string;
  part?: string;
  contribution?: string;
  result?: string;
  image?: string;
};

const initialProjects = [
  {
    title: "Museum of Cryptography",
    description: "암호의 역사를 시대별 전시관으로 둘러보는 가상 암호학 박물관 웹사이트입니다.",
    part: "HTML과 CSS로 사이트 레이아웃을 구성하고, 전체 색상과 레이아웃 디자인을 담당했습니다.",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    github: "https://github.com/gunwoo08281-star/web-peam-project",
    demo: "https://web-peam-project.vercel.app",
    role: "팀 프로젝트 참여",
    features: [
      "고대·근대·현대 3개 전시관으로 암호의 역사를 시대순으로 구성",
      "스키테일, 카이사르, 에니그마, 양자암호, 블록체인 소개",
      "Vercel로 배포",
    ],
    challenge: "",
    contribution: "",
    result: "HTML, CSS, JavaScript를 처음 배우면서 팀원들과 함께 만든 첫 웹 프로젝트입니다. 서툴렀지만 레이아웃을 직접 구성하고 팀원들과 협업하며 웹이 만들어지는 과정을 이해할 수 있었습니다.",
    image: "",
    order: 1,
  },
  {
    title: "스마트 디지털 냉장고",
    description: "집 안 식품과 유통기한을 관리하는 스마트 디지털 냉장고 웹 앱입니다.",
    tech: ["HTML5", "CSS3", "JavaScript", "GitHub"],
    github: "https://github.com/gunwoo08281-star/refrigerator",
    demo: "#",
    role: "팀 프로젝트 참여",
    features: [
      "식품 실시간 추가/삭제와 유통기한 상태 표시",
      "반응형 그리드 레이아웃",
      "입력 폼 검증",
    ],
    challenge: "",
    part: "집 안 식품과 유통기한을 관리하는 팀 프로젝트로, 식품 추가/삭제와 상태 표시, 반응형 그리드, 입력 폼 검증 기능을 갖추고 있습니다.",
    contribution: "HTML과 CSS로 사이트 레이아웃을 구성하고, 전체 색상과 레이아웃 디자인을 담당했습니다.",
    result: "HTML, CSS, JavaScript를 배운 뒤 팀원들과 함께 만든 두 번째 웹 프로젝트입니다. 아직 서툴렀지만 화면 구성부터 입력 처리까지 직접 해 보며 웹의 동작 원리를 조금 더 이해하게 되었습니다.",
    image: "",
    order: 2,
  },
  {
    title: "웹서버보안프로그래밍 학습 사이트 (my-app)",
    description: "웹서버보안프로그래밍 수업 내용을 따라 만든 풀스택 학습 사이트입니다.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Auth.js", "Tailwind CSS"],
    github: "https://github.com/gunwoo08281-star/my-app",
    demo: "https://my-app-rouge-eight-47.vercel.app",
    role: "개인 프로젝트 (설계 · 개발 · 배포)",
    features: [
      "MongoDB 연동 공지사항 게시판",
      "서버 액션 기반 상품 좋아요",
      "Auth.js + bcrypt 이메일/비밀번호 로그인",
    ],
    challenge: "",
    part: "",
    contribution: "",
    result: "서버와 데이터베이스, 로그인 기능을 처음 배워 보며 직접 만든 사이트입니다. 글을 저장하면 DB에 남고 로그인한 사람만 쓸 수 있다는 점이 신기했고, 비밀번호를 그대로 저장하지 않고 암호화한다는 걸 알게 되어 보안이 왜 중요한지 느꼈습니다.",
    image: "",
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
    role: doc.role ?? "",
    features: doc.features ?? [],
    challenge: doc.challenge ?? "",
    part: doc.part ?? "",
    contribution: doc.contribution ?? "",
    result: doc.result ?? "",
    image: doc.image ?? "",
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
