# Tjikko 🌲

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](LICENSE)

A gardening companion that remembers what to do and when, so you don't have to.

> Old Tjikko is a Norway spruce on a Swedish mountain. The tree you can see is
> young, but its root system is about 9,550 years old: when a trunk dies, the
> roots send up a new one. A garden works the same way. Every season starts
> over, on top of everything the last one taught you.

## Why

Seed packets are full of timing: start six to eight weeks before the last
frost, transplant after it, harvest sixty days later. Grow a dozen varieties,
stagger a few sowings, and that's a spreadsheet nobody keeps up with. Tjikko
keeps it for you.

## How it works

- **Set your frost dates** once. As cautious or as bold as you like.
- **Add what you grow**, with the timing straight off the packet or nursery tag.
- **Plant something**, and Tjikko works out every step: start, transplant, harvest.
- **Log what really happened.** Sowed a week late? Every date after it moves to match.
- **Check "this week"** to see what the garden needs from you right now.

## Under the hood

- **The scheduler is a pure function.** Frost dates, timing rules and what
  you've logged go in; dates come out. No database, no clock, so it's easy to test.
- **Calendar dates have no time zone.** A sowing date is a day, not an instant,
  so your calendar never slips a day when you travel.
- **History is append-only.** Fixing a mistake adds an entry instead of
  rewriting one, so the season's record stays honest.

## Stack

Rust · Axum · Svelte · Postgres (Neon) · Fly.io

## Quickstart

You will need Rust (stable) and Node at the version in `web/.node-version`.

```sh
cargo run -p server                # the API, on localhost:8080
cd web && npm ci && npm run dev    # the app, on localhost:5173
```

Open http://localhost:5173. If the homepage shows a version number, the two are talking. The full set of checks lives in [AGENTS.md](AGENTS.md).

## More

- [docs/design.md](docs/design.md): how the system works
- [docs/development.md](docs/development.md): how it gets built
- License: [AGPL-3.0-or-later](LICENSE)
