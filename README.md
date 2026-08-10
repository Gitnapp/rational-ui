# Garage Design System

Garage Web 产品的独立设计系统仓库。设计语义、共享 CSS token 与应用外壳组件都在这里维护，不包含业务应用或基础设施部署代码。

## 结构

- [`design.md`](./design.md)：颜色、排版、布局、交互与组件语义的真相源。
- [`packages/design-tokens`](./packages/design-tokens)：`@garage/design-tokens`，基于 Tailwind CSS v4 `@theme` 的纯 CSS token。
- [`packages/web-shell`](./packages/web-shell)：`@garage/web-shell`，React/Next.js 应用外壳、导航、登录提示与共享 Button。
- [`docs/engineering/design-system.md`](./docs/engineering/design-system.md)：分层与消费方接入规则。

## 开发

要求 Node.js 24 与 pnpm 10.12.1。

```bash
pnpm install --frozen-lockfile
pnpm check
```

修改视觉语义时，先更新 `design.md`，再同步 token、组件和测试。业务应用的私有组件不回流到本仓库。

## 来源

本仓库从 [`GarageDev1/infrastructure`](https://github.com/GarageDev1/infrastructure) 中的设计系统边界抽取，并保留相关文件的 Git 历史。抽取基线为源仓库提交 `a1b3ba2695c834d5975099a534dc705f363fb855`。
