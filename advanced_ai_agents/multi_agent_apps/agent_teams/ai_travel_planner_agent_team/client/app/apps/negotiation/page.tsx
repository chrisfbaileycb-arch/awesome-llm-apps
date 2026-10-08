"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Swords,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Handshake,
  XCircle,
  Trophy,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Send,
  User,
  Bot,
  Car,
  Guitar,
  Home as HomeIcon,
  Watch,
  Flame,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Scenario {
  id: string;
  title: string;
  emoji: string;
  item: string;
  condition: string;
  askingPrice: number;
  fairMarketValue: number;
  buyerBudget: number;
  sellerMinimum: number;
  description: string;
  buyerContext: string;
  sellerContext: string;
}

interface Personality {
  id: string;
  name: string;
  emoji: string;
  role: "buyer" | "seller";
  tagline: string;
  style: string;
  concessionSpeed: "aggressive" | "balanced" | "stubborn";
}

interface NegotiationRound {
  round: number;
  speaker: "buyer" | "seller";
  name: string;
  emoji: string;
  action: "offer" | "counter" | "accept" | "reject" | "walk";
  amount: number;
  message: string;
  tactic: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "civic",
    title: "The Craigslist Showdown",
    emoji: "🚗",
    item: "2019 Honda Civic EX (45,000 mi)",
    condition: "Excellent, single owner, minor bumper scuff",
    askingPrice: 15500,
    fairMarketValue: 14000,
    buyerBudget: 13500,
    sellerMinimum: 12800,
    description: "Classic private-party car sale. Buyer has a new job commute; seller needs down payment for an SUV.",
    buyerContext: "Commute is 25 miles; saved $13,000 with a $500 buffer. Needs to drive to work by Monday.",
    sellerContext: "Already placed a deposit on an SUV. Wants to close quickly but wants top dollar."
  },
  {
    id: "guitar",
    title: "The Vintage Axe",
    emoji: "🎸",
    item: "1978 Fender Stratocaster",
    condition: "Very Good, CBS-era pickups, authentic patina",
    askingPrice: 8500,
    fairMarketValue: 7500,
    buyerBudget: 7200,
    sellerMinimum: 6400,
    description: "Session guitarist hunting for iconic tone at a boutique vintage instrument dealer.",
    buyerContext: "Recording session next week with major producer. Budget capped at $7,200.",
    sellerContext: "Acquired at estate sale for $4,500. Floor space is expensive; has held it for 90 days."
  },
  {
    id: "sublet",
    title: "The Downtown Sublet",
    emoji: "🏠",
    item: "Furnished Studio Loft (3 Months)",
    condition: "Renovated, walkable to tech district, roof deck",
    askingPrice: 2400,
    fairMarketValue: 2100,
    buyerBudget: 1950,
    sellerMinimum: 1750,
    description: "Summer tech intern negotiating monthly rent against a homeowner leaving for Europe.",
    buyerContext: "Internship starts in 10 days. Has housing stipend but wants to preserve savings.",
    sellerContext: "Leaving the country in a week. Empty apartment means paying double rent."
  },
  {
    id: "rolex",
    title: "Vintage Submariner",
    emoji: "⌚",
    item: "1982 Rolex Submariner Date (Ref 16800)",
    condition: "Box & papers, tritium dial, recently serviced",
    askingPrice: 13200,
    fairMarketValue: 12000,
    buyerBudget: 11500,
    sellerMinimum: 10800,
    description: "Collector duel over a neo-vintage luxury dive watch with unpolished case bevels.",
    buyerContext: "Has cash in hand, looking for investment-grade daily wearer.",
    sellerContext: "Consignment piece with room to negotiate before upcoming auction."
  }
];

