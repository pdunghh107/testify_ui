import { createContext, useContext } from 'react';

export interface TabsContextValue {
  activeTab: string;
  onChange: (id: string) => void;
  baseId: string;
}

export const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a <Tabs.Root>');
  }
  return context;
};
