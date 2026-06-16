import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/ui/primitives";
import { CoverArt } from "@/components/ui/CoverArt";
import { materials, getMaterial } from "@/data/materials";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return materials.map((m) => ({ id: m.id }));
}

export default function MaterialPage({ params }: { params: { id: string } }) {
  const material = getMaterial(params.id);
  if (!material) notFound();

  return (
    <PublicShell>
      <article className="container-mabl max-w-3xl py-12 md:py-16">
        <Link href="/materials" className="text-sm text-ocean-700 hover:underline">
          ← Все материалы
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <Badge tone="ocean">{material.kind === "video" ? "Видео" : "Лонгрид"}</Badge>
          <Badge tone="muted">{material.category}</Badge>
          <span className="text-oil-400">{formatDate(material.date)}</span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-oil-900 md:text-4xl">
          {material.title}
        </h1>

        {/* Видео-плеер placeholder (HTML5 video) */}
        {material.kind === "video" && (
          <div className="mt-8">
            <div className="relative aspect-video overflow-hidden rounded-card">
              <CoverArt tone="ocean" className="absolute inset-0" showCrest={false} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 text-2xl backdrop-blur">
                  ▶
                </span>
                <p className="text-sm text-white/80">Видео-плеер (placeholder)</p>
              </div>
            </div>
            {/* TODO(media): заменить на встроенный <video> или провайдер (Kinescope/Vimeo).
                Пример: <video controls src={material.videoUrl} className="w-full rounded-card" /> */}
            <p className="mt-2 text-xs text-oil-400">
              HTML5 video-плеер будет подключён здесь. Источник: {material.videoUrl ?? "—"}.
            </p>
          </div>
        )}

        {/* Текст лонгрида / описание видео */}
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-oil-700">
          {material.body.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </PublicShell>
  );
}
