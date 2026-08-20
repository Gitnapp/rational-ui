# Roadmap — 未闭环的缺口与待定决策

> 本文是**工作计划**,不是真相源。视觉与交互语义仍以 [`design.md`](../../design.md) 为准,
> 分层与接入规则见 [`design-system.md`](./design-system.md)。
>
> 记录时间:2026-08-20。基线提交:`610f2a0`(引入 `@garage/ui` + `apps/gallery`)。

## 0. 阻塞性前置问题:交付路径没有闭环

**四个包全是 `private: true`,靠 `workspace:*` 直接吃源码,但真正的消费方
content-factory / navigator / userportal 在另一个仓库(`GarageDev1/infrastructure`)。**
目前不发私有 npm、无 submodule / subtree、无任何同步机制——也就是说
`packages/ui` 的 41 个组件**至今没有被任何线上代码消费过**。

这个决定会反向决定下面一大半事项(要不要 build 步骤、产物是源码还是编译结果、
版本怎么走、lint 要不要卡在发布前),所以**先定这个,再动 P1 以下**。

候选方案:

| 方案 | 代价 | 适用前提 |
|---|---|---|
| 私有 npm registry(如 GitHub Packages) | 需要发布流程 + 版本策略(changesets) | 希望消费方锁版本、可回滚 |
| git submodule / subtree | 无发布流程,但消费方升级是手工操作 | 三端与设计系统同节奏迭代 |
| 直接把设计系统合回 infrastructure | 抽仓白做 | 若三端根本不需要独立版本 |

## 1. P0 — 一致性无人强制

### 1.1 完全没有 CI
`pnpm check`(typecheck + test)已就绪,但没有 `.github/workflows`,没有任何东西强制它跑。
后果已经出现过两次,都属于「能跑起来但是错的」,只能靠人肉撞见:

- 侧栏折叠时图标单帧横移 98px(已修,见 §4)
- `apps/gallery` 的 Tailwind `source()` 漏扫 `components/`,41 个 demo 的布局 class 静默不生成(已修)

设计系统的全部价值在于规范被强制;没有 CI,`design.md` 里的铁律只是口头约定。

**动作**:加 workflow 跑 `pnpm install --frozen-lockfile && pnpm check`,并把 `apps/gallery`
的 `next build` 也纳入(它能抓到纯 typecheck 抓不到的 RSC / client boundary 问题)。

### 1.2 本地定制没有保护,下次升级会被静默冲掉
`AGENTS.md` 里记录的升级命令是 `pnpm dlx shadcn@latest add <name> -y -o`,`-o` 即 overwrite。
以下文件已相对 CLI 产物做过本地定制,一旦执行就会无声消失,**且 typecheck 与测试都不会报错**:

