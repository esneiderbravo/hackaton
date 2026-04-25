# US-20260425-08 Entrega de hoja de ruta de formalización empresarial

## Story

Como propietario de un negocio informal ya clasificado y clusterizado,
quiero recibir una guía personalizada con todos los pasos para formalizar mi negocio,
para que sepa exactamente qué trámites debo hacer, en qué orden y ante qué entidades, sin necesitar un asesor externo.

## Context

- Source requirement: El sistema debe entregar, después de la clasificación CIIU y la asignación de clúster, una ruta de formalización completa que incluya tipo de organización sugerido, trámites ante cámara de comercio, DIAN, alcaldía y otras entidades relevantes.
- Business value: El principal obstáculo para la formalización de negocios informales es el desconocimiento del proceso; una ruta guiada y personalizada reduce ese desconocimiento y aumenta la tasa de formalización en los clústeres productivos.

## Acceptance Criteria

- [ ] Dado que fui asignado a un clúster y tengo mi CIIU confirmado, cuando el sistema genera mi hoja de ruta, entonces recibo una lista ordenada de pasos de formalización (ej. 1. Registro en Cámara de Comercio, 2. Inscripción en RUT - DIAN, 3. Registro de uso de suelo en alcaldía) con descripción de cada paso en lenguaje simple.
- [ ] Dado que el sistema conoce mi actividad económica (CIIU) y el tipo de clúster, cuando genera la ruta, entonces incluye la sugerencia del tipo de organización jurídica más adecuada para mi negocio (ej. Persona Natural, SAS, Sociedad Limitada) con una explicación de ventajas y desventajas de cada opción.
- [ ] Dado que veo mi hoja de ruta de formalización, cuando accedo a cada paso, entonces puedo ver el tiempo estimado, los documentos requeridos, el costo aproximado y el enlace o dirección de la entidad responsable.
- [ ] Dado que completé ver mi hoja de ruta, cuando hago clic en "Guardar mi ruta", entonces el sistema guarda mi perfil (descripción, CIIU, clúster y ruta) y me envía un resumen por correo electrónico o lo hace descargable en PDF.
- [ ] Dado que tengo dudas sobre algún paso de formalización, cuando hago clic en "Preguntar al asistente", entonces se abre el chat de IA con contexto precargado sobre mi actividad y el paso en cuestión.

## Notes

- Dependencies: US-20260425-07 (clúster asignado), US-20260425-06 (CIIU confirmado), ruta de API de IA existente (`/api/ai/chat`), definición del catálogo de pasos de formalización por tipo de organización y CIIU.
- Risks: Los pasos de formalización pueden variar por municipio (ej. Santa Marta vs. municipios rurales del Magdalena); se debe parametrizar la ruta por municipio o departamento. La información de costos y tiempos puede quedar desactualizada si no hay un proceso de actualización periódica del catálogo.
- Open questions: ¿El catálogo de pasos de formalización debe ser administrado desde el panel de administración o es estático por ahora? ¿Se debe integrar con la API de la DIAN o Cámara de Comercio para información en tiempo real?
