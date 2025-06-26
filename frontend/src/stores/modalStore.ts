import { create } from "zustand";

type RoleType = "investor" | "realtor" | null;

type ModalStore = {
  isLoginPromptOpen: boolean;
  isRegisterOpen: boolean;
  isLoginOpen: boolean;
  role: RoleType;

  // Actions
  onLoginPrompt: () => void;
  onRegisterModal: (role?: RoleType) => void;
  onLoginModal: () => void;
  onCloseRegisterModal: () => void;
  onCloseLoginModal: () => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isLoginPromptOpen: false,
  isRegisterOpen: false,
  isLoginOpen: false,
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

  onCloseRegisterModal: () => set({ isRegisterOpen: false, role: null }),
  onCloseLoginModal: () => set({ isLoginOpen: false }),

  onClose: () => set({ isLoginPromptOpen: false }),
}));
