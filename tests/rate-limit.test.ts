import test from "node:test";
import assert from "node:assert/strict";
import { __resetRateLimitStore, takeRateLimit } from "../src/lib/rate-limit.ts";

test.beforeEach(() => {
  __resetRateLimitStore();
});

test("takeRateLimit allows requests until limit is reached", () => {
  const first = takeRateLimit("contact:local", 2, 1_000);
  const second = takeRateLimit("contact:local", 2, 1_000);
  const third = takeRateLimit("contact:local", 2, 1_000);

  assert.equal(first.allowed, true);
  assert.equal(first.remaining, 1);
  assert.equal(second.allowed, true);
  assert.equal(second.remaining, 0);
  assert.equal(third.allowed, false);
  assert.equal(third.remaining, 0);
});

test("takeRateLimit keeps independent counters per key", () => {
  takeRateLimit("admin:a", 1, 1_000);
  const another = takeRateLimit("admin:b", 1, 1_000);

  assert.equal(another.allowed, true);
  assert.equal(another.remaining, 0);
});
