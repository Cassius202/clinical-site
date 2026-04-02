import { create } from 'zustand'

interface SidebarStore {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
  setIsOpen: (isOpen: boolean) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setIsOpen: (isOpen) => set({ isOpen })
}))