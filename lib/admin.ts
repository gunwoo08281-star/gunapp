import { auth } from "@/auth";

// 포트폴리오 주인(ADMIN_EMAIL)만 기술 목록을 수정할 수 있습니다.
export function isAdminEmail(email?: string | null) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return !!adminEmail && !!email && email.toLowerCase() === adminEmail;
}

export async function requireAdmin() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) {
    throw new Error("로그인이 필요합니다.");
  }
  return session!;
}
