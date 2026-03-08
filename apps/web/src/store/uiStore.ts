import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StateCreator } from 'zustand/vanilla';

interface UIState {
  sidebarOpen: boolean;
  language: 'en' | 'hi' | 'ta';
  toggleSidebar: () => void;
  setLanguage: (lang: 'en' | 'hi' | 'ta') => void;
}

const createUIState: StateCreator<UIState> = (set) => ({
  sidebarOpen: false,
  language: 'en',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setLanguage: (lang) => set({ language: lang }),
});

export const useUIStore = create<UIState>()(
  persist(createUIState, { name: 'agriconnect-ui-storage' })
);
