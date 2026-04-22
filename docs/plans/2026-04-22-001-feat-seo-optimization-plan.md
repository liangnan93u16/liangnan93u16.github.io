---
title: SEO 优化计划
type: feat
status: active
date: 2026-04-22
deepened: 2026-04-22
---

# SEO 优化计划

## Overview

将本项目（`liangnan93u16.github.io`）从当前对搜索引擎不友好的 HashRouter SPA 配置，升级为具备完整 SEO 基础能力的静态站点。核心改进包括：替换 HashRouter 为 BrowserRouter 并适配 GitHub Pages 的 SPA 重定向、为每个页面注入独立的 meta 标签、添加结构化数据与站点地图。

## Problem Frame

当前站点的 SEO 存在以下结构性缺陷：

1. **HashRouter 导致 URL 不可索引**：所有路由以 `/#/` 开头，搜索引擎通常忽略 hash 片段，导致项目详情页无法被独立收录。
2. **全站共用一份 HTML**：`index.html` 是唯一入口，没有针对各路由的独立 `<title>` 和 `<meta name="description">`。
3. **缺少 SEO 基础设施**：无 `robots.txt`、无 `sitemap.xml`、无 Open Graph / Twitter Card 标签、无结构化数据（JSON-LD）。
4. **社交分享体验差**：分享到微信/微博/Twitter 时，无法展示对应项目的标题、描述和缩略图。

## Requirements Trace

- R1. 项目详情页具备可被搜索引擎索引的独立 URL（无 hash）。
- R2. 首页和每个项目详情页拥有独立的 `<title>` 和 `<meta name="description">`。
- R3. 每个页面包含完整的 Open Graph 和 Twitter Card 元数据。
- R4. 提供 `robots.txt` 引导搜索引擎爬取策略。
- R5. 提供 `sitemap.xml` 列出所有可索引页面。
- R6. 首页包含个人作品集级别的 JSON-LD 结构化数据；项目页包含 `SoftwareApplication` 级别的结构化数据。
- R7. 所有变更在 GitHub Pages 静态托管环境下正常工作；BrowserRouter 的直接访问和刷新行为正常。注意：HashRouter 的 `/#/` URL 将变为 `/` 路径 URL，现有外链需更新。

## Scope Boundaries

- **非目标**：引入 SSR/SSG（如 Next.js、Astro），保持现有 Vite + React SPA 架构不变。
- **非目标**：优化图片的 alt 文本和懒加载策略（当前已较完善）。
- **非目标**：外部链接建设、内容营销、性能 Core Web Vitals 深度优化。

## Context & Research

### Relevant Code and Patterns

- `src/App.tsx` — 当前使用 `HashRouter`，需要替换为 `BrowserRouter`。
- `index.html` — 静态 HTML 入口，存放全站默认 meta 标签。
- `src/data/projects.ts` — 所有项目数据来源，SEO 元数据可从 `Project` 接口提取。
- `src/pages/Home.tsx` / `src/pages/ProjectDetail.tsx` — 页面组件，负责注入页面级 meta。
- `.github/workflows/deploy.yml` — 构建后部署 `dist/` 目录到 GitHub Pages。
- `public/` 目录 — 静态文件（`robots.txt`、`sitemap.xml`、`404.html`）存放位置，Vite 构建时会原样复制到 `dist/`。

### External References

