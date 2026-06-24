import { useState } from "react";
import {
  followupFaqs,
  medicationFaqs,
  medicationProfile,
  personalFaqs,
  qaKnowledgeOverview,
  qaSuggestedPrompts,
  sleepFaqs,
} from "../data";
import { askDemoQa } from "../lib/qa";
import { ChatIcon, ChevronRightIcon, ClockIcon, PillIcon, UserDoctorIcon } from "../components/Icons";
import {
  Button,
  Card,
  Chip,
  ComplianceNote,
  Input,
  PageHeader,
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

export default function FAQPage() {
  const [tab, setTab] = useState("sleep");
  const [openIndex, setOpenIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [qaResult, setQaResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const activeCategory = categoryMap[tab];
  const faqs = activeCategory.items;

  const submitQuestion = async (nextQuery) => {
    if (!nextQuery.trim()) return;
    setQuery(nextQuery);
    setLoading(true);
    const result = await askDemoQa(nextQuery);
    setQaResult(result);
    setLoading(false);
  };

  return (
    <main className="page">
      <PageHeader subtitle="本地知识库 + 当前档案联动演示" title="知识问答" />

      <section className="relative overflow-hidden rounded-[28px] border border-[#0388A6]/12 bg-[linear-gradient(145deg,rgba(3,136,166,0.12),rgba(45,33,95,0.08))] p-5">
        <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full border-[16px] border-[#0388A6]/8" />
        <div className="absolute bottom-0 right-4 h-14 w-14 rounded-full bg-[#BF047E]/8 blur-2xl" />
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0388A6] text-white">
          <ChatIcon />
        </span>
        <h2 className="mt-4 text-[20px] font-black tracking-[-0.04em] text-[#2D215F]">
          把外部知识和个人档案放到同一个回答里
        </h2>
        <p className="mt-2 max-w-[310px] text-[11px] leading-[1.8] text-[#2D215F]/60">
          这个 Demo 会优先检索睡眠知识、达卫可公开标签和程序内的当前档案，用更接近真实产品的方式回答你的问题。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/82 px-3 py-2 text-[10px] font-bold text-[#0388A6]">
            本地知识包
          </span>
          <span className="rounded-full bg-white/82 px-3 py-2 text-[10px] font-bold text-[#BF047E]">
            复诊问题模板
          </span>
          <span className="rounded-full bg-white/82 px-3 py-2 text-[10px] font-bold text-[#2D215F]">
            当前用药档案
          </span>
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle eyebrow="KNOWLEDGE PACK" title="演示知识包总览" />
        <div className="grid grid-cols-2 gap-3">
          {qaKnowledgeOverview.map((item) => {
            const active = item.id === tab;
            const toneClass =
              item.tone === "brand"
                ? "bg-[#F2AEDB]/24 text-[#BF047E]"
                : "bg-[#0388A6]/10 text-[#0388A6]";
            return (
              <button
                className={`pressable rounded-[22px] border p-4 text-left ${
                  active
                    ? "border-[#BF047E]/18 bg-white shadow-[0_12px_28px_rgba(45,33,95,0.08)]"
                    : "border-[#2D215F]/7 bg-white/72"
                }`}
                key={item.id}
                onClick={() => {
                  setTab(item.id);
                  setOpenIndex(0);
                }}
                type="button"
              >
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold ${toneClass}`}>
                  {item.value}
                </span>
                <p className="mt-3 text-[14px] font-black text-[#2D215F]">{item.title}</p>
                <p className="mt-1 text-[10px] leading-[1.7] text-[#2D215F]/52">{item.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      <Card className="mt-6 border-[#BF047E]/10 bg-white/88 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.12em] text-[#BF047E]">当前档案快照</p>
            <h3 className="mt-2 text-[16px] font-black text-[#2D215F]">
              {medicationProfile.patient.displayName}
            </h3>
            <p className="mt-2 text-[11px] leading-[1.8] text-[#2D215F]/60">
              {medicationProfile.patient.sleepSummary}
            </p>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#F2AEDB]/30 text-[#BF047E]">
            <PillIcon size={22} />
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            `今晚 ${medicationProfile.currentMedication.reminderTime} 用药`,
            `当前周期 ${medicationProfile.currentMedication.cycleDays} 天`,
            `已用 ${medicationProfile.currentMedication.usedTablets} 片`,
            `余量 ${medicationProfile.currentMedication.remainingTablets} 片`,
            `复诊 ${medicationProfile.patient.nextFollowUpOn}`,
          ].map((item) => (
            <span
              className="rounded-full bg-[#F2AEDB]/26 px-3 py-2 text-[11px] font-semibold text-[#BF046B]"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </Card>

      <Card className="mt-4 p-4">
        <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">AI DEMO</p>
        <h3 className="mt-2 text-[16px] font-black text-[#2D215F]">像成品一样提问、追问、回看来源</h3>
        <p className="mt-2 text-[11px] leading-[1.8] text-[#2D215F]/58">
          适合演示“外部知识 + 内部数据”的回答模式。当前默认使用本地知识库，后面也可以平滑换成真实模型。
        </p>
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
          <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">演示建议</p>
          <p className="mt-2 text-[12px] leading-[1.8] text-[#2D215F]/60">
            先问一个公开知识问题，再追问一个内部档案问题，会最容易展示这个产品的差异化。
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
          {qaKnowledgeOverview.map((item) => (
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

      <section className="mt-6 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#0388A6]/10 text-[#0388A6]">
              <ClockIcon size={18} />
            </span>
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">目标</p>
              <p className="text-[12px] font-black text-[#2D215F]">当前想改善什么</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-[1.8] text-[#2D215F]/60">
            {medicationProfile.patient.recoveryGoal}
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#F2AEDB]/28 text-[#BF047E]">
              <UserDoctorIcon size={18} />
            </span>
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-[#BF047E]">复诊清单</p>
              <p className="text-[12px] font-black text-[#2D215F]">建议带去门诊的内容</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {medicationProfile.patient.reviewFocus.slice(0, 3).map((item) => (
              <div
                className="flex items-center gap-2 rounded-[16px] bg-[#F2F2F2] px-3 py-2"
                key={item}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#0388A6]" />
                <span className="text-[10px] font-semibold text-[#2D215F]/62">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <ComplianceNote>
        问答页中的睡眠知识、达卫可标签摘要、复诊建议和当前档案回答仅用于演示知识检索与记录能力，不替代医生、药师或当地正式说明书。
      </ComplianceNote>
    </main>
  );
}
