export const sourceCatalog = {
  nhlbiInsomnia: {
    label: "NHLBI, NIH · What Is Insomnia?",
    shortLabel: "NHLBI 失眠专题",
    url: "https://www.nhlbi.nih.gov/health/insomnia",
    accessedOn: "2026-06-23",
  },
  fdaDayvigoOverview: {
    label: "FDA Drugs@FDA · DAYVIGO (NDA 212028)",
    shortLabel: "FDA 审批页",
    url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=212028",
    accessedOn: "2026-06-23",
  },
  fdaDayvigoLabel: {
    label: "FDA Label PDF · DAYVIGO (lEmborexant) Prescribing Information",
    shortLabel: "FDA 标签 PDF",
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/212028s000lbl.pdf",
    accessedOn: "2026-06-23",
  },
  dailymedDayvigo: {
    label: "DailyMed · DAYVIGO- lemborexant tablet, film coated",
    shortLabel: "DailyMed 标签页",
    url: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=DAYVIGO",
    accessedOn: "2026-06-23",
  },
  internalProfile: {
    label: "卫眠伴行 Demo · 当前用药档案",
    shortLabel: "当前档案",
    url: "#internal-profile",
    accessedOn: "2026-06-23",
  },
};

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

export const medicationLibrary = [
  {
    id: "dayvigo-daweike",
    brandName: "达卫可",
    englishBrand: "DAYVIGO",
    genericName: "lemborexant",
    tag: "卫材示例药品",
    manufacturer: "Eisai / 卫材",
    purpose: "用于治疗成人失眠，表现为入睡困难和/或睡眠维持困难。",
    dosage: "推荐起始 5 mg，每晚至多一次，睡前服用。",
    strengths: ["5 mg", "10 mg"],
    route: "口服片剂",
    reminderTime: "22:30",
    startedOn: "2026.06.17",
    cycleDays: 14,
    checkedInDays: 6,
    missedDays: 1,
    usedTablets: 6,
    remainingTablets: 8,
    refillDate: "2026.07.02",
    expiresOn: "2026.07.18",
    instructionsNote:
      "演示信息基于 FDA / DailyMed 公开标签整理，实际使用以医生处方、当地说明书和药师指导为准。",
    sources: [
      sourceCatalog.fdaDayvigoOverview,
      sourceCatalog.fdaDayvigoLabel,
      sourceCatalog.dailymedDayvigo,
    ],
    leafletSections: [
      {
        title: "适应症",
        body: "用于治疗成人失眠，尤其是入睡困难和/或睡眠维持困难。",
        source: sourceCatalog.fdaDayvigoLabel,
      },
      {
        title: "用法用量",
        body: "推荐起始剂量为每晚 5 mg，睡前立即服用，且距计划醒来时间至少还剩 7 小时。可根据临床反应和耐受性调整至 10 mg；最大推荐剂量为每晚 10 mg。",
        source: sourceCatalog.fdaDayvigoLabel,
      },
      {
        title: "服药提示",
        body: "与餐同服或餐后很快服用，可能会延迟入睡起效时间；中度肝功能受损患者最大推荐剂量为 5 mg，重度肝功能受损者不推荐。",
        source: sourceCatalog.fdaDayvigoLabel,
      },
      {
        title: "重要警示",
        body: "可能出现次日嗜睡、警觉性下降、复杂睡眠行为、睡眠瘫痪、幻觉样体验或抑郁加重等风险；合并其他中枢抑制药物时需格外谨慎。",
        source: sourceCatalog.fdaDayvigoLabel,
      },
      {
        title: "常见不良反应",
        body: "官方标签列出的最常见不良反应为 somnolence（嗜睡）。如出现明显不适，应及时联系医生或药师。",
        source: sourceCatalog.fdaDayvigoLabel,
      },
    ],
  },
];

export const medicationProfile = {
  patient: {
    summary:
      "已在医生指导下于夜间服用助眠相关处方药，当前处于首个 14 天观察周期，重点关注入睡耗时、白天嗜睡和漏服情况。",
  },
  currentMedication: {
    ...medicationLibrary[0],
    name: "达卫可",
    purpose:
      "治疗成人失眠，表现为入睡困难和/或睡眠维持困难；当前仅作为本 Demo 的卫材示例药品。",
    notes:
      "请按医生处方、当地正式说明书和药师建议使用；本 Demo 不提供加量、减量、停药或换药建议。",
  },
};

