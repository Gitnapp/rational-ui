# Design System — 共享 token 与各 app 设计真相源

> Garage 全部 Web app 共用一套 monochrome（ChatGPT 式黑白）设计语言。**语义真相源是
> [apps/content-factory/design.md](../../apps/content-factory/design.md)**；本文只定义共享机制与接入规则。

## 分层

| 层 | 位置 | 内容 | 改动规则 |
|---|---|---|---|
| 共享 token | [`packages/design-tokens`](../../packages/design-tokens/tokens.css) | semantic colors（oklch，light + dark media query）、typography 精修（`--text-micro`/`--text-reading`/字距）、radius、base styles、a11y 系统偏好适配 | 先改 content-factory design.md（语义），再同 PR 改本包 |
| App design.md | `apps/<app>/design.md` | 该 app 的布局语言、组件约定、动效细则 | token 层语义与 CF design.md 冲突时以后者为准 |
| App globals.css | `apps/<app>/**/globals.css` | `@import "@garage/design-tokens"` + app 特有 utility/样式 | 禁止复制 token 值；缺 token 先加到共享包 |

## 接入方式

```css
@import "tailwindcss" source("../");   /* source() 必须钉死，防 monorepo 爬根 fork 风暴 */
@import "@garage/design-tokens";
```

字体由各 app 用 `next/font/google` 注册 `Geist` / `Geist_Mono`（variable `--font-sans` / `--font-mono`）；
共享包只声明 font-family fallback 链，不引字体文件。

## 铁律

1. **禁止品牌彩色 accent**（蓝色等）。唯一允许的 chroma 是语义状态色（destructive/success/warning），
   且成对 class 必须收敛到每 app 的单一真相源模块（CF：`resource-ui.tsx`；navigator：`components/ui/status.ts`）。
2. **禁止 raw scale 回潮**：`gray-alpha-*`、`text-copy-*`/`text-label-*`/`text-heading-*`（Geist utilities）
   与任意值字号 `text-[NNpx]` 不得再出现（navigator lint 有 grep 护栏）。
3. shadcn 组件按 app 各自 own（copy-paste 模型），不建共享 ui 组件包；新组件用 shadcn CLI 拉取后
   按 CF 同名组件对齐 variant。
4. dark mode 统一 `prefers-color-scheme`（media query），不用 `.dark` class（无 theme switcher）。

## 消费方

`apps/content-factory` · `apps/userportal` · `apps/navigator`
