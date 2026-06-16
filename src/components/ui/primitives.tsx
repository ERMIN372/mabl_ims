import Link from "next/link";

// Набор примитивов дизайн-системы: Card, Badge, Input, Textarea, ProgressBar,
// Section, PageHeader, EmptyState, Hairline.

export function Card({
  children,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <As
      className={`rounded-card border border-oil-200 bg-white shadow-soft ${className}`}
    >
      {children}
    </As>
  );
}

export function LinkCard({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group block rounded-card border border-oil-200 bg-white shadow-soft transition-all duration-150 hover:-translate-y-0.5 hover:border-oil-300 hover:shadow-card ${className}`}
    >
      {children}
    </Link>
  );
}

type BadgeTone = "oil" | "ocean" | "muted" | "outline";
const badgeTones: Record<BadgeTone, string> = {
  oil: "bg-oil-900 text-white",
  ocean: "bg-ocean-50 text-ocean-700",
  muted: "bg-oil-100 text-oil-600",
  outline: "border border-oil-300 text-oil-700",
};

export function Badge({
  children,
  tone = "muted",
  className = "",
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-token px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${badgeTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

const inputBase =
  "w-full rounded-token border border-oil-300 bg-white px-3.5 py-2.5 text-sm text-oil-900 placeholder:text-oil-400 transition-colors focus:border-ocean-600 focus:outline-none focus:ring-1 focus:ring-ocean-600";

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
) {
  const { invalid, className = "", ...rest } = props;
  return (
    <input
      className={`${inputBase} ${invalid ? "border-ocean-700 ring-1 ring-ocean-700" : ""} ${className}`}
      {...rest}
    />
  );
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const { className = "", ...rest } = props;
  return <textarea className={`${inputBase} min-h-28 resize-y ${className}`} {...rest} />;
}

export function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-semibold text-oil-800">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-oil-500">{hint}</span>}
    </label>
  );
}

export function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-oil-100"
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full rounded-full bg-ocean-600" style={{ width: `${v}%` }} />
    </div>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-14 md:py-20 ${className}`}>
      <div className="container-mabl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold tracking-tight text-oil-900 md:text-3xl">
          {title}
        </h2>
        {description && <p className="mt-3 text-oil-600">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// Заголовок страницы во внутренней зоне (кабинет).
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border-b border-oil-200 pb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-2xl font-semibold tracking-tight text-oil-900 md:text-[2rem]">
            {title}
          </h1>
          {description && <p className="mt-3 max-w-2xl text-oil-600">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="rounded-card border border-dashed border-oil-300 bg-oil-50 px-6 py-16 text-center">
      <p className="font-semibold text-oil-800">{title}</p>
      {description && <p className="mt-2 text-sm text-oil-500">{description}</p>}
    </div>
  );
}
