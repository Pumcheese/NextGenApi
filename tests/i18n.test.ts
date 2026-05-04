import test from "node:test";
import assert from "node:assert/strict";
import { resolveLang, withLang } from "../src/lib/i18n.ts";

test("resolveLang returns spanish as fallback", () => {
  assert.equal(resolveLang(undefined), "es");
  assert.equal(resolveLang("fr" as any), "es");
});

test("withLang builds localized routes", () => {
  assert.equal(withLang("es"), "/es/");
  assert.equal(withLang("en", "/contact"), "/en/contact");
  assert.equal(withLang("es", "services"), "/es/services");
});
