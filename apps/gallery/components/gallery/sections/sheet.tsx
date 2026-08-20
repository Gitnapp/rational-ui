import { Button } from "@garage/ui/components/ui/button";
import { Input } from "@garage/ui/components/ui/input";
import { Label } from "@garage/ui/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@garage/ui/components/ui/sheet";

import { ShowcaseSection } from "../showcase";

export function SheetSection() {
  return (
    <ShowcaseSection
      id="sheet"
      title="Sheet"
      description="Slide-in panel anchored to a screen edge, for tasks that don't need a full page."
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Edit profile</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 px-4">
            <div className="grid gap-2">
              <Label htmlFor="sheet-name">Name</Label>
              <Input id="sheet-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-username">Username</Label>
              <Input id="sheet-username" defaultValue="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <Button>Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </ShowcaseSection>
  );
}
