import Link from "next/link";
import type { TaxonomyItem } from "@/features/blog/entity/types";

interface TaxonomyListProps {
  basePath: "/categories" | "/tags";
  items: TaxonomyItem[];
}

export function TaxonomyList({ basePath, items }: TaxonomyListProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`${basePath}/${item.slug}/`}
          className="flex items-center justify-between rounded-md border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
        >
          <span className="font-medium text-zinc-900">{item.name}</span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
            {item.count}
          </span>
        </Link>
      ))}
    </div>
  );
}
