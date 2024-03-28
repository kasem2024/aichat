import { create } from 'zustand'

interface BearState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useModal = create<BearState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
