# AGENTS.md

- 不保留向后兼容性。直接移除废弃路径，不新增兼容层、回退方案或迁移逻辑。
- 选择能完整满足当前需求的最简实现方案，避免预判式抽象、配置项与间接层。
- 从可端到端运行的最小版本起步，在可用基础上逐项叠加能力。
- 保持组件模块化和清晰的关注点分离。
- 成熟且维护良好的第三方库能降低复杂度或提高可靠性时优先使用。
- 新增实现或依赖前，先复用已有依赖并查阅官方文档与类型定义。
- 架构决策以长期可维护性为准，不接受注定被替换的临时方案。

## 设计系统边界

- `design.md` 是视觉与交互语义的唯一真相源。
- `packages/design-tokens` 只维护跨产品共享的 CSS token 和基础样式。
- `packages/ui`（`@garage/ui`）是标准 shadcn 组件库：全部组件源码由 `shadcn` CLI 生成
  （`components.json` 见该目录），只做design.md 要求的最小定制（如 `button.tsx` 的紧凑尺寸
  与按压反馈），不引入业务状态。新增/更新组件用 `pnpm dlx shadcn@latest add <name> -y -o`，
  CLI 生成的内部 import 是 `@/...` 别名，本包不接 bundler 别名解析（供其它包以源码方式直接
  typecheck），生成后需手动把 `@/lib/utils`、`@/components/ui/*` 换成相对路径。
  带 `@garage-customized` 头部标记的文件（button / calendar / sonner）有本地定制，
  禁止直接 `-o` 覆盖——先 diff 再手动合入；`pnpm test` 会断言标记存在。
- lint/format 由 biome 统一（`biome.json`，semicolons always）：`pnpm format` 修复，
  `pnpm check` = typecheck + test + lint，CI 全量强制。
- `packages/web-shell` 只维护跨产品共享的外壳（RailShell 等）；`Button` 已收敛进
  `@garage/ui`，`web-shell` 的 `button.tsx` 只做转出。
- `apps/gallery`（`@garage/gallery`）是 `@garage/ui` 的交互式展示台，用于视觉验收与开发预览，
  不承载业务逻辑。
- 业务页面、业务状态与应用私有状态不进入本仓库；但通用、无业务语义的 shadcn 组件属于
  `packages/ui`，是本仓库的核心交付物之一。
