import { Button } from "@garage/ui/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@garage/ui/components/ui/hover-card";
import { CalendarIcon } from "lucide-react";

import { ShowcaseSection } from "../showcase";

export function HoverCardSection() {
  return (
    <ShowcaseSection
      id="hover-card"
      title="Hover Card"
      description="Preview card that appears when hovering a link-like trigger."
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@garage-ui</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">@garage-ui</h4>
            <p className="text-sm text-muted-foreground">
              The Garage design system. Shared components, tokens, and patterns.
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarIcon className="size-3.5" />
              Joined December 2023
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </ShowcaseSection>
  );
}
