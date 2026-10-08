"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  PieChart,
  BarChart2,
  Volume2,
  Tv,
  ArrowRight,
  ShieldCheck,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface AnalystSignal {
  timecode: string;
  seconds: number;
  type: "BEAT" | "RISK" | "GUIDANCE" | "EVASION";
  title: string;
  summary: string;
  speaker: string;
  confidence: number;
}

interface CompanyBrief {
  symbol: string;
  name: string;
  quarter: string;
  revenueReported: string;
  revenueConsensus: string;
  epsReported: string;
  epsConsensus: string;
  evasionScore: string;
  signals: AnalystSignal[];
}

const BRIEF_DATA: CompanyBrief[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    quarter: "Q3 Fiscal Year",
    revenueReported: "$35.1B (+94% YoY)",
    revenueConsensus: "$33.2B",
    epsReported: "$0.81",
    epsConsensus: "$0.75",
    evasionScore: "Low (Direct & Transparent)",
    signals: [
      {
        timecode: "04:15",
        seconds: 255,
        type: "BEAT",
        title: "Data Center Blackwell Revenue Acceleration",
        summary: "CFO highlights Blackwell production ramping faster than anticipated with hyperscalers absorbing all initial allocation.",
        speaker: "Colette Kress (CFO)",
        confidence: 96
      },
      {
        timecode: "11:40",
        seconds: 700,
        type: "GUIDANCE",
        title: "Gross Margin Normalization Around 73%",
        summary: "Management guides gross margins slightly lower temporarily due to early-stage ramp costs before recovering to mid-75% in H2.",
        speaker: "Jensen Huang (CEO)",
        confidence: 92
      },
      {
        timecode: "22:10",
        seconds: 1330,
        type: "EVASION",
        title: "Sovereign AI Revenue Run-Rate Question Sidestepped",
        summary: "Analyst pushed on Middle East sovereign cloud revenue caps; CEO focused on European data sovereignty rather than giving exact run-rate figures.",
        speaker: "Jensen Huang (CEO)",
        confidence: 88
      },
      {
        timecode: "34:50",
        seconds: 2090,
        type: "RISK",
        title: "Packaging Supply Chain Bottlenecks (CoWoS)",
        summary: "TSMC advanced packaging capacity remains the primary ceiling factor through the next two quarters.",
        speaker: "Colette Kress (CFO)",
        confidence: 94
      }
    ]
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    quarter: "Q2 Fiscal Year",
    revenueReported: "$65.6B (+16% YoY)",
    revenueConsensus: "$64.5B",
    epsReported: "$3.30",
    epsConsensus: "$3.10",
    evasionScore: "Moderate (Capex ROI guarded)",
    signals: [
      {
        timecode: "06:20",
        seconds: 380,
        type: "BEAT",
        title: "Azure Cloud Growth Hits 33% Constant Currency",
        summary: "Azure growth driven by 12 points of direct generative AI workloads across enterprise accounts.",
        speaker: "Amy Hood (CFO)",
        confidence: 97
      },
      {
        timecode: "18:30",
        seconds: 1110,
        type: "RISK",
        title: "Datacenter Capex Projected to Rise to $19B/Quarter",
        summary: "Heavy investment in GPU infrastructure and long-term land leases creating depreciation headwind.",
        speaker: "Satya Nadella (CEO)",
        confidence: 91
      }
    ]
  }
];

