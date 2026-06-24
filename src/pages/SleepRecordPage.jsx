import { useState } from "react";
import { CheckIcon } from "../components/Icons";
import {
  Button,
  Card,
  Chip,
  FormField,
  Input,
  PageHeader,
  PatientSnapshotCard,
  SectionTitle,
  TimelineList,
} from "../components/UI";

const factors = ["咖啡因", "酒精", "午睡", "屏幕使用", "压力"];

export default function SleepRecordPage({ demoRuntime, onBack, onSaved }) {
  const [selectedFactors, setSelectedFactors] = useState(["屏幕使用"]);
  const [energy, setEnergy] = useState("一般");
  const [saved, setSaved] = useState(false);
  const [bedtime, setBedtime] = useState("23:20");
  const [wakeTime, setWakeTime] = useState("06:50");
  const [sleepLatency, setSleepLatency] = useState("45");
  const [awakenings, setAwakenings] = useState("2");
  const [sleepHours, setSleepHours] = useState("6.2");
  const { currentMedication, patient, sleepDiaryHighlights } = demoRuntime;

  const toggleFactor = (factor) => {
    setSelectedFactors((current) =>
      current.includes(factor)
        ? current.filter((item) => item !== factor)
        : [...current, factor],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(true);
    onSaved({
      date: "2026.06.24",
      bedtime,
      sleepLatency: `${sleepLatency} 分钟`,
      sleepLatencyMinutes: Number(sleepLatency),
      awakenings: Number(awakenings),
      wakeTime,
      totalSleepHours: Number(sleepHours),
      daytimeState: energy === "较差" ? "白天状态较差" : energy === "较好" ? "精神较好" : "精神一般",
      factors: selectedFactors,
    });
  };

  return (
    <main className="page">
      <PageHeader
        onBack={onBack}
        subtitle="建立连续、清晰的睡眠档案"
        title="记录昨夜睡眠"
      />

      <div className="mb-4">
        <PatientSnapshotCard
          accent="medical"
          chips={[
            `当前周期 ${currentMedication.cycleDays} 天`,
            `今晚 ${currentMedication.reminderTime} 用药`,
            `复诊 ${patient.nextFollowUpOn}`,
          ]}
          summary={patient.sleepSummary}
          title="当前档案背景"
        />
      </div>

      <div className="mb-6 rounded-[24px] border border-[#BF047E]/10 bg-[#F2AEDB]/22 p-4">
        <p className="text-xs font-bold text-[#BF047E]">记录建议</p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-[#2D215F]/60">
          不必追求分钟级精确，尽量在起床后回忆并保持连续记录。
        </p>
      </div>

      {saved ? (
        <Card className="mb-5 border-[#0388A6]/15 bg-[#0388A6]/7 p-5">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#0388A6] text-white">
            <CheckIcon />
          </span>
          <h2 className="mt-4 text-lg font-black text-[#2D215F]">已加入好眠档案</h2>
          <p className="mt-2 text-xs leading-relaxed text-[#2D215F]/60">
            连续记录可生成更完整的就医沟通报告。
          </p>
        </Card>
      ) : null}

      <section className="mb-6">
        <Card className="p-4">
          <SectionTitle eyebrow="LATEST LOG" title="最近两次睡眠记录" />
          <TimelineList
            items={sleepDiaryHighlights.slice(1).map((item) => ({
              id: item.date,
              title: `${item.date} · 上床 ${item.bedtime}`,
              meta: item.sleepLatency,
              body: `夜间醒来 ${item.awakenings} 次，起床 ${item.wakeTime}，白天状态：${item.daytimeState}。`,
            }))}
          />
        </Card>
      </section>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card className="space-y-5 p-5">
          <SectionTitle eyebrow="TIME" title="睡眠时间" />
          <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
            <FormField label="上床时间">
              <Input onChange={(event) => setBedtime(event.target.value)} type="time" value={bedtime} />
            </FormField>
            <FormField label="起床时间">
              <Input onChange={(event) => setWakeTime(event.target.value)} type="time" value={wakeTime} />
            </FormField>
          </div>
          <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
            <FormField label="入睡耗时">
              <div className="relative">
                <Input min="0" onChange={(event) => setSleepLatency(event.target.value)} type="number" value={sleepLatency} />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#2D215F]/40">
                  分钟
                </span>
              </div>
            </FormField>
            <FormField label="夜间醒来">
              <div className="relative">
                <Input min="0" onChange={(event) => setAwakenings(event.target.value)} type="number" value={awakenings} />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#2D215F]/40">
                  次
                </span>
              </div>
            </FormField>
          </div>
          <FormField hint="估算即可" label="总睡眠时长">
            <div className="relative">
              <Input min="0" onChange={(event) => setSleepHours(event.target.value)} step="0.1" type="number" value={sleepHours} />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#2D215F]/40">
                小时
              </span>
            </div>
          </FormField>
        </Card>

        <Card className="p-5">
          <SectionTitle eyebrow="DAYTIME" title="日间精神状态" />
          <div className="grid grid-cols-3 gap-2">
            {["较差", "一般", "较好"].map((item) => (
              <Chip active={energy === item} key={item} onClick={() => setEnergy(item)}>
                {item}
              </Chip>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle eyebrow="FACTORS" title="可能影响因素" />
          <div className="flex flex-wrap gap-2">
            {factors.map((factor) => (
              <Chip
                active={selectedFactors.includes(factor)}
                key={factor}
                onClick={() => toggleFactor(factor)}
              >
                {factor}
              </Chip>
            ))}
          </div>
        </Card>

        <div className="rounded-[24px] border border-[#2D215F]/8 bg-white/80 px-4 py-3 text-[11px] leading-[1.7] text-[#2D215F]/58 shadow-[0_10px_24px_rgba(45,33,95,0.04)]">
          连续记录 7 至 14 天，生成的好眠档案会更适合复诊时展示给医生。
        </div>

        <Button className="w-full" type="submit">
          保存到好眠档案
        </Button>
      </form>
    </main>
  );
}
