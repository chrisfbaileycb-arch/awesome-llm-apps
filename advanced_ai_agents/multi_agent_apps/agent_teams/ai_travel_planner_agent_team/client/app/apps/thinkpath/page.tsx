"use client";

import React, { useState } from "react";
import {
  Brain,
  GitBranch,
  Send,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Lightbulb,
  Scale,
  CheckCircle2,
  RotateCcw,
  Bot,
  User,
  Zap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface ThinkingPath {
  id: string;
  name: string;
  icon: string;
  hypothesis: string;
  steps: string[];
  verdict: string;
}

interface Message {
  sender: "user" | "bot";
  text: string;
  paths?: ThinkingPath[];
  consensus?: string;
}

const PRESET_QUESTIONS = [
  "Should our engineering team migrate from a Postgres monolith to microservices?",
  "How should an autonomous agent handle uncertain tool responses without hallucinating?",
  "Should we implement token-based pricing or user-seat subscription for our AI product?"
];

export default function ThinkPathChatPage() {
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Welcome to ThinkPath Guided Reasoning. Enter any complex architecture, strategy, or technical question to inspect how the LLM explores parallel reasoning hypotheses before synthesizing a conclusion."
    }
  ]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [activePathTab, setActivePathTab] = useState<string>("deductive");

  const generateThoughtPaths = (query: string): { paths: ThinkingPath[]; consensus: string } => {
    return {
      paths: [
        {
          id: "deductive",
          name: "Path A: First-Principles Deductive",
          icon: "📐",
          hypothesis: "Evaluate formal boundaries, computational blast radius, and network transaction boundaries.",
          steps: [
            "Step 1: Compute network latency overhead of inter-service RPC hops against database roundtrips.",
            "Step 2: Inspect cross-domain data consistency guarantees (ACID transactions vs eventual consistency).",
            "Step 3: Measure organizational Conway's Law alignment against current team headcounts."
          ],
          verdict: "A modular monolith with strict domain boundaries is optimal until team size exceeds 45 engineers."
        },
        {
          id: "creative",
          name: "Path B: Lateral & Counterfactual",
          icon: "💡",
          hypothesis: "Explore hybrid and serverless primitives that decouple compute without distributing data stores.",
          steps: [
            "Step 1: Consider read-replica routing and CQRS read projections before splitting write authorities.",
            "Step 2: Evaluate asynchronous event queues (Kafka / BullMQ) to offload heavy background workloads.",
            "Step 3: Use database logical schemas as isolated boundaries without running multiple database instances."
          ],
          verdict: "Extract only high-throughput worker pipelines into isolated workers; retain unified state stores."
        },
        {
          id: "adversarial",
          name: "Path C: Devil's Advocate & Risk Auditor",
          icon: "⚖️",
          hypothesis: "Stress-test the catastrophic failure modes and hidden operational costs.",
          steps: [
            "Step 1: Distributed transactions require 2-Phase Commit or Saga patterns, increasing bug surface area 4x.",
            "Step 2: Distributed tracing and telemetry observability tooling adds significant vendor overhead.",
            "Step 3: Premature decoupling frequently leads to distributed monoliths where releases remain coupled."
          ],
          verdict: "Extreme caution: 80% of microservice migrations under 30 developers fail to yield velocity gains."
        }
      ],
      consensus: `**Synthesized Architectural Recommendation:**
Maintain a **Modular Monolith** architecture with strict interface boundaries and decoupled read models. Do not distribute operational databases into microservices until team size or independent scaling requirements strictly demand it. Offload heavy asynchronous background compute into dedicated queue workers to preserve latency.`
    };
  };

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputPrompt;
    if (!q.trim()) return;

    const userMsg: Message = { sender: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsThinking(true);

    setTimeout(() => {
      const { paths, consensus } = generateThoughtPaths(q);
      const botMsg: Message = {
        sender: "bot",
        text: `I have explored 3 concurrent reasoning paths to evaluate your question from deductive, lateral, and adversarial perspectives.`,
        paths,
        consensus
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 900);
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
              <span className="text-foreground font-medium">ThinkPath Guided Chat</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              ThinkPath Guided Reasoning Chat
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Transparent multi-path chain-of-thought exploration. See how models stress-test parallel hypotheses before finalizing synthesis.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Branching Reasoning & Consensus Engine
            </Badge>
          </div>
        </div>

        {/* Chat Stream & Thought Inspector */}
        <div className="space-y-6">
          {messages.map((m, idx) => (
            <div key={idx} className="space-y-4">
              <div className={`flex items-start gap-3 ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  m.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground border"
                }`}>
                  {m.sender === "user" ? "You" : "AI"}
                </div>
                <div className={`max-w-2xl p-4 rounded-xl text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-xs"
                    : "bg-card border text-foreground rounded-tl-xs shadow-xs"
                }`}>
                  {m.text}
                </div>
              </div>

              {/* If message includes Thinking Paths */}
              {m.paths && (
                <div className="ml-11 max-w-4xl space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {m.paths.map((path) => (
                      <Card
                        key={path.id}
                        onClick={() => setActivePathTab(path.id)}
                        className={`border cursor-pointer transition-all ${
                          activePathTab === path.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary shadow-xs"
                            : "border-border hover:bg-muted/30"
                        }`}
                      >
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-xs font-bold flex items-center gap-1.5">
                            <span>{path.icon}</span>
                            <span className="truncate">{path.name}</span>
                          </CardTitle>
                          <CardDescription className="text-[11px] line-clamp-2">
                            {path.hypothesis}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-1 space-y-2">
                          <div className="text-[10px] space-y-1 text-muted-foreground bg-muted/40 p-2 rounded">
                            {path.steps.map((st, i) => (
                              <div key={i} className="truncate">
                                {st}
                              </div>
                            ))}
                          </div>
                          <div className="pt-1 text-[11px] font-semibold text-foreground border-t">
                            <span className="text-muted-foreground font-normal block text-[10px]">Outcome:</span>
                            {path.verdict}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Consensus Synthesis Card */}
                  {m.consensus && (
                    <Card className="border border-emerald-500/30 bg-emerald-500/5 shadow-xs">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          Multi-Path Synthesized Consensus
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-xs leading-relaxed whitespace-pre-line text-foreground">
                        {m.consensus}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-3 ml-11 text-xs text-muted-foreground animate-pulse">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Exploring parallel deductive, lateral, and adversarial reasoning branches...</span>
            </div>
          )}
        </div>

        {/* Input Bar with Presets */}
        <Card className="border shadow-xs sticky bottom-4">
          <CardContent className="p-4 space-y-3">
            <div className="flex gap-2">
              <Input
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Ask any complex dilemma, architecture question, or decision..."
                className="h-11 text-sm"
              />
              <Button onClick={() => handleSend()} disabled={!inputPrompt || isThinking}>
                <Send className="w-4 h-4 mr-1.5" />
                Explore Paths
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-muted-foreground text-[11px]">Popular prompts:</span>
              {PRESET_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 bg-muted/40 hover:bg-muted rounded-full text-[11px] text-muted-foreground hover:text-foreground transition-colors border truncate max-w-xs"
                >
                  {q}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
