import { create } from "zustand";

export type SearchQuery = {
  country: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  condition: string | undefined;
  priceMin: number | undefined;
  priceMax: number | undefined;
  category: string;
};

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
  step: "",
  open: (step) => set({ isOpen: true, step: step }),
  close: () => set({ isOpen: false }),
  setQuery: (query: SearchQuery) => set({ query: query }),
  query: {
    country: '',
    startDate: undefined,
    endDate: undefined,
    condition: '',
    priceMin: undefined,
    priceMax: undefined,
    category: "",
  },
}));

export default useSearchModal;
