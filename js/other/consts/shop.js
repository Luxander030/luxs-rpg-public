const masterShop = [
    { 
        id: 'healthVial', 
        name: 'Health Vial', 
        weight: 100,
        get cost() { 
            let c = 20n;
            for(let i = 1n; i < p.lv; i++) c = (c * 105n) / 100n;
            return c;
        }, 
        run: () => { 
            if (!tryAddItem("Health Vial")) return false;
            return "Bought \"Health Vial\""; 
        } 
    },
    { 
        id: 'manaWell', 
        name: 'Mana Well', 
        weight: 100,
        get cost() { 
            let c = 20n;
            for(let i = 1n; i < p.lv; i++) c = (c * 105n) / 100n;
            return c;
        }, 
        run: () => { 
            if (!tryAddItem("Mana Well")) return false;
            return "Bought \"Mana Well\""; 
        } 
    },
    { 
        id: 'clarityTonic', 
        name: 'Clarity Tonic', 
        weight: 100,
        get cost() { 
            let c = 20n;
            for(let i = 1n; i < p.lv; i++) c = (c * 105n) / 100n;
            return c;
        }, 
        run: () => { 
            if (!tryAddItem("Clarity Tonic")) return false;
            return "Bought \"Clarity Tonic\""; 
        } 
    },
    { 
        id: 'healthincrease1', 
        name: 'Dragon Heart', 
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A heart of a dragon. Increases max life by a bit.",
        weight: 50,
        get cost() { 
            let c = 60n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => {
            let gain = 30n + (p.mhp * 50n / 100n);
            p.mhp += gain; 
            p.hp += gain; 
            if (Math.random() < 0.05) LuxLog(`Lux: More health, more health, yet... it's not enough for you, is it?`);
            return `Max Life increased by ${formatNumber(gain)}`; 
        } 
    },
    { 
        id: 'healthincrease2', 
        name: 'Ancient Dragon Heart', 
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "The heart of a recently killed dragon. Increases max life by a lot.",
        weight: 25,
        get cost() { 
            let c = 60n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        }, 
        run: () => {
            let gain = 60n + (p.mhp * 75n / 100n);
            p.mhp += gain; 
            p.hp += gain; 
            if (Math.random() < 0.05) LuxLog(`Lux: Even more health. Yet still so mortal...`);
            return `Max Life increased by ${formatNumber(gain)}`; 
        } 
    },
    { 
        id: 'manaincrease1', 
        name: 'Eldritch Orb', 
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A blue orb which pulses with a calming blue light. Increases max mana by a bit.",
        weight: 50,
        get cost() { 
            let c = 60n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => { 
            let gain = 30n + (p.mmp * 50n / 100n);
            p.mmp += gain; 
            p.mp += gain; 
            if (Math.random() < 0.05) LuxLog(`Lux: Increasing your ability to cast spells... interesting...`);
            return `Max Mana increased by ${formatNumber(gain)}`; 
        } 
    },
    { 
        id: 'manaincrease2', 
        name: 'Ancient Eldritch Orb', 
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "A blue orb which pulses with a calming blue light. Increases max mana by a lot.",
        weight: 25,
        get cost() { 
            let c = 120n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => { 
            let gain = 60n + (p.mmp * 50n / 100n);
            p.mmp += gain; 
            p.mp += gain; 
            if (Math.random() < 0.05) LuxLog(`Lux: Increasing your ability to cast spells... interesting...`);
            return `Max Mana increased by ${formatNumber(gain)}`; 
        } 
    },
    { 
        id: 'sanityincrease1', 
        name: 'Pure Insight', 
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A purple orb which pulses with a calming purple light. Increases max sanity by a bit.",
        weight: 50,
        get cost() { 
            let c = 60n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => { 
            let gain = 30n + (p.msn * 50n / 100n);
            p.msn += gain; 
            p.sn += gain; 
            if (Math.random() < 0.05) LuxLog(`Lux: Ah yes, "Sanity." A most fragile thing.`);
            return `Max Sanity increased by ${formatNumber(gain)}`; 
        } 
    },
    { 
        id: 'sanityincrease2', 
        name: 'Ancient Pure Insight', 
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "A purple orb which pulses with a calming purple light. Increases max sanity by a lot.",
        weight: 25,
        get cost() { 
            let c = 120n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => { 
            let gain = 60n + (p.msn * 50n / 100n);
            p.msn += gain; 
            p.sn += gain; 
            if (Math.random() < 0.05) LuxLog(`Lux: Ah yes, "Sanity." A most fragile thing.`);
            return `Max Sanity increased by ${formatNumber(gain)}`; 
        } 
    },
    { 
        id: 'fullrefill', 
        name: 'Holy Grail', 
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "A golden cup filled with a clear liquid. Restores all Life, Mana, and Sanity. Cannot be held in an inventory.",
        weight: 25,
        get cost() { 
            let c = 70n;
            for(let i = 1n; i < p.lv; i++) {
                c = (c * 1075n) / 1000n;
            }
            return c;
        }, 
        run: () => { 
            p.hp = p.mhp; 
            p.mp = p.mmp; 
            p.sn = p.msn; 
            if (Math.random() < 0.05) {
                LuxLog(`Lux: You spent gold on some sparkling water... interesting... very... interesting...`);
            }
            return "Life, Mana, and Sanity restored"; 
        }
    },
    { 
        id: 'treasuremap', 
        name: 'Treasure Map', 
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "A map leading to a treasure cache.",
        weight: 15,
        get cost() { 
            let c = 40n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => { 
            if (Math.random() < 0.01) {
                let gain = p.lv * 5n
                p.gems += gain
                log(`Instead of gold, you found a hidden cache of gems! You found ${formatNumber(gain)} gems in the cache.`, "var(--epicItem)")
                return;
            } else {
                let gain = 100n;
                for(let i = 1n; i < p.lv; i++) gain = (gain * 150n) / 100n;
                p.gold += gain; 
                p.totalGold += gain;
                if (Math.random() < 0.05) {
                    if (p.gold < 10000n) {
                        log(`Lux: You know... you're different. Most humans I've seen are greedy. You are different somehow. Or maybe you're just the same as the rest.`,"var(--lux)");
                    } else {
                        log(`Lux: You know... I never get why humans are so... greedy in the first place. Their lives are short anyway. Why would they need that much gold?`,"var(--lux)");
                    }
                }
                return `Found a hidden cache of ${formatNumber(gain)} gold!`; 
            }
        } 
    },
    { 
        id: 'treasuremap2', 
        name: 'Ancient Treasure Map', 
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "An old treasure map leading to a cache.",
        weight: 5,
        get cost() { 
            let c = 40n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        }, 
        run: () => { 
            if (Math.random() < 0.01) {
                let gain = p.lv * 7n
                p.gems += gain
                log(`Instead of gold, you found a hidden cache of gems! You found ${formatNumber(gain)} gems in the cache.`, "var(--epicItem)")
                return;
            } else {
                let gain = 200n;
                for(let i = 1n; i < p.lv; i++) gain = (gain * 175n) / 100n;
                p.gold += gain; 
                p.totalGold += gain;
                if (Math.random() < 0.05) {
                    if (p.gold < 10000n) {
                        log(`Lux: You know... you're different. Most humans I've seen are greedy. You are different somehow. Or maybe you're just the same as the rest.`,"var(--lux)");
                    } else {
                        log(`Lux: You know... I never get why humans are so... greedy in the first place. Their lives are short anyway. Why would they need that much gold?`,"var(--lux)");
                    }
                }
                return `Found a hidden cache of ${formatNumber(gain)} gold!`;
            }
        } 
    },
    { 
        // Renamed off 'spBook': the Martyr's Book entry further down already
        // uses that id (and matches items.js), and masterShop.find() returns
        // the first match — so buying a Martyr's Book ran this instead.
        id: 'knowledgeScroll',
        name: 'Knowledge Scroll',
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "A scroll containing knowledge you don't know.",
        weight: 40,
        get cost() { 
            let c = 40n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => { 
            let gain = 1n * p.lv
            p.sp += gain
            updateUI();
            if (Math.random() < 0.1) {
                log(`Lux: More knowledge. More skills. I wonder when you'll lose your sanity over this?`,"var(--lux)");
                p.sn -= gain * p.lv
                return `Learned new knowledge. (+${formatNumber(gain)} SP)`; 
            }
            return `Learned new knowledge. (+${formatNumber(gain)} SP)`; 
        } 
    },
    { 
        id: 'spscroll2', 
        name: 'Ancient Knowledge Scroll', 
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "An old scroll containing valuable information you do not know yet.",
        weight: 20,
        get cost() { 
            let c = 40n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        }, 
        run: () => { 
            let gain = 2n * p.lv
            p.sp += gain
            updateUI();
            if (Math.random() < 0.1) {
                log(`Lux: More knowledge. More skills. I wonder when you'll lose your sanity over this?`,"var(--lux)");
                p.sn -= (gain * p.lv) * 2n
                return `Learned new knowledge. (+${formatNumber(gain)} SP)`; 
            }
            return `Learned new knowledge. (+${formatNumber(gain)} SP)`; 
        } 
    },
    { 
        id: 'manastabilizer', 
        name: 'Mana Stabilizer', 
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "Makes spells cost less mana by 5%",
        weight: 25,
        get cost() { 
            let c = 150n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        }, 
        run: () => { 
            p.manaReduction += 5n;
            if (p.manaReduction > 100n) p.manaReduction = 100n;
            if (Math.random() < 0.05) {
                LuxLog(`Lux: Decreasing the mental price of things... interesting...`);
            }
            if (p.manaReduction >= 100n) {
                return "Magic Efficiency perfected! Mana costs are now at their base minimum.";
            }
            return `Magic Efficiency increased! Mana Costs reduced by an additional 5%.`; 
        } 
    },
    { 
        id: 'manastabilizer2', 
        name: 'Mana Stabilizer +', 
        rarity: "Legendary",
        rarityColor: "var(--legendaryItem)",
        description: "Makes spells cost less mana by 10%",
        weight: 20,
        get cost() { 
            let c = 150n;
            for(let i = 1n; i < p.lv; i++) c = (c * 120n) / 100n;
            return c;
        }, 
        run: () => { 
            p.manaReduction += 10n;
            if (p.manaReduction > 100n) p.manaReduction = 100n;
            if (Math.random() < 0.05) {
                LuxLog(`Lux: Everything ends. Including your mana.`);
            }
            if (p.manaReduction >= 100n) {
                return "Magic Efficiency perfected! Mana costs are now at their base minimum.";
            }
            return `Magic Efficiency increased! Mana Costs reduced by an additional 10%.`; 
        } 
    },
    { 
        id: 'dmgmult', 
        name: 'Damage Multiplier', 
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A crude sharpening stone. Every hit you land from now on bites a little deeper.",
        info: [{label: "% Damage Multiplier", value: () => 5n}],
        weight: 30,
        get cost() { 
            let c = 300n;
            for(let i = 1n; i < p.lv; i++) c = (c * 130n) / 100n;
            return c;
        }, 
        run: () => { 
            playDmgMultBuySFX();
            p.dmgmult += 5n;
            if (Math.random() < 0.05) {
                log(`Lux: Interesting... I see you've learned how to hurt better... I wonder how that feels?`, "var(--lux)");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 5%.`;
        } 
    },
    { 
        id: 'dmgmult2', 
        name: 'Better Damage Multiplier', 
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "A better stone, properly ground. The edge it leaves lasts.",
        info: [{label: "% Damage Multiplier", value: () => 10n}],
        weight: 15,
        get cost() { 
            let c = 350n;
            for(let i = 1n; i < p.lv; i++) c = (c * 135n) / 100n;
            return c;
        }, 
        run: () => {
            playDmgMultBuySFX();
            p.dmgmult += 10n;
            if (Math.random() < 0.1) {
                log(`Lux: Interesting... I see you've learned how to hurt even better... I wonder how that feels?`, "var(--lux)");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 10%.`;
        } 
    },
    { 
        id: 'dmgmult3', 
        name: 'Purified Damage Multiplier', 
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Purified and honed to a mirror finish. You can see your own face in it, right up until you swing.",
        info: [{label: "% Damage Multiplier", value: () => 15n}],
        weight: 10,
        get cost() { 
            let c = 400n;
            for(let i = 1n; i < p.lv; i++) c = (c * 140n) / 100n;
            return c;
        }, 
        run: () => { 
            playDmgMultBuySFX();
            p.dmgmult += 15n;
            if (Math.random() < 0.1) {
                log(`Lux: Interesting... you still want to be able to harm more? I wonder, what would happen if someone had the same power against you?`, "var(--lux)");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 15%.`;
        } 
    },
    { 
        id: 'dmgmult4', 
        name: 'Perfected Damage Multiplier', 
        rarity: "Epic",
        rarityColor: "var(--epicItem-gradient)",
        description: "Perfected. There is nothing left to grind away, only things left to cut.",
        info: [{label: "% Damage Multiplier", value: () => 20n}],
        weight: 5,
        get cost() { 
            let c = 450n;
            for(let i = 1n; i < p.lv; i++) c = (c * 145n) / 100n;
            return c;
        }, 
        run: () => { 
            playDmgMultBuySFX();
            p.dmgmult += 20n;
            if (Math.random() < 0.2) {
                log(`Lux: Still needing the ability to harm worse. I wonder... do you even notice what you've become?`, "var(--lux)");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 20%.`;
        } 
    },
    { 
        id: 'dmgmult5', 
        name: 'Ancient Damage Multiplier', 
        rarity: "Legendary",
        rarityColor: "var(--legendaryItem-gradient)",
        description: "Old, and far sharper than anything this old has any right to be. Bob will not say where he got it.",
        info: [{label: "% Damage Multiplier", value: () => 25n}],
        weight: 2.5,
        get cost() { 
            let c = 500n;
            for(let i = 1n; i < p.lv; i++) c = (c * 150n) / 100n;
            return c;
        }, 
        run: () => { 
            playDmgMultBuySFX();
            p.dmgmult += 25n;
            if (Math.random() < 0.25) {
                log(`Lux: I see you're still going strong. Wanting to be able to harm even more. When will you stop? When will you have enough?`, "var(--lux)");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 25%.`;
        } 
    },
    { 
        id: 'slot610unlocker', 
        name: 'Backpack Slot 6-10', 
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "A wider pack with a second row of straps. Unlocks inventory slots 6 through 10. If you already have them, Bob patches you up instead.",
        info: [{label: "Inventory Slots", value: () => 5n}],
        weight: 15,
        get cost() { 
            let c = 500n;
            for(let i = 1n; i < p.lv; i++) c = (c * 150n) / 100n;
            return c;
        }, 
        run: () => { 
            if (p.inventory.slot610Unlocked === true) {
                p.hp = p.mhp
                return `Life regained instead. Slots already unlocked.`;
            } else {
                p.inventory.slot610Unlocked = true
                p.inventory.slot6 = "empty"
                p.inventory.slot7 = "empty"
                p.inventory.slot8 = "empty"
                p.inventory.slot9 = "empty"
                p.inventory.slot10 = "empty"
                updateInventoryUI();
                return `Slots 6-10 unlocked!`;
            }
        } 
    },
    { 
        id: 'slot1120unlocker', 
        name: 'Backpack Slots 11-20', 
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "A frame pack built for long roads. Unlocks inventory slots 11 through 20. If you already have them, Bob patches you up instead.",
        info: [{label: "Inventory Slots", value: () => 10n}],
        weight: 15,
        get cost() { 
            let c = 1000n;
            for(let i = 1n; i < p.lv; i++) c = (c * 150n) / 100n;
            return c;
        }, 
        run: () => { 
            if (p.inventory.slot1120Unlocked === true) {
                p.hp = p.mhp
                return `Life regained instead. Slots already unlocked.`;
            } else {
                p.inventory.slot1120Unlocked = true;
                p.inventory.slot11 = "empty";
                p.inventory.slot12 = "empty";
                p.inventory.slot13 = "empty";
                p.inventory.slot14 = "empty";
                p.inventory.slot15 = "empty";
                p.inventory.slot16 = "empty";
                p.inventory.slot17 = "empty";
                p.inventory.slot18 = "empty";
                p.inventory.slot19 = "empty";
                p.inventory.slot20 = "empty";
                updateInventoryUI();
                return `Slots 11-20 unlocked!`;
            }
        } 
    },
    {
        id: 'storageUnit',
        name: 'Storage Unit',
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "A lockbox Bob keeps somewhere you are not allowed to know about. Holds 200 items you don't want to carry. Open it from the Extras menu.",
        info: [{label: "Storage Slots", value: () => 200n}],
        weight: 5,
        get cost() {
            let c = 2000n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (p.flags.storageUnlocked === true) {
                p.hp = p.mhp;
                log(`You already have a storage unit. Fully healed instead.`, "var(--unlocked)");
                return;
            }
            p.flags.storageUnlocked = true;
            if (Math.random() < 0.05) {
                LuxLog(`Lux: You bought a storage unit. How... practical.`);
            }
            return `Storage Unit unlocked! You can now store up to 200 items.`;
        }
    },
    {
        id: 'storageUnitUpgrade1',
        name: 'Storage Unit Upgrade',
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "More shelving for your storage unit. Requires a storage unit first, obviously.",
        info: [{label: "Storage Slots", value: () => 50n}],
        weight: 5,
        get cost() {
            let c = 500n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            p.inventory.storage.push(...new Array(50).fill("empty"))
            if (Math.random() < 0.05) {
                LuxLog(`Lux: You bought more storage. How... practical.`);
            }
            return `Storage Unit upgraded! You can now store 50 more items.`;
        }
    },
    {
        id: 'storageUnitUpgrade2',
        name: 'Storage Unit Upgrade +',
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "A second room for your storage unit. Bob insists it was always there.",
        info: [{label: "Storage Slots", value: () => 100n}],
        weight: 5,
        get cost() {
            let c = 1000n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            p.inventory.storage.push(...new Array(100).fill("empty"))
            if (Math.random() < 0.05) {
                LuxLog(`Lux: You bought more storage. How... practical.`);
            }
            return `Storage Unit upgraded! You can now store 100 more items.`;
        }
    },
    {
        id: 'storageUnitUpgrade3',
        name: 'Storage Unit Upgrade ++',
        rarity: "Epic",
        rarityColor: "var(--epicItem-gradient)",
        description: "Bob gestures vaguely at a doorway that was not there a moment ago. Do not think about it too hard.",
        info: [{label: "Storage Slots", value: () => 200n}],
        weight: 5,
        get cost() {
            let c = 2000n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            p.inventory.storage.push(...new Array(200).fill("empty"))
            if (Math.random() < 0.05) {
                LuxLog(`Lux: You bought more storage. How... practical.`);
            }
            return `Storage Unit upgraded! You can now store 200 more items.`;
        }
    },
    { 
        id: 'abbieApple', 
        name: "Abbie's Apple", 
        weight: 10,
        get cost() { 
            let c = 500n;
            for(let i = 1n; i < p.lv; i++) c = (c * 150n) / 100n;
            return c;
        }, 
        run: () => { 
            if (tryAddItem("Abbie's Apple")) {
                updateInventoryUI();
                return `Bought item "Abbie's Apple." It is now in your inventory.`;
            } else {
                return false;
            }
        } 
    },
    { 
        id: 'apple', 
        name: 'Apple', 
        weight: 50,
        get cost() { 
            let c = 10n;
            for(let i = 1n; i < p.lv; i++) c = (c * 150n) / 100n;
            return c;
        }, 
        run: () => { 
            if (tryAddItem("Apple")) {
                updateInventoryUI();
                return `Bought item "Apple." It is now in your inventory.`;
            } else {
                return false;
            }
        } 
    },
    { 
        id: 'fryingPan', 
        name: 'Frying Pan', 
        weight: 0.1,
        get cost() { 
            let c = 1000n;
            for(let i = 1n; i < p.lv; i++) c = (c * 150n) / 100n;
            return c;
        }, 
        run: () => { 
            if (tryAddItem("Frying Pan")) {
                updateInventoryUI();
                return `Bought item "Frying Pan." It is now in your inventory.`;
            } else {
                return false;
            }
        } 
    },

    // ============================================================
    // CARD SHOP ITEMS
    // ============================================================

    {
        id: 'tarot_the_fool',
        name: 'The Fool (0)',
        weight: 20,
        get cost() {
            let c = 50n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Fool (0)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Fool (0)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_magician',
        name: 'The Magician (1)',
        weight: 18,
        get cost() {
            let c = 75n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Magician (1)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Magician (1)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_high_priestess',
        name: 'The High Priestess (2)',
        weight: 15,
        get cost() {
            let c = 100n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The High Priestess (2)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The High Priestess (2)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_empress',
        name: 'The Empress (3)',
        weight: 18,
        get cost() {
            let c = 75n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Empress (3)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Empress (3)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_emperor',
        name: 'The Emperor (4)',
        weight: 15,
        get cost() {
            let c = 150n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Emperor (4)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Emperor (4)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_hierophant',
        name: 'The Hierophant (5)',
        weight: 15,
        get cost() {
            let c = 150n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Hierophant (5)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Hierophant (5)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_lovers',
        name: 'The Lovers (6)',
        weight: 18,
        get cost() {
            let c = 100n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Lovers (6)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Lovers (6)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_chariot',
        name: 'The Chariot (7)',
        weight: 15,
        get cost() {
            let c = 150n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Chariot (7)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Chariot (7)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_justice',
        name: 'Justice (8)',
        weight: 15,
        get cost() {
            let c = 150n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Justice (8)")) {
                updateInventoryUI();
                return `Bought Tarot Card "Justice (8)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_hermit',
        name: 'The Hermit (9)',
        weight: 18,
        get cost() {
            let c = 100n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Hermit (9)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Hermit (9)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_wheel_of_fortune',
        name: 'The Wheel of Fortune (10)',
        weight: 12,
        get cost() {
            let c = 200n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Wheel of Fortune (10)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Wheel of Fortune (10)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_strength',
        name: 'Strength (11)',
        weight: 15,
        get cost() {
            let c = 150n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Strength (11)")) {
                updateInventoryUI();
                return `Bought Tarot Card "Strength (11)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_hanged_man',
        name: 'The Hanged Man (12)',
        weight: 18,
        get cost() {
            let c = 100n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Hanged Man (12)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Hanged Man (12)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_death',
        name: 'Death (13)',
        weight: 12,
        get cost() {
            let c = 200n;
            for(let i = 1n; i < p.lv; i++) c = (c * 120n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Death (13)")) {
                updateInventoryUI();
                return `Bought Tarot Card "Death (13)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_temperance',
        name: 'Temperance (14)',
        weight: 18,
        get cost() {
            let c = 100n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Temperance (14)")) {
                updateInventoryUI();
                return `Bought Tarot Card "Temperance (14)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_devil',
        name: 'The Devil (15)',
        weight: 10,
        get cost() {
            let c = 250n;
            for(let i = 1n; i < p.lv; i++) c = (c * 120n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Devil (15)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Devil (15)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_tower',
        name: 'The Tower (16)',
        weight: 12,
        get cost() {
            let c = 200n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Tower (16)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Tower (16)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_star',
        name: 'The Star (17)',
        weight: 18,
        get cost() {
            let c = 100n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Star (17)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Star (17)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_moon',
        name: 'The Moon (18)',
        weight: 12,
        get cost() {
            let c = 200n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Moon (18)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Moon (18)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_sun',
        name: 'The Sun (19)',
        weight: 12,
        get cost() {
            let c = 200n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The Sun (19)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The Sun (19)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_judgement',
        name: 'Judgement (20)',
        weight: 8,
        get cost() {
            let c = 350n;
            for(let i = 1n; i < p.lv; i++) c = (c * 120n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Judgement (20)")) {
                updateInventoryUI();
                return `Bought Tarot Card "Judgement (20)."`;
            } else { return false;}
        }
    },
    {
        id: 'tarot_the_world',
        name: 'The World (21)',
        weight: 5,
        get cost() {
            let c = 500n;
            for(let i = 1n; i < p.lv; i++) c = (c * 125n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("The World (21)")) {
                updateInventoryUI();
                return `Bought Tarot Card "The World (21)."`;
            } else { return false;}
        }
    },

    // ============================================================
    // CONSUMABLE SHOP ITEMS
    // ============================================================

    {
        id: 'bloodStone',
        name: 'Blood Stone',
        weight: 30,
        get cost() {
            let c = 80n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Blood Stone")) {
                updateInventoryUI();
                return `Bought item "Blood Stone."`;
            } else { return false;}
        }
    },
    {
        id: 'bloodStoneMed',
        name: 'Medium Blood Stone',
        weight: 20,
        get cost() {
            let c = 150n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Medium Blood Stone")) {
                updateInventoryUI();
                return `Bought item "Medium Blood Stone."`;
            } else { return false;}
        }
    },
    {
        id: 'bloodStoneLarge',
        name: 'Large Blood Stone',
        weight: 10,
        get cost() {
            let c = 250n;
            for(let i = 1n; i < p.lv; i++) c = (c * 120n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Large Blood Stone")) {
                updateInventoryUI();
                return `Bought item "Large Blood Stone."`;
            } else { return false;}
        }
    },
    {
        id: 'spBook',
        name: "Martyr's Book",
        weight: 20,
        get cost() {
            let c = 200n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Martyr's Book")) {
                updateInventoryUI();
                return `Bought item "Martyr's Book."`;
            } else { return false;}
        }
    },
    {
        id: 'glassHourglass',
        name: 'Glass Hourglass',
        weight: 15,
        get cost() {
            let c = 300n;
            for(let i = 1n; i < p.lv; i++) c = (c * 120n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Glass Hourglass")) {
                updateInventoryUI();
                return `Bought item "Glass Hourglass."`;
            } else { return false;}
        }
    },

    // ============================================================
    // WEAPON SHOP ITEMS
    // ============================================================

    {
        id: 'stoneSword',
        name: 'Stone Sword',
        weight: 20,
        get cost() {
            let c = 100n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Stone Sword")) {
                updateInventoryUI();
                return `Bought weapon "Stone Sword."`;
            } else { return false;}
        }
    },
    {
        id: 'ironSword',
        name: 'Iron Sword',
        weight: 15,
        get cost() {
            let c = 200n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Iron Sword")) {
                updateInventoryUI();
                return `Bought weapon "Iron Sword."`;
            } else { return false;}
        }
    },
    {
        id: 'diamondSword',
        name: 'Diamond Sword',
        weight: 8,
        get cost() {
            let c = 400n;
            for(let i = 1n; i < p.lv; i++) c = (c * 125n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Diamond Sword")) {
                updateInventoryUI();
                return `Bought weapon "Diamond Sword."`;
            } else { return false;}
        }
    },

    // ============================================================
    // EFFECT ITEMS
    // ============================================================

    {
        id: 'venomVial',
        name: 'Venom Vial',
        weight: 18,
        get cost() {
            let c = 80n;
            for (let i = 1n; i < p.lv; i++) c = (c * 108n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Venom Vial")) {
                updateInventoryUI();
                return `Bought "Venom Vial."`;
            } else { return false;}
        }
    },
    {
        id: 'flashbang',
        name: 'Flashbang',
        weight: 15,
        get cost() {
            let c = 120n;
            for (let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Flashbang")) {
                updateInventoryUI();
                return `Bought "Flashbang."`;
            } else { return false;}
        }
    },
    {
        id: 'torchOil',
        name: 'Torch Oil',
        weight: 20,
        get cost() {
            let c = 60n;
            for (let i = 1n; i < p.lv; i++) c = (c * 107n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Torch Oil")) {
                updateInventoryUI();
                return `Bought "Torch Oil."`;
            } else { return false;}
        }
    },
    {
        id: 'iceShard',
        name: 'Ice Shard',
        weight: 20,
        get cost() {
            let c = 60n;
            for (let i = 1n; i < p.lv; i++) c = (c * 107n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Ice Shard")) {
                updateInventoryUI();
                return `Bought "Ice Shard."`;
            } else { return false;}
        }
    },
    {
        id: 'cursedDust',
        name: 'Cursed Dust',
        weight: 12,
        get cost() {
            let c = 200n;
            for (let i = 1n; i < p.lv; i++) c = (c * 112n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Cursed Dust")) {
                updateInventoryUI();
                return `Bought "Cursed Dust."`;
            } else { return false;}
        }
    },
    {
        id: 'weakeningSalve',
        name: 'Weakening Salve',
        weight: 12,
        get cost() {
            let c = 180n;
            for (let i = 1n; i < p.lv; i++) c = (c * 112n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Weakening Salve")) {
                updateInventoryUI();
                return `Bought "Weakening Salve."`;
            } else { return false;}
        }
    },
    {
        id: 'combinationKit',
        name: 'Combination Kit',
        weight: 6,
        get cost() {
            let c = 500n;
            for (let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        },
        run: () => {
            if (tryAddItem("Combination Kit")) {
                updateInventoryUI();
                return `Bought "Combination Kit."`;
            } else { return false;}
        }
    },
];

