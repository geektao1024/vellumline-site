# Terraink 流量验证 MVP 与后续原创开发交接文档

日期：2026-05-22  
用途：给新线程启动“基于 SaaS 模板 + Terraink 开源仓库验证 MVP”的工作使用。  
结论级别：基于公开网页、GitHub、Reddit、LinkedIn、开源文档和网页源码的判断；无法替代 Terraink 自己的 GA/GSC 后台数据。

---

## 1. 总结结论

建议先使用 Terraink 开源仓库做 **30-60 天流量验证 MVP**，但不要把它作为长期闭源商业主站的代码地基。

推荐路线：

1. 用 Terraink fork 快速上线工具 MVP，验证是否能拿到搜索、社区、导出和订阅信号。
2. 从第一天使用自己的品牌、域名、URL 结构、SEO 页面和 analytics。
3. 由于 Terraink 当前新代码是 AGPL-3.0，验证版应保守按 AGPL 公开 fork 源码，保留版权和许可证，不使用 Terraink 名称、logo、视觉资产做混淆性商业服务。
4. 如果 30-60 天指标达标，再基于真实用户数据写 PRD，启动 clean-room 原创重写。
5. 后续原创版继续沿用同一域名和 URL，以保留 SEO 资产。

一句话定位：

> 先借 Terraink 验证“地图海报/路线纪念/地点纪念”是否能接到流量；商业化阶段再用自己的 SaaS 模板和原创实现承接。

---

## 2. Terraink 为什么成功

Terraink 的成功不是单点技术胜利，而是“需求真实 + 视觉可传播 + 开源社交证明 + 社区快速迭代”的组合。

### 2.1 需求真实

用户本来就有这些需求：

- 给家乡、旅行地、婚礼地点、纪念地做海报。
- 把跑步、骑行、徒步路线做成纪念图。
- 想要 Etsy 风格的城市地图海报，但希望更便宜、更可定制。
- 想要不懂 GIS 也能生成好看的 OSM 地图作品。
- 想要社媒封面、手机壁纸、桌面壁纸、打印图。

Reddit 的讨论里能看到非常明确的消费场景：有人提到 Etsy map posters 昂贵且通用，也有人提到打印服务、postcard、Printful、Gumroad 等商业化方向。说明它不只是开发者玩具，而是有生活场景的视觉工具。

### 2.2 价值表达低门槛

Terraink 的公开定位非常直白：

- Free map poster creator
- Map wallpaper generator
- Custom map art
- City map poster
- OpenStreetMap poster

这些词都属于工具类搜索词，用户一看就知道能做什么。它没有把自己包装成专业 GIS 软件，而是把复杂地图能力翻译成普通用户能理解的结果：海报、壁纸、打印。

### 2.3 输出结果天然适合传播

这个品类有一个重要优点：每个用户生成的结果都和自己有关。

- 自己的城市
- 自己的路线
- 自己的家乡
- 自己的旅行地
- 自己的纪念日地点

这类产品比普通工具更容易在 Reddit、X、Instagram、LinkedIn、Threads 上获得反馈，因为用户愿意展示结果，而不是只讨论功能。

### 2.4 开源带来信任与 GitHub 社会证明

Terraink 公开 GitHub 仓库，在短期内获得大量 stars/forks。公开数据快照：

- Terraink GitHub：`yousifamanuel/terraink`
- GitHub 创建时间：2026-02-10
- 截至 2026-05-22 查询：约 3129 stars / 341 forks / 51 open issues
- 主题标签：`maps`、`openstreetmap`、`poster`、`reactjs`、`wallpaper`、`webapp`

这类 stars 不只是 vanity metric，它会带来：

- 开发者可信度
- Reddit 帖子的可信背书
- GitHub 站内发现
- 技术媒体/Newsletter 收录
- Fork 与二创扩散

### 2.5 社区反馈推动功能迭代

Terraink issues 和 Reddit 评论里反复出现这些需求：

- GPX route / route highlight
- markers / custom icons
- more layers / borders / cycle ways
- layer color pickers
- SVG export
- PDF export
- custom typography
- 300 DPI print export
- mobile UX

这说明用户不是只来围观，而是在提出下一步功能。这是 MVP 能不能继续做下去的重要信号。

---

## 3. Terraink 当前实现方式与可借鉴点

### 3.1 技术栈

Terraink README 和 package 文件显示其核心技术栈是：

- React
- TypeScript
- Vite
- Bun
- MapLibre GL
- OpenStreetMap 数据生态
- OpenMapTiles / OpenFreeMap 瓦片
- Nominatim 地理编码
- Docker/Nginx 自托管支持

与 MapPoster Online 相比，Terraink 更偏“实时交互 + 快速导出”的工具产品；MapPoster Online 更偏“重数据抓取 + Rust/WASM 印刷渲染”的工程产品。

### 3.2 产品功能

Terraink README 中公开的主要功能：

- 任意地点的自定义城市地图海报。
- 地点搜索与坐标输入。
- 多主题配色和自定义色板。
- 道路、水体、公园、建筑等地图图层控制。
- 字体和文字控制。
- 高分辨率 PNG 导出。
- 后续已经扩展到 PDF、SVG、GPX route、markers、AdSense 等方向。

### 3.3 可复刻的产品架构

可借鉴：

- MapLibre 做实时地图预览。
- OpenFreeMap/OpenMapTiles 做矢量瓦片来源。
- Nominatim 或商业 geocoder 做地点搜索。
- Canvas/WebGL 做 PNG/PDF 导出。
- 主题 JSON + 布局 JSON 管理模板。
- GPX 上传和 marker 作为高价值差异功能。

不要复制：

