# US-20260425-07 Asignación automática a clúster productivo

## Story

As a emprendedor informal,
I want que el sistema me asigne al clúster productivo que mejor representa mi negocio (ej. Yuca, Turismo, Logística),
so that pueda conectarme con una comunidad empresarial específica y acceder a recursos sectoriales relevantes.

## Context

- Source requirement: Una vez identificado el CIIU, el sistema debe cruzarlo con el catálogo de clústeres (`CLUSTERS_SECTORES_SECCIONES_ACTIVIDADES.csv`, `CLUSTERS_ACTIVIDADESECONOMICAS.csv`) para asignar al negocio al clúster correspondiente.
- Business value: Los clústeres productivos agrupan empresas del mismo sector para facilitar encadenamientos, acceso a programas y política pública. Clasificar correctamente un negocio informal en su clúster es el segundo paso para su integración al ecosistema formal.

## Acceptance Criteria

- [ ] Given que el sistema tiene el código CIIU confirmado, when busca en `raw.cluster_sector_section_activities` por `ciiu_activity_code`, then retorna el `cluster_id`, `cluster_title` y `cluster_code` asociados.
- [ ] Given que se asigna el clúster, when el resultado se muestra al usuario, then se presenta el nombre del clúster (ej. "Clúster Yuca"), su descripción y el color identificativo definido en el catálogo.
- [ ] Given que un código CIIU pertenece a múltiples clústeres, when el sistema encuentra más de un match, then selecciona el de mayor orden (`clusterORDEN`) y lo informa al usuario.
- [ ] Given que no existe un clúster activo para el CIIU encontrado, when se finaliza la búsqueda, then el sistema informa al usuario que su actividad no tiene clúster asignado aún y registra el caso para análisis.
- [ ] Given que el usuario no confirma el clúster sugerido, when selecciona manualmente un clúster diferente, then el sistema registra tanto la sugerencia automática como la selección manual para trazabilidad.

## Notes

- Dependencies: US-20260425-06 (código CIIU clasificado), tablas `raw.cluster_catalog`, `raw.cluster_sector_section_activities` y `raw.cluster_economic_activities` en Supabase, tabla `public.clusters` del ML engine para registrar el resultado.
- Risks: Un mismo CIIU puede estar en varios clústeres (ej. clúster 8 TURISMO tiene muchas actividades). La lógica de priorización debe definirse claramente.
- Open questions: ¿Se usa el modelo ML (`public.clusters`) del backend Python para la clusterización vectorial, o es un mapeo directo por tabla? ¿Ambos enfoques se combinan?
