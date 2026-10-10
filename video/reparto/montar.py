# Vídeo de Reparto: cómo funciona, paso a paso, solo con rótulos. Sale de MotorSport19/comercial/video/montar.py.
#
# Desde video/reparto/, con Chrome, Node y ffmpeg (brew install ffmpeg):
#   1. La demo de Reparto en :4340 (en .claude/launch.json, «reparto-demo»; recién arrancada, sin entregas).
#   2. Chrome sin ventana (si no hay Chrome, vale el «Chrome for Testing» de Playwright, en ~/Library/Caches/ms-playwright):
#      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --remote-debugging-port=9336 \
#          --user-data-dir="$PWD/perfil-chrome" --hide-scrollbars --force-color-profile=srgb about:blank &
#   3. node guion.mjs        → graba la app en tomas/app/ con sus rótulos
#   4. python3 montar.py     → Reparto-como-funciona.mp4 (+ versión ligera para WhatsApp)
#      El cierre y el logo de la esquina son los de Automaittech (marca.py), como en el tutorial de Codo90.
import bisect, json, os, subprocess
import marca

AQUI = os.path.dirname(os.path.abspath(__file__))
os.chdir(AQUI)
FUNDIDO = 0.5
X264 = ['-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', '30']
PANTALLA = (1254, 53, 450, 974)  # dónde va la grabación del móvil dentro del fondo (escenas.html, .movil .pantalla)
SEGMENTOS = [('escena', 'intro', 7), ('toma', 'tomas/app'), ('escena', 'cliente', 8), ('escena', 'cierre', 8), ('fin',)]
SALIDA = 'Reparto-como-funciona.mp4'


def ff(*args):
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', *args], check=True)


def node(*args):
    subprocess.run(['node', 'renderizar.mjs', *args], check=True, stdout=subprocess.DEVNULL)


def duracion(ruta):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', ruta]))


def escena(dest, nombre, segundos):
    carpeta = dest + '-fotogramas'
    node('anim', nombre, str(segundos), carpeta)
    ff('-framerate', '30', '-i', f'{carpeta}/f%05d.jpg', *X264, dest)


def bruto(carpeta, dest):
    """Los fotogramas del screencast llegan a ritmo variable: para cada instante k/30 se usa el último recibido."""
    datos = json.load(open(f'{carpeta}/rotulos.json'))
    fs, fin = datos['fotogramas'], datos['fin']
    tiempos = [f['t'] for f in fs]
    proc = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-',
                             '-vf', 'format=yuv420p', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-r', '30', dest], stdin=subprocess.PIPE)
    cache = {}
    for k in range(int(fin * 30)):
        i = max(0, bisect.bisect_right(tiempos, k / 30) - 1)
        if i not in cache:
            cache.clear()
            cache[i] = open(f'{carpeta}/{fs[i]["nombre"]}', 'rb').read()
        proc.stdin.write(cache[i])
    proc.stdin.close()
    if proc.wait():
        raise SystemExit('ffmpeg ha fallado al juntar la toma')


def toma(dest, carpeta):
    base = dest.replace('.mp4', '')
    node('png', 'fondo', 'piezas/fondo.png')
    node('png', 'marco', 'piezas/marco.png')
    bruto(carpeta, base + '-bruto.mp4')
    node('rotulos', f'{carpeta}/rotulos.json', base + '-rotulos')
    datos = json.load(open(f'{carpeta}/rotulos.json'))
    fin, rotulos = datos['fin'], datos['rotulos']
    x, y, an, al = PANTALLA

    # Papel + la app dentro del móvil + el aro del móvil encima + cada rótulo con fundido, hasta que entra el siguiente.
    entradas = ['-loop', '1', '-framerate', '30', '-t', f'{fin:.3f}', '-i', 'piezas/fondo.png', '-i', base + '-bruto.mp4',
                '-loop', '1', '-framerate', '30', '-t', f'{fin:.3f}', '-i', 'piezas/marco.png']
    filtros = [f'[1]scale={an}:{al}:flags=lanczos[app]', f'[0][app]overlay={x}:{y}:shortest=1[m]', '[m][2]overlay=0:0[v0]']
    for i, r in enumerate(rotulos):
        ini = max(r['t'] - 0.1, 0)
        fin_r = (rotulos[i + 1]['t'] - 0.15) if i + 1 < len(rotulos) else fin
        dur = max(fin_r - ini, 0.8)
        entradas += ['-loop', '1', '-framerate', '30', '-t', f'{dur:.3f}', '-i', f'{base}-rotulos/r{i:02d}.png']
        filtros.append(f'[{i + 3}]format=rgba,fade=t=in:st=0:d=0.35:alpha=1,fade=t=out:st={dur - 0.3:.3f}:d=0.3:alpha=1,'
                       f'setpts=PTS-STARTPTS+{ini:.3f}/TB[r{i}]')
        filtros.append(f'[v{i}][r{i}]overlay=0:0:eof_action=pass[v{i + 1}]')
    ff(*entradas, '-filter_complex', ';'.join(filtros), '-map', f'[v{len(rotulos)}]', *X264, dest)


os.makedirs('piezas', exist_ok=True)
partes = []
for i, seg in enumerate(SEGMENTOS):
    dest = f'piezas/{i:02d}.mp4'
    {'escena': escena, 'toma': toma, 'fin': marca.fin}[seg[0]](dest, *seg[1:])
    partes.append(dest)
    print(f'  {dest}  {duracion(dest):.1f} s', flush=True)

# Todo seguido, con fundidos encadenados
durs = [duracion(p) for p in partes]
cadena, previo, acumulado = [], '0', durs[0]
for i in range(1, len(partes)):
    offset = acumulado - FUNDIDO
    cadena.append(f'[{previo}][{i}]xfade=transition=fade:duration={FUNDIDO}:offset={offset:.3f}[x{i}]')
    previo = f'x{i}'
    acumulado = offset + durs[i]
# Y el logo de Automaittech arriba a la derecha, de principio a fin.
marca.esquina('piezas/esquina.png')
cadena.append(f'[{previo}][{len(partes)}]overlay=0:0[final]')
ff(*[a for p in partes for a in ('-i', p)], '-i', 'piezas/esquina.png', '-filter_complex', ';'.join(cadena), '-map', '[final]',
   '-c:v', 'libx264', '-crf', '20', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-r', '30', '-movflags', '+faststart', SALIDA)
ligera = SALIDA.replace('.mp4', '-whatsapp.mp4')
ff('-i', SALIDA, '-vf', 'scale=1280:720', '-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-pix_fmt', 'yuv420p',
   '-movflags', '+faststart', ligera)
for f in (SALIDA, ligera):
    print(f, f'{duracion(f):.1f} s', f'{os.path.getsize(f) / 1e6:.1f} MB')
