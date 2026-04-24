"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ComingSoonCardProps {
  description: string;
}

export default function ComingSoonCard({ description }: ComingSoonCardProps) {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      <Card className="w-full max-w-xl bg-[#0B0B0F]">
        <CardHeader className="items-center text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8B5CF6]/20 mb-2">
            <svg className="w-8 h-8 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6m-6-6h-6" />
            </svg>
          </div>
          <CardTitle className="text-3xl">Coming Soon</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-gray-500">
          We&apos;re working hard to bring you this feature
        </CardContent>
      </Card>
    </div>
  );
}
