import { SidebarAction } from "./SidebarAction";
import {
  SidebarCollapsible,
  SidebarCollapsibleContent,
  SidebarCollapsibleIcon,
  SidebarCollapsibleTrigger,
} from "./SidebarCollapsible";
import { SidebarContent } from "./SidebarContent";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarGroup, SidebarGroupLabel } from "./SidebarGroup";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem } from "./SidebarItem";
import { SidebarRoot } from "./SidebarRoot";
import { SidebarToggleButton } from "./SidebarToggleButton";
import {
  type ActionConfig,
  type SidebarNode,
  SidebarTree,
} from "./SidebarTree";

export const Sidebar = {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  Item: SidebarItem,
  Collapsible: SidebarCollapsible,
  CollapsibleTrigger: SidebarCollapsibleTrigger,
  CollapsibleContent: SidebarCollapsibleContent,
  CollapsibleIcon: SidebarCollapsibleIcon,
  ToggleButton: SidebarToggleButton,
  Tree: SidebarTree,
  Action: SidebarAction,
};

export type { ActionConfig, SidebarNode };
