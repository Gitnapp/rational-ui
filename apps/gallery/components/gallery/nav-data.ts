// Single source of truth for the gallery's left nav AND for which section
// components app/page.tsx renders. Every id here must have a matching
// `components/gallery/sections/{id}.tsx` exporting `{PascalCase(id)}Section`.
export const NAV_GROUPS = [
  {
    id: "inputs",
    title: "Inputs",
    items: [
      { id: "button", label: "Button" },
      { id: "input", label: "Input" },
      { id: "textarea", label: "Textarea" },
      { id: "label", label: "Label" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio-group", label: "Radio Group" },
      { id: "select", label: "Select" },
      { id: "switch", label: "Switch" },
      { id: "slider", label: "Slider" },
      { id: "input-otp", label: "Input OTP" },
      { id: "form", label: "Form" },
    ],
  },
  {
    id: "overlays",
    title: "Overlays",
    items: [
      { id: "dialog", label: "Dialog" },
      { id: "alert-dialog", label: "Alert Dialog" },
      { id: "sheet", label: "Sheet" },
      { id: "drawer", label: "Drawer" },
      { id: "popover", label: "Popover" },
      { id: "tooltip", label: "Tooltip" },
      { id: "hover-card", label: "Hover Card" },
      { id: "dropdown-menu", label: "Dropdown Menu" },
      { id: "context-menu", label: "Context Menu" },
      { id: "command", label: "Command" },
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    items: [
      { id: "tabs", label: "Tabs" },
      { id: "accordion", label: "Accordion" },
      { id: "collapsible", label: "Collapsible" },
      { id: "breadcrumb", label: "Breadcrumb" },
      { id: "pagination", label: "Pagination" },
      { id: "menubar", label: "Menubar" },
      { id: "navigation-menu", label: "Navigation Menu" },
    ],
  },
  {
    id: "data-display",
    title: "Data Display",
    items: [
      { id: "card", label: "Card" },
      { id: "badge", label: "Badge" },
      { id: "avatar", label: "Avatar" },
      { id: "table", label: "Table" },
      { id: "progress", label: "Progress" },
      { id: "loading-patterns", label: "Loading & patterns" },
      { id: "skeleton", label: "Skeleton" },
      { id: "separator", label: "Separator" },
      { id: "scroll-area", label: "Scroll Area" },
      { id: "calendar", label: "Calendar" },
    ],
  },
  {
    id: "feedback",
    title: "Feedback",
    items: [
      { id: "alert", label: "Alert" },
      { id: "sonner", label: "Sonner (Toast)" },
      { id: "toggle", label: "Toggle" },
      { id: "toggle-group", label: "Toggle Group" },
    ],
  },
] as const;

export type NavItemId = (typeof NAV_GROUPS)[number]["items"][number]["id"];
export type NavGroupId = (typeof NAV_GROUPS)[number]["id"];
