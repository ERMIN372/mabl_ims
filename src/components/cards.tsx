import Link from "next/link";
import type { Course, EventItem, Material, NewsItem, NotificationItem } from "@/lib/types";
import { Badge, LinkCard, ProgressBar } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/Button";
import { CoverArt } from "@/components/ui/CoverArt";
import { formatDate, formatDateTime, formatLabels, formatPrice } from "@/lib/format";

export function CourseCard({ course }: { course: Course }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-oil-200 bg-white shadow-soft transition-shadow hover:shadow-card">
      <Link href={`/courses/${course.id}`}>
        <CoverArt tone={course.cover === "ocean" ? "ocean" : "oil"} className="aspect-[16/9]" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <Badge tone="ocean">{formatLabels[course.format]}</Badge>
          {course.owned ? (
            <Badge tone="oil">Куплен</Badge>
          ) : (
            <Badge tone="outline">Доступен к покупке</Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-oil-900">
          <Link href={`/courses/${course.id}`} className="hover:text-ocean-700">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-oil-600">{course.description}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-oil-500">
          <span>{course.durationHours} ч</span>
          <span className="font-semibold text-oil-900">{formatPrice(course.price)}</span>
        </div>

        {course.owned && (
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs text-oil-500">
              <span>Прогресс</span>
              <span>{course.progress}%</span>
            </div>
            <ProgressBar value={course.progress} />
          </div>
        )}

        <div className="mt-5">
          {course.owned ? (
            <ButtonLink href={`/courses/${course.id}`} variant="secondary" size="sm" fullWidth>
              Перейти к обучению
            </ButtonLink>
          ) : (
            <ButtonLink href={`/checkout?item=${course.id}`} size="sm" fullWidth>
              Купить
            </ButtonLink>
          )}
        </div>
      </div>
    </div>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <LinkCard href={`/news/${item.id}`} className="flex h-full flex-col p-6">
      <div className="mb-3 flex items-center gap-3 text-xs">
        <span className="font-semibold uppercase tracking-heading text-ocean-700">
          {item.category}
        </span>
        <span className="text-oil-400">{formatDate(item.date)}</span>
      </div>
      <h3 className="text-lg font-semibold leading-snug tracking-tight text-oil-900 group-hover:text-ocean-700">
        {item.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-oil-600">{item.excerpt}</p>
      <span className="mt-4 text-sm font-semibold text-ocean-700">Читать →</span>
    </LinkCard>
  );
}

export function MaterialCard({ item }: { item: Material }) {
  return (
    <LinkCard href={`/materials/${item.id}`} className="flex h-full flex-col overflow-hidden">
      <CoverArt
        tone={item.kind === "video" ? "ocean" : "oil"}
        className="aspect-[16/7]"
        label={item.kind === "video" ? "Видео" : "Лонгрид"}
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-3 text-xs">
          <Badge tone="muted">{item.category}</Badge>
          <span className="text-oil-400">{formatDate(item.date)}</span>
        </div>
        <h3 className="font-semibold tracking-tight text-oil-900 group-hover:text-ocean-700">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-oil-600">{item.excerpt}</p>
      </div>
    </LinkCard>
  );
}

const eventKindLabel: Record<EventItem["kind"], string> = {
  webinar: "Вебинар",
  deadline: "Дедлайн",
  meetup: "Мероприятие",
};

export function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-oil-200 bg-white p-5 shadow-soft sm:flex-row sm:items-center">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-token bg-oil-900 text-white">
        <span className="text-xl font-semibold leading-none">
          {new Date(event.date).getDate()}
        </span>
        <span className="mt-1 text-[10px] uppercase tracking-wide text-oil-300">
          {new Date(event.date).toLocaleDateString("ru-RU", { month: "short" })}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <Badge tone="ocean">{eventKindLabel[event.kind]}</Badge>
          <Badge tone="outline">{event.format}</Badge>
          <span className="text-xs text-oil-500">{event.time}</span>
        </div>
        <h3 className="font-semibold tracking-tight text-oil-900">{event.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-oil-600">{event.description}</p>
      </div>

      <div className="shrink-0 sm:text-right">
        {event.kind === "deadline" ? (
          <Badge tone="muted">Срок сдачи</Badge>
        ) : event.registered ? (
          <Badge tone="oil">Вы записаны</Badge>
        ) : (
          <ButtonLink
            href={`/checkout?item=${event.id}`}
            size="sm"
            variant={event.price && event.price > 0 ? "primary" : "secondary"}
          >
            Записаться
          </ButtonLink>
        )}
      </div>
    </div>
  );
}

export function NotificationRow({ item }: { item: NotificationItem }) {
  const body = (
    <div
      className={`flex gap-4 rounded-card border p-4 transition-colors ${
        item.read ? "border-oil-200 bg-white" : "border-ocean-200 bg-ocean-50/40"
      }`}
    >
      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
          item.read ? "bg-oil-300" : "bg-ocean-600"
        }`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-semibold tracking-tight text-oil-900">{item.title}</p>
          <span className="shrink-0 text-xs text-oil-400">{formatDateTime(item.date)}</span>
        </div>
        <p className="mt-1 text-sm text-oil-600">{item.body}</p>
      </div>
    </div>
  );
  return item.href ? (
    <Link href={item.href} className="block hover:opacity-90">
      {body}
    </Link>
  ) : (
    body
  );
}
