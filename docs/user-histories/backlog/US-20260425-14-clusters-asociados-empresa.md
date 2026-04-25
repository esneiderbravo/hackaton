# US-20260425-14 Ver clusters asociados a mi empresa

## Story

Como usuario,
quiero ver los clusters en los que participo,
para entender mi posicion en el ecosistema.

## Context

- Source requirement: "HU-16 Ver clusters asociados a mi empresa. Como usuario quiero ver los clusters en los que participo para entender mi posición en el ecosistema."
- Business value: Ayuda a comprender relaciones dentro del ecosistema productivo y facilita la toma de decisiones para colaboraciones y crecimiento.

## Acceptance Criteria

- [ ] Given que el usuario ingresa a su dashboard o perfil empresarial, when accede al modulo de clusters, then existe una vista o bloque dedicado que muestra sus clusters asociados.
- [ ] Given que se muestra la informacion de clusters, when el usuario revisa cada cluster, then se presenta una explicacion clara y en lenguaje simple sobre el significado de pertenecer a ese cluster.
- [ ] Given que el usuario consulta un cluster asociado, when se carga su detalle resumido, then se muestran otras empresas participantes o, en su defecto, la cantidad total de empresas del cluster.

## Notes

- Dependencies: datos de afiliacion empresa-cluster, servicio de consulta de miembros del cluster y contenido explicativo de negocio.
- Risks: datos desactualizados de membresia pueden generar confusion sobre la posicion real de la empresa.
- Open questions: se debe mostrar siempre lista de empresas o solo el conteo cuando hay restricciones de privacidad?