- Terraink 源代码。
- Terraink 名称、logo、视觉资产。
- 具体主题 JSON、文案、README 结构。
- 可能构成派生作品的组件实现。

验证期可以 fork；长期商业期建议 clean-room 重写。

---

## 4. Terraink 当前流量来源判断

### 4.1 核心不是 SEO 冷启动，而是社区起爆

公开证据显示，Terraink 第一阶段增长主要来自：

1. Reddit 爆帖和 build-in-public 社区。
2. GitHub 开源传播。
3. GIS/地图垂直媒体与 Newsletter。
4. LinkedIn/X/Threads 等社交传播。
5. SEO 首页承接。

LinkedIn 上 Terraink 公开提到的一个月数据包括：

- 1.24M website requests
- 约 78,000 visitors
- 约 600k social media views
- 1,641 GitHub stars

这些数字与 Reddit/GitHub 的增长轨迹吻合，说明它不是纯靠自然搜索慢慢积累。

### 4.2 Reddit 是最重要的第一波流量入口

重点帖子：

- r/buildinpublic: “I built a tool to turn any coordinate into minimalist map art”
- r/SideProject: “I built Terraink: A 100% client-side map poster engine...”

Reddit 帖子有效的原因：

- 标题直观：把任意坐标变成 minimalist map art。
- 配图强：直接展示生成结果。
- 项目免费开源，降低怀疑。
- 作者主动问用户要 layer / art style 反馈。
- 评论里自然出现商业化建议、打印建议、路线建议、主题建议。

可复刻原则：

- 不发“我做了个 SaaS”，而发“我做了个能把你的城市/路线/纪念地点变成海报的免费工具”。
- 首图必须是高质量输出图。
- 帖子不要只放链接，要讲清楚为什么做、解决什么痛点、当前缺什么反馈。
- 每次发帖带一个具体场景：wedding map、running route、hometown poster、Etsy-style poster、phone wallpaper。

### 4.3 GitHub 是信任与二次发现来源

GitHub 对这个品类有特殊价值：

- 开源地图工具天然容易被开发者、GIS 用户、OSM 用户关注。
- stars 会变成产品可信度。
- README 里的社交链接、Product Hunt、Reddit、Instagram 形成流量互导。
- issues 记录用户需求，能反向帮助产品路线。

验证期建议：

- 你的 Terraink fork 源码必须公开，符合 AGPL。
- 但你自己的 SaaS 模板、营销站、支付/账号系统最好独立仓库，避免许可证边界混乱。
- GitHub README 可以把项目定位成“Traffic validation fork based on Terraink”，不要冒充官方。

### 4.4 GIS/地图垂直媒体是高质量 referral

公开出现的垂直引用：

- Spatialists 把 Terraink 描述为基于 OpenStreetMap 的艺术地图海报工具，并强调主题、布局、字体、图层定制。
- GeoObserver 以德语介绍 Terraink/TerraInk，强调用自由地理数据快速制作海报、壁纸、marker、路线等。
- GeoFeeds 收录了 Spatialists 对 Terraink 的介绍。

这类引用很重要，因为它们不是泛流量，而是精准人群：

- GIS 用户
- OSM 用户
- 地图爱好者
- DataViz 用户
- 开源工具关注者

复刻时要主动 outreach：

- OSM Weekly
- Spatialists
- GeoObserver
- GeoFeeds
- MapScaping
- QGIS/GIS newsletter
- Data visualization newsletter
- Indie tools newsletter

### 4.5 SEO 是承接层，但还没完全吃满

Terraink 首页 SEO 基础不错：

- title: `Terraink: Free Map Poster & Wallpaper Creator`
- description 包含 `Free online map poster and wallpaper generator`
- keywords 覆盖 `free map poster creator`、`map wallpaper generator`、`map poster maker`、`OpenStreetMap poster`
- canonical 指向 `https://terraink.app`
- JSON-LD 使用 `WebApplication`
- 有 Google Search Console 验证
- 有 OG/Twitter Card
- 有 AdSense

但它的公开 sitemap 目前只有首页，程序化 SEO 和场景页并不充分。因此截流空间还很大。

---

## 5. 是否可以先用 Terraink 做 MVP

可以。建议这样做。

### 5.1 可行原因

- 它已经有完整可用产品框架。
- 可以快速验证需求，而不是先花时间重写。
- AGPL 不禁止商业使用。
- 流量验证阶段公开源码没有太大问题。
- 后续可以根据真实数据重写，不会盲目开发。

### 5.2 风险边界

必须注意：

- Terraink 当前新代码是 AGPL-3.0。你修改后作为网站提供给用户使用，保守处理应公开对应源码。
- AGPL 不授予 Terraink 名称、logo、商标、视觉资产使用权。
- 不能把 fork 包装成官方 Terraink，不能造成混淆。
- 不要把 AGPL 代码和你后续闭源商业核心代码混在同一个不可分割应用里。
- 使用 Nominatim/OpenFreeMap/OpenMapTiles/OSM 数据时要遵守归因和使用政策。

### 5.3 推荐部署结构

为了后续转原创开发，建议一开始就拆开：

```text
www.yourdomain.com
  原创 SaaS 模板 / 营销站 / SEO 页面 / 账号 / 支付 / 博客
  尽量不要混入 Terraink 源码

app.yourdomain.com
  Terraink fork 验证版工具
  AGPL 合规公开源码

github.com/yourname/your-map-tool-fork
  公开 Terraink fork 源码

github.com/yourname/your-saas-site
  自己的 SaaS 模板仓库
```

这样做的好处：

- SEO 资产沉淀在自己的主域。
- 工具验证快。
- AGPL 边界更清楚。
- 后续 `app.yourdomain.com` 可以替换成原创实现。

