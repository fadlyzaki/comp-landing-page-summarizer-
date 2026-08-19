#!/usr/bin/env python3
"""
Master 100-Benchmark Generator for Landing Page Summarizer.
Produces frontend/src/lib/liveDemos.ts with exactly 20 items per group (100 total).
"""

import json
import os
import sys

from make_complete_100_benchmarks import build_data
from append_all_categories import productivity_list

# Load the devtools
dev_tools_dict = build_data()
dev_tools_list = list(dev_tools_dict.values())

from ai_list import ai_list

# Define Fintech & B2B SaaS (20)
fintech_list = [
    ("https://ramp.com", "Ramp", "The corporate card and spend management platform designed to save time and money", "Fintech & Spend Management", "Fintech",
     "A finance automation platform that combines corporate credit cards, expense management, bill pay, and automated accounting sync to actively reduce company burn.",
     "CFOs, VP of Finance, startup founders, controllers, and corporate finance teams.",
     ["Primary: 'Get started' (Interactive company eligibility questionnaire)", "Secondary: 'Book a demo' (Enterprise finance team consultation)", "ROI Calculator: 'Calculate your savings' (Live savings estimator)"],
     "Hero highlighting clean corporate cards and instant accounting dashboard. Features real-time savings ticker, automated receipt matching demo, multi-entity support, and automated vendor price benchmarking.",
     ["Over 25,000 businesses using Ramp to save over $1 billion and 10 million hours", "Backed by leading investors (Founders Fund, Stripe, D1 Capital)", "SOC 1 & SOC 2 Type II certified, PCI-DSS Level 1 compliant"],
     "Clear, confident, and ROI-focused. Positions Ramp not just as a card, but as an active partner in financial discipline: 'Stop wasting money.'",
     ["Qualification requires healthy balance sheet and corporate entity (not for personal consumer use)", "Replacing existing legacy corporate credit cards requires multi-department coordination"],
     ["Include an interactive receipt matching demo on the hero where users drag an invoice to see auto-categorization", "Provide a live vendor pricing benchmark lookup tool"],
     "Ramp uses high-contrast forest green accents with sharp financial charts. It cuts through fintech fluff by demonstrating concrete, quantified dollar and hour savings right on the landing page.",
     {"primary_segment": "CFOs, Finance Teams & High-Growth Companies", "monetization_model": "Interchange Share + Ramp Plus SaaS Tier ($12/user/mo)", "conversion_path": "Online Corporate Application & Financial Verification", "design_signature": "Forest Green Accents, Data Tickers, Clean Accounting Grids"}),

    ("https://brex.com", "Brex", "Corporate cards and spend management for global enterprise", "Fintech & Global Corporate Treasury", "Fintech",
     "A corporate financial services platform providing high-limit credit cards, multi-currency corporate bank accounts, expense management, and travel booking for startups and global enterprises.",
     "Tech startups, scale-ups, global enterprises, finance directors, and distributed international teams.",
     ["Primary: 'Open an account' (Guided business signup)", "Secondary: 'Contact sales' (Global enterprise Treasury consultation)", "Travel: 'Explore Brex Travel' (Integrated corporate travel booking)"],
     "Hero showcasing sleek matte-black Brex corporate card with global spend analytics. Highlights 100+ country multi-currency support, AI expense reconciliation, built-in travel management, and venture debt access.",
     ["Trusted by over 1-in-3 US venture-backed startups (DoorDash, SeatGeek, Compass, Superhuman)", "Up to $6 million in FDIC insurance coverage through program bank networks", "SOC 1 & SOC 2 certified, enterprise SSO, and custom spend policy controls"],
     "Prestige-driven, sophisticated, and globally scalable. Focuses on speed of execution, global compliance, and premium financial confidence.",
     ["Transition away from SMB/micro-business market toward venture-backed and enterprise clients", "Global currency management requires international tax and entity documentation"],
     ["Add an interactive corporate travel booking simulator directly in the hero showing policy enforcement", "Provide a live FDIC multi-bank sweep coverage visualizer"],
     "Brex radiates premium global prestige. Its sleek dark cards, sharp typography, and subtle bronze highlights position it as the definitive financial operating system for ambitious modern corporations.",
     {"primary_segment": "Venture-Backed Startups, Scale-ups & Global Enterprises", "monetization_model": "Interchange Share + Brex Premium Software Subscriptions", "conversion_path": "Self-Serve Business Verification & Enterprise Sales", "design_signature": "Matte Black Cards, Bronze Accents, Global Treasury Map"}),

    ("https://mercury.com", "Mercury", "Banking for startups and ambitious companies", "Fintech & Startup Commercial Banking", "Fintech",
     "A modern commercial banking platform and financial stack engineered specifically for startups, providing checking, savings, venture debt, treasury management, and investor networks.",
     "Startup founders, tech entrepreneurs, venture-backed companies, and international entities incorporating in the US.",
     ["Primary: 'Open Account' (10-minute online application)", "Secondary: 'Explore Treasury' (Automated yield optimization)", "Community: 'Mercury Raise' (Founder-investor matchmaking)"],
     "Elegant hero featuring minimalist web dashboard and dark titanium debit cards. Explains multi-million FDIC insurance through partner bank networks, automated Treasury yield management, API banking access, and Mercury Raise founder programs.",
     ["Banking partner to over 100,000 startups and tech companies", "Up to $5 million FDIC insurance through sweep network banks", "Banking services provided by Choice Financial Group and Column N.A., Members FDIC"],
     "Refined, intellectual, and founder-empathetic. Treats startup banking as a craft designed to give founders peace of mind.",
     ["Requires valid corporate entity documentation and compliance checks during onboarding", "Regulatory compliance requirements for non-US international founders"],
     ["Include an interactive Treasury yield calculator on the homepage estimating annual interest earned on idle capital", "Provide an instant API banking snippet sandbox"],
     "Mercury set the standard for modern fintech minimalism. Its calm slate surfaces, refined serif typography, and elegant titanium card mockups make business banking feel serene and intellectually dignified.",
     {"primary_segment": "Tech Startups, Founders & Modern Businesses", "monetization_model": "Net Interest Margin (Treasury Yield) + FX Fees", "conversion_path": "10-Minute Online Business Application", "design_signature": "Serene Slate, Titanium Card Renders, Refined Typography"}),

    ("https://plaid.com", "Plaid", "The safest, easiest way to connect financial accounts", "Open Banking & Financial APIs", "Fintech",
     "A financial data network and API infrastructure that lets consumer fintech applications seamlessly and securely connect with users' bank accounts for authentication, balances, identity, and payment processing.",
     "Fintech developers, product managers, banking institutions, and lending platforms.",
     ["Primary: 'Get API keys' (Instant developer sandbox access)", "Secondary: 'Contact sales' (High-volume enterprise path)", "Developer: 'Explore Docs' (Copyable Link SDK snippets)"],
     "High-end geometric hero featuring interactive Plaid Link authentication sheet. Showcases 12,000+ connected financial institutions, instant account verification, balance checks, fraud prevention (Signal), and automated credit underwriting data.",
     ["Connects to over 12,000 financial institutions across North America and Europe", "Powers leading financial apps: Venmo, Robinhood, Chime, SoFi, Betterment", "Bank-level encryption (AES-256), SOC 2 Type II, and ISO 27001 compliance"],
     "Architectural, trust-centric, and developer-friendly. Emphasizes rock-solid security, data privacy, and 99.99% uptime.",
     ["Consumer bank credential authentication flows occasionally encounter bank-side multifactor timeouts", "Pricing transitions from free developer sandbox to per-API-call tiered production fees"],
     ["Add an interactive Plaid Link simulator directly in the hero where visitors can click 'Connect Bank' and experience the 3-step auth flow", "Include a real-time bank coverage lookup tool"],
     "Plaid's website is a masterclass in fintech API branding. Its bold geometric grid lines, clean monochrome palettes, and interactive Plaid Link modal demos make complex financial interoperability look crisp and trustworthy.",
     {"primary_segment": "Fintech Developers, Digital Banks & Lending Platforms", "monetization_model": "Per-API Request / Per-Connected-Account Volume Pricing", "conversion_path": "Instant Developer Sandbox API Key Creation", "design_signature": "Geometric Grid Lines, Plaid Link Modal Mockups, Bank Logo Matrix"}),

    ("https://deel.com", "Deel", "The all-in-one global people platform", "Global Payroll & International HR Compliance", "Fintech",
     "A global payroll and HR compliance platform that enables companies to hire, onboard, manage, and pay international contractors and full-time employees in 150+ countries with local legal compliance.",
     "People ops directors, international hiring managers, startup founders, and global enterprise HR leaders.",
     ["Primary: 'Book a demo' (Guided global hiring consultation)", "Secondary: 'Get started' (Instant contractor onboarding)", "Tools: 'Explore Salary Insights' (Global compensation benchmarks)"],
     "Vibrant hero featuring an interactive world map showing country-specific employment contracts. Highlights Employer of Record (EOR) services, contractor payments in 120+ currencies, visa immigration assistance, and global equipment shipping.",
     ["Over 35,000 customers worldwide (Nike, Subway, Klarna, Revolut, Shopify)", "Owned legal entities in 100+ countries ensuring zero co-employment risk", "SOC 2 Type II, GDPR, and country-specific labor law certification"],
     "Global, confident, and liberating. Focuses on unlocking worldwide talent: 'Hire anyone, anywhere, in minutes.'",
     ["International Employer of Record (EOR) monthly fees ($599/employee/mo) require clear budget planning compared to simple contractor payouts", "Complex local labor law variations require coordination with dedicated account managers"],
     ["Include an interactive global salary and tax estimator directly on the homepage where users pick a country and role", "Provide a contract generator preview"],
     "Deel brings an energetic, globe-trotting aesthetic to HR tech. Its bright cobalt blue accents, interactive country rate cards, and bold global compliance visualizations make international expansion feel effortless.",
     {"primary_segment": "Global HR Directors, People Ops & Distributed Companies", "monetization_model": "Per-Contractor ($49/mo) & Per-Employee EOR ($599/mo) Fees", "conversion_path": "Interactive Country Selection & Guided Demo", "design_signature": "Cobalt Blue, Global Vector Maps, Country Flag Chips"}),

    ("https://gusto.com", "Gusto", "People platform for payroll, benefits, and HR", "Small Business Payroll & Employee Benefits", "Fintech",
     "A modern cloud payroll, benefits administration, and human resources platform built specifically to make managing team compensation, health insurance, and 401(k) simple for small businesses.",
     "Small business owners, startup founders, HR administrators, and corporate accountants.",
     ["Primary: 'Get started' (Interactive pricing and setup quiz)", "Secondary: 'Take a product tour' (Self-guided video demo)", "Accountants: 'Gusto for Partners' (Accountant portal)"],
     "Warm, friendly hero with cheerful small business photography and automated payroll dashboard. Highlights automated tax filings, employee self-onboarding, health insurance administration, workers' comp, and 401(k) retirement plans.",
     ["Serves over 300,000 small and mid-sized businesses across all 50 US states", "Automated federal, state, and local payroll tax calculations and filings", "Built-in integration with QuickBooks, Xero, FreshBooks, and modern accounting tools"],
     "Empathetic, reassuring, and human. Transforms intimidating payroll tax filings into a friendly, supportive experience.",
     ["Primarily focused on US domestic payroll (international contractor payments available in select countries)", "Benefits administration options vary depending on state regulatory requirements"],
     ["Add an interactive payroll tax savings calculator on the hero estimating time saved on tax filings", "Provide an interactive benefits builder for small teams"],
     "Gusto's design identity is built on warmth, friendly illustrations, and cheerful coral-green palettes. It dispels the stress of payroll and tax compliance, making small business operations feel supportive and celebratory.",
     {"primary_segment": "Small Business Owners, Startup Founders & Accountants", "monetization_model": "Base Monthly Fee ($40/mo) + Per-Employee Monthly Fee ($6/mo)", "conversion_path": "Interactive Plan Selection & Self-Serve Setup", "design_signature": "Warm Coral/Mint Palette, Friendly Avatars, Payroll Check Visuals"}),

    ("https://intercom.com", "Intercom", "The AI customer service platform", "Customer Support & Conversational AI", "Fintech",
     "An AI-first customer service platform featuring the Fin AI Copilot and Help Desk, resolving over 50% of customer support queries instantly across chat, email, and social channels.",
     "Customer support directors, VP of Customer Experience, SaaS product managers, and growth teams.",
     ["Primary: 'Start free trial' (14-day full access trial)", "Secondary: 'View demo' (Interactive Fin AI conversation demo)", "Pricing: 'See pricing' (Transparent resolution pricing)"],
     "Clean, modern hero featuring live interactive Fin AI chat widget resolving a real billing query. Showcases Fin AI Agent, unified multi-channel Help Desk, proactive customer onboarding tours, and detailed CSAT analytics.",
     ["Powers customer support for over 25,000 businesses (Atlassian, Amazon, Notion, Unity, Meta)", "Fin AI resolves over 50% of incoming tickets with zero human intervention", "Enterprise-grade SOC 2 Type II, HIPAA, and ISO 27001 certifications"],
     "Conversational, innovative, and results-driven. Emphasizes AI resolution accuracy and exceptional customer satisfaction: 'The only AI customer service solution you need.'",
     ["Usage-based billing per Fin AI resolution ($0.99/resolution) requires monitoring high-volume support ticket spikes", "Extensive product suite requires configuring routing rules for optimal agent handoff"],
     ["Include a live Fin AI test sandbox on the hero where visitors can ask complex support questions and see source verification", "Provide an ROI calculator showing cost per resolution reduction"],
     "Intercom's website is a masterclass in conversational design. With its iconic blue chat widget, animated support queues, and clean resolution metrics, it demonstrates the future of AI-powered customer care.",
     {"primary_segment": "Customer Success Leaders, Support Teams & SaaS Companies", "monetization_model": "Per-Seat Subscription + $0.99 per Fin AI Resolution", "conversion_path": "14-Day Free Trial & Guided Product Onboarding", "design_signature": "Intercom Blue, Conversational Chat Bubbles, Fin AI Sparkles"}),

    ("https://webflow.com", "Webflow", "Build custom websites visually with code-level control", "Visual Web Development & Enterprise CMS", "Fintech",
     "A visual web development platform that empowers designers and marketing teams to build clean, semantic, responsive HTML, CSS, and JavaScript websites without writing code manually.",
     "Web designers, marketing agencies, enterprise growth teams, and visual developers.",
     ["Primary: 'Get started — it's free' (In-browser Designer canvas launch)", "Secondary: 'Webflow for Enterprise' (Enterprise security path)", "Showcase: 'Made in Webflow' (Community website directory)"],
     "Hero featuring the Webflow Designer interface manipulating real HTML DOM elements. Highlights Visual CSS Styling, Webflow CMS, Complex Interactions & Lottie animations, Localization, and Enterprise Edge Hosting.",
     ["Powers websites for over 3.5 million designers and global enterprises (Dell, Zendesk, Discord, Vice)", "Generates clean, semantic W3C-compliant HTML/CSS under the hood", "Global AWS edge hosting infrastructure with 99.99% historical uptime and SOC 2 Type II compliance"],
     "Empowering, visual, and code-accurate. Respects CSS box model principles: 'The power of code, visually.'",
     ["Steeper learning curve for pure graphic designers unaccustomed to HTML layout hierarchy and CSS display properties", "Complex multi-user real-time branching workflows require enterprise workspace tiers"],
     ["Add an interactive visual style panel on the hero where visitors can tweak padding, flexbox, and typography live", "Provide a Figma-to-Webflow migration preview"],
     "Webflow's landing page is an engineering and design tour de force. By putting the full visual IDE front and center, it proves to professional designers that visual web building does not require compromising on clean code standards.",
     {"primary_segment": "Web Designers, Creative Agencies, Growth Marketers & Enterprises", "monetization_model": "Freemium + Workspace Seat + Per-Site Hosting Subscription", "conversion_path": "Self-Serve In-Browser Designer Account Creation", "design_signature": "Webflow Blue, Visual CSS Box Model Panels, Live DOM Tree"}),

    ("https://squareup.com", "Square", "Powering businesses of every size to sell anywhere", "POS Hardware & Commerce Ecosystem", "Fintech",
     "An integrated commerce and financial platform providing point-of-sale (POS) hardware, mobile payment processing, inventory management, business banking, and payroll for retail and restaurants.",
     "Small business owners, retail merchants, restaurant operators, and omnichannel sellers.",
     ["Primary: 'Get Started' (Hardware store and account signup)", "Secondary: 'Square for Restaurants / Retail' (Specialized industry solutions)", "Pricing: 'View transparent transaction pricing' (Flat rate processing)"],
     "Vibrant hero featuring sleek Square Terminal and Register hardware on a modern boutique retail counter. Highlights POS Software, In-person contactless payments, Online Store checkout, Inventory sync, and Square Banking debit cards.",
     ["Processes over $200 billion in gross payment volume annually for millions of merchants", "Pioneered mobile card acceptance with the iconic white square reader", "Hardware designed in-house with end-to-end payment encryption (PCI-DSS Level 1)"],
     "Pragmatic, empowering, and commerce-fluent. Celebrates independent entrepreneurs and frictionless checkout.",
     ["Flat-rate processing fees (2.6% + 10¢) may be slightly higher than interchange-plus for massive enterprise volume", "Hardware acquisition cost for multi-terminal retail setups"],
     ["Add an interactive POS simulator on the hero showing instant order entry and contactless card tap", "Provide an industry-specific hardware and software bundle builder"],
     "Square's design identity is built on industrial elegance and clean, aspirational retail photography. Its minimalist white hardware and bold typography communicate approachable, reliable commercial power.",
     {"primary_segment": "Retailers, Restaurants, Service Businesses & Merchants", "monetization_model": "Payment Processing Fees (2.6% + 10¢) + POS Hardware Sales + SaaS", "conversion_path": "Instant Online Business Profile & Hardware Order", "design_signature": "Industrial Hardware Renders, Boutique Photography, Bold Black/White"}),

    ("https://rippling.com", "Rippling", "Manage HR, IT, and Finance in one unified system", "Unified Workforce Platform & HR/IT Management", "Fintech",
     "A unified workforce management platform that connects company employee data across HR (payroll, benefits), IT (laptop provisioning, app access), and Finance (spend, corporate cards) automatically.",
     "VP of HR, Chief Information Officers (CIOs), Finance Directors, and fast-scaling enterprise operations.",
     ["Primary: 'See a demo' (Guided platform consultation)", "Secondary: 'Explore Products' (HR Cloud, IT Cloud, Finance Cloud)", "App: 'Explore 500+ App Integrations' (Automated employee provisioning)"],
     "High-density enterprise hero featuring employee profile triggering simultaneous updates to payroll, Slack access, and laptop shipments. Highlights Employee Graph data engine, automated onboarding/offboarding workflows, and global compliance.",
     ["Fastest growing workforce management platform valued at over $13 billion", "Automates over 100 manual HR and IT onboarding steps with 90-second new hire setup", "SOC 1, SOC 2 Type II, ISO 27001, and global GDPR compliance"],
     "Authoritative, architectural, and efficiency-obsessed. Highlights the power of unifying fragmented point solutions into a single source of employee truth.",
     ["Broad multi-product deployment requires executive alignment across HR, IT, and Finance stakeholders", "Transitioning away from established legacy payroll systems involves formal data migration"],
     ["Include an interactive 90-second onboarding simulator on the hero showing simultaneous payroll, Slack, and GitHub provisioning", "Provide a tool consolidation cost savings calculator"],
     "Rippling uses a striking amber and deep slate aesthetic with rich workflow diagramming. The landing page compellingly demonstrates that managing people, devices, and company funds should be driven by a single unified employee database.",
     {"primary_segment": "Enterprise HR Directors, CIOs & Finance Executives", "monetization_model": "Base Platform Fee + Modular Per-Employee Monthly Subscription", "conversion_path": "Interactive Product Tour & Enterprise Demo Booking", "design_signature": "Rippling Amber/Gold, Employee Graph Flows, Multi-Cloud Badges"}),

    ("https://carta.com", "Carta", "Equity management and cap table software for modern companies", "Fintech & Cap Table Management", "Fintech",
     "A specialized equity management, 409A valuation, and private market liquidity platform that helps startups and investors manage cap tables, issue options, and track venture investments.",
     "Startup founders, venture capital funds, corporate legal teams, and employees managing equity options.",
     ["Primary: 'Get started' (Interactive startup cap table setup)", "Secondary: 'Request a demo' (Enterprise equity management)", "Valuations: 'Get a 409A Valuation' (Fast compliance valuation)"],
     "Sophisticated hero featuring real-time equity ownership pie charts and cap table spreadsheet models. Highlights digital stock option grants, 409A audit-ready valuations, Fund Administration for VCs, and Total Compensation benchmarking.",
     ["Manages over $2.5 trillion in private equity across 40,000+ companies and 2 million shareholders", "The undisputed standard for startup cap table governance and 409A valuations", "Strict financial security, SOC 2 Type II certified, and SEC registered transfer agent"],
     "Trustworthy, financially precise, and executive-level. Focuses on transparency, compliance, and empowering ownership.",
     ["Pricing tiers scale with the total number of stakeholders on the cap table", "Cap table transitions require importing legal documentation and board consents"],
     ["Add an interactive stock option equity calculator on the hero showing potential value scenarios", "Provide an instant 409A valuation checklist tool"],
     "Carta's design identity radiates institutional financial credibility. With deep navy tones, precise mathematical graphs, and clean cap table tables, it makes equity ownership transparent and accessible.",
     {"primary_segment": "Startup Founders, CFOs, Venture Capitalists & Legal Teams", "monetization_model": "Tiered Annual Subscription (Based on Stakeholder Count) + 409A Fees", "conversion_path": "Self-Serve Cap Table Setup & Enterprise Demo", "design_signature": "Carta Navy Blue, Cap Table Data Grids, Ownership Pie Charts"}),

    ("https://hubspot.com", "HubSpot", "CRM platform for marketing, sales, and customer service", "Inbound Marketing & Customer Platform", "Fintech",
     "An integrated CRM customer platform featuring connected hubs for Marketing, Sales, Customer Service, Content Management, and Operations powered by unified customer data and AI.",
     "Marketing directors, sales teams, business development managers, and scaling mid-market enterprises.",
     ["Primary: 'Get started free' (Free CRM account creation)", "Secondary: 'Get a demo' (Enterprise customer platform demo)", "Pricing: 'See pricing' (Modular Hub pricing)"],
     "Warm, approachable hero with signature HubSpot orange accents and unified contact record timeline. Highlights Inbound Marketing campaigns, Sales pipeline automation, Service Desk ticketing, and Breeze AI copilots.",
     ["Over 216,000 customers in more than 135 countries (DoorDash, Reddit, Eventbrite, WWF)", "Pioneered the inbound marketing movement with world-renowned educational academy", "SOC 2 Type II, ISO 27001, and HIPAA compliance across multi-tenant cloud infrastructure"],
     "Educative, supportive, and growth-oriented. Focuses on helping businesses 'grow better' through inbound customer trust.",
     ["Steep price jump from starter bundles to professional/enterprise hub tiers as contact database scales", "Extensive feature breadth requires marketing automation governance to prevent dirty data"],
     ["Add an interactive contact timeline simulator on the hero demonstrating how an ad click turns into a sales deal", "Provide a marketing ROI and contact tier estimator"],
     "HubSpot's landing page is an enduring benchmark of warm inbound marketing design. Its iconic sprocket orange, friendly illustrations, and clear modular hub selectors make complex enterprise CRM feel approachable and empowering.",
     {"primary_segment": "Marketing Directors, Sales Leads & Scaling Businesses", "monetization_model": "Freemium Core CRM + Tiered Per-Hub Subscriptions (Starter/Pro/Enterprise)", "conversion_path": "Free CRM Account Creation (No Credit Card Required)", "design_signature": "HubSpot Sprocket Orange, Contact Activity Timelines, Modular Hub Badges"}),

    ("https://zendesk.com", "Zendesk", "Champions of customer service", "Customer Support & Helpdesk Software", "Fintech",
     "An enterprise customer service and ticketing platform that connects customer conversations across email, voice, chat, and social messaging with AI-driven routing and workforce management.",
     "Customer support directors, VP of Customer Experience, IT service desks, and enterprise call centers.",
     ["Primary: 'Start free trial' (14-day full access)", "Secondary: 'View demo' (Interactive ticketing workflow)", "AI: 'Explore Zendesk AI' (Intelligent routing and triage)"],
     "Clean, geometric hero featuring modern support ticket interface and customer satisfaction scores. Highlights omnichannel ticket routing, Zendesk AI automated triage, knowledge base management, and workforce analytics.",
     ["Over 100,000 customer accounts across 160 countries (Uber, Airbnb, Mailchimp, Siemens, Tesco)", "Recognized as a leading enterprise customer service solution by Gartner and Forrester", "Enterprise security: SOC 2 Type II, ISO 27001, HIPAA, and FedRAMP compliance"],
     "Empathetic, structured, and enterprise-reliable. Focuses on building long-term customer loyalty and agent efficiency.",
     ["Complex administrative rule building (triggers, macros, views) requires dedicated helpdesk administrator", "Per-agent monthly pricing can represent significant expense for large customer support centers"],
     ["Include an interactive ticket resolution simulator on the hero showing Zendesk AI suggesting macro responses", "Provide a customer support benchmark calculator comparing industry response times"],
     "Zendesk uses cheerful geometric shapes and clean, spacious typography. Its landing page conveys dependable enterprise customer service infrastructure while retaining a human, empathetic touch.",
     {"primary_segment": "Customer Service Directors, Enterprise Helpdesks & CX Teams", "monetization_model": "Per-Agent Monthly Subscription (Suite Team/Growth/Professional/Enterprise)", "conversion_path": "14-Day Free Trial & Guided Customer Success Consultation", "design_signature": "Geometric Woodblock Shapes, Clean Ticket Rows, CSAT Indicators"}),

    ("https://salesforce.com", "Salesforce", "The world's #1 AI CRM", "Enterprise CRM & Cloud Applications", "Fintech",
     "The global enterprise CRM leader that connects sales, service, marketing, commerce, and IT through Customer 360, Data Cloud, and autonomous AI agents (Agentforce).",
     "Enterprise CIOs, VP of Sales, corporate transformation executives, and global enterprise operations.",
     ["Primary: 'Start free trial' (30-day CRM trial)", "Secondary: 'Watch demos' (Agentforce AI in action)", "Community: 'Join Trailblazer Community' (Millions of certified admins)"],
     "Iconic enterprise hero featuring Astro mascot and Agentforce autonomous AI agents dashboard. Highlights Customer 360 unified data, Sales Cloud pipeline management, Service Cloud, and Data Cloud real-time integration.",
     ["Over 150,000 enterprise customers worldwide including over 90% of the Fortune 500", "Massive global ecosystem with millions of Trailblazer developers, admins, and consultants", "Global multi-region infrastructure with highest level of government and financial security certifications"],
     "Visionary, enterprise-monumental, and transformative. Emphasizes digital transformation and human-agent hybrid work.",
     ["Massive platform complexity requires certified administrators and systems integrators to customize and maintain", "Enterprise licensing costs and annual multi-year contract structures"],
     ["Add an interactive Agentforce simulation on the hero where visitors can watch an autonomous AI agent resolve a sales lead inquiry", "Provide an enterprise ROI transformation calculator"],
     "Salesforce's landing page is an enterprise powerhouse. Its cheerful Trailblazer forest characters ground an immense multi-billion dollar enterprise cloud platform, projecting warmth alongside massive corporate capability.",
     {"primary_segment": "Enterprise Executives, VP of Sales, CIOs & Operations Directors", "monetization_model": "Per-User Annual Enterprise License Tiers + Usage-Based Data Cloud", "conversion_path": "30-Day Guided Trial & Enterprise Account Executive Consultation", "design_signature": "Salesforce Cloud Blue, Astro Character Motifs, Customer 360 Badges"}),

    ("https://attio.com", "Attio", "The next-generation CRM built for modern tech companies", "Modern CRM & Data Engine", "Fintech",
     "A modern, highly customizable CRM built from the ground up on an ultra-fast relational data engine, with automatic email/calendar sync and developer-grade data modeling.",
     "Fast-moving startups, venture capital firms, developer-first businesses, and modern revenue operations teams.",
     ["Primary: 'Start for free' (Instant workspace creation with Google/Microsoft auth)", "Secondary: 'Book a demo' (Enterprise sales engineering path)", "Community: 'Explore Templates' (Sales, VC, and recruiting CRM templates)"],
     "Hero featuring a hyper-fluid dark-mode CRM table with instantaneous cell filtering and nested relationship badges. Highlights real-time team collaboration, automated email sync without logging, powerful formula fields, and developer REST APIs.",
     ["Fastest growing modern CRM backed by prominent investors and adopted by high-growth startups (OpenAI, Modal, ElevenLabs, Replicate)", "Sub-100ms database response times with full relational modeling capabilities", "SOC 2 Type II certified and enterprise workspace data privacy"],
     "Sharp, modern, and craft-obsessed. Positions itself against clunky legacy CRMs: 'The CRM you actually want to use.'",
     ["Best suited for tech-forward companies comfortable with modern relational database concepts", "Legacy enterprise integrations (custom SAP/Oracle connectors) require developer API implementation"],
     ["Include an interactive in-browser CRM table on the hero where visitors can click, sort, and add custom fields in real time", "Provide an instant 1-click HubSpot/Salesforce data importer preview"],
     "Attio represents the modern renaissance of CRM aesthetics. Its dark cosmic palette, fluid 60fps data grid interactions, and crisp monospace details make managing customer relationships feel like using a high-end developer IDE.",
     {"primary_segment": "Tech Startups, RevOps Teams, Founders & VC Firms", "monetization_model": "Freemium + Per-Seat Monthly Subscription (Plus/Pro/Enterprise)", "conversion_path": "Instant 1-Click Google / Microsoft Workspace Sync", "design_signature": "Cosmic Dark Surfaces, Fluid 60fps Data Grids, Relationship Badges"}),

    ("https://retool.com", "Retool", "The fast way to build internal tools", "Low-Code Internal Tools & Custom Software", "Fintech",
     "A low-code development platform that enables software engineers to build custom internal tools, admin panels, dashboards, and database CRUD applications in minutes using drag-and-drop React components and raw SQL/JavaScript.",
     "Software engineers, technical product managers, operations teams, and engineering leadership.",
     ["Primary: 'Start for free' (In-browser internal tool canvas)", "Secondary: 'Book a demo' (Enterprise self-hosted deployment)", "Templates: 'Explore 100+ Templates' (Customer support, admin panels, KYC tools)"],
     "Hero with split-screen visual IDE showing a drag-and-drop table component connected to a PostgreSQL query in real time. Highlights 100+ pre-built UI components, direct database/API connectors, granular access controls, and Retool Mobile.",
     ["Used by thousands of engineering-led companies (DoorDash, Brex, Stripe, Amazon, Pinterest)", "Reduces internal tool development time by up to 80%", "Self-hosted On-Premises or Cloud deployment with SOC 2 Type II compliance and SSO"],
     "Developer-authentic, pragmatic, and velocity-focused. Focuses on saving valuable engineering sprint cycles.",
     ["Requires basic SQL and JavaScript knowledge (not a no-code tool for non-technical users)", "Self-hosted deployment requires basic Docker / Kubernetes maintenance"],
     ["Add an interactive in-browser component canvas in the hero where visitors can drag a button and run a sample SQL query live", "Provide an engineering time savings ROI calculator"],
     "Retool's landing page speaks directly to software engineers. With its authentic IDE interface previews, raw SQL code blocks, and crisp dark accents, it proves that building internal admin panels no longer needs to be a chore.",
     {"primary_segment": "Software Engineers, Technical PMs & Internal Operations", "monetization_model": "Freemium + Per-Standard/Enterprise-User Tiered Subscription", "conversion_path": "Self-Serve Instant In-Browser Canvas Launch", "design_signature": "Retool Yellow/Dark Slate, Drag-and-Drop Component Handles, SQL Blocks"}),

    ("https://zapier.com", "Zapier", "Automate workflows across 6,000+ apps", "Workflow Automation & No-Code Integration", "Fintech",
     "The leading workflow automation platform that connects more than 6,000 business web applications to automate repetitive tasks and data synchronization without writing code.",
     "Operations managers, marketers, small business owners, startup operators, and growth hackers.",
     ["Primary: 'Start free with email' (Instant workflow builder)", "Secondary: 'Explore 6,000+ Apps' (App integration directory)", "AI hook: 'Zapier Central' (AI agents that take action)"],
     "Hero featuring animated visual flowcharts connecting Gmail, Slack, HubSpot, and Google Sheets. Highlights multi-step Zaps, Conditional logic, Webhooks, Tables database, Interfaces, and AI automation agents.",
     ["Over 2.2 million businesses and individuals automating billions of tasks annually", "Massive directory of over 6,000 verified app integrations", "Enterprise-grade SOC 2 Type II, SOC 3, and GDPR compliance"],
     "Empowering, cheerful, and efficiency-driven. Focuses on reclaiming time from boring repetitive busywork.",
     ["High task-execution volume pricing tiers can scale quickly for heavy data polling workflows", "Complex logic branching with dozens of conditions can become difficult to debug without error alerts"],
     ["Include an interactive Zap builder on the hero where visitors choose 2 apps to see an instant workflow preview", "Provide a task-volume cost calculator"],
     "Zapier's signature orange radiates energy and productivity. Its animated workflow diagrams with connecting arrows make complex multi-app data routing look simple, intuitive, and fun.",
     {"primary_segment": "Business Operators, Marketers, Founders & No-Code Builders", "monetization_model": "Freemium + Usage-Based Monthly Task Tiers (Starter/Pro/Team/Company)", "conversion_path": "1-Click Social / Email Account Creation", "design_signature": "Zapier Vibrant Orange, Connected App Node Flows, App Logo Grids"}),

    ("https://make.com", "Make", "Visual platform for designing and automating workflows", "Visual Workflow Automation & iPaaS", "Fintech",
     "A visual integration and automation platform that lets users design, build, and automate complex multi-step workflows with an interactive, infinite node-canvas interface.",
     "Technical business analysts, automation specialists, developers, and operations teams.",
     ["Primary: 'Get started free' (Visual canvas builder launch)", "Secondary: 'Explore Templates' (Pre-built scenario library)", "Enterprise: 'Enterprise Solutions' (Enterprise governance)"],
     "Hero with stunning interactive visual canvas showing colorful connected circular app nodes with data packets pulsing along wires. Highlights visual branch routers, data manipulation functions, error handling, and webhooks.",
     ["Over 500,000 organizations worldwide automating complex multi-system operations", "Over 1,500 turnkey app integrations with custom REST/GraphQL API connector support", "SOC 2 Type II, ISO 27001, and GDPR certified enterprise security"],
     "Creative, visual, and limitless. Focuses on unlocking creative problem solving: 'Design without limits.'",
     ["Steeper initial learning curve for understanding visual data structure mappings and iterator modules", "Execution operations limits on lower tiers require efficient scenario optimization"],
     ["Add an interactive node-canvas sandbox in the hero where visitors can drag circular app bubbles and connect them with wires", "Provide a visual comparison matrix between Make and Zapier"],
     "Make's landing page is visually captivating. Its glowing purple and neon circular nodes, smooth bezier connection lines, and animated data packet pulses make backend data automation feel like playing with creative circuitry.",
     {"primary_segment": "Automation Specialists, Tech Operators & Business Analysts", "monetization_model": "Freemium + Usage-Based Operation Packs (Core/Pro/Teams/Enterprise)", "conversion_path": "Instant Self-Serve Visual Scenario Builder Launch", "design_signature": "Pulsing Node Circles, Bezier Wire Connections, Deep Purple Canvas"}),

    ("https://segment.com", "Segment (Twilio)", "The leading customer data platform (CDP)", "Customer Data Platform & Event Tracking", "Fintech",
     "A Customer Data Platform (CDP) that collects, cleans, and routes real-time user event data from websites and mobile apps to hundreds of marketing, analytics, and data warehouse destinations.",
     "Data engineers, growth marketing directors, product analytics leads, and enterprise digital architects.",
     ["Primary: 'Get started free' (Developer event tracking setup)", "Secondary: 'Request a demo' (Enterprise CDP consultation)", "Catalog: 'Explore 400+ Destinations' (Google Analytics, Mixpanel, Snowflake, Braze)"],
     "Hero featuring dynamic real-time event pipeline animation sending customer events to multiple destinations simultaneously. Highlights Connections (event pipelines), Protocols (data governance & schema enforcement), and Unify (identity resolution).",
     ["Processes over 1 trillion events monthly for thousands of digital companies (IBM, Intuit, FOX, Docker)", "Single API standard for event tracking (`analytics.track`) across web and mobile", "SOC 2 Type II, HIPAA, ISO 27001, and GDPR compliance with enterprise privacy governance"],
     "Architectural, data-driven, and authoritative. Focuses on creating a single, reliable source of customer data truth.",
     ["Monthly Tracked User (MTU) billing model requires tracking active customer counts to manage costs", "Implementation requires planning tracking plans and schema naming conventions"],
     ["Include an interactive event debugger simulator on the hero showing a live `analytics.track('Order Completed')` call routing to 5 destinations", "Provide a destination compatibility explorer"],
     "Segment uses clean architectural line diagrams, deep emerald greens, and high-precision data flows. It communicates enterprise-grade data hygiene and reliable multi-destination event routing with clinical elegance.",
     {"primary_segment": "Data Engineers, Growth Marketers, Analytics Leads & Enterprises", "monetization_model": "Freemium + Monthly Tracked Users (MTU) Tiered Bundles", "conversion_path": "1-Click Developer Account & Javascript Snippet Install", "design_signature": "Segment Emerald Green, Data Flow Pipelines, Destination Logo Hubs"}),

    ("https://paddle.com", "Paddle", "The complete payment infrastructure for SaaS", "Merchant of Record & Global SaaS Billing", "Fintech",
     "A Merchant of Record (MoR) and billing platform engineered specifically for software and SaaS companies, handling global payments, localized sales taxes (VAT/GST), fraud, and subscription management automatically.",
     "SaaS founders, indie software creators, CFOs, and international software companies.",
     ["Primary: 'Get started' (Instant SaaS onboarding)", "Secondary: 'Talk to sales' (Enterprise volume pricing)", "Pricing: 'View transparent pricing' (All-in-one MoR fee)"],
     "Clean, modern hero featuring global checkout overlay with automatic local tax calculation. Highlights Merchant of Record tax liability assumption, subscription billing engine, fraud prevention, and Retain churn reduction tooling.",
     ["Powers over 4,000 software and SaaS businesses in more than 200 markets globally", "Acts as Merchant of Record, legally assuming global sales tax and VAT filing obligations", "Unified checkout supporting credit cards, PayPal, Apple Pay, Google Pay, and local wire transfers"],
     "Empowering, compliance-liberating, and direct. Focuses on taking away the nightmare of global tax compliance: 'Sell globally with zero tax headache.'",
     ["Slightly higher headline percentage fee (5% + 50¢) compared to raw payment gateways (because Paddle acts as Merchant of Record and pays taxes)", "Merchant of Record model requires accepting Paddle's software terms of service"],
     ["Add an interactive global tax liability calculator on the hero showing how many countries' sales taxes Paddle files on your behalf", "Provide an instant checkout preview in 20 currencies"],
     "Paddle's design identity uses crisp geometric typography and bright blue accents. It communicates operational peace of mind by showing that global SaaS sales taxes and multi-currency billing can be handled in a single unified stroke.",
     {"primary_segment": "SaaS Founders, Software Companies & Indie Developers", "monetization_model": "All-in-One Merchant of Record Percentage Fee (5% + 50¢ per transaction)", "conversion_path": "Self-Serve Developer Sandbox & Live Account Review", "design_signature": "Paddle Electric Blue, Multi-Currency Checkout Previews, Global Tax Badges"})
]

