# ADR-005: Estrategia Web — Estático Single-Page vs SSR vs MPA vs Solo-API

**Fecha:** 2026-10-22
**Estado:** Aceptado

## Contexto

Hay que elegir la estrategia de entrega web del sitio Cabañas Hueltén: cómo llega el HTML al navegador, dónde vive la lógica y qué superficie de red expone el proyecto. Las restricciones son: NG-01 (sin backend), un solo desarrollador, fechas de PP3 (Sprint 3: contratos, seguridad y despliegue), y un dueño que publica cambios con commits.

## Decisión

**Estático single-page con lógica 100% en cliente (ya adoptado en ADR-002) y contrato HTTP documentado sobre los servicios externos que el navegador consume.** Específicamente:

- El HTML se sirve sin renderizar en servidor (archivos estáticos en GitHub Pages).
- No hay API propia: el contrato OpenAPI (`docs/arquitectura/api-contracts.yaml`) documenta la **superficie HTTP externa** que los flujos críticos usan (EmailJS, WhatsApp, Maps, Unsplash, jsDelivr), trazada a los RF.
- La "capa de servidor" de facto es EmailJS: el único servicio que recibe escrituras del usuario.

## Alternativas Descartadas

| Opción | Descripción | Por qué se descarta (criterios objetivos) |
|--------|-------------|-------------------------------------------|
| **SSR (Astro/Next/Nuxt)** | Render en servidor por request o build | Exige toolchain Node y un host que ejecute SSR (costo > 0); el contenido cambia ≤ 1 vez/mes → beneficio de SEO incremental no justifica infraestructura (criterio: costo operativo y frecuencia de cambios) |
| **MPA multipágina (HTML por sección)** | `index/galeria/reservas.html` separadas | Duplica nav/footer y rompe el flujo "scroll → reservar" del Journey 1; más archivos que mantener para 4 secciones (criterio: superficie de mantenimiento vs número de secciones) |
| **Solo-API + SPA (backend propio REST + frontend separado)** | API propia con JWT y persistencia | Viola NG-01/NG-02/NG-03; agrega servidor, base de datos, auth y deploy de dos piezas para un formulario que EmailJS resuelve (criterio: complejidad de operación vs valor entregado; ver ADR-003) |
| **PWA con shell offline** | Service worker + caché de shell | Contradice NG-06 y agrega superficie de fallo (stale assets) en un sitio cuya información crítica (ocupación) debe estar siempre fresca (criterio: frescura de datos > disponibilidad offline) |

## Consecuencias

- **Positivas:** deploy = publicar estáticos (GitHub Pages, DEL-S3-04); contrato explícito de la única escritura relevante (EmailJS) habilita lint en CI (TP6) y threat model con ubicación concreta; cero costos de runtime.
- **Negativas / Riesgos:** todo el control de acceso es de mentira (cualquiera puede leer el JS) — asumido y documentado en `threat-model-lite.md` (T-01, T-05); el rate-limit depende de EmailJS, no nuestro; si en el futuro hay que pagar/confirmar reservas online, esta decisión debe reabrirse (revisitar este ADR).
