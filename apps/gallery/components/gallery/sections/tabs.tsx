import { Tabs, TabsContent, TabsList, TabsTrigger } from "@garage/ui/components/ui/tabs";

import { ShowcaseSection } from "../showcase";

export function TabsSection() {
  return (
    <ShowcaseSection id="tabs" title="Tabs" description="Switch between related views without navigation.">
      <Tabs defaultValue="account" className="w-96">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="text-sm text-muted-foreground">
          Update your name and public profile here.
        </TabsContent>
        <TabsContent value="password" className="text-sm text-muted-foreground">
          Change your password. You&apos;ll be signed out of other sessions.
        </TabsContent>
        <TabsContent value="team" className="text-sm text-muted-foreground">
          Invite teammates and manage their roles.
        </TabsContent>
      </Tabs>
    </ShowcaseSection>
  );
}
