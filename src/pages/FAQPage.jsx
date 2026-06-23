import { useState } from "react";
import {
  knowledgeBaseEntries,
  medicationFaqs,
  medicationProfile,
  personalFaqs,
  qaSuggestedPrompts,
  sleepFaqs,
} from "../data";
import { ChatIcon, ChevronRightIcon } from "../components/Icons";
import { Button, Card, ComplianceNote, Input, PageHeader } from "../components/UI";

function normalize(text) {
  return text.trim().toLowerCase();
}

function getQaResponse(query) {
  const cleaned = normalize(query);
  if (!cleaned) return null;

  const urgentSafetyMatch =
    /加量|减量|停药|换药|两片|翻倍|自己调整|能不能继续吃|还能不能吃/.test(cleaned);
  if (urgentSafetyMatch) {
    return {
      answer:
        "这个问题涉及个体化用药决策。当前 Demo 只展示标签与记录信息，不提供加量、减量、停药或换药建议。请以医生处方、当地说明书和药师建议为准。",
      sources: knowledgeBaseEntries.filter((item) => item.id === "med-safety-adjust-dose"),
    };
  }

  const scored = knowledgeBaseEntries
    .map((item) => {
      const haystack = `${item.question} ${item.answer} ${item.keywords.join(" ")}`.toLowerCase();
      let score = 0;
      item.keywords.forEach((keyword) => {
        if (cleaned.includes(keyword.toLowerCase())) score += 4;
      });
      cleaned.split(/[\s，。、“”！？；：,.!?;:()（）/]+/).forEach((token) => {
        if (token && haystack.includes(token)) score += 1;
      });
      if (cleaned.includes(item.question.replace("？", "").toLowerCase())) score += 5;
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score);

  if (!scored.length) {
    return {
      answer:
        "这个问题我暂时没有在当前演示知识库中检索到明确答案。你可以换一种问法，或者先问我睡眠记录、达卫可适应症、用药周期、余量、有效期这类问题。",
      sources: [],
    };
  }

  return {
    answer: scored[0].item.answer,
    sources: scored.slice(0, 3).map((entry) => entry.item),
  };
}

export default function FAQPage() {
  const [tab, setTab] = useState("sleep");
  const [openIndex, setOpenIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [qaResult, setQaResult] = useState(null);
  const faqs = tab === "sleep" ? sleepFaqs : medicationFaqs;

  const switchTab = (nextTab) => {
    setTab(nextTab);
    setOpenIndex(0);
  };

  const submitQuestion = (nextQuery) => {
    const result = getQaResponse(nextQuery);
    setQuery(nextQuery);
    setQaResult(result);
  };

  return (
    <main className="page">
      <PageHeader subtitle="知识说明，不替代医生或药师" title="知识问答" />

      <section className="relative overflow-hidden rounded-[28px] border border-[#0388A6]/12 bg-[#0388A6]/8 p-5">
        <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full border-[16px] border-[#0388A6]/7" />
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0388A6] text-white">
          <ChatIcon />
        </span>
        <h2 className="mt-4 text-lg font-black text-[#2D215F]">先了解，再更好地沟通</h2>
        <p className="mt-2 max-w-[290px] text-[11px] leading-relaxed text-[#2D215F]/58">
          查阅睡眠记录方法与用药管理常见问题。涉及个体决策时，请咨询医生或药师。
        </p>
      </section>

      <Card className="mt-4 border-[#BF047E]/10 bg-white/88 p-4">
        <p className="text-[10px] font-bold tracking-[0.12em] text-[#BF047E]">你的当前关注点</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            `今晚 ${medicationProfile.currentMedication.reminderTime} 用药`,
            `当前周期 ${medicationProfile.currentMedication.cycleDays} 天`,
            `余量 ${medicationProfile.currentMedication.remainingTablets} 片`,
            `有效期至 ${medicationProfile.currentMedication.expiresOn}`,
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
        <h3 className="mt-2 text-[16px] font-black text-[#2D215F]">问答可同时读取外部知识和当前档案</h3>
        <p className="mt-2 text-[11px] leading-[1.7] text-[#2D215F]/58">
          这个演示版会优先回答睡眠知识、达卫可标签摘要，以及你当前用药档案中的周期、余量、提醒和有效期。
        </p>
        <div className="mt-4 flex gap-2">
          <Input
            className="flex-1"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：达卫可是治疗什么的？我现在这个周期到第几天了？"
            value={query}
          />
          <Button className="shrink-0 !px-4" onClick={() => submitQuestion(query)}>
            提问
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
          <p className="text-[10px] font-bold tracking-[0.12em] text-[#BF047E]">DEMO ANSWER</p>
          <p className="mt-3 text-[13px] leading-[1.8] text-[#2D215F]/72">{qaResult.answer}</p>
          {qaResult.sources.length ? (
            <div className="mt-4 space-y-2">
              <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">回答来源</p>
              {qaResult.sources.map((item) => (
                <div className="rounded-[18px] bg-[#F2F2F2] p-3" key={item.id}>
                  <p className="text-[11px] font-bold text-[#2D215F]">{item.question}</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
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
      ) : null}

      <div className="mt-5 grid grid-cols-2 rounded-[18px] bg-[#2D215F]/6 p-1">
        {[
          { id: "sleep", label: "睡眠知识" },
          { id: "medication", label: "用药管理" },
        ].map((item) => (
          <button
            className={`pressable rounded-[15px] py-3 text-xs font-black transition ${
              tab === item.id
                ? "bg-white text-[#BF047E] shadow-[0_6px_18px_rgba(45,33,95,0.08)]"
                : "text-[#2D215F]/45"
            }`}
            key={item.id}
            onClick={() => switchTab(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {tab === "medication" ? (
          <Card className="border-[#0388A6]/12 bg-[#0388A6]/6 p-4">
            <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">当前档案可答</p>
            <div className="mt-3 space-y-2">
              {personalFaqs.map((item) => (
                <button
                  className="pressable flex w-full items-center justify-between rounded-[18px] bg-white px-4 py-3 text-left"
                  key={item.id}
                  onClick={() => submitQuestion(item.question)}
                  type="button"
                >
                  <span className="text-[12px] font-bold text-[#2D215F]">{item.question}</span>
                  <ChevronRightIcon className="text-[#2D215F]/28" size={16} />
                </button>
              ))}
            </div>
          </Card>
        ) : null}
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
                      : "bg-[#0388A6]/9 text-[#0388A6]"
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
                    <a
                      className="mt-3 inline-flex text-[10px] font-bold text-[#0388A6]"
                      href={item.source.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      来源：{item.source.shortLabel}
                    </a>
                  </div>
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>

      <ComplianceNote>
        问答页中的睡眠知识、达卫可标签摘要和当前档案回答仅用于演示知识检索与记录能力，不替代医生、药师或当地正式说明书。
      </ComplianceNote>
    </main>
  );
}
