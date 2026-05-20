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
        name: "Diamond Golem",
        killKey: "diamondGolem",
        weight: 20,
        get mhp() {
            // Logic: LV / 1.5 is represented as (LV * 2) / 3
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 80n;
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 10n;
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 400n;
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Mini-Boss",
        drop: () => "Diamond",
    },
    {
        name: "Iron-Plated Diamond Golem",
        killKey: "ironPlatedDiamondGolem",
        weight: 20,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 1200n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 160n;
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 20n;
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 800n;
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 640n;
        },
        burnResist: 0.5, // Numbers used for multipliers like this are safe as long as the logic handles them
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Mini-Boss",
        drop: () => "Diamond",
    },
    {
        name: "Mana Draining Wisp",
        killKey: "manaDrainingWisp",
        weight: 20,
        get mhp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 80n;
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 10n;
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 400n;
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 320n;
        },
        get manaDrain() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 200n;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Mana Draining Mini-Boss",
        drop: () => "The Lovers (6)",
    },
)