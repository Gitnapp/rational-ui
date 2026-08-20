# Roadmap — 未闭环的缺口与待定决策

> 本文是**工作计划**,不是真相源。视觉与交互语义仍以 [`design.md`](../../design.md) 为准,
> 分层与接入规则见 [`design-system.md`](./design-system.md)。
>
> 记录时间:2026-08-20(当轮修复后)。基线提交:`610f2a0`(引入 `@garage/ui` + `apps/gallery`)。

## 0. 交付路径(部分闭环)

**已决策(2026-08-20):本仓库保持为独立的组件库仓库,不合回 infrastructure。**

四个包仍是 `private: true`,靠 `workspace:*` 直接吃源码;真正的消费方
content-factory / navigator / userportal 在另一个仓库(`GarageDev1/infrastructure`)。
**具体的同步机制(私有 npm registry / git submodule / subtree)仍未落地**——这是
infra 侧的工程任务,不在本仓库内闭环。在机制落地前,`packages/ui` 的组件不会被
线上代码消费。

## 1. 仍开放的项

### 1.1 布局/动效类 bug 没有浏览器内几何断言(决策:暂不引入)

侧栏 98px 闪动那类 bug,class 字符串断言本质防不住。正确接缝是 Playwright +
`getBoundingClientRect()` 逐帧采样 / `layout-shift` PerformanceObserver(方法已验证可行,
见 §3 历史记录)。**2026-08-20 决策:暂不引入**,代价是 CI 时间 + 浏览器下载;
接受几何回归暂靠人工验收(gallery 已补 dark mode 预览开关,见 §2)。

### 1.2 组件缺 props / 用法文档(优先级最低)

gallery 是纯视觉 demo,无代码片段、无 props 表、无 do/don't。源码就在
`packages/ui/src`,对内部三端和 AI 辅助开发,读源码比读文档更准。暂缓。

## 2. 已完成(2026-08-20 当轮修复)

- **CI 落地**:`.github/workflows/ci.yml` 跑 `pnpm install --frozen-lockfile` →
  `pnpm check`(typecheck + 全部测试 + biome lint)→ `apps/gallery` 的 `next build`
  (抓纯 typecheck 抓不到的 RSC / client boundary 问题)。
- **本地定制保护**:`button.tsx` / `calendar.tsx` / `sonner.tsx` 头部加统一
  `@garage-customized` 标记,`packages/ui/scripts/assert-customization-markers.mjs`
  断言标记仍在文件头部,挂在 `pnpm test` 里,CI 强制。`shadcn add -o` 覆盖会显式失败
  而非静默丢定制。
- **图标家族冲突**:按推荐方案改 `design.md`——组件内部结构性图标(下拉箭头、关闭 X
  等)随 `@garage/ui` 走 Lucide,属于组件实现而非业务语义;业务/导航图标仍是
  Phosphor `regular`。规范违反消除。
- **gallery dark mode 预览开关**:顶栏右侧加 light / dark / system 三态切换
  (`theme-preview-toggle.tsx`),复用 tokens.css 内建的 `:root[data-theme]` 覆盖,
  不引入主题状态库。铁律 #4 约束产品,不约束验收台。
- **`packages/ui` 测试从 0 到 9**:只测本地定制与不变量——Button 尺寸表/按压反馈/
  44px 命中区,Calendar `formatIsoDate` 确定性(ISO `data-day`),以及跨组件不变量
  「任何组件源码不得出现硬编码色值 / 品牌色阶 class」。不重复测 Radix 行为。
- **a11y 自动化(降级方案)**:原计划 axe-core 挂 gallery 需浏览器,Playwright 暂缓后
  改为 jsdom + axe-core 跑 Button/Label/Input/Switch 的语义类违规断言
  (`a11y.test.tsx`);color-contrast 等依赖真色计算的规则留给未来的浏览器层。
- **lint/format 统一**:引入 biome(单工具管 lint + format),全仓库统一为
  semicolons-always 风格;shadcn 生成目录关闭了与 Radix 模式冲突的 a11y lint 规则,
  `tokens.css` 的 `!important`(reduced-motion / reduced-transparency 覆盖)豁免
  `noImportantStyles`。
- **根 `pnpm test` 扩展到所有包**(`pnpm -r --if-present`),不再只跑 web-shell。

## 3. 已完成(历史,留作上下文)

- `@garage/ui`:40 个 shadcn 组件,绑定 `@garage/design-tokens` 主题;`Button` 从
  `web-shell` 收敛至此,`web-shell` 只做转出。
- `apps/gallery`:交互式展示台,复用 `@garage/web-shell` 真实外壳(非自造侧栏)。
- 修复 Calendar 的 `toLocaleDateString()` locale 依赖导致的 SSR/CSR hydration mismatch。
- 修复 `apps/gallery` Tailwind `source("./")` 漏扫 `components/` 导致 demo 布局 class
  静默缺失。
- 修复侧栏折叠/展开时图标横向闪动(commit `dfa3ba0`):移除按动画中轨宽实时求值的
  `mx-auto`,统一两态水平内边距为等效 8px,实测 excursion 0px。此修复改变了三端
  展开态侧栏视觉(行内缩 12→8px、标签左移 4px、品牌徽章 12→10px)。

## 4. 明确不做(避免照抄公开组件库)

MUI / Ant / shadcn.com 是**面向陌生人**的公开库,其清单大半在解决「使用者不认识作者、
不敢读源码」这个问题。本仓库面向**三个已知 app + 一个已知团队 + 一批 AI agent**
(`AGENTS.md` 的存在说明后者是一等公民),照搬会把精力投向产出最低的部分。

- **Storybook**:gallery 已覆盖其核心用途,且它对 RSC / Next 16 支持一般,再引一套是浪费。
- **多品牌 theming / theme builder**:铁律就是单色、禁品牌彩色 accent,不存在多主题需求。
- **Figma 同步**:除非设计师确实在 Figma 内维护,否则纯负担。
- **i18n**:全中文单语,当前无需求。
