# Informe final — Cabañas Hueltén (DEL-CIE-03)

**Proyecto:** Landing estática de Cabañas Hueltén (Malargüe, Mendoza) — presentación, galería filtrable, calendario de ocupación y solicitudes de reserva por EmailJS con fallback.
**Alumno:** Leonardo Krell · Tecnicatura Superior en Desarrollo de Software · IES 9-018 · 2026
**Cátedras:** Arquitectura y Diseño de Interfaces (TP1–TP6) · Prácticas Profesionalizantes III (PP3).

## 1. Qué se construyó

Cuatro archivos de producción (`index.html`, `styles.css`, `app.js`, `foto.png`) sin build, desplegados en GitHub Pages, más una arquitectura documentada completa: 6 ADR, modelos C4, threat model, contrato OpenAPI lint-clean, diseño UX con wireframes desktop/móvil, suite de 12 tests, CI y presupuestos de rendimiento medibles.

## 2. Estado de entregables

### Cátedra PP3 — Deliverables

| ID | Deliverable | Artefacto | Estado |
|----|-------------|-----------|--------|
| DEL-S1-03 | Auditoría de código asistido por IA (3 incidentes) | [auditoria-sprint1.md](./auditoria/auditoria-sprint1.md) | ✅ |
| DEL-S2-03 | Reporte de pruebas del sprint (5 tests → 12 reales) | [reporte-sprint2.md](./pruebas/reporte-sprint2.md) | ✅ |
| DEL-S2-04 | Auditoría de código asistido por IA (3 incidentes) | [auditoria-sprint2.md](./auditoria/auditoria-sprint2.md) | ✅ |
| DEL-S2-01 | Núcleo funcional operativo | Landing verificada (sección 5 del reporte) | ✅ |
| DEL-S3-03 | Presupuestos de rendimiento medidos con evidencia | [deploy.md](./deploy/deploy.md) | ✅ |
| DEL-S3-04 | Despliegue del sitio | GitHub Pages (URL en deploy.md) | ✅ |
| DEL-S3-05 | Auditoría de código asistido por IA (3 incidentes) | [auditoria-sprint3.md](./auditoria/auditoria-sprint3.md) | ✅ |
| DEL-CIE-01 | CI en rojo con evidencia (práctica de CI) | [ci.yml](../.github/workflows/ci.yml) + badge README | ✅ |
| DEL-CIE-02 | Release publicado con CHANGELOG y tag anotado | [CHANGELOG.md](../CHANGELOG.md) · tag `v0.1.0` | ✅ |
| DEL-CIE-03 | Informe final (este documento) | `docs/informe-final.md` | ✅ |

### Cátedra ADI — Trabajos prácticos

| TP | Tema | Artefacto principal |
|----|------|---------------------|
| TP1 | Nombre + SDD (SPEC + arnés) | `SPEC.md` v1, `.opencoderules` |
| TP2 | Diagramas C4 + ADRs | `docs/arquitectura/C4-*.md`, ADR-001..003 |
| TP3 | Wireframes + auditoría heurística | `docs/diseno/`, ADR-004 |
| TP4 | API-first + seguridad | `api-contracts.yaml`, `threat-model-lite.md`, ADR-005, arnés NV-1..3 |
| TP5 | Estrategia mobile medible | ADR-006, `presupuestos-rendimiento.md`, `offline-sync.md`, wireframes <400 px, RNF |
| TP6 | CI + release + arnés vFinal | `ci.yml`, `CHANGELOG.md`, tag `v0.1.0`, arnés vFinal, postmortem |

## 3. Cómo se construyó (proceso)

- **Especificación primero:** RF/Non-Goals → restricciones RA → contratos OpenAPI → código. Cada ADR resuelve una decisión con alternativas descartadas.
- **Calidad automatizada:** `npm test` (12 tests por RF), `npm run lint:api` (contrato), `npm run budgets` (RNF-03/04) — los mismos gates en local y en CI.
- **Entrega por PR:** ramas `feature/*`, template con checklist de calidad, merge propio registrado. Migración de proyecto en PR #6; entregas en PRs #7 (TP4), #8 (PP3), #9 (TP5), #10 (TP6).
- **IA con arnés:** el `.opencoderules` vFinal + la revisión manual cortaron 10 incidentes reales documentados en las auditorías de los 3 sprints.

## 4. Evidencia dura

- Repo: `https://github.com/IES9018/LeonardoKrell_CabanasHuelten`
- Sitio: `https://ies9018.github.io/LeonardoKrell_CabanasHuelten/`
- CI: badge en README; workflow `.github/workflows/ci.yml`.
- Release: tag anotado `v0.1.0` con `CHANGELOG.md`.
- Contrato: OpenAPI 3.0.3 validado con Redocly (0 errores / 0 warnings).
- Presupuestos: JS propio 4.6 KB gzip (tope 200); primer contacto 11.0 KB gzip (tope 100).

## 5. Deuda conocida y próximos pasos (para el dueño)

1. **Claves EmailJS:** reemplazar placeholders en el entorno (checklist en deploy.md) — fuera de git por NV-1.
2. **Fotos reales:** sustituir las 9 URLs de Unsplash por fotografías del establecimiento (mismos parámetros de tamaño/quality).
3. **Contenido:** confirmar teléfono, dirección exacta, precios y políticas con el dueño antes de difundir.
4. **Ocupación:** el calendario se actualiza editando `occupiedRanges` (git como historial); si el volumen crece, reabrir ADR-003 con una hoja pública como fuente de verdad.
5. **Dominio propio:** CNAME + DNS cuando se decida; el sitio ya es compatible.
