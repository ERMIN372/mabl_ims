"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";

// Placeholder-контейнер для SCORM-модуля.
// Архитектурно подготовлен под будущий SCORM-плеер / SCORM API (1.2 / 2004):
// здесь будет монтироваться iframe плеера и инициализироваться runtime API
// (LMSInitialize, LMSSetValue, LMSCommit и т.п.).
// TODO(scorm): подключить SCORM-плеер и проброс статуса прохождения в backend.

type Status = "not_started" | "in_progress" | "completed";

const statusLabel: Record<Status, string> = {
  not_started: "Не начат",
  in_progress: "В процессе",
  completed: "Завершён",
};

export function ScormModule({ title }: { title: string }) {
  const [status, setStatus] = useState<Status>("not_started");
  const [launched, setLaunched] = useState(false);

  return (
    <div className="rounded-card border border-oil-200 bg-white p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge tone="ocean">SCORM-модуль</Badge>
          <h3 className="font-semibold tracking-tight text-oil-900">{title}</h3>
        </div>
        <Badge tone={status === "completed" ? "oil" : "muted"}>
          {statusLabel[status]}
        </Badge>
      </div>

      {/* Зона плеера */}
      <div className="mt-5 flex aspect-[16/8] items-center justify-center rounded-token border border-dashed border-oil-300 bg-oil-50">
        {launched ? (
          <div className="px-6 text-center">
            <p className="font-semibold text-oil-800">Контейнер SCORM-плеера</p>
            <p className="mt-1 text-sm text-oil-500">
              Здесь будет встроен SCORM-курс (iframe плеера + SCORM API runtime).
            </p>
          </div>
        ) : (
          <p className="text-sm text-oil-500">Модуль не запущен</p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {status === "not_started" && (
          <Button
            onClick={() => {
              setLaunched(true);
              setStatus("in_progress");
            }}
          >
            Запустить курс
          </Button>
        )}
        {status === "in_progress" && (
          <>
            <Button variant="secondary" onClick={() => setLaunched(true)}>
              Продолжить
            </Button>
            <Button onClick={() => setStatus("completed")}>
              Отметить как завершённый
            </Button>
          </>
        )}
        {status === "completed" && (
          <Button
            variant="secondary"
            onClick={() => {
              setStatus("not_started");
              setLaunched(false);
            }}
          >
            Пройти заново
          </Button>
        )}
      </div>
    </div>
  );
}
