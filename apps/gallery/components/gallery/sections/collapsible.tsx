"use client";

import { useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { Button } from "@garage/ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@garage/ui/components/ui/collapsible";

import { ShowcaseSection } from "../showcase";

export function CollapsibleSection() {
  const [open, setOpen] = useState(false);

  return (
    <ShowcaseSection
      id="collapsible"
      title="Collapsible"
      description="Toggleable region for content that can be hidden by default."
    >
      <Collapsible open={open} onOpenChange={setOpen} className="w-80 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium">@peduarte starred 3 repositories</span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Toggle">
              <ChevronsUpDownIcon />
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@garage/ui</div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm">@garage/design-tokens</div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm">@garage/gallery</div>
        </CollapsibleContent>
      </Collapsible>
    </ShowcaseSection>
  );
}
