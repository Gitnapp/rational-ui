import { Badge } from "@gitnapp/ui/components/ui/badge";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function BadgeSection() {
  return (
    <ShowcaseSection id="badge" title="Badge" description="Small status or metadata label.">
      <VariantRow>
        <Variant label="default">
          <Badge>Default</Badge>
        </Variant>
        <Variant label="secondary">
          <Badge variant="secondary">Secondary</Badge>
        </Variant>
        <Variant label="destructive">
          <Badge variant="destructive">Destructive</Badge>
        </Variant>
        <Variant label="outline">
          <Badge variant="outline">Outline</Badge>
        </Variant>
        <Variant label="ghost">
          <Badge variant="ghost">Ghost</Badge>
        </Variant>
        <Variant label="link">
          <Badge variant="link">Link</Badge>
        </Variant>
      </VariantRow>
    </ShowcaseSection>
  );
}
