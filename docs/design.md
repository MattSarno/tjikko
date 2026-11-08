# Tjikko design

How the system works now. This doc is living: it's edited in place as things change. Reasons stay to one line; bigger decisions from here on get an ADR in `docs/adr/`.

## Scope

Tjikko is a gardening companion. Its first job is scheduling: given a garden's frost dates and the timing from each variety's seed packet, it derives dated tasks for every planting: start, transplant, harvest.

- **Multi-user from day one**, even while there's one real user, so nothing is hardcoded to one garden or person.
- **Web app first**, usable from a phone browser. No native app.

### First slice
- Gardens with editable frost dates.
- A per-user variety catalog with timing rules, entered by hand.
- Plantings: a variety in a garden this season, with an optional free-text location.
- Derived tasks, re-anchored when real events are logged.
- An in-app "this week" view.

### Deliberately simple
- **Conditions are notes, not an engine.** "Plant out when soil is 60°F" becomes a dated task with a check note.
- **Succession is just several plantings** of one variety with staggered dates.

### Out of scope for now
Container records linked to plantings, per-planting notes such as fertilizer experiments, a season journal, zone- or location-based frost defaults, a calendar feed and then push notifications, offline use, and importing from plant databases.

## Tenancy and entities

Every record belongs to either a user or a garden. Membership is the tenant boundary.

- **User**: known to the server only as a verified id. One login check reads the auth provider's token and passes on just the id, so swapping providers means rewriting that check and nothing else.
- **Garden**: for now, a name and two frost dates (last spring, first fall), each a month and day reused every season. A user can have many gardens; people move.
- **Membership**: links a user to a garden with a role. Only `owner` exists for now, but it's there from day one so shared gardens don't need a permissions rewrite. **Every read and write of garden data goes through membership.**
- **Cultivar** (user-owned): a plant the user grows, with timing rules from its seed packet or nursery tag. Each rule has a step, an anchor and an offset. It moves with the user. The UI may call it something friendlier.
- **Planting** (garden-owned): a cultivar in a garden, **tagged with its season year** (see Timing), with an optional free-text location. It **copies the cultivar's timing rules when created** and keeps a nullable link back, so editing or deleting the cultivar never rewrites a plan or its history.
- **Event** (garden-owned): an append-only entry on a planting recording what actually happened and when.
- IDs are client-generated UUIDs, so offline sync stays possible later.

## Timing, anchors, re-derivation and dates

- **Timing rule**: a step (start indoors, transplant, harvest…), an **anchor** (last spring frost, first fall frost, sowing or transplant) and an **offset range** in days. The anchor matters: packet "days to maturity" usually counts from transplant, not sowing. A packet's single number is a range whose ends are equal.
- **Season**: the year a planting's frost anchors resolve in. Garlic sown before the fall frost belongs to that fall's year; a December onion start belongs to the next spring's. A "next spring frost" anchor is deferred until a real crop needs it.
- **Windows**: rules carry an offset range, so steps are windows. A dependent window runs from the earliest anchor date plus the shortest offset to the latest anchor date plus the longest. Logging the anchor narrows everything after it.
- **Events**: one append-only log of "step X happened on date D" (`done`) or "it didn't" (`undone`). For each step, the latest event wins. A `done` on an anchor step (sowing, transplant) re-anchors every later step; on any other step it just marks it complete. Corrections are new events, never edits.
- **The plan is a pure function** of the frost dates, season, the planting's rules, its events and *today*. Today is passed in; the scheduler crate bans clock calls.
- **The UI reads the derived plan**, never the log: each step comes back as planned (window) or done (date).
- **Dates**: calendar dates are plain dates end to end, with no time or zone: Postgres `date`, Rust `time::Date`, `"YYYY-MM-DD"` in JSON. An event stores the plain date it happened (backdating allowed) plus a UTC logged-at time, shown in browser time.
- **Feb 29 is rejected as a frost date**, so a non-leap season never shifts a date silently.
