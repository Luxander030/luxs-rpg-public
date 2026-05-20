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
        name: "Glass Cannon the I",
        killKey: "glassCannon1",
        weight: 3,
        hp: 12n, mhp: 12n,
        atk: 1000000000n, san: 1000000000n,
        exp: 10n, gold: 5n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.lv >= 2n,
        specialMsg: "Glass Cannon the I: Hello!",
        drop: () => "Glass Shard",
    },
    {
        name: "Glass Cannon the II",
        killKey: "glassCannon2",
        weight: 2,
        hp: 24n, mhp: 24n,
        atk: 10000000000n, san: 10000000000n,
        exp: 20n, gold: 10n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball'),
        specialMsg: "Glass Cannon the II: Have you seen Glass Cannon the I yet? He made a bet with me yesterday and lost.",
        drop: () => "Glass Shard",
    },
    {
        name: "Glass Cannon the III",
        killKey: "glassCannon3",
        weight: 1,
        hp: 36n, mhp: 36n,
        atk: 100000000000n, san: 100000000000n,
        exp: 30n, gold: 15n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        // BigInt comparison (2n)
        canSpawn: () => p.skills.includes('fireball') && p.lv >= 2n,
        specialMsg: "Glass Cannon the III: Did you kill Glass Cannon the II yet? He owes me 20 gold from yesterday.",
        drop: () => "Glass Shard",
    },
    {
        name: "Glass Cannon the IV",
        killKey: "glassCannon4",
        weight: 1,
        hp: 48n, mhp: 48n,
        atk: 1000000000000n, san: 1000000000000n,
        exp: 40n, gold: 20n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 6n,
        specialMsg: "Glass Cannon the IV: Heard of my brother Glass Cannon the V? He's never afraid of anything. Well except one thing...",
        drop: () => "Glass Shard",
    },
    {
        name: "Glass Cannon the V",
        killKey: "glassCannon5",
        weight: 1,
        hp: 60n, mhp: 60n,
        atk: 10000000000000n, san: 10000000000000n,
        exp: 50n, gold: 25n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 10n,
        specialMsg: "Glass Cannon the V: Haha, you finally made it... but Lux still laughs at us all.",
        drop: () => "Glass Shard",
    },
    {
        name: "Glass Cannon the VI",
        killKey: "glassCannon6",
        weight: 1,
        hp: 72n, mhp: 72n,
        atk: 100000000000000n, san: 100000000000000n,
        exp: 60n, gold: 30n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 12n,
        specialMsg: "Glass Cannon the VI: Oh... hello.",
        drop: () => "Glass Shard",
    },
    {
        name: "Glass Cannon the VII",
        killKey: "glassCannon7",
        weight: 1,
        hp: 84n, mhp: 84n,
        atk: 1000000000000000n, san: 1000000000000000n,
        exp: 70n, gold: 35n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 14n,
        specialMsg: "Glass Cannon the VII: Oh... hello. Wasn't expecting you here. How'd you get past Glass Cannon the VI?",
        drop: () => "Glass Shard",
    },
    {
        name: "Glass Cannon the VIII",
        killKey: "glassCannon8",
        weight: 1,
        hp: 72n, mhp: 72n,
        atk: 10000000000000000n, san: 10000000000000000n,
        exp: 80n, gold: 40n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 16n,
        specialMsg: "Glass Cannon the VIII: Oh... hello. Seen VII yet?",
        drop: () => "Glass Shard",
    },
    {
        name: "Glass Cannon the IX",
        killKey: "glassCannon9",
        weight: 1,
        hp: 72n, mhp: 72n,
        atk: 10000000000000000n, san: 100000000000000000n,
        exp: 90n, gold: 45n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 18n,
        specialMsg: "Glass Cannon the IX: Oh... hello. Have you met my brother X yet? He was gone on a trip last time I checked.",
        drop: () => "Glass Shard",
    },
    {
        name: "Glass Cannon the X",
        killKey: "glassCannon10",
        weight: 1,
        hp: 72n, mhp: 72n,
        atk: 1000000000000000000n, san: 1000000000000000000n,
        exp: 100n, gold: 50n,
        lifesteal: 0n,
        trait: "Glass Cannon",
        canSpawn: () => p.skills.includes('fireball') || p.lv >= 20n,
        specialMsg: "Glass Cannon the X: Oh... hello.",
        drop: () => "Glass Shard",
    },
)