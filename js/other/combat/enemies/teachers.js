enemies.push(

    {
        name: "Miss Circle",
        killKey: "missCircle",
        weight: 10,
        get mhp() {
            return 2000n + (1200n * p.lv);
        },
        get hp() { return this.mhp; },
        get atk() {
            return 5000n + (21390n * p.lv); // Still hits like a truck
        },
        get san() {
            return 0n;
        },
        get exp() {
            return 1800n + (1800n * p.lv);
        },
        get gold() {
            return 1800n + (1800n * p.lv);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 25n,
        trait: "Has a Drawing Compass for a Forearm",
        specialMsg: "Miss Circle: I hope you've been paying attention. This will hurt.",
        drop: () => "Miss Circle's Oreo Pack",
    },

    {
        name: "Miss Bloomie",
        killKey: "missBloomie",
        weight: 10,
        get mhp() {
            return 2000n + (1200n * p.lv);
        },
        get hp() { return this.mhp; },
        get atk() {
            return 5000n + (21390n * p.lv);
        },
        get san() {
            return 120n + (120n * p.lv); // Sanity drain — her presence is unsettling
        },
        get exp() {
            return 1800n + (1800n * p.lv);
        },
        get gold() {
            return 1800n + (1800n * p.lv);
        },
        lifesteal: 0n,
        burnImmune: true, // Box-cutter arm, she's not afraid of fire
        canSpawn: () => p.lv >= 25n,
        trait: "Has a Box-Cutter for an Arm",
        specialMsg: "Miss Bloomie: You really thought you could win? How adorable.",
        drop: () => null,
    },

    {
        name: "Miss Thavel",
        killKey: "missThavel",
        weight: 10,
        get mhp() {
            return 2000n + (1200n * p.lv);
        },
        get hp() { return this.mhp; },
        get atk() {
            return 5000n + (21390n * p.lv);
        },
        get san() {
            return 120n + (120n * p.lv);
        },
        get lifesteal() {
            return 500n + (120n * p.lv); // Heals more than before
        },
        get exp() {
            return 1800n + (1800n * p.lv);
        },
        get gold() {
            return 1800n + (1800n * p.lv);
        },
        canSpawn: () => p.lv >= 25n,
        trait: "Omnilingual",
        specialMsg: "Miss Thavel: I have spoken every language known to this world. Including the language of pain.",
        drop: () => null,
    },

);