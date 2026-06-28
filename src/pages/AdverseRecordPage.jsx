import { useState } from "react";
import { AlertIcon, CheckIcon } from "../components/Icons";
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

const medicationSymptomOptions = ["嗜睡", "头晕", "恶心", "疲惫", "其他"];
const reportSymptomOptions = ["头晕", "嗜睡", "夜醒增多", "疲惫", "其他"];

export default function AdverseRecordPage({ demoRuntime, onBack, onSaved, pageContext }) {
  const mode = pageContext?.mode === "medication" ? "medication" : "report";
  const symptomOptions = mode === "medication" ? medicationSymptomOptions : reportSymptomOptions;
  const [symptoms, setSymptoms] = useState([symptomOptions[0]]);
  const [severity, setSeverity] = useState("轻微");
  const [impact, setImpact] = useState("否");
  const [saved, setSaved] = useState(false);
  const [time, setTime] = useState("10:30");
  const [note, setNote] = useState("");
  const { adverseRecords, currentMedication } = demoRuntime;

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
    onSaved({
      date: "2026.06.24",
      symptom: symptoms[0] ?? "其他",
      severity,
      impact: impact === "是" ? "影响白天活动" : "未明显影响白天活动",
      note: note || `记录时间 ${time}，主要感受为 ${symptoms.join("、")}。`,
    });
  };

  const copy =
    mode === "medication"
      ? {
          title: "用药反馈",
          subtitle: "记录服药后的感受，不直接判断原因",
          summary: "这页记录会进入用药记录视图，并同步到好眠档案周摘要，方便复诊时一起回看。",
          syncTitle: "记录会同步到哪里",
          tipTitle: "帮助回顾服药后的真实感受",
          tipBody: "可记录嗜睡、头晕、恶心、疲惫或漏服后的主观感受。",
          recentTitle: "最近用药反馈",
          symptomTitle: "反馈类型",
          detailTitle: "发生情况",
          notePlaceholder: "例如：昨晚服药后今早起床更困，上午开会时注意力下降……",
          footer: "建议把发生时间、持续多久、是否影响白天活动一起记录，复诊沟通会更清楚。",
          saveButton: "保存用药反馈",
          savedNote: "已同步到用药记录与本周好眠档案摘要",
        }
      : {
          title: "身体感受记录",
          subtitle: "只记录感受，不判断原因",
          summary: "这页记录会进入本周好眠档案摘要，并作为复诊沟通问题的一部分。",
          syncTitle: "记录会同步到哪里",
          tipTitle: "帮助复诊时更完整地描述情况",
          tipBody: "本页面不会判断不适是否由药物导致。",
          recentTitle: "最近已记录的不适",
          symptomTitle: "不适类型",
          detailTitle: "发生情况",
          notePlaceholder: "例如：上午起床后感到困倦，午后有所缓解……",
          footer: "建议把发生时间、持续多久、是否影响白天活动一起记录，复诊沟通会更清楚。",
          saveButton: "保存不适记录",
          savedNote: "已同步到本周好眠档案摘要",
        };

  return (
    <main className="page">
      <PageHeader onBack={onBack} subtitle={copy.subtitle} title={copy.title} />

      <div className="mb-4">
        <PatientSnapshotCard
          accent="medical"
          chips={[
            `当前药品 ${currentMedication.name}`,
            `提醒 ${currentMedication.reminderTime}`,
            `已记录不适 ${adverseRecords.length} 条`,
          ]}
          summary={copy.summary}
          title={copy.syncTitle}
        />
      </div>

      <div className="mb-6 flex gap-3 rounded-[24px] border border-[#0388A6]/12 bg-[#0388A6]/7 p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#0388A6] text-white">
          <AlertIcon size={19} />
        </span>
        <div>
          <p className="text-xs font-black text-[#2D215F]">{copy.tipTitle}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#2D215F]/55">
            {copy.tipBody}
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
              <p className="mt-1 text-[10px] text-[#2D215F]/50">{copy.savedNote}</p>
            </div>
          </div>
        </Card>
      ) : null}

      <section className="mb-6">
        <Card className="p-4">
          <SectionTitle eyebrow="RECENT RECORDS" title={copy.recentTitle} />
          <TimelineList
            items={adverseRecords.map((item) => ({
              id: `${item.date}-${item.symptom}`,
              title: `${item.date} · ${item.symptom}`,
              meta: item.severity,
              body: `${item.note} 影响：${item.impact}。`,
            }))}
          />
        </Card>
      </section>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card className="p-5">
          <SectionTitle eyebrow="SYMPTOM" title={copy.symptomTitle} />
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
          <SectionTitle eyebrow="DETAIL" title={copy.detailTitle} />
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
            <Input onChange={(event) => setTime(event.target.value)} type="time" value={time} />
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
              onChange={(event) => setNote(event.target.value)}
              placeholder={copy.notePlaceholder}
              value={note}
            />
          </FormField>
        </Card>

        <div className="rounded-[24px] border border-[#0388A6]/10 bg-white/82 px-4 py-3 text-[11px] leading-[1.7] text-[#2D215F]/58 shadow-[0_10px_24px_rgba(45,33,95,0.04)]">
          {copy.footer}
        </div>

        <Button className="w-full" type="submit">
          {copy.saveButton}
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
