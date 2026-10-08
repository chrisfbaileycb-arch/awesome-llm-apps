"use client";

import React, { useState, useEffect } from "react";
import {
  KeyRound,
  ShieldCheck,
  X,
  Check,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
  Zap,
  Save,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Activity,
  Radio,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  SUPPORTED_PROVIDERS,
  SupportedProvider,
  loadStoredKeys,
  saveStoredKeys,
  KeyVaultData
} from "@/lib/api-keys-store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface TestResult {
  success: boolean;
  message: string;
  latencyMs?: number;
}

export default function ApiKeysVaultModal({ isOpen, onClose }: Props) {
  const [keys, setKeys] = useState<KeyVaultData>({});
  const [showKeyMap, setShowKeyMap] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [testingMap, setTestingMap] = useState<Partial<Record<SupportedProvider, boolean>>>({});
  const [testResultMap, setTestResultMap] = useState<Partial<Record<SupportedProvider, TestResult>>>({});
  const [isTestingAll, setIsTestingAll] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setKeys(loadStoredKeys());
      setHasChanges(false);
      setTestResultMap({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (providerId: SupportedProvider, value: string) => {
    setKeys((prev) => ({
      ...prev,
      [providerId]: value
    }));
    setHasChanges(true);
    // Clear test result when key is edited
    if (testResultMap[providerId]) {
      setTestResultMap((prev) => {
        const next = { ...prev };
        delete next[providerId];
        return next;
      });
    }
  };

  const handleSave = () => {
    saveStoredKeys(keys);
    setHasChanges(false);
    toast.success("API keys saved securely to your local vault!");
  };

  const handleClear = (providerId: SupportedProvider) => {
    const updated = { ...keys };
    delete updated[providerId];
    setKeys(updated);
    saveStoredKeys(updated);
    setTestResultMap((prev) => {
      const next = { ...prev };
      delete next[providerId];
      return next;
    });
    toast.info(`Cleared API key for ${providerId}`);
  };

  const toggleShow = (providerId: string) => {
    setShowKeyMap((prev) => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };

  const testProvider = async (providerId: SupportedProvider, apiKey: string): Promise<TestResult> => {
    try {
      const res = await fetch("/api/vault/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerId, apiKey })
      });
      const data = await res.json();
      return {
        success: data.success,
        message: data.message || (data.success ? "Connection verified" : "Verification failed"),
        latencyMs: data.latencyMs
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Network error while verifying connection"
      };
    }
  };

  const handleTestConnection = async (providerId: SupportedProvider) => {
    const val = keys[providerId];
    if (!val || val.trim().length === 0) {
      toast.error("Please enter an API key to test");
      return;
    }

    setTestingMap((prev) => ({ ...prev, [providerId]: true }));
    try {
      const result = await testProvider(providerId, val.trim());
      setTestResultMap((prev) => ({ ...prev, [providerId]: result }));

      if (result.success) {
        toast.success(`${providerId.toUpperCase()}: ${result.message} (${result.latencyMs}ms)`);
      } else {
        toast.error(`${providerId.toUpperCase()}: ${result.message}`);
      }
    } finally {
      setTestingMap((prev) => ({ ...prev, [providerId]: false }));
    }
  };

  const handleTestAll = async () => {
    const entriesToTest = SUPPORTED_PROVIDERS.filter((p) => {
      const val = keys[p.id];
      return val && val.trim().length > 3;
    });

    if (entriesToTest.length === 0) {
      toast.info("No API keys entered yet to test");
      return;
    }

    setIsTestingAll(true);
    toast.info(`Testing ${entriesToTest.length} API keys...`);

    const promises = entriesToTest.map(async (provider) => {
      setTestingMap((prev) => ({ ...prev, [provider.id]: true }));
      try {
        const result = await testProvider(provider.id, keys[provider.id]!.trim());
        setTestResultMap((prev) => ({ ...prev, [provider.id]: result }));
      } finally {
        setTestingMap((prev) => ({ ...prev, [provider.id]: false }));
      }
    });

    await Promise.all(promises);
    setIsTestingAll(false);
    toast.success("Finished testing all configured API keys!");
  };

  // Dashboard calculations
  const configuredCount = SUPPORTED_PROVIDERS.filter((p) => {
    const val = keys[p.id];
    return val && val.trim().length > 5;
  }).length;

  const verifiedCount = SUPPORTED_PROVIDERS.filter(
    (p) => testResultMap[p.id]?.success
  ).length;

  const failedCount = SUPPORTED_PROVIDERS.filter(
    (p) => testResultMap[p.id] && !testResultMap[p.id]?.success
  ).length;

  const pendingTestCount = configuredCount - (verifiedCount + failedCount);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-card border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b flex items-start justify-between bg-muted/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">BYOK Front-End API Key Vault</h2>
              <Badge variant="outline" className="text-xs font-mono">
                {configuredCount} / {SUPPORTED_PROVIDERS.length} Configured
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter your own keys. Inference is billed directly to your accounts with zero backend owner cost.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-Time Connectivity Status Dashboard */}
        <div className="p-4 bg-muted/30 border-b space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold tracking-wide text-foreground uppercase">
                Real-Time Connectivity Status Dashboard
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleTestAll}
              disabled={isTestingAll || configuredCount === 0}
              className="h-7 text-[11px] font-semibold border-primary/30 hover:border-primary text-foreground"
            >
              {isTestingAll ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Testing Connectivity...
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3 mr-1 text-primary" /> Test All ({configuredCount})
                </>
              )}
            </Button>
          </div>

          {/* Metrics summary cards */}
          <div className="grid grid-cols-4 gap-2">
            {/* Verified online */}
            <div className="p-2.5 rounded-xl border bg-emerald-500/10 border-emerald-500/20 text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-base font-extrabold">{verifiedCount}</span>
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium block mt-0.5">
                Online &amp; Valid
              </span>
            </div>

            {/* Failed offline */}
            <div className="p-2.5 rounded-xl border bg-rose-500/10 border-rose-500/20 text-center">
              <div className="flex items-center justify-center gap-1.5 text-rose-600 dark:text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-base font-extrabold">{failedCount}</span>
              </div>
              <span className="text-[10px] text-rose-700 dark:text-rose-300 font-medium block mt-0.5">
                Failed / Invalid
              </span>
            </div>

            {/* Pending test */}
            <div className="p-2.5 rounded-xl border bg-amber-500/10 border-amber-500/20 text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="text-base font-extrabold">{pendingTestCount > 0 ? pendingTestCount : 0}</span>
              </div>
              <span className="text-[10px] text-amber-700 dark:text-amber-300 font-medium block mt-0.5">
                Untested
              </span>
            </div>

            {/* Not configured */}
            <div className="p-2.5 rounded-xl border bg-muted/40 border-border text-center">
              <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                <span className="text-base font-extrabold">{SUPPORTED_PROVIDERS.length - configuredCount}</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium block mt-0.5">
                Not Set
              </span>
            </div>
          </div>
        </div>

        {/* Protection Guarantee Note */}
        <div className="px-5 py-2 bg-emerald-500/5 border-b border-emerald-500/15 text-[11px] flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>
            <strong>Zero Backend Billing Guarantee:</strong> Keys remain encrypted solely in your browser&apos;s localStorage.
          </span>
        </div>

        {/* Key Inputs List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {SUPPORTED_PROVIDERS.map((provider) => {
            const val = keys[provider.id] || "";
            const isSet = Boolean(val && val.trim().length > 5);
            const isVisible = showKeyMap[provider.id] || false;
            const isTesting = testingMap[provider.id] || false;
            const testResult = testResultMap[provider.id];

            return (
              <div
                key={provider.id}
                className={`p-3.5 rounded-xl border bg-card/60 transition-all space-y-2.5 ${
                  testResult?.success
                    ? "border-emerald-500/40 bg-emerald-500/5 shadow-xs"
                    : testResult && !testResult.success
                    ? "border-rose-500/40 bg-rose-500/5 shadow-xs"
                    : "hover:border-primary/40"
                }`}
              >
                {/* Header row with provider name and small green/red indicator */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    {/* Small Real-Time Connectivity Indicator (Green/Red/Amber/Gray) */}
                    <div className="flex items-center" title={
                      testResult?.success
                        ? `Online (${testResult.latencyMs}ms)`
                        : testResult && !testResult.success
                        ? `Connection Failed: ${testResult.message}`
                        : isSet
                        ? "Configured (Click Test to verify)"
                        : "Not Configured"
                    }>
                      {testResult ? (
                        testResult.success ? (
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                          </span>
                        ) : (
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                          </span>
                        )
                      ) : isSet ? (
                        <span className="inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                      ) : (
                        <span className="inline-flex rounded-full h-2.5 w-2.5 bg-muted-foreground/30" />
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-foreground text-xs">{provider.name}</span>
                      <span className="text-muted-foreground text-[11px] hidden sm:inline">({provider.tagline})</span>
                    </div>
                  </div>

                  {/* Status badges and docs link */}
                  <div className="flex items-center gap-2">
                    {/* Real-time status text badge */}
                    {testResult ? (
                      testResult.success ? (
                        <Badge variant="default" className="text-[10px] bg-emerald-600 dark:bg-emerald-500 flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Online {testResult.latencyMs ? `(${testResult.latencyMs}ms)` : ""}</span>
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-[10px] flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>Offline</span>
                        </Badge>
                      )
                    ) : isSet ? (
                      <Badge variant="secondary" className="text-[10px] text-amber-700 dark:text-amber-300 bg-amber-500/10">
                        Untested
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] text-muted-foreground">
                        Not Set
                      </Badge>
                    )}

                    <a
                      href={provider.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary hover:underline flex items-center gap-0.5 ml-1"
                    >
                      Console <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Input row */}
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      type={isVisible ? "text" : "password"}
                      value={val}
                      onChange={(e) => handleChange(provider.id, e.target.value)}
                      placeholder={provider.placeholder}
                      className="pr-10 h-10 font-mono text-xs rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShow(provider.id)}
                      className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                      title={isVisible ? "Hide key" : "Show key"}
                    >
                      {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Test Connection Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestConnection(provider.id)}
                    disabled={isTesting || !val || val.trim().length === 0}
                    className="h-10 px-3 text-xs font-semibold shrink-0"
                    title="Test API key validity"
                  >
                    {isTesting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                    ) : (
                      <Zap className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
                    )}
                    <span>{isTesting ? "Testing..." : "Test"}</span>
                  </Button>

                  {isSet && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleClear(provider.id)}
                      className="h-10 px-2.5 text-muted-foreground hover:text-destructive"
                      title="Remove key"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Test Feedback Diagnostic Row */}
                {testResult && (
                  <div
                    className={`text-[11px] p-2 rounded-lg flex items-center gap-1.5 ${
                      testResult.success
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                    }`}
                  >
                    {testResult.success ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    )}
                    <span className="truncate font-mono">{testResult.message}</span>
                  </div>
                )}

                <p className="text-[11px] text-muted-foreground leading-normal">
                  {provider.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-muted/20 flex items-center justify-between">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span>Encrypted local storage only</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-xs">
              Close
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-xs font-bold"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              Save Vault Keys
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
