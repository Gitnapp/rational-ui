import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
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
});
