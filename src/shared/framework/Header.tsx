import Link from "next/link";
import { siteConfig } from "@/site/config";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="group" aria-label="Dowen，回首頁">
          <p className="text-xl font-semibold tracking-normal text-zinc-950">
            {siteConfig.title}
          </p>
          <p className="text-sm text-zinc-500">{siteConfig.subtitle}</p>
        </Link>
        <nav aria-label="主要導覽" className="flex flex-wrap gap-1">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
