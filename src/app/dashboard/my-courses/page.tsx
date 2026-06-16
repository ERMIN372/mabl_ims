"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader, EmptyState } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/Button";
import { CourseCard } from "@/components/cards";
import { courses } from "@/data/courses";

export default function MyCoursesPage() {
  const myCourses = courses.filter((c) => c.owned);

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Обучение"
        title="Мои курсы"
        description="Курсы, к которым у вас открыт доступ."
        action={<ButtonLink href="/courses" variant="secondary">Каталог</ButtonLink>}
      />
      <div className="mt-8">
        {myCourses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="У вас пока нет курсов"
            description="Выберите программу в каталоге и оформите доступ."
          />
        )}
      </div>
    </DashboardShell>
  );
}
