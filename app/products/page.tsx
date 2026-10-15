import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getProducts } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-8 py-16">
      <h1 className="mb-8 text-2xl font-semibold text-black dark:text-zinc-50">상품목록</h1>
      <Suspense fallback={<p>상품을 불러오는 중...</p>}>
        <ProductList />
      </Suspense>
    </div>
  );
}

async function ProductList() {
  await connection();
  const products = await getProducts();

  return (
    <ul className="flex flex-col gap-4">
      {products.map((p) => (
        <li key={p.id}>
          <Link
            href={`/products/${p.id}`}
            className="block rounded-lg border border-black/8 px-5 py-4 transition-colors hover:bg-black/3 dark:border-white/[.145] dark:hover:bg-white/5"
          >
            <p className="font-medium text-black dark:text-zinc-50">{p.name}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {p.description} - 좋아요 {p.likes}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
