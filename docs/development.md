# Tjikko development

## Commits and PRs
- Conventional Commits, one lowercase line.
- The backlog lives in [Pando](https://github.com/MattSarno/pando), Matt's MCP memory server, not GitHub issues. PRs name the work, not a task id.

## Testing
- **Scheduler**: tested hardest, because a wrong date fails silently. Unit tests for the spec's examples, plus property tests for its invariants. Today is always passed in; `clippy.toml` bans clock calls.
- **Server**: integration tests against a local Postgres, never a Neon branch. **Every endpoint gets a tenant-isolation test.**
- **Frontend**: plain-date logic runs under time zones on both sides of UTC (e.g. Denver and Kiritimati, UTC+14), because a UTC machine hides both common bugs.
- Test data uses invented gardens.
