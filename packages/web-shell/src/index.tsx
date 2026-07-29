"use client";

// 跨 app 应用外壳：左栏功能区（bg-rail 主题轨）+ 顶栏功能 tab（同一面连续延伸）。
// 语义真相源：根 design.md「应用外壳：左栏功能区 + 顶栏功能 tab」。三端
// （content-factory / navigator / userportal）统一引用本包，不在 app 内另造外壳。
import Link from "next/link";
import React, { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const RAIL_EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// 统一 Casdoor 登录提示页骨架（issue #515）。视觉基准 = User Portal `/login`：
// 居中低噪音背景 + 卡片 + 图标 + 应用名旁 Info tooltip + 全宽主按钮。
// 本组件不含任何认证逻辑或客户端 token，只渲染提示并指向各 app 自己的
// `/api/auth/login`；按钮 class 逐字复刻 userportal shadcn Button(default,lg)，
// 保证三端像素一致且不依赖各 app 各自的 Button 实现。
const LOGIN_BUTTON_CLASS =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal outline-none transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-100 ease-out active:scale-[0.98] motion-reduce:transform-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-5";

export function CasdoorLoginPrompt({
  appName,
  icon,
  infoLabel,
  loginHref,
  loginLabel = "使用 Casdoor 登录",
  as = "main",
  disabled = false,
  error,
  notice,
  children,
}: {
  readonly appName: string;
  /** 外层 app shell 已提供 `<main>` landmark 时传 "div"，避免嵌套 landmark。 */
  readonly as?: "main" | "div";
  /** 卡片首行图标（锁 / 统一账号），由 app 注入自己的 icon set。 */
  readonly icon: ReactNode;
  /** Info tooltip 正文：登录、密码与 MFA 由 Casdoor 负责。 */
  readonly infoLabel: string;
  readonly loginHref: string;
  readonly loginLabel?: string;
  /** Casdoor 未配置等 fail-closed 状态：主按钮禁用但视觉层级不变。 */
  readonly disabled?: boolean;
  /** OAuth callback 等错误提示，显示在标题与主按钮之间。 */
  readonly error?: ReactNode;
  /** 主按钮下方的次要说明（如未配置原因）。 */
  readonly notice?: ReactNode;
  /** 已登录 continuation 等分支，替换主按钮留在同一卡片骨架内。 */
  readonly children?: ReactNode;
}) {
  const Root = as;
  return (
    <Root className="grid min-h-dvh place-items-center bg-muted/30 p-6 text-foreground">
      <section className="w-full max-w-md rounded-lg bg-card p-8 text-card-foreground">
        <span className="grid size-10 place-items-center rounded-lg border shadow-xs">{icon}</span>
        <div className="mt-6 flex items-center gap-1">
          <h1 className="text-2xl font-semibold">{appName}</h1>
          <LoginInfoHint label={infoLabel} />
        </div>
        {error ? (
          <p
            className="mt-5 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        {children ?? (
          <a
            aria-disabled={disabled || undefined}
            className={cn(
              LOGIN_BUTTON_CLASS,
              "mt-7 w-full",
              disabled && "pointer-events-none bg-muted text-muted-foreground hover:bg-muted",
            )}
            data-slot="button"
            href={disabled ? undefined : loginHref}
          >
            {loginLabel}
          </a>
        )}
        {notice ? <p className="mt-3 text-xs text-muted-foreground">{notice}</p> : null}
      </section>
    </Root>
  );
}

// 与 userportal `components/info-hint.tsx` 同构：hover/focus-within 展开的
// 纯 CSS tooltip，键盘可达（button + focus ring），无客户端状态。
function LoginInfoHint({ label }: { readonly label: string }) {
  return (
    <span className="group relative inline-flex shrink-0 align-middle">
      <button
        aria-label={`说明：${label}`}
        className="grid size-6 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        type="button"
      >
        <svg
          aria-hidden
          className="size-3.5"
          fill="currentColor"
          height="1em"
          viewBox="0 0 256 256"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
        </svg>
      </button>
      <span
        className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 hidden w-72 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-md border bg-popover px-3 py-2 text-xs leading-5 text-popover-foreground shadow-md group-hover:block group-focus-within:block"
        role="tooltip"
      >
        {label}
      </span>
    </span>
  );
}

export function RailShell({
  sidebar,
  topbar,
  children,
}: {
  readonly sidebar: ReactNode;
  readonly topbar: ReactNode;
  readonly children: ReactNode;
}) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-rail text-rail-foreground">
      <div className="hidden h-full md:block">{sidebar}</div>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* 顶栏：左栏主题面向上延伸的连续部分，包裹当前功能区的 tab */}
        <header className="hidden h-12 shrink-0 items-center gap-2 px-3 md:flex">{topbar}</header>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-2 md:pl-0 md:pt-0">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-card text-card-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RailSidebar({
  brand,
  nav,
  footer,
  collapsed,
  testId,
}: {
  readonly brand: ReactNode;
  readonly nav: ReactNode;
  readonly footer?: ReactNode;
  readonly collapsed: boolean;
  readonly testId?: string;
}) {
  return (
    <aside
      data-testid={testId}
      className={cn(
        "relative flex h-full shrink-0 flex-col overflow-hidden transition-[width] duration-300",
        RAIL_EASE,
        collapsed ? "w-12" : "w-[260px]",
      )}
    >
      <div className={cn("flex h-12 shrink-0 items-center", collapsed ? "px-2.5" : "px-3")}>
        {brand}
      </div>
      <nav
        aria-label="功能区"
        className={cn("flex-1 space-y-1 overflow-y-auto py-2", collapsed ? "px-2" : "px-3")}
      >
        {nav}
      </nav>
      {footer ? <div className={cn("pb-3", collapsed ? "px-1.5" : "px-3")}>{footer}</div> : null}
    </aside>
  );
}

