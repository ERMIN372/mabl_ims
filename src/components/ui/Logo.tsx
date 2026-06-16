import Image from "next/image";
import Link from "next/link";

// Логотип МАБЛ из бренд-гайда.
//  - "horizontal" — приоритетная полная версия: герб слева, текст справа
//    через разделительную линию (для шапки/подвала на светлом фоне).
//  - "crest" — только герб (компактные места, мобильная шапка).
//  - "full" — герб с лентой МАБЛ (вертикальная, для героя/входа).
// Вариант "onDark" использует версию для тёмного фона: герб + белый
// текстовый блок (текст исходного лого тёмный и не читается на нефти).

type Variant = "horizontal" | "crest" | "full";

interface LogoProps {
  variant?: Variant;
  onDark?: boolean;
  href?: string | null;
  className?: string;
  /** высота в px для герба/полной версии */
  size?: number;
}

const assets: Record<Variant, { src: string; w: number; h: number }> = {
  horizontal: { src: "/brand/logo-horizontal-trans.png", w: 535, h: 204 },
  crest: { src: "/brand/crest-trans.png", w: 436, h: 440 },
  full: { src: "/brand/logo-full-trans.png", w: 592, h: 523 },
};

export function Logo({
  variant = "horizontal",
  onDark = false,
  href = "/",
  className = "",
  size,
}: LogoProps) {
  const a = assets[variant];

  // На тёмном фоне для горизонтального лого собираем лок-ап вручную:
  // герб-картинка + белый текстовый блок фирменным шрифтом.
  const content =
    onDark && variant === "horizontal" ? (
      <span className="flex items-center gap-3">
        <Image
          src={assets.crest.src}
          alt="Герб МАБЛ"
          width={assets.crest.w}
          height={assets.crest.h}
          style={{ height: size ?? 44, width: "auto" }}
          priority
        />
        <span className="border-l border-white/30 pl-3 leading-tight">
          <span className="block text-[11px] font-semibold uppercase tracking-heading text-white">
            Международная
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-heading text-white">
            Академия
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-heading text-white/80">
            Бизнес-лидерства
          </span>
        </span>
      </span>
    ) : (
      <Image
        src={a.src}
        alt="МАБЛ — Международная академия бизнес-лидерства"
        width={a.w}
        height={a.h}
        style={{ height: size ?? (variant === "horizontal" ? 48 : 56), width: "auto" }}
        priority
      />
    );

  const wrapped = (
    <span className={`inline-flex items-center ${className}`}>{content}</span>
  );

  if (href === null) return wrapped;
  return (
    <Link href={href} aria-label="МАБЛ — на главную" className="inline-flex">
      {wrapped}
    </Link>
  );
}
