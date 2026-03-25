
import { create } from "zustand";

type DialogStore = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useDialog = create<DialogStore>((set => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
})))