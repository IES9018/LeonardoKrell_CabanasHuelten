# Changelog

Todo cambio relevante del proyecto se documenta aquí. Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/). Versionado: [Semantic Versioning](https://semver.org/lang/es/).

## [0.1.0] — 2026-10-22

Primera versión completa del sitio y de la documentación arquitectónica (TP1–TP6 · PP3 sprints 1–3).

### Added
- Landing estática de una página: hero, amenidades, galería filtrable (9 fotos, 4 categorías), calendario de ocupación (FullCalendar 6), formulario de reserva con validación anti-solape y fallback EmailJS → correo/WhatsApp, ubicación con mapa embebido, modales de políticas y foto.
- Especificación `SPEC.md` v1→vFinal: RF-01..RF-13, RNF-01..RNF-05 medibles, AC-01..AC-03, RA-01..RA-05, Non-Goals NG-01..NG-06, changelog y matriz de trazabilidad ADR ↔ restricciones.
- ADR-001..ADR-006 (stack, estilo arquitectónico, persistencia, UI, estrategia web segura, estrategia mobile).
- Documentación C4 (contexto y contenedores), threat model lite (T-01..T-06), contrato OpenAPI 3.0.3 (`api-contracts.yaml`, lint-clean con Redocly).
- Diseño: personas, journeys, wireframes escriturales (desktop y móvil <400 px), auditoría heurística con 6 heurísticas de Nielsen y fixes aplicados.
- Arnés de IA `.opencoderules` vFinal (alcance, estándares, NV-1..NV-3, prohibiciones, proceso).
- Suite de 12 tests (Vitest + JSDOM) trazados por RF: calendario, anti-solape, filtros, validación y fallback de envío.
- CI (`.github/workflows/ci.yml`): lint OpenAPI + tests + presupuestos de peso (RNF-03/04) + smoke check; badge en README.
- Scripts dev: `npm test`, `npm run lint:api`, `npm run budgets` (`scripts/check-budgets.mjs`).
- Documentación PP3: auditorías de sprints 1–3, reporte de pruebas sprint 2, postmortem del cuatrimestre, informe final, checklist de despliegue y guion de defensa.

### Changed
- **Cambio de enfoque del proyecto (documentado en Issue IES9018/proyecto-adi-2026#4):** el repositorio se migró del "Portal de Calificaciones" al sitio "Cabañas Hueltén", con rama de migración y PR propio (#6) para conservar el historial.
- Nombre del repo: `LeonardoKrell_PortalDeCalificaciones` → `LeonardoKrell_CabanasHuelten` (el nombre es el contrato del TP1).

### Removed
- Todo el contenido del Portal de Calificaciones (HTML/CSS/JS, SPEC/arquitectura/diseño del portal) fuera del historial de git, en el PR de migración.
