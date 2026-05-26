This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


```
comunidadclaudiamelanoma
├─ css.d.ts
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ images
│  │  └─ hero
│  │     ├─ bienvenida.png
│  │     ├─ clau-dibu-sinfondo.png
│  │     ├─ clau-dibu.png
│  │     ├─ clau-dibujo.png
│  │     ├─ clau-leyendo.jpeg
│  │     ├─ clauperfil.jpeg
│  │     ├─ comunidad-nueva.png
│  │     ├─ comunidad.png
│  │     ├─ grupos.png
│  │     ├─ informacion.png
│  │     ├─ nosotros.png
│  │     ├─ personas.png
│  │     └─ ronda.png
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ about-claudia
│  │  │  └─ page.tsx
│  │  ├─ api
│  │  │  └─ delete-account
│  │  │     └─ route.ts
│  │  ├─ auth
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ foros
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]
│  │  │     ├─ page.tsx
│  │  │     └─ [postId]
│  │  │        └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ globals.d.ts
│  │  ├─ layout.tsx
│  │  ├─ muro
│  │  │  ├─ actividad
│  │  │  │  └─ page.tsx
│  │  │  ├─ configuracion
│  │  │  │  └─ page.tsx
│  │  │  ├─ favoritos
│  │  │  │  └─ page.tsx
│  │  │  ├─ foros
│  │  │  │  └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  ├─ miembros
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ perfil
│  │  │  │  └─ editar
│  │  │  │     └─ page.tsx
│  │  │  └─ usuario
│  │  │     └─ [id]
│  │  │        └─ page.tsx
│  │  ├─ page.tsx
│  │  └─ resources
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ AboutClaudiaSection.tsx
│  │  ├─ ClaudiaPage.tsx
│  │  ├─ FAQSectionCCM.tsx
│  │  ├─ Footer.tsx
│  │  ├─ ForoDetallePage.tsx
│  │  ├─ ForoPostPage.tsx
│  │  ├─ ForosPage.tsx
│  │  ├─ ForumCard.tsx
│  │  ├─ ForumSectionThematic.tsx
│  │  ├─ Header.tsx
│  │  ├─ HeroSection.tsx
│  │  ├─ muro
│  │  │  ├─ CreatePost.tsx
│  │  │  ├─ Feed.tsx
│  │  │  ├─ MiembrosPage.tsx
│  │  │  ├─ MuroPage.tsx
│  │  │  ├─ PostCard.tsx
│  │  │  ├─ SliderbarLeft.tsx
│  │  │  └─ SliderbarRight.tsx
│  │  ├─ ResourcesPage.tsx
│  │  └─ ResourcesSection.tsx
│  ├─ lib
│  │  ├─ auth.ts
│  │  ├─ mock-data
│  │  │  ├─ feed
│  │  │  │  └─ feed-posts.ts
│  │  │  ├─ foro
│  │  │  │  ├─ forum-post.ts
│  │  │  │  └─ forums.ts
│  │  │  └─ users.ts
│  │  └─ supabase
│  │     ├─ actions.ts
│  │     ├─ client.ts
│  │     └─ server.ts
│  └─ middleware.ts
├─ tailwind.config.ts
└─ tsconfig.json

```