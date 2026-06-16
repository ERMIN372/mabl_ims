"use client";

import { useState } from "react";
import { PublicShell } from "@/components/layout/PublicShell";
import { Section, SectionHeader, EmptyState } from "@/components/ui/primitives";
import { EventCard } from "@/components/cards";
import { events } from "@/data/events";
import type { EventKind } from "@/lib/types";

type Filter = "all" | EventKind;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Все события" },
  { key: "webinar", label: "Вебинары" },
  { key: "deadline", label: "Дедлайны" },
  { key: "meetup", label: "Мероприятия" },
];

// Группировка по месяцам для строгого «расписания».
function monthKey(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
}

export default function CalendarPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = [...events]
    .filter((e) => filter === "all" || e.kind === filter)
    .sort((a, b) => a.date.localeCompare(b.date));

  const groups = visible.reduce<Record<string, typeof visible>>((acc, e) => {
    const k = monthKey(e.date);
    (acc[k] ??= []).push(e);
    return acc;
  }, {});

  return (
    <PublicShell>
      <Section>
        <SectionHeader
          eyebrow="Расписание"
          title="Календарь событий"
          description="Вебинары, дедлайны курсов и очные мероприятия академии."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-token border px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.key
                  ? "border-ocean-600 bg-ocean-600 text-white"
                  : "border-oil-300 bg-white text-oil-700 hover:border-oil-900"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {Object.keys(groups).length > 0 ? (
          <div className="space-y-10">
            {Object.entries(groups).map(([month, list]) => (
              <div key={month}>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-heading text-oil-500">
                  {month}
                </h2>
                <div className="space-y-3">
                  {list.map((e) => (
                    <EventCard key={e.id} event={e} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="Событий не найдено" />
        )}
      </Section>
    </PublicShell>
  );
}
