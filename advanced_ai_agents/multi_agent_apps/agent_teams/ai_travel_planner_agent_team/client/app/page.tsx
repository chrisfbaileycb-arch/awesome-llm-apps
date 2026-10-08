"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Luggage,
  Swords,
  Sparkles,
  Radio,
  Search,
  Activity,
  Brain,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Zap,
  Globe,
  Play,
  Github,
  Flame,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeaturedApp {
  id: string;
  name: string;
  category: string;
  icon: any;
  href: string;
  tagline: string;
  description: string;
  badge: string;
  framework: string;
  highlights: string[];
}

const FEATURED_APPS: FeaturedApp[] = [
  {
    id: "tripcraft",
    name: "TripCraft AI Travel Planner",
    category: "Agent Teams",
    icon: Luggage,
    href: "/plan",
    tagline: "Collaborative agent team crafting bespoke travel itineraries",
    description: "Orchestrated agents search flights, curate boutique stays, map daily schedules, and balance budgets tailored to your travel style.",
    badge: "Full Stack Team",
    framework: "Next.js + Google ADK",
    highlights: ["Day-by-Day Scheduling", "Hotel & Flight Curation", "Budget Optimization", "Saved Plans Gallery"]
  },
  {
    id: "negotiation",
    name: "AI Negotiation Battle Simulator",
    category: "Autonomous Agents",
    icon: Swords,
    href: "/apps/negotiation",
    tagline: "High-stakes buyer vs seller adversarial game-theory arena",
    description: "Watch autonomous agents deploy real negotiation tactics, anchors, bluffs, and concessions, or jump in as buyer yourself.",
    badge: "Adversarial AI",
    framework: "Game Theory Engine",
    highlights: ["4 Classic Scenarios", "8 Diverse Personalities", "Price Convergence Meter", "User Interactive Mode"]
  },
  {
    id: "self-improving",
    name: "Self-Improving Agent Skills Studio",
    category: "Meta-Agent Loop",
    icon: Sparkles,
    href: "/apps/self-improving-skills",
    tagline: "Autonomous evaluation and mutation engine for agent skills",
    description: "A continuous loop of Evaluator, Critic, and Mutator agents testing prompts against scenarios to boost pass rates and eliminate hallucinations.",
    badge: "Self-Evolving",
    framework: "Google ADK + Gemini",
    highlights: ["Scenario Benchmarking", "Iterative Trajectory Graph", "Side-by-Side Prompt Diff", "One-Click Export"]
  },
  {
    id: "news-podcast",
    name: "Beifong AI News & Dual-Host Podcasts",
    category: "Content Pipeline",
    icon: Radio,
    href: "/apps/news-podcast",
    tagline: "Autonomous ingestion and dual-host banter script generator",
    description: "Ingests raw AI research feeds and generates high-signal synthesized podcast episodes with two contrasting host personalities.",
    badge: "Audio Synthesis",
    framework: "Agno + Web Audio",
    highlights: ["Curated AI Feeds", "Live Teleprompter", "Dual-Host Banter", "Interactive Waveform Player"]
  },
  {
    id: "needle",
    name: "Needle Semantic Meaning Search",
    category: "Memory & Retrieval",
    icon: Search,
    href: "/apps/needle",
    tagline: "Search complex prose by conceptual thoughts, not literal keywords",
    description: "Find latent thoughts, implicit intentions, and hidden architecture trade-offs across dense technical documents and founder letters.",
    badge: "Semantic Vector",
    framework: "Gemini Embedding 2",
    highlights: ["Conceptual Matching", "Similarity Heatmaps", "Document Reader", "Confidence Scoring"]
  },
  {
    id: "earnings",
    name: "Earnings Call Analyst Cockpit",
    category: "Financial Intelligence",
    icon: Activity,
    href: "/apps/earnings-analyst",
    tagline: "Playback-synced transcription and executive evasion detector",
    description: "Financial analyst overlay tracking revenue surprises, capex inflection points, and evasive management answers during investor calls.",
    badge: "Synchronized Stream",
    framework: "Audio Intelligence",
    highlights: ["Synced Webcast Player", "Real-Time Signal Cards", "Q&A Evasion Index", "Research Pack Summary"]
  },
  {
    id: "thinkpath",
    name: "ThinkPath Guided Reasoning Chat",
    category: "Reasoning Architecture",
    icon: Brain,
    href: "/apps/thinkpath",
    tagline: "Multi-path reasoning tree with deductive, lateral, and devil's advocate branches",
    description: "Inspect concurrent chains-of-thought as the model stress-tests competing hypotheses before synthesizing a hardened conclusion.",
    badge: "Branching Chain",
    framework: "Multi-Hypothesis Logic",
    highlights: ["3 Concurrent Paths", "Step-by-Step Transparency", "Consensus Synthesis", "Architecture Auditing"]
  },
  {
    id: "catalog",
    name: "100+ Awesome LLM Apps Catalog",
    category: "Repository Explorer",
    icon: Layers,
    href: "/apps/catalog",
    tagline: "Search, filter, and run all 100+ templates from the repository",
    description: "Comprehensive registry of agent teams, autonomous game agents, starter kits, and fine-tuning projects with ready-to-run terminal commands.",
    badge: "100+ Templates",
    framework: "Multi-Framework Hub",
    highlights: ["Filter by Category", "Model & Framework Tags", "One-Click Copy Command", "Architecture Notes"]
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b py-16 sm:py-24 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100+ Open-Source AI Agents, Skills & RAG Apps</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
            The Complete <span className="text-primary">Awesome LLM Apps</span> Interactive Workbench
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Run 100+ AI agents locally or copy them as verified System Prompts for building platforms like Google AI Studio, Claude Console, OpenAI Custom GPT, and Cursor.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/apps/catalog">
              <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-6">
                <Layers className="w-4 h-4 mr-2" />
                Browse 100+ Apps & System Prompts
              </Button>
            </Link>
            <Link href="/plan">
              <Button variant="outline" size="lg" className="h-12 px-6">
                <Luggage className="w-4 h-4 mr-2" />
                Launch TripCraft AI
              </Button>
            </Link>
            <Link href="/apps/negotiation">
              <Button variant="ghost" size="lg" className="h-12 px-6">
                <Swords className="w-4 h-4 mr-2" />
                Negotiation Arena
              </Button>
            </Link>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-border/50 text-left">
            <div>
              <span className="text-2xl font-bold font-mono text-foreground">100+</span>
              <span className="text-xs text-muted-foreground block">Curated AI Apps</span>
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-foreground">7</span>
              <span className="text-xs text-muted-foreground block">Live Interactive Studios</span>
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-foreground">Apache-2.0</span>
              <span className="text-xs text-muted-foreground block">Open Source License</span>
            </div>
            <div>
              <span className="text-2xl font-bold font-mono text-foreground">0</span>
              <span className="text-xs text-muted-foreground block">External DB Dependencies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Interactive Applications Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Integrated Interactive Applications
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Click into any application below to launch its full live interactive interface.
            </p>
          </div>
          <Link href="/apps/catalog">
            <Button variant="ghost" size="sm" className="text-xs">
              View All 100+ Templates <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_APPS.map((app) => (
            <Card
              key={app.id}
              className="border flex flex-col justify-between hover:border-primary/50 hover:shadow-xs transition-all bg-card"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <app.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] py-0 font-medium">
                    {app.badge}
                  </Badge>
                </div>
                <div className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                  {app.category}
                </div>
                <CardTitle className="text-base font-bold leading-tight">
                  {app.name}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-2 mt-1">
                  {app.tagline}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="space-y-1 text-[11px] text-muted-foreground bg-muted/40 p-2.5 rounded-lg border">
                  {app.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>

                <Link href={app.href} className="block w-full">
                  <Button size="sm" className="w-full text-xs font-semibold">
                    <Play className="w-3 h-3 mr-1.5" /> Launch App
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Multi-Agent Architecture Spotlight */}
      <section className="border-t py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Built on Modern Multi-Agent Patterns
            </h2>
            <p className="text-sm text-muted-foreground">
              Every app in this workbench demonstrates a battle-tested agentic workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border p-6 space-y-3 bg-card">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">Orchestrator-Worker Teams</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Featured in <strong>TripCraft AI</strong> and <strong>DevPulse</strong>: a central planner decomposes high-level goals into parallel subtasks for specialized flights, hotels, and budgeting agents.
              </p>
            </Card>

            <Card className="border p-6 space-y-3 bg-card">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">Self-Evolving Critic Loops</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Featured in <strong>Self-Improving Skills Studio</strong>: an automated evaluator grades outputs against test suites, feeds telemetry to a critic, and iteratively mutates prompt instructions.
              </p>
            </Card>

            <Card className="border p-6 space-y-3 bg-card">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Swords className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">Adversarial Game Theory</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Featured in <strong>Negotiation Battle Arena</strong>: opposing agents with asymmetric information, distinct reservation prices, and conflicting incentives reach Pareto-efficient compromises.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="border-t py-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground space-y-2">
        <p>
          Awesome LLM Apps Unified Hub · Open-source, Apache-2.0.
        </p>
        <p>
          Works with Claude, Gemini, GPT, DeepSeek, Llama, and Qwen.
        </p>
      </footer>
    </div>
  );
}
