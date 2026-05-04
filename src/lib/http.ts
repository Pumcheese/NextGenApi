import type { APIContext, AstroGlobal } from "astro";
import { resolveLang } from "./i18n";

type RequestCarrier = Pick<APIContext, "request" | "url"> | Pick<AstroGlobal, "request" | "url">;

export function getClientIp(input: RequestCarrier) {
  const forwarded = input.request.headers.get("x-forwarded-for");
  const realIp = input.request.headers.get("x-real-ip");
  const candidate = forwarded?.split(",")[0]?.trim() || realIp?.trim();
  return candidate || "local";
}

export function ensureSameOrigin(input: RequestCarrier) {
  const origin = input.request.headers.get("origin");

  if (!origin) {
    return true;
  }

  return origin === input.url.origin;
}

export function getSafeAdminReturnPath(rawValue: FormDataEntryValue | string | null | undefined, lang: string) {
  const value = typeof rawValue === "string" ? rawValue.trim() : "";

  if (!value.startsWith("/")) {
    return `/${lang}/admin`;
  }

  if (value.startsWith("//") || value.includes("://")) {
    return `/${lang}/admin`;
  }

  if (!value.startsWith(`/${lang}/admin`)) {
    return `/${lang}/admin`;
  }

  return value;
}

export function getLangFromPathname(pathname: string) {
  return resolveLang(pathname.split("/")[1]);
}
