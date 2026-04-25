# Analisis inicial - Reto Camara de Comercio (Foco informal -> formal)

## Checklist de enfoque
- [x] Reformular el problema para inclusion productiva.
- [x] Definir propuesta de valor y usuarios objetivo.
- [x] Priorizar un MVP que conecte perfiles informales con empresas formales.
- [x] Ajustar modelo de datos y reglas de matching explicables.
- [x] Definir metricas de impacto y plan de ejecucion de 6 horas.

## 1) Problema reformulado (3-5 lineas)
Hoy existen personas y unidades productivas informales con capacidad real de trabajo, pero con baja visibilidad frente a empresas formales que podrian contratarlas o integrarlas en su cadena de valor.
El reto es crear un motor inteligente que identifique compatibilidad entre oferta informal y demanda formal, con recomendaciones claras y explicables.
La solucion debe priorizar confianza, accion inmediata y trazabilidad de resultados para que la Camara pueda escalar el modelo.

## 2) Propuesta de valor
Conectamos talento y oferta productiva informal con empresas formales adecuadas, reduciendo friccion de busqueda y aumentando oportunidades reales de vinculacion (empleo, proveedor, aliado operativo).

## 3) Segmentos de usuario
- Persona/unidad productiva informal: quiere oportunidades concretas y requisitos claros para vincularse.
- Empresa formal: quiere encontrar perfiles/proveedores compatibles con menor riesgo y menor tiempo de busqueda.
- Administrador Camara/Ruta C: quiere monitorear impacto, calidad del matching y conversion a relaciones reales.

## 4) Inputs / outputs / restricciones
### Inputs
- Datos de clusters y actividades del reto:
  - `Reto Camara de comercio /DATA/CLUSTERS.csv`
  - `Reto Camara de comercio /DATA/CLUSTERS_SECTORES_SECCIONES_ACTIVIDADES.csv`
  - `Reto Camara de comercio /DATA/CLUSTERS_POSIBLES_MIEMBROS_POR_ACTIVIDAD_PRINCIPAL_DATOS.csv`
- Perfil informal capturado por formulario: oficio, experiencia, capacidad, ubicacion, disponibilidad, interes de vinculacion.
- Dataset BigQuery oficial (cuando aplique en hackathon).

### Outputs
- Lista priorizada de empresas formales recomendadas para cada perfil informal.
- Tipo de vinculacion sugerida: empleo, proveedor, aliado.
- Score + explicacion del por que (reglas visibles).

### Restricciones clave
- Solucion funcional y explicable (no caja negra).
- API REST desacoplada (JSON).
- No dashboard estatico sin logica de matching.

## 5) MVP especifico (core vs nice-to-have)
### Core (obligatorio)
1. Registro rapido de perfil informal.
2. Catalogo de empresas formales normalizadas por sector (CIIU), ubicacion y tipo.
3. Motor de matching explicable con ranking.
4. Vista de recomendaciones con razon y accion:
   - aplicar/contactar
   - guardar
   - descartar
5. Bitacora de resultados para medir conversion.

### Nice-to-have (si sobra tiempo)
1. Recomendacion de ruta de formalizacion para el perfil informal.
2. Alertas automaticas cuando aparezca nueva empresa compatible.
3. Panel admin de calidad del matching por cluster.
4. Narrativa LLM para mejorar la explicacion de cada match.

## 6) Flujo MVP end-to-end
1. Usuario informal crea su perfil (habilidades, actividad, ubicacion, disponibilidad).
2. Sistema normaliza datos y los mapea a sectores/actividades.
3. Motor calcula compatibilidad con empresas formales.
4. UI muestra top 5 recomendaciones con score + razon.
5. Usuario ejecuta accion (aplicar/contactar/guardar/descartar).
6. Sistema registra accion y retroalimenta el ranking.

## 7) Arquitectura propuesta para este repo (Next.js + Supabase)
- Frontend (App Router): modulo nuevo en dashboard para "Conexiones".
- Backend (API routes):
  - `/api/informal-profiles`
  - `/api/matching/run`
  - `/api/recommendations/[profileId]`
  - `/api/match-actions`
- Persistencia: tablas nuevas en `supabase/migrations`.
- Seguridad: RLS por `user_id`/rol.
- Orquestacion: corrida manual + cron para refrescar recomendaciones.

## 8) Modelo de datos minimo ajustado
1. `informal_profiles`: id, user_id, nombre, actividad_principal, skills, experiencia_anios, municipio, disponibilidad, estado.
2. `formal_companies`: id, razon_social, ciiu_codigo, cluster, municipio, tipo_organizacion, capacidad_demanda.
3. `matches`: id, profile_id, company_id, relation_type, score_total, status, created_at.
4. `match_reasons`: id, match_id, factor, factor_score, reason_text.
5. `match_actions`: id, match_id, actor_id, action_type, created_at.
6. `agent_runs`: id, trigger_type, started_at, ended_at, status, metrics_json.

## 9) Reglas de matching explicables (v1)
Score total (0-100) =
- 35% compatibilidad sectorial (CIIU/actividad)
- 25% cercania geografica (municipio/distancia)
- 20% ajuste de capacidad (oferta vs demanda)
- 10% disponibilidad temporal
- 10% prioridad estrategica (cluster objetivo)

Reglas de exclusion minima:
- Si no hay compatibilidad sectorial minima, no recomendar.
- Si la empresa no tiene capacidad actual, bajar prioridad.
- Si ya fue descartada por el usuario, no repetir en corto plazo.

## 10) Metricas de impacto para jurado
- Tasa de match relevante: % de recomendaciones con accion positiva.
- Tiempo a primera oportunidad: minutos desde registro a primer match util.
- Conversion a contacto: % de matches que pasan a contacto real.
- Cobertura de inclusion: numero de perfiles informales conectados.
- Calidad explicable: % de matches con razon clara visible.

## 11) Roadmap priorizado (primeras 6 horas)
- Hora 0-1: definir campos del perfil informal + criterios de score.
- Hora 1-2: crear migraciones y cargar base inicial de empresas.
- Hora 2-3: implementar API de perfiles y motor de matching v1.
- Hora 3-4: exponer endpoint de recomendaciones + razones.
- Hora 4-5: construir UI de top matches con acciones.
- Hora 5-6: medir metricas basicas, ajustar scoring y preparar demo script.

## 12) Checklist de demo ganadora (foco informal -> formal)
- [ ] Se registra un perfil informal en vivo.
- [ ] Se generan 3-5 empresas formales recomendadas con score.
- [ ] Cada recomendacion muestra razon legible (por factores).
- [ ] Se ejecuta una accion (contactar/guardar/descartar).
- [ ] Se visualiza al menos 1 metrica de impacto.
- [ ] Se explica como el modelo escala con nuevos datos/eventos.
