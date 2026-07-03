import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-zinc-950">Page not found</h1>
      <p className="mt-4 text-zinc-600">
        The page may have moved, or the old link may not be part of the migrated archive.
      </p>
      <Link
        href="/archives/"
        className="mt-6 inline-flex rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Browse archives
      </Link>
    </main>
  );
}
