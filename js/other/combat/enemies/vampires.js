enemies.push(
    {
        name: "Blood Bat",
        killKey: "bloodBat",
        weight: 40,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 50n + (scaledLV * 65n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 12n + (scaledLV * 14n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 5n + (scaledLV * 6n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 30n + (scaledLV * 35n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 25n + (scaledLV * 28n);
        },
        get lifesteal() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 5n + (scaledLV * 6n);
        },
        burnVuln: 2.0,
        canSpawn: () =>
            p.skills.includes('shootingStars') ||  // Astral Mage
            p.skills.includes('static') ||         // Stormmancer
            p.skills.includes('leafSpiral') ||     // Druid
            p.skills.includes('flameTwitch') ||    // Flamemancer
            p.skills.includes('chillSplinter') ||  // Cryomancer
            p.skills.includes('soak3') ||          // Watermancer
            p.skills.includes('shadow') ||         // Shadow
            p.skills.includes('cosmicBlessing'),   // Neutral
        trait: "Regenerates a Small Amount of HP per Turn",
        drop: () => "Blood Bat Eye",
    },

    {
        name: "Vampire",
        killKey: "vampire",
        weight: 30,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 700n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 100n + (scaledLV * 100n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 15n + (scaledLV * 15n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 400n + (scaledLV * 420n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 320n + (scaledLV * 340n);
        },
        get lifesteal() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 80n + (scaledLV * 80n);
        },
        burnVuln: 1.5,
        canSpawn: () => p.lv >= 30n && (
            p.skills.includes('stellarRift') ||    // Astral Mage
            p.skills.includes('blowout') ||        // Stormmancer
            p.skills.includes('naturesFury') ||    // Druid
            p.skills.includes('fireBarrage') ||    // Flamemancer
            p.skills.includes('frostPrison') ||    // Cryomancer
            p.skills.includes('createRiver') ||    // Watermancer
            p.skills.includes('fingerofdeath') ||  // Shadow
            p.skills.includes('cosmicRoulette')    // Neutral
        ),
        trait: "Regenerates a Moderate Amount of HP per Turn",
        specialMsg: "Vampire: Don't worry, it won't hurt.",
        drop: () => "Vampire Tooth",
    },

    {
        name: "Vampire Lord",
        killKey: "vampireLord",
        weight: 12,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 2000n + (scaledLV * 1400n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 250n + (scaledLV * 220n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 50n + (scaledLV * 55n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 820n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 600n + (scaledLV * 620n);
        },
        get lifesteal() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 200n + (scaledLV * 180n);
        },
        burnVuln: 1.5,
        canSpawn: () => p.lv >= 40n && (
            p.skills.includes('comet') ||          // Astral Mage
            p.skills.includes('ionCannon') ||      // Stormmancer
            p.skills.includes('poisonSpray') ||    // Druid
            p.skills.includes('conflagration') ||  // Flamemancer
            p.skills.includes('iceshock') ||       // Cryomancer
            p.skills.includes('createRiver') ||    // Watermancer
            p.skills.includes('snowgraveShadow') ||// Shadow
            p.skills.includes('theLastWord')       // Neutral
        ),
        trait: "Regenerates a Large Amount of HP per Turn",
        specialMsg: "Vampire Lord: Okay it might hurt a little bit...",
        drop: () => "Vampire Tooth",
    },

    {
        name: "Vampire King",
        killKey: "vampireKing",
        weight: 6,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 5000n + (scaledLV * 2800n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 600n + (scaledLV * 500n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 100n + (scaledLV * 110n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1500n + (scaledLV * 1600n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1200n + (scaledLV * 1200n);
        },
        get lifesteal() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 500n + (scaledLV * 450n);
        },
        burnVuln: 1.5,
        canSpawn: () => p.lv >= 50n && (
            p.skills.includes('eldritchblast') ||  // Astral Mage
            p.skills.includes('thunderbolt') ||    // Stormmancer
            p.skills.includes('ralseidualheal') || // Druid
            p.skills.includes('conflagration') ||  // Flamemancer
            p.skills.includes('snowgrave') ||      // Cryomancer
            p.skills.includes('createRiver') ||    // Watermancer
            p.skills.includes('snowgraveShadow') ||// Shadow
            p.skills.includes('theLastWord')       // Neutral
        ),
        trait: "Regenerates a Very Large Amount of HP per Turn",
        specialMsg: "Vampire King: There is only one entity I fear. That entity being Lux.",
        drop: () => "Vampire Tooth",
    },
);