/**
 * 資產歷史 API 服務
 * 由伺服器提供資產歷史資料給儀表板圖表使用
 */

import { requestJson } from './httpClient';

// ============= 型別定義 =============

export interface AssetHistoryPoint {
  timestamp: string; // ISO 8601 時間字串
  value: number;
  name: string;
  type: string;
}

export interface AssetHistorySummary {
  minValue: number;
  maxValue: number;
  change: number;
  changePercent: number;
}

export interface AssetHistoryResponse {
  userId: string;
  totalAssets: number;
  lastRecordedTime: string | null;
  history: AssetHistoryPoint[];
  summary: AssetHistorySummary;
}

// ============= 請求處理器 =============

async function assetRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  return requestJson<T>(path, options, 'AssetAPI');
}

// ============= 公開 API =============

/**
 * 取得指定天數內的資產歷史資料
 * 取得過去 N 天的資產歷史紀錄，用於儀表板折線圖
 */
export const fetchAssetHistory = (days: number = 30): Promise<AssetHistoryResponse> => {
  return assetRequest<AssetHistoryResponse>(
    `/api/assets/history?days=${days}`,
    { method: 'GET' }
  );
};
