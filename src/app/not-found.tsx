import { PublicShell } from "@/components/layout/PublicShell";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PublicShell>
      <div className="container-mabl flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">Ошибка 404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-oil-900">
          Страница не найдена
        </h1>
        <p className="mt-3 max-w-md text-oil-600">
          Возможно, страница была перемещена или больше не существует.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">На главную</ButtonLink>
        </div>
      </div>
    </PublicShell>
  );
}
