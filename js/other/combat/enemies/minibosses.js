enemies.push(

    {
        name: "Diamond Golem",
        killKey: "diamondGolem",
        weight: 20,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 3000n + (scaledLV * 900n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 200n + (scaledLV * 180n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 15n + (scaledLV * 15n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1000n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 700n);
        },
        lifesteal: 0n,
        burnResist: 0.8, // Diamond doesn't burn easily
        canSpawn: () => p.lv >= 15n,
        trait: "Mini-Boss",
        drop: () => "Diamond",
    },

    {
        name: "Iron-Plated Diamond Golem",
        killKey: "ironPlatedDiamondGolem",
        weight: 15, // Slightly rarer than Diamond Golem
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 6000n + (scaledLV * 1800n); // Roughly double Diamond Golem
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 400n + (scaledLV * 360n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 25n + (scaledLV * 25n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 2000n + (scaledLV * 1600n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1600n + (scaledLV * 1400n);
        },
        lifesteal: 0n,
        burnResist: 0.5, // Iron plating reduces burn damage
        burnImmune: false,
        canSpawn: () => p.lv >= 20n, // Slightly higher level requirement than Diamond Golem
        trait: "Mini-Boss",
        drop: () => "Diamond",
    },

    {
        name: "Mana Draining Wisp",
        killKey: "manaDrainingWisp",
        weight: 20,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 2500n + (scaledLV * 800n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 150n + (scaledLV * 130n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 30n + (scaledLV * 30n); // Draining your mana also messes with your mind
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1000n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 700n);
        },
        get manaDrain() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 300n + (scaledLV * 250n); // More aggressive mana drain
        },
        lifesteal: 0n,
        burnResist: 0.3, // Wisps are partially ethereal
        canSpawn: () => p.lv >= 15n,
        trait: "Mana Draining Mini-Boss",
        drop: () => "The Lovers (6)",
    },

);