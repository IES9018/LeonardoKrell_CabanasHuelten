# INSTRUCTIONS.md

Este repositorio aloja el sitio **Cabañas Hueltén** (`LeonardoKrell_CabanasHuelten`), desarrollado en el marco de la materia *Arquitectura y Diseño de Interfaces* (IES 9-018).

## Qué es este proyecto

Landing estática (HTML + CSS + JS vanilla) de un alojamiento de montaña en Malargüe, Mendoza, con galería filtrable, calendario de ocupación (FullCalendar) y formulario de reserva que envía por EmailJS con fallback a correo/WhatsApp.

## Fuente de verdad

1. `SPEC.md` — requisitos funcionales (RF), non-goals y contratos de datos.
2. `docs/adr/` — decisiones arquitectónicas aceptadas; nada se agrega al stack sin ADR.
3. `.opencoderules` — reglas duras de codificación y proceso.

## Comandos útiles

```bash
# sitio estático: abrir directo o servir en local
python -m http.server 8000
```

No hay build, tests de runtime ni dependencias locales. Cualquier cambio debe dejar el sitio funcional abriendo `index.html`.

## Restriciones

- No introducir frameworks, bundlers ni dependencias nuevas sin ADR correspondiente.
- Nunca commitear claves reales: `EMAILJS_CONFIG` solo acepta placeholders hasta tener claves de producción.
- Toda entrega se hace por rama `feature/<tema>` + Pull Request hacia `main`.
