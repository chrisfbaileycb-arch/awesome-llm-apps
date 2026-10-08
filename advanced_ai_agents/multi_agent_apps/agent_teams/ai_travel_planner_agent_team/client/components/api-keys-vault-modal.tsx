"use client";

import React, { useState, useEffect } from "react";
import {
  KeyRound,
  ShieldCheck,
  X,
  Check,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
  Sparkles,
  Zap,
  HelpCircle,
  Save,
  Lock
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

export default function ApiKeysVaultModal({ isOpen, onClose }: Props) {
  const [keys, setKeys] = useState<KeyVaultData>({});
  const [showKeyMap, setShowKeyMap] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setKeys(loadStoredKeys());
      setHasChanges(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (providerId: SupportedProvider, value: string) => {
    setKeys((prev) => ({
      ...prev,
      [providerId]: value
    }));
    setHasChanges(true);
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
    toast.info(`Cleared API key for ${providerId}`);
  };

  const toggleShow = (providerId: string) => {
    setShowKeyMap((prev) => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };

  const configuredCount = SUPPORTED_PROVIDERS.filter((p) => {
    const val = keys[p.id];
    return val && val.trim().length > 5;
  }).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-card border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b flex items-start justify-between bg-muted/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">BYOK Front-End API Key Vault</h2>
              <Badge variant="outline" className="text-xs font-mono">
                {configuredCount} / {SUPPORTED_PROVIDERS.length} Connected
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter your own keys on the front end. All inference is billed directly to your provider accounts with zero backend cost to the owner.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Protection Banner */}
        <div className="px-6 py-3 bg-emerald-500/10 border-b border-emerald-500/20 text-xs flex items-center gap-2.5 text-emerald-700 dark:text-emerald-300">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>
            <strong>Zero Backend Billing Guarantee:</strong> Keys remain encrypted solely in your browser&apos;s localStorage.
          </span>
        </div>

        {/* Key Inputs List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {SUPPORTED_PROVIDERS.map((provider) => {
            const val = keys[provider.id] || "";
            const isSet = Boolean(val && val.trim().length > 5);
            const isVisible = showKeyMap[provider.id] || false;

            return (
              <div
                key={provider.id}
                className="p-4 rounded-xl border bg-card/60 hover:border-primary/40 transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{provider.name}</span>
                    <span className="text-muted-foreground text-[11px]">({provider.tagline})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSet ? (
                      <Badge variant="default" className="text-[10px] bg-emerald-600 dark:bg-emerald-500">
                        <Check className="w-3 h-3 mr-1" /> Ready
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
                      className="text-[11px] text-primary hover:underline flex items-center gap-0.5"
                    >
                      Get Key <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

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

                  {isSet && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleClear(provider.id)}
                      className="h-10 px-3 text-muted-foreground hover:text-destructive"
                      title="Remove key"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

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
