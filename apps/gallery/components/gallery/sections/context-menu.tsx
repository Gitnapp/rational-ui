import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@gitnapp/ui/components/ui/context-menu";

import { ShowcaseSection } from "../showcase";

export function ContextMenuSection() {
  return (
    <ShowcaseSection
      id="context-menu"
      title="Context Menu"
      description="Menu triggered by a right click on a target area."
    >
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </ShowcaseSection>
  );
}
