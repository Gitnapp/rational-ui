import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@gitnapp/ui/components/ui/breadcrumb";
import { RailBreadcrumb } from "@gitnapp/web-shell";

import { ShowcaseSection } from "../showcase";

export function BreadcrumbSection() {
  return (
    <ShowcaseSection
      id="breadcrumb"
      title="Breadcrumb"
      description="Shows the current page's location within a navigation hierarchy."
    >
      <div className="mb-6">
        <RailBreadcrumb
          compact
          items={[
            { label: "标的列表", href: "#breadcrumb" },
            { label: "Advanced Micro Devices, Inc.", href: "#breadcrumb" },
          ]}
        />
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Navigation</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </ShowcaseSection>
  );
}
