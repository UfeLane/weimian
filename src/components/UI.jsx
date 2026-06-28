import {
  ArchiveIcon,
  ChatIcon,
  ChevronLeftIcon,
  HomeIcon,
  PillIcon,
} from "./Icons";

export function StatusBar() {
  return (
    <div className="flex h-8 items-center justify-between px-1.5 text-[11px] font-bold text-[#2D215F]">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-3.5 rounded-[2px] border border-[#2D215F]" />
        <span className="h-2.5 w-3.5 rounded-[2px] bg-[#2D215F]" />
        <span className="h-2.5 w-5 rounded-[3px] border border-[#2D215F] p-[1px]">
          <span className="block h-full w-3 rounded-[1px] bg-[#2D215F]" />
        </span>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, onBack, action }) {
  return (
    <>
      <StatusBar />
      <header className="mb-5 flex min-h-14 items-center justify-between">
        <div className="flex min-w-0 items-center gap-2">
          {onBack ? (
            <button
              aria-label="返回"
              className="pressable -ml-2 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/68 text-[#2D215F] shadow-[0_6px_16px_rgba(45,33,95,0.06)]"
              onClick={onBack}
              type="button"
            >
              <ChevronLeftIcon />
            </button>
          ) : null}
          <div className="min-w-0">
            <h1 className="truncate text-[20px] font-black tracking-[-0.04em] text-[#2D215F]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-0.5 truncate text-[11px] leading-relaxed text-[#2D215F]/55">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
        {action}
      </header>
    </>
  );
}

export function Card({ children, className = "" }) {
  const hasCustomBackground = className.includes("bg-");
  return (
    <section
      className={`card rounded-[var(--radius-card)] ${hasCustomBackground ? "" : "bg-white"} ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0388A6]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-[17px] font-black tracking-[-0.03em] text-[#2D215F]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}) {
  const styles = {
    primary: "bg-[#BF047E] text-white shadow-[0_10px_24px_rgba(191,4,126,0.22)]",
    medical: "bg-[#0388A6] text-white shadow-[0_10px_24px_rgba(3,136,166,0.2)]",
    outline: "border border-[#BF047E]/20 bg-white text-[#BF047E]",
    soft: "bg-[#F2AEDB]/38 text-[#2D215F]",
  };

  return (
    <button
      className={`pressable inline-flex min-h-[var(--control-height)] items-center justify-center gap-2 rounded-[var(--radius-control)] px-5 text-sm font-bold ${styles[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export function ComplianceNote({ children }) {
  return (
    <div className="mt-5 flex gap-2 rounded-[var(--radius-control)] border border-[#0388A6]/15 bg-[#0388A6]/6 p-3.5 text-[11px] leading-[1.65] text-[#2D215F]/65">
      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0388A6]" />
      <p>{children}</p>
    </div>
  );
}

export function FormField({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-[13px] font-bold text-[#2D215F]">
        {label}
        {hint ? <span className="text-[10px] font-normal text-[#2D215F]/42">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`h-[var(--control-height)] w-full rounded-[var(--radius-control)] border border-[#2D215F]/10 bg-[#F2F2F2] px-4 text-sm font-semibold text-[#2D215F] outline-none transition focus:border-[#0388A6]/50 focus:bg-white ${className}`}
      {...props}
    />
  );
}

export function Chip({ active, children, onClick }) {
  return (
    <button
      className={`pressable min-h-[var(--chip-height)] rounded-full border px-4 py-2.5 text-xs font-bold transition ${
        active
          ? "border-[#BF047E] bg-[#BF047E] text-white"
          : "border-[#2D215F]/10 bg-white text-[#2D215F]/65"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function BottomNav({ active, onNavigate }) {
  const tabs = [
    { id: "home", label: "今日", Icon: HomeIcon },
    { id: "report", label: "好眠档案", Icon: ArchiveIcon },
    { id: "medication", label: "我的用药", Icon: PillIcon },
    { id: "faq", label: "知识问答", Icon: ChatIcon },
  ];

  return (
    <nav className="mini-bottom-nav z-30 shrink-0 border-t border-[#2D215F]/8 bg-white/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_36px_rgba(45,33,95,0.07)] backdrop-blur-xl">
      <div className="grid grid-cols-4">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              className={`pressable flex min-h-[var(--nav-item-height)] flex-col items-center justify-center gap-1 rounded-[var(--radius-control)] text-[10px] font-bold ${
                isActive ? "text-[#BF047E]" : "text-[#2D215F]/42"
              }`}
              key={id}
              onClick={() => onNavigate(id)}
              type="button"
            >
              <span
                className={`grid h-8 w-11 place-items-center rounded-full ${
                  isActive ? "bg-[#F2AEDB]/35" : ""
                }`}
              >
                <Icon size={20} />
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="pointer-events-none absolute bottom-[calc(var(--nav-toast-offset)+env(safe-area-inset-bottom))] left-1/2 z-50 w-[calc(100%-48px)] max-w-[342px] -translate-x-1/2 rounded-[var(--radius-control)] bg-[#2D215F] px-4 py-3 text-center text-xs font-semibold leading-relaxed text-white shadow-2xl [animation:toast-in_240ms_ease-out]">
      {message}
    </div>
  );
}

export function DoctorFloatButton({ onClick }) {
  return (
    <button
      className="pressable absolute bottom-[calc(92px+env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-3 rounded-full border border-[#F2AEDB]/70 bg-white/96 px-3 py-3 shadow-[0_20px_40px_rgba(45,33,95,0.16)] backdrop-blur-xl"
      onClick={onClick}
      type="button"
    >
      <span className="relative grid h-[60px] w-[42px] shrink-0 place-items-center rounded-full bg-[linear-gradient(180deg,#F2AEDB_0%,#FFFFFF_45%,#0388A6_100%)] shadow-[inset_0_3px_10px_rgba(255,255,255,0.55)]">
        <span className="absolute right-0 top-1 grid h-4 w-4 place-items-center rounded-full bg-white text-[10px] font-black text-[#0388A6] shadow-[0_6px_12px_rgba(45,33,95,0.12)]">
          +
        </span>
        <span className="absolute top-[18px] flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2D215F]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#2D215F]" />
        </span>
        <span className="absolute top-[31px] h-2 w-4 rounded-b-full border-b-[2px] border-[#2D215F]" />
        <span className="absolute bottom-[13px] left-[7px] h-2.5 w-2.5 rounded-full bg-[#F2AEDB]" />
        <span className="absolute bottom-[13px] right-[7px] h-2.5 w-2.5 rounded-full bg-[#F2AEDB]" />
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-[9px] font-bold tracking-[0.12em] text-[#0388A6]">AI DOCTOR</span>
        <span className="mt-0.5 block text-[12px] font-black text-[#2D215F]">问问小眠医生</span>
      </span>
    </button>
  );
}

export function PatientSnapshotCard({
  title = "当前档案快照",
  summary,
  chips = [],
  accent = "brand",
  action,
}) {
  const accentStyles =
    accent === "medical"
      ? {
          eyebrow: "text-[#0388A6]",
          chip: "bg-[#0388A6]/10 text-[#0388A6]",
          border: "border-[#0388A6]/12",
        }
      : {
          eyebrow: "text-[#BF047E]",
          chip: "bg-[#F2AEDB]/26 text-[#BF046B]",
          border: "border-[#BF047E]/10",
        };

  return (
    <Card className={`${accentStyles.border} bg-white/88 p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className={`text-[10px] font-bold tracking-[0.12em] ${accentStyles.eyebrow}`}>
            {title}
          </p>
          <p className="mt-2 text-[12px] leading-[1.8] text-[#2D215F]/62">{summary}</p>
        </div>
        {action}
      </div>
      {chips.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((item) => (
            <span className={`rounded-full px-3 py-2 text-[10px] font-bold ${accentStyles.chip}`} key={item}>
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

export function TimelineList({ items = [] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div className="flex gap-3" key={item.id ?? item.title}>
          <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0388A6]" />
          <div className="min-w-0 flex-1 rounded-[18px] bg-[#F2F2F2] px-3.5 py-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] font-black text-[#2D215F]">{item.title}</p>
              {item.meta ? (
                <span className="shrink-0 text-[9px] font-bold text-[#2D215F]/38">{item.meta}</span>
              ) : null}
            </div>
            {item.body ? (
              <p className="mt-1.5 text-[10px] leading-[1.7] text-[#2D215F]/56">{item.body}</p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
