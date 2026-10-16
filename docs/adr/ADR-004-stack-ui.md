# ADR-004: Stack de UI para el Portal de Calificaciones

- **Estado:** Aprobado
- **Fecha:** 2026-10-16

## Contexto
El sistema requiere una interfaz simple, rápida y accesible para dos roles principales: estudiante y docente. Debe integrarse con Django y Bootstrap 5, cumplir con el diseño del sistema institucional y evitar la sobrecomplejidad de una arquitectura de frontend independiente.

La decisión debe equilibrar:
- rapidez de desarrollo,
- bajo costo de mantenimiento,
- buena accesibilidad básica,
- compatibilidad con la arquitectura monolítica modular ya aprobada.

## Decisión
Se utiliza una interfaz basada en HTML5 + CSS3 + Bootstrap 5, con pequeñas utilidades CSS propias y sin framework de UI pesado.

### Criterios de decisión
- Compatibilidad con Django y la arquitectura existente.
- Menor curva de aprendizaje para un único desarrollador.
- Accesibilidad básica sin dependencias adicionales complejas.
- Bajo costo y mantenimiento.

## Alternativas descartadas

### 1) React + Vite + componentes reutilizables
- **Ventajas:** experiencia moderna, componentes reutilizables, ecosistema amplio.
- **Desventajas:** exige un frontend separado y mayor complejidad de integración con Django; aumenta la carga operativa para un proyecto sin necesidad de un SPA.
- **Criterio decisivo:** no aporta valor suficiente frente al tamaño del proyecto y al perfil de 1 desarrollador.

### 2) Tailwind CSS + componentes modernos
- **Ventajas:** diseño consistente y flexible.
- **Desventajas:** requiere más configuración, más decisiones de estilo y más tiempo de implementación para una solución simple.
- **Criterio decisivo:** Bootstrap 5 ya cubre la necesidad de layout y componentes con menos esfuerzo.

### 3) Framework híbrido (Vue/React) con backend completamente desacoplado
- **Ventajas:** escalabilidad a futuro.
- **Desventajas:** rompe la simplicidad del monolito modular aprobado en ADR-002; mayor complejidad de desarrollo y despliegue.
- **Criterio decisivo:** no corresponde para un sistema escolar con alcance acotado.

## Consecuencias

### Positivas
- Desarrollo rápido y consistente con Django.
- Menor curva de aprendizaje para un equipo pequeño.
- Accesibilidad básica posible con HTML semántico y Bootstrap.
- Menor deuda técnica inicial.

### Riesgos / trade-offs
- La interfaz será menos dinámica que una SPA.
- Las interacciones avanzadas pueden requerir algo de JS manual.
- Si el proyecto crece mucho, puede requerirse un refactor posterior a un frontend más moderno.

## Enlaces de trazabilidad
- ADR-001: Stack tecnológico
- ADR-002: Estilo arquitectónico
- SPEC v3: requisitos de accesibilidad y UX
