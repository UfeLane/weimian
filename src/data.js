export const sourceCatalog = {
  nhlbiInsomnia: {
    label: "NHLBI, NIH · What Is Insomnia?",
    shortLabel: "NHLBI 失眠专题",
    url: "https://www.nhlbi.nih.gov/health/insomnia",
    accessedOn: "2026-06-23",
  },
  nhlbiInsomniaTreatment: {
    label: "NHLBI, NIH · Insomnia Treatment",
    shortLabel: "NHLBI 治疗建议",
    url: "https://www.nhlbi.nih.gov/health/insomnia/treatment",
    accessedOn: "2026-06-24",
  },
  nhlbiInsomniaLiving: {
    label: "NHLBI, NIH · Living With Insomnia",
    shortLabel: "NHLBI 长期管理",
    url: "https://www.nhlbi.nih.gov/health/insomnia/living-with",
    accessedOn: "2026-06-24",
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
    displayName: "演示患者 A",
    nextFollowUpOn: "2026.07.03",
    sleepSummary:
      "近 7 日平均睡眠 6.2 小时，入睡耗时约 45 分钟，夜间平均醒来 2 次；近 3 日白天精神状态改善但仍偶有犯困。",
    recoveryGoal: "希望先把入睡耗时稳定压到 30 分钟以内，并减少白天嗜睡。",
    reviewFocus: [
      "近 1 至 2 周睡眠日记",
      "入睡耗时是否缩短",
      "白天嗜睡是否影响工作学习",
      "是否有漏服、补服或自行调整想法",
    ],
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
    id: "sleep-daytime-impact",
    category: "sleep",
    question: "失眠为什么会影响白天状态？",
    answer:
      "NHLBI 提到，失眠会影响记忆、注意力和日间活动表现，也可能让人白天犯困、烦躁或思路不清。持续时间较长时，还可能增加其他健康风险。",
    keywords: ["白天状态", "注意力", "记忆", "犯困", "影响"],
    source: sourceCatalog.nhlbiInsomnia,
  },
  {
    id: "sleep-healthy-habits",
    category: "sleep",
    question: "想改善睡眠，睡前习惯可以先改什么？",
    answer:
      "可先从规律作息、卧室保持安静偏暗偏凉、睡前少看电子屏幕、避免临睡前摄入咖啡因和酒精、减少午后小睡等习惯开始。NHLBI 也建议把运动安排在白天，而不要太靠近睡前。",
    keywords: ["睡前", "习惯", "作息", "咖啡因", "酒精", "屏幕"],
    source: sourceCatalog.nhlbiInsomniaTreatment,
  },
  {
    id: "sleep-cbti",
    category: "sleep",
    question: "慢性失眠一般先考虑什么治疗？",
    answer:
      "NHLBI 将 CBT-I 视为长期失眠常见的一线治疗思路之一。它通常是一个 6 到 8 周的计划，目标是帮助更快入睡、减少对失眠的焦虑，并逐步建立稳定的睡眠节律。",
    keywords: ["CBT-I", "认知行为治疗", "一线治疗", "慢性失眠"],
    source: sourceCatalog.nhlbiInsomniaTreatment,
  },
  {
    id: "sleep-prepare-visit",
    category: "followup",
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
    id: "followup-contact-doctor",
    category: "followup",
    question: "复诊之间如果出现新情况，需要做什么？",
    answer:
      "NHLBI 建议在复诊之间，如果出现新的症状、原有症状加重，或者药物副作用变得明显，应及时联系医生，而不是等到下一次门诊时再统一处理。",
    keywords: ["新情况", "症状加重", "副作用", "联系医生", "复诊之间"],
    source: sourceCatalog.nhlbiInsomniaLiving,
  },
  {
    id: "followup-keep-habits",
    category: "followup",
    question: "睡眠好转以后，还需要继续记录和管理吗？",
    answer:
      "NHLBI 提到，即使睡眠改善，也往往仍需要维持规律作息、坚持既定治疗方案，并视情况继续记录睡眠日记，以帮助观察是否复发或是否出现新的波动。",
    keywords: ["好转以后", "继续记录", "复发", "长期管理"],
    source: sourceCatalog.nhlbiInsomniaLiving,
  },
  {
    id: "followup-questions",
    category: "followup",
    question: "复诊时可以优先问医生哪些问题？",
    answer:
      "可以优先围绕 4 类问题：这段时间睡眠是否有达到治疗预期、白天嗜睡或注意力下降是否与药物相关、当前用药是否需要继续观察、接下来需要继续记录哪些指标。",
    keywords: ["问医生", "复诊问题", "该问什么", "治疗预期"],
    source: sourceCatalog.nhlbiInsomniaLiving,
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
    id: "med-dayvigo-how-to-take",
    category: "medication",
    question: "达卫可应该在什么时间吃？",
    answer:
      "FDA 标签建议在睡前立即服用，并确保离计划醒来时间至少还有 7 小时。如果与餐同服或餐后很快服用，可能会让起效时间变慢。",
    keywords: ["什么时候吃", "睡前", "7小时", "餐后", "起效"],
    source: sourceCatalog.fdaDayvigoLabel,
  },
  {
    id: "med-dayvigo-contraindication",
    category: "medication",
    question: "达卫可有哪些不适合的情况？",
    answer:
      "DAYVIGO 的 FDA 标签列出 narcolepsy（发作性睡病）为禁忌情况。另外，如合并其他中枢抑制药物或存在特殊基础病，是否适合使用应由医生结合个体情况判断。",
    keywords: ["禁忌", "不适合", "发作性睡病", "narcolepsy"],
    source: sourceCatalog.fdaDayvigoLabel,
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
    id: "med-dayvigo-common-side-effect",
    category: "medication",
    question: "达卫可标签里最常见的不良反应是什么？",
    answer:
      "FDA 标签列出的最常见不良反应是 somnolence，也就是嗜睡。如果你在程序内记录到明显白天犯困、反应慢或影响驾驶学习，应尽快和医生或药师沟通。",
    keywords: ["不良反应", "嗜睡", "白天犯困", "somnolence"],
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
  {
    id: "profile-followup-date",
    category: "profile",
    question: "我的下一次复诊时间和关注点是什么？",
    answer:
      `根据当前档案，下一次复诊计划为 ${medicationProfile.patient.nextFollowUpOn}。当前建议重点带上睡眠日记，并反馈入睡耗时、白天嗜睡、漏服情况以及对达卫可耐受性的主观感受。`,
    keywords: ["下一次复诊", "复诊时间", "关注点", "复诊"],
    source: sourceCatalog.internalProfile,
  },
  {
    id: "profile-sleep-summary",
    category: "profile",
    question: "我最近睡得怎么样？",
    answer: `根据当前档案，${medicationProfile.patient.sleepSummary}`,
    keywords: ["最近睡得怎么样", "最近睡眠", "近7天", "睡眠摘要"],
    source: sourceCatalog.internalProfile,
  },
];

export const sleepFaqs = knowledgeBaseEntries.filter((item) => item.category === "sleep");
export const medicationFaqs = knowledgeBaseEntries.filter(
  (item) => item.category === "medication",
);
export const personalFaqs = knowledgeBaseEntries.filter((item) => item.category === "profile");
export const followupFaqs = knowledgeBaseEntries.filter((item) => item.category === "followup");

export const qaKnowledgeOverview = [
  {
    id: "sleep",
    title: "睡眠知识",
    value: `${sleepFaqs.length} 条`,
    description: "失眠定义、睡眠日记、睡眠习惯与长期管理",
    tone: "medical",
  },
  {
    id: "medication",
    title: "达卫可标签",
    value: `${medicationFaqs.length} 条`,
    description: "适应症、剂量、服用时机、风险提示与安全边界",
    tone: "brand",
  },
  {
    id: "profile",
    title: "用户档案",
    value: `${personalFaqs.length} 条`,
    description: "周期天数、余量、提醒时间、有效期与近期睡眠摘要",
    tone: "brand",
  },
  {
    id: "followup",
    title: "复诊准备",
    value: `${followupFaqs.length} 条`,
    description: "复诊前要带什么、期间何时联系医生、该问什么",
    tone: "medical",
  },
];

export const qaSuggestedPrompts = [
  "达卫可是治疗什么的？",
  "我现在这个周期到第几天了？",
  "我用了多少药，还剩多少？",
  "睡眠日记应该怎么记？",
  "我能不能自己调整剂量？",
  "我的下一次复诊时间和关注点是什么？",
  "达卫可应该在什么时间吃？",
];
