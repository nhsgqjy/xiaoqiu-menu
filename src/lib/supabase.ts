import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://raidjeuelscalljgyzet.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaWRqZXVlbHNjYWxsamd5emV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NzI1ODEsImV4cCI6MjA5ODA0ODU4MX0.70o8zOHYLbIggKu_hsZzK3LUhPFrlGnLCJLP75Dz9P8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export const TABLES = {
  TODAY_MENU: 'today_menu',
  FAVORITES: 'favorites',
  CART: 'cart',
} as const;

// Helper: re-fetch all rows from a table
export async function fetchTable(table: string) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

// Helper: subscribe to table changes
export function subscribeTable(
  table: string,
  channelName: string,
  onInsert: (dishId: number) => void,
  onDelete: (dishId: number) => void
) {
  const channel = supabase
    .channel(channelName)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table },
      (payload: any) => onInsert(payload.new.dish_id)
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table },
      (payload: any) => onDelete(payload.old.dish_id)
    )
    .subscribe((status) => {
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        setTimeout(() => {
          supabase.removeChannel(channel).then(() => {
            subscribeTable(table, channelName, onInsert, onDelete);
          });
        }, 3000);
      }
    });

  return channel;
}
