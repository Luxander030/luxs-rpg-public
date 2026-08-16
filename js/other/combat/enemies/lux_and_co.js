enemies.push(
    {
        name: "Lux",
        killKey: "lux",
        weight: 1,
        get mhp() {
            return 1000000000n * p.lv * p.mhp;
        },
        get hp() { return this.mhp; },
        get atk() {
            return ((50000n * p.lv * p.dmgmult) * (p.kills || 1n)) / 100n;
        },
        get san() {
            return p.sn;
        },
        get exp() {
            return -p.exp;
        },
        get gold() {
            return -p.gold;
        },
        get lifesteal() {
            return 10000n * p.lv * p.mhp;
        },
        burnImmune: true,
        freezeImmune: true,
        poisonImmune: true,
        stunImmune: true,
        burnReflect: 5,
        canSpawn: () => p.lv >= 100n && (
            p.skills.includes('eldritchblast') ||  // Astral Mage
            p.skills.includes('thunderbolt') ||    // Stormmancer
            p.skills.includes('ralseidualheal') || // Druid
            p.skills.includes('conflagration') ||  // Flamemancer
            p.skills.includes('snowgrave') ||      // Cryomancer
            p.skills.includes('createRiver') ||    // Watermancer
            p.skills.includes('snowgraveShadow') ||// Shadow
            p.skills.includes('theLastWord')       // Neutral
        ),
        trait: "World Boss",
        get specialMsg() {
            if (p.kills >= 1000000n) {
                return LuxTypeToLogPissed(`Over a million killed... yet you're still here?`, "#ff0000", 25);
            } else if (p.mhp >= 10000000n && p.mmp >= 10000000n && p.msn >= 100000000n) {
                return LuxLog(`Lux: Plus salutis, plus manae, plus sanitatis. Attamen adhuc plus vis. Miserrimum.`);
            } else if (p.kills >= 100000n) {
                return LuxLog(`Lux: Über 100.000 Leben wurden beendet. Ich muss sagen: Du könntest ein würdiger Gegner sein. Könntest.`);
            } else if (p.spares >= 100000n) {
                return LuxLog(`Lux: Over 100,000 lives spared. I must say, you are... quite kind. And that will be your downfall.`);
            } else if (p.dmgmult >= 5000n) {
                return LuxLog(`Lux: Finally. Someone truly worthy of seeing my strength in battle.`);
            } else if (p.gold >= 100000000n * p.lv) {
                return LuxLog(`Lux: Greed, greed, and more greed. Yet you still need more.`);
            } else if (p.hp < p.mhp) {
                return LuxLog(`Lux: I see you are harmed. Don't think that will make me hurt you less.`);
            } else {
                return LuxLog(`Lux: Hello there. I've been watching you. ${formatNumber(p.kills)} creatures killed. ${formatNumber(p.spares)} creatures spared. I wonder... how are you going to do in this fight?`);
            }
        },
        drop: () => "(Spectral Card) Black Hole",
    },

    {
        name: "Kitsune",
        killKey: "kitsune",
        weight: 2,
        get mhp() {
            let scaledLV = (((p.lv * 80n) / 100n) || 1n);
            return 1000000n * scaledLV;
        },
        get hp() { return this.mhp; },
        get atk() {
            let scaledLV = (((p.lv * 80n) / 100n) || 1n);
            return 5000n * scaledLV;
        },
        get san() {
            let scaledLV = (((p.lv * 80n) / 100n) || 1n);
            return 5000n * scaledLV;
        },
        get exp() {
            let scaledLV = (((p.lv * 80n) / 100n) || 1n);
            return -(10000n * scaledLV);
        },
        get gold() {
            let scaledLV = (((p.lv * 80n) / 100n) || 1n);
            return -(10000n * scaledLV);
        },
        get lifesteal() {
            return 1000n * ((p.lv / 2n) || 1n);
        },
        burnResist: 0.9,
        burnReflect: 1,
        poisonImmune: true,
        stunImmune: true,
        canSpawn: () => p.lv >= 50n && (
            p.skills.includes('comet') ||          // Astral Mage
            p.skills.includes('ionCannon') ||      // Stormmancer
            p.skills.includes('poisonSpray') ||    // Druid
            p.skills.includes('conflagration') ||  // Flamemancer
            p.skills.includes('iceshock') ||       // Cryomancer
            p.skills.includes('createRiver') ||    // Watermancer
            p.skills.includes('snowgraveShadow') ||// Shadow
            p.skills.includes('theLastWord')       // Neutral
        ),
        trait: "Lux's Minion",
        specialMsg: "Kitsune: If you kill me, my god will kill you.",
        drop: () => "(Spectral Card) Soul",
    },
);
