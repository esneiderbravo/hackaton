# US-20260425-10 Entrenamiento del modelo K-means sobre el registro de negocios

## Story

Como administrador del sistema de clusterización,
quiero entrenar y mantener un modelo K-means con los datos de negocios registrados,
para que el sistema pueda identificar grupos de negocios similares y generar recomendaciones basadas en proximidad de actividad, sector y ubicación geográfica.

## Context

- Source requirement: El sistema de recomendación necesita un modelo de Machine Learning (K-means) entrenado sobre el catálogo de empresas registradas (CIIU, macrosector, sección CIIU, municipio, tipo de organización) para calcular la similitud entre negocios y recomendar actores complementarios de la cadena productiva.
- Business value: Un modelo K-means bien entrenado permite agrupar automáticamente los negocios del registro SII por características económicas y geográficas similares, lo que habilita recomendaciones contextualizadas sin intervención manual. Esto escala el sistema a miles de negocios informales sin costo adicional por consulta.

## Acceptance Criteria

- [ ] Dado que existen registros de empresas en la base de datos (CIIU, macrosector, municipio, tipo organización), cuando se ejecuta el proceso de entrenamiento K-means, entonces el modelo genera K clústeres (K configurable, valor inicial sugerido: 8) donde cada negocio queda asignado a un clúster con una distancia centroide calculada.
- [ ] Dado que el modelo K-means es entrenado con variables categóricas (CIIU codificado como one-hot encoding o embeddings) y numéricas (activos totales, personal), cuando finaliza el entrenamiento, entonces se almacena el modelo serializado junto con los metadatos de cada clúster (centroide, número de miembros, actividades CIIU predominantes).
- [ ] Dado que se agregan nuevos negocios al sistema, cuando el número de registros nuevos supera un umbral configurable (ej. 100 registros nuevos), entonces el sistema alerta al administrador para ejecutar un re-entrenamiento del modelo.
- [ ] Dado que el administrador ejecuta el re-entrenamiento, cuando el nuevo modelo supera en métrica de silueta (silhouette score) al modelo anterior, entonces el nuevo modelo reemplaza al anterior en producción; si no mejora, se conserva el anterior y se notifica al administrador.
- [ ] Dado que el modelo está entrenado, cuando se consulta la similitud entre dos negocios, entonces el sistema retorna la distancia euclidiana normalizada entre ambos dentro del espacio K-means y el clúster al que pertenece cada uno.

## Notes

- Dependencies: Datos de `REGISTRADOS_SII.csv` y `CLUSTERS_SECTORES_SECCIONES_ACTIVIDADES.csv` cargados en Supabase; pipeline de preprocesamiento (codificación CIIU, normalización de variables numéricas); librería de ML (scikit-learn en Python o similar vía API serverless).
- Risks: Los datos de entrenamiento contienen negocios "en liquidación" que pueden sesgar los clústeres; se debe filtrar por estado activo antes de entrenar. La codificación de CIIU como one-hot genera alta dimensionalidad (>500 categorías posibles); considerar reducción de dimensionalidad con PCA o usar embeddings semánticos de actividad.
- Open questions: ¿El modelo K-means se ejecuta como script Python en un job programado o como Vercel Function serverless? ¿Se almacena el modelo entrenado en Vercel Blob o en Supabase Storage? ¿Se evalúa también DBSCAN u otros algoritmos alternativos para comparar calidad de clústeres?
