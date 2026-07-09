/**
 * Irony Guard — Rate Limiting Engine
 * Token bucket algorithm for both client-side and API route protection.
 */

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, TokenBucket>();

const CONFIG = {
  maxTokens: 10,
  refillRate: 1,
  refillIntervalMs: 1000,
  burstMax: 20,
};

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
}

function getClientIp(): string {
  if (typeof window !== "undefined") {
    return "client";
  }
  return "server";
}

export function checkRateLimit(key?: string): RateLimitResult {
  const id = key ?? getClientIp();
  const now = Date.now();

  let bucket = buckets.get(id);
  if (!bucket) {
    bucket = { tokens: CONFIG.maxTokens, lastRefill: now };
    buckets.set(id, bucket);
  }

  const elapsed = now - bucket.lastRefill;
  const refillTokens = Math.floor(elapsed / CONFIG.refillIntervalMs) * CONFIG.refillRate;

  if (refillTokens > 0) {
    bucket.tokens = Math.min(bucket.tokens + refillTokens, CONFIG.maxTokens);
    bucket.lastRefill = now;
  }

  const allowed = bucket.tokens > 0;

  if (allowed) {
    bucket.tokens -= 1;
  }

  const remaining = Math.max(0, bucket.tokens);
  const resetMs = CONFIG.refillIntervalMs - (now - bucket.lastRefill);

  return { allowed, remaining, resetMs: Math.max(0, resetMs) };
}

export function createRateLimitMiddleware(maxPerMinute = 60) {
  const requestCounts = new Map<string, { count: number; resetAt: number }>();

  return function middleware(key?: string): RateLimitResult {
    const id = key ?? getClientIp();
    const now = Date.now();

    let entry = requestCounts.get(id);
    if (!entry || now > entry.resetAt) {
      entry = { count: 0, resetAt: now + 60000 };
      requestCounts.set(id, entry);
    }

    entry.count += 1;
    const allowed = entry.count <= maxPerMinute;
    const remaining = Math.max(0, maxPerMinute - entry.count);
    const resetMs = entry.resetAt - now;

    return { allowed, remaining, resetMs };
  };
}

// Periodic cleanup to prevent memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now - bucket.lastRefill > 60000) {
        buckets.delete(key);
      }
    }
  }, 120000);
}
