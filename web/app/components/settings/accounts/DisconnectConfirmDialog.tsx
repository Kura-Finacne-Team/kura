import React from 'react';
import { PendingDisconnect } from './types';

interface DisconnectConfirmDialogProps {
  pendingDisconnect: PendingDisconnect | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DisconnectConfirmDialog({
  pendingDisconnect,
  onCancel,
  onConfirm,
}: DisconnectConfirmDialogProps) {
  if (!pendingDisconnect) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#111118] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <h4 className="text-white text-base font-semibold">Confirm Disconnect</h4>
        <p className="text-sm text-gray-400 mt-2">
          Disconnect <span className="text-white font-medium">{pendingDisconnect.name}</span>? Related synced data in this app view will be removed.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-2 rounded-lg text-sm text-white bg-red-500/80 hover:bg-red-500 transition-colors"
          >
            Confirm Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
