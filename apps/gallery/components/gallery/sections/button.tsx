import { Loader2Icon, MailIcon } from "lucide-react";

import { Button } from "@garage/ui/components/ui/button";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function ButtonSection() {
  return (
    <ShowcaseSection
      id="button"
      title="Button"
      description="6 variants × 8 sizes. Press feedback and 44px touch targets are baked into the shared variant table — see design.md「间距与尺寸」."
    >
      <div className="flex flex-col gap-8">
        <VariantRow>
          <Variant label="default">
            <Button>Default</Button>
          </Variant>
          <Variant label="secondary">
            <Button variant="secondary">Secondary</Button>
          </Variant>
          <Variant label="outline">
            <Button variant="outline">Outline</Button>
          </Variant>
          <Variant label="ghost">
            <Button variant="ghost">Ghost</Button>
          </Variant>
          <Variant label="destructive">
            <Button variant="destructive">Destructive</Button>
          </Variant>
          <Variant label="link">
            <Button variant="link">Link</Button>
          </Variant>
        </VariantRow>

        <VariantRow>
          <Variant label="xs">
            <Button size="xs">Extra small</Button>
          </Variant>
          <Variant label="sm">
            <Button size="sm">Small</Button>
          </Variant>
          <Variant label="default">
            <Button size="default">Default</Button>
          </Variant>
          <Variant label="lg">
            <Button size="lg">Large</Button>
          </Variant>
        </VariantRow>

        <VariantRow>
          <Variant label="icon">
            <Button size="icon" aria-label="Send">
              <MailIcon />
            </Button>
          </Variant>
          <Variant label="with icon">
            <Button>
              <MailIcon />
              Send email
            </Button>
          </Variant>
          <Variant label="loading">
            <Button disabled>
              <Loader2Icon className="animate-spin" />
              Please wait
            </Button>
          </Variant>
          <Variant label="disabled">
            <Button disabled>Disabled</Button>
          </Variant>
        </VariantRow>
      </div>
    </ShowcaseSection>
  );
}
