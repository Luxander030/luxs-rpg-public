enemies.push(
    {
        name: "Bob",
        killKey: "bob",
        weight: 0.001,
        get mhp() {
            return 1000000000000n * p.lv * p.mhp;
        },
        get hp() { return this.mhp; },
        get atk() {
            return (5000000n * p.lv * p.dmgmult) / 100n;
        },
        get san() {
            return p.msn;
        },
        get exp() {
            return -p.exp;
        },
        get gold() {
            return -p.gold;
        },
        get lifesteal() {
            return 100000n * p.lv * p.mhp;
        },
        burnImmune: true,
        burnReflect: 100,
        canSpawn: () => p.lv >= 100n && (
            p.skills.includes('eldritchblast') ||  // Astral Mage
            p.skills.includes('thunderbolt') ||    // Stormmancer
            p.skills.includes('ralseidualheal') || // Druid
            p.skills.includes('conflagration') ||  // Flamemancer
            p.skills.includes('snowgrave') ||      // Cryomancer
            p.skills.includes('createRiver') ||    // Watermancer
            p.skills.includes('snowgraveShadow') ||// Shadow
            p.skills.includes('theLastWord')       // Neutral
        ),
        specialMsg: "Bob: Meep.",
        drop: () => Math.random() < 0.5 ? "Bob's Bread" : "Bob's Cardboard Box",
    },

    {
        name: "Gerald",
        killKey: "gerald",
        weight: 0.00001,
        get mhp() { return 1n; },
        get hp() { return 1n; },
        get atk() { return -1n; },
        get san() {
            return 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n;
        },
        get exp() {
            return 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n;
        },
        get gold() {
            return 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n;
        },
        burnImmune: true,
        freezeImmune: true,
        immortal: true,
        trait: "A Rock | Lux & Luxander's Adopted Son.",
        burnReflect: 100,
        canSpawn: () => p.lv >= 100n && (
            p.skills.includes('eldritchblast') ||  // Astral Mage
            p.skills.includes('thunderbolt') ||    // Stormmancer
            p.skills.includes('ralseidualheal') || // Druid
            p.skills.includes('conflagration') ||  // Flamemancer
            p.skills.includes('snowgrave') ||      // Cryomancer
            p.skills.includes('createRiver') ||    // Watermancer
            p.skills.includes('snowgraveShadow') ||// Shadow
            p.skills.includes('theLastWord')       // Neutral
        ),
        specialMsg: "Gerald: *rock noises*",
        drop: () => null,
    },
);