export const knowledgeBaseEntries = [
  {
    id: "sleep-what-is-insomnia",
    category: "sleep",
    question: "什么是失眠？",
    answer:
      "失眠是一种常见睡眠障碍，即使有合适的睡眠时间和环境，仍然可能出现入睡困难、睡眠维持困难，或者睡眠质量不佳，并影响白天状态。",
    keywords: ["失眠", "定义", "是什么", "睡不着"],
    source: sourceCatalog.nhlbiInsomnia,
  },
  {
    id: "sleep-short-vs-chronic",
    category: "sleep",
    question: "短期失眠和长期失眠有什么区别？",
    answer:
      "NHLBI 提到，短期失眠常与压力、作息或环境变化相关，可持续数天到数周；慢性失眠通常每周 3 晚或以上、持续超过 3 个月，且不能完全由其他健康问题解释。",
    keywords: ["短期", "长期", "慢性", "几周", "几个月"],
    source: sourceCatalog.nhlbiInsomnia,
  },
  {
    id: "sleep-prepare-visit",
    category: "sleep",
    question: "复诊前应该准备什么？",
    answer:
      "可准备近 1 至 2 周的睡眠记录、当前用药清单、出现过的不适和最想确认的 3 个问题。这样能让医生更快理解你的睡眠和用药变化。",
    keywords: ["复诊", "准备", "看医生", "带什么"],
    source: sourceCatalog.nhlbiInsomnia,
  },
  {
    id: "sleep-diary",
    category: "sleep",
    question: "睡眠日记应该记录什么？",
    answer:
      "建议记录上床时间、估计入睡耗时、夜间醒来次数、起床时间、总睡眠时长，以及第二天的精神状态；连续记录比分钟级精确更重要。",
    keywords: ["睡眠日记", "记录", "怎么记", "夜里醒来"],
    source: sourceCatalog.nhlbiInsomnia,
  },
  {
    id: "med-dayvigo-indication",
    category: "medication",
    question: "达卫可是用来做什么的？",
    answer:
      "根据 FDA 的 DAYVIGO 标签，lemborexant 用于治疗成人失眠，主要针对入睡困难和/或睡眠维持困难。",
    keywords: ["达卫可", "DAYVIGO", "干什么", "适应症", "治疗什么"],
    source: sourceCatalog.fdaDayvigoLabel,
  },
  {
    id: "med-dayvigo-dose",
    category: "medication",
    question: "达卫可的起始剂量和常见规格是什么？",
    answer:
      "官方标签列出的推荐起始剂量是每晚 5 mg，睡前立即服用，且应确保离计划醒来至少还有 7 小时；可根据反应和耐受性调整到 10 mg。官方审批页显示常见规格为 5 mg 和 10 mg 片剂。",
    keywords: ["剂量", "5mg", "10mg", "规格", "怎么吃", "睡前"],
    source: sourceCatalog.fdaDayvigoOverview,
  },
  {
    id: "med-dayvigo-warning",
    category: "medication",
    question: "达卫可有什么重点风险提示？",
    answer:
      "FDA 标签提示需关注次日警觉性下降、嗜睡、复杂睡眠行为、睡眠瘫痪、幻觉样体验和抑郁加重等风险。若合并其他中枢抑制药物，风险可能上升。",
    keywords: ["风险", "警示", "副作用", "嗜睡", "复杂睡眠行为"],
    source: sourceCatalog.fdaDayvigoLabel,
  },
  {
    id: "med-safety-adjust-dose",
    category: "medication",
    question: "我能不能自己加量、减量或停药？",
    answer:
      "这类问题属于个体化诊疗决策。本 Demo 只展示标签和记录功能，不提供加量、减量、停药或换药建议。请严格遵循医生处方，并结合当地正式说明书、药师建议判断。",
    keywords: ["加量", "减量", "停药", "换药", "自己调整", "能不能吃两片"],
    safety: true,
    source: sourceCatalog.fdaDayvigoLabel,
  },
  {
    id: "profile-cycle",
    category: "profile",
    question: "我现在的用药周期到第几天了？",
    answer: "根据当前档案，你处于首个 14 天观察周期的第 7 天，今晚提醒时间为 22:30。",
    keywords: ["第几天", "周期", "今天第几天", "提醒时间"],
    source: sourceCatalog.internalProfile,
  },
  {
    id: "profile-remaining",
    category: "profile",
    question: "我用了多少药，还剩多少？",
    answer:
      "根据当前档案，你已使用 6 片，剩余 8 片；系统中的补药提醒日期为 2026.07.02，有效期展示为 2026.07.18。",
    keywords: ["用了多少", "剩多少", "余量", "补药", "有效期", "过期"],
    source: sourceCatalog.internalProfile,
  },
];

export const sleepFaqs = knowledgeBaseEntries.filter((item) => item.category === "sleep");
export const medicationFaqs = knowledgeBaseEntries.filter(
  (item) => item.category === "medication",
);
export const personalFaqs = knowledgeBaseEntries.filter((item) => item.category === "profile");

export const qaSuggestedPrompts = [
  "达卫可是治疗什么的？",
  "我现在这个周期到第几天了？",
  "我用了多少药，还剩多少？",
  "睡眠日记应该怎么记？",
  "我能不能自己调整剂量？",
];
