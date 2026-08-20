"use client";

import { useState } from "react";

import { Calendar } from "@garage/ui/components/ui/calendar";

import { ShowcaseSection, Stack } from "../showcase";

export function CalendarSection() {
  // Starts unselected (not `new Date()`): a "today" default would be computed
  // once during SSR and again on the client's first render, at two different
  // instants — deterministic-but-different values still cause a hydration
  // mismatch. Selection only ever happens client-side from here, so it's safe.
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return (
    <ShowcaseSection id="calendar" title="Calendar" description="Date picker built on react-day-picker.">
      <Stack>
        <Calendar mode="single" selected={selected} onSelect={setSelected} className="rounded-md border" />
        <p className="text-sm text-muted-foreground">
          Selected: {selected ? selected.toLocaleDateString("en-US") : "none"}
        </p>
      </Stack>
    </ShowcaseSection>
  );
}
