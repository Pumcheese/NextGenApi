import test from "node:test";
import assert from "node:assert/strict";
import { ensureSameOrigin, getClientIp, getLangFromPathname, getSafeAdminReturnPath } from "../src/lib/http.ts";

function makeInput(pathname: string, init?: { origin?: string; forwardedHost?: string; forwardedProto?: string; host?: string; realIp?: string; forwardedFor?: string }) {
  const url = new URL(`https://example.com${pathname}`);
  const headers = new Headers();

  if (init?.origin) headers.set("origin", init.origin);
  if (init?.forwardedHost) headers.set("x-forwarded-host", init.forwardedHost);
  if (init?.forwardedProto) headers.set("x-forwarded-proto", init.forwardedProto);
  if (init?.host) headers.set("host", init.host);
  if (init?.realIp) headers.set("x-real-ip", init.realIp);
  if (init?.forwardedFor) headers.set("x-forwarded-for", init.forwardedFor);

  return {
    url,
    request: new Request(url, { headers }),
  };
}

test("ensureSameOrigin accepts matching public origin and missing origin", () => {
  assert.equal(ensureSameOrigin(makeInput("/api/admin/login")), true);
  assert.equal(
    ensureSameOrigin(
      makeInput("/api/admin/login", {
        origin: "https://next-gen-api.vercel.app",
        forwardedHost: "next-gen-api.vercel.app",
        forwardedProto: "https",
      }),
    ),
    true,
  );
});

test("ensureSameOrigin rejects foreign origins", () => {
  assert.equal(
    ensureSameOrigin(
      makeInput("/api/admin/login", {
        origin: "https://evil.example",
        host: "next-gen-api.vercel.app",
      }),
    ),
    false,
  );
});

test("getClientIp prefers forwarded headers", () => {
  assert.equal(getClientIp(makeInput("/", { forwardedFor: "1.1.1.1, 2.2.2.2" })), "1.1.1.1");
  assert.equal(getClientIp(makeInput("/", { realIp: "3.3.3.3" })), "3.3.3.3");
  assert.equal(getClientIp(makeInput("/")), "local");
});

test("getSafeAdminReturnPath only accepts admin-local paths", () => {
  assert.equal(getSafeAdminReturnPath("/es/admin?status=PENDING", "es"), "/es/admin?status=PENDING");
  assert.equal(getSafeAdminReturnPath("https://evil.example", "es"), "/es/admin");
  assert.equal(getSafeAdminReturnPath("/es/contact", "es"), "/es/admin");
});

test("getLangFromPathname resolves language from route", () => {
  assert.equal(getLangFromPathname("/en/admin/login"), "en");
  assert.equal(getLangFromPathname("/whatever"), "es");
});
