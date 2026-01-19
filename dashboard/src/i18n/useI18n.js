import { useStore } from "@tanstack/react-store";
import { LOCAL_STORAGE_LANG } from "../constant/localStorageConst";
import { i18nStore } from "../store/i18n.store";
import { messages } from "./messages";

export function useI18n() {
  const { lang } = useStore(i18nStore);

  const t = (key) => {
    return messages[lang]?.[key] ?? key;
  };

  const toggleLang = () => {
    const next = lang === "en" ? "vi" : "en";
    i18nStore.setState({ lang: next });
    localStorage.setItem(LOCAL_STORAGE_LANG, next);
  };

  return { lang, t, toggleLang };
}
