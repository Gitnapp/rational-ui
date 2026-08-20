import { Label } from "@gitnapp/ui/components/ui/label";
import { Switch } from "@gitnapp/ui/components/ui/switch";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function SwitchSection() {
  return (
    <ShowcaseSection id="switch" title="Switch" description="Boolean toggle, paired with a Label.">
      <VariantRow>
        <Variant label="off">
          <div className="flex items-center gap-2">
            <Switch id="switch-off" />
            <Label htmlFor="switch-off">Airplane mode</Label>
          </div>
        </Variant>
        <Variant label="on">
          <div className="flex items-center gap-2">
            <Switch id="switch-on" defaultChecked />
            <Label htmlFor="switch-on">Airplane mode</Label>
          </div>
        </Variant>
        <Variant label="disabled">
          <div className="flex items-center gap-2">
            <Switch id="switch-disabled" disabled />
            <Label htmlFor="switch-disabled">Airplane mode</Label>
          </div>
        </Variant>
      </VariantRow>
    </ShowcaseSection>
  );
}
