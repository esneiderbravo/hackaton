# US-20260425-09 Visualización de miembros y estadísticas del clúster asignado

## Story

Como propietario de un negocio informal recién clusterizado,
quiero explorar los otros negocios y empresas que pertenecen a mi clúster,
para que pueda entender el ecosistema productivo al que pertenezco, conocer actores del sector y motivarme a formalizarme.

## Context

- Source requirement: El sistema debe mostrar al usuario que fue clasificado y clusterizado un panel con las empresas ya registradas en su clúster (desde `CLUSTERS_POSIBLES_MIEMBROS_POR_ACTIVIDAD_PRINCIPAL_DATOS.csv` y `REGISTRADOS_SII.csv`), estadísticas de composición del clúster y las actividades CIIU presentes en él.
- Business value: Ver que otros negocios similares ya están formalizados y creciendo en el mismo clúster genera confianza y motivación. También permite que el sistema identifique la densidad del clúster y muestre oportunidades de encadenamiento productivo.

## Acceptance Criteria

- [ ] Dado que fui asignado al clúster YUCA (o cualquier otro clúster), cuando accedo a la pantalla de mi clúster, entonces veo una tarjeta del clúster con: nombre, descripción, macrosector, número total de miembros y las principales actividades CIIU presentes.
- [ ] Dado que estoy en la pantalla de mi clúster, cuando el sistema carga los miembros, entonces veo una lista paginada de empresas registradas en el clúster con: razón social, tipo de organización, municipio y actividad CIIU.
- [ ] Dado que quiero explorar la distribución de actividades de mi clúster, cuando accedo a la sección de estadísticas, entonces veo un gráfico de distribución que muestra cuántos miembros hay por actividad CIIU dentro del clúster.
- [ ] Dado que soy un negocio recién clusterizado (informal, aún no registrado), cuando el sistema muestra la lista de miembros, entonces mi negocio aparece distinguido como "potencial miembro" o "en proceso de formalización" sin confundirse con empresas ya formalizadas.
- [ ] Dado que quiero explorar otros clústeres, cuando navego desde la pantalla de mi clúster, entonces puedo ver un mapa o listado de todos los clústeres activos con su número de miembros y macrosector, para entender el ecosistema completo.

## Notes

- Dependencies: US-20260425-07 (clúster asignado), datos de `CLUSTERS_POSIBLES_MIEMBROS_POR_ACTIVIDAD_PRINCIPAL_DATOS.csv` y `REGISTRADOS_SII.csv` cargados en Supabase, migración de base de datos para las tablas de clústeres y miembros.
- Risks: Los datos de empresas registradas son sensibles; se debe aplicar RLS en Supabase para mostrar solo información pública (razón social, actividad, municipio) y nunca exponer NIT, contacto u otros datos privados.
- Open questions: ¿La visualización de miembros del clúster es pública o requiere autenticación? ¿Se debe implementar un buscador dentro del clúster para encontrar empresas similares por municipio o actividad?
