# Balancing Changes

What has actually changed about how the game plays. For the reasoning behind each one — the
formulas, the numbers, and the findings still outstanding — see [BALANCE_ISSUES.md](BALANCE_ISSUES.md).

> **Shipping in 4.2.0.** Reviewed and changed against `main` @ `eb68084` (v4.1.0).

---

## Difficulty

New saves now pick a difficulty after choosing a class. It sets how fast the **world** scales as
you level, and cannot be changed for that save.

| | World growth per level | Enemy stats at LV 50 | Danger vs LV 1 |
|---|---|---|---|
| **Easy** | none | ×1 | 152× safer |
| **Normal** | +11% | ×166 | about the same |
| **Hard** | +16% | ×1,440 | 9× deadlier |
| **Nightmarish** | +22% | ×17,046 | 112× deadlier |

The factor multiplies enemy HP, attack, sanity/mana drain, lifesteal, **and** EXP/gold — rewards
scale with threat so progression doesn't stall on the harder tiers.

- **Easy is the original scaling, byte for byte.** The factor short-circuits to 1 and every stat
  passes through untouched.
- **Normal** is tuned so a fight at LV 50 feels like a fight at LV 5. Player max HP compounds at
  ×1.2 per level while enemies are linear in level, and +11% closes that gap almost exactly
  through the mid-to-late game.
- Any save without a difficulty (i.e. every save made before this) reads as **Easy** and is never
  prompted to choose.

---

## Combat mechanics that were silently disabled

These were all written but never executing. Turning them on is a real difficulty increase.

| Change | Effect on play |
|---|---|
| **Enemy item drops now happen** | Every `drop:` entry across all twelve enemy files was dead — the 10% drop roll always returned early. Black Shard, Armored Carapace, Elf Ear, The Devil (15) and both Spectral Cards are now obtainable in combat, not just from loot boxes. |
| **Poison and stun immunity now apply** | Bosses declared immune actually are. Previously status effects were *best* against the bosses built to resist them. |
| **Elemental matchups now resolve** | Watermancer's 2× fire bonus — its entire class identity, advertised on all nine spells — has never once applied. Druid's fire penalty and Shadow's demon penalty likewise. |
| **Freeze expires** | It was never decremented, so one 15 MP Chill was a permanent +50% damage buff for the rest of the fight. Freeze turn counts now mean something. |

---

## Spells

- **Snowgrave / Snowgrave (Shadow)** — the `freeze` getter was a copy of the damage expression,
  freezing enemies for millions of turns. Both now grant `level × 6` turns, one step above Frost
  Prison and Iceshock at `× 5`. The Shadow variant also applied its freeze twice; that's fixed.
- **Frying Pan** — the Mythic weapon's attack never appeared in combat because the equipped-weapon
  string and the skill's requirement didn't match. It works now. The ×1000 damage multiplier is
  **intentionally untouched** — it's a joke weapon and the absurd damage is the point.
- **Chara's Knife** — loot boxes granted a name no item had, so the roll produced an unusable
  inventory entry. Standardised on `Chara's Knife`; the whole path now works.

---

## Skill points

- **War Mastery now escalates.** Level *N* costs *N* SP, so reaching *N* levels costs roughly
  N²/2 SP instead of N. Every other mastery stays flat at 1 SP.
  - This *slows* the compounding damage exploit rather than closing it — gains are still 1% of
    the current value per level, so damage remains exponential in levels while cost is only
    quadratic. Vitality Mastery still compounds max HP for free.
- **Mana Reduction purchases stop at 100%.** `Max` previously charged for levels past the cap and
  discarded them.
- **Mastery buttons replaced the SP text box.** Each card has `1x / 2x / 5x / 10x / Max`, and each
  is an SP *budget* — with War Mastery escalating, `10x` buys 4 levels. Unaffordable options grey
  out and each has a tooltip showing the real trade.

---

## Economy

- **Buying with a full inventory no longer takes your gold.** It used to charge you, mark the item
  "Sold Out", and then tell you the purchase failed. The purchase is now attempted before you're
  charged, so a full bag cancels cleanly and the item stays on the shelf.
- **Health Vial, Mana Well and Clarity Tonic** used a code path that failed *silently* on a full
  inventory — charged, no item, no message. Same fix.
- **Martyr's Book is buyable.** It shared a shop id with Knowledge Scroll, so buying it charged the
  Scroll's price and gave SP instead of the book.
