"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

// Публичная шапка с навигацией по открытой зоне сайта.
const navItems = [
  { href: "/courses", label: "Курсы" },
  { href: "/calendar", label: "Вебинары" },
  { href: "/news", label: "Новости" },
  { href: "/materials", label: "Материалы" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-oil-200 bg-white/90 backdrop-blur">
      <div className="container-mabl flex h-20 items-center justify-between">
        <Logo variant="horizontal" size={44} />

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-ocean-700 ${
                pathname.startsWith(item.href) ? "text-ocean-700" : "text-oil-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <ButtonLink href="/dashboard" size="sm">
              Личный кабинет
            </ButtonLink>
          ) : (
            <>
              <ButtonLink href="/login" variant="secondary" size="sm">
                Войти
              </ButtonLink>
              <ButtonLink href="/checkout" size="sm">
                Записаться
              </ButtonLink>
            </>
          )}
        </div>

        <button
          className="rounded-token border border-oil-300 p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          <span className="block h-0.5 w-5 bg-oil-900" />
          <span className="mt-1 block h-0.5 w-5 bg-oil-900" />
          <span className="mt-1 block h-0.5 w-5 bg-oil-900" />
        </button>
      </div>

      {open && (
        <div className="border-t border-oil-200 bg-white lg:hidden">
          <nav className="container-mabl flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-oil-800"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-oil-200 pt-4">
              {user ? (
                <ButtonLink href="/dashboard" fullWidth>
                  Личный кабинет
                </ButtonLink>
              ) : (
                <>
                  <ButtonLink href="/login" variant="secondary" fullWidth>
                    Войти
                  </ButtonLink>
                  <ButtonLink href="/checkout" fullWidth>
                    Записаться
                  </ButtonLink>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
