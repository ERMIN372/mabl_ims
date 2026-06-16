// Типы доменной модели LMS МАБЛ.
// Структура подготовлена под замену mock-данных на реальный backend/API.

export type CourseFormat = "scorm" | "video" | "longread" | "mixed";

export interface Course {
  id: string;
  title: string;
  description: string;
  cover: string; // путь к обложке (placeholder-градиент по бренду)
  format: CourseFormat;
  durationHours: number;
  price: number; // в рублях; 0 = бесплатно
  owned: boolean; // куплен ли курс текущим пользователем (mock)
  progress: number; // 0..100
  program: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  type: "scorm" | "longread" | "video" | "survey";
  completed: boolean;
  refId?: string; // ссылка на материал/опросник
}

export type MaterialKind = "longread" | "video";

export interface Material {
  id: string;
  title: string;
  kind: MaterialKind;
  category: string;
  date: string; // ISO
  excerpt: string;
  body: string; // для лонгрида — текст; для видео — описание
  videoUrl?: string; // placeholder
}

export type NewsCategory = "Академия" | "Вебинары" | "Курсы" | "События";

export interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory;
  date: string;
  excerpt: string;
  body: string;
}

export type EventFormat = "Онлайн" | "Очно" | "Гибрид";
export type EventKind = "webinar" | "deadline" | "meetup";

export interface EventItem {
  id: string;
  title: string;
  kind: EventKind;
  format: EventFormat;
  date: string; // ISO дата
  time: string; // например "19:00"
  registered: boolean;
  description: string;
  price?: number;
}

export type NotificationType =
  | "course_access"
  | "webinar_reminder"
  | "new_material"
  | "survey_required"
  | "forum_reply";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  date: string; // ISO
  read: boolean;
  href?: string;
}

export interface ForumSection {
  id: string;
  title: string;
  description: string;
  topics: ForumTopic[];
}

export interface ForumTopic {
  id: string;
  sectionId: string;
  title: string;
  author: string;
  date: string;
  posts: ForumPost[];
}

export interface ForumPost {
  id: string;
  author: string;
  date: string;
  body: string;
}

export type SurveyQuestionType = "single" | "multiple" | "scale" | "text";

export interface SurveyQuestion {
  id: string;
  type: SurveyQuestionType;
  prompt: string;
  options?: string[]; // для single/multiple
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
}
