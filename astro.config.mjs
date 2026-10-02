import { defineConfig } from 'astro/config';

// [DOMINIO]: cuando tengas la dirección definitiva, arranca con SITE_URL=https://tudominio.com
// (o ponla aquí) para que Open Graph y la URL canónica apunten bien.
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  devToolbar: { enabled: false },
});
