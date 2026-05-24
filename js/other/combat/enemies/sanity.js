enemies.push(

    {
        name: "Gloom Weaver",
        killKey: "gloomWeaver",
        weight: 35,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 60n + (scaledLV * 70n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 12n + (scaledLV * 14n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 20n + (scaledLV * 22n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 45n + (scaledLV * 50n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 35n + (scaledLV * 40n);
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "Sanity Drainer",
        specialMsg: "Gloom Weaver: Nightmare may stalk you...",
        drop: () => "Black Shard",
    },

    {
        name: "Void Stalker",
        killKey: "voidStalker",
        weight: 25,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 100n + (scaledLV * 110n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 18n + (scaledLV * 20n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 28n + (scaledLV * 30n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 60n + (scaledLV * 70n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 50n + (scaledLV * 60n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 5n || p.msn >= 150n,
        trait: "Elite Sanity Predator",
        specialMsg: "Void Stalker: ...but Lux stalks us all.",
        drop: () => "Black Shard",
    },

    {
        name: "Nightmare Shade",
        killKey: "nightmareShade",
        weight: 20,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 120n + (scaledLV * 130n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 20n + (scaledLV * 22n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 35n + (scaledLV * 38n); // Highest sanity drain of the three
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 80n + (scaledLV * 90n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 60n + (scaledLV * 70n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 8n || p.msn >= 200n,
        trait: "Elite Sanity Predator",
        specialMsg: "Nightmare Shade: Your mind is a feast.",
        drop: () => "Black Shard",
    },

    {
        name: "Dread Phantom",
        killKey: "dreadPhantom",
        weight: 18,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 150n + (scaledLV * 160n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 25n + (scaledLV * 28n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 40n + (scaledLV * 45n);
        },
        get manaDrain() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 20n + (scaledLV * 25n); // Also drains a little mana
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 100n + (scaledLV * 110n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 80n + (scaledLV * 90n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 12n,
        trait: "Sanity and Mana Drainer",
        specialMsg: "Dread Phantom: I will hollow you out.",
        drop: () => "Black Shard",
    },

    {
        name: "Abyssal Watcher",
        killKey: "abyssalWatcher",
        weight: 12,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 200n + (scaledLV * 220n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 30n + (scaledLV * 35n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 50n + (scaledLV * 55n); // Nastiest sanity drain of all normal enemies
        },
        get manaDrain() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 30n + (scaledLV * 35n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 150n + (scaledLV * 160n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 100n + (scaledLV * 120n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 18n,
        trait: "Apex Sanity Predator",
        specialMsg: "Abyssal Watcher: I have watched you since the beginning. You cannot hide from the abyss.",
        drop: () => "Black Shard",
    },

);