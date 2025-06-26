// src/stores/modalStore.ts
import { create } from "zustand";

type RoleType = "investor" | "realtor" | null;

type ModalStore = {
  isOpen: boolean;
  role: RoleType;
  openModal: (role?: RoleType) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  role: null,
  openModal: (role = null) => set({ isOpen: true, role }),
  closeModal: () => set({ isOpen: false, role: null }),
}));
