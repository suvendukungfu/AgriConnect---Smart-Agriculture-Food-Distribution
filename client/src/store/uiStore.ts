import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  language: 'en' | 'hi' | 'ta';
  toggleSidebar: () => void;
  setLanguage: (lang: 'en' | 'hi' | 'ta') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      language: 'en',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setLanguage: (lang) => set({ language: lang }),
    }),
    { name: 'agriconnect-ui-storage' }
  )
);
