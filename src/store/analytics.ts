import { beginningOfDay } from "../util/date";
import { Predicate } from "../util/function";
import { includesProperties } from "../util/object";
import { FocusPEvent, PEvent } from "./event";

export interface Duration<T> {
  start: T
  end: T
}

export function getDurations<T>(events: T[], isStart: Predicate<T>, isEnd: Predicate<T>): Duration<T>[] {
  let currentStart: T | undefined = undefined;
  const durations: Duration<T>[] = [];
  for (const e of events) {
    if (!currentStart) {
      if (isStart(e)) {
        // begin
        currentStart = e;
      }
    } else if (isEnd(e)) {
      durations.push({
        start: currentStart,
        end: e,
      })
      currentStart = undefined;
    }
  }
  return durations;
}

export function getDurationMagnitudeMs(d: Duration<PEvent>): number {
  return d.end.timestamp.getTime() - d.start.timestamp.getTime();
}

export interface DurationStats {
  count: number
  totalMs: number
  avgMs: number
}

export function getDurationStats(durations: Duration<PEvent>[]): DurationStats {
  const count = durations.length;
  const totalMs = durations.reduce((acc, d) => acc + getDurationMagnitudeMs(d), 0);
  const avgMs = totalMs / count;
  return {
    count,
    totalMs,
    avgMs,
  }
}

export function computeFocusedStats(events: PEvent[]): DurationStats {
  return getDurationStats(getFocusedDurations(events))
}

export function getFocusedDurations(events: PEvent[]): Duration<FocusPEvent>[] {
  return getDurations(
    events.filter(e => e.type === 'focus'),
    includesProperties({ focused: true }),
    includesProperties({ focused: false })
  );
}

export function getTodaysEvents(events: PEvent[]): PEvent[] {
  const today = beginningOfDay();
  return events.filter(e => e.timestamp > today);
}
