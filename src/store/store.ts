import { log } from './../util/log';
import browser from 'webextension-polyfill';
import { SerializedPEvent, serializeEvent, PEvent, deserializeEvent } from './event';

const store = browser.storage.local;

export interface StoreData {
  events: SerializedPEvent[]
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

export async function recordEvent(e: PEvent): Promise<void> {
  const events = await getStoreDataKey('events');
  events.push(serializeEvent(e));
  await setStoreDataKey('events', events);
}

export async function getEvents(): Promise<PEvent[]> {
  const serialized = await getStoreDataKey('events');
  return serialized.map(deserializeEvent);
}

export async function nukeAllEvents(): Promise<void> {
  if (confirm("Nuke all events?")) {
    await setStoreDataKey('events', []);
    log.info("Nuked all events");
  }
}
