const dayEvents = [
    {
        name: "Tranquil Spring",
        weight: 15,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`You found a Tranquil Spring, yet it was empty. You see a lot of footsteps near the spring as well. It seems as if the people here fled in panic.`,"#ff0000")
            } else {
                let restore = 50n * p.lv;
                p.hp = (p.hp + restore > p.mhp) ? p.mhp : p.hp + restore;
                p.mp = (p.mp + restore > p.mmp) ? p.mmp : p.mp + restore;
                p.sn = (p.sn + restore > p.msn) ? p.msn : p.sn + restore;
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
                log("A Blood Moon rises... your health is quartered and sanity is set to 1. Seems that the world doesn't want you to survive.", "#ff0000");
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
                log(`You tried looking around for some spare money, yet found none.`,"#ff0000")
            } else {
                let goldScavenged = p.lv * 100n;
                log(`While scavenging, you found ${formatNumber(goldScavenged)} gold!`, "var(--gold)");
                p.gold += goldScavenged;
                updateUI();
            }
        }
    },
    {
        name: "Robbed at night",
        weight: 5,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`Someone wanted to steal from you, but decided otherwise and fled in panic.`, "#ff0000")
            } else {
            let goldRobbed = p.lv * 10n;
            log(`While sleeping, someone sneaked into your camp and stole ${formatNumber(goldRobbed)} gold!`, "var(--gold)");
            p.gold = (p.gold - goldRobbed < 0n) ? 0n : p.gold - goldRobbed;
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
                    log(`You entered a shop, yet no one was inside. From the mess in the shop, it seems like they fled in panic.`, "#ff0000")
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
