"use client";

// 跨 app 应用外壳：左栏功能区（bg-rail 深色轨）+ 顶栏功能 tab（黑色面连续延伸）。
// 语义真相源：根 design.md「应用外壳：左栏功能区 + 顶栏功能 tab」。三端
// （content-factory / navigator / userportal）统一引用本包，不在 app 内另造外壳。
import Link from "next/link";
import React, { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const RAIL_EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * 折叠/展开侧栏时的 hover 幻影护栏：侧栏宽度 tween 会让元素在静止指针下滑入滑出，
 * 浏览器在布局重算时把 :hover 套到恰好位于指针下的元素（如「新建任务」）。
 * 锁定期间禁止侧栏/顶栏的 pointer events；指针下一次移动或按下即解锁，
 * 让 hover 只跟随真实指针轨迹。键盘触发的切换不上锁（无指针幻影）。
 */
export function useRailHoverLock(): readonly [boolean, () => void] {
  const [locked, setLocked] = useState(false);
  useEffect(() => {
    if (!locked) return;
    const unlock = () => setLocked(false);
    window.addEventListener("pointermove", unlock, { once: true });
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointermove", unlock);
      window.removeEventListener("pointerdown", unlock);
    };
  }, [locked]);
  return [locked, () => setLocked(true)] as const;
}

export function RailShell({
  sidebar,
  topbar,
  children,
  hoverLocked = false,
}: {
  readonly sidebar: ReactNode;
  readonly topbar: ReactNode;
  readonly children: ReactNode;
  readonly hoverLocked?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-dvh w-full overflow-hidden bg-rail text-rail-foreground",
        hoverLocked && "[&_aside]:pointer-events-none [&_header]:pointer-events-none",
      )}
    >
      <div className="hidden h-full md:block">{sidebar}</div>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* 顶栏：左栏黑色面向上延伸的连续部分，包裹当前功能区的 tab */}
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
  /** rail = 深色轨（标题 --rail-foreground/85）；card = 浅色面（移动端）。 */
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
          ? "bg-white/10 text-rail-foreground"
          : "text-rail-foreground/60 hover:bg-white/5 hover:text-rail-foreground",
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

// 顶栏功能 tab：深色面 pill，选中 = bg-white/10，未选中 = 近白 60%。
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
              ? "bg-white/10 text-rail-foreground"
              : "text-rail-foreground/60 hover:bg-white/5 hover:text-rail-foreground",
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
      className="flex size-8 shrink-0 items-center justify-center rounded-md text-rail-foreground/60 transition-colors hover:bg-white/10 hover:text-rail-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rail-foreground/70"
    >
      {icon}
    </button>
  );
}

// 深色轨底部用户区：头像 + 名称（可选链接）+ 说明 + 退出动作槽。
export function RailUserBlock({
  name,
  caption,
  collapsed,
  nameHref,
  logout,
}: {
  readonly name: string;
  readonly caption?: ReactNode;
  readonly collapsed: boolean;
  readonly nameHref?: string;
  readonly logout: ReactNode;
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
        "border-t border-white/10",
        collapsed ? "flex flex-col items-center gap-1.5 px-1 pt-3" : "flex items-center gap-2.5 pt-3",
      )}
      title={collapsed ? name : undefined}
    >
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rail-foreground text-xs font-semibold text-rail ring-2 ring-white/10"
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
      {logout}
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

// 移动端抽屉：深色轨侧栏的滑入容器。
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
          className="absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-md border border-white/15 text-rail-foreground/60 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rail-foreground/70"
        >
          {closeIcon}
        </button>
        {children}
      </div>
    </div>
  );
}
