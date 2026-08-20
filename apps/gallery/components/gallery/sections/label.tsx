import { Input } from "@garage/ui/components/ui/input";
import { Label } from "@garage/ui/components/ui/label";

import { ShowcaseSection, Stack } from "../showcase";

export function LabelSection() {
  return (
    <ShowcaseSection
      id="label"
      title="Label"
      description="Accessible field label, paired with a control via id/htmlFor."
    >
      <Stack>
        <div className="grid gap-2">
          <Label htmlFor="label-email">Email</Label>
          <Input id="label-email" type="email" placeholder="you@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="label-disabled">Disabled field</Label>
          <Input id="label-disabled" placeholder="Can't touch this" disabled />
        </div>
      </Stack>
    </ShowcaseSection>
  );
}
