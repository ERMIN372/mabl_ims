"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Section, SectionHeader, EmptyState } from "@/components/ui/primitives";
import { CourseCard } from "@/components/cards";
import { courses } from "@/data/courses";
import type { Course } from "@/lib/types";

type Filter = "all" | "owned" | "available" | "scorm" | "video" | "longread";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "owned", label: "Купленные" },
  { key: "available", label: "Доступные к покупке" },
  { key: "scorm", label: "SCORM" },
  { key: "video", label: "Видео" },
  { key: "longread", label: "Лонгриды" },
];

function matches(course: Course, filter: Filter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "owned":
      return course.owned;
    case "available":
      return !course.owned;
    case "scorm":
      return course.format === "scorm" || course.format === "mixed";
    case "video":
      return course.format === "video" || course.format === "mixed";
    case "longread":
      return course.format === "longread" || course.format === "mixed";
  }
}

export default function CoursesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = courses.filter((c) => matches(c, filter));

  return (
    <AppShell>
      <Section>
        <SectionHeader
          eyebrow="Каталог"
          title="Курсы академии"
          description="Программы для руководителей. Покупка и обучение — внутри платформы."
        />

        {/* Фильтры */}
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
            {visible.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        ) : (
          <EmptyState title="Нет курсов по выбранному фильтру" />
        )}
      </Section>
    </AppShell>
  );
}
