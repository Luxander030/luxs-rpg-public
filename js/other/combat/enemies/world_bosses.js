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
        name: "Azmodan",
        killKey: "azmodan",
        weight: 5,
        get mhp() {
            // Logic: 10000 * (LV / 2)
            // BigInt division (/) automatically floors the result
            return 10000n * ((p.lv / 2n) || 1n);
        },
        get hp() {
            return this.mhp;
        },
        get atk() {
            return 240n * ((p.lv / 2n) || 1n);
        },
        get san() {
            return 50n * ((p.lv / 2n) || 1n);
        },
        get exp() {
            return 1200n * ((p.lv / 2n) || 1n);
        },
        get gold() {
            return 32000n * ((p.lv / 2n) || 1n);
        },
        get lifesteal() {
            return 500n * ((p.lv / 2n) || 1n);
        },
        // Use BigInt literal (30n) for the level check
        canSpawn: () => p.lv >= 30n && p.skills.includes('eldritchblast'),
        trait: "World boss",
        specialMsg: "Azmodan: You will burn by Lux's hand and I will make sure you do.",
        drop: () => "The Devil (15)",
    },
    {
        name: "The Player's Mirror",
        killKey: "playerMirror",
        weight: 2.5, // Chance for enemy to spawn
        get mhp() {
            return p.mhp
        },
        get hp() {
            return p.hp
        },
        get atk() {
            if (p.skills.includes("snowgrave")) {
                let base = ((p.lv * 600n) + 600n) * (p.kills || 1n);
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("eldritchblast")) {
                let base = (p.lv * 400n) + 1000n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("siphonray")) {
                let base = (p.lv * 100n) + 100n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("fingerofdeath")) {
                let base = (p.lv * 250n) + 250n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("thunderbolt")) {
                let base = (p.lv * 35n) + 70n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("iceshock")) {
                let base = ((p.lv - 1n) * 30n) + 90n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("fireball")) {
                let base = p.lv * 11n;
                return (base * p.dmgmult) / 100n;
            } else {
                return (12n * p.dmgmult) / 100n;
            }
        },
        get san() {
            return p.msn
        },
        get exp() {
            return p.exp
        },
        get gold() {
            return p.gold
        },
        get lifesteal() {
            return p.lv;
        },
        get burnImmune() {
            if (p.skills.includes("fireball")) {
                return true;
            } else {
                return false;
            }
        },
        get freezeImmune() {
            if (p.skills.includes("iceshock")) {
                return true;
            } else {
                return false;
            }
        },
        canSpawn: () => true, // Can always spawn; no requirements needed
        trait: "The Player's Mirror",
        specialMsg: "I have watched you grow. I have watched you fall. I want to see how you fair against yourself.",
        drop: () => "(Spectral Card) Cryptid",
    },
)