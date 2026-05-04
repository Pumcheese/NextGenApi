export const languages = ["es", "en"] as const;

export type Lang = (typeof languages)[number];

export function isLang(value: string | undefined): value is Lang {
  return Boolean(value && languages.includes(value as Lang));
}

export function resolveLang(value: string | undefined): Lang {
  return isLang(value) ? value : "es";
}

export function withLang(lang: Lang, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${path ? normalized : "/"}`;
}
