# US-20260425-06 Clasificación automática CIIU por IA a partir de descripción libre

## Story

Como propietario de un negocio informal,
quiero que el sistema identifique automáticamente mi código de actividad económica CIIU a partir de la descripción que ingresé,
para que no tenga que buscar o conocer los códigos legales por mi cuenta.

## Context

- Source requirement: El sistema debe analizar con IA la descripción libre del negocio y mapearla al código CIIU correcto (ej. "vendo yuca" → CIIU 0113 "Cultivo de hortalizas, raíces y tubérculos").
- Business value: Automatizar la clasificación CIIU reduce errores de auto-declaración, acelera el proceso de formalización y garantiza que el negocio quede correctamente registrado desde el inicio.

## Acceptance Criteria

- [ ] Dado que describí mi negocio como "vendo yuca en la plaza", cuando el sistema procesa mi descripción con IA, entonces me presenta el código CIIU sugerido (ej. 0113) con su nombre oficial y una explicación en lenguaje simple de por qué corresponde a mi actividad.
- [ ] Dado que la IA analiza mi descripción, cuando la confianza de clasificación es alta (>80%), entonces el sistema muestra un único código CIIU como resultado principal con opción de confirmar o corregir.
- [ ] Dado que la IA analiza mi descripción, cuando la confianza es media (50–80%) o hay ambigüedad, entonces el sistema presenta hasta 3 opciones de códigos CIIU ordenadas por relevancia para que el usuario elija.
- [ ] Dado que confirmo o selecciono un código CIIU, cuando hago clic en aceptar, entonces el sistema registra la actividad económica elegida y continúa al flujo de clusterización (US-20260425-07).
- [ ] Dado que la descripción no tiene suficiente información para clasificar, cuando el sistema no puede asignar un CIIU con confianza mínima del 40%, entonces me hace preguntas de aclaración (ej. "¿Produces el producto o lo vendes?", "¿Es una actividad agrícola o de comercio?").

## Notes

- Dependencies: API de IA (ruta `/api/ai/chat` existente con Claude), catálogo de códigos CIIU con descripciones (datos de `CLUSTERS_SECTORES_SECCIONES_ACTIVIDADES.csv`), US-20260425-05 completado.
- Risks: Alucinaciones del modelo pueden asignar códigos incorrectos; se requiere validación contra el catálogo oficial de CIIU antes de mostrar resultados. El prompt debe incluir el listado completo de actividades disponibles como contexto.
- Open questions: ¿Se debe registrar el historial de clasificaciones para mejorar el modelo? ¿Se permite que el usuario rechace todas las sugerencias y clasifique manualmente?
