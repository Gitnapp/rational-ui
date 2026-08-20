import { ScrollArea } from "@garage/ui/components/ui/scroll-area";
import { Separator } from "@garage/ui/components/ui/separator";

import { ShowcaseSection } from "../showcase";

const tags = Array.from({ length: 20 }, (_, i) => `Tag ${i + 1}`);

export function ScrollAreaSection() {
  return (
    <ShowcaseSection
      id="scroll-area"
      title="Scroll Area"
      description="Custom-styled scrollable region."
    >
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium text-foreground">Tags</h4>
          {tags.map((tag) => (
            <div key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </ShowcaseSection>
  );
}
