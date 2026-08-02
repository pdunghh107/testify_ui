import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface KeyValueRow {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface RequestTab {
  id: string;
  title: string;
  method: string;
  url: string;
  ruleConfigCode: string;
  params: KeyValueRow[];
  headers: KeyValueRow[];
  body: string;
  results?: any[]; // Kết quả các test cases
  logs?: any[]; // Lưu log SSE
  progress?: any;
  isLoading?: boolean;
  workspaceId?: string;
}

interface RequestTabState {
  tabs: RequestTab[];
  activeTabId: string | null;

  // Actions
  addTab: (tab?: Partial<RequestTab>) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, data: Partial<RequestTab>) => void;
}

const createDefaultTab = (): RequestTab => ({
  id: crypto.randomUUID(),
  title: "Untitled Request",
  method: "POST",
  url: "http://localhost:9002/api/users",
  ruleConfigCode: "",
  params: [{ id: crypto.randomUUID(), key: "", value: "", enabled: true }],
  headers: [
    {
      id: crypto.randomUUID(),
      key: "Content-Type",
      value: "application/json",
      enabled: true,
    },
  ],
  body: "",
});

export const useRequestTabStore = create<RequestTabState>()(
  persist(
    (set) => ({
      tabs: [createDefaultTab()],
      activeTabId: null,

      addTab: (tabData) =>
        set((state) => {
          const newTab = { ...createDefaultTab(), ...tabData };
          return {
            tabs: [...state.tabs, newTab],
            activeTabId: newTab.id,
          };
        }),

      closeTab: (id) =>
        set((state) => {
          const newTabs = state.tabs.filter((t) => t.id !== id);
          let newActiveId = state.activeTabId;
          if (state.activeTabId === id) {
            newActiveId =
              newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
          }
          if (newTabs.length === 0) {
            const fallback = createDefaultTab();
            return { tabs: [fallback], activeTabId: fallback.id };
          }
          return { tabs: newTabs, activeTabId: newActiveId };
        }),

      setActiveTab: (id) => set({ activeTabId: id }),

      updateTab: (id, data) =>
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === id ? { ...tab, ...data } : tab,
          ),
        })),
    }),
    {
      name: "testify-request-tabs",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && !state.activeTabId && state.tabs.length > 0) {
          state.activeTabId = state.tabs[0].id;
        }
      },
    },
  ),
);
