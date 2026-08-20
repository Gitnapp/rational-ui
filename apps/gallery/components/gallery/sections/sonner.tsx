"use client";

import { Button } from "@gitnapp/ui/components/ui/button";
import { toast } from "sonner";

import { ShowcaseSection, VariantRow } from "../showcase";

export function SonnerSection() {
  return (
    <ShowcaseSection
      id="sonner"
      title="Sonner"
      description="Toast notifications, mounted globally via <Toaster />."
    >
      <VariantRow>
        <Button variant="outline" onClick={() => toast("Event has been created.")}>
          Default
        </Button>
        <Button variant="outline" onClick={() => toast.success("Changes saved successfully.")}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.message("New message received")}>
          Message
        </Button>
      </VariantRow>
    </ShowcaseSection>
  );
}
