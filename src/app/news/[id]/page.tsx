import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/primitives";
import { news, getNews } from "@/data/news";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return news.map((n) => ({ id: n.id }));
}

export default function NewsItemPage({ params }: { params: { id: string } }) {
  const item = getNews(params.id);
  if (!item) notFound();

  const more = news.filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <AppShell>
      <article className="container-mabl max-w-3xl py-12 md:py-16">
        <Link href="/news" className="text-sm text-ocean-700 hover:underline">
          ← Все новости
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <Badge tone="ocean">{item.category}</Badge>
          <span className="text-oil-400">{formatDate(item.date)}</span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-oil-900 md:text-4xl">
          {item.title}
        </h1>

        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-oil-700">
          {item.body.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-t border-oil-200 bg-oil-50">
          <div className="container-mabl py-12">
            <h2 className="mb-6 text-lg font-semibold tracking-tight text-oil-900">
              Другие новости
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {more.map((n) => (
                <Link
                  key={n.id}
                  href={`/news/${n.id}`}
                  className="block rounded-card border border-oil-200 bg-white p-5 transition-colors hover:border-oil-300"
                >
                  <span className="text-xs font-semibold uppercase tracking-heading text-ocean-700">
                    {n.category}
                  </span>
                  <p className="mt-2 font-semibold tracking-tight text-oil-900">{n.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </AppShell>
  );
}
