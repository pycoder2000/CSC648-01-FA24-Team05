import { create } from "zustand";

interface AddItemModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddItemModal = create<AddItemModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useAddItemModal;