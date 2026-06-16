"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Section, SectionHeader, EmptyState } from "@/components/ui/primitives";
import { NewsCard } from "@/components/cards";
import { news } from "@/data/news";
import type { NewsCategory } from "@/lib/types";

const categories: ("Все" | NewsCategory)[] = [
  "Все",
  "Академия",
  "Вебинары",
  "Курсы",
  "События",
];

export default function NewsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("Все");
  const visible = news.filter((n) => cat === "Все" || n.category === cat);

  return (
    <AppShell>
      <Section>
        <SectionHeader
          eyebrow="Журнал"
          title="Новости академии"
          description="Официальные новости МАБЛ: программы, вебинары, события сообщества."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-token border px-4 py-2 text-sm font-medium transition-colors ${
                cat === c
                  ? "border-ocean-600 bg-ocean-600 text-white"
                  : "border-oil-300 bg-white text-oil-700 hover:border-oil-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {visible.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        ) : (
          <EmptyState title="Новостей в этой категории пока нет" />
        )}
      </Section>
    </AppShell>
  );
}
