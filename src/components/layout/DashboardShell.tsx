"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { notifications } from "@/data/notifications";

// Оболочка защищённой зоны (личный кабинет).
// Включает боковую навигацию, верхнюю панель и guard авторизации.

const nav = [
  { href: "/dashboard", label: "Дашборд" },
  { href: "/courses", label: "Каталог курсов" },
  { href: "/dashboard/my-courses", label: "Мои курсы" },
  { href: "/calendar", label: "Вебинары и события" },
  { href: "/materials", label: "Материалы" },
  { href: "/news", label: "Новости" },
  { href: "/forum", label: "Форум" },
  { href: "/surveys", label: "Опросники" },
  { href: "/notifications", label: "Уведомления" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, ready, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-oil-500">
        Загрузка кабинета…
      </div>
    );
  }

  const unread = notifications.filter((n) => !n.read).length;

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  const SideNav = (
    <nav className="flex flex-col gap-1">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className={`flex items-center justify-between rounded-token px-3 py-2.5 text-sm transition-colors ${
            isActive(item.href)
              ? "bg-ocean-50 font-semibold text-ocean-700"
              : "text-oil-700 hover:bg-oil-50"
          }`}
        >
          {item.label}
          {item.href === "/notifications" && unread > 0 && (
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ocean-600 px-1.5 text-[11px] font-semibold text-white">
              {unread}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-oil-50">
      {/* Верхняя панель */}
      <header className="sticky top-0 z-40 border-b border-oil-200 bg-white">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-token border border-oil-300 p-2 lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Меню кабинета"
            >
              <span className="block h-0.5 w-5 bg-oil-900" />
              <span className="mt-1 block h-0.5 w-5 bg-oil-900" />
              <span className="mt-1 block h-0.5 w-5 bg-oil-900" />
            </button>
            <Logo variant="horizontal" size={36} />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/notifications"
              className="relative text-sm text-oil-600 hover:text-ocean-700"
            >
              Уведомления
              {unread > 0 && (
                <span className="absolute -right-3 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-ocean-600 px-1 text-[10px] font-semibold text-white">
                  {unread}
                </span>
              )}
            </Link>
            <span className="hidden text-sm text-oil-500 sm:inline">{user.name}</span>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="rounded-token border border-oil-300 px-3 py-1.5 text-sm text-oil-700 hover:border-oil-900"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-content gap-8 px-4 py-8 md:px-8">
        {/* Боковая навигация — desktop */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24">{SideNav}</div>
        </aside>

        {/* Мобильное меню */}
        {menuOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <div
              className="absolute inset-0 bg-oil-900/40"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 max-w-[80%] bg-white p-5 shadow-card">
              <p className="eyebrow mb-4">Кабинет</p>
              {SideNav}
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
