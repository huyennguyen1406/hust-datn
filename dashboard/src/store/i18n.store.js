import { Store } from "@tanstack/react-store";
import { LOCAL_STORAGE_LANG } from "../constant/localStorageConst";

const storedLang = localStorage.getItem(LOCAL_STORAGE_LANG) || "en";

export const i18nStore = new Store({
  lang: storedLang,
});
