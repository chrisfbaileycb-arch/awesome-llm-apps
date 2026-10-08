"use client";

// Client-side Master Password authentication utility
const STORAGE_HASH_KEY = "awesome_llm_apps_master_hash";
const STORAGE_SALT_KEY = "awesome_llm_apps_master_salt";
const SESSION_UNLOCKED_KEY = "awesome_llm_apps_session_unlocked";
const DEFAULT_ACCOUNT_EMAIL = "chrisfbailey.CB@gmail.com";

export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function isMasterPasswordConfigured(): boolean {
  if (typeof window === "undefined") return true;
  return Boolean(localStorage.getItem(STORAGE_HASH_KEY));
}

export async function setupMasterPassword(password: string): Promise<boolean> {
  if (!password || password.length < 4) return false;
  const salt = Math.random().toString(36).substring(2, 15);
  const hash = await hashPassword(password, salt);
  localStorage.setItem(STORAGE_HASH_KEY, hash);
  localStorage.setItem(STORAGE_SALT_KEY, salt);
  sessionStorage.setItem(SESSION_UNLOCKED_KEY, "true");
  return true;
}

export async function verifyMasterPassword(password: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const storedHash = localStorage.getItem(STORAGE_HASH_KEY);
  const storedSalt = localStorage.getItem(STORAGE_SALT_KEY);

  if (!storedHash || !storedSalt) {
    // If not set up yet, verify against default or trigger setup
    return false;
  }

  const computedHash = await hashPassword(password, storedSalt);
  const isValid = computedHash === storedHash;
  if (isValid) {
    sessionStorage.setItem(SESSION_UNLOCKED_KEY, "true");
  }
  return isValid;
}

export function isSessionUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_UNLOCKED_KEY) === "true";
}

export function lockSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_UNLOCKED_KEY);
}

export function getAccountEmail(): string {
  return DEFAULT_ACCOUNT_EMAIL;
}
