import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@garage/ui/components/ui/command";
import { CalculatorIcon, CalendarIcon, SettingsIcon, SmileIcon, UserIcon } from "lucide-react";

import { ShowcaseSection } from "../showcase";

export function CommandSection() {
  return (
    <ShowcaseSection
      id="command"
      title="Command"
      description="Filterable command palette, rendered inline (not behind a dialog trigger)."
    >
      <Command className="w-80 rounded-lg border shadow-sm">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon />
              Calendar
            </CommandItem>
            <CommandItem>
              <SmileIcon />
              Search Emoji
            </CommandItem>
            <CommandItem>
              <CalculatorIcon />
              Calculator
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <UserIcon />
              Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <SettingsIcon />
              Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </ShowcaseSection>
  );
}
