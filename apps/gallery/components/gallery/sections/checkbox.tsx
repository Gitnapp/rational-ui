import { Checkbox } from "@gitnapp/ui/components/ui/checkbox";
import { Label } from "@gitnapp/ui/components/ui/label";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function CheckboxSection() {
  return (
    <ShowcaseSection
      id="checkbox"
      title="Checkbox"
      description="Paired with a Label for an accessible click target."
    >
      <VariantRow>
        <Variant label="unchecked">
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox-unchecked" />
            <Label htmlFor="checkbox-unchecked">Accept terms</Label>
          </div>
        </Variant>
        <Variant label="checked">
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox-checked" defaultChecked />
            <Label htmlFor="checkbox-checked">Accept terms</Label>
          </div>
        </Variant>
        <Variant label="disabled">
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox-disabled" disabled />
            <Label htmlFor="checkbox-disabled">Accept terms</Label>
          </div>
        </Variant>
      </VariantRow>
    </ShowcaseSection>
  );
}
