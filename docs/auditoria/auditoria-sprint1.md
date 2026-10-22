# Informe de Auditoría Crítica — Sprint 1 (PP3-2026-S1)

**Alumno:** Leonardo Krell · **Repo:** `IES9018/LeonardoKrell_CabanasHuelten` (antes `LeonardoKrell_PortalDeCalificaciones`)
**Período:** 24/08 – 18/09/2026 · **Rúbrica:** `docs/auditoria/RUBRICA_AUDITORIA_S1.md`
**Método:** revisión de `git log` y diff de cada PR + verificación de artefactos contra el filesystem (nada se da por bueno según el README).

> Nota de trazabilidad: los commits del período inicial pertenecen al enfoque original (Portal de Calificaciones). Se conservan en el historial; el repo fue migrado por completo a Cabañas Hueltén en el PR #6 (ver `auditoria-sprint2.md`).

## Incidentes detectados y correcciones

### INC-S1-01 — Arnés creado con extensión incorrecta
- **Qué falló:** la IA generó el arnés de control como `.opencoderules.md` (con extensión), cuando el estándar de la cátedra exige el archivo exacto `.opencoderules` en la raíz (sin extensión). Un arnés con otro nombre **no lo lee el agente**.
- **Cómo se detectó:** verificación manual del checklist Fase 2 contra los archivos reales del repo.
- **Corrección:** commit [`2f035ca`](https://github.com/IES9018/LeonardoKrell_CabanasHuelten/commit/2f035ca) `fix: renombrar .opencoderules.md a .opencoderules (sin extensión)`; posteriormente el archivo fue eliminado y recreado correctamente en [`1f6fcdc`](https://github.com/IES9018/LeonardoKrell_CabanasHuelten/commit/1f6fcdc).
- **Qué lo previene ahora:** arnés §1 (alcance) y checklist de PR; el paso de apertura de toda entrega verifica `ls` de los archivos obligatorios antes de abrir el PR.

### INC-S1-02 — README declaraba estado y estructura inexistentes
- **Qué falló:** el README del repo decía "TP2 completado · Próximo: TP3" y mostraba un árbol de carpetas Django (`manage.py`, `usuarios/`, `calificaciones/`) que **no existía en el repo** (cero archivos de código). La afirmación la generó la IA al redactar el README sin contrastarla con el filesystem.
- **Cómo se detectó:** auditoría de estado con `git ls-files` y `git status` (evidencia dura) frente a lo que decía el documento.
- **Corrección:** el README fue reescrito en la migración del proyecto (PR #6) con una regla nueva: **solo se documenta lo que existe en el repo**, y la estructura declarada se verifica con `ls`. Evidencia: [PR #6](https://github.com/IES9018/LeonardoKrell_CabanasHuelten/pull/6).
- **Qué lo previene ahora:** arnés §4 ("evidencia = git/PR, no README") + verificación de estado por filesystem en cada cierre de entrega.

### INC-S1-03 — Especificación sin implementación asociada (vibe coding)
- **Qué falló:** el SPEC v1 (RF-01…RF-17) y 4 ADRs se entregaron completos mientras el repo no tenía una sola línea de código ejecutable. Documentación plausible ≠ producto: los RF no eran probables ni trazables a commits.
- **Cómo se detectó:** cruce de la tabla de RF (todos "Pendiente") contra el historial de commits (solo `docs:`).
- **Corrección:** el enfoque del proyecto se replanteó y la entrega se rehízo sobre Cabañas Hueltén con **evidencia ejecutable**: la landing + suite de 12 tests (Sprint 2, ver `docs/pruebas/reporte-sprint2.md`). Evidencia: [Issue #4](https://github.com/IES9018/proyecto-adi-2026/issues/4), PR #6, PR #8.
- **Qué lo previene ahora:** arnés §4: "toda funcionalidad nueva arranca como RF" y la definición de *done* del curso exige evidencia en PR/tests, no en prosa.

## Verificación de la rúbrica S1

| Criterio | Peso | Evidencia |
|----------|------|-----------|
| Git Flow y trazabilidad | 25% | Ramas `feature/*` + PRs con plantilla (#6, #7, #8…); commits convencionales en `git log` |
| Auditoría crítica de código | 35% | Este informe (3 incidentes con correcciones enlazadas) |
| Calidad automatizada local | 20% | `npx @redocly/cli lint` 0 errores · `npm test` 12/12 (desde S2) |
| Seguridad base | 20% | `.gitignore` funcional; cero secretos (placeholders EmailJS verificados con búsqueda de claves en el repo) |
