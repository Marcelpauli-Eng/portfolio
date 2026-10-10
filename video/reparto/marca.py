# La marca de Automaittech en el vídeo: el logo arriba a la derecha y el cierre azul con el logo, el nombre y
# «¿Tienes dudas?». Igual que el tutorial de Codo90 (DashboardFontaneriaLamp/comercial/video/tutorial.py):
# lo dibuja el motor de los reels de Automaittech (skill automaittech-instagram), con su paleta y sus letras Barlow.
import os, subprocess, sys

sys.path.insert(0, os.path.expanduser("~/.claude/skills/automaittech-instagram/scripts/reels"))
import motor as M  # noqa: E402
from motor import C, F, CE, MED, texto, tx, pop, place, con_sombra, logo, fondo, Image  # noqa: E402

# El motor dibuja en vertical; aquí, en horizontal.
M.W, M.H = W, H = 1920, 1080
FPS = M.FPS


def partir(frase, fuente, size, ancho):
    """Corta la frase en líneas que caben en `ancho` píxeles."""
    f, lineas, actual = F(fuente, size), [], ""
    for palabra in frase.split():
        prueba = (actual + " " + palabra).strip()
        if f.getlength(prueba.upper() if fuente == CE else prueba) > ancho and actual:
            lineas.append(actual); actual = palabra
        else:
            actual = prueba
    return lineas + [actual]


def esquina(ruta):
    """El logo de la esquina, en una capa transparente del tamaño del vídeo: va encima de todo."""
    capa = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    place(capa, con_sombra(logo(84), blur=10, off=(0, 6), opacity=0.35), W - 110, 100)
    capa.save(ruta)


def fin(ruta, dur=7.5):
    """El cierre: la baldosa del logo, «Automaittech», el lema en amarillo y la invitación a escribir."""
    base = fondo(C["navy"])
    tarjeta = con_sombra(logo(360), blur=26, off=(0, 22), opacity=0.45)
    nombre = texto(["Automaittech"], 150, CE, C["blanco"])
    lema = texto([[("Programas a medida para oficios", C["ama"])]], 80, CE, C["ama"])
    sub = texto(partir("¿Tienes dudas? Escríbenos y te lo enseñamos.", MED, 50, 1000), 50, MED, C["blanco"], lh=1.32, upper=False)
    x = 760
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
           "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", ruta]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for i in range(int(dur * FPS)):
        t = i / FPS
        fr = base.copy()
        pop(fr, tarjeta, 430, 540, t, 0.1, dur=0.5)
        tx(fr, nombre, x, 330, t, 0.45)
        tx(fr, lema, x, 500, t, 0.65)
        tx(fr, sub, x, 640, t, 0.9)
        p.stdin.write(fr.convert("RGB").tobytes())
    p.stdin.close()
    if p.wait():
        raise SystemExit("ffmpeg ha fallado en el cierre")
