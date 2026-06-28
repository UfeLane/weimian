import { useEffect, useRef, useState } from "react";
import {
  followupFaqs,
  medicationFaqs,
  personalFaqs,
  qaSuggestedPrompts,
  sleepFaqs,
} from "../data";
import { askDemoQa, getQaModePreset } from "../lib/qa";
import { ChevronRightIcon, PillIcon } from "../components/Icons";
import {
  Button,
  Card,
  Chip,
  ComplianceNote,
  Input,
  PageHeader,
  PatientSnapshotCard,
  SectionTitle,
} from "../components/UI";

const categoryMap = {
  sleep: {
    title: "睡眠知识",
    description: "失眠定义、睡眠习惯、睡眠日记和长期管理",
    items: sleepFaqs,
  },
  medication: {
    title: "达卫可标签",
    description: "适应症、剂量、服用时机、风险提示和安全边界",
    items: medicationFaqs,
  },
  profile: {
    title: "用户档案",
    description: "当前周期、余量、提醒时间、有效期和近期睡眠摘要",
    items: personalFaqs,
  },
  followup: {
    title: "复诊准备",
    description: "复诊前要带什么、期间何时联系医生、该问什么",
    items: followupFaqs,
  },
};

const resultFollowups = [
  "我最近睡得怎么样？",
  "达卫可应该在什么时间吃？",
  "复诊前应该准备什么？",
];

