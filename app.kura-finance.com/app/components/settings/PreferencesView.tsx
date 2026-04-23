// 偏好設定檢視
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import SettingsSection from './shared/SettingsSection';
import SettingsToggle from './shared/SettingsToggle';

export default function PreferencesView({ variants }: { variants: Variants }) {
  const preferences = useAppStore(state => state.preferences);
  const setBaseCurrency = useAppStore(state => state.setBaseCurrency);
  const toggleLargeTransactionAlerts = useAppStore(state => state.toggleLargeTransactionAlerts);
  const toggleWeeklyAiSummary = useAppStore(state => state.toggleWeeklyAiSummary);

  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} className="absolute inset-0 px-6 py-6 space-y-8">
      <SettingsSection title="Display">
        <div className="flex justify-between items-center p-4 rounded-xl bg-[#1A1A24] border border-white/5">
          <div className="text-white font-medium">Base Currency</div>
          <select value={preferences.baseCurrency} onChange={(e) => setBaseCurrency(e.target.value as 'USD' | 'EUR' | 'TWD')} className="bg-transparent text-[#A78BFA] text-right font-medium focus:outline-none cursor-pointer">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="TWD">TWD (NT$)</option>
          </select>
        </div>
      </SettingsSection>
      <SettingsSection title="Notifications">
        <div className="space-y-2">
          <div className="flex justify-between items-center p-4 rounded-xl bg-[#1A1A24] border border-white/5">
            <div>
              <div className="text-white font-medium">Large Transactions</div>
              {/* 這裡把 > 換成 &gt; 以避免 JSX 解析錯誤 */}
              <div className="text-xs text-gray-500 mt-0.5">Alert on spends &gt; $500</div>
            </div>
            <SettingsToggle checked={preferences.largeTransactionAlerts} onClick={toggleLargeTransactionAlerts} />
          </div>
          <div className="flex justify-between items-center p-4 rounded-xl bg-[#1A1A24] border border-white/5">
            <div>
              <div className="text-white font-medium">Weekly AI Summary</div>
              <div className="text-xs text-gray-500 mt-0.5">Kura&apos;s financial insights via email</div>
            </div>
            <SettingsToggle checked={preferences.weeklyAiSummary} onClick={toggleWeeklyAiSummary} />
          </div>
        </div>
      </SettingsSection>
    </motion.div>
  );
}