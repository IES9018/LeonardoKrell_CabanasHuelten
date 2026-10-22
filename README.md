# 🏔️ Cabañas Hueltén

> **Proyecto de Arquitectura y Diseño de Interfaces · IES 9-018 · 2026**
> Tecnicatura Superior en Desarrollo de Software · Prof. Paulo Alvarez

Landing estática de **Cabañas Hueltén** (Malargüe, Mendoza): presentación del alojamiento, galería filtrable, calendario de ocupación y formulario de solicitudes de reserva vía EmailJS.

---

## 🚀 Ejecución

No hay build ni dependencias locales: abrí `index.html` en el navegador, o serví la carpeta con cualquier servidor estático:

```bash
# opción mínima
python -m http.server 8000
# → http://localhost:8000
```

Para activar el envío real de reservas, cargá tus claves de [EmailJS](https://www.emailjs.com/) en `app.js` → `EMAILJS_CONFIG` (hoy son placeholders y el sitio usa el fallback correo/WhatsApp).

---

## 📁 Estructura

```
LeonardoKrell_CabanasHuelten/
├── index.html          ← página única (nav, hero, galería, reservas, ubicación, modales)
├── app.js              ← estado, galería, calendario, validación y envío
├── styles.css          ← design tokens y estilos propios sobre Bootstrap
├── foto.png            ← logo
├── SPEC.md             ← especificación (RF, Non-Goals, contratos, changelog)
├── .opencoderules      ← arnés de IA
├── INSTRUCTIONS.md     ← instrucciones extendidas del agente
└── docs/
    ├── adr/            ← ADR-001..004
    ├── arquitectura/   ← C4 contexto y contenedores
    └── diseno/         ← personas, journeys, wireframes, auditoría heurística
```

---

## 📖 Documentación

| Documento | Contenido |
|-----------|-----------|
| [SPEC.md](./SPEC.md) | RF-01..RF-10, Non-Goals, contratos de datos, changelog v1→v3 |
| [ADR-001](./docs/adr/ADR-001-stack-tecnologico.md) | Stack: estático + Bootstrap + FullCalendar + EmailJS |
| [ADR-002](./docs/adr/ADR-002-estilo-arquitectonico.md) | Estilo: sitio estático single-page con lógica en cliente |
| [ADR-003](./docs/adr/ADR-003-persistencia.md) | Persistencia: datos embebidos en `app.js` |
| [ADR-004](./docs/adr/ADR-004-stack-ui.md) | UI: Bootstrap + design tokens + Google Fonts |
| [C4 Contexto](./docs/arquitectura/C4-contexto.md) | Sistema, actores y servicios externos |
| [C4 Contenedores](./docs/arquitectura/C4-contenedores.md) | Contenedores internos y dependencias CDN |

---

## 👤 Autor

**Leonardo Krell** · Tecnicatura Superior en Desarrollo de Software · IES 9-018 · 2026
