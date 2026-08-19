#!/usr/bin/env python3
import json
import os

# Define all 100 items categorized cleanly
from typing import List, Dict, Any

def create_100_benchmarks():
    items: List[Dict[str, Any]] = []

    # 1. DevTools & Infra (20 items)
    # Linear, Stripe, Vercel, Supabase, GitHub, Cloudflare, Docker, Postman, Sentry, Resend,
    # Railway, Neon, PlanetScale, Prisma, GitLab, Datadog, HashiCorp, Render, Fly.io, Upstash
    
    # 2. Productivity, Design & Workspace (20 items)
    # Notion, Figma, Raycast, Miro, Loom, Slack, Coda, Arc, Obsidian, Superhuman,
    # ClickUp, Asana, Monday.com, Basecamp, Pitch, Canva, Craft, Bear, Framer, Notion Calendar
    
    # 3. Frontier AI & ML (20 items)
    # OpenAI, Claude, Perplexity, Cursor, Midjourney, Hugging Face, ElevenLabs, Replicate, Mistral AI, Runway,
    # Cohere, Jasper, Descript, Synthesia, Poe, Character.ai, Phind, DeepL, Suno, Luma AI
    
    # 4. Fintech & B2B SaaS (20 items)
    # Ramp, Brex, Mercury, Plaid, Deel, Gusto, Intercom, Webflow, Square, Rippling,
    # Carta, HubSpot, Zendesk, Salesforce, Attio, Retool, Zapier, Make, Segment, Paddle
    
    # 5. Consumer Tech, Commerce & Media (20 items)
    # Airbnb, Spotify, Uber, Shopify, Netflix, Duolingo, Substack, DoorDash, Pinterest, Etsy,
    # Robinhood, Instacart, Headspace, Calm, Coursera, Strava, Discord, Twitch, Medium, Kickstarter

    return items
