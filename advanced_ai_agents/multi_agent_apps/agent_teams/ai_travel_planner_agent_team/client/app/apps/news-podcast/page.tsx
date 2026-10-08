"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Radio,
  Play,
  Pause,
  Volume2,
  Sparkles,
  Newspaper,
  Mic,
  Music,
  Share2,
  ExternalLink,
  RotateCcw,
  Headphones,
  CheckCircle2,
  Clock,
  Flame,
  ListFilter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  source: string;
  category: "Agents" | "Multimodal" | "Infrastructure" | "Open-Source";
  readTime: string;
  published: string;
  summary: string;
  sentiment: "Bullish" | "Neutral" | "Cautious";
  podcastScript: {
    speaker: "Alex" | "Morgan" | "Narrator";
    text: string;
    soundFx?: string;
  }[];
}

const FEED_ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Autonomous Agent Teams Surpass Single-Prompt Reasoning in Complex Workflows",
    source: "ArXiv AI Research",
    category: "Agents",
    readTime: "4 min read",
    published: "Today, 09:30 AM",
    summary: "New benchmarks indicate that specialized multi-agent architectures (Planner, Executor, Critic) achieve 89% task completion on software engineering benchmarks, outperforming monolithic single-prompt models by 34%.",
    sentiment: "Bullish",
    podcastScript: [
      { speaker: "Narrator", text: "Welcome to Beifong AI Dispatch, bringing you today's highest-signal intelligence.", soundFx: "♪ Upbeat tech synth intro ♪" },
      { speaker: "Alex", text: "Hey Morgan, did you see the new multi-agent benchmark papers dropping this morning? It looks like the debate over monolithic prompts versus specialized teams is basically settled." },
      { speaker: "Morgan", text: "I did. What surprised me wasn't just the 89% score—it was where the monolithic models broke down. Turns out they get cognitive fatigue when context exceeds 50,000 tokens." },
      { speaker: "Alex", text: "Exactly. When you decouple the planner from the code generator, the critic can run sanity checks without poisoning the main reasoning cache.", soundFx: "⌨ Keyboard click soundbite ⌨" },
      { speaker: "Morgan", text: "Which means developers don't need to wait for a 2-trillion parameter model when an orchestrated cluster of nimble 8-billion parameter models can out-execute it for a fraction of the inference cost." },
      { speaker: "Alex", text: "That wraps today's dispatch. Keep building, and stay curious." }
    ]
  },
  {
    id: "art-2",
    title: "Gemini Embedding 2 Delivers Native Zero-Shot Multimodal Video Search",
    source: "Google DeepMind Engineering",
    category: "Multimodal",
    readTime: "3 min read",
    published: "Yesterday",
    summary: "Unified embedding spaces now allow arbitrary text queries to match precise timestamped video frames across hours of unindexed raw footage with sub-second retrieval latencies.",
    sentiment: "Bullish",
    podcastScript: [
      { speaker: "Narrator", text: "Beifong AI Dispatch: Special Report on Multimodal Retrieval.", soundFx: "♪ Futuristic chime ♪" },
      { speaker: "Morgan", text: "Alex, searching video has historically been miserable. You either transcribed the speech or had humans manually tag keyframes. But this changes everything." },
      { speaker: "Alex", text: "Yeah, unified vector spaces map pixels directly onto conceptual text vectors. You can search for 'reluctant handshake' or 'overcast sunset behind an airplane' and it pinpoints the exact second." },
      { speaker: "Morgan", text: "The architectural leap here is that video isn't being converted to text first—it understands visual semantics natively." },
      { speaker: "Alex", text: "Massive implications for security, video production, and autonomous surveillance." }
    ]
  },
  {
    id: "art-3",
    title: "Local LLM Execution Speeds Double with Speculative Decoding & Quantization",
    source: "Hacker News & GitHub Trending",
    category: "Open-Source",
    readTime: "5 min read",
    published: "2 days ago",
    summary: "Small draft models drafting tokens for larger target models allow local workstations to run 70B parameter models at 45 tokens per second on consumer hardware.",
    sentiment: "Neutral",
    podcastScript: [
      { speaker: "Narrator", text: "Beifong AI Dispatch: Local Compute Breakthroughs.", soundFx: "♪ Upbeat intro ♪" },
      { speaker: "Alex", text: "Speculative decoding has gone from academic novelty to standard production tool. We are seeing consumer laptops hit 45 tokens per second on 70B models." },
      { speaker: "Morgan", text: "Explain the mechanic for listeners who haven't dug into the code." },
      { speaker: "Alex", text: "Think of it like a lightning-fast junior assistant drafting 5 words ahead, and the senior genius model only approves or rejects the sequence in parallel in a single forward pass." },
      { speaker: "Morgan", text: "So zero loss in model intelligence, but double the generation throughput. Incredible." }
    ]
  }
];

