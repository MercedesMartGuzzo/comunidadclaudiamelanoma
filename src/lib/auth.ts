import { supabase } from '@/lib/supabase/client';

export async function isAuthenticated() {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return !!session;
}