import { Button } from "@gitnapp/ui/components/ui/button";
import { Input } from "@gitnapp/ui/components/ui/input";
import { Label } from "@gitnapp/ui/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@gitnapp/ui/components/ui/popover";

import { ShowcaseSection } from "../showcase";

export function PopoverSection() {
  return (
    <ShowcaseSection
      id="popover"
      title="Popover"
      description="Anchored floating panel for small pieces of content or controls."
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Dimensions</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid gap-4">
            <div className="space-y-1">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-2">
                <Label htmlFor="popover-width">Width</Label>
                <Input id="popover-width" defaultValue="100%" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label htmlFor="popover-height">Height</Label>
                <Input id="popover-height" defaultValue="25px" className="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </ShowcaseSection>
  );
}
