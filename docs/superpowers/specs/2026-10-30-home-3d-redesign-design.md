# Rediseño del home: escena 3D de partículas con coreografía de scroll

## Objetivo
Home de impacto para el portafolio de Fabio Fruto: foto convertida en busto de partículas 3D que reacciona al mouse y cambia de posición, color y dispersión según la sección. Referencias de estilo: landing 3D "Kin OS" y layout editorial monocromo; contenido y colores propios (azul `#1976d2`/`#42a5f5` sobre `#05070d`, acento cian).

## Restricciones
- SEO/GEO intacto: HTML real renderizado en servidor, un solo `<h1>`, `data/site.ts` como fuente única (HTML, `homeMarkdown()`, `llms.txt`, JSON-LD). Tests existentes siguen pasando.
- La escena WebGL es decorativa (`aria-hidden`), se carga diferida (`dynamic`, `ssr:false`) y se degrada a la foto estática si hay `prefers-reduced-motion` o no hay WebGL.
- `/about`, `/contact`, `/privacy` conservan el tema MUI claro/oscuro; solo el home es oscuro cinematográfico (`SiteChrome` decide por ruta).

## Arquitectura
- `components/home/HomeStage` (cliente): Lenis + GSAP ScrollTrigger. Escribe en `lib/scene-state.ts` (objeto mutable, sin renders de React) un keyframe por sección (`data-scene-step`), con `scrub: 1`.
- `ParticleBust` (R3F): muestrea `profile.webp` y la silueta `profile-mask.png`; `THREE.Points` con shader propio (ruido simplex, dispersión, mouse con lerp 0.05, mapa de color espacial).
- Secciones (servidor, `HomeSections.tsx`): Hero, Servicios (bento), Experiencia (macro izq.), IA y automatización (macro der.), Proyectos (partículas dispersas), Publicaciones, Contacto.
- Datos nuevos en `data/site.ts`: `recognitions`, `stats`, `skillGroups`, y `image/tags/kind` por proyecto.

## Verificación
Tests: contenido del home (Markdown incluye todo, imágenes existen, 7 keyframes). Revisión visual de 7 secciones en escritorio y móvil.
