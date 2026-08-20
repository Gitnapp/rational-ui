"use client";

import { cn } from "@garage/ui/lib/utils";
// Gallery-only preview switch. 铁律 #4（无手动 theme switcher）约束的是产品；
// gallery 是验收台，需要不靠操作系统设置就能检查暗色下的对比度/边框/阴影
// （docs/engineering/roadmap.md §2.1）。机制复用 tokens.css 内建的
// `:root[data-theme="dark"|"light"]` 覆盖，不引入任何主题状态库。
import { useEffect, useState } from "react";

type ThemePreview = "light" | "dark" | "system";

const OPTIONS: readonly { id: ThemePreview; label: string }[] = [
  { id: "light", label: "浅色" },
  { id: "dark", label: "深色" },
  { id: "system", label: "系统" },
];

export function ThemePreviewToggle() {
  const [theme, setTheme] = useState<ThemePreview>("system");

  useEffect(() => {
    if (theme === "system") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  return (
    <fieldset aria-label="主题预览" className="flex items-center gap-0.5 rounded-md border p-0.5">
      {OPTIONS.map((option) => (
        <button
          aria-pressed={theme === option.id}
          className={cn(
            "rounded-sm px-2 py-0.5 text-xs text-muted-foreground transition-colors",
            theme === option.id && "bg-accent text-accent-foreground",
          )}
          key={option.id}
          onClick={() => setTheme(option.id)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
