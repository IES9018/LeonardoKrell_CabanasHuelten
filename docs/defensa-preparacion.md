# Guion de defensa integradora — Cabañas Hueltén

Preparación para la defensa oral (jue 19 nov 2026). Recorrido de 5 minutos + preguntas probable.

## 1. Pitch (30 s)

"Landing estática de cabañas de montaña en Malargüe: galería filtrable, calendario de ocupación y formulario de reserva que envía por EmailJS con fallback a correo y WhatsApp. Cuatro archivos, cero backend, cero build — y toda la arquitectura visible en 6 ADR, contrato OpenAPI, threat model, 12 tests y CI."

## 2. Recorrido del repo (3 min)

1. **`index.html`** → nav colapsable, hero, amenities, galería, reservas (calendario + formulario), ubicación, modales. Mencionar `aria-pressed`, `autocomplete`, labels for/id.
2. **`app.js`** → IIFE: `occupiedRanges` (RA-04), validación anti-solape (CA-02), `EMAILJS_CONFIG` con placeholders (NV-1), hook `window.__EMAILJS_CONFIG__` para tests.
3. **`SPEC.md` vFinal** → RF/RNF/AC/RA + matriz de trazabilidad ADR ↔ restricciones (§9). El SPEC es el contrato vivo.
4. **ADR-001 y ADR-005** → ¿por qué estático y por qué no backend? Alternativas descartadas con criterio (frescura, costo, fechas).
5. **ADR-006 + `presupuestos-rendimiento.md`** → matriz mobile y RNF medibles con script en CI (muestra `npm run budgets` en vivo si hay tiempo).
6. **`api-contracts.yaml`** → contrato primero (NV-3): las 5 operaciones externas descritas antes de implementar; lint en CI.
7. **`tests/app.test.js`** → correr `npm test` en vivo: 12/12.
8. **CI + CHANGELOG + tag** → badge, `ci.yml`, release v0.1.0.
9. **`docs/postmortem-cuatrimestre.md`** → 4 incidentes reales con IA y sus capas de prevención.

## 3. ADR favorito (para "¿qué decisión te representa?")

**ADR-006 (estrategia mobile)** o **ADR-005 (web segura)**. Argumento: la matriz ponderada con criterios del contexto real (1 dev, fechas, frescura de datos) — no una moda — es lo que define el proyecto. Resaltar que PWA se descartó por NG-06 y frescura de ocupación.

## 4. Arrepentimiento / lección (para "¿qué harías distinto?")

"Arranqué el arnés con extensión `.opencoderules.md`, que ninguna herramienta lee; lo detecté con el checklist de entregables. La lección: los artefactos obligatorios se verifican por nombre exacto y validez, no por intención. También commiteé sin correr los tests una vez y perdí un ciclo completo con el dynamic import de Vitest — desde entonces el gate local es innegociable."

## 5. Demo (2 min, si hay navegador)

1. Abrir la URL pública (o `index.html` local) en DevTools con emulación 393 px → nav colapsada, formulario 1 columna.
2. Galería: filtrar "Piscina", abrir lightbox, CTA de WhatsApp.
3. Reservas: intentar un rango que solape → alerta y no envía. Seleccionar rango libre → formulario → Enviar con placeholders → fallback visible con correo y WhatsApp.
4. Mostrar `npm test` y `npm run budgets` en terminal (verdes).

## 6. Preguntas probable y respuestas cortas

- **¿Por qué no un backend?** Conversión de visitas en solicitudes no necesita persistencia propia; EmailJS + fallback cubre el flujo con cero mantenimiento (NG-01, ADR-005).
- **¿Y los datos de ocupación?** Versionados en `app.js` (RA-04): el dueño publica cambios por git; el repo es el historial de disponibilidad. Si escala, se reabre ADR-003.
- **¿Seguridad sin backend?** Threat model T-01..T-06: claves nunca en repo (NV-1), allow-list de orígenes en EmailJS, entradas validadas (NV-2), sin datos sensibles almacenados.
- **¿Cómo mides el rendimiento?** Presupuestos RNF-01..05 con herramienta y modo por uno; RNF-03/04 en CI; LCP/INP/Performance con Lighthouse en la URL pública.
- **¿Qué pasó con el proyecto original?** Issue #4 + PR #6: migración completa con historial conservado; el nombre del repo es el contrato del TP1.
- **¿Dónde queda la evidencia de IA?** Auditorías de los 3 sprints (3 incidentes c/u) con correcciones enlazadas y capas de prevención; postmortem con la reflexión final.
