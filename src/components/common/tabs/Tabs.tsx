import React, { useId } from "react";

import { StyledTabsList, StyledTabTrigger } from "./Tabs.styles";
import { TabsContext, useTabsContext } from "./TabsContext";

// 1. Root
/**
 * Cấu hình Props cho Tabs.Root.
 */
export interface TabsRootProps {
  value: string;
  onChange: (id: string) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Root: React.FC<TabsRootProps> = ({
  value,
  onChange,
  children,
  className,
  style,
}) => {
  const baseId = useId();
  return (
    <TabsContext.Provider value={{ activeTab: value, onChange, baseId }}>
      <div className={`tabs-root ${className || ""}`} style={style}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// 2. List
/**
 * Cấu hình Props cho Tabs.List.
 */
export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}
const List: React.FC<TabsListProps> = ({ children, className }) => {
  return (
    <StyledTabsList
      role="tablist"
      aria-orientation="horizontal"
      className={className}
    >
      {children}
    </StyledTabsList>
  );
};

// 3. Trigger
/**
 * Cấu hình Props cho Tabs.Trigger.
 */
export interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
}
const Trigger: React.FC<TabTriggerProps> = ({ value, children }) => {
  const { activeTab, onChange, baseId } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <StyledTabTrigger
      id={`tab-${baseId}-${value}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${baseId}-${value}`}
      tabIndex={isActive ? 0 : -1}
      $isActive={isActive}
      type="button"
      onClick={(e) => {
        if (isActive) return;
        onChange(value);
        e.currentTarget.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }}
    >
      {children}
    </StyledTabTrigger>
  );
};

// 4. Panel
/**
 * Cấu hình Props cho Tabs.Panel.
 */
export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Panel: React.FC<TabPanelProps> = ({
  value,
  children,
  className,
  style,
}) => {
  const { activeTab, baseId } = useTabsContext();
  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${baseId}-${value}`}
      aria-labelledby={`tab-${baseId}-${value}`}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};

/**
 * Component Tabs dùng để chuyển đổi nội dung giữa các tab khác nhau.
 * Hoạt động dựa trên Context, giúp các thành phần (List, Trigger, Panel) liên kết với nhau thông qua `value`.
 *
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState('info');
 * 
 * <Tabs.Root value={activeTab} onChange={setActiveTab}>
 *   <Tabs.List>
 *     <Tabs.Trigger value="info">Thông tin</Tabs.Trigger>
 *     <Tabs.Trigger value="settings">Cài đặt</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Panel value="info">Nội dung thông tin</Tabs.Panel>
 *   <Tabs.Panel value="settings">Nội dung cài đặt</Tabs.Panel>
 * </Tabs.Root>
 * ```
 */
export const Tabs = {
  Root,
  List,
  Trigger,
  Panel,
};
