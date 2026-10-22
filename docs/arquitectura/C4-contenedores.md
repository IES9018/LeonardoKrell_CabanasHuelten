# C4 Nivel 2 — Contenedores

Sistema: **Cabañas Hueltén**. El sitio es una aplicación estática de un solo contenedor de código + los CDNs que consume.

```mermaid
flowchart TB
    subgraph cliente["Navegador del huésped"]
        HTML["index.html<br/>Página única semántica<br/>(nav, hero, galería,<br/>reservas, ubicación,<br/>3 modales, footer)"]
        CSS["styles.css<br/>Design tokens +<br/>estilos propios"]
        JS["app.js (IIFE)<br/>Estado en memoria,<br/>render de galería/modales,<br/>calendario, validación,<br/>envío EmailJS"]
        HTML -->|referencia| CSS
        HTML -->|referencia| JS
    end

    subgraph cdn["Dependencias por CDN (jsDelivr / Google)"]
        BOOT["Bootstrap 5.3.3<br/>+ Bootstrap Icons"]
        FC["FullCalendar 6.1.15"]
        EML["@emailjs/browser v4"]
        FONTS["Google Fonts<br/>(Cormorant Garamond, Outfit)"]
    end

    subgraph datos["Datos embebidos en app.js"]
        OCC["occupiedRanges<br/>(rangos de ocupación)"]
        GAL["galleryItems<br/>(fotos por categoría)"]
        ATT["seasonalAttractions<br/>(attractivos por temporada)"]
        CFG["EMAILJS_CONFIG<br/>(placeholders)"]
    end

    subgraph servicios["Servicios externos"]
        EMAILSVC["EmailJS (API)"]
        MAPSE["Google Maps iframe"]
        UNSPL["Unsplash (imágenes)"]
    end

    HTML --> BOOT
    HTML --> FONTS
    JS --> BOOT
    JS --> FC
    JS --> EML
    JS --- OCC
    JS --- GAL
    JS --- ATT
    JS --- CFG
    JS -->|envío| EMAILSVC
    JS -->|carga de eventos| FC
    HTML -->|iframe| MAPSE
    JS/GAL -->|img src| UNSPL
```

## Contenedores

| Contenedor | Responsabilidad | Tecnología |
|------------|-----------------|------------|
| `index.html` | Estructura semántica de la página única, modales y puntos de montaje (`#galleryGrid`, `#reservationCalendar`, `#seasonCards`) | HTML5 |
| `styles.css` | Design tokens de marca, estilos de componentes propios y overrides de FullCalendar | CSS3 |
| `app.js` | Único módulo IIFE: estado, `renderGallery`, `renderSeason`, `initCalendar`, validación de rangos (`isRangeOccupied`), `sendReservation` | JavaScript ES2020 |
| `foto.png` | Logo/favicon | PNG |

## Notas de arquitectura

- **Sin capa de servidor:** no hay backend, base de datos ni API propia (SPEC NG-01/NG-02; ver ADR-002 y ADR-003).
- **Contrato con EmailJS:** único punto de integración externa con lógica; si `EMAILJS_CONFIG.publicKey` es placeholder, `sendReservation` lanza error `config` y el UI muestra el fallback (RF-07).
- **Validación en cliente** (RF-06): solapes se calculan con `datesOverlap` sobre `occupiedRanges`; es la única "regla de negocio" con estado.
