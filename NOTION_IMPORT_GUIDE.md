# Notion 导入说明

当前环境没能稳定读出你发来的 Notion 页面结构，但我们已经把适合导入的样本表准备好了。

建议你在 Notion 里拆成 3 个数据库：

1. `问答知识库`
2. `药品库`
3. `说明书片段库`

如果你想把“用户档案 + 复诊问题”也独立管理，再加第 4 个数据库：

4. `用户档案库`

对应可导入文件在 [notion-import](D:\Documents\Claude\Projects\卫材\weimian-demo\notion-import)：

- [qa_knowledge_base.csv](D:\Documents\Claude\Projects\卫材\weimian-demo\notion-import\qa_knowledge_base.csv)
- [medication_library.csv](D:\Documents\Claude\Projects\卫材\weimian-demo\notion-import\medication_library.csv)
- [leaflet_sections.csv](D:\Documents\Claude\Projects\卫材\weimian-demo\notion-import\leaflet_sections.csv)

## 推荐字段

### 1. 问答知识库

| 字段 | 类型 |
| --- | --- |
| `title` | Title |
| `category` | Select |
| `question` | Text |
| `answer` | Text |
| `keywords` | Multi-select |
| `source_label` | Text |
| `source_url` | URL |
| `safety_sensitive` | Checkbox |

### 2. 药品库

| 字段 | 类型 |
| --- | --- |
| `brand_name` | Title |
| `english_brand` | Text |
| `generic_name` | Text |
| `manufacturer` | Text |
| `indication` | Text |
| `dose_summary` | Text |
| `strengths` | Multi-select |
| `route` | Text |
| `warning_summary` | Text |
| `source_labels` | Text |
| `source_urls` | Text |

### 3. 说明书片段库

| 字段 | 类型 |
| --- | --- |
| `section_title` | Title |
| `medication_id` | Text |
| `brand_name` | Text |
| `section_type` | Select |
| `summary` | Text |
| `source_label` | Text |
| `source_url` | URL |

## 导入建议

1. 先在 Notion 新建空数据库
2. 选择 `Merge with CSV` 或导入 CSV
3. 把 `keywords`、`strengths` 这类字段改成多选
4. 把 `safety_sensitive` 改成 checkbox
5. 如果你想继续扩展“用户内部档案”，单独再建一个 `用户档案库`

`category` 建议直接用这 4 个值：

- `sleep`
- `medication`
- `profile`
- `followup`

## 当前 Demo 对应关系

- `src/data.js`
  当前本地知识库和药品数据来源
- `knowledge-base-sample.json`
  更适合后续做同步或 API 化的样本结构
- `src/pages/FAQPage.jsx`
  当前问答页
- `src/pages/MedicationPage.jsx`
  当前药品导入与说明书展示页

## 下一步最适合做什么

如果你把 Notion 字段按上面建好，我下一步可以继续帮你做两件事：

1. 写一个 `notion -> local json` 的同步脚本
2. 把问答页切成“优先读 Notion 同步数据，再走本地 / 模型回答”
