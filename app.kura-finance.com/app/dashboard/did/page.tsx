"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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

    // 待辦：實作頭像上傳
    console.log('Profile picture upload:', file);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      // 更新顯示名稱
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
        {/* 頁面標題 */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account information and preferences</p>
        </div>

        {/* 訊息區 */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {/* 頭像區塊 */}
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-[#0B0B0F]">
          <h2 className="text-lg font-semibold text-white mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center overflow-hidden flex-shrink-0">
              {userProfile.avatarUrl ? (
                <Image src={userProfile.avatarUrl} alt="Avatar" width={96} height={96} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {userProfile.displayName?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div className="flex-1">
              <label className="inline-block px-4 py-2 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#8B5CF6] cursor-pointer transition-colors text-sm font-medium">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
              </label>
              <p className="text-gray-400 text-sm mt-2">JPG, PNG or GIF (Max 5MB)</p>
            </div>
          </div>
        </div>

        {/* 電子郵件區塊 */}
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-[#0B0B0F]">
          <h2 className="text-lg font-semibold text-white mb-4">Email Address</h2>
          <div>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
            />
            <p className="text-gray-400 text-sm mt-2">Your email cannot be changed. Please contact support if you need to update it.</p>
          </div>
        </div>

        {/* 顯示名稱區塊 */}
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-[#0B0B0F]">
          <h2 className="text-lg font-semibold text-white mb-4">Display Name</h2>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayNameInput(e.target.value)}
            placeholder="Enter your display name"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
          />
          <p className="text-gray-400 text-sm mt-2">This is how your name appears across the platform</p>
        </div>

        {/* 外觀區塊 */}
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-[#0B0B0F]">
          <h2 className="text-lg font-semibold text-white mb-4">Appearance</h2>
          <div className="space-y-3">
            {/* 深色模式 */}
            <label className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
              <input
                type="radio"
                name="appearance"
                value="dark"
                checked={appearance === 'dark'}
                onChange={(e) => setAppearance(e.target.value as 'light' | 'dark')}
                className="w-4 h-4 rounded-full"
              />
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-gray-400 text-sm">Easier on the eyes at night</p>
              </div>
            </label>

            {/* 淺色模式 */}
            <label className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
              <input
                type="radio"
                name="appearance"
                value="light"
                checked={appearance === 'light'}
                onChange={(e) => setAppearance(e.target.value as 'light' | 'dark')}
                className="w-4 h-4 rounded-full"
              />
              <div>
                <p className="text-white font-medium">Light Mode</p>
                <p className="text-gray-400 text-sm">Bright and clean interface</p>
              </div>
            </label>
          </div>
        </div>

        {/* 儲存按鈕 */}
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#8B5CF6]/80 text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
