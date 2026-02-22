const skillTree = {
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
            if (Math.random < 0.2) {
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
    snowgrave: {
        name: "Snowgrave", 
        cost: 7n, 
        parent: 'eldritchblast', 
        unlocked: false, 
        mp: 20000n, 
        get dmg() { 
            let base = (p.lv * 600n) + 600n;
            return (base * p.dmgmult) / 100n;
        },
        get san() {
            // Logic: Original p.sn - (p.sn / 2) is just p.sn / 2.
            // We return it as a negative value to represent the drain.
            return -(p.sn / 2n);
        }
    },
    heal: {
        name: "Heal", 
        cost: 1n, 
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
            return (p.lv * 5n) + 5n; 
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
            return ((p.lv * 55n) / 10n) + p.msn; 
        },
        get san() {
            return ((p.lv * 55n) / 10n) + p.mmp;
        }
    }
};