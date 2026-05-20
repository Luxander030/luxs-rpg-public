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
        name: "Shadow Imp",
        killKey: "shadowImp",
        weight: 60,
        get mhp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n; // Math.max(1, ...)
            return scaledLV * 45n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 9n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 20n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 15n; 
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "Normal enemy",
        drop: () => "Black Shard",
    },
    {
        name: "Armored Beetle",
        killKey: "armoredBeetle",
        weight: 55,
        get mhp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 80n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 6n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 35n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 20n; 
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "High HP, however Low ATK",
        drop: () => "Armored Carapace",
    },
    {
        name: "Drow Elf",
        killKey: "drowElf",
        weight: 53,
        get mhp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 90n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 25n; 
        },
        get san() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 5n; 
        },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 70n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 150n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.skills.includes('thunderbolt'),
        trait: "Hates regular elves",
        specialMsg: "Drow Elf: We Drow Elves only bow to one god. That one being the creator of this realm.",
        drop: () => "Drow Elf Ear",
    },
    {
        name: "Elf",
        killKey: "elf",
        weight: 59,
        get mhp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 80n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 15n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 35n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 70n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.skills.includes('thunderbolt'),
        trait: "Hates Drow elves",
        specialMsg: `Elf: We find Drow Elves goofy in a way that they fear a so called "god". He certainly can't be real... right?`,
        drop: () => "Elf Ear",
    },
    {
        name: "Stone Golem",
        killKey: "stoneGolem",
        weight: 50,
        get mhp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 150n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 20n; 
        },
        get san() { return 0n; },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 100n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 80n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 5n,
        trait: "Slow Titan",
        drop: () => "Rock",
    },
    {
        name: "Iron Golem",
        killKey: "ironGolem",
        weight: 40,
        get mhp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 300n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 40n; 
        },
        get san() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 5n; 
        },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 200n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 160n; 
        },
        lifesteal: 0n,
        canSpawn: () => p.lv >= 7n,
        trait: "Slow Titan",
        drop: () => "Chunk of Iron",
    },    
)