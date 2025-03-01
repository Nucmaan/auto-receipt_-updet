import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'employee' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  designation: string;
  avatar: string;
  coverImage: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: () => boolean;
  isEmployee: () => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      isAdmin: () => get().user?.role === 'admin',
      isEmployee: () => get().user?.role === 'employee',
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
    }
  )
);

// Mock users for demo
export const mockUsers: User[] = Array.from({ length: 400 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i < 200 ? 'admin' : 'employee',
  department: ['Design', 'Development', 'Marketing', 'Sales'][Math.floor(Math.random() * 4)],
  designation: ['Manager', 'Team Lead', 'Senior Developer', 'Designer'][Math.floor(Math.random() * 4)],
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${i + 1}`,
  coverImage: `https://picsum.photos/seed/user${i + 1}/800/200`
}));