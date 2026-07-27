import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  CasdoorLoginPrompt,
  RailCollapseButton,
  RailMobileDrawer,
  RailNavLink,
  RailSidebar,
  RailTabs,
} from "./index";

describe("shared rail shell accessibility", () => {
  it("renders the mobile drawer as a labelled modal with one keyboard close control", () => {
    const markup = renderToStaticMarkup(
      <RailMobileDrawer
        closeIcon={<span>×</span>}
        onClose={() => undefined}
        open
      >
        <a href="/users">用户</a>
      </RailMobileDrawer>,
    );

    expect(markup).toContain('role="dialog"');
    expect(markup).toContain('aria-modal="true"');
    expect(markup).toContain('aria-label="导航菜单"');
    expect(markup).toContain('aria-label="关闭侧边栏"');
    expect(markup).toContain('aria-label="关闭菜单遮罩"');
    expect(markup).toContain('tabindex="-1"');
  });

  it("labels both navigation levels and preserves the mobile touch target", () => {
    const sidebar = renderToStaticMarkup(
      <RailSidebar
        brand={<span>Garage</span>}
        collapsed={false}
        nav={
          <RailNavLink
            active
            collapsed={false}
            href="/users"
            icon={<span>U</span>}
            label="用户"
          />
        }
      />,
    );
    const tabs = renderToStaticMarkup(
      <RailTabs tabs={[{ active: true, href: "/users", label: "用户" }]} />,
    );

    expect(sidebar).toContain('aria-label="功能区"');
    expect(sidebar).toContain("min-h-11");
    expect(sidebar).toContain('aria-current="page"');
    expect(tabs).toContain('aria-label="当前功能区标签"');
  });

  it("does not expose a closed drawer in server output", () => {
    expect(
      renderToStaticMarkup(
        <RailMobileDrawer
          closeIcon={<span>×</span>}
          onClose={() => undefined}
          open={false}
        >
          <span>隐藏内容</span>
        </RailMobileDrawer>,
      ),
    ).toBe("");
  });

  it("derives rail interaction surfaces from the theme-aware foreground token", () => {
    const link = renderToStaticMarkup(
      <RailNavLink
        active
        collapsed={false}
        href="/users"
        icon={<span>U</span>}
        label="用户"
      />,
    );
    const toggle = renderToStaticMarkup(
      <RailCollapseButton
        collapsed={false}
        icon={<span>⇤</span>}
        onToggle={() => undefined}
      />,
    );

    expect(link).toContain("bg-rail-foreground/10");
    expect(toggle).toContain("hover:bg-rail-foreground/10");
    expect(`${link}${toggle}`).not.toContain("bg-white/");
  });
});

describe("shared Casdoor login prompt", () => {
  const baseProps = {
    appName: "User Portal",
    icon: <span>🔒</span>,
    infoLabel: "登录、密码与多因素认证仍由 Casdoor 负责。",
    loginHref: "/api/auth/login?returnTo=%2F",
  };

  it("reproduces the User Portal card skeleton and links only to the app's own login route", () => {
    const markup = renderToStaticMarkup(<CasdoorLoginPrompt {...baseProps} />);

    // 视觉基准骨架（apps/userportal/app/login/page.tsx）逐类复刻。
    expect(markup).toContain(
      '<main class="grid min-h-dvh place-items-center bg-muted/30 p-6 text-foreground">',
    );
    expect(markup).toContain(
      '<section class="w-full max-w-md rounded-lg bg-card p-8 text-card-foreground">',
    );
    expect(markup).toContain('<h1 class="text-2xl font-semibold">User Portal</h1>');
    expect(markup).toContain('href="/api/auth/login?returnTo=%2F"');
    expect(markup).toContain("mt-7 w-full");
    expect(markup).toContain("使用 Casdoor 登录");
  });

  it("exposes the info hint to assistive tech and keyboard focus", () => {
    const markup = renderToStaticMarkup(<CasdoorLoginPrompt {...baseProps} />);

    expect(markup).toContain(`aria-label="说明：${baseProps.infoLabel}"`);
    expect(markup).toContain('role="tooltip"');
    expect(markup).toContain("group-focus-within:block");
    expect(markup).toContain("focus-visible:ring-ring");
  });

  it("keeps the login action inert and announced when Casdoor is unconfigured", () => {
    const markup = renderToStaticMarkup(
      <CasdoorLoginPrompt {...baseProps} disabled notice="当前环境缺少 Casdoor 配置。" />,
    );

    expect(markup).toContain('aria-disabled="true"');
    expect(markup).toContain("pointer-events-none");
    expect(markup).toContain("当前环境缺少 Casdoor 配置。");
    // fail-closed：禁用时不得渲染可点击的 Casdoor 入口。
    expect(markup).not.toContain('href="/api/auth/login?returnTo=%2F"');
  });

  it("renders OAuth errors as an alert above the primary action", () => {
    const markup = renderToStaticMarkup(
      <CasdoorLoginPrompt {...baseProps} error="Casdoor 登录失败，请重新登录。" />,
    );

    expect(markup).toContain('role="alert"');
    expect(markup).toContain("text-destructive");
    expect(markup.indexOf("Casdoor 登录失败")).toBeLessThan(markup.indexOf("使用 Casdoor 登录"));
  });

  it("hosts an already-signed-in continuation inside the same card and drops the login button", () => {
    const markup = renderToStaticMarkup(
      <CasdoorLoginPrompt {...baseProps}>
        <a href="/artifacts">继续</a>
      </CasdoorLoginPrompt>,
    );

    expect(markup).toContain('<section class="w-full max-w-md rounded-lg bg-card p-8 text-card-foreground">');
    expect(markup).toContain("继续");
    expect(markup).not.toContain("使用 Casdoor 登录");
  });

  it("avoids a nested main landmark when the app shell already provides one", () => {
    const markup = renderToStaticMarkup(<CasdoorLoginPrompt {...baseProps} as="div" />);

    expect(markup).not.toContain("<main");
    expect(markup).toContain('<div class="grid min-h-dvh place-items-center bg-muted/30 p-6 text-foreground">');
  });
});
