"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge, Card, PageHeader, ProgressBar } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/Button";
import { EventCard, NotificationRow } from "@/components/cards";
import { useAuth } from "@/context/AuthContext";
import { courses } from "@/data/courses";
import { events } from "@/data/events";
import { notifications } from "@/data/notifications";

const quickLinks = [
  { href: "/courses", label: "Каталог курсов" },
  { href: "/dashboard/my-courses", label: "Мои курсы" },
  { href: "/calendar", label: "Вебинары" },
  { href: "/news", label: "Новости" },
  { href: "/forum", label: "Форум" },
  { href: "/calendar", label: "Календарь" },
  { href: "/surveys", label: "Опросники" },
  { href: "/notifications", label: "Уведомления" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const myCourses = courses.filter((c) => c.owned);
  const upcoming = [...events]
    .filter((e) => new Date(e.date) >= new Date("2026-06-16"))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  const latestNotifications = notifications.slice(0, 4);

  const overallProgress =
    myCourses.length > 0
      ? Math.round(myCourses.reduce((s, c) => s + c.progress, 0) / myCourses.length)
      : 0;

  return (
    <DashboardShell>
      <PageHeader
        eyebrow={`Добро пожаловать${user ? `, ${user.name}` : ""}`}
        title="Дашборд"
        description="Ваш прогресс, ближайшие события и последние уведомления."
      />

      {/* Метрики */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm text-oil-500">Общий прогресс</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-oil-900">
            {overallProgress}%
          </p>
          <div className="mt-3">
            <ProgressBar value={overallProgress} />
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-oil-500">Активные курсы</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-oil-900">
            {myCourses.length}
          </p>
          <Link href="/dashboard/my-courses" className="mt-3 inline-block text-sm text-ocean-700 hover:underline">
            Перейти к курсам →
          </Link>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-oil-500">Новые уведомления</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-oil-900">
            {notifications.filter((n) => !n.read).length}
          </p>
          <Link href="/notifications" className="mt-3 inline-block text-sm text-ocean-700 hover:underline">
            Открыть центр →
          </Link>
        </Card>
      </div>

      {/* Быстрые переходы */}
      <div className="mt-8">
        <p className="eyebrow mb-4">Быстрые переходы</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map((q) => (
            <Link
              key={q.label}
              href={q.href}
              className="rounded-card border border-oil-200 bg-white px-4 py-4 text-sm font-medium text-oil-800 transition-colors hover:border-ocean-600 hover:text-ocean-700"
            >
              {q.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Прогресс обучения / купленные курсы */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-oil-900">
              Купленные курсы
            </h2>
            <Link href="/dashboard/my-courses" className="text-sm text-ocean-700 hover:underline">
              Все
            </Link>
          </div>
          <div className="space-y-3">
            {myCourses.map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.id}`}
                className="block rounded-card border border-oil-200 bg-white p-5 transition-colors hover:border-oil-300"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-semibold tracking-tight text-oil-900">{c.title}</h3>
                  <Badge tone="muted">{c.progress}%</Badge>
                </div>
                <ProgressBar value={c.progress} />
              </Link>
            ))}
          </div>
        </section>

        {/* Ближайшие события + уведомления */}
        <section className="space-y-8">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight text-oil-900">
                Ближайшие события
              </h2>
              <Link href="/calendar" className="text-sm text-ocean-700 hover:underline">
                Календарь
              </Link>
            </div>
            <div className="space-y-3">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight text-oil-900">
                Последние уведомления
              </h2>
              <Link href="/notifications" className="text-sm text-ocean-700 hover:underline">
                Все
              </Link>
            </div>
            <div className="space-y-3">
              {latestNotifications.map((n) => (
                <NotificationRow key={n.id} item={n} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10">
        <ButtonLink href="/courses" variant="secondary">
          Открыть каталог курсов
        </ButtonLink>
      </div>
    </DashboardShell>
  );
}
