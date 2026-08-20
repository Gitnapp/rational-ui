import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@gitnapp/ui/components/ui/select";

import { ShowcaseSection, Stack } from "../showcase";

export function SelectSection() {
  return (
    <ShowcaseSection
      id="select"
      title="Select"
      description="Listbox built on Radix Select, keyboard navigable."
    >
      <Stack>
        <Select defaultValue="banana">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Stack>
    </ShowcaseSection>
  );
}
