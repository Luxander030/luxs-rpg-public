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
        name: "Obsidian Golem",
        killKey: "obsidianGolem",
        weight: 10,
        get mhp() {
            // Logic: 1.5 is 3/2. Dividing by 1.5 is multiplying by 2 and dividing by 3.
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1500n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 160n + (scaledLV * 160n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 20n + (scaledLV * 20n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 640n + (scaledLV * 640n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 20n,
        trait: "Boss",
        drop: () => "Diamond",
    },
    {
        name: "Gem Golem",
        killKey: "gemGolem",
        weight: 10,
        get mhp() {
            // Logic: 1.5 is 3/2. Dividing by 1.5 is multiplying by 2 and dividing by 3.
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 1500n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 160n + (scaledLV * 160n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 20n + (scaledLV * 20n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 640n + (scaledLV * 640n);
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
            return 1300n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 150n + (scaledLV * 150n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 30n + (scaledLV * 30n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 640n + (scaledLV * 640n);
        },
        lifesteal: 0n,
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
            return 2500n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 120n + (scaledLV * 120n);
        },
        get san() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 60n + (scaledLV * 60n);
        },
        get exp() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 800n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 640n + (scaledLV * 640n);
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
            return scaledLV * 200n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 240n;
        },
        get san() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 120n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 640n; 
        },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 800n; 
        },
        lifesteal: 0n,
        burnImmune: true,
        burnReflect: 1,
        canSpawn: () => p.lv >= 30n,
        trait: "Boss",
        specialMsg: "Fiery Will O' Wisp: Have you met my brother yet? In case you do, don't trust what he says. He can be... oblivious.",
        drop: () => "The Lovers (6)",
    },
)