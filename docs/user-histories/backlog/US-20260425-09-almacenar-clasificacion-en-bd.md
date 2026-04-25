# US-20260425-09 Almacenar resultado de clasificación y clusterización en base de datos

## Story

As a administrador del sistema,
I want que cada clasificación completada se persista automáticamente en la base de datos con todos sus atributos,
so that podamos analizar patrones de negocios informales, medir cobertura de clústeres y generar reportes de formalización.

## Context

- Source requirement: Una vez que el usuario confirma su clasificación (CIIU + clúster asignado), el sistema debe almacenar el registro en la base de datos Supabase, incluyendo la descripción original, los resultados de la IA y los datos del clúster.
- Business value: La persistencia de datos es la base para análisis estadístico, retroalimentación del modelo de ML y reporting para la Cámara de Comercio. Sin almacenamiento, el sistema no genera valor analítico.

## Acceptance Criteria

- [ ] Given que el usuario confirma su clasificación, when hace clic en "Guardar mi clasificación", then el sistema crea un registro en `public.companies` con los campos: `external_id` (generado), `name` (razón social o apodo del negocio), `ciiu_code`, `municipality`, `organization_type`, `metadata` (descripción original, confianza de la IA, cluster_id).
- [ ] Given que el registro de empresa fue creado, when el sistema finaliza la asignación de clúster, then registra en `public.clusters` el `cluster_label`, `confidence` y `insights` (incluyendo nombre del clúster, CIIU, macrosector).
- [ ] Given que el guardado es exitoso, when la operación finaliza, then el sistema muestra un mensaje de confirmación con el ID del registro y un resumen de los datos guardados.
- [ ] Given que ocurre un error durante el guardado (ej. fallo de red), when la operación falla, then el sistema muestra un mensaje de error claro y conserva los datos del formulario para que el usuario pueda reintentar.
- [ ] Given que ya existe un registro con el mismo `external_id`, when se intenta guardar nuevamente, then el sistema actualiza el registro existente (upsert) en lugar de crear un duplicado.
- [ ] Given que el registro ha sido almacenado, when un administrador consulta la base de datos, then puede filtrar registros por `cluster_label`, `ciiu_code` y `municipality` usando los índices definidos.

## Notes

- Dependencies: US-20260425-05 (descripción), US-20260425-06 (CIIU), US-20260425-07 (clúster), tablas `public.companies` y `public.clusters` de `202604250001_init_ml_engine.sql`, cliente Supabase (`lib/supabase/client.ts`), RLS habilitado en todas las tablas.
- Risks: Las tablas `public.companies` y `public.clusters` tienen RLS activo; asegurarse de que las políticas permitan inserciones desde usuarios anónimos o autenticados según el flujo definido. El campo `model_version_id` en `public.clusters` requiere que exista al menos una versión de modelo activa.
- Open questions: ¿El flujo de clasificación requiere autenticación (usuario registrado) o puede hacerlo un visitante anónimo? ¿Se almacena la sesión de chat de IA junto al registro para auditoría?
