// In-memory rate limiter – resets on server restart, sufficient for a single-admin setup.
// Locks out an IP for 15 minutes after 5 failed login attempts.

interface Attempt {
  count: number;
  lockedUntil: number | null;
}

const attempts = new Map<string, Attempt>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export function recordFailedAttempt(ip: string): { locked: boolean; remaining: number } {
  const now = Date.now();
  const entry = attempts.get(ip) ?? { count: 0, lockedUntil: null };

  // If currently locked, extend nothing — just report locked
  if (entry.lockedUntil && now < entry.lockedUntil) {
    return { locked: true, remaining: 0 };
  }

  // Reset if previous lockout has expired
  if (entry.lockedUntil && now >= entry.lockedUntil) {
    entry.count = 0;
    entry.lockedUntil = null;
  }

  entry.count += 1;

  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_MS;
    attempts.set(ip, entry);
    return { locked: true, remaining: 0 };
  }

  attempts.set(ip, entry);
  return { locked: false, remaining: MAX_ATTEMPTS - entry.count };
}

export function isLocked(ip: string): boolean {
  const entry = attempts.get(ip);
  if (!entry || !entry.lockedUntil) return false;
  if (Date.now() >= entry.lockedUntil) {
    attempts.delete(ip);
    return false;
  }
  return true;
}

export function clearAttempts(ip: string) {
  attempts.delete(ip);
}
