import i18next, { InitOptions } from "i18next";
import en from "../../locales/en.js";
import pt from "../../locales/pt.js";

export const resources = {
  pt: { translation: pt },
  en: { translation: en },
} as const;

type ExtractPlaceholders<S extends string> =
  S extends `${string}{{${infer P}}}${infer Rest}`
    ? P | ExtractPlaceholders<Rest>
    : never;

type PlaceholdersFromObject<T> = T extends object
  ? { [K in keyof T]: PlaceholdersFromObject<T[K]> }[keyof T]
  : ExtractPlaceholders<T & string>;

type AllPlaceholders = PlaceholdersFromObject<typeof pt> | PlaceholdersFromObject<typeof en>;

type DotNestedKeys<T> =
  T extends object
    ? { [K in Extract<keyof T, string>]: T[K] extends object
        ? `${K}` | `${K}.${DotNestedKeys<T[K]>}`
        : `${K}` }[Extract<keyof T, string>]
    : never;

export type I18nKeys = DotNestedKeys<typeof pt> | DotNestedKeys<typeof en>;

type I18nOptions = { lang?: string } & Partial<Record<AllPlaceholders, string | number>>;

const initOptions: InitOptions = {
  resources,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  initImmediate: false,
};

i18next.init(initOptions);

function normalizeLang(lang?: string): keyof typeof resources {
  if (!lang) return "en";
  const lower = lang.toLowerCase();

  if (lower.startsWith("pt")) return "pt";
  if (lower.startsWith("en")) return "en";

  return "en";
}

export function t<K extends I18nKeys>(
  key: K,
  options?: I18nOptions
): string {
  const lang = normalizeLang(options?.lang);

  return i18next.t(key as string, { ...options, lng: lang });
}

export default i18next;
