import { create } from "zustand";

export type SearchQuery = {
    location: string | undefined;  // Updated for location-based search
    category: string | undefined;  // Category of items
    priceMin: number | undefined;  // Minimum price filter
    priceMax: number | undefined;  // Maximum price filter
    condition: string | undefined; // Item condition (e.g., new, used)
}

interface SearchModalStore {
    isOpen: boolean;
    step: string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: '',
    open: (step) => set({ isOpen: true, step: step }),
    close: () => set({ isOpen: false }),
    setQuery: (query: SearchQuery) => set({ query: query }),
    query: {
        location: '',
        category: '',
        priceMin: 0,
        priceMax: undefined,
        condition: ''
    }
}));

export default useSearchModal;
