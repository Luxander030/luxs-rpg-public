enemies.push(

    {
        name: "Shadow Imp",
        killKey: "shadowImp",
        weight: 60,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 50n + (scaledLV * 60n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 10n + (scaledLV * 12n);
        },
        get san() { return 0n; },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 20n + (scaledLV * 25n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 15n + (scaledLV * 18n);
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "Normal Enemy",
        drop: () => "Black Shard",
    },

    {
        name: "Armored Beetle",
        killKey: "armoredBeetle",
        weight: 55,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 150n + (scaledLV * 120n); // Still the high HP low ATK enemy
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 8n + (scaledLV * 8n); // Still low ATK
        },
        get san() { return 0n; },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 35n + (scaledLV * 40n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 20n + (scaledLV * 25n);
        },
        lifesteal: 0n,
        burnResist: 0.4, // Shell provides some fire resistance
        canSpawn: () => true,
        trait: "High HP, Low ATK",
        drop: () => "Armored Carapace",
    },

    {
        name: "Drow Elf",
        killKey: "drowElf",
        weight: 53,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 80n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 30n + (scaledLV * 35n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 5n + (scaledLV * 8n); // Drow magic messes with your mind a little
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 70n + (scaledLV * 80n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 150n + (scaledLV * 160n); // Still the gold-rich enemy
        },
        lifesteal: 0n,
        canSpawn: () => p.skills.includes('thunderbolt') || (
            p.class === 'stormmancer' && p.lv >= 5n
        ),
        trait: "Hates Regular Elves",
        specialMsg: "Drow Elf: We Drow Elves only bow to one god. That one being the creator of this realm.",
        drop: () => "Drow Elf Ear",
    },

    {
        name: "Elf",
        killKey: "elf",
        weight: 59,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 80n + (scaledLV * 90n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 20n + (scaledLV * 20n);
        },
        get san() { return 0n; },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 35n + (scaledLV * 40n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 70n + (scaledLV * 80n);
        },
        lifesteal: 0n,
        canSpawn: () => p.skills.includes('thunderbolt') || (
            p.class === 'stormmancer' && p.lv >= 5n
        ),
        trait: "Hates Drow Elves",
        specialMsg: `Elf: We find Drow Elves goofy in a way that they fear a so called "god". He certainly can't be real... right?`,
        drop: () => "Elf Ear",
    },

    {
        name: "Stone Golem",
        killKey: "stoneGolem",
        weight: 50,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 300n + (scaledLV * 200n); // Tanky but not overwhelming
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 25n + (scaledLV * 28n);
        },
        get san() { return 0n; },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 100n + (scaledLV * 110n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 80n + (scaledLV * 90n);
        },
        lifesteal: 0n,
        burnResist: 0.6, // Stone doesn't burn easily
        canSpawn: () => p.lv >= 5n,
        trait: "Slow Titan",
        drop: () => "Rock",
    },

    {
        name: "Iron Golem",
        killKey: "ironGolem",
        weight: 40,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 600n + (scaledLV * 400n); // Tankier than Stone Golem
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 50n + (scaledLV * 55n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 5n + (scaledLV * 5n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 200n + (scaledLV * 220n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 160n + (scaledLV * 180n);
        },
        lifesteal: 0n,
        burnResist: 0.7, // Iron conducts heat but doesn't burn
        canSpawn: () => p.lv >= 7n,
        trait: "Slow Titan",
        drop: () => "Chunk of Iron",
    },

);