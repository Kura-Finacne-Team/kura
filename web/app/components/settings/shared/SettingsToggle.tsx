import React from 'react';

interface SettingsToggleProps {
  checked: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function SettingsToggle({ checked, onClick, disabled = false }: SettingsToggleProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-11 h-6 rounded-full relative transition-colors focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed ${
        checked ? 'bg-[#8B5CF6]' : 'bg-[#0B0B0F] border border-white/10'
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-md ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
