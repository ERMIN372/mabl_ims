import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

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
    <html lang="ru">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
