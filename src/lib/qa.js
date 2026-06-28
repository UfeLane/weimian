import { buildKnowledgeContext, getLocalQaResponse, getRelevantKnowledgeEntries } from "./qa-core";

function resolveQaMode(modeOverride) {
  return modeOverride ?? import.meta.env.VITE_QA_MODE ?? "local";
}

export function getQaModePreset(modeOverride) {
  const mode = resolveQaMode(modeOverride);

  return mode === "local"
    ? {
        mode: "local",
        label: "本地知识库",
        detail: "直接检索内置睡眠知识、达卫可标签和程序内档案。",
        helper: "适合离线提报和稳定演示。",
      }
    : {
        mode: "remote",
        label: "远程小模型",
        detail: "先拼接当前档案与知识片段，再调用远程模型生成回答。",
        helper: "适合展示真实模型问答路径。",
      };
}

export async function askDemoQa(query, runtimeData, options = {}) {
  const mode = resolveQaMode(options.modeOverride);

  if (mode === "local") {
    return getLocalQaResponse(query, runtimeData);
  }

  const endpoint = import.meta.env.VITE_QA_API_BASE ?? "/api/qa";
  const candidates = getRelevantKnowledgeEntries(query, runtimeData).slice(0, 3);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        context: buildKnowledgeContext(query, runtimeData),
      }),
    });

    if (!response.ok) {
      throw new Error(`QA API failed: ${response.status}`);
    }

    const payload = await response.json();
    return {
      answer: payload.answer,
      sources: candidates,
      mode: payload.mode ?? "remote",
      model: payload.model ?? null,
    };
  } catch (error) {
    const fallback = getLocalQaResponse(query, runtimeData);
    return {
      ...fallback,
      mode: "local-fallback",
      error: error instanceof Error ? error.message : "remote_qa_failed",
    };
  }
}
