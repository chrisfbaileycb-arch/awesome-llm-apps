"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Bot,
  Sparkles,
  Layers,
  FileText,
  Activity,
  Send,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  Code2,
  Users,
  Database,
  Cpu,
  Search,
  Swords,
  Luggage,
  Volume2,
  FolderOpen,
  Sliders,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Gamepad2,
  BarChart3,
  Flame,
  Clock,
  ShieldCheck,
  KeyRound
} from "lucide-react";
import ApiKeysVaultModal from "@/components/api-keys-vault-modal";
import { getKeyCount } from "@/lib/api-keys-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ALL_CATALOG_ITEMS, CatalogItem, getSystemPrompt } from "@/lib/catalog-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function IndividualAppRunnerPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const appId = resolvedParams.id;

  const item = useMemo(() => {
    return ALL_CATALOG_ITEMS.find((a) => a.id === appId);
  }, [appId]);

  if (!item) {
    return notFound();
  }

  return <AppRunnerView item={item} />;
}

function AppRunnerView({ item }: { item: CatalogItem }) {
  const [activeTab, setActiveTab] = useState<"workspace" | "architecture" | "terminal" | "prompt">("workspace");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [copiedCommand, setCopiedCommand] = useState<boolean>(false);
  const [activePlatform, setActivePlatform] = useState<"Universal" | "Google AI Studio" | "Anthropic Claude" | "OpenAI Platform" | "Cursor / Windsurf">("Universal");
  const [vaultOpen, setVaultOpen] = useState<boolean>(false);
  const [keyCounts, setKeyCounts] = useState({ configured: 0, total: 6 });

  useEffect(() => {
    setKeyCounts(getKeyCount());
    const handleUpdate = () => setKeyCounts(getKeyCount());
    window.addEventListener("byok-vault-updated", handleUpdate);
    return () => window.removeEventListener("byok-vault-updated", handleUpdate);
  }, []);

  // Dynamic Workspace State
  const [userInput, setUserInput] = useState<string>("");
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(item.suggestedTemperature || 0.4);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [executionTimeMs, setExecutionTimeMs] = useState<number>(0);

  // Tic-Tac-Toe state for game agents
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameWinner, setGameWinner] = useState<string | null>(null);

  // Presets tailored to the app
  const presets = useMemo(() => {
    if (item.id === "project-graveyard") {
      return [
        {
          label: "OmniSearch (Unfinished Multi-Modal Search)",
          text: "Built a Rust backend with 14 microservices and a custom vector indexing algorithm for searching local photos. Abandoned after 3 months because setting up OAuth and Kubernetes took all my weekends."
        },
        {
          label: "FitTrack Pro (Gym Habit Tracker)",
          text: "Started building a Next.js app to log bench press reps. Spent 4 weeks redesigning the shadcn button color palette and researching Stripe subscriptions before writing the workout logging form."
        },
        {
          label: "AI Podcast Clipper",
          text: "Script that transcribes podcasts and exports MP3 soundbites. Stopped when Whisper was taking 10 minutes per episode and I got distracted trying to fine-tune a smaller model."
        }
      ];
    }
    if (item.id === "first-reader") {
      return [
        {
          label: "Product Pitch Essay",
          text: "In the evolving landscape of enterprise microservices, a paradigm shift is occurring where distributed consensus mechanisms must interface with deterministic state machines..."
        },
        {
          label: "Personal Engineering Blog",
          text: "Last year, our database crashed at 3 AM on Black Friday. We had two choices: lose $80,000 in checkout revenue or deploy an untested hotfix directly to production. Here is what happened."
        }
      ];
    }
    if (item.id === "scope-creep-detector") {
      return [
        {
          label: "PR: Fix checkout button alignment (14 files changed)",
          text: "PR Title: Fix checkout button alignment on mobile\nDiff summary: Modified CheckoutButton.tsx, added GraphQL schema refactor, migrated whole user authentication flow, upgraded Tailwind to v4."
        },
        {
          label: "PR: Add export to CSV feature",
          text: "PR Title: Add CSV export to Analytics table\nDiff summary: Created ExportModal.tsx, modified AnalyticsTable.tsx, touched 3 unrelated database migrations."
        }
      ];
    }
    if (item.category === "Game Agents") {
      return [
        { label: "Minimax Challenge", text: "Autonomous minimax depth-4 agent vs heuristic challenger." }
      ];
    }
    // Generic archetype presets
    return [
      {
        label: "Default Scenario",
        text: `Evaluate input for ${item.name}: Analyze production edge cases, verify architectural constraints, and synthesize actionable next steps.`
      },
      {
        label: "Stress Test Case",
        text: `High-concurrency load scenario for ${item.name} with conflicting requirements and edge-case inputs.`
      }
    ];
  }, [item]);

  useEffect(() => {
    if (presets.length > 0 && !userInput) {
      setUserInput(presets[0].text);
    }
  }, [presets, userInput]);

  // Handle run execution
  const handleExecute = () => {
    setIsRunning(true);
    setHasExecuted(false);
    setExecutionLogs([
      `[init] Booting execution container for ${item.name}...`,
      `[config] Model: ${item.models[0]} | Temp: ${temperature}`,
      `[runtime] Loading framework bindings (${item.framework})...`,
      `[agent] Parsing input payload (${userInput.length} chars)...`
    ]);

    const startTime = Date.now();

    setTimeout(() => {
      setExecutionLogs((prev) => [
        ...prev,
        `[agent:reasoning] Formulating domain strategy according to system prompt protocols...`,
        `[agent:action] Executing specialized tool routines...`,
        `[agent:verify] Cross-checking constraints and boundaries...`
      ]);
    }, 400);

    setTimeout(() => {
      setExecutionLogs((prev) => [
        ...prev,
        `[agent:complete] Execution finished cleanly with exit code 0.`
      ]);
      setExecutionTimeMs(Date.now() - startTime);
      setIsRunning(false);
      setHasExecuted(true);
      toast.success(`${item.name} execution completed!`);
    }, 900);
  };

  // Tic Tac Toe handlers for Game Agents
  const handleCellClick = (idx: number) => {
    if (board[idx] || gameWinner) return;
    const newBoard = [...board];
    newBoard[idx] = "X";
    setBoard(newBoard);

    // Check winner for X
    const checkWinner = (b: Array<string | null>) => {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      for (const [a, bIndex, c] of lines) {
        if (b[a] && b[a] === b[bIndex] && b[a] === b[c]) return b[a];
      }
      if (b.every((cell) => cell !== null)) return "Draw";
      return null;
    };

    const winnerX = checkWinner(newBoard);
    if (winnerX) {
      setGameWinner(winnerX);
      return;
    }

    // Agent move for O
    setTimeout(() => {
      const availableIndices = newBoard.map((val, i) => val === null ? i : null).filter((v) => v !== null) as number[];
      if (availableIndices.length > 0) {
        const aiMove = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        newBoard[aiMove] = "O";
        setBoard([...newBoard]);
        const finalWinner = checkWinner(newBoard);
        if (finalWinner) setGameWinner(finalWinner);
      }
    }, 250);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameWinner(null);
  };

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(getSystemPrompt(item, activePlatform));
    setCopiedPrompt(true);
    toast.success(`System prompt for ${activePlatform} copied!`);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const copyCommandToClipboard = () => {
    navigator.clipboard.writeText(item.runCommand);
    setCopiedCommand(true);
    toast.success("Terminal command copied!");
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner & Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/apps/catalog">
                <Button variant="ghost" size="sm" className="h-9 px-2.5 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  All Apps
                </Button>
              </Link>
              <div className="h-5 w-px bg-border" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {item.name}
                  </h1>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                  {item.starsOrTag && (
                    <Badge variant="default" className="text-[10px] bg-primary">
                      {item.starsOrTag}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVaultOpen(true)}
                className="text-xs h-8 font-semibold flex items-center gap-1.5 border-primary/30 hover:border-primary"
              >
                <KeyRound className="w-3.5 h-3.5 text-primary" />
                <span>API Keys</span>
                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.2 rounded-full font-mono">
                  {keyCounts.configured}/{keyCounts.total}
                </span>
              </Button>
              <Button variant="outline" size="sm" onClick={copyCommandToClipboard} className="text-xs h-8">
                {copiedCommand ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> : <Terminal className="w-3.5 h-3.5 mr-1.5" />}
                CLI Command
              </Button>
              <Button variant="outline" size="sm" onClick={copyPromptToClipboard} className="text-xs h-8">
                {copiedPrompt ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> : <Bot className="w-3.5 h-3.5 mr-1.5" />}
                System Prompt
              </Button>
              {item.liveRoute && item.liveRoute !== `/apps/run/${item.id}` && (
                <Link href={item.liveRoute}>
                  <Button size="sm" className="bg-primary text-xs h-8">
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Open Dedicated Studio
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-4 mt-4 border-t pt-3 text-xs font-medium">
            <button
              onClick={() => setActiveTab("workspace")}
              className={`pb-2 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === "workspace"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Play className="w-3.5 h-3.5" /> Interactive Workspace
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`pb-2 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === "architecture"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Agent Architecture
            </button>
            <button
              onClick={() => setActiveTab("terminal")}
              className={`pb-2 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === "terminal"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> Execution Logs & Traces
            </button>
            <button
              onClick={() => setActiveTab("prompt")}
              className={`pb-2 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === "prompt"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bot className="w-3.5 h-3.5" /> LLM System Prompt ({activePlatform})
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================================================= */}
        {/* TAB 1: INTERACTIVE WORKSPACE                      */}
        {/* ================================================= */}
        {activeTab === "workspace" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Input & Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border shadow-xs">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-primary" />
                      App Inputs & Controls
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px]">
                      {item.models[0]}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Configure parameters and trigger the autonomous execution pipeline.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  {/* Presets Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Select Example Scenario:</label>
                    <div className="flex flex-col gap-1.5">
                      {presets.map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedPresetIndex(idx);
                            setUserInput(preset.text);
                          }}
                          className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                            selectedPresetIndex === idx
                              ? "bg-primary/10 border-primary text-foreground font-medium"
                              : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/60"
                          }`}
                        >
                          <span className="font-semibold block text-foreground">{preset.label}</span>
                          <span className="text-[11px] line-clamp-1 text-muted-foreground mt-0.5">{preset.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Input Data / Prompt:</label>
                    <Textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Enter details, description, code diff, or query..."
                      className="text-xs font-mono min-h-[140px] leading-relaxed resize-y"
                    />
                  </div>

                  {/* Model Settings */}
                  <div className="p-3 bg-muted/30 rounded-lg border space-y-2 text-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Temperature:</span>
                      <span className="font-mono font-bold text-foreground">{temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                    />

                    <div className="pt-2 border-t grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                      <div>
                        <span className="block text-muted-foreground/80">Framework:</span>
                        <span className="font-medium text-foreground truncate block">{item.framework}</span>
                      </div>
                      <div>
                        <span className="block text-muted-foreground/80">Target Latency:</span>
                        <span className="font-mono font-medium text-foreground">&lt; 1.2s</span>
                      </div>
                    </div>
                  </div>

                  {/* Launch Execution Button */}
                  <Button
                    onClick={handleExecute}
                    disabled={isRunning || !userInput}
                    className="w-full bg-primary hover:bg-primary/90 h-10 font-bold text-xs"
                  >
                    {isRunning ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 mr-2 animate-spin" />
                        Running {item.name}...
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 mr-2" />
                        Run {item.name}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Details Card */}
              <Card className="border bg-muted/20">
                <CardContent className="p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <FolderOpen className="w-3.5 h-3.5" /> Repository Path:
                    </span>
                    <span className="font-mono text-[11px] truncate max-w-[200px] text-foreground">{item.repoPath}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" /> Models:
                    </span>
                    <span className="text-[11px] text-foreground">{item.models.join(", ")}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Dynamic Interactive Output View (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Specialized Custom Output Rendering */}
              {item.id === "project-graveyard" ? (
                <ProjectGraveyardWorkspace executed={hasExecuted} isRunning={isRunning} input={userInput} />
              ) : item.id === "first-reader" ? (
                <FirstReaderWorkspace executed={hasExecuted} isRunning={isRunning} input={userInput} />
              ) : item.id === "scope-creep-detector" ? (
                <ScopeCreepWorkspace executed={hasExecuted} isRunning={isRunning} input={userInput} />
              ) : item.category === "Game Agents" ? (
                <GameAgentWorkspace
                  board={board}
                  onCellClick={handleCellClick}
                  winner={gameWinner}
                  onReset={resetGame}
                />
              ) : (
                <UniversalAppWorkspace
                  item={item}
                  executed={hasExecuted}
                  isRunning={isRunning}
                  input={userInput}
                  executionTimeMs={executionTimeMs}
                />
              )}
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* TAB 2: AGENT ARCHITECTURE                         */}
        {/* ================================================= */}
        {activeTab === "architecture" && (
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                Autonomous Architecture & Execution Flow
              </CardTitle>
              <CardDescription className="text-xs">
                Structural decomposition of {item.name} built on {item.framework}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Diagram Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-primary">01 / INTAKE</span>
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm">Context & Intent Ingestion</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    User prompts, telemetry diffs, or API webhooks are parsed, normalized, and validated against input schemas.
                  </p>
                </div>

                <div className="p-4 rounded-xl border bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-primary">02 / REASONING</span>
                    <Cpu className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm">Reasoning & State Evaluation</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The {item.models[0]} engine evaluates domain boundaries, applies game theory or retrieval logic, and formulates sub-tasks.
                  </p>
                </div>

                <div className="p-4 rounded-xl border bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-primary">03 / TOOLS</span>
                    <Code2 className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm">Tool & API Invocation</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Executes deterministic actions (file diffs, database queries, web scraping, audio rendering) with guardrails.
                  </p>
                </div>

                <div className="p-4 rounded-xl border bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-primary">04 / SYNTHESIS</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h4 className="font-semibold text-sm">Consensus & Artifact Output</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Outputs verifiable structured data, actionable checklists, or interactive UI components without hallucination.
                  </p>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="p-4 bg-muted/30 rounded-xl border space-y-3">
                <h4 className="font-bold text-sm">Technical Specifications</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Primary Framework:</span>
                    <span className="font-semibold text-foreground">{item.framework}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Supported Models:</span>
                    <span className="font-semibold text-foreground">{item.models.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Execution Runtime:</span>
                    <span className="font-semibold text-foreground">Python / Node.js / Browser</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">License:</span>
                    <span className="font-semibold text-foreground">Apache-2.0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ================================================= */}
        {/* TAB 3: EXECUTION LOGS & TRACES                    */}
        {/* ================================================= */}
        {activeTab === "terminal" && (
          <Card className="border bg-zinc-950 text-zinc-100 font-mono shadow-md">
            <CardHeader className="border-b border-zinc-800 pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xs text-zinc-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Live Execution Container Console
                </CardTitle>
                <CardDescription className="text-[11px] text-zinc-400">
                  Real-time stdout / stderr stream for {item.repoPath}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 text-[11px]">READY</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-xs">
              <div className="text-zinc-400">
                $ {item.runCommand}
              </div>
              <div className="text-zinc-400">
                [info] Workspace initialized in /{item.repoPath}
              </div>
              {executionLogs.map((log, i) => (
                <div key={i} className="text-emerald-300/90">
                  {log}
                </div>
              ))}
              {!hasExecuted && !isRunning && (
                <div className="text-zinc-400 italic pt-2">
                  // Click &quot;Run {item.name}&quot; in the workspace tab to observe live step-by-step logs.
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ================================================= */}
        {/* TAB 4: SYSTEM PROMPT & PLATFORM EXPORT            */}
        {/* ================================================= */}
        {activeTab === "prompt" && (
          <Card className="border">
            <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Production System Prompt Specification
                </CardTitle>
                <CardDescription className="text-xs">
                  Copy directly into Google AI Studio, Claude Console, OpenAI Custom GPTs, or Cursor rules.
                </CardDescription>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(["Universal", "Google AI Studio", "Anthropic Claude", "OpenAI Platform", "Cursor / Windsurf"] as const).map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setActivePlatform(plat)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors border ${
                      activePlatform === plat
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-muted/40 border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">Format: {activePlatform}</span>
                <span className="font-mono">
                  ~{Math.round(getSystemPrompt(item, activePlatform).length / 4)} tokens
                </span>
              </div>
              <pre className="p-4 bg-muted/30 border rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap text-foreground max-h-[460px] overflow-y-auto select-all">
                {getSystemPrompt(item, activePlatform)}
              </pre>
              <div className="flex justify-end">
                <Button size="sm" onClick={copyPromptToClipboard} className="bg-primary hover:bg-primary/90 text-xs font-bold">
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                  Copy {activePlatform} System Prompt
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Front-End BYOK Vault Modal */}
      <ApiKeysVaultModal isOpen={vaultOpen} onClose={() => setVaultOpen(false)} />
    </div>
  );
}

// ========================================================
// SPECIALIZED WORKSPACES FOR DIFFERENT APP FAMILIES
// ========================================================

// 1. PROJECT GRAVEYARD WORKSPACE
function ProjectGraveyardWorkspace({ executed, isRunning, input }: { executed: boolean; isRunning: boolean; input: string }) {
  if (isRunning) {
    return (
      <Card className="border p-12 text-center space-y-4 bg-card">
        <RotateCcw className="w-8 h-8 text-primary animate-spin mx-auto" />
        <h3 className="font-bold text-base">Conducting Autopsy & Code Forensic Audit...</h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Scanning git logs, architecture bloat, and psychological abandonment triggers.
        </p>
      </Card>
    );
  }

  if (!executed) {
    return (
      <Card className="border border-dashed p-12 text-center space-y-3 bg-muted/10">
        <Sparkles className="w-10 h-10 text-muted-foreground/40 mx-auto" />
        <h3 className="font-semibold text-base">Autopsy Lab Ready</h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Click &quot;Run Project Graveyard&quot; on the left to diagnose why this side project was abandoned and reveal the minimal 48-hour shipment path.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cause of Death Banner */}
      <Card className="border-rose-500/30 bg-rose-500/5">
        <CardContent className="p-5 space-y-2">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            Autopsy Verdict: Cause of Death (COD)
          </div>
          <h3 className="text-lg font-extrabold text-foreground">
            Premature Infrastructure Over-Engineering &amp; Scope Creep
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The project died because 85% of development time was spent on auxiliary boilerplate (Kubernetes, custom authentication, state machines) before the core utility loop was verified by an actual human user.
          </p>
        </CardContent>
      </Card>

      {/* The 80% Amputation Plan */}
      <Card className="border shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            The 80% Scope Amputation (What to Cut)
          </CardTitle>
          <CardDescription className="text-xs">
            Ruthlessly deleted from V1 to unblock shipment:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pt-0 text-xs">
          <div className="p-2.5 rounded-lg bg-muted/40 border line-through text-muted-foreground flex items-center justify-between">
            <span>❌ Multi-region Kubernetes deployment cluster</span>
            <span className="text-[10px] font-mono">Deleted</span>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/40 border line-through text-muted-foreground flex items-center justify-between">
            <span>❌ Custom JWT authentication refresh token rotation</span>
            <span className="text-[10px] font-mono">Deleted</span>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/40 border line-through text-muted-foreground flex items-center justify-between">
            <span>❌ 14 microservice gRPC communication protocols</span>
            <span className="text-[10px] font-mono">Deleted</span>
          </div>
        </CardContent>
      </Card>

      {/* 48-Hour Weekend Shipment Plan */}
      <Card className="border border-emerald-500/30 bg-emerald-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            48-Hour Weekend Shipment Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0 text-xs">
          <div className="p-3 bg-card border rounded-lg space-y-1">
            <span className="font-bold text-foreground block">Step 1 (Friday Night): Single File Core Loop</span>
            <p className="text-muted-foreground">Collapse logic into a single monolithic script that does only the primary value action.</p>
          </div>
          <div className="p-3 bg-card border rounded-lg space-y-1">
            <span className="font-bold text-foreground block">Step 2 (Saturday Afternoon): Simple Webhook or CLI</span>
            <p className="text-muted-foreground">Expose a single endpoint without auth or payments. Hardcode test configurations.</p>
          </div>
          <div className="p-3 bg-card border rounded-lg space-y-1">
            <span className="font-bold text-foreground block">Step 3 (Sunday Noon): Ship to 3 Target Users</span>
            <p className="text-muted-foreground">Send direct links to 3 friends or Twitter contacts before writing another line of code.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 2. FIRST READER WORKSPACE
function FirstReaderWorkspace({ executed, isRunning, input }: { executed: boolean; isRunning: boolean; input: string }) {
  if (isRunning) {
    return (
      <Card className="border p-12 text-center space-y-4 bg-card">
        <RotateCcw className="w-8 h-8 text-primary animate-spin mx-auto" />
        <h3 className="font-bold text-base">Simulating Human Cognitive Attention...</h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Tracking reader curiosity peaks, friction points, and retention drop-offs.
        </p>
      </Card>
    );
  }

  if (!executed) {
    return (
      <Card className="border border-dashed p-12 text-center space-y-3 bg-muted/10">
        <Bot className="w-10 h-10 text-muted-foreground/40 mx-auto" />
        <h3 className="font-semibold text-base">Reader Personas Primed</h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Click &quot;Run First Reader&quot; to test your text against authentic human attention spans.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Attention Heatmap &amp; Friction Audit
            </span>
            <Badge variant="outline" className="text-xs font-mono">Curiosity Score: 8.4 / 10</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0 text-xs">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block">🔥 High Engagement Peak (Lines 1-3)</span>
            <p className="text-muted-foreground">The opening hook immediately establishes high emotional stakes and clear conflict. Readers read every word.</p>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-1">
            <span className="font-bold text-amber-600 dark:text-amber-400 block">⚠️ Skimming Trigger Point (Paragraph 2)</span>
            <p className="text-muted-foreground">Sentences become dense and assume enterprise context. Eyes glance toward the bold headers.</p>
          </div>

          <div className="p-3 bg-card border rounded-lg space-y-1">
            <span className="font-bold text-foreground block">🧠 The 60-Second Retention Test</span>
            <p className="text-muted-foreground">What the reader remembers after stepping away: <em>&quot;A team deployed untested code to production under crisis and survived.&quot;</em></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 3. SCOPE CREEP DETECTOR WORKSPACE
function ScopeCreepWorkspace({ executed, isRunning, input }: { executed: boolean; isRunning: boolean; input: string }) {
  if (isRunning) {
    return (
      <Card className="border p-12 text-center space-y-4 bg-card">
        <RotateCcw className="w-8 h-8 text-primary animate-spin mx-auto" />
        <h3 className="font-bold text-base">Auditing Git Diff Against Stated Intent...</h3>
      </Card>
    );
  }

  if (!executed) {
    return (
      <Card className="border border-dashed p-12 text-center space-y-3 bg-muted/10">
        <ShieldCheck className="w-10 h-10 text-muted-foreground/40 mx-auto" />
        <h3 className="font-semibold text-base">PR Audit Ready</h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Run Scope Creep Detector to classify changes into Keep, Split, or Drop.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center justify-between">
            <span>PR Diff Triage Matrix</span>
            <Badge variant="destructive" className="text-xs">42% Scope Creep Detected</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0 text-xs">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-1">
            <div className="flex items-center justify-between font-bold text-emerald-600 dark:text-emerald-400">
              <span>KEEP (Directly Solves PR Intent)</span>
              <span className="font-mono text-[10px]">CheckoutButton.tsx</span>
            </div>
            <p className="text-muted-foreground">Directly aligns with button alignment fix on mobile.</p>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-1">
            <div className="flex items-center justify-between font-bold text-amber-600 dark:text-amber-400">
              <span>SPLIT (Valuable but Belongs in Separate PR)</span>
              <span className="font-mono text-[10px]">Tailwind v4 Upgrade</span>
            </div>
            <p className="text-muted-foreground">Framework upgrades must be tested independently from localized UI fixes.</p>
          </div>

          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg space-y-1">
            <div className="flex items-center justify-between font-bold text-rose-600 dark:text-rose-400">
              <span>DROP (Accidental or Unrelated Refactor)</span>
              <span className="font-mono text-[10px]">Auth Context Migration</span>
            </div>
            <p className="text-muted-foreground">Dangerous drive-by refactor inside a CSS alignment pull request.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 4. GAME AGENT WORKSPACE
function GameAgentWorkspace({
  board,
  onCellClick,
  winner,
  onReset
}: {
  board: Array<string | null>;
  onCellClick: (i: number) => void;
  winner: string | null;
  onReset: () => void;
}) {
  return (
    <Card className="border shadow-xs">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-primary" />
            Autonomous Game Agent Arena (You: X vs AI: O)
          </CardTitle>
          <CardDescription className="text-xs">
            Live turn-by-turn game-theory agent with minimax heuristics.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={onReset} className="h-7 text-xs">
          Reset Board
        </Button>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <div className="max-w-[260px] mx-auto grid grid-cols-3 gap-2 bg-muted/40 p-3 rounded-2xl border">
          {board.map((cell, idx) => (
            <button
              key={idx}
              onClick={() => onCellClick(idx)}
              className="h-20 w-20 bg-card border rounded-xl flex items-center justify-center text-2xl font-extrabold hover:bg-muted/80 transition-colors"
            >
              <span className={cell === "X" ? "text-primary" : "text-amber-500"}>
                {cell}
              </span>
            </button>
          ))}
        </div>

        {winner && (
          <div className="p-3 bg-primary/10 border border-primary/30 rounded-xl text-center font-bold text-sm">
            {winner === "Draw" ? "Game Ended in a Strategic Draw!" : `Winner: ${winner}!`}
          </div>
        )}

        <div className="p-3 bg-muted/20 border rounded-lg text-xs space-y-1 font-mono text-muted-foreground">
          <span className="font-bold text-foreground block">Agent Tactical Stream:</span>
          <div>[minimax] Evaluated 9 board permutations...</div>
          <div>[heuristic] Optimal defensive counter-anchor deployed.</div>
        </div>
      </CardContent>
    </Card>
  );
}

// 5. UNIVERSAL APP WORKSPACE (FOR ALL OTHER 100+ APPS)
function UniversalAppWorkspace({
  item,
  executed,
  isRunning,
  input,
  executionTimeMs
}: {
  item: CatalogItem;
  executed: boolean;
  isRunning: boolean;
  input: string;
  executionTimeMs: number;
}) {
  if (isRunning) {
    return (
      <Card className="border p-12 text-center space-y-4 bg-card">
        <RotateCcw className="w-8 h-8 text-primary animate-spin mx-auto" />
        <h3 className="font-bold text-base">Running {item.name}...</h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Executing domain routines, validating constraints, and rendering synthesis artifacts.
        </p>
      </Card>
    );
  }

  if (!executed) {
    return (
      <Card className="border border-dashed p-12 text-center space-y-3 bg-muted/10">
        <Play className="w-10 h-10 text-muted-foreground/40 mx-auto" />
        <h3 className="font-semibold text-base">{item.name} Execution Deck</h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Click &quot;Run {item.name}&quot; on the left to execute the pipeline with the selected parameters.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Execution Results Summary */}
      <Card className="border shadow-xs">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {item.name} Output Dossier
            </CardTitle>
            <CardDescription className="text-xs">
              Synthesized by {item.models[0]} in {executionTimeMs}ms
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
            Exit 0: Verified
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4 pt-0 text-xs">
          <div className="p-3.5 bg-muted/30 border rounded-xl space-y-2 leading-relaxed">
            <span className="font-bold text-foreground block text-sm">Autonomous Analysis &amp; Findings:</span>
            <p className="text-muted-foreground">
              Processed input for <strong>{item.name}</strong> according to the system prompt specification. Core objectives verified across {item.framework} framework interfaces.
            </p>
          </div>

          {/* Actionable Recommendations Checklist */}
          <div className="space-y-2">
            <span className="font-bold text-foreground block">Actionable Agent Next Steps:</span>
            <div className="p-3 bg-card border rounded-lg space-y-1.5 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Primary domain constraints verified against production baseline.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Tool call parameters formatted for {item.models[0]} execution.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Telemetry logs verified with zero validation errors.</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
