import {
  adverseRecords as initialAdverseRecords,
  medicationLibrary,
  medicationProfile,
  medicationWeek as initialMedicationWeek,
  reportSummary as baseReportSummary,
  sleepDiaryHighlights as initialSleepDiaryHighlights,
  sleepStats as baseSleepStats,
} from "./data";

function roundToOne(value) {
  return Math.round(value * 10) / 10;
}

export function buildInitialDemoState() {
  return {
    importedMedicationId: medicationProfile.currentMedication.id,
    reminderTime: medicationProfile.currentMedication.reminderTime,
    todayMedicationDone: false,
    sleepDiaryHighlights: initialSleepDiaryHighlights.map((item) => ({ ...item })),
    adverseRecords: initialAdverseRecords.map((item) => ({ ...item })),
    medicationWeek: initialMedicationWeek.map((item) => ({ ...item })),
  };
}

export function buildDemoRuntime(state) {
  const importedMedication =
    medicationLibrary.find((item) => item.id === state.importedMedicationId) ?? medicationLibrary[0];
  const sleepDiary = state.sleepDiaryHighlights;
  const latestSleep = sleepDiary[sleepDiary.length - 1] ?? initialSleepDiaryHighlights[0];
  const totalSleepHours =
    sleepDiary.reduce((sum, item) => sum + (item.totalSleepHours ?? 0), 0) / sleepDiary.length;
  const averageLatency =
    sleepDiary.reduce((sum, item) => sum + (item.sleepLatencyMinutes ?? 0), 0) / sleepDiary.length;
  const averageAwakenings =
    sleepDiary.reduce((sum, item) => sum + (item.awakenings ?? 0), 0) / sleepDiary.length;
  const usedTablets =
    importedMedication.usedTablets + (state.todayMedicationDone ? 1 : 0);
  const remainingTablets = Math.max(
    0,
    importedMedication.remainingTablets - (state.todayMedicationDone ? 1 : 0),
  );
  const checkedInDays =
    importedMedication.checkedInDays + (state.todayMedicationDone ? 1 : 0);
  const adverseSummary = state.adverseRecords.reduce((acc, item) => {
    acc[item.symptom] = (acc[item.symptom] ?? 0) + 1;
    return acc;
  }, {});

  const patient = {
    ...medicationProfile.patient,
    sleepSummary: `近 ${sleepDiary.length} 次睡眠记录平均睡眠 ${roundToOne(totalSleepHours)} 小时，入睡耗时约 ${Math.round(
      averageLatency,
    )} 分钟，夜间平均醒来 ${roundToOne(averageAwakenings)} 次；最新一条记录显示 ${latestSleep.daytimeState}。`,
  };

  const currentMedication = {
    ...medicationProfile.currentMedication,
    ...importedMedication,
    id: importedMedication.id,
    name: importedMedication.brandName,
    brandName: importedMedication.brandName,
    reminderTime: state.reminderTime,
    usedTablets,
    remainingTablets,
    checkedInDays,
  };

  const reportSummary = {
    ...baseReportSummary,
    averageSleepHours: String(roundToOne(totalSleepHours)),
    averageSleepLatency: String(Math.round(averageLatency)),
    averageWakeups: String(roundToOne(averageAwakenings)),
    medicationCheckIns: `${currentMedication.usedTablets} 片`,
    adverseRecordSummary:
      Object.entries(adverseSummary)
        .map(([name, count]) => `${name} ${count} 次`)
        .join(" · ") || "暂无不适记录",
  };

  const sleepStats = baseSleepStats.map((stat) => {
    if (stat.label === "入睡耗时") return { ...stat, value: String(Math.round(averageLatency)) };
    if (stat.label === "夜间醒来") return { ...stat, value: String(roundToOne(averageAwakenings)) };
    if (stat.label === "睡眠时长") return { ...stat, value: String(roundToOne(totalSleepHours)) };
    if (stat.label === "日间状态") return { ...stat, value: latestSleep.daytimeState.includes("较") ? latestSleep.daytimeState.replace("精神", "") : "一般" };
    return stat;
  });

  return {
    patient,
    currentMedication,
    importedMedication,
    sleepDiaryHighlights: sleepDiary,
    adverseRecords: state.adverseRecords,
    medicationWeek: state.medicationWeek,
    reportSummary,
    sleepStats,
  };
}
