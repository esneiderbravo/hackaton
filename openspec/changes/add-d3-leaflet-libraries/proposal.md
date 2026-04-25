## Why

### Problem
The project currently lacks geospatial visualization dependencies, so implementing map-based and data-visualization features requires ad-hoc package selection and repeated setup work.

### Solution
Add a standardized visualization dependency set centered on D3 and Leaflet with React bindings and TypeScript support, aligned with existing Next.js/TypeScript patterns.

### Non-goals
- Building map pages or D3 visualizations in this change.
- Adding new backend APIs or database schema updates.

### Success criteria
- `package.json` includes `d3`, `leaflet`, and supporting libraries required for React + TypeScript usage.
- The dependency set installs and project checks continue to pass.

## What Changes

- Add core visualization dependencies: `d3` and `leaflet`.
- Add React integration and TypeScript support dependencies: `react-leaflet` and `@types/leaflet`.
- Validate dependency integration via existing repository checks.

## Capabilities

### New Capabilities
- `visualization-dependencies`: Establishes a baseline dependency stack for D3-based data visualization and Leaflet-based mapping in React components.

### Modified Capabilities
- None.

## Impact

- Affected code: `package.json` dependency list.
- Tooling impact: install/update lockfile entries and run existing lint/type checks.
- Pattern alignment: follows existing TypeScript + React + Next.js conventions without architecture changes.

