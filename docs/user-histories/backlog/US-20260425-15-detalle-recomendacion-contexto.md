# US-20260425-15 Ver detalle de recomendacion

## Story

Como usuario,
quiero abrir una recomendacion y revisar mas contexto,
para decidir si vale la pena explorarla.

## Context

- Source requirement: "HU-17 Ver detalle de recomendacion. Como usuario quiero abrir una recomendacion y revisar mas contexto para decidir si vale la pena explorarla."
- Business value: Mejora la toma de decisiones al mostrar evidencia clara antes de invertir tiempo en una posible alianza u oportunidad.

## Acceptance Criteria

- [ ] Given que el usuario esta en el dashboard de recomendaciones, when selecciona una recomendacion, then existe una vista de detalle dedicada para esa recomendacion.
- [ ] Given que la vista de detalle esta cargada, when el usuario revisa la informacion principal, then se muestra score, tipo y explicacion en lenguaje comprensible.
- [ ] Given que el usuario analiza la empresa sugerida, when consulta el bloque de contexto empresarial, then se resume la informacion clave de la empresa (por ejemplo sector, tamano o descripcion breve).

## Notes

- Dependencies: servicio de recomendaciones con endpoint de detalle y datos de perfil de empresa sugerida.
- Risks: explicaciones incompletas o inconsistentes pueden afectar la confianza del usuario en la recomendacion.
- Open questions: cual es el conjunto minimo de campos para el resumen de la empresa sugerida?

