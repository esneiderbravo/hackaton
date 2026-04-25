# US-20260425-06 Clasificación automática de actividad económica CIIU mediante IA

## Story

As a emprendedor informal,
I want que el sistema identifique automáticamente mi código de actividad económica CIIU a partir de mi descripción,
so that pueda conocer mi categoría legal sin tener que buscarla yo mismo.

## Context

- Source requirement: El sistema debe analizar la descripción libre del negocio y mapearla al código CIIU correspondiente usando IA, apoyándose en el catálogo de actividades económicas disponible (`CLUSTERS_SECTORES_SECCIONES_ACTIVIDADES.csv`).
- Business value: El código CIIU es el primer paso obligatorio de la formalización empresarial. Automatizarlo con IA elimina la principal barrera de conocimiento que enfrentan los emprendedores informales.

## Acceptance Criteria

- [ ] Given que el sistema recibe la descripción del negocio, when la envía al motor de IA, then retorna el código CIIU más probable (ej. `A0113`) junto con su título oficial (ej. "Cultivo de hortalizas, raíces y tubérculos").
- [ ] Given que el sistema obtiene el resultado de la IA, when lo muestra al usuario, then presenta el código CIIU, su título, la sección CIIU y el macrosector de forma comprensible (sin jerga técnica).
- [ ] Given que la IA identifica múltiples actividades posibles, when el sistema las retorna, then muestra las top 3 opciones con porcentaje de confianza y permite al usuario confirmar o corregir.
- [ ] Given que la descripción es demasiado ambigua para clasificar con confianza mayor al 50%, when el sistema recibe el resultado, then solicita al usuario más detalles antes de continuar.
- [ ] Given que el código CIIU inferido no existe en el catálogo de clústeres activos, when se finaliza la clasificación, then se informa al usuario y se registra como "actividad no catalogada en clúster" para revisión manual.

## Notes

- Dependencies: API route `/api/ai/chat` (server-side con `ANTHROPIC_API_KEY`), catálogo CIIU desde `raw.cluster_sector_section_activities` en Supabase, US-20260425-05 (descripción de entrada).
- Risks: Alucinaciones del modelo de lenguaje pueden producir códigos CIIU inexistentes; se debe validar el código retornado contra la tabla `raw.cluster_sector_section_activities`.
- Open questions: ¿Se usa RAG sobre el catálogo CIIU para mejorar precisión? ¿Qué modelo LLM se usa (Claude)?
