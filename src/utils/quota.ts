const STORAGE_KEY = "nukkitta-quota";
const DAILY_LIMIT = 50;

interface QuotaData {
  date: string;
  count: number;
}

function getTodayKST(): string {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

function getQuotaData(): QuotaData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data: QuotaData = JSON.parse(raw);
      if (data.date === getTodayKST()) return data;
    }
  } catch {
    // corrupted data
  }
  return { date: getTodayKST(), count: 0 };
}

function saveQuotaData(data: QuotaData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getUsedCount(): number {
  return getQuotaData().count;
}

export function getRemainingCount(): number {
  return Math.max(0, DAILY_LIMIT - getQuotaData().count);
}

export function getDailyLimit(): number {
  return DAILY_LIMIT;
}

export function canProcess(): boolean {
  return getRemainingCount() > 0;
}

export function incrementUsage(): number {
  const data = getQuotaData();
  data.count += 1;
  saveQuotaData(data);
  return data.count;
}