# Define Consumer Tech, Commerce & Media (20)
consumer_list = [
    ("https://airbnb.com", "Airbnb", "Find somewhere to stay and things to do", "Travel Marketplace & Hospitality", "Consumer",
     "The global travel marketplace that connects millions of travelers with unique vacation homes, boutique stays, and local experiences hosted by real people around the world.",
     "Global travelers, remote workers taking 'workcations', vacationers, and property hosts.",
     ["Primary: 'Search' (Instant destination, date, and guest picker)", "Secondary: 'Airbnb your home' (Host earnings calculator and onboarding)", "Explore: 'Icons & Categories' (Unique categories: Cabins, Mansions, Beachfront)"],
     "Iconic consumer hero featuring the famous floating search capsule and dynamic category icons. Displays high-resolution photography grids of unique homes, transparent pricing toggles, Host Earnings estimator, and guest reviews.",
     ["Over 1.5 billion guest arrivals across 220+ countries and regions worldwide", "AirCover guest and host protection with $3 million damage coverage", "Trusted community verified identities and reviews on every listing"],
     "Warm, adventurous, and hospitality-centered. Celebrates human connection and the joy of belonging anywhere: 'Belong anywhere.'",
     ["Service fees and cleaning fees displayed at checkout (now improved with upfront total price display toggle)", "Guest cancellation policies vary by individual host listing"],
     ["Add an interactive category carousel in the hero with real-time home previews (Cabins, Lakefront, Treehouses)", "Include an interactive Host Earnings estimator based on neighborhood and room count"],
     "Airbnb's landing page is the gold standard of consumer marketplace design. Its signature Rausch red accents, generous white space, and breathtaking full-bleed photography evoke instant wanderlust and warm domestic hospitality.",
     {"primary_segment": "Global Travelers, Vacationers, Remote Workers & Property Hosts", "monetization_model": "Marketplace Commission (Guest Service Fee ~14% + Host Fee ~3%)", "conversion_path": "Instant Search Bar Query Execution", "design_signature": "Rausch Red (#FF385C), Floating Search Capsule, Category Icons"}),

    ("https://spotify.com", "Spotify", "Listening is everything", "Audio Streaming & Music Discovery", "Consumer",
     "The world's most popular audio streaming subscription service, offering access to over 100 million music tracks, podcasts, and audiobooks with hyper-personalized algorithmic discovery.",
     "Music lovers, podcast listeners, commuters, fitness enthusiasts, and audiobook fans.",
     ["Primary: 'Get Spotify Free' (Direct app and web player signup)", "Secondary: 'Explore Premium' (Individual, Duo, Family, Student plan matrix)", "Web: 'Open Web Player' (Instant in-browser streaming)"],
     "Vibrant, youth-culture hero featuring energetic duotone photography and trending album artwork. Highlights Discover Weekly personalized playlists, Spotify Wrapped cultural phenomenon, podcast exclusives, and multi-device Spotify Connect.",
     ["Over 620 million monthly active users and 240+ million Premium subscribers worldwide", "Catalog of over 100 million tracks, 6 million podcasts, and 350,000 audiobooks", "Universal cross-platform compatibility across smartphones, desktop, smart speakers, and gaming consoles"],
     "Cultural, dynamic, and rhythmic. Celebrates musical fandom and personal identity: 'Music for every moment.'",
     ["Ad interruptions and shuffle-only restrictions on mobile free tier incentivize upgrading to Premium", "High royalty payouts to music rights-holders versus subscription price increases"],
     ["Include an interactive audio preview snippet on the hero where visitors can listen to trending tracks instantly", "Provide an interactive plan picker quiz comparing Individual, Duo, and Family plans"],
     "Spotify's design identity is synonymous with bold neon greens, high-contrast duotone imagery, and fluid musical momentum. The landing page vibrates with cultural energy and invites visitors to press play immediately.",
     {"primary_segment": "Music Listeners, Podcast Fans, Commuters & Students", "monetization_model": "Ad-Supported Free Tier + Premium Subscription (Individual/Family/Student)", "conversion_path": "1-Click Social / Email Signup & Web Player Launch", "design_signature": "Spotify Neon Green (#1DB954), Duotone Photo Treatments, Play Bar"}),

    ("https://uber.com", "Uber", "Go anywhere, get anything", "Mobility & On-Demand Delivery", "Consumer",
     "A global on-demand mobility and logistics platform that connects riders with drivers for urban transportation, freight logistics, and restaurant/grocery delivery via Uber Eats.",
     "Urban commuters, travelers, restaurant diners, delivery recipients, and gig economy drivers.",
     ["Primary: 'Ride with Uber' (Pickup/Dropoff location route estimator)", "Secondary: 'Order delivery' (Uber Eats restaurant finder)", "Earn: 'Drive or deliver' (Driver onboarding funnel)"],
     "Bold, minimalist monochrome hero with interactive pickup/destination input. Displays real-time fare estimates, Uber One unified membership perks, safety features (Emergency Button, PIN verification), and enterprise corporate travel.",
     ["Operates in over 70 countries and 10,000+ cities with millions of daily completed trips", "Comprehensive safety toolkit with 24/7 incident support and GPS tracking", "Uber One loyalty program uniting ridesharing and Uber Eats food delivery discounts"],
     "Direct, reliable, and city-smart. Focuses on effortless movement and saving time in daily urban life.",
     ["Dynamic surge pricing during inclement weather or peak rush hour demand", "Driver availability in suburban or remote rural areas outside major metropolitan centers"],
     ["Add an interactive fare and ETA estimator in the hero where visitors type two addresses to see vehicle options (UberX, Comfort, Black)", "Include an Uber One savings calculator"],
     "Uber's landing page is an archetype of high-contrast urban minimalism. Its stark black-and-white palette, clean map route vectors, and bold typographic hierarchy make requesting transportation feel instant, safe, and inevitable.",
     {"primary_segment": "City Commuters, Travelers, Diners & Gig Economy Earners", "monetization_model": "Trip Fare Take Rate (~20-25%) + Uber One Monthly Membership ($9.99/mo)", "conversion_path": "Immediate Address Input for Instant Fare Estimate", "design_signature": "High-Contrast Black & White, Clean Map Routes, Fare Card Badges"}),

    ("https://shopify.com", "Shopify", "The global commerce platform built for growth", "E-commerce Platform & Retail POS", "Consumer",
     "The leading multi-channel commerce platform that empowers entrepreneurs and enterprise brands to build online storefronts, sell on social media, manage inventory, and process point-of-sale checkout.",
     "Independent entrepreneurs, direct-to-consumer (DTC) brands, retail store owners, and enterprise retailers.",
     ["Primary: 'Start free trial' (3-day free trial + $1/month promo)", "Secondary: 'Shopify Plus' (High-volume enterprise path)", "Commerce: 'Explore Themes & App Store' (Thousands of e-commerce apps)"],
     "Dynamic, commerce-rich hero featuring successful merchant storefronts and the legendary Shop Pay 1-click checkout. Highlights customizable online store builder, Shop Pay accelerated checkout, global commerce tools, and Shopify POS hardware.",
     ["Powers over 10% of total US e-commerce market share and millions of global merchants", "Over $1 trillion in cumulative lifetime gross merchandise volume processed", "Shop Pay delivers up to 50% higher checkout conversion rates than standard checkout"],
     "Ambitious, entrepreneurial, and triumphant. Celebrates independent business ownership: 'Making commerce better for everyone.'",
     ["Additional third-party payment transaction fees if not using Shopify Payments gateway", "Advanced custom store logic and theme customizations require learning Liquid template language"],
     ["Include an interactive Shop Pay checkout speed comparison in the hero showing a 1-click purchase versus filling out 10 checkout fields", "Provide an e-commerce startup cost estimator"],
     "Shopify's landing page is a vibrant celebration of modern commerce. Its rich merchant photography, emerald accents, and clear multi-channel sell diagrams inspire aspiring founders to turn their ideas into global brands.",
     {"primary_segment": "Entrepreneurs, Direct-to-Consumer Brands & Global Retailers", "monetization_model": "Monthly SaaS Subscription (Basic/Shopify/Advanced/Plus) + Payment Take Rate", "conversion_path": "3-Day Free Trial Email Signup ($1/mo Promotion)", "design_signature": "Shopify Emerald Green, Merchant Storefront Mockups, Shop Pay Badges"}),

    ("https://netflix.com", "Netflix", "Unlimited movies, TV shows, and more", "Subscription Video Streaming & Entertainment", "Consumer",
     "The world's leading subscription video-on-demand streaming service, offering thousands of award-winning original series, feature films, documentaries, and mobile games without commercials.",
     "Movie enthusiasts, binge-watchers, families, and global entertainment consumers.",
     ["Primary: 'Get Started' (Email input bar in hero)", "Secondary: 'Sign In' (Existing member auth)", "Catalog: 'Trending Now' (Top 10 movies and TV series in your country)"],
     "Cinematic dark hero featuring rich poster artwork grid of global blockbuster originals. Walks through 4 core value pillars: Watch on any device (TV, phone, tablet), Download and watch offline, Create profiles for kids, and Cancel anytime online.",
     ["Over 277 million paid subscribers across 190 countries worldwide", "Winner of numerous Academy Awards, Emmys, and Golden Globes for original productions", "Proprietary global content delivery network (Open Connect) for flawless 4K HDR streaming"],
     "Direct, cinematic, and low-friction. Focuses on irresistible entertainment value and effortless sign-up: 'Watch anywhere. Cancel anytime.'",
     ["Account password sharing crackdown limits simultaneous streaming outside the primary household", "Tiered pricing structure based on video resolution (Standard with Ads, Standard 1080p, Premium 4K)"],
     ["Add an interactive Top 10 trailer carousel on the hero where visitors can hover and watch 15-second teaser clips", "Provide a device compatibility visualizer (Smart TV, Apple TV, PlayStation, iPad)"],
     "Netflix's landing page is the ultimate example of conversion-focused minimalism. Its deep cinematic black, iconic red N monogram, and prominent single-input email hero convert millions of prospective viewers with zero friction.",
     {"primary_segment": "Global Entertainment Consumers, Movie Lovers & Families", "monetization_model": "Tiered Monthly Subscription (Standard with Ads / Standard / Premium 4K)", "conversion_path": "Instant 1-Input Email Bar in Hero", "design_signature": "Cinematic Black, Netflix Red (#E50914), Poster Art Grids"}),

    ("https://duolingo.com", "Duolingo", "The free, fun, and effective way to learn a language", "Gamified Education & Language Learning", "Consumer",
     "The world's most popular language-learning app, combining bite-sized gamified lessons, AI personalized practice, and friendly mascot motivation to make learning 40+ languages addictive.",
     "Language learners, students, travelers, casual gamers, and self-improvement enthusiasts.",
     ["Primary: 'Get Started' (Direct language picker without login)", "Secondary: 'I already have an account' (Existing user login)", "Super: 'Try Super Duolingo' (Ad-free offline subscription)"],
     "Playful, joyful hero featuring Duo the green owl mascot and a 1-click language selector. Highlights game-like mechanics (Streaks, XP, Leaderboards), scientifically proven bite-sized pedagogy, and Duolingo Max AI video calls.",
     ["Over 100 million monthly active users and 500+ million total registered learners", "Consistently ranked as the #1 education app worldwide across iOS and Android", "Standardized English Test (Duolingo English Test) accepted by over 4,000 universities"],
     "Playful, encouraging, witty, and unapologetically fun. Treats education as a daily joyful gaming habit: 'Free. Fun. Effective.'",
     ["Heart depletion mechanism on free tier pauses lesson progress on repeated mistakes, nudging users toward Super Duolingo", "Bite-sized format is exceptional for vocabulary and basic conversation but requires supplementation for deep native fluency"],
     ["Add an interactive 1-question language mini-game directly in the hero where visitors can answer a sample Spanish or French question immediately", "Provide an interactive streak milestone calculator"],
     "Duolingo's landing page is an explosion of playful illustration, energetic greens, and cheerful gamification. It completely removes the intimidation of learning a new language by making it look as inviting as playing a mobile game.",
     {"primary_segment": "Language Learners, Students, Travelers & Daily Habit Builders", "monetization_model": "Freemium (Ad-Supported) + Super Duolingo ($7.99/mo) / Duolingo Max AI", "conversion_path": "1-Click Language Flag Selection (Start Learning Instantly)", "design_signature": "Duolingo Green (#58CC02), Duo Owl Mascot, Gamified Streak Badges"}),

    ("https://substack.com", "Substack", "A new economic engine for culture", "Independent Publishing & Newsletter Network", "Consumer",
     "A subscription publishing platform and cultural network that enables independent writers, journalists, and podcasters to build direct relationships with their audience and monetize through paid newsletters.",
     "Independent writers, journalists, thought leaders, podcast hosts, and avid readers.",
     ["Primary: 'Start writing' (Instant newsletter publication setup)", "Secondary: 'Explore' (Discover top publications across politics, tech, food, culture)", "App: 'Get the Substack App' (Unified reader app)"],
     "Editorial hero featuring prominent independent writers and dynamic publication leaderboards. Highlights direct subscriber ownership (export email list anytime), built-in Substack Notes social network, and reader recommendation engine.",
     ["Over 35 million active monthly subscriptions and millions of paid reader subscriptions", "Home to world-renowned journalists, bestselling authors, and independent experts", "Writers own 100% of their intellectual property, email list, and direct customer relationships"],
     "Intellectual, cultural, and liberating. Champions editorial independence from advertising algorithms: 'Do work you're proud of.'",
     ["Platform takes a 10% revenue share on paid subscriptions in addition to Stripe processing fees", "Building a paying readership from zero requires consistent long-term writing discipline"],
     ["Include an interactive writer revenue estimator on the hero based on projected subscriber count and monthly price", "Provide an interactive featured publication reader preview"],
     "Substack uses a clean editorial aesthetic with bold orange accents, classic serif typography, and rich publication cover art. It evokes the prestige of literary magazines while delivering modern creator-economy independence.",
     {"primary_segment": "Writers, Journalists, Podcasters, Creators & Avid Readers", "monetization_model": "10% Revenue Share on Paid Reader Subscriptions (Free for Free Newsletters)", "conversion_path": "1-Click Publication Name & Subdomain Setup", "design_signature": "Substack Orange (#FF6719), Editorial Serif Fonts, Publication Cards"}),

    ("https://doordash.com", "DoorDash", "Restaurants and more, delivered to your door", "On-Demand Food Delivery & Local Logistics", "Consumer",
     "A local commerce and on-demand delivery platform that connects consumers with their favorite local restaurants, grocery stores, pet supplies, and convenience essentials.",
     "Hungry diners, busy families, grocery shoppers, local merchants, and delivery Dashers.",
     ["Primary: 'Sign in for address' (Address lookup and restaurant discovery)", "Secondary: 'DashPass' (Zero delivery fee subscription trial)", "Earn: 'Become a Dasher' (Delivery driver signup)"],
     "Vibrant hero with mouthwatering full-bleed food photography and instant address input bar. Highlights 0$ delivery fees with DashPass, real-time order tracking map, pickup discounts, and retail grocery partners.",
     ["#1 food delivery platform in the United States with over 65% market share", "Network of over 500,000 local merchants and millions of active Dashers", "DashPass loyalty program with over 15 million active subscribers saving on every order"],
     "Appetizing, urgent, and convenience-centric. Focuses on cravings, speed, and supporting neighborhood businesses.",
     ["Service fees and delivery charges can increase final order cost on smaller individual restaurant orders", "Delivery times can fluctuate during adverse weather or peak dinner rush hours"],
     ["Add an interactive cuisine explorer on the hero where visitors can click icons (Pizza, Sushi, Burgers, Tacos) to see live nearby options", "Provide a DashPass annual savings calculator"],
     "DoorDash's landing page is an appetizing visual feast. With bold crimson branding, mouthwatering photography, and an instant address search bar, it turns hungry contemplation into an active dinner delivery within seconds.",
     {"primary_segment": "Hungry Consumers, Busy Households, Grocery Shoppers & Dashers", "monetization_model": "Merchant Commission (~15-30%) + Delivery/Service Fees + DashPass ($9.99/mo)", "conversion_path": "Instant Street Address Input for Nearby Restaurant Discovery", "design_signature": "DoorDash Crimson Red (#FF3008), Food Photography, Delivery ETA Badges"}),

    ("https://pinterest.com", "Pinterest", "A visual discovery engine for finding ideas", "Visual Search & Lifestyle Inspiration", "Consumer",
     "A visual discovery and bookmarking engine where over 500 million people find, save, and shop inspiring ideas for home decor, fashion recipes, DIY crafts, and wedding planning.",
     "Visual thinkers, home decorators, fashion enthusiasts, DIY creators, and e-commerce shoppers.",
     ["Primary: 'Sign up' (Instant visual exploration account creation)", "Secondary: 'Explore' (Trending search themes and moodboards)", "Business: 'Pinterest for Business' (Visual advertising platform)"],
     "Dynamic, kinetic hero featuring rotating lifestyle themes (Chai tea, Home office makeover, Fall fashion outfits) with cascading pinboards. Highlights visual image search (Lens), Shoppable Pins, and personalized aesthetic discovery.",
     ["Over 518 million monthly active users searching for high-intent purchase inspiration", "Billions of curated Pins organized across millions of community moodboards", "Proven shopping engine with high conversion rates for home decor and apparel brands"],
     "Inspiring, positive, and optimistic. Positions Pinterest as an internet sanctuary: 'A place to find ideas you love.'",
     ["Transition from inspirational moodboarding to direct in-app e-commerce checkout requires merchant catalog sync", "Search interface is visually dense and optimized for visual browsing rather than rapid textual research"],
     ["Include an interactive moodboard creator on the hero where visitors can click aesthetic themes to see cascading pins animate", "Provide an interactive Pinterest Lens visual search demo"],
     "Pinterest's landing page is a radiant tapestry of visual inspiration. Its signature red script emblem, fluid masonry grids, and animated search themes create an inviting digital canvas for dreaming and planning.",
     {"primary_segment": "Visual Planners, Shoppers, Decorators, Creatives & Advertisers", "monetization_model": "Visual Promoted Pins Advertising + Affiliate Shopping Commissions", "conversion_path": "1-Click Social / Email Account Creation", "design_signature": "Pinterest Crimson Red (#E60023), Masonry Pin Columns, Search Bubbles"}),

    ("https://etsy.com", "Etsy", "Shop for unique, handmade, and vintage items", "Handmade & Vintage E-commerce Marketplace", "Consumer",
     "A global online marketplace dedicated to unique, creative, and handcrafted goods, connecting millions of passionate independent artisans with buyers seeking personalized and vintage treasures.",
     "Shoppers seeking unique personalized gifts, craft lovers, vintage collectors, and creative artisans.",
     ["Primary: 'Search for anything' (Top search bar with gift categories)", "Secondary: 'Sign In / Register' (User account and favorites)", "Sell: 'Sell on Etsy' (Artisan storefront creator)"],
     "Warm, artisanal hero featuring curated gift guides, personalized jewelry, handmade ceramics, and custom home decor. Highlights Etsy Purchase Protection, direct messaging with makers, and seasonal sales.",
     ["Over 90 million active buyers and 6 million creative sellers globally", "The premier global destination for custom, personalized, and handmade craftsmanship", "100% renewable electricity powering Etsy marketplace operations"],
     "Warm, heartfelt, human, and authentic. Celebrates human creativity over mass-manufactured goods: 'Keep commerce human.'",
     ["Shipping fees and production lead times for custom handmade items can vary by independent maker", "Search results require careful filtering to separate true handmade crafts from dropshipped items"],
     ["Add an interactive gift finder quiz on the hero matching custom items to specific recipient personalities", "Include an interactive artisan spotlight video reel"],
     "Etsy's landing page radiates warmth and handmade charm. Its iconic orange logo, cozy product photography, and handcrafted category cards make browsing feel like wandering through an eclectic artisan street market.",
     {"primary_segment": "Gift Buyers, Craft Enthusiasts, Vintage Lovers & Independent Makers", "monetization_model": "Listing Fees ($0.20/item) + 6.5% Transaction Commission + Ads", "conversion_path": "Top Global Search Input & Curated Gift Guide Clicks", "design_signature": "Etsy Clay Orange (#F1641E), Warm Product Photography, Artisan Badges"}),

    ("https://robinhood.com", "Robinhood", "Investing for everyone", "Commission-Free Retail Investing & Crypto", "Consumer",
     "A retail financial services platform that pioneered commission-free trading, enabling millions of consumers to invest in stocks, ETFs, options, cryptocurrencies, and high-yield retirement accounts.",
     "First-time investors, millennial and Gen Z retail traders, crypto enthusiasts, and retirement savers.",
     ["Primary: 'Sign Up' (Quick mobile/web account onboarding)", "Secondary: 'Robinhood Gold' (3% IRA match and high APY cash sweep)", "Credit Card: 'Robinhood Gold Card' (3% cash back on all categories)"],
     "Bold neon green hero showcasing the sleek Robinhood mobile trading chart with live price action. Highlights Commission-free stocks/options, 24-hour market trading, Gold retirement match (up to 3%), and crypto trading.",
     ["Over 24 million funded customer accounts with tens of billions in assets under custody", "Pioneered the zero-commission brokerage revolution that transformed the financial industry", "SIPC member protecting securities up to $500,000 and multi-million FDIC sweep cash coverage"],
     "Liberating, energetic, and accessible. Demystifies Wall Street jargon: 'Investing is simple here.'",
     ["Options trading and margin require understanding financial risk and market volatility", "Payment for order flow (PFOF) business model subject to regulatory scrutiny"],
     ["Include an interactive stock chart on the hero where visitors can toggle between 1D, 1W, 1Y, and All-Time returns", "Provide a Robinhood Gold IRA 3% match wealth compounding calculator"],
     "Robinhood's landing page is an icon of disruptive fintech aesthetics. Its electric neon green, clean price charts, and confident typography make investing feel accessible, intuitive, and modern.",
     {"primary_segment": "Retail Investors, Mobile Traders, Crypto Users & Retirement Savers", "monetization_model": "Robinhood Gold Subscriptions ($5/mo) + Net Interest + Order Flow", "conversion_path": "1-Click Guided Online Brokerage Application", "design_signature": "Electric Neon Green (#00C805), Interactive Price Charts, Gold Cards"}),

    ("https://instacart.com", "Instacart", "Groceries and essentials delivered same-day", "Online Grocery Delivery & Retail Logistics", "Consumer",
     "An online grocery delivery and pickup platform that connects consumers with local personal shoppers to deliver fresh groceries and household essentials from over 1,400 retail banners in as fast as an hour.",
     "Busy professionals, families, elderly shoppers, and consumers seeking same-day grocery delivery.",
     ["Primary: 'Get started' (Address entry for local supermarket discovery)", "Secondary: 'Instacart+' ($0 delivery fee membership trial)", "Shopper: 'Become a Shopper' (Gig economy grocery shopper signup)"],
     "Fresh, appetizing hero with vibrant fruit and vegetable photography and local store logo carousel (Costco, ALDI, Kroger, Safeway, Target). Highlights Same-day 1-hour delivery, real-time item replacements with in-app chat, and Instacart+ savings.",
     ["Partners with more than 1,400 national, regional, and local retail brands across North America", "Covers over 95% of North American households with same-day grocery delivery", "Instacart+ loyalty program offering unlimited free delivery and 5% credit back on pickup"],
     "Fresh, helpful, and dependable. Focuses on saving hours spent in supermarket aisles: 'Grocery shopping made easy.'",
     ["In-store item markup prices can vary from physical supermarket shelf prices depending on retailer policies", "Substitution preferences required when items are out of stock in physical store aisles"],
     ["Add an interactive supermarket aisle picker on the hero where visitors can search for ingredients (Milk, Avocado, Sourdough) and see local delivery times", "Include an Instacart+ annual savings estimator"],
     "Instacart's landing page is fresh, crisp, and inviting. Its cheerful carrot orange emblem, vibrant produce photography, and prominent local supermarket logos make ordering fresh groceries feel effortless and reliable.",
     {"primary_segment": "Busy Households, Families, Seniors & Same-Day Grocery Shoppers", "monetization_model": "Retailer Commission & Markups + Delivery/Service Fees + Instacart+ ($99/yr)", "conversion_path": "Street Address Entry for Local Supermarket Catalog", "design_signature": "Carrot Orange (#FF8200) & Fresh Green, Retailer Logos, Produce Photography"}),

    ("https://headspace.com", "Headspace", "Mindfulness and meditation for everyday life", "Mental Health, Meditation & Sleep", "Consumer",
     "A digital mental health and mindfulness platform offering guided meditations, sleepcasts, breathwork exercises, and mental health coaching to reduce stress and improve daily well-being.",
     "Stressed professionals, individuals struggling with sleep, meditation beginners, and corporate wellness programs.",
     ["Primary: 'Try for Free' (14-day free trial subscription)", "Secondary: 'Headspace for Organizations' (Corporate employee wellness)", "Sleep: 'Explore Sleep by Headspace' (Wind-downs and sleep soundscapes)"],
     "Peaceful, joyful hero with friendly rounded orange characters and soothing audio player previews. Highlights Daily Meditation, Sleepcasts and ambient soundscapes, SOS anxiety exercises, and clinical research backing.",
     ["Over 70 million members across 190 countries with proven clinical studies showing 14% stress reduction in 10 days", "Partnered with over 4,000 enterprise organizations for corporate mental wellness", "Curated library of over 1,000 hours of guided meditation, sleep, and mindful movement content"],
     "Gentle, warm, compassionate, and non-judgmental. Invites everyone to take a mindful breath: 'Be kind to your mind.'",
     ["Requires establishing a consistent daily meditation habit to experience long-term mental health benefits", "Subscription required after 14-day trial to maintain access to the full sleep and meditation library"],
     ["Include an interactive 1-minute guided breathing bubble on the hero where visitors can sync their breath in real time", "Provide an interactive mental wellness quiz tailored to stress vs sleep goals"],
     "Headspace is an oasis of calm on the internet. Its sunny orange circle emblem, cheerful rounded illustrations, and peaceful color palette instantly reduce digital anxiety and invite visitors to pause and breathe.",
     {"primary_segment": "Meditation Beginners, Stressed Professionals, Sleepers & Wellness Teams", "monetization_model": "14-Day Free Trial + Annual/Monthly Subscription ($69.99/yr) + B2B", "conversion_path": "14-Day Free Trial Guided Signup", "design_signature": "Headspace Orange Circle (#FF6138), Rounded Pastel Characters, Breathing Rings"}),

    ("https://calm.com", "Calm", "Find your calm. Sleep more. Stress less.", "Sleep, Meditation & Relaxation Platform", "Consumer",
     "A leading mindfulness and sleep application that offers guided meditations, celebrity Sleep Stories (Matthew McConaughey, Harry Styles), relaxing nature soundscapes, and breathwork.",
     "Insomniacs, anxious individuals, wellness seekers, and people seeking deep restorative sleep.",
     ["Primary: 'Try Calm for Free' (Personalized wellness quiz onboarding)", "Secondary: 'Calm Business' (Enterprise workforce mental health)", "Sleep: 'Listen to a Sleep Story' (Celebrity bedtime story audio preview)"],
     "Serene hero featuring an ambient video loop of a pristine mountain lake with gentle rain sounds. Highlights Daily Calm meditations, Sleep Stories with world-famous narrators, Soundscapes (Ocean, Rain, Forest), and Breathwork.",
     ["Over 150 million downloads and over 4 million 5-star reviews worldwide", "Apple App of the Year winner and pioneer of the modern digital sleep movement", "Scientifically validated clinical trials demonstrating improved sleep quality and reduced anxiety"],
     "Serene, tranquil, restorative, and poetic. Replaces digital noise with the peace of nature: 'Take a deep breath.'",
     ["Subscription required to unlock the extensive library of celebrity Sleep Stories after trial", "Effectiveness depends on creating consistent nightly bedtime routines"],
     ["Add an interactive nature soundscape player on the hero where visitors can toggle Rain, Forest, or Ocean audio", "Include a Sleep Story audio snippet narrator preview"],
     "Calm's landing page is an immersion in tranquil natural beauty. With its soothing blue lake animations, gentle rain audio, and spacious typography, it provides instant emotional relief the moment you open the page.",
     {"primary_segment": "Insomniacs, Stressed Individuals, Wellness Seekers & Enterprise Teams", "monetization_model": "7-Day Free Trial + Annual Subscription ($69.99/yr) + Calm Business", "conversion_path": "Serene Onboarding Wellness Questionnaire", "design_signature": "Calm Blue Gradient (#2E75B6), Mountain Lake Video, Nature Soundbars"}),

    ("https://coursera.org", "Coursera", "Learn without limits from top universities and companies", "Online Education & Professional Degrees", "Consumer",
     "An online learning platform that partners with over 300 leading universities (Yale, Stanford, Penn) and industry leaders (Google, IBM) to offer courses, professional certificates, and accredited degrees.",
     "Lifelong learners, career switchers, university students, corporate employees, and technical professionals.",
     ["Primary: 'Join for Free' (Instant learner registration)", "Secondary: 'Explore Degrees' (Accredited Bachelor's and Master's programs)", "Business: 'Coursera for Business' (Enterprise workforce upskilling)"],
     "Authoritative educational hero featuring university partner logos and dynamic career certificates (Google Data Analytics, Cybersecurity). Highlights flexible self-paced learning, accredited university credentials, and Coursera Plus unlimited learning.",
     ["Over 148 million registered learners worldwide taking courses from 300+ premier institutions", "Over 7,000 courses, professional certificates, and fully accredited online university degrees", "Over 75% of learners report positive career outcomes such as promotions, raises, or new jobs"],
     "Inspiring, rigorous, and career-empowering. Focuses on social mobility and mastering world-class skills: 'Learn without limits.'",
     ["University degree programs require formal admissions applications and standard tuition fees", "Course completion requires self-directed discipline over multi-week modules"],
     ["Add an interactive career path explorer on the hero where visitors choose a dream role (Data Scientist, UX Designer) to see the exact recommended certificate", "Provide a course syllabus preview"],
     "Coursera balances academic prestige with modern online flexibility. Its deep blue branding, distinguished university crests, and clear career outcome statistics project undeniable institutional credibility.",
     {"primary_segment": "Career Switchers, University Students, Professionals & Enterprises", "monetization_model": "Free Audit Option + Certificate Fees + Coursera Plus Subscription ($399/yr)", "conversion_path": "1-Click Social / Email Learner Registration", "design_signature": "Coursera Royal Blue (#0056D2), University Crest Logos, Career Outcome Badges"}),

    ("https://strava.com", "Strava", "The social network for athletes", "Fitness Tracking & Athletic Social Community", "Consumer",
     "The premier social fitness tracking network that lets athletes and everyday runners, cyclists, and hikers record GPS activities, analyze performance metrics, share routes, and compete on community segments.",
     "Runners, cyclists, triathletes, hikers, fitness enthusiasts, and athletic communities.",
     ["Primary: 'Sign Up with Google / Apple' (Instant athlete registration)", "Secondary: 'Start your free trial' (Strava Subscription with Route Builder)", "Mobile: 'Get the App' (iOS and Android GPS tracking)"],
     "High-energy athletic hero featuring real athlete GPS route maps and competitive Segment leaderboards. Highlights GPS Activity Tracking for 30+ sports, Segment King/Queen of the Mountain (KOM/QOM), 3D Route Builder, and Beacon safety live tracking.",
     ["Over 120 million registered athletes across 190 countries uploading billions of activities", "The undisputed global digital home for the worldwide running and cycling community", "Compatible with virtually every GPS watch and bike computer (Garmin, Apple Watch, Wahoo, Polar)"],
     "Passionate, authentic, communal, and athletic. Celebrates every mile and the grit of athletic pursuit: 'If you sweat, you're an athlete.'",
     ["Advanced segment leaderboards, route planning, and training fatigue analysis require Strava Subscription", "GPS battery consumption on mobile devices during multi-hour outdoor activities"],
     ["Include an interactive 3D terrain route flyover on the hero where visitors can inspect a real marathon or mountain bike segment", "Provide an interactive Segment KOM competition demo"],
     "Strava's landing page pulsates with athletic grit. Its iconic bright orange, high-resolution route GPS lines, and dynamic photo feeds of real runners and cyclists capture the shared camaraderie of athletic achievement.",
     {"primary_segment": "Runners, Cyclists, Triathletes, Hikers & Fitness Communities", "monetization_model": "Freemium + Strava Subscription ($11.99/mo or $79.99/yr for Route/Segment Data)", "conversion_path": "1-Click Social / GPS Account Connection", "design_signature": "Strava Vibrant Orange (#FC4C02), GPS Route Lines, Elevation Profiles"}),

    ("https://discord.com", "Discord", "Your place to talk, hang out, and stay close", "Community Chat & Real-Time Voice Hub", "Consumer",
     "A voice, video, and text communication service used by tens of millions of communities, gaming guilds, developer groups, and friend circles to hang out and talk in real time.",
     "Gamers, developer communities, study groups, creative circles, and digital subcultures.",
     ["Primary: 'Download for Windows / Mac' (Direct desktop installer)", "Secondary: 'Open Discord in your browser' (Instant web app launch)", "Nitro: 'Discover Nitro' (Custom emojis and HD streaming subscription)"],
     "Playful, character-filled hero with Clyde robot mascot and interactive server channel sidebar. Highlights low-latency voice channels where you can drop in without calling, screen sharing in 4K 60fps, custom server emojis, and Stage channels.",
     ["Over 200 million monthly active users across millions of active community servers", "The undisputed digital town square for gaming, web3, open-source AI (Midjourney), and student study groups", "Ultra-low-latency WebRTC voice and video architecture"],
     "Informal, fun, community-centric, and irreverent. Celebrates hanging out and feeling close: 'Imagine a place.'",
     ["Server navigation and notification volume can feel chaotic for first-time non-gamer users", "Managing large public server moderation requires configuring bot permissions (AutoMod)"],
     ["Add an interactive voice channel simulator on the hero where visitors can click avatars to see instant voice connection", "Provide a 1-click server template builder for Study Groups vs Gaming"],
     "Discord's landing page is an explosion of playful gaming culture. Its signature Blurple hue, whimsical mascots, and interactive server channels make hanging out online feel effortless, intimate, and alive.",
     {"primary_segment": "Gamers, Creator Communities, Developer Circles & Friend Groups", "monetization_model": "100% Free Core Platform + Discord Nitro Subscription ($9.99/mo) + Server Boosting", "conversion_path": "Instant Desktop App Download & In-Browser Web Launch", "design_signature": "Discord Blurple (#5865F2), Clyde Mascot, Channel Hash Rails"}),

    ("https://twitch.tv", "Twitch", "Live streaming for gaming, entertainment, sports, and music", "Live Streaming & Interactive Broadcasting", "Consumer",
     "The world's leading live streaming platform where millions of people come together live every day to chat, interact, and make their own entertainment across gaming, esports, creative arts, and IRL streams.",
     "Gamers, esports enthusiasts, live content creators, music streamers, and digital entertainment fans.",
     ["Primary: 'Sign Up' (Instant interactive viewer account)", "Secondary: 'Browse Channels' (Live stream category directory)", "Stream: 'Start Streaming' (Twitch Studio broadcaster tool)"],
     "Dynamic, high-framerate hero featuring live stream carousels and fast-scrolling live chat with custom channel emotes. Highlights interactive live chat, Channel Subscriptions and Bits tipping, Drops and rewards, and Creator Camp.",
     ["Over 35 million daily active visitors and 7 million unique live broadcasters monthly", "Owned by Amazon with global edge video distribution delivering sub-second live chat latency", "The epicenter of global gaming culture, esports tournaments, and live interactive broadcasting"],
     "Energetic, raw, communal, and broadcast-live. Celebrates shared real-time moments: 'You're already one of us.'",
     ["Pre-roll video advertisements for non-subscribers can briefly delay stream viewing", "Fast-moving live chat in massive 50,000+ viewer streams can require Sub-only or Slow mode to follow"],
     ["Include a live muted stream preview in the hero where visitors can toggle channels (Gaming, Music, Talk Shows) and see live chat reactions", "Provide a streamer earnings calculator"],
     "Twitch's design is unmistakably bold, electric, and purple. Its high-contrast dark layout, live video carousels, and iconic pixelated chat emotes immerse visitors directly into the kinetic energy of live broadcast entertainment.",
     {"primary_segment": "Live Stream Viewers, Gamers, Esports Fans & Broadcasters", "monetization_model": "Channel Subscriptions ($4.99/mo) + Bits Tipping + Video Advertising + Turbo", "conversion_path": "1-Click Live Video Player Stream & Viewer Auth", "design_signature": "Twitch Purple (#9146FF), Live Video Carousels, Pixel Emote Chat"}),

    ("https://medium.com", "Medium", "Where good ideas find you", "Social Publishing & Thought Leadership", "Consumer",
     "An open publishing platform where over 100 million readers and writers discover dynamic thinking, deep essays, technical tutorials, and unique personal perspectives on any topic.",
     "Avid readers, essayists, software engineers, founders, domain experts, and thoughtful commentators.",
     ["Primary: 'Get started' (Quick reading and writing signup)", "Secondary: 'Start reading' (Curated topic feed)", "Membership: 'Become a member' (Unlimited reading for $5/mo)"],
     "Understated, elegant editorial hero with clean serif typography and hand-drawn illustrated accents. Highlights distraction-free reading experience, Medium Partner Program author royalties, topic curation, and audio listen features.",
     ["Over 100 million active monthly readers discovering independent essays and technical guides", "Medium Partner Program has paid out tens of millions of dollars directly to independent writers", "Clean, ad-free reading experience focused entirely on the written word"],
     "Thoughtful, literary, and human. Emphasizes intellectual depth over clickbait: 'Human stories and ideas.'",
     ["Metered paywall (3 free articles per month) requires a $5/month membership for unlimited reading", "Writer reach depends on platform curation algorithms and publication followings"],
     ["Add an interactive topic tag cloud in the hero where visitors can click 'Technology', 'Design', or 'Culture' to preview trending essays", "Provide a Member Reading Experience preview"],
     "Medium's landing page is an enduring sanctuary of clean editorial design. Its elegant black-and-white serif typography, generous margins, and focus on human writing make deep reading feel dignified and restorative.",
     {"primary_segment": "Writers, Thought Leaders, Engineers, Designers & Avid Readers", "monetization_model": "Medium Membership Subscription ($5/month or $50/year for Unlimited Access)", "conversion_path": "1-Click Social / Email Account Creation", "design_signature": "Classic Black & White, Editorial Serif Type, Minimal Reading Margins"}),

    ("https://kickstarter.com", "Kickstarter", "Bring a creative project to life", "Crowdfunding & Creative Project Backing", "Consumer",
     "A global crowdfunding platform that connects visionary creators, designers, board game makers, and inventors with passionate backers to fund creative projects from idea to reality.",
     "Designers, board game creators, inventors, filmmakers, gadget enthusiasts, and creative project backers.",
     ["Primary: 'Explore Projects' (Trending crowdfunding campaigns)", "Secondary: 'Start a project' (Creator campaign builder)", "Categories: 'Design & Tech, Games, Arts, Film' (Category directory)"],
     "Inspiring hero featuring trending creative projects with real-time funding progress bars. Highlights all-or-nothing funding model, creator reward tiers, backer updates, and community comments.",
     ["Over $8 billion pledged by 23 million backers to bring over 260,000 creative projects to life", "Pioneered creative crowdfunding with iconic projects (Pebble, Exploding Kittens, Oculus Rift)", "Certified B Corp with a legal commitment to supporting the arts and fair creative commerce"],
     "Inspiring, adventurous, and creator-devoted. Focuses on turning wild dreams into physical reality: 'Bring creative projects to life.'",
     ["All-or-nothing funding model means creators only receive funds if their target goal is 100% met", "Manufacturing delays can occur on physical product hardware deliverables"],
     ["Include an interactive campaign card on the hero where visitors can slide a pledge amount to see reward tiers unlock", "Provide a live project funding ticker of newly backed campaigns"],
     "Kickstarter's design identity uses its iconic bold green, clean campaign cards, and motivating funding progress bars. It transforms the uncertain process of invention into an inspiring, collective community adventure.",
     {"primary_segment": "Inventors, Game Designers, Filmmakers & Passionate Backers", "monetization_model": "5% Platform Fee on Successfully Funded Projects + Payment Processing", "conversion_path": "Instant Campaign Browse & Project Backing Account Auth", "design_signature": "Kickstarter Green (#05CE78), Project Funding Bars, Reward Tier Badges"})
]