const BUYER_PERSONALITIES: Personality[] = [
  {
    id: "alex",
    name: "Analytical Alex",
    emoji: "🧮",
    role: "buyer",
    tagline: "Quotes market data, KBB comps, and depreciation formulas.",
    style: "Rational & fact-driven",
    concessionSpeed: "balanced"
  },
  {
    id: "casey",
    name: "Cool-Hand Casey",
    emoji: "😎",
    role: "buyer",
    tagline: "Master of the walkaway bluff and strategic silence.",
    style: "Unflappable poker face",
    concessionSpeed: "stubborn"
  },
  {
    id: "dan",
    name: "Desperate Dan",
    emoji: "😰",
    role: "buyer",
    tagline: "High urgency, reveals emotion easily, caves under tight deadlines.",
    style: "Emotional & eager",
    concessionSpeed: "aggressive"
  },
  {
    id: "fran",
    name: "Fair-Deal Fran",
    emoji: "🤝",
    role: "buyer",
    tagline: "Values mutual respect, looks for win-win compromise.",
    style: "Collaborative & warm",
    concessionSpeed: "balanced"
  }
];

const SELLER_PERSONALITIES: Personality[] = [
  {
    id: "steve",
    name: "Shark Steve",
    emoji: "🦈",
    role: "seller",
    tagline: "Never yields more than 3%. Take-it-or-leave-it demeanor.",
    style: "Hardball & unyielding",
    concessionSpeed: "stubborn"
  },
  {
    id: "sam",
    name: "Sentimental Sam",
    emoji: "🥹",
    role: "seller",
    tagline: "Deep emotional attachment to the item, cares about who buys it.",
    style: "Nostalgic & selective",
    concessionSpeed: "balanced"
  },
  {
    id: "carl",
    name: "Quick-Cash Carl",
    emoji: "⚡",
    role: "seller",
    tagline: "Needs liquid cash immediately, highly motivated to close today.",
    style: "Fast-moving liquidator",
    concessionSpeed: "aggressive"
  },
  {
    id: "penny",
    name: "Pragmatic Penny",
    emoji: "⚖️",
    role: "seller",
    tagline: "Keeps margins healthy, respectful but calculated.",
    style: "Business-first pragmatist",
    concessionSpeed: "balanced"
  }
];

