# Auditoría de código asistido por IA — Sprint 3 (PP3)

| ID | Incidente (qué falló) | Detección | Corrección | Capa de prevención |
|----|----------------------|-----------|------------|--------------------|
| **S3-1** | El primer `ci.yml` omitía el smoke check de artefactos (`node --check app.js`): el CI pudo haber quedado verde con `app.js` con errores de sintaxis que Vitest no detecta en JSDOM (el mock/parseo fallaría distinto). | Revisión del workflow contra la definición de "build" de la consigna TP6. | Se agregó el paso `node --check app.js` + verificación de `index.html`/`styles.css`. | Checklist de PR contra consigna; CI como único árbitro de "qué es build" en un sitio sin build. |
| **S3-2** | Intento de escribir `CHANGELOG.md` con una fecha de release futura (10–17 nov) que mentía sobre cuándo se publicaba; el changelog es un artefacto de evidencia, no un plan. | Auto-revisión antes del commit. | Fecha real del corte documentado: 2026-10-22; las fechas del calendario de cátedra viven en la consigna, no en el changelog. | Proceso: los artefactos solo registran hechos verificados (misma raíz del incidente S1-1). |
| **S3-3** | La v3 del arnés tenía las reglas NV (§5) duplicadas conceptualmente con §3/§4; consolidar mal podía dejar dos fuentes de verdad compitiendo (justamente lo que la cátedra pide evitar). | Revisión de coherencia del arnés al escribir la vFinal. | Reescritura completa como vFinal sin duplicados: NV-1/NV-2 viven en §3 (prohibiciones), NV-3 en §4 (proceso); se eliminó la sección redundante. | Arnés vFinal congelado; cambios solo vía PR + ADR/SPEC. |

## Verificación de calidad aplicada al Sprint 3

- `npm run lint:api` → contrato OpenAPI válido ("Woohoo! Your API description is valid").
- `npm test` → 12/12 verdes.
- `npm run budgets` → RNF-03 4.6/200 KB, RNF-04 11.0/100 KB (PASS).
- CI en GitHub Actions corriendo los mismos tres gates + smoke check en cada PR (DEL-CIE-01: badge en README).
