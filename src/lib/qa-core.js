import { knowledgeBaseEntries, medicationProfile } from "../data";

function normalize(text) {
  return text.trim().toLowerCase();
}

function getDynamicProfileEntries() {
  return [
    {
      id: "profile-cycle-live",
      category: "profile",
      question: "我现在的用药周期到第几天了？",
      answer: `根据当前档案，你处于首个 ${medicationProfile.currentMedication.cycleDays} 天观察周期的第 ${medicationProfile.currentMedication.checkedInDays + 1} 天，今晚提醒时间为 ${medicationProfile.currentMedication.reminderTime}。`,
      keywords: ["第几天", "周期", "提醒时间", "今天第几天"],
      source: {
        shortLabel: "当前档案",
        url: "#internal-profile",
      },
    },
    {
      id: "profile-remaining-live",
      category: "profile",
      question: "我用了多少药，还剩多少？",
      answer: `根据当前档案，你已使用 ${medicationProfile.currentMedication.usedTablets} 片，剩余 ${medicationProfile.currentMedication.remainingTablets} 片；补药提醒日期为 ${medicationProfile.currentMedication.refillDate}，有效期展示为 ${medicationProfile.currentMedication.expiresOn}。`,
      keywords: ["用了多少", "剩多少", "余量", "补药", "有效期", "过期"],
      source: {
        shortLabel: "当前档案",
        url: "#internal-profile",
      },
    },
  ];
}

export function getKnowledgeEntries() {
  return [...knowledgeBaseEntries, ...getDynamicProfileEntries()];
}

export function getRelevantKnowledgeEntries(query) {
  const cleaned = normalize(query);
  if (!cleaned) return [];

  const urgentSafetyMatch =
    /加量|减量|停药|换药|两片|翻倍|自己调整|能不能继续吃|还能不能吃/.test(cleaned);
  if (urgentSafetyMatch) {
    return getKnowledgeEntries().filter((item) => item.id === "med-safety-adjust-dose");
  }

  return getKnowledgeEntries()
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
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.item);
}

export function getLocalQaResponse(query) {
  const cleaned = normalize(query);
  if (!cleaned) return null;

  const candidates = getRelevantKnowledgeEntries(query);
  if (!candidates.length) {
    return {
      answer:
        "这个问题我暂时没有在当前演示知识库中检索到明确答案。你可以换一种问法，或者先问我睡眠记录、达卫可适应症、用药周期、余量、有效期这类问题。",
      sources: [],
      mode: "local",
    };
  }

  return {
    answer: candidates[0].answer,
    sources: candidates.slice(0, 3),
    mode: "local",
  };
}

export function buildKnowledgeContext(query) {
  const candidates = getRelevantKnowledgeEntries(query).slice(0, 6);
  const profile = medicationProfile.currentMedication;

  return {
    profile: {
      medicationName: profile.name,
      brandName: profile.brandName,
      reminderTime: profile.reminderTime,
      cycleDays: profile.cycleDays,
      currentDay: profile.checkedInDays + 1,
      usedTablets: profile.usedTablets,
      remainingTablets: profile.remainingTablets,
      refillDate: profile.refillDate,
      expiresOn: profile.expiresOn,
    },
    snippets: candidates.map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      sourceLabel: item.source.shortLabel,
      sourceUrl: item.source.url,
    })),
  };
}
