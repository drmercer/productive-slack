import { assertNever } from '../util/assert';

export type SerializedFocusEvent = [ts: number, type: 'f', focused: boolean]

export type SerializedEvent =
  | SerializedFocusEvent

export interface FocusEvent {
  type: 'focus'
  timestamp: Date
  focused: boolean
}
export type Event =
  | FocusEvent

export function serializeEvent(e: Event): SerializedEvent {
  switch (e.type) {
    case 'focus':
      return [e.timestamp.getTime(), 'f', e.focused];
    default:
      assertNever(e.type);
  }
}

export function deserializeEvent(e: SerializedEvent): Event {
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
