import browser from 'webextension-polyfill';
import { SerializedEvent, serializeEvent, Event, deserializeEvent } from './event';

const store = browser.storage.local;

export interface StoreData {
  events: SerializedEvent[]
}

const defaults: StoreData = {
  events: [],
}

async function getStoreDataKey<K extends (keyof StoreData & string)>(key: K): Promise<StoreData[K]> {
  return (await store.get({
    [key]: defaults[key],
  }))[key];
}

async function setStoreDataKey<K extends (keyof StoreData & string)>(key: K, value: StoreData[K]) {
  return store.set({
    [key]: value,
  });
}

export async function recordEvent(e: Event): Promise<void> {
  const events = await getStoreDataKey('events');
  events.push(serializeEvent(e));
  setStoreDataKey('events', events);
}

export async function getEvents(): Promise<Event[]> {
  const serialized = await getStoreDataKey('events');
  return serialized.map(deserializeEvent);
}