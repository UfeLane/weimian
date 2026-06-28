import { useState } from "react";
import { ChevronRightIcon, ClockIcon, PillIcon } from "../components/Icons";
import { Card, ComplianceNote, PageHeader, SectionTitle } from "../components/UI";

export default function MedicationDetailPage({ demoRuntime, onBack, onUpdateReminderTime }) {
  const [openLeafletIndex, setOpenLeafletIndex] = useState(0);
  const { currentMedication, importedMedication } = demoRuntime;

  return (
    <main className="page">
      <PageHeader onBack={onBack} subtitle="已录入药品二级详情" title={importedMedication.brandName} />

      <Card className="overflow-hidden border-0 bg-[linear-gradient(145deg,#2D215F_0%,#0388A6_100%)] p-5 text-white shadow-[0_18px_40px_rgba(45,33,95,0.22)]">
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-white/12">
            <PillIcon size={28} />
          </span>
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/12 px-3 py-1 text-[10px] font-bold">
              {importedMedication.tag}
            </span>
            <h2 className="mt-3 text-[23px] font-black tracking-[-0.04em]">
              {importedMedication.brandName}
            </h2>
            <p className="mt-1 text-[12px] font-semibold text-white/70">
              {importedMedication.englishBrand} · {importedMedication.genericName}
            </p>
            <p className="mt-3 text-[11px] leading-[1.8] text-white/72">
              {importedMedication.instructionsNote}
            </p>
          </div>
        </div>
      </Card>

      <section className="mt-7">
        <SectionTitle eyebrow="PROFILE" title="用药信息" />
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <p className="text-[10px] font-semibold text-[#2D215F]/42">当前剂量</p>
            <p className="mt-2 text-[16px] font-black text-[#2D215F]">{currentMedication.dosage}</p>
          </Card>
          <Card className="p-4">
            <p className="text-[10px] font-semibold text-[#2D215F]/42">观察周期</p>
            <p className="mt-2 text-[16px] font-black text-[#0388A6]">{currentMedication.cycleDays} 天</p>
          </Card>
          <Card className="p-4">
            <p className="text-[10px] font-semibold text-[#2D215F]/42">已使用</p>
            <p className="mt-2 text-[16px] font-black text-[#BF047E]">{currentMedication.usedTablets} 片</p>
          </Card>
          <Card className="p-4">
            <p className="text-[10px] font-semibold text-[#2D215F]/42">剩余余量</p>
            <p className="mt-2 text-[16px] font-black text-[#2D215F]">{currentMedication.remainingTablets} 片</p>
          </Card>
        </div>
        <Card className="mt-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2D215F]">
              <ClockIcon className="text-[#0388A6]" size={18} />
              用药提醒时间
            </div>
            <input
              className="w-[82px] bg-transparent text-right text-sm font-black text-[#0388A6] outline-none"
              onChange={(event) => onUpdateReminderTime(event.target.value)}
              type="time"
              value={currentMedication.reminderTime}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-[18px] bg-[#F2F2F2] p-3.5">
              <p className="text-[10px] font-semibold text-[#2D215F]/42">补药提醒</p>
              <p className="mt-1 text-sm font-black text-[#BF047E]">{currentMedication.refillDate}</p>
            </div>
            <div className="rounded-[18px] bg-[#F2F2F2] p-3.5">
              <p className="text-[10px] font-semibold text-[#2D215F]/42">有效期</p>
              <p className="mt-1 text-sm font-black text-[#2D215F]">{currentMedication.expiresOn}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {currentMedication.sources.map((source) => (
              <a
                className="rounded-full border border-[#2D215F]/8 bg-white px-3 py-2 text-[10px] font-bold text-[#2D215F]/68"
                href={source.url}
                key={source.url}
                rel="noreferrer"
                target="_blank"
              >
                {source.shortLabel}
              </a>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-7">
        <SectionTitle eyebrow="LEAFLET" title="达卫可说明书摘要" />
        <div className="space-y-3">
          {currentMedication.leafletSections.map((section, index) => {
            const open = openLeafletIndex === index;
            return (
              <Card className="overflow-hidden" key={section.title}>
                <button
                  className="pressable flex w-full items-center justify-between gap-3 p-5 text-left"
                  onClick={() => setOpenLeafletIndex(open ? -1 : index)}
                  type="button"
                >
                  <div>
                    <p className="text-[13px] font-black text-[#2D215F]">{section.title}</p>
                    <p className="mt-1 text-[10px] font-semibold text-[#0388A6]">
                      {section.source.shortLabel}
                    </p>
                  </div>
                  <ChevronRightIcon
                    className={`shrink-0 text-[#2D215F]/30 transition-transform ${open ? "rotate-90" : ""}`}
                    size={18}
                  />
                </button>
                {open ? (
                  <div className="border-t border-[#2D215F]/7 px-5 pb-5 pt-4">
                    <p className="text-[12px] leading-[1.9] text-[#2D215F]/68">{section.body}</p>
                    <a
                      className="mt-3 inline-flex text-[10px] font-bold text-[#BF047E]"
                      href={section.source.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      查看来源
                    </a>
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      </section>

      <ComplianceNote>
        达卫可示例药品信息基于 FDA / DailyMed 公开资料整理，仅用于 Demo 演示。实际使用请遵循当地正式说明书、医生处方和药师指导。
      </ComplianceNote>
    </main>
  );
}