- **Shop prices no longer go stale.** Using an EXP item mid-shop could level you up and change every
  price behind the numbers on screen. Prices now re-read live and flash when they move.
- **You pay the price you clicked.** Costs are snapshotted before the purchase resolves, so items
  that grant EXP or gold can't shift their own price mid-transaction.
- **Refresh Shop** — a new option to re-roll the shelf for **2 gems**, up to **3 times per visit**.
  Gives gems a use outside loot boxes and takes some of the randomness out of a bad stock roll.

---

## Death

Dying used to freeze the page: input was disabled and nothing ever restored it, so a fatal fight
was indistinguishable from a crash. Death now ends the run properly with a screen showing your
final day, level, kills, spares and difficulty, and two ways forward — start a fresh save, or
import a `.urpg` and continue from that.

A million-kill run still gets its send-off as the screen's title, but the page is no longer wiped,
so you can still act on it.

---

## Mana is a resource again

Three separate problems made spell costs meaningless. All three are fixed.

**Passive regen was proportional to your current mana, not your maximum.** `5n * p.mp` multiplied
the bar by six every turn, so cost stopped mattering after turn one — and it regenerated nothing
at all from exactly 0, meaning a mana-drain enemy could lock you out of casting for the rest of the
run. Now `p.mmp / 20n` (5% of maximum, minimum 1): a full bar takes 20 turns instead of 2, and 0 MP
recovers.

**Max mana bought nothing.** Cost was `base × floor(mmp / 200)`, linear in the pool, so casts per
full bar was a flat `200/base` no matter how many Eldritch Orbs you bought. It now scales with the
square root of the pool, so a bigger reservoir is a real but diminishing upgrade:

| Max mana | Casts of a base-20 spell (was 10 at every size) |
|---|---|
| 200 | 10 |
| 800 | 20 |
| 3,200 | 40 |
| 20,000 | 100 |

Spells still cost their base under 200 max mana, and 100% Mana Reduction still floors at base
rather than making casting free.

**Efficiency Mastery cost a flat 1 SP a level**, so the whole 100-point track was 100 SP — a single
Martyr's Book — and buying it out switched the mana system off permanently. The cost now steps up
every 10 points (1 SP through 9%, 10 SP at 90%+), making the full track **550 SP**. 100 SP now buys
40 points. No new saved field was needed: Mana Reduction is capped at 100 and moves 1 per level, so
its value already is the level count.

---

## The Physical tree scales

All eighteen physical attacks were flat constants — Strike dealt 12 damage at LV 1 and at LV 100 —
so the whole tree was dead weight after the first few levels, and it is the only path available
before you buy your class's first spell.

Damage is now `base × level`. **LV 1 values are unchanged**, so the early game plays exactly as it
did, and the tree keeps pace afterwards. Relative ordering within the tree is untouched.

| | LV 1 | LV 50 | LV 100 |
|---|---|---|---|
| Strike (free) | 12 | 600 | 1,200 |
| Clobber (7 SP) | 100 | 5,000 | 10,000 |

That deliberately lands below every class capstone — 5,000 against Druid's 7,140 and Astral Mage's
153,000 — because physical attacks cost 0 MP and are open to every class. With a Diamond Sword
(`+100 × lv`) Clobber reaches 10,000 at LV 50, which makes a weapon build viable without letting it
compete with a dedicated tree.

---

## Class descriptions now match the classes

The pros and cons on the class picker had drifted from what the trees actually do. Measured at LV 50:

- **Cryomancer** claimed to be *"second strongest, second only to Astral Spells"*. It is fourth, tied
  with Stormmancer at 19,380 against Astral's 153,000. Its listed con, *"High MP Cost"*, was also
  wrong — its average cast is 78 MP, among the cheapest in the game. Only Snowgrave is expensive.
- **Druid** was sold purely as the healing class. It has the **lowest direct damage of all eight**,
  its real payload is Poison Spray, and its healing shrinks as your kill count rises and stops
  working entirely past a threshold — a significant drawback that was listed nowhere.
