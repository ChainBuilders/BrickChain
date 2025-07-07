import type { properties } from "@/data/propertiesData";
import type { PropertyDataType } from "@/libs/validations/addPropertiesSchem";
import { create } from "zustand";

type RoleType = "investor" | "realtor" | null;

type ModalStore = {
  isLoginPromptOpen: boolean;
  isRegisterOpen: boolean;
  isLoginOpen: boolean;
  isAddPropertyOpen: boolean;
  isInvestNowOpen: boolean;
  role: RoleType;
  selectedProperty: typeof properties[0] | null;

  // Actions
  onLoginPrompt: () => void;
  onRegisterModal: (role?: RoleType) => void;
  onLoginModal: () => void;
  onAddPropertyModal: () => void;
  onInvestNowOpenModal: (property: typeof properties[0]) => void;

  onCloseRegisterModal: () => void;
  onCloseAddPropertyModal: () => void;
  onCloseInvestNowModal: () => void;
  onCloseLoginModal: () => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isLoginPromptOpen: false,
  isRegisterOpen: false,
  isLoginOpen: false,
  isAddPropertyOpen: false,
  isInvestNowOpen: false,
  role: null,
  selectedProperty: null,

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
  onInvestNowOpenModal: (property) =>
    set({ isInvestNowOpen: true, selectedProperty: property }),
  onCloseRegisterModal: () => set({ isRegisterOpen: false, role: null }),

  onCloseLoginModal: () => set({ isLoginOpen: false }),

  onCloseAddPropertyModal: () => set({ isAddPropertyOpen: false }),
  onCloseInvestNowModal: () => set({ isInvestNowOpen: false }),

  onClose: () => set({ isLoginPromptOpen: false }),
}));