export default function EarningsCallAnalystPage() {
  const [selectedBrief, setSelectedBrief] = useState<CompanyBrief>(BRIEF_DATA[0]);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const totalDuration = 2400; // 40 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 25;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeSignals = selectedBrief.signals.filter((s) => s.seconds <= currentTimeSec);

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
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
              <span className="text-foreground font-medium">Earnings Call Analyst</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              Earnings Call Analyst Cockpit
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Playback-synced financial intelligence overlay. Detects guidance surprises, capex inflection points, and executive evasion flags in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {BRIEF_DATA.map((b) => (
              <Button
                key={b.symbol}
                variant={selectedBrief.symbol === b.symbol ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedBrief(b);
                  setCurrentTimeSec(0);
                  setIsPlaying(false);
                }}
              >
                ${b.symbol} ({b.name})
              </Button>
            ))}
          </div>
        </div>

        {/* Financial KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border p-4 bg-muted/20">
            <span className="text-xs text-muted-foreground block">Reported Revenue</span>
            <span className="text-lg font-bold font-mono text-emerald-600">
              {selectedBrief.revenueReported}
            </span>
            <span className="text-[10px] text-muted-foreground block">
              Consensus: {selectedBrief.revenueConsensus}
            </span>
          </Card>
          <Card className="border p-4 bg-muted/20">
            <span className="text-xs text-muted-foreground block">Diluted EPS</span>
            <span className="text-lg font-bold font-mono text-emerald-600">
              {selectedBrief.epsReported}
            </span>
            <span className="text-[10px] text-muted-foreground block">
              Consensus: {selectedBrief.epsConsensus}
            </span>
          </Card>
          <Card className="border p-4 bg-muted/20">
            <span className="text-xs text-muted-foreground block">Q&A Evasion Index</span>
            <span className="text-lg font-bold font-mono text-foreground">
              {selectedBrief.evasionScore.split(" ")[0]}
            </span>
            <span className="text-[10px] text-muted-foreground block">
              {selectedBrief.evasionScore}
            </span>
          </Card>
          <Card className="border p-4 bg-muted/20">
            <span className="text-xs text-muted-foreground block">Analyst Signals Detected</span>
            <span className="text-lg font-bold font-mono text-primary">
              {selectedBrief.signals.length} Flags
            </span>
            <span className="text-[10px] text-muted-foreground block">
              Audited by Multi-Agent Transcriber
            </span>
          </Card>
        </div>

        {/* Cockpit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Synchronized Playback Deck */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="border shadow-xs bg-card overflow-hidden">
              <div className="aspect-video bg-neutral-950 flex flex-col items-center justify-center p-6 text-center text-white relative">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <Tv className="w-8 h-8 text-white/80" />
                </div>
                <h3 className="font-semibold text-base">{selectedBrief.name}</h3>
                <span className="text-xs text-white/60 mt-0.5">{selectedBrief.quarter} Earnings Webcast</span>

                {/* Live Overlaid Status */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono tracking-wider uppercase text-white/80">
                    {isPlaying ? "Live Analysis" : "Paused"}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-mono bg-black/60 px-2 py-1 rounded text-white/80">
                    {formatSec(currentTimeSec)} / {formatSec(totalDuration)}
                  </span>
                </div>
              </div>

              {/* Scrubber & Controls */}
              <CardContent className="p-4 space-y-4">
                <div className="space-y-1">
                  <input
                    type="range"
                    min={0}
                    max={totalDuration}
                    value={currentTimeSec}
                    onChange={(e) => setCurrentTimeSec(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{formatSec(currentTimeSec)}</span>
                    <span>{formatSec(totalDuration)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-4 h-4 mr-1.5" /> : <Play className="w-4 h-4 mr-1.5" />}
                      {isPlaying ? "Pause Stream" : "Simulate Playback"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentTimeSec(0)}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentTimeSec(totalDuration)}
                    className="text-xs"
                  >
                    Jump to End (Reveal All)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Timestamped Analyst Signal Stream */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Live Analyst Signal Stream ({activeSignals.length} of {selectedBrief.signals.length} revealed)
              </h2>
              <span className="text-xs text-muted-foreground">
                Signals trigger synchronously
              </span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {activeSignals.length === 0 ? (
                <div className="p-8 border rounded-xl text-center text-muted-foreground">
                  <p className="text-sm font-medium">Waiting for call timecode to reach first key moment...</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hit "Simulate Playback" or scrub forward on the timeline.
                  </p>
                </div>
              ) : (
                activeSignals.map((sig, i) => {
                  const badgeColor =
                    sig.type === "BEAT"
                      ? "bg-emerald-500 text-white"
                      : sig.type === "RISK"
                      ? "bg-destructive text-white"
                      : sig.type === "EVASION"
                      ? "bg-amber-500 text-white"
                      : "bg-blue-500 text-white";

                  return (
                    <Card key={i} className="border shadow-xs hover:bg-muted/20 transition-colors">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${badgeColor}`}>
                              {sig.type}
                            </span>
                            <span className="font-mono text-xs font-semibold text-muted-foreground">
                              @{sig.timecode}
                            </span>
                          </div>
                          <span className="text-[11px] text-muted-foreground">
                            {sig.confidence}% Confidence
                          </span>
                        </div>
                        <CardTitle className="text-sm font-bold mt-1">
                          {sig.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-1 space-y-2">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {sig.summary}
                        </p>
                        <div className="text-[11px] font-medium text-foreground pt-1 border-t">
                          Speaker: {sig.speaker}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
