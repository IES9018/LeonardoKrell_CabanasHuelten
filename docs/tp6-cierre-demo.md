# TP6 — confirmación de proyecto y guion de demo

## Confirmación para el tracker

Confirmo que **Cabañas Hueltén**, en `IES9018/LeonardoKrell_CabanasHuelten`, es el proyecto final de la materia y reemplaza como referencia de seguimiento a `LeonardoKrell_PortalDeCalificaciones`. El sitio desplegado es https://ies9018.github.io/LeonardoKrell_CabanasHuelten/.

## Informe

El informe de cierre TP6 ya está en [`informe-final.md`](./informe-final.md). Este documento complementa el informe con un recorrido reproducible para la demostración, sin alterar los resultados de rendimiento aún no medidos.

## Demo sugerida (2–3 minutos)

1. **Presentación y responsive (20 s):** abrir el sitio desplegado y mostrar brevemente la landing en viewport móvil (393 px).
2. **Galería filtrable (30 s):** entrar en Galería, seleccionar **Piscina**, comprobar que quedan las fotos de esa categoría y abrir una imagen en el lightbox.
3. **Calendario (40 s):** ir a Reservas, seleccionar dos fechas libres consecutivas y mostrar que se completan check-in/check-out. Si el tramo ocupado está visible, explicar que el calendario lo marca y que un rango solapado se rechaza.
4. **Formulario (30 s):** completar los datos requeridos y enviar con las claves placeholder; mostrar el fallback a correo/WhatsApp. No ingresar ni exponer claves reales durante la demo.
5. **Evidencia de calidad (30 s):** mostrar [`deploy.md`](./deploy/deploy.md), donde constan los presupuestos RNF y los resultados de peso medidos. Para LCP, INP y Performance, presentar únicamente mediciones registradas; INP permanece pendiente hasta tener evidencia de campo en CrUX.

## Preparación previa

- Abrir la URL pública y confirmar que la galería, el calendario y el formulario responden.
- Tener cargada la evidencia real de Lighthouse y Chrome UX Report, si está disponible; no completar métricas pendientes con estimaciones.
- Si EmailJS continúa con placeholders, usar el fallback esperado y no intentar enviar datos reales de huéspedes.
- Mantener visible el archivo de presupuestos durante el cierre para distinguir los límites definidos de los resultados efectivamente medidos.
