import { Avatar, AvatarFallback, AvatarImage } from "@garage/ui/components/ui/avatar";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function AvatarSection() {
  return (
    <ShowcaseSection id="avatar" title="Avatar" description="Image with a fallback for broken or missing sources.">
      <VariantRow>
        <Variant label="broken image → fallback">
          <Avatar>
            <AvatarImage src="/does-not-exist.png" alt="Jane Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Variant>
        <Variant label="fallback only">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Variant>
      </VariantRow>
    </ShowcaseSection>
  );
}
