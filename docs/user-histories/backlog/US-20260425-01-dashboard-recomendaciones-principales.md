# US-20260425-01 Ver dashboard de recomendaciones principales

## Story

Como usuario,
quiero ver una pantalla con mis recomendaciones principales,
para identificar rapidamente oportunidades.

## Context

- Source requirement: "HU-15 Ver dashboard de recomendaciones. Como usuario quiero ver una pantalla con mis recomendaciones principales para identificar rapidamente oportunidades."
- Business value: Permite priorizar acciones comerciales o de seguimiento sin revisar datos dispersos, reduciendo tiempo de decision.

## Acceptance Criteria

- [ ] Given que el usuario abre la pantalla de recomendaciones, when el dashboard termina de cargar, then se muestran recomendaciones reales y, si no hay datos disponibles, se muestran mocks integradas sin romper la vista.
- [ ] Given que hay recomendaciones visibles, when el usuario revisa cada tarjeta o fila, then cada recomendacion muestra empresa, score, tipo y una explicacion entendible.
- [ ] Given multiples recomendaciones con distintos niveles de relevancia, when se renderiza la lista inicial, then la interfaz presenta una jerarquia visual clara que destaca primero las oportunidades de mayor prioridad.

## Notes

- Dependencies: fuente de datos de recomendaciones (servicio/API) y contrato de campos (`empresa`, `score`, `tipo`, `explicacion`).
- Risks: baja calidad del score o explicaciones poco claras puede reducir confianza en el dashboard.
- Open questions: cual es la regla exacta para decidir cuando mostrar mock vs datos reales?

