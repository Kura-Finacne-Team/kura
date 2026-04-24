"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

export default function SecurityPage() {
  const router = useRouter();
  const changePassword = useAppStore((state) => state.changePassword);

  const [activeTab, setActiveTab] = useState<'passkeys' | '2fa' | 'password'>('passkeys');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      return;
    }
    try {
      setIsLoading(true);
      setErrorMessage('');
      await changePassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setSuccessMessage('Password changed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      setErrorMessage('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full pb-10 px-8 pt-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="ghost" className="mb-4 px-0 text-gray-400 hover:text-white hover:bg-transparent">
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Security Settings</h1>
          <p className="text-gray-400 mt-2">Manage your security preferences and authentication methods</p>
        </div>

        {successMessage && (
          <Alert variant="success" className="mb-6">
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        {errorMessage && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="mb-8 flex gap-2 border-b border-white/10 pb-2">
          {[
            { key: 'passkeys', label: 'Passkeys' },
            { key: '2fa', label: 'Two-Factor Auth' },
            { key: 'password', label: 'Password' },
          ].map((tab) => (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'passkeys' | '2fa' | 'password')}
              variant={activeTab === tab.key ? 'secondary' : 'ghost'}
              className={cn(activeTab === tab.key ? 'text-[#C4B5FD]' : 'text-gray-400')}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === 'passkeys' && (
          <Card className="bg-[#0B0B0F]">
            <CardHeader>
              <CardTitle>Passkeys</CardTitle>
              <CardDescription>
                Passkey management is not available yet. This page now only shows implemented security features.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {activeTab === '2fa' && (
          <Card className="bg-[#0B0B0F]">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                2FA setup is not available yet. This page now only shows implemented security features.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {activeTab === 'password' && (
          <Card className="bg-[#0B0B0F]">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
                <p className="text-gray-400 text-sm mt-2">At least 8 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={handleChangePassword} disabled={isLoading}>
                  {isLoading ? 'Changing...' : 'Change Password'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
