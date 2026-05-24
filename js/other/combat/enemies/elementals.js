enemies.push(

    {
        name: "Fire Elemental",
        killKey: "fireElemental",
        weight: 20,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 2000n + (scaledLV * 800n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 150n + (scaledLV * 120n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 15n + (scaledLV * 15n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 600n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 600n + (scaledLV * 500n);
        },
        lifesteal: 0n,
        burnImmune: true,
        fireType: true, // Watermancer bonus, druid penalty
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental",
        drop: () => "Ash",
    },

    {
        name: "Air Elemental",
        killKey: "airElemental",
        weight: 20,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1500n + (scaledLV * 700n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 120n + (scaledLV * 100n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 20n + (scaledLV * 20n); // Wind messes with your head a little
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 600n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 600n + (scaledLV * 500n);
        },
        lifesteal: 0n,
        burnResist: 0.5, // Hard to burn something that's made of air
        freezeImmune: true, // Can't freeze wind
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental",
        drop: () => null,
    },

    {
        name: "Water Elemental",
        killKey: "waterElemental",
        weight: 20,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1800n + (scaledLV * 750n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 130n + (scaledLV * 110n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 10n + (scaledLV * 10n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 600n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 600n + (scaledLV * 500n);
        },
        lifesteal: 0n,
        burnResist: 0.2,
        freezeImmune: true, // Water elementals control water, ice doesn't affect them
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental",
        drop: () => "Bottle O' Water",
    },

    {
        name: "Earth Elemental",
        killKey: "earthElemental",
        weight: 20,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 3000n + (scaledLV * 900n); // Tankiest elemental — it's made of rock
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 160n + (scaledLV * 140n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 10n + (scaledLV * 10n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 600n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 600n + (scaledLV * 500n);
        },
        lifesteal: 0n,
        burnResist: 0.3, // Rock doesn't burn easily
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental",
        drop: () => "Rock",
    },

    {
        name: "Ice Elemental",
        killKey: "iceElemental",
        weight: 20,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1800n + (scaledLV * 750n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 140n + (scaledLV * 120n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 15n + (scaledLV * 15n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 600n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 600n + (scaledLV * 500n);
        },
        lifesteal: 0n,
        burnVuln: 2.0, // Ice melts fast — increased from 1.5
        freezeImmune: true, // Can't freeze something already made of ice
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental",
        drop: () => null,
    },

);