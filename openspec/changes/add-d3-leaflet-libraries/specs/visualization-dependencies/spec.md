## ADDED Requirements

### Requirement: Visualization dependency baseline
The project SHALL include dependencies that enable both data visualization and interactive maps in React + TypeScript features.

#### Scenario: Core packages are declared
- **WHEN** developers inspect `package.json`
- **THEN** `d3` and `leaflet` are present under `dependencies`

#### Scenario: React mapping support is declared
- **WHEN** developers inspect `package.json`
- **THEN** `react-leaflet` is present under `dependencies`

#### Scenario: Leaflet TypeScript support is declared
- **WHEN** developers inspect `package.json`
- **THEN** `@types/leaflet` is present in dependencies compatible with TypeScript tooling

