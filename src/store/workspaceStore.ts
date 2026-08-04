import { create } from 'zustand';

interface WorkspaceState {
  activeWorkspaceId: string | null;
  activeFolderId: string | null;
  
  setActiveWorkspace: (workspaceId: string | null) => void;
  setActiveFolder: (folderId: string | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeWorkspaceId: null,
  activeFolderId: null,

  setActiveWorkspace: (workspaceId) => set({ activeWorkspaceId: workspaceId, activeFolderId: null }),
  setActiveFolder: (folderId) => set({ activeFolderId: folderId }),
}));
