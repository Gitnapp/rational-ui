import { Button } from "@garage/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@garage/ui/components/ui/card";
import { Input } from "@garage/ui/components/ui/input";
import { Label } from "@garage/ui/components/ui/label";

import { ShowcaseSection } from "../showcase";

export function CardSection() {
  return (
    <ShowcaseSection
      id="card"
      title="Card"
      description="Surface for grouping related content, headers, and actions."
    >
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy a new project in one click.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="card-project-name">Name</Label>
            <Input id="card-project-name" placeholder="My project" />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </ShowcaseSection>
  );
}
