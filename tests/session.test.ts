import test from "node:test";
import assert from "node:assert/strict";
import { createToken, readToken } from "../src/lib/session.ts";

test("session tokens can be created and read", () => {
  const payload = {
    userId: 7,
    expiresAt: Date.now() + 60_000,
  };

  const token = createToken(payload);
  const decoded = readToken(token);

  assert.deepEqual(decoded, payload);
});

test("session tokens reject tampering and expiration", () => {
  const validToken = createToken({
    userId: 3,
    expiresAt: Date.now() + 60_000,
  });

  const tampered = `${validToken}broken`;
  const expired = createToken({
    userId: 3,
    expiresAt: Date.now() - 1,
  });

  assert.equal(readToken(tampered), null);
  assert.equal(readToken(expired), null);
});
