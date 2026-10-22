# Threat Model Lite — Cabañas Hueltén

Alcance: la landing estática, su contrato externo (`docs/arquitectura/api-contracts.yaml`) y el flujo de solicitud de reserva (Journey 1). Método: STRIDE por elemento del C4 (`docs/arquitectura/C4-*.md`). Fecha: 2026-10-22.

## Activos

| Activo | Por qué importa |
|--------|-----------------|
| Clave pública EmailJS (`EMAILJS_CONFIG`) | Permite enviar correo "desde" el establecimiento a cualquier dominio que la exponga |
| Datos personales del formulario (nombre, email, teléfono, fechas) | Datos sensibles de identificación y plan de viaje del huésped |
| Disponibilidad publicada (`occupiedRanges`) | Si se tergiversa, el dueño pierde reservas o da respuestas falsas |
| Reputación del canal de correo | Spam = filtrado a SPAM y pérdida de solicitudes reales |
| Dependencias CDN (Bootstrap, FullCalendar, EmailJS SDK) | Código de terceros ejecutado con el origen del sitio |

## Amenazas STRIDE

| ID | Categoría | Amenaza concreta | Mitigación (ubicable) | Estado |
|----|-----------|------------------|-----------------------|--------|
| **T-01** | **S**poofing / abuso de identidad | Un tercero extrae la clave pública de EmailJS del JS publicado y dispara `POST /api/v1.0/email/send` en tu nombre (spam al inbox del dueño, agotamiento de cuota) | Claves solo como placeholder en repo (arnés §3, `.opencoderules`); en producción: restricción de **orígenes permitidos** en el panel de EmailJS + cuota diaria; la clave no abre identidad de usuario (no hay sesión) | Mitigado por diseño en repo; operación queda como checklist de despliegue (deploy.md) |
| **T-02** | **T**ampering / integridad (XSS) | `renderGallery()` y `attractionCard()` insertan `title`/`caption`/`text` vía `innerHTML`: si algún día esos datos vienen de JSON externo o input no confiable, se convierten en XSS stored | Hoy los datos son código versionado revisado en PR (ADR-003); arnés §3 prohíbe `innerHTML` con datos no saneados; mitigación planificada: `textContent` si se migra a `data.json` | Controlado; regla en arnés |
| **T-03** | **R**epudio / integridad | Alguien con push altera `occupiedRanges` (ej. libera una fecha ocupada) sin rastro de quién o cuándo | Ramas protegidas + PR con checklist obligatorio (`sprint-pp3-config.json → rules`); commits convencionales; `git log -- app.js` como auditoría de disponibilidad | Mitigado por la plataforma |
| **T-04** | **D**enegación de servicio / abuso de recursos | Bots envían solicitudes vacías o masivas al formulario, saturando la cuota de EmailJS | Validación previa al envío (`checkValidity()`, orden de fechas y anti-solape en `app.js` submit) filtra inválidos; EmailJS devuelve 429 y la UI muestra fallback a WhatsApp/correo (CA-03); futuro: campo honeypot | Parcialmente mitigado (el rate-limit fino es de EmailJS) |
| **T-05** | **I**nfo. confidencial | Nombre, email y teléfono del huésped viajan en el payload y quedan en logs de EmailJS; sin política de privacidad visible | Payload mínimo (SPEC §5, solo campos necesarios); HTTPS obligatorio en todos los servicios del contrato; texto de privacidad agregado en el modal de políticas; nada de localStorage/cookies (no hay persistencia, ADR-003) | Mitigado |
| **T-06** | **E**levation of trust / cadena de suministro | CDN (jsDelivr/Google Fonts) comprometida sirve JS malicioso con el origen del sitio (robo de datos del formulario en tránsito) | Versiones **fijadas** en `index.html` (sin `@latest`); dependencias limitadas al set aprobado (arnés §2, RA-02); alternativa de refuerzo post-release: vendorizar assets con SRI | Riesgo aceptado y documentado (ADR-001 consecuencias) |

## Qué queda fuera de alcance

- Pagos y autenticación: no existen (NG-02/NG-03) — no hay superficie de credenciales de usuario.
- Infraestructura del dueño (cuenta de Yahoo, WhatsApp): responsable del tercero; solo se consumen vía canales oficiales del contrato.
