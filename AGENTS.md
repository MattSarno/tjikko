# AGENTS.md

## Context
- Project context, decisions and the backlog live in Pando (MCP server `pando`). Read `preference/pando-protocol` first, then the `tjikko` subject's entries.
- How the system works: `docs/design.md`. How work gets done: `docs/development.md`.

## Layout
- `crates/scheduler`: pure scheduling logic. No database, HTTP or clock crates.
- `crates/server`: axum; serves the API and the built SPA.
- `web/`: static Svelte SPA.

## Build and test
    cargo fmt --all --check
    cargo clippy --workspace --all-targets -- -D warnings
    cargo test --workspace
    cd web && npm ci && npm run check && npm test && npm run build
