"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader, Badge } from "@/components/ui/primitives";
import { forumSections } from "@/data/forum";
import { formatDate } from "@/lib/format";

export default function ForumPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Сообщество"
        title="Форум"
        description="Обсуждения, вопросы по курсам и вебинарам в кругу участников академии."
      />

      <div className="mt-8 space-y-8">
        {forumSections.map((section) => (
          <section key={section.id}>
            <div className="mb-3">
              <h2 className="text-lg font-semibold tracking-tight text-oil-900">
                {section.title}
              </h2>
              <p className="text-sm text-oil-500">{section.description}</p>
            </div>
            <div className="overflow-hidden rounded-card border border-oil-200 bg-white">
              {section.topics.map((topic, i) => (
                <Link
                  key={topic.id}
                  href={`/forum/${topic.id}`}
                  className={`flex items-center justify-between gap-4 p-4 transition-colors hover:bg-oil-50 ${
                    i > 0 ? "border-t border-oil-200" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-medium text-oil-900">{topic.title}</p>
                    <p className="mt-0.5 text-xs text-oil-500">
                      {topic.author} · {formatDate(topic.date)}
                    </p>
                  </div>
                  <Badge tone="muted">{topic.posts.length} сообщ.</Badge>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </DashboardShell>
  );
}
