# rational-ui

独立的设计系统仓库。设计语义、共享 CSS token、shadcn 组件库与应用外壳组件都在这里维护，不包含业务应用或基础设施部署代码。

仓库:https://github.com/Gitnapp/rational-ui

## 结构

- [`design.md`](./design.md)：颜色、排版、布局、交互与组件语义的真相源。
- [`packages/design-tokens`](./packages/design-tokens)：`@gitnapp/design-tokens`，基于 Tailwind CSS v4 `@theme` 的纯 CSS token。
- [`packages/ui`](./packages/ui)：`@gitnapp/ui`，标准 shadcn 组件库（Button、Dialog、Form、Table 等全套控件），由 shadcn CLI 生成、按 `design.md` 做最小定制。
- [`packages/web-shell`](./packages/web-shell)：`@gitnapp/web-shell`，React/Next.js 应用外壳（Rail 导航）与登录提示；共享 `Button` 已收敛进 `@gitnapp/ui`。
- [`apps/gallery`](./apps/gallery)：交互式组件展示台——渲染 `@gitnapp/ui` 全部控件及其变体，本地跑 `pnpm dev` 查看。
- [`docs/engineering/design-system.md`](./docs/engineering/design-system.md)：分层与消费方接入规则。
- [`docs/engineering/roadmap.md`](./docs/engineering/roadmap.md)：未闭环的缺口、待定决策与明确不做的事。

## 开发

要求 Node.js 24 与 pnpm 10.12.1。

```bash
pnpm install --frozen-lockfile
pnpm check      # typecheck + test + lint (biome)
pnpm dev        # 启动组件展示台 (apps/gallery)，默认 http://localhost:3000
```

修改视觉语义时，先更新 `design.md`，再同步 token、组件和测试。业务页面与应用私有状态不回流到本仓库；通用、无业务语义的 shadcn 组件属于 `packages/ui`。

## 消费方接入

三个包发布在 GitHub Packages(`@gitnapp/design-tokens`、`@gitnapp/ui`、`@gitnapp/web-shell`)。
GitHub Packages 的 npm endpoint 即使对公共仓库也要求认证，消费方需先配置：

```
# .npmrc
@gitnapp:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}   # 任意有 read:packages 的 token
```

然后正常 `pnpm add @gitnapp/ui` 即可。包以**源码**形式发布（`.tsx` / `.css`，无构建产物），
由消费方的 bundler 编译——这是刻意为之，见 `docs/engineering/design-system.md`。

## 发布

```bash
# 需要 write:packages 权限的 token（gh auth token 即可）
pnpm -r --filter '@gitnapp/*' publish --no-git-checks
```

`workspace:*` 依赖由 pnpm 在发布时重写为实际版本号。

## 来源

本仓库从 [`GarageDev1/infrastructure`](https://github.com/GarageDev1/infrastructure) 中的设计系统边界抽取，并保留相关文件的 Git 历史。抽取基线为源仓库提交 `a1b3ba2695c834d5975099a534dc705f363fb855`。
