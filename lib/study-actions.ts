"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { likeProduct } from "@/lib/products";
import { createNotice } from "@/lib/notices";
import { requireAdmin } from "@/lib/admin";

export async function likeProductAction(id: string) {
  const newLikes = await likeProduct(id);
  revalidatePath(`/products/${id}`);
  return newLikes;
}

// 공지 작성은 로그인한 포트폴리오 주인만 가능합니다. 작성자는 세션의 이름을 사용합니다.
export async function createNoticeAction(formData: FormData) {
  const session = await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content || title.length > 100 || content.length > 5000) {
    throw new Error("제목(100자 이내)과 내용(5000자 이내)을 입력해주세요.");
  }

  const notice = await createNotice({
    title,
    author: session.user?.name ?? "곽건우",
    content,
  });
  revalidatePath("/notices");
  redirect(`/notices/${notice.id}`);
}
