"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Badge, Textarea } from "@/components/ui/primitives";
import { Button, ButtonLink } from "@/components/ui/Button";
import { getSurvey } from "@/data/surveys";
import type { SurveyQuestion } from "@/lib/types";

// Значение ответа: строка (single/scale/text) или массив строк (multiple).
type AnswerValue = string | string[];

export default function SurveyPage({ params }: { params: { id: string } }) {
  const survey = getSurvey(params.id);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!survey) notFound();

  const setAnswer = (qid: string, value: AnswerValue) =>
    setAnswers((a) => ({ ...a, [qid]: value }));

  const toggleMultiple = (qid: string, option: string) => {
    const current = (answers[qid] as string[]) ?? [];
    setAnswer(
      qid,
      current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(backend): отправить answers на API. Сейчас сохраняем локально (mock).
    // eslint-disable-next-line no-console
    console.log("survey answers", { surveyId: survey.id, answers });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-lg rounded-card border border-oil-200 bg-white p-8 text-center shadow-card">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-ocean-600 text-2xl text-white">
            ✓
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-oil-900">Ответы сохранены</h1>
          <p className="mt-2 text-sm text-oil-600">
            Спасибо! Ваши ответы по опроснику «{survey.title}» сохранены.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <ButtonLink href="/surveys" variant="secondary">
              К списку опросников
            </ButtonLink>
            <ButtonLink href="/dashboard">В кабинет</ButtonLink>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="border-b border-oil-200 pb-6">
        <Link href="/surveys" className="text-sm text-ocean-700 hover:underline">
          ← Опросники
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-oil-900 md:text-3xl">
          {survey.title}
        </h1>
        <p className="mt-2 max-w-2xl text-oil-600">{survey.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6">
        {survey.questions.map((q, i) => (
          <fieldset
            key={q.id}
            className="rounded-card border border-oil-200 bg-white p-6"
          >
            <legend className="sr-only">{q.prompt}</legend>
            <div className="mb-4 flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-oil-100 text-xs font-semibold text-oil-700">
                {i + 1}
              </span>
              <p className="font-semibold text-oil-900">{q.prompt}</p>
            </div>
            <QuestionInput
              question={q}
              value={answers[q.id]}
              onSingle={(v) => setAnswer(q.id, v)}
              onMultiple={(o) => toggleMultiple(q.id, o)}
            />
          </fieldset>
        ))}

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Отправить ответы
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}

function QuestionInput({
  question,
  value,
  onSingle,
  onMultiple,
}: {
  question: SurveyQuestion;
  value: AnswerValue | undefined;
  onSingle: (v: string) => void;
  onMultiple: (option: string) => void;
}) {
  if (question.type === "single") {
    return (
      <div className="space-y-2 pl-9">
        {question.options?.map((opt) => (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 rounded-token border px-4 py-2.5 text-sm transition-colors ${
              value === opt ? "border-ocean-600 bg-ocean-50/50" : "border-oil-200 hover:border-oil-300"
            }`}
          >
            <input
              type="radio"
              name={question.id}
              checked={value === opt}
              onChange={() => onSingle(opt)}
              className="accent-ocean-600"
            />
            <span className="text-oil-800">{opt}</span>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "multiple") {
    const arr = (value as string[]) ?? [];
    return (
      <div className="space-y-2 pl-9">
        {question.options?.map((opt) => (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 rounded-token border px-4 py-2.5 text-sm transition-colors ${
              arr.includes(opt) ? "border-ocean-600 bg-ocean-50/50" : "border-oil-200 hover:border-oil-300"
            }`}
          >
            <input
              type="checkbox"
              checked={arr.includes(opt)}
              onChange={() => onMultiple(opt)}
              className="accent-ocean-600"
            />
            <span className="text-oil-800">{opt}</span>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "scale") {
    return (
      <div className="flex gap-2 pl-9">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onSingle(String(n))}
            className={`h-11 w-11 rounded-token border text-sm font-semibold transition-colors ${
              value === String(n)
                ? "border-ocean-600 bg-ocean-600 text-white"
                : "border-oil-300 text-oil-700 hover:border-oil-900"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    );
  }

  // text
  return (
    <div className="pl-9">
      <Textarea
        value={(value as string) ?? ""}
        onChange={(e) => onSingle(e.target.value)}
        placeholder="Ваш ответ…"
      />
    </div>
  );
}
