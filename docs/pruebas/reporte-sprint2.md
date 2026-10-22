# Reporte de Pruebas — Sprint 2 (DEL-S2-03)

**Alumno:** Leonardo Krell · **Fecha:** 2026-10-22 · **Resultado: 12/12 tests verdes ✅**

## 1. Cómo ejecutar

```bash
npm ci          # instala solo herramientas de desarrollo (package-lock.json)
npm test        # vitest run → 12 tests
npm run lint:api  # lint del contrato OpenAPI (bonus de calidad)
```

> **RA-01 se mantiene intacta:** Node/npm son **solo herramientas de desarrollo**. El sitio se abre y despliega sin build ni dependencias (`index.html` directo); `package.json` no forma parte del runtime del producto.

## 2. Herramienta elegida y por qué

| Decisión | Vitest 3 + jsdom 26 (devDependencies) |
|----------|----------------------------------------|
| Por qué | Corre tests ES modules sin build, con API de mocks integrada; JSDOM simula el DOM real de `index.html` |
| Alternativas descartadas | **Playwright/E2E** (requiere navegador real y servidor; más valioso en el apéndice opcional TP6+); **Jest clásico** (más config para ESM puro); **tests manuales** (no automatizables en CI) |
| Costo | 2 paquetes dev-only; el arnés autoriza devDependencies de testing (NV-2 no aplica: no son dependencias runtime) |

## 3. Qué cubre la suite (`tests/app.test.js`)

| # | Test | RF / CA | Qué valida |
|---|------|---------|------------|
| 1 | Calendario con 5 tramos ocupados | RF-04 | `events` con `display: background`, `selectOverlap: false`, locale `es` |
| 2 | `min = hoy` en check-in/check-out | RF-06 | No se aceptan fechas pasadas |
| 3 | Campos obligatorios vacíos | RF-06 | Alerta "obligatorios", **0 envíos** a EmailJS |
| 4 | check-out ≤ check-in | RF-06 | Alerta de orden, 0 envíos |
| 5 | Rango solapado con ocupación | RF-06 | Alerta `danger` "superpone", 0 envíos |
| 6 | Día adyacente al fin de ocupación | RF-06 | **No** bloquea falso positivo (31 dic → 2 ene) |
| 7 | Sin claves EmailJS | RF-07, CA-03 | Fallback visible (correo + WhatsApp), sin excepciones, 0 envíos |
| 8 | Con claves configuradas | RF-07 | `emailjs.send` llamado 1× con `ReservationPayload` completo |
| 9 | Filtro "Todas" | RF-02 | 9 cards renderizadas |
| 10 | Filtro "Piscina" + `aria-pressed` | RF-02, AC-01 | 3 cards y estado accesible sincronizado |
| 11 | Clic en card → lightbox | RF-03 | Modal abierto con el título correcto |
| 12 | Cambio de temporada | RF-08 | Contenido y `aria-pressed` actualizados |

**Doble escritura verificada:** los tests 3–6, 8 y 12 aseguran que *toda* salida del formulario pasa por la validación **antes** de que `emailjs.send` sea invocado (el mock se asegura de no haber sido llamado).

## 4. Qué NO cubre (Non-Goals de testing)

- **NG-T-01:** Sin E2E con CDNs reales (Bootstrap/FullCalendar/emailjs reales): los tests usan mocks → la integración de terceros se valida manualmente al abrir `index.html`.
- **NG-T-02:** Sin tests de rendimiento ni accesibilidad automatizada (van en TP5 `presupuestos-rendimiento.md` y en la auditoría heurística manual).
- **NG-T-03:** Sin tests de EmailJS real ni de Google Maps/Unsplash (servicios externos, costos/cuotas).
- **NG-T-04:** Sin regresión visual/CSS: los cambios de `styles.css` se revisan manualmente.
- **NG-T-05:** Cobertura de código no medida con porcentaje: se reporta por RF trazados, no por % de líneas.

## 5. Verificación del núcleo funcional (DEL-S2-01)

Features críticos operativos en local (apertura de `index.html` + suite automatizada):

| Feature | Estado | Evidencia |
|---------|--------|-----------|
| Galería con filtros y lightbox | ✅ | Tests 9–11 + manual |
| Calendario de ocupación con selección de fechas | ✅ | Test 1 + manual (FullCalendar real) |
| Formulario con validación de fechas y solapes | ✅ | Tests 3–6 |
| Envío por EmailJS con fallback | ✅ | Tests 7–8 + manual (falta claves reales = config del dueño) |
| Atractivos por temporada y políticas | ✅ | Test 12 + manual |
| Responsive 360 px y accesibilidad básica | ✅ | Manual (auditoría heurística) |

**Resultado:** núcleo funcional operativo localmente · **12/12 tests verdes** · lint de contrato en 0 errores.
