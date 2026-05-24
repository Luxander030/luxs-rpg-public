const skillTree = {

    /*
    ###########################################################################################
    ##############################################################################################
    General Spells (Available to all classes)                                                  ######
    ##############################################################################################
    ###########################################################################################
    */

    heal: {
        name: "Heal",
        tree: "general",
        cost: 0n,
        parent: null,
        unlocked: true,
        mp: 10n,
        description: "Restores a portion of your HP. A basic but reliable spell available to all.",
        get heal() {
            return (35n * p.lv) + 10n;
        }
    },
    
    mindshield: {
        name: "Mind Shield",
        tree: "general",
        cost: 1n,
        parent: "heal",
        unlocked: false,
        mp: 20n,
        description: "Fortifies your mind, restoring a portion of your Sanity. Useful against enemies that prey on your psyche.",
        get san() {
            return (p.lv * 5n) + 5n;
        }
    },
    
    dualheal: {
        name: "Dual Heal",
        tree: "general",
        cost: 2n,
        parent: "mindshield",
        unlocked: false,
        mp: 100n,
        description: "A powerful restorative spell that heals both HP and Sanity in one cast. Expensive, but worth it in a pinch.",
        get heal() {
            return (p.lv * 1000n) + 2000n;
        },
        get san() {
            return (p.lv * 100n) + 850n;
        }
    },    

    /*
    ###########################################################################################
    ##############################################################################################
    Physical Attacks (Available to all classes)                                                ######
    ##############################################################################################
    ###########################################################################################
    */

    strike: {
        name: "Strike",
        tree: "physical",
        cost: 0n,
        parent: null,
        unlocked: true,
        mp: 0n,
        description: "A basic attack. Nothing fancy, but it gets the job done.",
        get dmg() { return (12n * p.dmgmult) / 100n; }
    },
    
    peck: {
        name: "Peck",
        tree: "physical",
        cost: 1n,
        parent: "strike",
        unlocked: false,
        mp: 0n,
        description: "A quick jabbing strike. Not much stronger than a Strike, but faster.",
        get dmg() { return (18n * p.dmgmult) / 100n; }
    },
    
    feelers: {
        name: "Feelers",
        tree: "physical",
        cost: 1n,
        parent: "strike",
        unlocked: false,
        mp: 0n,
        description: "Probe the enemy with extended strikes. Slightly stronger than Peck.",
        get dmg() { return (20n * p.dmgmult) / 100n; }
    },
    
    claw: {
        name: "Claw",
        tree: "physical",
        cost: 2n,
        parent: "peck",
        unlocked: false,
        mp: 0n,
        description: "Rake the enemy with sharp claws. Draws a bit of blood.",
        get dmg() { return (28n * p.dmgmult) / 100n; }
    },
    
    slice: {
        name: "Slice",
        tree: "physical",
        cost: 2n,
        parent: "feelers",
        unlocked: false,
        mp: 0n,
        description: "A clean cutting strike. More precise than Claw.",
        get dmg() { return (30n * p.dmgmult) / 100n; }
    },
    
    flurry: {
        name: "Flurry",
        tree: "physical",
        cost: 3n,
        parent: "claw",
        unlocked: false,
        mp: 0n,
        description: "A rapid series of strikes. Each hit is weak but they add up fast.",
        get dmg() { return (40n * p.dmgmult) / 100n; }
    },
    
    bash: {
        name: "Bash",
        tree: "physical",
        cost: 3n,
        parent: "slice",
        unlocked: false,
        mp: 0n,
        description: "A heavy blunt strike. Slow but hits harder than Flurry.",
        get dmg() { return (42n * p.dmgmult) / 100n; }
    },
    
    bop: {
        name: "Bop",
        tree: "physical",
        cost: 3n,
        parent: "slice",
        unlocked: false,
        mp: 0n,
        description: "A firm bonk to the head. Somehow effective.",
        get dmg() { return (38n * p.dmgmult) / 100n; }
    },
    
    wallop: {
        name: "Wallop",
        tree: "physical",
        cost: 4n,
        parent: "bash",
        unlocked: false,
        mp: 0n,
        description: "A devastating overhead smash. Puts your whole body into it.",
        get dmg() { return (55n * p.dmgmult) / 100n; }
    },
    
    trample: {
        name: "Trample",
        tree: "physical",
        cost: 4n,
        parent: "flurry",
        unlocked: false,
        mp: 0n,
        description: "Charge forward and crush the enemy underfoot.",
        get dmg() { return (52n * p.dmgmult) / 100n; }
    },
    
    barrage: {
        name: "Barrage",
        tree: "physical",
        cost: 5n,
        parent: "wallop",
        unlocked: false,
        mp: 0n,
        description: "An unrelenting storm of blows. The enemy barely has time to breathe.",
        get dmg() { return (70n * p.dmgmult) / 100n; }
    },
    
    whirlwind: {
        name: "Whirlwind",
        tree: "physical",
        cost: 5n,
        parent: "trample",
        unlocked: false,
        mp: 0n,
        description: "Spin and strike everything around you in a wide arc.",
        get dmg() { return (68n * p.dmgmult) / 100n; }
    },
    
    tremor: {
        name: "Tremor",
        tree: "physical",
        cost: 6n,
        parent: "barrage",
        unlocked: false,
        mp: 0n,
        description: "Slam the ground with enough force to shake the earth itself.",
        get dmg() { return (85n * p.dmgmult) / 100n; }
    },
    
    lash: {
        name: "Lash",
        tree: "physical",
        cost: 5n,
        parent: "bop",
        unlocked: false,
        mp: 0n,
        description: "A sharp whipping strike. Quick and precise.",
        get dmg() { return (60n * p.dmgmult) / 100n; }
    },
    
    pinch: {
        name: "Pinch",
        tree: "physical",
        cost: 4n,
        parent: "bop",
        unlocked: false,
        mp: 0n,
        description: "Grab and squeeze a vulnerable spot. Surprisingly painful.",
        get dmg() { return (48n * p.dmgmult) / 100n; }
    },
    
    bite: {
        name: "Bite",
        tree: "physical",
        cost: 5n,
        parent: "pinch",
        unlocked: false,
        mp: 0n,
        description: "Sink your teeth in. Primal, but effective.",
        get dmg() { return (62n * p.dmgmult) / 100n; }
    },
    
    thump: {
        name: "Thump",
        tree: "physical",
        cost: 6n,
        parent: "lash",
        unlocked: false,
        mp: 0n,
        description: "A thunderous strike that rattles the enemy to their core.",
        get dmg() { return (80n * p.dmgmult) / 100n; }
    },
    
    clobber: {
        name: "Clobber",
        tree: "physical",
        cost: 7n,
        parent: "tremor",
        unlocked: false,
        mp: 0n,
        description: "The pinnacle of physical force. An absolute haymaker that leaves nothing standing.",
        get dmg() { return (100n * p.dmgmult) / 100n; }
    },    

    /*
    ###########################################################################################
    ##############################################################################################
    Astral Mage Spells                                                                         ######
    ##############################################################################################
    ###########################################################################################
    */

    starbit: {
        name: "Starbit",
        tree: "astralMage",
        cost: 2n,
        parent: null,
        unlocked: false,
        mp: 20n,
        description: "Hurl a small fragment of starlight at the enemy. The first step on the path of the cosmos.",
        get dmg() {
            let base = (p.lv * 50n) + 50n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    glare: {
        name: "Glare",
        tree: "astralMage",
        cost: 3n,
        parent: "starbit",
        unlocked: false,
        mp: 35n,
        description: "Channel the blinding light of a distant star into a focused beam.",
        get dmg() {
            let base = (p.lv * 80n) + 80n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    shootingStars: {
        name: "Shooting Stars",
        tree: "astralMage",
        cost: 4n,
        parent: "glare",
        unlocked: false,
        mp: 60n,
        description: "Summon a volley of streaking stars that rain down on the enemy.",
        get dmg() {
            let base = (p.lv * 120n) + 120n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    starfall: {
        name: "Starfall",
        tree: "astralMage",
        cost: 5n,
        parent: "shootingStars",
        unlocked: false,
        mp: 100n,
        description: "Call down a cascade of falling stars. The sky itself becomes your weapon.",
        get dmg() {
            let base = (p.lv * 180n) + 180n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    starburst: {
        name: "Starburst",
        tree: "astralMage",
        cost: 6n,
        parent: "starfall",
        unlocked: false,
        mp: 150n,
        description: "Compress stellar energy into a single point, then release it in a violent explosion.",
        get dmg() {
            let base = (p.lv * 250n) + 250n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    astralFlare: {
        name: "Astral Flare",
        tree: "astralMage",
        cost: 7n,
        parent: "starburst",
        unlocked: false,
        mp: 220n,
        description: "Unleash a flare of pure astral energy. Burns with the heat of a dying star.",
        get dmg() {
            let base = (p.lv * 350n) + 350n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    astralBlast: {
        name: "Astral Blast",
        tree: "astralMage",
        cost: 8n,
        parent: "astralFlare",
        unlocked: false,
        mp: 300n,
        description: "A concentrated burst of astral force. Hits like a meteor.",
        get dmg() {
            let base = (p.lv * 500n) + 500n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    astralStorm: {
        name: "Astral Storm",
        tree: "astralMage",
        cost: 9n,
        parent: "astralBlast",
        unlocked: false,
        mp: 450n,
        description: "Conjure a raging storm of astral energy. The enemy has nowhere to run.",
        get dmg() {
            let base = (p.lv * 700n) + 700n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    starlightBlast: {
        name: "Starlight Blast",
        tree: "astralMage",
        cost: 10n,
        parent: "astralStorm",
        unlocked: false,
        mp: 650n,
        description: "Harness the pure light of a thousand stars and fire it as one devastating beam.",
        get dmg() {
            let base = (p.lv * 1000n) + 1000n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    stellarRift: {
        name: "Stellar Rift",
        tree: "astralMage",
        cost: 12n,
        parent: "starlightBlast",
        unlocked: false,
        mp: 900n,
        description: "Tear open a rift in the fabric of space, pulling stellar energy through to obliterate the enemy.",
        get dmg() {
            let base = (p.lv * 1500n) + 1500n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    comet: {
        name: "Comet",
        tree: "astralMage",
        cost: 14n,
        parent: "stellarRift",
        unlocked: false,
        mp: 1200n,
        description: "Summon a comet from the depths of space and hurl it directly at the enemy. Catastrophic.",
        get dmg() {
            let base = (p.lv * 2000n) + 2000n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    prismBlast: {
        name: "Prism Blast",
        tree: "astralMage",
        cost: 16n,
        parent: "comet",
        unlocked: false,
        mp: 1600n,
        description: "Refract astral energy through a cosmic prism, splitting it into a spectrum of destruction.",
        get dmg() {
            let base = (p.lv * 3000n) + 3000n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    eldritchblast: {
        name: "Eldritch Blast",
        tree: "astralMage",
        cost: 18n,
        parent: "prismBlast",
        unlocked: false,
        mp: 2000n,
        description: "Channel power from beyond the known cosmos. Ancient, unknowable, and utterly devastating.",
        get dmg() {
            let base = (p.lv * 400n) + 1000n;
            return (base * p.dmgmult) / 100n;
        }
    },    

    /*
    ###########################################################################################
    ##############################################################################################
    Stormmancer Spells                                                                         ######
    ##############################################################################################
    ###########################################################################################
    */

    multispark: {
        name: "Multispark",
        tree: "stormmancer",
        cost: 2n,
        parent: null,
        unlocked: false,
        mp: 15n,
        backfireChance: 0.05,
        description: "Fire multiple small sparks at the enemy. Unstable, but a solid starting point for any Stormmancer.",
        get dmg() {
            let base = (p.lv * 30n) + 30n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 1n; }
    },
    
    sparks: {
        name: "Sparks",
        tree: "stormmancer",
        cost: 2n,
        parent: "multispark",
        unlocked: false,
        mp: 20n,
        backfireChance: 0.05,
        description: "Shower the enemy in a burst of electrical sparks. Slightly more focused than Multispark.",
        get dmg() {
            let base = (p.lv * 40n) + 40n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 1n; }
    },
    
    static: {
        name: "Static",
        tree: "stormmancer",
        cost: 3n,
        parent: "sparks",
        unlocked: false,
        mp: 30n,
        backfireChance: 0.07,
        description: "Build up a static charge and release it into the enemy. Leaves them dazed for longer.",
        get dmg() {
            let base = (p.lv * 55n) + 55n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 2n; }
    },
    
    sparkStorm: {
        name: "Spark Storm",
        tree: "stormmancer",
        cost: 3n,
        parent: "multispark",
        unlocked: false,
        mp: 35n,
        backfireChance: 0.07,
        description: "Unleash a chaotic storm of sparks in all directions. Hard to control, harder to dodge.",
        get dmg() {
            let base = (p.lv * 60n) + 60n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 2n; }
    },
    
    battery: {
        name: "Battery",
        tree: "stormmancer",
        cost: 4n,
        parent: "static",
        unlocked: false,
        mp: 50n,
        backfireChance: 0.08,
        description: "Charge yourself up and discharge a powerful jolt into the enemy. The electricity is getting harder to contain.",
        get dmg() {
            let base = (p.lv * 80n) + 80n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 2n; }
    },
    
    flicker: {
        name: "Flicker",
        tree: "stormmancer",
        cost: 4n,
        parent: "sparkStorm",
        unlocked: false,
        mp: 45n,
        backfireChance: 0.08,
        description: "Rapidly flicker electrical energy at the enemy in short sharp bursts.",
        get dmg() {
            let base = (p.lv * 75n) + 75n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 2n; }
    },
    
    shockCannon: {
        name: "Shock Cannon",
        tree: "stormmancer",
        cost: 5n,
        parent: "battery",
        unlocked: false,
        mp: 70n,
        backfireChance: 0.10,
        description: "Compress electrical energy into a single devastating bolt and fire it like a cannon.",
        get dmg() {
            let base = (p.lv * 110n) + 110n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 3n; }
    },
    
    sparkSphere: {
        name: "Spark Sphere",
        tree: "stormmancer",
        cost: 5n,
        parent: "flicker",
        unlocked: false,
        mp: 65n,
        backfireChance: 0.10,
        description: "Form a crackling sphere of electricity and hurl it at the enemy. Explodes on impact.",
        get dmg() {
            let base = (p.lv * 100n) + 100n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 3n; }
    },
    
    blowout: {
        name: "Blowout",
        tree: "stormmancer",
        cost: 6n,
        parent: "shockCannon",
        unlocked: false,
        mp: 100n,
        backfireChance: 0.12,
        description: "Release a catastrophic surge of electricity. The sheer voltage risks frying your own circuits.",
        get dmg() {
            let base = (p.lv * 150n) + 150n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 3n; }
    },
    
    stormGlobe: {
        name: "Storm Globe",
        tree: "stormmancer",
        cost: 6n,
        parent: "sparkSphere",
        unlocked: false,
        mp: 90n,
        backfireChance: 0.12,
        description: "Conjure a miniature storm contained within a globe of crackling energy. Releases on contact.",
        get dmg() {
            let base = (p.lv * 140n) + 140n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 3n; }
    },
    
    lightningStrike: {
        name: "Lightning Strike",
        tree: "stormmancer",
        cost: 7n,
        parent: "blowout",
        unlocked: false,
        mp: 130n,
        backfireChance: 0.15,
        description: "Call down a bolt of lightning from above. Fast, precise, and absolutely lethal.",
        get dmg() {
            let base = (p.lv * 200n) + 200n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 4n; }
    },
    
    overload: {
        name: "Overload",
        tree: "stormmancer",
        cost: 8n,
        parent: "lightningStrike",
        unlocked: false,
        mp: 180n,
        backfireChance: 0.18,
        description: "Push your electrical output far beyond its limits. Devastating, but the feedback is getting dangerous.",
        get dmg() {
            let base = (p.lv * 280n) + 280n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 4n; }
    },
    
    ionCannon: {
        name: "Ion Cannon",
        tree: "stormmancer",
        cost: 10n,
        parent: "overload",
        unlocked: false,
        mp: 250n,
        backfireChance: 0.20,
        description: "Fire a concentrated beam of ionized particles. The most powerful controlled electrical attack in your arsenal.",
        get dmg() {
            let base = (p.lv * 380n) + 380n;
            return (base * p.dmgmult) / 100n;
        },
        get stun() { return 5n; }
    },
    
    thunderbolt: {
        name: "Thunderbolt",
        tree: "stormmancer",
        cost: 12n,
        parent: "ionCannon",
        unlocked: false,
        mp: 45n,
        backfireChance: 0.15,
        description: "The signature spell of the Stormmancer. A legendary bolt that burns as it stuns. Cheaper than it looks.",
        get dmg() {
            let base = (p.lv * 35n) + 70n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 3n; }
    },    

    /*
    ###########################################################################################
    ##############################################################################################
    Druid Spells                                                                               ######
    ##############################################################################################
    ###########################################################################################
    */

    brambleChain: {
        name: "Bramble Chain",
        tree: "druid",
        cost: 2n,
        parent: null,
        unlocked: false,
        mp: 15n,
        fireReduction: 0.5,
        description: "Lash the enemy with a chain of thorny brambles. Nature's first lesson — everything has thorns.",
        get dmg() {
            let base = (p.lv * 25n) + 25n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    leafBurst: {
        name: "Leaf Burst",
        tree: "druid",
        cost: 2n,
        parent: "brambleChain",
        unlocked: false,
        mp: 20n,
        fireReduction: 0.5,
        description: "Explode a cluster of razor-sharp leaves outward. Deceptively painful.",
        get dmg() {
            let base = (p.lv * 35n) + 35n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    leafSpiral: {
        name: "Leaf Spiral",
        tree: "druid",
        cost: 3n,
        parent: "leafBurst",
        unlocked: false,
        mp: 30n,
        fireReduction: 0.5,
        description: "Spin a spiral of cutting leaves around the enemy. Hard to dodge when it surrounds you.",
        get dmg() {
            let base = (p.lv * 50n) + 50n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    petalShower: {
        name: "Petal Shower",
        tree: "druid",
        cost: 3n,
        parent: "brambleChain",
        unlocked: false,
        mp: 25n,
        fireReduction: 0.5,
        description: "Rain down a shower of razor petals. Beautiful and brutal in equal measure.",
        get dmg() {
            let base = (p.lv * 45n) + 45n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    shrubAssault: {
        name: "Shrub Assault",
        tree: "druid",
        cost: 4n,
        parent: "leafSpiral",
        unlocked: false,
        mp: 45n,
        fireReduction: 0.5,
        description: "Animate a mass of thorny shrubs to batter the enemy relentlessly.",
        get dmg() {
            let base = (p.lv * 70n) + 70n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    autumnGust: {
        name: "Autumn Gust",
        tree: "druid",
        cost: 4n,
        parent: "petalShower",
        unlocked: false,
        mp: 40n,
        fireReduction: 0.5,
        description: "Summon a gust of autumn wind carrying a storm of hardened leaves. The season bites.",
        get dmg() {
            let base = (p.lv * 65n) + 65n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    forestTwister: {
        name: "Forest Twister",
        tree: "druid",
        cost: 5n,
        parent: "shrubAssault",
        unlocked: false,
        mp: 65n,
        fireReduction: 0.5,
        description: "Conjure a twister of bark, branches and leaves. The forest itself is angry.",
        get dmg() {
            let base = (p.lv * 100n) + 100n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    leafVortex: {
        name: "Leaf Vortex",
        tree: "druid",
        cost: 5n,
        parent: "autumnGust",
        unlocked: false,
        mp: 60n,
        fireReduction: 0.5,
        description: "Pull the enemy into a vortex of swirling razor leaves. Escape is not an option.",
        get dmg() {
            let base = (p.lv * 90n) + 90n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    naturesFury: {
        name: "Nature's Fury",
        tree: "druid",
        cost: 6n,
        parent: "forestTwister",
        unlocked: false,
        mp: 90n,
        fireReduction: 0.5,
        description: "Channel the raw wrath of the natural world into a single devastating strike. Nature does not forgive.",
        get dmg() {
            let base = (p.lv * 140n) + 140n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    poisonSpray: {
        name: "Poison Spray",
        tree: "druid",
        cost: 7n,
        parent: "naturesFury",
        unlocked: false,
        mp: 500n,
        fireReduction: 0.5,
        description: "Spray a toxic mist extracted from the deadliest plants in the forest. Low damage, yet massive poison stacks.",
        get dmg() {
            let base = (p.lv * 10n);
            return (base * p.dmgmult) / 100n;
        },
        get poison() {
            let base = (p.lv * 400n);
            return base * p.lv;
        }
    },
    
    healprayer: {
        name: "Heal Prayer",
        tree: "druid",
        cost: 8n,
        parent: "poisonSpray",
        unlocked: false,
        mp: 500n,
        description: "Offer a prayer to the forest spirits for healing. The more blood on your hands, the less they answer.",
        get heal() {
            return BigMath.max((((p.lv * 50n) + 300n) - p.kills), 0n);
        }
    },
    
    ralseidualheal: {
        name: "Ralsei's Signature Dual Heal",
        tree: "druid",
        cost: 10n,
        parent: "healprayer",
        unlocked: false,
        mp: 1000n,
        description: "A healing technique passed down from Ralsei himself. Restores both HP and Sanity. Also diminishes with kills.",
        get heal() {
            return BigMath.max((((p.lv * 550n) + 550n) - p.kills), 0n);
        },
        get san() {
            return BigMath.max((((p.lv * 550n) + 550n) - p.kills), 0n);
        }
    },    

    /*
    ###########################################################################################
    ##############################################################################################
    Flamemancer Spells                                                                         ######
    ##############################################################################################
    ###########################################################################################
    */

    flame: {
        name: "Flame",
        tree: "flamemancer",
        cost: 1n,
        parent: null,
        unlocked: false,
        mp: 10n,
        description: "Conjure a small flame and hurl it at the enemy. Every great fire starts with a spark.",
        get dmg() {
            let base = (p.lv * 15n) + 15n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 1n; }
    },
    
    flameSpark: {
        name: "Flame Spark",
        tree: "flamemancer",
        cost: 2n,
        parent: "flame",
        unlocked: false,
        mp: 15n,
        description: "Strike the enemy with a crackling flame spark. Burns a little longer than a basic Flame.",
        get dmg() {
            let base = (p.lv * 22n) + 22n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 1n; }
    },
    
    flameTwitch: {
        name: "Flame Twitch",
        tree: "flamemancer",
        cost: 2n,
        parent: "flameSpark",
        unlocked: false,
        mp: 20n,
        description: "An erratic burst of flame that twitches unpredictably. Harder to dodge than it looks.",
        get dmg() {
            let base = (p.lv * 30n) + 30n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 2n; }
    },
    
    fireball: {
        name: "Fireball",
        tree: "flamemancer",
        cost: 3n,
        parent: "flameTwitch",
        unlocked: false,
        mp: 15n,
        description: "The classic. A ball of fire lobbed at the enemy. Cheap, reliable, and it burns.",
        get dmg() {
            let base = p.lv * 11n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 2n; }
    },
    
    flameBurst: {
        name: "Flame Burst",
        tree: "flamemancer",
        cost: 3n,
        parent: "fireball",
        unlocked: false,
        mp: 30n,
        description: "Detonate a burst of flame directly on the enemy. The explosion lingers as a burn.",
        get dmg() {
            let base = (p.lv * 45n) + 45n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 2n; }
    },
    
    firecracker: {
        name: "Firecracker",
        tree: "flamemancer",
        cost: 4n,
        parent: "flameBurst",
        unlocked: false,
        mp: 45n,
        description: "Launch a rapid series of small explosive fireballs. Loud, flashy, and surprisingly effective.",
        get dmg() {
            let base = (p.lv * 60n) + 60n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 3n; }
    },
    
    fireSurge: {
        name: "Fire Surge",
        tree: "flamemancer",
        cost: 5n,
        parent: "firecracker",
        unlocked: false,
        mp: 65n,
        description: "Surge a wave of intense fire forward. The heat alone is enough to leave lasting burns.",
        get dmg() {
            let base = (p.lv * 80n) + 80n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 3n; }
    },
    
    fireStorm: {
        name: "Fire Storm",
        tree: "flamemancer",
        cost: 6n,
        parent: "fireSurge",
        unlocked: false,
        mp: 90n,
        description: "Whip up a raging storm of fire. The air itself ignites.",
        get dmg() {
            let base = (p.lv * 110n) + 110n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 4n; }
    },
    
    fireBarrage: {
        name: "Fire Barrage",
        tree: "flamemancer",
        cost: 7n,
        parent: "fireStorm",
        unlocked: false,
        mp: 120n,
        description: "Unleash a relentless barrage of fireballs. The enemy barely has time to catch fire before the next one hits.",
        get dmg() {
            let base = (p.lv * 150n) + 150n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 5n; }
    },
    
    conflagration: {
        name: "Conflagration",
        tree: "flamemancer",
        cost: 9n,
        parent: "fireBarrage",
        unlocked: false,
        mp: 180n,
        description: "The pinnacle of flame magic. Engulf the enemy in an all-consuming inferno. Everything burns.",
        get dmg() {
            let base = (p.lv * 200n) + 200n;
            return (base * p.dmgmult) / 100n;
        },
        get burn() { return p.lv * 6n; }
    },    

    /*
    ###########################################################################################
    ##############################################################################################
    Cryomancer Spells                                                                          ######
    ##############################################################################################
    ###########################################################################################
    */

    chill: {
        name: "Chill",
        tree: "cryomancer",
        cost: 2n,
        parent: null,
        unlocked: false,
        mp: 15n,
        description: "Send a wave of cold air at the enemy. A gentle, yet very cold introduction to the art of freezing things.",
        get dmg() {
            let base = (p.lv * 40n) + 40n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() { return p.lv * 1n; }
    },
    
    suddenChill: {
        name: "Sudden Chill",
        tree: "cryomancer",
        cost: 3n,
        parent: "chill",
        unlocked: false,
        mp: 25n,
        description: "Drop the temperature around the enemy without warning. The sudden cold is disorienting.",
        get dmg() {
            let base = (p.lv * 60n) + 60n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() { return p.lv * 1n; }
    },
    
    chillSplinter: {
        name: "Chill Splinter",
        tree: "cryomancer",
        cost: 4n,
        parent: "suddenChill",
        unlocked: false,
        mp: 40n,
        description: "Fire a shard of ice that splinters on impact, spreading cold in all directions.",
        get dmg() {
            let base = (p.lv * 90n) + 90n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() { return p.lv * 2n; }
    },
    
    coldSnap: {
        name: "Cold Snap",
        tree: "cryomancer",
        cost: 4n,
        parent: "chillSplinter",
        unlocked: false,
        mp: 55n,
        description: "Snap the air temperature to near absolute zero in an instant. The enemy barely has time to react. How could they anyway. It is quite literally an instant change.",
        get dmg() {
            let base = (p.lv * 120n) + 120n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() { return p.lv * 2n; }
    },
    
    snowflakeStrike: {
        name: "Snowflake Strike",
        tree: "cryomancer",
        cost: 5n,
        parent: "coldSnap",
        unlocked: false,
        mp: 75n,
        description: "Hurl a razor-edged snowflake at the enemy. Each one is unique. Yet each one still cuts just as deep.",
        get dmg() {
            let base = (p.lv * 160n) + 160n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() { return p.lv * 3n; }
    },
    
    snowlingBall: {
        name: "Snowling Ball",
        tree: "cryomancer",
        cost: 5n,
        parent: "snowflakeStrike",
        unlocked: false,
        mp: 85n,
        description: "Compact a dense ball of snow and ice and hurl it with tremendous force. It hits harder than it sounds. Somehow. Don't know how. Quite literally the definition of \"Don't judge a book by its cover. \"",
        get dmg() {
            let base = (p.lv * 190n) + 190n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() { return p.lv * 3n; }
    },
    
    spearcicles: {
        name: "Spearcicles",
        tree: "cryomancer",
        cost: 6n,
        parent: "snowlingBall",
        unlocked: false,
        mp: 110n,
        description: "Conjure a volley of icicle spears and launch them at the enemy. Piercing and freezing in equal measure.",
        get dmg() {
            let base = (p.lv * 240n) + 240n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() { return p.lv * 4n; }
    },
    
    frigidBlast: {
        name: "Frigid Blast",
        tree: "cryomancer",
        cost: 7n,
        parent: "spearcicles",
        unlocked: false,
        mp: 150n,
        description: "Unleash a blast of air so cold it burns. The enemy will feel this one for a while.",
        get dmg() {
            let base = (p.lv * 300n) + 300n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() { return p.lv * 4n; }
    },
    
    frostPrison: {
        name: "Frost Prison",
        tree: "cryomancer",
        cost: 8n,
        parent: "frigidBlast",
        unlocked: false,
        mp: 200n,
        description: "Encase the enemy in a prison of solid ice. They aren't going anywhere for a while. Maybe get a sandwich while you wait? I heard there was a good one at the nearby steakhouse... nevermind. Sorry. I'll stop rambling.",
        get dmg() {
            let base = (p.lv * 380n) + 380n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() { return p.lv * 5n; }
    },
    
    iceshock: {
        name: "Iceshock",
        tree: "cryomancer",
        cost: 10n,
        parent: "frostPrison",
        unlocked: false,
        mp: 30n,
        description: "A deceptively cheap spell that delivers a sharp shock of ice directly to the enemy's core. Don't let the low cost fool you.",
        get dmg() {
            let base = ((p.lv - 1n) * 30n) + 90n;
            return (base * p.dmgmult) / 100n;
        },
        get freeze() { return p.lv * 5n; }
    },
    
    snowgrave: {
        name: "Snowgrave",
        tree: "cryomancer",
        cost: 14n,
        parent: "iceshock",
        unlocked: false,
        mp: 20000n,
        description: "The ultimate expression of cold. Damage scales with your kill count. Drains half your sanity. Are you sure about this?",
        get dmg() {
            let base = ((p.lv * 600n) + 600n) * p.kills;
            return (base * p.dmgmult) / 100n;
        },
        get san() { return -(p.sn / 2n); },
        get freeze() {
            let base = ((p.lv * 600n) + 600n) * p.kills;
            return (base * p.dmgmult) / 100n;
        }
    },    

    /*
    ###########################################################################################
    ##############################################################################################
    Watermancer Spells                                                                         ######
    ##############################################################################################
    ###########################################################################################
    */

    soak1: {
        name: "Soak I",
        tree: "watermancer",
        cost: 1n,
        parent: null,
        unlocked: false,
        mp: 10n,
        fireBonus: 2.0,
        description: "Drench the enemy in water. A humble beginning. Deals double damage to fire enemies. This is honestly kinda weak when you think about it. But to be fair, the other spells become much more powerful... [insert yap here].",
        get dmg() {
            let base = (p.lv * 20n) + 20n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    soak2: {
        name: "Soak II",
        tree: "watermancer",
        cost: 2n,
        parent: "soak1",
        unlocked: false,
        mp: 20n,
        fireBonus: 2.0,
        description: "A stronger soaking that hits harder and leaves the enemy thoroughly drenched.",
        get dmg() {
            let base = (p.lv * 35n) + 35n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    soak3: {
        name: "Soak III",
        tree: "watermancer",
        cost: 3n,
        parent: "soak2",
        unlocked: false,
        mp: 35n,
        fireBonus: 2.0,
        description: "The final form of the Soak line. A torrential downpour focused on a single target.",
        get dmg() {
            let base = (p.lv * 55n) + 55n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    muck1: {
        name: "Muck I",
        tree: "watermancer",
        cost: 2n,
        parent: "soak1",
        unlocked: false,
        mp: 25n,
        fireBonus: 2.0,
        description: "Hurl a glob of thick muddy water at the enemy. Messier and harder hitting than a basic Soak.",
        get dmg() {
            let base = (p.lv * 40n) + 40n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    muck2: {
        name: "Muck II",
        tree: "watermancer",
        cost: 3n,
        parent: "muck1",
        unlocked: false,
        mp: 40n,
        fireBonus: 2.0,
        description: "A denser, heavier muck that clings to the enemy and hits with considerable force.",
        get dmg() {
            let base = (p.lv * 65n) + 65n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    muck3: {
        name: "Muck III",
        tree: "watermancer",
        cost: 4n,
        parent: "muck2",
        unlocked: false,
        mp: 60n,
        fireBonus: 2.0,
        description: "The peak of the Muck line. A suffocating wave of thick sludge that hits like a wall. It's also like... 99% just mud.",
        get dmg() {
            let base = (p.lv * 95n) + 95n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    cascade: {
        name: "Cascade",
        tree: "watermancer",
        cost: 5n,
        parent: "soak3",
        unlocked: false,
        mp: 80n,
        fireBonus: 2.0,
        description: "Unleash a cascading torrent of water that crashes into the enemy with tremendous force. Rips them appart from the force more often then not.",
        get dmg() {
            let base = (p.lv * 130n) + 130n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    cavitationBubble: {
        name: "Cavitation Bubble",
        tree: "watermancer",
        cost: 6n,
        parent: "cascade",
        unlocked: false,
        mp: 110n,
        fireBonus: 2.0,
        description: "Form a high-pressure bubble of water around the enemy and collapse it violently. The implosion is... devastating, to say the least.",
        get dmg() {
            let base = (p.lv * 180n) + 180n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    createRiver: {
        name: "Create River",
        tree: "watermancer",
        cost: 8n,
        parent: "cavitationBubble",
        unlocked: false,
        mp: 160n,
        fireBonus: 2.0,
        description: "Summon a raging river from nothing and direct it straight at the enemy. The pinnacle of Watermancer magic.",
        get dmg() {
            let base = (p.lv * 250n) + 250n;
            return (base * p.dmgmult) / 100n;
        }
    },    

    /*
    ###########################################################################################
    ##############################################################################################
    Shadow Spells                                                                              ######
    ##############################################################################################
    ###########################################################################################
    */

    miraShade: {
        name: "Mira Shade",
        tree: "shadow",
        cost: 3n,
        parent: null,
        unlocked: false,
        mp: 25n,
        luxBonus: 1.5,
        demonPenalty: 0.7,
        description: "Strike with a tendril of shadow energy. Effective against beings of light. Less so against demons.",
        get dmg() {
            let base = (p.lv * 60n) + 60n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    shade: {
        name: "Shade",
        tree: "shadow",
        cost: 4n,
        parent: "miraShade",
        unlocked: false,
        mp: 40n,
        luxBonus: 1.5,
        demonPenalty: 0.7,
        description: "Wrap the enemy in suffocating darkness. The shadows here have weight.",
        get dmg() {
            let base = (p.lv * 90n) + 90n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    shadow: {
        name: "Shadow",
        tree: "shadow",
        cost: 5n,
        parent: "shade",
        unlocked: false,
        mp: 60n,
        luxBonus: 1.5,
        demonPenalty: 0.7,
        description: "Become one with the darkness and strike from within it. The enemy cannot see where the blow comes from.",
        get dmg() {
            let base = (p.lv * 130n) + 130n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    shieldingDark: {
        name: "Shielding Dark",
        tree: "shadow",
        cost: 5n,
        parent: "miraShade",
        unlocked: false,
        mp: 55n,
        luxBonus: 1.5,
        demonPenalty: 0.7,
        description: "Cloak yourself in protective darkness while lashing out at the enemy. Deals damage and restores a portion of your Sanity.",
        get dmg() {
            let base = (p.lv * 110n) + 110n;
            return (base * p.dmgmult) / 100n;
        },
        get san() {
            return (p.lv * 50n) + 50n;
        }
    },
    
    shadowStorm: {
        name: "Shadow Storm",
        tree: "shadow",
        cost: 7n,
        parent: "shadow",
        unlocked: false,
        mp: 100n,
        luxBonus: 1.5,
        demonPenalty: 0.7,
        description: "Unleash a violent storm of shadow energy. The darkness lashes out in every direction.",
        get dmg() {
            let base = (p.lv * 200n) + 200n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    siphonray: {
        name: "Siphon Ray",
        tree: "shadow",
        cost: 8n,
        parent: "shadowStorm",
        unlocked: false,
        mp: 100n,
        luxBonus: 1.5,
        demonPenalty: 0.7,
        description: "Fire a ray of shadow energy that drains the enemy's life force and transfers it to you. What you take from them, you keep.",
        get dmg() {
            let base = (p.lv * 100n) + 100n;
            return (base * p.dmgmult) / 100n;
        },
        get heal() {
            let base = (p.lv * 100n) + 100n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    fingerofdeath: {
        name: "Finger of Death",
        tree: "shadow",
        cost: 10n,
        parent: "siphonray",
        unlocked: false,
        mp: 100n,
        luxBonus: 1.5,
        demonPenalty: 0.7,
        description: "Point at the enemy and will their death into existence. Simple. Effective. Final.",
        get dmg() {
            let base = (p.lv * 250n) + 250n;
            return (base * p.dmgmult) / 100n;
        }
    },
    
    snowgraveShadow: {
        name: "Snowgrave",
        tree: "shadow",
        cost: 14n,
        parent: "fingerofdeath",
        unlocked: false,
        mp: 20000n,
        luxBonus: 1.5,
        demonPenalty: 0.7,
        description: "Shadow and ice intertwined. Damage scales with your kill count. Drains half your sanity. The darkness remembers every life you've taken.",
        get dmg() {
            let base = ((p.lv * 600n) + 600n) * p.kills;
            return (base * p.dmgmult) / 100n;
        },
        get san() { return -(p.sn / 2n); },
        get freeze() {
            let base = ((p.lv * 600n) + 600n) * p.kills;
            return (base * p.dmgmult) / 100n;
        }
    },    

    /*
    ###########################################################################################
    ##############################################################################################
    Neutral Spells                                                                             ######
    ##############################################################################################
    ###########################################################################################
    */

    campfire: {
        name: "Campfire",
        tree: "neutral",
        cost: 2n,
        parent: null,
        unlocked: false,
        mp: 20n,
        description: "Light a campfire and see what happens. Could damage the enemy, could do nothing, could reward you with gold. The fire decides.",
        get dmg() {
            const roll = Math.random();
            if (roll < 0.33) return (p.lv * 50n) * p.dmgmult / 100n;
            if (roll < 0.66) return 0n;
            return (p.lv * 100n) * p.dmgmult / 100n;
        }
    },
    
    cauterize: {
        name: "Cauterize",
        tree: "neutral",
        cost: 3n,
        parent: "campfire",
        unlocked: false,
        mp: 35n,
        description: "Apply searing heat to a wound — yours or theirs. Might damage the enemy, might heal you, might do both, might do neither. Unpredictable.",
        get dmg() {
            const roll = Math.random();
            if (roll < 0.33) return (p.lv * 80n) * p.dmgmult / 100n;
            if (roll < 0.66) return 0n;
            return (p.lv * 160n) * p.dmgmult / 100n;
        },
        get heal() {
            const roll = Math.random();
            if (roll < 0.5) return (p.lv * 50n);
            return 0n;
        }
    },
    
    cosmicBlessing: {
        name: "Cosmic Blessing",
        tree: "neutral",
        cost: 5n,
        parent: "cauterize",
        unlocked: false,
        mp: 60n,
        description: "Call upon the cosmos for a blessing. Could be a small strike, a massive one, a full heal, or complete silence. The universe does what it wants.",
        get dmg() {
            const roll = Math.random();
            if (roll < 0.25) return (p.lv * 200n) * p.dmgmult / 100n;
            if (roll < 0.5) return 0n;
            if (roll < 0.75) return (p.lv * 500n) * p.dmgmult / 100n;
            return (p.lv * 1000n) * p.dmgmult / 100n;
        },
        get heal() {
            const roll = Math.random();
            if (roll < 0.33) return (p.lv * 200n);
            if (roll < 0.66) return 0n;
            return p.mhp;
        }
    },
    voidPulse: {
        name: "Void Pulse",
        tree: "neutral",
        cost: 7n,
        parent: "cosmicBlessing",
        unlocked: false,
        mp: 90n,
        description: "A pulse of void energy. What it does is anyone's guess. The void doesn't explain itself.",
        get dmg() {
            const roll = Math.random();
            if (roll < 0.25) return (p.lv * 300n) * p.dmgmult / 100n;
            if (roll < 0.5) return 0n;
            if (roll < 0.75) return (p.lv * 150n) * p.dmgmult / 100n;
            return (p.lv * 600n) * p.dmgmult / 100n;
        },
        get heal() {
            const roll = Math.random();
            if (roll < 0.5) return (p.lv * 100n);
            return 0n;
        }
    },
    
    stardustStrike: {
        name: "Stardust Strike",
        tree: "neutral",
        cost: 9n,
        parent: "voidPulse",
        unlocked: false,
        mp: 130n,
        description: "Hurl a handful of stardust at the enemy. Sometimes it burns. Sometimes it heals. Sometimes it just... sparkles.",
        get dmg() {
            const roll = Math.random();
            if (roll < 0.2) return 0n;
            if (roll < 0.5) return (p.lv * 400n) * p.dmgmult / 100n;
            if (roll < 0.8) return (p.lv * 800n) * p.dmgmult / 100n;
            return (p.lv * 1500n) * p.dmgmult / 100n;
        },
        get san() {
            const roll = Math.random();
            if (roll < 0.33) return (p.lv * 80n);
            if (roll < 0.66) return -(p.lv * 40n);
            return 0n;
        }
    },
    
    entropyBlast: {
        name: "Entropy Blast",
        tree: "neutral",
        cost: 11n,
        parent: "stardustStrike",
        unlocked: false,
        mp: 180n,
        description: "Unleash pure entropy. Everything decays eventually. Whether that includes the enemy right now is up to fate.",
        get dmg() {
            const roll = Math.random();
            if (roll < 0.15) return (p.lv * 5000n) * p.dmgmult / 100n; // jackpot
            if (roll < 0.4) return 0n;
            if (roll < 0.7) return (p.lv * 600n) * p.dmgmult / 100n;
            return (p.lv * 1200n) * p.dmgmult / 100n;
        },
        get heal() {
            const roll = Math.random();
            if (roll < 0.25) return p.mhp / 4n;
            if (roll < 0.5) return 0n;
            if (roll < 0.75) return (p.lv * 200n);
            return -(p.lv * 100n); // backfires and hurts you
        }
    },
    
    fatesDice: {
        name: "Fate's Dice",
        tree: "neutral",
        cost: 13n,
        parent: "entropyBlast",
        unlocked: false,
        mp: 240n,
        description: "Roll the dice of fate. Could be the best thing you've ever cast. Could be the worst. Fate doesn't care either way.",
        get dmg() {
            const roll = Math.random();
            if (roll < 0.1) return (p.lv * 10000n) * p.dmgmult / 100n; // incredible
            if (roll < 0.3) return (p.lv * 1000n) * p.dmgmult / 100n;
            if (roll < 0.6) return (p.lv * 500n) * p.dmgmult / 100n;
            if (roll < 0.8) return 0n;
            return (p.lv * 100n) * p.dmgmult / 100n;
        },
        get heal() {
            const roll = Math.random();
            if (roll < 0.2) return p.mhp; // full heal
            if (roll < 0.5) return (p.lv * 300n);
            if (roll < 0.8) return 0n;
            return -(p.lv * 200n); // hurts you instead
        },
        get san() {
            const roll = Math.random();
            if (roll < 0.25) return (p.lv * 150n);
            if (roll < 0.5) return 0n;
            if (roll < 0.75) return -(p.lv * 75n);
            return p.msn; // full sanity restore
        }
    },
    
    cosmicRoulette: {
        name: "Cosmic Roulette",
        tree: "neutral",
        cost: 15n,
        parent: "fatesDice",
        unlocked: false,
        mp: 320n,
        description: "Spin the wheel of the cosmos. Six chambers. One outcome. Nobody knows which.",
        get dmg() {
            const roll = Math.floor(Math.random() * 6);
            if (roll === 0) return (p.lv * 20000n) * p.dmgmult / 100n; // one in six: catastrophic
            if (roll === 1) return 0n;
            if (roll === 2) return (p.lv * 2000n) * p.dmgmult / 100n;
            if (roll === 3) return (p.lv * 800n) * p.dmgmult / 100n;
            if (roll === 4) return (p.lv * 3000n) * p.dmgmult / 100n;
            return (p.lv * 500n) * p.dmgmult / 100n;
        },
        get heal() {
            const roll = Math.floor(Math.random() * 6);
            if (roll === 0) return p.mhp;
            if (roll === 1) return -(p.lv * 500n);
            if (roll === 2) return (p.lv * 400n);
            if (roll === 3) return 0n;
            if (roll === 4) return p.mhp / 2n;
            return -(p.lv * 200n);
        },
        get san() {
            const roll = Math.floor(Math.random() * 6);
            if (roll === 0) return p.msn;
            if (roll === 1) return -(p.msn / 2n);
            if (roll === 2) return (p.lv * 200n);
            if (roll === 3) return 0n;
            if (roll === 4) return -(p.lv * 100n);
            return (p.lv * 400n);
        }
    },
    
    theLastWord: {
        name: "The Last Word",
        tree: "neutral",
        cost: 18n,
        parent: "cosmicRoulette",
        unlocked: false,
        mp: 500n,
        description: "The final spell of the neutral path. Nobody knows what it does. Not even the person casting it. Results may vary. Wildly.",
        get dmg() {
            const roll = Math.random();
            if (roll < 0.05) return enemy.hp; // instant kill
            if (roll < 0.15) return (p.lv * 50000n) * p.dmgmult / 100n;
            if (roll < 0.35) return (p.lv * 5000n) * p.dmgmult / 100n;
            if (roll < 0.55) return (p.lv * 1000n) * p.dmgmult / 100n;
            if (roll < 0.75) return 0n;
            return (p.lv * 200n) * p.dmgmult / 100n;
        },
        get heal() {
            const roll = Math.random();
            if (roll < 0.1) return p.mhp;
            if (roll < 0.3) return (p.lv * 500n);
            if (roll < 0.5) return 0n;
            if (roll < 0.7) return -(p.lv * 300n);
            if (roll < 0.9) return p.mhp / 3n;
            return -(p.hp - 1n); // leaves you at 1 HP
        },
        get san() {
            const roll = Math.random();
            if (roll < 0.1) return p.msn;
            if (roll < 0.3) return -(p.msn / 2n);
            if (roll < 0.6) return (p.lv * 300n);
            if (roll < 0.8) return 0n;
            return -(p.lv * 200n);
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
        name: "Chara Knife",
        weaponRequired: "Chara Knife",
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
        weaponRequired: "Nox Nocturnal",
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
        weaponRequired: "Nox Nocturnal",
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
        weaponRequired: "Nox Nocturnal",
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