注意：如果把 Terraink 源码深度嵌入 SaaS 模板同一个应用里，后续许可证边界会更麻烦。保守方案是先分离。

---

## 6. MVP 验证目标

### 6.1 30 天验证指标

建议设置这些门槛：

| 指标 | 目标 |
|---|---:|
| GSC impressions | > 5,000 |
| Organic clicks | > 300 |
| 海报导出率 | > 5% |
| 邮件订阅/保存设计/打印意向 | > 30 |
| 真实用户反馈 | > 20 条 |
| Reddit/社区单帖访问峰值 | 至少 1 次明显峰值 |
| 高意图关键词进入前 50 | 至少 3 个 |

### 6.2 60 天决策标准

满足以下任意 3 条，可以启动原创重写：

- 自然搜索稳定增长。
- 至少 1 个社区帖子带来有效流量和反馈。
- 每周有持续导出行为。
- 有用户询问打印、商业使用、批量生成、SVG/PDF、路线功能。
- 有用户留下邮箱或愿意付费。
- GSC 暴露出明确长尾关键词方向。

如果没达到：

- 不要急着重写。
- 优先调整定位、页面、社区话术、输出图质量。
- 继续验证具体场景，而不是继续堆功能。

---

## 7. MVP 产品定位

不要做“Terraink clone”。建议定位为：

> A free custom map poster maker for meaningful places, routes, and memories.

中文理解：

> 为有纪念意义的地点、路线和城市生成可打印地图海报。

### 7.1 首批目标用户

优先用户：

- 旅行纪念用户
- 跑步/骑行/徒步用户
- 婚礼/纪念日用户
- 家乡城市海报用户
- Etsy 数字文件卖家
- 地图/GIS/OSM 爱好者
- 社媒壁纸/封面用户

暂不优先：

- 专业 GIS 制图
- 企业地图分析
- 重度地图编辑器
- 地图 API SaaS

### 7.2 首屏表达

建议首屏标题方向：

- `Create a custom map poster from any place`
- `Turn your city, route, or memory into printable map art`
- `Free map poster maker for cities, routes, and special places`

不要只写：

- `Map generator`
- `OpenStreetMap renderer`
- `Cartographic poster engine`

这些对普通用户不够直观。

### 7.3 品牌词建议：2026-05-24 更新

旧建议 `PlaceMapArt` 更偏 SEO 关键词站，品牌感不足。新的主品牌建议改为：

> Vellum & Line

推荐原因：

- 艺术性更强：`Vellum` 有手稿、古地图、纸张、印刷媒介的语义，适合地图海报和装饰艺术。
- 识别度更高：不像 `Map Poster`、`Map Art` 这类通用词，能逐步沉淀自己的品牌搜索。
- 品类关联明确：`Line` 能同时指向道路、等高线、路线、版画线条，与地图视觉语言一致。
- 不限制功能：后续可以覆盖城市地图、路线海报、婚礼纪念地图、旅行纪念、壁纸、打印履约，不会被单一关键词限制。
- SEO 不冲突：主品牌走艺术定位，SEO 页面继续承接 `map poster maker`、`custom map art`、`city map poster`、`wedding map poster` 等通用词。

建议域名优先级：

| 优先级 | 域名方向 | 说明 |
|---|---|---|
| P0 | `vellumline.com` | 最短、最适合长期品牌，但需正式查域名可用性 |
| P1 | `vellumandline.com` | 与品牌全称一致，适合品牌保护 |
| P1 | `vellumline.app` | 工具属性明确，适合 Web app |
| P2 | `vellumline.art` | 艺术感强，但通用信任弱于 `.com` |

建议不要把主品牌继续定为：

- `PlaceMapArt`：SEO 语义清楚，但品牌像关键词拼接，艺术感不够。
- `MapPoster`：过于通用，且已有同名/近似站点和项目。
- `MapFrame`：已有现成竞品实体，品牌搜索容易被截走。
- `MapCanvas`：已有生成工具报道，搜索冲突明显。
- `StoryMap` / `MapStoryArt`：容易与 ArcGIS StoryMaps、MapStory 等实体混淆。
- `RouteMapArt`：适合路线功能页，不适合总品牌。

### 7.4 品牌落地写法

建议站点主品牌：

```text
Vellum & Line
```

建议首页 title：

```text
Vellum & Line | Custom Map Art for Meaningful Places
```

建议首页 H1：

```text
Turn a place into a piece of line art
```

建议首页 meta description：

```text
Create custom map posters from cities, routes, addresses, and meaningful places. Design printable map art for weddings, travel memories, hometown gifts, and wall decor.
```

建议首批 URL：

- `/`
- `/map-poster-maker`
- `/custom-map-art`
- `/custom-map-poster-maker`
- `/wedding-map-poster`
- `/running-route-poster`
- `/terraink-alternative`
- `/reviews/terraink`
- `/terraink-vs-vellum-line`

命名策略：

- 品牌层用 `Vellum & Line`。
- 域名层优先 `vellumline.com` 或 `vellumandline.com`。
- SEO 页面层继续吃 `map poster maker`、`custom map poster maker`、`personalized map art`、`wedding map poster` 等通用词。
- 社区发布时不要只讲品牌名，要用 `I built a free map poster maker for meaningful places` 这类高理解度表达。
- 等有第一波用户后，再用 `Vellum & Line` 承接品牌搜索。

注意：以上是基于公开搜索结果的命名建议，不等同于正式商标或域名可用性结论。上线前仍建议检查域名、USPTO/WIPO/目标市场商标，以及主要社媒账号可用性。

---

## 8. MVP 功能优先级

### 8.1 P0：必须有

