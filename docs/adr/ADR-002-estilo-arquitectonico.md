# ADR-002: Estilo Arquitectónico — Sitio Estático Single-Page con Lógica en Cliente

**Fecha:** 2026-10-22
**Estado:** Aceptado

## Contexto

Dado el stack del ADR-001 (estático, sin build), hay que definir cómo se organiza el código y cómo el usuario recorre el sitio. El sitio tiene una sola superficie (landing) con secciones ancladas, y las dos capacidades con lógica —galería filtrable y reservas— no requieren cambiar de página ni recargar.

## Decisión

Arquitectura de **sitio estático single-page (MPA no aplica, SPA sin router)**:

- Una única `index.html` con secciones identificadas por anclas (`#inicio`, `#galeria`, `#reservas`, `#ubicacion`) y navegación `scroll-behavior: smooth`.
- La interacción vive en un **único módulo IIFE** (`app.js`) que expone comportamiento mediante delegación de eventos sobre los puntos de montaje del DOM.
- El estado (galería filtrada, temporada seleccionada, rango de fechas) es **estado en memoria**; no se persiste ni viaja por URL.
- Los modales de Bootstrap (lightbox, atractivos, políticas) son la mecánica de "pantallas secundarias".

## Alternativas Descartadas

- **MPA (varias páginas HTML: index/galeria/reservas.html):** duplicaría nav/footer, rompería la experiencia de "scroll y reservar" y multiplicaría el mantenimiento de contenido. Criterio descartado: costo de mantenimiento > beneficio para 4 secciones.
- **SPA con router (React/Vue + client-side routing):** aporta rutas y estado global, pero exige toolchain y build (contradice ADR-001). Criterio descartado: complejidad de toolchain innecesaria para anclas nativas del navegador.
- **SSG (Astro/Hugo/11ty):** genera páginas en build y mejora SEO profundo, pero introduce Node en el flujo del dueño (que solo edita contenido). Criterio descartado: el dueño no debe operar toolchains; un commit debe ser deploy suficiente.

## Consecuencias

- **Positivas:** un solo archivo HTML que el dueño puede leer entero; cero recargas; modales accesibles heredados de Bootstrap; despliegue = subir la carpeta.
- **Negativas / Riesgos:** todo el JS se carga de entrada (~peso inicial); el estado no sobrevive a un refresh (aceptable: es una landing); el SEO depende del contenido estático del HTML (suficiente para una landing con meta description).
