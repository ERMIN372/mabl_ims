import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

// Подвал на фоне «нефть» — премиальная тёмная зона.
export function Footer() {
  return (
    <footer className="mt-auto bg-oil-900 text-oil-300">
      <div className="container-mabl grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="horizontal" onDark href={null} size={48} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-oil-400">
            Международная академия бизнес-лидерства. Премиальное образование
            для руководителей: стратегия, финансы, переговоры и развитие команд.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-heading text-oil-500">
            Обучение
          </p>
          <ul className="space-y-2.5 text-sm">
            <li><Link className="hover:text-white" href="/courses">Каталог курсов</Link></li>
            <li><Link className="hover:text-white" href="/calendar">Вебинары</Link></li>
            <li><Link className="hover:text-white" href="/materials">Материалы</Link></li>
            <li><Link className="hover:text-white" href="/news">Новости</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-heading text-oil-500">
            Доступ
          </p>
          <ul className="space-y-2.5 text-sm">
            <li><Link className="hover:text-white" href="/login">Вход в кабинет</Link></li>
            <li><Link className="hover:text-white" href="/checkout">Запись на программу</Link></li>
            <li><Link className="hover:text-white" href="/dashboard">Личный кабинет</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-oil-800">
        <div className="container-mabl flex flex-col items-center justify-between gap-3 py-6 text-xs text-oil-500 md:flex-row">
          <p>© {new Date().getFullYear()} МАБЛ. Все права защищены.</p>
          <p className="tracking-wide">Sapere · Ducere</p>
        </div>
      </div>
    </footer>
  );
}
