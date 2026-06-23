import { useState } from "react";
import { medicationFaqs, sleepFaqs } from "../data";
import { ChatIcon, ChevronRightIcon } from "../components/Icons";
import { Card, ComplianceNote, PageHeader } from "../components/UI";

export default function FAQPage() {
  const [tab, setTab] = useState("sleep");
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = tab === "sleep" ? sleepFaqs : medicationFaqs;

  const switchTab = (nextTab) => {
    setTab(nextTab);
    setOpenIndex(0);
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
                  </div>
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>

      <ComplianceNote>
        问答仅提供通用知识，不做诊断、不推荐药品，也不提供加量、减量、停药或换药建议。
      </ComplianceNote>
    </main>
  );
}
