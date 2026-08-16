# Lux's RPG

This is a game where you have to survive as long as you can.
Thanks to Toby Fox (and "The Sounds Resource") for the SFX in my game. I am grateful.

## 4.2.0 Change Log:

**New**
- Start screen on launch: begin a new save, or import a `.urpg` file
- **Difficulty** — Easy, Normal, Hard and Nightmarish, chosen once per save after your class. Sets how fast the world scales as you level. Easy is the original scaling
- **Death screen** — dying now ends the run properly and offers a fresh save or an import, instead of freezing the page
- **Settings** panel in the Extras menu: rebindable bullet-hell controls, save export/import, and a full progress reset
- **Credits** viewer in the Extras menu, shown in-page
- **Refresh Shop** — re-roll the merchant's stock for 2 gems, 3 times per visit
- **Achievements** — 30 of them, in the Extras menu. Locked ones show `???` and a hint; unlocking reveals the name and what you actually did
- Mastery purchases use `1x / 2x / 5x / 10x / Max` buttons instead of a text box
- Admin console has autocomplete for commands, sub-commands and arguments, plus `/achievements <unlock|lock> <name|all>`

**Changed**
- Enemies now actually drop their items — every drop table in the game was inert
- Poison immunity, stun immunity and the elemental matchups (Watermancer's fire bonus, Druid's fire penalty, Shadow's demon penalty) now apply
- Freeze wears off instead of lasting forever
- **Mana matters again.** Regen is now a share of your maximum rather than a multiple of what you're holding, so a full bar takes 20 turns to come back instead of 2
- **Max Mana is worth buying.** Spell costs used to rise in lockstep with your pool, so Eldritch Orbs bought you nothing. Costs now grow far slower than the pool does
- **Every physical attack scales with your level.** Strike was 12 damage at LV 1 and still 12 at LV 100. Level 1 values are unchanged; the tree keeps pace from there
- War Mastery costs 1 more SP for each level you have already bought
- Efficiency Mastery gets more expensive as your Mana Reduction climbs, so maxing it is a long-term goal rather than one book
- Class descriptions in the picker now match what the classes actually do
- Both Snowgrave spells freeze for `level × 6` turns rather than a number derived from their damage
- Extras menu now holds Loot Boxes, Storage, Achievements, Enter Codes, Credits and Settings; save export/import moved into Settings
- **Old saves are upgraded on import** instead of losing anything they predate. Missing fields are filled in from the defaults, wrong types are corrected, and you're told what changed
- Saves are now stamped with the release number (4.2.0) rather than an internal counter

**Fixed**
- Buying an item with a full inventory no longer takes your gold and marks the item sold out
- Health Vial, Mana Well and Clarity Tonic no longer vanish silently when your bag is full
- Martyr's Book is purchasable — it shared an id with Knowledge Scroll and gave SP instead
- Shop prices update if you level up while the shop is open, and you are charged the price shown
- The Frying Pan's attack appears in combat when equipped
- Chara's Knife can be obtained and used
- Buying a Physical or General spell no longer snaps the tree back to your class tab
- `/clearname` and `/clearclass` open their picker, and only ask for the piece you cleared
- Mana Reduction purchases stop at 100% instead of overspending
- The admin autocomplete closes after a command runs
- Importing a save no longer corrupts negative values — a negative Mana or Mana Reduction came back as text and crashed the next spell cast
- A player named entirely in digits (e.g. "42") no longer has their name turned into a number on import
- Shop items that had no description — the Damage Multipliers, backpack slots and Storage Unit — now show one, with their rarity and effect
- Running out of Mana entirely no longer locks you out of casting for the rest of the run
- Meeting Bob now actually counts towards his visit dialogue, and `/bob` sets the counter it was supposed to
- The one-time Pacifist redemption is genuinely one-time; the flag guarding it was never being set
- Lux's dialogue for a high-mercy run can now fire, and no longer says you have spared `undefined` creatures

## 4.1.0 Change Log:
- Credits revamped
- Added gradients to certain rarity colors
- Made item names inherit their rarity color
- Changed trigger for a certain code
- If your current version is higher than the github version, popup will not appear
- Hovering over the 'Buy' button in the shop shows a tooltip with the item and what it does


---

## Getting started

When you open the game you'll be asked to either **start a new save** or **import a `.urpg` file**.
Starting fresh walks you through three choices:

1. **Your name.** Some names are filtered out. Pick another.
2. **Your class.** This decides which spell tree you get, and it is permanent. The picker shows each
   class's strength and weakness before you commit.
3. **Your difficulty.** Also permanent for that save. See below.

Your name, class and difficulty are remembered by your browser, so a refresh drops you straight back
in. Everything else — your level, gold, items and progress — lives only in memory, so **export a save
if you want to keep it.**

## Difficulty

Difficulty controls how fast the **world** grows as you level. Your own stats compound as you level
up; difficulty decides whether the world keeps pace.

| | What it does |
|---|---|
| **Easy** | The world stays where it is. You will out-scale it and become very hard to kill. |
| **Normal** | The world grows with you. A fight at LV 50 feels much like a fight at LV 5. |
| **Hard** | The world grows faster than you do. Levelling alone won't save you. |
| **Nightmarish** | The world laps you. Every level you gain, it gains more. |

It applies to enemy health, damage, drains **and** their rewards, so the harder tiers pay better.
Your current difficulty is shown in the stats sidebar.

## The loop

Press **Explore Onward** to advance a day. Each day rolls an event — a fight, a merchant, a quiet
bit of good fortune, or something worse. Survive as many days as you can.

Between days you'll rest, which restores some mana. If your Sanity has bottomed out, that rest goes
badly instead.

## Combat

Combat is turn-based. You pick an action, then the enemy takes its turn.

- **Spells and attacks** are listed by category — your class tree, general spells, physical attacks,
  and any actions granted by an equipped weapon. There's a search box if the list gets long.
- **Spare** lets you end a fight without killing, but only once the enemy is below half health.
  Sparing pays differently to killing.
- **Status effects** — burn, freeze, poison, stun and a few others — show as icons above the enemy's
  health bar. Hover one to see what it does and how long it lasts. Some enemies are immune to some
  of them, so check the traits line under their health bar.
- **Bullet hell.** Most enemies attack with a dodging sequence rather than a single hit. Move with
  **WASD** or the **arrow keys**, and hold **Shift** to move slowly for tight gaps. Every bullet you
  take costs you health, so a clean dodge is a free turn. All of these keys are rebindable in
  Settings.

## Classes

You pick one at the start and keep it. Each has its own spell tree.

| Class | In short |
|---|---|
| Astral Mage | Raw power, at a steep skill-point price |
| Stormmancer | Stuns enemies, but the magic can turn on you |
| Druid | One of the few classes with real healing |
| Flamemancer | Sets things on fire and lets the burn do the work |
| Cryomancer | Freezes enemies, and frozen things take more damage |
| Watermancer | Strong against anything made of fire |
| Shadow | Strikes from the dark. Effective against some things, useless against others |
| Neutral | Every spell is a gamble. Sometimes that pays off enormously |

## Levelling and skill points

- **EXP** comes from winning fights. Enough of it levels you up.
- Each **level** raises your maximum Life, Mana and Sanity, restores them all, and grants a **skill point (SP)**.
- Spend SP in **Study Spells** to unlock new spells along your tree. Deeper spells cost more.
- Once you've unlocked everything in your tree, the same screen turns into **masteries** — permanent
  percentage increases to Max Life, Max Mana, Max Sanity, damage or mana efficiency. Buy them with
  the `1x / 2x / 5x / 10x / Max` buttons; each spends that much SP.
  - **War Mastery** (damage) gets one SP more expensive with every level you buy.
  - **Efficiency Mastery** (Mana Reduction) gets more expensive as it climbs, so the last points
    cost ten times the first. The other three stay flat at 1 SP.

Basic information:

- Life
  - Importance: Your health pool. If it reaches 0, you die (simple)
    - How to upgrade it:
        - Use the "Dragon Heart" item from the shop
        - Level up
- Mana
    - Importance
        - Use it for spells. A little regenerates every turn, and resting between days restores more. Raising your Max Mana raises spell costs too, but far more slowly than it raises the pool — so a bigger pool means more casts.
    - How to upgrade it:
        - Use the "Eldritch Orb" item from the shop
        - Level up
- Sanity
    - Importance: If it reaches 0, you lose mana at the start of each day (Mana Lost scales with the number of days survived)
    - How to upgrade it:
        - Use the "Pure Insight" item from the shop
        - Level up
- Mana Reduction
    - Importance:
        - Cuts the mana cost of every spell by that percentage. Spell costs grow as your Max Mana grows (slower than the pool itself, so a bigger pool is still a net gain) — Mana Reduction is what pulls them back down. At 100% every spell costs its base price and nothing more.
    - How to upgrade it:
        - Purchase the "Mana Stabilizer" from the shop
        - Buy Efficiency Mastery with skill points, once your spell tree is complete
- Gold: Are we rich or are we not?
- EXP: Required to level up.
- LV: Gain a skill point when you level up
- SP: Skill points
- Spells: Deal damage, heal, or increase your sanity. Better spells require more skill points.

Shop Information:

- Shop prices scale with player LV
- Shop item's potency *also* scales with player LV
- Items:
    - Health Vial
        - Fills your HP back to max
    - Mana Well
        - Fills your Mana back to max
    - Clarity Tonic
        - Fills your Sanity back to max
    - Dragon Heart
        - Increases your max health (scales with player LV)
    - Eldritch orb
        - Increases your max mana (scales with player LV)
    - Pure Insight
        - Increases your max sanity (scales with player LV)
    - Holy Grail
        - Fills your HP, Mana, and Sanity back to max
    - Treasure Map
        - Gives you gold (scales with player LV)
    - Knowledge Scroll
        - Gives you EXP (scales with player LV)
    - Mana Stabilizer
        - Decreases the mana multiplier by a precentage value
    - Damage Multiplier
        - Increases total dmg output by a precentage value

The merchant only lays out part of their stock each visit. **Refresh Shop** re-rolls what's on the
shelf for **2 gems**, up to **3 times per visit**.

The shop also sells backpack slots and a storage unit — worth buying early, since your bag fills up
fast and a full bag means you can't pick anything up.

## Gems and loot boxes

**Gems** are a separate currency to gold. You'll find them on enemies you defeat, and you're more
likely to be given one by an enemy you spare — tougher enemies are worth more. Spend them on
**Loot Boxes** in the Extras menu, or on shop refreshes.

Loot boxes come in escalating tiers. Higher tiers cost more gems, roll fewer times, and pull from a
better pool. There are also boxes that only appear at certain times of year.

## Inventory

- You start with five slots and can buy up to twenty.
- A **storage unit** from the shop holds a few hundred more items, and can be upgraded. Storage is
  in the Extras menu, and can't be opened mid-fight.
- Click an item to use it. Weapons are equipped the same way, and some grant extra combat actions.
- Items are colour-coded by rarity. Hover for what they do.

## Extras menu

Bottom-right corner. Holds **Loot Boxes**, **Storage**, **Enter Codes**, **Credits** and **Settings**.

## Settings

- **Bullet Hell Controls** — rebind movement and the slow-down key. Two keys per action, so you can
  keep the arrow keys *and* WASD. Bindings are saved to your browser and survive a progress reset.
- **Save Data** — export and import (see below).
- **Reset Progress** — wipes your character and returns you to the start screen. Two-step, and you
  have to type `RESET` to confirm. It does **not** clear your control bindings.

## Dying

If your Life hits 0, the run is over. You'll get a summary of how far you got and a choice: start a
fresh save, or import a `.urpg` and carry on from that instead. There is no autosave, so an export
is the only way back to where you were.

## A note on how you play

The game keeps count of what you kill and what you spare. It's paying attention.

Detailed information:

- Save Exporting/Importing

    - You can export your current save as a **.urpg** file. It's in the **Settings** panel, under the Extras menu.
    - You can import your **.urpg** save file on a different computer.
    - Importing replaces what's stored in your browser with what's in the save file.
        - **Word of warning: Some legacy save files will break with newer versions (and also when I change the logic for the save export/import code). I am not held responsible for any lost progress.**