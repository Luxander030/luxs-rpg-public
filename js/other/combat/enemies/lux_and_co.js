enemies.push(
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

    */


    {
        name: "Lux",
        killKey: "lux",
        weight: 1,
        // BigInt getters
        get mhp() {
            // Logic: 1,000,000,000 * LV * PlayerMaxHP
            return 1000000000n * p.lv * p.mhp;
        },
        get hp() { return this.mhp; }, // Start at full
        get atk() {
            // Logic: ((50,000 * LV * Multiplier) * total kills) / 100
            return ((50000n * p.lv * p.dmgmult) * (p.kills || 1n) ) / 100n;
        },
        get san() {
            return p.sn; // Drains total player sanity, and stop it from going into the negatives
        },
        get exp() {
            return -p.exp; // Loses all EXP, but not LV
        },
        get gold() {
            return -p.gold; // Loses all Gold
        },
        get lifesteal() {
            return 10000n * p.lv * p.mhp;
        },
        burnImmune: true,
        freezeImmune: true,
        burnReflect: 5, // Can stay Number (used in multiplier logic)
        canSpawn: () => p.lv >= 100n && (p.skills.includes('snowgrave') && p.skills.includes('ralseidualheal')),
        get specialMsg() {
            if (p.kills >= 1000000n) {
                return LuxTypeToLogPissed(`Over a million killed... yet you're still here?`,"#ff0000", 25)
            } else if (p.mhp >= 10000000n && p.mmp >= 10000000n && p.msn >= 100000000n) {
                return LuxLog(`Lux: Plus salutis, plus manae, plus sanitatis. Attamen adhuc plus vis. Miserrimum.`)
            } else if (p.kills >= 100000n) {
                return LuxLog(`Lux: Über 100.000 Leben wurden beendet. Ich muss sagen: Du könntest ein würdiger Gegner sein. Könntest.`)
            } else if (p.sparedenemies >= 100000n) {
                return LuxLog(`Lux: Over 100,000 lives spared. I must say, you are... quite kind. And that will be your downfall.`)
            } else if (p.dmgmult >= 5000n) {
                return LuxLog(`Lux: Finally. Someone truly worthy of seeing my strength in battle.`)
            } else if (p.gold >= 100000000n * p.lv) {
                return LuxLog(`Lux: Greed, greed, and more greed. Yet you still need more.`)
            } else if (p.hp < p.mhp) {
                return LuxLog(`Lux: I see you are harmed. Don't think that will make me hurt you less.`)
            } else {
                return LuxLog(`Lux: Hello there. I've been watching you. ${formatNumber(p.kills)} creatures killed. ${formatNumber(p.sparedenemies)} creatures spared. I wonder... how are you going to do in this fight?`)
            }
        },
        drop: () => "(Spectral Card) Black Hole",
    },
    {
        name: "Kitsune",
        killKey: "kitsune",
        weight: 2,
        get mhp() {
            // Logic: (LV / 1.25) is same as (LV * 80 / 100)
            let scaledLV = (((p.lv * 80n) / 100n) || 1n);
            return 1000000n * scaledLV;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (((p.lv * 80n) / 100n) || 1n);
            return 5000n * scaledLV;
        },
        get san() {
            let scaledLV = (((p.lv * 80n) / 100n) || 1n);
            return 5000n * scaledLV;
        },
        get exp() {
            let scaledLV = (((p.lv * 80n) / 100n) || 1n);
            return -(10000n * scaledLV);
        },
        get gold() {
            let scaledLV = (((p.lv * 80n) / 100n) || 1n);
            return -(10000n * scaledLV);
        },
        get lifesteal() {
            // Logic: LV / 2
            return 1000n * ((p.lv / 2n) || 1n);
        },
        burnResist: 0.9, // Stays Number (handled by multiplier math in enemyTurn)
        burnReflect: 1,
        canSpawn: () => p.lv >= 50n && p.skills.includes('eldritchblast'),
        trait: "Lux's Minion",
        specialMsg: "Kitsune: If you kill me, my god will kill you.",
        drop: () => "(Spectral Card) Soul",
    },
)