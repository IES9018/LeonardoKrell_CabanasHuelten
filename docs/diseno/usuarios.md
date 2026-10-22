# Personas y User Journeys — Cabañas Hueltén

Dominio real del proyecto: alojamiento de montaña en Malargüe gestionado por su dueño, con reservas por formulario (no por motor online).

---

## Persona 1 — Valentina, huéspeda de Cuyo

| Atributo | Detalle |
|----------|---------|
| Edad / rol | 34 años, docente, vive en Córdoba capital |
| Contexto | Viaja con su pareja y dos hijos (6 y 9); planifica con 1–2 meses de anticipación |
| Motivación | Escapada de invierno a la cordillera: quiere cabaña con chimenea, piscina y seguridad para los niños |
| Frustraciones | Sitios de alojamiento sin fotos reales; formularios que no dicen si la fecha está libre; esperar días por una respuesta |
| Cómo llega | Instagram/Google → landing → WhatsApp si no encuentra lo que busca |
| Escenario crítico | Necesita ver si su semana de julio está libre **antes** de escribir; si el sitio no muestra disponibilidad clara, cierra la pestaña y sigue buscando |

**Cita:** *"Si no veo el calendario y las fotos rápido, sigo de largo con el celular en la mano."*

---

## Persona 2 — Roberto, dueño de las cabañas

| Atributo | Detalle |
|----------|---------|
| Edad / rol | 52 años, propietario y administrador del alojamiento |
| Contexto | Gestiona reservas por WhatsApp/gmail; tiene alguien que lo asiste con el sitio (git) |
| Motivación | Recibir solicitudes ordenadas (fechas, cantidad de huéspedes, contacto) y mostrar el lugar las 24 h |
| Frustraciones | Mensajes incompletos sin fechas; tener que repetir políticas (seña, cancelaciones) por chat |
| Cómo interactúa | Actualiza las fechas ocupadas en `app.js` y publica con un commit; responde solicitudes por correo |
| Escenario crítico | En temporada alta alguien pide un rango ya reservado: si el calendario no lo muestra, pierde tiempo y credibilidad |

**Cita:** *"Prefiero mil solicitudes con fecha clara que diez conversaciones para saber qué noche quieren."*

---

## Journey 1 — Valentina: descubrir y solicitar reserva

```mermaid
sequenceDiagram
    participant V as Valentina
    participant S as Sitio
    participant E as EmailJS/Correo

    V->>S: Abre la landing (móvil)
    Note over V: ¿Confía en 10s?<br/>Punto de abandono A
    S-->>V: Hero + amenidades + galería
    V->>S: Filtra galería (Piscina)
    V->>S: Abre foto en lightbox
    V->>S: Abre modal Atractivos (Invierno)
    Note over V: ¿Le sirve el destino?<br/>Punto de abandono B
    V->>S: Sección Reservas → revisa calendario
    V->>S: Selecciona check-in/check-out en el calendario
    S-->>V: Rango ocupado → alerta (solape)
    V->>S: Elige otro rango
    V->>S: Completa formulario (nombre, email, tel, huéspedes)
    V->>S: Envía solicitud
    alt EmailJS configurado
        S->>E: Envía payload
        S-->>V: Alerta de éxito
    else Sin configurar
        S-->>V: Alerta de fallback (correo + WhatsApp)
        V->>E: Escribe por WhatsApp
    end
    Note over V: Punto de abandono C:<br/>si el fallback no es claro
```

**Mitigación de abandono:**
- **A (primeros 10 s):** CTA "Reservar Ahora" visible en hero y nav sticky; franja de amenidades de inmediato.
- **B (evaluación):** modal de atractivos por temporada responde "¿qué hago ahí en julio?".
- **C (envío):** alerta con fallback explícito a correo y WhatsApp (RF-07) + botón flotante de WhatsApp siempre presente.

---

## Journey 2 — Roberto: publicar nueva disponibilidad

```mermaid
sequenceDiagram
    participant R as Roberto
    participant G as Git (repo)
    participant S as Sitio publicado

    R->>G: Editar occupiedRanges en app.js
    Note over R: Agrega quinceo de enero<br/>Punto de fricción: formato ISO
    R->G: Abrir rama feature/ocupacion-ene + PR
    G-->>R: Checklist del PR (calendario revisado)
    R->>G: Self-merge a main
    G->>S: Deploy estático actualizado
    Note over R: Punto de abandono:<br/>si el formato JSON falla,<br/>el calendario queda vacío
```

**Mitigación de fricción:** el contrato `OccupiedRange` del SPEC documenta el formato ISO `YYYY-MM-DD`; el arnés prohíbe tocar la validación de solapes, de modo que un rango mal cargado se detecta en el PR y no en producción.
