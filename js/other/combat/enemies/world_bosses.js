enemies.push(

    {
        name: "Azmodan",
        killKey: "azmodan",
        weight: 5,
        get mhp() {
            return 20000n + (10000n * ((p.lv / 2n) || 1n));
        },
        get hp() { return this.mhp; },
        get atk() {
            return 500n + (240n * ((p.lv / 2n) || 1n));
        },
        get san() {
            return 80n + (50n * ((p.lv / 2n) || 1n));
        },
        get exp() {
            return 3000n + (1200n * ((p.lv / 2n) || 1n));
        },
        get gold() {
            return 50000n + (32000n * ((p.lv / 2n) || 1n));
        },
        get lifesteal() {
            return 1000n + (500n * ((p.lv / 2n) || 1n));
        },
        burnImmune: true,
        demonType: true,
        freezeImmune: true,
        poisonImmune: true,
        stunImmune: true,
        canSpawn: () => p.lv >= 30n && (
            p.skills.includes('eldritchblast') ||      // Astral Mage
            p.skills.includes('thunderbolt') ||        // Stormmancer
            p.skills.includes('ralseidualheal') ||     // Druid
            p.skills.includes('conflagration') ||      // Flamemancer
            p.skills.includes('snowgrave') ||          // Cryomancer
            p.skills.includes('createRiver') ||        // Watermancer
            p.skills.includes('snowgraveShadow') ||    // Shadow
            p.skills.includes('theLastWord')           // Neutral
        ),
        trait: "World Boss",
        specialMsg: "Azmodan: You will burn by Lux's hand and I will make sure you do.",
        drop: () => "The Devil (15)",
    },    
    {
        name: "The Player's Mirror",
        killKey: "playerMirror",
        weight: 2.5,
        get mhp() {
            return p.mhp;
        },
        get hp() { return p.hp; },
        get atk() {
            // Uses the player's strongest known spell as its attack
            if (p.skills.includes("snowgrave") || p.skills.includes("snowgraveShadow")) {
                let base = ((p.lv * 600n) + 600n) * (p.kills || 1n);
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("prismBlast")) {
                let base = (p.lv * 3000n) + 3000n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("eldritchblast")) {
                let base = (p.lv * 400n) + 1000n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("stellarRift")) {
                let base = (p.lv * 1500n) + 1500n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("ionCannon")) {
                let base = (p.lv * 380n) + 380n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("fingerofdeath")) {
                let base = (p.lv * 250n) + 250n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("siphonray")) {
                let base = (p.lv * 100n) + 100n;
                return (base * p.dmgmult) / 100n;
            } else if (p.skills.includes("frostPrison")) {
                let base = (p.lv * 380n) + 380n;
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
            } else if (p.skills.includes("clobber")) {
                return (100n * p.dmgmult) / 100n;
            } else {
                return (12n * p.dmgmult) / 100n;
            }
        },
        get san() {
            return p.msn; // Drains full max sanity
        },
        get exp() {
            return p.exp;
        },
        get gold() {
            return p.gold;
        },
        get lifesteal() {
            return p.lv;
        },
        get burnImmune() {
            // Immune to burn if player has any fire spell
            return p.skills.some(sid => skillTree[sid]?.tree === 'flamemancer');
        },
        get freezeImmune() {
            // Immune to freeze if player has any cryo spell
            return p.skills.some(sid => skillTree[sid]?.tree === 'cryomancer');
        },
        get poisonImmune() {
            return p.skills.includes('poisonSpray');
        },
        get stunImmune() {
            // Immune to stun if player has any stormmancer spell
            return p.skills.some(sid => skillTree[sid]?.tree === 'stormmancer');
        },
        canSpawn: () => p.skills.length >= 2, // At least one spell beyond strike
        trait: "The Player's Mirror",
        specialMsg: "I have watched you grow. I have watched you fall. I want to see how you fare against yourself.",
        drop: () => "(Spectral Card) Cryptid",
    },

);