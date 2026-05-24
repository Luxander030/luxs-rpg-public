enemies.push(

    {
        name: "Sloth",
        killKey: "sloth",
        weight: 3,
        slothSin: true,
        demonType: true,
        get mhp() {
            return 1000000000n * p.lv * p.mhp;
        },
        get hp() { return this.mhp; },
        get atk() {
            return 1n; // Always 1 ATK — Sloth can't be bothered to hit hard
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
        burnImmune: true,
        freezeImmune: true,
        poisonImmune: true,
        stunImmune: true, // Sloth is already slow, stunning does nothing
        canSpawn: () => p.lv >= 50n,
        trait: "Sin of Sloth",
        specialMsg: "Sloth: ...I'll get to killing you... eventually.",
        drop: () => null,
    },

    {
        name: "Wrath",
        killKey: "wrath",
        weight: 3,
        wrathSin: true,
        demonType: true,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 5000n + (scaledLV * 6000n);
        },
        get hp() { return this.mhp; },
        get atk() {
            return BigMath.max(1n, p.kills * p.lv); // More damage the more you've killed
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
        burnImmune: true, // Wrath IS fire
        demonType: true,
        canSpawn: () => p.lv >= 50n && p.kills >= 100n,
        trait: "Sin of Wrath",
        specialMsg: "Wrath: Every soul you've taken... I've been feeding off of them.",
        drop: () => "The Devil (15)",
    },

    {
        name: "Greed",
        killKey: "greed",
        weight: 3,
        greedSin: true,
        demonType: true,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 5000n + (scaledLV * 6000n);
        },
        get hp() { return this.mhp; },
        get atk() {
            return BigMath.max(1n, p.totalGold / 2n); // Damage equal to half of total gold earned
        },
        get san() {
            return 20n * p.lv;
        },
        get exp() {
            return 10000n * p.lv;
        },
        get gold() {
            return 10000n * p.lv;
        },
        lifesteal: 0n,
        demonType: true,
        canSpawn: () => p.lv >= 50n && p.totalGold >= 1000n,
        trait: "Sin of Greed",
        specialMsg: "Greed: You have so much... and yet you still want more. We are not so different.",
        drop: () => "The Devil (15)",
    },

    {
        name: "Gluttony",
        killKey: "gluttony",
        weight: 3,
        gluttonySin: true,
        demonType: true,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 5000n + (scaledLV * 6000n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 200n + (scaledLV * 220n);
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
        demonType: true,
        canSpawn: () => p.lv >= 50n,
        trait: "Sin of Gluttony",
        specialMsg: "Gluttony: I'm so hungry... and your inventory looks delicious.",
        drop: () => "The Devil (15)",
    },

    {
        name: "Envy",
        killKey: "envy",
        weight: 3,
        envySin: true,
        demonType: true,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 5000n + (scaledLV * 6000n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let uniqueSpells = BigInt(p.skills.length);
            return BigMath.max(1n, uniqueSpells * 500n * p.lv); // More spells = more damage
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
        demonType: true,
        canSpawn: () => p.lv >= 50n && p.skills.length >= 3,
        trait: "Sin of Envy",
        specialMsg: "Envy: You have so many abilities... I want them. All of them.",
        drop: () => "The Devil (15)",
    },

    {
        name: "Pride",
        killKey: "pride",
        weight: 3,
        prideSin: true,
        demonType: true,
        get mhp() {
            return p.mhp * 2n; // Mirrors player max HP * 2
        },
        get hp() { return this.mhp; },
        get atk() {
            return (p.dmgmult * 2n * p.lv) / 100n; // Mirrors player damage
        },
        get san() {
            // Randomly drains 50% or 75% of max sanity
            if (Math.random() < 0.5) {
                return p.msn / 2n;
            } else {
                return (p.msn / 4n) * 3n;
            }
        },
        get exp() {
            return 10000n * p.lv;
        },
        get gold() {
            return 10000n * p.lv;
        },
        lifesteal: 0n,
        demonType: true,
        stunImmune: true, // Pride cannot be humbled
        canSpawn: () => p.lv >= 50n,
        trait: "Sin of Pride",
        specialMsg: "Pride: You think you're strong? I am simply... better.",
        drop: () => "The Devil (15)",
    },

    {
        name: "Lust",
        killKey: "lust",
        weight: 3,
        lustSin: true,
        demonType: true,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 5000n + (scaledLV * 6000n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 150n + (scaledLV * 170n);
        },
        get san() {
            return BigMath.max(1n, (p.sn * 50n) / 100n); // Drains 50% of current sanity
        },
        get exp() {
            return 10000n * p.lv;
        },
        get gold() {
            return 10000n * p.lv;
        },
        lifesteal: 0n,
        demonType: true,
        canSpawn: () => p.lv >= 50n,
        trait: "Sin of Lust",
        specialMsg: "Lust: Don't resist. It only makes it worse.",
        drop: () => "The Devil (15)",
    },

);