# US-20260425-12 Visualización de recomendaciones de aliados en lenguaje simple

## Story

Como propietario de un negocio informal sin conocimientos técnicos,
quiero ver las recomendaciones de negocios aliados en un formato claro y en lenguaje cotidiano,
para que pueda entender rápidamente quiénes me pueden vender insumos, transportar mi producto o comprar lo que produzco, sin necesidad de interpretar códigos ni tecnicismos.

## Context

- Source requirement: Las recomendaciones generadas por el motor K-means (US-20260425-11) deben presentarse al usuario informal de forma visual, agrupadas por tipo de relación (proveedor, transportista, comprador, servicio) y con etiquetas en lenguaje natural. El usuario no conoce conceptos como CIIU, K-means ni clúster productivo; el sistema debe traducir los resultados a términos comprensibles.
- Business value: La presentación clara de recomendaciones es el principal punto de valor percibido por el usuario informal. Si las recomendaciones son difíciles de leer o interpretar, el usuario abandona el flujo sin aprovechar el sistema. Un diseño intuitivo maximiza la tasa de conversión de informales hacia la formalización asistida.

## Acceptance Criteria

- [ ] Dado que el sistema genera recomendaciones para un vendedor de papa (CIIU 0113), cuando se muestra la pantalla de recomendaciones, entonces las tarjetas de resultado muestran: nombre del negocio, tipo de relación en lenguaje natural (ej. "Te puede vender semillas o insumos", "Puede transportar tu producto", "Puede comprarte tu cosecha"), municipio y un botón de "Ver más".
- [ ] Dado que las recomendaciones están categorizadas, cuando el usuario ve la pantalla, entonces los resultados están agrupados en secciones con íconos y títulos simples: "Proveedores", "Transportistas", "Compradores" y "Servicios de apoyo", cada sección con al menos 1 resultado si existe en la base de datos.
- [ ] Dado que el usuario hace clic en "Ver más" de una recomendación, cuando se abre el detalle, entonces ve la descripción de la actividad económica en lenguaje simple (no el código CIIU), el municipio donde opera, el macrosector al que pertenece y, si está disponible, información de contacto público.
- [ ] Dado que el sistema no tiene recomendaciones suficientes para alguna categoría, cuando esto ocurre, entonces esa sección muestra un mensaje motivacional (ej. "Aún no hay transportistas registrados en tu zona — ¡tú podrías ser el primero!") en lugar de quedar vacía.
- [ ] Dado que el usuario ve sus recomendaciones, cuando desea guardarlas, entonces puede descargar o compartir su lista de recomendaciones como PDF o enlace, con su nombre de negocio, CIIU y clúster en el encabezado.

## Notes

- Dependencies: US-20260425-11 (recomendaciones generadas), US-20260425-07 (clúster asignado), componentes UI existentes (Card, Button, Badge), diseño responsivo para uso móvil (la mayoría de usuarios informales accede desde smartphone).
- Risks: Mostrar información de contacto de empresas sin su consentimiento puede generar conflictos legales; revisar política de datos públicos del Registro Mercantil. El lenguaje de las etiquetas de relación debe validarse con usuarios reales del sector agrícola para asegurar comprensión.
- Open questions: ¿Se muestran las recomendaciones antes o después de la hoja de ruta de formalización (US-20260425-08)? ¿El PDF descargable incluye código QR o enlace al perfil del negocio en el sistema? ¿Hay versión offline/PWA para zonas rurales con conectividad limitada?
