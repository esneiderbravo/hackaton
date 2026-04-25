# US-20260425-05 Captura de descripción de negocio informal

## Story

Como propietario de un negocio informal,
quiero describir en mis propias palabras lo que hago o vendo,
para que el sistema entienda mi actividad económica sin que yo necesite saber tecnicismos legales ni códigos CIIU.

## Context

- Source requirement: El sistema debe permitir que un vendedor informal (ej. vendedor de yuca) ingrese una descripción libre de su negocio sin conocimiento previo de clasificaciones económicas ni trámites de formalización.
- Business value: Eliminar la barrera de entrada para negocios informales que desean formalizarse, permitiendo que cualquier persona describa su actividad en lenguaje cotidiano y reciba orientación precisa.

## Acceptance Criteria

- [ ] Dado que soy un negocio informal sin conocimientos legales, cuando accedo al sistema por primera vez, entonces veo un formulario conversacional simple con un campo de texto libre que me invita a describir qué hago o qué vendo.
- [ ] Dado que escribo una descripción como "vendo yuca y plátano en la plaza de mercado", cuando envío el formulario, entonces el sistema acepta la entrada y confirma que está analizando mi actividad antes de clasificarme.
- [ ] Dado que intento enviar el formulario vacío o con menos de 10 caracteres, cuando hago clic en continuar, entonces el sistema me muestra un mensaje indicando que necesito describir más detalle sobre mi negocio.
- [ ] Dado que el sistema recibe mi descripción, cuando procesa la información, entonces muestra un indicador de progreso mientras analiza y clasifica mi negocio.

## Notes

- Dependencies: Componente UI de formulario conversacional (flujo onboarding), integración con servicio de IA (US-20260425-06).
- Risks: Descripciones muy ambiguas o con términos regionales pueden dificultar la clasificación automática; se debe contemplar un flujo de preguntas de clarificación.
- Open questions: ¿El formulario debe ser multilenguaje (español/inglés)? ¿Se guarda la descripción original para auditoría?