- [GitHub Pages SPA Redirect Trick](https://github.com/rafgraph/spa-github-pages) — 使用 `404.html` + `index.html` 内联脚本实现 BrowserRouter 在静态托管下的刷新兼容。
- [react-helmet-async](https://github.com/staylor/react-helmet-async) — 支持 React 18/19 的异步 meta 标签管理库，SSR-safe，适合 SPA 场景。

## Key Technical Decisions

- **BrowserRouter + 404.html 重定向**：GitHub Pages 不支持服务端路由回退，因此采用业界标准的 SPA 重定向方案——在 `404.html` 中通过脚本将路径写入 `sessionStorage` 并重定向到根目录，`index.html` 中读取并执行 `replaceState`。这比 HashRouter 的 SEO 收益远大于实现成本。
- **react-helmet-async**：选择此库而非 `react-helmet`，因为后者在 React 18+ 的并发模式下存在已知问题，而 `react-helmet-async` 明确支持 React 19 且 API 兼容，适合本项目使用的 React 19 SPA 场景。
- **sitemap 静态文件**：由于项目是纯静态数据驱动，项目列表在编译期已知，因此 `sitemap.xml` 采用手写/模板方式维护（项目数量 < 10，不需要构建期自动生成）。
- **JSON-LD 直接内嵌**：在每个页面的 `<Helmet>` 中通过 `<script type="application/ld+json">` 注入结构化数据，无需额外库。

## Open Questions

### Resolved During Planning

- **Q: 是否需要引入 SSR/SSG？** — 否。GitHub Pages 是纯静态托管，引入 SSR 需要服务端基础设施；SSG（如 `vite-plugin-ssg`）可以生成每个路由的独立 HTML，但会显著增加构建复杂度。对于 5 个项目的小规模作品集，SPA + 页面级 meta 已足够。
- **Q: HashRouter 的现有外链/书签是否会被破坏？** — 会。`/#/project/foo` 将变为 `/project/foo`。但由于站点目前未广泛传播，且 SEO 是核心诉求，接受此 breaking change。可在 `App.tsx` 中加入一段 mount 期的重定向逻辑（检测 hash 路由并 redirect），但本次计划不涵盖（复杂度与收益不匹配）。

### Deferred to Implementation

- **Q: OG 图片的具体尺寸和生成方式** — 需要确认是否使用项目首图作为 `og:image`。当前项目截图尺寸不一，可能需要生成统一尺寸的 OG 封面图。

## Implementation Units

- [ ] **Unit 1: 添加 react-helmet-async 并设置 Provider**

**Goal:** 引入 meta 标签管理库，为后续 per-page SEO 做准备。

**Requirements:** R2

**Dependencies:** None

**Files:**
- Modify: `package.json`（添加依赖）
- Modify: `src/main.tsx`（包裹 `HelmetProvider`）

**Approach:**
- 安装 `react-helmet-async`。
- 在 `main.tsx` 的根组件外包裹 `<HelmetProvider>`。

**Test scenarios:**
- Happy path: 页面加载后，`<Helmet>` 中的 title 能正确反映到浏览器标签页。

**Verification:**
- Dev server 启动后，切换路由时浏览器标签页 title 随页面变化。

---

- [ ] **Unit 2: 替换 HashRouter 为 BrowserRouter 并适配 GitHub Pages**

**Goal:** 消除 hash 路由，使 URL 对搜索引擎友好，同时保证直接访问/刷新行为正常。

**Requirements:** R1, R7

**Dependencies:** Unit 1

**Files:**
- Modify: `src/App.tsx`（替换 `HashRouter` → `BrowserRouter`）
- Create: `public/404.html`（SPA 重定向脚本）
- Modify: `index.html`（添加重定向恢复脚本）

**Approach:**
- 将 `src/App.tsx` 中的 `HashRouter` 替换为 `BrowserRouter`（无需 `basename`，因为 GitHub Pages 用户站点直接部署在根路径 `/`）。
- 在 `public/404.html` 添加重定向脚本：将当前路径保存到 `sessionStorage`，然后跳转至 `/`。
- 在 `index.html` 的 `<head>` 中添加恢复脚本：页面加载时检查 `sessionStorage` 中的重定向路径，执行 `history.replaceState` 恢复原始路径后清除。

**Patterns to follow:**
- [spa-github-pages](https://github.com/rafgraph/spa-github-pages) 的脚本模式。

**Test scenarios:**
- Happy path: 直接访问 `/project/rpi-love-calculator`，页面正确渲染对应项目。
- Edge case: 刷新 `/project/rpi-love-calculator`，不丢失当前页面状态。
- Error path: 访问不存在的路径 `/project/foobar`，正确渲染 404 页面（由 React Router 的 catch-all 处理）。

**Verification:**
- `npm run build` 后，本地用 `npx serve dist` 测试直接访问各路由均可正确显示。

---

- [ ] **Unit 3: 为 index.html 添加全站默认 SEO 基础标签**

**Goal:** 在静态 HTML 层面补齐全站共享的 meta 标签。

**Requirements:** R2, R3

**Dependencies:** None

**Files:**
- Modify: `index.html`

**Approach:**
- 保留现有的 `<meta name="description">`，优化文案使其更具吸引力（包含关键词：个人开发者、作品集、项目展示）。
- 添加 Open Graph 基础标签：`og:title`、`og:description`、`og:type`（`website`）、`og:url`、`og:image`、`og:locale`（`zh_CN`）。
- 添加 Twitter Card 标签：`twitter:card`（`summary_large_image`）、`twitter:title`、`twitter:description`、`twitter:image`。
- 添加 `canonical` link：`https://liangnan93u16.github.io/`。
- 添加 `<meta name="robots" content="index, follow">`。

**Test scenarios:**
- Happy path: 使用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 或 [Twitter Card Validator](https://cards-dev.twitter.com/validator) 验证首页 OG 标签被正确解析。

**Verification:**
- 查看 `index.html` 源码，所有要求的 meta 标签齐全且值合理。

---

- [ ] **Unit 4: 创建 robots.txt 和 sitemap.xml**

**Goal:** 为搜索引擎提供爬取指引和站点地图。

**Requirements:** R4, R5

**Dependencies:** Unit 2（需要知道 URL 模式才能写 sitemap）

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

**Approach:**
- `robots.txt`：允许所有爬虫访问，指定 sitemap 位置。
- `sitemap.xml`：列出所有页面 URL（首页 + 5 个项目详情页），包含 `<loc>`、`<lastmod>`、`<changefreq>`、`<priority>`。

**Test scenarios:**
- Happy path: 构建后 `dist/robots.txt` 和 `dist/sitemap.xml` 存在且内容正确。

**Verification:**
- `npm run build` 后检查 `dist/` 目录包含这两个文件。

---

- [ ] **Unit 5: 为首页添加 Helmet 元数据和 JSON-LD**

**Goal:** 首页拥有独立的 title/description，并注入作品集级别的结构化数据。

**Requirements:** R2, R3, R6

**Dependencies:** Unit 1, Unit 3

**Files:**
- Modify: `src/pages/Home.tsx`

**Approach:**
- 在 `Home.tsx` 中添加 `<Helmet>`：
  - `title`: "灵动工作室产品集 · 个人开发者项目展示"
  - `meta name="description"`: 150 字以内的站点介绍，包含关键词。
  - `link rel="canonical"`: `https://liangnan93u16.github.io/`
  - OG 标签覆盖首页专属内容。
- 添加 `Person` + `ItemList` JSON-LD：
  - `@type: Person`：`@id` 为站点 canonical URL + `#person`，包含姓名、url、描述、`sameAs`（GitHub 主页等）。
  - `@type: ItemList`：列出所有项目作为 `itemListElement`，每个元素为 `ListItem`，其 `item` 属性引用对应项目详情页 URL（不内联完整 `SoftwareApplication` 对象，避免首页 HTML 膨胀）。

**Test scenarios:**
- Happy path: 首页加载后，浏览器标签页 title 为设定值，`<meta name="description">` 为首页专属内容。
- Integration: Google Rich Results Test 能正确解析首页的 JSON-LD。

**Verification:**
- DevTools Elements 面板中，`<head>` 包含正确的 title、description、canonical、OG 标签和 JSON-LD script。

---

- [ ] **Unit 6: 为项目详情页添加 Helmet 元数据和 JSON-LD**

**Goal:** 每个项目详情页拥有独立的 title/description/OG 标签和 `SoftwareApplication` 结构化数据。

**Requirements:** R2, R3, R6

**Dependencies:** Unit 1, Unit 5

**Files:**
- Modify: `src/pages/ProjectDetail.tsx`

**Approach:**
- 在 `ProjectDetail.tsx` 中根据 `project` 数据动态生成 `<Helmet>`：
  - `title`: `{project.name} · 灵动工作室产品集`
  - `meta name="description"`: 使用 `project.description`（先检查现有字段长度，若均 < 150 字则直接复用，无需新增 `seoDescription`）。
  - `link rel="canonical"`: `https://liangnan93u16.github.io/project/{project.id}`
  - `og:title`、`og:description`、`og:type`（`article`）、`og:url`、`og:image`（使用项目首图）。
  - `twitter:card`、`twitter:title`、`twitter:description`、`twitter:image`。
- 注入 `SoftwareApplication` JSON-LD：
  - `@type: SoftwareApplication`
  - `name`、`description`、`screenshot`（项目图片数组）
  - `applicationCategory` 映射：`"桌面应用" → "UtilitiesApplication"`、`"教育工具" → "EducationalApplication"`、`"客户定制" → "BusinessApplication"`、其他 → `"SoftwareApplication"`
  - `operatingSystem`：仅当 `project.category === "桌面应用"` 时生成 `"macOS, Windows"`
  - `offers`：当 `project.badges?.includes("免费软件")` 或 `project.badges?.includes("开源")` 时生成 `{ "@type": "Offer", "price": "0", "priceCurrency": "CNY" }`

**Patterns to follow:**
- 复用 Unit 5 中 `<Helmet>` 的结构化写法。

**Test scenarios:**
- Happy path: 访问 `/project/rpi-love-calculator`，title 为 "RPI 恋爱占有欲计算器 · 灵动工作室产品集"。
- Happy path: 访问 `/project/art-gallery-ecommerce`，description 为该项目专属内容。
- Edge case: 访问不存在的项目 ID，title 为 "项目未找到 · 灵动工作室产品集"，description 为固定值。
- Integration: JSON-LD 中的 `screenshot` 数组与项目图片一一对应。

**Verification:**
- DevTools 中验证每个项目页的 `<head>` 内容不同且正确。

---

- [ ] **Unit 7: 验证构建产物与部署兼容性**

**Goal:** 确保所有 SEO 文件正确打包到 `dist/`，BrowserRouter + 404.html 在 GitHub Pages 上工作正常。

**Requirements:** R7

**Dependencies:** Unit 2, Unit 4

**Files:**
- 无需修改 `.github/workflows/deploy.yml`（Vite 自动将 `public/` 复制到 `dist/`，现有工作流已正确上传 `dist/` 目录）

**Approach:**
- 运行 `npm run build`。
- 检查 `dist/` 目录包含：`index.html`、`404.html`、`robots.txt`、`sitemap.xml`、所有图片和 JS/CSS 产物。
- 本地用 `npx serve dist` 或 `npm run preview`（如果配置了）测试：
  - 直接访问 `/project/:id` 是否正常。
  - 刷新页面是否正常。

**Test scenarios:**
- Integration: `dist/404.html` 存在且包含重定向脚本。
- Integration: `dist/robots.txt` 和 `dist/sitemap.xml` 存在。
- Integration: `dist/index.html` 的 `<head>` 包含默认 meta 标签和重定向恢复脚本。

**Verification:**
- `npm run build` 零错误。
- 本地静态服务器测试所有路由直接访问和刷新均正常。

## System-Wide Impact

- **Interaction graph:** BrowserRouter 替换后，所有 `<Link to="/...">` 和 `useNavigate` 调用无需修改（API 兼容）。`useLocation` 返回的 `pathname` 将不再有 `/#` 前缀，若任何组件依赖此前缀做判断需检查（当前未发现）。
- **Error propagation:** 404 页面由 React Router 的 `<Route path="*">` 处理，不再由 GitHub Pages 原生 404 页面处理（原生 404 已改为重定向脚本）。
- **API surface parity:** 所有外部链接（如 GitHub release 下载链接）不受影响。
- **Unchanged invariants:** 项目数据结构（`Project` 接口）的核心字段不变；若新增 `seoDescription` 为可选字段，不影响现有数据。Dark mode、theme toggle、lightbox 等功能不受影响。

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| HashRouter 迁移导致现有外链/书签失效 | 接受此 breaking change；站点规模小，外链少。未来可考虑添加 mount 期 hash→pathname 重定向逻辑。 |
| OG 图片尺寸不符合社交平台要求 | 使用项目截图作为 `og:image`，尺寸通常为 1200×630 最佳；当前截图可能不符合，后续可生成统一 OG 封面图。 |
| react-helmet-async 与 React 19 兼容性问题 | 使用最新版 `react-helmet-async`，其官方支持 React 18+。 |
| GitHub Pages 对 BrowserRouter 的刷新支持 | 通过 `404.html` + `index.html` 重定向脚本解决，该方案已在大量 GitHub Pages SPA 中验证。 |

## Documentation / Operational Notes

- 部署后，使用 [Google Search Console](https://search.google.com/search-console) 提交 `sitemap.xml`。
- 使用 [Rich Results Test](https://search.google.com/test/rich-results) 验证 JSON-LD 结构化数据。
- 使用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 刷新 OG 缓存。
