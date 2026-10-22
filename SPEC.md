# SPEC-000: Cabañas Hueltén — Landing y Solicitudes de Reserva

> **Estado: vFinal — CONGELADA (2026-10-22).** No se agregan RF/RNF ni cambian contratos sin un PR que actualice esta sección, el ADR correspondiente y el changelog. Deuda de contenido solo vía Issue.

## 1. Contexto y Propósito

Cabañas Hueltén es un alojamiento de montaña en Malargüe, Mendoza (piscina climatizada, chimenea, vistas a los Andes), a pocos minutos de Las Leñas, La Payunia y las termas del Cajón del Grande. El establecimiento necesita una presencia web que:

1. **Presente el alojamiento** (amenidades, galería, ubicación, políticas) para que un turista evalúe el lugar antes de reservar.
2. **Muestre la disponibilidad** con un calendario de ocupación siempre visible.
3. **Capture solicitudes de reserva** y las envíe al correo del establecimiento, sin requerir backend ni motor de pagos.

El sitio es una **landing estática de una sola página** (SPA de anclas) con lógica de cliente. El objetivo es convertir visitas en solicitudes de reserva medibles, con la menor superficie operativa posible para un proyecto de una sola persona.

## 2. Requerimientos Funcionales

- [x] **RF-01:** El sitio presenta el alojamiento con hero, franja de amenidades, sección de ubicación y datos de contacto (teléfono, correo, mapa).
- [x] **RF-02:** El sitio muestra una galería de fotos con filtros por categoría (Todas · Interiores · Exteriores · Piscina).
- [x] **RF-03:** El sitio permite ver el detalle de una foto en un lightbox (modal) con título y pie de foto.
- [x] **RF-04:** El sitio muestra un calendario de ocupación mensual con los tramos reservados marcados visualmente.
- [x] **RF-05:** El sitio permite seleccionar check-in y check-out del rango deseado haciendo clic o arrastrando sobre el calendario.
- [x] **RF-06:** El sistema valida la solicitud de reserva: campos obligatorios, check-out posterior al check-in, fechas no anteriores a hoy y rango no superpuesto con tramos ocupados.
- [x] **RF-07:** El sistema envía la solicitud de reserva al correo del establecimiento vía EmailJS; si el servicio no está configurado, informa el fallback a correo directo y WhatsApp.
- [x] **RF-08:** El sitio publica atractivos turísticos de Malargüe por temporada (invierno/verano/otoño/primavera) más los de todo el año, en un modal conmutable.
- [x] **RF-09:** El sitio publica las políticas de reserva (horarios, seña, cancelaciones, mascotas) en un modal accesible.
- [x] **RF-10:** El sitio es responsive (mobile-first) y navegable por teclado en todos los componentes interactivos.

### Requerimientos de interfaz (criterios Gherkin)

- [x] **RF-11:** Filtrado de galería.
  - Given que estoy en la sección Galería, When hago clic en el filtro "Piscina", Then solo se muestran las cards de la categoría piscina y el filtro expone `aria-pressed="true"`.
- [x] **RF-12:** Selección de fechas desde el calendario.
  Given que estoy en la sección Reservas, When hago clic en un día libre del calendario, Then el campo check-in se completa con esa fecha; When hago clic en un segundo día posterior, Then check-out se completa y si el rango solapa una ocupación el sistema impide el envío con una alerta.
- [x] **RF-13:** Envío del formulario con servicio no configurado.
  Given que `EMAILJS_CONFIG.publicKey` es un placeholder, When envío el formulario válido, Then el sistema muestra una alerta de fallback con el correo del establecimiento y el enlace de WhatsApp, sin enviar la solicitud.

### Requisitos de accesibilidad

- [x] **AC-01:** Todos los componentes interactivos (filtros, cards de galería, switcher de temporada, botones de modal) son operables por teclado; las cards de galería manejan Enter y Espacio.
- [x] **AC-02:** El contraste de texto y CTA cumple WCAG AA en los pares de color definidos por los design tokens; los estados interactivos no dependen solo del color (incluyen borde/fondo).
- [x] **AC-03:** El formulario declara `label` asociado por `for`/`id` en todos los campos y `autocomplete` en nombre, email y teléfono; los modales usan `aria-labelledby` y `aria-hidden`.

### Requisitos no funcionales medibles (RNF)

