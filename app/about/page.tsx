import type { Metadata } from "next";
import {
  BriefcaseBusiness,
  Code2,
  Mountain,
} from "lucide-react";
import { getAboutPage } from "@/features/blog/adapter/pageRepository";
import { ArticleBody } from "@/features/blog/framework/ArticleBody";
import { PageShell } from "@/shared/framework/PageShell";

export const metadata: Metadata = {
  title: "關於",
  description: "Dowen 的工程背景、專案方向與技術興趣。",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  const legacyAbout = getAboutPage();

  return (
    <PageShell
      eyebrow="關於"
      title="關於 Dowen"
      description="產品型工程、桌面工具、瀏覽器擴充套件、遊戲與圖形實驗。"
    >
      <div className="space-y-14">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              工程背景
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-zinc-950 sm:text-4xl">
              從遊戲與圖形實驗出發，持續把想法做成可驗證的工具。
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-zinc-700">
              <p>
                我關心的是把需求切成能落地的工程邊界：桌面 App、瀏覽器擴充套件、
                原生主機、即時 WebSocket 流程、Windows 自動化，以及能被重複驗證的發布路徑。
              </p>
              <p>
                早期寫過 LibGDX、OpenGL、遊戲原型和技術筆記；近期更常把工具做成
                本機優先、可測試、能說清楚權限與資料邊界的產品型個人專案。
              </p>
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="border-l-2 border-emerald-500 pl-4">
                <dt className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                  <BriefcaseBusiness size={16} aria-hidden="true" />
                  目前
                </dt>
                <dd className="mt-1 text-base font-semibold text-zinc-950">
                  台灣 LINE
                </dd>
              </div>
              <div className="border-l-2 border-sky-500 pl-4">
                <dt className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                  <Code2 size={16} aria-hidden="true" />
                  範圍
                </dt>
                <dd className="mt-1 text-base font-semibold text-zinc-950">
                  工程 / 內容 / 3D / 遊戲
                </dd>
              </div>
              <div className="border-l-2 border-amber-500 pl-4">
                <dt className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                  <Mountain size={16} aria-hidden="true" />
                  生活紀錄
                </dt>
                <dd className="mt-1 text-base font-semibold text-zinc-950">
                  象山 100+ 次
                </dd>
              </div>
            </dl>
          </div>

          <AboutTrajectoryIllustration />
        </section>

        <details className="group max-w-[var(--article-width)] border-t border-zinc-200 pt-5">
          <summary className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-800">
            <span className="group-open:hidden">舊版自傳</span>
            <span className="hidden group-open:inline">收合舊版自傳</span>
          </summary>
          <article className="mt-6 rounded-lg border border-zinc-200 bg-white p-5">
            <ArticleBody html={legacyAbout.html} />
          </article>
        </details>
      </div>
    </PageShell>
  );
}

function AboutTrajectoryIllustration() {
  return (
    <figure className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
      <svg
        viewBox="0 0 360 360"
        role="img"
        aria-labelledby="about-trajectory-title about-trajectory-desc"
        className="h-auto w-full"
      >
        <title id="about-trajectory-title">Dowen 的經歷路徑</title>
        <desc id="about-trajectory-desc">
          一條連接程式實驗、媒體、3D、接案、短暫遊戲業經驗、LINE、AI 與象山的路徑。
        </desc>
        <defs>
          <linearGradient id="trajectory-line" x1="52" x2="314" y1="286" y2="78">
            <stop offset="0" stopColor="#10b981" />
            <stop offset="0.5" stopColor="#0284c7" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        <rect width="360" height="360" rx="22" fill="#fafafa" />
        <path
          d="M42 296 C94 220 128 244 166 176 C198 118 252 154 316 72"
          fill="none"
          stroke="url(#trajectory-line)"
          strokeLinecap="round"
          strokeWidth="8"
        />
        <path
          d="M50 306 L96 250 L124 286 L164 214 L198 266 L236 194 L320 306 Z"
          fill="#0f172a"
          opacity="0.08"
        />
        <path
          d="M58 306 L102 260 L128 290 L164 224 L194 268 L234 206 L306 306 Z"
          fill="#10b981"
          opacity="0.18"
        />

        <TrajectoryNode cx={58} cy={286} fill="#10b981" label="程式" />
        <TrajectoryNode cx={112} cy={238} fill="#14b8a6" label="YouTube" />
        <TrajectoryNode cx={166} cy={176} fill="#0284c7" label="3D" />
        <TrajectoryNode cx={218} cy={148} fill="#6366f1" label="接案" />
        <TrajectoryNode cx={258} cy={130} fill="#e11d48" label="遊戲" />
        <TrajectoryNode cx={296} cy={94} fill="#06b6d4" label="LINE" />

        <g transform="translate(224 224)">
          <circle cx="42" cy="42" r="42" fill="#fff7ed" />
          <circle cx="42" cy="42" r="27" fill="#fed7aa" />
          <path
            d="M42 19 L47 36 L64 36 L50 46 L55 63 L42 52 L28 63 L34 46 L20 36 L37 36 Z"
            fill="#f97316"
          />
          <text
            x="42"
            y="98"
            fill="#52525b"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
          >
            AI 時代
          </text>
        </g>

        <g transform="translate(36 34)">
          <rect width="128" height="58" rx="12" fill="#ffffff" />
          <path
            d="M18 42 L36 22 L50 40 L66 16 L96 42 Z"
            fill="#047857"
            opacity="0.85"
          />
          <text x="18" y="72" fill="#52525b" fontSize="13" fontWeight="700">
            象山 100+
          </text>
        </g>
      </svg>

      <figcaption className="mt-4 flex items-center gap-3 text-sm leading-6 text-zinc-600">
        <Mountain size={18} className="shrink-0 text-emerald-700" aria-hidden="true" />
        一條不算直線、但一直在累積判斷力的工程路徑。
      </figcaption>
    </figure>
  );
}

function TrajectoryNode({
  cx,
  cy,
  fill,
  label,
}: {
  cx: number;
  cy: number;
  fill: string;
  label: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="17" fill="#ffffff" stroke={fill} strokeWidth="5" />
      <circle cx={cx} cy={cy} r="6" fill={fill} />
      <text
        x={cx}
        y={cy - 24}
        fill="#3f3f46"
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}
