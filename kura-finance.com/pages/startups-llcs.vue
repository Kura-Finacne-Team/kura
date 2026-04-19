<template>
  <div class="w-full text-kura-text">
    <!-- Hero Section -->
    <section class="relative pt-20 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center space-y-8">
          <div class="inline-block">
            <div class="px-4 py-2 rounded-full bg-kura-primary/10 border border-kura-primary/20">
              <p class="text-sm font-semibold text-kura-primary">Enterprise Finance Infrastructure</p>
            </div>
          </div>

          <h1 class="text-5xl md:text-7xl font-black tracking-tight">
            <span class="bg-gradient-to-r from-kura-primary to-kura-secondary bg-clip-text text-transparent">
              Enterprise Hybrid Treasury
            </span>
          </h1>

          <h2 class="text-2xl md:text-3xl font-bold text-kura-text-secondary">
            Stop managing finances with spreadsheets. Unify fiat and on-chain assets, secure your legal infrastructure with blockchain notarization, and unlock capital efficiency with decentralized credit.
          </h2>

          <p class="text-lg md:text-xl text-kura-text-secondary max-w-3xl mx-auto leading-relaxed">
            For Web3-native startups and enterprises that need more than a dashboard—you need a complete financial operating system built on decentralized infrastructure.
          </p>

          <div class="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.kura-finance.com" target="_blank" rel="noopener noreferrer" 
               class="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-kura-primary to-kura-secondary text-white font-semibold hover:shadow-lg hover:shadow-kura-primary/50 transition-all duration-300">
              Get Your Treasury in Order
            </a>
            <NuxtLink to="/about" 
               class="inline-block px-8 py-4 rounded-lg border border-kura-primary text-kura-primary font-semibold hover:bg-kura-primary/10 transition-all duration-300">
              Learn More
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Three Pillars Section -->
    <section class="py-20 md:py-32 px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            The Three Pillars of Enterprise Hybrid Finance
          </h2>
          <p class="text-lg text-kura-text-secondary max-w-3xl mx-auto">
            A complete solution for managing treasury, unlocking capital, and building legal trust infrastructure.
          </p>
        </div>

        <div class="space-y-12">
          <!-- Pillar 1 -->
          <div class="grid md:grid-cols-2 gap-8 items-start">
            <div class="order-2 md:order-1">
              <div class="rounded-xl bg-kura-background-light border border-kura-border p-8 h-64 flex items-center justify-center">
                <div class="text-center text-kura-text-secondary">Interface Preview</div>
              </div>
            </div>
            <div class="order-1 md:order-2 space-y-6">
              <div>
                <p class="text-sm font-semibold text-kura-primary uppercase tracking-wider mb-2">Pillar 1</p>
                <h3 class="text-3xl md:text-4xl font-bold mb-4">
                  Unified Treasury Dashboard
                </h3>
              </div>
              <p class="text-lg text-kura-text-secondary leading-relaxed">
                Seamlessly integrate top-tier US bank APIs and multisig wallets. Monitor SaaS burn rate and DeFi protocol yields in real-time. Export compliance-ready financial reports with one click, so you can focus on building your product, not reconciling spreadsheets.
              </p>
              <div class="space-y-3 pt-4">
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Real-time cash position visibility across all accounts and currencies</span>
                </div>
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Automated SaaS and DeFi expense tracking with burn rate analytics</span>
                </div>
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">One-click tax and audit-ready financial reporting</span>
                </div>
              </div>
            </div>
          </div>

          <div class="h-px bg-gradient-to-r from-transparent via-kura-border to-transparent" />

          <!-- Pillar 2 -->
          <div class="grid md:grid-cols-2 gap-8 items-start">
            <div class="space-y-6">
              <div>
                <p class="text-sm font-semibold text-kura-primary uppercase tracking-wider mb-2">Pillar 2</p>
                <h3 class="text-3xl md:text-4xl font-bold mb-4">
                  Unlock Capital Efficiency with KLHS
                </h3>
              </div>
              <p class="text-lg text-kura-text-secondary leading-relaxed">
                Tired of traditional banks refusing credit lines for Web3 companies? Stop over-relying on 150% overcollateralization. Kura's Liquidity Health Score (KLHS) uses zero-knowledge proofs to transform your healthy fiat cash flow into on-chain credit credentials, unlocking higher leverage and lower rates in DeFi lending pools.
              </p>
              <div class="space-y-3 pt-4">
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Convert fiat cash flow into decentralized credit scores via ZK proofs</span>
                </div>
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Access DeFi liquidity pools with lower collateral ratios and competitive rates</span>
                </div>
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Portable credit history that bridges traditional finance and DeFi</span>
                </div>
              </div>
            </div>
            <div>
              <div class="rounded-xl bg-kura-background-light border border-kura-border p-8 h-64 flex items-center justify-center">
                <div class="text-center text-kura-text-secondary">KLHS Architecture Diagram</div>
              </div>
            </div>
          </div>

          <div class="h-px bg-gradient-to-r from-transparent via-kura-border to-transparent" />

          <!-- Pillar 3 -->
          <div class="grid md:grid-cols-2 gap-8 items-start">
            <div class="order-2 md:order-1">
              <div class="rounded-xl bg-kura-background-light border border-kura-border p-8 h-64 flex items-center justify-center">
                <div class="text-center text-kura-text-secondary">Notary Integration</div>
              </div>
            </div>
            <div class="order-1 md:order-2 space-y-6">
              <div>
                <p class="text-sm font-semibold text-kura-primary uppercase tracking-wider mb-2">Pillar 3</p>
                <h3 class="text-3xl md:text-4xl font-bold mb-4">
                  Enterprise Trust Infrastructure
                </h3>
              </div>
              <p class="text-lg text-kura-text-secondary leading-relaxed">
                Use Kura Notary as your legal defense infrastructure. Create immutable on-chain digital fingerprints for cross-border contractor agreements, equity distribution documents, and critical code snapshots. Provide irrefutable proof of existence for future VC due diligence or compliance audits.
              </p>
              <div class="space-y-3 pt-4">
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Immutable blockchain timestamps for all critical contracts and agreements</span>
                </div>
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">IPFS + blockchain for decentralized, censorship-resistant document storage</span>
                </div>
                <div class="flex gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-kura-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-kura-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-kura-text-secondary">Audit-ready proof of existence for VC due diligence and regulatory compliance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Startups & Enterprises Trust Kura -->
    <section class="py-20 md:py-32 px-4 sm:px-6 bg-kura-background-light">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            Why Startups & Enterprises Trust Kura
          </h2>
          <p class="text-lg text-kura-text-secondary max-w-3xl mx-auto">
            Built for the modern enterprise that operates across traditional finance and Web3.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="p-8 rounded-xl bg-white border border-kura-border hover:border-kura-primary/50 transition-all duration-300">
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-kura-text mb-2">Non-Custodial & Zero Risk</h3>
                <p class="text-kura-text-secondary">Read-only access. We never control company funds. Complete safety with full transparency.</p>
              </div>
            </div>
          </div>

          <div class="p-8 rounded-xl bg-white border border-kura-border hover:border-kura-primary/50 transition-all duration-300">
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-kura-text mb-2">Enterprise Security</h3>
                <p class="text-kura-text-secondary">TLS 1.2/1.3 encryption, AES-256 at rest, zero-trust architecture with SOC 2 compliance.</p>
              </div>
            </div>
          </div>

          <div class="p-8 rounded-xl bg-white border border-kura-border hover:border-kura-primary/50 transition-all duration-300">
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-kura-text mb-2">Compliance-Ready Reports</h3>
                <p class="text-kura-text-secondary">OFAC compliant. Tax-ready breakdowns. Built for auditors, regulators, and VC due diligence.</p>
              </div>
            </div>
          </div>

          <div class="p-8 rounded-xl bg-white border border-kura-border hover:border-kura-primary/50 transition-all duration-300">
            <div class="flex gap-4 mb-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-kura-text mb-2">Real-Time Intelligence</h3>
                <p class="text-kura-text-secondary">Live data, instant alerts, and strategic dashboards. Know your position every second.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-32 px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="bg-gradient-to-r from-kura-primary/10 to-kura-secondary/10 border border-kura-primary/20 rounded-xl p-12 text-center space-y-6">
          <h2 class="text-4xl md:text-5xl font-bold">
            Ready to Transform Your Treasury?
          </h2>
          <p class="text-lg text-kura-text-secondary max-w-2xl mx-auto">
            Consolidate your finances. Unlock capital. Build legal trust infrastructure on the blockchain.
          </p>
          <a href="https://app.kura-finance.com" target="_blank" rel="noopener noreferrer" 
             class="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-kura-primary to-kura-secondary text-white font-semibold hover:shadow-lg hover:shadow-kura-primary/50 transition-all duration-300">
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  </div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <div class="inline-block">
          <span class="text-6xl md:text-8xl">🏢</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold leading-tight">
          Treasury Management
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-kura-primary to-kura-secondary">
            for Modern Companies
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
          Consolidate bank accounts, SaaS expenses, and blockchain assets. Get compliance-ready reports without the complexity.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://app.kura-finance.com" target="_blank" rel="noopener noreferrer" class="px-8 py-4 bg-gradient-to-r from-kura-primary to-kura-secondary rounded-lg font-semibold text-white hover:shadow-glow-primary transition-all duration-300 text-lg">
            Launch App
          </a>
          <NuxtLink to="/about" class="px-8 py-4 border border-kura-primary text-kura-primary rounded-lg font-semibold hover:bg-kura-primary hover:text-white transition-all duration-300 text-lg">
            Learn More
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- The Challenge for Startups -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div class="text-center space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold">The Startup Treasury Problem</h2>
        <p class="text-xl text-gray-400">Growing fast means scattered finances.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4 hover:border-kura-primary/30 transition-colors">
          <div class="text-4xl">🏦</div>
          <h3 class="text-xl font-bold">Multiple Bank Accounts</h3>
          <p class="text-gray-400">Operating account. Reserve account. Different currencies for different markets.</p>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4 hover:border-kura-primary/30 transition-colors">
          <div class="text-4xl">💳</div>
          <h3 class="text-xl font-bold">SaaS Subscription Hell</h3>
          <p class="text-gray-400">GCP, AWS, Stripe, GitHub, Linear... dozens of recurring charges scattered across statements.</p>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4 hover:border-kura-primary/30 transition-colors">
          <div class="text-4xl">🔗</div>
          <h3 class="text-xl font-bold">Blockchain Treasury</h3>
          <p class="text-gray-400">Holding ETH, USDC, or DAO tokens on-chain. How do you value it? Where is it tracked?</p>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4 hover:border-kura-primary/30 transition-colors">
          <div class="text-4xl">📋</div>
          <h3 class="text-xl font-bold">Compliance Reporting</h3>
          <p class="text-gray-400">Your accountant needs detailed records. Manual entry and spreadsheets aren't scaling.</p>
        </div>
      </div>
    </section>

    <!-- The Solution -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div class="text-center space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold">Kura Finance: Your Unified Treasury Dashboard</h2>
        <p class="text-xl text-gray-400">One view. All your assets. Complete transparency.</p>
      </div>

      <div class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2">Bank Account Aggregation</h3>
                <p class="text-gray-400">All your business accounts in one place. See total cash position instantly. Drill down by account or currency.</p>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-br from-kura-primary/10 to-kura-secondary/10 rounded-xl p-8 h-64 flex items-center justify-center border border-kura-primary/20">
            <div class="text-center text-gray-400">Interface Preview</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="bg-gradient-to-br from-kura-primary/10 to-kura-secondary/10 rounded-xl p-8 h-64 flex items-center justify-center border border-kura-primary/20">
            <div class="text-center text-gray-400">Interface Preview</div>
          </div>
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2">Blockchain Asset Integration</h3>
                <p class="text-gray-400">Track your on-chain treasury. ETH, USDC, staking rewards, DAO governance tokens. All valued in real-time.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2">SaaS Expense Tracking</h3>
                <p class="text-gray-400">Automatic categorization of recurring charges. See which services eat your budget. Identify cost optimization opportunities.</p>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-br from-kura-primary/10 to-kura-secondary/10 rounded-xl p-8 h-64 flex items-center justify-center border border-kura-primary/20">
            <div class="text-center text-gray-400">Interface Preview</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="bg-gradient-to-br from-kura-primary/10 to-kura-secondary/10 rounded-xl p-8 h-64 flex items-center justify-center border border-kura-primary/20">
            <div class="text-center text-gray-400">Interface Preview</div>
          </div>
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2">Compliance & Audit Ready</h3>
                <p class="text-gray-400">Generate detailed financial reports in seconds. Tax-ready breakdowns. Audit trails for every transaction.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-kura-primary/20 text-kura-primary">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2">Blockchain Notary (Coming Soon)</h3>
                <p class="text-gray-400">Immutable proof of financial state recorded on-chain. Perfect for investor reporting, legal proceedings, and compliance.</p>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-br from-kura-primary/10 to-kura-secondary/10 rounded-xl p-8 h-64 flex items-center justify-center border border-kura-primary/20">
            <div class="text-center text-gray-400">Interface Preview</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div class="text-center space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold">For Startups & LLCs</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
          <div class="text-3xl">🚀</div>
          <h3 class="text-xl font-bold">B2B SaaS Startup</h3>
          <p class="text-gray-400">Operating accounts across US, EU, and APAC. Track ARR and cash burn across currencies in one dashboard.</p>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
          <div class="text-3xl">⚡</div>
          <h3 class="text-xl font-bold">Web3 Protocol DAO</h3>
          <p class="text-gray-400">Manage multi-sig treasury. Track ETH, governance tokens, and staking rewards. Show investors your financial health.</p>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
          <div class="text-3xl">📱</div>
          <h3 class="text-xl font-bold">Indie Developer LLC</h3>
          <p class="text-gray-400">App Store, Play Store, and subscription payments all tracked. Know your actual take-home revenue.</p>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div class="text-center space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold">Why Companies Trust Kura</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary text-lg font-bold">✓</div>
          </div>
          <div>
            <h3 class="font-bold mb-1">Non-Custodial</h3>
            <p class="text-gray-400">Read-only access. We never control company funds. Zero counterparty risk.</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary text-lg font-bold">✓</div>
          </div>
          <div>
            <h3 class="font-bold mb-1">Enterprise Security</h3>
            <p class="text-gray-400">TLS 1.2/1.3 encryption, AES-256 at rest, Zero-trust architecture.</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary text-lg font-bold">✓</div>
          </div>
          <div>
            <h3 class="font-bold mb-1">Compliance Focus</h3>
            <p class="text-gray-400">OFAC compliant. Audit-ready reports. Built for regulators.</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-kura-primary/20 text-kura-primary text-lg font-bold">✓</div>
          </div>
          <div>
            <h3 class="font-bold mb-1">Real-Time Intelligence</h3>
            <p class="text-gray-400">Live data. Instant alerts. Know your financial position every second.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
      <div class="bg-gradient-to-r from-kura-primary/10 to-kura-secondary/10 border border-kura-primary/30 rounded-xl p-12 text-center space-y-6">
        <h2 class="text-3xl md:text-4xl font-bold">Get Your Treasury in Order</h2>
        <p class="text-lg text-gray-400">Consolidate your finances. Simplify compliance. Focus on building.</p>
        <a href="https://app.kura-finance.com" target="_blank" rel="noopener noreferrer" class="inline-block px-8 py-4 bg-gradient-to-r from-kura-primary to-kura-secondary rounded-lg font-semibold text-white hover:shadow-glow-primary transition-all duration-300 text-lg">
          Launch Kura Finance Today
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

useSeoMeta({
  title: 'Enterprise Hybrid Treasury | For Startups & LLCs - Kura Finance',
  description: 'Enterprise-grade treasury management for Web3-native startups and companies. Unify fiat and on-chain assets, unlock capital with KLHS, and secure legal infrastructure with blockchain notarization.',
  keywords: 'enterprise treasury, startup financial management, hybrid finance, Web3 finance, DeFi lending, blockchain notary, KLHS, startup accounting, treasury management software',
  ogTitle: 'Enterprise Hybrid Treasury for Startups & LLCs',
  ogDescription: 'Unify fiat and on-chain assets. Unlock capital efficiency. Build enterprise trust infrastructure on blockchain.',
  ogUrl: 'https://kura-finance.com/startups-llcs',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Enterprise Hybrid Treasury for Startups - Kura Finance'
});
</script>

<style scoped>
section {
  position: relative;
}
</style>
