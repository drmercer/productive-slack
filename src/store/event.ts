import { assertNever } from '../util/assert';

export type SerializedFocusPEvent = [ts: number, type: 'f', focused: boolean]

export type SerializedPEvent =
  | SerializedFocusPEvent

export interface FocusPEvent {
  type: 'focus'
  timestamp: Date
  focused: boolean
}

/**
 * Named "P" after "Productive Slack", to differentiate from global JS "Event"
 */
export type PEvent =
  | FocusPEvent

export function serializeEvent(e: PEvent): SerializedPEvent {
  switch (e.type) {
    case 'focus':
      return [e.timestamp.getTime(), 'f', e.focused];
    default:
      assertNever(e.type);
  }
}

export function deserializeEvent(e: SerializedPEvent): PEvent {
  const [ts, type, ...payload] = e;
  switch (type) {
    case 'f':
      return {
        type: 'focus',
        timestamp: new Date(ts),
        focused: payload[0],
      }
    default:
      assertNever(type);
  }
}
