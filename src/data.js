export const sleepStats = [
  { label: "入睡耗时", value: "45", unit: "分钟", tone: "brand" },
  { label: "夜间醒来", value: "2", unit: "次", tone: "medical" },
  { label: "睡眠时长", value: "6.2", unit: "小时", tone: "medical" },
  { label: "日间状态", value: "一般", unit: "", tone: "brand" },
];

export const weeklySleep = [
  { day: "一", value: 5.6 },
  { day: "二", value: 6.1 },
  { day: "三", value: 5.8 },
  { day: "四", value: 6.5 },
  { day: "五", value: 6.2 },
  { day: "六", value: 6.8 },
  { day: "日", value: 6.2 },
];

export const medicationWeek = [
  { day: "一", done: true },
  { day: "二", done: true },
  { day: "三", done: false },
  { day: "四", done: true },
  { day: "五", done: true },
  { day: "六", done: true },
  { day: "日", done: true },
];

export const medicationProfile = {
  patient: {
    summary: "已在医生指导下于夜间服用助眠相关处方药，当前处于首个 14 天观察周期。",
  },
  currentMedication: {
    name: "失眠处方药 A",
    tag: "示例药品",
    purpose: "用于医生指导下的夜间助眠管理",
    dosage: "每晚 1 片",
    reminderTime: "22:30",
    startedOn: "2026.06.17",
    cycleDays: 14,
    checkedInDays: 6,
    missedDays: 1,
    usedTablets: 6,
    remainingTablets: 8,
    refillDate: "2026.07.02",
    expiresOn: "2026.07.18",
    notes: "请按医生处方和说明书使用，不自行增减药。",
  },
};

export const sleepFaqs = [
  {
    question: "什么是失眠？",
    answer:
      "失眠通常指在有合适睡眠机会的情况下，仍存在入睡困难、睡眠维持困难或早醒，并影响日间状态。若问题持续，请向医生描述发生频率和对生活的影响。",
    keywords: ["失眠", "定义", "是什么", "睡不着"],
    sourceLabel: "睡眠知识库",
  },
  {
    question: "为什么明明很累却睡不着？",
    answer:
      "压力、作息变化、咖啡因、屏幕使用和身体不适等都可能影响入睡。建议记录当天的行为和感受，帮助复诊时更准确地沟通。",
    keywords: ["累", "睡不着", "入睡困难", "原因", "压力"],
    sourceLabel: "睡眠知识库",
  },
  {
    question: "夜里总醒应该怎么记录？",
    answer:
      "可以记录大致醒来次数、每次清醒时长、是否起床，以及第二天的精神状态。无需追求分钟级精确，保持连续记录更重要。",
    keywords: ["夜里", "总醒", "醒来", "记录", "怎么记"],
    sourceLabel: "睡眠知识库",
  },
  {
    question: "看医生前应该准备什么？",
    answer:
      "建议准备近 1 至 2 周睡眠记录、正在使用的药品清单、不适记录，以及最想和医生确认的三个问题。",
    keywords: ["看医生", "复诊", "准备", "带什么"],
    sourceLabel: "睡眠知识库",
  },
  {
    question: "睡眠日记应该怎么记？",
    answer:
      "每天起床后记录上床时间、估计入睡耗时、醒来次数、起床时间、总睡眠时长和日间状态即可。",
    keywords: ["睡眠日记", "怎么记", "记录", "日记"],
    sourceLabel: "睡眠知识库",
  },
];

export const medicationFaqs = [
  {
    question: "用药期间需要记录什么？",
    answer:
      "建议记录实际用药时间、是否漏服、睡眠变化和出现的不适。记录用于帮助医生了解情况，不代表对疗效作出判断。",
    keywords: ["用药", "记录什么", "需要记录", "期间"],
    sourceLabel: "用药知识库",
  },
  {
    question: "漏服后应该怎么办？",
    answer:
      "不同药品的处理方式可能不同，请查看药品说明书或咨询医生、药师。系统只记录漏服，不提供补服或剂量建议。",
    keywords: ["漏服", "怎么办", "补服", "错过"],
    sourceLabel: "用药知识库",
  },
  {
    question: "出现不适时应该怎么记录？",
    answer:
      "记录不适类型、严重程度、发生时间、持续多久，以及是否影响日间活动。若症状明显、持续或令你担心，请及时就医。",
    keywords: ["不适", "怎么记录", "头晕", "嗜睡", "恶心"],
    sourceLabel: "用药知识库",
  },
  {
    question: "说明书看不懂怎么办？",
    answer:
      "可以标记不理解的段落，在复诊或购药时向医生、药师询问。不要根据片段信息自行改变用药方式。",
    keywords: ["说明书", "看不懂", "怎么办", "询问"],
    sourceLabel: "用药知识库",
  },
  {
    question: "我能不能调整剂量？",
    answer:
      "这个问题涉及个体诊疗或用药决策，系统不能提供加量、减量、停药或换药建议。请遵循医生处方，如有疑问请咨询医生或药师。",
    safety: true,
    keywords: ["剂量", "调整", "加量", "减量", "停药", "换药"],
    sourceLabel: "用药知识库",
  },
];
