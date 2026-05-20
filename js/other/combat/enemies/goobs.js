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
        name: "Bob",
        killKey: "bob",
        weight: 0.001,
        // BigInt getters
        get mhp() {
            // Logic: 1,000,000,000 * LV * PlayerMaxHP
            return 1000000000000n * p.lv * p.mhp;
        },
        get hp() { return this.mhp; }, // Start at full
        get atk() {
            // Logic: (5,000,000 * LV * Multiplier) / 100
            return (5000000n * p.lv * p.dmgmult) / 100n;
        },
        get san() {
            return p.msn; // Drains total player sanity (doesn't care about negatives)
        },
        get exp() {
            return -p.exp; // Loses all EXP, but not LV
        },
        get gold() {
            return -p.gold; // Loses all Gold
        },
        get lifesteal() {
            return 100000n * p.lv * p.mhp;
        },
        burnImmune: true,
        burnReflect: 100, // Can stay Number (used in multiplier logic)
        canSpawn: () => p.lv >= 100n && (p.skills.includes('snowgrave') && p.skills.includes('ralseidualheal')),
        specialMsg: "Bob: Meep.",
        drop: () => Math.random() < 0.5 ? "Bob's Bread" : "Bob's Cardboard Box",
    },
    {
        name: "Gerald",
        killKey: "gerald",
        weight: 0.00001,
        // BigInt getters
        get mhp() {
            return 1n;
        },
        get hp() {
            return 1n;
        },
        get atk() {
            return -1n;
        },
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
        canSpawn: () => p.lv >= 100n && (p.skills.includes('fryingPan') && p.skills.includes('ralseidualheal')),
        specialMsg: "Gerald: *rock noises*",
        drop: () => null
    },
)