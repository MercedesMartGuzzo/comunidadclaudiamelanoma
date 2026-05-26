import { createClient } from '@/lib/supabase/server'; // Usa el cliente que ya tienes configurado

export async function fetchUserFromSupabase(userId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('profiles') // Asegúrate que tu tabla se llame 'profiles'
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error("Error al traer el usuario:", error);
    return null;
  }
  return data;
}