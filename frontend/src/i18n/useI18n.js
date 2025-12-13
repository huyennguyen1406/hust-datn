import { useStore } from "@tanstack/react-store";
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
    localStorage.setItem("lang", next);
  };

  return { lang, t, toggleLang };
}
