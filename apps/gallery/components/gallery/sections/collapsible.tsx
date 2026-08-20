"use client";

import { Button } from "@gitnapp/ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@gitnapp/ui/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";

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
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@gitnapp/ui</div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm">
            @gitnapp/design-tokens
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm">@gitnapp/gallery</div>
        </CollapsibleContent>
      </Collapsible>
    </ShowcaseSection>
  );
}
