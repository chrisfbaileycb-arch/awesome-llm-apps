"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  ArrowRight,
  Copy,
  Check,
  FileCode,
  Sliders,
  TrendingUp,
  Cpu,
  Brain,
  ShieldAlert,
  Terminal,
  Zap,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";

interface ExampleSkill {
  id: string;
  name: string;
  icon: string;
  description: string;
  initialPrompt: string;
  scenarios: { id: number; title: string; input: string; criteria: string }[];
  evals: { id: number; name: string; target: string; weight: number }[];
  optimizedPrompt: string;
  iterations: {
    iteration: number;
    score: number;
    feedback: string;
    changes: string;
    passRate: number;
  }[];
}

const SKILL_TEMPLATES: ExampleSkill[] = [
  {
    id: "code-reviewer",
    name: "Code Security & Audit Agent",
    icon: "🛡️",
    description: "Evaluates pull requests for OWASP vulnerabilities, race conditions, and memory leaks.",
    initialPrompt: `You are a code reviewer. Check this pull request for bugs, security problems, and styling issues. Point out anything that looks unsafe or slow.`,
    scenarios: [
      {
        id: 1,
        title: "SQL Injection via Template Literal",
        input: "const query = `SELECT * FROM users WHERE id = '${req.params.id}'`;",
        criteria: "Flags direct interpolation and recommends parameterized prepared statement."
      },
      {
        id: 2,
        title: "Unbounded In-Memory Buffer",
        input: "const chunks = []; req.on('data', c => chunks.push(c));",
        criteria: "Detects memory exhaustion DOS vulnerability on large payloads."
      },
      {
        id: 3,
        title: "React Hook Stale Closure",
        input: "useEffect(() => { const timer = setInterval(() => setCount(count + 1), 1000); return () => clearInterval(timer); }, []);",
        criteria: "Identifies stale count closure and provides functional state updater setCount(prev => prev + 1)."
      }
    ],
    evals: [
      { id: 1, name: "Zero False Negative on SQLi", target: "Must identify SQL injection vulnerabilities with 100% precision", weight: 40 },
      { id: 2, name: "Actionable Drop-in Fixes", target: "Must provide ready-to-paste replacement code snippets", weight: 35 },
      { id: 3, name: "Severity Classification", target: "Must classify findings into CRITICAL, HIGH, MEDIUM, LOW", weight: 25 }
    ],
    optimizedPrompt: `---
name: code-security-auditor
description: Production-grade automated static security and architectural auditor for code changes.
---

# Role & Purpose
You are an expert static analysis security auditor. You evaluate pull requests strictly against OWASP Top 10, concurrency hazards, and memory leak vulnerabilities.

## Audit Workflow
1. Analyze all inputs for unvalidated external tainted data (SQL injection, XSS, SSRF, command execution).
2. Inspect lifecycle handlers and streams for unbounded buffer allocations or uncleaned listeners.
3. Review state concurrency: verify atomic operations and stale closure hygiene.

## Output Specification
For every identified defect, format as:
### [SEVERITY: CRITICAL | HIGH | MEDIUM | LOW] <Concise Title>
- **Location & Cause:** Exact lines and flaw description.
- **Vulnerability Impact:** Why this poses an operational or security risk.
- **Recommended Remediation:**
\`\`\`ts
// Correct, hardened implementation
\`\`\``,
    iterations: [
      {
        iteration: 1,
        score: 61,
        feedback: "Model detected SQLi but produced generic prose without severity ratings or drop-in code fixes.",
        changes: "Enforced markdown structure with required severity tags.",
        passRate: 66
      },
      {
        iteration: 2,
        score: 79,
        feedback: "Severity tags added, but stale closure in React was flagged as low priority instead of medium.",
        changes: "Added concurrency & React state lifecycle explicit checklist.",
        passRate: 83
      },
      {
        iteration: 3,
        score: 94,
        feedback: "All three benchmark scenarios passed with precise remediation blocks and zero hallucinations.",
        changes: "Refined prompt header metadata and concise negative constraints.",
        passRate: 100
      }
    ]
  },
  {
    id: "sql-architect",
    name: "SQL Performance Architect",
    icon: "🗄️",
    description: "Transforms slow queries with compound indexes, partition pruning, and execution plan hints.",
    initialPrompt: `Help optimize SQL queries. Tell the user how to rewrite slow queries so they run faster.`,
    scenarios: [
      {
        id: 1,
        title: "N+1 Query Elimination",
        input: "SELECT * FROM orders WHERE user_id = $1 (executed 1,000 times in a loop)",
        criteria: "Recommends single batch JOIN or IN clause with CTE."
      },
      {
        id: 2,
        title: "Full Table Scan on WHERE ILIKE '%term%'",
        input: "SELECT * FROM products WHERE name ILIKE '%laptop%'",
        criteria: "Suggests pg_trgm GIN index or tsvector full-text search index."
      }
    ],
    evals: [
      { id: 1, name: "Index Recommendations", target: "Explicit CREATE INDEX DDL with covering column suggestions", weight: 50 },
      { id: 2, name: "EXPLAIN ANALYZE Breakdown", target: "Explains cost estimation and sequential scan elimination", weight: 50 }
    ],
    optimizedPrompt: `You are a Principal Database Administrator specializing in PostgreSQL and MySQL query engine internals.

## Performance Checklist
1. Identify Seq Scans and recommend specific partial or composite B-Tree / GIN index DDL.
2. Eliminate subquery Cartesian products using Common Table Expressions (WITH queries) or correlated EXISTS.
3. Output query before vs after, along with projected buffer hit improvements.`,
    iterations: [
      {
        iteration: 1,
        score: 55,
        feedback: "Explained indexing conceptually without specific executable DDL.",
        changes: "Enforced concrete CREATE INDEX statements with column order rules.",
        passRate: 50
      },
      {
        iteration: 2,
        score: 82,
        feedback: "Provided DDL, but missed pg_trgm extension requirement for wildcard searches.",
        changes: "Injected Postgres trigram extension requirement in prompt rules.",
        passRate: 85
      },
      {
        iteration: 3,
        score: 97,
        feedback: "Full scenario coverage with benchmark-verified query rewrites and exact DDL.",
        changes: "Added edge case guard against over-indexing write-heavy tables.",
        passRate: 100
      }
    ]
  }
];

