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
        name: "Sloth",
        killKey: "sloth",
        weight: 3,
        slothSin: 1n,
        get mhp() {
            return 1000000000n * p.lv * p.mhp;
        },
        get hp() { return this.mhp; },
        get atk() {
            return 1n; // Always 1 ATK
        },
        get san() {
            return 10n * p.lv;
        },
        get exp() {
            return 10000n * p.lv;
        },
        get gold() {
            return 10000n * p.lv;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 50n,
        trait: "Sin of Sloth",
        specialMsg: "Sloth: ...I'll get to killing you... eventually.",
        drop: () => null,
    },

    {
        name: "Wrath",
        killKey: "wrath",
        weight: 3,
        wrathSin: 1n,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 5000n;
        },
        get hp() { return this.mhp; },
        get atk() {
            // More damage the higher p.kills is
            return BigMath.max(1n, p.kills * p.lv);
        },
        get san() {
            return 50n * p.lv;
        },
        get exp() {
            return 10000n * p.lv;
        },
        get gold() {
            return 10000n * p.lv;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 50n && p.kills >= 100n,
        trait: "Sin of Wrath",
        specialMsg: "Wrath: Every soul you've taken... I've been feeding off of them.",
        drop: () => "The Devil (15)",
    },

    {
        name: "Greed",
        killKey: "greed",
        weight: 3,
        greedSin: 1n,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 5000n;
        },
        get hp() { return this.mhp; },
        get atk() {
            // Damage equal to half of p.totalGold
            return BigMath.max(1n, p.totalGold / 2n);
        },
        get san() {
            return 20n * p.lv;
        },
        get exp() {
            return 10000n * p.lv;
        },
        get gold() {
            // Drains gold on hit — handle the actual drain in combat logic
            return 10000n * p.lv;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 50n && p.totalGold >= 1000n,
        trait: "Sin of Greed",
        specialMsg: "Greed: You have so much... and yet you still want more. We are not so different.",
        drop: () => "The Devil (15)",
    },

    {
        name: "Gluttony",
        killKey: "gluttony",
        weight: 3,
        gluttonySin: 1n,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 5000n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 200n;
        },
        get san() {
            return 30n * p.lv;
        },
        get exp() {
            return 10000n * p.lv;
        },
        get gold() {
            return 10000n * p.lv;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 50n,
        trait: "Sin of Gluttony",
        specialMsg: "Gluttony: I'm so hungry... and your inventory looks delicious.",
        drop: () => "The Devil (15)",
    },

    {
        name: "Envy",
        killKey: "envy",
        weight: 3,
        envySin: 1n,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 5000n;
        },
        get hp() { return this.mhp; },
        get atk() {
            // More damage the more unique spells the player has
            let uniqueSpells = BigInt(p.skills.length);
            return BigMath.max(1n, uniqueSpells * 500n * p.lv);
        },
        get san() {
            return 40n * p.lv;
        },
        get exp() {
            return 10000n * p.lv;
        },
        get gold() {
            return 10000n * p.lv;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 50n && p.skills.length >= 3,
        trait: "Sin of Envy",
        specialMsg: "Envy: You have so many abilities... I want them. All of them.",
        drop: () => "The Devil (15)",
    },

    {
        name: "Pride",
        killKey: "pride",
        weight: 3,
        prideSin: 1n,
        get mhp() {
            // Mirrors player stats * 2
            return p.mhp * 2n;
        },
        get hp() { return this.mhp; },
        get atk() {
            return (p.dmgmult * 2n * p.lv) / 100n;
        },
        get san() {
            if (Math.random() < 0.5) {
                return p.msn / 2n;
            } else {
                let quarter = p.msn / 4n;
                return quarter * 3n
            }
        },
        get exp() {
            return 10000n * p.lv;
        },
        get gold() {
            return 10000n * p.lv;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 50n,
        trait: "Sin of Pride",
        specialMsg: "Pride: You think you're strong? I am simply... better.",
        drop: () => "The Devil (15)",
    },

    {
        name: "Lust",
        killKey: "lust",
        weight: 3,
        lustSin: 1n,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 5000n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 150n;
        },
        get san() {
            // Drains 50-75% of current sanity — handle exact % in combat logic
            return BigMath.max(1n, (p.sn * 50n) / 100n);
        },
        get exp() {
            return 10000n * p.lv;
        },
        get gold() {
            return 10000n * p.lv;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 50n,
        trait: "Sin of Lust",
        specialMsg: "Lust: Don't resist. It only makes it worse.",
        drop: () => "The Devil (15)",
    }
)