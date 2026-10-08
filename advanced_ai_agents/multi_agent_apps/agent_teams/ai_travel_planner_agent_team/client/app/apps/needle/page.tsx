"use client";

import React, { useState } from "react";
import {
  Search,
  FileText,
  Sparkles,
  Layers,
  ArrowRight,
  Sliders,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Filter,
  Flame,
  Zap,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface DocumentCorpus {
  id: string;
  title: string;
  type: string;
  author: string;
  passages: {
    id: number;
    text: string;
    themes: string[];
  }[];
}

const DOCUMENTS: DocumentCorpus[] = [
  {
    id: "agent-architecture",
    title: "Autonomous Agent Orchestration RFC (v3.2)",
    type: "Technical Specification",
    author: "Systems Architecture Group",
    passages: [
      {
        id: 1,
        text: "Agents must never execute arbitrary side-effects without explicit validation through supervisory gatekeepers. When an agent attempts an irreversible write to an external database, the execution graph must pause and demand dual-quorum consensus.",
        themes: ["safety", "validation", "side-effects", "governance"]
      },
      {
        id: 2,
        text: "Memory compaction should occur on a sliding logarithmic window to prevent degradation of reasoning coherence over long-lived conversation sessions.",
        themes: ["memory", "context", "compaction", "latency"]
      },
      {
        id: 3,
        text: "Tool latency is the silent killer of user trust. If an API crawler or search tool exceeds 3,500 milliseconds, intermediate fallback approximations must be streamed to the client immediately.",
        themes: ["performance", "latency", "streaming", "user experience"]
      },
      {
        id: 4,
        text: "State transitions are persisted using append-only event sourcing logs rather than destructive record mutations. This allows instantaneous time-travel debugging across recursive subagent cascades.",
        themes: ["state", "event-sourcing", "debugging", "persistence"]
      },
      {
        id: 5,
        text: "Cost governance models predict token consumption before invoking expensive reasoning models, routing lightweight queries to distilled 7B parameter models.",
        themes: ["cost", "routing", "efficiency", "models"]
      }
    ]
  },
  {
    id: "investor-update",
    title: "AI Startup Founder Letter & Post-Mortem",
    type: "Executive Brief",
    author: "Founder & CEO",
    passages: [
      {
        id: 1,
        text: "Our initial mistake was building bespoke chatbots for every enterprise client. Custom prompt engineering created unsustainable consulting overhead with zero software margins.",
        themes: ["business", "mistakes", "margins", "enterprise"]
      },
      {
        id: 2,
        text: "The breakthrough came when we turned our internal workflow automations into standardized SDKs that developers could self-serve in less than five minutes.",
        themes: ["growth", "developer-experience", "self-serve", "product"]
      },
      {
        id: 3,
        text: "Retention jumped from 38% to 84% once customers stopped treating our tool as an interactive novelty and wired it directly into their nightly CI/CD deployment pipelines.",
        themes: ["retention", "adoption", "cicd", "infrastructure"]
      },
      {
        id: 4,
        text: "We intentionally reduced our paid marketing spend to zero, redirecting all capital towards open-source reference implementations and community tutorials.",
        themes: ["marketing", "capital", "open-source", "community"]
      }
    ]
  }
];

export default function NeedleSemanticSearchPage() {
  const [selectedDocId, setSelectedDocId] = useState<string>("agent-architecture");
  const [searchQuery, setSearchQuery] = useState<string>("fear of slow response times destroying user confidence");
  const [minThreshold, setMinThreshold] = useState<number>(50);

  const doc = DOCUMENTS.find((d) => d.id === selectedDocId) || DOCUMENTS[0];

  // Conceptual semantic similarity heuristic
  const calculateRelevance = (passageText: string, query: string): number => {
    if (!query.trim()) return 0;
    const qLower = query.toLowerCase();
    const pLower = passageText.toLowerCase();

    // Semantic concept mapping
    const conceptMap: Record<string, string[]> = {
      slow: ["latency", "milliseconds", "degradation", "timeout", "speed"],
      latency: ["slow", "milliseconds", "3,500", "performance"],
      safety: ["validation", "supervisory", "gatekeeper", "consensus", "side-effects"],
      cost: ["token", "consumption", "distilled", "expensive", "spend", "margins"],
      memory: ["context", "compaction", "window", "session", "coherence"],
      mistake: ["mistake", "overhead", "unsustainable", "degradation", "fail"],
      growth: ["breakthrough", "retention", "jumped", "adoption", "developers"],
      developer: ["sdk", "ci/cd", "deployment", "pipelines", "self-serve", "open-source"]
    };

    let score = 30; // base floor
    const qWords = qLower.split(/\s+/).filter((w) => w.length > 3);

    for (const word of qWords) {
      if (pLower.includes(word)) {
        score += 25;
      }
      // Check related conceptual terms
      for (const [key, related] of Object.entries(conceptMap)) {
        if (word.includes(key) || key.includes(word)) {
          for (const rel of related) {
            if (pLower.includes(rel)) {
              score += 15;
            }
          }
        }
      }
    }

    return Math.min(98, Math.max(35, score));
  };

  const results = doc.passages
    .map((p) => {
      const score = calculateRelevance(p.text, searchQuery);
      return { ...p, score };
    })
    .filter((p) => p.score >= minThreshold)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link href="/" className="hover:underline">Awesome LLM Apps</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Needle</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Search className="w-8 h-8 text-primary" />
              Needle — Semantic Thought Search & Text Miner
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Find the thought, not just the words. Search complex prose by conceptual meaning, intent, and implicit themes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Embedding Meaning Indexing
            </Badge>
          </div>
        </div>

        {/* Search Input Bar */}
        <Card className="border shadow-xs">
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Describe any thought, concept, or latent intention..."
                  className="pl-9 h-11 text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="h-11 px-3 bg-muted/40 border rounded-md text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {DOCUMENTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-muted-foreground text-[11px]">Try conceptual thoughts:</span>
              {[
                "fear of slow response times destroying user confidence",
                "preventing runaway costs on large foundation models",
                "the danger of unverified database side-effects",
                "transitioning from consulting to self-serve developer software"
              ].map((queryText, i) => (
                <button
                  key={i}
                  onClick={() => setSearchQuery(queryText)}
                  className="px-2.5 py-1 bg-muted/50 hover:bg-muted rounded-full text-[11px] text-muted-foreground hover:text-foreground transition-colors border"
                >
                  "{queryText}"
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Ranked Matches */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                Semantic Matches ({results.length})
              </h2>
              <span className="text-xs text-muted-foreground">
                Ranked by conceptual similarity
              </span>
            </div>

            {results.length === 0 ? (
              <div className="p-8 border rounded-xl text-center text-muted-foreground">
                <p className="text-sm">No passages met the similarity threshold for this query.</p>
              </div>
            ) : (
              results.map((res, idx) => {
                const isHighMatch = res.score >= 80;
                return (
                  <Card
                    key={res.id}
                    className={`border transition-all ${
                      idx === 0
                        ? "border-primary bg-primary/5 ring-1 ring-primary/40 shadow-xs"
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={isHighMatch ? "default" : "secondary"}
                          className="font-mono text-xs px-2"
                        >
                          {res.score}% Match
                        </Badge>
                        <span className="text-[11px] text-muted-foreground font-mono">
                          Passage #{res.id}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-1 space-y-2">
                      <p className="text-xs leading-relaxed text-foreground">
                        "{res.text}"
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                        {res.themes.map((theme, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-muted rounded text-[10px] text-muted-foreground font-mono"
                          >
                            #{theme}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Right Column: Full Document Reading View */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Document Viewer: {doc.title}
              </h2>
              <span className="text-xs text-muted-foreground">{doc.author}</span>
            </div>

            <Card className="border shadow-xs bg-card">
              <CardContent className="p-6 space-y-6">
                <div className="border-b pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {doc.type}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-0.5">{doc.title}</h3>
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-foreground">
                  {doc.passages.map((p) => {
                    const match = results.find((r) => r.id === p.id);
                    const isTop = match && match.score >= 80;
                    return (
                      <div
                        key={p.id}
                        className={`p-3 rounded-lg border transition-all ${
                          isTop
                            ? "bg-amber-500/10 border-amber-500/40 font-medium"
                            : match
                            ? "bg-primary/5 border-primary/20"
                            : "bg-muted/10 border-transparent text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                          <span>Section {p.id}</span>
                          {match && (
                            <span className="font-mono text-primary font-bold">
                              {match.score}% Relevance
                            </span>
                          )}
                        </div>
                        <p>{p.text}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