export default function NegotiationBattlePage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("civic");
  const [selectedBuyerId, setSelectedBuyerId] = useState<string>("alex");
  const [selectedSellerId, setSelectedSellerId] = useState<string>("steve");
  const [mode, setMode] = useState<"ai_vs_ai" | "user_buyer">("ai_vs_ai");
  const [customUserOffer, setCustomUserOffer] = useState<string>("");
  const [customUserMessage, setCustomUserMessage] = useState<string>("");

  const [rounds, setRounds] = useState<NegotiationRound[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [status, setStatus] = useState<"setup" | "negotiating" | "deal" | "no_deal">("setup");
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const buyer = BUYER_PERSONALITIES.find((b) => b.id === selectedBuyerId) || BUYER_PERSONALITIES[0];
  const seller = SELLER_PERSONALITIES.find((s) => s.id === selectedSellerId) || SELLER_PERSONALITIES[0];

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [rounds]);

  const resetBattle = () => {
    setRounds([]);
    setStatus("setup");
    setFinalPrice(null);
    setIsSimulating(false);
  };

  const startNegotiation = () => {
    resetBattle();
    setStatus("negotiating");

    // Generate Opening Buyer Offer
    const openingDiscount =
      buyer.concessionSpeed === "stubborn" ? 0.3 : buyer.concessionSpeed === "aggressive" ? 0.18 : 0.24;
    const initialAmount = Math.round((scenario.askingPrice * (1 - openingDiscount)) / 100) * 100;

    let openingMessage = "";
    if (buyer.id === "alex") {
      openingMessage = `Hello. I've analyzed recent market comps for similar condition listings. The fair market value sits around $${scenario.fairMarketValue.toLocaleString()}, taking into account the listed condition. I'm prepared to offer $${initialAmount.toLocaleString()} in clean cash today.`;
    } else if (buyer.id === "casey") {
      openingMessage = `Hey there. Looks alright, but I've got two other options lined up this afternoon. I can do $${initialAmount.toLocaleString()} right now if you want a frictionless transaction.`;
    } else if (buyer.id === "dan") {
      openingMessage = `Hi! I really love this and genuinely need it urgently. My absolute limit right now is around $${initialAmount.toLocaleString()}. Could you please work with me on this?`;
    } else {
      openingMessage = `Hi! Thank you for meeting. I really appreciate the care you've taken of this. Based on my budget, could we start discussion at $${initialAmount.toLocaleString()}?`;
    }

    const firstRound: NegotiationRound = {
      round: 1,
      speaker: "buyer",
      name: buyer.name,
      emoji: buyer.emoji,
      action: "offer",
      amount: initialAmount,
      message: openingMessage,
      tactic: "Anchor Opening Offer"
    };

    setRounds([firstRound]);
  };

  const stepNextRound = () => {
    if (rounds.length === 0 || status !== "negotiating") return;

    const lastRound = rounds[rounds.length - 1];
    const roundNumber = Math.floor(rounds.length / 2) + 1;

    if (lastRound.speaker === "buyer") {
      // Seller's turn to respond
      const buyerOffer = lastRound.amount;

      // Check if buyer offer already meets seller minimum and is close to asking
      if (buyerOffer >= scenario.sellerMinimum && (buyerOffer >= scenario.askingPrice * 0.94 || rounds.length >= 6)) {
        const acceptRound: NegotiationRound = {
          round: roundNumber,
          speaker: "seller",
          name: seller.name,
          emoji: seller.emoji,
          action: "accept",
          amount: buyerOffer,
          message: `You drove a hard bargain, but we have a deal. $${buyerOffer.toLocaleString()} works. Let's draft up the paperwork.`,
          tactic: "Deal Acceptance"
        };
        setRounds((prev) => [...prev, acceptRound]);
        setStatus("deal");
        setFinalPrice(buyerOffer);
        return;
      }

      // Check if buyer offered outrageously low below seller minimum on a stubborn seller
      if (rounds.length >= 7 && buyerOffer < scenario.sellerMinimum) {
        const walkRound: NegotiationRound = {
          round: roundNumber,
          speaker: "seller",
          name: seller.name,
          emoji: seller.emoji,
          action: "walk",
          amount: buyerOffer,
          message: `We are simply too far apart on price. I cannot justify parting with this at that level. Best of luck with your search.`,
          tactic: "Walk Away"
        };
        setRounds((prev) => [...prev, walkRound]);
        setStatus("no_deal");
        return;
      }

      // Calculate counter offer
      const prevSellerPrice =
        rounds.filter((r) => r.speaker === "seller").slice(-1)[0]?.amount || scenario.askingPrice;

      const concessionPct =
        seller.concessionSpeed === "aggressive" ? 0.35 : seller.concessionSpeed === "stubborn" ? 0.12 : 0.22;
      const spread = prevSellerPrice - buyerOffer;
      const counterDrop = Math.max(100, Math.round((spread * concessionPct) / 50) * 50);
      const newCounter = Math.max(scenario.sellerMinimum, prevSellerPrice - counterDrop);

      let sellerMsg = "";
      if (seller.id === "steve") {
        sellerMsg = `That's substantially below market value. I have two inquiries waiting for replies. The lowest I can entertain right now is $${newCounter.toLocaleString()}.`;
      } else if (seller.id === "sam") {
        sellerMsg = `I understand your perspective, but this has deep sentimental significance and exceptional provenance. Could you meet me at $${newCounter.toLocaleString()}?`;
      } else if (seller.id === "carl") {
        sellerMsg = `I need this off my hands quickly. How about we split the difference a bit? I will drop down to $${newCounter.toLocaleString()} if you close today.`;
      } else {
        sellerMsg = `I appreciate your offer, but factoring in upkeep and market conditions, $${newCounter.toLocaleString()} is a very reasonable counter.`;
      }

      const counterRound: NegotiationRound = {
        round: roundNumber,
        speaker: "seller",
        name: seller.name,
        emoji: seller.emoji,
        action: "counter",
        amount: newCounter,
        message: sellerMsg,
        tactic: "Strategic Counter"
      };

      setRounds((prev) => [...prev, counterRound]);
    } else {
      // Buyer's turn to respond
      const sellerCounter = lastRound.amount;
      const prevBuyerOffer =
        rounds.filter((r) => r.speaker === "buyer").slice(-1)[0]?.amount || scenario.fairMarketValue * 0.8;

      // Buyer accepts if counter is within budget and close to current offer
      if (sellerCounter <= scenario.buyerBudget && (sellerCounter <= prevBuyerOffer * 1.05 || rounds.length >= 7)) {
        const acceptRound: NegotiationRound = {
          round: roundNumber,
          speaker: "buyer",
          name: buyer.name,
          emoji: buyer.emoji,
          action: "accept",
          amount: sellerCounter,
          message: `Agreed. $${sellerCounter.toLocaleString()} is fair and within my approved parameters. Consider it sold.`,
          tactic: "Deal Acceptance"
        };
        setRounds((prev) => [...prev, acceptRound]);
        setStatus("deal");
        setFinalPrice(sellerCounter);
        return;
      }

      // Check if buyer should walk away
      if (rounds.length >= 8 && sellerCounter > scenario.buyerBudget) {
        const walkRound: NegotiationRound = {
          round: roundNumber,
          speaker: "buyer",
          name: buyer.name,
          emoji: buyer.emoji,
          action: "walk",
          amount: prevBuyerOffer,
          message: `Unfortunately that exceeds my strict budget ceiling of $${scenario.buyerBudget.toLocaleString()}. I must respectfully pass.`,
          tactic: "Walk Away"
        };
        setRounds((prev) => [...prev, walkRound]);
        setStatus("no_deal");
        return;
      }

      // Calculate new buyer offer
      const gap = sellerCounter - prevBuyerOffer;
      const stepPct = buyer.concessionSpeed === "aggressive" ? 0.45 : buyer.concessionSpeed === "stubborn" ? 0.15 : 0.3;
      const increase = Math.max(100, Math.round((gap * stepPct) / 50) * 50);
      const newOffer = Math.min(scenario.buyerBudget, prevBuyerOffer + increase);

      let buyerMsg = "";
      if (buyer.id === "alex") {
        buyerMsg = `That is moving in the right direction. If we cross-reference immediate payment without financing delays, I can adjust upward to $${newOffer.toLocaleString()}.`;
      } else if (buyer.id === "casey") {
        buyerMsg = `I'll give you one bump to $${newOffer.toLocaleString()}. If that doesn't work, no hard feelings, I'll take the other listing.`;
      } else if (buyer.id === "dan") {
        buyerMsg = `I stretched my savings account as far as I possibly can. The most I can scrape together is $${newOffer.toLocaleString()}.`;
      } else {
        buyerMsg = `Thank you for working with me on the price. Can we shake hands at $${newOffer.toLocaleString()}?`;
      }

      const offerRound: NegotiationRound = {
        round: roundNumber,
        speaker: "buyer",
        name: buyer.name,
        emoji: buyer.emoji,
        action: "offer",
        amount: newOffer,
        message: buyerMsg,
        tactic: "Incremental Concession"
      };

      setRounds((prev) => [...prev, offerRound]);
    }
  };

  const submitUserOffer = () => {
    const amt = parseFloat(customUserOffer.replace(/[^0-9.]/g, ""));
    if (!amt || isNaN(amt)) return;

    const roundNumber = Math.floor(rounds.length / 2) + 1;
    const userMsg =
      customUserMessage.trim() ||
      `I am offering $${amt.toLocaleString()} based on current valuation. Let's make a deal.`;

    const userRound: NegotiationRound = {
      round: roundNumber,
      speaker: "buyer",
      name: "You (Buyer)",
      emoji: "🧑‍💻",
      action: "offer",
      amount: amt,
      message: userMsg,
      tactic: "User Custom Offer"
    };

    setRounds((prev) => [...prev, userRound]);
    setCustomUserOffer("");
    setCustomUserMessage("");

    // Trigger seller AI response after short delay
    setTimeout(() => {
      // Seller evaluate
      if (amt >= scenario.sellerMinimum && amt >= scenario.askingPrice * 0.95) {
        const acceptRound: NegotiationRound = {
          round: roundNumber,
          speaker: "seller",
          name: seller.name,
          emoji: seller.emoji,
          action: "accept",
          amount: amt,
          message: `That meets my criteria. $${amt.toLocaleString()} is agreed. Deal accepted!`,
          tactic: "Deal Acceptance"
        };
        setRounds((prev) => [...prev, acceptRound]);
        setStatus("deal");
        setFinalPrice(amt);
      } else if (amt < scenario.sellerMinimum * 0.8) {
        const counterRound: NegotiationRound = {
          round: roundNumber,
          speaker: "seller",
          name: seller.name,
          emoji: seller.emoji,
          action: "counter",
          amount: Math.round(scenario.askingPrice * 0.95),
          message: `$${amt.toLocaleString()} is an unrealistic lowball. My firm counter is $${Math.round(scenario.askingPrice * 0.95).toLocaleString()}.`,
          tactic: "Firm Resistance"
        };
        setRounds((prev) => [...prev, counterRound]);
      } else {
        const counterAmt = Math.max(scenario.sellerMinimum, Math.round((scenario.askingPrice + amt) / 2 / 50) * 50);
        const counterRound: NegotiationRound = {
          round: roundNumber,
          speaker: "seller",
          name: seller.name,
          emoji: seller.emoji,
          action: "counter",
          amount: counterAmt,
          message: `I hear you, but I cannot go down to $${amt.toLocaleString()}. How about meeting at $${counterAmt.toLocaleString()}?`,
          tactic: "Counter Proposal"
        };
        setRounds((prev) => [...prev, counterRound]);
      }
    }, 600);
  };

  // Auto-simulation runner
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating && status === "negotiating") {
      timer = setTimeout(() => {
        stepNextRound();
      }, 1400);
    }
    return () => clearTimeout(timer);
  }, [isSimulating, rounds, status]);

  const latestOffer = rounds[rounds.length - 1]?.amount || scenario.askingPrice;
  const savings = finalPrice ? scenario.askingPrice - finalPrice : 0;
  const discountPct = finalPrice ? Math.round((savings / scenario.askingPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link href="/" className="hover:underline">Awesome LLM Apps</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Negotiation Simulator</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Swords className="w-8 h-8 text-primary" />
              AI Negotiation Battle Simulator
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Watch autonomous AI agents deploy real game-theory tactics, anchors, bluffs, and concessions in epic negotiation face-offs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={mode === "ai_vs_ai" ? "default" : "outline"}
              size="sm"
              onClick={() => { setMode("ai_vs_ai"); resetBattle(); }}
            >
              <Bot className="w-4 h-4 mr-1.5" />
              AI vs AI Spectator
            </Button>
            <Button
              variant={mode === "user_buyer" ? "default" : "outline"}
              size="sm"
              onClick={() => { setMode("user_buyer"); resetBattle(); }}
            >
              <User className="w-4 h-4 mr-1.5" />
              Play as Buyer
            </Button>
            <Button variant="ghost" size="sm" onClick={resetBattle}>
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Reset
            </Button>
          </div>
        </div>

        {/* Configuration Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scenario Selection */}
          <Card className="border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Scale className="w-4 h-4 text-primary" />
                Select Scenario
              </CardTitle>
              <CardDescription>Choose the item & high-stakes context</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {SCENARIOS.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setSelectedScenarioId(s.id);
                    resetBattle();
                  }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedScenarioId === s.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm flex items-center gap-2">
                      <span>{s.emoji}</span>
                      {s.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-primary">
                      ${s.askingPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{s.item}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                    <span>FMV: ${s.fairMarketValue.toLocaleString()}</span>
                    <span>·</span>
                    <span>Budget: ${s.buyerBudget.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Buyer Personality */}
          <Card className="border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-xl">{buyer.emoji}</span>
                Buyer: {buyer.name}
              </CardTitle>
              <CardDescription>Target: Under ${scenario.buyerBudget.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted/40 rounded-md text-xs space-y-1 mb-2">
                <p className="font-medium text-foreground">{buyer.tagline}</p>
                <p className="text-muted-foreground">Tactic: {buyer.style}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BUYER_PERSONALITIES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBuyerId(b.id);
                      resetBattle();
                    }}
                    className={`p-2.5 rounded-md border text-left text-xs transition-all ${
                      selectedBuyerId === b.id
                        ? "border-primary bg-primary/10 font-medium"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span>{b.emoji}</span>
                      <span className="truncate">{b.name}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground block truncate">{b.style}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seller Personality */}
          <Card className="border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-xl">{seller.emoji}</span>
                Seller: {seller.name}
              </CardTitle>
              <CardDescription>Floor: ${scenario.sellerMinimum.toLocaleString()} | Asking: ${scenario.askingPrice.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted/40 rounded-md text-xs space-y-1 mb-2">
                <p className="font-medium text-foreground">{seller.tagline}</p>
                <p className="text-muted-foreground">Tactic: {seller.style}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SELLER_PERSONALITIES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSellerId(s.id);
                      resetBattle();
                    }}
                    className={`p-2.5 rounded-md border text-left text-xs transition-all ${
                      selectedSellerId === s.id
                        ? "border-primary bg-primary/10 font-medium"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span>{s.emoji}</span>
                      <span className="truncate">{s.name}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground block truncate">{s.style}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Price Tracking & Scenario Stats Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  Price Convergence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between text-muted-foreground mb-1">
                    <span>Seller Minimum</span>
                    <span className="font-mono font-medium">${scenario.sellerMinimum.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground mb-1">
                    <span>Buyer Ceiling</span>
                    <span className="font-mono font-medium">${scenario.buyerBudget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-foreground font-semibold border-t pt-1 mt-1">
                    <span>Current Position</span>
                    <span className="font-mono text-primary text-sm">${latestOffer.toLocaleString()}</span>
                  </div>
                </div>

                {/* Convergence Meter */}
                <div className="space-y-1.5 pt-2">
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden relative">
                    {(() => {
                      const spread = scenario.askingPrice - scenario.sellerMinimum;
                      const progress = Math.min(
                        100,
                        Math.max(0, ((scenario.askingPrice - latestOffer) / spread) * 100)
                      );
                      return (
                        <div
                          className="bg-primary h-full transition-all duration-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      );
                    })()}
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>${scenario.askingPrice.toLocaleString()} (Asking)</span>
                    <span>${scenario.sellerMinimum.toLocaleString()} (Floor)</span>
                  </div>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <span className="font-semibold block text-foreground">Stakes & Context</span>
                  <div className="p-2 bg-muted/30 rounded text-[11px] text-muted-foreground">
                    <strong className="text-foreground">Buyer:</strong> {scenario.buyerContext}
                  </div>
                  <div className="p-2 bg-muted/30 rounded text-[11px] text-muted-foreground">
                    <strong className="text-foreground">Seller:</strong> {scenario.sellerContext}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Battle Controls */}
            <Card className="border shadow-xs">
              <CardContent className="p-4 space-y-3">
                {status === "setup" && (
                  <Button className="w-full" onClick={startNegotiation}>
                    <Play className="w-4 h-4 mr-2" />
                    Commence Negotiation
                  </Button>
                )}

                {status === "negotiating" && mode === "ai_vs_ai" && (
                  <div className="space-y-2">
                    <Button
                      variant={isSimulating ? "destructive" : "default"}
                      className="w-full"
                      onClick={() => setIsSimulating(!isSimulating)}
                    >
                      {isSimulating ? "Pause Simulation" : "Auto-Play Battle"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={isSimulating}
                      onClick={stepNextRound}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Step Next Turn
                    </Button>
                  </div>
                )}

                {(status === "deal" || status === "no_deal") && (
                  <Button variant="outline" className="w-full" onClick={startNegotiation}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Rematch with Same Setup
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Dialogue Feed */}
          <div className="lg:col-span-3 flex flex-col h-[600px] border rounded-xl bg-card shadow-xs overflow-hidden">
            {/* Arena Header */}
            <div className="px-6 py-3 border-b bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">
                  {scenario.title} — {scenario.item}
                </span>
                <span className="text-xs text-muted-foreground">
                  Round {rounds.length > 0 ? Math.ceil(rounds.length / 2) : 0} of 10
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={status === "deal" ? "default" : status === "negotiating" ? "secondary" : "outline"}>
                  {status === "deal"
                    ? "Deal Closed"
                    : status === "no_deal"
                    ? "Walk Away"
                    : status === "negotiating"
                    ? "Negotiating"
                    : "Ready"}
                </Badge>
              </div>
            </div>

            {/* Conversation Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {rounds.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                  <Swords className="w-12 h-12 text-muted-foreground/40 mb-3" />
                  <h3 className="font-semibold text-foreground text-base">Negotiation Arena Ready</h3>
                  <p className="text-xs max-w-md mt-1 mb-4">
                    Select your scenario and agent personalities above, then click Commence Negotiation to watch game theory unfold.
                  </p>
                  <Button size="sm" onClick={startNegotiation}>
                    <Play className="w-4 h-4 mr-1.5" />
                    Start Match
                  </Button>
                </div>
              ) : (
                rounds.map((round, idx) => {
                  const isBuyer = round.speaker === "buyer";
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col ${isBuyer ? "items-start" : "items-end"}`}
                    >
                      <div className="flex items-center gap-2 mb-1 px-1 text-xs text-muted-foreground">
                        <span>{round.emoji}</span>
                        <span className="font-semibold text-foreground">{round.name}</span>
                        <span>·</span>
                        <span className="text-[11px] font-mono">Round {round.round}</span>
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                          {round.tactic}
                        </Badge>
                      </div>

                      <div
                        className={`max-w-xl p-4 rounded-xl border text-sm leading-relaxed ${
                          isBuyer
                            ? "bg-primary/5 border-primary/20 text-foreground rounded-tl-xs"
                            : "bg-muted/50 border-border text-foreground rounded-tr-xs"
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/40 font-mono">
                          <span className="text-xs uppercase text-muted-foreground tracking-wider">
                            {round.action === "accept"
                              ? "Accepted Agreement"
                              : round.action === "walk"
                              ? "Walked Away"
                              : round.action === "counter"
                              ? "Counter Offer"
                              : "Offer"}
                          </span>
                          <span className="text-base font-bold text-foreground">
                            ${round.amount.toLocaleString()}
                          </span>
                        </div>
                        <p>{round.message}</p>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Deal Reached Banner */}
              {status === "deal" && finalPrice && (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-3 mt-6">
                  <div className="flex justify-center">
                    <Trophy className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                    Agreement Reached at ${finalPrice.toLocaleString()}!
                  </h3>
                  <div className="grid grid-cols-3 max-w-sm mx-auto text-xs border-t border-emerald-500/20 pt-3">
                    <div>
                      <span className="text-muted-foreground block">Asking Price</span>
                      <strong className="text-foreground">${scenario.askingPrice.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Total Savings</span>
                      <strong className="text-emerald-600 font-bold">${savings.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Discount</span>
                      <strong className="text-emerald-600 font-bold">{discountPct}%</strong>
                    </div>
                  </div>
                </div>
              )}

              {status === "no_deal" && (
                <div className="p-6 bg-destructive/10 border border-destructive/30 rounded-xl text-center space-y-2 mt-6">
                  <XCircle className="w-10 h-10 text-destructive mx-auto" />
                  <h3 className="text-lg font-bold text-destructive">Negotiation Terminated (No Deal)</h3>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    The gap between buyer budget ceiling (${scenario.buyerBudget.toLocaleString()}) and seller minimum reserve (${scenario.sellerMinimum.toLocaleString()}) could not be reconciled.
                  </p>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* User Input Bar (when mode is user_buyer) */}
            {mode === "user_buyer" && status === "negotiating" && (
              <div className="p-3 border-t bg-background flex flex-col sm:flex-row gap-2">
                <div className="w-full sm:w-44">
                  <Input
                    placeholder="Offer ($)"
                    type="number"
                    value={customUserOffer}
                    onChange={(e) => setCustomUserOffer(e.target.value)}
                    className="h-10 text-sm font-mono"
                  />
                </div>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Your argument or message..."
                    value={customUserMessage}
                    onChange={(e) => setCustomUserMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitUserOffer();
                    }}
                    className="h-10 text-sm"
                  />
                  <Button onClick={submitUserOffer} disabled={!customUserOffer}>
                    <Send className="w-4 h-4 mr-1.5" />
                    Counter
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
