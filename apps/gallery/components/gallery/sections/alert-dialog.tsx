import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@gitnapp/ui/components/ui/alert-dialog";
import { Button } from "@gitnapp/ui/components/ui/button";

import { ShowcaseSection } from "../showcase";

export function AlertDialogSection() {
  return (
    <ShowcaseSection
      id="alert-dialog"
      title="Alert Dialog"
      description="Interrupts the user for a destructive action they must explicitly confirm or cancel."
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ShowcaseSection>
  );
}
