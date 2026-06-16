import type { EventItem } from "@/lib/types";

// Mock-события календаря. TODO(backend): заменить на API расписания.
export const events: EventItem[] = [
  {
    id: "webinar-uncertainty",
    title: "Стратегия в условиях неопределённости",
    kind: "webinar",
    format: "Онлайн",
    date: "2026-06-20",
    time: "19:00",
    registered: false,
    description:
      "Открытый вебинар о сценарном планировании и принятии решений в нестабильной среде.",
    price: 0,
  },
  {
    id: "webinar-finance",
    title: "Финансовая модель растущей компании",
    kind: "webinar",
    format: "Онлайн",
    date: "2026-06-27",
    time: "18:30",
    registered: true,
    description:
      "Практический разбор построения финансовой модели для масштабирования бизнеса.",
    price: 2900,
  },
  {
    id: "deadline-strategy",
    title: "Дедлайн: модуль «Стратегическое лидерство»",
    kind: "deadline",
    format: "Онлайн",
    date: "2026-06-30",
    time: "23:59",
    registered: true,
    description: "Срок завершения второго модуля курса «Стратегическое лидерство».",
  },
  {
    id: "meetup-alumni",
    title: "Встреча выпускников МАБЛ",
    kind: "meetup",
    format: "Очно",
    date: "2026-07-05",
    time: "16:00",
    registered: false,
    description:
      "Ежегодная очная встреча сообщества выпускников: дискуссии и нетворкинг.",
    price: 0,
  },
  {
    id: "webinar-negotiations",
    title: "Сложные переговоры: практикум",
    kind: "webinar",
    format: "Гибрид",
    date: "2026-07-12",
    time: "19:00",
    registered: false,
    description:
      "Интерактивный практикум по ведению переговоров с разбором кейсов участников.",
    price: 3900,
  },
];

export function getEvent(id: string): EventItem | undefined {
  return events.find((e) => e.id === id);
}

// Ближайший предстоящий вебинар (для главной страницы и дашборда).
export function getNextWebinar(): EventItem | undefined {
  return events
    .filter((e) => e.kind === "webinar")
    .sort((a, b) => a.date.localeCompare(b.date))[0];
}
