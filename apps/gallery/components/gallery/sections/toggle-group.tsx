import { ToggleGroup, ToggleGroupItem } from "@garage/ui/components/ui/toggle-group";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function ToggleGroupSection() {
  return (
    <ShowcaseSection
      id="toggle-group"
      title="Toggle Group"
      description="A set of two-state buttons, single- or multi-select."
    >
      <VariantRow>
        <Variant label="single">
          <ToggleGroup type="single" defaultValue="left" variant="outline">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeftIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenterIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRightIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </Variant>
        <Variant label="multiple">
          <ToggleGroup type="multiple" variant="outline">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeftIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenterIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRightIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </Variant>
      </VariantRow>
    </ShowcaseSection>
  );
}
