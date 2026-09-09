"use client";
import { AnimatedSwitcher } from "@gitnapp/ui/components/ui/animated-switcher";
import { Button } from "@gitnapp/ui/components/ui/button";
import { CardPagination, useCardPage } from "@gitnapp/ui/components/ui/card-pagination";
import { FilterToolbar } from "@gitnapp/ui/components/ui/filter-toolbar";
import { LoadingState } from "@gitnapp/ui/components/ui/loading";
import { MathCurveLoader } from "@gitnapp/ui/components/ui/math-curve-loader";
import { useState } from "react";
import { ShowcaseSection } from "../showcase";

export function LoadingPatternsSection() {
  const [episode, setEpisode] = useState(0);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const page = useCardPage(
    Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`),
    4,
    "demo",
  );
  return (
    <ShowcaseSection id="loading-patterns" title="Loading & content patterns">
      <FilterToolbar
        filters={
          <AnimatedSwitcher className="segmented">
            {["all", "active"].map((value) => (
              <button
                key={value}
                type="button"
                className={tab === value ? "selected" : ""}
                onClick={() => setTab(value)}
              >
                {value}
              </button>
            ))}
          </AnimatedSwitcher>
        }
        search={{ value: search, onChange: setSearch, label: "Search examples" }}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative h-48 rounded-md border">
          <LoadingState
            key={episode}
            inline
            message="首次加载可能需要一些时间。"
            className="h-full"
          />
        </div>
        <div className="flex h-48 items-center justify-center gap-6 rounded-md border">
          {[0, 1, 2].map((id) => (
            <MathCurveLoader key={`${episode}-${id}`} />
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={() => setEpisode((value) => value + 1)}>
          重新加载
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {page.items.map((item) => (
          <div key={item} className="rounded-md bg-muted p-3 text-sm">
            {item}
          </div>
        ))}
      </div>
      <CardPagination {...page} onChange={page.setPage} label="Example pages" />
    </ShowcaseSection>
  );
}
