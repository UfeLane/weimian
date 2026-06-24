# AI 问答接入说明

当前项目已经内置两层问答能力：

1. `本地知识库问答`
   不需要任何 API Key，直接读取 `src/data.js` 和程序内当前档案。
2. `可选 OpenAI 问答`
   当配置了 `OPENAI_API_KEY` 后，可通过 `/api/qa` 调用真实模型。

当前接法使用 OpenAI 官方推荐的 `Responses API`。

## 一、当前默认模式

默认是本地模式，对应 `.env.example` 中：

```env
VITE_QA_MODE=local
```

这个模式下：

- 页面直接使用本地知识库
- 可以演示来源、药品说明书、内部档案联动
- 不依赖联网模型

## 二、切到真实 AI

创建本地环境文件 `.env.local`：

```env
VITE_QA_MODE=remote
VITE_QA_API_BASE=/api/qa
OPENAI_QA_MODEL=gpt-5.4-mini
OPENAI_API_KEY=你的密钥
```

说明：

- `VITE_QA_MODE=remote`：前端优先请求 `/api/qa`
- `OPENAI_API_KEY`：只应该放在服务端环境变量，不要写进前端代码
- `OPENAI_QA_MODEL`：当前默认使用 `gpt-5.4-mini`

这个默认值是按 2026-06-24 查到的 OpenAI 官方模型页设置的：

- `gpt-5.5` 更适合复杂推理和编码
- `gpt-5.4-mini` 更适合成本和速度更友好的小模型场景

对于现在这个移动端 Demo 问答，`gpt-5.4-mini` 更合适。

## 三、问答策略

`/api/qa` 不会让模型自由发挥，它会先把这些内容一起打包给模型：

- 当前用户档案
- 当前药品信息
- 命中的知识库片段
- 命中的来源标签

同时服务端会通过 `instructions` 明确限制回答边界：

- 只根据本地知识片段和当前档案回答
- 遇到加量、减量、停药、换药等问题必须拒绝给出个体化建议
- 输出尽量控制为适合移动端卡片展示的 2 到 5 句

如果远程模型调用失败，会自动回退到本地知识库问答。

## 四、相关文件

- `src/lib/qa-core.js`
  本地知识检索和回退逻辑
- `src/lib/qa.js`
  前端统一问答入口
- `api/qa.js`
  可选的服务端 OpenAI 问答接口
- `src/data.js`
  当前知识库、药品、来源和内部档案

## 五、后续最适合接入的外部库

如果你后面要把知识库搬到 Notion，建议保留现在的结构：

1. Notion 做人工维护
2. 同步到 `knowledge-base-sample.json`
3. `/api/qa` 继续消费同步后的本地结构

这样改动最小，也最容易演示。
