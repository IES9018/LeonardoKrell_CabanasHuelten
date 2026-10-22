# Despliegue — Cabañas Hueltén (DEL-S3-04)

## Estado

| Ítem | Estado |
|------|--------|
| Plataforma | GitHub Pages (rama `main`, raíz `/`) |
| URL pública | `https://ies9018.github.io/LeonardoKrell_CabanasHuelten/` |
| Build | **No hay build**: Pages sirve los archivos tal cual (garantía RA-01) |
| CI | `.github/workflows/ci.yml` en cada PR y push a `main` |

## Configuración de GitHub Pages

1. Repo → *Settings* → *Pages*.
2. Source: **Deploy from a branch** · Branch: `main` · Folder: `/ (root)`.
3. Save. GitHub publica en ~1 minuto (primer deploy puede tardar hasta 5).
4. Verificación: abrir la URL pública y comprobar hero + calendario + formulario.

> La publicación se habilita desde la organización `IES9018` con permisos de colaborador (API `POST /repos/IES9018/LeonardoKrell_CabanasHuelten/pages`, branch `main`, source `/ (root)`).

## Checklist de EmailJS (producción — fuera de git)

Ninguna de estas claves se commitea (NV-1). Se configuran **solo** en el panel de EmailJS y, si aplica, en variables del entorno del deploy:

- [ ] Service (Gmail u otro) creado y probado en EmailJS.
- [ ] Template con variables: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{guests}}`, `{{check_in}}`, `{{check_out}}`, `{{message}}`.
- [ ] Public Key, Service ID y Template ID cargados en `app.js → EMAILJS_CONFIG` **en el entorno del dueño** (no en el repo).
- [ ] Orígenes permitidos (*Allowed origins*) en EmailJS: `https://ies9018.github.io` (mitiga T-01 del threat model).
- [ ] Prueba de envío real + revisión del correo del establecimiento.

**Mientras los placeholders sigan en el repo:** el formulario funciona con el fallback visible a `hueltencabanas@yahoo.com.ar` y WhatsApp (RF-07) — comportamiento cubierto por los tests 7 y 8.

## Mediciones de rendimiento (DEL-S3-03 — RNF-01, RNF-02, RNF-05)

Se ejecutan sobre la URL pública con Lighthouse CLI (mobile, throttling 4G por defecto) y sobre `app.js` con el script de presupuestos.

| Métrica | Presupuesto | Herramienta | Resultado | Fecha |
|---------|-------------|-------------|-----------|-------|
| LCP (RNF-01) | < 2.5 s | Lighthouse mobile | _ver commit de mediciones_ | — |
| INP (RNF-02) | < 200 ms | Lighthouse mobile | _ver commit de mediciones_ | — |
| Performance (RNF-05) | ≥ 90 | Lighthouse mobile | _ver commit de mediciones_ | — |
| JS propio (RNF-03) | < 200 KB gzip | `npm run budgets` | **4.6 KB** ✅ | 2026-10-22 |
| Primer contacto (RNF-04) | < 100 KB gzip | `npm run budgets` | **11.0 KB** ✅ | 2026-10-22 |

## Operación (post-despliegue)

- **Actualizar ocupación:** editar `occupiedRanges` en `app.js` (constante versionada; RA-04) y hacer push a `main`. El calendario se refresca en el próximo load.
- **Actualizar fotos:** reemplazar entradas de `galleryItems` (URLs con parámetros `w`/`q` del CDN).
- **Rollback:** revert del commit en `main`; Pages republica automáticamente.
- **Dominio propio (opcional):** agregar CNAME + DNS del proveedor cuando el dueño lo decida; no afecta al código.
