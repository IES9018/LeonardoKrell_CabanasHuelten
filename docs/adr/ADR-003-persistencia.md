# ADR-003: Persistencia — Datos de Ocupación y Contenido Embebidos en Código

**Fecha:** 2026-10-22
**Estado:** Aceptado

## Contexto

El sitio necesita tres conjuntos de datos: los **rangos de ocupación** del calendario (RF-04/RF-05/RF-06), los **items de la galería** (RF-02/RF-03) y los **attractivos por temporada** (RF-08). Los NG-01/NG-03 del SPEC prohíben backend, base de datos y panel de administración. El único actor que modifica estos datos es el dueño, que ya trabaja con git.

## Decisión

Los datos viven como **constantes de estructuras JS dentro de `app.js`**:

- `occupiedRanges: OccupiedRange[]` — fuente única de verdad de la ocupación.
- `galleryItems: GalleryItem[]` — fotos con categoría, título y pie.
- `seasonalAttractions` / `yearRoundAttractions` — atractivos turísticos.
- `EMAILJS_CONFIG` — configuración del servicio de correo (placeholders en repo).

Actualizar el calendario = editar `occupiedRanges` y hacer commit/PR. El repo es el historial de los cambios de disponibilidad.

## Alternativas Descartadas

- **JSON externo (`data.json`) cargado con `fetch`:** obliga a servir el sitio por HTTP (falla al abrir `index.html` con `file://`), agrega un estado de carga y un segundo archivo que el dueño debe editar igual. Criterio descartado: cero mejora operativa, peor experiencia local.
- **API + base de datos (SQLite/PostgreSQL):** daría disponibilidad en tiempo real y múltiples editores, pero viola NG-01/NG-02/NG-03 y requiere servidor, migraciones y hosting. Criterio descartado: el volumen de datos (5 rangos, 9 fotos) no justifica infraestructura; la reserva confirma el dueño, no el sistema.
- **Google Sheets / CMS externo como backend:** habilitaría edición no-técnica, pero agrega latencia, cuotas, dependencia de terceros y un secreto de API. Criterio descartado: el dueño ya usa GitHub; la dependencia externa aumenta el blast radius de un servicio caído.

## Consecuencias

- **Positivas:** cero latencia de datos; sin estado de carga; los cambios son auditables en `git log`; cualquier error de datos se revierte con un commit.
- **Negativas / Riesgos:** editar fechas requiere conocimientos de git/JSON (asumido: el dueño o su asesor ya lo hacen); no hay concurrencia ni validación server-side de solapes (mitigado: la validación final la hace el dueño al responder la solicitud); las fechas pasadas permanecen en el array (limpieza manual ocasional).
