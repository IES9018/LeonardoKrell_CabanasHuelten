# ADR-006: Estrategia Mobile — Responsive Adaptativo vs PWA vs Nativa vs Híbrida

**Fecha:** 2026-10-22
**Estado:** Aceptado

## Contexto

El huésped principal (Valentina, persona 1) llega **desde el celular**. Hay que decidir qué estrategia mobile adopta el sitio con las restricciones reales del proyecto: **un solo desarrollador**, sin presupuesto de distribución, fechas de PP3 (cierre Sprint 3: 13 nov, entrega TP5: 10 nov), sitio estático sin backend (ADR-005) y datos de ocupación que deben verse siempre frescos (ADR-003).

## Decisión

**Responsive adaptativo (mobile-first)**: un único sitio estático que se adapta con breakpoints de Bootstrap (`col-6/col-md-3`, `col-lg-6`, `d-none d-lg-block`…) y media queries propias (`styles.css` → `@media (max-width: 767.98px)`), con:

- targets táctiles ≥ 48 px (Material) / 44 pt (Apple HIG) verificados en los wireframes móviles;
- `viewport` meta + `scroll-padding-top` para el nav sticky;
- calendario y formulario en una columna bajo 768 px;
- presupuestos medibles (ver `docs/arquitectura/presupuestos-rendimiento.md`) corribles en CI.

## Matriz de decisión

| Criterio (peso) | Responsive | PWA | Nativa | Híbrida |
|---|---|---|---|---|
| Tiempo hasta deploy con 1 dev (30%) | **Máximo: ya funciona, solo medir** | Requiere service worker + manifest + pruebas de caché | Semanas (store review incluida) | Semanas + toolchain móvil |
| Frescura de datos de ocupación (25%) | **Siempre fresco (red siempre)** | Riesgo de servir caché stale (ver ADR-005: PWA descartada) | Requiere sync propia | Requiere sync propia |
| Costo operativo/distribución (20%) | **0: URL única** | 0 pero superficie de fallo extra | Cuenta developer + stores | igual que nativa |
| Alcance del contenido (15%) | **100%: es una landing** | Igual a responsive + instalable (valor casi 0 aquí) | Overkill total | Overkill total |
| Consistencia con NG-06 y ADR-005 (10%) | **Cumple** | Viola NG-06 (offline) | Nueva app a mantener | Nueva app a mantener |
| **Total ponderado** | **Ganador** | Descartada | Descartada | Descartada |

## Alternativas Descartadas

- **PWA (service worker + manifest):** el valor de una PWA es el uso offline; el contenido crítico (disponibilidad) pierde frescura si se cachea, y NG-06 lo prohíbe explícitamente. Ver ADR-005 (PWA descartada con el mismo criterio).
- **Nativa (Kotlin/Swift):** costos de distribución y ciclos de store incompatibles con un sitio de una persona; el producto no gana ninguna capacidad que el navegador no dé (cámara/GPS no se usan).
- **Híbrida (Flutter/React Native):** suma toolchain y builds móviles sin beneficio medible para una landing cuyo único "estado" son fechas en `app.js`.

## Consecuencias

- **Positivas:** cero código de plataforma duplicado; un solo lugar para corregir (HTML/CSS/JS); los presupuestos (RNF) se pueden medir con Lighthouse sobre la misma URL que usa el usuario.
- **Negativas / Riesgos:** sin instalación ni notificaciones (aceptable: WhatsApp es el canal de contacto); depende de que los breakpoints cubran bien tamaños nuevos (riesgo bajo, breakpoints fluidos de Bootstrap + `clamp()` en tipografía).
