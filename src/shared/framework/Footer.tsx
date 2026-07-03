import Link from "next/link";
import { siteConfig } from "@/site/config";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-semibold text-white">{siteConfig.title}</p>
          <p className="mt-1 max-w-xl text-sm text-zinc-400">
            {siteConfig.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="hover:text-white" href="/atom.xml">
            Atom
          </Link>
          <Link className="hover:text-white" href="/sitemap.xml">
            Sitemap
          </Link>
          <Link className="hover:text-white" href="/projects/maildesk/privacy/">
            MailDesk Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
