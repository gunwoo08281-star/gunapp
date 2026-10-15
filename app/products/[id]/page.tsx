import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { LikeButton } from "@/components/LikeButton";
import { getProduct } from "@/lib/products";

type Props = { params: Promise<{ id: string }> };

export default function ProductDetailPage({ params }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-8 py-16">
      <Link href="/products" className="text-sm text-zinc-500 hover:underline">
        ← 목록으로
      </Link>
      <Suspense fallback={<p>불러오는 중...</p>}>
        <ProductDetail params={params} />
      </Suspense>
    </div>
  );
}

async function ProductDetail({ params }: Props) {
  await connection();
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <>
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">{product.name}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">{product.description}</p>
      <LikeButton id={product.id} initialLikes={product.likes} />
    </>
  );
}
