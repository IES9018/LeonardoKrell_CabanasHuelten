# Presupuestos de Rendimiento — RNF medibles

Cada presupuesto tiene **valor, herramienta y modo de ejecución**. Los presupuestos `CI` se validan automáticamente en `.github/workflows/ci.yml` en cada PR.

## Presupuestos

| ID | Métrica | Presupuesto | Herramienta | Modo | RF trazable |
|----|---------|-------------|-------------|------|-------------|
| **RNF-01** | LCP (Largest Contentful Paint) | **< 2.5 s** en simulación 4G/móvil | Lighthouse CLI (mobile, throttling default) sobre URL desplegada | Manual/CI Lighthouse (tras deploy) | RF-01, RF-10 |
| **RNF-02** | INP (Interaction to Next Paint) | **< 200 ms** | Lighthouse CLI / Chrome UX | Manual/CI Lighthouse | RF-05, RF-06 |
| **RNF-03** | JavaScript propio (app.js) | **< 200 KB gzip** | `node scripts/check-budgets.mjs` (zlib gzip) | **CI en cada PR** | RA-01 |
| **RNF-04** | HTML + CSS + JS propio (primer contacto) | **< 100 KB gzip combinado** | `node scripts/check-budgets.mjs` | **CI en cada PR** | RA-01 |
| **RNF-05** | Puntaje Performance Lighthouse (mobile) | **≥ 90** | Lighthouse CLI sobre la URL pública (GitHub Pages) | Manual post-deploy (DEL-S3-03) | RF-10 |

## Cómo se corre

```bash
# Presupuestos de peso (CI y local):
node scripts/check-budgets.mjs

# Lighthouse (requiere Chrome; local o CI con artifact):
npx -y lighthouse <URL> --preset=perf --output=json --output-path=./lighthouse-report.json
```

## Decisiones de medición

- Las **imágenes remotas** (Unsplash, fotos del hero) se excluyen del presupuesto de peso propio (RNF-03/04) porque viajan por CDN con `w/q` acotados y `loading="lazy"` en el `grid`; su impacto se observa en RNF-01/LCP. Se declara para no ocultar la deuda.
- El **JS de terceros** (Bootstrap bundle ~80 KB, FullCalendar, EmailJS) tampoco cuenta para RNF-03: es contrato de dependencias fijadas por versión (RA-02), pero **sí** pesa en LCP/INP reales — por eso RNF-01/02 se miden sobre la URL final y no sobre archivos sueltos.
- Resultados medidos: se registran en `docs/deploy/deploy.md` tras el despliegue (DEL-S3-03). Estado: **pendiente de medición post-deploy**.

## Plan de acción si algún presupuesto falla

1. LCP alto → comprimir/cachear hero (fuente `styles.css`), agregar `fetchpriority`/`preload` de la imagen crítica.
2. INP alto → revisar handlers en `app.js` (delegación ya existe), reducir trabajo en `renderGallery`.
3. Peso JS → auditar si alguna dependencia CDN puede cargarse `defer`/lazy (FullCalendar solo en sección reservas).
