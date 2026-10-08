export interface CatalogItem {
  id: string;
  name: string;
  category:
    | "Agent Skills"
    | "Starter Agents"
    | "Advanced Agents"
    | "Multi-Agent Teams"
    | "Always-on Agents"
    | "Voice AI Agents"
    | "Generative UI"
    | "Game Agents"
    | "MCP Agents"
    | "RAG Pipelines"
    | "Browser Tools"
    | "Memory & Chat"
    | "Optimization & Tuning";
  framework: string;
  models: string[];
  description: string;
  runCommand: string;
  repoPath: string;
  liveRoute?: string;
  starsOrTag?: string;
  systemPrompt?: string;
  recommendedPlatform?: "Google AI Studio" | "Anthropic Claude" | "OpenAI Platform" | "Cursor / Windsurf" | "Universal";
  suggestedTemperature?: number;
  promptInputs?: string[];
  promptOutputs?: string[];
}

export const ALL_CATALOG_ITEMS: CatalogItem[] = [
  // ==========================================
  // 🧩 AGENT SKILLS (8 items)
  // ==========================================
  {
    id: "project-graveyard",
    name: "Project Graveyard",
    category: "Agent Skills",
    framework: "Agent Skill / Claude Code",
    models: ["Claude Code", "Gemini 3.8", "Codex"],
    description: "Autopsies every side project you abandoned, diagnoses causes of death (burnout, over-engineering), and helps finish the one worth reviving.",
    runCommand: "npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/project-graveyard",
    repoPath: "agent_skills/project-graveyard",
    starsOrTag: "Featured"
  },
  {
    id: "first-reader",
    name: "First Reader",
    category: "Agent Skills",
    framework: "Agent Skill / Python",
    models: ["Claude 3.7", "Gemini 2.5"],
    description: "Simulates real reader personas going through your draft and reports where attention drops without rewriting a single word.",
    runCommand: "npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/first-reader",
    repoPath: "agent_skills/first-reader"
  },
  {
    id: "scope-creep-detector",
    name: "Scope Creep Detector",
    category: "Agent Skills",
    framework: "Agent Skill / CLI",
    models: ["Claude Code", "Gemini CLI"],
    description: "Checks whether a PR git diff grew beyond its stated intent and recommends what to keep, split into a new branch, or justify.",
    runCommand: "npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/scope-creep-detector",
    repoPath: "agent_skills/scope-creep-detector"
  },
  {
    id: "commit-archaeologist",
    name: "Commit Archaeologist",
    category: "Agent Skills",
    framework: "Agent Skill / Git",
    models: ["Claude Code", "GPT-4o"],
    description: "Reconstructs why a legacy file or code region exists from its introducing commit, subsequent edits, co-changes, and intent clues.",
    runCommand: "npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/commit-archaeologist",
    repoPath: "agent_skills/commit-archaeologist"
  },
  {
    id: "dependency-doctor",
    name: "Dependency Doctor",
    category: "Agent Skills",
    framework: "Agent Skill / Package Auditing",
    models: ["Claude Code", "Gemini 3.8"],
    description: "Audits dependency manifests for obsolete backports, standard-library pins, duplicate constraints, and yanked releases.",
    runCommand: "npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/dependency-doctor",
    repoPath: "agent_skills/dependency-doctor"
  },
  {
    id: "advisor-orchestrator-worker",
    name: "Advisor Orchestrator Worker",
    category: "Agent Skills",
    framework: "Meta-Loop Multi-Model",
    models: ["Claude Fable 5.1", "GPT-6 Astra", "Gemini 3.8 Flash"],
    description: "Meta Loop with Claude Fable as strategic advisor, GPT-6 Astra as task orchestrator, and Gemini 3.8 Flash as low-latency executor.",
    runCommand: "npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/advisor-orchestrator-worker",
    repoPath: "agent_skills/advisor-orchestrator-worker"
  },
  {
    id: "thinking-out-loud",
    name: "Thinking Out Loud",
    category: "Agent Skills",
    framework: "Voice-to-Brief Agent Skill",
    models: ["Gemini 2.5", "Whisper"],
    description: "Echoes messy voice rambles back as structured, scannable briefs, quarantining model guesses and highlighting reversals.",
    runCommand: "npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/thinking-out-loud",
    repoPath: "agent_skills/thinking-out-loud"
  },
  {
    id: "self-improving-agent-skills",
    name: "Self-Improving Agent Skills Studio",
    category: "Agent Skills",
    framework: "Google ADK + FastMCP",
    models: ["Gemini 3.8 Flash", "Google ADK"],
    description: "Automatically optimize and evolve agent skills using an autonomous loop of Evaluator, Critic, and Mutator agents.",
    runCommand: "cd agent_skills/self-improving-agent-skills && npm run dev",
    repoPath: "agent_skills/self-improving-agent-skills",
    liveRoute: "/apps/self-improving-skills",
    starsOrTag: "Live Interactive"
  },

  // ==========================================
  // 🌱 STARTER AI AGENTS (13 items)
  // ==========================================
  {
    id: "ai_blog_to_podcast_agent",
    name: "AI Blog to Podcast Agent",
    category: "Starter Agents",
    framework: "Streamlit / Python",
    models: ["Gemini 2.5", "ElevenLabs"],
    description: "Turns any blog post URL into an engaging, multi-speaker narrated audio podcast episode with soundbites.",
    runCommand: "cd starter_ai_agents/ai_blog_to_podcast_agent && streamlit run app.py",
    repoPath: "starter_ai_agents/ai_blog_to_podcast_agent"
  },
  {
    id: "ai_breakup_recovery_agent",
    name: "AI Breakup Recovery Agent",
    category: "Starter Agents",
    framework: "Python / Agno",
    models: ["Claude 3.5 Sonnet"],
    description: "Empathetic agent team that supports emotional grounding, journaling prompts, and cognitive reframing after a breakup.",
    runCommand: "cd starter_ai_agents/ai_breakup_recovery_agent && streamlit run app.py",
    repoPath: "starter_ai_agents/ai_breakup_recovery_agent"
  },
  {
    id: "ai_data_analysis_agent",
    name: "AI Data Analysis Agent",
    category: "Starter Agents",
    framework: "Streamlit / Pandas",
    models: ["GPT-4o", "Claude 3.5"],
    description: "Upload any CSV or Excel file and get instant statistical breakdowns, anomaly detection, and matplotlib visualizations.",
    runCommand: "cd starter_ai_agents/ai_data_analysis_agent && streamlit run app.py",
    repoPath: "starter_ai_agents/ai_data_analysis_agent"
  },
  {
    id: "ai_medical_imaging_agent",
    name: "AI Medical Imaging Agent",
    category: "Starter Agents",
    framework: "Streamlit / Multimodal",
    models: ["Gemini 2.5 Flash Multimodal"],
    description: "Diagnostic interpretation and educational anatomical analysis of medical X-rays, CT scans, and dermoscopy images.",
    runCommand: "cd starter_ai_agents/ai_medical_imaging_agent && streamlit run app.py",
    repoPath: "starter_ai_agents/ai_medical_imaging_agent"
  },
  {
    id: "ai_meme_generator_browseruse",
    name: "AI Meme Generator Agent (Browser)",
    category: "Starter Agents",
    framework: "Browser-Use / Python",
    models: ["GPT-4o", "Playwright"],
    description: "Generates memes by autonomously steering a real headless browser across meme templates and capturing rendered canvas output.",
    runCommand: "cd starter_ai_agents/ai_meme_generator_agent_browseruse && python main.py",
    repoPath: "starter_ai_agents/ai_meme_generator_agent_browseruse"
  },
  {
    id: "ai_music_generator_agent",
    name: "AI Music Generator Agent",
    category: "Starter Agents",
    framework: "Streamlit / Audio",
    models: ["MusicGen", "Gemini 2.5"],
    description: "Natural language prompt in, full harmonic MP3 musical composition track out.",
    runCommand: "cd starter_ai_agents/ai_music_generator_agent && streamlit run app.py",
    repoPath: "starter_ai_agents/ai_music_generator_agent"
  },
  {
    id: "ai_travel_agent",
    name: "AI Travel Agent (Local & Cloud)",
    category: "Starter Agents",
    framework: "Streamlit / Python",
    models: ["Gemini 2.5", "Ollama Llama3"],
    description: "Lightweight single-file travel agent building day-by-day itineraries with flight comps and packing checklists.",
    runCommand: "cd starter_ai_agents/ai_travel_agent && streamlit run travel_agent.py",
    repoPath: "starter_ai_agents/ai_travel_agent"
  },
  {
    id: "ai_x402_paying_agent",
    name: "AI x402 Paying Agent",
    category: "Starter Agents",
    framework: "Python / HTTP 402",
    models: ["Claude 3.5", "Crypto Micropayments"],
    description: "An agent equipped with a digital wallet that autonomously negotiates and pays per-call for high-value data without API keys.",
    runCommand: "cd starter_ai_agents/ai_x402_paying_agent && python agent.py",
    repoPath: "starter_ai_agents/ai_x402_paying_agent"
  },
  {
    id: "multimodal_ai_agent",
    name: "Gemini Multimodal Agent",
    category: "Starter Agents",
    framework: "Streamlit / Google GenAI",
    models: ["Gemini 2.5 Flash"],
    description: "Seamless video understanding and live web search in a unified, single-agent stream.",
    runCommand: "cd starter_ai_agents/multimodal_ai_agent && streamlit run app.py",
    repoPath: "starter_ai_agents/multimodal_ai_agent"
  },
  {
    id: "mixture_of_agents",
    name: "Mixture of Agents (MoA)",
    category: "Starter Agents",
    framework: "Python / Asyncio",
    models: ["Claude 3.5", "GPT-4o", "DeepSeek R1", "Llama 3.3"],
    description: "Multi-layered LLM council where diverse models propose preliminary answers and an aggregator model synthesizes consensus.",
    runCommand: "cd starter_ai_agents/mixture_of_agents && python moa.py",
    repoPath: "starter_ai_agents/mixture_of_agents"
  },
  {
    id: "xai_finance_agent",
    name: "xAI Finance Agent",
    category: "Starter Agents",
    framework: "Streamlit / xAI",
    models: ["Grok-2", "Grok Beta"],
    description: "Real-time stock valuation and market sentiment analysis powered directly by xAI Grok and financial data feeds.",
    runCommand: "cd starter_ai_agents/xai_finance_agent && streamlit run app.py",
    repoPath: "starter_ai_agents/xai_finance_agent"
  },
  {
    id: "openai_research_agent",
    name: "OpenAI Research Agent",
    category: "Starter Agents",
    framework: "OpenAI Agents SDK",
    models: ["GPT-4o", "O1 Preview"],
    description: "Autonomous multi-phase web research built on OpenAI official Agents SDK with structured citations.",
    runCommand: "cd starter_ai_agents/openai_research_agent && python main.py",
    repoPath: "starter_ai_agents/openai_research_agent"
  },
  {
    id: "web_scraping_ai_agent",
    name: "Web Scraping AI Agent",
    category: "Starter Agents",
    framework: "Streamlit / BeautifulSoup",
    models: ["Claude 3.5 Sonnet"],
    description: "Describe what information you want extracted in plain English; the agent parses the DOM and formats clean JSON.",
    runCommand: "cd starter_ai_agents/web_scraping_ai_agent && streamlit run app.py",
    repoPath: "starter_ai_agents/web_scraping_ai_agent"
  },

  // ==========================================
  // 🚀 ADVANCED AI AGENTS (22 items)
  // ==========================================
  {
    id: "ai_home_renovation_agent",
    name: "AI Home Renovation Agent with Nano Banana Pro",
    category: "Advanced Agents",
    framework: "Multi-Agent / Multimodal",
    models: ["Gemini 2.5 Flash", "Imagen 3"],
    description: "Upload room photos to receive structural renovation plans, architectural bills of materials, and photoreal redesign renders.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/ai_home_renovation_agent && python app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/ai_home_renovation_agent"
  },
  {
    id: "devpulse_ai",
    name: "DevPulse AI - Signal Intelligence",
    category: "Advanced Agents",
    framework: "CrewAI / Streamlit",
    models: ["Gemini 2.5", "GPT-4o"],
    description: "Scans GitHub, Hacker News, ArXiv, and developer blogs to synthesize high-signal daily intelligence digests.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/devpulse_ai && streamlit run streamlit_app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/devpulse_ai"
  },
  {
    id: "ai_deep_research_agent",
    name: "AI Deep Research Agent",
    category: "Advanced Agents",
    framework: "OpenAI Agents SDK / Firecrawl",
    models: ["GPT-4o", "Firecrawl API"],
    description: "Autonomous deep-dive web investigator that browses dozens of sources, cross-references claims, and generates exhaustive research papers.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/ai_deep_research_agent && python main.py",
    repoPath: "advanced_ai_agents/single_agent_apps/ai_deep_research_agent"
  },
  {
    id: "ai_vc_due_diligence_agent_team",
    name: "AI VC Due Diligence Agent Team",
    category: "Advanced Agents",
    framework: "Multi-Agent Team / Gemini",
    models: ["Gemini 3.8", "Google Search"],
    description: "Multi-agent venture capital team conducting founder background checks, TAM verification, and competitive threat matrices.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_vc_due_diligence_agent_team && python app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_vc_due_diligence_agent_team"
  },
  {
    id: "research_agent_gemini_interaction_api",
    name: "AI Research Planner (Google Interactions API)",
    category: "Advanced Agents",
    framework: "Google Interactions API",
    models: ["Gemini 2.5 Flash"],
    description: "Multi-phase autonomous research with server-side stateful interactions, deep grounding, and automated infographic generation.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/research_agent_gemini_interaction_api && python main.py",
    repoPath: "advanced_ai_agents/single_agent_apps/research_agent_gemini_interaction_api"
  },
  {
    id: "ai_consultant_agent",
    name: "AI Consultant Agent",
    category: "Advanced Agents",
    framework: "Streamlit / Agno",
    models: ["Claude 3.5 Sonnet", "Perplexity"],
    description: "Executive strategic advisor producing McKinsey-grade market opportunity analyses, Porter Five Forces, and risk models.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/ai_consultant_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/single_agent_apps/ai_consultant_agent"
  },
  {
    id: "ai_system_architect_r1",
    name: "AI System Architect Agent (R1 + Claude)",
    category: "Advanced Agents",
    framework: "Python / DeepSeek",
    models: ["DeepSeek R1", "Claude 3.7"],
    description: "Evaluates distributed architecture diagrams, database sharding strategies, and zero-trust security postures.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/ai_system_architect_r1 && python app.py",
    repoPath: "advanced_ai_agents/single_agent_apps/ai_system_architect_r1"
  },
  {
    id: "ai_financial_coach_agent",
    name: "AI Financial Coach Agent",
    category: "Advanced Agents",
    framework: "Multi-Agent / Streamlit",
    models: ["GPT-4o", "Plad API"],
    description: "Personalized debt payoff schedules, cash-flow runway projections, and tax optimization recommendations.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/ai_financial_coach_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/ai_financial_coach_agent"
  },
  {
    id: "ai_movie_production_agent",
    name: "AI Movie Production Agent",
    category: "Advanced Agents",
    framework: "Streamlit / Python",
    models: ["Gemini 2.5 Pro"],
    description: "Converts a one-line movie logline into act breakdowns, casting moodboards, shot lists, and budget estimates.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/ai_movie_production_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/single_agent_apps/ai_movie_production_agent"
  },
  {
    id: "ai_investment_agent",
    name: "AI Investment Agent",
    category: "Advanced Agents",
    framework: "Streamlit / YFinance",
    models: ["Claude 3.5 Sonnet"],
    description: "Quantitative equity screener running discounted cash flow (DCF) models and peer-group multiple comparisons.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/ai_investment_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/single_agent_apps/ai_investment_agent"
  },
  {
    id: "earnings_call_analyst_agent",
    name: "Earnings Call Analyst Cockpit",
    category: "Advanced Agents",
    framework: "Google ADK / Next.js",
    models: ["Gemini 2.5 Flash"],
    description: "Playback-synced webcast cockpit tracking revenue surprises, margin guidance, and executive Q&A evasion flags in real time.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/earnings_call_analyst_agent/live_demo && python server.py",
    repoPath: "advanced_ai_agents/single_agent_apps/earnings_call_analyst_agent",
    liveRoute: "/apps/earnings-analyst",
    starsOrTag: "Live Interactive"
  },
  {
    id: "ai_health_fitness_agent",
    name: "AI Health & Fitness Agent",
    category: "Advanced Agents",
    framework: "Streamlit / Python",
    models: ["GPT-4o"],
    description: "Formulates personalized progressive overload workout routines, macro meal plans, and sleep hygiene interventions.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/ai_health_fitness_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/single_agent_apps/ai_health_fitness_agent"
  },
  {
    id: "product_launch_intelligence_agent",
    name: "AI Product Launch Intelligence Agent",
    category: "Advanced Agents",
    framework: "Multi-Agent / Streamlit",
    models: ["Claude 3.5 Sonnet"],
    description: "Monitors competitor Product Hunt, Twitter, and press releases to build competitive sales teardowns and feature gap reports.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/product_launch_intelligence_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/product_launch_intelligence_agent"
  },
  {
    id: "ai_fraud_investigation_agent",
    name: "AI Fraud Investigation Agent",
    category: "Advanced Agents",
    framework: "Streamlit / OSINT",
    models: ["Gemini 2.5", "Web Search"],
    description: "Cross-references public business filings, state corporate registries, and satellite imagery to flag shell corporations.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/ai_fraud_investigation_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/single_agent_apps/ai_fraud_investigation_agent"
  },
  {
    id: "ai_journalist_agent",
    name: "AI Journalist Agent",
    category: "Advanced Agents",
    framework: "Streamlit / Python",
    models: ["GPT-4o", "Perplexity"],
    description: "Investigates breaking stories, cross-verifies multiple journalistic sources, and crafts AP-style news articles.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/ai_journalist_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/single_agent_apps/ai_journalist_agent"
  },
  {
    id: "ai_mental_wellbeing_agent",
    name: "AI Mental Wellbeing Agent Team",
    category: "Advanced Agents",
    framework: "CrewAI / Streamlit",
    models: ["Claude 3.5 Sonnet"],
    description: "Multi-agent team providing compassionate CBT journaling prompts, stress triage, and habit tracking routines.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/ai_mental_wellbeing_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/ai_mental_wellbeing_agent"
  },
  {
    id: "ai_meeting_agent",
    name: "AI Meeting Agent",
    category: "Advanced Agents",
    framework: "Streamlit / Calendar",
    models: ["Gemini 2.5 Flash"],
    description: "Reads upcoming calendar attendees, researches their background and company news, and prepares strategic briefing notes.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/ai_meeting_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/single_agent_apps/ai_meeting_agent"
  },
  {
    id: "ai_self_evolving_agent",
    name: "AI Self-Evolving Agent (EvoAgentX)",
    category: "Advanced Agents",
    framework: "EvoAgentX / Python",
    models: ["Claude 3.5", "GPT-4o"],
    description: "An agent that reflects upon execution telemetry, diagnoses bottlenecks, and rewrites its own Python execution tools.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/ai_self_evolving_agent && python run.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/ai_self_evolving_agent"
  },
  {
    id: "ai_sales_intelligence_agent_team",
    name: "AI Sales Intelligence Agent Team",
    category: "Advanced Agents",
    framework: "Multi-Agent / Streamlit",
    models: ["Gemini 3.8", "HubSpot API"],
    description: "Generates real-time prospect battle cards, pain-point summaries, and objection handling scripts before sales calls.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_sales_intelligence_agent_team && streamlit run app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_sales_intelligence_agent_team"
  },
  {
    id: "ai_news_and_podcast_agents",
    name: "Beifong AI News & Dual-Host Podcasts",
    category: "Advanced Agents",
    framework: "Agno / Next.js",
    models: ["Claude 3.5 Sonnet", "Gemini 2.5"],
    description: "Autonomous news ingestor, factual summarizer, and two-host conversational podcast script generator with interactive audio player.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/ai_news_and_podcast_agents && python main.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/ai_news_and_podcast_agents",
    liveRoute: "/apps/news-podcast",
    starsOrTag: "Live Interactive"
  },
  {
    id: "openwork_browser_agent",
    name: "Openwork - Open Browser Automation Agent",
    category: "Advanced Agents",
    framework: "Playwright / Python",
    models: ["GPT-4o", "Computer Use API"],
    description: "Open-source agent that operates a real browser to fill multi-step forms, book reservations, and extract protected data.",
    runCommand: "cd advanced_ai_agents/single_agent_apps/windows_use_autonomous_agent && python main.py",
    repoPath: "advanced_ai_agents/single_agent_apps/windows_use_autonomous_agent"
  },
  {
    id: "trust_gated_agent_team",
    name: "Trust-Gated Multi-Agent Research Team",
    category: "Advanced Agents",
    framework: "Multi-Agent / Cryptographic Audit",
    models: ["Claude 3.7", "Gemini 3.8"],
    description: "Every agent verified with cryptographic role signatures, recording every tool execution in an append-only audit trail.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/trust_gated_agent_team && python app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/trust_gated_agent_team"
  },

  // ==========================================
  // 🤝 MULTI-AGENT TEAMS (15 items)
  // ==========================================
  {
    id: "ai_travel_planner_agent_team",
    name: "TripCraft AI Travel Planner Team",
    category: "Multi-Agent Teams",
    framework: "Next.js / Google ADK",
    models: ["Gemini 2.5", "Claude 3.7"],
    description: "Full-stack orchestrated agent team that crafts bespoke travel itineraries, flights, boutique stays, and day-by-day schedules.",
    runCommand: "npm run dev",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_travel_planner_agent_team",
    liveRoute: "/plan",
    starsOrTag: "Live Interactive"
  },
  {
    id: "ai_negotiation_battle_simulator",
    name: "AI Negotiation Battle Simulator",
    category: "Multi-Agent Teams",
    framework: "Next.js / Game Theory Engine",
    models: ["Gemini 3.8 Flash", "GPT-4o"],
    description: "Buyer vs seller game-theory battle arena where autonomous agents deploy anchors, bluffs, and concessions, with user play mode.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/ai_negotiation_battle_simulator && npm run dev",
    repoPath: "advanced_ai_agents/multi_agent_apps/ai_negotiation_battle_simulator",
    liveRoute: "/apps/negotiation",
    starsOrTag: "Live Interactive"
  },
  {
    id: "ai_competitor_intelligence_agent_team",
    name: "AI Competitor Intelligence Agent Team",
    category: "Multi-Agent Teams",
    framework: "CrewAI / Python",
    models: ["Claude 3.5 Sonnet", "Firecrawl"],
    description: "Crawls competitor pricing pages, changelogs, and careers pages to output comprehensive teardown dossiers.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_competitor_intelligence_agent_team && python main.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_competitor_intelligence_agent_team"
  },
  {
    id: "ai_finance_agent_team",
    name: "AI Finance Agent Team",
    category: "Multi-Agent Teams",
    framework: "Agno / Python",
    models: ["GPT-4o", "YFinance"],
    description: "Complete financial analyst research desk in 20 lines of Python code: macro analyst, technical chartist, and fundamentals auditor.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_finance_agent_team && python app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_finance_agent_team"
  },
  {
    id: "ai_game_design_agent_team",
    name: "AI Game Design Agent Team",
    category: "Multi-Agent Teams",
    framework: "CrewAI / Python",
    models: ["Claude 3.5 Sonnet"],
    description: "Swarm of design specialists generating game mechanics, narrative lore, level progression curves, and balance formulas.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_game_design_agent_team && python main.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_game_design_agent_team"
  },
  {
    id: "ag2_adaptive_research_team",
    name: "AG2 Adaptive Research Team",
    category: "Multi-Agent Teams",
    framework: "AG2 (AutoGen 2) / Python",
    models: ["Gemini 2.5", "GPT-4o"],
    description: "Adaptive team routing with dynamic fallback strategies and human-in-the-loop approvals, built on AG2.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ag2_adaptive_research_team && python main.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ag2_adaptive_research_team"
  },
  {
    id: "ai_legal_agent_team",
    name: "AI Legal Agent Team (Cloud & Local)",
    category: "Multi-Agent Teams",
    framework: "CrewAI / Python",
    models: ["Claude 3.5 Sonnet", "Ollama Llama3"],
    description: "Contract scrutiny bench: indemnification risk analyst, compliance auditor, and plain-English clause translator.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_legal_agent_team && streamlit run app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_legal_agent_team"
  },
  {
    id: "ai_recruitment_agent_team",
    name: "AI Recruitment Agent Team",
    category: "Multi-Agent Teams",
    framework: "CrewAI / Streamlit",
    models: ["GPT-4o"],
    description: "End-to-end talent pipeline: parses resumes against rubrics, drafts technical challenge prompts, and scores responses.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_recruitment_agent_team && streamlit run app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_recruitment_agent_team"
  },
  {
    id: "ai_real_estate_agent_team",
    name: "AI Real Estate Agent Team",
    category: "Multi-Agent Teams",
    framework: "Multi-Agent / Streamlit",
    models: ["Gemini 2.5", "Zillow Scraper"],
    description: "Property discovery, school district analysis, mortgage amortization comparisons, and neighborhood trend forecasts.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_real_estate_agent_team && streamlit run app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_real_estate_agent_team"
  },
  {
    id: "ai_services_agency",
    name: "AI Services Agency (CrewAI)",
    category: "Multi-Agent Teams",
    framework: "CrewAI / Python",
    models: ["Claude 3.5 Sonnet"],
    description: "Digital agency swarm that takes a high-level product brief and delivers architecture specs, design wireframes, and sprint roadmaps.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_services_agency && python main.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_services_agency"
  },
  {
    id: "ai_teaching_agent_team",
    name: "AI Teaching Agent Team",
    category: "Multi-Agent Teams",
    framework: "Multi-Agent / Streamlit",
    models: ["GPT-4o"],
    description: "Faculty of pedagogy specialists tailoring interactive syllabi, quizzes, and Socratic dialogues to individual learning speeds.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/ai_teaching_agent_team && streamlit run app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/ai_teaching_agent_team"
  },
  {
    id: "multimodal_coding_agent_team",
    name: "Multimodal Coding Agent Team",
    category: "Multi-Agent Teams",
    framework: "Next.js / Gemini",
    models: ["Gemini 2.5 Flash Multimodal"],
    description: "Take a photo of a whiteboard bug or UI sketch; the agent team implements and verifies executable code in a sandbox.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_coding_agent_team && npm run dev",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_coding_agent_team"
  },
  {
    id: "multimodal_design_agent_team",
    name: "Multimodal Design Agent Team",
    category: "Multi-Agent Teams",
    framework: "Streamlit / Gemini",
    models: ["Gemini 2.5 Pro"],
    description: "Design review board evaluating typography hierarchy, WCAG contrast compliance, and aesthetic balance from screenshots.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_design_agent_team && streamlit run app.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_design_agent_team"
  },
  {
    id: "multimodal_uiux_feedback_agent_team",
    name: "Multimodal UI/UX Feedback Agent Team",
    category: "Multi-Agent Teams",
    framework: "Next.js / Gemini",
    models: ["Gemini 3.8", "Imagen 3"],
    description: "Landing page critique team that scores conversion friction points and returns an improved HTML/Tailwind mockup.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_uiux_feedback_agent_team && npm run dev",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_uiux_feedback_agent_team"
  },
  {
    id: "llm_panel_agent_team",
    name: "LLM Panel Agent Team",
    category: "Multi-Agent Teams",
    framework: "Python / Multi-Provider",
    models: ["Claude 3.7", "GPT-4o", "Gemini 2.5"],
    description: "Three leading AI vendors review the same code diff anonymously, then argue and debate edge cases in a round-table forum.",
    runCommand: "cd advanced_ai_agents/multi_agent_apps/agent_teams/llm_panel_agent_team && python run.py",
    repoPath: "advanced_ai_agents/multi_agent_apps/agent_teams/llm_panel_agent_team"
  },

  // ==========================================
  // 🛰️ ALWAYS-ON AGENTS (2 items)
  // ==========================================
  {
    id: "always_on_hn_briefing_agent",
    name: "Always-on Hacker News Briefing Agent",
    category: "Always-on Agents",
    framework: "Python / Cron Scheduler",
    models: ["Gemini 2.5 Flash", "Slack Webhook"],
    description: "Scheduled background scout that filters Hacker News discussions while you sleep and ships a ranked morning digest to Slack.",
    runCommand: "cd always_on_agents/always_on_hn_briefing_agent && python hn_agent.py",
    repoPath: "always_on_agents/always_on_hn_briefing_agent"
  },
  {
    id: "release_radar_agent",
    name: "Release Radar Agent",
    category: "Always-on Agents",
    framework: "Python / GitHub Webhooks",
    models: ["Claude 3.5 Sonnet"],
    description: "Watches dependency releases on GitHub/npm, highlighting breaking API changes, deprecations, and CVE patches.",
    runCommand: "cd always_on_agents/release_radar_agent && python radar.py",
    repoPath: "always_on_agents/release_radar_agent"
  },

  // ==========================================
  // 🗣️ VOICE AI AGENTS (5 items)
  // ==========================================
  {
    id: "insurance_claim_live_agent_team",
    name: "Insurance Claim Live Agent Team",
    category: "Voice AI Agents",
    framework: "Gemini 3.8 Live / WebRTC",
    models: ["Gemini 3.8 Live API"],
    description: "Real-time voice claim intake agent inspecting car damage through camera stream, writing field notebooks, and sketching incident timelines.",
    runCommand: "cd voice_ai_agents/insurance_claim_live_agent_team && npm run dev",
    repoPath: "voice_ai_agents/insurance_claim_live_agent_team",
    starsOrTag: "Gemini Live API"
  },
  {
    id: "ai_audio_tour_agent",
    name: "AI Audio Tour Agent",
    category: "Voice AI Agents",
    framework: "Streamlit / TTS",
    models: ["Gemini 2.5 Flash", "ElevenLabs"],
    description: "Location-aware audio guide providing responsive narrations adjusted to your walking pace and cultural interests.",
    runCommand: "cd voice_ai_agents/ai_audio_tour_agent && streamlit run app.py",
    repoPath: "voice_ai_agents/ai_audio_tour_agent"
  },
  {
    id: "customer_support_voice_agent",
    name: "Customer Support Voice Agent",
    category: "Voice AI Agents",
    framework: "Python / WebRTC",
    models: ["OpenAI Realtime API", "RAG"],
    description: "Sub-400ms latency voice customer service agent answering technical support queries grounded in your knowledge base.",
    runCommand: "cd voice_ai_agents/customer_support_voice_agent && python agent.py",
    repoPath: "voice_ai_agents/customer_support_voice_agent"
  },
  {
    id: "voice_rag_openaisdk",
    name: "Voice RAG Agent (OpenAI SDK)",
    category: "Voice AI Agents",
    framework: "OpenAI Agents SDK / Audio",
    models: ["GPT-4o Realtime Audio"],
    description: "Talk to your uploaded PDFs conversationally and hear real-time spoken answers with exact page citations.",
    runCommand: "cd voice_ai_agents/voice_rag_openaisdk && python main.py",
    repoPath: "voice_ai_agents/voice_rag_openaisdk"
  },
  {
    id: "jarvis_voice_dictation",
    name: "OpenSource Voice Dictation Agent",
    category: "Voice AI Agents",
    framework: "Python / Local Whisper",
    models: ["Whisper Large v3"],
    description: "High-accuracy local voice dictation tool (Wispr Flow clone) that formats speech into clean prose directly at cursor position.",
    runCommand: "pip install openai-whisper && python dictation.py",
    repoPath: "voice_ai_agents"
  },

  // ==========================================
  // 🖼️ GENERATIVE UI & AGENTIC FRONTENDS (7 items)
  // ==========================================
  {
    id: "generative_ui_starter",
    name: "Generative UI Starter Project",
    category: "Generative UI",
    framework: "Next.js / CopilotKit",
    models: ["GPT-4o", "Claude 3.5"],
    description: "Chat-driven interactive kanban board where user and AI collaboratively manipulate cards, tags, and column states.",
    runCommand: "cd generative_ui_agents/generative-ui-starter-project && npm run dev",
    repoPath: "generative_ui_agents/generative-ui-starter-project"
  },
  {
    id: "genui_financial_coach",
    name: "AI Financial Coach Generative UI",
    category: "Generative UI",
    framework: "Next.js / Tailwind",
    models: ["Claude 3.5 Sonnet"],
    description: "Financial advice engine that renders editable savings dials, debt repayment schedules, and interactive portfolio breakdown widgets.",
    runCommand: "cd generative_ui_agents/ai-financial-coach-agent && npm run dev",
    repoPath: "generative_ui_agents/ai-financial-coach-agent"
  },
  {
    id: "ai_dashboard_canvas_agent",
    name: "AI Dashboard Canvas Agent",
    category: "Generative UI",
    framework: "Next.js / Recharts",
    models: ["Gemini 2.5", "GPT-4o"],
    description: "Describe a business dashboard in chat; live data visualizations and interactive filter cards assemble dynamically on canvas.",
    runCommand: "cd generative_ui_agents/ai-dashboard-canvas-agent && npm run dev",
    repoPath: "generative_ui_agents/ai-dashboard-canvas-agent"
  },
  {
    id: "ai_mcp_app_builder",
    name: "AI MCP App Builder",
    category: "Generative UI",
    framework: "Next.js / MCP Client",
    models: ["Claude 3.5 Sonnet"],
    description: "Describe any Model Context Protocol tool in chat and receive a live sandboxed, fully interactive GUI client.",
    runCommand: "cd generative_ui_agents/ai-mcp-app-builder && npm run dev",
    repoPath: "generative_ui_agents/ai-mcp-app-builder"
  },
  {
    id: "mcp_apps_generative_ui_showcase",
    name: "MCP Apps Generative UI Showcase",
    category: "Generative UI",
    framework: "Next.js / Model Context Protocol",
    models: ["Claude 3.5 Sonnet"],
    description: "Showcase demonstrating Model Context Protocol servers rendering live interactive UI components, including live flight widgets.",
    runCommand: "cd generative_ui_agents/mcp-apps-generative-ui-showcase && npm run dev",
    repoPath: "generative_ui_agents/mcp-apps-generative-ui-showcase"
  },
  {
    id: "ai_shadcn_component_generator",
    name: "AI Shadcn Component Generator",
    category: "Generative UI",
    framework: "Next.js / Radix UI",
    models: ["Claude 3.5 Sonnet"],
    description: "Chat your way to production-ready shadcn/ui components with live interactive preview, accessibility checks, and code export.",
    runCommand: "cd generative_ui_agents/ai-shadcn-component-generator && npm run dev",
    repoPath: "generative_ui_agents/ai-shadcn-component-generator"
  },
  {
    id: "ai_deep_research_canvas",
    name: "AI Deep Research Agent Canvas",
    category: "Generative UI",
    framework: "Next.js / React Flow",
    models: ["GPT-4o", "Firecrawl"],
    description: "Visual workspace where every search query, tool call, and source document renders as a card on an interactive canvas.",
    runCommand: "cd generative_ui_agents/ai-deep-research-agent && npm run dev",
    repoPath: "generative_ui_agents/ai-deep-research-agent"
  },

  // ==========================================
  // 🎮 AUTONOMOUS GAME AGENTS (3 items)
  // ==========================================
  {
    id: "ai_3dpygame_r1",
    name: "AI 3D Pygame Agent (DeepSeek R1)",
    category: "Game Agents",
    framework: "Python / Pygame / WebGL",
    models: ["DeepSeek R1"],
    description: "DeepSeek R1 autonomously conceptualizes and writes 3D PyGame simulation code that browser workers execute live.",
    runCommand: "cd advanced_ai_agents/autonomous_game_playing_agent_apps/ai_3dpygame_r1 && python run.py",
    repoPath: "advanced_ai_agents/autonomous_game_playing_agent_apps/ai_3dpygame_r1"
  },
  {
    id: "ai_chess_agent",
    name: "Autonomous AI Chess Agent",
    category: "Game Agents",
    framework: "Python / Chess Engine",
    models: ["Stockfish AI", "GPT-4o"],
    description: "Agent White vs Agent Black adversarial chess battle with move validation, positional evaluation, and explainable tactics.",
    runCommand: "cd advanced_ai_agents/autonomous_game_playing_agent_apps/ai_chess_agent && python ai_chess_agent.py",
    repoPath: "advanced_ai_agents/autonomous_game_playing_agent_apps/ai_chess_agent"
  },
  {
    id: "ai_tic_tac_toe_agent",
    name: "AI Tic-Tac-Toe Arena",
    category: "Game Agents",
    framework: "Python / Streamlit",
    models: ["Claude 3.5", "Gemini 2.5", "GPT-4o"],
    description: "Two different LLMs battle each other on a minimax grid, explaining their psychological and strategic moves turn-by-turn.",
    runCommand: "cd advanced_ai_agents/autonomous_game_playing_agent_apps/ai_tic_tac_toe_agent && streamlit run app.py",
    repoPath: "advanced_ai_agents/autonomous_game_playing_agent_apps/ai_tic_tac_toe_agent"
  },

  // ==========================================
  // ♾️ MCP AI AGENTS (6 items)
  // ==========================================
  {
    id: "browser_mcp_agent",
    name: "Browser MCP Agent",
    category: "MCP Agents",
    framework: "Model Context Protocol / Puppeteer",
    models: ["Claude 3.5 Sonnet", "MCP Server"],
    description: "Drive a real browser via natural language over Model Context Protocol, extracting pages and bypassing bot detection.",
    runCommand: "cd mcp_ai_agents/browser_mcp_agent && python main.py",
    repoPath: "mcp_ai_agents/browser_mcp_agent"
  },
  {
    id: "github_mcp_agent",
    name: "GitHub MCP Agent",
    category: "MCP Agents",
    framework: "Model Context Protocol / Octokit",
    models: ["Claude 3.5 Sonnet"],
    description: "Explore and analyze any repository over MCP: search symbol trees, inspect PR diffs, and create issues in plain English.",
    runCommand: "cd mcp_ai_agents/github_mcp_agent && python main.py",
    repoPath: "mcp_ai_agents/github_mcp_agent"
  },
  {
    id: "notion_mcp_agent",
    name: "Notion MCP Agent",
    category: "MCP Agents",
    framework: "Model Context Protocol / Notion API",
    models: ["Claude 3.5 Sonnet"],
    description: "Query and update Notion databases and wikis directly from the command line using standard MCP tools.",
    runCommand: "cd mcp_ai_agents/notion_mcp_agent && python main.py",
    repoPath: "mcp_ai_agents/notion_mcp_agent"
  },
  {
    id: "ai_travel_planner_mcp_agent_team",
    name: "AI Travel Planner MCP Agent",
    category: "MCP Agents",
    framework: "Model Context Protocol / Google Maps",
    models: ["Gemini 2.5", "Claude 3.5"],
    description: "Travel planner that wires into live Airbnb, Google Maps, and flight search MCP servers for real-time rates.",
    runCommand: "cd mcp_ai_agents/ai_travel_planner_mcp_agent_team && python app.py",
    repoPath: "mcp_ai_agents/ai_travel_planner_mcp_agent_team"
  },
  {
    id: "multi_mcp_agent_router",
    name: "Multi-MCP Agent Router",
    category: "MCP Agents",
    framework: "FastMCP / Python",
    models: ["Claude 3.5 Sonnet"],
    description: "Router agent that connects to multiple independent MCP servers (Postgres, GitHub, Slack) and federates calls seamlessly.",
    runCommand: "cd mcp_ai_agents/multi_mcp_agent_router && python router.py",
    repoPath: "mcp_ai_agents/multi_mcp_agent_router"
  },
  {
    id: "openai_remote_mcp_bridge",
    name: "OpenAI Remote MCP Tool Bridge",
    category: "MCP Agents",
    framework: "OpenAI SDK / FastMCP",
    models: ["GPT-4o"],
    description: "Connects standard OpenAI function calling schemas directly to remote Model Context Protocol endpoints over SSE.",
    runCommand: "cd mcp_ai_agents/openai_remote_mcp_bridge && python bridge.py",
    repoPath: "mcp_ai_agents/openai_remote_mcp_bridge"
  },

  // ==========================================
  // 📀 RAG (RETRIEVAL AUGMENTED GENERATION) (21 items)
  // ==========================================
  {
    id: "agentic_rag_embedding_gemma",
    name: "Agentic RAG with Embedding Gemma",
    category: "RAG Pipelines",
    framework: "Ollama / Python",
    models: ["EmbeddingGemma", "Llama 3.2"],
    description: "Fully local, zero-cloud agentic retrieval pipeline utilizing Google's EmbeddingGemma and Llama 3.2.",
    runCommand: "cd rag_tutorials/agentic_rag_embedding_gemma && python app.py",
    repoPath: "rag_tutorials/agentic_rag_embedding_gemma"
  },
  {
    id: "agentic_rag_with_reasoning",
    name: "Agentic RAG with Reasoning",
    category: "RAG Pipelines",
    framework: "LangGraph / Python",
    models: ["DeepSeek R1", "GPT-4o"],
    description: "Inspect the agent's internal thought progression as it recursively refines retrieval queries against documents.",
    runCommand: "cd rag_tutorials/agentic_rag_with_reasoning && streamlit run app.py",
    repoPath: "rag_tutorials/agentic_rag_with_reasoning"
  },
  {
    id: "ai_blog_search",
    name: "AI Blog Search (RAG)",
    category: "RAG Pipelines",
    framework: "LangGraph / Streamlit",
    models: ["GPT-4o", "ChromaDB"],
    description: "Agentic search over entire blog archives with automatic query expansion and relevance filtering.",
    runCommand: "cd rag_tutorials/ai_blog_search && streamlit run app.py",
    repoPath: "rag_tutorials/ai_blog_search"
  },
  {
    id: "autonomous_rag",
    name: "Autonomous RAG",
    category: "RAG Pipelines",
    framework: "Python / Qdrant",
    models: ["GPT-4o", "Tavily"],
    description: "Answers user inquiries from internal PDFs, automatically detecting information gaps and falling back to web search.",
    runCommand: "cd rag_tutorials/autonomous_rag && streamlit run app.py",
    repoPath: "rag_tutorials/autonomous_rag"
  },
  {
    id: "contextualai_rag_agent",
    name: "Contextual AI RAG Agent",
    category: "RAG Pipelines",
    framework: "Contextual AI SDK",
    models: ["Contextual Model", "Claude 3.5"],
    description: "Enterprise managed RAG: from unformatted raw datastores to grounded conversational chat in under 5 minutes.",
    runCommand: "cd rag_tutorials/contextualai_rag_agent && python main.py",
    repoPath: "rag_tutorials/contextualai_rag_agent"
  },
  {
    id: "corrective_rag_crag",
    name: "Corrective RAG (CRAG)",
    category: "RAG Pipelines",
    framework: "LangGraph / Python",
    models: ["Claude 3.5 Sonnet"],
    description: "Evaluator loop that grades retrieved document relevance and triggers web search corrections when evidence is insufficient.",
    runCommand: "cd rag_tutorials/corrective_rag && python crag.py",
    repoPath: "rag_tutorials/corrective_rag"
  },
  {
    id: "agentic_typed_rag_pydanticai",
    name: "Typed Agentic RAG with Pydantic AI",
    category: "RAG Pipelines",
    framework: "Pydantic AI / Python",
    models: ["Gemini 2.5", "GPT-4o"],
    description: "Strongly-typed validation pipeline returning guaranteed structured answers with exact citations or explicit evidence refusals.",
    runCommand: "cd rag_tutorials/agentic_typed_rag_pydanticai && python main.py",
    repoPath: "rag_tutorials/agentic_typed_rag_pydanticai"
  },
  {
    id: "deepseek_local_rag_agent",
    name: "DeepSeek Local RAG Agent",
    category: "RAG Pipelines",
    framework: "Ollama / Streamlit",
    models: ["DeepSeek R1 8B", "Nomic Embed"],
    description: "Run private, offline DeepSeek reasoning and document RAG entirely on your local machine with zero external API calls.",
    runCommand: "cd rag_tutorials/deepseek_local_rag_agent && streamlit run app.py",
    repoPath: "rag_tutorials/deepseek_local_rag_agent"
  },
  {
    id: "gemini_agentic_rag",
    name: "Gemini Agentic RAG",
    category: "RAG Pipelines",
    framework: "Streamlit / Google GenAI",
    models: ["Gemini 2.5 Flash Thinking"],
    description: "Query reformulation, vector grounding, and automated Google Search web fallback powered by Gemini Flash Thinking.",
    runCommand: "cd rag_tutorials/gemini_agentic_rag && streamlit run app.py",
    repoPath: "rag_tutorials/gemini_agentic_rag"
  },
  {
    id: "hybrid_search_rag_cloud",
    name: "Hybrid Search RAG (Cloud)",
    category: "RAG Pipelines",
    framework: "Pinecone / LangChain",
    models: ["Claude 3.5 Sonnet"],
    description: "Combines dense vector embeddings with sparse BM25 keyword matching for optimal recall on domain terminology.",
    runCommand: "cd rag_tutorials/hybrid_search_rag && python main.py",
    repoPath: "rag_tutorials/hybrid_search_rag"
  },
  {
    id: "llama3_1_local_rag",
    name: "Llama 3.1 Local RAG",
    category: "RAG Pipelines",
    framework: "Ollama / Streamlit",
    models: ["Llama 3.1 8B"],
    description: "Chat with any webpage or article completely offline with private vector storage and zero telemetry.",
    runCommand: "cd rag_tutorials/llama3.1_local_rag && streamlit run app.py",
    repoPath: "rag_tutorials/llama3.1_local_rag"
  },
  {
    id: "local_hybrid_search_rag",
    name: "Local Hybrid Search RAG",
    category: "RAG Pipelines",
    framework: "LanceDB / Streamlit",
    models: ["Ollama Llama3", "FastEmbed"],
    description: "Fully local hybrid vector and full-text keyword search engine running on your own CPU without cloud databases.",
    runCommand: "cd rag_tutorials/local_hybrid_search_rag && streamlit run app.py",
    repoPath: "rag_tutorials/local_hybrid_search_rag"
  },
  {
    id: "multimodal_agentic_rag",
    name: "Multimodal Agentic RAG",
    category: "RAG Pipelines",
    framework: "Streamlit / Multimodal",
    models: ["Gemini 2.5 Pro Multimodal"],
    description: "Simultaneously index and retrieve across text, PDFs, diagrams, audio recordings, and video clips with citations.",
    runCommand: "cd rag_tutorials/multimodal_agentic_rag && streamlit run app.py",
    repoPath: "rag_tutorials/multimodal_agentic_rag"
  },
  {
    id: "local_rag_agent",
    name: "Local RAG Agent (Qdrant + Llama 3.2)",
    category: "RAG Pipelines",
    framework: "Qdrant / Ollama",
    models: ["Llama 3.2", "BGE Embeddings"],
    description: "High-performance on-device vector retrieval utilizing Qdrant Local and Llama 3.2 without API key requirements.",
    runCommand: "cd rag_tutorials/local_rag_agent && python run.py",
    repoPath: "rag_tutorials/local_rag_agent"
  },
  {
    id: "rag_as_a_service",
    name: "RAG-as-a-Service (<50 lines)",
    category: "RAG Pipelines",
    framework: "FastAPI / Python",
    models: ["GPT-4o Mini", "OpenAI Embeddings"],
    description: "Minimalist, production-ready REST API implementing chunking, vector ingestion, and question answering in under 50 lines.",
    runCommand: "cd rag_tutorials/rag-as-a-service && uvicorn main:app",
    repoPath: "rag_tutorials/rag-as-a-service"
  },
  {
    id: "rag_agent_cohere",
    name: "RAG Agent with Cohere Command R",
    category: "RAG Pipelines",
    framework: "Cohere API / Streamlit",
    models: ["Command R+", "Cohere Embed 3"],
    description: "Enterprise retrieval engine using Cohere native citations and reranking with automated web search fallback.",
    runCommand: "cd rag_tutorials/rag_agent_cohere && streamlit run app.py",
    repoPath: "rag_tutorials/rag_agent_cohere"
  },
  {
    id: "basic_rag_chain",
    name: "Basic RAG Chain (Pharma Research)",
    category: "RAG Pipelines",
    framework: "LangChain / Python",
    models: ["GPT-4o"],
    description: "Clean, reference implementation of document chunking, FAISS vector indexing, and QA chain for clinical papers.",
    runCommand: "cd rag_tutorials/rag_chain && python run.py",
    repoPath: "rag_tutorials/rag_chain"
  },
  {
    id: "rag_database_routing",
    name: "RAG with Database Routing",
    category: "RAG Pipelines",
    framework: "LangGraph / Postgres",
    models: ["Claude 3.5 Sonnet"],
    description: "Intelligent query triage: routes financial queries to SQL, conceptual questions to Vector DB, and recent news to web search.",
    runCommand: "cd rag_tutorials/rag_database_routing && python main.py",
    repoPath: "rag_tutorials/rag_database_routing"
  },
  {
    id: "vision_rag",
    name: "Vision RAG (Embed-4)",
    category: "RAG Pipelines",
    framework: "Python / ColPali",
    models: ["ColPali", "Embed-4"],
    description: "Direct image-to-vector visual document retrieval that bypasses OCR errors on tables, flowcharts, and diagrams.",
    runCommand: "cd rag_tutorials/vision_rag && python app.py",
    repoPath: "rag_tutorials/vision_rag"
  },
  {
    id: "rag_failure_diagnostics_clinic",
    name: "RAG Failure Diagnostics Clinic",
    category: "RAG Pipelines",
    framework: "Ragas / Python",
    models: ["GPT-4o"],
    description: "Systematic auditing tool to diagnose why a RAG pipeline fails: chunk fragmentation, retrieval miss, or synthesis hallucination.",
    runCommand: "cd rag_tutorials/rag_failure_diagnostics_clinic && python clinic.py",
    repoPath: "rag_tutorials/rag_failure_diagnostics_clinic"
  },
  {
    id: "knowledge_graph_rag_citations",
    name: "Knowledge Graph RAG with Citations",
    category: "RAG Pipelines",
    framework: "Neo4j / LangGraph",
    models: ["Claude 3.5 Sonnet", "Graph RAG"],
    description: "Multi-hop entity traversal linking disparate facts across documents with verifiable, transparent source attribution.",
    runCommand: "cd rag_tutorials/knowledge_graph_rag_citations && python app.py",
    repoPath: "rag_tutorials/knowledge_graph_rag_citations"
  },

  // ==========================================
  // 🔎 AI BROWSER TOOLS (2 items)
  // ==========================================
  {
    id: "needle_semantic_search",
    name: "Needle - Semantic Meaning Search",
    category: "Browser Tools",
    framework: "Next.js / TypeScript",
    models: ["Gemini Embedding 2", "TypeSafe Jev"],
    description: "Find the thought, not just the words. Search complex prose by meaning with instant sentence heatmaps.",
    runCommand: "cd advanced_llm_apps/needle && npm run dev",
    repoPath: "advanced_llm_apps/needle",
    liveRoute: "/apps/needle",
    starsOrTag: "Live Interactive"
  },
  {
    id: "ripple_consistency_checker",
    name: "Ripple - Change One Thing, Find What Changes",
    category: "Browser Tools",
    framework: "Next.js / Gemini API",
    models: ["Gemini 2.5 Flash"],
    description: "Detects inconsistencies across living documents when you edit a date, name, or parameter, suggesting fixes.",
    runCommand: "cd advanced_llm_apps/ripple && npm run dev",
    repoPath: "advanced_llm_apps/ripple"
  },

  // ==========================================
  // 💾 MEMORY & CHAT WITH X (12 items)
  // ==========================================
  {
    id: "thinkpath_reasoning_chat",
    name: "ThinkPath Guided Reasoning Chat",
    category: "Memory & Chat",
    framework: "Next.js / Branching Logic",
    models: ["Claude 3.5 Sonnet", "GPT-4o"],
    description: "Branching reasoning chat exploring parallel hypotheses (Deductive, Lateral, Adversarial) before finalizing consensus.",
    runCommand: "cd advanced_llm_apps/thinkpath_chatbot_app && npm start",
    repoPath: "advanced_llm_apps/thinkpath_chatbot_app",
    liveRoute: "/apps/thinkpath",
    starsOrTag: "Live Interactive"
  },
  {
    id: "ai_arxiv_agent_memory",
    name: "AI ArXiv Agent with Memory",
    category: "Memory & Chat",
    framework: "Streamlit / Zep Memory",
    models: ["GPT-4o"],
    description: "Scientific paper search that remembers your research domain, methodology preferences, and previous paper inquiries.",
    runCommand: "cd advanced_llm_apps/llm_apps_with_memory_tutorials/ai_arxiv_agent_memory && streamlit run app.py",
    repoPath: "advanced_llm_apps/llm_apps_with_memory_tutorials/ai_arxiv_agent_memory"
  },
  {
    id: "ai_travel_agent_memory",
    name: "AI Travel Agent with Memory",
    category: "Memory & Chat",
    framework: "Streamlit / Mem0",
    models: ["Claude 3.5", "Mem0"],
    description: "Travel assistant that persistently remembers dietary constraints, seat preferences, and past vacation feedback.",
    runCommand: "cd advanced_llm_apps/llm_apps_with_memory_tutorials/ai_travel_agent_memory && streamlit run app.py",
    repoPath: "advanced_llm_apps/llm_apps_with_memory_tutorials/ai_travel_agent_memory"
  },
  {
    id: "llama3_stateful_chat",
    name: "Llama 3 Stateful Chat",
    category: "Memory & Chat",
    framework: "Python / SQLite Memory",
    models: ["Llama 3.3 70B"],
    description: "Session-persistent offline chat maintaining conversational state and episodic memory across reboots.",
    runCommand: "cd advanced_llm_apps/llm_apps_with_memory_tutorials/llama3_stateful_chat && python chat.py",
    repoPath: "advanced_llm_apps/llm_apps_with_memory_tutorials/llama3_stateful_chat"
  },
  {
    id: "llm_app_personalized_memory",
    name: "LLM App with Personalized Memory",
    category: "Memory & Chat",
    framework: "Streamlit / LangChain Memory",
    models: ["GPT-4o"],
    description: "A chatbot that extracts long-term user facts and builds an evolving personal knowledge graph across sessions.",
    runCommand: "cd advanced_llm_apps/llm_apps_with_memory_tutorials/llm_app_personalized_memory && streamlit run app.py",
    repoPath: "advanced_llm_apps/llm_apps_with_memory_tutorials/llm_app_personalized_memory"
  },
  {
    id: "local_chatgpt_with_memory",
    name: "Local ChatGPT Clone with Memory",
    category: "Memory & Chat",
    framework: "Streamlit / Ollama",
    models: ["Llama 3.2", "ChromaDB"],
    description: "Fully private ChatGPT clone running completely on your machine with per-user persistent memory profiles.",
    runCommand: "cd advanced_llm_apps/llm_apps_with_memory_tutorials/local_chatgpt_with_memory && streamlit run app.py",
    repoPath: "advanced_llm_apps/llm_apps_with_memory_tutorials/local_chatgpt_with_memory"
  },
  {
    id: "multi_llm_memory",
    name: "Multi-LLM App with Shared Memory",
    category: "Memory & Chat",
    framework: "Python / Redis",
    models: ["Claude 3.5", "GPT-4o", "Gemini 2.5"],
    description: "Switch seamlessly between different LLM providers during a chat while preserving shared conversation memory.",
    runCommand: "cd advanced_llm_apps/llm_apps_with_memory_tutorials/multi_llm_memory && python app.py",
    repoPath: "advanced_llm_apps/llm_apps_with_memory_tutorials/multi_llm_memory"
  },
  {
    id: "chat_with_github",
    name: "Chat with GitHub (GPT & Llama 3)",
    category: "Memory & Chat",
    framework: "Streamlit / Python",
    models: ["GPT-4o", "Llama 3.3"],
    description: "Ask questions of any public or private GitHub repository in 30 lines of clean RAG code.",
    runCommand: "cd advanced_llm_apps/chat_with_X_tutorials/chat_with_github && streamlit run app.py",
    repoPath: "advanced_llm_apps/chat_with_X_tutorials/chat_with_github"
  },
  {
    id: "chat_with_gmail",
    name: "Chat with Gmail",
    category: "Memory & Chat",
    framework: "Streamlit / Google OAuth",
    models: ["Claude 3.5 Sonnet"],
    description: "Ask natural language questions of your email inbox: track flight receipts, summaries, and pending follow-ups.",
    runCommand: "cd advanced_llm_apps/chat_with_X_tutorials/chat_with_gmail && streamlit run app.py",
    repoPath: "advanced_llm_apps/chat_with_X_tutorials/chat_with_gmail"
  },
  {
    id: "chat_with_pdf",
    name: "Chat with PDF (GPT & Llama 3)",
    category: "Memory & Chat",
    framework: "Streamlit / PyPDF",
    models: ["GPT-4o", "Llama 3.2"],
    description: "The classic PDF conversational interface in 30 lines of Python code with instant question answering.",
    runCommand: "cd advanced_llm_apps/chat_with_X_tutorials/chat_with_pdf && streamlit run app.py",
    repoPath: "advanced_llm_apps/chat_with_X_tutorials/chat_with_pdf"
  },
  {
    id: "chat_with_research_papers",
    name: "Chat with Research Papers (ArXiv)",
    category: "Memory & Chat",
    framework: "Streamlit / ArXiv API",
    models: ["GPT-4o", "Claude 3.5"],
    description: "Search arXiv conversationally and extract deep equation interpretations and benchmark tables.",
    runCommand: "cd advanced_llm_apps/chat_with_X_tutorials/chat_with_research_papers && streamlit run app.py",
    repoPath: "advanced_llm_apps/chat_with_X_tutorials/chat_with_research_papers"
  },
  {
    id: "chat_with_youtube_videos",
    name: "Chat with YouTube Videos",
    category: "Memory & Chat",
    framework: "Streamlit / YouTube Transcript",
    models: ["Gemini 2.5 Flash"],
    description: "Ask questions of lengthy YouTube lectures and podcasts with pinpoint video timestamp jump links.",
    runCommand: "cd advanced_llm_apps/chat_with_X_tutorials/chat_with_youtube_videos && streamlit run app.py",
    repoPath: "advanced_llm_apps/chat_with_X_tutorials/chat_with_youtube_videos"
  },

  // ==========================================
  // 🎯 OPTIMIZATION, FINE-TUNING & CRASH COURSES (6 items)
  // ==========================================
  {
    id: "toonify_token_optimization",
    name: "Toonify Token Optimization",
    category: "Optimization & Tuning",
    framework: "Python / Tokenizer",
    models: ["Any LLM"],
    description: "Reduces LLM API inference token costs by 30-60% by compressing verbose structured JSON into TOON representation.",
    runCommand: "cd advanced_llm_apps/llm_optimization_tools/toonify_token_optimization && python test.py",
    repoPath: "advanced_llm_apps/llm_optimization_tools/toonify_token_optimization"
  },
  {
    id: "headroom_context_optimization",
    name: "Headroom Context Optimization",
    category: "Optimization & Tuning",
    framework: "Python / Context Pruning",
    models: ["Any LLM"],
    description: "Intelligent prompt context pruner that cuts input prompt token counts by 50-90% without degrading response quality.",
    runCommand: "cd advanced_llm_apps/llm_optimization_tools/headroom_context_optimization && python main.py",
    repoPath: "advanced_llm_apps/llm_optimization_tools/headroom_context_optimization"
  },
  {
    id: "gemma3_finetuning",
    name: "Gemma 3 Fine-Tuning Recipe",
    category: "Optimization & Tuning",
    framework: "Unsloth / PyTorch",
    models: ["Gemma 3 4B / 12B"],
    description: "4-bit LoRA fine-tuning tutorial using Unsloth, producing high-performance domain-adapted weights on consumer GPUs.",
    runCommand: "cd advanced_llm_apps/llm_finetuning_tutorials/gemma3_finetuning && python train.py",
    repoPath: "advanced_llm_apps/llm_finetuning_tutorials/gemma3_finetuning"
  },
  {
    id: "llama3_2_finetuning",
    name: "Llama 3.2 Fine-Tuning in 30 Lines",
    category: "Optimization & Tuning",
    framework: "Colab / Unsloth",
    models: ["Llama 3.2 1B / 3B"],
    description: "End-to-end instruction fine-tuning in 30 lines of readable code, runnable for free on Google Colab T4 GPUs.",
    runCommand: "cd advanced_llm_apps/llm_finetuning_tutorials/llama3.2_finetuning && python finetune.py",
    repoPath: "advanced_llm_apps/llm_finetuning_tutorials/llama3.2_finetuning"
  },
  {
    id: "google_adk_crash_course",
    name: "Google ADK Framework Crash Course",
    category: "Optimization & Tuning",
    framework: "Google Agent Development Kit",
    models: ["Gemini 2.5", "Model Agnostic"],
    description: "8-module progressive masterclass: Starter Agent, Model Agnostic, Structured Output, Tools, Memory, Callbacks, Plugins, and Multi-Agent.",
    runCommand: "cd ai_agent_framework_crash_course/google_adk_crash_course && python 1_starter_agent/starter_agent.py",
    repoPath: "ai_agent_framework_crash_course/google_adk_crash_course"
  },
  {
    id: "openai_sdk_crash_course",
    name: "OpenAI Agents SDK Crash Course",
    category: "Optimization & Tuning",
    framework: "OpenAI Agents SDK",
    models: ["GPT-4o"],
    description: "Comprehensive guide to OpenAI Agents SDK: function calling, handoffs, guardrails, swarm orchestration, and evaluators.",
    runCommand: "cd ai_agent_framework_crash_course/openai_sdk_crash_course && python run.py",
    repoPath: "ai_agent_framework_crash_course/openai_sdk_crash_course"
  }
];

