"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge, Textarea } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { getTopic } from "@/data/forum";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/format";
import type { ForumPost } from "@/lib/types";

export default function ForumTopicPage({ params }: { params: { id: string } }) {
  const found = getTopic(params.id);
  const { user } = useAuth();

  // Локальное состояние комментариев (mock). TODO(backend): POST в API форума.
  const [posts, setPosts] = useState<ForumPost[]>(found ? found.topic.posts : []);
  const [draft, setDraft] = useState("");

  if (!found) notFound();
  const { topic, section } = found;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const newPost: ForumPost = {
      id: "local-" + Date.now(),
      author: user?.name ?? "Участник",
      date: new Date().toISOString().slice(0, 10),
      body: draft.trim(),
    };
    setPosts((p) => [...p, newPost]);
    setDraft("");
  };

  return (
    <DashboardShell>
      <div className="border-b border-oil-200 pb-6">
        <Link href="/forum" className="text-sm text-ocean-700 hover:underline">
          ← Форум
        </Link>
        <Badge tone="ocean" className="mt-4 inline-flex">
          {section.title}
        </Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-oil-900 md:text-3xl">
          {topic.title}
        </h1>
        <p className="mt-2 text-sm text-oil-500">
          Автор: {topic.author} · {formatDate(topic.date)}
        </p>
      </div>

      {/* Сообщения */}
      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="rounded-card border border-oil-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-oil-900">{post.author}</p>
              <span className="text-xs text-oil-400">{formatDate(post.date)}</span>
            </div>
            <p className="text-oil-700">{post.body}</p>
          </div>
        ))}
      </div>

      {/* Форма комментария (mock) */}
      <form onSubmit={submit} className="mt-8 rounded-card border border-oil-200 bg-white p-5">
        <p className="mb-3 font-semibold tracking-tight text-oil-900">Ответить в теме</p>
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ваш комментарий…"
        />
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={!draft.trim()}>
            Отправить
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
