import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@garage/ui/components/ui/navigation-menu";

import { ShowcaseSection } from "../showcase";

export function NavigationMenuSection() {
  return (
    <ShowcaseSection
      id="navigation-menu"
      title="Navigation Menu"
      description="Top-level site navigation with a hover/focus-driven dropdown."
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-64 gap-1 p-2">
                <li>
                  <NavigationMenuLink href="#">
                    <div className="font-medium">Garage UI</div>
                    <div className="text-muted-foreground">Component library for React.</div>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">
                    <div className="font-medium">Design Tokens</div>
                    <div className="text-muted-foreground">Shared color and spacing scale.</div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </ShowcaseSection>
  );
}