// 品牌区（logo + 标题）：不可点击，几何/字号与 content-factory 的 ContentFactoryBrand 一致。
export function RailBrand({
  icon,
  title,
  collapsed = false,
  tone = "rail",
}: {
  readonly icon: ReactNode;
  readonly title: string;
  readonly collapsed?: boolean;
  /** rail = 主题轨（标题 --rail-foreground/85）；card = 主内容面（移动端）。 */
  readonly tone?: "rail" | "card";
}) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="grid size-7 shrink-0 place-items-center rounded-md border bg-card text-foreground/80 shadow-xs">
        {icon}
      </span>
      {!collapsed && (
        <span
          className={cn(
            "truncate text-sm font-normal",
            tone === "rail" ? "text-rail-foreground/85" : "text-foreground/85",
          )}
        >
          {title}
        </span>
      )}
    </span>
  );
}

export function RailNavLink({
  href,
  icon,
  label,
  active,
  collapsed,
  onClick,
}: {
  readonly href: string;
  readonly icon: ReactNode;
  readonly label: string;
  readonly active: boolean;
  readonly collapsed: boolean;
  readonly onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      onClick={onClick}
      className={cn(
        "relative flex min-h-11 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors md:min-h-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rail-foreground/70",
        active
          ? "bg-rail-foreground/10 text-rail-foreground"
          : "text-rail-foreground/60 hover:bg-rail-foreground/5 hover:text-rail-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      {icon}
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

export type RailTab = {
  readonly label: string;
  readonly href: string;
  readonly active: boolean;
  readonly onClick?: () => void;
};

// 顶栏功能 tab：主题面 pill，选中/hover 都从 rail foreground 派生。
export function RailTabs({ tabs }: { readonly tabs: readonly RailTab[] }) {
  return (
    <nav aria-label="当前功能区标签" className="flex items-center gap-1">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.active ? "page" : undefined}
          onClick={tab.onClick}
          className={cn(
            "rounded-md px-2.5 py-1 text-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rail-foreground/70",
            tab.active
              ? "bg-rail-foreground/10 text-rail-foreground"
              : "text-rail-foreground/60 hover:bg-rail-foreground/5 hover:text-rail-foreground",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

// 侧栏收起按钮：统一样式（design.md「应用外壳」）。鼠标点击后立即 blur，
// 避免焦点残留触发 tooltip/焦点环幻影；键盘切换（detail=0）保留焦点。
export function RailCollapseButton({
  collapsed,
  onToggle,
  icon,
}: {
  readonly collapsed: boolean;
  readonly onToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  readonly icon: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={collapsed ? "展开侧栏" : "收起侧栏"}
      title={collapsed ? "展开侧栏" : "收起侧栏"}
      onClick={(event) => {
        if (event.detail > 0) event.currentTarget.blur();
        onToggle(event);
      }}
      className="flex size-8 shrink-0 items-center justify-center rounded-md text-rail-foreground/60 transition-colors hover:bg-rail-foreground/10 hover:text-rail-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rail-foreground/70"
    >
      {icon}
    </button>
  );
}

// 主题轨底部用户区：头像 + 名称（可选链接）+ 说明 + 统一退出动作。
// 退出交互（图标按钮样式、hover 语义色、focus ring、可访问名称、GET/POST 差异）
// 全部收敛在这里，三端只提供身份数据、说明、账号链接与 logout endpoint/method。
const RAIL_LOGOUT_LABEL = "退出登录";
const RAIL_LOGOUT_CLASS =
  "flex size-8 shrink-0 items-center justify-center rounded-md text-rail-foreground/60 transition-colors hover:bg-rail-foreground/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function RailUserBlock({
  name,
  caption,
  collapsed,
  nameHref,
  logoutHref,
  logoutIcon,
  logoutMethod = "get",
  logoutLabel = RAIL_LOGOUT_LABEL,
}: {
  readonly name: string;
  readonly caption?: ReactNode;
  readonly collapsed: boolean;
  readonly nameHref?: string;
  /** 各 app 自己的 logout endpoint（如 `/api/auth/logout`）。 */
  readonly logoutHref: string;
  /** 退出图标，由 app 注入自己的 icon family（design.md「图标」）。 */
  readonly logoutIcon: ReactNode;
  /** GET = 普通链接导航；post = 显式表单提交。默认 get，无隐藏副作用。 */
  readonly logoutMethod?: "get" | "post";
  readonly logoutLabel?: string;
}) {
  const avatarLabel = Array.from(name.trim())[0]?.toUpperCase() || "U";
  const identity = (
    <>
      <span className="block truncate text-sm font-medium leading-5 text-rail-foreground">{name}</span>
      {caption ? <span className="block text-micro text-rail-foreground/50">{caption}</span> : null}
    </>
  );

  return (
    <div
      className={cn(
        "border-t border-rail-foreground/10",
        collapsed ? "flex flex-col items-center gap-1.5 px-1 pt-3" : "flex items-center gap-2.5 pt-3",
      )}
      title={collapsed ? name : undefined}
    >
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rail-foreground text-xs font-semibold text-rail ring-2 ring-rail-foreground/10"
      >
        {avatarLabel}
      </span>
      {!collapsed &&
        (nameHref ? (
          <Link
            href={nameHref}
            className="min-w-0 flex-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {identity}
          </Link>
        ) : (
          <span className="min-w-0 flex-1">{identity}</span>
        ))}
      {logoutMethod === "post" ? (
        <form action={logoutHref} className="shrink-0" method="post">
          <button
            aria-label={logoutLabel}
            className={RAIL_LOGOUT_CLASS}
            title={logoutLabel}
            type="submit"
          >
            {logoutIcon}
          </button>
        </form>
      ) : (
        <a
          aria-label={logoutLabel}
          className={RAIL_LOGOUT_CLASS}
          href={logoutHref}
          title={logoutLabel}
        >
          {logoutIcon}
        </a>
      )}
    </div>
  );
}

// 移动端顶栏（白色主区内）：菜单按钮 + 应用名 + 当前位置。
export function RailMobileHeader({
  title,
  currentLabel,
  onOpen,
  menuIcon,
}: {
  readonly title: string;
  readonly currentLabel?: string;
  readonly onOpen: () => void;
  readonly menuIcon: ReactNode;
}) {
  return (
    <header className="bg-card px-4 py-2 md:hidden">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          aria-label="打开侧边栏"
          onClick={onOpen}
          className="inline-flex size-10 items-center justify-center rounded-md border text-foreground transition-colors hover:border-foreground/20 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {menuIcon}
        </button>
        <div className="flex-1 text-center">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{currentLabel ?? title}</p>
        </div>
        <span aria-hidden className="size-10" />
      </div>
    </header>
  );
}

// 移动端抽屉：主题轨侧栏的滑入容器。
export function RailMobileDrawer({
  open,
  onClose,
  closeIcon,
  children,
}: {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly closeIcon: ReactNode;
  readonly children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableElements = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);

    const frame = window.requestAnimationFrame(() => {
      (focusableElements()[0] ?? panel)?.focus();
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = focusableElements();
      if (focusable.length === 0) {
        event.preventDefault();
        panel?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="关闭菜单遮罩"
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 bg-black/50"
        onClick={() => onCloseRef.current()}
      />
      <div
        ref={panelRef}
        aria-label="导航菜单"
        aria-modal="true"
        data-testid="rail-mobile-drawer"
        role="dialog"
        tabIndex={-1}
        className="relative h-full w-72 max-w-[82vw] bg-rail text-rail-foreground shadow-lg"
      >
        <button
          type="button"
          aria-label="关闭侧边栏"
          onClick={() => onCloseRef.current()}
          className="absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-md border border-rail-foreground/15 text-rail-foreground/60 transition-colors hover:bg-rail-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rail-foreground/70"
        >
          {closeIcon}
        </button>
        {children}
      </div>
    </div>
  );
}
