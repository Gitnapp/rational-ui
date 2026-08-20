import { Input } from "@gitnapp/ui/components/ui/input";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function InputSection() {
  return (
    <ShowcaseSection
      id="input"
      title="Input"
      description="Text input with placeholder, disabled, and aria-invalid states."
    >
      <VariantRow>
        <Variant label="default">
          <Input placeholder="Default" />
        </Variant>
        <Variant label="with value">
          <Input defaultValue="Hello world" />
        </Variant>
        <Variant label="disabled">
          <Input placeholder="Disabled" disabled />
        </Variant>
        <Variant label="type=email">
          <Input type="email" placeholder="you@example.com" />
        </Variant>
        <Variant label="type=password">
          <Input type="password" placeholder="Password" />
        </Variant>
        <Variant label="invalid">
          <Input aria-invalid defaultValue="not-an-email" />
        </Variant>
      </VariantRow>
    </ShowcaseSection>
  );
}
