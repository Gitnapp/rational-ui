"use client";

import {
  type RailApp,
  RailAppSwitcher,
  RailCollapseButton,
  RailMobileDrawer,
  RailMobileHeader,
  RailNavLink,
  RailShell,
  RailSidebar,
} from "@gitnapp/web-shell";
// The gallery is a Garage app like content-factory/navigator/userportal, so it
// dogfoods the real shared shell (design.md「应用外壳」) instead of a bespoke
// sidebar: RailShell/RailSidebar/RailAppSwitcher/RailNavLink/RailCollapseButton/
// RailMobileHeader/RailMobileDrawer all come from @gitnapp/web-shell.
import {
  Bell,
  Blocks,
  ChevronsUpDown,
  Compass,
  Factory,
  Layers,
  LayoutGrid,
  Menu,
  PanelLeft,
  TextCursorInput,
  UserRound,
  X,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { NAV_GROUPS, type NavGroupId } from "./nav-data";
import { ThemePreviewToggle } from "./theme-preview-toggle";

// 共用本外壳的 Garage 产品。href 暂为占位：三端仍在 GarageDev1/infrastructure，
// 本仓库抽出后尚未打通消费路径（见 docs/engineering/roadmap.md §0）。
const APPS: readonly RailApp[] = [
  {
    id: "design-system",
    name: "Design System",
    href: "/",
    icon: <Blocks className="size-4" />,
    description: "组件与设计语义",
  },
  {
    id: "content-factory",
    name: "Content Factory",
    href: "#",
    icon: <Factory className="size-4" />,
    description: "内容生产工作台",
  },
  {
    id: "navigator",
    name: "Navigator",
    href: "#",
    icon: <Compass className="size-4" />,
    description: "任务与日报",
  },
  {
    id: "userportal",
    name: "User Portal",
    href: "#",
    icon: <UserRound className="size-4" />,
    description: "账号与权限",
  },
];

const GROUP_ICONS: Record<NavGroupId, ReactNode> = {
  inputs: <TextCursorInput className="size-4" />,
  overlays: <Layers className="size-4" />,
  navigation: <Compass className="size-4" />,
  "data-display": <LayoutGrid className="size-4" />,
  feedback: <Bell className="size-4" />,
};

function GroupNav({
  collapsed,
  activeGroupId,
  onNavigate,
}: {
  readonly collapsed: boolean;
  readonly activeGroupId: NavGroupId;
  readonly onNavigate?: () => void;
}) {
  return (
    <>
      {NAV_GROUPS.map((group) => (
        <RailNavLink
          key={group.id}
          href={`#${group.id}`}
          icon={GROUP_ICONS[group.id]}
          label={group.title}
          active={group.id === activeGroupId}
          collapsed={collapsed}
          onClick={onNavigate}
        />
      ))}
    </>
  );
}

export function GallerySidebarShell({ children }: { readonly children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<NavGroupId>(NAV_GROUPS[0].id);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Scroll-spy: the rail's active indicator (design.md「高亮几何」) has to
  // reflect which category is actually in view, not just "whatever was last
  // clicked" — the content region scrolls internally (RailShell's card area
  // is overflow-hidden), so the observer root must be that div, not the
  // viewport.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const groupIds = NAV_GROUPS.map((group) => group.id);
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRect.top);
          } else {
            visible.delete(id);
          }
        }
        if (visible.size === 0) return;
        const topmost = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0];
        if (groupIds.includes(topmost as NavGroupId)) {
          setActiveGroupId(topmost as NavGroupId);
        }
      },
      { root, rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    for (const id of groupIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const activeGroupTitle = NAV_GROUPS.find((group) => group.id === activeGroupId)?.title;

  return (
    // RailShell sizes itself with `h-dvh`, which only fills the screen if an
    // ancestor's height resolves to the exact same value — html/body's own
    // height chain (percentages) doesn't always agree with dvh, and any gap
    // left the rail's bg-rail background showing through as dead space at
    // the bottom. `fixed inset-0` pins directly to the viewport instead,
    // sidestepping that chain entirely.
    <div className="fixed inset-0">
      <RailShell
        sidebar={
          <RailSidebar
            collapsed={collapsed}
            brand={
              <RailAppSwitcher
                apps={APPS}
                chevronIcon={<ChevronsUpDown className="size-3.5" />}
                collapsed={collapsed}
                currentAppId="design-system"
              />
            }
            nav={<GroupNav collapsed={collapsed} activeGroupId={activeGroupId} />}
          />
        }
        topbar={
          <>
            <RailCollapseButton
              collapsed={collapsed}
              onToggle={() => setCollapsed((value) => !value)}
              icon={<PanelLeft className="size-4" />}
            />
            <span className="text-sm text-rail-foreground/70">组件展示台 / {activeGroupTitle}</span>
            <span className="ml-auto">
              <ThemePreviewToggle />
            </span>
          </>
        }
      >
        <RailMobileHeader
          title="rational-ui"
          currentLabel={activeGroupTitle}
          onOpen={() => setMobileOpen(true)}
          menuIcon={<Menu className="size-5" />}
        />
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          {children}
        </div>
        <RailMobileDrawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          closeIcon={<X className="size-4" />}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-12 shrink-0 items-center px-3">
              <RailAppSwitcher
                apps={APPS}
                chevronIcon={<ChevronsUpDown className="size-3.5" />}
                collapsed={false}
                currentAppId="design-system"
              />
            </div>
            <nav aria-label="功能区" className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
              <GroupNav
                collapsed={false}
                activeGroupId={activeGroupId}
                onNavigate={() => setMobileOpen(false)}
              />
            </nav>
          </div>
        </RailMobileDrawer>
      </RailShell>
    </div>
  );
}
