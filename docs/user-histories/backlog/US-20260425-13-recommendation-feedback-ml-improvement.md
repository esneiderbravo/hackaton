# US-20260425-13 Retroalimentación del usuario para mejorar las recomendaciones ML

## Story

Como propietario de un negocio informal que recibió recomendaciones,
quiero indicar cuáles recomendaciones me fueron útiles y cuáles no,
para que el sistema aprenda de mis preferencias y mejore las sugerencias futuras para mí y para otros negocios similares.

## Context

- Source requirement: El motor de recomendaciones K-means debe incorporar un mecanismo de retroalimentación explícita (thumbs up/down, "útil" / "no aplica para mí") para recolectar señales de relevancia que permitan reentrenar o ajustar el modelo con datos etiquetados reales de usuarios informales del territorio.
- Business value: El ciclo de retroalimentación convierte el sistema de una herramienta estática en un sistema de aprendizaje continuo. Cuantos más usuarios respondan, más precisas serán las recomendaciones para el segmento específico de negocios informales del Magdalena, diferenciando el sistema de soluciones genéricas. Los datos de retroalimentación también son valiosos para la Cámara de Comercio como inteligencia de mercado.

## Acceptance Criteria

- [ ] Dado que el usuario ve una recomendación en su pantalla, cuando hace clic en el ícono de "útil" (👍) o "no aplica" (👎), entonces el sistema registra el feedback con: ID del negocio origen, ID del negocio recomendado, tipo de relación sugerida, calificación y timestamp — sin requerir formularios adicionales.
- [ ] Dado que el usuario califica una recomendación como "no aplica", cuando confirma la acción, entonces el sistema muestra otra recomendación de reemplazo en la misma categoría (si existe) y la recomendación descartada no vuelve a aparecer en futuras sesiones del mismo usuario.
- [ ] Dado que se acumulan N calificaciones de retroalimentación (N configurable, valor inicial: 50 por clúster), cuando el administrador ejecuta el ciclo de reentrenamiento, entonces el modelo K-means incorpora el feedback como pesos adicionales en las variables de proximidad (negocios frecuentemente marcados como "útil" juntos reciben mayor similitud).
- [ ] Dado que el administrador accede al panel de administración, cuando consulta el módulo de retroalimentación, entonces puede ver: total de feedbacks recibidos por clúster, porcentaje de recomendaciones calificadas como útiles vs. no aplica, y los pares de relación con mayor y menor aceptación.
- [ ] Dado que un usuario no quiere dar retroalimentación, cuando omite las calificaciones, entonces el sistema continúa funcionando normalmente con el modelo actual — la retroalimentación es siempre opcional y no bloquea ningún flujo.

## Notes

- Dependencies: US-20260425-11 (motor de recomendaciones), US-20260425-12 (pantalla de recomendaciones), US-20260425-10 (pipeline de reentrenamiento K-means), tabla de retroalimentación en Supabase con RLS (solo el usuario puede ver su propio historial, el administrador ve el agregado anonimizado).
- Risks: Sesgo de selección: si solo los usuarios más satisfechos dan feedback, el modelo aprenderá solo de experiencias positivas. Se debe diseñar para capturar también el feedback negativo de forma fácil. Los datos de retroalimentación son datos personales correlacionados con actividad económica; aplicar anonimización antes de usar en reentrenamiento.
- Open questions: ¿El reentrenamiento del modelo ocurre automáticamente en un cron job o lo dispara manualmente el administrador? ¿Se implementa también retroalimentación implícita (clicks, tiempo en pantalla) además de la explícita? ¿Los datos de feedback son compartidos con la Cámara de Comercio como dataset de inteligencia de mercado?
