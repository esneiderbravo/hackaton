# US-20260425-05 Describir negocio informal en lenguaje natural

## Story

As a emprendedor informal,
I want to describir mi negocio con mis propias palabras (ej. "vendo yuca en la plaza"),
so that el sistema entienda a qué me dedico sin que yo conozca códigos legales ni términos técnicos.

## Context

- Source requirement: El sistema debe aceptar una descripción libre de un negocio informal y procesarla para clasificarlo y clusterizarlo.
- Business value: La mayoría de emprendedores informales desconocen los tecnicismos de la formalización empresarial. Bajar la barrera de entrada a texto libre permite incluir a toda la población objetivo.

## Acceptance Criteria

- [ ] Given que el usuario abre el formulario de clasificación, when escribe una descripción de su negocio en lenguaje natural (mínimo 10 caracteres), then el sistema acepta la entrada y habilita el botón de "Analizar mi negocio".
- [ ] Given que el usuario envía una descripción vacía o menor a 10 caracteres, when intenta continuar, then el sistema muestra un mensaje de validación pidiendo más detalle.
- [ ] Given que el usuario describe su negocio en español colombiano con jerga local (ej. "tengo una frutería de chontaduro"), when el sistema recibe la entrada, then la normaliza y la envía al motor de IA para análisis.
- [ ] Given que el sistema recibe la descripción, when la procesa, then muestra un indicador de carga y no bloquea la interfaz.

## Notes

- Dependencies: Componente de formulario React (UI), servicio de IA (`/api/ai/chat`), Supabase para persistencia posterior.
- Risks: Descripciones muy ambiguas pueden generar clasificaciones incorrectas; se debe contemplar flujo de confirmación posterior.
- Open questions: ¿Se admiten descripciones en inglés o solo español? ¿Se registra la descripción original tal cual para auditoría?
