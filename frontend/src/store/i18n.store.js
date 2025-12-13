import { Store } from "@tanstack/react-store";

const storedLang = localStorage.getItem("lang") || "en";

export const i18nStore = new Store({
  lang: storedLang,
});
