"use client";

import React, { useMemo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useAccount, useBalance, useChainId, useChains } from 'wagmi';
import { formatUnits } from 'viem';
import ConnectAccountModal from '@/components/ConnectAccountModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinanceStore } from '@/store/useFinanceStore';
import { useWeb3WalletStore } from '@/store/useWeb3WalletStore';
import { useExchangeStore } from '@/store/useExchangeStore';

const CHART_COLORS = ['#8B5CF6', '#6366F1', '#EC4899', '#3B82F6', '#A855F7', '#14B8A6'];

export default function InvestmentPage() {
  const financeInvestmentAccounts = useFinanceStore((state) => state.investmentAccounts);
  const financeInvestments = useFinanceStore((state) => state.investments);
  const syncConnectedWalletPosition = useFinanceStore((state) => state.syncConnectedWalletPosition);
  const removeConnectedWalletPosition = useFinanceStore((state) => state.removeConnectedWalletPosition);

  const walletAccounts = useWeb3WalletStore((state) => state.walletAccounts);
  const walletInvestments = useWeb3WalletStore((state) => state.walletInvestments);
  const clearWeb3Wallet = useWeb3WalletStore((state) => state.clearAll);
  const addWalletPosition = useWeb3WalletStore((state) => state.addWalletPosition);

  const exchangeInvestmentAccounts = useExchangeStore((state) => state.exchangeInvestmentAccounts);
  const exchangeInvestments = useExchangeStore((state) => state.exchangeInvestments);

  const investmentAccounts = useMemo(
    () => [...financeInvestmentAccounts, ...walletAccounts, ...exchangeInvestmentAccounts],
    [financeInvestmentAccounts, walletAccounts, exchangeInvestmentAccounts],
  );

  const investments = useMemo(
    () => [...financeInvestments, ...walletInvestments, ...exchangeInvestments],
    [financeInvestments, walletInvestments, exchangeInvestments],
  );

  const chains = useChains();
  const chainId = useChainId();
  const { address, isConnected } = useAccount();
  const { data: nativeBalanceData } = useBalance({
    address,
    chainId,
    query: { enabled: Boolean(address && isConnected) },
  });
  const lastConnectedWalletRef = useRef<{ address: string; chainId: number } | null>(null);

  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  useEffect(() => {
    if (!isConnected || !address || !nativeBalanceData) return;

    const activeChainName = chains.find((chain) => chain.id === chainId)?.name ?? `Chain ${chainId}`;
    const nativeBalance = Number(formatUnits(nativeBalanceData.value, nativeBalanceData.decimals));
    if (!Number.isFinite(nativeBalance)) return;

    void syncConnectedWalletPosition({
      address,
      chainId,
      chainName: activeChainName,
      nativeSymbol: nativeBalanceData.symbol,
      nativeBalance,
    });

    const normalizedAddress = address.toLowerCase();
    const accountId = `wallet-${chainId}-${normalizedAddress}`;
    const investmentId = `wallet-native-${chainId}-${normalizedAddress}`;

    addWalletPosition(
      {
        id: accountId,
        name: `${activeChainName} Wallet`,
        type: 'Web3 Wallet',
        logo: 'https://www.google.com/s2/favicons?domain=walletconnect.com&sz=128',
      },
      {
        id: investmentId,
        accountId,
        symbol: nativeBalanceData.symbol,
        name: activeChainName,
        holdings: nativeBalance,
        currentPrice: 0,
        change24h: 0,
        type: 'crypto',
        logo: 'https://www.google.com/s2/favicons?domain=ethereum.org&sz=128',
      },
    );

    lastConnectedWalletRef.current = { address, chainId };
  }, [address, chainId, chains, isConnected, nativeBalanceData, syncConnectedWalletPosition, addWalletPosition]);

  useEffect(() => {
    if (isConnected) return;
    const last = lastConnectedWalletRef.current;
    if (!last) return;
    removeConnectedWalletPosition(last.address, last.chainId);
    clearWeb3Wallet();
    lastConnectedWalletRef.current = null;
  }, [isConnected, removeConnectedWalletPosition, clearWeb3Wallet]);

  const brokersWithBalances = useMemo(() => {
    return investmentAccounts.map((account) => {
      const accountAssets = investments.filter((inv) => inv.accountId === account.id);
      const balance = accountAssets.reduce((sum, inv) => sum + inv.holdings * inv.currentPrice, 0);
      return { ...account, balance };
    });
  }, [investmentAccounts, investments]);

  const enrichedInvestments = useMemo(() => {
    const withValues = investments.map((inv) => {
      const value = inv.holdings * inv.currentPrice;
      const previousValue = value / (1 + inv.change24h / 100);
      const changeUsd = value - previousValue;
      return { ...inv, value, changeUsd };
    });

    const totalValue = withValues.reduce((sum, inv) => sum + inv.value, 0);
    const totalChangeUsd = withValues.reduce((sum, inv) => sum + inv.changeUsd, 0);
    const denominator = totalValue - totalChangeUsd;
    const totalChangePercent = denominator === 0 ? 0 : (totalChangeUsd / denominator) * 100;

    const finalInvestments = withValues
      .sort((a, b) => b.value - a.value)
      .reduce<
        (typeof withValues[number] & {
          percentage: number;
          color: string;
          startDegree: number;
          endDegree: number;
        })[]
      >((acc, inv, index) => {
        const percentage = totalValue === 0 ? 0 : (inv.value / totalValue) * 100;
        const degrees = (percentage / 100) * 360;
        const startDegree = index === 0 ? 0 : acc[index - 1].endDegree;
        const endDegree = startDegree + degrees;
        return [...acc, { ...inv, percentage, color: CHART_COLORS[index % CHART_COLORS.length], startDegree, endDegree }];
      }, []);

    return { assets: finalInvestments, totalValue, totalChangeUsd, totalChangePercent };
  }, [investments]);

  const { assets, totalValue, totalChangeUsd, totalChangePercent } = enrichedInvestments;
  const conicGradientString = assets.map((asset) => `${asset.color} ${asset.startDegree}deg ${asset.endDegree}deg`).join(', ');
  const activeHoverData = hoveredAsset ? assets.find((a) => a.id === hoveredAsset) : null;
  const cryptoAssets = assets.filter((inv) => inv.type === 'crypto');
  const stockAssets = assets.filter((inv) => inv.type === 'stock');

  return (
    <div className="max-w-6xl mx-auto pb-10 animate-in fade-in duration-500">
      <ConnectAccountModal isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Portfolio</h1>
        <p className="text-gray-400 mt-1">Track your crypto and stock investments.</p>
      </div>

      <Card className="w-full mb-6 relative overflow-hidden bg-[#1A1A24] border-white/5">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8B5CF6]/20 to-[#6366F1]/20 blur-3xl rounded-full" />

          <div className="relative z-10 shrink-0">
            <div
              className="w-48 h-48 rounded-full relative shadow-[0_0_30px_rgba(139,92,246,0.15)] flex items-center justify-center transition-transform duration-300 hover:scale-105"
              style={{ background: `conic-gradient(${conicGradientString})` }}
            >
              <div className="absolute inset-2 rounded-full bg-[#1A1A24] flex flex-col items-center justify-center text-center p-4">
                {activeHoverData ? (
                  <div className="animate-in fade-in duration-200">
                    <div className="text-sm font-bold text-gray-400 mb-1" style={{ color: activeHoverData.color }}>
                      {activeHoverData.symbol}
                    </div>
                    <div className="text-2xl font-bold text-white tracking-tight">{activeHoverData.percentage.toFixed(1)}%</div>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-200">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Holdings</div>
                    <div className="text-xl font-bold text-white tracking-tight">{assets.length}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col items-start w-full">
            <div className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">Total Balance</div>
            <div className="text-5xl font-bold text-white tracking-tight mb-3">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Badge variant={totalChangeUsd >= 0 ? 'success' : 'destructive'} className="text-sm px-2.5 py-1">
                {totalChangeUsd >= 0 ? '↑' : '↓'}${Math.abs(totalChangeUsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                ({Math.abs(totalChangePercent).toFixed(2)}%)
              </Badge>
              <span className="text-gray-500 text-sm">Past 24 hours</span>
            </div>

            <div className="flex flex-wrap gap-2 w-full max-w-md">
              {assets.map((asset) => (
                <Button
                  key={asset.id}
                  onMouseEnter={() => setHoveredAsset(asset.id)}
                  onMouseLeave={() => setHoveredAsset(null)}
                  variant="outline"
                  size="sm"
                  className="bg-[#0B0B0F]/50 border-white/5 hover:border-white/20"
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: asset.color }} />
                  <span className="text-xs font-medium text-gray-300">{asset.symbol}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="w-full mb-8">
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 px-2 -mx-2 hide-scrollbar space-x-4">
          {brokersWithBalances.map((broker) => (
            <Card
              key={broker.id}
              className="snap-start shrink-0 w-[220px] bg-[#0B0B0F] border-white/5 p-4 transition-all duration-300 hover:border-[#8B5CF6]/50"
            >
              <CardContent className="p-0 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 p-2 flex items-center justify-center">
                    <Image src={broker.logo} alt={broker.name} width={24} height={24} className="object-contain rounded-full" />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                    {broker.type}
                  </Badge>
                </div>
                <div>
                  <div className="text-white font-bold text-xl mb-0.5">
                    ${broker.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{broker.name}</div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => setIsConnectModalOpen(true)}
            variant="outline"
            className="snap-start shrink-0 w-[220px] h-auto rounded-2xl border-2 border-dashed border-[#1A1A24] bg-[#0B0B0F]/50 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/5"
          >
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#1A1A24] flex items-center justify-center mb-3">
                <span className="text-[#A78BFA] text-xl">+</span>
              </div>
              <span className="text-gray-300 font-medium">Connect Account</span>
              <span className="text-[10px] text-gray-600 mt-1 font-mono uppercase tracking-widest">Broker / Wallet</span>
            </div>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#0B0B0F] border-white/5">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="text-[#8B5CF6]">₿</span> Crypto
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-white">
              Manage
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {cryptoAssets.map((asset) => {
              const holdingBroker = investmentAccounts.find((acc) => acc.id === asset.accountId);
              return (
                <div
                  key={asset.id}
                  onMouseEnter={() => setHoveredAsset(asset.id)}
                  onMouseLeave={() => setHoveredAsset(null)}
                  className={`flex justify-between items-center p-4 rounded-2xl bg-[#1A1A24] border transition-colors cursor-pointer ${hoveredAsset === asset.id ? 'border-[#8B5CF6]/50 bg-white/5' : 'border-white/5 hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute -inset-0.5 rounded-full opacity-50" style={{ backgroundColor: asset.color }} />
                      <div className="relative w-10 h-10 rounded-full bg-[#1A1A24] p-2 flex items-center justify-center">
                        <Image src={asset.logo} alt={asset.symbol} width={24} height={24} className="object-contain" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-white font-medium">{asset.symbol}</div>
                        <div className="text-xs text-gray-500 font-medium">({holdingBroker?.name})</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {asset.holdings} {asset.symbol}
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                          {asset.percentage.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      ${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-sm font-medium ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change24h >= 0 ? '+' : ''}
                      {asset.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="bg-[#0B0B0F] border-white/5">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="text-[#8B5CF6]">📈</span> Stocks & ETFs
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-white">
              Manage
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {stockAssets.map((asset) => {
              const holdingBroker = investmentAccounts.find((acc) => acc.id === asset.accountId);
              return (
                <div
                  key={asset.id}
                  onMouseEnter={() => setHoveredAsset(asset.id)}
                  onMouseLeave={() => setHoveredAsset(null)}
                  className={`flex justify-between items-center p-4 rounded-2xl bg-[#1A1A24] border transition-colors cursor-pointer ${hoveredAsset === asset.id ? 'border-[#8B5CF6]/50 bg-white/5' : 'border-white/5 hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute -inset-0.5 rounded-full opacity-50" style={{ backgroundColor: asset.color }} />
                      <div className="relative w-10 h-10 rounded-full bg-white p-1.5 flex items-center justify-center">
                        <Image src={asset.logo} alt={asset.symbol} width={24} height={24} className="object-contain" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-white font-medium">{asset.symbol}</div>
                        <div className="text-xs text-gray-500 font-medium">({holdingBroker?.name})</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {asset.holdings} Shares
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                          {asset.percentage.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      ${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-sm font-medium ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change24h >= 0 ? '+' : ''}
                      {asset.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
