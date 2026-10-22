# 🏔️ Cabañas Hueltén

> **Proyecto de Arquitectura y Diseño de Interfaces · IES 9-018 · 2026**
> Tecnicatura Superior en Desarrollo de Software · Prof. Paulo Alvarez

[![CI](https://github.com/IES9018/LeonardoKrell_CabanasHuelten/actions/workflows/ci.yml/badge.svg)](https://github.com/IES9018/LeonardoKrell_CabanasHuelten/actions/workflows/ci.yml)
[![Release](https://img.shields.io/badge/release-v0.1.0-blue)](https://github.com/IES9018/LeonardoKrell_CabanasHuelten/releases/tag/v0.1.0)

Landing estática de **Cabañas Hueltén** (Malargüe, Mendoza): presentación del alojamiento, galería filtrable, calendario de ocupación y formulario de solicitudes de reserva vía EmailJS.

**Sitio desplegado:** https://ies9018.github.io/LeonardoKrell_CabanasHuelten/

---

## 🚀 Ejecución

No hay build ni dependencias locales: abrí `index.html` en el navegador, o serví la carpeta con cualquier servidor estático:

```bash
# opción mínima
python -m http.server 8000
# → http://localhost:8000
```

Para probar la suite y los gates de calidad (dev-only):

```bash
npm ci
npm test          # 12 tests (Vitest + JSDOM)
npm run lint:api  # contrato OpenAPI
npm run budgets   # presupuestos de peso (RNF-03/04)
```

Para activar el envío real de reservas, cargá tus claves de [EmailJS](https://www.emailjs.com/) en `app.js` → `EMAILJS_CONFIG` (hoy son placeholders y el sitio usa el fallback correo/WhatsApp). Checklist completo: [`docs/deploy/deploy.md`](./docs/deploy/deploy.md).

---

## 📁 Estructura

```
LeonardoKrell_CabanasHuelten/
├── index.html              ← página única (nav, hero, galería, reservas, ubicación, modales)
├── app.js                  ← estado, galería, calendario, validación y envío
├── styles.css              ← design tokens y estilos propios sobre Bootstrap
├── foto.png                ← logo
├── SPEC.md                 ← especificación vFinal (RF, RNF, Non-Goals, contratos, changelog)
├── CHANGELOG.md            ← historial de cambios (release v0.1.0)
├── .opencoderules          ← arnés de IA (vFinal)
├── INSTRUCTIONS.md         ← instrucciones extendidas del agente
├── package.json            ← devDeps: vitest, jsdom, @redocly/cli (el sitio no tiene build)
├── scripts/check-budgets.mjs
├── tests/app.test.js       ← 12 tests por RF
├── .github/workflows/ci.yml
└── docs/
    ├── adr/                ← ADR-001..006
    ├── arquitectura/       ← C4, api-contracts.yaml, presupuestos, offline-sync
    ├── seguridad/          ← threat-model-lite.md
    ├── auditoria/          ← auditorías de IA sprints 1-3
    ├── pruebas/            ← reporte de pruebas sprint 2
    ├── diseno/             ← personas, journeys, wireframes (desktop y móvil), heurística
    ├── deploy/             ← checklist de despliegue y mediciones
    ├── postmortem-cuatrimestre.md
    ├── informe-final.md
    └── defensa-preparacion.md
```

---

## 📖 Documentación

| Documento | Contenido |
|-----------|-----------|
| [SPEC.md](./SPEC.md) | RF-01..RF-13, RNF-01..05, AC, RA-01..05, Non-Goals, contratos, changelog v1→vFinal |
| [CHANGELOG.md](./CHANGELOG.md) | Release v0.1.0 (Keep a Changelog) |
| [ADR-001](./docs/adr/ADR-001-stack-tecnologico.md) | Stack: estático + Bootstrap + FullCalendar + EmailJS |
| [ADR-002](./docs/adr/ADR-002-estilo-arquitectonico.md) | Estilo: sitio estático single-page con lógica en cliente |
| [ADR-003](./docs/adr/ADR-003-persistencia.md) | Persistencia: datos embebidos en `app.js` |
| [ADR-004](./docs/adr/ADR-004-stack-ui.md) | UI: Bootstrap + design tokens + Google Fonts |
| [ADR-005](./docs/adr/ADR-005-estrategia-web.md) | Web segura: contrato primero, threat model, sin backend |
| [ADR-006](./docs/adr/ADR-006-estrategia-mobile.md) | Mobile: responsive adaptativo vs PWA/nativa/híbrida |
| [C4 Contexto](./docs/arquitectura/C4-contexto.md) | Sistema, actores y servicios externos |
| [C4 Contenedores](./docs/arquitectura/C4-contenedores.md) | Contenedores internos y dependencias CDN |
| [api-contracts.yaml](./docs/arquitectura/api-contracts.yaml) | Contrato OpenAPI 3.0.3 de servicios externos |
| [Threat model](./docs/seguridad/threat-model-lite.md) | STRIDE lite T-01..T-06 |
| [Presupuestos](./docs/arquitectura/presupuestos-rendimiento.md) | RNF medibles y herramientas |
| [Despliegue](./docs/deploy/deploy.md) | GitHub Pages, checklist EmailJS, mediciones |
| [Postmortem](./docs/postmortem-cuatrimestre.md) | 4 incidentes reales con IA y sus capas |
| [Informe final](./docs/informe-final.md) | Estado de todos los entregables (DEL-CIE-03) |

---

## 👤 Autor

**Leonardo Krell** · Tecnicatura Superior en Desarrollo de Software · IES 9-018 · 2026
