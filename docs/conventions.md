# Tjikko conventions

How code is written here: naming, idioms, and where things go. Anything a tool can enforce lives in lint config instead (`scheduler/clippy.toml`, `web/oxlint.config.ts`).

## Where things go
- **Tests** live in each project's `tests/` folder, never inside the source file.
- **Server features** are vertical slices: one module in `server/src/features/<name>.rs`, declared in `features/mod.rs`.
- **Web:** `src/app/` for app-level code, `src/features/` for one folder per feature, `src/lib/` and `src/components/` for what features share.

## Dependencies
- **Pinned to exact versions** in Cargo (`=x.y.z`) and npm (no `^` or `~`).
