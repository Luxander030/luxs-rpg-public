let nextEnemyOverride = null; // Stores the name of the forced enemy
let enemy = null;
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
        id: 'expscroll', 
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
            
            addExperience(gain);
            updateUI();
            if (Math.random() < 0.05) {
                log(`Lux: Try all you want. You'll never be as knowledged as me =)`,"#3c23a8");
            }
            return `Learned new knowledge. (+${formatNumber(gain)} EXP)`; 
        } 
    },
    { 
        id: 'expscroll2', 
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
            
            addExperience(gain);
            updateUI();
            if (Math.random() < 0.05) {
                log(`Lux: Try all you want. You'll never be as knowledged as me =)`,"#3c23a8");
            }
            return `Learned new knowledge. (+${formatNumber(gain)} EXP)`; 
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
                log(`Lux: Interesting... I see you've learned how to hurt better... I wonder how that...`, "#3c23a8");
                log(`Lux: ...feels?`,"#ff0000");
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
                log(`Lux: Interesting... I see you've learned how to hurt better... I wonder how that...`, "#3c23a8");
                log(`Lux: ...feels?`,"#ff0000");
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
                log(`Lux: Interesting... I see you've learned how to hurt better... I wonder how that...`, "#3c23a8");
                log(`Lux: ...feels?`,"#ff0000");
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
                log(`Lux: Interesting... I see you've learned how to hurt better... I wonder how that...`, "#3c23a8");
                log(`Lux: ...feels?`,"#ff0000");
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
                log(`Lux: Interesting... I see you've learned how to hurt better... I wonder how that...`, "#3c23a8");
                log(`Lux: ...feels?`,"#ff0000");
            }
            return `Damage Multiplier increased! Total Damage increased by an additional 25%.`;
        } 
    }
];
const skillTree = {
    strike: {
        name: "Strike",
        cost: 0n,
        parent: null,
        unlocked: true,
        get dmg() {
            // Logic: (12 * multiplier) / 100
            return (12n * p.dmgmult) / 100n;
        }
    },
    fireball: {
        name: "Fireball", 
        cost: 1n, 
        parent: 'strike', 
        unlocked: false, 
        mp: 15n, 
        get dmg() { 
            // Logic: (LV * 0.5 * 22) -> (LV * 11)
            let base = p.lv * 11n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() {
            // Duration can be a Number or BigInt; here we'll use BigInt for consistency
            return p.lv * 2n;
        }
    },
    iceshock: {
        name: "Iceshock", 
        cost: 2n, 
        parent: 'fireball', 
        unlocked: false, 
        mp: 30n, 
        get dmg() { 
            let base = ((p.lv - 1n) * 30n) + 90n;
            return (base * p.dmgmult) / 100n;
        },
    },
    thunderbolt: {
        name: "Thunderbolt", 
        cost: 3n, 
        parent: 'iceshock', 
        unlocked: false, 
        mp: 45n, 
        get dmg() { 
            // Logic: (LV * 0.5 * 70) -> (LV * 35)
            let base = (p.lv * 35n) + 70n;
            return (base * p.dmgmult) / 100n;
        }
    },
    fingerofdeath: {
        name: "Finger of Death", 
        cost: 4n, 
        parent: 'thunderbolt', 
        unlocked: false, 
        mp: 100n, 
        get dmg() { 
            let base = (p.lv * 250n) + 250n;
            return (base * p.dmgmult) / 100n;
        }
    },
    siphonray: {
        name: "Siphon Ray", 
        cost: 5n, 
        parent: 'fingerofdeath', 
        unlocked: false, 
        mp: 100n, 
        get dmg() {
            let base = (p.lv * 100n) + 100n;
            return (base * p.dmgmult) / 100n;
        },
        get heal() { 
            let base = (p.lv * 100n) + 100n;
            return (base * p.dmgmult) / 100n;
        }
    },
    eldritchblast: {
        name: "Eldritch Blast", 
        cost: 6n, 
        parent: 'siphonray', 
        unlocked: false, 
        mp: 100n, 
        get dmg() {
           let base = (p.lv * 400n) + 1000n;
           return (base * p.dmgmult) / 100n;
        }
    },
    snowgrave: {
        name: "Snowgrave", 
        cost: 7n, 
        parent: 'eldritchblast', 
        unlocked: false, 
        mp: 20000n, 
        get dmg() { 
            let base = (p.lv * 600n) + 600n;
            return (base * p.dmgmult) / 100n;
        },
        get san() {
            // Logic: Original p.sn - (p.sn / 2) is just p.sn / 2.
            // We return it as a negative value to represent the drain.
            return -(p.sn / 2n);
        }
    },
        heal: {
        name: "Heal", 
        cost: 1n, 
        parent: 'strike', 
        unlocked: false, 
        mp: 10n, 
        get heal() { 
            // BigInt calculation: (35 * LV) + 10
            return (35n * p.lv) + 10n; 
        }
    },
    mindshield: {
        name: "Mind Shield", 
        cost: 2n, 
        parent: 'heal', 
        unlocked: false, 
        mp: 20n, 
        get san() { 
            return (p.lv * 5n) + 5n; 
        },
    },
    dualheal: {
        name: "Dual Heal", 
        cost: 3n, 
        parent: 'mindshield', 
        unlocked: false, 
        mp: 100n, 
        get heal() { 
            return (p.lv * 1000n) + 2000n; 
        },
        get san() {
            return (p.lv * 100n) + 850n;
        }
    },
    healprayer: {
        name: "Heal Prayer", 
        cost: 5n, 
        parent: 'dualheal', 
        unlocked: false, 
        mp: 500n, 
        get heal() { 
            return (p.lv * 5n) + 5n; 
        },
    },
    ralseidualheal: {
        name: "Ralsei's Signature Dual Heal", 
        cost: 10n, 
        parent: 'healprayer', 
        unlocked: false, 
        mp: 1000n, 
        get heal() { 
            // 5.5 replaced with (* 55 / 10)
            return ((p.lv * 55n) / 10n) + p.msn; 
        },
        get san() {
            return ((p.lv * 55n) / 10n) + p.mmp;
        }
    }
};
const enemies = [
    /*
    Vars to use for enemies:
    name = the name of the enemy
    hp = current hp
    mhp = max hp of the enemy
    atk = dmg dealt by enemy
    san = amount of sanity drain enemy deals
    manaDrain = amount of mana drained
    exp = amount of exp recived when enemy is killed
    gold = amount of gold recived when enemy is killed
    lifesteal = amoutn of hp enemy heals for each round (must be equal to or higher the dmg stat)
    burnImmune = true/false, makes enemy either immune to burn dmg or not
    burnResist = 0-1, 0.5 = half burn dmg, 1 is basically immunity
    burnVuln = any number higher then 1, 1.5 = 150% burn damage
    burnReflect = amount of burn damage reflected to player
[MIHT ADD]        expDrain = amount is the amount of exp drained
[MIHT ADD]        LVDrain = amount is the amount of LV drained
    */
    
    /*
    Run Enders
    */
    {
        name: "Lux",
        weight: 1,
        // BigInt getters
        get mhp() {
            // Logic: 1,000,000,000 * LV * PlayerMaxHP
            return 1000000000n * p.lv * p.mhp;
        },
        get hp() { return this.mhp; }, // Start at full
        get atk() {
            // Logic: (50,000 * LV * Multiplier) / 100
            return (50000n * p.lv * p.dmgmult) / 100n;
        },
        get san() {
            return p.msn; // Drains total player sanity
        },
        get exp() {
            return -p.exp; // Loses all EXP
        },
        get gold() {
            return -p.gold; // Loses all Gold
        },
        get lifesteal() {
            return 10000n * p.lv * p.mhp;
        },
        burnImmune: true,
        burnReflect: 5, // Can stay Number (used in multiplier logic)
        canSpawn: () => p.lv >= 100n && (p.skills.includes('snowgrave') || p.skills.includes('ralseidualheal')),
        // trait: "The god of this forsaken realm.",
        get speciamMsg() {
            if (p.kills >= 10000n) {
                return LuxLog(`Lux: Over 10,000 lives ended. I must say, you might be a worthy opponent.`)
            } else if (p.sparedenemies >= 10000n) {
                return LuxLog(`Lux: Over 10,000 lives spared. I must say, you are... quite kind. And that will be your downfall.`)
            }
        }
    },
    {
        name: "Kitsune",
        weight: 2,
        get mhp() {
            // Logic: (LV / 1.25) is same as (LV * 80 / 100)
            let scaledLV = (p.lv * 80n) / 100n;
            return 1000000n * scaledLV;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 80n) / 100n;
            return 5000n * scaledLV;
        },
        get san() {
            let scaledLV = (p.lv * 80n) / 100n;
            return 5000n * scaledLV;
        },
        get exp() {
            let scaledLV = (p.lv * 80n) / 100n;
            return -(10000n * scaledLV);
        },
        get gold() {
            let scaledLV = (p.lv * 80n) / 100n;
            return -(10000n * scaledLV);
        },
        get lifesteal() {
            // Logic: LV / 2
            return 1000n * (p.lv / 2n);
        },
        burnResist: 0.9, // Stays Number (handled by multiplier math in enemyTurn)
        burnReflect: 1,
        canSpawn: () => p.lv >= 50n && p.skills.includes('eldritchblast'),
        trait: "Lux's Minion",
        specialMsg: "Kitsune: If you kill me, my god will kill you."
    },

    /*
    World Bosses
    */
    {
        name: "Azmodan",
        weight: 5,
        get mhp() {
            // Logic: 10000 * (LV / 2)
            // BigInt division (/) automatically floors the result
            return 10000n * (p.lv / 2n);
        },
        get hp() {
            return this.mhp;
        },
        get atk() {
            return 240n * (p.lv / 2n);
        },
        get san() {
            return 50n * (p.lv / 2n);
        },
        get exp() {
            return 1200n * (p.lv / 2n);
        },
        get gold() {
            return 32000n * (p.lv / 2n);
        },
        get lifesteal() {
            return 500n * (p.lv / 2n);
        },
        // Use BigInt literal (30n) for the level check
        canSpawn: () => p.lv >= 30n && p.skills.includes('eldritchblast'),
        trait: "World boss",
        specialMsg: "Azmodan: This world will burn by Lux's hand and I will make sure it does."
    },
    /*
    Bosses
    */
        {
        name: "Obsidian Golem",
        weight: 10,
        get mhp() {
            // Logic: 1.5 is 3/2. Dividing by 1.5 is multiplying by 2 and dividing by 3.
            let scaledLV = (p.lv * 2n) / 3n;
            return 1500n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 160n + (scaledLV * 160n);
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 20n + (scaledLV * 20n);
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 800n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 640n + (scaledLV * 640n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 20n,
        trait: "Boss"
    },
    {
        name: "Duriel",
        weight: 10,
        get mhp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 1300n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 150n + (scaledLV * 150n);
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 30n + (scaledLV * 30n);
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 800n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 640n + (scaledLV * 640n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 20n,
        trait: "Boss"
    },
    {
        name: "Will o' Wisp",
        weight: 10,
        get mhp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 2500n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 120n + (scaledLV * 120n);
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 60n + (scaledLV * 60n);
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 800n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 640n + (scaledLV * 640n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 20n,
        trait: "Boss",
        specialMsg: `Ever heard of "Lux"? Heard he's quite a nice guy!`
    },
    {
        name: "Fiery Will O' Wisp",
        weight: 5,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 200n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 240n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 120n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 640n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 800n; 
        },
        lifesteal: 0n,
        burnImmune: true,
        burnReflect: 1,
        canSpawn: () => p.lv >= 30n,
        trait: "Boss",
        specialMsg: "Fiery Will O' Wisp: Have you met my brother yet?"
    },

    /*
    Mini-Bosses
    */
        {
        name: "Diamond Golem",
        weight: 20,
        get mhp() {
            // Logic: LV / 1.5 is represented as (LV * 2) / 3
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Mini-Boss"
    },
    {
        name: "Iron-Plated Diamond Golem",
        weight: 20,
        get mhp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 1200n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 160n;
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 20n;
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 800n;
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 640n;
        },
        burnResist: 0.5, // Numbers used for multipliers like this are safe as long as the logic handles them
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Mini-Boss"
    },
    {
        name: "Mana Draining Wisp",
        weight: 20,
        get mhp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        get manaDrain() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 200n;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Mana Draining Mini-Boss"
    },
    /*
    Elementals
    */
        {
        name: "Fire Elemental",
        weight: 20,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        burnImmune: true,
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental"
    },
    {
        name: "Air Elemental",
        weight: 20,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        burnResist: 0.5, // Note: burnResist is used as a Number in our enemyTurn logic
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental"
    },
    {   
        name: "Water Elemental",
        weight: 20,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        burnResist: 0.2,
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental"
    },
    {
        name: "Earth Elemental",
        weight: 20,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental"
    },  
    {
        name: "Ice Elemental",
        weight: 20,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        burnVuln: 1.5,
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental"
    },
    /*
    Lifesteal Enemies
    */
        {
        name: "Blood Bat",
        weight: 40,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 50n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 11n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 5n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 30n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 25n; 
        },
        get lifesteal() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 5n; 
        },
        canSpawn: () => p.skills.includes('fireball'),
        trait: "Regenerates a small amount of HP per turn"
    },
    {
        name: "Vampire",
        weight: 30,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n; 
        },
        get lifesteal() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 15n;
        },
        canSpawn: () => p.skills.includes('fireball') && p.lv >= 30n,
        trait: "Regenerates a moderate amount of HP per turn",
        specialMsg: "Vampire: Don't worry, it won't hurt."
    },
    {
        name: "Vampire Lord",
        weight: 12,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 450n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 99n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 45n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 270n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 225n; 
        },
        get lifesteal() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return 90n + (scaledLV * 45n);
        },
        canSpawn: () => p.skills.includes('fireball') && p.lv >= 40n,
        trait: "Regenerates a large amount of HP per turn",
        specialMsg: "Vampire Lord: Okay it might hurt a little bit..."
    },
    {
        name: "Vampire King",
        weight: 6,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 900n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 198n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 90n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 540n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 450n; 
        },
        get lifesteal() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 90n;
        },
        canSpawn: () => p.skills.includes('fireball') && p.lv >= 50n,
        trait: "Regenerates a very large amount of HP per turn",
        specialMsg: "Vampire King: There is only one entity I fear. That entity being Lux."
    },
    /*
    Sanity Drain Enemies
    */
        {
        name: "Gloom Weaver",
        weight: 35,
        get mhp() { 
            // Replacement for Math.max(1, floor(lv / 1.5))
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n; 
            return scaledLV * 55n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 10n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 18n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 45n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 35n; 
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "Sanity Drainer",
        specialMsg: "Gloom Weaver: Nightmare may stalk you..."
    },
    {
        name: "Void Stalker",
        weight: 25,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 90n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 15n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 25n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 60n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 50n; 
        },
        lifesteal: 0n,
        // BigInt comparisons: 5n and 150n
        canSpawn: () => p.lv >= 5n || p.msn >= 150n,
        trait: "Elite Sanity Predator",
        specialMsg: "Void Stalker: ...but Lux stalks us all."
    },
    /*
    Glass Cannons
    */
        {
        name: "Glass Cannon the I",
        weight: 3,
        hp: 12n, mhp: 12n,
        atk: 1000000000n, san: 1000000000n,
        exp: 10n, gold: 5n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => true,
        specialMsg: "Glass Cannon the I: Hello!"
    },
    {
        name: "Glass Cannon the II",
        weight: 2,
        hp: 24n, mhp: 24n,
        atk: 10000000000n, san: 10000000000n,
        exp: 20n, gold: 10n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball'),
        specialMsg: "Glass Cannon the II: Have you seen Glass Cannon the I yet? He made a bet with me yesterday and lost."
    },
    {
        name: "Glass Cannon the III",
        weight: 1,
        hp: 36n, mhp: 36n,
        atk: 100000000000n, san: 100000000000n,
        exp: 30n, gold: 15n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        // BigInt comparison (2n)
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 2n,
        specialMsg: "Glass Cannon the III: Did you kill Glass Cannon the II yet? He owes me 20 gold from yesterday."
    },
    {
        name: "Glass Cannon the IV",
        weight: 1,
        hp: 48n, mhp: 48n,
        atk: 1000000000000n, san: 1000000000000n,
        exp: 40n, gold: 20n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 6n,
        specialMsg: "Glass Cannon the IV: Heard of my brother Glass Cannon the V? He's never afraid of anything. Well except one thing..."
    },
    {
        name: "Glass Cannon the V",
        weight: 1,
        hp: 60n, mhp: 60n,
        atk: 10000000000000n, san: 10000000000000n,
        exp: 50n, gold: 25n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 10n,
        specialMsg: "Glass Cannon the V: Haha, you finally made it... but Lux still laughs at us all."
    },
    /*
    Normal Enemies
    */
        {
        name: "Shadow Imp",
        weight: 60,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n; // Math.max(1, ...)
            return scaledLV * 45n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 9n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 20n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 15n; 
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "Normal enemy"
    },
    {
        name: "Armored Beetle",
        weight: 55,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 80n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 6n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 35n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 20n; 
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "High HP, however Low ATK"
    },
    {
        name: "Drow Elf",
        weight: 53,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 90n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 25n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 5n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 70n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 150n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.skills.includes('thunderbolt'),
        trait: "Hates regular elves",
        specialMsg: "Drow Elf: We Drow Elves only bow to one god. That one being the creator of this realm."
    },
    {
        name: "Elf",
        weight: 59,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 15n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 35n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 70n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.skills.includes('thunderbolt'),
        trait: "Hates Drow elves",
        specialMsg: `Elf: We find Drow Elves goofy in a way that they fear a so called "god". He certainly can't be real... right?`
    },
    {
        name: "Stone Golem",
        weight: 50,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 150n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 20n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 100n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 5n,
        trait: "Slow Titan"
    },
    {
        name: "Iron Golem",
        weight: 40,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 300n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 40n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 5n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 200n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 160n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 7n,
        trait: "Slow Titan"
    }
];
