"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BannerStore {
  bannerVisible: boolean;
  setBannerVisible: (visible: boolean) => void;
  closeBanner: () => void;
  showBanner: () => void;
}

const useBannerStore = create<BannerStore>()(
  persist(
    (set) => ({
      bannerVisible: true,

      setBannerVisible: (visible: boolean) => {
        set({ bannerVisible: visible });
      },

      closeBanner: () => {
        set({ bannerVisible: false });
      },

      showBanner: () => {
        set({ bannerVisible: true });
      },
    }),
    {
      name: "banner-visibility",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function useBanner() {
  const store = useBannerStore();

  return {
    bannerVisible: store.bannerVisible,
    setBannerVisible: store.setBannerVisible,
    closeBanner: store.closeBanner,
    showBanner: store.showBanner,
  };
}

export { useBannerStore };
