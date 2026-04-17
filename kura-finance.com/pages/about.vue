<template>
  <div class="w-full h-auto bg-[#0B0B0F] text-white">
    <!-- Background Ambient Glows -->
    <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none z-0" />
    <div class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3B82F6]/10 blur-[120px] rounded-full pointer-events-none z-0" />

    <!-- Breadcrumb / Back button -->
    <div class="sticky top-0 px-6 py-3 border-b border-white/5 bg-[#0B0B0F]/95 backdrop-blur-md z-20">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit group"
      >
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="text-sm tracking-wide">Back to Home</span>
      </NuxtLink>
    </div>

    <!-- Main content -->
    <main class="relative z-10 w-full px-4 sm:px-6 py-16">
      <div class="w-full max-w-5xl mx-auto">
        <!-- Hero Section -->
        <section class="mb-24">
          <div class="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-xl p-12 sm:p-16 text-center overflow-hidden">
            <div class="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#A78BFA] text-sm font-medium tracking-widest uppercase">
              Institutional-Grade Infrastructure
            </div>
            <h2 class="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight">
              Unify Your <br class="sm:hidden" />
              <span class="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#3B82F6] bg-clip-text text-transparent">
                Financial Reality
              </span>
            </h2>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Kura Finance is the ultimate read-only protocol for personal wealth. We bridge TradFi and Web3, delivering deterministic clarity across your entire portfolio without ever compromising self-sovereignty.
            </p>
          </div>
        </section>

        <!-- Trust & Transparency Section (US Corporate) -->
        <section class="mb-24">
          <div class="rounded-3xl border border-[#8B5CF6]/20 bg-gradient-to-br from-[#1A1A24]/80 to-[#0B0B0F]/80 backdrop-blur-xl p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
            <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#8B5CF6]/10 blur-3xl rounded-full pointer-events-none"></div>
            <div class="flex-1 relative z-10">
              <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <span class="text-2xl">🇺🇸</span> US Corporate Accountability
              </h3>
              <p class="text-gray-300 leading-relaxed mb-4 text-lg">
                Kura Finance LLC is a registered United States corporate entity. We operate strictly under US legal frameworks, ensuring enterprise-grade consumer data privacy and compliance.
              </p>
              <p class="text-gray-400 leading-relaxed">
                As a dedicated technology provider, we maintain a <strong>strict zero-custody architecture</strong>. We are not a broker, and we do not hold your private keys. Your data is protected by US-grade encryption, while the ultimate control of your assets remains entirely in your hands.
              </p>
            </div>
            <div class="hidden md:flex w-32 h-32 rounded-full border border-white/10 items-center justify-center bg-white/5 backdrop-blur-sm relative z-10">
              <span class="text-4xl">🛡️</span>
            </div>
          </div>
        </section>

        <!-- Core Pillars Section -->
        <section class="mb-24">
          <h3 class="text-sm font-bold tracking-widest text-gray-500 uppercase mb-8 text-center">The Core Protocol</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-8">
              <div class="w-12 h-12 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-[#A78BFA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-3 text-white">Absolute Clarity</h3>
              <p class="text-gray-400 leading-relaxed">
                Financial fragmentation is a thing of the past. Our mission is to aggregate disparate data points—from fiat bank accounts to multi-chain smart contracts—into a single, visually coherent source of truth.
              </p>
            </div>

            <div class="rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-8">
              <div class="w-12 h-12 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-[#60A5FA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-3 text-white">Sovereign Security</h3>
              <p class="text-gray-400 leading-relaxed">
                We believe in the core ethos of Web3: Not your keys, not your coins. By operating as a strictly read-only layer, we eliminate counterparty risk, ensuring your assets are never exposed to external vulnerabilities.
              </p>
            </div>
          </div>
        </section>

        <!-- System Capabilities -->
        <section class="mb-24">
          <div class="mb-10">
            <h3 class="text-3xl font-bold">System Capabilities</h3>
          </div>
          <div class="grid md:grid-cols-3 gap-4">
            <div v-for="(feature, index) in capabilities" :key="index" class="rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 p-6 group">
              <div class="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">{{ feature.icon }}</div>
              <h4 class="text-lg font-semibold mb-2 text-gray-200">{{ feature.title }}</h4>
              <p class="text-sm text-gray-500 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </section>

        <!-- Technical Stack Section -->
        <section class="mb-24">
          <div class="rounded-3xl border border-white/5 bg-[#0B0B0F] relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 to-transparent opacity-50"></div>
            <div class="p-10 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h3 class="text-2xl font-bold mb-2">Powered by Modern Stack</h3>
                <p class="text-gray-400 max-w-md">
                  Built on highly scalable, enterprise-ready infrastructure to process complex financial data streams instantly.
                </p>
              </div>
              <div class="flex flex-wrap gap-3 justify-center md:justify-end max-w-md">
                <span v-for="tech in techStack" :key="tech" class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 font-mono">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="mb-20">
          <div class="rounded-3xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent backdrop-blur-xl p-16 text-center relative overflow-hidden">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8B5CF6]/20 via-transparent to-transparent pointer-events-none"></div>
            <h3 class="text-4xl font-bold mb-6 relative z-10">Experience the Overview Effect</h3>
            <p class="text-lg text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
              Join elite users who trust Kura Finance to aggregate, track, and visualize their global net worth.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <NuxtLink
                to="/dashboard"
                class="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Launch Dashboard
              </NuxtLink>
              <NuxtLink
                to="/"
                class="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors"
              >
                Return Home
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- Footer Info -->
        <footer class="pt-10 pb-6 text-center text-gray-600 text-sm font-mono flex flex-col sm:flex-row justify-between items-center border-t border-white/5">
          <p>© 2026 KURA FINANCE LLC. ALL RIGHTS RESERVED.</p>
          <div class="flex items-center gap-2 mt-4 sm:mt-0">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEMS OPERATIONAL
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const capabilities = [
  { title: 'Omnichain Tracking', description: 'Natively index balances across Ethereum, L2s, and alternative EVM networks seamlessly.', icon: '🌐' },
  { title: 'Deterministic Analytics', description: 'Transform raw transaction data into actionable, historically accurate net-worth graphs.', icon: '📈' },
  { title: 'TradFi Integration', description: 'Bank-grade read-only APIs securely fetch data from thousands of global financial institutions.', icon: '🏦' },
  { title: 'Cryptographic Privacy', description: 'End-to-end encryption ensures your financial metadata remains strictly confidential.', icon: '🔐' },
  { title: 'Real-Time Sync', description: 'Continuous block-monitoring and API polling for instantaneous portfolio valuation.', icon: '⚡' },
  { title: 'Zero-Touch Architecture', description: 'A pure dashboard experience. No deposit addresses, no swap routers, zero custody.', icon: '🛡️' },
];

const techStack = ['Nuxt 3', 'Vue 3', 'Cloud Run', 'PostgreSQL', 'Docker', 'Tailwind CSS'];
</script>
