"use client";

export type SupportedProvider =
  | "openai"
  | "anthropic"
  | "google"
  | "huggingface"
  | "amazon_bedrock"
  | "groq"
  | "nvidia"
  | "xai_grok";

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
    id: "openai",
    name: "OpenAI",
    tagline: "GPT-4o, o1, o3-mini & Agents SDK",
    placeholder: "sk-proj-...",
    docsUrl: "https://platform.openai.com/api-keys",
    prefixPattern: "sk-",
    description: "Powers frontier GPT models, function calling, tool use, and multi-agent coordination."
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    tagline: "Claude 3.5 Sonnet, Claude 3.7 & Haiku",
    placeholder: "sk-ant-api03-...",
    docsUrl: "https://console.anthropic.com/settings/keys",
    prefixPattern: "sk-ant-",
    description: "Industry-leading reasoning, constitutional alignment, and long-context synthesis."
  },
  {
    id: "google",
    name: "Google (Gemini)",
    tagline: "Gemini 2.5 Flash, 2.5 Pro & Gemini 3.8",
    placeholder: "AIzaSy...",
    docsUrl: "https://aistudio.google.com/apikey",
    prefixPattern: "AIza",
    description: "Powers Google Agent Development Kit, multimodal video, grounding, and real-time reasoning."
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    tagline: "Inference API, Hub & Open Foundation Models",
    placeholder: "hf_...",
    docsUrl: "https://huggingface.co/settings/tokens",
    prefixPattern: "hf_",
    description: "Direct access to 100,000+ open-source models, embeddings, and community checkpoints."
  },
  {
    id: "amazon_bedrock",
    name: "Amazon Bedrock",
    tagline: "AWS Bedrock & Enterprise Foundation Models",
    placeholder: "AKIA... or Bedrock API Key",
    docsUrl: "https://aws.amazon.com/bedrock/",
    description: "Managed enterprise cloud access to Claude, Amazon Nova, Llama 3, and Titan."
  },
  {
    id: "groq",
    name: "Groq Cloud LPU",
    tagline: "Ultra low-latency Llama 3.3 70B & Mixtral",
    placeholder: "gsk_...",
    docsUrl: "https://console.groq.com/keys",
    prefixPattern: "gsk_",
    description: "Sub-500ms real-time conversational agents powered by Groq's Language Processing Units."
  },
  {
    id: "nvidia",
    name: "NVIDIA NIM",
    tagline: "NVIDIA NeMo, Llama 3 & TensorRT-LLM",
    placeholder: "nvapi-...",
    docsUrl: "https://build.nvidia.com/",
    prefixPattern: "nvapi-",
    description: "GPU-accelerated microservices and enterprise NIM containers for high-throughput inference."
  },
  {
    id: "xai_grok",
    name: "xAI (Grok)",
    tagline: "Grok 2, Grok 3 & xAI Console API",
    placeholder: "xai-...",
    docsUrl: "https://console.x.ai/",
    prefixPattern: "xai-",
    description: "Unfiltered real-time frontier reasoning engine connected to live web telemetry."
  }
];

const VAULT_STORAGE_KEY = "awesome_llm_apps_byok_vault";

export type KeyVaultData = Partial<Record<SupportedProvider, string>>;

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

export function getProviderForModel(modelName: string = ""): SupportedProvider {
  const m = modelName.toLowerCase();
  if (m.includes("claude") || m.includes("anthropic")) return "anthropic";
  if (m.includes("gemini") || m.includes("google")) return "google";
  if (m.includes("groq") || m.includes("lpu")) return "groq";
  if (m.includes("huggingface") || m.includes("hf_") || m.includes("tgi")) return "huggingface";
  if (m.includes("nvidia") || m.includes("nemotron") || m.includes("nim")) return "nvidia";
  if (m.includes("grok") || m.includes("xai")) return "xai_grok";
  if (m.includes("bedrock") || m.includes("nova") || m.includes("titan") || m.includes("aws")) return "amazon_bedrock";
  return "openai";
}

export function getStoredKey(providerId: SupportedProvider): string | undefined {
  const keys = loadStoredKeys();
  return keys[providerId];
}

export function maskApiKey(key?: string): string {
  if (!key || key.length < 8) return "••••••••";
  return `${key.slice(0, 4)}••••${key.slice(-4)}`;
}

