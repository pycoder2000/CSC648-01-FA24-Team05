import { create } from "zustand";

interface SuccessModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useSuccessModal = create<SuccessModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));

export default useSuccessModal;