export default function NewsPodcastStudioPage() {
  const [selectedArticleId, setSelectedArticleId] = useState<string>("art-1");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const article = FEED_ARTICLES.find((a) => a.id === selectedArticleId) || FEED_ARTICLES[0];
  const totalLines = article.podcastScript.length;

  useEffect(() => {
    setIsPlaying(false);
    setCurrentLineIndex(0);
    setPlaybackProgress(0);
  }, [selectedArticleId]);

  // Audio simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const next = prev + 1.8;
          const nextIndex = Math.min(
            totalLines - 1,
            Math.floor((next / 100) * totalLines)
          );
          setCurrentLineIndex(nextIndex);
          return next;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalLines]);

  const togglePlay = () => {
    if (playbackProgress >= 100) {
      setPlaybackProgress(0);
      setCurrentLineIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const filteredArticles =
    activeCategory === "All"
      ? FEED_ARTICLES
      : FEED_ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link href="/" className="hover:underline">Awesome LLM Apps</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Beifong AI News & Podcasts</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Radio className="w-8 h-8 text-primary" />
              Beifong News & Dual-Host Podcast Studio
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Autonomous information ingestion pipeline with real-time multi-agent scriptwriting and dynamic dual-host audio narration.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Autonomous Ingestion & Synthesis Engine
            </Badge>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Curated News Stream */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-primary" />
                Curated AI Feeds
              </h2>
              <div className="flex gap-1">
                {["All", "Agents", "Multimodal", "Open-Source"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredArticles.map((art) => (
                <Card
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`border cursor-pointer transition-all ${
                    selectedArticleId === art.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary shadow-xs"
                      : "border-border hover:bg-muted/40"
                  }`}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span className="font-semibold text-primary">{art.source}</span>
                      <span>{art.published}</span>
                    </div>
                    <CardTitle className="text-sm font-semibold leading-snug">
                      {art.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-2">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {art.summary}
                    </p>
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t">
                      <Badge variant="secondary" className="text-[10px] py-0">
                        {art.category}
                      </Badge>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {art.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column: Podcast Broadcast Studio */}
          <div className="lg:col-span-7 space-y-6">
            {/* Podcast Player Bar */}
            <Card className="border shadow-xs bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold">
                        Beifong AI Dispatch Episode
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Featuring Alex (Lead Analyst) & Morgan (Co-Host)
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={isPlaying ? "default" : "outline"} className="text-xs">
                    {isPlaying ? "On Air" : "Ready"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Waveform Visualizer */}
                <div className="p-4 bg-muted/40 rounded-xl space-y-3">
                  <div className="h-12 flex items-center justify-between gap-1 px-2">
                    {[12, 28, 42, 65, 84, 52, 33, 76, 92, 45, 23, 67, 88, 95, 60, 40, 75, 55, 30, 68, 85, 48, 20, 60].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          isPlaying
                            ? (i / 24) * 100 <= playbackProgress
                              ? "bg-primary"
                              : "bg-muted-foreground/30"
                            : "bg-muted-foreground/20"
                        }`}
                        style={{
                          height: isPlaying ? `${Math.max(15, (h * (0.6 + Math.random() * 0.4)))}%` : `${h * 0.4}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Scrubber */}
                  <div className="space-y-1">
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${playbackProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                      <span>00:{Math.floor(playbackProgress * 0.6).toString().padStart(2, "0")}</span>
                      <span>01:00</span>
                    </div>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={togglePlay}
                      size="sm"
                      className="h-10 px-4 rounded-full font-medium"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" /> Pause Broadcast
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" /> Play Episode
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPlaybackProgress(0);
                        setCurrentLineIndex(0);
                      }}
                      className="h-10 px-3 rounded-full"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Volume2 className="w-4 h-4" />
                    <span>Stereo Dual-Host</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Script Teleprompter */}
            <Card className="border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Mic className="w-4 h-4 text-primary" />
                  Live Episode Script
                </CardTitle>
                <CardDescription className="text-xs">
                  Active speaker and dialogue cues highlight in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[380px] overflow-y-auto">
                {article.podcastScript.map((line, idx) => {
                  const isCurrent = idx === currentLineIndex;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border transition-all text-xs leading-relaxed ${
                        isCurrent
                          ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary/40"
                          : "border-border/50 bg-card text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold flex items-center gap-1.5 ${
                          isCurrent ? "text-primary" : "text-foreground"
                        }`}>
                          {line.speaker === "Alex" ? "🎙️ Alex" : line.speaker === "Morgan" ? "🎙️ Morgan" : "📢 Narrator"}
                        </span>
                        {line.soundFx && (
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono italic">
                            {line.soundFx}
                          </span>
                        )}
                      </div>
                      <p className={isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}>
                        {line.text}
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
