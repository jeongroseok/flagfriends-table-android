import { LocaleContext } from "../providers/LocaleProvider";
import { useContext } from "react";

export function useLanguageCode() {
  const { languageCode } = useContext(LocaleContext);
  return languageCode;
}

export function useRegionCode() {
  const { regionCode } = useContext(LocaleContext);
  return regionCode;
}

export function useCurrencyCode() {
  const { currencyCode } = useContext(LocaleContext);
  return currencyCode;
}
