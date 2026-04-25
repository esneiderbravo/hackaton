# US-20260425-07 Asignación automática a clúster productivo

## Story

Como propietario de un negocio informal recién clasificado con CIIU,
quiero que el sistema me asigne automáticamente al clúster productivo que corresponde a mi actividad económica,
para que pueda conocer el ecosistema empresarial al que pertenezco y los beneficios de pertenecer a ese sector.

## Context

- Source requirement: Una vez identificado el CIIU del negocio, el sistema debe mapear ese código al clúster correspondiente (ej. CIIU 0113 → Clúster YUCA; CIIU 0123 → Clúster CAFÉ) usando la tabla de relación entre actividades y clústeres.
- Business value: La clusterización agrupa negocios similares y facilita el acceso a programas sectoriales, financiamiento, capacitación y redes de apoyo específicas para cada cadena productiva.

## Acceptance Criteria

- [ ] Dado que confirmé mi código CIIU (ej. 0113 - Cultivo de hortalizas, raíces y tubérculos), cuando el sistema ejecuta la asignación de clúster, entonces me muestra el clúster asignado (ej. "Clúster YUCA") con su nombre, descripción y color identificador.
- [ ] Dado que el CIIU confirmado tiene una relación directa con un único clúster, cuando el sistema resuelve la asignación, entonces la asignación es automática sin necesidad de intervención del usuario.
- [ ] Dado que el CIIU podría pertenecer a más de un clúster (caso borde), cuando hay ambigüedad, entonces el sistema presenta los clústeres candidatos con una breve descripción para que el usuario elija el más adecuado.
- [ ] Dado que fui asignado a un clúster, cuando veo la pantalla de resultado, entonces puedo ver cuántas empresas similares ya pertenecen a ese clúster (número de miembros) y el macrosector al que pertenece (ej. Manufacturas o Servicios).
- [ ] Dado que el sistema no encuentra un clúster para el CIIU asignado, cuando esto ocurre, entonces el sistema informa al usuario que su actividad aún no tiene un clúster activo y lo registra como potencial miembro de un clúster futuro.

## Notes

- Dependencies: US-20260425-06 (CIIU confirmado), tabla de relación clúster-actividad (`CLUSTERS_SECTORES_SECCIONES_ACTIVIDADES.csv`), tabla de clústeres activos (`CLUSTERS_ACTIVIDADESECONOMICAS.csv`).
- Risks: Si el catálogo de clústeres no cubre todos los CIIU posibles, una porción de usuarios quedaría sin clúster asignado; se debe contemplar un mecanismo de registro de CIIU sin clúster para análisis posterior.
- Open questions: ¿Se permite al usuario pertenecer a más de un clúster simultáneamente? ¿Existe un proceso de aprobación por parte de un administrador del clúster antes de que el negocio sea miembro oficial?
