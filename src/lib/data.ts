import { count, desc, asc } from "drizzle-orm";
import { db } from "@/db";
import { events, galleryAlbums, notices, results } from "@/db/schema";
import { ALBUMS_SEED, EVENTS_SEED, NOTICES_SEED, RESULTS_SEED } from "@/lib/content";

type Seeded = { done?: Promise<void> };
const g = globalThis as typeof globalThis & { __ksraSeed?: Seeded };

async function seedIfEmpty() {
  const [n] = await db.select({ c: count() }).from(notices);
  if (n.c === 0) await db.insert(notices).values(NOTICES_SEED);
  const [e] = await db.select({ c: count() }).from(events);
  if (e.c === 0) await db.insert(events).values(EVENTS_SEED);
  const [r] = await db.select({ c: count() }).from(results);
  if (r.c === 0) await db.insert(results).values(RESULTS_SEED);
  const [a] = await db.select({ c: count() }).from(galleryAlbums);
  if (a.c === 0) await db.insert(galleryAlbums).values(ALBUMS_SEED);
}

async function ready() {
  g.__ksraSeed ??= {};
  g.__ksraSeed.done ??= seedIfEmpty().catch((err) => {
    g.__ksraSeed = undefined;
    throw err;
  });
  return g.__ksraSeed.done;
}

export async function getNotices(limit?: number) {
  try {
    await ready();
    const q = db.select().from(notices).orderBy(desc(notices.pinned), desc(notices.publishedAt));
    return limit ? await q.limit(limit) : await q;
  } catch {
    const rows = NOTICES_SEED.map((n, i) => ({ id: i + 1, ...n }));
    return limit ? rows.slice(0, limit) : rows;
  }
}

export async function getEvents() {
  try {
    await ready();
    return await db.select().from(events).orderBy(asc(events.startDate));
  } catch {
    return EVENTS_SEED.map((e, i) => ({ id: i + 1, ...e })).sort((a, b) => a.startDate.localeCompare(b.startDate));
  }
}

export async function getResults() {
  try {
    await ready();
    return await db.select().from(results).orderBy(desc(results.year), asc(results.id));
  } catch {
    return RESULTS_SEED.map((r, i) => ({ id: i + 1, ...r }));
  }
}

export async function getAlbums() {
  try {
    await ready();
    return await db.select().from(galleryAlbums).orderBy(desc(galleryAlbums.year), asc(galleryAlbums.id));
  } catch {
    return ALBUMS_SEED.map((a, i) => ({ id: i + 1, ...a }));
  }
}
