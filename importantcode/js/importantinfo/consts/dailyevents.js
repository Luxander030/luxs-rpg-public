const dayEvents = [
    {
        name: "Tranquil Spring",
        weight: 15,
        run: () => {
            let restore = 50n * p.lv;
            p.hp = (p.hp + restore > p.mhp) ? p.mhp : p.hp + restore;
            p.mp = (p.mp + restore > p.mmp) ? p.mmp : p.mp + restore;
            p.sn = (p.sn + restore > p.msn) ? p.msn : p.sn + restore;
            log(`You discovered a Tranquil Spring! (+${formatNumber(restore)} All Stats)`, "#00ffff");
            updateUI();
        }
    },
    {
        name: "Blood Moon",
        weight: 10,
        run: () => {
            p.sn = p.sn / 4n;
            p.hp = p.hp / 2n;
            log("A Blood Moon rises... your health is halved and sanity is quartered.", "#ff0000");
            updateUI();
            startCombat(); // Force a combat after the debuff
        }
    },
    {
        name: "Lucky Scavenge",
        weight: 10,
        run: () => {
            let goldScavenged = p.lv * 100n
            log(`While scavenging, you found ${formatNumber(goldScavenged)} gold!`,"var(--gold)")
            p.gold += goldScavenged
            updateUI();
        }
    },
    {
        name: "Robbed at night",
        weight: 5,
        run: () => {
            let goldRobbed = p.lv * 10n
            log(`While sleeping, someone sneaked into your camp and stole ${formatNumber(goldRobbed)} gold!`,"var(--gold)")
            p.gold = (p.gold - goldRobbed < 0n) ? 0n : p.gold - goldRobbed;
            updateUI();
        }
    },
    {
        name: "Merchant",
        weight: 25,
        run: () => startShop()
    },
    {
        name: "Combat",
        weight: 50,
        run: () => startCombat()
    }
];
