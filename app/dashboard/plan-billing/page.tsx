"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import PlansModal from './_components/PlansModal';

export default function PlanBillingPage() {
  const router = useRouter();
  const membershipLabel = useAppStore((state) => state.userProfile.membershipLabel);
  const currentPlan = membershipLabel || 'Basic';
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);

  const planFeatures = [
    'Zero-Access Core: encrypted account visibility without server-side raw data exposure.',
    'Multi-Source Sync: connect fiat and on-chain sources with strict read-only permissions.',
    'Privacy Dashboard: 30-day private analytics with no ad tracking.',
  ];

  const financeWorkflowFeatures = [
    'Market Intelligence with key stock and crypto metrics.',
    'DeFi Protocol Insights across leading ecosystems.',
    'Budget Planner with customizable categories.',
    'Privacy-preserving analytics controls.',
  ];

  return (
    <div className="w-full pb-10 px-8 pt-10">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-4 px-0 text-[var(--kura-text-secondary)] hover:text-[var(--kura-text)] hover:bg-transparent"
        >
          ← Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-8 lg:gap-10">
          <section>
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--kura-text)]">Plan & Billing</h1>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md">
              <div>
                <p className="text-xs text-[var(--kura-text-secondary)]">Your plan</p>
                <p className="mt-1 text-xl font-semibold text-[var(--kura-text)]">{currentPlan}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--kura-text-secondary)]">Pricing</p>
                <p className="mt-1 text-xl font-semibold text-[var(--kura-text)]">Free</p>
              </div>
            </div>

            <div className="mt-6 border-t border-[var(--kura-border)] pt-6 space-y-8">
              <div>
                <h2 className="text-base font-medium text-[var(--kura-text)]">Included with {currentPlan}</h2>
                <p className="mt-3 text-sm text-[var(--kura-text-secondary)]">Privacy-First Foundation</p>
                <ul className="mt-2 space-y-2">
                  {planFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[var(--kura-text)]">
                      <span className="text-[var(--kura-success)]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://kura-finance.com/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-[var(--kura-text-secondary)] hover:text-[var(--kura-text)] transition-colors"
                >
                  View all features
                </a>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-[var(--kura-text-secondary)]">Special offers</p>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-[var(--kura-text)]">
                  <span className="text-[var(--kura-success)]">✓</span>
                  <span>Pro plan includes a 15 day trial.</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-[var(--kura-text-secondary)]">Pro & Ultimate Highlights</p>
                <ul className="mt-2 space-y-2">
                  {financeWorkflowFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[var(--kura-text)]">
                      <span className="text-[var(--kura-success)]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://kura-finance.com/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-[var(--kura-text-secondary)] hover:text-[var(--kura-text)] transition-colors"
                >
                  View all features
                </a>
              </div>
            </div>
          </section>

          <aside className="lg:border-l lg:border-[var(--kura-border)] lg:pl-10">
            <div className="py-1">
              <div className="h-32 rounded-xl bg-gradient-to-br from-[var(--kura-bg-light)] to-[var(--kura-border-light)] border border-[var(--kura-border)]" />
              <h3 className="mt-4 text-2xl font-medium text-[var(--kura-text)]">Explore plans</h3>
              <p className="mt-2 text-sm text-[var(--kura-text-secondary)]">
                Get more usage and features that help you operate at scale.
              </p>
              <Button className="w-full mt-5" onClick={() => setIsPlansModalOpen(true)}>
                View all plans
              </Button>
            </div>
          </aside>
        </div>
      </div>
      <PlansModal isOpen={isPlansModalOpen} onClose={() => setIsPlansModalOpen(false)} />
    </div>
  );
}
