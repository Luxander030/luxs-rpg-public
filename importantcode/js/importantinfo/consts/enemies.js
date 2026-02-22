let nextEnemyOverride = null; // Stores the name of the forced enemy
let enemy = null;
const enemies = [
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
    
    /*
    Run Enders
    */
    {
        name: "Lux",
        weight: 1,
        // BigInt getters
        get mhp() {
            // Logic: 1,000,000,000 * LV * PlayerMaxHP
            return 1000000000n * p.lv * p.mhp;
        },
        get hp() { return this.mhp; }, // Start at full
        get atk() {
            // Logic: (50,000 * LV * Multiplier) / 100
            return (50000n * p.lv * p.dmgmult) / 100n;
        },
        get san() {
            return p.sn; // Drains total player sanity, and stop it from going into the negatives
        },
        get exp() {
            return -p.exp; // Loses all EXP
        },
        get gold() {
            return -p.gold; // Loses all Gold
        },
        get lifesteal() {
            return 10000n * p.lv * p.mhp;
        },
        burnImmune: true,
        burnReflect: 5, // Can stay Number (used in multiplier logic)
        canSpawn: () => p.lv >= 100n && (p.skills.includes('snowgrave') && p.skills.includes('ralseidualheal')),
        get specialMsg() {
            if (p.kills >= 100000n) {
                return LuxLog(`Lux: Over 100,000 lives ended. I must say, you might be a worthy opponent. Might.`)
            } else if (p.sparedenemies >= 100000n) {
                return LuxLog(`Lux: Over 100,000 lives spared. I must say, you are... quite kind. And that will be your downfall.`)
            } else if (p.dmgmult >= 500n) {
                LuxLog(`Lux: I see you have figured out how to cause more harm. Interesting. Let's see if it helps you in this fight.`)
            } else if (p.gold >= 1000000n * p.lv) {
                LuxLog(`Lux: Greed, greed, and more greed. Yet you still need more.`)
            } else if (p.hp < p.mhp) {
                LuxLog(`Lux" I see you are harmed. Don't think that will make me hurt you less.`)
            } else {
                LuxLog(`Lux: Hello there. I've been watching you. ${formatNumber(p.kills)} creatures killed. ${formatNumber(p.sparedenemies)} creatures spared. I wonder... how are you going to do in this fight?`)
            }
        }
    },
    {
        name: "Kitsune",
        weight: 2,
        get mhp() {
            // Logic: (LV / 1.25) is same as (LV * 80 / 100)
            let scaledLV = (p.lv * 80n) / 100n;
            return 1000000n * scaledLV;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 80n) / 100n;
            return 5000n * scaledLV;
        },
        get san() {
            let scaledLV = (p.lv * 80n) / 100n;
            return 5000n * scaledLV;
        },
        get exp() {
            let scaledLV = (p.lv * 80n) / 100n;
            return -(10000n * scaledLV);
        },
        get gold() {
            let scaledLV = (p.lv * 80n) / 100n;
            return -(10000n * scaledLV);
        },
        get lifesteal() {
            // Logic: LV / 2
            return 1000n * (p.lv / 2n);
        },
        burnResist: 0.9, // Stays Number (handled by multiplier math in enemyTurn)
        burnReflect: 1,
        canSpawn: () => p.lv >= 50n && p.skills.includes('eldritchblast'),
        trait: "Lux's Minion",
        specialMsg: "Kitsune: If you kill me, my god will kill you."
    },

    /*
    World Bosses
    */
    {
        name: "Azmodan",
        weight: 5,
        get mhp() {
            // Logic: 10000 * (LV / 2)
            // BigInt division (/) automatically floors the result
            return 10000n * (p.lv / 2n);
        },
        get hp() {
            return this.mhp;
        },
        get atk() {
            return 240n * (p.lv / 2n);
        },
        get san() {
            return 50n * (p.lv / 2n);
        },
        get exp() {
            return 1200n * (p.lv / 2n);
        },
        get gold() {
            return 32000n * (p.lv / 2n);
        },
        get lifesteal() {
            return 500n * (p.lv / 2n);
        },
        // Use BigInt literal (30n) for the level check
        canSpawn: () => p.lv >= 30n && p.skills.includes('eldritchblast'),
        trait: "World boss",
        specialMsg: "Azmodan: This world will burn by Lux's hand and I will make sure it does."
    },
    /*
    Bosses
    */
        {
        name: "Obsidian Golem",
        weight: 10,
        get mhp() {
            // Logic: 1.5 is 3/2. Dividing by 1.5 is multiplying by 2 and dividing by 3.
            let scaledLV = (p.lv * 2n) / 3n;
            return 1500n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 160n + (scaledLV * 160n);
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 20n + (scaledLV * 20n);
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 800n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 640n + (scaledLV * 640n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 20n,
        trait: "Boss"
    },
    {
        name: "Duriel",
        weight: 10,
        get mhp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 1300n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 150n + (scaledLV * 150n);
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 30n + (scaledLV * 30n);
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 800n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 640n + (scaledLV * 640n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 20n,
        trait: "Boss"
    },
    {
        name: "Will o' Wisp",
        weight: 10,
        get mhp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 2500n + (scaledLV * 100n);
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 120n + (scaledLV * 120n);
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 60n + (scaledLV * 60n);
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 800n + (scaledLV * 800n);
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return 640n + (scaledLV * 640n);
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 20n,
        trait: "Boss",
        specialMsg: `Ever heard of "Lux"? Heard he's quite a nice guy!`
    },
    {
        name: "Fiery Will O' Wisp",
        weight: 5,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 200n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 240n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 120n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 640n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 800n; 
        },
        lifesteal: 0n,
        burnImmune: true,
        burnReflect: 1,
        canSpawn: () => p.lv >= 30n,
        trait: "Boss",
        specialMsg: "Fiery Will O' Wisp: Have you met my brother yet?"
    },
    /*
    Mini-Bosses
    */
        {
        name: "Diamond Golem",
        weight: 20,
        get mhp() {
            // Logic: LV / 1.5 is represented as (LV * 2) / 3
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Mini-Boss"
    },
    {
        name: "Iron-Plated Diamond Golem",
        weight: 20,
        get mhp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 1200n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 160n;
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 20n;
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 800n;
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 640n;
        },
        burnResist: 0.5, // Numbers used for multipliers like this are safe as long as the logic handles them
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Mini-Boss"
    },
    {
        name: "Mana Draining Wisp",
        weight: 20,
        get mhp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        get manaDrain() {
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 200n;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Mana Draining Mini-Boss"
    },
    /*
    Elementals
    */
        {
        name: "Fire Elemental",
        weight: 20,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        burnImmune: true,
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental"
    },
    {
        name: "Air Elemental",
        weight: 20,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        burnResist: 0.5, // Note: burnResist is used as a Number in our enemyTurn logic
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental"
    },
    {   
        name: "Water Elemental",
        weight: 20,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        burnResist: 0.2,
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental"
    },
    {
        name: "Earth Elemental",
        weight: 20,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental"
    },  
    {
        name: "Ice Elemental",
        weight: 20,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n;
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n;
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n;
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n;
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n;
        },
        lifesteal: 0n,
        burnVuln: 1.5,
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental"
    },
    /*
    Lifesteal Enemies
    */
        {
        name: "Blood Bat",
        weight: 40,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 50n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 11n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 5n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 30n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 25n; 
        },
        get lifesteal() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 5n; 
        },
        canSpawn: () => p.skills.includes('fireball'),
        trait: "Regenerates a small amount of HP per turn"
    },
    {
        name: "Vampire",
        weight: 30,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 600n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 10n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 400n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 320n; 
        },
        get lifesteal() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 15n;
        },
        canSpawn: () => p.skills.includes('fireball') && p.lv >= 30n,
        trait: "Regenerates a moderate amount of HP per turn",
        specialMsg: "Vampire: Don't worry, it won't hurt."
    },
    {
        name: "Vampire Lord",
        weight: 12,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 450n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 99n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 45n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 270n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 225n; 
        },
        get lifesteal() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return 90n + (scaledLV * 45n);
        },
        canSpawn: () => p.skills.includes('fireball') && p.lv >= 40n,
        trait: "Regenerates a large amount of HP per turn",
        specialMsg: "Vampire Lord: Okay it might hurt a little bit..."
    },
    {
        name: "Vampire King",
        weight: 6,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 900n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 198n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 90n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 540n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 450n; 
        },
        get lifesteal() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 90n;
        },
        canSpawn: () => p.skills.includes('fireball') && p.lv >= 50n,
        trait: "Regenerates a very large amount of HP per turn",
        specialMsg: "Vampire King: There is only one entity I fear. That entity being Lux."
    },
    /*
    Sanity Drain Enemies
    */
        {
        name: "Gloom Weaver",
        weight: 35,
        get mhp() { 
            // Replacement for Math.max(1, floor(lv / 1.5))
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n; 
            return scaledLV * 55n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 10n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 18n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 45n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 35n; 
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "Sanity Drainer",
        specialMsg: "Gloom Weaver: Nightmare may stalk you..."
    },
    {
        name: "Void Stalker",
        weight: 25,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 90n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 15n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 25n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 60n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 50n; 
        },
        lifesteal: 0n,
        // BigInt comparisons: 5n and 150n
        canSpawn: () => p.lv >= 5n || p.msn >= 150n,
        trait: "Elite Sanity Predator",
        specialMsg: "Void Stalker: ...but Lux stalks us all."
    },
    /*
    Glass Cannons
    */
        {
        name: "Glass Cannon the I",
        weight: 3,
        hp: 12n, mhp: 12n,
        atk: 1000000000n, san: 1000000000n,
        exp: 10n, gold: 5n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => true,
        specialMsg: "Glass Cannon the I: Hello!"
    },
    {
        name: "Glass Cannon the II",
        weight: 2,
        hp: 24n, mhp: 24n,
        atk: 10000000000n, san: 10000000000n,
        exp: 20n, gold: 10n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball'),
        specialMsg: "Glass Cannon the II: Have you seen Glass Cannon the I yet? He made a bet with me yesterday and lost."
    },
    {
        name: "Glass Cannon the III",
        weight: 1,
        hp: 36n, mhp: 36n,
        atk: 100000000000n, san: 100000000000n,
        exp: 30n, gold: 15n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        // BigInt comparison (2n)
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 2n,
        specialMsg: "Glass Cannon the III: Did you kill Glass Cannon the II yet? He owes me 20 gold from yesterday."
    },
    {
        name: "Glass Cannon the IV",
        weight: 1,
        hp: 48n, mhp: 48n,
        atk: 1000000000000n, san: 1000000000000n,
        exp: 40n, gold: 20n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 6n,
        specialMsg: "Glass Cannon the IV: Heard of my brother Glass Cannon the V? He's never afraid of anything. Well except one thing..."
    },
    {
        name: "Glass Cannon the V",
        weight: 1,
        hp: 60n, mhp: 60n,
        atk: 10000000000000n, san: 10000000000000n,
        exp: 50n, gold: 25n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 10n,
        specialMsg: "Glass Cannon the V: Haha, you finally made it... but Lux still laughs at us all."
    },
    /*
    Normal Enemies
    */
        {
        name: "Shadow Imp",
        weight: 60,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n; // Math.max(1, ...)
            return scaledLV * 45n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 9n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 20n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 15n; 
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "Normal enemy"
    },
    {
        name: "Armored Beetle",
        weight: 55,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 80n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 6n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 35n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 20n; 
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "High HP, however Low ATK"
    },
    {
        name: "Drow Elf",
        weight: 53,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 90n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 25n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 5n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 70n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 150n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.skills.includes('thunderbolt'),
        trait: "Hates regular elves",
        specialMsg: "Drow Elf: We Drow Elves only bow to one god. That one being the creator of this realm."
    },
    {
        name: "Elf",
        weight: 59,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 15n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 35n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 70n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.skills.includes('thunderbolt'),
        trait: "Hates Drow elves",
        specialMsg: `Elf: We find Drow Elves goofy in a way that they fear a so called "god". He certainly can't be real... right?`
    },
    {
        name: "Stone Golem",
        weight: 50,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 150n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 20n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 100n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 80n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 5n,
        trait: "Slow Titan"
    },
    {
        name: "Iron Golem",
        weight: 40,
        get mhp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 300n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 40n; 
        },
        get san() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 5n; 
        },
        get exp() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 200n; 
        },
        get gold() { 
            let scaledLV = (p.lv * 2n) / 3n;
            return scaledLV * 160n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 7n,
        trait: "Slow Titan"
    }
];