print("Assembling all 100 datasets...")

# Let's verify counts
all_100 = []

# DevTools: 20
for item in dev_tools_list:
    all_100.append(item)

# Productivity: 20
for p in productivity_list:
    all_100.append({
        "url": p[0], "product_brand": p[1], "tagline": p[2], "category": p[3], "group": p[4],
        "core_value_proposition": p[5], "target_audience": p[6], "cta_strategy": p[7],
        "information_hierarchy": p[8], "trust_signals": p[9], "ux_writing_notes": p[10],
        "friction_points": p[11], "design_opportunities": p[12], "designer_summary": p[13], "specs": p[14]
    })

# AI: 20
for a in ai_list:
    all_100.append({
        "url": a[0], "product_brand": a[1], "tagline": a[2], "category": a[3], "group": a[4],
        "core_value_proposition": a[5], "target_audience": a[6], "cta_strategy": a[7],
        "information_hierarchy": a[8], "trust_signals": a[9], "ux_writing_notes": a[10],
        "friction_points": a[11], "design_opportunities": a[12], "designer_summary": a[13], "specs": a[14]
    })

# Fintech: 20
for f in fintech_list:
    all_100.append({
        "url": f[0], "product_brand": f[1], "tagline": f[2], "category": f[3], "group": f[4],
        "core_value_proposition": f[5], "target_audience": f[6], "cta_strategy": f[7],
        "information_hierarchy": f[8], "trust_signals": f[9], "ux_writing_notes": f[10],
        "friction_points": f[11], "design_opportunities": f[12], "designer_summary": f[13], "specs": f[14]
    })

