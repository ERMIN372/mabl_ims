import type { ForumSection, ForumTopic } from "@/lib/types";

// Mock-форум. TODO(backend): заменить на API форума с авторизацией.
export const forumSections: ForumSection[] = [
  {
    id: "general",
    title: "Общие вопросы",
    description: "Всё об обучении в академии, организационные вопросы и знакомство.",
    topics: [
      {
        id: "welcome",
        sectionId: "general",
        title: "Знакомство сообщества МАБЛ",
        author: "Администрация",
        date: "2026-06-01",
        posts: [
          {
            id: "p1",
            author: "Администрация",
            date: "2026-06-01",
            body: "Добро пожаловать в сообщество Международной академии бизнес-лидерства. Представьтесь и расскажите о своих целях обучения.",
          },
          {
            id: "p2",
            author: "Елена К.",
            date: "2026-06-02",
            body: "Здравствуйте! Руковожу операционным направлением, пришла за системным взглядом на стратегию.",
          },
        ],
      },
    ],
  },
  {
    id: "courses",
    title: "Вопросы по курсам",
    description: "Обсуждение материалов, заданий и SCORM-модулей курсов.",
    topics: [
      {
        id: "growth-strategy",
        sectionId: "courses",
        title: "Как выбрать стратегию роста?",
        author: "Дмитрий Г.",
        date: "2026-06-09",
        posts: [
          {
            id: "p1",
            author: "Дмитрий Г.",
            date: "2026-06-09",
            body: "Изучаю курс по стратегическому лидерству. Как соотнести органический рост и рост через поглощения?",
          },
          {
            id: "p2",
            author: "Преподаватель",
            date: "2026-06-10",
            body: "Хороший вопрос. Отталкивайтесь от зрелости рынка и доступности капитала — в модуле 2 есть модель выбора.",
          },
        ],
      },
    ],
  },
  {
    id: "webinars",
    title: "Обсуждение вебинаров",
    description: "Вопросы спикерам и обмен впечатлениями после вебинаров.",
    topics: [
      {
        id: "uncertainty-webinar",
        sectionId: "webinars",
        title: "Вебинар про неопределённость — вопросы спикеру",
        author: "Марина Л.",
        date: "2026-06-12",
        posts: [
          {
            id: "p1",
            author: "Марина Л.",
            date: "2026-06-12",
            body: "Подскажите, будет ли запись вебинара 20 июня?",
          },
        ],
      },
    ],
  },
];

export function getAllTopics(): ForumTopic[] {
  return forumSections.flatMap((s) => s.topics);
}

export function getTopic(id: string): { topic: ForumTopic; section: ForumSection } | undefined {
  for (const section of forumSections) {
    const topic = section.topics.find((t) => t.id === id);
    if (topic) return { topic, section };
  }
  return undefined;
}