export default function SelfImprovingSkillsPage() {
  const [selectedSkillId, setSelectedSkillId] = useState<string>("code-reviewer");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [runningIteration, setRunningIteration] = useState<number>(1);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  const activeSkill = SKILL_TEMPLATES.find((s) => s.id === selectedSkillId) || SKILL_TEMPLATES[0];

  const handleSelectSkill = (skillId: string) => {
    setSelectedSkillId(skillId);
    const skill = SKILL_TEMPLATES.find((s) => s.id === skillId);
    if (skill) setCustomPrompt(skill.initialPrompt);
    setCurrentStep(1);
  };

  const startOptimization = () => {
    setCurrentStep(3);
    setIsOptimizing(true);
    setRunningIteration(1);

    setTimeout(() => {
      setRunningIteration(2);
      setTimeout(() => {
        setRunningIteration(3);
        setTimeout(() => {
          setIsOptimizing(false);
          setCurrentStep(4);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  const copyOptimized = () => {
    navigator.clipboard.writeText(activeSkill.optimizedPrompt);
    setCopied(true);
    toast.success("Optimized skill copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
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
              <span className="text-foreground font-medium">Self-Improving Agent Skills</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              Self-Improving Agent Skills Studio
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Harness an autonomous multi-agent loop (Evaluator → Critic → Mutator) that iterates against benchmarks to evolve your prompts into production-grade skills.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1 text-xs">
              Google ADK + Gemini Architecture
            </Badge>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { step: 1, label: "1. Skill & Prompt", desc: "Select base skill" },
            { step: 2, label: "2. Evals & Scenarios", desc: "Define gates" },
            { step: 3, label: "3. Optimization Loop", desc: "Mutate & evaluate" },
            { step: 4, label: "4. Evolved Result", desc: "Diff & export" }
          ].map((s) => (
            <div
              key={s.step}
              onClick={() => {
                if (s.step <= currentStep || currentStep === 4) setCurrentStep(s.step);
              }}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                currentStep === s.step
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : currentStep > s.step
                  ? "border-border bg-muted/40"
                  : "border-border opacity-60"
              }`}
            >
              <span className="font-semibold text-xs block text-foreground">{s.label}</span>
              <span className="text-[11px] text-muted-foreground">{s.desc}</span>
            </div>
          ))}
        </div>

        {/* STEP 1: Select or customize skill */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 border shadow-xs">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  Preset Skill Library
                </CardTitle>
                <CardDescription>Select an agent skill to optimize</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {SKILL_TEMPLATES.map((skill) => (
                  <div
                    key={skill.id}
                    onClick={() => handleSelectSkill(skill.id)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                      selectedSkillId === skill.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-medium text-sm">
                      <span>{skill.icon}</span>
                      <span>{skill.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border shadow-xs">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <span>{activeSkill.icon}</span>
                      {activeSkill.name} — Initial Prompt
                    </CardTitle>
                    <CardDescription>The current naive or unoptimized version</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">Baseline V1</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={customPrompt || activeSkill.initialPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={8}
                  className="font-mono text-sm leading-relaxed"
                />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    This prompt will be stress-tested against benchmark scenarios.
                  </span>
                  <Button onClick={() => setCurrentStep(2)}>
                    Continue to Evals <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* STEP 2: Configure Scenarios & Evals */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Test Scenarios */}
              <Card className="border shadow-xs">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    Test Scenarios ({activeSkill.scenarios.length})
                  </CardTitle>
                  <CardDescription>Adversarial inputs and edge-case code samples</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeSkill.scenarios.map((sc) => (
                    <div key={sc.id} className="p-3 bg-muted/40 border rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{sc.title}</span>
                        <Badge variant="secondary" className="text-[10px]">Case #{sc.id}</Badge>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground bg-background p-2 rounded border truncate">
                        {sc.input}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        <strong className="text-foreground">Passing condition:</strong> {sc.criteria}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Evaluation Criteria */}
              <Card className="border shadow-xs">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-500" />
                    Evaluation Gates ({activeSkill.evals.length})
                  </CardTitle>
                  <CardDescription>Quantitative quality and safety thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeSkill.evals.map((ev) => (
                    <div key={ev.id} className="p-3 bg-muted/40 border rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{ev.name}</span>
                        <span className="font-mono text-primary font-bold">{ev.weight}% Weight</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{ev.target}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center p-4 bg-muted/20 border rounded-xl">
              <div>
                <h4 className="text-sm font-semibold">Ready to trigger self-improvement loop</h4>
                <p className="text-xs text-muted-foreground">
                  3 agent loops will simulate execution, compute pass scores, and synthesize prompt mutations.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
                <Button onClick={startOptimization} className="bg-primary hover:bg-primary/90">
                  <Play className="w-4 h-4 mr-1.5" />
                  Launch Evolution Loop
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Live Running Loop */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card className="border shadow-xs">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
                      Multi-Agent Optimization Engine Active
                    </CardTitle>
                    <CardDescription>Simulating scenario execution and evolving prompt constraints</CardDescription>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    Iteration {runningIteration} of 3
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Visual Chart Representation */}
                <div className="p-4 bg-muted/30 border rounded-xl space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground block">
                    Score Trajectory Progression
                  </span>
                  <div className="h-28 flex items-end gap-6 pt-4 px-4">
                    {activeSkill.iterations.map((it) => {
                      const isActive = it.iteration <= runningIteration;
                      const height = `${it.score}%`;
                      return (
                        <div key={it.iteration} className="flex-1 flex flex-col items-center gap-2">
                          <span className={`text-xs font-mono font-bold ${isActive ? "text-primary" : "text-muted-foreground/40"}`}>
                            {isActive ? `${it.score}%` : "--"}
                          </span>
                          <div className="w-full bg-muted rounded-t-md h-20 flex items-end">
                            <div
                              className={`w-full transition-all duration-700 rounded-t-md ${
                                isActive ? "bg-primary" : "bg-muted"
                              }`}
                              style={{ height: isActive ? height : "0%" }}
                            />
                          </div>
                          <span className="text-[11px] text-muted-foreground">Loop #{it.iteration}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Iteration logs */}
                <div className="space-y-3 font-mono text-xs">
                  {activeSkill.iterations.slice(0, runningIteration).map((it) => (
                    <div key={it.iteration} className="p-3 bg-muted/40 border rounded-lg space-y-1">
                      <div className="flex items-center justify-between text-foreground font-semibold">
                        <span>▶ Iteration {it.iteration} Analysis:</span>
                        <span className="text-emerald-500">{it.passRate}% Scenario Pass Rate</span>
                      </div>
                      <p className="text-muted-foreground text-[11px]">
                        <strong>Critic Note:</strong> {it.feedback}
                      </p>
                      <p className="text-primary text-[11px]">
                        <strong>Mutation Applied:</strong> {it.changes}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* STEP 4: Results & Diff */}
        {currentStep === 4 && (
          <div className="space-y-6">
            {/* Success KPI Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Card className="border p-4 bg-emerald-500/10 border-emerald-500/30">
                <span className="text-xs text-muted-foreground block">Final Benchmark Score</span>
                <span className="text-2xl font-bold font-mono text-emerald-600">94 / 100</span>
                <span className="text-[10px] text-emerald-600/80 block mt-1">+33 pts from Baseline</span>
              </Card>
              <Card className="border p-4">
                <span className="text-xs text-muted-foreground block">Scenario Pass Rate</span>
                <span className="text-2xl font-bold font-mono text-foreground">100%</span>
                <span className="text-[10px] text-muted-foreground block mt-1">3 of 3 Test Cases Passed</span>
              </Card>
              <Card className="border p-4">
                <span className="text-xs text-muted-foreground block">Hallucination Resistance</span>
                <span className="text-2xl font-bold font-mono text-foreground">High</span>
                <span className="text-[10px] text-muted-foreground block mt-1">Grounded against OWASP rules</span>
              </Card>
              <Card className="border p-4">
                <span className="text-xs text-muted-foreground block">Iterations Taken</span>
                <span className="text-2xl font-bold font-mono text-foreground">3 Loops</span>
                <span className="text-[10px] text-muted-foreground block mt-1">Converged cleanly</span>
              </Card>
            </div>

            {/* Prompt Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border shadow-xs">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">Baseline Initial Prompt</CardTitle>
                    <Badge variant="secondary" className="text-[10px]">Score: 61%</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="p-3 bg-muted/30 border rounded-lg text-xs font-mono whitespace-pre-wrap text-muted-foreground">
                    {activeSkill.initialPrompt}
                  </pre>
                </CardContent>
              </Card>

              <Card className="border shadow-xs border-primary/30">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-primary">
                      Evolved Optimized Skill Prompt
                    </CardTitle>
                    <Badge variant="default" className="text-[10px] bg-primary">Score: 94%</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-xs font-mono whitespace-pre-wrap text-foreground">
                    {activeSkill.optimizedPrompt}
                  </pre>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border rounded-xl bg-card">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">
                  Skill evolved and validated against benchmark test suites.
                </span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  Optimize Another Skill
                </Button>
                <Button onClick={copyOptimized}>
                  {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
                  {copied ? "Copied!" : "Copy SKILL.md"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
