enemies.push(

    {
        name: "Obsidian Golem",
        killKey: "obsidianGolem",
        weight: 10,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 8000n + (scaledLV * 500n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 300n + (scaledLV * 280n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 25n + (scaledLV * 25n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 2000n + (scaledLV * 1500n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1500n + (scaledLV * 1200n);
        },
        lifesteal: 0n,
        burnImmune: true, // It's made of obsidian, fire does nothing
        canSpawn: () => p.lv >= 20n,
        trait: "Boss",
        drop: () => "Diamond",
    },

    {
        name: "Gem Golem",
        killKey: "gemGolem",
        weight: 10,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 7000n + (scaledLV * 450n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 280n + (scaledLV * 260n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 20n + (scaledLV * 20n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 2000n + (scaledLV * 1500n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1800n + (scaledLV * 1400n); // Gem golem drops more gold
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 20n,
        trait: "Boss",
        drop: () => "Diamond",
    },

    {
        name: "Duriel",
        killKey: "duriel",
        weight: 10,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 9000n + (scaledLV * 600n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 350n + (scaledLV * 300n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 40n + (scaledLV * 40n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 2500n + (scaledLV * 2000n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1500n + (scaledLV * 1200n);
        },
        lifesteal: 0n,
        demonType: true, // Shadow spells deal less damage
        canSpawn: () => p.lv >= 20n,
        trait: "Boss",
        drop: () => "The Devil (15)",
    },

    {
        name: "Will O' Wisp",
        killKey: "willOWisp",
        weight: 10,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 6000n + (scaledLV * 400n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 200n + (scaledLV * 180n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 80n + (scaledLV * 80n); // High sanity drain — it messes with your mind
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 2000n + (scaledLV * 1500n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1500n + (scaledLV * 1200n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 20n,
        trait: "Boss",
        specialMsg: `Ever heard of "Lux"? Heard he's quite a nice guy!`,
        drop: () => "The Lovers (6)",
    },

    {
        name: "Fiery Will O' Wisp",
        killKey: "fieryWillOWisp",
        weight: 5,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 7000n + (scaledLV * 500n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 400n + (scaledLV * 350n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 60n + (scaledLV * 60n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1800n + (scaledLV * 1400n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 2500n + (scaledLV * 2000n);
        },
        lifesteal: 0n,
        burnImmune: true,
        burnReflect: 1,
        fireType: true, // Watermancer bonus, druid penalty
        canSpawn: () => p.lv >= 30n,
        trait: "Boss",
        specialMsg: "Fiery Will O' Wisp: Have you met my brother yet? In case you do, don't trust what he says. He can be... oblivious.",
        drop: () => "The Lovers (6)",
    },

);