import { useState } from "react";
import { AlertIcon, CheckIcon } from "../components/Icons";
import {
  Button,
  Card,
  Chip,
  FormField,
  Input,
  PageHeader,
  SectionTitle,
} from "../components/UI";

const symptomOptions = ["头晕", "嗜睡", "恶心", "疲惫", "其他"];

export default function AdverseRecordPage({ onBack, onSaved }) {
  const [symptoms, setSymptoms] = useState(["嗜睡"]);
  const [severity, setSeverity] = useState("轻微");
  const [impact, setImpact] = useState("否");
  const [saved, setSaved] = useState(false);

  const toggleSymptom = (symptom) => {
    setSymptoms((current) =>
      current.includes(symptom)
        ? current.filter((item) => item !== symptom)
        : [...current, symptom],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(true);
    onSaved();
  };

  return (
    <main className="page">
      <PageHeader onBack={onBack} subtitle="只记录感受，不判断原因" title="不适记录" />

      <div className="mb-6 flex gap-3 rounded-[24px] border border-[#0388A6]/12 bg-[#0388A6]/7 p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#0388A6] text-white">
          <AlertIcon size={19} />
        </span>
        <div>
          <p className="text-xs font-black text-[#2D215F]">帮助复诊时更完整地描述情况</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#2D215F]/55">
            本页面不会判断不适是否由药物导致。
          </p>
        </div>
      </div>

      {saved ? (
        <Card className="mb-5 border-[#0388A6]/15 bg-[#0388A6]/7 p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0388A6] text-white">
              <CheckIcon size={20} />
            </span>
            <div>
              <h2 className="text-sm font-black text-[#2D215F]">记录已保存</h2>
              <p className="mt-1 text-[10px] text-[#2D215F]/50">已同步到本周好眠档案摘要</p>
            </div>
          </div>
        </Card>
      ) : null}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card className="p-5">
          <SectionTitle eyebrow="SYMPTOM" title="不适类型" />
          <div className="flex flex-wrap gap-2">
            {symptomOptions.map((symptom) => (
              <Chip
                active={symptoms.includes(symptom)}
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </Chip>
            ))}
          </div>
        </Card>

        <Card className="space-y-5 p-5">
          <SectionTitle eyebrow="DETAIL" title="发生情况" />
          <FormField label="严重程度">
            <div className="grid grid-cols-3 gap-2">
              {["轻微", "中等", "明显"].map((item) => (
                <Chip active={severity === item} key={item} onClick={() => setSeverity(item)}>
                  {item}
                </Chip>
              ))}
            </div>
          </FormField>
          <FormField label="发生时间">
            <Input defaultValue="10:30" type="time" />
          </FormField>
          <FormField label="是否影响日间活动">
            <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
              {["否", "是"].map((item) => (
                <Chip active={impact === item} key={item} onClick={() => setImpact(item)}>
                  {item}
                </Chip>
              ))}
            </div>
          </FormField>
          <FormField hint="选填" label="补充描述">
            <textarea
              className="min-h-28 w-full resize-none rounded-[20px] border border-[#2D215F]/10 bg-[#F2F2F2] p-4 text-sm leading-relaxed text-[#2D215F] outline-none transition placeholder:text-[#2D215F]/28 focus:border-[#0388A6]/50 focus:bg-white"
              placeholder="例如：上午起床后感到困倦，午后有所缓解……"
            />
          </FormField>
        </Card>

        <div className="rounded-[24px] border border-[#0388A6]/10 bg-white/82 px-4 py-3 text-[11px] leading-[1.7] text-[#2D215F]/58 shadow-[0_10px_24px_rgba(45,33,95,0.04)]">
          建议把发生时间、持续多久、是否影响白天活动一起记录，复诊沟通会更清楚。
        </div>

        <Button className="w-full" type="submit">
          保存不适记录
        </Button>
      </form>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-[#2D215F]/50">
        若症状明显、持续或令你担心，
        <br />
        请及时咨询医生或药师。
      </p>
    </main>
  );
}
