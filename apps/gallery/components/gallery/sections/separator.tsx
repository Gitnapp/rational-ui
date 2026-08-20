import { Separator } from "@garage/ui/components/ui/separator";

import { ShowcaseSection, Stack } from "../showcase";

export function SeparatorSection() {
  return (
    <ShowcaseSection
      id="separator"
      title="Separator"
      description="Visual divider between content, horizontal or vertical."
    >
      <Stack>
        <div className="w-64 space-y-1">
          <h4 className="text-sm font-medium text-foreground">Garage UI</h4>
          <p className="text-sm text-muted-foreground">An open-source component library.</p>
        </div>
        <Separator />
        <div className="flex h-8 items-center gap-4 text-sm text-muted-foreground">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      </Stack>
    </ShowcaseSection>
  );
}
