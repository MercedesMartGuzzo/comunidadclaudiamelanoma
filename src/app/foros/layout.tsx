import { createClient } from '@/lib/supabase/server'; // Ajustá la ruta si es necesario
import { redirect } from 'next/navigation';

export default async function ForosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 1. Creamos el cliente de Supabase en el servidor
    const supabaseServer = await createClient();

    // 2. Traemos al usuario actual desde las cookies
    const {
        data: { user },
    } = await supabaseServer.auth.getUser();

    // 3. Si NO hay usuario, lo mandamos al login
    if (!user) {
        redirect('/auth?tab=login');
    }

    // Si está autenticado, renderiza el foro de una
    return <>{children}</>;
}