- 地点搜索：城市、地址、坐标。
- 实时地图预览。
- 主题模板：至少 12 个高质量主题。
- 尺寸模板：A4、A3、Square、Phone wallpaper、Instagram、16:9。
- PNG 导出。
- PDF 导出。
- 标题、副标题、坐标、日期可编辑。
- OSM attribution。
- GA4/GSC/PostHog 或 Plausible。
- 基础 SEO 页面。

### 8.2 P1：最能差异化

- GPX 路线上传。
- 路线高亮。
- 地点 marker。
- Wedding / Travel / Running / Cycling 模板。
- 公开分享链接。
- 保存最近作品。
- 打印尺寸说明。

### 8.3 P2：后续增强

- 真 SVG 导出。
- 商业打印履约。
- 批量城市生成。
- AI 配色：上传照片提取色板。
- 自定义字体上传。
- 多语言。
- 账号保存作品。

---

## 9. SEO 截流策略

截流不要只抢 `Terraink` 品牌词。更大的空间在：

- 功能词
- 场景词
- 格式词
- 竞品 alternative 词
- 城市长尾词
- 路线/GPX 长尾词

### 9.1 核心工具页

| URL | 主关键词 | 搜索意图 |
|---|---|---|
| `/map-poster-maker` | map poster maker | 想直接制作 |
| `/free-map-poster-generator` | free map poster generator | 免费工具 |
| `/custom-map-poster-maker` | custom map poster maker | 高定制 |
| `/city-map-poster-maker` | city map poster maker | 城市海报 |
| `/map-wallpaper-generator` | map wallpaper generator | 壁纸 |
| `/openstreetmap-poster-generator` | OpenStreetMap poster generator | OSM 用户 |

这些页面必须直接嵌入可用工具或强 CTA，不能只是文章。

### 9.2 场景页

| URL | 主关键词 | 页面重点 |
|---|---|---|
| `/wedding-map-poster` | wedding map poster | 婚礼地点、日期、坐标 |
| `/anniversary-map-poster` | anniversary map poster | 纪念日地点 |
| `/travel-map-poster` | travel map poster | 旅行城市/路线 |
| `/running-route-poster` | running route poster | GPX/Strava 路线 |
| `/cycling-route-poster` | cycling route poster | 骑行轨迹 |
| `/hometown-map-poster` | hometown map poster | 家乡城市 |
| `/first-date-map-poster` | first date map poster | 情感纪念场景 |

场景页要有真实示例图，不要只写泛泛文案。

### 9.3 格式页

| URL | 主关键词 | 页面重点 |
|---|---|---|
| `/300-dpi-map-poster` | 300 DPI map poster | 打印质量 |
| `/map-poster-pdf-export` | map poster PDF export | PDF 打印 |
| `/map-poster-svg-export` | map poster SVG export | 设计师/矢量 |
| `/phone-map-wallpaper` | phone map wallpaper | 手机壁纸 |
| `/instagram-map-poster` | Instagram map poster | 社媒尺寸 |
| `/a4-map-poster` | A4 map poster | 家用打印 |

### 9.4 竞品截流页

| URL | 目标 |
|---|---|
| `/terraink-alternative` | Terraink 用户对比 |
| `/maptoposter-alternative` | MapToPoster/CLI 用户 |
| `/mapdreamer-alternative` | 商业竞品 |
| `/printcitylines-alternative` | 打印商业竞品 |
| `/urmappu-alternative` | 地图海报竞品 |
| `/cartotile-alternative` | OSM 风格地图竞品 |

写法原则：

- 客观对比，不攻击。
- 对比功能、价格、导出格式、路线支持、是否需要注册、是否适合打印。
- 页面中要放“Try our free map poster maker”。
- `Terraink alternative` 页面要特别注意措辞，说明不是官方，不使用商标混淆。

### 9.5 Terraink 品牌词截流矩阵

2026-05-24 搜索结果显示，`Terraink / TerraInk` 品牌词 SERP 已经出现以下类型页面：

- 官方站和 GitHub。
- Reddit 发布帖和社区讨论。
- GIS/OSM 垂直媒体报道。
- 第三方 APK / App Store 页面。
- SrcLog、Railway、Z.Tools 等开源/工具目录页面。
- Gridinsoft、AppBrain、Houzz 等 review/rating 或安全评分页面。
- 葡语、德语媒体报道。

这说明 `Terraink` 品牌词已经不是只有官方自己占位，第三方页面也能进入结果页。截流策略应围绕“用户搜索 Terraink 之后下一步想知道什么”来建页面，而不是只做一个 `alternative` 页面。

优先页面矩阵：

| 优先级 | URL | 主关键词 | 意图 | 页面类型 |
|---|---|---|---|---|
| P0 | `/terraink-alternative` | Terraink alternative | 找替代工具 | 商业对比页 |
| P0 | `/reviews/terraink` | Terraink review / Terraink rating | 判断是否值得用 | Review / rating 页 |
| P0 | `/terraink-vs-vellum-line` | Terraink vs Vellum & Line | 直接比较 | VS 页 |
| P1 | `/terraink-pricing` | Terraink pricing | 价格/免费/限制 | 价格解释页 |
| P1 | `/what-is-terraink` | what is Terraink / TerraInk | 信息了解 | 解释型页面 |
| P1 | `/terraink-open-source` | Terraink open source | GitHub/许可证 | 开源与许可证说明页 |
| P1 | `/terraink-map-poster-maker` | Terraink map poster maker | 品牌 + 类目 | 品牌类目页 |
| P2 | `/maptoposter-vs-terraink` | MapToPoster vs Terraink | 来源/实现对比 | 技术比较页 |
| P2 | `/terraink-app` | Terraink app | 移动端/安装搜索 | 信息页，不冒充官方 app |

