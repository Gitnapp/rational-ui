import { Textarea } from "@garage/ui/components/ui/textarea";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function TextareaSection() {
  return (
    <ShowcaseSection id="textarea" title="Textarea" description="Multi-line text input, sizes to content.">
      <VariantRow>
        <Variant label="default">
          <Textarea placeholder="Type your message here." />
        </Variant>
        <Variant label="disabled">
          <Textarea placeholder="Disabled" disabled />
        </Variant>
      </VariantRow>
    </ShowcaseSection>
  );
}
