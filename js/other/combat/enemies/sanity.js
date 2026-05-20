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
        name: "Gloom Weaver",
        killKey: "gloomWeaver",
        weight: 35,
        get mhp() { 
            // Replacement for Math.max(1, floor(lv / 1.5))
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n; 
            return scaledLV * 55n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 10n; 
        },
        get san() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 18n; 
        },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 45n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            if (scaledLV < 1n) scaledLV = 1n;
            return scaledLV * 35n; 
        },
        lifesteal: 0n,
        canSpawn: () => true,
        trait: "Sanity Drainer",
        specialMsg: "Gloom Weaver: Nightmare may stalk you...",
        drop: () => "Black Shard",
    },
    {
        name: "Void Stalker",
        killKey: "voidStalker",
        weight: 25,
        get mhp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 90n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 15n; 
        },
        get san() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 25n; 
        },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 60n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 50n; 
        },
        lifesteal: 0n,
        // BigInt comparisons: 5n and 150n
        canSpawn: () => p.lv >= 5n || p.msn >= 150n,
        trait: "Elite Sanity Predator",
        specialMsg: "Void Stalker: ...but Lux stalks us all.",
        drop: () => "Black Shard",
    },    
)