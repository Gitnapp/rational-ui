import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@garage/ui/components/ui/accordion";

import { ShowcaseSection } from "../showcase";

export function AccordionSection() {
  return (
    <ShowcaseSection
      id="accordion"
      title="Accordion"
      description="Collapsible list of sections, one open at a time."
    >
      <Accordion type="single" collapsible className="w-96">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that match the Garage design system.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ShowcaseSection>
  );
}
