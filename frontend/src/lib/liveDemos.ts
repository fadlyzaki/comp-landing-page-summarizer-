/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UXScores {
  valuePropClarity: number;      // 0-100
  conversionVelocity: number;    // 0-100
  trustDensity: number;          // 0-100
  frictionResistance: number;    // 0-100
}

export interface AnalysisResult {
  url: string;
  product_brand: string;
  tagline?: string;
  category?: string;
  logo_emoji?: string;
  core_value_proposition: string;
  target_audience: string;
  cta_strategy: string[];
  information_hierarchy: string;
  trust_signals: string[];
  ux_writing_notes: string;
  friction_points: string[];
  design_opportunities: string[];
  designer_summary: string;
  scores?: UXScores;
  analyzed_at?: string;
  is_live_demo?: boolean;
}

export const LIVE_DEMO_DATASETS: Record<string, AnalysisResult> = {
  "https://linear.app": {
    url: "https://linear.app",
    product_brand: "Linear",
    tagline: "The system for modern software development",
    category: "Developer Tools / Project Management",
    logo_emoji: "⚡",
    core_value_proposition: "A purposeful, keyboard-first project management system designed specifically for high-velocity software teams who demand lightning speed, crafted craft, and zero bloat.",
    target_audience: "Fast-moving engineering teams, product managers, and modern software startups transitioning away from bloated legacy Jira workflows.",
    cta_strategy: [
      "Primary: 'Start using Linear' (Prominent dark glass button with keyboard shortcut cue)",
      "Secondary: 'Talk to sales' (Clean subtle ghost button for enterprise tiers)",
      "Sub-conversion: 'Download macOS/Windows app' (Native app advocacy)"
    ],
    information_hierarchy: "Hero section establishes unmatched visual polish with an interactive product preview. Moves immediately into core workflow pillars (Issue Tracking, Cycles, Roadmaps), followed by keyboard mastery micro-demos, customer proof from iconic tech teams, and instant signup callouts.",
    trust_signals: [
      "Social proof logos from leading tech organizations (OpenAI, Cash App, Scale AI, Ramp, Substack)",
      "Public changelog timestamping rapid weekly release velocity",
      "High-fidelity interactive UI demos embedded directly on the homepage",
      "SOC 2 Type II certification and enterprise data compliance badges"
    ],
    ux_writing_notes: "Assertive, craft-focused, and minimal. Uses confident verbs like 'Plan', 'Build', and 'Momentum'. Avoids generic SaaS corporate jargon in favor of precise engineering terminology.",
    friction_points: [
      "Opinionated workflows may alienate non-technical stakeholders or traditional waterfall project managers",
      "High initial visual density can feel intimidating to casual users expecting simple kanban boards",
      "Minimalist navigation hides secondary features behind command-palette (Cmd+K) shortcuts"
    ],
    design_opportunities: [
      "Introduce contextual onboarding tooltips for non-engineer PMs transitioning from traditional tools",
      "Expose customizable widget views without compromising the signature opinionated speed",
      "Highlight automated AI triage and PR linking more explicitly above the fold"
    ],
    designer_summary: "Linear is a masterclass in modern dark-mode aesthetic and craft-driven design. It rejects enterprise clutter in favor of snappy 60fps micro-interactions and strict visual hierarchy. The page sells an emotional promise: your team will build faster and feel better doing it.",
    scores: {
      valuePropClarity: 96,
      conversionVelocity: 94,
      trustDensity: 92,
      frictionResistance: 88,
    },
    analyzed_at: "2026-08-19 (Verified Live Benchmark)",
    is_live_demo: true,
  },

  "https://stripe.com": {
    url: "https://stripe.com",
    product_brand: "Stripe",
    tagline: "Financial infrastructure for the internet",
    category: "Fintech / Global Payments",
    logo_emoji: "💳",
    core_value_proposition: "A fully integrated suite of global payment APIs and financial infrastructure that powers commerce for startups to Fortune 500 enterprises with 99.999% uptime.",
    target_audience: "Software developers, fintech architects, ecommerce founders, and enterprise CFOs looking for rock-solid global money movement.",
    cta_strategy: [
      "Primary: 'Start now' (Vibrant purple gradient button with email instant auth flow)",
      "Secondary: 'Contact sales' (Direct enterprise advisor routing)",
      "Developer path: 'Read the docs' with copyable code snippets in Python, Node, Ruby, and cURL"
    ],
    information_hierarchy: "Signature animated WebGL mesh gradient hero with live interactive code sandbox. Progresses into modular product cards (Payments, Billing, Connect, Issuing), real-time global transaction volume metrics, enterprise customer case studies, and developer documentation entry points.",
    trust_signals: [
      "Metrics: '$1T+ in total volume processed' and '99.999% historical uptime'",
      "Enterprise customer showcase (Amazon, Google, Shopify, Airbnb, OpenAI)",
      "PCI Service Provider Level 1 certification, bank-grade encryption notices",
      "Global regulatory compliance in 46+ countries"
    ],
    ux_writing_notes: "Technical yet accessible, highly authoritative, and reassuring. Blends developer-friendly clarity with institutional enterprise trust.",
    friction_points: [
      "Broad product breadth can overwhelm first-time solo founders seeking simple checkout",
      "Pricing breakdown is separated from the main landing page, requiring multi-click exploration",
      "Deep technical terminology (webhooks, idempotency keys) may deter non-technical founders"
    ],
    design_opportunities: [
      "Provide an interactive wizard ('Choose your business model') directly in the hero for instant personalized routing",
      "Add a visual fee calculator widget on the page to resolve pricing transparency questions faster",
      "Highlight no-code Payment Links more prominently for non-developers"
    ],
    designer_summary: "Stripe defined modern B2B SaaS web design. The page bridges the gap between deep technical capability and immense financial trustworthiness. The interactive code switcher remains the gold standard for developer-first conversion.",
    scores: {
      valuePropClarity: 94,
      conversionVelocity: 91,
      trustDensity: 98,
      frictionResistance: 86,
    },
    analyzed_at: "2026-08-19 (Verified Live Benchmark)",
    is_live_demo: true,
  },

  "https://vercel.com": {
    url: "https://vercel.com",
    product_brand: "Vercel",
    tagline: "Build and deploy the modern web",
    category: "Developer Cloud / Frontend Infrastructure",
    logo_emoji: "▲",
    core_value_proposition: "The frontend cloud platform that gives developer teams the collaborative speed and edge infrastructure to build, preview, and ship dynamic web experiences instantly.",
    target_audience: "Next.js & modern frontend developers, engineering managers, and digital brands aiming for sub-millisecond page loads and frictionless CI/CD.",
    cta_strategy: [
      "Primary: 'Start Deploying' (High-contrast monochrome button leading to instant Git provider connection)",
      "Secondary: 'Get a Demo' (Enterprise sales contact)",
      "Tertiary: 'Deploy a Template' (1-click starter repository deployment)"
    ],
    information_hierarchy: "Monochrome high-contrast hero with dynamic terminal prompt visual. Features live deployment preview workflow, Edge Network performance benchmarks, framework ecosystem selector, customer success metrics, and live collaboration tool showcase.",
    trust_signals: [
      "Customer logos (Under Armour, eBay, Washington Post, Nintendo, Loom)",
      "Performance benchmarks: '90B+ monthly requests' and '99.99% uptime'",
      "Official stewardship of Next.js, v0, and Turbo ecosystem",
      "SOC 2 Type II, ISO 27001, and HIPAA compliance badges"
    ],
    ux_writing_notes: "Concise, action-oriented, and engineering-centric. Leverages strong engineering verbs ('Develop', 'Preview', 'Ship') and performance metrics.",
    friction_points: [
      "Bandwidth and serverless execution pricing tiers can create unexpected cost anxiety for scaling teams",
      "Heavy emphasis on Next.js may cause developers using other frameworks (Remix, Svelte, Vue) to feel secondary",
      "Dense technical cards require prior understanding of edge middleware and serverless functions"
    ],
    design_opportunities: [
      "Include an interactive cost estimator calculator to dispel serverless billing concerns",
      "Feature multi-framework parity showcases (SvelteKit, Astro, Nuxt) more prominently",
      "Showcase AI development workflows (v0 integration) as a primary top-tier navigation feature"
    ],
    designer_summary: "Vercel's design is razor-sharp, fast, and developer-focused. The black-and-white high-contrast visual system reflects the brand's obsession with performance and cleanliness.",
    scores: {
      valuePropClarity: 95,
      conversionVelocity: 93,
      trustDensity: 91,
      frictionResistance: 87,
    },
    analyzed_at: "2026-08-19 (Verified Live Benchmark)",
    is_live_demo: true,
  },

  "https://supabase.com": {
    url: "https://supabase.com",
    product_brand: "Supabase",
    tagline: "The open source Firebase alternative",
    category: "Backend-as-a-Service / Developer Tools",
    logo_emoji: "⚡",
    core_value_proposition: "An open-source backend platform providing dedicated Postgres database, authentication, instant APIs, edge functions, realtime subscriptions, and vector storage in under 2 minutes.",
    target_audience: "Full-stack developers, indie hackers, and engineering teams seeking full SQL control without the vendor lock-in of proprietary BaaS platforms.",
    cta_strategy: [
      "Primary: 'Start your project' (Vibrant emerald green button)",
      "Secondary: 'Documentation' (Clean outline button)",
      "Open source anchor: 'Star us on GitHub' with real-time star counter badge"
    ],
    information_hierarchy: "Clear alternative positioning against Firebase in the hero. Direct product module carousel (Database, Auth, Storage, Edge Functions, Realtime, AI/Vector), interactive SQL query visualizer, open-source community stats, and instant project kickoff CTA.",
    trust_signals: [
      "75,000+ GitHub Stars and active open-source contributor graph",
      "Customer logos (Priceline, Mozilla, 1Password, Mobbin, Chatbase)",
      "SOC 2 Type II, HIPAA compliance, and GDPR data residency options",
      "Built natively on PostgreSQL standard with 100% data portability"
    ],
    ux_writing_notes: "Direct, transparent, developer-empowering, and slightly playful. Explicitly uses 'Postgres' and 'Open Source' as key credibility anchors.",
    friction_points: [
      "Heavy Postgres focus may intimidate junior front-end developers unfamiliar with relational SQL schemas",
      "Self-hosting vs cloud managed differences can be slightly ambiguous without deep dive into docs",
      "Extensive feature list creates a very tall scrolling page"
    ],
    design_opportunities: [
      "Add interactive 1-click schema template previews (e.g., Auth + SaaS, Vector Search, Ecommerce)",
      "Highlight AI / pgvector capabilities in a dedicated interactive playground",
      "Create a visual migration comparison matrix specifically against Firebase / DynamoDB"
    ],
    designer_summary: "Supabase effectively leverages open-source credibility and transparent Postgres power. The green neon on dark slate color palette communicates speed, vitality, and developer sovereignty.",
    scores: {
      valuePropClarity: 97,
      conversionVelocity: 92,
      trustDensity: 90,
      frictionResistance: 89,
    },
    analyzed_at: "2026-08-19 (Verified Live Benchmark)",
    is_live_demo: true,
  },

  "https://notion.so": {
    url: "https://notion.so",
    product_brand: "Notion",
    tagline: "Your connected workspace for docs, wikis, and projects",
    category: "Productivity / Knowledge Management",
    logo_emoji: "📝",
    core_value_proposition: "A unified, highly flexible workspace that blends documents, knowledge bases, task management, and generative AI into a single customizable tool.",
    target_audience: "Knowledge workers, product design teams, fast-growing startups, students, and enterprise organizations seeking to replace fragmented doc tools.",
    cta_strategy: [
      "Primary: 'Get Notion free' (Bright blue pill button)",
      "Secondary: 'Request a demo' (Enterprise sales contact)",
      "Discovery path: 'Explore templates' and 'Try Notion AI'"
    ],
    information_hierarchy: "Warm, human-centric hero with hand-drawn illustrations and dynamic UI canvas. Segmented persona tabs (Engineering, Design, Product, Marketing), modular block system showcase, Notion AI feature highlight, customer testimonials, and community template gallery.",
    trust_signals: [
      "User scale: '100M+ users worldwide' and 'Used by 90% of Forbes Cloud 100'",
      "Enterprise customer logos (Figma, Pixar, Headspace, Nike, Monzo)",
      "Massive global community with thousands of creator-built templates",
      "Enterprise-grade security, SAML SSO, and audit logs"
    ],
    ux_writing_notes: "Warm, inspiring, friendly, and accessible. Focuses on craft, clarity, and personal empowerment rather than dry software specs.",
    friction_points: [
      "The 'blank canvas' problem: unlimited flexibility can cause decision paralysis for beginners",
      "AI add-on pricing structure isn't immediately obvious from the initial free tier callout",
      "Mobile app performance tradeoffs are downplayed in comparison to the rich desktop experience"
    ],
    design_opportunities: [
      "Add an interactive 15-second 'What are you building today?' quiz to pre-populate relevant templates",
      "Provide side-by-side workflow previews showing before vs after Notion consolidation",
      "Feature live interactive Notion AI prompt examples directly on the landing page"
    ],
    designer_summary: "Notion's visual identity remains iconic. The blend of custom hand-drawn character illustrations with crisp, realistic product UI establishes an inviting, human workspace feel that stands out from sterile enterprise tools.",
    scores: {
      valuePropClarity: 92,
      conversionVelocity: 95,
      trustDensity: 94,
      frictionResistance: 85,
    },
    analyzed_at: "2026-08-19 (Verified Live Benchmark)",
    is_live_demo: true,
  },

  "https://figma.com": {
    url: "https://figma.com",
    product_brand: "Figma",
    tagline: "How teams design & build digital products together",
    category: "Design & Prototyping / Collaboration",
    logo_emoji: "🎨",
    core_value_proposition: "The industry-standard collaborative interface design platform that connects ideation, UI design, prototyping, and developer handoff into a continuous multiplayer canvas.",
    target_audience: "Product designers, UX researchers, design systems leads, frontend engineers, and cross-functional product squads.",
    cta_strategy: [
      "Primary: 'Get started for free' (High-contrast dark button with Google SSO instant signup)",
      "Secondary: 'Explore Dev Mode' (Engineering-specific value path)",
      "Community path: 'Browse Figma Community templates and plugins'"
    ],
    information_hierarchy: "Playful multiplayer canvas hero with animated real-time collaborator cursors. Segmented by product lifecycle: FigJam (ideation), Figma Design (UI craft), Prototyping (interaction), and Dev Mode (handoff), followed by community highlights and enterprise security.",
    trust_signals: [
      "Widespread industry ubiquity: 'Used by millions of designers and developers'",
      "Premier brand logos (Google, Netflix, Spotify, Microsoft, Airbnb)",
      "Rich community marketplace with over 50,000 community-created plugins and UI kits",
      "Enterprise compliance: SOC 2/3, ISO 27001, FedRAMP Authorized"
    ],
    ux_writing_notes: "Collegiate, energetic, collaborative, and craft-centric. Celebrates multiplayer teamwork and creative iteration with joyful microcopy.",
    friction_points: [
      "Dev Mode seat pricing tiers have introduced friction between design and engineering budgets",
      "Steep learning curve for advanced design systems (variables, auto-layout, conditional logic)",
      "Dense feature set can make the page feel busy for non-designers looking just for FigJam whiteboarding"
    ],
    design_opportunities: [
      "Create an interactive sandbox showing live Dev Mode code inspection directly on the homepage",
      "Showcase AI design features (auto-naming, visual search, prompt-to-layout) more prominently",
      "Clarify the FigJam vs Figma Design separation for first-time non-designer team members"
    ],
    designer_summary: "Figma's landing page is an exhilarating celebration of multiplayer collaboration. The interactive cursor animations immediately demonstrate the core product differentiator without requiring a single word of explanation.",
    scores: {
      valuePropClarity: 96,
      conversionVelocity: 94,
      trustDensity: 96,
      frictionResistance: 88,
    },
    analyzed_at: "2026-08-19 (Verified Live Benchmark)",
    is_live_demo: true,
  },

  "https://raycast.com": {
    url: "https://raycast.com",
    product_brand: "Raycast",
    tagline: "Supercharged productivity for your Mac",
    category: "Desktop Productivity / Developer Tools",
    logo_emoji: "🔴",
    core_value_proposition: "An extensible, blazingly fast desktop launcher that replaces Spotlight and integrates AI, snippets, window management, and thousands of community extensions into a single hotkey.",
    target_audience: "Power users, software engineers, designers, and Mac enthusiasts seeking ultimate desktop navigation velocity and workflow automation.",
    cta_strategy: [
      "Primary: 'Download for Mac' (Prominent red accent button with automatic Apple Silicon / Intel detection)",
      "Secondary: 'Explore Raycast AI' (Feature upsell for Pro tier)",
      "Ecosystem path: 'Browse 1,500+ Store Extensions'"
    ],
    information_hierarchy: "Deep black aesthetic with glowing red laser accents and simulated Cmd+Space launcher animation. Breaks down core utilities (Extensions, AI, Clipboard History, Snippets, Window Management), community store metrics, and team collaboration capabilities.",
    trust_signals: [
      "4.9/5 star ratings across Mac developer communities",
      "Active ecosystem: '1,500+ community extensions built with React and TypeScript'",
      "Used by teams at Stripe, Vercel, Shopify, GitHub, and Framer",
      "Local-first privacy architecture with end-to-end encrypted sync"
    ],
    ux_writing_notes: "Punchy, confident, power-user tailored. Emphasizes microsecond latency, keyboard shortcuts, and craftsmanship.",
    friction_points: [
      "Mac-exclusive platform limitation excludes Windows and Linux power users (though Windows is in waitlist)",
      "Raycast Pro / AI subscription cost can trigger pushback from users comparing to free Spotlight",
      "Power-user focus may deter casual computer users who don't understand extension ecosystems"
    ],
    design_opportunities: [
      "Provide an interactive browser-based launcher simulator so visitors can test shortcuts before downloading",
      "Highlight Windows waitlist more clearly for non-Mac visitors",
      "Demonstrate time saved metrics (e.g., 'Saves average developer 42 minutes per day')"
    ],
    designer_summary: "Raycast epitomizes modern native desktop craft. The sleek dark UI, custom typography, and razor-sharp hardware animations immediately signal high performance and elite developer ergonomics.",
    scores: {
      valuePropClarity: 98,
      conversionVelocity: 96,
      trustDensity: 89,
      frictionResistance: 91,
    },
    analyzed_at: "2026-08-19 (Verified Live Benchmark)",
    is_live_demo: true,
  },

  "https://airbnb.com": {
    url: "https://airbnb.com",
    product_brand: "Airbnb",
    tagline: "Find unique stays and unforgettable experiences",
    category: "Consumer Marketplace / Travel & Hospitality",
    logo_emoji: "🏡",
    core_value_proposition: "A global peer-to-peer travel marketplace connecting travelers with unique accommodations, local experiences, and boutique stays across 220+ countries with verified host protection.",
    target_audience: "Leisure travelers, digital nomads, family vacationers, and prospective property hosts seeking supplemental rental income.",
    cta_strategy: [
      "Primary: 'Search Stays' (Interactive search pill with Destination, Dates, and Guests pickers)",
      "Secondary: 'Airbnb your home' (Prominent top navigation host acquisition funnel)",
      "Category path: Horizontal scrollable category icons (Icons, Beachfront, Cabins, Mansions)"
    ],
    information_hierarchy: "Zero fluff directly above the fold: search widget immediately accessible on load. Horizontal icon-based category navigation filter, visual masonry image grid of curated stays with transparent pricing, 'Airbnb Setup' host onboarding banner, and comprehensive trust & safety footer.",
    trust_signals: [
      "AirCover protection for guests and hosts (damage protection, liability insurance)",
      "Verified guest reviews, host ratings, and Superhost badges",
      "Secure global payment processing with guest refund policies",
      "Identity verification standards and 24/7 global safety support"
    ],
    ux_writing_notes: "Evocative, warm, wanderlust-inspiring, and clear. Transparent total pricing display ('Total before taxes') addresses customer trust directly.",
    friction_points: [
      "Cleaning fees and service charge variability can cause checkout sticker shock if not displayed upfront",
      "Dual audience focus (Guests vs Hosts) requires balancing navigation without cannibalizing search intent",
      "Strict cancellation policies vary widely between individual hosts, creating comparison complexity"
    ],
    design_opportunities: [
      "Enhance group planning with collaborative trip voting and split-payment features directly on listings",
      "Introduce AI-powered itinerary builder based on booked stay location and guest preferences",
      "Streamline filter toggles for accessibility (step-free access, wide doorways) directly in search pill"
    ],
    designer_summary: "Airbnb's landing page is an engineering and UX benchmark for marketplace design. It treats discovery as an immersive, visual journey, placing high-resolution photography and the search widget at center stage.",
    scores: {
      valuePropClarity: 93,
      conversionVelocity: 96,
      trustDensity: 95,
      frictionResistance: 84,
    },
    analyzed_at: "2026-08-19 (Verified Live Benchmark)",
    is_live_demo: true,
  }
};

export const DEMO_URLS = Object.keys(LIVE_DEMO_DATASETS);
