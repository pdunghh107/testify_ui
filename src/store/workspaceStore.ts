import { create } from 'zustand';

interface ProjectState {
  activeWorkspaceId: string | null;
  activeFolderId: string | null;
  
  setActiveWorkspace: (workspaceId: string | null) => void;
  setActiveFolder: (folderId: string | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  activeWorkspaceId: null,
  activeFolderId: null,

  setActiveWorkspace: (workspaceId) => set({ activeWorkspaceId: workspaceId, activeFolderId: null }),
  setActiveFolder: (folderId) => set({ activeFolderId: folderId }),
}));
