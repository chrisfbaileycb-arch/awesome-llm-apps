"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Luggage,
  Sparkles,
  Swords,
  Layers,
  Radio,
  Search,
  Activity,
  Brain,
  Menu,
  X,
  Compass,
  ChevronDown,
  KeyRound,
  Lock
} from "lucide-react";
import ApiKeysVaultModal from "@/components/api-keys-vault-modal";
import { lockSession } from "@/lib/master-auth";
import { getKeyCount } from "@/lib/api-keys-store";

const NAV_APPS = [
  { name: "Hub", href: "/", icon: Compass, label: "Overview" },
  { name: "TripCraft", href: "/plan", icon: Luggage, label: "Travel Planner" },
  { name: "Negotiation", href: "/apps/negotiation", icon: Swords, label: "Agent Battle" },
  { name: "Skill Studio", href: "/apps/self-improving-skills", icon: Sparkles, label: "Self-Improving" },
  { name: "News & Podcast", href: "/apps/news-podcast", icon: Radio, label: "Beifong Studio" },
  { name: "Needle", href: "/apps/needle", icon: Search, label: "Semantic Search" },
  { name: "Earnings", href: "/apps/earnings-analyst", icon: Activity, label: "Analyst Cockpit" },
  { name: "ThinkPath", href: "/apps/thinkpath", icon: Brain, label: "Reasoning Chat" },
  { name: "100+ Catalog", href: "/apps/catalog", icon: Layers, label: "All Templates" }
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [keyCounts, setKeyCounts] = useState({ configured: 0, total: 6 });

  React.useEffect(() => {
    setKeyCounts(getKeyCount());
    const handleUpdate = () => setKeyCounts(getKeyCount());
    window.addEventListener("byok-vault-updated", handleUpdate);
    return () => window.removeEventListener("byok-vault-updated", handleUpdate);
  }, []);

  function handleLockApp() {
    lockSession();
    toast.info("Workbench locked. Enter master password to return.");
    window.location.reload();
  }

  async function handleLogout() {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Logout error:", error);
    }
  }

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Main Apps */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-xs">
                AI
              </span>
              <div>
                <span className="font-bold text-base leading-none block text-foreground">
                  Awesome LLM Apps
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  Unified Agent Workbench
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_APPS.map((app) => {
                const isActive = pathname === app.href;
                return (
                  <Link
                    key={app.name}
                    href={app.href}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <app.icon className="w-3.5 h-3.5" />
                    {app.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2">
            {/* Front-End BYOK API Keys Vault Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVaultOpen(true)}
              className="h-8 text-xs font-semibold flex items-center gap-1.5 border-primary/30 hover:border-primary"
            >
              <KeyRound className="w-3.5 h-3.5 text-primary" />
              <span>API Keys</span>
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.2 rounded-full font-mono">
                {keyCounts.configured}/{keyCounts.total}
              </span>
            </Button>

            {/* Lock Workbench Session Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLockApp}
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
              title="Lock workbench with master password"
            >
              <Lock className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">Lock</span>
            </Button>

            <Link
              href="/plans"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded"
            >
              <Luggage className="w-3.5 h-3.5" />
              My Plans
            </Link>

            {isPending ? (
              <div className="text-xs text-muted-foreground">Loading...</div>
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium hidden sm:inline text-foreground">
                  {session.user.name || session.user.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="h-8 text-xs">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth">
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Sign In
                  </Button>
                </Link>
                <Link href="/plan">
                  <Button size="sm" className="h-8 text-xs bg-primary hover:bg-primary/90">
                    Plan Trip
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t py-3 grid grid-cols-2 sm:grid-cols-3 gap-2 pb-4">
            {NAV_APPS.map((app) => {
              const isActive = pathname === app.href;
              return (
                <Link
                  key={app.name}
                  href={app.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 border ${
                    isActive
                      ? "bg-primary/10 border-primary/40 text-primary font-bold"
                      : "bg-muted/30 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <app.icon className="w-4 h-4 text-primary" />
                  <div>
                    <span className="block leading-tight">{app.name}</span>
                    <span className="text-[10px] text-muted-foreground">{app.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Front-End BYOK Key Vault Modal */}
      <ApiKeysVaultModal isOpen={vaultOpen} onClose={() => setVaultOpen(false)} />
    </header>
  );
}
