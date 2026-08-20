import { Button } from "@gitnapp/ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@gitnapp/ui/components/ui/dialog";
import { Input } from "@gitnapp/ui/components/ui/input";
import { Label } from "@gitnapp/ui/components/ui/label";

import { ShowcaseSection } from "../showcase";

export function DialogSection() {
  return (
    <ShowcaseSection
      id="dialog"
      title="Dialog"
      description="Modal overlay, focus-trapped by Radix."
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dialog-name">Name</Label>
              <Input id="dialog-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dialog-username">Username</Label>
              <Input id="dialog-username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ShowcaseSection>
  );
}