> Presupuesto, herramienta y modo de ejecución detallados en [`docs/arquitectura/presupuestos-rendimiento.md`](./docs/arquitectura/presupuestos-rendimiento.md). RNF-03/RNF-04 se validan en CI (`node scripts/check-budgets.mjs`).

- [ ] **RNF-01:** LCP < 2.5 s en simulación 4G/móvil (Lighthouse sobre la URL desplegada).
- [ ] **RNF-02:** INP < 200 ms (Lighthouse).
- [x] **RNF-03:** JavaScript propio (`app.js`) < 200 KB gzip — verificado en CI.
- [x] **RNF-04:** HTML + CSS + JS propio < 100 KB gzip combinados — verificado en CI.
- [ ] **RNF-05:** Puntaje Performance Lighthouse (mobile) ≥ 90 en la URL pública.

## 3. Non-Goals (Límites del Alcance)

- **NG-01:** Sin backend ni base de datos: no hay persistencia server-side ni usuarios.
- **NG-02:** Sin motor de reservas en tiempo real ni pagos online: la solicitud no confirma la estadía hasta respuesta humana; la seña se gestiona fuera del sitio.
- **NG-03:** Sin autenticación ni panel de administración: la ocupación se actualiza editando el código versionado.
- **NG-04:** Sin CMS: todo cambio de contenido es un commit en el repo.
- **NG-05:** Sin multi-idioma: el sitio es solo español (rioplatense).
- **NG-06:** Sin PWA ni experiencia offline: depende de CDNs, mapa embebido y EmailJS.
- **NG-07:** Sin blog, reseñas ni motor de reseñas de terceros.

## 4. Stack Tecnológico y Restricciones

- Lenguaje/Framework: HTML5 + CSS3 + JavaScript vanilla (ES2020, IIFE `"use strict"`), sin paso de build.
- UI: Bootstrap 5.3.3 + Bootstrap Icons (CDN), Google Fonts (Cormorant Garamond, Outfit).
- Calendario: FullCalendar 6.1.15 (CDN).
- Envío de formularios: @emailjs/browser v4 (CDN); claves como placeholders configurables.
- Persistencia: ninguna (datos de ocupación y galería embebidos en `app.js`).

## 5. Contratos de Datos / Tipos

```typescript
type GalleryCategory = "interiores" | "exteriores" | "piscina";

interface OccupiedRange {
  start: string; // ISO YYYY-MM-DD (inclusivo)
  end: string;   // ISO YYYY-MM-DD (exclusivo)
  title: string; // "Ocupado" | "Temporada alta"
}

interface GalleryItem {
  category: GalleryCategory;
  title: string;
  caption: string;
  image: string; // URL
}

interface ReservationPayload {
  to_email: string;
  from_name: string;
  from_email: string;
  phone: string;
  guests: string; // "1".."6" ("6" = 6 o más)
  check_in: string;  // ISO YYYY-MM-DD
  check_out: string; // ISO YYYY-MM-DD
  message: string;
}

interface EmailJsConfig {
  publicKey: string;  // placeholder: YOUR_PUBLIC_KEY
  serviceId: string;  // placeholder: YOUR_SERVICE_ID
  templateId: string; // placeholder: YOUR_TEMPLATE_ID
  toEmail: string;    // hueltencabanas@yahoo.com.ar
}
```

**Contrato de servicios externos:** la superficie HTTP completa que consumen estos tipos está especificada en [`docs/arquitectura/api-contracts.yaml`](./docs/arquitectura/api-contracts.yaml) (OpenAPI 3.0.3), con los schemas nombrados `ReservationPayload`, `EmailJsSendRequest`, `EmailJsSendResponse` y `Error`, las 5 operaciones críticas de los flujos del Journey 1 y el esquema de credenciales `emailJsPublicKey`. Regla NV-3 del arnés: sin contrato lint-clean, no hay implementación (ver ADR-005).

## 6. Criterios de Aceptación

- [x] **CA-01:** El calendario renderiza todos los tramos de `occupiedRanges` como fondo ocupado y bloquea el clic sobre ellos.
- [x] **CA-02:** Enviar un rango que solape un tramo ocupado muestra alerta y no dispara el envío.
- [x] **CA-03:** Con claves de EmailJS en placeholder, el envío muestra alerta de fallback con correo y WhatsApp, sin errores en consola.
- [x] **CA-04:** Los filtros de galería muestran exactamente las fotos de la categoría elegida.
- [x] **CA-05:** El sitio es usable a 360 px de ancho (nav colapsada, formulario en una columna, calendario visible).

