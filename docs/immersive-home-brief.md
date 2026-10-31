# Home inmersivo: brief de construcción

Fuente de verdad para quien construya una sección. Léelo completo. Lee también `PRODUCT.md`.

## Concepto: "reel de capacidades"
El home es una sola película de scroll. Cada sección es una **escena que demuestra una capacidad de Fabio**, no una lista. El usuario debe *ver* que sabe hacerlo: 3D, shaders, pipelines de automatización, narrativa de scroll, rendimiento. Referencias (inspiración de oficio, no copia):
- epic.net: manifiesto donde las palabras se curvan y colapsan en 3 palabras clave apiladas; la paleta cambia de golpe entre secciones; display serif enorme.
- unseen.co: escena 3D a pantalla completa con paralaje de mouse; título que mezcla serif itálica y grotesca.
- eszterbial.com: grotesca condensada gigante + serif itálica en la misma línea; líneas de columna finas; badge circular con texto que rota; marquee; sección final en oscuro.
- uncommondesign.group: tipografía cinética enorme recortada por los bordes; imagen que aparece *dentro* del texto; capas con `mix-blend-mode`.
- Además: exp.fiddle.digital, yuusuke.work, racing.porsche.com. Si existen `ref/notes_fiddle.md`, `ref/notes_yuusuke.md`, `ref/notes_porsche.md` en el scratchpad (ver abajo), léelos y aplica las recetas que encajen.

## Mundo visual (tokens ya definidos en `home.module.css` bajo `.root`, heredan por CSS)
- Colores: `--ink #05070d`, `--bone #ece8df`, `--blue-hot #2f6bff`, `--blue #1976d2`, `--sky #42a5f5`, `--ice #bfe3ff`, `--cyan #67e8f9`, `--muted #8b9bb3`, `--line`. Las secciones pueden **voltear** a fondo hueso (texto tinta) para dar contraste de ritmo; el azul es la marca, el cian el acento puntual.
- Tipografía: display = `var(--display)` Bricolage Grotesque (peso 700-800, tracking -0.04em, interlineado 0.9-1.0); acento = `var(--serif)` Instrument Serif *cursiva* para 1-3 palabras por titular; etiquetas = `var(--mono)` Geist Mono en mayúsculas pequeñas; cuerpo = Geist (heredado). Prohibido Inter, Space Grotesk, Arial.
- Movimiento: `--ease-out` cubic-bezier(.23,1,.32,1) y `--ease-in-out` cubic-bezier(.77,0,.175,1); en GSAP usa `expo.out`/`power3.out` y el `EASE_IN_OUT` exportado en `./gsap`. Interacciones UI <300ms; las escenas de scroll pueden durar lo que dure el scroll. Solo animar `transform`, `opacity`, `clip-path`, `filter` (blur <20px). Stagger 30-80ms. Nada anima desde `scale(0)`.
- Anti-slop: sin tarjetas dentro de tarjetas, sin la misma tarjeta de vidrio repetida en 4 secciones, sin degradados morados, sin hero izquierda/derecha por reflejo, sin números/métricas inventadas. Cada sección usa una composición distinta (centrada, asimétrica fuera de rejilla, a sangre, pin horizontal, etc.).

