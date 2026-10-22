# Postmortem del cuatrimestre — Cabañas Hueltén

Retrospectiva de incidentes reales del proyecto. Para cada uno: **qué falló, cómo se detectó, qué capa lo previene hoy**. Todos son verificables en el historial y en las auditorías de PP3.

---

## 1. Estado alucinado en el README (Sprint 1)

- **Qué falló:** la IA redactó un README que declaraba "TP2 completado" y una rama con estados de avance que no existían en el repositorio. Era un reporte de progreso sin evidencia.
- **Cómo se detectó:** verificación manual con `git ls-files` y `git log`: los archivos referenciados no estaban trackeados ni commiteados.
- **Qué capa lo previene hoy:**
  - Proceso: ninguna afirmación de avance se publica sin evidencia enlazable (commit/PR/artefacto).
  - Arnés vFinal §3: prohibición explícita de "comunicar estado sin evidencia verificable".
  - Evidencia: [auditoría sprint 1 — incidente 1](./auditoria/auditoria-sprint1.md), corrección aplicada al README.

## 2. Arnés con extensión incorrecta (Sprint 1)

- **Qué falló:** el arnés se creó como `.opencoderules.md` (con extensión `.md`), nombre que ninguna herramienta reconoce. El artefacto obligatorio existía pero era inútil.
- **Cómo se detectó:** checklist de entregables TP1 (nombre exacto del artefacto).
- **Qué capa lo previene hoy:**
  - Proceso: checklist de verificación de nombres exactos de artefactos antes del PR.
  - Arnés vFinal: el arnés es `.opencoderules` sin extensión.
  - Evidencia: [auditoría sprint 1 — incidente 2](./auditoria/auditoria-sprint1.md).

## 3. Template literal no resuelto por Vite (Sprint 2, tests)

- **Qué falló:** la primera versión de la suite usaba `import('../app.js?case=' + n)` y Vite falló con "Unknown variable dynamic import" (las rutas dinámicas no se analizan en build). La IA propuso un template literal que tampoco funcionó; 12/12 tests fallaban en el colecto.
- **Cómo se detectó:** `npm test` local antes del PR (el CI no hubiera dejado pasar el error, pero no llegó a commitearse).
- **Qué capa lo previene hoy:**
  - Proceso: la suite completa debe estar verde localmente antes de abrir PR (regla del arnés §4).
  - Solución técnica: import dinámico con `/* @vite-ignore */` y `new URL('../app.js?case=N', import.meta.url).href` (URL absoluta por test).
  - Evidencia: [reporte de pruebas sprint 2](./pruebas/reporte-sprint2.md), PR #8.

## 4. YAML inválido por `:` sin escapar (Sprint 2, contrato)

- **Qué falló:** el primer `api-contracts.yaml` incluyó un ejemplo con `:` sin comillas en un valor libre; el lint de Redocly lo rechazó (error del parser). El contrato roto casi llegó al repo.
- **Cómo se detectó:** `npx @redocly/cli lint` en local, previo al push.
- **Qué capa lo previene hoy:**
  - Proceso: lint obligatorio antes de cada PR (arnés vFinal §4, NV-3).
  - Automatización: el CI corre `npm run lint:api` en cada PR y en cada push a main.
  - Evidencia: PR #7 (el YAML quedó lint-clean antes del merge: 0 errores / 0 warnings).

---

## Cierre reflexivo

Los cuatro incidentes comparten una raíz: **publicar o construir sin verificar** (estado sin evidencia, artefacto mal nombrado, código sin tests, contrato sin lint). La respuesta del cuatrimestre no fue "pedirle a la IA que sea más cuidadosa", sino **capas**: checklist de nombres exactos, suite local verde como gate de PR, lint automatizado en CI, y un arnés que prohíbe los atajos que causaron cada incidente. La lección personal es que la IA acelera la escritura, pero la verificación sigue siendo mi trabajo: cada vez que confié en su reporte sin ejecutarlo, apareció un error; cada vez que ejecuté la verificación, el problema se cortó antes del remoto. La arquitectura del sitio es deliberadamente simple (estático, sin backend); la arquitectura de *cómo se construye* —contrato, arnés, tests, CI— es la que absorbió los errores y es el verdadero legado del cuatrimestre.
