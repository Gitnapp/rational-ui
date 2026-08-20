import { Button } from "@garage/ui/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@garage/ui/components/ui/tooltip";

import { ShowcaseSection } from "../showcase";

export function TooltipSection() {
  return (
    <ShowcaseSection
      id="tooltip"
      title="Tooltip"
      description="Short label shown on hover or focus. A single TooltipProvider is mounted globally in the app layout."
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </ShowcaseSection>
  );
}
