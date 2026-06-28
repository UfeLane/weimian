import {
  CheckIcon,
  DownloadIcon,
  ReportIcon,
  UserDoctorIcon,
} from "../components/Icons";
import {
  Button,
  Card,
  ComplianceNote,
  PageHeader,
  SectionTitle,
} from "../components/UI";

function WakeTrend() {
  const bars = [42, 58, 36, 74, 50, 31, 45];
  return (
    <div className="flex h-24 items-end justify-between gap-2">
      {bars.map((height, index) => (
        <div className="flex flex-1 flex-col items-center gap-2" key={`${height}-${index}`}>
          <div
            className={`w-full rounded-full ${
              index === bars.length - 1 ? "bg-[#BF047E]" : "bg-[#0388A6]"
            }`}
            style={{ height }}
          />
          <span className="text-[9px] font-bold text-[#2D215F]/35">
            {["一", "二", "三", "四", "五", "六", "日"][index]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ReportPage({ demoRuntime, onNavigate, onToast }) {
  const { adverseRecords, patient, reportSummary } = demoRuntime;
  return (
    <main className="page">
      <PageHeader subtitle={reportSummary.periodLabel} title="好眠档案报告" />

      <section className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(145deg,#2D215F_0%,#0388A6_100%)] px-5 pb-6 pt-5 text-white shadow-[0_20px_44px_rgba(45,33,95,0.22)]">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[28px] border-[#F2AEDB]/10" />
        <div className="relative">
          <span className="grid h-12 w-12 place-items-center rounded-[18px] bg-white/12">
            <ReportIcon size={24} />
          </span>
          <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-white/55">WEEKLY SUMMARY</p>
          <h2 className="mt-2 text-[28px] font-black tracking-[-0.05em]">
            本周记录完整度 {reportSummary.completionRate}%
          </h2>
          <p className="mt-2 text-[12px] leading-[1.7] text-white/68">
            已连续记录 6 天，可用于复诊时快速回顾睡眠、用药与不适情况。
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/12">
            <div
              className="h-full rounded-full bg-[#F2AEDB]"
              style={{ width: `${reportSummary.completionRate}%` }}
            />
          </div>
        </div>
      </section>

      <section className="mt-7">
        <SectionTitle eyebrow="KEY DATA" title="最近 7 天关键数据" />
        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
          <Card className="p-4">
            <p className="text-[10px] font-semibold leading-relaxed text-[#2D215F]/45">
              平均入睡耗时
            </p>
            <p className="mt-2 text-[27px] font-black text-[#BF047E]">
              {reportSummary.averageSleepLatency}
              <span className="ml-1 text-[10px] text-[#2D215F]/40">分钟</span>
            </p>
            <span className="mt-2 inline-flex rounded-full bg-[#F2AEDB]/28 px-2 py-1 text-[9px] font-bold text-[#BF046B]">
              较上周 -6 分钟
            </span>
          </Card>
          <Card className="p-4">
            <p className="text-[10px] font-semibold leading-relaxed text-[#2D215F]/45">
              平均睡眠时长
            </p>
            <p className="mt-2 text-[27px] font-black text-[#0388A6]">
              {reportSummary.averageSleepHours}
              <span className="ml-1 text-[10px] text-[#2D215F]/40">小时</span>
            </p>
            <span className="mt-2 inline-flex rounded-full bg-[#0388A6]/9 px-2 py-1 text-[9px] font-bold text-[#0388A6]">
              记录 6 / 7 天
            </span>
          </Card>
        </div>
      </section>

      <section className="mt-7">
        <SectionTitle
          action={
            <span className="text-[11px] font-bold text-[#0388A6]">
              平均 {reportSummary.averageWakeups} 次
            </span>
          }
          eyebrow="WAKE TREND"
          title="夜间醒来次数"
        />
        <Card className="p-5">
          <WakeTrend />
        </Card>
      </section>

      <section className="mt-7">
        <SectionTitle eyebrow="MEDICATION" title="用药与不适摘要" />
        <Card className="divide-y divide-[#2D215F]/7 overflow-hidden">
          <div className="flex items-center gap-4 p-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0388A6]/10 text-[#0388A6]">
              <CheckIcon />
            </span>
            <div className="flex-1">
              <p className="text-sm font-black text-[#2D215F]">用药打卡 {reportSummary.medicationCheckIns}</p>
              <p className="mt-1 text-[10px] text-[#2D215F]/45">{reportSummary.missedDoseNote}</p>
            </div>
            <span className="text-lg font-black text-[#0388A6]">{reportSummary.completionRate}%</span>
          </div>
          <div className="flex items-center gap-4 p-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F2AEDB]/32 text-[#BF047E]">
              <span className="text-base font-black">!</span>
            </span>
            <div className="flex-1">
              <p className="text-sm font-black text-[#2D215F]">不适记录 {adverseRecords.length} 条</p>
              <p className="mt-1 text-[10px] text-[#2D215F]/45">
                {reportSummary.adverseRecordSummary}
              </p>
            </div>
            <span className="rounded-full bg-[#F2AEDB]/25 px-2.5 py-1 text-[9px] font-bold text-[#BF046B]">
              待沟通
            </span>
          </div>
        </Card>
        <Button className="mt-3 w-full" onClick={() => onNavigate("adverse")} variant="soft">
          记录不适
        </Button>
      </section>

      <section className="mt-7">
        <SectionTitle eyebrow="VISIT CHECKLIST" title="复诊沟通问题清单" />
        <Card className="space-y-4 p-5">
          {patient.visitQuestions.map((item, index) => (
            <div className="flex gap-3" key={item}>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F2AEDB]/32 text-[10px] font-black text-[#BF047E]">
                {index + 1}
              </span>
              <p className="text-xs font-semibold leading-relaxed text-[#2D215F]/72">{item}</p>
            </div>
          ))}
        </Card>
      </section>

      <div className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
        <Button onClick={() => onToast("Demo 报告已准备导出")} variant="outline">
          <DownloadIcon size={18} />
          导出报告
        </Button>
        <Button onClick={() => onToast("已切换为复诊展示模式")} variant="medical">
          <UserDoctorIcon size={18} />
          给医生看
        </Button>
      </div>

      <ComplianceNote>
        本报告仅作为就医沟通参考，不作为诊断或疗效评价依据。
      </ComplianceNote>
    </main>
  );
}
