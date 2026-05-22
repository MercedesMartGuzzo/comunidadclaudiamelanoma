import { NextResponse } from 'next/server';

export function middleware() {
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Aplica a todo excepto archivos estáticos, imágenes y APIs externas
        '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};