页面上线顺序：

1. 先做 `/terraink-alternative`、`/reviews/terraink`、`/terraink-vs-vellum-line`。
2. 等 GSC 出现 `terraink pricing`、`terraink app`、`terraink open source` 等 impression 后，再扩展 P1/P2。
3. 如果 `TerraInk` 拼写比 `Terraink` 更常见，标题和正文同时覆盖两种写法，但 URL 保持 `terraink`，避免 URL 分裂。

不要做：

- 不要写“Official Terraink alternative”。
- 不要让页面看起来像 Terraink 官方页面。
- 不要复制 Terraink 的 logo、商标、截图作为主视觉。
- 不要编造评分、用户数、收入、下载量。
- 不要用 `AggregateRating` 结构化数据制造虚假星级。

### 9.6 `/reviews/terraink` rating 页面结构

这个页面的目标不是攻击 Terraink，而是承接“我看到 Terraink，想知道它是否适合我”的搜索意图。页面应采用透明、可验证的编辑评分。

建议 SEO：

```text
Title: Terraink Review: Features, Rating, Pros, Cons, and Alternatives
H1: Terraink Review: Is It the Right Map Poster Maker?
Meta: An objective Terraink review covering features, export options, open-source license, print readiness, limitations, and alternatives for custom map art.
URL: /reviews/terraink
```

页面结构：

1. `Quick verdict`
   - 一句话说明 Terraink 适合谁。
   - 一句话说明谁可能需要替代方案。
   - 放一个 `Try Vellum & Line` CTA。

2. `Terraink rating`
   - 使用“Editorial rating”，不要冒充真实用户评分。
   - 评分维度建议：
     - Ease of use
     - Map customization
     - Export quality
     - Print readiness
     - Route / GPX support
     - Commercial use clarity
     - Mobile experience
     - Brand / license risk for builders

3. `Pros`
   - 免费。
   - 开源。
   - 浏览器内使用。
   - 使用 OSM / OpenMapTiles / MapLibre 生态。
   - 主题和图层控制强。

4. `Cons`
   - 直接 fork 用于商业闭源主站会触发 AGPL 风险。
   - 没有完整打印履约链路。
   - 用户对移动端、付费下载、账户保存、路线导入等需求仍有扩展空间。
   - 依赖外部地图/地理编码服务，流量放大后需要服务治理。

5. `Terraink vs Vellum & Line`
   - 用 HTML 表格，不用图片表格。
   - 比较项：定位、是否免费、导出格式、模板、路线、婚礼/旅行场景、打印指南、商业化、开源许可证、适合人群。

6. `Best Terraink alternatives`
   - Vellum & Line
   - MapPoster / MapToPoster
   - MapDreamer
   - Cartotile
   - MapArtPrint
   - MapImage

7. `FAQ`
   - Is Terraink free?
   - Is Terraink open source?
   - Can I use Terraink commercially?
   - What is the best Terraink alternative?
   - Does Terraink export PDF or SVG?
   - Does Terraink work for wedding map posters?
   - What is the difference between Terraink and MapToPoster?

结构化数据建议：

- 可以用 `FAQPage`。
- 可以用 `SoftwareApplication` 描述 Vellum & Line 自己。
- 暂不使用 `AggregateRating`，除非站内有真实用户评分系统和可验证评分样本。
- 对 Terraink 的客观事实应引用 GitHub README、许可证、官网、第三方媒体页面。

### 9.7 多语言截流规划

多语言不要一开始全量翻译。先根据已有搜索信号和本地词需求分批做。

优先级：

| 优先级 | 语言/市场 | 证据 | 主要机会 |
|---|---|---|---|
| P0 | English / Global | Reddit、GitHub、App Store、第三方目录 | 最大品牌词和工具词市场 |
| P1 | German / DACH | GeoObserver、DenkfabrikBlog 已报道 Terraink | `Terraink Alternative`、`Kartenposter erstellen` |
| P1 | Portuguese / Brazil + Portugal | Tek Notícias、葡语 LinkedIn 扩散 | `poster cartográfico`、`pôster de mapa personalizado` |
| P2 | French | `affiche carte personnalisée` 类目词存在，设计/礼品市场强 | `alternative Terraink`、`affiche carte personnalisée` |
| P2 | Spanish | `poster mapa personalizado`、CEWE 等商业页面存在 | `alternativa a Terraink`、`poster mapa personalizado` |
| P3 | Japanese | 设计审美强，但需重新做关键词研究 | `地図ポスター`、`カスタム地図アート` |

推荐 URL 结构：

```text
/terraink-alternative
/reviews/terraink
/terraink-vs-vellum-line

/de/terraink-alternative
/de/terraink-review
/de/kartenposter-erstellen

/pt-br/alternativa-ao-terraink
/pt-br/review-terraink
/pt-br/poster-cartografico-personalizado

/fr/alternative-terraink
/fr/avis-terraink
/fr/affiche-carte-personnalisee

/es/alternativa-a-terraink
/es/resena-terraink
/es/poster-mapa-personalizado
```

每个语言版本要做本地化，不要只机翻：

- 标题按当地搜索习惯改写。
- FAQ 使用当地用户会问的问题。
- 示例城市选择本地高认知城市。
- 截图和示例图使用对应市场城市。
- 价格/打印建议使用本地纸张尺寸、货币和打印习惯。

技术要求：

- 使用子目录，不用子域名。
- 每个页面设置自引用 canonical。
- 每个页面输出完整 hreflang，包括 `x-default`。
- sitemap 中包含多语言 alternate。
- 语言切换器使用真实 `<a>` 链接，不能只用 JS 按钮。
- 不要一次发布几百个翻译页；先发布每个市场 3-5 个高质量页面。

