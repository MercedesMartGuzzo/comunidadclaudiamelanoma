import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // 1. Inicializar el cliente de Supabase con el rol de servicio (admin)
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!, // Clave secreta de backend
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        // 2. Obtener el token de acceso del usuario que hace la petición
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');

        // 3. Verificar que el token sea válido y obtener el ID del usuario
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
        
        if (authError || !user) {
            return NextResponse.json({ error: 'Sesión inválida o expirada' }, { status: 401 });
        }

        const userId = user.id;

        // 4. Eliminar el perfil de la tabla 'profiles' (por si las RLS o cascadas fallan)
        await supabaseAdmin
            .from('profiles')
            .delete()
            .eq('id', userId);

        // 5. Eliminar al usuario de Supabase Auth de forma definitiva
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (deleteError) {
            return NextResponse.json({ error: deleteError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Cuenta eliminada con éxito' });
} catch (error) {
        // Validamos si el error es una instancia nativa de Error para poder leer su mensaje con seguridad
        const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error inesperado';
        
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}