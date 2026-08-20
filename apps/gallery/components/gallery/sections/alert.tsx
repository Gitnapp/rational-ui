import { Alert, AlertDescription, AlertTitle } from "@garage/ui/components/ui/alert";
import { AlertTriangleIcon, InfoIcon } from "lucide-react";

import { ShowcaseSection, Stack } from "../showcase";

export function AlertSection() {
  return (
    <ShowcaseSection
      id="alert"
      title="Alert"
      description="Inline callout for important information."
    >
      <Stack>
        <Alert className="w-96">
          <InfoIcon />
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>
            This project uses design tokens from @garage/design-tokens.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive" className="w-96">
          <AlertTriangleIcon />
          <AlertTitle>Deployment failed</AlertTitle>
          <AlertDescription>
            Your build could not be completed. Check the logs for details.
          </AlertDescription>
        </Alert>
      </Stack>
    </ShowcaseSection>
  );
}
