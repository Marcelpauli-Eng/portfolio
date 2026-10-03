#!/bin/sh
# Imprime cada folletos/<nombre>.html a public/folletos/<nombre>.pdf y saca su portada para el botón de la web: npm run folletos
# Hace falta Google Chrome (macOS) y poppler (brew install poppler).
set -e
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
for f in folletos/*.html; do
  n=$(basename "$f" .html)
  "$CHROME" --headless --no-pdf-header-footer --virtual-time-budget=15000 --print-to-pdf="public/folletos/$n.pdf" "file://$PWD/$f" 2>/dev/null
  pdftoppm -png -f 1 -l 1 -singlefile -scale-to-x 360 -scale-to-y -1 "public/folletos/$n.pdf" "src/assets/folletos/$n"
  echo "$n.pdf: $(pdfinfo "public/folletos/$n.pdf" | awk '/^Pages/ {print $2}') páginas"
done
