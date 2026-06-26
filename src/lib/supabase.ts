import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://raidjeuelscalljgyzet.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaWRqZXVlbHNjYWxsamd5emV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NzI1ODEsImV4cCI6MjA5ODA0ODU4MX0.70o8zOHYLbIggKu_hsZzK3LUhPFrlGnLCJLP75Dz9P8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const TABLES = {
  TODAY_MENU: 'today_menu',
  FAVORITES: 'favorites',
  CART: 'cart',
} as const;
