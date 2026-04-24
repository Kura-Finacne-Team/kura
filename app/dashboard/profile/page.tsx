"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/useAppStore';

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, setDisplayName } = useAppStore();

  const [displayName, setDisplayNameInput] = useState(userProfile.displayName);
  const [email] = useState(userProfile.email);
  const [appearance, setAppearance] = useState<'light' | 'dark'>('dark');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log('Profile picture upload:', file);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      if (displayName !== userProfile.displayName) {
        await setDisplayName(displayName);
      }

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full pb-10 px-8 pt-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => router.back()} variant="ghost" className="mb-4 px-0 text-gray-400 hover:text-white hover:bg-transparent">
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account information and preferences</p>
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

        <Card className="mb-8 bg-[#0B0B0F]">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center overflow-hidden flex-shrink-0">
                {userProfile.avatarUrl ? (
                  <Image src={userProfile.avatarUrl} alt="Avatar" width={96} height={96} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-white">{userProfile.displayName?.charAt(0).toUpperCase() || 'U'}</span>
                )}
              </div>
              <div className="flex-1">
                <Button asChild variant="secondary">
                  <label className="cursor-pointer">
                    Upload Image
                    <Input type="file" accept="image/*" onChange={handleProfilePictureUpload} className="hidden" />
                  </label>
                </Button>
                <p className="text-gray-400 text-sm mt-2">JPG, PNG or GIF (Max 5MB)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-[#0B0B0F]">
          <CardHeader>
            <CardTitle>Email Address</CardTitle>
          </CardHeader>
          <CardContent>
            <Input type="email" value={email} disabled className="text-gray-400" />
            <CardDescription className="mt-2">
              Your email cannot be changed. Please contact support if you need to update it.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-[#0B0B0F]">
          <CardHeader>
            <CardTitle>Display Name</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayNameInput(e.target.value)}
              placeholder="Enter your display name"
            />
            <CardDescription className="mt-2">
              This is how your name appears across the platform
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-[#0B0B0F]">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                type="button"
                variant={appearance === 'dark' ? 'secondary' : 'outline'}
                className="h-auto justify-start p-4"
                onClick={() => setAppearance('dark')}
              >
                <div className="text-left">
                  <p className="text-white font-medium">Dark Mode</p>
                  <p className="text-gray-400 text-sm">Easier on the eyes at night</p>
                </div>
              </Button>
              <Button
                type="button"
                variant={appearance === 'light' ? 'secondary' : 'outline'}
                className="h-auto justify-start p-4"
                onClick={() => setAppearance('light')}
              >
                <div className="text-left">
                  <p className="text-white font-medium">Light Mode</p>
                  <p className="text-gray-400 text-sm">Bright and clean interface</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={() => router.back()} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
