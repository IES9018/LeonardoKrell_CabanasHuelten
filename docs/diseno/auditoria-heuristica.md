# Auditoría Heurística — Cabañas Hueltén

Método: revisión de la landing publicable (`index.html` + `app.js` + `styles.css`) contra las **10 heurísticas de Nielsen**, con foco en los dos flujos críticos del huésped (evaluar el lugar y enviar una solicitud). Fecha: 2026-10-22. Evaluador: Leonardo Krell (revisión + prueba manual en Chrome/Edge, teclado y móvil 360 px).

## Tabla de las 10 heurísticas

| # | Heurística | Estado | Evidencia en el producto |
|---|------------|--------|--------------------------|
| H1 | **Visibilidad del estado del sistema** | ⚠️ → ✅ corregido | Filtros de galería y switcher de temporada comunican estado; el estado de los filtros ahora también expone `aria-pressed` (ver Hallazgo 1). El envío muestra "Enviando..." y alertas success/warning/danger. |
| H2 | **Correspondencia entre el sistema y el mundo real** | ✅ | Lenguaje rioplatense ("Elegí una opción", "Probá otras noches"), términos del dominio (check-in, seña, temporada alta), iconos familiares. |
| H3 | **Control y libertad del usuario** | ⚠️ → ✅ corregido | El usuario puede cancelar modales (Esc/backdrop), reintentar el envío y rehacer el rango de fechas. El link "Políticas de reserva" del footer saltaba al tope de la página (`href="#"`); corregido (Hallazgo 3). |
| H4 | **Consistencia y estándares** | ✅ | Patrones Bootstrap (navbar, modales, pills de filtros), botón CTA consistente en hero/nav/formulario, mismas tarjetas para galería y atractivos. |
| H5 | **Prevención de errores** | ✅ | `min` en los date inputs (hoy), `selectOverlap: false` en el calendario bloquea fechas ocupadas antes del submit, validación de solape antes del envío, placeholders de EmailJS detectados antes de enviar. |
| H6 | **Reconocer antes que recordar** | ⚠️ → ✅ corregido | Leyenda Libre/Ocupado visible junto al calendario; el clic precarga check-in/out. Los campos de contacto no ofrecían autocompletado nativo; corregido con `autocomplete` (Hallazgo 2). |
| H7 | **Flexibilidad y eficiencia de uso** | ✅ | Filtros de galería (atajos para llegar a "Piscina"), selección por arrastre en el calendario, WhatsApp flotante como canal rápido, anclas de nav para saltos directos. |
| H8 | **Diseño estético y minimalista** | ✅ | Jerarquía tipográfica clara, una sola paleta (tokens), sin ruido decorativo que compita con el CTA de reserva. |
| H9 | **Ayudar a reconocer, diagnosticar y recuperarse de errores** | ✅ | Alertas diferenciadas por severidad (`warning` = datos, `danger` = solape/envío) con mensajes accionables ("Probá otras noches", "escribinos por WhatsApp"). |
| H10 | **Ayuda y documentación** | ✅ | Hint bajo el botón con el correo de destino, políticas completas en modal, datos de contacto y mapa en la sección Ubicación. |

## Hallazgos detectados y corregidos (3)

### Hallazgo 1 — Filtros de galería sin estado accesible
- **Heurística:** H1 (visibilidad del estado) / H4.
- **Problema:** el pill activo solo se comunicaba visualmente (clase `active`). Una persona con lector de pantalla o que navega por teclado no puede saber qué filtro está seleccionado.
- **Corrección aplicada:** `aria-pressed` en cada botón `data-filter` (HTML) sincronizado con el estado en el handler de click (`app.js`). Ver commit de este PR.

### Hallazgo 2 — Campos de contacto sin autocompletado
- **Heurística:** H6 (reconocer antes que recordar).
- **Problema:** en móvil, `guestName`, `guestEmail` y `guestPhone` no declaraban `autocomplete`, por lo que el teclado no ofrecía datos guardados del usuario: más tipeo y más fricción en el paso crítico de conversión.
- **Corrección aplicada:** `autocomplete="name"`, `autocomplete="email"` y `autocomplete="tel"` en `index.html`.

### Hallazgo 3 — Link "Políticas de reserva" con salto al tope
- **Heurística:** H3 (control y libertad del usuario).
- **Problema:** el enlace del footer usaba `href="#"`, que al activar el modal además desplazaba la página al inicio: el usuario pierde su posición y ve un "parpadeo" que no esperaba.
- **Corrección aplicada:** `href="#policiesModal"` junto al trigger `data-bs-toggle="modal"`, eliminando el salto indeseado.

## Qué quedó fuera de alcance (registrar, no corregir en este TP)

- Las imágenes de galería son hotlinks a Unsplash: si el CDN falla, las cards quedan vacías (riesgo aceptado en ADR-001, mitigable migrando a assets propios).
- La ocupación se edita manualmente en `app.js` (NG-03): no hay validación de formato en el repo más allá del contrato documentado (mitigación en el Journey 2 de `usuarios.md`).
