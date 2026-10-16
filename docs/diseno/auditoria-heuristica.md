# Auditoría heurística — Portal de Calificaciones

> Revisión de las dos pantallas críticas del sistema según las 10 heurísticas de Nielsen.

## Pantallas revisadas
- Pantalla 1: Mis calificaciones (estudiante)
- Pantalla 2: Carga de calificaciones (docente)

## Tabla de auditoría

| Heurística de Nielsen | ¿Cumple? | Evidencia | Corrección propuesta |
|:---|:---|:---|:---|
| 1. Visibilidad del estado del sistema | Sí | La pantalla muestra el estado actual de la sesión y la materia seleccionada. | Mantener banners de éxito en la acción “guardar”, “subir CSV” y “editar”. |
| 2. Relación entre el sistema y el mundo real | Sí | Se usan etiquetas que reflejan el dominio: "Mis calificaciones", "Docente", "Materia", "Nota". | Mantener vocabulario del colegio/IES sin jerga técnica. |
| 3. Control y libertad del usuario | Sí | El usuario puede volver atrás o cambiar la materia sin perder el flujo. | Añadir botón “Cancelar” y “Volver” claros en formularios. |
| 4. Consistencia y estándares | Sí | Se usan nombres iguales para “Nota”, “Materia”, “Promedio general”. | Reutilizar los mismos términos en todas las pantallas. |
| 5. Prevención de errores | No | El formulario de carga no informa qué filas fueron rechazadas antes de guardar. | Mostrar prevalidación del CSV con errores por fila y validar rango 0–10 antes del envío. |
| 6. Reconocimiento antes que recuerdo | No | El estudiante debe recordar qué materia estaba activa si el sistema no la marca claramente. | Resaltar la materia seleccionada y mostrar un resumen visible del contexto. |
| 7. Flexibilidad y eficiencia de uso | Sí | En la vista de docente se puede cargar por CSV o manualmente. | Agregar atajos de teclado y foco ordenado. |
| 8. Diseño estético y minimalista | Sí | Pantallas simples, sin ruido visual innecesario. | Mantener la jerarquía visual con CTA principal y secundario bien diferencia dos. |
| 9. Ayuda a reconocer, diagnosticar y recuperar errores | No | Si la nota es inválida, el mensaje debe indicar que fue un valor fuera de rango y cómo corregirlo. | Reemplazar mensajes técnicos por textos del tipo: “La nota debe estar entre 0 y 10” y marcar el campo. |
| 10. Ayuda y documentación | Sí | El flujo es suficientemente intuitivo para roles comunes. | Añadir un texto breve de ayuda: “Solo se permiten notas del 0 al 10”. |

## Hallazgos reales detectados y correcciones aplicadas

### 1) Falta de feedback de validación al cargar notas
- **Hallazgo:** El usuario puede subir un CSV con filas inválidas y no sabe qué quedó aceptado o rechazado.
- **Corrección aplicada al wireframe:** Se incluye una sección de “Resumen de validación” con filas aceptadas/rechazadas y detalle por error.
- **Impacto:** reduce errores de carga y evita frustración.

### 2) Mala claridad del contexto en pantalla de estudiante
- **Hallazgo:** Si el usuario tiene muchas materias, pueden perderse en qué materia está mirando.
- **Corrección aplicada al wireframe:** Se resalta la materia activa y el promedio se mantiene visible arriba de la lista.
- **Impacto:** mejora orientación post-acción y reduce confusión.

### 3) Mensajes de error poco útiles
- **Hallazgo:** Un valor fuera del rango podría aparecer como “error de validación” sin detalle actionable.
- **Corrección aplicada al wireframe:** Se agrega mensaje específico junto al campo: “La nota debe estar entre 0 y 10”.
- **Impacto:** permite corregir sin ayuda extra.

## Recomendaciones finales
- Mantener foco visible con outline nítido en todos los elementos interactivos.
- Priorizar una sola acción principal por pantalla.
- Reforzar accesibilidad: contraste AA y navegación con Tab/Enter/Escape.
- En la carga por CSV, separar la acción de “subir archivo” de la confirmación final.
