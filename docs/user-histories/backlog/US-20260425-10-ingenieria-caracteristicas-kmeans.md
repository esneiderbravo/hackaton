# US-20260425-10 Construir vector de características para el modelo K-means

## Story

As a sistema de machine learning,
I want construir un vector de características normalizado a partir de los datos de un negocio registrado,
so that el modelo K-means pueda calcular distancias entre negocios y agruparlos en clústeres coherentes.

## Context

- Source requirement: El motor K-means necesita transformar los atributos de cada empresa/negocio informal en un vector numérico estandarizado antes de entrenar o predecir. Las tablas `public.features_engineered` y `public.model_versions` del esquema ML ya contemplan este paso.
- Business value: La calidad del vector de características determina directamente la precisión de las recomendaciones. Sin feature engineering correcto, negocios similares (ej. dos vendedores de papa) quedarían en clústeres distintos y las recomendaciones serían irrelevantes.

## Acceptance Criteria

- [ ] Given que existe un registro en `public.companies` con `ciiu_code`, `municipality`, `organization_type`, `active_assets` y `employees`, when el pipeline de feature engineering se ejecuta, then genera una fila en `public.features_engineered` con `numeric_features` (activos, ingresos, empleados normalizados), `categorical_features` (CIIU, sección, macrosector codificados) y `feature_vector` (concatenación de ambos).
- [ ] Given que el campo `ciiu_code` de un negocio coincide con un `ciiu_activity_code` en `raw.cluster_sector_section_activities`, when se construye el vector, then se enriquece `categorical_features` con `macro_sector_code`, `ciiu_section_code` y `cluster_id` del catálogo.
- [ ] Given que un campo numérico (activos, ingresos) es nulo o cero, when el pipeline construye el vector, then imputa el valor con la mediana del mismo `ciiu_code` en el dataset y registra la imputación en `metadata` de la empresa.
- [ ] Given que el vector fue generado, when se calcula `quality_score`, then este refleja el porcentaje de campos no imputados (1.0 = todos los campos originales, 0.0 = todos imputados).
- [ ] Given que ya existe una fila en `public.features_engineered` para el par `(company_id, model_version_id)`, when se re-ejecuta el pipeline, then actualiza el registro existente (upsert) sin duplicar.

## Notes

- Dependencies: `public.companies`, `public.features_engineered`, `public.model_versions`, `raw.cluster_sector_section_activities` en Supabase. US-20260425-09 (empresa ya persistida). Motor Python del backend `quinecta`.
- Risks: Negocios informales recién creados tendrán activos/ingresos/empleados en cero, lo que distorsiona el vector; la imputación por mediana CIIU es crítica para este caso de uso.
- Open questions: ¿Se usa scikit-learn `StandardScaler` o `MinMaxScaler` para normalización numérica? ¿Los features categóricos usan one-hot encoding o label encoding?