- **Watermancer** is the **cheapest tree in the game** to finish (34 SP against Astral's 114), which
  was never mentioned.
- **Flamemancer** is the cheapest class to cast and the second cheapest to finish. Also unmentioned.
- **Neutral** was eight copies of the literal string `"Random effect."`.

Every class now has three or four pros and three or four cons drawn from the measured numbers, and
each con names something that genuinely costs the player.

---

## Property-name typos

A sweep for type errors turned up five places writing to fields that don't exist. Reads returned
`undefined`; writes created dead properties.

| Where | Effect |
|---|---|
| `combat.js` — `p.flags.bobvisits += 1n` | `undefined + 1n` threw a `TypeError`, swallowed by the `setTimeout` it sat in. **Encountering Bob never incremented his counter**, so his 38 tiers of dialogue were driven only by eating Bob's Bread. |
| `debugging.js` — `p.bobvisits = bVal` | `/bob`, whose entire job is setting that counter, set a top-level field nothing reads. |
| `killandsparelogs.js` — `p.flags.hasUsedRedemption` | Guarded by `hasUsedPacifistRedemption`, which was never set — **the "One-time only!" pacifist redemption was infinitely repeatable.** |
| `killandsparelogs.js` — `p.flags.genocideRoutetimescompleted` | The Genocide flag was never recorded on the save itself. |
| `lux_and_co.js` — `p.sparedenemies` (×2) | Lux's pacifist intro branch could never fire, and the default line printed `undefined creatures spared`. |

Nothing else turned up: no BigInt/Number mixing, no `Math.*` applied to a BigInt, no strict
comparison that is always false.

---

## Achievements

Thirty achievements, shown in an **Achievements** tab in the Extras menu. Locked entries display
`???` with a hint; unlocking reveals the name, swaps the hint for the description, and outlines the
cell in the achievement's rarity colour.

Nothing previously read or wrote `p.achievements`, so this also added the tracking: state-based
achievements are polled from `updateUI()`, and the ones polling can't see — using a specific item,
dying, opening a loot box, refreshing the shop, connecting with the Frying Pan — fire from their own
code paths. Admins get `/achievements <unlock|lock> <name|all>`.

Not a balance change so much as a progression layer: it gives long runs and unusual playstyles
(never killing anything, surviving on Nightmarish) something to aim at that the level curve doesn't.

---

## Shop tooltips

Eleven shop entries existed only in `shop.js` with no `items.js` counterpart — the five Damage
Multipliers, both backpack unlockers, and the Storage Unit and its three upgrades. Hovering them
showed **NO RARITY** and a literal `undefined` where the description belonged.

All eleven now carry a rarity, colour, description and a live stat line (`+25 % Damage Multiplier`,
`+200 Storage Slots`). Rarities follow the existing price tiers. This is an information fix rather
than a numbers change, but it directly affects whether a player can evaluate a purchase — which
matters most for the damage multipliers, whose cost curve is one of the open findings below.

---

## Legacy saves

Importing an old save used to drop anything the save predated and mis-type what it did keep. Two of
those were outright crashes:

- **Negative BigInts came back as strings.** The importer matched `/^\d+$/`, so `-100` stayed text.
  The game produces negatives (`p.mp = -100n * p.lv * p.kills`, `p.manaReduction = -100n`), and the
  next arithmetic on one threw `Cannot mix BigInt and other types`.
- **Any all-digit string became a BigInt**, so a player named `"42"` came back as `42n`.

Imports now reconcile the save against a pristine snapshot of the defaults: missing fields are
filled in, every value is coerced to the type its default declares, upgraded storage keeps its
length, and unrecognised fields are carried through. Achievements saved in the old bare-boolean
shape keep their earned state. The player is told what happened — *"Upgraded save version 7 to
version 4.2.0 — 71 new fields filled in."*

Save version is now the release string (`"4.2.0"`) rather than an incrementing integer;
`compareSaveVersions()` understands both so older saves still order correctly.

**Balance relevance:** none directly, but it's the difference between a long run surviving a version
bump and quietly losing its gems, difficulty and achievements — or crashing outright.

---

## Still open

**15 findings remain**, re-verified against the working tree. The largest is untouched and needs a
design decision rather than a fix: **player stats compound while the world is linear.** Difficulty
gives you a lever on it per-save, but on Easy the original curve is intact by design. The other
significant outstanding items:

- Poison Spray deals `200 × level³` on its first tick — 25 million at LV 50, roughly 3,500× its own
  tree's damage capstone. Now that poison immunity works, it is the strongest thing in the game.
- Eldritch Blast, Thunderbolt and Iceshock are each weaker than the node below them, and now that
  mana genuinely costs something they are worse on damage *per MP* too — so the trade they were
  built around doesn't hold up either way.
- Greed's attack is half your lifetime gold; Envy's scales with how many skills you own.
- Healing item tiers don't separate — the Legendary Blood Stone heals 1.3% of a LV 50 health bar.
- Enemy attack values mean two different things depending on whether the enemy has a bullet pattern.
- The Treasure Map's payout outruns its own price by a compounding factor, but it's load-bearing:
  remove it and the exponentially-priced shop becomes unbuyable.

See [BALANCE_ISSUES.md](BALANCE_ISSUES.md) for the full list with formulas and file references.

---

## How this was verified

No browser testing — everything below is static analysis plus logic tests against stubbed DOM and
localStorage. **The UI itself has never been clicked**: the start screen, difficulty cards, death
screen, Settings panel, Credits window and mastery buttons are reviewed but unexercised.

- All 49 JS files pass `node --check`.
- **Enemy cloning** — all 54 templates run through the edited `startCombat`: none throw, every stat
  still resolves to a BigInt, `hp === mhp` holds, and all 54 now carry a callable `drop()`.
- **Difficulty** (19 assertions) — Easy untouched at four levels; legacy and invalid values both
  read as Easy; danger increases monotonically across the tiers; negative rewards keep their sign;
  the growth factor is capped; the cache invalidates on change.
- **Mastery costs** (19) — 3 SP buys exactly 2 War Mastery levels; cost escalates by exactly 1;
  8,000 budget/counter combinations never overspend and never leave an affordable level unbought;
  `Max` over 10³⁰ SP resolves in under a millisecond.
- **Shop purchases** (9) — all 43 slot-requiring entries with a full inventory (zero gold charged,
  all explain why) and with a free slot (all charge and deliver).
- **Shop price refresh** (4) — a simulated LV 5→8 mid-shop updates every price to match its live
  getter; stable LV leaves the DOM alone; a closed shop is a no-op.
- **Shop refresh button** (17) — 3 uses per visit, exactly 2 gems each, refuses and charges nothing
  when out of either, allowance resets per visit.
- **Save import** (17) — a real export→import round trip; the class-match guard rejects an identity
  change without the flag and accepts it with; localStorage ends up matching the save.
- **Death** (13) — fires once across both combat paths, restores input before the screen appears,
  shows the run summary, "Start a Fresh Save" calls `resetAllProgress()`, and a million-kill run
  keeps its send-off without the page being wiped.
- **Boot and reset** (65 across three suites) — keybind persistence and fallbacks, the reset key
  list, post-reset landing on the start screen, `/clearname` and `/clearclass` asking only for what
  they cleared, and the admin autocomplete.
- **Mana** (19) — regen no longer refilling instantly and no longer stuck at 0; casts-per-bar rising
  with max mana at a square-root rate; Efficiency Mastery's stepped cost, including a fuzz over 700
  SP budgets confirming it never overspends and never leaves an affordable point unbought.
- **Achievements** (65 across two suites) — every achievement reachable, each threshold firing at the
  right moment, backfill preserving earned state, and the `/achievements` command in both directions.
- **Legacy saves** (49) — a v9 save missing everything 4.2.0 added, the negative-BigInt crash, the
  numeric-name corruption, three envelope shapes, corrupt values of every type, upgraded storage
  surviving, a future save round-tripping, and tamper detection still catching a real mismatch.

343 assertions across 17 suites, all passing.

### Type-error sweep

Four detectors run over the whole codebase, not just the changed files:

- Every `p.*` path checked against the real shape of the player object — this is what found the five
  property-name typos above. Now reports zero.
- Static scans for BigInt/Number mixing, plain `Math.*` applied to a BigInt, `BigMath` calls that
  would inject a Number into a BigInt chain, and strict comparisons that are always false. All zero.
- A runtime harness executing **37,280 probes** — every spell getter, enemy stat getter, shop entry,
  item, day event and loot box roll, at nine player states including zeros, negatives and 10²⁴
  values, plus full combat against all 54 enemies with all 112 spells and every admin command, with
  `setTimeout` callbacks running so deferred code is covered too. Zero runtime type errors.

The harness is self-tested two ways: an assertion that it catches `1n + 1`, and re-injecting the
fixed typos in memory, where it flags them 14 times while reporting zero on the real repository.
