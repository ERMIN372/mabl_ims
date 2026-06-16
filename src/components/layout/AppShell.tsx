"use client";

import { CabinetLayout } from "./DashboardShell";
import { PublicShell } from "./PublicShell";
import { useAuth } from "@/context/AuthContext";

// Универсальная оболочка для разделов, доступных и публично, и из кабинета
// (каталог курсов, курс, материалы, новости, календарь).
//
//  - гость → публичная шапка/подвал;
//  - авторизованный → остаётся в кабинете с боковым меню (не «выкидывает»
//    на главную).
//
// До инициализации авторизации (ready=false) рендерим публичную оболочку —
// это совпадает с серверным рендером и не вызывает рассинхрон гидрации.
export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();

  if (ready && user) {
    return <CabinetLayout>{children}</CabinetLayout>;
  }
  return <PublicShell>{children}</PublicShell>;
}
