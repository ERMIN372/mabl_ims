import type { NotificationItem } from "@/lib/types";

// Mock-уведомления. TODO(backend): заменить на API центра уведомлений.
export const notifications: NotificationItem[] = [
  {
    id: "n1",
    type: "course_access",
    title: "Доступ к курсу открыт",
    body: "Вам открыт доступ к курсу «Стратегическое лидерство».",
    date: "2026-06-15T10:20:00",
    read: false,
    href: "/courses/strategic-leadership",
  },
  {
    id: "n2",
    type: "webinar_reminder",
    title: "Напоминание о вебинаре",
    body: "Вебинар «Финансовая модель растущей компании» состоится 27 июня в 18:30.",
    date: "2026-06-14T09:00:00",
    read: false,
    href: "/calendar",
  },
  {
    id: "n3",
    type: "new_material",
    title: "Новый материал",
    body: "В разделе материалов опубликован лонгрид «Data-driven управление».",
    date: "2026-06-13T14:45:00",
    read: false,
    href: "/materials/data-driven",
  },
  {
    id: "n4",
    type: "survey_required",
    title: "Нужно пройти опросник",
    body: "Пройдите опросник самооценки по курсу «Стратегическое лидерство».",
    date: "2026-06-12T11:30:00",
    read: true,
    href: "/surveys/leadership-self",
  },
  {
    id: "n5",
    type: "forum_reply",
    title: "Ответ на форуме",
    body: "Вам ответили в теме «Как выбрать стратегию роста?».",
    date: "2026-06-11T16:10:00",
    read: true,
    href: "/forum/growth-strategy",
  },
];
