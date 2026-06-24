import { buildKnowledgeContext, getLocalQaResponse, getRelevantKnowledgeEntries } from "./qa-core";

export async function askDemoQa(query, runtimeData) {
  const mode = import.meta.env.VITE_QA_MODE ?? "local";

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
