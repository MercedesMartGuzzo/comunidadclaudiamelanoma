'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addComment(postId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Debes estar logueado");

  const { data, error } = await supabase
    .from('comments')
    .insert([{ 
      post_id: postId, 
      user_id: user.id, 
      content: content 
    }]);

  if (error) throw error;
  
  revalidatePath(`/foros/[slug]/[postId]`);
  return data;
}

export async function fetchUserFromSupabase(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data;
}