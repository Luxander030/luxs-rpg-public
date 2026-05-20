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
        name: "Miss Circle",
        killKey: "missCircle",
        weight: 10,
        get mhp() {
            return 1200n * p.lv
        },
        get hp() {
            return this.mhp
        },
        get atk() {
            return 21390n * p.lv
        },
        get san() {
            return 0n
        },
        get exp() {
            return 1800n * p.lv
        },
        get gold() {
            return 1800n * p.lv
        },
        canSpawn: () => p.lv >= 25n,
        trait: "Has a drawing compass for a forearm",
        drop: () => "Miss Circle's Oreo Pack"
    },

    {
        name: "Miss Bloomie",
        killKey: "missBloomie",
        weight: 10,
        get mhp() {
            return 1200n * p.lv
        },
        get hp() {
            return this.mhp
        },
        get atk() {
            return 21390n * p.lv
        },
        get san() {
            return 120n * p.lv
        },
        burnImmune: true,
        get exp() {
            return 1800n * p.lv
        },
        get gold() {
            return 1800n * p.lv
        },
        canSpawn: () => p.lv >= 25n,
        trait: "Has a box-cutter for an arm",
        drop: () => null,
    },
    {
        name: "Miss Thavel",
        killKey: "missThavel",
        weight: 10,
        get mhp() {
            return 1200n * p.lv
        },
        get hp() {
            return this.mhp
        },
        get atk() {
            return 21390n * p.lv
        },
        get san() {
            return 120n * p.lv
        },
        get lifesteal() {
            return 120n * p.lv
        },
        get exp() {
            return 1800n * p.lv
        },
        get gold() {
            return 1800n * p.lv
        },
        canSpawn: () => p.lv >= 25n,
        trait: "Omnilingual",
        drop: () => null,
    },
)