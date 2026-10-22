# Informe de Auditoría Crítica — Sprint 2 (PP3-2026-S2)

**Alumno:** Leonardo Krell · **Repo:** `IES9018/LeonardoKrell_CabanasHuelten`
**Período:** 21/09 – 16/10/2026 · **Insumos ADI:** TP2 (arquitectura visible) y TP3 (diseño HCI)

## Incidentes detectados y correcciones

### INC-S2-01 — Commits duplicados en el PR de personas (TP3)
- **Qué falló:** el PR `feature/tp3-hci` contiene dos commits con mensaje idéntico `feat(tp3): agregar personas (docs/diseno/usuarios.md)` ([`55b25a9`](https://github.com/IES9018/LeonardoKrell_CabanasHuelten/commit/55b25a9) y [`b36e2e0`](https://github.com/IES9018/LeonardoKrell_CabanasHuelten/commit/b36e2e0)): la IA volvió a commitear sin verificar el `git log` reciente de la rama.
- **Cómo se detectó:** revisión del historial del PR antes del merge.
- **Corrección:** se conservaron ambos por trazabilidad (el contenido final es consistente y no rompe nada); se registró la lección: **revisar `git log` antes de cada commit** y evitar enmiendas duplicadas.
- **Qué lo previene ahora:** checklist de PR (commits convencionales y no redundantes) + revisión propia del historial antes del self-merge.

### INC-S2-02 — Tres problemas de usabilidad detectados en la auditoría heurística (TP3)
- **Qué falló:** los filtros de galería no exponían estado accesible (`aria-pressed` ausente, INC de H-01); los campos de contacto no declaraban `autocomplete` (H-02); el enlace "Políticas de reserva" del footer usaba `href="#"` y saltaba al tope de la página (H-03).
- **Cómo se detectó:** auditoría contra las 10 heurísticas de Nielsen (`docs/diseno/auditoria-heuristica.md`), prueba manual con teclado y en 360 px.
- **Corrección:** los **3 hallazgos fueron corregidos en código** en la misma iteración: `index.html` (filtros con `aria-pressed`, `autocomplete` en nombre/email/teléfono, `href="#policiesModal"`) y `app.js` (sincronización de `aria-pressed` en el handler de filtros). Evidencia: `docs/diseno/auditoria-heuristica.md` §Hallazgos + [PR #6](https://github.com/IES9018/LeonardoKrell_CabanasHuelten/pull/6).
- **Qué lo previene ahora:** arnés §4: toda corrección de auditoría se registra en `auditoria-heuristica.md` con el fix aplicado; los tests automatizados cubren `aria-pressed` (test 10).

### INC-S2-03 — Documentación completa con 0 implementación (cambio de enfoque)
- **Qué falló:** al cruzar el estado real del repo contra el plan de sprints, se detectó que TP1–TP3 estaban mergeados como documentación de un proyecto (Portal de Calificaciones) que **nunca se implementó** (DEL-S2-01: núcleo funcional = 0 código). El README además contradecía el estado real (ver INC-S1-02).
- **Cómo se detectó:** auditoría de estado Sprint 2: `git ls-files | grep -v docs` no arrojaba código; los RF seguían todos "Pendiente" pese a que el README decía "TP2 completado".
- **Corrección:** cambio de enfoque total al proyecto **Cabañas Hueltén** (landing real, ya funcional): todo el contenido del portal fue eliminado y los TP1–TP3 reescritos sobre el nuevo proyecto en [PR #6](https://github.com/IES9018/LeonardoKrell_CabanasHuelten/pull/6), comunicado al docente en [Issue #4](https://github.com/IES9018/proyecto-adi-2026/issues/4). El DEL-S2-01 se cumplió con la landing operativa y el DEL-S2-03 con la suite de 12 tests (ver `docs/pruebas/reporte-sprint2.md`).
- **Qué lo previene ahora:** definición de *done* = evidencia ejecutable (tests/PR), auditar estado con filesystem y no con prosa de IA.

## Verificación de la rúbrica S2

| Criterio | Evidencia |
|----------|-----------|
| Git Flow y trazabilidad | PRs #4, #5 (histórico), #6, #7, #8 con plantilla; self-merge documentado |
| Auditoría crítica de código | Este informe (3 incidentes con correcciones enlazadas) |
| Calidad automatizada | `npm test` 12/12 verdes · lint OpenAPI 0 errores/0 warnings |
| Seguridad base | Cero secretos en repo · placeholders EmailJS · `.gitignore` activo |
