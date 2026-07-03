import type { ReactNode } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:py-14">
      <header className="mb-8 max-w-3xl">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-700">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-normal text-zinc-950 sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-base leading-7 text-zinc-600">{description}</p>
        ) : null}
      </header>
      {children}
    </main>
  );
}
