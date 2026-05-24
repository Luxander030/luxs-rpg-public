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
    },
    {
        name: "Abandoned Campfire",
        weight: 12,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`The campfire is still warm. Whoever was here left in a hurry — a half-eaten meal sits beside it, and small footprints lead away into the dark.`, "#ff0000");
            } else {
                let restore = 30n * p.lv;
                p.hp = BigMath.min(p.hp + restore, p.mhp);
                p.sn = BigMath.min(p.sn + restore, p.msn);
                playHealSFX();
                log(`You warm yourself by an abandoned campfire. (+${formatNumber(restore)} HP and SN)`, "#fb923c");
                updateUI();
            }
        }
    },
    
    {
        name: "Wandering Healer",
        weight: 8,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`A healer's cart sits overturned on the road. Vials of medicine are shattered across the ground. You don't want to know what happened here.`, "#ff0000");
            } else {
                let restore = 80n * p.lv;
                p.hp = BigMath.min(p.hp + restore, p.mhp);
                p.mp = BigMath.min(p.mp + restore, p.mmp);
                playHealSFX();
                log(`A wandering healer tends to your wounds. (+${formatNumber(restore)} HP and MP)`, "#a8ff78");
                updateUI();
            }
        }
    },
    
    {
        name: "Fallen Star",
        weight: 6,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`A crater sits where a star once fell. The ground around it is scorched black. Someone has already taken whatever was inside.`, "#ff0000");
            } else {
                let spGained = BigMath.max(1n, p.lv / 5n);
                p.sp += spGained;
                log(`A star has fallen nearby. You absorb its energy. (+${formatNumber(spGained)} SP)`, "#ffd700");
                updateUI();
            }
        }
    },
    
    {
        name: "Cursed Fog",
        weight: 10,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`A thick fog rolls in. Within it you hear whispers — not of fear, but of grief. They know your name.`, "#ff0000");
                p.sn = BigMath.max(p.sn - (p.msn / 4n), 0n);
                updateUI();
            } else {
                let sanLost = 20n * p.lv;
                p.sn = BigMath.max(p.sn - sanLost, 0n);
                log(`A cursed fog rolls through your camp. Your mind feels heavy. (-${formatNumber(sanLost)} SN)`, "#a78bfa");
                updateUI();
            }
        }
    },
    
    {
        name: "Forgotten Shrine",
        weight: 8,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`The shrine has been desecrated. The offerings are gone, the idol shattered. Someone left a single wilted flower in its place.`, "#ff0000");
            } else {
                let sanRestore = 60n * p.lv;
                p.sn = BigMath.min(p.sn + sanRestore, p.msn);
                playHealSFX();
                log(`You discover a forgotten shrine and pay your respects. (+${formatNumber(sanRestore)} SN)`, "#c084fc");
                updateUI();
            }
        }
    },
    
    {
        name: "Ambush",
        weight: 12,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`You sense an ambush ahead and round the corner to find... no one. Just a tripwire hastily cut, and boot prints leading away at a full sprint.`, "#ff0000");
            } else {
                let dmgTaken = 30n * p.lv;
                p.hp = BigMath.max(p.hp - dmgTaken, 1n);
                playHurtSFX();
                log(`You were ambushed! You managed to escape, but not without taking ${formatNumber(dmgTaken)} damage.`, "#ff4757");
                updateUI();
                startCombat();
            }
        }
    },
    
    {
        name: "Treasure Cache",
        weight: 7,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`You find a buried chest. Inside is a note: "If you're reading this, we already fled. Please don't follow us."`, "#ff0000");
            } else {
                let goldFound = p.lv * 250n;
                let gemFound = Math.random() < 0.3;
                p.gold += goldFound;
                p.totalGold += goldFound;
                if (gemFound) {
                    p.gems += 1n;
                    log(`You unearthed a hidden treasure cache! (+${formatNumber(goldFound)}g and a Gem!)`, "var(--gold)");
                } else {
                    log(`You unearthed a hidden treasure cache! (+${formatNumber(goldFound)}g)`, "var(--gold)");
                }
                updateUI();
            }
        }
    },
    
    {
        name: "Strange Dream",
        weight: 10,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`You fall asleep and dream of every face you've ended. They don't speak. They just stare. You wake up screaming.`, "#ff0000");
                p.sn = BigMath.max(p.sn - (p.msn / 3n), 0n);
                updateUI();
            } else {
                const roll = Math.random();
                if (roll < 0.33) {
                    let restore = 40n * p.lv;
                    p.sn = BigMath.min(p.sn + restore, p.msn);
                    playHealSFX();
                    log(`You have a strange but peaceful dream. (+${formatNumber(restore)} SN)`, "#c084fc");
                } else if (roll < 0.66) {
                    let spGained = 1n;
                    p.sp += spGained;
                    log(`You dream of forgotten knowledge. (+${formatNumber(spGained)} SP)`, "#ffd700");
                } else {
                    let sanLost = 25n * p.lv;
                    p.sn = BigMath.max(p.sn - sanLost, 0n);
                    log(`You have a terrible nightmare. (-${formatNumber(sanLost)} SN)`, "#a78bfa");
                }
                updateUI();
            }
        }
    },
    
    {
        name: "Mana Surge",
        weight: 8,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`You feel a surge of magical energy in the air — then it recoils from you, as if the world itself is rejecting your presence.`, "#ff0000");
                p.mp = BigMath.max(p.mp - (p.mmp / 4n), 0n);
                updateUI();
            } else {
                let restore = 70n * p.lv;
                p.mp = BigMath.min(p.mp + restore, p.mmp);
                log(`A surge of wild mana washes over you. (+${formatNumber(restore)} MP)`, "var(--mana)");
                updateUI();
            }
        }
    },
    
    {
        name: "Old Battlefield",
        weight: 6,
        run: () => {
            if (p.kills >= 1000000n) {
                log(`You walk through an old battlefield. The bones here are ancient — but fresh ones have been added recently. You recognise your own handiwork.`, "#ff0000");
                p.sn = BigMath.max(p.sn - (p.msn / 5n), 0n);
                updateUI();
            } else {
                const roll = Math.random();
                if (roll < 0.5) {
                    let goldFound = p.lv * 150n;
                    p.gold += goldFound;
                    p.totalGold += goldFound;
                    log(`You scavenge an old battlefield and find ${formatNumber(goldFound)}g among the ruins.`, "var(--gold)");
                } else {
                    let sanLost = 15n * p.lv;
                    p.sn = BigMath.max(p.sn - sanLost, 0n);
                    log(`You walk through an old battlefield. The sight of it unsettles you. (-${formatNumber(sanLost)} SN)`, "#a78bfa");
                }
                updateUI();
            }
        }
    },    
];
