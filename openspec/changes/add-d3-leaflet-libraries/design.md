## Context

This change introduces frontend dependencies only. The current stack already uses React 19 + TypeScript with strict checks, so adding a stable mapping/data-viz baseline should avoid future one-off package decisions.

## Goals / Non-Goals

**Goals:**
- Add a minimal, production-friendly dependency baseline for mapping and data visualization.
- Keep the change scoped to package management and verification.

**Non-Goals:**
- Implementing new UI components, hooks, services, or routes.
- Altering Supabase schema or auth behavior.

## Decisions

1. Add `d3` as the canonical data-visualization toolkit.
   - Rationale: broad ecosystem and composable modules.
   - Alternative considered: adding many separate `d3-*` modules now; rejected to keep setup simple.

2. Add `leaflet` + `react-leaflet` for map rendering in React.
   - Rationale: standard integration path for React + Leaflet.
   - Alternative considered: Leaflet-only integration; rejected because React bindings reduce integration boilerplate.

3. Add `@types/leaflet` for explicit TypeScript support.
   - Rationale: ensures editor/type-check compatibility where bundled types are incomplete.

## Risks / Trade-offs

- [Bundle size growth] -> Mitigation: no runtime imports yet; future components can lazy-load where needed.
- [Leaflet CSS/icon setup may be required later] -> Mitigation: defer to first map component implementation where usage context is known.

## Migration Plan

1. Update dependencies in `package.json`.
2. Install dependencies and refresh lockfile.
3. Run lint and type-check.
4. If issues appear, rollback by removing the newly added dependencies.

## Open Questions

- Should we include optional geospatial helper libraries now (e.g., `topojson-client`) or only when first needed?

