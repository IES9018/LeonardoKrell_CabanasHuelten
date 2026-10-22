# ADR-004: Stack de UI — Bootstrap 5 + Design Tokens Propios + Google Fonts

**Fecha:** 2026-10-22
**Estado:** Aceptado

## Contexto

El sitio necesita una capa de interfaz coherente con la identidad de la marca (madera, atardecer, oliva, crema) que además sea accesible y responsive sin escribir desde cero grid, modales, formularios y estados de validación. El equipo es una persona y el sitio no tiene build step (ADR-001/002).

## Decisión

- **Bootstrap 5.3.3** por CDN para grid, navbar responsive, modales, formularios y utilidades de accesibilidad (`visually-hidden-focusable`, `was-validated`).
- **Design tokens CSS** en `:root` (`--wood`, `--sunset`, `--olive`, `--cream`, `--sand`, `--busy`, `--whatsapp`, sombras y radios) con overrides puntuales sobre Bootstrap (`.btn-cta`, `.surface-card`, variables `--fc-*` de FullCalendar).
- **Google Fonts** display + UI: Cormorant Garamond (titulares) y Outfit (cuerpo).
- Componentes propios solo cuando Bootstrap no cubre el caso (cards de galería, switcher de temporada, botón flotante de WhatsApp).

## Alternativas Descartadas

- **Tailwind CSS:** utility-first acelera prototipado, pero sin build requiere el CSS completo por CDN o una generación manual; además el sitio ya vive de overrides sobre componentes (modal, navbar), que en Tailwind se reescriben. Criterio descartado: ajuste de curva y toolchain implícita vs reutilización real de componentes.
- **CSS puro sin framework:** control total, pero hay que reimplementar grid, colapso de navbar, modales con foco y validación de formularios. Criterio descartado: semanas de trabajo y riesgo de accesibilidad para un sitio de una página.
- **Component library en React (MUI/Bootstrap React):** exige framework y build (viola ADR-001/002). Criterio descartado: dependencia de runtime JS pesado para lo que el HTML nativo + Bootstrap bundle resuelven.

## Consecuencias

- **Positivas:** estética de marca consistente vía tokens; accesibilidad básica (foco, contraste, roles) heredada de Bootstrap; overrides de FullCalendar con las mismas variables; rapidez de iteración.
- **Negativas / Riesgos:** el sitio depende del CDN de Bootstrap (riesgo aceptado en ADR-001); los overrides pueden romperse si se sube una versión mayor de Bootstrap (mitigado: versión fijada en el `<link>`, sin `^`).