| 文件 | 定制内容 | 丢失后的表现 |
|---|---|---|
| `packages/ui/src/components/ui/button.tsx` | design.md 的紧凑尺寸表(32/36px)、按压反馈、coarse-pointer 44px 命中区 | 全站按钮尺寸回退成 shadcn 默认值 |
| `packages/ui/src/components/ui/calendar.tsx` | `formatIsoDate` + 固定 locale,修复 SSR/CSR hydration mismatch | 仅在浏览器控制台报 hydration 错误 |
| `packages/ui/src/components/ui/sonner.tsx` | 移除 `next-themes`,改 `theme="system"`(铁律 #4:无 theme switcher) | 重新引入 next-themes 依赖 |
| 全部 `packages/ui/src/components/ui/*.tsx` | `@/` 别名改写为相对路径(本包不接 bundler 别名解析) | 整包 typecheck 失败(这个会报错) |

**动作**(择一):在每个定制文件顶部加统一标记注释 + CI 里断言标记存在;或记录 registry
版本并改用「生成到临时目录再 diff」的升级流程。

### 1.3 图标家族存在架构冲突(现存的规范违反)
`design.md`「图标」:「Navigator 与 User Portal 统一使用 Phosphor `regular`;同一 surface
不混 Lucide、emoji 或手绘 SVG。」

但 `@garage/ui` 有 **16 个组件在内部硬编码 Lucide 图标**(Select 的 `ChevronDownIcon`、
Dialog 的 `XIcon`、Checkbox 的 `CheckIcon` 等),属于**结构性图标,消费方换不掉**。
Navigator 只要用一次 `@garage/ui` 的 Select,就必然在同一 surface 上混了两个家族。

**⚠️ 需要人决策**,三条路:

1. **改 `design.md`**,承认「结构性图标随组件走(Lucide),业务/导航图标用 Phosphor」——
   代价最小,且下拉箭头这类图标本就属于组件而非业务语义。**推荐**。
2. 给 `@garage/ui` 加 icon slot / context,让消费方注入图标family——最灵活,但要改 16 个组件
   且增加 API 面。
3. 把 `@garage/ui` 内部图标整体换成 Phosphor——与 shadcn 上游产物分叉,加重 §1.2 的升级负担。

## 2. P1 — 验收与覆盖能力

### 2.1 Gallery 无法预览 dark mode(验收工具瞎了一半)
`packages/design-tokens/tokens.css` 已内建 `:root[data-theme="dark"]` 属性覆盖
(注释明写是给「有显式主题控制的 app」准备的),但 `apps/gallery` 源码一行没用。
结果:要检查暗色下的对比度、边框、阴影,必须去改操作系统设置。

这**不违反**铁律 #4——那条约束的是产品,gallery 是验收台不是产品。

**动作**:在 gallery 外壳加一个仅限本 app 的 `data-theme` 预览开关(light / dark / system)。

### 2.2 `packages/ui` 41 个组件 0 个测试
只有 `typecheck`;对比 `packages/web-shell` 有 23 个测试。

但不要盲目补覆盖率:重复测 Radix 的行为是低价值的。真正该测的是——

- **本地定制部分**:Button 的 size/variant 表、Calendar 的 `formatIsoDate` 确定性
- **跨组件不变量**:例如「任何组件源码不得出现硬编码色值 / `blue-*` 等品牌色」,
  几行断言就能守住 design.md 的禁彩色铁律,价值远高于逐组件快照

### 2.3 布局/动效类 bug 没有自动化防线
§4 那个 98px 闪动,现有 23 个测试全绿也抓不到——因为它们断言的是 **class 字符串**而非**几何量**。
当时甚至有一条测试 `expect(expanded).toContain("px-3")` 把 bug 固化成了「预期行为」。

新加的两条回归测试能挡住这一次的回退,但本质仍是字符串断言:若有人把 `size-8` 改成 `size-9`
而没同步 nav padding,测试照样全绿、图标照样跳。

**正确接缝是浏览器内的几何断言**。已验证可行的做法(harness 当时写在 scratchpad,已随会话失效,
但方法可复现):

> Playwright 打开 gallery → `reducedMotion: "no-preference"` → 点折叠/展开按钮 →
> 用 `requestAnimationFrame` 逐帧采样图标的 `getBoundingClientRect().x` →
> 断言「全程 excursion == 0 且单帧跳变 == 0」。
> 页内切换类组件则直接用浏览器的 `layout-shift` PerformanceObserver 断言 CLS 为 0。

**代价**:引入 Playwright 作为 devDependency(CI 时间 + 浏览器下载)。对一个核心交付物就是
「视觉与几何」的仓库,我倾向值得,但这是真实的基建取舍,**需要人拍板**。

## 3. P2 — 工程卫生

- **无 lint/format**:没有 eslint / prettier / biome。CLI 生成的 41 个组件是无分号风格,
  手写代码是有分号风格,两种已混在同一仓库。设计系统源码是要被抄走改的,一致性比普通 app 更重要。
- **a11y 无自动化验证**:`design.md` 有完整的无障碍章节(focus ring、44px 命中区、
  reduced-motion、prefers-contrast),但没有任何东西检查。axe-core 挂在 gallery 上很便宜。
- **组件缺 props / 用法文档**:gallery 是纯视觉 demo,无代码片段、无 props 表、无 do/don't。
  优先级最低——源码就在 `packages/ui/src`,对内部三端和 AI 辅助开发,读源码比读文档更准。

## 4. 已完成(留作上下文)

- `@garage/ui`:41 个 shadcn 组件,绑定 `@garage/design-tokens` 主题;`Button` 从
  `web-shell` 收敛至此,`web-shell` 只做转出。
- `apps/gallery`:交互式展示台,复用 `@garage/web-shell` 真实外壳(非自造侧栏)。
- 修复 Calendar 的 `toLocaleDateString()` locale 依赖导致的 SSR/CSR hydration mismatch。
- 修复 `apps/gallery` Tailwind `source("./")` 漏扫 `components/` 导致 41 个 demo 布局 class 静默缺失。
- 修复侧栏折叠/展开时图标横向闪动(**未提交**):`RailNavLink` 的 `mx-auto` 按动画中的轨宽实时
  求值,折叠瞬间把图标甩到宽轨中点再滑回(实测单帧 98px);叠加两态水平内边距不等效(8px)。
  已统一为两态等效 8px,实测 excursion 0px。**注意:此修复改变了三端展开态侧栏视觉**
  (行内缩 12→8px、标签左移 4px、品牌徽章 12→10px),若不接受可只保留移除 `mx-auto` 的部分
  ——单独去掉它即可消掉 106px 中的 98px,且展开态外观零变化。

## 5. 明确不做(避免照抄公开组件库)

MUI / Ant / shadcn.com 是**面向陌生人**的公开库,其清单大半在解决「使用者不认识作者、
不敢读源码」这个问题。本仓库面向**三个已知 app + 一个已知团队 + 一批 AI agent**
(`AGENTS.md` 的存在说明后者是一等公民),照搬会把精力投向产出最低的部分。

- **Storybook**:gallery 已覆盖其核心用途,且它对 RSC / Next 16 支持一般,再引一套是浪费。
- **多品牌 theming / theme builder**:铁律就是单色、禁品牌彩色 accent,不存在多主题需求。
- **Figma 同步**:除非设计师确实在 Figma 内维护,否则纯负担。
- **i18n**:全中文单语,当前无需求。
