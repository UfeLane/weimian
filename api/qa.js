import { buildKnowledgeContext, getLocalQaResponse } from "../src/lib/qa-core.js";

function readOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const chunks =
    data.output
      ?.flatMap((item) => item.content ?? [])
      ?.filter((item) => item.type === "output_text")
      ?.map((item) => item.text) ?? [];

  return chunks.join("\n").trim();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const { query } = req.body ?? {};
  if (!query || !String(query).trim()) {
    res.status(400).json({ error: "missing_query" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const fallback = getLocalQaResponse(String(query));
    res.status(200).json({
      answer: fallback?.answer ?? "当前未配置 OPENAI_API_KEY，已回退到本地知识库。",
      mode: "local-fallback",
      model: null,
    });
    return;
  }

  const context = buildKnowledgeContext(String(query));
  const model = process.env.OPENAI_QA_MODEL || "gpt-5.4-mini";

  const systemPrompt = [
    "你是卫眠伴行 Demo 中的 AI 问答助手。",
    "请只基于提供给你的知识片段和用户当前档案回答，不要编造未提供的信息。",
    "如果问题涉及加量、减量、停药、换药、补服等个体化用药决策，必须明确说明不能提供该建议，并建议遵循医生处方、正式说明书和药师指导。",
    "回答语言使用简体中文，适合移动端卡片展示，控制在 2 到 5 句。",
    "如果知识片段不足以支持回答，要坦诚说明当前知识库没有明确答案。",
  ].join(" ");

  const userPrompt = JSON.stringify(
    {
      question: query,
      currentProfile: context.profile,
      knowledgeSnippets: context.snippets,
    },
    null,
    2,
  );

  const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!openaiResponse.ok) {
    const errorText = await openaiResponse.text();
    const fallback = getLocalQaResponse(String(query));
    res.status(200).json({
      answer: fallback?.answer ?? "远程模型暂时不可用，已回退到本地知识库。",
      mode: "local-fallback",
      model,
      remoteError: errorText.slice(0, 500),
    });
    return;
  }

  const data = await openaiResponse.json();
  const answer = readOutputText(data) || "当前模型没有返回可展示的答案。";

  res.status(200).json({
    answer,
    mode: "remote",
    model,
  });
}
