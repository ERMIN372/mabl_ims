"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader, EmptyState } from "@/components/ui/primitives";
import { NotificationRow } from "@/components/cards";
import { notifications as initial } from "@/data/notifications";
import type { NotificationType } from "@/lib/types";

type Filter = "all" | "unread" | NotificationType;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "unread", label: "Непрочитанные" },
  { key: "course_access", label: "Доступ к курсу" },
  { key: "webinar_reminder", label: "Вебинары" },
  { key: "new_material", label: "Материалы" },
  { key: "survey_required", label: "Опросники" },
  { key: "forum_reply", label: "Форум" },
];

export default function NotificationsPage() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<Filter>("all");

  const visible = items.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const markAllRead = () =>
    setItems((list) => list.map((n) => ({ ...n, read: true })));

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Центр уведомлений"
        title="Уведомления"
        description="Доступ к курсам, напоминания о вебинарах, материалы, опросники и ответы на форуме."
        action={
          <button
            onClick={markAllRead}
            className="rounded-token border border-oil-300 px-4 py-2 text-sm text-oil-700 hover:border-oil-900"
          >
            Отметить все прочитанными
          </button>
        }
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-token border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              filter === f.key
                ? "border-ocean-600 bg-ocean-600 text-white"
                : "border-oil-300 bg-white text-oil-700 hover:border-oil-900"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {visible.length > 0 ? (
          visible.map((n) => <NotificationRow key={n.id} item={n} />)
        ) : (
          <EmptyState title="Уведомлений нет" />
        )}
      </div>
    </DashboardShell>
  );
}
