import { defineConfig } from 'astro/config';

// [DOMINIO]: cuando tengas la dirección definitiva, arranca con SITE_URL=https://tudominio.com
// (o ponla aquí) para que Open Graph y la URL canónica apunten bien.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://www.automaittech.com',
  devToolbar: { enabled: false },
});
