/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductSpecs {
  primary_segment: string;
  monetization_model: string;
  conversion_path: string;
  design_signature: string;
}

export interface AnalysisResult {
  url: string;
  product_brand: string;
  tagline?: string;
  category?: string;
  core_value_proposition: string;
  target_audience: string;
  cta_strategy: string[];
  information_hierarchy: string;
  trust_signals: string[];
  ux_writing_notes: string;
  friction_points: string[];
  design_opportunities: string[];
  designer_summary: string;
  specs?: ProductSpecs;
  analyzed_at?: string;
  is_live_demo?: boolean;
}

export const LIVE_DEMO_DATASETS: Record<string, AnalysisResult> = {
  "https://linear.app": {
    url: "https://linear.app",
    product_brand: "Linear",
    tagline: "The system for modern software development",
    category: "Project Management / Developer Tools",
    core_value_proposition: "A purposeful, keyboard-first project management system engineered specifically for high-velocity software teams who prioritize speed, craft, and streamlined workflows.",
    target_audience: "Fast-moving engineering teams, product managers, and modern software startups transitioning away from complex legacy enterprise trackers.",
    cta_strategy: [
      "Primary: 'Start using Linear' (Direct auth flow with keyboard shortcut hints)",
      "Secondary: 'Talk to sales' (Discrete contact path for enterprise teams)",
      "Native discovery: 'Download Desktop App' (Emphasizes native macOS/Windows performance)"
    ],
    information_hierarchy: "The hero opens with a high-fidelity interactive product preview. It immediately walks through core workflow pillars (Issue Tracking, Cycles, Roadmaps), followed by keyboard mastery micro-demos, customer proof from notable engineering organizations, and an instant signup prompt.",
    trust_signals: [
      "Customer proof from engineering-led companies (OpenAI, Cash App, Scale AI, Ramp, Substack)",
      "Public changelog highlighting weekly release rhythm",
      "Embedded 60fps interactive UI demos directly on the page",
      "SOC 2 Type II certification and enterprise data compliance notices"
    ],
    ux_writing_notes: "Assertive, craft-focused, and minimal. Uses active verbs like 'Plan', 'Build', and 'Momentum'. Avoids generic SaaS buzzwords in favor of precise engineering vocabulary.",
    friction_points: [
      "Opinionated keyboard-first workflows may require an adjustment period for non-technical stakeholders",
      "High information density can feel intense for casual users expecting simple kanban boards",
      "Minimalist navigation places several secondary features inside command-palette (Cmd+K) shortcuts"
    ],
    design_opportunities: [
      "Introduce contextual onboarding cues for non-engineer product managers",
      "Provide customizable view density toggles without compromising default speed",
      "Make automated AI triage and PR linking more prominent above the fold"
    ],
    designer_summary: "Linear exemplifies modern dark-mode craft and opinionated design. It eliminates visual clutter in favor of strict typography and snappy micro-interactions. The page communicates a distinct promise: your team will build faster and with greater clarity.",
    specs: {
      primary_segment: "Engineering-led Startups & Scaleups",
      monetization_model: "Freemium / Tiered Seat-Based SaaS",
      conversion_path: "Self-Serve Instant Signup (Google / GitHub)",
      design_signature: "Dark Mode / Keyboard-First Ergonomics",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://stripe.com": {
    url: "https://stripe.com",
    product_brand: "Stripe",
    tagline: "Financial infrastructure for the internet",
    category: "Financial Infrastructure / Global Payments",
    core_value_proposition: "A fully integrated suite of global payment APIs and financial infrastructure designed to support commerce for startups up to Fortune 500 enterprises with high reliability.",
    target_audience: "Software engineers, fintech architects, ecommerce founders, and finance leaders seeking dependable global money movement.",
    cta_strategy: [
      "Primary: 'Start now' (Prominent gradient button with quick email authentication)",
      "Secondary: 'Contact sales' (Direct enterprise advisor routing)",
      "Developer path: 'Explore documentation' with copyable code snippets in Python, Node, Ruby, and cURL"
    ],
    information_hierarchy: "Signature WebGL gradient visual paired with an interactive code preview. Progresses into modular product pillars (Payments, Billing, Connect, Issuing), real-time global volume metrics, enterprise customer case studies, and documentation entry points.",
    trust_signals: [
      "Documented scale: '$1T+ in total volume processed' and '99.999% historical uptime'",
      "Enterprise customer logos (Amazon, Google, Shopify, Airbnb, OpenAI)",
      "PCI Service Provider Level 1 certification and encryption standards",
      "Regulatory compliance across 46+ countries"
    ],
    ux_writing_notes: "Technical, authoritative, and clear. Balances developer-friendly API terminology with institutional credibility for executive buyers.",
    friction_points: [
      "Extensive product catalog can make discovery challenging for first-time solo founders wanting a simple checkout",
      "Detailed fee breakdowns require navigating away from the main landing page",
      "Technical jargon (webhooks, idempotency keys) may feel complex for non-technical operators"
    ],
    design_opportunities: [
      "Introduce an interactive business model selector in the hero for tailored product routing",
      "Embed a lightweight visual fee calculator to answer pricing questions upfront",
      "Surface no-code Payment Links more prominently for non-developers"
    ],
    designer_summary: "Stripe set the benchmark for modern developer-first SaaS design. The page effectively balances deep technical capability with institutional financial trust. The interactive code snippet switcher remains a model for developer conversion.",
    specs: {
      primary_segment: "Developers & Global Enterprises",
      monetization_model: "Usage-Based / Transaction-Fee Pricing",
      conversion_path: "Developer API Key / Enterprise Consultation",
      design_signature: "WebGL Gradients / Interactive Code Tabs",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://vercel.com": {
    url: "https://vercel.com",
    product_brand: "Vercel",
    tagline: "Build and deploy the modern web",
    category: "Developer Cloud / Frontend Infrastructure",
    core_value_proposition: "A frontend cloud platform providing developers and teams with collaborative speed and global edge infrastructure to develop, preview, and ship dynamic web applications.",
    target_audience: "Frontend engineers, full-stack developers, engineering leads, and digital teams aiming for high performance and zero-configuration CI/CD.",
    cta_strategy: [
      "Primary: 'Start Deploying' (High-contrast button leading to Git provider connection)",
      "Secondary: 'Get a Demo' (Enterprise sales contact)",
      "Template path: 'Browse Templates' (1-click starter repository deployment)"
    ],
    information_hierarchy: "Monochrome high-contrast hero with an animated terminal visual. Features live deployment workflow diagrams, Edge Network performance benchmarks, framework selector, customer metrics, and team collaboration tools.",
    trust_signals: [
      "Enterprise customer logos (Under Armour, eBay, Washington Post, Nintendo, Loom)",
      "Scale metrics: '90B+ monthly requests' and global edge coverage",
      "Official stewardship of Next.js, v0, and Turbo ecosystems",
      "SOC 2 Type II, ISO 27001, and HIPAA compliance badges"
    ],
    ux_writing_notes: "Concise, direct, and performance-oriented. Employs strong action verbs ('Develop', 'Preview', 'Ship') and precise performance metrics.",
    friction_points: [
      "Bandwidth and serverless execution tiers can cause cost questions for rapidly scaling projects",
      "Strong emphasis on Next.js may leave developers using other frameworks seeking dedicated documentation",
      "Dense technical cards require familiarity with serverless and edge computing concepts"
    ],
    design_opportunities: [
      "Include a visual bandwidth and compute estimator directly on the page",
      "Highlight framework parity showcases (SvelteKit, Astro, Nuxt) alongside Next.js",
      "Feature AI development tooling (v0 integration) as a primary top-tier workflow"
    ],
    designer_summary: "Vercel’s design is crisp, clean, and developer-focused. The black-and-white high-contrast visual system reinforces the brand's emphasis on speed and minimalist precision.",
    specs: {
      primary_segment: "Frontend Engineers & Modern Web Teams",
      monetization_model: "Freemium / Usage + Pro Subscription",
      conversion_path: "Git Repository Connection (GitHub / GitLab)",
      design_signature: "Monochrome / Geometric / High Contrast",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://supabase.com": {
    url: "https://supabase.com",
    product_brand: "Supabase",
    tagline: "The open source Firebase alternative",
    category: "Backend-as-a-Service / Developer Tools",
    core_value_proposition: "An open-source backend platform providing dedicated Postgres database, authentication, instant APIs, edge functions, realtime subscriptions, and vector storage.",
    target_audience: "Full-stack developers, indie hackers, and engineering teams seeking SQL control without vendor lock-in.",
    cta_strategy: [
      "Primary: 'Start your project' (Vibrant emerald button leading to instant project creation)",
      "Secondary: 'Documentation' (Clean outline button)",
      "Community proof: 'Star us on GitHub' with real-time repository count"
    ],
    information_hierarchy: "Direct alternative positioning in the hero. Clear product module overview (Database, Auth, Storage, Edge Functions, Realtime, AI/Vector), interactive SQL query visualizer, open-source community stats, and project kickoff CTA.",
    trust_signals: [
      "75,000+ GitHub Stars and active open-source contributor ecosystem",
      "Customer logos (Priceline, Mozilla, 1Password, Mobbin, Chatbase)",
      "SOC 2 Type II, HIPAA compliance, and GDPR data residency options",
      "Built natively on Postgres standards with complete data portability"
    ],
    ux_writing_notes: "Direct, transparent, developer-empowering, and approachable. Uses 'Postgres' and 'Open Source' as primary credibility pillars.",
    friction_points: [
      "Heavy Postgres focus may feel daunting for junior frontend developers unfamiliar with relational SQL",
      "Differences between self-hosting and managed cloud require reading documentation",
      "Extensive feature list creates a long scrolling page"
    ],
    design_opportunities: [
      "Add interactive 1-click starter template previews (e.g. Auth + SaaS, Vector Search)",
      "Provide a dedicated interactive playground for pgvector and AI workflows",
      "Include a direct migration comparison table against proprietary alternatives"
    ],
    designer_summary: "Supabase effectively leverages open-source transparency and Postgres capability. The green neon on dark slate color palette communicates speed, vitality, and developer independence.",
    specs: {
      primary_segment: "Full-Stack Developers & Open Source Builders",
      monetization_model: "Freemium / Managed Cloud + Enterprise",
      conversion_path: "Instant Project Spin-up (GitHub OAuth)",
      design_signature: "Emerald Neon / Dark Slate / Code Blocks",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://notion.so": {
    url: "https://notion.so",
    product_brand: "Notion",
    tagline: "Your connected workspace for docs, wikis, and projects",
    category: "Productivity / Knowledge Management",
    core_value_proposition: "A flexible, unified workspace that brings documents, knowledge bases, task management, and AI assistance together into a single customizable tool.",
    target_audience: "Knowledge workers, product teams, startups, students, and organizations seeking to consolidate fragmented documentation tools.",
    cta_strategy: [
      "Primary: 'Get Notion free' (Clean blue pill button leading to quick signup)",
      "Secondary: 'Request a demo' (Enterprise advisor contact)",
      "Discovery path: 'Explore templates' and 'Try Notion AI'"
    ],
    information_hierarchy: "Human-centric hero with custom illustrations and an interactive canvas. Persona-based tabs (Engineering, Design, Product, Marketing), modular block system showcase, Notion AI feature highlights, customer testimonials, and a community template gallery.",
    trust_signals: [
      "User scale: '100M+ users worldwide' and 'Used by 90% of Forbes Cloud 100'",
      "Enterprise customer logos (Figma, Pixar, Headspace, Nike, Monzo)",
      "Extensive global template marketplace built by creator community",
      "Enterprise security, SAML SSO, and audit log certifications"
    ],
    ux_writing_notes: "Warm, inviting, and human. Emphasizes craft, simplicity, and flexibility rather than rigid enterprise specifications.",
    friction_points: [
      "The 'blank canvas' nature of the product can cause initial hesitation for beginners",
      "AI add-on pricing details are separated from the free tier callout",
      "Mobile navigation tradeoffs are downplayed relative to the desktop experience"
    ],
    design_opportunities: [
      "Provide an interactive 15-second setup helper to pre-populate relevant templates",
      "Showcase before vs after comparisons showing tool consolidation benefits",
      "Embed live interactive AI prompt examples directly on the homepage"
    ],
    designer_summary: "Notion's visual identity remains approachable and memorable. The combination of hand-drawn character illustrations with clean product UI creates a welcoming feel that differentiates it from conventional enterprise tools.",
    specs: {
      primary_segment: "Knowledge Workers & Modern Teams",
      monetization_model: "Freemium / Per-User Monthly SaaS",
      conversion_path: "Self-Serve Free Tier (Google / Email)",
      design_signature: "Hand-Drawn Illustrations / Modular Canvas",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://figma.com": {
    url: "https://figma.com",
    product_brand: "Figma",
    tagline: "How teams design & build digital products together",
    category: "Design & Prototyping / Collaboration",
    core_value_proposition: "A collaborative interface design platform that connects ideation, UI design, interactive prototyping, and developer handoff into a unified multiplayer canvas.",
    target_audience: "Product designers, design systems leads, UX researchers, frontend engineers, and cross-functional product squads.",
    cta_strategy: [
      "Primary: 'Get started for free' (High-contrast button with instant Google SSO)",
      "Secondary: 'Explore Dev Mode' (Developer-specific value proposition)",
      "Community path: 'Browse Community templates and UI kits'"
    ],
    information_hierarchy: "Multiplayer canvas hero with animated real-time collaborator cursors. Segmented by product lifecycle: FigJam (ideation), Figma Design (UI craft), Prototyping (interaction), and Dev Mode (handoff), followed by community highlights and enterprise security.",
    trust_signals: [
      "Industry ubiquity: 'Used by millions of designers and developers globally'",
      "Customer logos (Google, Netflix, Spotify, Microsoft, Airbnb)",
      "Community marketplace with over 50,000 community-created plugins and kits",
      "Enterprise compliance: SOC 2/3, ISO 27001, FedRAMP Authorized"
    ],
    ux_writing_notes: "Collaborative, craft-centric, and energetic. Focuses on multiplayer teamwork and creative iteration with clear microcopy.",
    friction_points: [
      "Dev Mode seat pricing tiers have introduced budgeting considerations between design and engineering",
      "Steep learning curve for advanced features (variables, auto-layout, conditional logic)",
      "Dense feature set can make the page feel busy for non-designers seeking only whiteboarding"
    ],
    design_opportunities: [
      "Add an interactive sandbox demonstrating live Dev Mode code inspection",
      "Highlight AI-assisted design features (auto-layout, visual search) directly in the hero",
      "Clarify the distinction between FigJam and Figma Design for non-design team members"
    ],
    designer_summary: "Figma's landing page demonstrates multiplayer collaboration with clarity. The interactive cursor animations communicate the core value proposition immediately without lengthy explanation.",
    specs: {
      primary_segment: "Product Designers & Frontend Engineers",
      monetization_model: "Freemium / Multi-Tiered Seat Model",
      conversion_path: "Browser-First Instant Signup (Google SSO)",
      design_signature: "Multiplayer Cursors / Colorful Vector Canvas",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://raycast.com": {
    url: "https://raycast.com",
    product_brand: "Raycast",
    tagline: "Supercharged productivity for your Mac",
    category: "Desktop Productivity / Developer Tools",
    core_value_proposition: "A fast, extensible desktop launcher that replaces default system search and integrates AI, snippets, window management, and community extensions into a single hotkey.",
    target_audience: "Power users, software engineers, designers, and Mac enthusiasts seeking desktop navigation velocity and workflow automation.",
    cta_strategy: [
      "Primary: 'Download for Mac' (Prominent accent button with automatic Apple Silicon / Intel detection)",
      "Secondary: 'Explore Raycast AI' (Feature upsell for Pro tier)",
      "Ecosystem path: 'Browse 1,500+ Extensions'"
    ],
    information_hierarchy: "Deep black visual system with hotkey launcher animations. Outlines core utilities (Extensions, AI, Clipboard History, Snippets, Window Management), community store metrics, and team sharing capabilities.",
    trust_signals: [
      "4.9/5 user ratings across Mac developer communities",
      "Active ecosystem: '1,500+ community extensions built with React and TypeScript'",
      "Used by teams at Stripe, Vercel, Shopify, GitHub, and Framer",
      "Local-first privacy architecture with end-to-end encrypted synchronization"
    ],
    ux_writing_notes: "Concise, confident, and power-user tailored. Emphasizes microsecond latency, keyboard shortcuts, and craftsmanship.",
    friction_points: [
      "Platform exclusivity limits use to Mac users (with Windows in waitlist)",
      "Raycast Pro subscription cost can trigger evaluation against free default tools",
      "Power-user focus may feel complex for casual computer users"
    ],
    design_opportunities: [
      "Provide an interactive browser-based launcher preview so visitors can test shortcuts prior to downloading",
      "Highlight Windows waitlist clearly for non-Mac visitors",
      "Demonstrate time-saved metrics based on typical daily developer workflows"
    ],
    designer_summary: "Raycast represents native desktop craft. The sleek dark UI, custom typography, and responsive animations convey high performance and ergonomic precision.",
    specs: {
      primary_segment: "Mac Power Users, Engineers & Designers",
      monetization_model: "Free Native App / Pro AI Subscription",
      conversion_path: "Direct DMG Download (Zero Registration Required)",
      design_signature: "Deep Dark Mode / Glowing Accents / Hotkey Pills",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://airbnb.com": {
    url: "https://airbnb.com",
    product_brand: "Airbnb",
    tagline: "Find unique stays and unforgettable experiences",
    category: "Marketplace / Travel & Hospitality",
    core_value_proposition: "A global peer-to-peer travel marketplace connecting travelers with accommodations, local experiences, and boutique stays across 220+ countries.",
    target_audience: "Travelers, digital nomads, families, and property owners seeking rental income.",
    cta_strategy: [
      "Primary: 'Search Stays' (Interactive search pill with Destination, Dates, and Guests selectors)",
      "Secondary: 'Airbnb your home' (Top navigation host onboarding funnel)",
      "Category path: Horizontal scrollable category navigation (Beachfront, Cabins, Mansions)"
    ],
    information_hierarchy: "The search widget is immediately accessible above the fold. It flows into icon-based category navigation, a visual grid of curated stays with transparent pricing, host acquisition banners, and trust & safety guarantees.",
    trust_signals: [
      "AirCover protection for guests and hosts (damage protection and liability insurance)",
      "Verified guest reviews, host ratings, and Superhost badges",
      "Secure global payment processing with guest refund policies",
      "Identity verification standards and 24/7 global support"
    ],
    ux_writing_notes: "Clear, warm, and inviting. Transparent total pricing display ('Total before taxes') addresses guest expectations directly.",
    friction_points: [
      "Cleaning fees and service charges can affect checkout clarity if not checked upfront",
      "Balancing guest discovery with host acquisition requires careful navigation design",
      "Cancellation policies vary by individual host, requiring thorough review"
    ],
    design_opportunities: [
      "Enhance group planning with collaborative voting and split-payment options on listings",
      "Introduce itinerary suggestions based on booked stay locations and guest preferences",
      "Streamline accessibility filters (step-free access, wide doorways) directly within the primary search pill"
    ],
    designer_summary: "Airbnb's landing page is a standard for marketplace discovery. It prioritizes the search widget and high-resolution photography, allowing visitors to engage with listings immediately.",
    specs: {
      primary_segment: "Global Leisure Travelers & Property Hosts",
      monetization_model: "Two-Sided Marketplace Service Fee",
      conversion_path: "Instant Search → Booking Flow",
      design_signature: "High-Resolution Visuals / Search Pill Bar",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  }
};

export const DEMO_URLS = Object.keys(LIVE_DEMO_DATASETS);
