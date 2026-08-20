import type { ComponentType } from "react";

import { GallerySidebarShell } from "../components/gallery/app-shell";
import { NAV_GROUPS, type NavItemId } from "../components/gallery/nav-data";

import { AccordionSection } from "../components/gallery/sections/accordion";
import { AlertSection } from "../components/gallery/sections/alert";
import { AlertDialogSection } from "../components/gallery/sections/alert-dialog";
import { AvatarSection } from "../components/gallery/sections/avatar";
import { BadgeSection } from "../components/gallery/sections/badge";
import { BreadcrumbSection } from "../components/gallery/sections/breadcrumb";
import { ButtonSection } from "../components/gallery/sections/button";
import { CalendarSection } from "../components/gallery/sections/calendar";
import { CardSection } from "../components/gallery/sections/card";
import { CheckboxSection } from "../components/gallery/sections/checkbox";
import { CollapsibleSection } from "../components/gallery/sections/collapsible";
import { CommandSection } from "../components/gallery/sections/command";
import { ContextMenuSection } from "../components/gallery/sections/context-menu";
import { DialogSection } from "../components/gallery/sections/dialog";
import { DrawerSection } from "../components/gallery/sections/drawer";
import { DropdownMenuSection } from "../components/gallery/sections/dropdown-menu";
import { FormSection } from "../components/gallery/sections/form";
import { HoverCardSection } from "../components/gallery/sections/hover-card";
import { InputSection } from "../components/gallery/sections/input";
import { InputOtpSection } from "../components/gallery/sections/input-otp";
import { LabelSection } from "../components/gallery/sections/label";
import { MenubarSection } from "../components/gallery/sections/menubar";
import { NavigationMenuSection } from "../components/gallery/sections/navigation-menu";
import { PaginationSection } from "../components/gallery/sections/pagination";
import { PopoverSection } from "../components/gallery/sections/popover";
import { ProgressSection } from "../components/gallery/sections/progress";
import { RadioGroupSection } from "../components/gallery/sections/radio-group";
import { ScrollAreaSection } from "../components/gallery/sections/scroll-area";
import { SelectSection } from "../components/gallery/sections/select";
import { SeparatorSection } from "../components/gallery/sections/separator";
import { SheetSection } from "../components/gallery/sections/sheet";
import { SkeletonSection } from "../components/gallery/sections/skeleton";
import { SliderSection } from "../components/gallery/sections/slider";
import { SonnerSection } from "../components/gallery/sections/sonner";
import { SwitchSection } from "../components/gallery/sections/switch";
import { TableSection } from "../components/gallery/sections/table";
import { TabsSection } from "../components/gallery/sections/tabs";
import { TextareaSection } from "../components/gallery/sections/textarea";
import { ToggleSection } from "../components/gallery/sections/toggle";
import { ToggleGroupSection } from "../components/gallery/sections/toggle-group";
import { TooltipSection } from "../components/gallery/sections/tooltip";

const SECTIONS: Record<NavItemId, ComponentType> = {
  button: ButtonSection,
  input: InputSection,
  textarea: TextareaSection,
  label: LabelSection,
  checkbox: CheckboxSection,
  "radio-group": RadioGroupSection,
  select: SelectSection,
  switch: SwitchSection,
  slider: SliderSection,
  "input-otp": InputOtpSection,
  form: FormSection,
  dialog: DialogSection,
  "alert-dialog": AlertDialogSection,
  sheet: SheetSection,
  drawer: DrawerSection,
  popover: PopoverSection,
  tooltip: TooltipSection,
  "hover-card": HoverCardSection,
  "dropdown-menu": DropdownMenuSection,
  "context-menu": ContextMenuSection,
  command: CommandSection,
  tabs: TabsSection,
  accordion: AccordionSection,
  collapsible: CollapsibleSection,
  breadcrumb: BreadcrumbSection,
  pagination: PaginationSection,
  menubar: MenubarSection,
  "navigation-menu": NavigationMenuSection,
  card: CardSection,
  badge: BadgeSection,
  avatar: AvatarSection,
  table: TableSection,
  progress: ProgressSection,
  skeleton: SkeletonSection,
  separator: SeparatorSection,
  "scroll-area": ScrollAreaSection,
  calendar: CalendarSection,
  alert: AlertSection,
  sonner: SonnerSection,
  toggle: ToggleSection,
  "toggle-group": ToggleGroupSection,
};

export default function GalleryPage() {
  return (
    <GallerySidebarShell>
      <div className="mx-auto w-full max-w-[73.75rem] space-y-16 px-5 py-8 pb-24 md:px-8">
        <header className="space-y-2 border-b pb-6">
          <h1 className="text-2xl font-semibold text-foreground">组件展示台</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            @garage/ui 全部控件与变体的交互式预览。所有样式来自 @garage/design-tokens；
            主题默认跟随系统 prefers-color-scheme，顶栏右侧有仅限本验收台的 light / dark / system
            预览开关（铁律 #4 约束产品，不约束验收台）。左栏功能区与顶栏来自 @garage/web-shell，与
            content-factory / navigator / userportal 同一套外壳。
          </p>
        </header>
        {NAV_GROUPS.map((group) => (
          <div key={group.id} id={group.id} className="scroll-mt-6 space-y-10">
            <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {group.title}
            </h2>
            {group.items.map((item) => {
              const Section = SECTIONS[item.id];
              return <Section key={item.id} />;
            })}
          </div>
        ))}
      </div>
    </GallerySidebarShell>
  );
}
