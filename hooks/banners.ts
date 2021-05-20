import {
  Banner,
  getBannerById,
  listBannersByStoreId,
} from "../firebase/banners";
import {
  useObservableStateFromFBColRef,
  useObservableStateFromFBDocRef,
} from "./utilities";

import { useMemo } from "react";

export type { Banner };

/* Hooks */
export function useAvailableBannersByStoreId(storeId: string) {
  const [banners, loading, error] = useObservableStateFromFBColRef(
    () => listBannersByStoreId(storeId),
    [storeId]
  );
  return {
    banners: useMemo(
      () => banners.filter((b) => b.status == "SHOW"),
      [banners]
    ),
    loading,
    error,
  };
}

export function useBannerById(id: string) {
  const [banner, loading, error] = useObservableStateFromFBDocRef(
    () => getBannerById(id),
    [id]
  );

  return { banner, loading, error };
}
