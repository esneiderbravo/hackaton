# US-20260425-13 Visualizar recomendaciones del clúster en la interfaz de usuario

## Story

As a emprendedor informal,
I want ver en pantalla las empresas y aliados recomendados para mi negocio agrupados por tipo (proveedor, transportadora, aliado),
so that pueda contactarlos directamente y dar los primeros pasos hacia la formalización e integración a la cadena productiva.

## Context

- Source requirement: Las recomendaciones generadas por el motor K-means (US-20260425-12) deben presentarse al usuario de forma visual, clara y accionable en la interfaz web Next.js, permitiendo filtrar por categoría y acceder a los datos de contacto de cada empresa recomendada.
- Business value: Una lista de empresas sin contexto no genera acción. Presentar las recomendaciones agrupadas, con iconografía del clúster y datos de contacto directos convierte el análisis ML en un instrumento práctico de desarrollo empresarial.

## Acceptance Criteria

- [ ] Given que el sistema finalizó la clasificación y generó recomendaciones, when el usuario llega a la pantalla de resultados, then visualiza: (1) tarjeta de resumen con su clúster asignado (nombre, color del clúster, CIIU), (2) tabs o secciones separadas para "Proveedores", "Transportadoras" y "Aliados".
- [ ] Given que el usuario selecciona una pestaña de categoría, when la lista carga, then cada empresa aparece como una tarjeta con: razón social, actividad económica, municipio, y botones de acción para llamar (teléfono) o enviar email si los datos están disponibles.
- [ ] Given que hay más de 10 recomendaciones en una categoría, when el usuario navega la lista, then se implementa paginación o scroll infinito para no sobrecargar la vista inicial (máximo 10 por página).
- [ ] Given que el usuario quiere filtrar recomendaciones, when aplica el filtro de municipio, then la lista se actualiza mostrando solo empresas del municipio seleccionado sin recargar la página.
- [ ] Given que una empresa recomendada no tiene datos de contacto (email/teléfono vacíos en `raw.sii_registered_entities`), when se muestra su tarjeta, then el botón de contacto aparece deshabilitado con el texto "Sin datos de contacto" en lugar de ocultarse.
- [ ] Given que el usuario quiere compartir o guardar sus recomendaciones, when hace clic en "Exportar recomendaciones", then el sistema genera un resumen descargable (PDF o vista imprimible) con su clasificación y la lista de empresas recomendadas.
- [ ] Given que el usuario visita nuevamente su perfil tras haber sido clasificado, when abre la sección "Mis recomendaciones", then el sistema carga las recomendaciones desde `public.clusters.insights.recommendations` en lugar de re-ejecutar el motor ML.

## Notes

- Dependencies: US-20260425-12 (recomendaciones en `insights`), componentes UI existentes (`components/ui/card.tsx`, `components/ui/badge.tsx`), `public.clusters` (Supabase client), `lib/supabase/client.ts`.
- Risks: Datos de contacto (`regitradoEMAIL`, `regitradoTELEFONO1`) están vacíos en una fracción significativa del dataset de SII; la UI debe manejar este caso con gracia sin romper el layout.
- Open questions: ¿Se muestran recomendaciones a usuarios no autenticados (sesión anónima) o requiere registro previo? ¿El color del clúster (`clusterCOLORFONDO`) está disponible en `raw.cluster_catalog` para usarlo en la tarjeta de resumen?
