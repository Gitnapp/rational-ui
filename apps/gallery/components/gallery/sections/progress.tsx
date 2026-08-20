import { Progress } from "@garage/ui/components/ui/progress";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function ProgressSection() {
  return (
    <ShowcaseSection id="progress" title="Progress" description="Determinate progress indicator.">
      <VariantRow>
        <Variant label="33%">
          <div className="w-56">
            <Progress value={33} />
          </div>
        </Variant>
        <Variant label="66%">
          <div className="w-56">
            <Progress value={66} />
          </div>
        </Variant>
        <Variant label="100%">
          <div className="w-56">
            <Progress value={100} />
          </div>
        </Variant>
      </VariantRow>
    </ShowcaseSection>
  );
}
