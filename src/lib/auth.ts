import { supabase } from '@/lib/supabase/client';

/* =============================================================================
   SESIÓN
   ============================================================================= */

export async function getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

export async function isAuthenticated() {
    const session = await getSession();
    return !!session;
}

export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

/* =============================================================================
   LOGIN
   ============================================================================= */

export async function loginWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
}

export async function loginWithGoogle(redirectTo?: string) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirectTo ?? `${window.location.origin}/muro`,
        },
    });
    return { data, error };
}

export async function loginWithFacebook(redirectTo?: string) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
            redirectTo: redirectTo ?? `${window.location.origin}/muro`,
        },
    });
    return { data, error };
}

/* =============================================================================
   REGISTRO
   ============================================================================= */

export async function registerWithEmail(
    email: string,
    password: string,
    name: string
) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name },
        },
    });

    if (error || !data.user) return { data, error };

    // El trigger handle_new_user en Supabase crea el perfil automáticamente,
    // pero lo hacemos también acá como fallback por si el trigger falla.
    const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
            id: data.user.id,
            name,
        });

    return { data, error: profileError ?? error };
}

/* =============================================================================
   RECUPERAR CONTRASEÑA
   ============================================================================= */

export async function sendPasswordResetEmail(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    return { error };
}

/* =============================================================================
   LOGOUT
   ============================================================================= */

export async function logout() {
    const { error } = await supabase.auth.signOut();
    return { error };
}