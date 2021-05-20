import { useContext, useMemo } from "react";

import { AppContext } from "./apps";
import { Banner } from "../firebase/banners";

export type { Banner };

/* Hooks */

export function useBanners() {
  const { banners } = useContext(AppContext);
  return banners;
}

export function useBannerById(id: string) {
  const banners = useBanners();
  return useMemo(() => banners.filter((b) => b.id === id)[0], [banners]);
}
