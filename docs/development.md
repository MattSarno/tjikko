# Tjikko development

How work gets done in this repo. Build and test commands live in `AGENTS.md`; how the system works lives in `docs/design.md`.

## How work flows

One flow with skippable steps: one session, one branch, one PR. Matt owns intent and shape; agents own the build.

**Full flow**, for anything that adds a rule or changes what users see:
1. **Spec** in `docs/features/<name>.md`: rules plus concrete examples (the examples are the test cases), and UX for user-facing work. Matt approves → commit.
2. **Scaffold** by Matt: names, signatures, comments, optional test names → commit. This is the reset point if a build is scrapped.
3. **Plan**: the builder challenges the scaffold, flags missing cases and proposes a plan. Matt approves.
4. **Tests**: a fresh-context test agent writes failing tests from the spec and scaffold, never seeing the build → commit.
5. **Build** until the tests pass. Changing a test needs Matt's OK.
6. **Review**: Matt checks shape and intent first (keep, comment or scrap), then a fresh-context agent checks correctness.
7. **PR**, squash-merged by Matt.

**Light flow**, for fixes, refactors, dependency bumps and docs: no spec, UX or scaffold. A bug starts with a failing test that reproduces it. The agent proposes the flow and Matt confirms. If a rule or user-facing change turns up, switch to the full flow; when unsure, use the full flow.

**Rules**
- Only with Matt's OK: merging, CI changes, new dependencies.
- Agents push as a separate GitHub machine account, so branch protection binds them.
- No comments in merged code except public-API doc comments. `// REVIEW:` markers come out before merge.
- Commits: Conventional Commits, one lowercase line.
- The backlog and cross-tool context live in [Pando](https://github.com/MattSarno/pando), Matt's MCP memory server, not GitHub issues. PRs name the work, not a task id.

## Testing

- **Test cases come only from an approved spec and Matt's scaffold.** This doc defines none.
- **Effort follows risk.** The scheduler gets the most, because a wrong date fails silently.
- **Scheduler**: unit tests for the spec's examples, plus property tests for its invariants. Today is always passed in; `clippy.toml` bans clock calls.
- **Server**: integration tests against a real Postgres, never mocks or a Neon branch. Auth is faked by injecting a verified id. **Every endpoint gets a tenant-isolation test.**
- **Frontend**: thin. Logic is tested, markup isn't. Plain-date logic runs under time zones on both sides of UTC (e.g. Denver and Kiritimati, UTC+14), because CI's UTC hides both common bugs.
- **Rules**: CI runs fmt, clippy and tests for Rust, and type check, tests and build for the SPA. Changing an approved expected result needs Matt's OK. Test data uses invented gardens.
