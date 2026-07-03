/**
 * Intent: Keep side-project metadata stable and routeable.
 * Constraints: Static data only; no private project credentials or OAuth values.
 * Acceptance: MailDesk homepage and privacy routes render from one typed source.
 */

import type { Project } from "@/features/projects/entity/types";

const projects: Project[] = [
  {
    slug: "maildesk",
    name: "MailDesk",
    tagline: "Windows desktop mail client focused on Gmail workflows.",
    summary:
      "MailDesk is a local-first Windows desktop app for Gmail inbox, labels, search, message actions, and user-controlled notifications.",
    status: "Private alpha / store preparation",
    updatedAt: "2026-06-25",
    verificationPath: "/projects/maildesk/",
    privacyPath: "/projects/maildesk/privacy/",
    highlights: [
      "Multiple Google account support for Gmail workflows.",
      "Inbox, search, labels, message detail, send, reply, forward, archive, trash, spam, and attachment download flows.",
      "Configurable Windows notifications, including verification-code-only mode.",
      "OAuth tokens, mail cache, settings, logs, and notification state stay on the user's Windows device.",
    ],
    dataUse: [
      {
        title: "Data MailDesk accesses",
        body: "MailDesk accesses Gmail data only after a user signs in with a Google account and grants permission. Depending on approved permissions, it may access Gmail messages, labels, message metadata, attachments, and account profile information needed to provide mail client features.",
      },
      {
        title: "How data is used",
        body: "MailDesk uses Gmail data to display mail, search messages, manage labels, send and reply to mail, download attachments, synchronize inbox state, and show user-configured Windows notifications. It may detect verification codes in message subjects and snippets when that notification mode is enabled.",
      },
      {
        title: "Local storage",
        body: "MailDesk stores OAuth tokens locally on the user's Windows device using secure storage. Mail cache, settings, logs, and notification state are also stored locally to operate the app and improve reliability.",
      },
      {
        title: "Data sharing",
        body: "MailDesk does not sell user data, does not use Gmail data for advertising, and does not transfer Gmail data to third parties except as required to provide user-requested Gmail functionality through Google APIs.",
      },
      {
        title: "Deleting data",
        body: "Users can remove an account from MailDesk to delete locally stored authentication tokens for that account. They may also uninstall MailDesk and remove the app's local data from Windows.",
      },
      {
        title: "Contact",
        body: "For privacy questions, contact the MailDesk publisher through the support contact listed in the Microsoft Store.",
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
