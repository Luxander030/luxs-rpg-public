const skillTree = {
    /*
    ###########################################################################################
    ##############################################################################################
    Damaging Spells                                                                            ######
    ##############################################################################################
    ###########################################################################################
    */

    strike: {
        name: "Strike",
        cost: 0n,
        parent: null,
        unlocked: true,
        get dmg() {
            // Logic: (12 * multiplier) / 100
            return (12n * p.dmgmult) / 100n;
        }
    },
    fireball: {
        name: "Fireball", 
        cost: 1n, 
        parent: 'strike', 
        unlocked: false, 
        mp: 15n, 
        get dmg() { 
            let base = p.lv * 11n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() {
            // Duration can be a Number or BigInt; here we'll use BigInt for consistency
            return p.lv * 2n;
        }
    },
    iceshock: {
        name: "Iceshock", 
        cost: 2n, 
        parent: 'fireball', 
        unlocked: false, 
        mp: 30n, 
        get dmg() { 
            let base = ((p.lv - 1n) * 30n) + 90n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() {
            let base = p.lv * 5n
            return base
        }
    },
    thunderbolt: {
        name: "Thunderbolt", 
        cost: 3n, 
        parent: 'iceshock', 
        unlocked: false, 
        mp: 45n, 
        get dmg() { 
            // Logic: (LV * 0.5 * 70) -> (LV * 35)
            let base = (p.lv * 35n) + 70n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() {
            if (Math.random() < 0.5) {
                return p.lv * 3n
            } else {
                return 0n
            }
        }
    },
    fingerofdeath: {
        name: "Finger of Death", 
        cost: 4n, 
        parent: 'thunderbolt', 
        unlocked: false, 
        mp: 100n, 
        get dmg() { 
            let base = (p.lv * 250n) + 250n;
            return (base * p.dmgmult) / 100n;
        }
    },
    siphonray: {
        name: "Siphon Ray", 
        cost: 5n, 
        parent: 'fingerofdeath', 
        unlocked: false, 
        mp: 100n, 
        get dmg() {
            let base = (p.lv * 100n) + 100n;
            return (base * p.dmgmult) / 100n;
        },
        get heal() { 
            let base = (p.lv * 100n) + 100n;
            return (base * p.dmgmult) / 100n;
        }
    },
    eldritchblast: {
        name: "Eldritch Blast", 
        cost: 6n, 
        parent: 'siphonray', 
        unlocked: false, 
        mp: 100n, 
        get dmg() {
           let base = (p.lv * 400n) + 1000n;
           return (base * p.dmgmult) / 100n;
        }
    },
    poisonSpray: {
        name: "Poison Spray", 
        cost: 6n, 
        parent: 'eldritchblast', 
        unlocked: false, 
        mp: 500n, 
        get dmg() {
           let base = (p.lv * 10n);
           return (base * p.dmgmult) / 100n;
        },
        get poison() {
            let base = (p.lv * 400n)
            return base * p.lv
        }
    },
    snowgrave: {
        name: "Snowgrave", 
        cost: 7n, 
        parent: 'poisonSpray', 
        unlocked: false, 
        mp: 20000n, 
        get dmg() { 
            let base = ((p.lv * 600n) + 600n) * p.kills;
            return (base * p.dmgmult) / 100n;
        },
        get san() {
            return -(p.sn / 2n);
        },
        get freeze() {
            let base = ((p.lv * 600n) + 600n) * p.kills;
            return (base * p.dmgmult) / 100n
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Healing Spells                                                                             ######
    ##############################################################################################
    ###########################################################################################
    */

    heal: {
        name: "Heal", 
        cost: 0n,
        parent: 'strike',
        unlocked: true, 
        mp: 10n, 
        get heal() { 
            // BigInt calculation: (35 * LV) + 10
            return (35n * p.lv) + 10n; 
        }
    },
    mindshield: {
        name: "Mind Shield", 
        cost: 1n, 
        parent: 'heal', 
        unlocked: false, 
        mp: 20n, 
        get san() { 
            return (p.lv * 5n) + 5n; 
        },
    },
    dualheal: {
        name: "Dual Heal", 
        cost: 2n, 
        parent: 'mindshield', 
        unlocked: false, 
        mp: 100n, 
        get heal() { 
            return (p.lv * 1000n) + 2000n; 
        },
        get san() {
            return (p.lv * 100n) + 850n;
        }
    },
    healprayer: {
        name: "Heal Prayer", 
        cost: 3n, 
        parent: 'dualheal', 
        unlocked: false, 
        mp: 500n, 
        get heal() { 
            return BigMath.max((((p.lv * 50n) + 300n) - p.kills), 0n); 
        },
    },
    ralseidualheal: {
        name: "Ralsei's Signature Dual Heal", 
        cost: 6n, 
        parent: 'healprayer', 
        unlocked: false, 
        mp: 1000n, 
        get heal() { 
            // 5.5 replaced with (* 55 / 10)
            return BigMath.max((((p.lv * 550n) + 550n) - p.kills), 0n); 
        },
        get san() {
            return BigMath.max((((p.lv * 550n) + 550n) - p.kills), 0n);
        }
    },
    
    /*
    ###########################################################################################
    ##############################################################################################
    Item Skills                                                                                ######
    ##############################################################################################
    ###########################################################################################
    */

    charaKnife: {
        name: "Chara's Knife",
        weaponRequired: "charaKnife",
        cost: 0n,
        parent: null,
        unlocked: false,
        mp: 0n,
        get dmg() {
            let base = 99n
            let scaledAmount = (((base * ((p.lv * p.kills) || 1n)) * p.dmgmult) / 100n)
            return scaledAmount
        }
    },
    noxNocturnalBeam: {
        name: "Nox Nocturnal (Beam)",
        weaponRequired: "noxNocturnal",
        cost: 0n,
        parent: null,
        unlocked: false,
        mp: 0n,
        get dmg() {
            let base = 120n
            let scaledAmount = base * ((p.lv || 1n) * p.dmgmult) / 100n
            return scaledAmount
        },
        get san() {
            let base = 60n
            let scaledAmount = base * ((p.lv || 1n) * p.dmgmult) / 100n
            return -scaledAmount
        },
    },
    noxNocturnalExplosion: {
        name: "Nox Nocturnal (Explosion)",
        weaponRequired: "noxNocturnal",
        cost: 0n,
        parent: null,
        unlocked: false,
        mp: 0n,
        get dmg() {
            let base = 360n
            let scaledAmount = ((base * ((p.lv) || 1n)) * p.dmgmult) / 100n
            return scaledAmount
        },
        get heal() {
            let base = 360n
            let scaledAmount = base * ((p.lv || 1n) * p.dmgmult) / 100n
            return -(scaledAmount / 8n)
        },
        get san() {
            let base = 60n
            let scaledAmount = base * ((p.lv || 1n) * p.dmgmult) / 100n
            return -scaledAmount
        },
    },
    noxNocturnalSiphon: {
        name: "Nox Nocturnal (Siphon)",
        weaponRequired: "noxNocturnal",
        cost: 0n,
        parent: null,
        unlocked: false,
        mp: 0n,
        get dmg() {
            let base = 60n
            let scaledAmount = base * ((p.lv || 1n) * p.dmgmult) / 100n
            return scaledAmount
        },
        get heal() {
            let base = 60n
            let scaledAmount = base * ((p.lv || 1n) * p.dmgmult) / 100n
            return scaledAmount
        },
        get san() {
            let base = 60n
            let scaledAmount = base * ((p.lv || 1n) * p.dmgmult) / 100n
            return -scaledAmount
        },
    },
    fryingPan: {
        name: "Frying Pan",
        weaponRequired: "fryingPan",
        fryingPan: 1n,
        cost: 0n,
        parent: null,
        unlocked: false,
        mp: 0n,
        get dmg() {
            let base = 6000n
            let scaledAmount = base * ((p.lv || 1n) * p.dmgmult) / 100n
            return scaledAmount
        },
    },
};