# US-20260425-11 Generación de recomendaciones de negocios complementarios por K-means

## Story

Como propietario de un negocio informal ya clasificado y clusterizado,
quiero que el sistema me recomiende automáticamente negocios o actores complementarios a mi actividad,
para que pueda identificar proveedores, transportistas y aliados de mi cadena productiva sin tener que buscarlos por mi cuenta.

## Context

- Source requirement: Usando el modelo K-means entrenado (US-20260425-10), el sistema debe identificar para un negocio dado (ej. vendedor de papa / CIIU 0113) qué otros negocios registrados son complementarios en la cadena productiva: proveedores de insumos agrícolas, transportistas (clúster Logística), compradores o procesadores del producto, servicios de apoyo. Las recomendaciones se derivan de la proximidad en el espacio K-means y de las relaciones inter-clúster conocidas (ej. Yuca → Logística, Yuca → Turismo/gastronomía).
- Business value: Un vendedor informal no conoce su ecosistema de negocios. Recibir recomendaciones concretas de proveedores y aliados cercanos reduce su dependencia de intermediarios, baja costos y acelera su integración a cadenas productivas formales. Las recomendaciones ML personalizadas aumentan la retención y utilidad percibida del sistema.

## Acceptance Criteria

- [ ] Dado que un negocio informal tiene CIIU confirmado (ej. 0113 - hortalizas/yuca) y clúster asignado (ej. YUCA), cuando solicita recomendaciones, entonces el sistema consulta el modelo K-means y retorna los N negocios más cercanos en el espacio de características, clasificados por categoría de relación: (1) proveedores de insumos, (2) transportistas/logística, (3) compradores/procesadores, (4) servicios de apoyo.
- [ ] Dado que el sistema genera las recomendaciones por K-means, cuando calcula los negocios similares, entonces excluye automáticamente los negocios del mismo CIIU exacto (competencia directa) y prioriza negocios de clústeres complementarios según la matriz de relaciones inter-clúster definida (ej. YUCA es complementario con LOGISTICA y con TURISMO/gastronomía).
- [ ] Dado que se retornan las recomendaciones, cuando el negocio informal es de tipo agrícola (macrosector RSM), entonces el sistema incluye al menos una recomendación del clúster LOGISTICA (transportistas de carga) con datos de contacto públicos disponibles.
- [ ] Dado que el sistema no tiene suficientes negocios cercanos en el K-means (clúster con menos de 5 miembros), cuando ocurre esta situación, entonces amplía la búsqueda al siguiente clúster más cercano por distancia de centroide hasta completar un mínimo de 5 recomendaciones.
- [ ] Dado que las recomendaciones se generan, cuando el negocio informal está ubicado en un municipio específico, entonces el sistema prioriza negocios del mismo municipio o departamento en los primeros resultados, usando la geolocalización como criterio de desempate en distancias K-means similares.

## Notes

- Dependencies: US-20260425-10 (modelo K-means entrenado), US-20260425-07 (clúster asignado al negocio), datos de `REGISTRADOS_SII.csv` con municipio y actividad, matriz de relaciones inter-clúster (definir: qué clústeres son complementarios entre sí), API de recomendación serverless.
- Risks: Si el modelo K-means no fue entrenado con suficientes datos geográficos, las recomendaciones no tendrán relevancia local. Los negocios "en liquidación" deben ser excluidos de las recomendaciones. La privacidad de datos es crítica: solo se exponen campos públicos (razón social, CIIU, municipio) — nunca NIT, contacto personal ni activos financieros.
- Open questions: ¿La matriz de relaciones inter-clúster es fija (definida por el dominio) o se aprende también del modelo? ¿Se incorpora el algoritmo de similitud coseno sobre embeddings de descripción de negocio como complemento al K-means? ¿Se limita el número de recomendaciones a mostrar (ej. top 10)?