潜在市场占据顺序：

1. English：先吃 `Terraink alternative / review / vs` 和核心工具词。
2. German：利用已有媒体报道带来的认知，做 `Kartenposter` 与 `Terraink Alternative`。
3. Portuguese：利用葡语报道里的 `poster cartográfico` 语义，做教程和替代页。
4. French / Spanish：从通用场景词进入，不要只押 Terraink 品牌词。
5. Japanese：等产品视觉和模板更成熟后再做，避免低质量翻译页。

### 9.8 城市程序化 SEO

第一批建议 50 个城市，不要一口气做几千个薄页面。

URL：

```text
/city-map-poster/new-york
/city-map-poster/paris
/city-map-poster/london
/city-map-poster/tokyo
/city-map-poster/berlin
/city-map-poster/shanghai
```

每页至少包含：

- 城市地图海报预览图。
- 推荐主题。
- 推荐尺寸。
- 城市简短介绍。
- 一键打开工具并预填城市。
- FAQ。
- 内链到场景页和核心工具页。

禁止：

- 只替换城市名。
- 没有真实图片。
- 没有独特内容。

### 9.9 教程内容

优先写这些：

- `How to make a custom city map poster`
- `How to turn a GPX route into a poster`
- `How to print a 300 DPI map poster`
- `Best map poster generators`
- `Map poster size guide`
- `Best wedding map poster ideas`
- `How to create a hometown map poster`

教程文章要导向工具，不要只做信息内容。

---

## 10. 社区冷启动打法

### 10.1 Reddit

优先社区：

- r/SideProject
- r/buildinpublic
- r/mapmaking
- r/MapPorn
- r/OpenStreetMap
- r/gis
- r/running
- r/cycling
- r/EtsySellers
- r/weddingplanning
- r/travel

发帖原则：

- 每个帖子只打一个场景。
- 首图必须是结果图。
- 标题强调结果，不强调 SaaS。
- 主体说明“免费、无需注册、想要反馈”。
- 结尾问一个具体问题，例如“你会想加什么地图风格？”、“路线海报你更想要 GPX 还是 Strava 导入？”

示例标题：

```text
I made a free tool that turns any city into a printable map poster
I built a map poster maker for runners: upload GPX, export a route poster
I made a wedding map poster generator for special places and dates
I wanted Etsy-style city posters without paying for every version, so I built this
```

### 10.2 Product Hunt / DevHunt / 目录站

适合等第一轮产品稳定后再发，不要太早。

准备材料：

- 8-12 张城市/路线示例图。
- 30 秒无声 demo 视频。
- 一个非常明确的 tagline。
- GitHub 链接。
- 路线/婚礼/旅行等场景截图。

### 10.3 GIS/地图媒体 outreach

邮件主题方向：

```text
Free OSM-based map poster maker for cities, routes, and print layouts
Open-source map art tool built with MapLibre and OpenStreetMap
```

邮件内容要短：

- 一句话说明工具。
- 3 张示例图。
- GitHub 链接。
- 说明免费/开源/OSM attribution。
- 说明和 Terraink/MapToPoster 的区别：更偏 routes / print / use cases。

---

## 11. Analytics 与事件埋点

验证期一定要从第一天埋点。推荐 GA4 + PostHog/Plausible 二选一。

### 11.1 必须记录的事件

```text
location_search
location_selected
theme_selected
layout_selected
marker_added
gpx_uploaded
poster_export_started
poster_export_completed
export_format_selected
email_subscribed
print_intent_clicked
share_clicked
source_code_clicked
```

### 11.2 关键漏斗

```text
Landing page view
  -> Tool opened
  -> Location selected
  -> Theme/layout adjusted
  -> Export completed
  -> Email/print/share action
```

### 11.3 每周看板

每周记录：

- Sessions
- Organic clicks
- GSC impressions
- Top queries
- Top landing pages
- Export completion rate
- GPX upload count
- Marker usage count
- Email/print intent count
- Reddit/referral spikes

---

## 12. 30 天执行计划

### Day 1-3：基础搭建

- Fork Terraink。
- 替换品牌名、logo、favicon、OG 图。
- 移除 Terraink 商标混淆表达。
- 保留 AGPL、版权、来源说明。
- 配置自己的域名。
- 设置 `www` 营销站与 `app` 工具站。
- 接入 GA4、GSC、PostHog/Plausible。
- 加 sitemap、robots、canonical。

### Day 4-7：SEO 基础页

上线：

- `/map-poster-maker`
- `/free-map-poster-generator`
- `/custom-map-poster-maker`
- `/running-route-poster`
- `/wedding-map-poster`
- `/terraink-alternative`
- `/maptoposter-alternative`

每页都要有真实示例图和工具 CTA。

### Day 8-14：社区发布

发布 3-5 个不同角度帖子：

- SideProject：整体工具。
- buildinpublic：开发过程和数据。
- running/cycling：GPX 路线海报。
- wedding/travel：场景化海报。
- OpenStreetMap/GIS：技术与开源。

同时收集评论中的功能需求。

### Day 15-21：补功能与示例

根据反馈优先补：

- 主题模板。
- marker。
- route/GPX。
- PDF/300DPI。
- 保存设计。
- 分享图。

### Day 22-30：复盘与第二轮发布

- 看 GSC query。
- 看导出事件。
- 看社区反馈。
- 写一篇透明复盘文章。
- 准备 Product Hunt/DevHunt。
- 决定是否进入 60 天继续验证。

---

## 13. 后续原创开发路线

当指标达标后，进入 clean-room 重写。

### 13.1 重写原则

