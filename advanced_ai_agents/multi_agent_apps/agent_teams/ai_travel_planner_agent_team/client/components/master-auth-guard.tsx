"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  Shield,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import {
  isMasterPasswordConfigured,
  isSessionUnlocked,
  setupMasterPassword,
  verifyMasterPassword,
  getAccountEmail
} from "@/lib/master-auth";

export default function MasterAuthGuard({ children }: { children: React.ReactNode }) {
  const [isConfigured, setIsConfigured] = useState<boolean>(true);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Form states
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const configured = isMasterPasswordConfigured();
    const unlocked = isSessionUnlocked();
    setIsConfigured(configured);
    setIsUnlocked(unlocked);
    setIsLoading(false);
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!isConfigured) {
        // First-time setup
        if (password.length < 4) {
          setErrorMessage("Password must be at least 4 characters long");
          setIsSubmitting(false);
          return;
        }
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match");
          setIsSubmitting(false);
          return;
        }
        await setupMasterPassword(password);
        setIsConfigured(true);
        setIsUnlocked(true);
        toast.success("Master password created! Workbench unlocked.");
      } else {
        // Unlock existing
        const isValid = await verifyMasterPassword(password);
        if (isValid) {
          setIsUnlocked(true);
          toast.success("Workbench unlocked successfully");
        } else {
          setErrorMessage("Incorrect password. Please try again.");
          toast.error("Incorrect password");
        }
      }
    } catch (err) {
      setErrorMessage("Authentication failed. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  // Google-Style Master Password Lock Screen
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Google-Style Card */}
        <Card className="border bg-card shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-2 pt-8">
            {/* Google-style Security Shield Emblem */}
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
              <Shield className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground font-mono mb-2">
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>Owner Access Protection</span>
            </div>

            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              {isConfigured ? "Enter your password" : "Set your master password"}
            </CardTitle>

            <CardDescription className="text-xs text-muted-foreground pt-1">
              to continue to <span className="font-semibold text-foreground">Awesome LLM Apps Workbench</span>
            </CardDescription>

            {/* Account pill */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/30 text-xs font-medium text-foreground mx-auto">
              <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                C
              </div>
              <span>{getAccountEmail()}</span>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 pt-4 space-y-6">
            <form onSubmit={handleUnlock} className="space-y-4">
              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isConfigured ? "Enter password" : "Create master password"}
                    className="pr-10 h-12 text-sm rounded-xl"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm password on first-time setup */}
              {!isConfigured && (
                <div className="space-y-1.5">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm master password"
                    className="h-12 text-sm rounded-xl"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    This password will protect your workbench and prevent unauthorized users from using your models or generating API costs.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Show Password Toggle Checkbox */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground select-none">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="rounded border-border"
                  />
                  <span>Show password</span>
                </label>

                {isConfigured && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Reset master password? This will clear local session locks and let you set a new password.")) {
                        localStorage.removeItem("awesome_llm_apps_master_hash");
                        localStorage.removeItem("awesome_llm_apps_master_salt");
                        setIsConfigured(false);
                        setPassword("");
                        setConfirmPassword("");
                        toast.info("Password cleared. You may now create a new master password.");
                      }
                    }}
                    className="text-primary hover:underline text-xs"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 h-11 rounded-xl font-bold text-xs shadow-sm mt-4"
              >
                {isSubmitting ? (
                  "Verifying..."
                ) : isConfigured ? (
                  <>
                    Unlock Workbench <ArrowRight className="w-4 h-4 ml-1.5" />
                  </>
                ) : (
                  <>
                    Save Password &amp; Enter <ArrowRight className="w-4 h-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>

            {/* Security Guarantee Note */}
            <div className="p-3 bg-muted/40 rounded-xl border text-[11px] text-muted-foreground space-y-1">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary" /> Cost &amp; Access Protection:
              </span>
              <p>
                Only you with this master password can access your 100+ AI agents, travel planner, negotiation arena, and BYOK API key vault.
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-[11px] text-muted-foreground mt-4">
          Awesome LLM Apps Workbench · Secured with Client-Side SHA-256 Auth
        </p>
      </div>
    </div>
  );
}
