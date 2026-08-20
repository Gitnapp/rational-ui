# Design System — 共享语义、token 与应用外壳

> Garage Web 产品共用一套 monochrome（ChatGPT 式黑白）设计语言。**语义真相源是
> [根 design.md](../../design.md)**；本文定义共享机制与消费方接入规则。

## 分层

| 层 | 位置 | 内容 | 改动规则 |
|---|---|---|---|
| 共享语义 | [`design.md`](../../design.md) | 颜色、排版、布局几何、图标与交互原则 | 先改根 design.md，再同 PR 改共享 token 与组件 |
| 共享 token | [`packages/design-tokens`](../../packages/design-tokens/tokens.css) | semantic colors（oklch，light + dark media query）、typography、layout geometry、radius、base styles、a11y 系统偏好适配 | 不复制 app 私有色值或尺寸 |
| shadcn 组件库 | [`packages/ui`](../../packages/ui/src/components/ui) | 标准 shadcn 组件全集（Button/Dialog/Form/Table/…），由 `shadcn` CLI 生成，绑定 `@garage/design-tokens` 主题 | 只做 design.md 要求的最小定制；不引入业务状态 |
| 共享外壳 | [`packages/web-shell`](../../packages/web-shell/src/index.tsx) | 跨产品应用外壳、导航、登录提示（`Button` 已转出自 `@garage/ui`） | 不引入业务状态或应用私有组件 |
| 展示台 | [`apps/gallery`](../../apps/gallery) | `@garage/ui` 全部控件的交互式预览（`pnpm dev`） | 只做展示，不承载业务逻辑 |
| 消费方 | 各产品仓库 | 产品布局、组件约定、动效细则与私有 utility | 与根 design.md 冲突时以后者为准；禁止复制 token 值 |

## 接入方式

```css
@import "tailwindcss" source("../");   /* source() 必须钉死，防 monorepo 爬根 fork 风暴 */
@import "@garage/design-tokens";
```

字体由消费方用 `next/font/google` 注册 `Geist` / `Geist_Mono`（variable `--font-sans` / `--font-mono`）；
共享包只声明 font-family fallback 链，不引字体文件。

## 铁律

1. **禁止品牌彩色 accent**（蓝色等）。唯一允许的 chroma 是语义状态色（destructive/success/warning），
   且成对 class 必须收敛到每个消费方的单一真相源模块。
2. **禁止 raw scale 回潮**：`gray-alpha-*`、`text-copy-*`/`text-label-*`/`text-heading-*`（Geist utilities）
   与任意值字号 `text-[NNpx]` 不得再出现。
3. 通用、无业务语义的 shadcn 组件进 `packages/ui`（标准 shadcn 组件库，跨产品共享）；应用私有的业务组件与业务状态仍由消费方各自维护，不进入共享包。
4. dark mode 统一 `prefers-color-scheme`（media query），不用 `.dark` class（无 theme switcher）。
5. **高亮部分必须是正方形**：rail 上表达选中 / 激活 / hover 的独立着色面（图标轨入口、
   icon-only hover 面、主题轨用户区头像）用 `size-*` 钉死等宽高，禁止用 `px/py` 拼近似方形，
   头像不用 `rounded-full`；带文字的 tab / chip / badge 不受约束。语义与边界见
   [根 design.md「高亮几何」](../../design.md)，共享实现在 `packages/web-shell`。

消费方必须显式声明 `@garage/design-tokens`、`@garage/ui`（如需要 `@garage/web-shell`），并在 Tailwind v4
的 source 配置中扫描 `@garage/ui/src` 与 `@garage/web-shell/src`，例如：

```css
@source "../../node_modules/@garage/ui/src";
@source "../../node_modules/@garage/web-shell/src";
```

组件从 `@garage/ui/components/ui/<name>` 按需导入，例如 `import { Button } from "@garage/ui/components/ui/button"`。
