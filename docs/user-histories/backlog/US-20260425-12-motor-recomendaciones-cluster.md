# US-20260425-12 Motor de recomendaciones basado en vecinos del clúster K-means

## Story

As a emprendedor informal clasificado en un clúster,
I want recibir una lista de recomendaciones de proveedores, transportadoras y aliados relacionados con mi negocio,
so that pueda conectarme con actores formales de mi misma cadena productiva sin tener que buscarlos por mi cuenta.

## Context

- Source requirement: A partir de los vecinos K-means del mismo clúster (US-20260425-11), el sistema analiza los tipos de actividad económica de esos vecinos formales y genera recomendaciones agrupadas por rol en la cadena: proveedores de insumos, transportadoras, comercializadores, transformadores. Las recomendaciones se nutren de `raw.sii_registered_entities` y `raw.cluster_potential_members_by_primary_activity`.
- Business value: Un vendedor de papa no solo necesita saber que pertenece al clúster "Yuca/Hortalizas", sino también quiénes en su región pueden abastecerle, transportar su producto o ayudarle a comercializarlo. Este motor cierra la brecha entre clasificación y acción concreta.

## Acceptance Criteria

- [ ] Given que el negocio fue asignado a un clúster (ej. clúster 3 YUCA), when el motor de recomendaciones se ejecuta, then consulta `raw.cluster_sector_section_activities` para obtener todos los `ciiu_activity_code` activos del mismo clúster y los cruza con `raw.sii_registered_entities` por `primary_ciiu_code_sii` para obtener empresas formales relacionadas.
- [ ] Given que se obtiene la lista de empresas formales del clúster, when el motor las clasifica por rol, then agrupa en al menos 3 categorías: (1) **Proveedores** (misma actividad principal o actividad complementaria de insumos), (2) **Transportadoras** (CIIU sección H del catálogo de clúster 7 LOGÍSTICA), (3) **Comercializadores/Aliados** (actividades de venta y distribución del mismo macrosector).
- [ ] Given que el motor genera recomendaciones, when retorna los resultados, then cada recomendación incluye: `razon_social`, `ciiu_code`, `ciiu_title`, `municipality`, `organization_type`, `email` (si disponible), `telefono` (si disponible) y `categoria_recomendacion` (Proveedor / Transportadora / Aliado).
- [ ] Given que hay más de 50 recomendaciones posibles, when el motor las ordena, then prioriza empresas del mismo municipio primero, luego del mismo departamento, usando `municipality` de `raw.sii_registered_entities`.
- [ ] Given que el negocio recién clasificado no tiene vecinos formales en su clúster (clúster vacío), when el motor no encuentra resultados, then retorna las empresas de `raw.cluster_potential_members_by_primary_activity` del mismo `cluster_id` como fallback.
- [ ] Given que el motor genera las recomendaciones, when las almacena, then las persiste en `insights` de `public.clusters` del negocio bajo la clave `recommendations` como array JSON con las recomendaciones y su categoría.

## Notes

- Dependencies: US-20260425-11 (clúster asignado y vecinos), `raw.sii_registered_entities`, `raw.cluster_sector_section_activities`, `raw.cluster_potential_members_by_primary_activity`, `public.clusters.insights`. API route Next.js o endpoint Python del backend `quinecta`.
- Risks: `raw.sii_registered_entities` contiene muchas empresas "EN LIQUIDACION"; se debe filtrar por `registradoESTADO = 'MA'` (Matrícula Activa) para no recomendar empresas inactivas.
- Open questions: ¿El motor de recomendaciones vive en el backend Python (`quinecta`) o en la API route Next.js? ¿Se aplica algún score de relevancia adicional (ej. tamaño de empresa, volumen de ingresos)?
