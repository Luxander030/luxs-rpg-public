# Lux's RPG

This is a game where you have to survive as long as you can.
Thanks to Toby Fox (and "The Sounds Resource") for the SFX in my game. I am grateful.

## 4.1.0 Change Log:
- Credits revamped
- Added gradients to certain rarity colors
- Made item names inherit their rarity color
- Changed trigger for a certain code
- If your current version is higher than the github version, popup will not appear
- Hovering over the 'Buy' button in the shop shows a tooltip with the item and what it does


Basic information:

- Life
  - Importance: Your health pool. If it reaches 0, you die (simple)
    - How to upgrade it:
        - Use the "Dragon Heart" item from the shop
        - Level up
- Mana
    - Importance
        - Use it for spells
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
        - Decreases the multiplier on spells when you increase your max mana
    - How to upgrade it:
        - Purchase the "Mana Stabilizer" from the shop
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

Detailed information:

- Save Exporting/Importing

    - You can export your current save as a **.urpg** file.
    - You can import your **.urpg** save file on a different computer.
        - **Word of warning: Some legacy save files will break with newer versions (and also when I change the logic for the save export/import code). I am not held responsible for any lost progress.**