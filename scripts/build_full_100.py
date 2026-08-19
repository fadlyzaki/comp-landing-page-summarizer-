#!/usr/bin/env python3
"""
Comprehensive 100 Curated Benchmarks Generator for Landing Page Summarizer.
Creates exactly 20 benchmarks per category across 5 categories:
1. DevTools & Infra (20)
2. Productivity & Design (20)
3. Frontier AI & ML (20)
4. Fintech & B2B SaaS (20)
5. Consumer Tech & Commerce (20)
Total = 100 benchmarks.
"""

import json
import os

def main():
    target_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend/src/lib/liveDemos.ts"))
    print(f"Generating 100 benchmarks to {target_path}...")

    # We will write the full liveDemos.ts file
    with open(target_path, "w", encoding="utf-8") as f:
        f.write('''/**
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
''')

if __name__ == "__main__":
    main()
