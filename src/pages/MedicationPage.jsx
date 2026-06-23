import { useState } from "react";
import { medicationProfile, medicationWeek } from "../data";
import {
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  PillIcon,
  PlusIcon,
} from "../components/Icons";
import {
  Button,
  Card,
  ComplianceNote,
  PageHeader,
  SectionTitle,
} from "../components/UI";

export default function MedicationPage({ onNavigate, onToast }) {
  const [checked, setChecked] = useState(false);
  const [time, setTime] = useState(medicationProfile.currentMedication.reminderTime);
  const { patient, currentMedication } = medicationProfile;

  const handleCheck = () => {
    setChecked((value) => !value);
    onToast(checked ? "已撤销今日打卡" : "已完成今日用药打卡");
  };

  return (
    <main className="page">
      <PageHeader
        action={
          <button
            aria-label="添加药品"
            className="pressable grid h-10 w-10 place-items-center rounded-full bg-[#F2AEDB]/30 text-[#BF047E]"
            onClick={() => onToast("Demo 中已使用示例药品")}
            type="button"
          >
            <PlusIcon size={20} />
          </button>
        }
        subtitle="面向已在医生指导下用药的用户"
        title="我的用药"
      />

      <div className="mb-4 rounded-[24px] border border-[#2D215F]/8 bg-white/78 p-4 shadow-[0_10px_24px_rgba(45,33,95,0.05)]">
        <p className="text-[10px] font-bold tracking-[0.14em] text-[#0388A6]">当前周期</p>
        <p className="mt-2 text-[13px] font-semibold leading-[1.7] text-[#2D215F]/72">
          {patient.summary}
        </p>
      </div>

      <Card className="relative overflow-hidden border-0 bg-[linear-gradient(145deg,#0388A6_0%,#2D215F_100%)] p-5 text-white shadow-[0_18px_40px_rgba(3,136,166,0.2)]">
        <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full border-[20px] border-white/8" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.14em] text-white/60">TODAY</p>
            <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em]">今晚 {time}</h2>
            <p className="mt-1 text-xs leading-relaxed text-white/68">
              {checked ? "今日已完成打卡" : `当前为第 ${currentMedication.checkedInDays + 1} 天观察`}
            </p>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/12">
            {checked ? <CheckIcon /> : <ClockIcon />}
          </span>
        </div>
        <div className="relative mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-white/10 px-3 py-3">
            <p className="text-[9px] font-bold tracking-[0.1em] text-white/52">剂量</p>
            <p className="mt-1 text-sm font-black">{currentMedication.dosage}</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-3">
            <p className="text-[9px] font-bold tracking-[0.1em] text-white/52">周期</p>
            <p className="mt-1 text-sm font-black">{currentMedication.cycleDays} 天</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-3">
            <p className="text-[9px] font-bold tracking-[0.1em] text-white/52">余量</p>
            <p className="mt-1 text-sm font-black">{currentMedication.remainingTablets} 片</p>
          </div>
        </div>
        <Button
          className={`mt-5 w-full !shadow-none ${
            checked ? "!bg-white/12 !text-white" : "!bg-white !text-[#0388A6]"
          }`}
          onClick={handleCheck}
        >
          {checked ? "已打卡，点击撤销" : "完成今日用药打卡"}
        </Button>
      </Card>

      <section className="mt-7">
        <SectionTitle eyebrow="MY MEDICINE" title="已录入药品" />
        <Card className="p-5">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-[#F2AEDB]/32 text-[#BF047E]">
              <PillIcon size={26} />
            </span>
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-[#0388A6]/9 px-2.5 py-1 text-[9px] font-bold text-[#0388A6]">
                {currentMedication.tag}
              </span>
              <h3 className="mt-2 text-[15px] font-black text-[#2D215F]">
                {currentMedication.name}
              </h3>
              <p className="mt-1 text-[11px] leading-relaxed text-[#2D215F]/48">
                {currentMedication.notes}
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2">
            <div className="rounded-[18px] bg-[#F2F2F2] p-3.5">
              <p className="text-[10px] font-semibold text-[#2D215F]/42">开始时间</p>
              <p className="mt-1 text-sm font-black text-[#2D215F]">{currentMedication.startedOn}</p>
            </div>
            <div className="rounded-[18px] bg-[#F2F2F2] p-3.5">
              <p className="text-[10px] font-semibold text-[#2D215F]/42">补药提醒</p>
              <p className="mt-1 text-sm font-black text-[#BF047E]">{currentMedication.refillDate}</p>
            </div>
            <div className="rounded-[18px] bg-[#F2F2F2] p-3.5">
              <p className="text-[10px] font-semibold text-[#2D215F]/42">已使用</p>
              <p className="mt-1 text-sm font-black text-[#0388A6]">
                {currentMedication.usedTablets} 片
              </p>
            </div>
            <div className="rounded-[18px] bg-[#F2F2F2] p-3.5">
              <p className="text-[10px] font-semibold text-[#2D215F]/42">有效期</p>
              <p className="mt-1 text-sm font-black text-[#2D215F]">{currentMedication.expiresOn}</p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#F2F2F2] p-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2D215F]">
              <ClockIcon className="text-[#0388A6]" size={18} />
              用药提醒时间
            </div>
            <input
              className="w-[82px] bg-transparent text-right text-sm font-black text-[#0388A6] outline-none"
              onChange={(event) => setTime(event.target.value)}
              type="time"
              value={time}
            />
          </div>
        </Card>
      </section>

      <section className="mt-7">
        <SectionTitle
          action={<span className="text-[11px] font-bold text-[#BF047E]">6 / 7 天</span>}
          eyebrow="CHECK-IN"
          title="近 7 日用药记录"
        />
        <Card className="p-5">
          <div className="grid grid-cols-7 gap-2">
            {medicationWeek.map((item) => {
              const done = item.done;
              return (
                <div className="text-center" key={item.day}>
                  <span className="text-[10px] font-bold text-[#2D215F]/40">{item.day}</span>
                  <span
                    className={`mx-auto mt-2 grid h-8 w-8 place-items-center rounded-full border ${
                      done
                        ? "border-[#0388A6] bg-[#0388A6] text-white"
                        : done === false
                          ? "border-[#BF047E]/20 bg-[#F2AEDB]/25 text-[#BF047E]"
                          : "border-dashed border-[#2D215F]/15 text-[#2D215F]/25"
                    }`}
                  >
                    {done ? <CheckIcon size={15} /> : done === false ? "!" : "·"}
                  </span>
                </div>
              );
            })}
          </div>
          <button
            className="pressable mt-5 flex w-full items-center justify-between rounded-2xl bg-[#F2F2F2] px-4 py-3.5 text-xs font-bold text-[#2D215F]"
            onClick={() => onToast("已记为一次漏服记录")}
            type="button"
          >
            记录一次漏服
            <ChevronRightIcon className="text-[#2D215F]/35" size={17} />
          </button>
        </Card>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
        <Button onClick={() => onNavigate("adverse")} variant="soft">
          记录不适
        </Button>
        <Button onClick={() => onNavigate("faq")} variant="outline">
          用药问答
        </Button>
      </div>

      <ComplianceNote>
        请遵循医生处方和药品说明书。本工具仅做提醒与记录，不提供剂量调整、停药或换药建议。
      </ComplianceNote>
    </main>
  );
}
