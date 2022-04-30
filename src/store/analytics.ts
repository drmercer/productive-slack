import { Event } from "./event";

interface FocusStats {
  count: number;
  totalMs: number;
}

export function computeFocusedStats(events: Event[]): FocusStats {
  let totalMs = 0;
  let focusCount = 0;
  let focusedAt: number | undefined = undefined;
  for (const e of events) {
    if (e.type === 'focus') {
      if (focusedAt == undefined) {
        if (e.focused) {
          // focused
          focusCount++;
          focusedAt = e.timestamp.getTime();
        }
      } else {
        if (!e.focused) {
          // blurred
          totalMs += e.timestamp.getTime() - focusedAt;
          focusedAt = undefined;
        }
      }
    }
  }
  return {
    totalMs,
    count: focusCount,
  };
}
