import type { Course } from "@/lib/types";

// Mock-данные курсов. TODO(backend): заменить на запрос к API каталога.
export const courses: Course[] = [
  {
    id: "strategic-leadership",
    title: "Стратегическое лидерство",
    description:
      "Системный курс о принятии решений в условиях неопределённости, построении стратегии и управлении командами высокого уровня.",
    cover: "oil",
    format: "mixed",
    durationHours: 24,
    price: 49000,
    owned: true,
    progress: 45,
    program: [
      { id: "m1", title: "Введение в стратегическое мышление", type: "longread", completed: true, refId: "strategy-foundations" },
      { id: "m2", title: "SCORM: Модель принятия решений", type: "scorm", completed: false },
      { id: "m3", title: "Видеолекция: Лидерство и влияние", type: "video", completed: true, refId: "leadership-influence" },
      { id: "m4", title: "Опросник самооценки", type: "survey", completed: false, refId: "leadership-self" },
    ],
  },
  {
    id: "corporate-finance",
    title: "Корпоративные финансы для руководителей",
    description:
      "Финансовая грамотность лидера: чтение отчётности, оценка инвестиций, управление капиталом и финансовое моделирование.",
    cover: "ocean",
    format: "scorm",
    durationHours: 18,
    price: 39000,
    owned: true,
    progress: 80,
    program: [
      { id: "m1", title: "SCORM: Основы финансовой отчётности", type: "scorm", completed: true },
      { id: "m2", title: "SCORM: Оценка инвестиционных проектов", type: "scorm", completed: true },
      { id: "m3", title: "Лонгрид: Управление капиталом", type: "longread", completed: false, refId: "capital-management" },
    ],
  },
  {
    id: "negotiations",
    title: "Переговоры и медиация",
    description:
      "Практический курс по ведению сложных переговоров, разрешению конфликтов и достижению устойчивых соглашений.",
    cover: "ocean",
    format: "video",
    durationHours: 12,
    price: 29000,
    owned: false,
    progress: 0,
    program: [
      { id: "m1", title: "Видео: Архитектура переговоров", type: "video", completed: false, refId: "negotiation-architecture" },
      { id: "m2", title: "Видео: Работа с возражениями", type: "video", completed: false },
      { id: "m3", title: "Опросник по итогам", type: "survey", completed: false, refId: "negotiation-quiz" },
    ],
  },
  {
    id: "digital-transformation",
    title: "Цифровая трансформация бизнеса",
    description:
      "Как лидеру управлять технологическими изменениями, выстраивать data-культуру и внедрять инновации без потери фокуса.",
    cover: "oil",
    format: "longread",
    durationHours: 16,
    price: 35000,
    owned: false,
    progress: 0,
    program: [
      { id: "m1", title: "Лонгрид: Зрелость цифровой организации", type: "longread", completed: false, refId: "digital-maturity" },
      { id: "m2", title: "Лонгрид: Data-driven управление", type: "longread", completed: false },
    ],
  },
  {
    id: "executive-communication",
    title: "Публичные выступления руководителя",
    description:
      "Постановка речи, структура убедительного выступления и управление вниманием аудитории для топ-менеджмента.",
    cover: "ocean",
    format: "mixed",
    durationHours: 10,
    price: 27000,
    owned: false,
    progress: 0,
    program: [
      { id: "m1", title: "Видео: Структура выступления", type: "video", completed: false },
      { id: "m2", title: "SCORM: Тренажёр риторики", type: "scorm", completed: false },
    ],
  },
  {
    id: "team-culture",
    title: "Культура команды и удержание талантов",
    description:
      "Построение сильной корпоративной культуры, системы мотивации и среды, в которой растут лидеры.",
    cover: "oil",
    format: "longread",
    durationHours: 14,
    price: 31000,
    owned: false,
    progress: 0,
    program: [
      { id: "m1", title: "Лонгрид: Ценности и культура", type: "longread", completed: false },
      { id: "m2", title: "Опросник вовлечённости", type: "survey", completed: false, refId: "engagement-survey" },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}
