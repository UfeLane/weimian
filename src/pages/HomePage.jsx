import { weeklySleep } from "../data";
import {
  AlertIcon,
  ChevronRightIcon,
  ClockIcon,
  MoonLogIcon,
  PillIcon,
  ReportIcon,
} from "../components/Icons";
import {
  Button,
  Card,
  ComplianceNote,
  PageHeader,
  PatientSnapshotCard,
  SectionTitle,
} from "../components/UI";

function TrendChart() {
  const points = weeklySleep.map((item, index) => ({
    x: 16 + index * 47,
    y: 96 - (item.value - 5) * 34,
  }));
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `16,105 ${line} 298,105`;

  return (
    <div>
      <svg aria-label="最近七天睡眠时长趋势" className="h-[118px] w-full" viewBox="0 0 314 118">
        <defs>
          <linearGradient id="trendArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0388A6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0388A6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[28, 57, 86].map((y) => (
          <line
            key={y}
            stroke="#2D215F"
            strokeDasharray="3 6"
            strokeOpacity="0.08"
            x1="16"
            x2="298"
            y1={y}
            y2={y}
          />
        ))}
        <polygon fill="url(#trendArea)" points={area} />
        <polyline
          fill="none"
          points={line}
          stroke="#0388A6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        {points.map((point, index) => (
          <circle
            cx={point.x}
            cy={point.y}
            fill={index === points.length - 1 ? "#BF047E" : "#FFFFFF"}
            key={weeklySleep[index].day}
            r={index === points.length - 1 ? 5 : 3}
            stroke={index === points.length - 1 ? "#BF047E" : "#0388A6"}
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-[#2D215F]/40">
        {weeklySleep.map((item) => (
          <span key={item.day}>{item.day}</span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage({ demoRuntime, onNavigate, onToast }) {
  const { currentMedication, patient, reportSummary, sleepStats, adverseRecords } = demoRuntime;
  const quickActions = [
    { label: "记录睡眠", sub: "补充昨夜情况", Icon: MoonLogIcon, page: "sleep" },
    { label: "用药打卡", sub: `今晚 ${currentMedication.reminderTime}`, Icon: PillIcon, page: "medication" },
    { label: "不适记录", sub: "记录身体感受", Icon: AlertIcon, page: "adverse" },
    { label: "生成报告", sub: "近 7 天档案", Icon: ReportIcon, page: "report" },
  ];

  return (
    <main className="page">
      <PageHeader
        action={
          <div className="flex items-center gap-1 rounded-full border border-[#2D215F]/10 bg-white px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0388A6]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#2D215F]/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#2D215F]/30" />
          </div>
        }
        subtitle="患者支持 · 用药管理 · 就医沟通"
        title="卫眠伴行"
      />

      <section className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(140deg,#2D215F_0%,#BF046B_58%,#BF047E_100%)] px-5 pb-6 pt-5 text-white shadow-[0_20px_45px_rgba(191,4,107,0.24)]">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[24px] border-[#F2AEDB]/15" />
        <div className="absolute -bottom-6 right-8 h-16 w-32 rotate-[-18deg] rounded-full border border-white/15 bg-white/8" />
        <div className="relative">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em]">
            好眠档案
          </span>
          <h2 className="mt-4 max-w-[292px] text-[27px] font-black leading-[1.22] tracking-[-0.05em]">
            把“我睡不好”，
            <br />
            变成医生看得懂的
            <br />
            睡眠档案。
          </h2>
          <p className="mt-3 max-w-[290px] text-[12px] leading-[1.7] text-white/72">
            连续记录睡眠、用药与身体感受，让每次复诊沟通更清楚。
          </p>
          <Button
            className="mt-5 !min-h-[44px] !rounded-[16px] !bg-white !px-4 !text-[#BF047E] !shadow-none"
            onClick={() => onNavigate("sleep")}
          >
            开始今日记录
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      </section>

      <Card className="relative mt-4 overflow-hidden border-0 bg-[#0388A6] p-4 text-white shadow-[0_14px_32px_rgba(3,136,166,0.18)]">
        <div className="absolute inset-y-0 right-0 w-28 pill-pattern opacity-50" />
        <div className="relative flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15">
            <ClockIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-[0.12em] text-white/65">今日用药提醒</p>
            <p className="mt-1 text-[18px] font-black tracking-[-0.03em]">
              今晚 {currentMedication.reminderTime} · 待打卡
            </p>
          </div>
          <button
            className="pressable rounded-full bg-white px-3 py-2 text-[11px] font-black text-[#0388A6]"
            onClick={() => onToast("已完成今晚用药打卡")}
            type="button"
          >
            打卡
          </button>
        </div>
      </Card>

      <section className="mt-7">
        <SectionTitle eyebrow="TODAY" title="今日睡眠概览" />
        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
          {sleepStats.map((stat) => (
            <Card className="p-4" key={stat.label}>
              <p className="text-[11px] font-semibold text-[#2D215F]/45">{stat.label}</p>
              <p
                className={`mt-2 text-[26px] font-black tracking-[-0.04em] ${
                  stat.tone === "medical" ? "text-[#0388A6]" : "text-[#BF047E]"
                }`}
              >
                {stat.value}
                {stat.unit ? (
                  <span className="ml-1 text-[11px] font-bold text-[#2D215F]/42">{stat.unit}</span>
                ) : null}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-4">
        <PatientSnapshotCard
          chips={[
            `复诊 ${patient.nextFollowUpOn}`,
            `本周完整度 ${reportSummary.completionRate}%`,
            `已记录不适 ${adverseRecords.length} 条`,
          ]}
          summary={patient.sleepSummary}
          title="当前档案焦点"
        />
      </div>

      <section className="mt-7">
        <SectionTitle eyebrow="QUICK ACCESS" title="快速记录" />
        <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
          {quickActions.map(({ label, sub, Icon, page }, index) => (
            <button
              className={`card pressable flex min-h-[112px] items-start gap-3 rounded-[22px] p-4 text-left ${
                index === 0 ? "border-[#BF047E]/15 bg-[#F2AEDB]/18" : ""
              }`}
              key={label}
              onClick={() => onNavigate(page)}
              type="button"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${
                  index % 2 === 0
                    ? "bg-[#F2AEDB]/40 text-[#BF047E]"
                    : "bg-[#0388A6]/10 text-[#0388A6]"
                }`}
              >
                <Icon size={20} />
              </span>
              <span>
                <strong className="block text-sm font-black text-[#2D215F]">{label}</strong>
                <small className="mt-1.5 block text-[10px] leading-relaxed text-[#2D215F]/42">
                  {sub}
                </small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <SectionTitle
          action={<span className="text-[11px] font-bold text-[#0388A6]">平均 6.2 小时</span>}
          eyebrow="7-DAY TREND"
          title="本周趋势"
        />
        <Card className="p-4">
          <TrendChart />
        </Card>
      </section>

      <ComplianceNote>
        本工具仅用于记录、提醒与就医沟通参考，不提供诊断、处方推荐或疗效判断。
      </ComplianceNote>
    </main>
  );
}
