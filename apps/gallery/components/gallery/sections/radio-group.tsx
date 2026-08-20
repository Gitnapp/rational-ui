import { Label } from "@gitnapp/ui/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@gitnapp/ui/components/ui/radio-group";

import { ShowcaseSection, Stack } from "../showcase";

export function RadioGroupSection() {
  return (
    <ShowcaseSection
      id="radio-group"
      title="Radio Group"
      description="Single-select among mutually exclusive options."
    >
      <Stack>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="radio-default" />
            <Label htmlFor="radio-default">Default</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="comfortable" id="radio-comfortable" />
            <Label htmlFor="radio-comfortable">Comfortable</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="compact" id="radio-compact" />
            <Label htmlFor="radio-compact">Compact</Label>
          </div>
        </RadioGroup>
      </Stack>
    </ShowcaseSection>
  );
}
