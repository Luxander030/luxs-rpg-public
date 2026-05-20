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
        name: "Fire Elemental",
        killKey: "fireElemental",
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
        lifesteal: 0n,
        burnImmune: true,
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
        burnResist: 0.5,
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
        burnResist: 0.2,
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
        trait: "Elemental",
        drop: () => "Rock",
    },  
    {
        name: "Ice Elemental",
        killKey: "iceElemental",
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
        lifesteal: 0n,
        burnVuln: 1.5,
        canSpawn: () => p.lv >= 15n,
        trait: "Elemental",
        drop: () => null,
    },
)