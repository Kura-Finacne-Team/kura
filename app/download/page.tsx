"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type DeviceType = 'ios' | 'android' | 'desktop' | 'unknown';

function detectDeviceType(): DeviceType {
  if (typeof navigator === 'undefined') return 'unknown';
  const userAgent = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (/android/.test(userAgent)) return 'android';
  if (/windows|mac|linux/.test(userAgent)) return 'desktop';
  return 'unknown';
}

function FeatureList() {
  return (
    <div className="space-y-4 pt-8 border-t border-white/10">
      <h2 className="text-xl font-bold">Features</h2>
      <ul className="space-y-3 text-gray-400">
        <li className="flex items-center gap-3">
          <span className="text-[#8B5CF6] text-xl">✓</span>
          Connect Bank Accounts (Plaid)
        </li>
        <li className="flex items-center gap-3">
          <span className="text-[#8B5CF6] text-xl">✓</span>
          Real-time Transaction Tracking
        </li>
        <li className="flex items-center gap-3">
          <span className="text-[#8B5CF6] text-xl">✓</span>
          Crypto Asset Management
        </li>
        <li className="flex items-center gap-3">
          <span className="text-[#8B5CF6] text-xl">✓</span>
          Asset Analysis Dashboard
        </li>
      </ul>
    </div>
  );
}

export default function DownloadPage() {
  const [deviceType] = useState<DeviceType>(detectDeviceType);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col">
      <header className="border-b border-[#1A1A24] bg-[#0B0B0F]/80 backdrop-blur-md p-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Image src="/logo.svg" alt="Kura Logo" width={32} height={32} className="w-8 h-8" />
          <span className="text-lg font-bold">Kura</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        {deviceType === 'ios' && (
          <Card className="w-full max-w-md bg-[#0B0B0F] border-white/10">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Image src="/ios/AppIcon.appiconset/icon-180.png" alt="Kura iOS App" width={120} height={120} className="rounded-3xl shadow-2xl" />
              </div>
              <CardTitle className="text-4xl">Kura Finance</CardTitle>
              <CardDescription className="text-base">
                Manage all your finances in one place, from traditional banking to crypto assets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full h-12 text-base">
                <a href="https://apps.apple.com/app/kura-finance/id6503625647" target="_blank" rel="noopener noreferrer">
                  Download on the App Store
                </a>
              </Button>
              <p className="text-center text-sm text-gray-500">iOS 14.0 or later</p>
              <FeatureList />
            </CardContent>
          </Card>
        )}

        {deviceType === 'android' && (
          <Card className="w-full max-w-md bg-[#0B0B0F] border-white/10">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Image src="/android/mipmap-xxxhdpi/ic_launcher.png" alt="Kura Android App" width={120} height={120} className="rounded-3xl shadow-2xl" />
              </div>
              <CardTitle className="text-4xl">Kura Finance</CardTitle>
              <CardDescription className="text-base">
                Manage all your finances in one place, from traditional banking to crypto assets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full h-12 text-base">
                <a href="https://play.google.com/store/apps/details?id=com.kurafinance.app" target="_blank" rel="noopener noreferrer">
                  Download on Google Play
                </a>
              </Button>
              <p className="text-center text-sm text-gray-500">Android 8.0 or later</p>
              <FeatureList />
            </CardContent>
          </Card>
        )}

        {deviceType === 'desktop' && (
          <div className="w-full max-w-2xl space-y-8">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-5xl font-bold tracking-tight">Kura Finance</h1>
              <p className="text-gray-400 text-xl">
                Manage all your financial assets in one place, from traditional banking to crypto assets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-[#1A1A24]/40 to-[#0B0B0F]/40 border-white/10 hover:border-[#8B5CF6]/30">
                <CardHeader className="items-center text-center">
                  <Image src="/ios/AppIcon.appiconset/icon-180.png" alt="Kura iOS App" width={100} height={100} className="rounded-2xl" />
                  <CardTitle className="text-2xl mt-2">iOS</CardTitle>
                  <CardDescription>iPhone and iPad</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="https://apps.apple.com/app/kura-finance/id6503625647" target="_blank" rel="noopener noreferrer">
                      Download on the App Store
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#1A1A24]/40 to-[#0B0B0F]/40 border-white/10 hover:border-[#8B5CF6]/30">
                <CardHeader className="items-center text-center">
                  <Image src="/android/mipmap-xxxhdpi/ic_launcher.png" alt="Kura Android App" width={100} height={100} className="rounded-2xl" />
                  <CardTitle className="text-2xl mt-2">Android</CardTitle>
                  <CardDescription>Android phones and tablets</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="https://play.google.com/store/apps/details?id=com.kurafinance.app" target="_blank" rel="noopener noreferrer">
                      Download on Google Play
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-[#8B5CF6]/30 bg-[#8B5CF6]/5 text-center">
              <CardHeader>
                <CardTitle>Or Use the Web App</CardTitle>
                <CardDescription>
                  You can also access the Kura Finance web version directly in your browser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/dashboard">Enter Web App</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {deviceType === 'unknown' && (
          <Card className="w-full max-w-md text-center bg-[#0B0B0F] border-white/10">
            <CardHeader>
              <CardTitle className="text-4xl">Kura Finance</CardTitle>
              <CardDescription className="text-base">
                Download our app or use the web version to manage all your finances in one place, from traditional banking to crypto assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-gray-400">
                Detecting device...
              </Badge>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="border-t border-[#1A1A24] bg-[#0B0B0F]/50 p-6">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          © 2026 Kura Finance. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
