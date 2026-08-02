import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { clearTokens } from '../utils/cookies';

// ─── 1. Định nghĩa Type ───
export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  citizenIdNumber?: string;
  role: string;
  active: boolean;
  systemRoles: string[];
  systemModules: string[];
  systemPermissions: string[];
  activeTenant?: {
    tenantId: string | null;
    membershipId: string | null;
    roleIds: string[];
    roleCodes: string[];
    modules: string[];
  };
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  
  // Actions
  setAuth: (user: AuthUser) => void;
  updateUser: (data: Partial<AuthUser>) => void;
  logout: () => void;
  
  // Getters / Logic kiểm tra quyền
  hasSystemModule: (moduleCode: string) => boolean;
  hasPermission: (permissionCode: string) => boolean;
}

// ─── 2. Khởi tạo Store ───
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // State ban đầu
      user: null,
      isAuthenticated: false,

      // Thay đổi State
      setAuth: (user) => set({ user, isAuthenticated: true }),
      
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),

      logout: () => {
        clearTokens();
        set({ user: null, isAuthenticated: false });
        // Sẽ handle việc redirect ở layer bên ngoài (ví dụ Axios interceptor hoặc Router)
      },

      // Logic phân quyền (RBAC) di dời từ AuthContext cũ
      hasSystemModule: (moduleCode) => {
        const { user } = get();
        if (!user) return false;

        const modules = user.systemModules || [];
        const permissions = user.systemPermissions || [];
        
        if (user.role === 'super_admin' || modules.includes('*') || permissions.includes('*')) {
          return true;
        }
        
        return modules.includes(moduleCode) || permissions.some(p => p.startsWith(`${moduleCode.toUpperCase()}`));
      },

      hasPermission: (permissionCode) => {
        const { user } = get();
        if (!user) return false;

        const permissions = user.systemPermissions || [];
        if (user.role === 'super_admin' || permissions.includes('*')) {
          return true;
        }
        
        return permissions.includes(permissionCode);
      },
    }),
    {
      name: 'testify-auth-storage', // Key lưu trong localStorage
      storage: createJSONStorage(() => localStorage), // Chỉ lưu state của Store vào localStorage
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // Chỉ persist data, không persist hàm
    }
  )
);
