This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## MongoDB 설정

프로젝트와 기술 스택 페이지는 MongoDB에서 데이터를 불러옵니다. 로컬 개발 환경에서는 예시 파일을 복사해 `.env.local`을 만든 뒤 `MONGODB_URI`를 설정하세요.

```bash
cp .env.local.example .env.local
```

`.env.local`의 `MONGODB_URI`를 실제 MongoDB 연결 URI로 교체한 다음 개발 서버를 실행합니다. 연결 URI는 소스 코드나 공개 저장소에 올리지 마세요. Vercel 배포에서는 프로젝트의 Environment Variables에 `MONGODB_URI`를 등록해야 합니다.

처음 접속했을 때 `Skill` 또는 `Project` 컬렉션이 비어 있으면 페이지가 예시 항목을 채웁니다. 이후 MongoDB에서 항목을 수정하면 각 페이지가 DB에 저장된 내용을 표시합니다. 연결 URI가 없거나 MongoDB 연결에 실패하면 해당 페이지에 오류가 표시됩니다.

기술 스택 페이지(`/skills`)는 목록을 보여주며, `/skills/manage`에서 기술 항목을 추가하거나 삭제할 수 있습니다.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
