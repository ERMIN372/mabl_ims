import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge, Card, ProgressBar } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/Button";
import { CoverArt } from "@/components/ui/CoverArt";
import { ScormModule } from "@/components/ScormModule";
import { courses, getCourse } from "@/data/courses";
import { formatLabels, formatPrice } from "@/lib/format";
import type { CourseModule } from "@/lib/types";

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

const moduleTypeLabel: Record<CourseModule["type"], string> = {
  scorm: "SCORM",
  longread: "Лонгрид",
  video: "Видео",
  survey: "Опросник",
};

function moduleHref(m: CourseModule): string | null {
  if (!m.refId) return null;
  if (m.type === "survey") return `/surveys/${m.refId}`;
  if (m.type === "longread" || m.type === "video") return `/materials/${m.refId}`;
  return null;
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = getCourse(params.id);
  if (!course) notFound();

  return (
    <PublicShell>
      {/* Обложка */}
      <section className="border-b border-oil-200">
        <div className="container-mabl grid gap-8 py-10 md:grid-cols-[1.4fr_1fr] md:py-14">
          <div>
            <Link href="/courses" className="text-sm text-ocean-700 hover:underline">
              ← Каталог курсов
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge tone="ocean">{formatLabels[course.format]}</Badge>
              {course.owned ? (
                <Badge tone="oil">Доступ открыт</Badge>
              ) : (
                <Badge tone="outline">Доступен к покупке</Badge>
              )}
              <span className="text-sm text-oil-500">{course.durationHours} часов</span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-oil-900 md:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-xl text-oil-600">{course.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {course.owned ? (
                <span className="text-sm font-semibold text-oil-900">
                  Курс приобретён
                </span>
              ) : (
                <>
                  <span className="text-2xl font-semibold text-oil-900">
                    {formatPrice(course.price)}
                  </span>
                  <ButtonLink href={`/checkout?item=${course.id}`} size="lg">
                    Купить курс
                  </ButtonLink>
                </>
              )}
            </div>
          </div>

          <CoverArt
            tone={course.cover === "ocean" ? "ocean" : "oil"}
            className="aspect-[4/3] rounded-card"
          />
        </div>
      </section>

      <div className="container-mabl grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        {/* Основной контент */}
        <div className="space-y-12">
          {/* Программа */}
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-oil-900">Программа курса</h2>
            <ol className="mt-5 space-y-3">
              {course.program.map((m, i) => {
                const href = course.owned ? moduleHref(m) : null;
                const inner = (
                  <div className="flex items-center gap-4 rounded-card border border-oil-200 bg-white p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-oil-100 text-sm font-semibold text-oil-700">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-oil-900">{m.title}</p>
                      <span className="text-xs text-oil-500">{moduleTypeLabel[m.type]}</span>
                    </div>
                    {m.completed ? (
                      <Badge tone="oil">Пройдено</Badge>
                    ) : (
                      <Badge tone="muted">Не пройдено</Badge>
                    )}
                  </div>
                );
                return (
                  <li key={m.id}>
                    {href ? (
                      <Link href={href} className="block transition-opacity hover:opacity-90">
                        {inner}
                      </Link>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Материалы курса */}
          {course.owned ? (
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-oil-900">
                Материалы курса
              </h2>
              <p className="mt-2 text-sm text-oil-500">
                SCORM-модули, лонгриды, видео и опросники этого курса.
              </p>

              <div className="mt-6 space-y-5">
                {/* SCORM-модули */}
                {course.program
                  .filter((m) => m.type === "scorm")
                  .map((m) => (
                    <ScormModule key={m.id} title={m.title} />
                  ))}

                {/* Остальные материалы — ссылки */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {course.program
                    .filter((m) => m.type !== "scorm")
                    .map((m) => {
                      const href = moduleHref(m);
                      return (
                        <div
                          key={m.id}
                          className="flex items-center justify-between gap-3 rounded-card border border-oil-200 bg-white p-4"
                        >
                          <div>
                            <p className="font-medium text-oil-900">{m.title}</p>
                            <span className="text-xs text-oil-500">{moduleTypeLabel[m.type]}</span>
                          </div>
                          {href ? (
                            <ButtonLink href={href} size="sm" variant="secondary">
                              Открыть
                            </ButtonLink>
                          ) : (
                            <Badge tone="muted">Скоро</Badge>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          ) : (
            <section className="rounded-card border border-dashed border-oil-300 bg-oil-50 p-8 text-center">
              <p className="font-semibold text-oil-800">Материалы доступны после покупки</p>
              <p className="mt-2 text-sm text-oil-500">
                Приобретите курс, чтобы открыть SCORM-модули, лонгриды, видео и опросники.
              </p>
              <div className="mt-5">
                <ButtonLink href={`/checkout?item=${course.id}`}>Купить курс</ButtonLink>
              </div>
            </section>
          )}
        </div>

        {/* Боковая колонка — прогресс */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            <p className="eyebrow mb-4">Прогресс</p>
            {course.owned ? (
              <>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-3xl font-semibold text-oil-900">{course.progress}%</span>
                  <span className="text-sm text-oil-500">
                    {course.program.filter((m) => m.completed).length}/{course.program.length} модулей
                  </span>
                </div>
                <ProgressBar value={course.progress} />
                <div className="mt-6 space-y-2 border-t border-oil-200 pt-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-oil-500">Формат</span>
                    <span className="text-oil-900">{formatLabels[course.format]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-oil-500">Длительность</span>
                    <span className="text-oil-900">{course.durationHours} ч</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-oil-500">
                Прогресс станет доступен после покупки курса.
              </p>
            )}
          </Card>
        </aside>
      </div>
    </PublicShell>
  );
}
