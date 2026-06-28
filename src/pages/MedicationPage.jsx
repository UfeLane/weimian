import { useState } from "react";
import {
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  PillIcon,
} from "../components/Icons";
import {
  Button,
  Card,
  ComplianceNote,
  PageHeader,
  PatientSnapshotCard,
  SectionTitle,
} from "../components/UI";

const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildCalendar(startedOn, medicationWeek, todayDone) {
  const [year, month, day] = startedOn.split(".").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7;
  const rows = Math.ceil((offset + daysInMonth) / 7) * 7;
  const states = new Map();

  medicationWeek.forEach((item, index) => {
    states.set(day + index, item.done ? "taken" : "missed");
  });
  states.set(day + medicationWeek.length, todayDone ? "taken" : "today");

  return Array.from({ length: rows }, (_, index) => {
    const date = index - offset + 1;
    if (date < 1 || date > daysInMonth) {
      return { label: "", state: "empty" };
    }
    return {
      label: date,
      state: states.get(date) ?? "default",
    };
  });
}

function formatMonthLabel(startedOn) {
  const [year, month] = startedOn.split(".").map(Number);
  return `${year}.${String(month).padStart(2, "0")}`;
}

export default function MedicationPage({
  demoRuntime,
  onNavigate,
  onToggleCheck,
  onToast,
}) {
  const [view, setView] = useState("calendar");
  const { adverseRecords, currentMedication, importedMedication, medicationWeek, patient } =
    demoRuntime;
  const monthLabel = formatMonthLabel(importedMedication.startedOn);
  const calendarDays = buildCalendar(
    importedMedication.startedOn,
    medicationWeek,
    demoRuntime.currentMedication.checkedInDays > importedMedication.checkedInDays,
  );

  const handleCheck = () => {
    onToggleCheck();
    onToast(demoRuntime.currentMedication.checkedInDays > importedMedication.checkedInDays ? "已撤销今日打卡" : "已完成今日用药打卡");
  };

  return (
    <main className="page">
      <PageHeader subtitle="用药日历、反馈记录与药品详情" title="我的用药" />

      <div className="mb-4">
        <PatientSnapshotCard
          accent="medical"
          chips={[
            `复诊 ${patient.nextFollowUpOn}`,
            `本周已打卡 ${currentMedication.usedTablets} 片`,
            `待沟通不适 ${adverseRecords.length} 条`,
          ]}
          summary={patient.summary}
          title="当前周期"
        />
      </div>

      <section className="mt-6">
        <SectionTitle
          action={<span className="text-[11px] font-bold text-[#0388A6]">{monthLabel}</span>}
          eyebrow="CALENDAR"
          title={view === "calendar" ? "本月用药日历" : "用药记录视图"}
        />
        <Card className="overflow-hidden border-[#0388A6]/12 p-0">
          <div className="bg-[linear-gradient(180deg,rgba(3,136,166,0.18),rgba(3,136,166,0.06))] px-4 pb-4 pt-5">
            <div className="mb-4 inline-flex rounded-full border border-white/70 bg-white/78 p-1 text-[10px] font-bold text-[#2D215F]/48 shadow-[0_10px_20px_rgba(45,33,95,0.06)]">
              <button
                className={`rounded-full px-3 py-2 ${view === "calendar" ? "bg-[#0388A6] text-white" : ""}`}
                onClick={() => setView("calendar")}
                type="button"
              >
                用药日历
              </button>
              <button
                className={`rounded-full px-3 py-2 ${view === "records" ? "bg-[#0388A6] text-white" : ""}`}
                onClick={() => setView("records")}
                type="button"
              >
                记录视图
              </button>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">DAILY INTAKES</p>
                <h2 className="mt-2 text-[20px] font-black text-[#2D215F]">今晚 {currentMedication.reminderTime}</h2>
                <p className="mt-1 text-[11px] leading-[1.7] text-[#2D215F]/55">
                  {demoRuntime.currentMedication.checkedInDays > importedMedication.checkedInDays
                    ? "今日已完成打卡"
                    : `当前为第 ${currentMedication.checkedInDays + 1} 天观察，请在睡前完成记录`}
                </p>
              </div>
              <button
                className={`pressable grid h-14 w-14 shrink-0 place-items-center rounded-[18px] ${
                  demoRuntime.currentMedication.checkedInDays > importedMedication.checkedInDays
                    ? "bg-[#0388A6] text-white"
                    : "bg-white text-[#0388A6]"
                } shadow-[0_10px_24px_rgba(3,136,166,0.16)]`}
                onClick={handleCheck}
                type="button"
              >
                {demoRuntime.currentMedication.checkedInDays > importedMedication.checkedInDays ? (
                  <CheckIcon size={20} />
                ) : (
                  <ClockIcon size={20} />
                )}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-2 text-[10px] font-bold text-[#0388A6]">
                已用 {currentMedication.usedTablets} 片
              </span>
              <span className="rounded-full bg-white px-3 py-2 text-[10px] font-bold text-[#BF047E]">
                余量 {currentMedication.remainingTablets} 片
              </span>
              <span className="rounded-full bg-white px-3 py-2 text-[10px] font-bold text-[#2D215F]/68">
                补药 {currentMedication.refillDate}
              </span>
            </div>
          </div>
          {view === "calendar" ? (
            <div className="px-4 pb-4 pt-3">
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-[#2D215F]/42">
                {weekLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-7 gap-2">
                {calendarDays.map((item, index) => (
                  <div
                    className={`flex aspect-square items-center justify-center rounded-[18px] text-[12px] font-bold ${
                      item.state === "taken"
                        ? "border border-[#0388A6]/15 bg-[#0388A6] text-white"
                        : item.state === "missed"
                          ? "border border-[#F2AEDB] bg-[#F2AEDB]/28 text-[#BF047E]"
                          : item.state === "today"
                            ? "border border-[#0388A6]/30 bg-[#FFFFFF] text-[#0388A6]"
                            : item.state === "empty"
                              ? "bg-transparent text-transparent"
                              : "border border-[#2D215F]/7 bg-white text-[#2D215F]/72"
                    }`}
                    key={`${item.label}-${index}`}
                  >
                    {item.label ? (
                      item.state === "taken" ? (
                        <span className="flex flex-col items-center gap-0.5">
                          <span>{item.label}</span>
                          <span className="h-1.5 w-4 rounded-full bg-white/52" />
                        </span>
                      ) : item.state === "missed" ? (
                        <span className="flex flex-col items-center gap-0.5">
                          <span>{item.label}</span>
                          <span className="text-[10px] leading-none">!</span>
                        </span>
                      ) : (
                        item.label
                      )
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-[10px] font-semibold text-[#2D215F]/55">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0388A6]" />
                  已服用
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F2AEDB]" />
                  漏服
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-[#0388A6]/35 bg-white" />
                  今日待打卡
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 px-4 pb-4 pt-3">
              <Card className="border-0 bg-white p-4 shadow-none">
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#0388A6]">MEDICATION LOG</p>
                <div className="mt-3 space-y-3">
                  {medicationWeek.map((item, index) => (
                    <div className="flex items-center justify-between gap-3 rounded-[18px] bg-[#F2F2F2] px-4 py-3" key={`${item.day}-${index}`}>
                      <div>
                        <p className="text-[12px] font-black text-[#2D215F]">第 {index + 1} 天</p>
                        <p className="mt-1 text-[10px] text-[#2D215F]/48">提醒时间 {currentMedication.reminderTime}</p>
                      </div>
                      <span className={`rounded-full px-3 py-2 text-[10px] font-bold ${item.done ? "bg-[#0388A6]/10 text-[#0388A6]" : "bg-[#F2AEDB]/28 text-[#BF047E]"}`}>
                        {item.done ? "已完成" : "漏服"}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.12em] text-[#BF047E]">FEEDBACK</p>
                    <p className="mt-2 text-[15px] font-black text-[#2D215F]">用药反馈</p>
                    <p className="mt-1 text-[11px] leading-[1.7] text-[#2D215F]/55">
                      把嗜睡、头晕、漏服后的感受记录在这里，复诊时更容易回看。
                    </p>
                  </div>
                  <Button
                    className="!min-h-[40px] !px-4"
                    onClick={() => onNavigate("adverse", { mode: "medication" })}
                    variant="soft"
                  >
                    去记录
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  {adverseRecords.map((item) => (
                    <div className="rounded-[18px] bg-[#F2F2F2] px-4 py-3" key={`${item.date}-${item.symptom}`}>
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[12px] font-black text-[#2D215F]">{item.symptom}</p>
                        <span className="text-[10px] font-bold text-[#2D215F]/40">{item.date}</span>
                      </div>
                      <p className="mt-1 text-[10px] leading-[1.7] text-[#2D215F]/55">
                        {item.note} 影响：{item.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </Card>
      </section>

      <section className="mt-6">
        <SectionTitle eyebrow="MY MEDICINE" title="我的药品" />
        <button
          className="card pressable block w-full rounded-[24px] bg-white p-5 text-left"
          onClick={() => onNavigate("medication-detail")}
          type="button"
        >
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-[#F2AEDB]/32 text-[#BF047E]">
              <PillIcon size={26} />
            </span>
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-[#0388A6]/9 px-2.5 py-1 text-[9px] font-bold text-[#0388A6]">
                {importedMedication.tag}
              </span>
              <h3 className="mt-2 text-[15px] font-black text-[#2D215F]">
                {importedMedication.brandName} / {importedMedication.englishBrand}
              </h3>
              <p className="mt-1 text-[11px] leading-relaxed text-[#2D215F]/48">
                通用名 {importedMedication.genericName} · {importedMedication.route}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#F2F2F2] px-3 py-2 text-[10px] font-bold text-[#2D215F]/68">
                  今晚 {currentMedication.reminderTime}
                </span>
                <span className="rounded-full bg-[#F2F2F2] px-3 py-2 text-[10px] font-bold text-[#BF047E]">
                  有效期 {currentMedication.expiresOn}
                </span>
              </div>
            </div>
            <ChevronRightIcon className="shrink-0 text-[#2D215F]/30" size={18} />
          </div>
        </button>
      </section>

      <ComplianceNote>
        达卫可示例药品信息基于 FDA / DailyMed 公开资料整理，仅用于 Demo 演示。实际使用请遵循当地正式说明书、医生处方和药师指导。
      </ComplianceNote>
    </main>
  );
}
