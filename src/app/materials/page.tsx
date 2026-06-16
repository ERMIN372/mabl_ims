"use client";

import { useState } from "react";
import { PublicShell } from "@/components/layout/PublicShell";
import { Section, SectionHeader, EmptyState } from "@/components/ui/primitives";
import { MaterialCard } from "@/components/cards";
import { materials } from "@/data/materials";

type Filter = "all" | "longread" | "video";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Все материалы" },
  { key: "longread", label: "Лонгриды" },
  { key: "video", label: "Видео" },
];

export default function MaterialsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = materials.filter((m) => filter === "all" || m.kind === filter);

  return (
    <PublicShell>
      <Section>
        <SectionHeader
          eyebrow="Библиотека"
          title="Материалы"
          description="Лонгриды и видеолекции академии — знания вне рамок отдельного курса."
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

        {visible.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((m) => (
              <MaterialCard key={m.id} item={m} />
            ))}
          </div>
        ) : (
          <EmptyState title="Материалы не найдены" />
        )}
      </Section>
    </PublicShell>
  );
}
