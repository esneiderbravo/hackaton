# US-20260425-11 Ejecutar K-means para identificar vecinos del mismo clúster

## Story

As a sistema de machine learning,
I want asignar un negocio informal a su clúster K-means y recuperar los negocios formales más cercanos del mismo clúster,
so that el motor de recomendaciones tenga una lista de vecinos relevantes desde los cuales extraer sugerencias de proveedores, transportadoras y aliados.

## Context

- Source requirement: Usando el modelo K-means entrenado sobre `public.features_engineered`, el sistema debe calcular la distancia euclidiana del nuevo negocio al centroide de cada clúster, asignarlo al más cercano y recuperar los K negocios del mismo clúster con menor distancia al centroide (vecinos más próximos).
- Business value: El valor del sistema radica en conectar negocios informales con actores formales de su misma cadena productiva. Identificar los vecinos más cercanos en el espacio vectorial garantiza que las recomendaciones sean contextualmente precisas (un vendedor de papa encontrará distribuidoras de papa, no de cacao).

## Acceptance Criteria

- [ ] Given que existe un registro en `public.features_engineered` para un negocio nuevo, when se llama al endpoint de predicción K-means con el `company_id`, then el modelo calcula la distancia del vector al centroide de cada clúster y asigna el `cluster_label` del centroide más cercano.
- [ ] Given que el negocio fue asignado a un clúster, when se persiste el resultado en `public.clusters`, then se almacenan: `cluster_label` (entero K-means), `confidence` (1 − distancia_normalizada), `centroid_distance` (distancia euclidiana al centroide) e `insights.cluster_name` (nombre del clúster del catálogo).
- [ ] Given que el negocio fue clusterizado, when el sistema busca vecinos, then retorna los top-N (configurable, default 20) registros de `public.clusters` con el mismo `cluster_label` ordenados por `centroid_distance ASC`, excluyendo el propio negocio.
- [ ] Given que el modelo K-means ya está entrenado y disponible como versión activa en `public.model_versions` (status = 'active'), when llega un negocio nuevo, then el sistema usa esa versión sin reentrenar; solo re-entrena si no existe versión activa.
- [ ] Given que se re-entrena el modelo con datos actualizados, when se persiste la nueva versión en `public.model_versions`, then la versión anterior cambia a status = 'archived' y todos los `public.clusters` antiguos conservan su `model_version_id` original para trazabilidad histórica.
- [ ] Given que el `confidence` de la asignación es menor a 0.4, when el sistema retorna el resultado, then marca el resultado como `low_confidence` en `insights` e incluye el segundo clúster más cercano como alternativa.

## Notes

- Dependencies: US-20260425-10 (vector de características construido), `public.clusters`, `public.model_versions`, `public.features_engineered`. Motor Python `quinecta` con scikit-learn `KMeans`. Número de clústeres K debe coincidir con el total de clústeres activos en `raw.cluster_catalog` (actualmente 8: Banano, Mango, Yuca, Cacao, Palma, Café, Logística, Turismo).
- Risks: Con K=8 fijo y un negocio de papa (CIIU 0113 = "Hortalizas, raíces y tubérculos"), el modelo debe haberlo visto en entrenamiento; si no hay datos de papa en el dataset inicial, la asignación puede caer en Yuca (clúster 3) que comparte el mismo CIIU — esto es correcto y esperado.
- Open questions: ¿Se usa `sklearn.KMeans` con `n_init=10` y `random_state` fijo desde `model_versions.random_seed`? ¿El modelo se serializa en disco, en S3/Supabase Storage o se reconstruye desde los centroides almacenados?