- 新仓库从空项目开始。
- 不复制 Terraink 代码、主题、文案、视觉资产。
- 根据自己的 analytics 和用户反馈写 PRD。
- 代码实现使用公开库：React/Next.js、MapLibre、OpenMapTiles/OpenFreeMap、商业 geocoder 或自建代理。
- 自己设计主题系统、导出系统、路线系统。

### 13.2 原创版建议架构

```text
Next.js / SaaS template
  Marketing pages
  SEO pages
  Blog/tutorials
  Auth
  Billing
  Saved projects

Map editor module
  MapLibre preview
  Theme/layout engine
  Route/marker editor
  Export service

Backend
  Project save
  Share links
  Stripe
  Print fulfillment
  Tile/geocode proxy/cache
```

### 13.3 原创版商业化

免费：

- 基础 PNG。
- 少量主题。
- 公开水印可选。

付费：

- 300 DPI PDF。
- SVG。
- 批量导出。
- 无水印。
- 保存作品。
- 高级主题。
- 打印履约。
- 商业授权。

---

## 14. 新线程启动提示词

新开线程时可以直接复制下面这段：

```text
我准备基于 SaaS 模板启动一个地图海报工具站 MVP。目标是先用 Terraink 开源仓库做 30-60 天流量验证，后续如果指标达标，再 clean-room 重写原创商业版本。

请先阅读当前工作目录下的 terraink-mvp-handoff.md，按里面的路线执行。

当前建议品牌名是 Vellum & Line，域名优先检查 vellumline.com 和 vellumandline.com。

优先目标：
1. 搭建 www 营销站 + app 工具站的结构。
2. Terraink fork 作为 AGPL 合规的 MVP 工具，不使用 Terraink 商标和视觉资产。
3. SaaS 模板负责品牌、SEO 页面、analytics、GSC、后续账号/支付扩展。
4. 第一批 SEO 页面包括 map-poster-maker、free-map-poster-generator、running-route-poster、wedding-map-poster、terraink-alternative、reviews/terraink、terraink-vs-vellum-line、maptoposter-alternative。
5. 从第一天埋点：location_selected、theme_selected、gpx_uploaded、poster_export_completed、email_subscribed、print_intent_clicked。
6. 30 天目标是验证自然搜索、社区流量、导出率和真实反馈，而不是做完美产品。

请先检查 SaaS 模板的现有技术栈和路由结构，然后给出落地实施计划并开始搭建。
```

---

## 15. 搜索记录与引用来源

### 15.1 本次查询关键词

使用过的主要查询：

```text
"terraink.app" "Reddit" "buildinpublic"
"terraink.app" "SideProject" Reddit
"Terraink" "Spatialists"
"Terraink" "GeoObserver"
"Terraink" "1.24 Million Website Requests"
"Terraink" "78,000 Visitors"
"Terraink" "600k+ Total Views"
map poster generator online custom map poster maker
free map poster creator openstreetmap poster generator
city map poster maker online
map wallpaper generator online
map poster maker
custom map poster maker
personalized map art
custom map art maker
"PlaceMapArt"
"MapPosterly"
"MapStoryArt"
"RouteMapArt"
"MapKeepsake"
"MapCanvas"
"MapFrame"
"MapPoster"
"Vellum & Line"
"Vellum and Line"
"vellumline"
"vellum line" "map"
terraink app map poster
terraink alternative
terraink review
terraink pricing
"terraink alternative"
"terraink alternatives"
"terraink vs"
"terraink review"
"TerraInk" "map poster"
"TerraInk" "affiche carte"
"TerraInk" "poster cartográfico"
"TerraInk" "mapa poster"
"TerraInk" "karten poster"
kartenposter erstellen online
affiche carte personnalisée en ligne
poster mapa personalizado online
poster cartográfico personalizado
```

### 15.2 关键来源

