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
  group?: "DevTools" | "Productivity" | "AI" | "Fintech" | "Consumer";
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
  // ─── 1. DEV TOOLS & INFRASTRUCTURE ──────────────────────────────────────────
  "https://linear.app": {
    url: "https://linear.app",
    product_brand: "Linear",
    tagline: "The system for modern software development",
    category: "Project Management / Developer Tools",
    group: "DevTools",
    core_value_proposition: "A keyboard-first project management system engineered specifically for high-velocity software teams who prioritize speed, craft, and streamlined workflows.",
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
    group: "Fintech",
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
    group: "DevTools",
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
    group: "DevTools",
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

  "https://github.com": {
    url: "https://github.com",
    product_brand: "GitHub",
    tagline: "The complete developer platform to build, scale, and deliver secure software",
    category: "Source Code & DevOps / Developer Platform",
    group: "DevTools",
    core_value_proposition: "The global home for developers, combining Git repositories, AI-assisted coding (Copilot), automated CI/CD pipelines (Actions), and enterprise-grade security.",
    target_audience: "Every software developer from open-source hobbyists to Fortune 500 enterprise engineering departments.",
    cta_strategy: [
      "Primary: 'Sign up for GitHub' (High-contrast input with instant email verification)",
      "Secondary: 'Start a free enterprise trial' (Enterprise lead form)",
      "Product path: 'Explore Copilot' (AI code completion funnel)"
    ],
    information_hierarchy: "Cinematic 3D globe with live commit telemetry. Flows into Copilot AI demonstrations, Actions CI/CD workflow cards, security scanning tools, community open source highlights, and enterprise trust metrics.",
    trust_signals: [
      "100M+ developers and 90% of Fortune 100 companies",
      "Host to the world's most critical open-source software libraries",
      "Microsoft enterprise backing, SOC 1/2/3, ISO 27001, FedRAMP High",
      "Native GitHub Security Advisories and automated Dependabot alerts"
    ],
    ux_writing_notes: "Heroic, universal, and developer-first. Centers on the developer's creative agency and empowerment.",
    friction_points: [
      "Immense scale can overwhelm beginners seeking only basic Git storage",
      "Enterprise vs Individual plan feature matrix is dense",
      "AI Copilot add-ons have varied seat tiers and licensing rules"
    ],
    design_opportunities: [
      "Provide persona-based landing entry points (Open Source, Enterprise, Solo Builder)",
      "Embed interactive Copilot prompt simulators directly in the hero",
      "Simplify enterprise compliance checklist navigation"
    ],
    designer_summary: "GitHub's homepage is a masterclass in global developer identity. The 3D globe and dark slate aesthetic inspire a sense of being part of a worldwide engineering community.",
    specs: {
      primary_segment: "Global Software Developers & Engineering Orgs",
      monetization_model: "Freemium / Per-User Seat SaaS + Enterprise",
      conversion_path: "Self-Serve Account Creation / Enterprise Trial",
      design_signature: "3D Globe Visualizer / Dark Mode Terminal UI",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://cloudflare.com": {
    url: "https://cloudflare.com",
    product_brand: "Cloudflare",
    tagline: "The connectivity cloud for seamless digital security and speed",
    category: "Edge Cloud / CDN & Cybersecurity",
    group: "DevTools",
    core_value_proposition: "A global network delivering website performance, DDoS protection, edge compute workers, and Zero Trust enterprise security with sub-millisecond global latency.",
    target_audience: "DevOps engineers, security teams, website owners, and enterprise IT leaders.",
    cta_strategy: [
      "Primary: 'Get started for free' (Instant DNS configuration funnel)",
      "Secondary: 'Under attack?' (Emergency DDoS mitigation hotlink)",
      "Enterprise path: 'Speak to an expert' (Enterprise Zero Trust consultation)"
    ],
    information_hierarchy: "Global edge map and speed metrics. Breaks down into Performance, Application Security, Zero Trust, and Cloudflare Workers (compute/AI), backed by analyst recognition and enterprise logos.",
    trust_signals: [
      "Protects ~20% of the entire global internet traffic",
      "330+ global cities edge network presence",
      "Enterprise logos (Garmin, 23andMe, Shopify, DHL)",
      "Gartner Magic Quadrant Leader in Edge Security"
    ],
    ux_writing_notes: "Authoritative, resilient, and enterprise-grade. Emphasizes peace of mind, speed, and cost efficiency.",
    friction_points: [
      "Massive product breadth makes finding specific developer tools like D1 or R2 difficult",
      "DNS cutover requirements can create anxiety for first-time website managers",
      "Pricing models vary across flat plans and per-request usage"
    ],
    design_opportunities: [
      "Create an interactive ROI / bandwidth savings calculator",
      "Separate developer edge tools (Workers, AI) from IT enterprise security",
      "Include a 30-second interactive DNS setup walkthrough"
    ],
    designer_summary: "Cloudflare projects immense institutional reliability and infrastructure strength. The orange brand accents on clean white cards create an instantly recognizable identity.",
    specs: {
      primary_segment: "DevOps, Security Architects & Web Owners",
      monetization_model: "Freemium / Tiered SaaS + Usage",
      conversion_path: "DNS Nameserver Transfer / Free Account",
      design_signature: "Orange Cloud Accents / Global Edge Network Maps",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://docker.com": {
    url: "https://docker.com",
    product_brand: "Docker",
    tagline: "Accelerate how you build, share, and run applications",
    category: "Containerization & Developer Workflow",
    group: "DevTools",
    core_value_proposition: "The standard containerization platform that allows developers to package code and dependencies together, eliminating 'it works on my machine' friction across local and cloud environments.",
    target_audience: "Software developers, DevOps teams, system administrators, and cloud engineers.",
    cta_strategy: [
      "Primary: 'Download Docker Desktop' (OS-specific installer detection)",
      "Secondary: 'Get started with Docker Hub' (Container registry signup)",
      "Developer path: 'Explore Docker Scouts & AI Extensions'"
    ],
    information_hierarchy: "Docker whale brand hero with Docker Desktop product visual. Progresses into Build, Test, Share, and Secure pillars, followed by Docker Hub registry statistics and enterprise security compliance.",
    trust_signals: [
      "20M+ monthly active developers",
      "15B+ monthly container image pulls on Docker Hub",
      "Used by 85% of Forbes Global 500 companies",
      "SOC 2 Type II, ISO 27001, and Docker Certified Container Badges"
    ],
    ux_writing_notes: "Approachable, developer-centric, and utility-focused. Focuses on dev environment consistency and velocity.",
    friction_points: [
      "Docker Desktop commercial licensing terms require team evaluation for larger companies",
      "Resource consumption on local laptops is a frequent user concern",
      "Navigation between Docker Desktop app and Docker Hub web portal can feel disjointed"
    ],
    design_opportunities: [
      "Embed a lightweight browser-based Docker CLI emulator in the hero",
      "Clarify personal free usage vs commercial enterprise licensing upfront",
      "Highlight local AI model containerization capabilities"
    ],
    designer_summary: "Docker's design blends friendly developer approachability (the iconic whale) with enterprise security credibility. The clear installer download button drives high conversion.",
    specs: {
      primary_segment: "Software Developers & DevOps Teams",
      monetization_model: "Freemium Desktop / Per-User SaaS Tiers",
      conversion_path: "Direct Desktop App Download / Hub Signup",
      design_signature: "Blue Whale / Container Blocks / Clean Documentation",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://postman.com": {
    url: "https://postman.com",
    product_brand: "Postman",
    tagline: "The world’s leading API platform",
    category: "API Development & Testing",
    group: "DevTools",
    core_value_proposition: "An end-to-end collaborative platform that simplifies each step of the API lifecycle, from design and testing to documentation and monitoring.",
    target_audience: "Backend developers, QA engineers, API product managers, and tech leads.",
    cta_strategy: [
      "Primary: 'Get Started for Free' (Instant web or desktop app signup)",
      "Secondary: 'Explore Public API Network' (Ecosystem discovery)",
      "Enterprise path: 'Contact Sales' (Enterprise workspace governance)"
    ],
    information_hierarchy: "Spaceman mascot hero with interactive request builder UI. Highlights API Client, Automated Testing, Mock Servers, and the Public API Network, backed by scale statistics and enterprise customer stories.",
    trust_signals: [
      "35M+ developers worldwide across 500,000 organizations",
      "Used by 98% of the Fortune 500",
      "Public API Network hosting APIs from Stripe, Salesforce, Microsoft, and OpenAI",
      "SOC 2 Type II, CSA STAR, and HIPAA compliance"
    ],
    ux_writing_notes: "Energetic, exploratory, and developer-friendly. Bridges the gap between technical protocol testing and team API governance.",
    friction_points: [
      "Shift towards cloud workspace sync has created workflow friction for users preferring local-only collections",
      "Feature sprawl makes the interface feel busy for users wanting just a simple cURL alternative",
      "Collection runner limits on free tiers require careful plan selection"
    ],
    design_opportunities: [
      "Introduce a streamlined 'Instant Request' mode with zero account creation required",
      "Highlight automated AI test generation and spec linting",
      "Provide interactive API recipe cards for top frameworks"
    ],
    designer_summary: "Postman combines vibrant orange brand personality with massive ecosystem scale. The live API client interface preview communicates instant utility.",
    specs: {
      primary_segment: "Backend Engineers & API Teams",
      monetization_model: "Freemium / Per-User Monthly SaaS",
      conversion_path: "Web App Launch / Desktop Download",
      design_signature: "Orange Spaceman / Tabbed Request Interface",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://sentry.io": {
    url: "https://sentry.io",
    product_brand: "Sentry",
    tagline: "Application performance monitoring & error tracking for developers",
    category: "Developer Observability / Error Tracking",
    group: "DevTools",
    core_value_proposition: "Code-level observability that allows developers to see and fix crashes, slow database queries, and frontend UI performance bottlenecks in real time with line-by-line stack traces.",
    target_audience: "Software engineers, frontend leads, DevOps, and mobile app developers.",
    cta_strategy: [
      "Primary: 'Get Started' (Quick GitHub/Google developer auth)",
      "Secondary: 'Request Demo' (Enterprise observability consultation)",
      "Discovery path: 'Interactive Sandbox' (Live demo error dashboard without signup)"
    ],
    information_hierarchy: "Raw, irreverent developer-themed hero with interactive error event replay. Demonstrates Stack Traces, Session Replay, Profiling, and Cron monitoring, followed by open-source heritage and customer testimonials.",
    trust_signals: [
      "4M+ developers and 100,000 organizations",
      "Used by Disney, Cloudflare, GitHub, Instacart, and Reddit",
      "Over 90+ official language and framework SDK integrations",
      "Open-core codebase with transparent data retention controls"
    ],
    ux_writing_notes: "Witty, honest, developer-native, and self-deprecating. Cuts through corporate enterprise fluff with direct engineering humor.",
    friction_points: [
      "Event quota spikes during unexpected production outages can lead to billing surprises",
      "Configuring source maps and symbolication requires multi-step CI pipeline setup",
      "High volume of alert notifications requires aggressive triage rule configuration"
    ],
    design_opportunities: [
      "Highlight automatic AI root-cause analysis and automated PR fixes above the fold",
      "Provide a 1-click SDK installer script generator for any stack",
      "Feature Session Replay visual scrubber as a primary hero highlight"
    ],
    designer_summary: "Sentry has one of the strongest brand voices in developer tools. Its irreverent dark-mode design, monospace typography, and interactive sandbox prove that B2B software can have immense personality.",
    specs: {
      primary_segment: "Full-Stack & Mobile Software Developers",
      monetization_model: "Freemium / Usage-Based Event Volume",
      conversion_path: "Self-Serve Developer Signup / SDK Install",
      design_signature: "Irreverent Humor / Neon Pink Accents / Code Stack Traces",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://resend.com": {
    url: "https://resend.com",
    product_brand: "Resend",
    tagline: "Email for developers",
    category: "Developer Email API / Communication",
    group: "DevTools",
    core_value_proposition: "The modern email platform built for developers, providing a clean React-based email template engine (React Email) and high-deliverability transactional APIs.",
    target_audience: "Frontend engineers, full-stack creators, and modern SaaS founders tired of clunky legacy SMTP providers.",
    cta_strategy: [
      "Primary: 'Get Started' (Instant 1-click email API token generation)",
      "Secondary: 'Documentation' (Clean code examples in React, Node, Python)",
      "Ecosystem path: 'Explore React Email' (Open source component library)"
    ],
    information_hierarchy: "Ultra-clean black and white hero with an interactive React Email component preview. Highlights sub-second delivery speed, domain verification ergonomics, webhook telemetry, and developer testimonials.",
    trust_signals: [
      "Endorsed by leading frontend architects and modern SaaS startups",
      "Over 30,000+ GitHub stars across the React Email ecosystem",
      "SOC 2 Type II certified infrastructure and dedicated IP pools",
      "High deliverability rates backed by automated SPF/DKIM verification"
    ],
    ux_writing_notes: "Minimalist, precise, and developer-tailored. Eliminates marketing buzzwords in favor of clean code blocks.",
    friction_points: [
      "Dedicated focus on transactional email means marketing teams wanting visual drag-and-drop newsletters need third-party tools",
      "Strict domain warmup and anti-spam verification required before sending high volumes",
      "Advanced audience segmentation is developer-code driven"
    ],
    design_opportunities: [
      "Embed a live React Email playground directly in the browser hero",
      "Provide an interactive deliverability and SPF/DKIM troubleshooter",
      "Introduce visual email analytics dashboards for marketing stakeholders"
    ],
    designer_summary: "Resend represents the pinnacle of modern developer minimalism. The typography, clean borders, and crisp code blocks make sending email feel like an elegant software primitive.",
    specs: {
      primary_segment: "Frontend & Full-Stack Developers",
      monetization_model: "Freemium / Monthly Email Volume Tiers",
      conversion_path: "Instant API Key / GitHub Auth",
      design_signature: "Pure Monochrome / React Email / Minimalist Craft",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://railway.com": {
    url: "https://railway.com",
    product_brand: "Railway",
    tagline: "A cloud that takes you from prototype to production",
    category: "Cloud Infrastructure / PaaS",
    group: "DevTools",
    core_value_proposition: "An infrastructure platform that lets developers provision databases, deploy microservices, and orchestrate environments instantly from Git without complex DevOps configuration.",
    target_audience: "Full-stack engineers, indie makers, startup founders, and engineering teams seeking an alternative to AWS complexity.",
    cta_strategy: [
      "Primary: 'Start a New Project' (Instant canvas project creation with GitHub OAuth)",
      "Secondary: 'Explore Templates' (1-click deploy for Postgres, Redis, Ghost, n8n)",
      "CLI path: 'Install Railway CLI'"
    ],
    information_hierarchy: "Interactive canvas graph showing connected microservices and databases. Highlights automated PR environments, usage-based compute billing, managed databases, and team collaboration.",
    trust_signals: [
      "Millions of container deployments running globally",
      "High developer acclaim across the indie hacker and YC startup ecosystem",
      "SOC 2 Type II compliance and transparent real-time status uptime",
      "Active Discord community with over 50,000 members"
    ],
    ux_writing_notes: "Pragmatic, empowering, and transparent. Replaces AWS acronym soup with intuitive infrastructure language.",
    friction_points: [
      "Usage-based resource limits can cause surprises for unmonitored background tasks",
      "Custom VPC networking is simplified compared to raw AWS/GCP capabilities",
      "Trial credits require payment verification to prevent abuse"
    ],
    design_opportunities: [
      "Add interactive canvas architecture templates on the landing page",
      "Include a live AWS cost comparison estimator",
      "Highlight automatic AI agent deployment templates"
    ],
    designer_summary: "Railway makes cloud infrastructure visual and approachable. The infinite node canvas concept transforms backend deployment into a tactile, enjoyable experience.",
    specs: {
      primary_segment: "Full-Stack Developers & Startup Teams",
      monetization_model: "Pay-as-you-go Usage / Subscription Plans",
      conversion_path: "Instant Canvas Project Creation (GitHub)",
      design_signature: "Node Canvas / Dark Slate & Rose Accents",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://neon.tech": {
    url: "https://neon.tech",
    product_brand: "Neon",
    tagline: "Serverless Postgres engineered for modern development",
    category: "Serverless Database / Cloud Postgres",
    group: "DevTools",
    core_value_proposition: "A fully managed serverless Postgres database with separation of storage and compute, enabling instant database branching, bottomless storage, and autoscaling to zero.",
    target_audience: "Full-stack developers, engineering leads, and DevOps teams building dynamic cloud applications and AI vector systems.",
    cta_strategy: [
      "Primary: 'Get Started' (Instant 500MB free database provisioning)",
      "Secondary: 'Documentation' (Database branching and connection pooling guides)",
      "AI path: 'Explore pgvector for AI workflows'"
    ],
    information_hierarchy: "Geometric grid hero with animated database branching visualization. Outlines Branching for CI/CD, Autoscaling, pgvector for AI, and transparent per-second compute billing.",
    trust_signals: [
      "Official database partner for Vercel Storage and Retool",
      "100% open-source PostgreSQL compatibility",
      "SOC 2 Type II and ISO 27001 certified",
      "Backed by leading database engineers and venture architects"
    ],
    ux_writing_notes: "Technical, forward-thinking, and precise. Focuses on developer velocity enabled by database branching.",
    friction_points: [
      "Cold-start latency when scaling from zero compute requires evaluation for strict real-time applications",
      "Separation of storage and compute is a new conceptual model for traditional DBAs",
      "Connection pooling configurations require understanding PgBouncer nuances"
    ],
    design_opportunities: [
      "Provide an interactive Git-like branching simulator in the hero",
      "Feature live vector search demo with pgvector directly on the page",
      "Embed a migration guide from legacy RDS/Aurora databases"
    ],
    designer_summary: "Neon brings modern software development workflows (branching, preview environments) to the database layer. Its electric green and dark slate visual identity conveys high-speed modern infrastructure.",
    specs: {
      primary_segment: "Full-Stack Developers & Serverless Architects",
      monetization_model: "Freemium / Compute-Hour & Storage Usage",
      conversion_path: "Instant Free Database Provisioning (GitHub SSO)",
      design_signature: "Electric Green / Isometric Database Nodes",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://planetscale.com": {
    url: "https://planetscale.com",
    product_brand: "PlanetScale",
    tagline: "The world's most advanced database platform",
    category: "Cloud Database / Distributed MySQL & Vitess",
    group: "DevTools",
    core_value_proposition: "An enterprise-grade serverless MySQL platform powered by Vitess, offering non-blocking schema migrations, automatic sharding, and infinite horizontal scalability.",
    target_audience: "Engineering teams, scaleups, and enterprise architects needing unbreakable MySQL reliability under extreme traffic spikes.",
    cta_strategy: [
      "Primary: 'Start for Free' (Quick database creation)",
      "Secondary: 'Contact Sales' (Enterprise migration and custom sharding)",
      "Feature path: 'Explore Non-blocking Schema Changes'"
    ],
    information_hierarchy: "Sleek dark grid hero with schema change visualizer. Walks through zero-downtime migrations, Vitess horizontal sharding, query performance insights, and enterprise customer testimonials.",
    trust_signals: [
      "Powers massive internet scale for MyFitnessPal, Barstool Sports, and Axiom",
      "Built on Vitess (the engine that scaled YouTube for over a decade)",
      "SOC 2 Type II, HIPAA, and GDPR compliance",
      "Enterprise SLA with 99.99% uptime guarantees"
    ],
    ux_writing_notes: "Confidential, robust, and authoritative. Positioned for serious engineering organizations who cannot afford database downtime.",
    friction_points: [
      "Removal of the legacy hobby tier has shifted focus strictly to production workloads and paid developers",
      "Lack of foreign key constraints by default requires architectural awareness",
      "MySQL-specific focus means Postgres teams need alternative platforms"
    ],
    design_opportunities: [
      "Embed an interactive schema migration timeline preview",
      "Highlight multi-region read replicas and global query caching",
      "Provide transparent database cost calculator by queries per second"
    ],
    designer_summary: "PlanetScale exudes enterprise engineering authority. The high-contrast dark theme, crisp line diagrams, and emphasis on resilience communicate ironclad reliability.",
    specs: {
      primary_segment: "High-Scale Tech Companies & Enterprise Engineering",
      monetization_model: "Paid Monthly Tier + Resource Usage",
      conversion_path: "Self-Serve Credit Card Signup / Enterprise Consultation",
      design_signature: "Precision Dark Grid / Yellow Accents / Technical Diagrams",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://prisma.io": {
    url: "https://prisma.io",
    product_brand: "Prisma",
    tagline: "Next-generation ORM for Node.js and TypeScript",
    category: "Developer Tools / Database ORM & Data Platform",
    group: "DevTools",
    core_value_proposition: "A type-safe Object-Relational Mapper (ORM) that makes database access intuitive and error-free for TypeScript developers with automated migrations and visual studio tools.",
    target_audience: "TypeScript developers, Node.js backend engineers, and modern full-stack creators.",
    cta_strategy: [
      "Primary: 'Get Started in 5 Min' (Interactive quickstart guide)",
      "Secondary: 'Explore Prisma Studio' (Visual database editor)",
      "Platform path: 'Try Prisma Accelerate & Pulse'"
    ],
    information_hierarchy: "High-contrast code editor hero demonstrating autocomplete and type safety. Highlights Prisma Schema modeling, automated migrations, connection caching (Accelerate), real-time change streams (Pulse), and community scale.",
    trust_signals: [
      "Over 40,000 GitHub Stars and millions of monthly npm downloads",
      "Used by teams at Netflix, Vercel, Shopify, and Automattic",
      "Supports PostgreSQL, MySQL, SQLite, SQL Server, CockroachDB, and MongoDB",
      "Active open-source community and comprehensive documentation"
    ],
    ux_writing_notes: "Developer-empowering, educational, and clean. Emphasizes end-to-end type safety and developer happiness.",
    friction_points: [
      "Large query performance optimization can require understanding generated SQL under the hood",
      "Prisma Data Platform paid add-ons require distinguishing from the free open-source ORM",
      "Schema changes require running migration commands in the CLI"
    ],
    design_opportunities: [
      "Add an interactive schema-to-TypeScript code generator playground in the hero",
      "Showcase automated query optimization recommendations",
      "Provide direct migration guides from raw SQL or TypeORM"
    ],
    designer_summary: "Prisma transformed the TypeScript database experience. Its landing page effectively balances open-source developer accessibility with commercial data platform services.",
    specs: {
      primary_segment: "TypeScript & Node.js Developers",
      monetization_model: "Open Source ORM + Paid Cloud Data Platform",
      conversion_path: "npx prisma init (CLI Installation)",
      design_signature: "Teal Accents / High-Fidelity Code Editor Previews",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  // ─── 2. PRODUCTIVITY & COLLABORATIVE WORKSPACE ─────────────────────────────
  "https://notion.so": {
    url: "https://notion.so",
    product_brand: "Notion",
    tagline: "Your connected workspace for docs, wikis, and projects",
    category: "Productivity / Knowledge Management",
    group: "Productivity",
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
    group: "Productivity",
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
    group: "Productivity",
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

  "https://miro.com": {
    url: "https://miro.com",
    product_brand: "Miro",
    tagline: "The visual workspace for innovation",
    category: "Visual Collaboration / Whiteboarding",
    group: "Productivity",
    core_value_proposition: "An infinite visual collaboration platform designed for distributed teams to brainstorm, map processes, run agile ceremonies, and build product strategy together.",
    target_audience: "Product managers, Agile coaches, UX researchers, remote teams, and enterprise innovation leaders.",
    cta_strategy: [
      "Primary: 'Sign up free' (Work email / Google auth)",
      "Secondary: 'Contact Sales' (Enterprise workspace rollout)",
      "Template path: 'Explore 300+ Pre-built Templates'"
    ],
    information_hierarchy: "Infinite canvas preview with live sticky notes and user avatars. Segmented by use cases (Strategy, Agile, Diagramming, UX Research), partner integrations, enterprise security compliance, and customer case studies.",
    trust_signals: [
      "70M+ users globally and used by 99% of Fortune 100 companies",
      "Enterprise logos (Cisco, Dell, Deloitte, HP, Okta)",
      "130+ native integrations including Jira, Confluence, Slack, and Teams",
      "Enterprise Guard data governance, SOC 2/3, ISO 27001 certified"
    ],
    ux_writing_notes: "Collaborative, agile-focused, and accessible. Focuses on team alignment, unblocking ideas, and reducing meeting fatigue.",
    friction_points: [
      "Large, complex boards can suffer from navigation disorientation without structured frames",
      "Free plan restricts active boards to 3 editable canvases",
      "Feature sprawl (diagramming, presentations, AI, video chat) can dilute the core whiteboarding simplicity"
    ],
    design_opportunities: [
      "Provide an interactive 1-click template launcher right from the hero",
      "Highlight automated AI diagramming from text prompts",
      "Introduce structured presentation view enhancements for executive reviews"
    ],
    designer_summary: "Miro is the leader in visual collaboration. Its bright yellow brand accents and clean infinite canvas convey creative energy and cross-functional team alignment.",
    specs: {
      primary_segment: "Product Managers, Agile Squads & Enterprise Teams",
      monetization_model: "Freemium / Per-Seat Monthly Subscription",
      conversion_path: "Self-Serve Free Account (3 Boards)",
      design_signature: "Bright Yellow Accents / Sticky Notes & Frames",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://loom.com": {
    url: "https://loom.com",
    product_brand: "Loom",
    tagline: "One video is worth a thousand words",
    category: "Asynchronous Video Messaging",
    group: "Productivity",
    core_value_proposition: "An asynchronous video communication tool that lets you record your screen, camera, and voice simultaneously with instant link sharing to eliminate unnecessary meetings.",
    target_audience: "Remote workers, engineering managers, product designers, customer success teams, and sales reps.",
    cta_strategy: [
      "Primary: 'Get Loom for Free' (Instant Chrome extension / desktop installer)",
      "Secondary: 'Contact Sales' (Enterprise video workspace)",
      "AI path: 'Try Loom AI Auto-Summaries'"
    ],
    information_hierarchy: "Signature circular webcam bubble over dynamic product screens. Features interactive video playback demos, Loom AI auto-summaries and chaptering, team library management, and enterprise security.",
    trust_signals: [
      "Acquired by Atlassian; trusted by 21M+ users across 350,000 companies",
      "Customer logos (Tesla, Netflix, Disney, Amazon, HubSpot)",
      "SOC 2 Type II compliance and enterprise video privacy controls",
      "Deep Atlassian integrations with Jira and Confluence"
    ],
    ux_writing_notes: "Conversational, human, and time-saving. Focuses on 'fewer meetings' and 'faster alignment'.",
    friction_points: [
      "Free plan limits video length to 5 minutes per recording",
      "Loom AI add-on requires an additional monthly subscription fee",
      "Managing sprawling video libraries requires disciplined tagging and folders"
    ],
    design_opportunities: [
      "Embed a live browser recorder demo directly in the hero without extension install",
      "Highlight automatic AI action items and bug ticket generation for Jira",
      "Provide video viewing engagement analytics benchmarks"
    ],
    designer_summary: "Loom defined the asynchronous video category. The circular webcam bubble and instant share link represent one of the most effective UX patterns in modern remote work.",
    specs: {
      primary_segment: "Remote Teams, Designers & Customer Success",
      monetization_model: "Freemium / Per-User Monthly SaaS + AI Add-on",
      conversion_path: "Browser Extension Install / 1-Click Record",
      design_signature: "Circular Webcam Bubble / Purple Accents / Instant Links",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://slack.com": {
    url: "https://slack.com",
    product_brand: "Slack",
    tagline: "Made for people. Built for productivity.",
    category: "Team Messaging & Collaboration",
    group: "Productivity",
    core_value_proposition: "A channel-based messaging platform that centralizes team communication, file sharing, automated workflows, and enterprise integrations into a single hub.",
    target_audience: "Cross-functional teams, tech startups, remote companies, and global enterprise organizations.",
    cta_strategy: [
      "Primary: 'Try for Free' (Fast workspace creation with Google/email)",
      "Secondary: 'Talk to Sales' (Enterprise Grid routing)",
      "Enterprise path: 'See Slack AI in Action'"
    ],
    information_hierarchy: "Vibrant multi-channel workspace preview with live message threads and emojis. Progresses into Channels vs Email benefits, Workflow Builder automation, Slack AI channel summaries, and Enterprise Grid governance.",
    trust_signals: [
      "Salesforce backing; used by 750,000+ companies globally",
      "85% of Fortune 100 companies use Slack",
      "2,600+ app integrations in the Slack App Directory",
      "FINRA, HIPAA, FedRAMP, and SOC 2/3 enterprise compliance"
    ],
    ux_writing_notes: "Friendly, empathetic, and workplace-native. Uses casual tone without sacrificing enterprise credibility.",
    friction_points: [
      "High-volume notification noise can lead to message overload and anxiety",
      "Free plan restricts message history to 90 days",
      "Channel sprawl in large companies makes finding specific past discussions difficult"
    ],
    design_opportunities: [
      "Highlight automatic Slack AI daily digests and thread catch-ups in the hero",
      "Provide a focus mode / notification management interactive demo",
      "Include a 1-click workspace template selector for specific team functions"
    ],
    designer_summary: "Slack pioneered modern enterprise chat. The four-color brand palette, approachable typography, and focus on channel architecture set the standard for digital headquarters.",
    specs: {
      primary_segment: "Digital Teams, Startups & Global Enterprises",
      monetization_model: "Freemium / Per-User Seat SaaS + Enterprise Grid",
      conversion_path: "Workspace Creation (Self-Serve / SSO)",
      design_signature: "Aubergine Sidebar / Four-Color Hashtags / Threaded Chat",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://coda.io": {
    url: "https://coda.io",
    product_brand: "Coda",
    tagline: "The all-in-one collaborative doc that brings words, data, and teams together",
    category: "Connected Docs & App Building",
    group: "Productivity",
    core_value_proposition: "A collaborative document platform that blends the flexibility of a document, the power of a relational spreadsheet, and the utility of applications into a single surface.",
    target_audience: "Product managers, operations leads, agile teams, and startup operators needing customizable workflow apps without writing code.",
    cta_strategy: [
      "Primary: 'Get Started Free' (Instant doc builder with Google/email)",
      "Secondary: 'Explore Gallery' (Pre-built product management and OKR templates)",
      "Makers path: 'Browse Packs & Integrations'"
    ],
    information_hierarchy: "Interactive doc-to-app transformation visual. Demonstrates Coda Packs (Jira, Figma, Slack live sync), relational tables with automations, Coda Brain AI search, and team collaboration governance.",
    trust_signals: [
      "Trusted by Uber, Spotify, Figma, DoorDash, and The New York Times",
      "Unique 'Maker Billing' model (only pay for document creators, free for editors)",
      "SOC 2 Type II, ISO 27001, and HIPAA compliance",
      "Extensive ecosystem of verified community Packs and templates"
    ],
    ux_writing_notes: "Empowering, modular, and maker-centric. Emphasizes building 'docs as powerful as apps'.",
    friction_points: [
      "Higher initial learning curve than basic note-taking apps due to formula and relational database depth",
      "Complex document formulas can experience performance slowdowns with massive datasets",
      "Mobile document interaction can feel constrained compared to the rich desktop canvas"
    ],
    design_opportunities: [
      "Add an interactive 30-second formula & automation playground in the hero",
      "Highlight the 'Maker-Only Billing' cost savings calculator compared to per-seat competitors",
      "Showcase AI doc generation directly from meeting notes"
    ],
    designer_summary: "Coda challenges the boundary between document, spreadsheet, and application. The clean red accent and modular building blocks communicate immense organizational flexibility.",
    specs: {
      primary_segment: "Product Ops, Engineering Managers & Startup Makers",
      monetization_model: "Freemium / 'Maker-Only' Tiered Subscription",
      conversion_path: "Self-Serve Document Creation (Google SSO)",
      design_signature: "Red Accents / Relational Table Views / Interactive Buttons",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://arc.net": {
    url: "https://arc.net",
    product_brand: "Arc Browser",
    tagline: "The browser for the next era of the internet",
    category: "Web Browser & Personal Productivity",
    group: "Productivity",
    core_value_proposition: "A reimagined web browser by The Browser Company that organizes tabs into clean vertical spaces, integrates built-in split views, and uses AI (Arc Max) to streamline internet browsing.",
    target_audience: "Designers, software developers, creative power users, and anyone overwhelmed by traditional horizontal browser tab clutter.",
    cta_strategy: [
      "Primary: 'Download Arc for Mac' (Direct installer download with macOS version detection)",
      "Secondary: 'Arc for Windows' (Windows installer download link)",
      "Mobile path: 'Get Arc Search on iOS / Android'"
    ],
    information_hierarchy: "Kinetic visual layout showcasing Arc's signature vertical sidebar and color-customizable spaces. Demonstrates Split View, Easels, Notes, and Arc Max AI features (preview summaries, tidy tabs).",
    trust_signals: [
      "Massive word-of-mouth acclaim among product designers and Silicon Valley founders",
      "Built on Chromium standards for full Chrome extension compatibility",
      "Local privacy pledge with transparent telemetry controls",
      "Backed by visionary design and technology leaders"
    ],
    ux_writing_notes: "Whimsical, intimate, design-forward, and rebellious. Talks directly to the user's emotional relationship with the internet.",
    friction_points: [
      "Vertical sidebar and lack of traditional top URL bar requires a 3-day muscle memory retraining",
      "Resource and battery consumption on laptops is a known user consideration",
      "Ecosystem transition toward 'Dia' and AI agents has created curiosity around long-term browser roadmap"
    ],
    design_opportunities: [
      "Provide an interactive browser simulation allowing visitors to test vertical tabs on the landing page",
      "Highlight seamless Chrome bookmarks and extensions import in 1 click",
      "Feature Arc Search mobile synchronization benefits"
    ],
    designer_summary: "Arc is one of the most celebrated examples of software craftsmanship in recent years. Its bespoke typography, custom color palettes, and fluid spring animations make browsing feel magical.",
    specs: {
      primary_segment: "Designers, Engineers & Internet Power Users",
      monetization_model: "100% Free Consumer Browser",
      conversion_path: "Direct DMG / EXE Download",
      design_signature: "Vertical Sidebar / Soft Gradients / Spring Animations",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://obsidian.md": {
    url: "https://obsidian.md",
    product_brand: "Obsidian",
    tagline: "Sharpen your thinking. Your second brain, for you forever.",
    category: "Personal Knowledge Management & Markdown",
    group: "Productivity",
    core_value_proposition: "A private, flexible note-taking and knowledge-base app that works on top of a local folder of plain Markdown files, with interactive graph visualization and 1,500+ plugins.",
    target_audience: "Researchers, writers, software developers, and knowledge workers who value data ownership and longevity.",
    cta_strategy: [
      "Primary: 'Download for macOS / Windows' (Instant native binary download)",
      "Secondary: 'Obsidian Sync & Publish' (Paid cloud add-on services)",
      "Community path: 'Explore 1,500+ Community Plugins'"
    ],
    information_hierarchy: "Dark theme hero featuring an interactive knowledge graph view. Highlights 100% local plain text files, bidirectional links, Canvas visual whiteboarding, and community plugin ecosystem.",
    trust_signals: [
      "100% local-first data ownership (files live on your hard drive forever)",
      "End-to-end encrypted Obsidian Sync service",
      "Passionate global community with over 100,000 Discord members",
      "Zero vendor lock-in using open standard Markdown"
    ],
    ux_writing_notes: "Calm, philosophical, principled, and focused on intellectual sovereignty and longevity.",
    friction_points: [
      "Syncing between mobile and desktop requires either paid Obsidian Sync or third-party cloud workarounds",
      "Plugin configuration and theme tweaking can lead to procrastination over actual writing",
      "Lack of native collaborative multiplayer editing out of the box"
    ],
    design_opportunities: [
      "Embed a live interactive Markdown graph node visualizer in the hero",
      "Provide pre-configured 'Vault Starters' for specific professions (Academic, Dev, Product)",
      "Demonstrate 1-click mobile sync onboarding benefits"
    ],
    designer_summary: "Obsidian proves that data sovereignty and user privacy can build an intensely loyal product following. The purple crystal icon and interactive node graph represent digital second-brain thinking.",
    specs: {
      primary_segment: "Writers, Researchers, Devs & Knowledge Enthusiasts",
      monetization_model: "Free Personal Native App / Paid Sync & Publish Add-ons",
      conversion_path: "Direct Binary Download (Zero Registration Required)",
      design_signature: "Graph View Node Network / Deep Obsidian Dark Mode",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://superhuman.com": {
    url: "https://superhuman.com",
    product_brand: "Superhuman",
    tagline: "The fastest email experience ever made",
    category: "Email Client / Productivity",
    group: "Productivity",
    core_value_proposition: "A keyboard-driven email client designed to help high-output professionals achieve Inbox Zero in half the time with microsecond responsiveness and built-in AI writing.",
    target_audience: "Executives, founders, venture capitalists, sales leaders, and power users who process 100+ emails daily.",
    cta_strategy: [
      "Primary: 'Get Started' (Instant Google / Outlook account onboarding)",
      "Secondary: 'Superhuman for Teams' (Team collaboration and shared snippet funnel)",
      "AI path: 'Explore Superhuman AI (Write, summarize, and reply 2x faster)'"
    ],
    information_hierarchy: "High-contrast dark hero with 100ms keyboard interaction animations. Highlights Command Palette (Cmd+K), split inboxes, read statuses, Superhuman AI auto-drafting, and customer testimonials.",
    trust_signals: [
      "Beloved by top executives at Brex, Netflix, Uber, and AngelList",
      "Maintains the '100ms rule' (every interaction completes in under 100ms)",
      "SOC 2 Type II certified and enterprise data protection standards",
      "Over 10M+ hours saved for productive professionals worldwide"
    ],
    ux_writing_notes: "Luxurious, elite, disciplined, and speed-obsessed. Positions email as a competitive craft.",
    friction_points: [
      "$30/month premium subscription price point requires strong personal justification",
      "Requires learning keyboard shortcuts to unlock the full product value",
      "Focused specifically on Gmail and Outlook ecosystems"
    ],
    design_opportunities: [
      "Add an interactive keyboard shortcut speed test on the landing page",
      "Provide a personal 'Time Saved' calculator based on current email volume",
      "Highlight automated AI triage and inbox zero workflow demonstrations"
    ],
    designer_summary: "Superhuman elevated email into a luxury productivity experience. The dark minimalist UI, gold/purple accents, and obsession with speed create an unmistakable aura of executive mastery.",
    specs: {
      primary_segment: "Founders, Executives, VCs & Sales Leaders",
      monetization_model: "Premium Monthly Subscription ($30/user/month)",
      conversion_path: "Direct Google / Microsoft Account Connection",
      design_signature: "Dark Luxe Minimalist / Command Palette / Hotkey Badges",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://clickup.com": {
    url: "https://clickup.com",
    product_brand: "ClickUp",
    tagline: "One app to replace them all",
    category: "All-in-One Project Management & Productivity",
    group: "Productivity",
    core_value_proposition: "A customizable productivity platform that consolidates tasks, docs, chat, goals, whiteboards, and time tracking into a single unified operating system.",
    target_audience: "Project managers, operations teams, marketing agencies, and growing companies seeking tool consolidation.",
    cta_strategy: [
      "Primary: 'Get Started' (Email signup with free forever tier)",
      "Secondary: 'Contact Sales' (Enterprise migration advisory)",
      "AI path: 'Explore ClickUp Brain'"
    ],
    information_hierarchy: "Vibrant high-energy hero with multi-view task board visual (List, Board, Gantt, Calendar, Mind Map). Highlights ClickUp Brain AI, custom fields, automations, and tool consolidation benefits.",
    trust_signals: [
      "Used by 2M+ teams including Netflix, Spotify, IBM, and T-Mobile",
      "Over 100,000+ positive customer reviews across G2 and Capterra",
      "SOC 2 Type II, ISO 27001, and HIPAA compliance",
      "24/7 global customer support with 99.9% historical uptime"
    ],
    ux_writing_notes: "Assertive, feature-dense, and value-oriented. Strongly pushes the narrative of saving 1 day every week.",
    friction_points: [
      "Extreme customizability can lead to onboarding overwhelm and configuration paralysis",
      "Interface density can feel cluttered compared to specialized minimalist tools",
      "Occasional web app performance lags with massive enterprise workspaces"
    ],
    design_opportunities: [
      "Provide role-based workspace starter wizards to reduce initial setup complexity",
      "Showcase before-and-after tool consolidation cost calculators",
      "Highlight ClickUp Brain autonomous task generation in the hero"
    ],
    designer_summary: "ClickUp is the maximalist counterpart to minimalist tools. Its vibrant rainbow branding and relentless feature velocity appeal to teams wanting a single customizable software hub.",
    specs: {
      primary_segment: "Agencies, Operations Teams & Growing Companies",
      monetization_model: "Freemium / Per-User Tiered SaaS + AI Add-on",
      conversion_path: "Self-Serve Free Signup / Google SSO",
      design_signature: "Rainbow Gradient Accents / Multi-View Task Boards",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  // ─── 3. AI & MACHINE LEARNING PLATFORMS ────────────────────────────────────
  "https://openai.com": {
    url: "https://openai.com",
    product_brand: "OpenAI",
    tagline: "Creating safe AGI that benefits all of humanity",
    category: "Frontier AI & Large Language Models",
    group: "AI",
    core_value_proposition: "Pioneering artificial general intelligence research and consumer products (ChatGPT, GPT-4o, DALL-E, Sora) that transform creative and cognitive work worldwide.",
    target_audience: "Global consumers, knowledge workers, software developers, researchers, and enterprise organizations.",
    cta_strategy: [
      "Primary: 'Try ChatGPT' (Instant consumer conversational onboarding)",
      "Developer path: 'Explore API Platform' (Developer documentation and playground)",
      "Research path: 'View Research Index & Safety Reports'"
    ],
    information_hierarchy: "Editorial magazine-style layout featuring latest frontier model releases (GPT-4o, SearchGPT). Segmented into ChatGPT products, Developer API platform, Safety governance, and Research index.",
    trust_signals: [
      "Hundreds of millions of weekly active ChatGPT users",
      "Industry standard frontier models powering Microsoft, Apple, and Fortune 500 apps",
      "Comprehensive AI Safety System Cards and red-teaming publications",
      "SOC 2 Type II, enterprise data privacy, and zero-training commitments for API"
    ],
    ux_writing_notes: "Understated, academic, revolutionary, and calm. Avoids cheap hype in favor of historic technological gravitas.",
    friction_points: [
      "Landing page acts as both a corporate research portal and product gateway, which can feel divided",
      "API pricing, rate limits, and token calculation require navigating into the developer portal",
      "Fast release cycle requires continuous reading of system cards and technical docs"
    ],
    design_opportunities: [
      "Provide an interactive multi-modal model demo (voice, vision, code) directly on the homepage",
      "Clarify enterprise ChatGPT vs Developer API data privacy boundaries upfront",
      "Include a visual capabilities timeline of frontier models"
    ],
    designer_summary: "OpenAI's web presence shifted AI design from sci-fi clichés to high-end Swiss typography and minimalist editorial craft. The serene monochrome aesthetic commands immense authority.",
    specs: {
      primary_segment: "Global Consumers, Developers & Enterprise Leaders",
      monetization_model: "Freemium Consumer Subscription ($20/mo) + Token API",
      conversion_path: "Instant ChatGPT Launch / Developer API Key",
      design_signature: "Swiss Typography / Monochrome Editorial / Generative Accents",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://claude.ai": {
    url: "https://claude.ai",
    product_brand: "Anthropic / Claude",
    tagline: "AI that is helpful, harmless, and honest",
    category: "Frontier AI & Cognitive Assistant",
    group: "AI",
    core_value_proposition: "A frontier AI assistant (Claude 3.5 Sonnet) engineered for nuanced reasoning, advanced coding, in-depth analysis, and creative writing with an industry-leading Artifacts UI.",
    target_audience: "Software developers, writers, researchers, enterprise knowledge workers, and technical professionals.",
    cta_strategy: [
      "Primary: 'Start with Claude' (Direct email or Google authentication)",
      "Secondary: 'Explore Claude for Work / Enterprise'",
      "Developer path: 'Build with the Anthropic API'"
    ],
    information_hierarchy: "Warm serif-accented conversation portal. Highlights Claude 3.5 Sonnet benchmark dominance, the Artifacts side-by-side interactive canvas, Constitutional AI safety principles, and enterprise privacy.",
    trust_signals: [
      "Top-ranked reasoning and coding model across industry benchmarks (SWE-bench, HumanEval)",
      "Constitutional AI training framework published and peer-reviewed",
      "Enterprise partnerships with Amazon AWS (Bedrock) and Google Cloud",
      "Explicit commitments not to train models on user conversation data without consent"
    ],
    ux_writing_notes: "Thoughtful, articulate, nuanced, and warm. Evokes the feeling of collaborating with an intelligent, patient human peer.",
    friction_points: [
      "Free tier message limits during peak hours require upgrading to Claude Pro",
      "API platform is separated on a different domain (`anthropic.com/api`)",
      "Project knowledge base token limits require strategic file curation"
    ],
    design_opportunities: [
      "Showcase interactive live Artifacts (React components, SVGs, charts) on the public landing page",
      "Highlight side-by-side benchmark comparisons against other frontier models",
      "Provide instant project workspace starter templates"
    ],
    designer_summary: "Claude’s warm terracotta and cream aesthetic is a refreshing counter to cold, dark AI interfaces. The Artifacts side-panel pattern revolutionized how humans interact with AI-generated code and documents.",
    specs: {
      primary_segment: "Developers, Writers, Researchers & Knowledge Workers",
      monetization_model: "Freemium / Claude Pro ($20/mo) + API Usage",
      conversion_path: "Self-Serve Email / Google Auth",
      design_signature: "Warm Terracotta & Serif / Interactive Artifacts Canvas",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://perplexity.ai": {
    url: "https://perplexity.ai",
    product_brand: "Perplexity",
    tagline: "Where knowledge begins",
    category: "Conversational Search Engine & Answer Engine",
    group: "AI",
    core_value_proposition: "An AI-powered conversational answer engine that searches the live web, synthesizes facts with inline citations, and delivers clear answers without ad clutter.",
    target_audience: "Researchers, journalists, students, knowledge workers, and curious minds seeking verified information fast.",
    cta_strategy: [
      "Primary: 'Ask anything...' (Immediate search input on the homepage)",
      "Secondary: 'Try Pro' (Upsell for multi-model reasoning and file analysis)",
      "App path: 'Download iOS / Android App'"
    ],
    information_hierarchy: "Clean centered search input with suggested trending queries. Directly answers queries with structured headings, inline citation badges, follow-up query suggestions, and source link cards.",
    trust_signals: [
      "Every claim is backed by clickable inline source citations",
      "Multi-model selection options (Claude 3.5 Sonnet, GPT-4o, DeepSeek)",
      "Pro search executing multi-step search query plans",
      "Millions of daily active search queries worldwide"
    ],
    ux_writing_notes: "Direct, objective, concise, and citation-first. Avoids editorial fluff to focus on factual synthesis.",
    friction_points: [
      "Complex technical queries can occasionally blend disparate source contexts",
      "Pro search usage limits on the free tier encourage daily quota management",
      "Publisher copyright and attribution controversies require continuous monitoring"
    ],
    design_opportunities: [
      "Introduce a visual research matrix comparing multiple viewpoints on controversial topics",
      "Add 1-click export of research threads to Notion, Markdown, or PDF",
      "Enhance interactive data table generation from web search results"
    ],
    designer_summary: "Perplexity reimagined the search engine for the generative AI era. The immediate search bar, citation-backed answers, and clean typography make search feel conversational and high-signal.",
    specs: {
      primary_segment: "Researchers, Analysts, Knowledge Workers & Students",
      monetization_model: "Freemium / Perplexity Pro ($20/mo)",
      conversion_path: "Immediate Homepage Search (No Login Required to Start)",
      design_signature: "Asterisk Logo / Minimalist Search Box / Inline Citations",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://cursor.com": {
    url: "https://cursor.com",
    product_brand: "Cursor",
    tagline: "The AI-first code editor",
    category: "AI Code Editor / Developer Environment",
    group: "AI",
    core_value_proposition: "A fork of VS Code engineered from the ground up for pair programming with AI, offering multi-file edits (Composer), full codebase indexing, and tab-assisted auto-completions.",
    target_audience: "Software engineers, full-stack builders, and technical founders seeking exponential coding velocity.",
    cta_strategy: [
      "Primary: 'Download for Mac / Windows' (Instant installer with 1-click VS Code extensions import)",
      "Secondary: 'Explore Cursor Pro & Business'",
      "Community path: 'Join Cursor Community Forum'"
    ],
    information_hierarchy: "Deep dark mode terminal aesthetic with animated code transformations. Highlights Cursor Tab (multi-line next-edit predictions), Composer (multi-file generation), @codebase indexing, and privacy mode.",
    trust_signals: [
      "Adopted by engineers at OpenAI, Midjourney, Shopify, Instacart, and Ramp",
      "Built on standard VS Code engine for 100% extension and keybinding parity",
      "Privacy Mode ensuring code is never stored on servers or used for training",
      "Highest developer satisfaction ratings among AI code assistants"
    ],
    ux_writing_notes: "Concise, engineering-native, and focused on velocity. Highlights 'flow state' and 'instant multi-file edits'.",
    friction_points: [
      "Monthly fast-request credits can be consumed quickly during intense full-stack coding sessions",
      "Requires migrating primary development workflow from standard VS Code or JetBrains",
      "Multi-file edits require disciplined Git review to catch subtle edge-case bugs"
    ],
    design_opportunities: [
      "Embed a live interactive browser-based Composer demo on the homepage",
      "Provide a team velocity ROI calculator showing hours saved per engineer",
      "Showcase automated PR review and test generation workflows"
    ],
    designer_summary: "Cursor is the gold standard for AI-native developer tooling. Its landing page conveys raw engineering horsepower, dark-mode elegance, and respect for developer flow.",
    specs: {
      primary_segment: "Software Engineers & AI-Native Builders",
      monetization_model: "Freemium / Pro ($20/mo) / Enterprise Tiers",
      conversion_path: "Direct Native App Download (1-Click VS Code Import)",
      design_signature: "Monochrome Dark Mode / Animated Code Diff Blocks",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://midjourney.com": {
    url: "https://midjourney.com",
    product_brand: "Midjourney",
    tagline: "An independent research lab exploring new mediums of thought",
    category: "Generative AI / Text-to-Image Synthesis",
    group: "AI",
    core_value_proposition: "A frontier text-to-image AI model renowned for breathtaking artistic fidelity, photorealism, and creative style control via Discord and web creation canvases.",
    target_audience: "Digital artists, concept designers, art directors, game developers, architects, and creative agencies.",
    cta_strategy: [
      "Primary: 'Get Started' (Launch web creation tool / Discord join)",
      "Secondary: 'Explore Community Showcase' (High-resolution public gallery)",
      "Docs path: 'Explore User Guide & Prompt Parameters'"
    ],
    information_hierarchy: "ASCII art aesthetic and infinite generative image showcase. Displays high-resolution community creations with prompt metadata, style parameters (--v 6, --ar 16:9, --stylize), and web creation tools.",
    trust_signals: [
      "Industry-recognized benchmark for artistic image quality and photorealism",
      "Vibrant community with over 16M+ registered Discord members",
      "Completely bootstrapped and independent research lab",
      "Commercial usage rights included with all paid subscriptions"
    ],
    ux_writing_notes: "Mysterious, artistic, philosophical, and unconventional. Avoids traditional B2B SaaS marketing tropes.",
    friction_points: [
      "Historical reliance on Discord caused onboarding friction (now alleviated by the new web creation portal)",
      "Prompt engineering parameters require study to achieve precise compositional control",
      "GPU generation hours require tracking on standard subscription plans"
    ],
    design_opportunities: [
      "Add interactive real-time prompt remixing directly on the homepage gallery",
      "Highlight visual style reference (sref) and character consistency (cref) tools",
      "Provide an interactive prompt builder for beginner creators"
    ],
    designer_summary: "Midjourney’s web presence is delightfully idiosyncratic. Combining retro ASCII art with hyper-realistic AI imagery creates a uniquely artistic brand that stands out from corporate SaaS.",
    specs: {
      primary_segment: "Artists, Concept Designers, Art Directors & Creators",
      monetization_model: "Paid Monthly Subscription Tiers ($10 - $120/mo)",
      conversion_path: "Web App Launch / Discord Server Join",
      design_signature: "Retro ASCII Typography / Infinite High-Res Image Grid",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://huggingface.co": {
    url: "https://huggingface.co",
    product_brand: "Hugging Face",
    tagline: "The AI community building the future",
    category: "Open Source AI / Model Hub & Machine Learning",
    group: "AI",
    core_value_proposition: "The central open-source collaboration platform for machine learning, hosting over 1M+ open models, datasets, and interactive Spaces demos.",
    target_audience: "Machine learning engineers, AI researchers, data scientists, and open-source developers.",
    cta_strategy: [
      "Primary: 'Join the Community' (Free developer account creation)",
      "Secondary: 'Explore Models & Datasets' (Search 1,000,000+ open assets)",
      "Enterprise path: 'Hugging Face Enterprise Hub'"
    ],
    information_hierarchy: "Vibrant emoji-accented model and dataset feed. Highlights trending open weights (Llama, Mistral, Flux), Spaces interactive Gradio demos, Leaderboards (Open LLM Leaderboard), and Inference Endpoints.",
    trust_signals: [
      "The undisputed GitHub of Machine Learning with 1M+ open models",
      "Used by Google, Meta, Microsoft, Amazon, and top AI research labs",
      "Industry-standard `transformers` and `diffusers` Python libraries",
      "Transparent model cards with ethical AI and licensing metadata"
    ],
    ux_writing_notes: "Open-source, community-first, transparent, and collaborative. Celebrates open research and collective progress.",
    friction_points: [
      "Vast model catalog can make evaluating which model version is optimal for a specific production use case difficult",
      "Understanding quantization formats (GGUF, AWQ, FP16) requires machine learning background",
      "Inference compute pricing is separate from free model hosting"
    ],
    design_opportunities: [
      "Provide an interactive 'Model Selector' quiz based on task, hardware, and budget",
      "Enhance 1-click cloud deployment guides for AWS, GCP, and Azure",
      "Highlight automated benchmark evaluation comparisons directly on model cards"
    ],
    designer_summary: "Hugging Face is the heart of open-source AI. Its friendly yellow smiling emoji logo and developer-first layout prove that cutting-edge machine learning can be open, approachable, and fun.",
    specs: {
      primary_segment: "Machine Learning Engineers & AI Researchers",
      monetization_model: "Free Open Source Hub / Paid Compute & Enterprise Hub",
      conversion_path: "Self-Serve Developer Signup / pip install transformers",
      design_signature: "Yellow Hugging Face Emoji / Model Cards & Spaces",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://elevenlabs.io": {
    url: "https://elevenlabs.io",
    product_brand: "ElevenLabs",
    tagline: "The most realistic voice AI and text-to-speech platform",
    category: "Generative Audio / Voice AI & Speech Synthesis",
    group: "AI",
    core_value_proposition: "High-fidelity AI voice generator that turns text into natural human speech with emotional cadence, instant voice cloning, and multilingual translation across 32+ languages.",
    target_audience: "Content creators, game developers, audiobook publishers, video editors, and conversational AI developers.",
    cta_strategy: [
      "Primary: 'Get Started Free' (Instant audio sandbox testing)",
      "Secondary: 'Explore Voice Library' (Browse thousands of community voices)",
      "Developer path: 'Explore Conversational AI Agent API'"
    ],
    information_hierarchy: "Interactive audio playground hero where visitors can type text and listen to photorealistic voices immediately. Highlights Voice Cloning, Dubbing Studio, Sound Effects generator, and Conversational AI APIs.",
    trust_signals: [
      "Industry-leading voice naturalness and emotional cadence fidelity",
      "Used by The Washington Post, HarperCollins, Paradox Interactive, and top YouTubers",
      "SOC 2 Type II compliance and robust AI Voice Safety Captchas",
      "Global Voice Library supporting ethical creator voice payouts"
    ],
    ux_writing_notes: "Expressive, creative, and immediate. Emphasizes emotional nuance, human breath, and audio immersion.",
    friction_points: [
      "Character generation quota on free plans can be consumed quickly during long audio tests",
      "Instant voice cloning quality depends on the clarity of the uploaded reference audio",
      "Commercial licensing requires paid subscription tiers"
    ],
    design_opportunities: [
      "Add live real-time voice latency interactive comparisons on the homepage",
      "Showcase interactive Conversational AI agent widget directly in the browser",
      "Provide podcast & video studio timeline integration previews"
    ],
    designer_summary: "ElevenLabs provides instant gratification. Placing a working interactive audio player directly in the hero lets visitors hear the product quality in 3 seconds, driving immediate conversion.",
    specs: {
      primary_segment: "Creators, Game Developers, Media & AI Voice Teams",
      monetization_model: "Freemium / Monthly Character Quota Tiers + API",
      conversion_path: "Immediate Hero Audio Player Test → Free Signup",
      design_signature: "Audio Waveform Visualizers / Clean Obsidian Palette",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://replicate.com": {
    url: "https://replicate.com",
    product_brand: "Replicate",
    tagline: "Run AI models with an API, with a single line of code",
    category: "AI Cloud Infrastructure & Model Deployment",
    group: "AI",
    core_value_proposition: "A cloud platform that lets developers run open-source machine learning models (Flux, Llama, Whisper, Stable Diffusion) via a simple REST API or deploy their own custom models with Cog.",
    target_audience: "Software developers, startup builders, and AI product squads needing scalable GPU inference without managing Kubernetes clusters.",
    cta_strategy: [
      "Primary: 'Get Started' (Instant API token generation with GitHub SSO)",
      "Secondary: 'Explore Models' (Browse collection of open weights)",
      "CLI path: 'Deploy with Cog (Open source container packaging)'"
    ],
    information_hierarchy: "Monospace code block hero with live model inference playground. Demonstrates 1-line Python/Node/cURL API snippets, per-second GPU pricing, fine-tuning capabilities, and real-time model speed telemetry.",
    trust_signals: [
      "Powers AI generation for BuzzFeed, Superhuman, Character.ai, and thousands of apps",
      "Millions of model predictions executed daily with automatic GPU scaling to zero",
      "SOC 2 Type II certified and transparent per-second billing",
      "Open-source `cog` standard for reproducible containerized machine learning"
    ],
    ux_writing_notes: "Concise, developer-native, and transparent. Replaces complex GPU provisioning with simple HTTP requests.",
    friction_points: [
      "Cold-start times for rarely used models require architectural consideration",
      "Per-second GPU billing requires understanding execution time benchmarks",
      "Fine-tuning workflows require formatting training datasets to strict specs"
    ],
    design_opportunities: [
      "Provide an interactive cost & latency calculator for popular models (e.g. Flux vs SDXL)",
      "Embed a live browser webcam / audio input test directly in the hero",
      "Highlight automatic private model deployment workflows"
    ],
    designer_summary: "Replicate makes running open-source AI models feel as straightforward as calling Stripe. The clean monospace design and immediate interactive playgrounds set the benchmark for AI infrastructure.",
    specs: {
      primary_segment: "Full-Stack Developers & AI App Builders",
      monetization_model: "Pay-as-you-go Per-Second GPU Hardware Billing",
      conversion_path: "GitHub OAuth / Instant API Token Generation",
      design_signature: "Monospace Font / Interactive Web Playgrounds / Code Snippets",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://mistral.ai": {
    url: "https://mistral.ai",
    product_brand: "Mistral AI",
    tagline: "Frontier AI in your hands",
    category: "Open Weight & Enterprise Large Language Models",
    group: "AI",
    core_value_proposition: "Open-weight and commercial large language models (Mistral Large, Pixtral, Codestral, Le Chat) engineered for unmatched efficiency, transparent licensing, and enterprise sovereignty.",
    target_audience: "Enterprise architects, developers, privacy-conscious organizations, and European tech leaders.",
    cta_strategy: [
      "Primary: 'Talk to Us / Get Started' (Enterprise consultation & API access)",
      "Consumer path: 'Try Le Chat' (Free conversational assistant)",
      "Developer path: 'Explore Documentation & Weights on Hugging Face'"
    ],
    information_hierarchy: "High-contrast retro pixel-art aesthetic paired with rigorous model benchmark charts. Highlights Open Weights, Le Plateforme API, Le Chat assistant, and on-premises enterprise deployment options.",
    trust_signals: [
      "Europe's premier frontier AI lab with top-tier global venture backing",
      "Commercial partnerships with Microsoft Azure, AWS Bedrock, and Snowflake",
      "Open-weight models with permissive Apache 2.0 licenses",
      "GDPR native compliance and complete on-premises deployment capabilities"
    ],
    ux_writing_notes: "Precise, confident, scientific, and independent. Champions open weights and technological sovereignty.",
    friction_points: [
      "Evaluating open weights vs commercial API endpoints requires reading technical licensing terms",
      "Le Chat assistant is relatively newer compared to ChatGPT and Claude ecosystems",
      "Enterprise on-prem deployments require dedicated infrastructure planning"
    ],
    design_opportunities: [
      "Add an interactive benchmark comparison tool against proprietary closed models",
      "Showcase 1-click self-hosting deployment guides for private cloud VPCs",
      "Highlight Codestral coding benchmark metrics prominently in the hero"
    ],
    designer_summary: "Mistral AI blends a distinctive warm retro-pixel aesthetic with cutting-edge French engineering prestige. Its commitment to open weights provides a compelling alternative to closed AI ecosystems.",
    specs: {
      primary_segment: "Enterprise Architects, Devs & Sovereignty-Focused Teams",
      monetization_model: "Free Open Weights + Paid Token API & Enterprise Licenses",
      conversion_path: "Le Chat Free Launch / API Token / Hugging Face Download",
      design_signature: "Orange Pixel Art / Retro French Typography / Benchmark Grids",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://runwayml.com": {
    url: "https://runwayml.com",
    product_brand: "Runway",
    tagline: "Advancing creativity with artificial intelligence",
    category: "Generative Video & Creative AI Tools",
    group: "AI",
    core_value_proposition: "Pioneering generative video AI models (Gen-3 Alpha) and cinematic creative tools that allow filmmakers, art directors, and creators to generate photorealistic video from text and images.",
    target_audience: "Filmmakers, VFX artists, art directors, advertising agencies, and video producers.",
    cta_strategy: [
      "Primary: 'Try Runway for Free' (Instant web video studio launch)",
      "Secondary: 'Explore Gen-3 Alpha' (Cinematic showcase)",
      "Enterprise path: 'Runway Studios & Enterprise Partnerships'"
    ],
    information_hierarchy: "Full-bleed cinematic video reel hero showcasing high-resolution AI-generated footage. Walks through Gen-3 Alpha camera controls, Motion Brush, Text-to-Video, Image-to-Video, and AI Film Festival highlights.",
    trust_signals: [
      "Pioneered the original Stable Diffusion research and Gen-1/2/3 video models",
      "Used by Hollywood VFX studios, Lionsgate, and global advertising agencies",
      "Hosts the annual AI Film Festival celebrating frontier cinema",
      "Enterprise safety filters and copyright protection guarantees"
    ],
    ux_writing_notes: "Cinematic, visionary, artistic, and ambitious. Elevates AI video generation to the level of high-end filmmaking.",
    friction_points: [
      "High-resolution video generation consumes monthly credits rapidly",
      "Complex camera motion prompts require experimentation to achieve exact visual choreography",
      "Video generation rendering time requires waiting in queue during peak periods"
    ],
    design_opportunities: [
      "Provide an interactive Motion Brush simulator on the landing page",
      "Showcase prompt breakdowns with before-and-after video choreography overlays",
      "Include a prompt recipe book for cinematic camera movements"
    ],
    designer_summary: "Runway feels like a prestige film studio. Its full-bleed high-framerate video reels immediately demonstrate the artistic power of Gen-3 Alpha, establishing it as the premier generative video platform.",
    specs: {
      primary_segment: "Filmmakers, VFX Artists, Creative Directors & Agencies",
      monetization_model: "Freemium / Monthly Credit Plans ($12 - $76/mo) + Enterprise",
      conversion_path: "Instant Web Studio Launch (Google / Apple SSO)",
      design_signature: "Full-Bleed 4K Video Reels / Dark Cinema Aesthetic",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  // ─── 4. FINTECH & B2B SAAS ──────────────────────────────────────────────────
  "https://ramp.com": {
    url: "https://ramp.com",
    product_brand: "Ramp",
    tagline: "The ultimate corporate card & spend management platform",
    category: "Corporate Cards & Spend Management",
    group: "Fintech",
    core_value_proposition: "A finance automation platform combining corporate cards, expense management, bill pay, vendor negotiations, and travel booking designed to help businesses control costs.",
    target_audience: "CFOs, finance directors, operations leads, and founders managing company spending.",
    cta_strategy: [
      "Primary: 'Get Started' (Instant online application in 5 minutes)",
      "Secondary: 'See Interactive Demo' (Self-paced interactive product walkthrough)",
      "Sales path: 'Talk to Sales (for teams with $10M+ annual revenue)'"
    ],
    information_hierarchy: "High-contrast clean financial hero with dynamic card visual. Demonstrates automated receipt matching, AI invoice processing, vendor price intelligence, and enterprise ERP sync.",
    trust_signals: [
      "Over 25,000+ businesses use Ramp to control spend",
      "Saves customers an average of 5% on operating costs annually",
      "Customer logos (Shopify, Webflow, Discord, Glossier, Virgin)",
      "SOC 1/2, PCI-DSS Level 1, and FDIC insurance up to $250,000"
    ],
    ux_writing_notes: "Assertive, ROI-obsessed, and direct. Centers relentlessly on saving money and saving time.",
    friction_points: [
      "Eligibility requires qualifying business bank account balances ($75,000+)",
      "Corporate card credit limits depend on linked banking cash flow history",
      "ERP integration configuration requires finance team onboarding"
    ],
    design_opportunities: [
      "Provide an interactive spend savings calculator directly on the homepage",
      "Highlight automated AI receipt reconciliation in an interactive gif/video",
      "Include a direct feature-by-feature comparison against legacy corporate cards"
    ],
    designer_summary: "Ramp represents modern financial precision. The neon yellow-green accent on dark charcoal cards conveys speed, efficiency, and modern fiscal discipline.",
    specs: {
      primary_segment: "High-Growth Startups & Enterprise Finance Teams",
      monetization_model: "Free Platform / Interchange-Funded + Ramp Plus SaaS",
      conversion_path: "5-Minute Online Application (EIN & Bank Link)",
      design_signature: "Volt Green Accents / Sleek Metallic Cards / ROI Stats",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://brex.com": {
    url: "https://brex.com",
    product_brand: "Brex",
    tagline: "Corporate cards and spend management for global enterprises and startups",
    category: "Corporate Banking & Global Spend Management",
    group: "Fintech",
    core_value_proposition: "An AI-powered corporate card, business banking, and global spend management platform enabling companies to manage travel, expenses, and treasury across 100+ countries.",
    target_audience: "Fast-growing venture-backed startups, enterprise CFOs, and international business operations.",
    cta_strategy: [
      "Primary: 'Open an Account' (Fast digital onboarding flow)",
      "Secondary: 'Contact Sales' (Enterprise global spend consultation)",
      "Product path: 'Explore Brex Payables & AI Assistant'"
    ],
    information_hierarchy: "Clean editorial hero with metallic card visual. Highlights Brex AI for automatic expense receipts, global currency cards, treasury cash management (up to $6M FDIC coverage), and enterprise ERP integrations.",
    trust_signals: [
      "Powers spend for 1 in 3 US venture-backed startups",
      "Enterprise customer logos (DoorDash, SeatGeek, Compass, Superhuman)",
      "FDIC insurance up to $6M through program banks",
      "SOC 1 Type II, SOC 2 Type II, and PCI-DSS certified"
    ],
    ux_writing_notes: "Sophisticated, global, and institutional. Blends tech-forward agility with banking stability.",
    friction_points: [
      "Shift towards mid-market and enterprise accounts requires verifying startup revenue minimums",
      "Complex multi-entity global tax compliance requires advisor setup",
      "Card rewards structure varies across startup vs enterprise plans"
    ],
    design_opportunities: [
      "Add an interactive multi-currency global expense visualizer",
      "Highlight treasury yield interest rate calculator on the homepage",
      "Provide 1-click comparison with legacy expense reporting tools"
    ],
    designer_summary: "Brex communicates institutional scale and financial elegance. The black and bronze aesthetic with clean card renderings inspires confidence for high-stakes corporate treasuries.",
    specs: {
      primary_segment: "Venture Startups & Global Mid-Market Enterprises",
      monetization_model: "Interchange Revenue + Enterprise Software Tiers",
      conversion_path: "Online Account Application (Corporate Identity)",
      design_signature: "Bronze & Obsidian Palette / Metallic Cards / Global Maps",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://mercury.com": {
    url: "https://mercury.com",
    product_brand: "Mercury",
    tagline: "Banking built for startups and ambitious companies",
    category: "Fintech / Startup Business Banking",
    group: "Fintech",
    core_value_proposition: "A modern fintech banking platform providing checking, savings, venture debt, treasury management, and programmatic APIs designed specifically for startups.",
    target_audience: "Tech founders, early-stage startups, venture-backed companies, and ecommerce businesses.",
    cta_strategy: [
      "Primary: 'Open Account' (100% online application completed in 10 minutes)",
      "Secondary: 'Take Product Tour' (Interactive sandbox banking interface)",
      "Founder path: 'Explore Mercury Raise (Investor networking)'"
    ],
    information_hierarchy: "Tactile card and software visual hero. Highlights checking/savings with up to $5M FDIC insurance, Treasury auto-yield investing, investor networking (Mercury Raise), and developer API banking.",
    trust_signals: [
      "Over 100,000+ startups bank through Mercury (including 1 in 5 YC startups)",
      "Up to $5M in FDIC insurance via sweep partner banks (Choice Financial Group, Evolve Bank)",
      "Customer logos (Retool, Maven, Linear, Lunchclub)",
      "SOC 2 Type II compliance and multi-factor biometric security"
    ],
    ux_writing_notes: "Calm, transparent, empathetic, and founder-supportive. Treats financial operations as an extension of startup product craft.",
    friction_points: [
      "Requires qualifying business registration and operational verification",
      "Strict compliance screening can require additional documentation for international founders",
      "Mercury is a financial technology company, not an independent chartered bank (operates via partner banks)"
    ],
    design_opportunities: [
      "Embed a live Treasury yield return estimator on the landing page",
      "Highlight the programmable banking API code snippets directly in the hero",
      "Provide an interactive walkthrough of the investor deck sharing network (Raise)"
    ],
    designer_summary: "Mercury transformed the business banking user experience. Its calm dark theme, beautiful typography, and focus on startup founders make banking feel modern, fast, and empowering.",
    specs: {
      primary_segment: "Tech Founders & Venture-Backed Startups",
      monetization_model: "Zero Monthly Fees / Net Interest Margin & Treasury",
      conversion_path: "10-Minute Digital Application (US Entity & Passport)",
      design_signature: "Deep Indigo Theme / Smooth Glassmorphism / Founder Focus",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://plaid.com": {
    url: "https://plaid.com",
    product_brand: "Plaid",
    tagline: "The fast, safe way to build financial apps",
    category: "Fintech Infrastructure / Open Banking API",
    group: "Fintech",
    core_value_proposition: "A data network and API platform that connects consumer bank accounts securely to thousands of financial apps, enabling instant identity verification, balance checks, and payments.",
    target_audience: "Fintech developers, banking architects, digital lenders, and financial product managers.",
    cta_strategy: [
      "Primary: 'Get API Keys' (Free developer sandbox account creation)",
      "Secondary: 'Contact Sales' (Enterprise high-volume transaction routing)",
      "Consumer path: 'How Plaid Works for Consumers'"
    ],
    information_hierarchy: "Plaid Link UI modal preview paired with API code snippets. Walks through Account Auth, Balance Checks, Identity Verification, Fraud Risk scoring, and Global Open Banking coverage.",
    trust_signals: [
      "Connects to 12,000+ financial institutions across US, Canada, UK, and Europe",
      "Powers 8,000+ fintech apps including Venmo, Robinhood, Chime, and SoFi",
      "End-to-end bank-grade encryption and SOC 2 Type II compliance",
      "Over 100M+ consumers connected through Plaid Link"
    ],
    ux_writing_notes: "Secure, developer-empowering, and reassuring. Balances technical API documentation with consumer privacy trust.",
    friction_points: [
      "Bank connectivity uptime can occasionally vary by legacy institutional core providers",
      "Production access requires security review and business verification",
      "Per-API-call pricing models require tracking authentication vs balance check volumes"
    ],
    design_opportunities: [
      "Provide an interactive Plaid Link authentication simulator directly on the page",
      "Include a live latency and bank coverage search tool",
      "Highlight Instant ACH account verification and fraud detection metrics"
    ],
    designer_summary: "Plaid set the standard for open banking design. The clean geometric grid, high-contrast typography, and ubiquitous Plaid Link modal represent the infrastructure of modern fintech.",
    specs: {
      primary_segment: "Fintech Developers, Digital Banks & Lending Apps",
      monetization_model: "Pay-as-you-go API Pricing / Volume Enterprise Contracts",
      conversion_path: "Developer Sandbox Key Signup / Quickstart SDKs",
      design_signature: "Geometric Grid Lines / Plaid Link Modal Preview",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://deel.com": {
    url: "https://deel.com",
    product_brand: "Deel",
    tagline: "The all-in-one Global HR and Payroll platform",
    category: "Global Payroll, EOR & Contractor Compliance",
    group: "Fintech",
    core_value_proposition: "A global HR platform that enables companies to hire international contractors and full-time employees in 150+ countries without opening local legal entities, with automated compliance and tax filing.",
    target_audience: "HR leaders, CFOs, founders, and global recruiters building remote and distributed workforces.",
    cta_strategy: [
      "Primary: 'Book a Demo' (Direct sales consultation and HR assessment)",
      "Secondary: 'Get Started' (Self-serve contractor invoicing setup)",
      "Tool path: 'Explore Global Salary & Tax Calculators'"
    ],
    information_hierarchy: "Global payroll map hero with dynamic salary compliance calculator. Segmented by Employer of Record (EOR), Contractor Management, Global Payroll, and Deel HR, backed by client testimonials and legal certifications.",
    trust_signals: [
      "Over 35,000+ companies use Deel (including Nike, Klarna, Shopify, Reddit, BCG)",
      "Maintains 100+ wholly owned local legal entities worldwide",
      "Over 200+ in-house legal and tax compliance specialists",
      "SOC 2 Type II, ISO 27001, and GDPR compliant"
    ],
    ux_writing_notes: "Global, reassuring, compliant, and ambitious. Eliminates the legal anxiety of hiring across international borders.",
    friction_points: [
      "Employer of Record (EOR) monthly per-employee fees can be significant for bootstrapping startups",
      "Country-specific labor laws and mandatory benefit packages require advisory review",
      "Contractor invoice withdrawal methods vary by local banking corridors"
    ],
    design_opportunities: [
      "Embed an interactive 'Cost of Hiring in Country X' calculator in the hero",
      "Highlight automated visa and immigration sponsorship workflows",
      "Provide 1-click contract template generators for top hiring countries"
    ],
    designer_summary: "Deel transformed the complexity of global employment into a streamlined software platform. Its clean typography, vibrant blue accents, and localized compliance tools inspire confidence.",
    specs: {
      primary_segment: "HR Directors, CFOs & Global Remote Companies",
      monetization_model: "Per-Employee / Per-Contractor Monthly SaaS Tiers",
      conversion_path: "Demo Booking / Self-Serve Contractor Signup",
      design_signature: "Global Map Telemetry / Vibrant Blue Accents / Country Cards",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://gusto.com": {
    url: "https://gusto.com",
    product_brand: "Gusto",
    tagline: "Payroll, HR, and benefits built for modern small businesses",
    category: "Small Business Payroll & HR Benefits",
    group: "Fintech",
    core_value_proposition: "A payroll and human resources platform that automates tax filings, health insurance benefits, 401(k) plans, and time tracking for small and medium-sized businesses.",
    target_audience: "Small business owners, startup founders, HR managers, and accountants.",
    cta_strategy: [
      "Primary: 'Get Started' (Interactive pricing and plan selection)",
      "Secondary: 'Talk to Sales' (Custom plan advisor for growing businesses)",
      "Accountant path: 'Gusto for Accountants'"
    ],
    information_hierarchy: "Warm, friendly small business hero with payroll dashboard visual. Breaks down into AutoPilot Payroll, Employee Benefits, Time & Attendance, and Compliance, supported by customer success stories.",
    trust_signals: [
      "Over 300,000+ businesses nationwide run payroll on Gusto",
      "Processes tens of billions of dollars in payroll annually",
      "Automated local, state, and federal tax filings with accuracy guarantees",
      "4.8/5 ratings across leading software review sites"
    ],
    ux_writing_notes: "Warm, supportive, human, and reassuring. Treats payroll as an act of caring for your team.",
    friction_points: [
      "State-specific tax registrations still require initial business documentation",
      "Pricing scales with both a base monthly fee plus per-employee charges",
      "Geographic focus is primarily centered on the US domestic market"
    ],
    design_opportunities: [
      "Add an interactive 'Time Saved on Payroll' calculator on the homepage",
      "Provide an interactive health benefits cost comparison helper",
      "Highlight automatic contractor-to-employee conversion guidance"
    ],
    designer_summary: "Gusto brought empathy and delight to small business payroll. The warm terracotta and sage palette, friendly illustrations, and clean dashboard design demystify tax compliance.",
    specs: {
      primary_segment: "Small Businesses, Startups & Accounting Practices",
      monetization_model: "Base Monthly Fee + Per-Employee Monthly SaaS",
      conversion_path: "Self-Serve Plan Selection & Digital Onboarding",
      design_signature: "Warm Terracotta / Friendly Character Art / Clean Dashboards",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://intercom.com": {
    url: "https://intercom.com",
    product_brand: "Intercom",
    tagline: "The complete AI customer service solution",
    category: "Customer Support & AI Helpdesk",
    group: "Fintech",
    core_value_proposition: "An AI-native customer service platform powered by Fin AI Agent, providing automated support resolutions, omnichannel inboxes, and proactive user onboarding.",
    target_audience: "Customer support leaders, SaaS founders, product growth teams, and customer success directors.",
    cta_strategy: [
      "Primary: 'Start Free Trial' (14-day full access self-serve trial)",
      "Secondary: 'View Fin AI Demo' (Interactive AI bot resolution preview)",
      "Enterprise path: 'Talk to Sales'"
    ],
    information_hierarchy: "Signature chat bubble hero demonstrating Fin AI Agent resolving customer questions in real time. Highlights the Helpdesk Inbox, Proactive Support, Help Center knowledge base, and Fin AI ROI metrics.",
    trust_signals: [
      "Over 25,000+ global businesses rely on Intercom (Anthropic, Atlassian, Notion, Amazon)",
      "Fin AI Agent resolving over 50%+ of customer inquiries automatically",
      "SOC 2 Type II, HIPAA, ISO 27001, and GDPR compliance",
      "Pioneer of modern conversational web messenger UI"
    ],
    ux_writing_notes: "Conversational, modern, metric-backed, and confident. Focuses on support resolution rate and deflection efficiency.",
    friction_points: [
      "Per-resolution pricing model for Fin AI ($0.99 per resolution) requires support volume forecasting",
      "Extensive feature suite can feel expensive for early-stage solo founders",
      "Routing rule setup requires careful configuration for multi-tier support teams"
    ],
    design_opportunities: [
      "Add an interactive sandbox where visitors can chat with Fin AI trained on their own website URL",
      "Include a live Support Cost Savings ROI calculator",
      "Provide 1-click helpdesk migration templates from Zendesk"
    ],
    designer_summary: "Intercom invented modern in-app customer communication. The distinctive rounded messenger, bright blue accents, and focus on Fin AI make customer support feel effortless and modern.",
    specs: {
      primary_segment: "SaaS Support Teams & Customer Success Leaders",
      monetization_model: "Per-Seat Subscription + Fin AI Per-Resolution Fee",
      conversion_path: "14-Day Self-Serve Free Trial (No CC Required to Start)",
      design_signature: "Messenger Chat Bubbles / Cobalt Blue / Fin AI Bot Avatars",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://webflow.com": {
    url: "https://webflow.com",
    product_brand: "Webflow",
    tagline: "The site building platform for modern designers and marketing teams",
    category: "Visual Web Development & CMS",
    group: "Productivity",
    core_value_proposition: "A visual development platform that translates design directly into clean, semantic HTML, CSS, and JavaScript, empowering designers to build production websites without writing code.",
    target_audience: "Visual designers, creative agencies, marketing teams, and frontend creators.",
    cta_strategy: [
      "Primary: 'Get started — it's free' (Instant canvas design studio launch)",
      "Secondary: 'Contact Sales' (Enterprise workspace and governance)",
      "Ecosystem path: 'Explore Made in Webflow Marketplace & Apps'"
    ],
    information_hierarchy: "Visual Designer UI canvas hero with real-time CSS property manipulation. Breaks down into Visual Canvas, CMS & Localization, Interactions & Animations, Webflow Apps, and Enterprise Hosting.",
    trust_signals: [
      "Over 3.5M+ designers and teams building on Webflow",
      "Powers marketing websites for Dropbox, Discord, IDEO, Orangetheory, and Vice",
      "Enterprise hosting powered by AWS and Fastly with 99.99% uptime SLA",
      "SOC 2 Type II, ISO 27001, and CCPA/GDPR compliance"
    ],
    ux_writing_notes: "Creative, empowering, design-first, and professional. Bridges the gap between raw CSS code and intuitive visual canvas design.",
    friction_points: [
      "Steep learning curve for users who do not understand fundamental CSS box model, flexbox, and grid concepts",
      "Pricing structure distinguishes between Workspace plans (for building) and Site plans (for hosting)",
      "Complex custom web app backend logic requires integrating external tools like Wized or Supabase"
    ],
    design_opportunities: [
      "Provide interactive 1-minute visual tutorials on Flexbox and Grid directly in the hero",
      "Include a live cost comparison against custom React development",
      "Highlight Webflow AI automated layout generation features"
    ],
    designer_summary: "Webflow empowered an entire generation of visual designers to build production-grade web software. The rich visual canvas and high-fidelity typography set the standard for no-code development.",
    specs: {
      primary_segment: "Visual Designers, Agencies & Marketing Teams",
      monetization_model: "Freemium / Workspace Tier + Per-Site Hosting Plans",
      conversion_path: "Self-Serve Free Visual Canvas (Google / Email)",
      design_signature: "Visual CSS Box Model Inspector / Canvas Grid Overlays",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://framer.com": {
    url: "https://framer.com",
    product_brand: "Framer",
    tagline: "Design and publish stunning websites with the speed of light",
    category: "Design-to-Web Publishing & AI Builder",
    group: "Productivity",
    core_value_proposition: "A website builder that feels as intuitive as Figma, letting designers design, animate with spring physics, and publish responsive websites with zero code in minutes.",
    target_audience: "Product designers, freelance creators, startups, and marketing squads wanting Figma-speed site launches.",
    cta_strategy: [
      "Primary: 'Start for Free' (Instant browser-based canvas launch)",
      "Secondary: 'Watch Video' (High-speed 60-second product demo)",
      "Template path: 'Browse 1,000+ Designer Templates'"
    ],
    information_hierarchy: "Fluid visual canvas hero demonstrating Figma-like vector editing with 1-click publishing. Highlights spring scroll animations, Framer AI generation, CMS collections, and global edge hosting.",
    trust_signals: [
      "Adopted by top product designers and high-growth startups globally",
      "Built natively on React and motion spring animation primitives",
      "Global edge hosting with sub-second page loads and automatic responsive breakpoints",
      "Vibrant marketplace with millions of template downloads"
    ],
    ux_writing_notes: "Fast, kinetic, design-obsessed, and frictionless. Emphasizes publishing in seconds and micro-animation craft.",
    friction_points: [
      "Advanced custom database logic and user authentication requires external integrations",
      "Free plan displays a subtle 'Made in Framer' badge",
      "Evolving CMS features require adapting from traditional relational database models"
    ],
    design_opportunities: [
      "Embed a live spring animation playground directly on the homepage",
      "Provide 1-click 'Paste from Figma' interactive simulator in the hero",
      "Showcase localization and multi-language publishing workflow previews"
    ],
    designer_summary: "Framer closed the gap between interface design and live web deployment. Its kinetic animations, Figma-like ergonomics, and instant publishing make building websites feel effortless.",
    specs: {
      primary_segment: "Product Designers, Freelancers & Modern Startups",
      monetization_model: "Freemium / Per-Site Hosting Plans + Pro Workspace",
      conversion_path: "Instant Browser Canvas (Figma Copy/Paste Ready)",
      design_signature: "Figma Ergonomics / Spring Animations / Dark Minimalist UI",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  // ─── 5. CONSUMER, COMMERCE & MARKETPLACE ────────────────────────────────────
  "https://airbnb.com": {
    url: "https://airbnb.com",
    product_brand: "Airbnb",
    tagline: "Find unique stays and unforgettable experiences",
    category: "Marketplace / Travel & Hospitality",
    group: "Consumer",
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
  },

  "https://spotify.com": {
    url: "https://spotify.com",
    product_brand: "Spotify",
    tagline: "Listening is everything. Millions of songs and podcasts.",
    category: "Audio Streaming & Entertainment",
    group: "Consumer",
    core_value_proposition: "A global music and podcast streaming service providing personalized algorithmic discovery (Discover Weekly, Daylist), curated playlists, and cross-device audio playback.",
    target_audience: "Music lovers, podcast listeners, audiobook fans, and everyday audio consumers worldwide.",
    cta_strategy: [
      "Primary: 'Get Spotify Free' (Direct account registration)",
      "Secondary: 'Get Premium Individual' (Free trial offer with card verification)",
      "Plan selector: Family, Duo, Student, and Individual pricing tiers"
    ],
    information_hierarchy: "High-impact visual hero with artist imagery and personalized playlist mockups. Progresses into Premium benefits (ad-free, offline download, high quality), plan comparison cards, and universal device connectivity.",
    trust_signals: [
      "Over 600M+ active users and 230M+ paying subscribers worldwide",
      "Catalog of over 100M+ songs and 5M+ podcasts",
      "Universal device sync across mobile, desktop, smart speakers, cars, and TVs",
      "Global artist payouts and secure international payment methods"
    ],
    ux_writing_notes: "Energetic, cultural, rhythmic, and accessible. Focuses on personal mood, emotion, and unlimited listening.",
    friction_points: [
      "Free mobile tier enforces shuffle-only playback with audio ads",
      "Price adjustments across international markets require clear tier communication",
      "Lossless HiFi audio rollout timing remains a frequent power-user question"
    ],
    design_opportunities: [
      "Provide an interactive mini-player audio sample in the hero",
      "Showcase dynamic personalized Daylist discovery previews on the landing page",
      "Highlight seamless cross-device Spotify Connect handoff in action"
    ],
    designer_summary: "Spotify's iconic neon green on black aesthetic represents modern entertainment software. Its clean plan comparison cards and immediate music discovery drive massive global conversion.",
    specs: {
      primary_segment: "Global Music Listeners & Podcast Enthusiasts",
      monetization_model: "Freemium (Ad-Supported) + Premium Subscription Tiers",
      conversion_path: "Self-Serve Free Signup / Premium Free Trial",
      design_signature: "Neon Green / Dark Theme / Rounded Media Cards",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://uber.com": {
    url: "https://uber.com",
    product_brand: "Uber",
    tagline: "Go anywhere. Get anything.",
    category: "Mobility, Ridesharing & Food Delivery",
    group: "Consumer",
    core_value_proposition: "A global mobility platform that connects riders with drivers for on-demand transportation, and consumers with local restaurants and groceries through Uber Eats.",
    target_audience: "Urban commuters, travelers, restaurant diners, delivery recipients, and gig economy drivers.",
    cta_strategy: [
      "Primary: 'Request a ride' (Immediate pickup and destination input widget)",
      "Secondary: 'Sign up to drive / Drive & deliver' (Driver recruitment funnel)",
      "Business path: 'Uber for Business (Corporate travel & meal management)'"
    ],
    information_hierarchy: "Interactive dual-tab booking widget (Ride vs Drive vs Eat). Outlines passenger ride tiers (UberX, Comfort, Black), driver earnings potential, safety features, and Uber One membership savings.",
    trust_signals: [
      "Over 150M+ monthly active platform consumers across 70+ countries",
      "Over 28M+ trips completed every single day",
      "In-app safety toolkit with 24/7 incident response, GPS tracking, and pin verification",
      "Transparent upfront pricing and driver background checks"
    ],
    ux_writing_notes: "Direct, functional, dependable, and urban. Focuses on immediate convenience, safety, and flexible earnings.",
    friction_points: [
      "Surge pricing during peak hours and weather events can cause price hesitation",
      "Driver vs rider navigation balancing on a single homepage requires careful tab design",
      "Uber One subscription auto-renew terms require clear cancellation visibility"
    ],
    design_opportunities: [
      "Provide a live fare estimate calculator directly in the hero widget",
      "Showcase Uber Reserve advance airport booking guarantees",
      "Highlight carbon-neutral Uber Green ride options prominently"
    ],
    designer_summary: "Uber’s monochrome and clean typographic system emphasizes prompt utility and dependable urban mobility. The immediate trip booking widget drives direct conversion.",
    specs: {
      primary_segment: "Urban Commuters, Travelers & Gig Economy Drivers",
      monetization_model: "Two-Sided Marketplace Commission + Uber One Subscription",
      conversion_path: "Web Booking / App Store Download",
      design_signature: "High-Contrast Monochrome / Route Line Maps / Booking Tabs",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  },

  "https://shopify.com": {
    url: "https://shopify.com",
    product_brand: "Shopify",
    tagline: "The global commerce platform built for entrepreneurs to enterprises",
    category: "Ecommerce Platform & Point of Sale",
    group: "Consumer",
    core_value_proposition: "An all-in-one commerce platform that lets anyone start, run, and scale an online store, point-of-sale retail system, and multi-channel global brand.",
    target_audience: "Independent creators, direct-to-consumer founders, retail store owners, and Fortune 500 commerce brands.",
    cta_strategy: [
      "Primary: 'Start free trial' (3-day free trial + $1/month introductory offer)",
      "Secondary: 'Explore Shopify Plus' (High-volume enterprise commerce)",
      "Point of Sale path: 'Explore Retail POS hardware'"
    ],
    information_hierarchy: "High-converting single-field email trial hero. Highlights multi-channel sales (Online, POS, Social, B2B), Shop Pay 1-click checkout conversion metrics, app store ecosystem, and merchant success stories.",
    trust_signals: [
      "Powers over 10% of total US ecommerce market share",
      "Over $1 Trillion in cumulative merchant sales processed",
      "Customer brands (Gymshark, Heinz, Staples, Glossier, SKIMS)",
      "Shop Pay converts 50% better than standard guest checkout"
    ],
    ux_writing_notes: "Empowering, entrepreneurial, scale-focused, and robust. Positions commerce as accessible to all.",
    friction_points: [
      "Third-party app subscriptions can increase total monthly software operating costs",
      "Transaction fees apply if not using native Shopify Payments",
      "Advanced theme customizations require Liquid template knowledge"
    ],
    design_opportunities: [
      "Include an interactive store profit & Shop Pay checkout conversion calculator",
      "Showcase 1-click AI product photography and copy generation tools",
      "Provide a visual store builder preview directly on the homepage"
    ],
    designer_summary: "Shopify is the powerhouse of modern commerce. Its clean green brand accents, clear free trial funnel, and focus on Shop Pay conversion make it the undisputed leader in ecommerce design.",
    specs: {
      primary_segment: "Ecommerce Founders, D2C Brands & Retail Merchants",
      monetization_model: "Monthly SaaS Subscription + Payment Processing Fees",
      conversion_path: "Email Input → 3-Day Free Trial ($1/mo promo)",
      design_signature: "Emerald Accent / Shop Pay Checkout Pill / Store Dashboards",
    },
    analyzed_at: "Aug 2026",
    is_live_demo: true,
  }
};

export const DEMO_URLS = Object.keys(LIVE_DEMO_DATASETS);
