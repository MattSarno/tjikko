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
