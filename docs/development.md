# Tjikko development

How work gets done in this repo. Build and test commands live in `AGENTS.md`; how the system works lives in `docs/design.md`.

## Rules
- Agents push as a separate GitHub machine account, so branch protection binds them.
- Commits: Conventional Commits, one lowercase line.
- The backlog and cross-tool context live in [Pando](https://github.com/MattSarno/pando), Matt's MCP memory server, not GitHub issues. PRs name the work, not a task id.

## Testing

- **Effort follows risk.** The scheduler gets the most, because a wrong date fails silently.
- **Scheduler**: unit tests for the spec's examples, plus property tests for its invariants. Today is always passed in; `clippy.toml` bans clock calls.
- **Server**: integration tests against a real Postgres, never mocks or a Neon branch. Auth is faked by injecting a verified id. **Every endpoint gets a tenant-isolation test.**
- **Frontend**: thin. Logic is tested, markup isn't. Plain-date logic runs under time zones on both sides of UTC (e.g. Denver and Kiritimati, UTC+14), because CI's UTC hides both common bugs.
- **Rules**: CI runs fmt, clippy and tests for Rust, and type check, tests and build for the SPA. Changing an approved expected result needs Matt's OK. Test data uses invented gardens.
