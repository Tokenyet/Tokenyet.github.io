/**
 * Intent: Keep public-safe project metadata stable and routeable.
 * Constraints: Static data only; no private repository paths, credentials, or OAuth values.
 * Acceptance: Project showcase pages and MailDesk privacy routes render from one typed source.
 */

import type { Project } from "@/features/projects/entity/types";

const projects: Project[] = [
  {
    slug: "maildesk",
    name: "MailDesk",
    kind: "Windows 桌面 App",
    tagline: "以 Windows 工作流程為核心的本機優先 Gmail 桌面工具。",
    summary:
      "MailDesk 把 Gmail 收件匣、標籤、搜尋、郵件操作、附件處理與通知控制整合進原生 Windows 桌面流程。",
    status: "私人 alpha / 商店上架準備",
    year: "2026",
    role: "產品工程、OAuth 整合、Windows 通知設計",
    impact:
      "把原本綁在瀏覽器裡的郵件工作流，轉成帳號控制與通知模式都更明確的本機桌面 App。",
    updatedAt: "2026-06-25",
    featured: true,
    verificationPath: "/projects/maildesk/",
    privacyPath: "/projects/maildesk/privacy/",
    stack: ["Flutter", "Dart", "Gmail API", "OAuth", "Windows 通知"],
    highlights: [
      "支援多個 Google 帳號的 Gmail 工作流程。",
      "涵蓋收件匣、搜尋、標籤、郵件詳情、寄信、回覆、轉寄、封存、垃圾桶、垃圾郵件與附件下載。",
      "可調整的 Windows 通知模式，包含只提示驗證碼郵件的模式。",
      "OAuth token、郵件快取、設定、log 與通知狀態都保留在使用者的 Windows 裝置上。",
    ],
    caseStudy: [
      {
        title: "問題",
        body: "Gmail 功能完整，但郵件整理、搜尋、帳號切換與驗證碼提醒這些重複桌面工作，仍然高度依賴瀏覽器狀態。",
      },
      {
        title: "做法",
        body: "以 Windows 桌面體驗為主，整合 Google OAuth、Gmail API、本機快取、受控郵件操作與使用者能理解的通知設定。",
      },
      {
        title: "成果",
        body: "完成私人 alpha 版本，具備端到端 Gmail 操作流程、本機資料邊界，以及可支援商店審查的隱私說明。",
      },
    ],
    dataUse: [
      {
        title: "MailDesk 會存取的資料",
        body: "MailDesk 只會在使用者登入 Google 帳號並授權後存取 Gmail 資料。依照核准的權限，MailDesk 可能會存取 Gmail 郵件、標籤、郵件中繼資料、附件，以及提供郵件工具功能所需的帳號基本資料。",
      },
      {
        title: "資料如何使用",
        body: "MailDesk 使用 Gmail 資料來顯示郵件、搜尋郵件、管理標籤、寄信與回信、下載附件、同步收件匣狀態，以及顯示使用者設定的 Windows 通知。當使用者啟用驗證碼通知模式時，MailDesk 可能會從郵件標題與摘要中偵測驗證碼。",
      },
      {
        title: "本機儲存",
        body: "MailDesk 會使用安全儲存機制，把 OAuth token 存在使用者的 Windows 裝置上。郵件快取、設定、log 與通知狀態也會儲存在本機，以便 App 運作並提升可靠性。",
      },
      {
        title: "資料分享",
        body: "MailDesk 不會販售使用者資料，不會把 Gmail 資料用於廣告，也不會將 Gmail 資料轉交第三方；除非那是透過 Google API 提供使用者要求的 Gmail 功能所必須。",
      },
      {
        title: "刪除資料",
        body: "使用者可以從 MailDesk 移除帳號，以刪除該帳號儲存在本機的驗證 token。使用者也可以解除安裝 MailDesk，並從 Windows 移除 App 的本機資料。",
      },
      {
        title: "聯絡方式",
        body: "若有隱私相關問題，請透過 Microsoft Store 上列出的支援聯絡方式聯絡 MailDesk 發布者。",
      },
    ],
  },
  {
    slug: "video-theater",
    name: "Video Theater",
    kind: "瀏覽器擴充套件",
    tagline: "調整網頁影片亮度、對比、飽和度與暖色，並依網域保存快速設定。",
    summary:
      "已上架 Chrome Web Store 的 Manifest V3 擴充套件。使用者可在目前分頁調整影片濾鏡，並為每個網域保存最多三組快速設定，下次回到同一網站時自動套用。",
    status: "Chrome Web Store 上架中",
    year: "2026",
    role: "擴充套件設計、MV3 實作、多語系上架素材",
    impact:
      "讓過亮或過暗的網頁影片能按網站保存觀看校正，不必每次重新調整。",
    updatedAt: "2026-06-14",
    featured: true,
    image: {
      src: "/images/projects/video-theater-zh-TW-1280x800.png",
      alt: "Video Theater 的正體中文商店截圖，顯示影片濾鏡快速設定介面。",
    },
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/video-theater/hmgmipmaekaeamkgohlimpfomgnhmcfc",
      },
      {
        label: "官方頁面",
        href: "https://www.dowen.idv.tw/video_theater/",
      },
      {
        label: "隱私政策",
        href: "https://www.dowen.idv.tw/video_theater/privacy.html",
      },
      {
        label: "GitHub",
        href: "https://github.com/Tokenyet/video_theater",
      },
    ],
    stack: [
      "Chrome MV3",
      "JavaScript",
      "CSS filters",
      "chrome.storage.sync",
      "GitHub Pages",
    ],
    highlights: [
      "已公開在 Chrome Web Store，並有官方說明頁與隱私政策頁。",
      "提供亮度、對比、飽和度與暖色滑桿。",
      "每個網域最多可保存三組快速設定，並可自動套用最後選擇的設定。",
      "支援英文、正體中文、簡體中文、日文與韓文。",
    ],
    caseStudy: [
      {
        title: "問題",
        body: "不同網站與觀看環境的影片亮度差異很大，使用者常需要重複調整同一類校正。",
      },
      {
        title: "做法",
        body: "用 Manifest V3 popup 控制目前分頁的 video CSS filters，將快速設定依網域保存到 chrome.storage.sync，並提供 options 頁管理。",
      },
      {
        title: "成果",
        body: "完成可上架的擴充套件、官方頁面、隱私政策、多語系 listing 與商店截圖。",
      },
    ],
  },
  {
    slug: "vivaldi-drag-search",
    name: "Vivaldi Drag Search",
    kind: "瀏覽器擴充套件",
    tagline: "為 Vivaldi UI 自動隱藏工作流設計的拖放搜尋工具。",
    summary:
      "把選取文字、連結或網址拖到頁面邊緣，就能選擇在目前分頁搜尋、開到新分頁，或停留取消後回到原本拖放流程。",
    status: "Chrome Web Store 上架中",
    year: "2026",
    role: "擴充套件設計、MV3 實作、多語系上架素材",
    impact:
      "補上 Vivaldi 隱藏工具列情境下的搜尋入口，讓使用者不必先叫出網址列才能處理拖放搜尋。",
    updatedAt: "2026-06-13",
    featured: true,
    image: {
      src: "/images/projects/vivaldi-drag-search-1280x800.png",
      alt: "Vivaldi Drag Search 的頁面邊緣拖放搜尋介面截圖。",
    },
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/vivaldi-drag-search/fnmajmjfcnfojmmehjplmilbdcogohkc",
      },
      {
        label: "官方頁面",
        href: "https://tokenyet.github.io/vivaldi-drag-search/",
      },
      {
        label: "GitHub",
        href: "https://github.com/Tokenyet/vivaldi-drag-search",
      },
    ],
    stack: ["Chrome MV3", "JavaScript", "HTML", "CSS", "GitHub Pages"],
    highlights: [
      "已公開在 Chrome Web Store，並有 GitHub Pages 官方頁面。",
      "支援文字搜尋、網址開啟、目前分頁/新分頁選擇與停留取消。",
      "使用瀏覽器預設搜尋引擎，必要時可退回自訂搜尋 URL。",
      "支援英文、正體中文、簡體中文、日文與韓文。",
    ],
    caseStudy: [
      {
        title: "問題",
        body: "Vivaldi 使用 UI 自動隱藏或隱藏工具列時，拖放選取文字或網址通常需要先叫出網址列，操作會被打斷。",
      },
      {
        title: "做法",
        body: "用 Manifest V3 擴充套件在頁面邊緣提供拖放目標，讓使用者能明確選擇目前分頁、新分頁，或取消後繼續原本拖放。",
      },
      {
        title: "成果",
        body: "完成可上架的擴充套件、公開說明頁、多語系文字與 Chrome Web Store listing 素材。",
      },
    ],
  },
  {
    slug: "youtube-local-exporter",
    name: "YouTube Local Exporter",
    kind: "本機瀏覽器工具",
    tagline: "把目前的 YouTube 分頁轉成本機影片、音訊與字幕匯出流程。",
    summary:
      "公開 GitHub release 的 Windows-first Chromium 擴充套件。透過 native messaging host 在本機執行 yt-dlp、FFmpeg 與可選的 Whisper 轉錄，不需要複製網址或把媒體送到雲端。",
    status: "公開 GitHub release / 本機 sideload",
    year: "2026",
    role: "擴充套件設計、native host、Windows release automation",
    impact:
      "把原本分散在命令列、cookies、字幕工具與輸出資料夾設定的流程，整合成目前分頁即可啟動的本機工具。",
    updatedAt: "2026-07-02",
    featured: true,
    image: {
      src: "/images/projects/youtube-local-exporter-how-it-works.png",
      alt: "YouTube Local Exporter 的架構圖，顯示瀏覽器擴充套件、native host 與本機工具鏈。",
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Tokenyet/youtube_local_exporter",
      },
      {
        label: "Releases",
        href: "https://github.com/Tokenyet/youtube_local_exporter/releases",
      },
    ],
    stack: [
      "Chrome MV3",
      "Native Messaging",
      "Python",
      "yt-dlp",
      "FFmpeg",
      "whisper.cpp",
      "PowerShell",
    ],
    highlights: [
      "可從目前 YouTube 分頁匯出 MP4、音訊檔、SRT 或 VTT 字幕。",
      "可重用已登入瀏覽器 session，讓 yt-dlp 在需要 cookies 的情境仍能工作。",
      "優先使用 YouTube 字幕，缺少字幕時可退回本機 Whisper 轉錄。",
      "媒體與轉錄流程都在使用者的 Windows 裝置上處理，不使用雲端轉錄或分析。",
    ],
    caseStudy: [
      {
        title: "問題",
        body: "用 yt-dlp 匯出 YouTube 內容時，使用者常需要手動複製網址、處理 cookies、選格式、跑字幕工具，流程容易斷在命令列細節。",
      },
      {
        title: "做法",
        body: "用 Manifest V3 popup 讀取目前分頁，再透過 native messaging 把工作交給 Windows 本機 host，由 host 管理 yt-dlp、FFmpeg、Whisper、進度與取消。",
      },
      {
        title: "成果",
        body: "完成 v0.1.0 公開 release、Windows sideload bundle、native host 打包、安裝腳本、隱私說明與 GitHub Actions release workflow。",
      },
    ],
  },
  {
    slug: "twitch-local-exporter",
    name: "Twitch Local Exporter",
    kind: "本機瀏覽器工具",
    tagline: "把 Twitch VOD 的影片、音訊、字幕與聊天室記錄匯出到本機。",
    summary:
      "Windows-first Chromium 擴充套件與 native host。它針對 Twitch VOD 匯出影片、音訊、SRT/VTT 字幕與聊天室記錄，並把 yt-dlp、FFmpeg、Whisper、TwitchDownloaderCLI 與 OpenCC 串成本機流程。",
    status: "本機 sideload / 尚未公開商店",
    year: "2026",
    role: "擴充套件設計、native host、Twitch VOD 匯出流程",
    impact:
      "讓 Twitch VOD 保存不只停在影片下載，還能把字幕、聊天室記錄與繁體中文字幕處理整合在同一個本機工作流。",
    updatedAt: "2026-07-07",
    featured: true,
    stack: [
      "Chrome MV3",
      "Native Messaging",
      "Python",
      "yt-dlp",
      "TwitchDownloaderCLI",
      "FFmpeg",
      "whisper.cpp",
      "OpenCC",
    ],
    highlights: [
      "可從目前 Twitch VOD 分頁匯出影片、音訊、字幕或聊天室記錄。",
      "聊天室匯出使用 TwitchDownloaderCLI，可輸出 JSON、HTML 或純文字。",
      "字幕優先使用下載器可取得的字幕軌，缺少時可退回本機 Whisper 轉錄。",
      "可選擇用 OpenCC 將中文字幕後處理成台灣慣用繁體，且不改動聊天室原文。",
    ],
    caseStudy: [
      {
        title: "問題",
        body: "Twitch VOD 保存常同時涉及影片、音訊、字幕與聊天室，單一下載指令很難把所有輸出格式、工具相依與授權邊界處理清楚。",
      },
      {
        title: "做法",
        body: "沿用 YouTube Local Exporter 的 MV3 + native host 架構，另外接入 TwitchDownloaderCLI 處理 VOD chat，並把 OpenCC 後處理限制在字幕檔。",
      },
      {
        title: "成果",
        body: "完成本機 sideload 版本與 release bundle；目前沒有確認公開 Chrome Web Store 頁或公開 GitHub repo，因此作品頁不放商店連結。",
      },
    ],
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
