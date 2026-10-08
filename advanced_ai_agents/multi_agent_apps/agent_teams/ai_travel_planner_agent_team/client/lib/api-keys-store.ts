"use client";

import { useState, useEffect } from "react";

export type SupportedProvider =
  | "gemini"
  | "openai_codex"
  | "groq"
  | "mistral"
  | "meta_llama"
  | "microsoft_copilot";

export interface ProviderConfig {
  id: SupportedProvider;
  name: string;
  tagline: string;
  placeholder: string;
  docsUrl: string;
  prefixPattern?: string;
  description: string;
}

export const SUPPORTED_PROVIDERS: ProviderConfig[] = [
  {
    id: "gemini",
    name: "Gemini (Google AI)",
    tagline: "Gemini 2.5 Flash, 2.5 Pro & Gemini 3.8",
    placeholder: "AIzaSy...",
    docsUrl: "https://aistudio.google.com/apikey",
    prefixPattern: "AIza",
    description: "Powers Google Agent Development Kit, multimodal video, and real-time reasoning."
  },
  {
    id: "openai_codex",
    name: "Codex & OpenAI",
    tagline: "GPT-4o, OpenAI Agents SDK & Codex",
    placeholder: "sk-proj-...",
    docsUrl: "https://platform.openai.com/api-keys",
    prefixPattern: "sk-",
    description: "Powers OpenAI Agents SDK swarms, research tools, and code generation."
  },
  {
    id: "groq",
    name: "Groq LPU",
    tagline: "Ultra low-latency Llama 3.3 70B & Mixtral",
    placeholder: "gsk_...",
    docsUrl: "https://console.groq.com/keys",
    prefixPattern: "gsk_",
    description: "Powers sub-500ms real-time conversational agents and financial sentiment tools."
  },
  {
    id: "mistral",
    name: "Mistral AI",
    tagline: "Mistral Large 2, Codestral & Pixtral",
    placeholder: "mistral_api_key...",
    docsUrl: "https://console.mistral.ai/api-keys",
    description: "European frontier models optimized for multilingual reasoning and autonomous code."
  },
  {
    id: "meta_llama",
    name: "Meta AI (Llama)",
    tagline: "Llama 3.3 70B, Llama 3.2 Vision",
    placeholder: "meta_or_together_key...",
    docsUrl: "https://llama.meta.com",
    description: "Open-weights foundation intelligence for local and cloud RAG pipelines."
  },
  {
    id: "microsoft_copilot",
    name: "Microsoft Copilot & Azure",
    tagline: "Azure OpenAI & Microsoft Copilot Studio",
    placeholder: "azure_copilot_key...",
    docsUrl: "https://azure.microsoft.com/products/ai-services/openai-service",
    description: "Enterprise compliance models for meeting analysis and corporate intelligence."
  }
];

const VAULT_STORAGE_KEY = "awesome_llm_apps_byok_vault";

export interface KeyVaultData {
  gemini?: string;
  openai_codex?: string;
  groq?: string;
  mistral?: string;
  meta_llama?: string;
  microsoft_copilot?: string;
}

export function loadStoredKeys(): KeyVaultData {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(VAULT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveStoredKeys(keys: KeyVaultData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(keys));
  window.dispatchEvent(new Event("byok-vault-updated"));
}

export function hasAnyKeyConfigured(): boolean {
  const keys = loadStoredKeys();
  return Object.values(keys).some((k) => Boolean(k && k.trim().length > 5));
}

export function getKeyCount(): { configured: number; total: number } {
  const keys = loadStoredKeys();
  const configured = SUPPORTED_PROVIDERS.filter((p) => {
    const val = keys[p.id];
    return val && val.trim().length > 5;
  }).length;
  return { configured, total: SUPPORTED_PROVIDERS.length };
}
