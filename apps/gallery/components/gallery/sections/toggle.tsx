import { Toggle } from "@garage/ui/components/ui/toggle";
import { BoldIcon } from "lucide-react";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function ToggleSection() {
  return (
    <ShowcaseSection
      id="toggle"
      title="Toggle"
      description="Two-state button, e.g. for formatting controls."
    >
      <VariantRow>
        <Variant label="default">
          <Toggle aria-label="Toggle bold">Toggle</Toggle>
        </Variant>
        <Variant label="outline">
          <Toggle variant="outline" aria-label="Toggle bold">
            Toggle
          </Toggle>
        </Variant>
        <Variant label="sm">
          <Toggle size="sm" aria-label="Toggle bold">
            Small
          </Toggle>
        </Variant>
        <Variant label="lg">
          <Toggle size="lg" aria-label="Toggle bold">
            Large
          </Toggle>
        </Variant>
        <Variant label="with icon">
          <Toggle aria-label="Toggle bold">
            <BoldIcon />
          </Toggle>
        </Variant>
      </VariantRow>
    </ShowcaseSection>
  );
}
