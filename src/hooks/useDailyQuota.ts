import { useCallback, useSyncExternalStore } from "react";
import {
  canProcess,
  getDailyLimit,
  getRemainingCount,
  getUsedCount,
  incrementUsage,
} from "../utils/quota";

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

let snapshotCache = {
  used: getUsedCount(),
  remaining: getRemainingCount(),
  limit: getDailyLimit(),
  canProcess: canProcess(),
};

function getSnapshot() {
  const used = getUsedCount();
  if (used !== snapshotCache.used) {
    snapshotCache = {
      used,
      remaining: getRemainingCount(),
      limit: getDailyLimit(),
      canProcess: canProcess(),
    };
  }
  return snapshotCache;
}

export function useDailyQuota() {
  const quota = useSyncExternalStore(subscribe, getSnapshot);

  const recordUsage = useCallback(() => {
    incrementUsage();
    snapshotCache = {
      used: getUsedCount(),
      remaining: getRemainingCount(),
      limit: getDailyLimit(),
      canProcess: canProcess(),
    };
    emitChange();
  }, []);

  return { ...quota, recordUsage };
}
