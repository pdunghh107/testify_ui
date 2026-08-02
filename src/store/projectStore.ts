import { create } from 'zustand';

interface ProjectState {
  activeProjectId: string | null;
  activeFolderId: string | null;
  
  setActiveProject: (projectId: string | null) => void;
  setActiveFolder: (folderId: string | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  activeProjectId: null,
  activeFolderId: null,

  setActiveProject: (projectId) => set({ activeProjectId: projectId, activeFolderId: null }),
  setActiveFolder: (folderId) => set({ activeFolderId: folderId }),
}));
