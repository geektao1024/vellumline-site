# Vellum & Line SEO / Terraink Integration Plan

日期：2026-05-27

适用目录：

- SEO / 营销站：`/Users/mac/aitools/vellumline-seo`
- 地图编辑器工具：`/Users/mac/aitools/vellumline`

## 1. 当前结论

`vellumline-seo` 负责可索引的营销入口，`vellumline` 负责实际地图海报编辑器。当前推荐继续采用主站 + `/app` 的结构，把搜索流量、产品解释和工具转化留在同一个主域下。

推荐 URL：

```text
vellumline.app/                         首页：custom map poster maker + Terraink 搜索承接
vellumline.app/map-poster-maker          核心工具词页面
vellumline.app/running-route-poster      路线海报场景页
vellumline.app/terraink-alternative      Terraink 替代方案页
vellumline.app/terraink-map-poster-maker Terraink 风格地图海报页
vellumline.app/terraink-app              Terraink app 搜索承接页
vellumline.app/terraink-review           Terraink review 搜索承接页
vellumline.app/terraink-vs-vellum-line   对比页
vellumline.app/app                       实际地图海报工作台
```

## 2. 实施状态

已完成：

- `/app` 已集成为站内工具入口。
- 顶部导航已提供 `Open Studio` / Studio 入口。
- 首页、导航、footer、CTA、FAQ、Terraink 相关路径已改成 Vellum & Line 口径。
- 主题切换入口已隐藏，默认暗黑视觉。
- 价格页、案例页、博客页、更新页已改为简版 Vellum & Line 内容。
- 公开页面中的模板品牌词已清理。

需要继续关注：

- `LICENSE` 仍保留原授权文本，不应作为营销文案改写。
- 数据库、账号、支付、后台、聊天等模板能力仍在代码里，但不应出现在营销主路径。
- Next dev 当前仍提示无效实验配置 warning，需要单独清理 `next.config.mjs`。

## 3. 页面职责

首页：

- 目标是解释 Vellum & Line 是什么，并承接 `Terraink`、`custom map poster maker`、`map poster maker` 等搜索意图。
- 不应写成“我们不是某产品”的声明页。
- 不应出现模板站、SaaS、AI generator 等无关内容。

Terraink 替代页：

- 目标是承接比较型搜索意图。
- 表达必须清楚：Vellum & Line 独立运营，与 Terraink / TerraInk 无官方关联。
- 页面重点应放在“地图海报制作路径是否更直接”，而不是模仿对方品牌。

案例页：

- 只展示城市地图海报、路线记忆海报、礼物型地图海报。
- 图片必须与地图海报真实相关，不使用通用营销横幅。

价格页：

- 当前不做复杂套餐。
- 保留一句清楚说明：先开放浏览器工作台，付费打印、模板或账户计划后续再加入。

博客页：

- 当前作为轻量笔记入口。
- 没有内容时保持简短，不制造空洞文章。

更新页：

- 只保留真实产品更新、SEO 路径和工作台能力记录。

## 4. SEO 规则

优先词：

- `custom map poster maker`
- `map poster maker`
- `printable map poster`
- `route poster`
- `running route poster`
- `wedding map poster`
- `terraink`
- `terraink alternative`
- `terraink app`
- `terraink map poster maker`

写法规则：

- 标题中保留产品、地图海报、Terraink 相关意图。
- 正文避免堆词，优先解释用户能完成什么。
- 所有 Terraink 相关页面都要保留独立产品声明。
- 不使用 Terraink 商标素材、截图或可能造成官方关联误解的表达。

## 5. 验证标准

本地验证：

```bash
pnpm exec fumadocs-mdx
PORT=3000 pnpm dev
pnpm exec tsc --noEmit
```

页面检查：

```text
/
/pricing
/showcases
/blog
/updates
/zh
/zh/pricing
/zh/showcases
/zh/blog
/zh/updates
```

合格标准：

- 页面返回 200。
- 页面 HTML 不出现模板品牌词。
- 顶部导航可以进入 `/app`。
- 案例、价格、更新、博客不再使用无关 SaaS 文案。
- 视觉上保持暗黑地图工作室风格。
