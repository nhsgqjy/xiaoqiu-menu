const BASE_URL = 'https://raidjeuelscalljgyzet.supabase.co/rest/v1';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaWRqZXVlbHNjYWxsamd5emV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NzI1ODEsImV4cCI6MjA5ODA0ODU4MX0.70o8zOHYLbIggKu_hsZzK3LUhPFrlGnLCJLP75Dz9P8';

const headers = {
  'apikey': ANON_KEY,
  'Authorization': `Bearer ${ANON_KEY}`,
  'Content-Type': 'application/json',
};

export const TABLES = {
  TODAY_MENU: 'today_menu',
  FAVORITES: 'favorites',
  CART: 'cart',
} as const;

// Lightweight Supabase REST API wrapper (no SDK needed!)
export const supabase = {
  from(table: string) {
    const url = `${BASE_URL}/${table}`;
    return {
      async select(columns = '*') {
        const res = await fetch(`${url}?select=${columns}&order=created_at.asc`, { headers });
        if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
        return { data: await res.json(), error: null };
      },
      async insert(body: Record<string, unknown> | Record<string, unknown>[]) {
        const res = await fetch(url, {
          method: 'POST',
          headers: { ...headers, 'Prefer': 'return=representation' },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
        return { error: null };
      },
      delete() {
        return {
          eq(column: string, value: unknown) {
            return fetch(`${url}?${column}=eq.${value}`, { method: 'DELETE', headers });
          },
          neq(column: string, value: unknown) {
            return fetch(`${url}?${column}=neq.${value}`, { method: 'DELETE', headers });
          },
        };
      },
    };
  },
};

export type SupabaseClient = typeof supabase;

// Fetch all rows from a table
export async function fetchTable(table: string) {
  const res = await fetch(`${BASE_URL}/${table}?select=*&order=created_at.asc`, { headers });
  if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
  return res.json();
}

// Simple polling-based "real-time" — lighter than WebSocket, good enough for 2 users
const pollIntervals: Record<string, number> = {};
const pollCallbacks: Record<string, Set<() => void>> = {};

export function startPolling(table: string, intervalMs: number, onChange: () => void) {
  if (!pollCallbacks[table]) pollCallbacks[table] = new Set();
  pollCallbacks[table].add(onChange);

  if (!pollIntervals[table]) {
    let lastData = '';
    pollIntervals[table] = window.setInterval(async () => {
      try {
        const res = await fetch(`${BASE_URL}/${table}?select=*`, { headers });
        const text = await res.text();
        if (text !== lastData) {
          lastData = text;
          pollCallbacks[table]?.forEach(cb => cb());
        }
      } catch {}
    }, intervalMs);
  }
}

export function stopPolling(table: string, onChange: () => void) {
  pollCallbacks[table]?.delete(onChange);
  if (pollCallbacks[table]?.size === 0 && pollIntervals[table]) {
    clearInterval(pollIntervals[table]);
    delete pollIntervals[table];
  }
}
