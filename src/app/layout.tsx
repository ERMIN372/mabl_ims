import type { Metadata, Viewport } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

// ВРЕМЕННЫЙ плейсхолдер фирменного шрифта.
// TT Rationalist — коммерческий слаб-сериф (TypeType) и в проект не входит.
// До добавления лицензионных файлов используем близкий по характеру
// бесплатный слаб-сериф Roboto Slab (самохостинг через next/font, с кириллицей).
// Реальный TT Rationalist стоит первым в стеке (globals.css) и подключится
// автоматически, как только файлы окажутся в /public/fonts/.
const fallbackSlab = Roboto_Slab({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-fallback-slab",
});

export const metadata: Metadata = {
  title: {
    default: "МАБЛ — Международная академия бизнес-лидерства",
    template: "%s · МАБЛ",
  },
  description:
    "LMS-платформа Международной академии бизнес-лидерства: курсы, вебинары, материалы и сообщество для руководителей.",
  icons: {
    icon: "/brand/crest.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#212128",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={fallbackSlab.variable}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