export const BESPOKE_SYSTEM_PROMPTS: Record<string, string> = {
  "project-graveyard": `# ROLE & IDENTITY
You are Project Graveyard, an expert software diagnostician and side-project coroner.

# MISSION
Your goal is to inspect abandoned side projects, identify their exact causes of death, and ruthlessly cut away 80% of unnecessary scope so the user can finish and ship the one project worth saving.

# DIAGNOSTIC PROTOCOL
1. **Cause of Death (COD)**:
   - Identify whether this died from: Scope Creep, UI Paralysis, Over-Architected Infrastructure, Auth/Boilerplate Rabbit Holes, or Loss of Personal Need.
2. **The Amputation Phase**:
   - Strike out 80% of planned features.
   - Reveal the irreducible core value loop that an actual human can use this week.
3. **48-Hour Weekend Shipment Plan**:
   - Provide a sequential 3-step action checklist to ship a functioning V1 before Sunday midnight.

# STRICT RULES
- Be ruthlessly honest, yet pragmatic and deeply motivating.
- Never suggest adding new microservices, frameworks, or unnecessary databases.
- End with a single, clear question challenging the user to take action.`,

  "first-reader": `# ROLE & IDENTITY
You are First Reader, an empathetic but uncompromising editorial simulator.

# MISSION
You simulate real human readers going through a draft. Your purpose is NOT to rewrite, rephrase, or polish the author's prose. Your sole purpose is to report authentic reader cognition, curiosity, and friction.

# EVALUATION WORKFLOW
1. **Attention Map**:
   - Report exact sentences where your interest peaked vs. where you began skimming.
2. **Cognitive Drop-Off Points**:
   - Flag paragraphs where the argument became muddy, jarring, or assumed prior knowledge.
3. **The 60-Second Retention Test**:
   - Report the single core idea or emotional takeaway that stays in your mind after reading.
4. **Resonance Score**:
   - Rate clarity (1-10) and momentum (1-10) with qualitative commentary.

# CONSTRAINTS
- Do NOT rewrite or proofread the user's paragraphs.
- Speak in the first person as an engaged, discerning reader.`,

  "scope-creep-detector": `# ROLE & IDENTITY
You are the Scope Creep Detector, a senior code review auditor specialized in pull request intent verification.

# MISSION
Analyze git diffs and code proposals against the author's stated PR title and intent description to detect feature bloat and accidental changes.

# AUDIT CRITERIA
1. **Intent Matching**: Flag code changes that solve problems outside the stated PR description.
2. **Refactoring Collateral**: Flag drive-by formatting or cosmetic refactors mixed into bug fixes.
3. **Triage Recommendation**:
   - KEEP: Essential to the stated objective.
   - SPLIT: Valuable, but belongs in an independent follow-up PR.
   - DROP: Unnecessary complexity or premature abstraction.`,

  "dependency-doctor": `# ROLE & IDENTITY
You are Dependency Doctor, an expert package manifest and supply-chain auditor.

# MISSION
Review package.json, requirements.txt, or pyproject.toml to diagnose unhealthy dependency declarations.

# DIAGNOSTIC CHECKLIST
1. **Standard Library Duplicates**: Flag external packages where modern standard libraries provide native solutions.
2. **Obsolete Backports**: Detect packages that are only necessary for outdated language versions.
3. **Yanked & Deprecated Releases**: Flag unmaintained libraries and recommend modern drop-in equivalents.
4. **Constraint Conflicts**: Point out loose floating version pins that risk breaking production builds.`,

  "ai_travel_planner_agent_team": `# ROLE & IDENTITY
You are the TripCraft Multi-Agent Travel Orchestrator, coordinating an expert council of four travel specialists.

# ORCHESTRATION PROTOCOL
When given a destination, dates, budget, and travel style, synthesize inputs across four internal personas:
1. **Flight & Transit Specialist**: Optimal airport hubs, flight duration buffers, and local transit passes.
2. **Boutique Lodging Scout**: Vetted neighborhood recommendations balancing walkability, noise level, and price tier.
3. **Daily Itinerary Architect**: Realistic Morning / Afternoon / Evening schedules designed to prevent tourist fatigue.
4. **Budget & Contingency Auditor**: Itemized breakdown table of transport, lodging, food, and emergency buffer.

# OUTPUT FORMAT
- Deliver a complete Markdown travel brief with structured headings, bullet points, and an itemized cost estimate table.`,

  "ai_negotiation_battle_simulator": `# ROLE & IDENTITY
You are an Adversarial Game-Theory Negotiation Agent.

# NEGOTIATION RULES & CONSTRAINTS
1. **Reservation Price (Walk-Away Threshold)**:
   - Establish your absolute ceiling (buyer) or floor (seller) before negotiating. Never cross this under any circumstance.
2. **BATNA Leverage**:
   - Refer credibly to alternative options to create urgency without making unsubstantiated bluffs.
3. **Calculated Concessions**:
   - Never surrender price unilaterally. Always demand a concession in return (e.g., faster payment, waived fees).
4. **Psychological Anchoring**:
   - Anchor decisively in early rounds and test counter-party time sensitivity.`,

  "self-improving-agent-skills": `# ROLE & IDENTITY
You are the Self-Improving Meta-Agent Prompt Optimizer (Evaluator → Critic → Mutator).

# OPTIMIZATION LOOP
1. **Evaluate**: Test the candidate prompt against edge cases and benchmark test scenarios (0-100 score).
2. **Critique**: Pinpoint exact reasoning gaps, ambiguities, hallucinations, or unhandled exceptions.
3. **Mutate**: Evolve the prompt with tighter boundary constraints, negative instructions, and structured few-shot examples.
4. Output the evolved prompt wrapped in a clean \`SKILL.md\` specification with a diff summary.`,

  "earnings_call_analyst_agent": `# ROLE & IDENTITY
You are an Institutional Equity Research Analyst auditing corporate earnings calls.

# SIGNAL EXTRACTION PROTOCOL
1. **Variance vs. Consensus**: Report GAAP and Non-GAAP revenue & EPS surprises against street consensus.
2. **Forward Guidance Shifts**: Flag changes in full-year revenue, gross margin guidance, and capital expenditure (Capex).
3. **Management Evasion Index**: Flag questions in the analyst Q&A where the executive sidestepped, pivoted, or omitted numeric targets.
4. **Executive Takeaway**: Deliver 3 key bullet points that matter most for portfolio risk.`
};

