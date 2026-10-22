# C4 Nivel 1 — Contexto del Sistema

Sistema: **Cabañas Hueltén — Landing y Solicitudes de Reserva**.
Los diagramas usan Mermaid y renderizan en GitHub.

```mermaid
flowchart LR
    subgraph actores
        HUESPED["Huésped potencial<br/>(navegador web)"]
        DUENO["Roberto — dueño<br/>(editor del repo vía git)"]
    end

    subgraph sistemas
        SITIO["Sitio Cabañas Hueltén<br/>(landing estática)"]
    end

    subgraph externos
        EMAILJS["EmailJS<br/>(envío de formularios)"]
        CORREO["Correo del establecimiento<br/>(yahoo)"]
        WHATSAPP["WhatsApp<br/>(deep link)"]
        MAPS["Google Maps<br/>(iframe embebido)"]
        CDNS["CDNs públicas<br/>(Bootstrap, FullCalendar,<br/>EmailJS, Google Fonts)"]
        IMGS["Unsplash<br/>(imágenes de galería)"]
    end

    HUESPED -->|consulta y reserva| SITIO
    DUENO -->|actualiza fechas,<br/>fotos y textos| SITIO
    SITIO -->|solicitud de reserva| EMAILJS
    EMAILJS -->|reenvía| CORREO
    SITIO -->|enlace directo| WHATSAPP
    SITIO -->|mapa embebido| MAPS
    SITIO -->|recursos| CDNS
    SITIO -->|hotlinks| IMGS
```

## Actores

| Actor | Rol | Interacción |
|-------|-----|-------------|
| Huésped | Visitante del sitio, cliente final | Navega, filtra galería, consulta el calendario, envía solicitud de reserva |
| Dueño | Roberto, propietario de las cabañas | Mantiene el repo: actualiza `occupiedRanges`, galería, políticas y claves de EmailJS mediante commits/PRs |

## Sistemas externos

| Sistema | Uso | Dependencia |
|---------|-----|-------------|
| EmailJS | Envío del formulario al correo del establecimiento | API pública del navegador; si no está configurado, fallback a `mailto:` y WhatsApp |
| WhatsApp | Canal directo de contacto | Deep link `api.whatsapp.com/send` |
| Google Maps | Mapa de ubicación en Malargüe | iframe embebido |
| CDNs (jsDelivr, Google Fonts) | Bootstrap, Bootstrap Icons, FullCalendar, EmailJS SDK, tipografías | Sin caché local; el sitio requiere conexión |
| Unsplash | Imágenes de la galería y del hero | Hotlinks con parámetros de tamaño |
