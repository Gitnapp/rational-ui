"use client";

import { Slider } from "@garage/ui/components/ui/slider";
import { useState } from "react";

import { ShowcaseSection, Variant, VariantRow } from "../showcase";

export function SliderSection() {
  const [value, setValue] = useState([50]);

  return (
    <ShowcaseSection id="slider" title="Slider" description="Range input built on Radix Slider.">
      <VariantRow>
        <Variant label={`controlled (${value[0]})`}>
          <Slider
            className="w-48"
            defaultValue={value}
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
          />
        </Variant>
        <Variant label="disabled">
          <Slider className="w-48" defaultValue={[30]} max={100} step={1} disabled />
        </Variant>
      </VariantRow>
    </ShowcaseSection>
  );
}
