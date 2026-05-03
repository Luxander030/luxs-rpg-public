const dayEvents = [
    {
        name: "Tranquil Spring",
        weight: 15,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`The water is still, having lost its magical properties, and the grass is flattened by hundreds of departing feet. A child's shoe lies abandoned in the mud.`,"#ff0000")
            } else {
                let restore = 50n * p.lv;
                p.hp = BigMath.min(p.hp + restore, p.mhp);
                playHealSFX();
                p.mp = BigMath.min(p.mp + restore, p.mmp);
                p.sn = BigMath.min(p.sn + restore, p.msn);
                log(`You discovered a Tranquil Spring! (+${formatNumber(restore)} All Stats)`, "#00ffff");
                updateUI();
            }
        }
    },
    {
        name: "Blood Moon",
        weight: 10,
        run: () => {
            if (p.kills >= 1000000n) {
                log("A Blood Moon rises... your health is quartered and sanity is set to 1. Seems that even the world doesn't want you alive.", "#ff0000");
                p.sn = 1n;
                p.hp = p.hp / 4n;
                updateUI();
                startCombat(); 
            } else {
                p.sn = p.sn / 4n;
                p.hp = p.hp / 2n;
                log("A Blood Moon rises... your health is halved and sanity is quartered.", "#ff0000");
                updateUI();
                startCombat(); 
            }
        }
    },
    {
        name: "Lucky Scavenge",
        weight: 10,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`You tried looking around for some spare money, yet found none. It looks like people hastily dug up this part of land for money.`,"#ff0000")
            } else {
                let goldScavenged = p.lv * 100n;
                log(`While scavenging, you found ${formatNumber(goldScavenged)} gold!`, "var(--gold)");
                p.gold += goldScavenged;
                p.totalGold += goldScavenged;
                updateUI();
            }
        }
    },
    {
        name: "Robbed at night",
        weight: 5,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`You wake to find a thief standing over you. As your eyes meet, they drop their dagger and stumble backward, sobbing in terror before vanishing into the woods.`, "#ff0000")
            } else {
            let goldRobbed = p.lv * 10n;
            log(`While sleeping, someone sneaked into your camp and stole ${formatNumber(goldRobbed)} gold!`, "var(--gold)");
            p.gold = BigMath.max(0n, p.gold - goldRobbed);
            updateUI();
            }
        }
    },
    {
        name: "Merchant",
        weight: 25,
        run: () => {
            if (p.kills >= 1000000n ) {
                if (Math.random() < 0.75) {
                    log(`The shop is warm, and a candle still flickers, however the candle is snuffed out the moment you enter. The back door is hanging off its hinges.`, "#ff0000")
                } else {
                    log(`You find a shop, with its doors barricaded. You break through the doors to enter the shop, to find a shopkeeper hiding behind the counter.`, "#ff0000")
                    startShop();
                }
            } else {
                startShop();
            }
        }
    },
    {
        name: "Combat",
        weight: 50,
        run: () => {
            if (p.kills >= 1000000n) {
                if (Math.random() < 0.85) {
                    log(`You looked around you to try to find someone to fight. Yet... no one came.`,"#ff0000")
                } else {
                    log(`You finally manage to find someone to fight. They seem scared out of their mind.`,"#ff0000")
                    startCombat();
                }
            } else {
                startCombat();
            }
        }
    }
];
