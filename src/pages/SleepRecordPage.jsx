import { useState } from "react";
import { CheckIcon } from "../components/Icons";
import {
  Button,
  Card,
  Chip,
  FormField,
  Input,
  PageHeader,
  SectionTitle,
} from "../components/UI";

const factors = ["咖啡因", "酒精", "午睡", "屏幕使用", "压力"];

export default function SleepRecordPage({ onBack, onSaved }) {
  const [selectedFactors, setSelectedFactors] = useState(["屏幕使用"]);
  const [energy, setEnergy] = useState("一般");
  const [saved, setSaved] = useState(false);

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
    onSaved();
  };

  return (
    <main className="page">
      <PageHeader
        onBack={onBack}
        subtitle="建立连续、清晰的睡眠档案"
        title="记录昨夜睡眠"
      />

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

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card className="space-y-5 p-5">
          <SectionTitle eyebrow="TIME" title="睡眠时间" />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="上床时间">
              <Input defaultValue="23:20" type="time" />
            </FormField>
            <FormField label="起床时间">
              <Input defaultValue="06:50" type="time" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="入睡耗时">
              <div className="relative">
                <Input defaultValue="45" min="0" type="number" />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#2D215F]/40">
                  分钟
                </span>
              </div>
            </FormField>
            <FormField label="夜间醒来">
              <div className="relative">
                <Input defaultValue="2" min="0" type="number" />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#2D215F]/40">
                  次
                </span>
              </div>
            </FormField>
          </div>
          <FormField hint="估算即可" label="总睡眠时长">
            <div className="relative">
              <Input defaultValue="6.2" min="0" step="0.1" type="number" />
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

        <Button className="w-full" type="submit">
          保存到好眠档案
        </Button>
      </form>
    </main>
  );
}
