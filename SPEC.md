# SPEC-000: Cabañas Hueltén — Landing y Solicitudes de Reserva

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

## 6. Criterios de Aceptación

- [x] **CA-01:** El calendario renderiza todos los tramos de `occupiedRanges` como fondo ocupado y bloquea el clic sobre ellos.
- [x] **CA-02:** Enviar un rango que solape un tramo ocupado muestra alerta y no dispara el envío.
- [x] **CA-03:** Con claves de EmailJS en placeholder, el envío muestra alerta de fallback con correo y WhatsApp, sin errores en consola.
- [x] **CA-04:** Los filtros de galería muestran exactamente las fotos de la categoría elegida.
- [x] **CA-05:** El sitio es usable a 360 px de ancho (nav colapsada, formulario en una columna, calendario visible).
