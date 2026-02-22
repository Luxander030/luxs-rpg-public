const masterShop = [
    { 
        id: 'healthrefill', 
        name: 'Health Vial', 
        // Logic: 20 * 1.05^(lv-1) using BigInt scaling
        get cost() { 
            let c = 20n;
            for(let i = 1n; i < p.lv; i++) c = (c * 105n) / 100n;
            return c;
        }, 
        run: () => { p.hp = p.mhp; return "Vitality restored!"; } 
    },
    { 
        id: 'manarefill', 
        name: 'Mana Well', 
        get cost() { 
            let c = 20n;
            for(let i = 1n; i < p.lv; i++) c = (c * 105n) / 100n;
            return c;
        }, 
        run: () => { p.mp = p.mmp; return "Mana restored!"; } 
    },
    { 
        id: 'sanityrefill', 
        name: 'Clarity Tonic', 
        get cost() { 
            let c = 20n;
            for(let i = 1n; i < p.lv; i++) c = (c * 105n) / 100n;
            return c;
        }, 
        run: () => { p.sn = p.msn; return "Sanity restored!"; } 
    },
    { 
        id: 'healthincrease1', 
        name: 'Dragon Heart', 
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
        name: 'Dragon Heart +', 
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
        get cost() { 
            let c = 60n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => { 
            let gain = 30n + (p.msn * 50n / 100n);
            p.msn += gain; 
            p.sn += gain; 
            if (Math.random() < 0.05) LuxLog(`Lux: Ah yes, "Sanity". A most fragile thing.`);
            return `Max Sanity increased by ${formatNumber(gain)}`; 
        } 
    },
    { 
        id: 'sanityincrease2', 
        name: 'Ancient Pure Insight', 
        get cost() { 
            let c = 120n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => { 
            let gain = 60n + (p.msn * 50n / 100n);
            p.msn += gain; 
            p.sn += gain; 
            if (Math.random() < 0.05) LuxLog(`Lux: Ah yes, "Sanity". A most fragile thing.`);
            return `Max Sanity increased by ${formatNumber(gain)}`; 
        } 
    },
    
    { 
        id: 'fullrefill', 
        name: 'Holy Grail', 
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
            
            if (Math.random() < 0.05) {
                // BigInt comparison: 10000n
                if (p.gold < 10000n) {
                    log(`Lux: You know... you're different. Most humans I've seen are greedy. You are different somehow. Or maybe you're just the same as the rest.`,"#3c23a8");
                } else {
                    log(`Lux: You know... I never get why humans are so... greedy in the first place. Their lives are short anyway. Why would they need that much gold?`,"#3c23a8");
                }
            }
            return `Found a hidden cache of ${formatNumber(gain)} gold!`; 
        } 
    },
    { 
        id: 'treasuremap2', 
        name: 'Ancient Treasure Map', 
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
            
            if (Math.random() < 0.05) {
                if (p.gold < 10000n) {
                    log(`Lux: You know... you're different. Most humans I've seen are greedy. You are different somehow. Or maybe you're just the same as the rest.`,"#3c23a8");
                } else {
                    log(`Lux: You know... I never get why humans are so... greedy in the first place. Their lives are short anyway. Why would they need that much gold?`,"#3c23a8");
                }
            }
            return `Found a hidden cache of ${formatNumber(gain)} gold!`; 
        } 
    },

    { 
        id: 'spscroll', 
        name: 'Knowledge Scroll', 
        get cost() { 
            let c = 40n;
            for(let i = 1n; i < p.lv; i++) c = (c * 110n) / 100n;
            return c;
        }, 
        run: () => { 
            // Logic: 100 * 1.15^(lv-1)
            let gain = 100n;
            for(let i = 1n; i < p.lv; i++) gain = (gain * 115n) / 100n;
            p.sp += gain
            updateUI();
            if (Math.random() < 0.05) {
                log(`Lux: More knowledge. More skills. i wonder when you'll lose your sanity over this?`,"#3c23a8");
                p.sn -= gain
            }
            return `Learned new knowledge. (+${formatNumber(gain)} SP)`; 
        } 
    },
    { 
        id: 'spscroll2', 
        name: 'Ancient Knowledge Scroll', 
        get cost() { 
            let c = 40n;
            for(let i = 1n; i < p.lv; i++) c = (c * 115n) / 100n;
            return c;
        }, 
        run: () => { 
            // Logic: 150 * 1.3^(lv-1)
            let gain = 150n;
            for(let i = 1n; i < p.lv; i++) gain = (gain * 130n) / 100n;
            p.sp += gain
            updateUI();
            if (Math.random() < 0.05) {
                log(`Lux: More knowledge. More skills. i wonder when you'll lose your sanity over this?`,"#3c23a8");
                p.sn -= gain * 2
            }
            return `Learned new knowledge. (+${formatNumber(gain)} SP)`; 
        } 
    },

    { 
        id: 'manastabilizer', 
        name: 'Mana Stabilizer', 
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
        get cost() { 
            let c = 300n;
            for(let i = 1n; i < p.lv; i++) c = (c * 130n) / 100n;
            return c;
        }, 
        run: () => { 
            p.dmgmult += 5n; // Representing +5%
            if (Math.random() < 0.05) {
                log(`Lux: Interesting... I see you've learned how to hurt better... I wonder how that feels?`, "#3c23a8");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 5%.`;
        } 
    },
    { 
        id: 'dmgmult2', 
        name: 'Better Damage Multiplier', 
        get cost() { 
            let c = 350n;
            for(let i = 1n; i < p.lv; i++) c = (c * 135n) / 100n;
            return c;
        }, 
        run: () => { 
            p.dmgmult += 10n; // +10%
            if (Math.random() < 0.1) {
                log(`Lux: Interesting... I see you've learned how to hurt even better... I wonder how that feels?`, "#3c23a8");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 10%.`;
        } 
    },
    { 
        id: 'dmgmult3', 
        name: 'Purified Damage Multiplier', 
        get cost() { 
            let c = 400n;
            for(let i = 1n; i < p.lv; i++) c = (c * 140n) / 100n;
            return c;
        }, 
        run: () => { 
            p.dmgmult += 15n; // +15%
            if (Math.random() < 0.1) {
                log(`Lux: Interesting... you still want to be able to harm more? I wonder, what would happen if someone had the same power against you?`, "#3c23a8");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 15%.`;
        } 
    },
    { 
        id: 'dmgmult4', 
        name: 'Perfected Damage Multiplier', 
        get cost() { 
            let c = 450n;
            for(let i = 1n; i < p.lv; i++) c = (c * 145n) / 100n;
            return c;
        }, 
        run: () => { 
            p.dmgmult += 20n; // +20%
            if (Math.random() < 0.2) {
                log(`Lux: Still needing the ability to harm worse. I wonder... do you even notice whatt you've become?`, "#3c23a8");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 20%.`;
        } 
    },
    { 
        id: 'dmgmult5', 
        name: 'Ancient Damage Multiplier', 
        get cost() { 
            let c = 500n;
            for(let i = 1n; i < p.lv; i++) c = (c * 150n) / 100n;
            return c;
        }, 
        run: () => { 
            p.dmgmult += 25n; // +25%
            if (Math.random() < 0.25) {
                log(`Lux: I see you're still going strong. Wanting to be able to harm even more. When will you stop? When will you have enough?`, "#3c23a8");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 25%.`;
        } 
    }
]