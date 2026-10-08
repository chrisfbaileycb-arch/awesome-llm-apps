"use client";

import React, { useState, useMemo } from "react";
import {
  Layers,
  Search,
  ExternalLink,
  Code,
  Terminal,
  Filter,
  CheckCircle2,
  Sparkles,
  Play,
  Copy,
  Check,
  BookOpen,
  FolderGit2,
  Compass,
  Cpu,
  Zap,
  Globe,
  SlidersHorizontal,
  FolderOpen,
  Bot,
  FileText,
  X,
  Share2,
  Settings2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { ALL_CATALOG_ITEMS, CatalogItem, getSystemPrompt } from "@/lib/catalog-data";

type PlatformType = "Universal" | "Google AI Studio" | "Anthropic Claude" | "OpenAI Platform" | "Cursor / Windsurf";
type ViewMode = "dual" | "terminal" | "prompts";

export default function CatalogExplorerPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("dual");
  const [activePlatform, setActivePlatform] = useState<PlatformType>("Universal");
  const [inspectingItem, setInspectingItem] = useState<CatalogItem | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    ALL_CATALOG_ITEMS.forEach((item) => cats.add(item.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    return ALL_CATALOG_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.framework.toLowerCase().includes(q) ||
        item.repoPath.toLowerCase().includes(q) ||
        item.models.some((m) => m.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleCopyCommand = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Terminal command copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyPrompt = (item: CatalogItem, platform?: PlatformType) => {
    const promptText = getSystemPrompt(item, platform || activePlatform);
    navigator.clipboard.writeText(promptText);
    setCopiedPromptId(item.id);
    toast.success(`System prompt for ${platform || activePlatform} copied!`);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return ALL_CATALOG_ITEMS.length;
    return ALL_CATALOG_ITEMS.filter((i) => i.category === cat).length;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link href="/" className="hover:underline">Awesome LLM Apps</Link>
              <span>/</span>
              <span className="text-foreground font-medium">All 100+ Catalog & System Prompts</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Layers className="w-8 h-8 text-primary" />
              100+ Awesome LLM Apps & System Prompts
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Run locally via CLI or use immediately as production-grade System Prompts in Google AI Studio, Claude Console, OpenAI Custom GPT, and Cursor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs px-3 py-1 font-mono">
              {ALL_CATALOG_ITEMS.length} Total Apps & Prompts
            </Badge>
          </div>
        </div>

        {/* View Mode & Platform Toolbar */}
        <div className="p-4 bg-card border rounded-xl shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground mr-1">Display Mode:</span>
              <div className="inline-flex rounded-lg border bg-muted/30 p-1">
                <button
                  onClick={() => setViewMode("dual")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    viewMode === "dual"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ✨ Dual (CLI + Prompts)
                </button>
                <button
                  onClick={() => setViewMode("prompts")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    viewMode === "prompts"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  LLM System Prompts
                </button>
                <button
                  onClick={() => setViewMode("terminal")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    viewMode === "terminal"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Terminal CLI
                </button>
              </div>
            </div>

            {/* Target Platform Format Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground mr-1">Format For:</span>
              {(["Universal", "Google AI Studio", "Anthropic Claude", "OpenAI Platform", "Cursor / Windsurf"] as PlatformType[]).map((plat) => (
                <button
                  key={plat}
                  onClick={() => setActivePlatform(plat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
                    activePlatform === plat
                      ? "bg-primary/10 border-primary text-primary font-semibold"
                      : "bg-muted/40 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar and counter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by agent name, capability, or model..."
                className="pl-9 h-10 text-sm"
              />
            </div>

            <div className="text-xs text-muted-foreground font-medium self-start sm:self-auto">
              Showing <span className="font-bold text-foreground">{filtered.length}</span> of {ALL_CATALOG_ITEMS.length} templates
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  selectedCategory === c
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>{c}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === c ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {getCategoryCount(c)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const promptContent = getSystemPrompt(item, activePlatform);
            const tokenEstimate = Math.round(promptContent.length / 4);

            return (
              <Card key={item.id} className="border flex flex-col justify-between hover:border-primary/40 hover:shadow-xs transition-all bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span className="font-semibold text-primary">{item.category}</span>
                    {item.starsOrTag ? (
                      <Badge variant="default" className="text-[10px] py-0 bg-primary">
                        {item.starsOrTag}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] py-0 font-normal">
                        {item.framework}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base font-bold leading-snug">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3.5 pt-0">
                  {/* Models tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.models.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 bg-muted rounded text-[10px] text-muted-foreground font-mono">
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* System Prompt Section (Visible in prompts and dual modes) */}
                  {(viewMode === "prompts" || viewMode === "dual") && (
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-primary flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5" />
                          LLM System Prompt
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          ~{tokenEstimate} tokens
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-muted-foreground line-clamp-3 bg-background/80 p-2 rounded border">
                        {promptContent}
                      </p>
                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs h-8 bg-background hover:bg-muted"
                          onClick={() => handleCopyPrompt(item)}
                        >
                          {copiedPromptId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy Prompt
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs h-8 px-2.5"
                          onClick={() => setInspectingItem(item)}
                          title="Inspect and edit full prompt"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Terminal CLI Command Section (Visible in terminal and dual modes) */}
                  {(viewMode === "terminal" || viewMode === "dual") && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] text-muted-foreground flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Terminal className="w-3 h-3" /> CLI Run Command
                        </span>
                        <span className="font-mono text-[10px] truncate max-w-[150px]">{item.repoPath}</span>
                      </div>
                      <div className="p-2 bg-muted/40 rounded-lg border font-mono text-[11px] flex items-center justify-between gap-2">
                        <span className="truncate text-muted-foreground">{item.runCommand}</span>
                        <button
                          onClick={() => handleCopyCommand(item.id, item.runCommand)}
                          className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground shrink-0 transition-colors"
                          title="Copy terminal command"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Footer Action */}
                  <div className="pt-2 border-t flex gap-2">
                    <Link href={item.liveRoute || `/apps/run/${item.id}`} className="flex-1">
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-xs font-semibold h-8">
                        <Play className="w-3 h-3 mr-1.5" /> Launch App
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 px-2.5"
                      onClick={() => setInspectingItem(item)}
                      title="Inspect System Prompt & Architecture"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 border rounded-xl text-center space-y-3 bg-muted/20">
            <Search className="w-10 h-10 text-muted-foreground/40 mx-auto" />
            <h3 className="font-semibold text-base">No matching templates found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Try adjusting your search terms or select "All" categories to view all {ALL_CATALOG_ITEMS.length} templates.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
              Reset Filters
            </Button>
          </div>
        )}

        {/* Modal: Full System Prompt Inspector */}
        {inspectingItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-card border rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Header */}
              <div className="p-6 border-b flex items-start justify-between bg-muted/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-foreground">{inspectingItem.name}</span>
                    <Badge variant="outline" className="text-xs">{inspectingItem.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    System Instruction specification ready for LLM builder platforms.
                  </p>
                </div>
                <button
                  onClick={() => setInspectingItem(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Format selection toolbar inside modal */}
              <div className="px-6 py-3 border-b bg-muted/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-muted-foreground">Platform Format:</span>
                  {(["Universal", "Google AI Studio", "Anthropic Claude", "OpenAI Platform", "Cursor / Windsurf"] as PlatformType[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setActivePlatform(p)}
                      className={`px-2 py-1 rounded text-xs transition-colors ${
                        activePlatform === p
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "bg-background text-muted-foreground border hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">
                  ~{Math.round(getSystemPrompt(inspectingItem, activePlatform).length / 4)} tokens
                </span>
              </div>

              {/* Modal Body: Prompt Display */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">System Prompt Instructions</span>
                    <span>Paste into: {
                      activePlatform === "Google AI Studio"
                        ? "System Instructions field"
                        : activePlatform === "Anthropic Claude"
                        ? "System Prompt in Console / Projects"
                        : activePlatform === "OpenAI Platform"
                        ? "Instructions in Custom GPT / Assistants API"
                        : activePlatform === "Cursor / Windsurf"
                        ? ".cursorrules in project root"
                        : "System Message / Developer Message"
                    }</span>
                  </div>
                  <pre className="p-4 bg-muted/30 border rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap text-foreground max-h-[380px] overflow-y-auto select-all">
                    {getSystemPrompt(inspectingItem, activePlatform)}
                  </pre>
                </div>

                {/* Additional Platform Advice */}
                <div className="p-3 bg-muted/20 border rounded-lg text-xs space-y-1">
                  <span className="font-semibold text-foreground block">Recommended Settings:</span>
                  <div className="grid grid-cols-2 gap-2 text-muted-foreground text-[11px]">
                    <div>
                      <strong>Recommended Model:</strong> {inspectingItem.models[0] || "Gemini 2.5 Flash / Claude 3.7"}
                    </div>
                    <div>
                      <strong>Suggested Temperature:</strong> {inspectingItem.suggestedTemperature || 0.4}
                    </div>
                    <div>
                      <strong>Directory in Repo:</strong> {inspectingItem.repoPath}
                    </div>
                    <div>
                      <strong>Framework:</strong> {inspectingItem.framework}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 border-t bg-muted/20 flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => setInspectingItem(null)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyCommand(inspectingItem.id, inspectingItem.runCommand)}
                  >
                    <Terminal className="w-3.5 h-3.5 mr-1.5" /> Copy CLI Command
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleCopyPrompt(inspectingItem)}
                  >
                    <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy System Prompt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