# Consumer: 20
for c in consumer_list:
    all_100.append({
        "url": c[0], "product_brand": c[1], "tagline": c[2], "category": c[3], "group": c[4],
        "core_value_proposition": c[5], "target_audience": c[6], "cta_strategy": c[7],
        "information_hierarchy": c[8], "trust_signals": c[9], "ux_writing_notes": c[10],
        "friction_points": c[11], "design_opportunities": c[12], "designer_summary": c[13], "specs": c[14]
    })

print(f"Total benchmarks compiled: {len(all_100)}")

# Check duplicate URLs
urls = [item["url"] for item in all_100]
unique_urls = set(urls)
if len(urls) != len(unique_urls):
    print("ERROR: Duplicate URLs found!")
    sys.exit(1)

# Write to liveDemos.ts
target_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend/src/lib/liveDemos.ts"))

ts_code = '''/**
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
'''

for item in all_100:
    item_json = json.dumps(item, indent=2)
    ts_code += f'  "{item["url"]}": {item_json},\n'

ts_code += '};\n\n'
ts_code += 'export const DEMO_URLS = Object.keys(LIVE_DEMO_DATASETS);\n'

with open(target_path, "w", encoding="utf-8") as out_f:
    out_f.write(ts_code)

print(f"Successfully generated 100 benchmarks to {target_path}!")
