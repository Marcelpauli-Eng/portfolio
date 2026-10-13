# Tarjeta de Automaittech para Apple Wallet

![Cómo se ve](vista-previa.png)

La vista previa es aproximada: Wallet pone su propia letra y coloca el texto a su manera.

## Qué hay aquí

| Qué | Dónde |
|---|---|
| Textos, colores, QR y reverso de la tarjeta | `pase/pass.json` |
| Imágenes ya hechas (franja, logo, icono) | `pase/*.png` |
| Dibujo de las imágenes | `arte/generar.mjs` (herramientas de `src/herramientas.ts`, letras Barlow) |
| Logo | `arte/logo-automaittech.png`, sacado del cierre de los vídeos (240 px; si tienes el original más grande, cámbialo aquí) |
| Firmar y empaquetar | `firmar.sh` |

## Firmarla (una vez, en el Mac)

1. En [developer.apple.com](https://developer.apple.com/account/resources/identifiers/list/passTypeId), **Identifiers → +
   → Pass Type IDs**. Pon `pass.com.automaittech.tarjeta` (u otro, y se lo pasas al script).
2. En ese identificador, **Create Certificate**. Sube un CSR (Acceso a Llaveros → Asistente para certificados →
   Solicitar un certificado de una autoridad), descarga el `.cer` y ábrelo con doble clic.
3. En Acceso a Llaveros, botón derecho sobre «Pass Type ID: pass.com.automaittech.tarjeta» → **Exportar** como `.p12`
   con contraseña.
4. Tu Team ID está en **Membership details** (10 caracteres).
5. Desde la raíz del repo:

   ```bash
   wallet/firmar.sh ~/Desktop/pase.p12 TU_TEAM_ID
   ```

   Sale `wallet/Automaittech.pkpass`. Mándatelo por AirDrop o correo y ábrelo en el iPhone.

El `.p12` y el `.pkpass` no se suben al repo (están en `.gitignore`).

## Pasársela a la gente

- **Desde tu iPhone:** abre la tarjeta en Wallet → «…» → **Compartir pase** (AirDrop, WhatsApp, Mensajes).
- **Con un enlace:** copia el `.pkpass` a `public/automaittech.pkpass` y publica la web. El enlace
  `https://www.automaittech.com/automaittech.pkpass` la abre directamente en Wallet desde Safari
  (`vercel.json` ya manda el tipo de archivo correcto).
- En Android no se abre: a esa gente, el QR o el enlace a la web.

## Cambiar algo

- Textos o datos: edita `pase/pass.json` y vuelve a firmar. Si quieres que a quien ya la tiene le salga
  como la misma tarjeta, deja igual `serialNumber`; la nueva versión se instala encima.
- Imágenes: `node wallet/arte/generar.mjs` y vuelve a firmar.

El certificado del Pass Type ID caduca: cuando pase, se renueva en developer.apple.com y se exporta otro `.p12`.
Las tarjetas que ya están en los móviles siguen ahí.
