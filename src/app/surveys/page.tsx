"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader, Badge } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/Button";
import { surveys } from "@/data/surveys";

export default function SurveysPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Оценка"
        title="Опросники"
        description="Самооценка, проверка знаний и диагностические опросы академии."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {surveys.map((s) => (
          <div
            key={s.id}
            className="flex flex-col rounded-card border border-oil-200 bg-white p-6 shadow-soft"
          >
            <Badge tone="muted" className="self-start">
              {s.questions.length} вопросов
            </Badge>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-oil-900">
              <Link href={`/surveys/${s.id}`} className="hover:text-ocean-700">
                {s.title}
              </Link>
            </h3>
            <p className="mt-2 flex-1 text-sm text-oil-600">{s.description}</p>
            <div className="mt-5">
              <ButtonLink href={`/surveys/${s.id}`} size="sm" variant="secondary">
                Пройти опросник
              </ButtonLink>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
