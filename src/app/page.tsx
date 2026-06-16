import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/layout/PublicShell";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, Section, SectionHeader } from "@/components/ui/primitives";
import { CourseCard, NewsCard } from "@/components/cards";
import { courses } from "@/data/courses";
import { news } from "@/data/news";
import { getNextWebinar } from "@/data/events";
import { formatDate, formatPrice } from "@/lib/format";

export default function HomePage() {
  const featuredCourses = courses.slice(0, 3);
  const latestNews = news.slice(0, 3);
  const webinar = getNextWebinar();

  return (
    <PublicShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-oil-200 bg-oil-900 text-white">
        <div className="pattern-bg absolute inset-0 opacity-[0.06]" />
        <div className="container-mabl relative grid items-center gap-12 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div>
            <p className="eyebrow text-ocean-300">Sapere · Ducere — знать и вести</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Международная академия
              <br />
              бизнес-лидерства
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-oil-300">
              Премиальное образование для руководителей. Стратегия, финансы,
              переговоры и развитие команд — в строгой академической традиции,
              с практической применимостью каждого модуля.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/checkout" size="lg">
                Записаться на программу
              </ButtonLink>
              <ButtonLink href="/courses" size="lg" variant="ghost" className="text-white hover:bg-white/10">
                Каталог курсов
              </ButtonLink>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src="/brand/logo-full-trans.png"
              alt="Герб МАБЛ"
              width={592}
              height={523}
              priority
              className="w-64 drop-shadow-2xl md:w-80"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}
            />
          </div>
        </div>
      </section>

      {/* Позиционирование — три принципа */}
      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Академическая глубина",
              d: "Системные программы, построенные на принципах минимализма: фокус на смыслах без перегрузки.",
            },
            {
              t: "Практика лидерства",
              d: "Каждый курс соединяет теорию с реальными управленческими задачами и инструментами.",
            },
            {
              t: "Сообщество руководителей",
              d: "Форум, вебинары и встречи выпускников — среда, в которой растут лидеры.",
            },
          ].map((p) => (
            <div key={p.t} className="border-t border-oil-200 pt-6">
              <h3 className="text-lg font-semibold tracking-tight text-oil-900">{p.t}</h3>
              <p className="mt-3 text-oil-600">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Ближайший вебинар */}
      {webinar && (
        <section className="border-y border-oil-200 bg-oil-50">
          <div className="container-mabl py-16">
            <div className="grid items-center gap-8 rounded-card border border-oil-200 bg-white p-8 shadow-soft md:grid-cols-[1fr_auto] md:p-10">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge tone="ocean">Ближайший вебинар</Badge>
                  <Badge tone="outline">{webinar.format}</Badge>
                  <span className="text-sm text-oil-500">
                    {formatDate(webinar.date)} · {webinar.time}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-oil-900 md:text-3xl">
                  {webinar.title}
                </h2>
                <p className="mt-3 max-w-xl text-oil-600">{webinar.description}</p>
                <p className="mt-4 text-sm font-semibold text-oil-900">
                  {formatPrice(webinar.price ?? 0)}
                </p>
              </div>
              <div className="shrink-0">
                <ButtonLink href={`/checkout?item=${webinar.id}`} size="lg">
                  Записаться на вебинар
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Курсы */}
      <Section>
        <SectionHeader
          eyebrow="Программы"
          title="Избранные курсы"
          description="Флагманские программы академии для руководителей."
          action={
            <ButtonLink href="/courses" variant="secondary">
              Весь каталог
            </ButtonLink>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </Section>

      {/* Новости */}
      <section className="border-t border-oil-200 bg-oil-50">
        <div className="container-mabl py-14 md:py-20">
          <SectionHeader
            eyebrow="Журнал"
            title="Новости академии"
            action={
              <ButtonLink href="/news" variant="secondary">
                Все новости
              </ButtonLink>
            }
          />
          <div className="grid gap-6 md:grid-cols-3">
            {latestNews.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA авторизация */}
      <Section>
        <div className="flex flex-col items-center gap-5 rounded-card border border-oil-200 bg-oil-900 px-8 py-14 text-center text-white">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
            Уже учитесь в МАБЛ?
          </h2>
          <p className="max-w-xl text-oil-300">
            Войдите в личный кабинет, чтобы продолжить обучение, отслеживать
            прогресс и участвовать в жизни сообщества.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/login" size="lg">
              Войти в кабинет
            </ButtonLink>
            <Link href="/checkout" className="self-center text-sm text-oil-300 underline-offset-4 hover:text-white hover:underline">
              Ещё нет доступа? Записаться →
            </Link>
          </div>
        </div>
      </Section>
    </PublicShell>
  );
}