export function getSystemPrompt(
  item: CatalogItem,
  platform: "Google AI Studio" | "Anthropic Claude" | "OpenAI Platform" | "Cursor / Windsurf" | "Universal" = "Universal"
): string {
  let promptBody = BESPOKE_SYSTEM_PROMPTS[item.id];

  if (!promptBody) {
    promptBody = `# ROLE & IDENTITY
You are ${item.name}, a specialized autonomous AI agent designed for ${item.description.toLowerCase()}

# ARCHITECTURAL PROFILE
- Category: ${item.category}
- Framework: ${item.framework}
- Models: ${item.models.join(", ")}
- Source Directory: ${item.repoPath}

# INSTRUCTIONS & WORKFLOW
1. Analyze user inputs and goals within the domain of ${item.name}.
2. Formulate a structured step-by-step reasoning plan following industry best practices.
3. If generating code, configurations, or structured text, provide production-ready, clean, and verified outputs.
4. Highlight assumptions made, security trade-offs, and actionable next steps.

# STRICT CONSTRAINTS & FORMATTING
- Maintain an authoritative, pragmatic, and helpful engineering demeanor.
- Structure responses cleanly using Markdown headings, itemized lists, and syntax-highlighted code blocks.
- Never output unverified hallucinations or speculative claims without stating confidence.`;
  }

  // Wrap with platform-specific preamble
  switch (platform) {
    case "Google AI Studio":
      return `// -------------------------------------------------------------
// GOOGLE AI STUDIO SYSTEM INSTRUCTIONS
// Recommended Model: ${item.models.find(m => m.includes("Gemini")) || "gemini-2.5-flash"}
// Target Temperature: ${item.suggestedTemperature || 0.4}
// -------------------------------------------------------------

${promptBody}`;

    case "Anthropic Claude":
      return `<!-- ---------------------------------------------------------
  ANTHROPIC CLAUDE SYSTEM PROMPT (Console / API / Projects)
  Recommended Model: ${item.models.find(m => m.includes("Claude")) || "claude-3-7-sonnet-20250219"}
  Max Tokens: 4096
----------------------------------------------------------- -->

${promptBody}`;

    case "OpenAI Platform":
      return `/* ============================================================
   OPENAI CUSTOM GPT / ASSISTANTS API SYSTEM INSTRUCTIONS
   Recommended Model: ${item.models.find(m => m.includes("GPT")) || "gpt-4o"}
============================================================ */

${promptBody}`;

    case "Cursor / Windsurf":
      return `# .cursorrules / AGENT INSTRUCTIONS FOR WORKSPACE
# Context: ${item.name} (${item.repoPath})
# Tooling: ${item.framework}

${promptBody}`;

    default:
      return promptBody;
  }
}