## Contrato técnico
- Next 16 App Router, React 19, React Compiler activo. Cada sección es un componente **cliente** (`"use client"`) que se renderiza también en servidor: **todo el texto va en el DOM desde el primer render** (SEO/GEO). Los estados iniciales ocultos se ponen con GSAP al montar (`gsap.from`/`set` dentro de `useGSAP`), nunca con CSS que oculte contenido sin JS.
- Importa GSAP SIEMPRE desde `./gsap` (registra ScrollTrigger, SplitText, DrawSVG, MotionPath, CustomEase, Flip y `useGSAP`): `import { gsap, ScrollTrigger, SplitText, useGSAP, EASE_OUT, prefersReducedMotion } from "./gsap"`. Usa `useGSAP(() => {...}, { scope: ref })`, selectores con scope, `contextSafe` en handlers (skill gsap-react). Limpieza automática; no dejes listeners sin quitar.
- Scroll suave Lenis ya lo monta `HomeStage` y está enlazado a ScrollTrigger: usa ScrollTrigger normalmente (pin, scrub). Para variantes responsive usa `gsap.matchMedia()` (desktop ≥ 820px / móvil). En móvil prefiere versiones simples (sin pin horizontal pesado).
- `prefers-reduced-motion`: si `prefersReducedMotion()` es true, no registres animaciones de scroll; el contenido queda estático y completo.
- Cada sección raíz lleva `data-scene-step="<n>"` con su índice (ver `src/lib/scene-state.ts`: 0 hero · 1 manifiesto · 2 servicios · 3 stack · 4 experiencia · 5 automatización · 6 proyectos · 7 publicaciones · 8 contacto). Así el busto de partículas fijo de fondo (canvas global z-index 1, `pointer-events:none`) cambia de pose/opacidad. El contenido de la sección debe ir sobre un wrapper con `position:relative; z-index:2` (o fondo propio opaco). Si tu sección tiene fondo opaco (p. ej. hueso), el busto queda tapado: está previsto.
- Datos reales SOLO desde `@/data/site` (CONTACT, services, projectSummaries, recognitions, stats, skillGroups, aboutPage, HOME) y `@/data/experience`. **No edites `src/data/*`**. Si necesitas copy extra (titulares, microcopy), escríbelo en tu archivo, en español, sin inventar hechos, cifras ni clientes.
- CSS: un módulo propio por sección (`<nombre>.module.css`) que usa los tokens heredados. No edites `home.module.css`, `HomeStage.tsx`, `page.tsx`, `scene-state.ts` (son del orquestador) salvo que seas el dueño indicado.
- WebGL propio: crea el `<Canvas>` con `dynamic(..., {ssr:false})`, `dpr={[1,1.75]}`, `frameloop="demand"` o pausa cuando no es visible (IntersectionObserver), `aria-hidden`, y libera geometrías/materiales en cleanup. Prueba a 60fps. Sin WebGL → fallback estático.
- Accesibilidad: foco visible, enlaces reales (`<a>`), un solo `<h2>` por sección, contraste AA, `aria-hidden` en decoración.
- Antes de escribir UI lee: skills `impeccable` (craft-floor), `emil-design-eng`, `gsap-react`, `anti-slop` están cargadas en tu contexto de herramientas si tu harness las expone; si no, aplica estas reglas igual.

## Cómo probar (obligatorio)
- Servidor dev ya corriendo en http://localhost:3001 (no lo reinicies ni lances otro). Crea tu página de laboratorio `src/app/lab/<tuNombre>/page.tsx` que renderice tu(s) sección(es) dentro de `<HomeStage>...</HomeStage>` (import de `@/components/home/HomeStage`) y navega a `/lab/<tuNombre>`. **Borra esa carpeta lab al terminar.**
- Navegador: `agent-browser` con TU sesión (`--session <tuNombre>`); la máquina tiene reduced-motion activo, así que antes de abrir ejecuta `export AGENT_BROWSER_INIT_SCRIPTS="C:/Users/admin/AppData/Local/Temp/claude/c--Users-admin-Desktop-Proyectos-MI-PORTAFOLIO/c88e50fc-9886-4c15-9106-87bd61f8c8ee/scratchpad/ref/init.js"` (fuerza reduced-motion=false). Viewport 1440x900 y luego 390x844. Para ver animaciones reales haz capturas por frames mientras haces scroll (`scroll down 300`, esperas 0.3-1.5s) y fotos intermedias de las transiciones; crea hojas de contactos con `ffmpeg -y -i f%d.png -vf "scale=520:-1,tile=2x4" sheet.png` y léelas. Revisa la consola del navegador (sin errores).
- Disciplina de verificación (impeccable): construye completo, una ronda de inspección por lotes (escritorio + móvil), corrige todo lo que viste en un solo lote, como máximo una ronda más. No pulas sin fin.
- No ejecutes `next build` ni mates procesos node. Comprueba tipos solo de tus archivos (`npx tsc --noEmit -p . 2>&1 | grep <tuArchivo>`), y `npx eslint <tus archivos>`.

## Entrega
Responde con: lista de archivos creados/modificados, el componente a montar (`export default`) y su `data-scene-step`, qué demuestra la escena, qué verificaste vs qué no, y cualquier cambio que necesites del orquestador (≤200 palabras).