export default function FAQPage({ demoRuntime, initialPrompt, onQaModeChange, qaMode }) {
  const [tab, setTab] = useState("sleep");
  const [openIndex, setOpenIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [qaResult, setQaResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const handledPromptRef = useRef("");
  const { currentMedication, patient } = demoRuntime;
  const qaPreset = getQaModePreset(qaMode);
  const activeCategory = categoryMap[tab];
  const faqs = activeCategory.items;
  const browseTabs = [
    { id: "sleep", title: "睡眠知识" },
    { id: "medication", title: "达卫可标签" },
    { id: "profile", title: "用户档案" },
    { id: "followup", title: "复诊准备" },
  ];

  const submitQuestion = async (nextQuery) => {
    if (!nextQuery.trim()) return;
    setQuery(nextQuery);
    setLoading(true);
    const result = await askDemoQa(nextQuery, demoRuntime, { modeOverride: qaMode });
    setQaResult(result);
    setLoading(false);
  };

  useEffect(() => {
    const nextQuery = initialPrompt?.query?.trim();
    if (!nextQuery) return;
    if (handledPromptRef.current === `${nextQuery}:${Boolean(initialPrompt?.autoAsk)}`) return;

    handledPromptRef.current = `${nextQuery}:${Boolean(initialPrompt?.autoAsk)}`;
    setQuery(nextQuery);

    if (initialPrompt?.autoAsk) {
      void submitQuestion(nextQuery);
    }
  }, [initialPrompt]);

  return (
    <main className="page">
      <PageHeader subtitle="本地知识库 + 当前档案联动演示" title="问问小眠医生" />

      <section className="relative overflow-hidden rounded-[28px] border border-[#0388A6]/12 bg-[linear-gradient(145deg,rgba(3,136,166,0.12),rgba(45,33,95,0.08))] p-5">
        <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full border-[16px] border-[#0388A6]/8" />
        <div className="absolute bottom-0 right-4 h-14 w-14 rounded-full bg-[#BF047E]/8 blur-2xl" />
        <div className="flex items-start gap-4">
          <span className="relative grid h-[74px] w-[50px] shrink-0 place-items-center rounded-full bg-[linear-gradient(180deg,#F2AEDB_0%,#FFFFFF_44%,#0388A6_100%)] shadow-[0_12px_28px_rgba(45,33,95,0.12)]">
            <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-white text-[10px] font-black text-[#0388A6]">
              +
            </span>
            <span className="absolute top-[22px] flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2D215F]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#2D215F]" />
            </span>
            <span className="absolute top-[36px] h-2 w-4 rounded-b-full border-b-[2px] border-[#2D215F]" />
            <span className="absolute bottom-[15px] left-[8px] h-2.5 w-2.5 rounded-full bg-[#F2AEDB]" />
            <span className="absolute bottom-[15px] right-[8px] h-2.5 w-2.5 rounded-full bg-[#F2AEDB]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">AI DOCTOR</p>
            <h2 className="mt-2 text-[20px] font-black tracking-[-0.04em] text-[#2D215F]">
              把外部知识和你的档案一起回答
            </h2>
            <p className="mt-2 text-[11px] leading-[1.8] text-[#2D215F]/60">
              可以直接问睡眠知识、达卫可标签、你的当前周期、余量、复诊时间和近期记录。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/88 px-3 py-2 text-[10px] font-bold text-[#0388A6]">
                当前模式：{qaPreset.label}
              </span>
              <span className="rounded-full bg-white/88 px-3 py-2 text-[10px] font-bold text-[#BF047E]">
                外部知识 + 内部档案
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["local", "remote"].map((mode) => (
                <Chip active={qaMode === mode} key={mode} onClick={() => onQaModeChange(mode)}>
                  {mode === "local" ? "本地知识库" : "远程小模型"}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5">
        <PatientSnapshotCard
          action={
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#F2AEDB]/30 text-[#BF047E]">
              <PillIcon size={22} />
            </span>
          }
          chips={[
            `今晚 ${currentMedication.reminderTime} 用药`,
            `当前周期 ${currentMedication.cycleDays} 天`,
            `已用 ${currentMedication.usedTablets} 片`,
            `余量 ${currentMedication.remainingTablets} 片`,
            `复诊 ${patient.nextFollowUpOn}`,
          ]}
          summary={`${patient.displayName} · ${patient.sleepSummary}`}
        />
      </div>

      <Card className="mt-4 p-4">
        <p className="text-[10px] font-bold tracking-[0.12em] text-[#BF047E]">ASK NOW</p>
        <h3 className="mt-2 text-[16px] font-black text-[#2D215F]">现在就可以开始提问</h3>
        <p className="mt-2 text-[11px] leading-[1.8] text-[#2D215F]/58">
          适合演示“外部知识 + 内部数据”的回答模式。{qaPreset.detail}
        </p>
        <p className="mt-2 text-[10px] leading-[1.7] text-[#2D215F]/45">{qaPreset.helper}</p>
        <div className="mt-4 flex gap-2">
          <Input
            className="flex-1"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：达卫可应该在什么时间吃？我下次复诊要准备什么？"
            value={query}
          />
          <Button className="shrink-0 !px-4" onClick={() => submitQuestion(query)}>
            {loading ? "思考中" : "提问"}
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {qaSuggestedPrompts.map((prompt) => (
            <button
              className="pressable rounded-full bg-[#F2F2F2] px-3 py-2 text-[10px] font-bold text-[#2D215F]/62"
              key={prompt}
              onClick={() => submitQuestion(prompt)}
              type="button"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-[18px] border border-[#2D215F]/8 bg-white px-4 py-3">
          <p className="text-[10px] font-bold tracking-[0.12em] text-[#2D215F]/45">当前配置说明</p>
          <p className="mt-1 text-[11px] leading-[1.8] text-[#2D215F]/62">
            {qaPreset.mode === "local"
              ? "当前演示会稳定使用本地知识包回答，适合提报和离线演示。后续只要配置 OPENAI_API_KEY，并把 VITE_QA_MODE 切到 remote，就可以接入远程小模型。"
              : "当前演示已配置为远程小模型模式；如果接口暂时不可用，系统会自动回退到本地知识库，保证演示不中断。"}
          </p>
        </div>
      </Card>

      {qaResult ? (
        <Card className="mt-4 border-[#0388A6]/14 bg-white/92 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-[#BF047E]">DEMO ANSWER</p>
              <p className="mt-2 text-[10px] font-semibold text-[#0388A6]">
                模式：
                {qaResult.mode === "remote"
                  ? "真实模型"
                  : qaResult.mode === "local-fallback"
                    ? "模型失败，已回退本地知识库"
                    : "本地知识库"}
              </p>
            </div>
            <span className="rounded-full bg-[#0388A6]/10 px-3 py-2 text-[10px] font-bold text-[#0388A6]">
              {qaResult.sources.length} 条来源
            </span>
          </div>
          <div className="mt-4 rounded-[22px] bg-[#F2F2F2] p-4">
            <p className="text-[10px] font-bold tracking-[0.12em] text-[#2D215F]/38">你的问题</p>
            <p className="mt-2 text-[13px] font-black text-[#2D215F]">{query}</p>
            <p className="mt-4 text-[13px] leading-[1.9] text-[#2D215F]/72">{qaResult.answer}</p>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">继续追问</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {resultFollowups.map((item) => (
                <button
                  className="pressable rounded-full border border-[#2D215F]/8 bg-white px-3 py-2 text-[10px] font-bold text-[#2D215F]/62"
                  key={item}
                  onClick={() => submitQuestion(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {qaResult.sources.length ? (
            <div className="mt-4 space-y-2">
              <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">回答来源</p>
              {qaResult.sources.map((item) => (
                <div className="rounded-[18px] bg-[#F2F2F2] p-3" key={item.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold text-[#2D215F]">{item.question}</p>
                      <p className="mt-1 text-[10px] leading-[1.7] text-[#2D215F]/52">{item.answer}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold ${
                        item.category === "profile"
                          ? "bg-[#F2AEDB]/28 text-[#BF047E]"
                          : item.category === "followup"
                            ? "bg-[#0388A6]/10 text-[#0388A6]"
                            : "bg-white text-[#2D215F]/58"
                      }`}
                    >
                      {item.category === "sleep"
                        ? "睡眠"
                        : item.category === "medication"
                          ? "达卫可"
                          : item.category === "profile"
                            ? "档案"
                            : "复诊"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[10px] text-[#2D215F]/48">{item.source.shortLabel}</span>
                    <a
                      className="text-[10px] font-bold text-[#BF047E]"
                      href={item.source.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      查看来源
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </Card>
      ) : (
        <Card className="mt-4 border-dashed border-[#2D215F]/12 bg-white/72 p-4">
          <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">常见问题</p>
          <p className="mt-2 text-[12px] leading-[1.8] text-[#2D215F]/60">
            可以先从达卫可标签、当前周期、余量和复诊时间这几类问题开始。
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 min-[390px]:grid-cols-2">
            <button
              className="pressable rounded-[18px] bg-[#F2F2F2] px-4 py-3 text-left"
              onClick={() => submitQuestion("达卫可应该在什么时间吃？")}
              type="button"
            >
              <p className="text-[11px] font-bold text-[#2D215F]">先问外部知识</p>
              <p className="mt-1 text-[10px] text-[#2D215F]/48">达卫可应该在什么时间吃？</p>
            </button>
            <button
              className="pressable rounded-[18px] bg-[#F2F2F2] px-4 py-3 text-left"
              onClick={() => submitQuestion("我的下一次复诊时间和关注点是什么？")}
              type="button"
            >
              <p className="text-[11px] font-bold text-[#2D215F]">再问内部档案</p>
              <p className="mt-1 text-[10px] text-[#2D215F]/48">我的下一次复诊时间和关注点是什么？</p>
            </button>
          </div>
        </Card>
      )}

      <section className="mt-6">
        <SectionTitle eyebrow="BROWSE" title={activeCategory.title} />
        <p className="text-[11px] leading-[1.8] text-[#2D215F]/55">{activeCategory.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {browseTabs.map((item) => (
            <Chip
              active={tab === item.id}
              key={item.id}
              onClick={() => {
                setTab(item.id);
                setOpenIndex(0);
              }}
            >
              {item.title}
            </Chip>
          ))}
        </div>
        <div className="mt-5 space-y-3">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <Card
                className={`overflow-hidden transition ${
                  item.safety ? "border-[#BF047E]/18" : ""
                }`}
                key={item.question}
              >
                <button
                  className="pressable flex w-full items-center gap-3 p-4 text-left"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  type="button"
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-black ${
                      item.safety
                        ? "bg-[#F2AEDB]/32 text-[#BF047E]"
                        : tab === "followup"
                          ? "bg-[#0388A6]/10 text-[#0388A6]"
                          : "bg-[#F2F2F2] text-[#2D215F]/58"
                    }`}
                  >
                    Q
                  </span>
                  <span className="flex-1 text-[13px] font-black text-[#2D215F]">
                    {item.question}
                  </span>
                  <span className="hidden rounded-full bg-[#F2F2F2] px-2 py-1 text-[9px] font-bold text-[#2D215F]/45 min-[400px]:inline-flex">
                    {item.source.shortLabel}
                  </span>
                  <ChevronRightIcon
                    className={`text-[#2D215F]/30 transition-transform ${open ? "rotate-90" : ""}`}
                    size={17}
                  />
                </button>
                {open ? (
                  <div className="border-t border-[#2D215F]/7 px-5 pb-5 pt-4">
                    <div
                      className={`rounded-2xl p-4 ${
                        item.safety ? "bg-[#F2AEDB]/20" : "bg-[#F2F2F2]"
                      }`}
                    >
                      <p className="text-xs font-medium leading-[1.8] text-[#2D215F]/68">
                        {item.answer}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <a
                          className="inline-flex text-[10px] font-bold text-[#0388A6]"
                          href={item.source.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          来源：{item.source.shortLabel}
                        </a>
                        <button
                          className="pressable text-[10px] font-bold text-[#BF047E]"
                          onClick={() => submitQuestion(item.question)}
                          type="button"
                        >
                          直接提这个问题
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      </section>

      <ComplianceNote>
        问答页中的睡眠知识、达卫可标签摘要、复诊建议和当前档案回答仅用于演示知识检索与记录能力，不替代医生、药师或当地正式说明书。
      </ComplianceNote>
    </main>
  );
}
