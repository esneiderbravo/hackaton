# US-20260425-08 Recibir guía personalizada de formalización empresarial

## Story

As a emprendedor informal,
I want recibir un plan de pasos concretos para formalizar mi negocio según mi clúster y actividad económica asignados,
so that sepa exactamente qué debo hacer para legalizarme sin necesidad de contratar un asesor.

## Context

- Source requirement: Una vez clasificado y clusterizado el negocio, el sistema debe entregarle al usuario toda su información de formalización: actividad económica, tipo de organización sugerida, municipio, pasos de registro y recursos relevantes del clúster.
- Business value: La formalización empresarial reduce la informalidad, aumenta el acceso a crédito, programas de gobierno y encadenamientos productivos. Guiar al emprendedor paso a paso es el diferenciador del producto.

## Acceptance Criteria

- [ ] Given que el sistema ha asignado un clúster y código CIIU al usuario, when genera la guía de formalización, then presenta al menos los siguientes elementos: (1) código CIIU con nombre completo, (2) macrosector y sección CIIU, (3) nombre del clúster asignado, (4) tipo de organización recomendada (persona natural o SAS), (5) enlace o correo de contacto del clúster si existe en el catálogo.
- [ ] Given que el usuario recibe la guía, when la visualiza, then los pasos están ordenados y redactados en lenguaje sencillo sin tecnicismos (sin abreviaturas como "CIIU" sin explicar).
- [ ] Given que el clúster tiene `actividadClusterENLACE` o `actividadClusterEMAIL` definidos en el catálogo, when se muestra la guía, then se incluyen esos recursos como canales de contacto del clúster.
- [ ] Given que el usuario solicita exportar la guía, when hace clic en "Descargar resumen", then el sistema genera un PDF o vista imprimible con todos los datos de su clasificación y pasos de formalización.
- [ ] Given que el sistema muestra la guía, when el usuario confirma los datos, then se habilita el botón "Guardar mi clasificación" para persistir el resultado (US-20260425-09).

## Notes

- Dependencies: US-20260425-06 (CIIU), US-20260425-07 (clúster), datos de `raw.cluster_economic_activities` (enlaces y emails), ruta de API `/api/ai/chat` para generación de texto enriquecido.
- Risks: Los campos `actividadClusterENLACE` y `actividadClusterEMAIL` están vacíos en el dataset actual; la guía debe funcionar igualmente sin ellos.
- Open questions: ¿La guía de pasos es contenido estático por clúster o generado dinámicamente por IA? ¿Se incluyen links a la Cámara de Comercio o RUES?
