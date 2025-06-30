import { create } from "zustand";

type RoleType = "investor" | "realtor" | null;

type ModalStore = {
  isLoginPromptOpen: boolean;
  isRegisterOpen: boolean;
  isLoginOpen: boolean;
  isAddPropertyOpen: boolean;
  role: RoleType;

  // Actions
  onLoginPrompt: () => void;
  onRegisterModal: (role?: RoleType) => void;
  onLoginModal: () => void;
  onAddPropertyModal: () => void;

  onCloseRegisterModal: () => void;
  onCloseAddPropertyModal: () => void;
  onCloseLoginModal: () => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isLoginPromptOpen: false,
  isRegisterOpen: false,
  isLoginOpen: false,
  isAddPropertyOpen: false,
  role: null,

  onLoginPrompt: () => set({ isLoginPromptOpen: true }),

  onRegisterModal: (role = null) =>
    set({
      isRegisterOpen: true,
      isLoginPromptOpen: false,
      isLoginOpen: false,
      role,
    }),

  onLoginModal: () =>
    set({ isLoginOpen: true, isRegisterOpen: false, isLoginPromptOpen: false }),

  onAddPropertyModal: () => set({ isAddPropertyOpen: true }),
  onCloseRegisterModal: () => set({ isRegisterOpen: false, role: null }),

  onCloseLoginModal: () => set({ isLoginOpen: false }),

  onCloseAddPropertyModal: () => set({ isAddPropertyOpen: false }),

  onClose: () => set({ isLoginPromptOpen: false }),
}));
