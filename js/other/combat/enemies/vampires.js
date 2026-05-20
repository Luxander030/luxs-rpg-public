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
        name: "Blood Bat",
        killKey: "bloodBat",
        weight: 40,
        get mhp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 50n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 11n; 
        },
        get san() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 5n; 
        },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 30n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 25n; 
        },
        get lifesteal() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 5n; 
        },
        burnVuln: 1.5,
        canSpawn: () => p.skills.includes('fireball'),
        trait: "Regenerates a small amount of HP per turn",
        drop: () => "Blood Bat Eye",
    },
    {
        name: "Vampire",
        killKey: "vampire",
        weight: 30,
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
        get lifesteal() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 15n;
        },
        burnVuln: 1.5,
        canSpawn: () => p.skills.includes('fireball') && p.lv >= 30n,
        trait: "Regenerates a moderate amount of HP per turn",
        specialMsg: "Vampire: Don't worry, it won't hurt.",
        drop: () => "Vamprie Tooth",
    },
    {
        name: "Vampire Lord",
        killKey: "vampireLord",
        weight: 12,
        get mhp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 450n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 99n; 
        },
        get san() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 45n; 
        },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 270n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 225n; 
        },
        get lifesteal() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return 90n + (scaledLV * 45n);
        },
        burnVuln: 1.5,
        canSpawn: () => p.skills.includes('fireball') && p.lv >= 40n,
        trait: "Regenerates a large amount of HP per turn",
        specialMsg: "Vampire Lord: Okay it might hurt a little bit...",
        drop: () => "Vampire Tooth",
    },
    {
        name: "Vampire King",
        killKey: "vampireKing",
        weight: 6,
        get mhp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 900n; 
        },
        get hp() { return this.mhp; },
        get atk() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 198n; 
        },
        get san() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 90n; 
        },
        get exp() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 540n; 
        },
        get gold() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 450n; 
        },
        get lifesteal() { 
            let scaledLV = BigMath.max(1n, (p.lv * 2n) / 3n);
            return scaledLV * 90n;
        },
        burnVuln: 1.5,
        canSpawn: () => p.skills.includes('fireball') && p.lv >= 50n,
        trait: "Regenerates a very large amount of HP per turn",
        specialMsg: "Vampire King: There is only one entity I fear. That entity being Lux.",
        drop: () => "Vampire Tooth",
    },
)