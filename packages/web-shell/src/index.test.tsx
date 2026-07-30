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
  RailUserBlock,
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

  // design.md「高亮几何」：折叠后图标轨里的高亮只剩图标，必须是正方形着色面。
  it("renders the collapsed rail highlight as a square colour surface", () => {
    const collapsed = renderToStaticMarkup(
      <RailNavLink active collapsed href="/users" icon={<span>U</span>} label="用户" />,
    );

    expect(collapsed).toContain("size-8");
    // 44px 命中区高度只属于展开态；带进折叠态会让高亮退化成 32×44 长方形。
    expect(collapsed).not.toContain("min-h-11");
    // 本包 cn() 没有 tailwind-merge，冲突的 padding 会同时留在 class 里。
    expect(collapsed).not.toContain("py-2.5");
    expect(collapsed).not.toContain("px-3");
  });

  it("keeps the expanded rail entry a full-width row with a 44px touch target", () => {
    const expanded = renderToStaticMarkup(
      <RailNavLink active collapsed={false} href="/users" icon={<span>U</span>} label="用户" />,
    );

    expect(expanded).toContain("min-h-11");
    expect(expanded).toContain("px-3");
    expect(expanded).not.toContain("size-8");
  });

  it("renders the rail user avatar as a square, not a circle", () => {
    const markup = renderToStaticMarkup(
      <RailUserBlock collapsed={false} logout={<span>退出</span>} name="张三" />,
    );

    expect(markup).toContain("size-9");
    expect(markup).not.toContain("rounded-full");
  });
});

describe("shared rail account block", () => {
  const baseProps = {
    logoutHref: "/api/auth/logout",
    logoutIcon: <span>⎋</span>,
    name: "林晨",
  };

  it("renders name, caption and an accessible logout action when expanded", () => {
    const markup = renderToStaticMarkup(
      <RailUserBlock {...baseProps} caption="管理员" collapsed={false} />,
    );

    expect(markup).toContain("林晨");
    expect(markup).toContain("管理员");
    expect(markup).toContain('aria-label="退出登录"');
    expect(markup).toContain('title="退出登录"');
    expect(markup).toContain('href="/api/auth/logout"');
  });

  it("keeps the avatar initial and a keyboard-reachable logout when collapsed", () => {
    const markup = renderToStaticMarkup(
      <RailUserBlock {...baseProps} caption="管理员" collapsed />,
    );

    // 折叠态只留头像首字母 + 退出动作，名称走容器 title tooltip。
    expect(markup).toContain(">林<");
    expect(markup).toContain('title="林晨"');
    expect(markup).not.toContain("管理员");
    expect(markup).toContain('aria-label="退出登录"');
    expect(markup).toContain("focus-visible:ring-2");
  });

  it("expresses the GET/POST logout difference through an explicit prop", () => {
    const get = renderToStaticMarkup(<RailUserBlock {...baseProps} collapsed={false} />);
    const post = renderToStaticMarkup(
      <RailUserBlock {...baseProps} collapsed={false} logoutMethod="post" />,
    );

    expect(get).toContain('<a aria-label="退出登录"');
    expect(get).not.toContain("<form");
    expect(post).toContain('action="/api/auth/logout"');
    expect(post).toContain('method="post"');
    expect(post).toContain('type="submit"');
    expect(post).not.toContain("<a ");
    // 两种 method 共享同一退出视觉规格（design.md「主题轨底部 = 用户区」）。
    expect(post).toContain("hover:text-destructive");
    expect(get).toContain("hover:text-destructive");
  });

  it("links the primary name to the optional account page only when provided", () => {
    const withAccount = renderToStaticMarkup(
      <RailUserBlock {...baseProps} collapsed={false} nameHref="/account" />,
    );
    const withoutAccount = renderToStaticMarkup(
      <RailUserBlock {...baseProps} collapsed={false} />,
    );

    expect(withAccount).toContain('href="/account"');
    expect(withoutAccount).not.toContain('href="/account"');
  });

  it("falls back to a deterministic avatar initial for an empty display name", () => {
    expect(
      renderToStaticMarkup(<RailUserBlock {...baseProps} collapsed name="   " />),
    ).toContain(">U<");
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
