# ADR-001: Stack Tecnológico — HTML/CSS/JS Estático con Librerías por CDN

**Fecha:** 2026-10-22
**Estado:** Aceptado

## Contexto

Cabañas Hueltén necesita una landing pública con calendario de ocupación y formulario de reserva (SPEC RF-01 a RF-10). El proyecto es **individual**, sin presupuesto de hosting dinámico y con la restricción de que el contenido (fotos, fechas, políticas) cambia poco y siempre por la misma persona (el dueño, vía git). Se requiere el camino más corto entre el repo y una URL pública, con cero mantenimiento de servidor.

## Decisión

Sitio **estático** en HTML5 + CSS3 + JavaScript vanilla (ES2020, sin build), con librerías de terceros cargadas por CDN:

- **Bootstrap 5.3.3** + Bootstrap Icons: grid, modales, formularios y componentes accesibles probados.
- **FullCalendar 6.1.15**: calendario mensual con eventos de fondo, locale `es`, selección de rangos.
- **@emailjs/browser v4**: envío del formulario de reserva desde el navegador al correo del establecimiento.
- **Google Fonts**: tipografía display (Cormorant Garamond) + UI (Outfit).

La lógica vive en un único módulo IIFE (`app.js`) con estado en memoria; no hay paso de build ni toolchain Node.

## Alternativas Descartadas

- **WordPress + plugin de reservas:** el sitio quedaría atado a un hosting PHP + MySQL, con costos recurrentes, updates de seguridad a cargo del dueño y personalización limitada por temas. Criterios descartados: costo operativo anual > 0, superficie de mantenimiento alta, dependencia de un tercero para el núcleo del sitio.
- **React 19 + Vite + Tailwind:** aporta componentes y estado tipado, pero exige toolchain Node, build step y un hosting que sirva assets compilados. Criterios descartados: tiempo de iteración para una landing de 4 archivos, complejidad de deploy, dependencias de build para un sitio que no las necesita.
- **Django + SQLite + Bootstrap (monolito):** sería el stack de un sistema con usuarios y roles (como el previo Portal de Calificaciones), pero acá no hay ni usuarios ni datos mutables en servidor. Criterios descartados: servidor a mantener, NG-01 y NG-03 violados, costo de deploy alto para un formulario que EmailJS resuelve.

## Consecuencias

- **Positivas:** deploy trivial (cualquier CDN estático o Pages); el dueño actualiza fechas con un commit; cero costos de servidor; sitio rápido por ausencia de build y framework pesado.
- **Negativas / Riesgos:** las claves de EmailJS son públicas por diseño (semitoken limitado por dominio — mitigado con placeholders hasta producción y restricción de dominio en EmailJS); las imágenes de galería son hotlinks a Unsplash (riesgo de disponibilidad — mitigable migrando a assets propios); la ocupación se actualiza manualmente en `app.js` (NG-03 asumido).
