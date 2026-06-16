import Image from "next/image";

// Обложка-плейсхолдер для курсов/материалов в брендовых цветах.
// Без случайных иллюстраций — только фирменные нефть/океан и герб/паттерн.
// TODO: при появлении реальных обложек заменить на <Image src={cover} />.

export function CoverArt({
  tone = "oil",
  label,
  className = "",
  showCrest = true,
}: {
  tone?: "oil" | "ocean";
  label?: string;
  className?: string;
  showCrest?: boolean;
}) {
  const bg = tone === "ocean" ? "bg-ocean-700" : "bg-oil-900";
  return (
    <div className={`relative overflow-hidden ${bg} ${className}`}>
      <div className="pattern-bg absolute inset-0 opacity-[0.12]" />
      <div className="absolute inset-0 flex items-center justify-center">
        {showCrest && (
          <Image
            src="/brand/crest-trans.png"
            alt=""
            width={120}
            height={121}
            className="opacity-90"
            style={{ height: "58%", width: "auto" }}
          />
        )}
      </div>
      {label && (
        <span className="absolute bottom-3 left-4 text-[11px] font-semibold uppercase tracking-heading text-white/70">
          {label}
        </span>
      )}
    </div>
  );
}
