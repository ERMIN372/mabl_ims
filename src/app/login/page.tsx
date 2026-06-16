"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/primitives";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const { login, recover } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const [loginValue, setLoginValue] = useState(params.get("login") ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const [mode, setMode] = useState<"login" | "recover">("login");
  const [recoverMsg, setRecoverMsg] = useState<string | null>(null);

  const justPaid = params.get("paid") === "1";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (!loginValue.trim() || !password.trim()) {
      setError("Заполните логин и пароль");
      return;
    }
    const res = login(loginValue, password);
    if (!res.ok) {
      setError(res.error ?? "Не удалось войти");
      return;
    }
    router.push("/dashboard");
  };

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverMsg(null);
    const res = recover(loginValue);
    if (!res.ok) {
      setRecoverMsg(res.error ?? "Ошибка восстановления");
      return;
    }
    // Mock: показываем пароль. В production — письмо на e-mail.
    setRecoverMsg(`Доступ восстановлен. Ваш пароль: ${res.password}`);
  };

  const emptyLogin = touched && !loginValue.trim();
  const emptyPassword = touched && !password.trim();

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex justify-center">
        <Logo variant="full" href="/" size={88} />
      </div>

      <div className="rounded-card border border-oil-200 bg-white p-7 shadow-card md:p-8">
        {justPaid && mode === "login" && (
          <div className="mb-6 rounded-token border border-ocean-200 bg-ocean-50 px-4 py-3 text-sm text-ocean-800">
            Оплата подтверждена. Войдите, используя выданные логин и пароль.
          </div>
        )}

        {mode === "login" ? (
          <>
            <h1 className="text-xl font-semibold tracking-tight text-oil-900">
              Вход в личный кабинет
            </h1>
            <p className="mt-1.5 text-sm text-oil-500">
              Доступ выдаётся после оплаты программы.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <Field label="Логин или e-mail" htmlFor="login">
                <Input
                  id="login"
                  type="text"
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                  invalid={emptyLogin}
                  placeholder="you@example.com"
                  autoComplete="username"
                />
              </Field>

              <Field label="Пароль" htmlFor="password">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  invalid={emptyPassword}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </Field>

              {error && (
                <p className="rounded-token border border-ocean-200 bg-ocean-50 px-3 py-2 text-sm text-ocean-800">
                  {error}
                </p>
              )}

              <Button type="submit" fullWidth size="lg">
                Войти
              </Button>
            </form>

            <div className="mt-5 flex items-center justify-between text-sm">
              <button
                onClick={() => {
                  setMode("recover");
                  setRecoverMsg(null);
                }}
                className="text-ocean-700 hover:underline"
              >
                Восстановить доступ
              </button>
              <Link href="/checkout" className="text-oil-500 hover:text-oil-900">
                Нет доступа? Записаться
              </Link>
            </div>

            <div className="mt-6 rounded-token bg-oil-50 px-4 py-3 text-xs text-oil-500">
              Демо-доступ: <span className="font-semibold text-oil-700">demo@mabl.academy</span>{" "}
              / <span className="font-semibold text-oil-700">mabl2026</span>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold tracking-tight text-oil-900">
              Восстановление доступа
            </h1>
            <p className="mt-1.5 text-sm text-oil-500">
              Укажите логин или e-mail, привязанный к аккаунту.
            </p>

            <form onSubmit={handleRecover} className="mt-6 space-y-4">
              <Field label="Логин или e-mail" htmlFor="recover-login">
                <Input
                  id="recover-login"
                  type="text"
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                  placeholder="you@example.com"
                />
              </Field>

              {recoverMsg && (
                <p className="rounded-token border border-ocean-200 bg-ocean-50 px-3 py-2 text-sm text-ocean-800">
                  {recoverMsg}
                </p>
              )}

              <Button type="submit" fullWidth>
                Восстановить
              </Button>
            </form>

            <button
              onClick={() => setMode("login")}
              className="mt-5 text-sm text-ocean-700 hover:underline"
            >
              ← Вернуться ко входу
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-oil-50 px-4 py-12">
      <Suspense fallback={<div className="text-sm text-oil-500">Загрузка…</div>}>
        <LoginForm />
      </Suspense>
      <Link href="/" className="mt-8 text-sm text-oil-500 hover:text-oil-900">
        ← На главную
      </Link>
    </div>
  );
}
