import React from 'react';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <section>
      <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">{title}</div>
      {children}
    </section>
  );
}
