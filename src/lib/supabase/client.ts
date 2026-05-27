import { createBrowserClient } from '@supabase/ssr';

// Exportamos la función createClient para que coincida con tus imports
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Mantenemos también la exportación directa por si la usás en otro lado
export const supabase = createClient();