## 7. Restricciones Arquitectónicas

> Cada restricción es trazable a un ADR aceptado. Nada del stack puede cambiar sin actualizar primero el ADR y esta sección.

- **RA-01** *(ADR-001)*: El sitio debe abrirse directamente desde `index.html`, sin paso de build ni toolchain Node obligatoria.
- **RA-02** *(ADR-001)*: Dependencias solo por CDN, limitadas a Bootstrap 5.3, Bootstrap Icons, FullCalendar 6, @emailjs/browser 4 y Google Fonts. Nueva dependencia = ADR previo.
- **RA-03** *(ADR-002)*: Arquitectura single-page sin router: una `index.html`, secciones por ancla y un único módulo IIFE en `app.js`. Prohibidos frameworks y bundlers.
- **RA-04** *(ADR-003)*: Sin persistencia server-side. `occupiedRanges`, `galleryItems` y atractivos se versionan como constantes en `app.js`; el repo es el historial de disponibilidad.
- **RA-05** *(arnés §3)*: `EMAILJS_CONFIG` solo admite placeholders en el repo; las claves reales se configuran en el entorno de despliegue, nunca en git.

## 8. Changelog

| Versión | Fecha | Motivo |
|---------|-------|--------|
| v1 | 2026-10-22 | Especificación inicial (TP1): contexto, RF-01..RF-10, Non-Goals, contratos de datos y criterios de aceptación |
| v2 | 2026-10-22 | Arquitectura visible (TP2): sección de Restricciones Arquitectónicas RA-01..RA-05 trazables a ADR-001/002/003 |
| v3 | 2026-10-22 | Interfaces con criterios (TP3): RF-11..RF-13 en Gherkin, requisitos de accesibilidad AC-01..AC-03 y correcciones de la auditoría heurística |
| v4 | 2026-10-22 | Contratos antes que código (TP4): referencia a `api-contracts.yaml` con schemas nombrados, threat model `docs/seguridad/threat-model-lite.md` (T-01..T-06) y arnés v3 con reglas NV-1..NV-3 |
| v5 | 2026-10-22 | Mobile medible (TP5): RNF-01..RNF-05 con presupuestos y herramientas (ADR-006, `presupuestos-rendimiento.md`, `offline-sync.md` = Non-Goal, wireframes móviles <400 px) |
| vFinal | 2026-10-22 | Congelamiento (TP6): matriz de trazabilidad ADR ↔ restricciones (§9), arnés vFinal, CI + release v0.1.0 |

## 9. Congelamiento y trazabilidad final (vFinal)

| ADR | Decisión | Restricción | RF/RNF/AC/Ng | Contrato/arnés |
|-----|----------|-------------|--------------|----------------|
| ADR-001 | Estático + CDNs aprobados | RA-01, RA-02 | RF-01..RF-10 · NG-01 | — |
| ADR-002 | Single-page sin router ni frameworks | RA-03 | RF-02..RF-09 · NG-02 | — |
| ADR-003 | Datos embebidos (`occupiedRanges`, `galleryItems`) | RA-04 | RF-04..RF-08 · NG-03 · CA-01/02 | — |
| ADR-004 | Bootstrap + design tokens | — | RF-11..RF-13 · AC-02 | — |
| ADR-005 | Sin backend; EmailJS + fallback; contrato primero | RA-05 · NV-1..NV-3 | RF-07 · RF-13 · NG-01 · NG-04 · NG-06 | `api-contracts.yaml` (T-01..T-06) |
| ADR-006 | Responsive adaptativo; sin PWA | RNF-01..RNF-05 | RF-01 · RF-10 · CA-05 | `presupuestos-rendimiento.md` |
| Arnés vFinal | IA con capas de verificación | RA-05 · NV-1..NV-3 (§3/§4) | RF-07 · RF-13 · AC-01..03 | `.opencoderules` |

Cierre de la vFinal: 13 RF, 5 RNF, 3 AC, 5 RA, 6 ADR, 6 NG, 5 CA — todos trazables; los RNF pendientes de medición post-deploy se registran en `docs/deploy/deploy.md` (DEL-S3-03).
