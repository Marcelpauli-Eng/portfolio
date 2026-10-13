#!/usr/bin/env bash
# Firma el pase y saca wallet/Automaittech.pkpass, listo para abrir en el iPhone.
#
# Uso:
#   wallet/firmar.sh <certificado.p12> <TEAM_ID> [pass.type.id]
#
#   certificado.p12  El Pass Type ID exportado desde Acceso a Llaveros (con su clave privada).
#   TEAM_ID          Los 10 caracteres de tu equipo en developer.apple.com → Membership.
#   pass.type.id     El identificador que creaste; por defecto pass.com.automaittech.tarjeta.
#
# La contraseña del .p12 se pide por teclado (o en la variable P12_PASSWORD).
# El certificado intermedio de Apple (WWDR G4) se descarga solo la primera vez.
set -euo pipefail

aqui="$(cd "$(dirname "$0")" && pwd)"
p12="${1:?Falta el certificado .p12}"
team="${2:?Falta el TEAM_ID}"
tipo="${3:-pass.com.automaittech.tarjeta}"
salida="$aqui/Automaittech.pkpass"
wwdr="$aqui/.certs/AppleWWDRCAG4.pem"

if [[ -z "${P12_PASSWORD:-}" ]]; then
  read -rsp "Contraseña del .p12: " P12_PASSWORD; echo
fi
export P12_PASSWORD

trabajo="$(mktemp -d)"
trap 'rm -rf "$trabajo"' EXIT

# Certificado intermedio de Apple.
mkdir -p "$aqui/.certs"
if [[ ! -f "$wwdr" ]]; then
  curl -fsSL https://www.apple.com/certificateauthority/AppleWWDRCAG4.cer -o "$trabajo/wwdr.cer"
  openssl x509 -inform DER -in "$trabajo/wwdr.cer" -out "$wwdr"
fi

# Certificado y clave del .p12 (-legacy hace falta con OpenSSL 3 para los .p12 que exporta macOS).
legacy=""
openssl pkcs12 -help 2>&1 | grep -q -- '-legacy' && legacy="-legacy"
openssl pkcs12 $legacy -in "$p12" -clcerts -nokeys -out "$trabajo/cert.pem" -passin env:P12_PASSWORD
openssl pkcs12 $legacy -in "$p12" -nocerts -nodes -out "$trabajo/key.pem" -passin env:P12_PASSWORD

# Copia del pase con tu equipo y tu identificador.
mkdir "$trabajo/pase"
cp "$aqui"/pase/*.png "$trabajo/pase/"
python3 - "$aqui/pase/pass.json" "$trabajo/pase/pass.json" "$team" "$tipo" <<'PY'
import json, sys
origen, destino, team, tipo = sys.argv[1:]
p = json.load(open(origen, encoding='utf-8'))
p['teamIdentifier'] = team
p['passTypeIdentifier'] = tipo
json.dump(p, open(destino, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
PY

# manifest.json: el SHA-1 de cada archivo.
python3 - "$trabajo/pase" <<'PY'
import hashlib, json, os, sys
d = sys.argv[1]
m = {f: hashlib.sha1(open(os.path.join(d, f), 'rb').read()).hexdigest() for f in sorted(os.listdir(d))}
json.dump(m, open(os.path.join(d, 'manifest.json'), 'w'), indent=2)
PY

# Firma del manifiesto.
openssl smime -binary -sign -outform DER \
  -certfile "$wwdr" -signer "$trabajo/cert.pem" -inkey "$trabajo/key.pem" \
  -in "$trabajo/pase/manifest.json" -out "$trabajo/pase/signature"

rm -f "$salida"
(cd "$trabajo/pase" && zip -q -X -r "$salida" .)
echo "Listo: $salida"
