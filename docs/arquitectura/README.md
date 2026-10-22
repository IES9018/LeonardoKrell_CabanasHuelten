# Contratos de arquitectura — `api-contracts.yaml`

Fuente de verdad de la superficie HTTP que consume la landing. Regla del arnés (§5, NV-3):
**cualquier endpoint o servicio externo nuevo se agrega al contrato ANTES de implementarlo.**

## Lint (obligatorio antes de cada PR)

```bash
npx @redocly/cli lint docs/arquitectura/api-contracts.yaml
```

Sin errores → el contrato pasa. El mismo comando corre en CI (`.github/workflows/ci.yml`).

## Qué cubre el contrato

| Operación | Servicio | RF | Flujo del journey |
|-----------|----------|----|-------------------|
| `POST /api/v1.0/email/send` | EmailJS | RF-07 | Enviar solicitud de reserva |
| `GET /send` | WhatsApp | RF-07/RF-09 | Fallback de contacto |
| `GET /maps` | Google Maps | RF-01 | Ubicación |
| `GET /photo` | Unsplash | RF-02/RF-03 | Galería |
| `GET /npm/{paquete}` | jsDelivr | RA-02 | Dependencias CDN (T-06) |

Por qué no es una API propia: SPEC NG-01 + ADR-005 (estático sin backend). El contrato
documenta lo que **sí** existe: la red externa de la que dependen los flujos críticos.
