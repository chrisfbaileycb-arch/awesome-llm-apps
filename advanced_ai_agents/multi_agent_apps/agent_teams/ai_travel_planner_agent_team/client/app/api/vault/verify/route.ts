import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const { provider, apiKey } = await req.json();

    if (!provider || typeof provider !== "string") {
      return NextResponse.json(
        { success: false, message: "Missing provider parameter" },
        { status: 400 }
      );
    }

    if (!apiKey || typeof apiKey !== "string" || apiKey.trim().length < 4) {
      return NextResponse.json(
        { success: false, message: "API key is empty or too short" },
        { status: 400 }
      );
    }

    const key = apiKey.trim();

    // Provider-specific verification
    switch (provider) {
      case "openai": {
        if (!key.startsWith("sk-")) {
          return NextResponse.json({
            success: false,
            message: "Invalid OpenAI key format (must start with 'sk-')",
            latencyMs: Date.now() - startTime
          });
        }

        const res = await fetch("https://api.openai.com/v1/models", {
          method: "GET",
          headers: { Authorization: `Bearer ${key}` },
          signal: AbortSignal.timeout(6000)
        });

        const latencyMs = Date.now() - startTime;
        if (res.ok) {
          return NextResponse.json({
            success: true,
            message: "OpenAI connection verified successfully",
            latencyMs
          });
        }
        if (res.status === 401) {
          return NextResponse.json({
            success: false,
            message: "Unauthorized: Invalid OpenAI API key",
            latencyMs
          });
        }
        if (res.status === 429) {
          return NextResponse.json({
            success: true,
            message: "Key is valid (Rate limit / quota exceeded)",
            latencyMs
          });
        }
        return NextResponse.json({
          success: false,
          message: `OpenAI returned status ${res.status}`,
          latencyMs
        });
      }

      case "anthropic": {
        if (!key.startsWith("sk-ant-")) {
          return NextResponse.json({
            success: false,
            message: "Invalid Anthropic key format (must start with 'sk-ant-')",
            latencyMs: Date.now() - startTime
          });
        }

        const res = await fetch("https://api.anthropic.com/v1/models", {
          method: "GET",
          headers: {
            "x-api-key": key,
            "anthropic-version": "2023-06-01"
          },
          signal: AbortSignal.timeout(6000)
        });

        const latencyMs = Date.now() - startTime;
        if (res.ok) {
          return NextResponse.json({
            success: true,
            message: "Anthropic Claude connection verified successfully",
            latencyMs
          });
        }
        if (res.status === 401) {
          return NextResponse.json({
            success: false,
            message: "Unauthorized: Invalid Anthropic API key",
            latencyMs
          });
        }
        return NextResponse.json({
          success: false,
          message: `Anthropic returned status ${res.status}`,
          latencyMs
        });
      }

      case "google": {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${key}&pageSize=1`,
          {
            method: "GET",
            signal: AbortSignal.timeout(6000)
          }
        );

        const latencyMs = Date.now() - startTime;
        if (res.ok) {
          return NextResponse.json({
            success: true,
            message: "Google Gemini connection verified successfully",
            latencyMs
          });
        }
        if (res.status === 400 || res.status === 403) {
          return NextResponse.json({
            success: false,
            message: "Invalid Google API key or Generative Language API is disabled",
            latencyMs
          });
        }
        return NextResponse.json({
          success: false,
          message: `Google returned status ${res.status}`,
          latencyMs
        });
      }

      case "huggingface": {
        if (!key.startsWith("hf_")) {
          return NextResponse.json({
            success: false,
            message: "Invalid Hugging Face token format (must start with 'hf_')",
            latencyMs: Date.now() - startTime
          });
        }

        const res = await fetch("https://huggingface.co/api/whoami", {
          method: "GET",
          headers: { Authorization: `Bearer ${key}` },
          signal: AbortSignal.timeout(6000)
        });

        const latencyMs = Date.now() - startTime;
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          const username = data?.name ? ` as ${data.name}` : "";
          return NextResponse.json({
            success: true,
            message: `Hugging Face token verified${username}`,
            latencyMs
          });
        }
        if (res.status === 401) {
          return NextResponse.json({
            success: false,
            message: "Unauthorized: Invalid Hugging Face user token",
            latencyMs
          });
        }
        return NextResponse.json({
          success: false,
          message: `Hugging Face returned status ${res.status}`,
          latencyMs
        });
      }

      case "groq": {
        if (!key.startsWith("gsk_")) {
          return NextResponse.json({
            success: false,
            message: "Invalid Groq key format (must start with 'gsk_')",
            latencyMs: Date.now() - startTime
          });
        }

        const res = await fetch("https://api.groq.com/openai/v1/models", {
          method: "GET",
          headers: { Authorization: `Bearer ${key}` },
          signal: AbortSignal.timeout(6000)
        });

        const latencyMs = Date.now() - startTime;
        if (res.ok) {
          return NextResponse.json({
            success: true,
            message: "Groq Cloud LPU connection verified successfully",
            latencyMs
          });
        }
        if (res.status === 401) {
          return NextResponse.json({
            success: false,
            message: "Unauthorized: Invalid Groq API key",
            latencyMs
          });
        }
        return NextResponse.json({
          success: false,
          message: `Groq returned status ${res.status}`,
          latencyMs
        });
      }

      case "nvidia": {
        if (!key.startsWith("nvapi-")) {
          return NextResponse.json({
            success: false,
            message: "Invalid NVIDIA key format (must start with 'nvapi-')",
            latencyMs: Date.now() - startTime
          });
        }

        const res = await fetch("https://integrate.api.nvidia.com/v1/models", {
          method: "GET",
          headers: { Authorization: `Bearer ${key}` },
          signal: AbortSignal.timeout(6000)
        });

        const latencyMs = Date.now() - startTime;
        if (res.ok) {
          return NextResponse.json({
            success: true,
            message: "NVIDIA NIM microservice verified successfully",
            latencyMs
          });
        }
        if (res.status === 401) {
          return NextResponse.json({
            success: false,
            message: "Unauthorized: Invalid NVIDIA API key",
            latencyMs
          });
        }
        return NextResponse.json({
          success: false,
          message: `NVIDIA returned status ${res.status}`,
          latencyMs
        });
      }

      case "xai_grok": {
        if (!key.startsWith("xai-")) {
          return NextResponse.json({
            success: false,
            message: "Invalid xAI Grok key format (must start with 'xai-')",
            latencyMs: Date.now() - startTime
          });
        }

        const res = await fetch("https://api.x.ai/v1/models", {
          method: "GET",
          headers: { Authorization: `Bearer ${key}` },
          signal: AbortSignal.timeout(6000)
        });

        const latencyMs = Date.now() - startTime;
        if (res.ok) {
          return NextResponse.json({
            success: true,
            message: "xAI Grok connection verified successfully",
            latencyMs
          });
        }
        if (res.status === 401) {
          return NextResponse.json({
            success: false,
            message: "Unauthorized: Invalid xAI API key",
            latencyMs
          });
        }
        return NextResponse.json({
          success: false,
          message: `xAI returned status ${res.status}`,
          latencyMs
        });
      }

      case "amazon_bedrock": {
        // Amazon Bedrock uses AWS IAM Access Key ID (AKIA...) or session credentials
        const isValidFormat =
          key.startsWith("AKIA") ||
          key.startsWith("ASIA") ||
          key.length >= 20;

        const latencyMs = Date.now() - startTime;
        if (isValidFormat) {
          return NextResponse.json({
            success: true,
            message: "AWS Bedrock credentials format validated",
            latencyMs
          });
        }
        return NextResponse.json({
          success: false,
          message: "AWS Access Key ID should start with 'AKIA' or 'ASIA' (20 characters)",
          latencyMs
        });
      }

      default:
        return NextResponse.json(
          { success: false, message: `Unsupported provider: ${provider}` },
          { status: 400 }
        );
    }
  } catch (error: any) {
    const latencyMs = Date.now() - startTime;
    return NextResponse.json({
      success: false,
      message: error?.message || "Connection timed out or network error",
      latencyMs
    });
  }
}
