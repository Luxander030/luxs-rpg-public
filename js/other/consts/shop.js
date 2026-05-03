const masterShop = [
    { 
        id: 'healthrefill', 
        name: 'Health Vial', 
        weight: 100,
        // Logic: 20 * 1.05^(lv-1) using BigInt scaling
        get cost() { 
            let c = 20n;
            for(let i = 1n; i < p.lv; i++) c = (c * 105n) / 100n;
            return c;
        }, 
        run: () => { 
            checkSpaceAndAddItem("Health Vial")
            return "Bought \"Health Vial\""; 
        } 
    },
    { 
        id: 'manarefill', 
        name: 'Mana Well', 
        weight: 100,
        get cost() { 
            let c = 20n;
            for(let i = 1n; i < p.lv; i++) c = (c * 105n) / 100n;
            return c;
        }, 
        run: () => { 
            checkSpaceAndAddItem("Mana Well")
            return "Bought \"Mana Well\""; 
        } 
    },
    { 
        id: 'sanityrefill', 
        name: 'Clarity Tonic', 
        weight: 100,
        get cost() { 
            let c = 20n;
            for(let i = 1n; i < p.lv; i++) c = (c * 105n) / 100n;
            return c;
        }, 
        run: () => { 
            checkSpaceAndAddItem("Clarity Tonic")
            return "Bought \"Clarity Tonic\""; 
        } 
    },
    { 
        id: 'healthincrease1', 
        name: 'Dragon Heart', 
        weight: 50,
        get cost() { 
            let c = 60n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => {
            // Logic: 30 + (50% of current max)
            let gain = 30n + (p.mhp * 50n / 100n);
            p.mhp += gain; 
            p.hp += gain; 
            if (Math.random() < 0.05) LuxLog(`Lux: More health, more health, yet... it's not enough for you, is it?`);
            return `Max HP increased by ${formatNumber(gain)}`; 
        } 
    },
    { 
        id: 'healthincrease2', 
        name: 'Ancient Dragon Heart', 
        weight: 25,
        get cost() { 
            let c = 60n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        }, 
        run: () => {
            // Logic: 60 + (75% of current max)
            let gain = 60n + (p.mhp * 75n / 100n);
            p.mhp += gain; 
            p.hp += gain; 
            if (Math.random() < 0.05) LuxLog(`Lux: Even more health. Yet still so mortal...`);
            return `Max HP increased by ${formatNumber(gain)}`; 
        } 
    },
    { 
        id: 'manaincrease1', 
        name: 'Eldritch Orb', 
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
        weight: 25,
        // Logic: 70 * 1.075^(lv-1)
        get cost() { 
            let c = 70n;
            for(let i = 1n; i < p.lv; i++) {
                c = (c * 1075n) / 1000n;
            }
            return c;
        }, 
        run: () => { 
            // These are safe BigInt-to-BigInt assignments
            p.hp = p.mhp; 
            p.mp = p.mmp; 
            p.sn = p.msn; 
            
            if (Math.random() < 0.05) {
                LuxLog(`Lux: You spent gold on some sparkling water... interesting... very... interesting...`);
            }
            return "HP, Mana, and Sanity restored"; 
        }
    },

    { 
        id: 'treasuremap', 
        name: 'Treasure Map', 
        weight: 30,
        get cost() { 
            let c = 40n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => { 
            // Logic: 100 * 1.5^(lv-1)
            let gain = 100n;
            for(let i = 1n; i < p.lv; i++) gain = (gain * 150n) / 100n;
            
            p.gold += gain; 
            p.totalGold += gain;
            
            if (Math.random() < 0.05) {
                // BigInt comparison: 10000n
                if (p.gold < 10000n) {
                    log(`Lux: You know... you're different. Most humans I've seen are greedy. You are different somehow. Or maybe you're just the same as the rest.`,"var(--lux)");
                } else {
                    log(`Lux: You know... I never get why humans are so... greedy in the first place. Their lives are short anyway. Why would they need that much gold?`,"var(--lux)");
                }
            }
            return `Found a hidden cache of ${formatNumber(gain)} gold!`; 
        } 
    },
    { 
        id: 'treasuremap2', 
        name: 'Ancient Treasure Map', 
        weight: 15,
        get cost() { 
            let c = 40n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        }, 
        run: () => { 
            // Logic: 200 * 1.75^(lv-1)
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
    },

    { 
        id: 'spscroll', 
        name: 'Knowledge Scroll', 
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
        weight: 25,
        get cost() { 
            let c = 150n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        }, 
        run: () => { 
            // Logic: Increase by 5n, cap at 100n
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
        weight: 20,
        get cost() { 
            let c = 150n;
            for(let i = 1n; i < p.lv; i++) c = (c * 120n) / 100n;
            return c;
        }, 
        run: () => { 
            // Logic: Increase by 10n, cap at 100n
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
        weight: 30,
        get cost() { 
            let c = 300n;
            for(let i = 1n; i < p.lv; i++) c = (c * 130n) / 100n;
            return c;
        }, 
        run: () => { 
            playDmgMultBuySFX();
            p.dmgmult += 5n; // Representing +5%
            if (Math.random() < 0.05) {
                log(`Lux: Interesting... I see you've learned how to hurt better... I wonder how that feels?`, "var(--lux)");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 5%.`;
        } 
    },
    { 
        id: 'dmgmult2', 
        name: 'Better Damage Multiplier', 
        weight: 15,
        get cost() { 
            let c = 350n;
            for(let i = 1n; i < p.lv; i++) c = (c * 135n) / 100n;
            return c;
        }, 
        run: () => {
            playDmgMultBuySFX();
            p.dmgmult += 10n; // +10%
            if (Math.random() < 0.1) {
                log(`Lux: Interesting... I see you've learned how to hurt even better... I wonder how that feels?`, "var(--lux)");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 10%.`;
        } 
    },
    { 
        id: 'dmgmult3', 
        name: 'Purified Damage Multiplier', 
        weight: 10,
        get cost() { 
            let c = 400n;
            for(let i = 1n; i < p.lv; i++) c = (c * 140n) / 100n;
            return c;
        }, 
        run: () => { 
            playDmgMultBuySFX();
            p.dmgmult += 15n; // +15%
            if (Math.random() < 0.1) {
                log(`Lux: Interesting... you still want to be able to harm more? I wonder, what would happen if someone had the same power against you?`, "var(--lux)");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 15%.`;
        } 
    },
    { 
        id: 'dmgmult4', 
        name: 'Perfected Damage Multiplier', 
        weight: 5,
        get cost() { 
            let c = 450n;
            for(let i = 1n; i < p.lv; i++) c = (c * 145n) / 100n;
            return c;
        }, 
        run: () => { 
            playDmgMultBuySFX();
            p.dmgmult += 20n; // +20%
            if (Math.random() < 0.2) {
                log(`Lux: Still needing the ability to harm worse. I wonder... do you even notice whatt you've become?`, "var(--lux)");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 20%.`;
        } 
    },
    { 
        id: 'dmgmult5', 
        name: 'Ancient Damage Multiplier', 
        weight: 2.5,
        get cost() { 
            let c = 500n;
            for(let i = 1n; i < p.lv; i++) c = (c * 150n) / 100n;
            return c;
        }, 
        run: () => { 
            playDmgMultBuySFX();
            p.dmgmult += 25n; // +25%
            if (Math.random() < 0.25) {
                log(`Lux: I see you're still going strong. Wanting to be able to harm even more. When will you stop? When will you have enough?`, "var(--lux)");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 25%.`;
        } 
    },
    { 
        id: 'slot610unlocker', 
        name: 'Backpack Slot 6-10', 
        weight: 15,
        get cost() { 
            let c = 500n;
            for(let i = 1n; i < p.lv; i++) c = (c * 150n) / 100n;
            return c;
        }, 
        run: () => { 
            if (p.inventory.slot610Unlocked === true ) {
                p.hp = p.mhp
                return `Health regained instead. Slots already unlocked.`;
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
        weight: 15,
        get cost() { 
            let c = 1000n;
            for(let i = 1n; i < p.lv; i++) c = (c * 150n) / 100n;
            return c;
        }, 
        run: () => { 
            if (p.inventory.slot1120Unlocked === true ) {
                p.hp = p.mhp
                return `Health regained instead. Slots already unlocked.`;
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
        id: 'abbieapple', 
        name: 'Abbie\'s Apple', 
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
                return `Your inventory is currenty full.`; 
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
                return `Your inventory is currenty full.`; 
            }
            
        } 
    },
]