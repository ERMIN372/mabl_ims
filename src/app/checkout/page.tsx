"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PublicShell } from "@/components/layout/PublicShell";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge, Field, Input } from "@/components/ui/primitives";
import { courses } from "@/data/courses";
import { events } from "@/data/events";
import { formatPrice } from "@/lib/format";
import { paymentProvider } from "@/lib/payment";
import { useAuth } from "@/context/AuthContext";

interface PurchasableItem {
  id: string;
  title: string;
  price: number;
  kind: "Курс" | "Вебинар" | "Мероприятие";
  description: string;
}

// Единый список покупаемых позиций (курсы + платные/бесплатные события).
function usePurchasables(): PurchasableItem[] {
  return useMemo(() => {
    const courseItems: PurchasableItem[] = courses
      .filter((c) => !c.owned)
      .map((c) => ({
        id: c.id,
        title: c.title,
        price: c.price,
        kind: "Курс",
        description: c.description,
      }));
    const eventItems: PurchasableItem[] = events
      .filter((e) => e.kind !== "deadline")
      .map((e) => ({
        id: e.id,
        title: e.title,
        price: e.price ?? 0,
        kind: e.kind === "webinar" ? "Вебинар" : "Мероприятие",
        description: e.description,
      }));
    return [...eventItems, ...courseItems];
  }, []);
}

type Stage = "select" | "form" | "paying" | "done";

function CheckoutFlow() {
  const params = useSearchParams();
  const items = usePurchasables();
  const { registerCredential } = useAuth();

  const initialId = params.get("item");
  const [selectedId, setSelectedId] = useState<string | null>(
    initialId && items.some((i) => i.id === initialId) ? initialId : null
  );
  const [stage, setStage] = useState<Stage>(initialId ? "form" : "select");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<{ login: string; password: string } | null>(null);

  const selected = items.find((i) => i.id === selectedId) ?? null;

  const chooseItem = (id: string) => {
    setSelectedId(id);
    setStage("form");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!name.trim() || !email.includes("@")) {
      setFormError("Укажите имя и корректный e-mail");
      return;
    }
    if (!selected) return;

    setStage("paying");
    // Mock-оплата через абстракцию провайдера (легко заменить на реальный).
    const result = await paymentProvider.pay({
      itemId: selected.id,
      itemTitle: selected.title,
      amount: selected.price,
      email: email.trim(),
      name: name.trim(),
    });

    if (result.success && result.credentials) {
      // Сохраняем выданный mock-доступ, чтобы пользователь смог войти.
      registerCredential(result.credentials.login, result.credentials.password, name.trim());
      setCredentials(result.credentials);
      setStage("done");
    } else {
      setFormError("Оплата не прошла. Попробуйте ещё раз.");
      setStage("form");
    }
  };

  // --- Экран успеха ---
  if (stage === "done" && selected && credentials) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="rounded-card border border-oil-200 bg-white p-8 text-center shadow-card">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-ocean-600 text-2xl text-white">
            ✓
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-oil-900">
            Оплата успешно подтверждена
          </h1>
          <p className="mt-2 text-sm text-oil-600">
            Доступ к «{selected.title}» открыт. Используйте выданные данные для входа.
          </p>

          <div className="mt-6 space-y-2 rounded-token bg-oil-50 p-5 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-oil-500">Логин</span>
              <span className="font-semibold text-oil-900">{credentials.login}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-oil-500">Пароль</span>
              <span className="font-semibold text-oil-900">{credentials.password}</span>
            </div>
          </div>

          <p className="mt-4 text-xs text-oil-400">
            Сохраните эти данные. В production учётные данные будут отправлены на e-mail
            после подтверждения платежа провайдером.
          </p>

          <div className="mt-6">
            <ButtonLink
              href={`/login?paid=1&login=${encodeURIComponent(credentials.login)}`}
              fullWidth
              size="lg"
            >
              Перейти ко входу
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_360px]">
      {/* Левая часть — выбор и форма */}
      <div>
        {stage === "select" || !selected ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-oil-900">
              Выбор программы или вебинара
            </h1>
            <p className="mt-2 text-oil-600">
              Выберите позицию, чтобы оформить запись и получить доступ к платформе.
            </p>
            <div className="mt-6 space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => chooseItem(item.id)}
                  className={`flex w-full items-center justify-between gap-4 rounded-card border p-5 text-left transition-colors ${
                    selectedId === item.id
                      ? "border-ocean-600 bg-ocean-50/40"
                      : "border-oil-200 bg-white hover:border-oil-300"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="mb-1.5">
                      <Badge tone="ocean">{item.kind}</Badge>
                    </div>
                    <p className="font-semibold tracking-tight text-oil-900">{item.title}</p>
                    <p className="mt-1 line-clamp-1 text-sm text-oil-500">{item.description}</p>
                  </div>
                  <span className="shrink-0 font-semibold text-oil-900">
                    {formatPrice(item.price)}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setStage("select")}
              className="mb-4 text-sm text-ocean-700 hover:underline"
            >
              ← Выбрать другую программу
            </button>
            <h1 className="text-2xl font-semibold tracking-tight text-oil-900">
              Оформление записи
            </h1>
            <p className="mt-2 text-oil-600">
              Заполните данные участника. После оплаты вы получите доступ в личный кабинет.
            </p>

            <form onSubmit={handlePay} className="mt-6 max-w-md space-y-4">
              <Field label="Имя и фамилия" htmlFor="name">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  disabled={stage === "paying"}
                />
              </Field>
              <Field label="E-mail" htmlFor="email" hint="На него придёт доступ (в production).">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={stage === "paying"}
                />
              </Field>

              {formError && (
                <p className="rounded-token border border-ocean-200 bg-ocean-50 px-3 py-2 text-sm text-ocean-800">
                  {formError}
                </p>
              )}

              <Button type="submit" fullWidth size="lg" disabled={stage === "paying"}>
                {stage === "paying"
                  ? "Обработка платежа…"
                  : `Оплатить ${formatPrice(selected.price)}`}
              </Button>
              <p className="text-center text-xs text-oil-400">
                Демонстрационная оплата. Реальный платёжный провайдер не подключён —
                см. <code>src/lib/payment.ts</code>.
              </p>
            </form>
          </>
        )}
      </div>

      {/* Правая часть — сводка заказа */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-card border border-oil-200 bg-white p-6 shadow-soft">
          <p className="eyebrow mb-4">Ваш заказ</p>
          {selected ? (
            <>
              <p className="font-semibold tracking-tight text-oil-900">{selected.title}</p>
              <Badge tone="muted" className="mt-2">{selected.kind}</Badge>
              <div className="my-5 border-t border-oil-200" />
              <div className="flex items-center justify-between">
                <span className="text-oil-500">Итого</span>
                <span className="text-xl font-semibold text-oil-900">
                  {formatPrice(selected.price)}
                </span>
              </div>
            </>
          ) : (
            <p className="text-sm text-oil-500">Позиция не выбрана.</p>
          )}
          <div className="mt-6 text-xs text-oil-400">
            Уже есть доступ?{" "}
            <Link href="/login" className="text-ocean-700 hover:underline">
              Войти
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <PublicShell>
      <div className="container-mabl py-14 md:py-20">
        <Suspense fallback={<div className="text-sm text-oil-500">Загрузка…</div>}>
          <CheckoutFlow />
        </Suspense>
      </div>
    </PublicShell>
  );
}
