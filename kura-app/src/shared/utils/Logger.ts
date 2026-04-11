// Logger Utility for better debugging
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  data?: any;
}

// 環境級別設定：生產環境只顯示 WARN 和 ERROR，開發環境顯示所有
const LOG_LEVEL: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const MIN_LOG_LEVEL = __DEV__ ? LOG_LEVEL.debug : LOG_LEVEL.warn;

// 用於去重：同一模塊同一條消息在短時間內只記錄一次
const DEDUP_MAP = new Map<string, number>();
const DEDUP_TIMEOUT = 1000; // 1 秒內去重

class Logger {
  private static logs: LogEntry[] = [];
  private static maxLogs = 200;

  static isDuplicate(module: string, message: string): boolean {
    const key = `${module}:${message}`;
    const now = Date.now();
    const lastTime = DEDUP_MAP.get(key) || 0;

    if (now - lastTime < DEDUP_TIMEOUT) {
      return true;
    }

    DEDUP_MAP.set(key, now);
    return false;
  }

  static shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL[level] >= MIN_LOG_LEVEL;
  }

  static log(module: string, message: string, data?: any, level: LogLevel = 'info') {
    // 檢查日誌級別是否應顯示
    if (!this.shouldLog(level)) {
      return;
    }

    // 檢查是否重複
    if (this.isDuplicate(module, message)) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      module,
      message,
      data,
    };

    this.logs.push(entry);

    // Keep logs size manageable
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log to console with styling
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${module}]`;
    const logArgs = [prefix, message];
    if (data !== undefined) {
      logArgs.push(data);
    }

    switch (level) {
      case 'error':
        console.error(...logArgs);
        break;
      case 'warn':
        console.warn(...logArgs);
        break;
      case 'debug':
        if (__DEV__) {
          console.debug(...logArgs);
        }
        break;
      default:
        console.log(...logArgs);
    }
  }

  static debug(module: string, message: string, data?: any) {
    this.log(module, message, data, 'debug');
  }

  static info(module: string, message: string, data?: any) {
    this.log(module, message, data, 'info');
  }

  static warn(module: string, message: string, data?: any) {
    this.log(module, message, data, 'warn');
  }

  static error(module: string, message: string, data?: any) {
    this.log(module, message, data, 'error');
  }

  static getLogs(filter?: { module?: string; level?: LogLevel; limit?: number }): LogEntry[] {
    let filtered = [...this.logs];

    if (filter?.module) {
      filtered = filtered.filter((log) => log.module === filter.module);
    }

    if (filter?.level) {
      filtered = filtered.filter((log) => log.level === filter.level);
    }

    if (filter?.limit) {
      filtered = filtered.slice(-filter.limit);
    }

    return filtered;
  }

  static clearLogs() {
    this.logs = [];
    DEDUP_MAP.clear();
  }

  static exportLogs(): string {
    return this.logs
      .map((log) => `${log.timestamp} [${log.level.toUpperCase()}] ${log.module}: ${log.message} ${log.data ? JSON.stringify(log.data) : ''}`)
      .join('\n');
  }
}

export default Logger;