| 来源 | 链接 | 用途 |
|---|---|---|
| Terraink GitHub | https://github.com/yousifamanuel/terraink | 仓库、stars/forks、README、技术栈、许可证说明 |
| Terraink README raw | https://raw.githubusercontent.com/yousifamanuel/terraink/main/README.md | 功能、数据源、AGPL、商标、Business 联系方式 |
| Terraink Trademark | https://raw.githubusercontent.com/yousifamanuel/terraink/main/TRADEMARK.md | 商标限制、AGPL 与商标权边界 |
| Terraink 官网 | https://terraink.app/ | SEO title/meta/JSON-LD/AdSense/GSC 验证 |
| Reddit r/buildinpublic | https://www.reddit.com/r/buildinpublic/comments/1rjztdg/i_built_a_tool_to_turn_any_coordinate_into/ | 社区传播、用户需求、商业化反馈 |
| Reddit r/SideProject | https://www.reddit.com/r/SideProject/comments/1rbx1u7/i_built_terraink_a_100_clientside_map_poster/ | 早期发布与开源定位 |
| Terraink LinkedIn post | https://www.linkedin.com/posts/terraink_mapart-terraink-opensource-activity-7441930173828087808-9DIO | 一个月增长数据：requests、visitors、social views、stars |
| Spatialists | https://spatialists.ch/posts/2026/04/11-terraink/ | GIS/地图垂直媒体收录和功能评价 |
| GeoObserver | https://geoobserver.de/2026/04/29/terraink-coole-diy-poster-und-wallpaper-mit-osm-daten/ | 德语 GIS/OSM 垂直媒体收录 |
| GeoFeeds | https://geofeeds.me/briefings/geofeeds-briefing-2026-04-11.md | GIS Newsletter 聚合收录 |
| MapPoster Online GitHub | https://github.com/ianho7/maptoposter-online | 对照竞品，MIT、Rust/WASM、Overpass 实现 |
| MapDreamer | https://mapdreamer.com/ | `map poster maker` / custom map poster 竞品参考 |
| Cartotile | https://cartotile.com/ | custom map art / print 竞品参考 |
| MapArtPrint | https://mapartprint.com/ | personalized map art 竞品参考 |
| MapImage | https://www.mapimage.com/ | custom map image / map poster 竞品参考 |
| Cityograph | https://cityograph.com/ | city map poster / wall art 竞品参考 |
| Urmappu | https://urmappu.com/ | personalized map poster 竞品参考 |
| MapFrame | https://www.map-frame.com/ | 命名避让与竞品参考 |
| MapPoster | https://mapposter.xyz/ | 命名避让与竞品参考 |
| Boing Boing: MapCanvas | https://boingboing.net/2025/02/18/mapcanvas-generates-minimal-customizable-maps-to-print-out.html | `MapCanvas` 命名避让与产品形态参考 |
| ArcGIS StoryMaps | https://doc.esri.com/es/arcgis-storymaps/latest/get-started/what-is-arcgis-storymaps.html | `StoryMap` / `MapStoryArt` 命名风险参考 |
| Vellum Wikipedia | https://en.wikipedia.org/wiki/Vellum | `Vellum & Line` 品牌语义参考：纸张、手稿、古地图媒介 |
| Portolan chart | https://en.wikipedia.org/wiki/Portolan_chart | 古地图/航海图品牌语义参考 |
| Terraink App Store | https://apps.apple.com/in/app/terraink-map-poster-maker/id6761080139 | `Terraink app` / 移动端品牌词 SERP 参考 |
| terraink.lol APK page | https://terraink.lol/ | 第三方 APK/工具页面占据 Terraink 品牌词 SERP 的证据 |
| AppBrain Terraink | https://www.appbrain.com/app/terraink/app.terraink | `Terraink rating/download` 搜索意图参考 |
| Gridinsoft Terraink Review | https://gridinsoft.com/online-virus-scanner/url/terraink-app | `Terraink review` / trust score 页面参考 |
| SrcLog Terraink | https://srclog.com/terraink | `Terraink alternatives` / open-source directory SERP 参考 |
| Z.Tools TerraInk | https://z.tools/explore/terraink | 工具目录收录与描述参考 |
| Railway Deploy Terraink | https://railway.com/deploy/terraink | 开源部署型搜索结果参考 |
| Oozemaps | https://oozemaps.com/ | 地图海报同类站与潜在主题/关键词竞品参考 |
| Tek Notícias TerraInk | https://tek.sapo.pt/extras/site-do-dia/artigos/terraink-transforme-qualquer-lugar-do-mundo-num-poster-cartografico-pronto-a-imprimir/ | 葡语市场和 `poster cartográfico` 语义参考 |
| DenkfabrikBlog Terraink | https://denkfabrikblog.de/2026/04/07/linktipp-terraink-the-cartographic-poster-engine/ | 德语市场 Terraink 报道参考 |
| GNU AGPL-3.0 | https://www.gnu.org/licenses/agpl-3.0.en.html | 网络服务源码义务参考 |
| Nominatim Usage Policy | https://operations.osmfoundation.org/policies/nominatim/ | 地理编码公共服务使用限制 |

### 15.3 本次公开数据快照

查询时间：2026-05-22

| 项目 | Stars | Forks | Open Issues | 许可证/策略 | 备注 |
|---|---:|---:|---:|---|---|
| Terraink | 3129 | 341 | 51 | README 标注 2026-04-03 后 AGPL-3.0，含商标保护 | 社区传播强，功能面广 |
| MapPoster Online | 317 | 17 | 1 | MIT | 工程实现重，Rust/WASM + Overpass |

### 15.4 2026-05-24 补充检索结论

- 主品牌建议从 `PlaceMapArt` 调整为 `Vellum & Line`。`PlaceMapArt` 保留为 SEO 语义参考，不建议作为主品牌。
- `Vellum & Line` 的公开搜索结果未发现直接地图海报竞品强占位，但 `Vellum` 本身是通用纸张/手稿词，正式上线前仍要做商标和域名检查。
- `Terraink / TerraInk` 品牌词 SERP 已出现第三方 APK、App Store、SrcLog、Gridinsoft、AppBrain、Z.Tools、Railway、德语/葡语媒体、Reddit 等结果，说明第三方页面有机会进入品牌词结果页。
- 截流重点应从单页 `/terraink-alternative` 扩展为 `/terraink-alternative`、`/reviews/terraink`、`/terraink-vs-vellum-line` 三页组合。
- 多语言优先级建议为 English、German、Portuguese、French、Spanish，Japanese 暂放 P3。

---

## 16. 待验证问题

这些需要在实际 MVP 中用数据验证：

- `map poster maker` 这类词真实转化率如何。
- 用户更愿意为 PDF/SVG 付费，还是为打印履约付费。
- GPX route poster 是否比普通 city poster 更高意图。
- Wedding/travel/hometown 哪个场景最容易带来订阅。
- Reddit 是否还能重复 Terraink 的传播效果。
- SEO 城市页是否会被 Google 视为薄内容。
- 使用公共 Nominatim/OpenFreeMap 在流量上升后是否稳定。

---

## 17. 最终建议

短期不要过度纠结原创开发，先用 Terraink fork 验证流量。

但从第一天就按长期商业化来设计边界：

- 自己的品牌。
- 自己的主域。
- 自己的 URL。
- 自己的 SEO 页面。
- 自己的 analytics。
- Terraink fork 独立公开。
- 后续原创重写时保留 SEO 资产。

这样做可以把前期试错成本降到最低，同时不把未来商业化锁死在 AGPL 和商标风险里。
