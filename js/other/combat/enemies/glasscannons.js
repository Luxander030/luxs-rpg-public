enemies.push(
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
        canSpawn: () =>
            p.skills.includes('starbit') ||        // Astral Mage
            p.skills.includes('multispark') ||     // Stormmancer
            p.skills.includes('brambleChain') ||   // Druid
            p.skills.includes('flame') ||          // Flamemancer
            p.skills.includes('chill') ||          // Cryomancer
            p.skills.includes('soak1') ||          // Watermancer
            p.skills.includes('miraShade') ||      // Shadow
            p.skills.includes('campfire'),         // Neutral
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
        canSpawn: () =>
            p.skills.includes('glare') ||          // Astral Mage
            p.skills.includes('sparks') ||         // Stormmancer
            p.skills.includes('leafBurst') ||      // Druid
            p.skills.includes('flameSpark') ||     // Flamemancer
            p.skills.includes('suddenChill') ||    // Cryomancer
            p.skills.includes('soak2') ||          // Watermancer
            p.skills.includes('shade') ||          // Shadow
            p.skills.includes('cauterize'),        // Neutral
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
        canSpawn: () =>
            p.skills.includes('shootingStars') ||  // Astral Mage
            p.skills.includes('static') ||         // Stormmancer
            p.skills.includes('leafSpiral') ||     // Druid
            p.skills.includes('flameTwitch') ||    // Flamemancer
            p.skills.includes('chillSplinter') ||  // Cryomancer
            p.skills.includes('soak3') ||          // Watermancer
            p.skills.includes('shadow') ||         // Shadow
            p.skills.includes('cosmicBlessing'),   // Neutral
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
        canSpawn: () =>
            p.skills.includes('starfall') ||       // Astral Mage
            p.skills.includes('sparkStorm') ||     // Stormmancer
            p.skills.includes('petalShower') ||    // Druid
            p.skills.includes('fireball') ||       // Flamemancer
            p.skills.includes('coldSnap') ||       // Cryomancer
            p.skills.includes('muck1') ||          // Watermancer
            p.skills.includes('shieldingDark') ||  // Shadow
            p.skills.includes('voidPulse'),        // Neutral
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
        canSpawn: () =>
            p.skills.includes('starburst') ||      // Astral Mage
            p.skills.includes('battery') ||        // Stormmancer
            p.skills.includes('shrubAssault') ||   // Druid
            p.skills.includes('flameBurst') ||     // Flamemancer
            p.skills.includes('snowflakeStrike') ||// Cryomancer
            p.skills.includes('muck2') ||          // Watermancer
            p.skills.includes('shadowStorm') ||    // Shadow
            p.skills.includes('stardustStrike'),   // Neutral
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
        canSpawn: () =>
            p.skills.includes('astralFlare') ||    // Astral Mage
            p.skills.includes('flicker') ||        // Stormmancer
            p.skills.includes('autumnGust') ||     // Druid
            p.skills.includes('firecracker') ||    // Flamemancer
            p.skills.includes('snowlingBall') ||   // Cryomancer
            p.skills.includes('muck3') ||          // Watermancer
            p.skills.includes('siphonray') ||      // Shadow
            p.skills.includes('entropyBlast'),     // Neutral
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
        canSpawn: () =>
            p.skills.includes('astralBlast') ||    // Astral Mage
            p.skills.includes('shockCannon') ||    // Stormmancer
            p.skills.includes('forestTwister') ||  // Druid
            p.skills.includes('fireSurge') ||      // Flamemancer
            p.skills.includes('spearcicles') ||    // Cryomancer
            p.skills.includes('cascade') ||        // Watermancer
            p.skills.includes('fingerofdeath') ||  // Shadow
            p.skills.includes('fatesDice'),        // Neutral
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
        canSpawn: () =>
            p.skills.includes('astralStorm') ||    // Astral Mage
            p.skills.includes('sparkSphere') ||    // Stormmancer
            p.skills.includes('leafVortex') ||     // Druid
            p.skills.includes('fireStorm') ||      // Flamemancer
            p.skills.includes('frigidBlast') ||    // Cryomancer
            p.skills.includes('cavitationBubble') || // Watermancer
            p.skills.includes('snowgraveShadow') || // Shadow
            p.skills.includes('cosmicRoulette'),   // Neutral
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
        canSpawn: () =>
            p.skills.includes('starlightBlast') || // Astral Mage
            p.skills.includes('blowout') ||        // Stormmancer
            p.skills.includes('naturesFury') ||    // Druid
            p.skills.includes('fireBarrage') ||    // Flamemancer
            p.skills.includes('frostPrison') ||    // Cryomancer
            p.skills.includes('createRiver') ||    // Watermancer
            p.skills.includes('snowgraveShadow') || // Shadow
            p.skills.includes('theLastWord'),      // Neutral
        specialMsg: "Glass Cannon the X: Oh... hello.",
        drop: () => "Glass Shard",
    },
)