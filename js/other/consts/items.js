const inventoryItems = [
    /*
    ###########################################################################################
    ##############################################################################################
    Healing Related Items                                                                      ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "healthVial",
        name: "Health Vial",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A vial filled with a red liquid. Heals you back up to full.",
        edible: true,
        info: [
            {label: "HP", value: () => p.mhp-p.hp}
        ],
        run: () => {
            p.hp = p.mhp
            playHealSFX();
            log(`Item used: "Health Vial"`, "#5dbe3f")
            log(`Fully healed.`, "#5dbe3f")
            return updateUI();
        }
    },
    {
        id: "manaWell",
        name: "Mana Well",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A vial filled with a mystical, blue liquid. Restores all mana.",
        edible: true,
        info: [
            {label: "MP", value: () => p.mmp-p.mp}
        ],
        run: () => {
            p.mp = p.mmp
            log(`Item used: "Mana Well"`, "var(--mana)")
            log(`Mana replenished.`, "var(--mana)")
            return updateUI();
        }
    },
    {
        id: "clarityTonic",
        name: "Clarity Tonic",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A vial filled with a purple liquid. It pulses with a calm lunar light. Restores all sanity.",
        edible: true,
        info: [
            {label: "SN", value: () => p.msn-p.sn}
        ],
        run: () => {
            p.sn = p.msn
            log(`Item used: "Clarity Tonic"`, "var(--sanity)")
            log(`Sanity stabilized.`, "var(--sanity)")
            return updateUI();
        }
    },
    {
        id: "apple",
        name: "Apple",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A red, perfect apple which heals for a small amount of HP.",
        edible: true,
        info: [
            {label: "HP", value: () => 50n * p.lv}
        ],
        run: () => {
            let scaledAmount = 50n * p.lv
            p.hp += scaledAmount
            playHealSFX();
            log(`Item used: "Apple"`, "#5dbe3f")
            log(`Regained ${formatNumber(scaledAmount)} HP.`, "#5dbe3f")
            return updateUI();
        }
    },
    {
        id: "abbieApple",
        name: "Abbie's Apple",
        rarity: "Epic (Crossover)",
        rarityColor: "var(--epicItem)",
        description: "An apple given from our favorite goob which heals for an insane amount of HP.",
        edible: true,
        info: [
            {label: "HP", value: () => 10000n * p.lv}
        ],
        run: () => {
            let scaledAmount = 10000n * p.lv
            p.hp += scaledAmount
            playHealSFX();
            log(`Item used: "Abbie's Apple"`, "#5dbe3f")
            log(`Regained ${formatNumber(scaledAmount)} HP.`, "#5dbe3f")
            return updateUI();
        }
    },
    {
        id: "bloodStone",
        name: "Blood Stone",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "A red stone which heals for a moderate amount of HP.",
        info: [
            {label: "HP", value: () => 100n * p.lv}
        ],
        run: () => {
            let scaledAmount = 100n * p.lv
            p.hp += scaledAmount
            playHealSFX();
            log(`Item used: "Blood Stone"`, "#5dbe3f")
            log(`Regained ${formatNumber(scaledAmount)} HP.`, "#5dbe3f")
            return updateUI();
        }
    },
    {
        id: "bloodStoneMed",
        name: "Medium Blood Stone",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "A medium sized red stone which heals for a large amount of HP.",
        info: [
            {label: "HP", value: () => 150n * p.lv}
        ],
        run: () => {
            let scaledAmount = 150n * p.lv
            p.hp += scaledAmount
            playHealSFX();
            log(`Item used: "Medium Blood Stone"`, "#5dbe3f")
            log(`Regained ${formatNumber(scaledAmount)} HP.`, "#5dbe3f")
            return updateUI();
        }
    },
    {
        id: "bloodStoneLarge",
        name: "Large Blood Stone",
        rarity: "Legendary",
        rarityColor: "var(--legendaryItem)",
        description: "A large red stone which heals for a very large amount of HP.",
        info: [
            {label: "HP", value: () => 200n * p.lv}
        ],
        run: () => {
            let scaledAmount = 200n * p.lv
            p.hp += scaledAmount
            playHealSFX();
            log(`Item used: "Large Blood Stone"`, "#5dbe3f")
            log(`Regained ${formatNumber(scaledAmount)} HP.`, "#5dbe3f")
            return updateUI();
        }
    },
    {
        id: "glassHourglass",
        name: "Glass Hourglass",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "A blue, glass hourglass with red sand inside. It is said that this can transfer all of your Mana into health...",
        info: [
            {label: "HP", value: () => p.mp},
            {label: "MP", value: () => -p.mp}
        ],
        run: () => {
            let helperVar = p.mp
            p.hp += p.mp
            p.mp = 0n
            log(`Item used: "Glass Hourglass"`,"var(--mana)")
            log(`Restored ${formatNumber(helperVar)} HP by sacrificing ${formatNumber(helperVar)} Mana`,"var(--hp)")
            return updateUI();
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Coin Related Items                                                                         ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "isaacsCoin",
        name: "Gambler's Coin",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A small, yellow coin, with an image of a slot machine on it. I think this allows you to double your money?",
        run: () => {
            if (Math.random() < 0.15) {
                log(`Item used: "Gambler's Coin"`,"var(--gold)")
                log(`You got lucky! Gold doubled!`,"var(--gold)")
                p.gold = p.gold * 2n
            } else {
                log(`Item used: "Gambler's Coin"`,"var(--gold)")
                log(`The coin decided to hate you. You lost all your gold.`,"var(--sanity)")
                p.gold = 0n
            }
            return updateUI();
        }
    },
    {
        id: "bagOfGoldSmall",
        name: "Small Bag of Gold",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A small bag of gold which gives you a small amount of gold.",
        info: [
            {label: "g", value: () => 50n * p.lv}
        ],
        run: () => {
            let scaledAmount = 50n * p.lv
            p.gold += scaledAmount
            p.totalGold += scaledAmount
            log(`Item used: "Small Bag of Gold"`,"var(--gold)")
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)")
            playCoinSFX();
            return updateUI();
        }
    },
    {
        id: "bagOfGoldMed",
        name: "Medium Bag of Gold",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A medium bag of gold which gives you a medium amount of gold.",
        info: [
            {label: "g", value: () => 100n * p.lv}
        ],
        run: () => {
            let scaledAmount = 100n * p.lv
            p.gold += scaledAmount
            p.totalGold += scaledAmount
            log(`Item used: "Medium Bag of Gold"`,"var(--gold)")
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)")
            playCoinSFX();
            return updateUI();
        }
    },
    {
        id: "bagOfGoldLarge",
        name: "Large Bag of Gold",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A large bag of gold which gives you a large amount of gold.",
        info: [
            {label: "g", value: () => 150n * p.lv}
        ],
        run: () => {
            let scaledAmount = 150n * p.lv
            p.gold += scaledAmount
            p.totalGold += scaledAmount
            log(`Item used: "Large Bag of Gold"`,"var(--gold)")
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)")
            playCoinSFX();
            return updateUI();
        }
    },
    {
        id: "desperationTotem",
        name: "Desperation Totem",
        rarity: "Legendary",
        rarityColor: "var(--legendaryItem)",
        description: "Sets all stats (HP, MP, SN) to 7. In exchange, grants a massive gold payout.",
        info: [
            {label: "g", value: () => (p.hp + p.mp + p.sn) * 2n}
        ],
        run: () => {
            let payout = (p.hp + p.mp + p.sn) * 2n;
            p.hp = 7n;
            p.mp = 7n;
            p.sn = 7n;
            p.gold += payout;
            p.totalGold += payout;
            log(`The Totem accepted your sacrifice.`, "var(--gold)");
            return updateUI();
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Stat Sacrificial Related Items                                                             ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "HPMPConvert",
        name: "Converter (HP ➡ MP)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "A strange, red and blue spherical object which converts a small amount of your HP into MP. Use with caution; it doesn't care if you don't have enough to give.",
        info: [
            {label: "HP", value: () => -(50n * p.lv)},
            {label: "MP", value: () => 50n * p.lv}
        ],
        run: () => {
            let scaledAmount = 50n * p.lv
            p.hp -= scaledAmount
            p.mp += scaledAmount
            playHurtSFX();
            log(`Item used: "Converter"`,"var(--sanity)")
            log(`Converted ${formatNumber(scaledAmount)} HP into ${formatNumber(scaledAmount)} MP.`,"var(--sanity)")
            return updateUI();
        }
    },
    {
        id: "HPSNConvert",
        name: "Converter (HP ➡ SN)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "A strange, red and purple spherical object which converts a small amount of your HP into SN. Use with caution; it doesn't care if you don't have enough to give.",
        info: [
            {label: "HP", value: () => -(50n * p.lv)},
            {label: "SN", value: () => 50n * p.lv}
        ],
        run: () => {
            let scaledAmount = 50n * p.lv
            p.hp -= scaledAmount
            p.sn += scaledAmount
            playHurtSFX();
            log(`Item used: "Converter"`,"var(--sanity)")
            log(`Converted ${formatNumber(scaledAmount)} HP into ${formatNumber(scaledAmount)} SN.`,"var(--sanity)")
            return updateUI();
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    SP/EXP Related Items                                                                       ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "spBook",
        name: "Martyr's Book",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "A book you collected from a previous adventurer. It says something along the lines of 'Do not anger Lux.' Shouldn't be that important, right?",
        info: [
            {label: "SP", value: () => p.lv * 5n}
        ],
        run: () => {
            let scaledAmount = p.lv * 5n
            p.sp += scaledAmount
            log(`Item used: "Martyr's Book"`,"var(--gold)")
            log(`You gained ${formatNumber(scaledAmount)} SP.`,"var(--exp)")
            return updateUI();
        }
    },
    {
        id: "SNSPConvert",
        name: "Converter (SN ➡ SP)",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "A strange, purple and green spherical object which converts a small amount of your sanity into SP. Use with caution; it doesn't care if you don't have enough to give.",
        info: [
            {label: "SN", value: () => -(50n * p.lv)},
            {label: "SP", value: () => 50n * p.lv}
        ],
        run: () => {
            let scaledAmount = 50n * p.lv
            p.sn -= scaledAmount
            p.sp += scaledAmount
            log(`Item used: "Converter"`,"var(--sanity)")
            log(`Converted ${formatNumber(scaledAmount)} SN into ${formatNumber(scaledAmount)} SP.`,"var(--sanity)")
            return updateUI();
        }
    },
    {
        id: "taxmanLedger",
        name: "Taxman's Ledger",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "A heavy book. Instantly doubles your SP, but takes 90% of your current Gold as 'processing fees'.",
        info: [
            {label: "SP", value: () => p.sp * p.lv},
            {label: "Gold", value: () => -(p.gold - (p.gold / 10n))}
        ],
        run: () => {
            p.sp *= 2n;
            p.gold /= 10n; 
            log(`Knowledge is power, but it isn't cheap.`, "var(--exp)");
            return updateUI();
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Other/Unsortable Items                                                                     ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "luxTriangle",
        name: "Lux's Runic Triangle",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "A strange, purple shape which looks like ⟁. It almost feels weightless...?",
        run: () => {
            if (p.flags.bobVisits >= 50n) {
                LuxLog(`Lux: Please. Keep Bob away from this. I don't want him to turn one of these into bread.`)
            } else if (p.kills >= 1000000n || p.flags.genocideRouteTimesCompleted === true) {
                LuxLog(`Lux: You want to use this? After commiting a genocide? You really are clueless.`)
                p.hp = p.mhp / 2n
            } else if (p.spares >= 1000000n || p.flags.pacifistRouteTimesCompleted === true) {
                LuxLog(`Lux: Hello again. It's good to see you.`)
                p.hp = p.mhp
                p.sn = p.msn
                p.mp = p.mmp
            } else if (p.uniqueEnemyKills.kitsune >= 5) {
                LuxLog(`Lux: I see you have been thinning my ranks. Let me return the favor with a gift of mine.`)
                p.hp = 1n
                p.mp = 0n
                p.sn = 1n
            } else if (p.day >= 1000n) {
                LuxLog(`Lux: Over 3 years lived... and you have not died yet... interesting...`)
            } else {
                let roll = Math.random()
                if (roll < 0.1) {
                    LuxLog(`Lux: Want a song recommendation? "Goodnight Sweet Angel" by "Epic" on Spotify.`)
                } else if (roll < 0.2) {
                    LuxLog(`Lux: I hid them. These triangles. Surprised you found one.`)
                } else if (roll < 0.3) {
                    LuxLog(`Lux: Should you get a gem?`)
                    if (Math.random() < 0.1) {
                        LuxLog(`Lux: Why not.`)
                        log(`<span style="color: var(--lux)">Lux</span> gave you a gem.`, "var(--epicItem)")
                        p.gems += 1n
                    } else {
                        LuxLog(`Lux: Nah.`)
                    }
                } else if (roll < 0.4) {
                    LuxLog(`Lux: Careful. Don't poke yourself on this. They're very pointy.`)
                } else if (roll < 0.5) {
                    LuxLog(`Lux: These are quite pointy, are they not?`)
                } else if (roll < 0.6) {
                    LuxLog(`Lux: These are made from obsidian by the way. But not normal obsidian. This obsidian is much, much stronger.`)
                } else if (roll < 0.7) {
                    LuxLog(`Lux: What do you want.`)
                } else if (roll < 0.8) {
                    let reroll = Math.random()
                    if (reroll < 0.1) {
                        LuxLog(`Lux: Fine. If you're so bored that you don't have anything better to do, I'll break the 4th wall. You have ${formatNumber(p.gold)}g.`)
                    } else if (reroll < 0.2) {
                        LuxLog(`Lux: Fine. If you're so bored that you don't have anything better to do, I'll break the 4th wall. You have ${formatNumber(p.gems)} gems.`)
                    } else if (reroll < 0.3) {
                        LuxLog(`Lux: Fine. If you're so bored that you don't have anything better to do, I'll break the 4th wall. You have ${formatNumber(p.hp)} HP.`)
                    } else if (reroll < 0.4) {
                        LuxLog(`Lux: Fine. If you're so bored that you don't have anything better to do, I'll break the 4th wall. You have ${formatNumber(p.mp)} Mana.`)
                    } else if (reroll < 0.5) {
                        LuxLog(`Lux: Fine. If you're so bored that you don't have anything better to do, I'll break the 4th wall. You have ${formatNumber(p.sn)} Sanity.`)
                    } else if (reroll < 0.6) {
                        LuxLog(`Lux: Fine. If you're so bored that you don't have anything better to do, I'll break the 4th wall. You have ${formatNumber(p.sp)} SP.`)
                    } else if (reroll < 0.7) {
                        LuxLog(`Lux: Fine. If you're so bored that you don't have anything better to do, I'll break the 4th wall. You have ${formatNumber(p.exp)} EXP.`)
                    } else if (reroll < 0.8) {
                        LuxLog(`Lux: Fine. If you're so bored that you don't have anything better to do, I'll break the 4th wall. You have ${formatNumber(p.kills)} kills.`)
                    } else if (reroll < 0.9) {
                        LuxLog(`Lux: Fine. If you're so bored that you don't have anything better to do, I'll break the 4th wall. You have ${formatNumber(p.spares)} spares.`)
                    } else {
                        LuxLog(`Lux: Fine. If you're so bored that you don't have anything better to do, I'll break the 4th wall. Bob has visited you ${formatNumber(p.flags.bobVisits)} times.`)
                    }
                } else if (roll < 0.9) {
                    LuxLog(`Lux: Don't tell <span style="color: var(--bob);">Bob</span>, but I actually <i>do</i> enjoy his sandwiches.`)
                } else {
                    LuxLog(`Lux: Oh. Hello. I see you found one of my runic triangles.`)
                }
            }
            return updateUI();
        }
    },
    {
        id: "luxSandwich",
        name: "Lux's Sandwich",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "A simple club sandwich. Smells like '#3c23a8' and some sort of cheese you've never smelt before. I think the cheese came from the Netflix repo? Or did it come from the Meteor Client repo? Wherever it came from, it is certainly a potent smelling cheese.",
        edible: true,
        info: [
            {label: "HP", value: () => p.mhp * p.spares}
        ],
        run: () => {
            let scaledAmount = p.mhp * p.spares
            p.hp += scaledAmount
            LuxLog(`Item used: "Lux's Sandwich"`)
            LuxLog(`Regained ${formatNumber(scaledAmount)} HP.`)
            return updateUI();
        }
    },
    {
        id: "luxLemon",
        name: "Lux's Lemon",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "A perfect, yellow lemon. It is so incredibly sour — don't use this unless you want to lose your tongue. Because this lemon. Is that fucking sour.",
        edible: true,
        info: [
            {label: "HP", value: () => BigMath.pow(p.mhp, 2n)},
            {label: "SN", value: () => -(p.sn - 1n)}
        ],
        run: () => {
            let scaledAmount = BigMath.pow(p.mhp, 2n)
            p.hp += scaledAmount
            p.sn = 1n
            LuxLog(`Item used: "Lux's Lemon"`)
            LuxLog(`Regained ${formatNumber(scaledAmount)} HP.`)
            LuxLog(`Lost ${p.msn - 1n} SN.`)
            if (Math.random() < 0.1) {
                LuxLog(`Lux: Refreshing, isn't it? It really clears the mind. Or shatters it. Potato potatoh.`)
            }
            return updateUI();
        }
    },
    {
        id: "bobBread",
        name: "Bob's Bread",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "A simple loaf of bread. Yet it pulses with... Meep's? What? This should not be possible...",
        edible: true,
        info: [
            {label: "HP", value: () => p.mhp * p.mhp}
        ],
        run: () => {
            let scaledAmount = p.mhp * p.mhp
            p.hp += scaledAmount
            p.flags.bobVisits += 1n
            log(`Item used: "Bob's Bread"`, "var(--bob)")
            log(`Regained ${formatNumber(scaledAmount)} HP.`, "var(--bob)")
            return updateUI();
        }
    },
    {
        id: "unobtainableItem",
        name: "unobtainableItem",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "HOW DID YOU GET THIS??? PLEASE EXPLAIN.",
        run: () => {
            addExperience(1n)
            LuxLog(`Item used: "unobtainableItem"`)
            LuxLog(`Nothing happened...`)
            return updateUI();
        }
    },
    {
        id: "MissingNoCore",
        name: "MissingNo.'s Core",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "A flickering mass of pixels. It seems to be trying to overwrite your save file... or maybe it's just hungry for variables. We don't know.",
        run: () => {
            // Randomly swap two major stats
            const stats = ['hp', 'mp', 'sn', 'gold', 'sp', 'dmgmult'];
            const s1 = stats[Math.floor(Math.random() * stats.length)];
            const s2 = stats.filter(s => s !== s1)[Math.floor(Math.random() * (stats.length - 1))];
            
            let temp = p[s1];
            p[s1] = p[s2];
            p[s2] = temp;

            log(`ERR: Variable Overflow. ${s1} and ${s2} have been swapped.`, "#ff0033");
            if (p.flags.bobVisits > 0n) {
                LuxLog(`Lux: Bob told you not to touch the source code.`);
            }
            return updateUI();
        }
    },
    {
        id: "bobsMysteriousBox",
        name: "Bob's Cardboard Box",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "A box that smells like wet cardboard and... cosmic energy? Bob says there's a 'surprise' inside.",
        run: () => {
            const outcomes = [
                () => { p.gold += 1000000n; return "A million gold! Bob was feeling generous."; },
                () => { p.hp = 1n; return "The box was empty. You felt so disappointed you took emotional damage."; },
                () => { p.lv += 1n, p.sp += 1n; return "You found a 'Level Up' sticker inside. It actually worked!"; },
                () => { p.flags.bobVisits += 1n; return "Inside was a photo of Bob. You feel... watched."; }
            ];
            const result = outcomes[Math.floor(Math.random() * outcomes.length)]();
            log(`You opened the box: ${result}`, "var(--bob)");
            return updateUI();
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Crossover Items                                                                            ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "circleOreoBox",
        name: "Miss Circle's Oreo Pack",
        rarity: "Legendary (Crossover)",
        rarityColor: "var(--legendaryItem)",
        description: "A pack of Oreos. (Un)surprisingly, the pack is already open and is missing half of the Oreos inside.",
        edible: true,
        info: [
            {label: "HP", value: () => p.mhp * p.kills}
        ],
        run: () => {
            let scaledAmount = p.mhp * p.kills
            p.hp += scaledAmount
            log(`Item used: "Miss Circle's Oreo Box"`, "var(--legendaryItem)")
            log(`Regained ${formatNumber(scaledAmount)} HP.`, "#8a3500")
            return updateUI();
        }
    },
    {
        id: "corrucyst",
        name: "Corrucyst",
        rarity: "Legendary (Crossover)",
        rarityColor: "var(--legendaryItem)",
        description: "A pink, crystalline, spherical object. It smells faintly of ozone. Perhaps there's knowledge in this?",
        info: [
            {label: "SP", value: () => (p.sp * p.lv) || 1n}
        ],
        run: () => {
            let scaledAmount = (p.sp * p.lv) || 1n
            p.sp += scaledAmount
            log(`Item used: "Corrucyst"`, "var(--funfriend)")
            log(`Gained ${formatNumber(scaledAmount)} SP.`, "var(--funfriend)")
            return updateUI();
        }
    },
    {
        id: "mindspike",
        name: "Mindspike",
        rarity: "Legendary (Crossover)",
        rarityColor: "var(--legendaryItem)",
        description: "A claw like object. Seems like it can connect to a nervous system? Maybe you could figure out how an enemy works?",
        info: [
            {label: "DmgMult", value: () => 10n * p.lv}
        ],
        run: () => {
            let scaledAmount = 10n * p.lv
            p.dmgmult += scaledAmount
            log(`Item used: "Mindspike"`, "var(--funfriend)")
            log(`Gained ${formatNumber(scaledAmount)}% DmgMult.`, "var(--funfriend)")
            return updateUI();
        }
    },
    {
        id: "charaKnife",
        name: "Chara's Knife",
        rarity: "Legendary (Crossover)",
        rarityColor: "var(--legendaryItem)",
        description: "A red, bloody knife. It has seen many genocides. Will you be used by it as well?",
        run: () => {
            if (p.skills.includes('charaKnife')) {

            } else {
                p.skills.push('charaKnife')
            }
            p.inventory.equippedWeapon = "charaKnife"
            log(`Equipped "Chara's Knife"`, "#ff0000")
            return updateUI();
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Weapon Items                                                                               ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "noxNocturnal",
        name: "Nox Nocturnal",
        rarity: "Mythic",
        rarityColor: "var(--mythicItem)",
        description: "Made from an obsidian base and with an amethyst on the head, this staff feels cool to the touch. The amethyst pulses with a calming, lunar light, which seems to absorb the surrounding light in the vicinity. There's a note tied to the handle of the staff: \"Beware. This staff is not to be used by the mentally fragile.\"",
        run: () => {
            if (p.skills.includes('noxNocturnalBeam')) {
            } else {
                p.skills.push('noxNocturnalBeam', 'noxNocturnalExplosion', 'noxNocturnalSiphon')
            }
            p.inventory.equippedWeapon = "noxNocturnal"
            let scaledAmount = p.sn / 4n
            p.sn = BigMath.max(p.sn - scaledAmount, 0n); 
            p.msn = BigMath.max(p.msn - scaledAmount, 0n);
            log(`Equipped "Nox Nocturnal"`, "var(--lux)")
            return updateUI();
        }
    },
    {
        id: "fryingPan",
        name: "Frying Pan",
        rarity: "Mythic",
        rarityColor: "var(--mythicItem)",
        description: "Just... a frying pan... what the fu-",
        run: () => {
            if (p.skills.includes('fryingPan')) {
            } else {
                p.skills.push('fryingPan')
            }
            p.inventory.equippedWeapon = "fryingPan"
            log(`Equipped "Frying Pan"`, "var(--lux)")
            return updateUI();
        }
    },
    {
        id: "stoneSword",
        name: "Stone Sword",
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "A simple stone sword. Deals some more damage then a normal strike.",
        run: () => {
            p.inventory.equippedWeapon = "stoneSword"
            log(`Equipped "Stone Sword"`, "var(--uncommonItem)")
            return updateUI();
        }
    },
    {
        id: "ironSword",
        name: "Iron Sword",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "An iron sword. Much stronger and sharper then a stone one.",
        run: () => {
            p.inventory.equippedWeapon = "ironSword"
            log(`Equipped "Iron Sword"`, "var(--rareItem)")
            return updateUI();
        }
    },
    {
        id: "diamondSword",
        name: "Diamond Sword",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "A diamond sword. Much, much stronger then an iron one.",
        run: () => {
            p.inventory.equippedWeapon = "diamondSword"
            log(`Equipped "Diamond Sword"`, "var(--epicItem)")
            return updateUI();
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Enemy Drops                                                                                ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "blackShard",
        name: "Black Shard",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A black, sharp shard. Seems like it could sell for a bit of money.",
        info: [
            {label: "g", value: () => 10n * p.lv}
        ],
        run: () => {
            let scaledAmount = 10n * p.lv
            p.gold += scaledAmount
            p.totalGold += scaledAmount
            log(`Item sold: "Black Shard"`,"var(--gold)")
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)")
            return updateUI();
        }
    },
    {
        id: "armoredCarapace",
        name: "Armored Carapace",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A very solid piece of carapace. It could probably be sold for a good amount.",
        info: [
            {label: "g", value: () => 25n * p.lv}
        ],
        run: () => {
            let scaledAmount = 25n * p.lv
            p.gold += scaledAmount
            p.totalGold += scaledAmount
            log(`Item sold: "Armored Carapace"`,"var(--gold)")
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)")
            return updateUI();
        }
    },
    {
        id: "drowElfEar",
        name: "Drow Elf Ear",
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "The ear of a Drow Elf. Seems as if it could stabilize your mind.",
        info: [
            {label: "SN", value: () => 10n * p.lv}
        ],
        run: () => {
            let scaledAmount = 10n * p.lv
            p.sn += scaledAmount
            log(`Item used: "Drow Elf Ear"`,"var(--sanity)")
            log(`Gained ${formatNumber(scaledAmount)} SN`,"var(--sanity)")
            return updateUI();
        }
    },
    {
        id: "elfEar",
        name: "Elf Ear",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A rare ear of an Elf. Could sell for a good amount.",
        info: [
            {label: "g", value: () => 50n * p.lv}
        ],
        run: () => {
            let scaledAmount = 50n * p.lv
            p.gold += scaledAmount
            p.totalGold += scaledAmount
            log(`Item sold: "Elf Ear"`,"var(--gold)")
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)")
            return updateUI();
        }
    },
    {
        id: "rock",
        name: "Rock",
        rarity: "Junk",
        rarityColor: "var(--commonItem)",
        description: "A rock. Literally, just a rock.",
        run: () => {
            log(`Item used: "Rock"`,"var(--gold)")
            log(`Nothing happened.`,"var(--gold)")
            return updateUI();
        }
    },
    {
        id: "chunkOfIron",
        name: "Chunk of Iron",
        rarity: "Uncommon",
        rarityColor: "var(--commonItem)",
        description: "A chunk of raw iron. You could sell it now, or you could probably sell it later for a lot more once you refine it.",
        info: [
            {label: "g", value: () => 50n * p.lv}
        ],
        run: () => {
            if (p.skills.includes("fireball")) {
                checkSpaceAndAddItem("Iron Bar");
                log(`Refined "Chunk of Iron" into "Iron Bar"`);
                return updateUI();
            } else {
                let scaledAmount = 50n * p.lv
                p.gold += scaledAmount
                p.totalGold += scaledAmount
                log(`Item sold: "Chunk of Iron"`,"var(--gold)");
                log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)");
                return updateUI();
            }
        }
    },
    {
        id: "ironBar",
        name: "Iron Bar",
        rarity: "Common",
        rarityColor: "var(--uncommonItem)",
        description: "A chunk of iron refined into an Iron Bar. Worth a lot more than a chunk of iron.",
        info: [
            {label: "g", value: () => 100n * p.lv}
        ],
        run: () => {
            let scaledAmount = 100n * p.lv;
            p.gold += scaledAmount;
            p.totalGold += scaledAmount;
            log(`Item sold: "Iron Bar"`,"var(--gold)");
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)");
            return updateUI();
        }
    },
    {
        id: "glassShard",
        name: "Glass Shard",
        rarity: "Junk",
        rarityColor: "var(--commonItem)",
        description: "A glass shard. Nothing else to it.",
        info: [
            {label: "g", value: () => 1n * p.lv}
        ],
        run: () => {
            let scaledAmount = 1n * p.lv;
            p.gold += scaledAmount;
            p.totalGold += scaledAmount;
            log(`Item sold: "Glass Shard"`,"var(--gold)");
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)");
            return updateUI();
        }
    },
    {
        id: "bloodBatEye",
        name: "Blood Bat Eye",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "The eye of a blood bat. Quite valuable to certain people.",
        info: [
            {label: "g", value: () => 75n * p.lv}
        ],
        run: () => {
            let scaledAmount = 75n * p.lv;
            p.gold += scaledAmount;
            p.totalGold += scaledAmount;
            log(`Item sold: "Blood Bat Eye"`,"var(--gold)");
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)");
            return updateUI();
        }
    },
    {
        id: "vampireTooth",
        name: "Vampire Tooth",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "The tooth of a vampire. Quite valuable to certain people.",
        info: [
            {label: "g", value: () => 85n * p.lv}
        ],
        run: () => {
            let scaledAmount = 85n * p.lv;
            p.gold += scaledAmount;
            p.totalGold += scaledAmount;
            log(`Item sold: "Vampire Tooth"`,"var(--gold)");
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)");
            return updateUI();
        }
    },
    {
        id: "ash",
        name: "Ash",
        rarity: "Junk",
        rarityColor: "var(--commonItem)",
        description: "Ash. Literally, just ash. Seems warm though.",
        info: [
            {label: "g", value: () => 2n * p.lv}
        ],
        run: () => {
            let scaledAmount = 2n * p.lv;
            p.gold += scaledAmount;
            p.totalGold += scaledAmount;
            log(`Item sold: "Ash"`,"var(--gold)");
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)");
            return updateUI();
        }
    },
    {
        id: "bottleOWater",
        name: "Bottle O' Water",
        rarity: "Junk",
        rarityColor: "var(--commonItem)",
        description: "Just a bottle of water. Seems as if it has SOME healing properties.",
        edible: true,
        info: [
            {label: "HP", value: () => 1n * p.lv}
        ],
        run: () => {
            let scaledAmount = 1n * p.lv;
            p.hp += scaledAmount;
            log(`Item used: "Bottle O' Water"`,"var(--gold)");
            log(`Healed for ${formatNumber(scaledAmount)} HP`,"var(--gold)");
            return updateUI();
        }
    },
    {
        id: "diamond",
        name: "Diamond",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "A diamond harvested from a Diamond Golem. Quite expensive and worth a lot to other people. Could sell for a VERY good amount.",
        info: [
            {label: "g", value: () => 500n * p.lv}
        ],
        run: () => {
            let scaledAmount = 500n * p.lv;
            p.gold += scaledAmount;
            p.totalGold += scaledAmount;
            log(`Item sold: "Diamond"`,"var(--gold)");
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)");
            return updateUI();
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Tarot/Spectral Cards                                                                       ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "tarot_the_fool",
        name: "The Fool (0)",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A carefree leap into the unknown. Rewards you for every day survived.",
        info: [
            {label: "g", value: () => 5n * p.day}
        ],
        run: () => {
            let scaledAmount = p.day * 5n;
            p.gold += scaledAmount;
            p.totalGold += scaledAmount;
            log(`Used Tarot Card: The Fool`, "var(--gold)")
            log(`Gained ${formatNumber(scaledAmount)}g`, "var(--gold)")
            return updateUI();
        }
    },
    {
        id: "tarot_the_magician",
        name: "The Magician (1)",
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "Mastery over the arcane. Permanently reduces the cost of your skills.",
        info: [
            {label: "ManaRed", value: () => 10n}
        ],
        run: () => {
            if (p.manaReduction === 100n) {
                p.mp = p.mmp
                log(`Used Tarot Card: The Magician`, "var(--mana)")
                log(`Regained All Mana`, "var(--mana)")
                return updateUI();
            } else {
                p.manaReduction = BigMath.min(p.manaReduction + 10n, 100n)
                log(`Used Tarot Card: The Magician`, "var(--mana)")
                log(`Mana Reduction increased by 10%`, "var(--mana)")
                return updateUI();
            }
        }
    },
    {
        id: "tarot_the_high_priestess",
        name: "The High Priestess (2)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Unlock the secrets within. Grants Skill Points for your progression.",
        info: [
            {label: "SP", value: () => 2n * p.lv}
        ],
        run: () => {
            let scaledAmount = 2n * p.lv
            let SNscaledAmount = 20n * p.lv
            p.sp += scaledAmount
            log(`Used Tarot Card: The High Priestess`, "var(--exp)")
            log(`Regained ${formatNumber(SNscaledAmount)} Sanity and gained ${formatNumber(scaledAmount)} SP`, "var(--exp)")
            p.sn += SNscaledAmount
            return updateUI();
        }
    },
    {
        id: "tarot_the_empress",
        name: "The Empress (3)",
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "A gift of vitality and wealth. Increases Max HP and fills your pockets.",
        info: [
            {label: "HP", value: () => 10n * p.lv},
            {label: "g", value: () => 100n * p.lv}
        ],
        run: () => {
            let scaledAmountHP = 10n * p.lv
            let scaledAmountG = 100n * p.lv
            p.mhp += scaledAmountHP;
            p.hp += scaledAmountHP;
            p.gold += scaledAmountG;
            p.totalGold += scaledAmountG;
            log(`Used Tarot Card: The Empress`, "var(--mana)")
            log(`Gained ${formatNumber(scaledAmountHP)} HP and ${formatNumber(scaledAmountG)}g`, "var(--mana)")
            return updateUI();
        }
    },
    {
        id: "tarot_the_emperor",
        name: "The Emperor (4)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Authority through conquest. Your Damage Multiplier rises with every soul claimed.",
        info: [
            {label: "DMG Multiplier", value: () => 5n * p.lv}
        ],
        run: () => {
            let scaledAmountDMGMULT = 5n * p.lv
            p.dmgmult += scaledAmountDMGMULT
            let bossBonus = ((p.uniqueEnemyKills.fieryWillOWisp + p.uniqueEnemyKills.duriel) || 1n) * 50n;
            p.gold += bossBonus;
            log(`Used Tarot Card: The Emperor`, "var(--hp)")
            log(`Gained ${formatNumber(scaledAmountDMGMULT)} DMGMult% and gained ${formatNumber(bossBonus)}g`, "var(--hp)")
            return updateUI();
        }
    },
    {
        id: "tarot_the_hierophant",
        name: "The Hierophant (5)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Ancient wisdom bestowed upon you. Greatly increases your Experience.",
        info: [
            {label: "EXP", value: () => 500n * p.lv}
        ],
        run: () => {
            let scaledAmount = 500n * p.lv
            addExperience(scaledAmount)
            p.sn = p.msn;
            log(`Used Tarot Card: The Hierophant`, "var(--mana)")
            log(`Gained ${formatNumber(scaledAmount)} EXP and refilled sanity`, "var(--mana)")
            return updateUI();
        }
    },
    {
        id: "tarot_the_lovers",
        name: "The Lovers (6)",
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "A harmonious union of body and soul. Increases Max HP and Max MP.",
        info: [
            {label: "HP/MP", value: () => 15n * p.lv}
        ],
        run: () => {
            let scaledAmount = 15n * p.lv;
            p.mhp += scaledAmount;
            p.hp += scaledAmount;
            p.mmp += scaledAmount;
            p.mp += scaledAmount;
            log(`Used Tarot Card: The Lovers`, "var(--mana)");
            log(`Gained ${formatNumber(scaledAmount)} Max HP and Max MP`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_the_chariot",
        name: "The Chariot (7)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Charge forward with unstoppable momentum. Boosts Damage and EXP.",
        info: [
            {label: "DMG%", value: () => 5n * p.lv},
            {label: "EXP", value: () => 200n * p.lv}
        ],
        run: () => {
            let scaledDmg = 5n * p.lv;
            let scaledExp = 200n * p.lv;
            p.dmgmult += scaledDmg;
            addExperience(scaledExp)
            log(`Used Tarot Card: The Chariot`, "var(--mana)");
            log(`Gained ${formatNumber(scaledDmg)}% DMG Multiplier and ${formatNumber(scaledExp)} EXP`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_justice",
        name: "Justice (8)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Balance the scales of destiny. Grants Gold based on your level.",
        info: [
            {label: "g", value: () => 250n * p.lv}
        ],
        run: () => {
            let scaledGold = 250n * p.lv;
            p.gold += scaledGold;
            p.totalGold += scaledGold;
            log(`Used Tarot Card: Justice`, "var(--mana)");
            log(`The scales tip in your favor: Gained ${formatNumber(scaledGold)}g`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_the_hermit",
        name: "The Hermit (9)",
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "Solitude brings great riches. A significant bounty of gold.",
        info: [
            {label: "g", value: () => 500n * p.lv}
        ],
        run: () => {
            let scaledGold = 500n * p.lv;
            p.gold += scaledGold;
            p.totalGold += scaledGold;
            log(`Used Tarot Card: The Hermit`, "var(--mana)");
            log(`Found a hidden hoard: Gained ${formatNumber(scaledGold)}g`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_the_wheel_of_fortune",
        name: "The Wheel of Fortune (10)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Spin the wheel! A chance for a massive permanent Damage boost.",
        info: [
            {label: "Potential DMG%", value: () => 15n * p.lv}
        ],
        run: () => {
            log(`Used Tarot Card: The Wheel of Fortune`, "var(--mana)");
            if (Math.random() < 0.25) { // 25% chance to hit
                let scaledDmg = 15n * p.lv;
                p.dmgmult += scaledDmg;
                log(`LUCK IS ON YOUR SIDE! Gained ${formatNumber(scaledDmg)}% DMG Multiplier`, "var(--rareItem)");
            } else {
                log(`The wheel spins... but nothing happens.`, "var(--commonItem)");
            }
            return updateUI();
        }
    },
    {
        id: "tarot_strength",
        name: "Strength (11)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Overpower your foes with brute force. Increases Max HP and DMG.",
        info: [
            {label: "HP", value: () => 20n * p.lv},
            {label: "DMG%", value: () => 5n * p.lv}
        ],
        run: () => {
            let scaledHP = 20n * p.lv;
            let scaledDmg = 5n * p.lv;
            p.mhp += scaledHP;
            p.hp += scaledHP;
            p.dmgmult += scaledDmg;
            log(`Used Tarot Card: Strength`, "var(--mana)");
            log(`Gained ${formatNumber(scaledHP)} Max HP and ${formatNumber(scaledDmg)}% DMG Multiplier`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_the_hanged_man",
        name: "The Hanged Man (12)",
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "A shift in perspective. Sacrifice a small fee for massive enlightenment.",
        info: [
            {label: "EXP Gain", value: () => 1000n * p.lv}
        ],
        run: () => {
            let scaledExp = 1000n * p.lv;
            let fee = 50n * p.lv;
            p.gold = p.gold > fee ? p.gold - fee : 0n;
            addExperience(scaledExp)
            log(`Used Tarot Card: The Hanged Man`, "var(--mana)");
            log(`Sacrificed ${formatNumber(fee)}g for ${formatNumber(scaledExp)} EXP`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_death",
        name: "Death (13)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "The end of a cycle. Fully restores Vitals and increases Max HP.",
        info: [
            {label: "Max HP", value: () => 25n * p.lv}
        ],
        run: () => {
            let scaledHP = 25n * p.lv;
            p.mhp += scaledHP;
            p.hp = p.mhp;
            p.mp = p.mmp;
            p.sn = p.msn;
            log(`Used Tarot Card: Death`, "var(--mana)");
            log(`Transformed! Max HP +${formatNumber(scaledHP)} and Vitals Refilled`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_temperance",
        name: "Temperance (14)",
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "Harmony in all things. Grants Gold based on your Mana Reduction mastery.",
        info: [
            {label: "g", value: () => (p.manaReduction + 10n) * p.lv}
        ],
        run: () => {
            let scaledGold = (p.manaReduction + 10n) * p.lv;
            p.gold += scaledGold;
            p.totalGold += scaledGold;
            log(`Used Tarot Card: Temperance`, "var(--mana)");
            log(`Measured bounty: Gained ${formatNumber(scaledGold)}g`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_the_devil",
        name: "The Devil (15)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Material greed bound by blood. Grants massive gold based on your kills.",
        info: [
            {label: "g", value: () => p.kills * 2n * p.lv}
        ],
        run: () => {
            let scaledGold = p.kills * 2n * p.lv;
            p.gold += scaledGold;
            p.totalGold += scaledGold;
            log(`Used Tarot Card: The Devil`, "var(--mana)");
            log(`A devilish bargain: Gained ${formatNumber(scaledGold)}g from fallen souls`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_the_tower",
        name: "The Tower (16)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Destruction breeds power. Collapses your HP to boost Damage permanently.",
        info: [
            {label: "DMG%", value: () => 20n * p.lv}
        ],
        run: () => {
            let scaledDmg = 20n * p.lv;
            p.hp = BigMath.max(p.hp / 4n, 1n); // Drop to 25% HP or 1
            p.dmgmult += scaledDmg;
            log(`Used Tarot Card: The Tower`, "var(--mana)");
            log(`The foundations crumble! Gained ${formatNumber(scaledDmg)}% DMG Multiplier`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_the_star",
        name: "The Star (17)",
        rarity: "Uncommon",
        rarityColor: "var(--uncommonItem)",
        description: "A guiding light in the dark. Increases Max Mana and grants Skill Points.",
        info: [
            {label: "Max MP", value: () => 10n * p.lv},
            {label: "SP", value: () => BigMath.max(p.day / 10n, 1n)}
        ],
        run: () => {
            let scaledMP = 10n * p.lv;
            let gainedSP = BigMath.max(p.day / 10n, 1n);
            p.mmp += scaledMP;
            p.mp += scaledMP;
            p.sp += gainedSP;
            log(`Used Tarot Card: The Star`, "var(--mana)");
            log(`The stars align: +${formatNumber(scaledMP)} Max MP and +${formatNumber(gainedSP)} SP`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_the_moon",
        name: "The Moon (18)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Illumination in the dark. Boosts Max Sanity and grants Gold for every kill.",
        info: [
            {label: "Max SN", value: () => 15n * p.lv},
            {label: "g", value: () => p.kills * p.lv}
        ],
        run: () => {
            let scaledSN = 15n * p.lv;
            let scaledGold = p.kills * p.lv;
            p.msn += scaledSN;
            p.sn += scaledSN;
            p.gold += scaledGold;
            p.totalGold += scaledGold;
            log(`Used Tarot Card: The Moon`, "var(--mana)");
            log(`The night rewards you: +${formatNumber(scaledSN)} Max SN and ${formatNumber(scaledGold)}g`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_the_sun",
        name: "The Sun (19)",
        rarity: "Rare",
        rarityColor: "var(--rareItem)",
        description: "Blinding radiance. Fully restores HP and significantly boosts Damage.",
        info: [
            {label: "DMG%", value: () => 10n * p.lv}
        ],
        run: () => {
            let scaledDmg = 10n * p.lv;
            p.hp = p.mhp;
            p.dmgmult += scaledDmg;
            log(`Used Tarot Card: The Sun`, "var(--mana)");
            log(`Radiance restored: Full Heal and +${formatNumber(scaledDmg)}% DMG Multiplier`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_judgement",
        name: "Judgement (20)",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "The final verdict. Grants Skill Points based on your variety of kills.",
        info: [
            {label: "SP", value: () => BigInt(Object.keys(p.uniqueEnemyKills).filter(k => p.uniqueEnemyKills[k] > 0n).length) * p.lv}
        ],
        run: () => {
            let uniqueCount = BigInt(Object.keys(p.uniqueEnemyKills).filter(k => p.uniqueEnemyKills[k] > 0n).length);
            let gainedSP = uniqueCount * p.lv;
            p.sp += gainedSP;
            log(`Used Tarot Card: Judgement`, "var(--mana)");
            log(`The verdict is in: Your experience grants you ${formatNumber(gainedSP)} SP`, "var(--mana)");
            return updateUI();
        }
    },
    {
        id: "tarot_the_world",
        name: "The World (21)",
        rarity: "Legendary",
        rarityColor: "var(--legendaryItem)",
        description: "The cycle is complete. Increases all major stats significantly.",
        info: [
            {label: "All Stats", value: () => 5n * p.lv}
        ],
        run: () => {
            let scaledStat = 5n * p.lv;
            p.mhp += scaledStat * 2n;
            p.mmp += scaledStat;
            p.msn += scaledStat;
            p.dmgmult += scaledStat;
            p.hp = p.mhp;
            p.mp = p.mmp;
            p.sn = p.msn;
            log(`Used Tarot Card: The World`, "var(--mana)");
            log(`You have reached the pinnacle: All stats increased and restored.`, "var(--mana)");
            return updateUI();
        }
    },




    // END TAROT CARDS ##########################################################################
    // START SPECTRAL CARDS #####################################################################



    {
        id: "spectral_familiar",
        name: "(Spectral Card) Familiar",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "A spectral companion requires a blood price. Gain Skill Points, but lose Max HP.",
        info: [
            {label: "SP", value: () => 3n * p.lv},
            {label: "Max HP", value: () => -(10n * p.lv)}
        ],
        run: () => {
            let gainedSP = 3n * p.lv;
            let lostHP = 10n * p.lv;
            
            p.sp += gainedSP;
            p.mhp = BigMath.max(p.mhp - lostHP, 10n);
            p.hp = BigMath.min(p.hp, p.mhp);

            log(`Used Spectral Card: Familiar`, "var(--lux)");
            log(`The familiar drinks your blood: +${formatNumber(gainedSP)} SP, -${formatNumber(lostHP)} Max HP`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_grim",
        name: "(Spectral Card) Grim",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "A dark realization fuels your strength. Massive DMG boost, but halves current Sanity.",
        info: [
            {label: "DMG%", value: () => 20n * p.lv},
            {label: "SN", value: () => p.sn / -2n}
        ],
        run: () => {
            let gainedDmg = 20n * p.lv;
            
            p.dmgmult += gainedDmg;
            p.sn /= 2n;

            log(`Used Spectral Card: Grim`, "var(--lux)");
            log(`Grim power surges: +${formatNumber(gainedDmg)}% DMG, but your Sanity is halved`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_incantation",
        name: "(Spectral Card) Incantation",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "Whisper the forgotten tongue. Permanently reduces mana costs, but burns your gold.",
        info: [
            {label: "ManaRed", value: () => 2n},
            {label: "g", value: () => -(250n * p.lv)}
        ],
        run: () => {
            let lostGold = 250n * p.lv;
            
            p.manaReduction = BigMath.min(p.manaReduction + 2n, 100n);
            p.gold = BigMath.max(p.gold - lostGold, 0n);

            log(`Used Spectral Card: Incantation`, "var(--lux)");
            log(`The words take form: +2% Mana Reduction, but ${formatNumber(lostGold)}g vanished in the flames`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_talisman",
        name: "(Spectral Card) Talisman",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "An artifact of focused greed. Grants a huge bounty of gold.",
        info: [
            {label: "g", value: () => 1000n * p.lv}
        ],
        run: () => {
            let scaledGold = 1000n * p.lv;
            p.gold += scaledGold;
            p.totalGold += scaledGold;
            log(`Used Spectral Card: Talisman`, "var(--lux)");
            log(`The Talisman pulses with greed: Gained ${formatNumber(scaledGold)}g`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_aura",
        name: "(Spectral Card) Aura",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "A protective glow strengthens your form and your magic.",
        info: [
            {label: "HP", value: () => 30n * p.lv},
            {label: "ManaRed", value: () => 1n}
        ],
        run: () => {
            let scaledHP = 30n * p.lv;
            p.mhp += scaledHP;
            p.hp += scaledHP;
            p.manaReduction = BigMath.min(p.manaReduction + 1n, 100n);
            log(`Used Spectral Card: Aura`, "var(--lux)");
            log(`You are enveloped in light: +${formatNumber(scaledHP)} Max HP and +1% Mana Reduction`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_wraith",
        name: "(Spectral Card) Wraith",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "The ghost of your future self. Gain Levels, but lose a large portion of gold.",
        info: [
            {label: "lv", value: () => 2n},
            {label: "g", value: () => -p.gold / 2n}
        ],
        run: () => {
            let lostGold = p.gold / 2n;
            p.lv += 2n;
            p.sp += 2n
            p.gold -= lostGold;
            log(`Used Spectral Card: Wraith`, "var(--lux)");
            log(`The Wraith haunts your purse: +2 Levels, but ${formatNumber(lostGold)}g was phased out`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_sigil",
        name: "(Spectral Card) Sigil",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "An unstable mark. Either grants a massive damage boost or significantly weakens you.",
        info: [
            {label: "DMG Chance", value: () => 30n * p.lv}
        ],
        run: () => {
            let amount = 30n * p.lv;
            log(`Used Spectral Card: Sigil`, "var(--lux)");
            if (Math.random() < 0.5) {
                p.dmgmult += amount;
                log(`The mark is blessed! Gained ${formatNumber(amount)}% DMG Multiplier`, "var(--lux)");
            } else {
                p.dmgmult = BigMath.max(p.dmgmult - amount, 10n);
                log(`The mark is cursed! Lost ${formatNumber(amount)}% DMG Multiplier`, "var(--lux)");
            }
            return updateUI();
        }
    },
    {
        id: "spectral_ouija",
        name: "(Spectral Card) Ouija",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "Commune with the beyond. Gain massive Skill Points, but drastically lower Max HP.",
        info: [
            {label: "SP", value: () => 10n * p.lv},
            {label: "Max HP", value: () => -40n * p.lv}
        ],
        run: () => {
            let gainedSP = 10n * p.lv;
            let penalty = 40n * p.lv;
            p.sp += gainedSP;
            p.mhp = BigMath.max(p.mhp - penalty, 10n);
            p.hp = BigMath.min(p.hp, p.mhp);
            log(`Used Spectral Card: Ouija`, "var(--lux)");
            log(`The spirits speak: +${formatNumber(gainedSP)} SP, but your body withers (-${formatNumber(penalty)} Max HP)`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_ankh",
        name: "(Spectral Card) Ankh",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "Sacrifice material wealth for spiritual growth. Doubles current SP, but halves Gold.",
        info: [
            {label: "SP", value: () => p.sp},
            {label: "g", value: () => -(p.gold / 2n)}
        ],
        run: () => {
            let gainedSP = p.sp;
            let lostGold = p.gold / 2n;
            p.sp += gainedSP;
            p.gold -= lostGold;
            log(`Used Spectral Card: Ankh`, "var(--lux)");
            log(`A soul's trade: +${formatNumber(gainedSP)} SP, but ${formatNumber(lostGold)}g was consumed`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_immolate",
        name: "(Spectral Card) Immolate",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "Burn your own vitality for pure gold. Massive Gold gain, but lowers Max HP.",
        info: [
            {label: "g", value: () => 1500n * p.lv},
            {label: "Max HP", value: () => -(15n * p.lv)}
        ],
        run: () => {
            let scaledGold = 1500n * p.lv;
            let penalty = 15n * p.lv;
            p.gold += scaledGold;
            p.totalGold += scaledGold;
            p.mhp = BigMath.max(p.mhp - penalty, 10n);
            p.hp = BigMath.min(p.hp, p.mhp);
            log(`Used Spectral Card: Immolate`, "var(--lux)");
            log(`The fire provides: Gained ${formatNumber(scaledGold)}g, but lost ${formatNumber(penalty)} Max HP`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_deja_vu",
        name: "(Spectral Card) Déjà Vu",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "A familiar feeling of success. Gain EXP and Gold based on your journey.",
        info: [
            {label: "EXP", value: () => 500n * p.day},
            {label: "g", value: () => 100n * p.day}
        ],
        run: () => {
            let scaledExp = 500n * p.day;
            let scaledGold = 100n * p.day;
            addExperience(scaledExp)
            p.gold += scaledGold;
            p.totalGold += scaledGold;
            log(`Used Spectral Card: Déjà Vu`, "var(--lux)");
            log(`I've been here before: +${formatNumber(scaledExp)} EXP and +${formatNumber(scaledGold)}g`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_hex",
        name: "(Spectral Card) Hex",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "A dark enchantment that bolsters power at the cost of magic.",
        info: [
            {label: "DMG%", value: () => 35n * p.lv},
            {label: "MP", value: () => -(p.mp / 2n)}
        ],
        run: () => {
            let gainedDmg = 35n * p.lv;
            let lostMP = p.mp / 2n;
            p.dmgmult += gainedDmg;
            p.mp -= lostMP;
            log(`Used Spectral Card: Hex`, "var(--lux)");
            log(`You are cursed with power: +${formatNumber(gainedDmg)}% DMG, but lost ${formatNumber(lostMP)} MP`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_trance",
        name: "(Spectral Card) Trance",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "Fall into a deep arcane focus. Increases Max Mana and fully restores it.",
        info: [
            {label: "Max MP", value: () => 20n * p.lv}
        ],
        run: () => {
            let scaledMP = 20n * p.lv;
            p.mmp += scaledMP;
            p.mp = p.mmp;
            log(`Used Spectral Card: Trance`, "var(--lux)");
            log(`Mind over matter: +${formatNumber(scaledMP)} Max MP and Mana Refilled`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_medium",
        name: "(Spectral Card) Medium",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "Bridge the gap between worlds. Grants Skill Points based on your kill count.",
        info: [
            {label: "SP", value: () => BigMath.max(p.kills / 10n, 1n) * p.lv}
        ],
        run: () => {
            let gainedSP = BigMath.max(p.kills / 10n, 1n) * p.lv;
            p.sp += gainedSP;
            log(`Used Spectral Card: Medium`, "var(--lux)");
            log(`The spirits whisper: Gained ${formatNumber(gainedSP)} SP from the fallen`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_cryptid",
        name: "(Spectral Card) Cryptid",
        rarity: "Epic",
        rarityColor: "var(--epicItem)",
        description: "An elusive energy multiplies your potential. Massive Experience gain.",
        info: [
            {label: "EXP", value: () => 2500n * p.lv}
        ],
        run: () => {
            let scaledExp = 2500n * p.lv;
            addExperience(scaledExp)
            log(`Used Spectral Card: Cryptid`, "var(--lux)");
            log(`A rare sighting: Gained ${formatNumber(scaledExp)} EXP`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_soul",
        name: "(Spectral Card) Soul",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "Your very essence is fortified. Permanently increases all Vitality stats.",
        info: [
            {label: "Max HP/MP/SN", value: () => 50n * p.lv}
        ],
        run: () => {
            let scaledStat = 50n * p.lv;
            p.mhp += scaledStat;
            p.mmp += scaledStat;
            p.msn += scaledStat;
            p.hp += scaledStat;
            p.mp += scaledStat;
            p.sn += scaledStat;
            log(`Used Spectral Card: Soul`, "var(--lux)");
            log(`Your soul burns brighter: +${formatNumber(scaledStat)} to all Max Vitals`, "var(--lux)");
            return updateUI();
        }
    },
    {
        id: "spectral_black_hole",
        name: "(Spectral Card) Black Hole",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "Everything collapses into a singular point of infinite power. Upgrades everything.",
        info: [
            {label: "DMG%", value: () => 50n * p.lv},
            {label: "LV", value: () => 1n},
            {label: "Mana Reduc.", value: () => 5n}
        ],
        run: () => {
            let scaledDmg = 50n * p.lv;
            p.lv += 1n;
            p.sp += 1n
            p.dmgmult += scaledDmg;
            p.manaReduction = BigMath.min(p.manaReduction + 5n, 100n);
            p.hp = p.mhp;
            p.mp = p.mmp;
            p.sn = p.msn;
            log(`Used Spectral Card: Black Hole`, "var(--lux)");
            log(`The singularity consumes all: +1 LV, +${formatNumber(scaledDmg)}% DMG, and +5% Mana Reduction`, "var(--lux)");
            return updateUI();
        }
    },

    /*
    #################################################################################################
    LOOTBOX ITEMS
    #################################################################################################
    */
    // ============================================================
    // CHRISTMAS ITEMS
    // ============================================================
    {
        id: "santasGift",
        name: "Santa's Gift",
        rarity: "Event (Christmas)",
        rarityColor: "#2ed573",
        description: "A wrapped gift from Santa himself. Contains a surprise inside.",
        run: () => {
            const outcomes = [
                () => { const amt = 500n * p.lv; p.mhp += amt; p.hp += amt; log(`Item used: "Santa's Gift"`, "#2ed573"); log(`Santa gave you ${formatNumber(amt)} Max HP!`, "#2ed573"); },
                () => { const amt = 500n * p.lv; p.mmp += amt; p.mp += amt; log(`Item used: "Santa's Gift"`, "#2ed573"); log(`Santa gave you ${formatNumber(amt)} Max MP!`, "#2ed573"); },
                () => { const amt = 500n * p.lv; p.msn += amt; p.sn += amt; log(`Item used: "Santa's Gift"`, "#2ed573"); log(`Santa gave you ${formatNumber(amt)} Max SN!`, "#2ed573"); },
                () => { const amt = 20n * p.lv; p.sp += amt; log(`Item used: "Santa's Gift"`, "#2ed573"); log(`Santa gave you ${formatNumber(amt)} SP!`, "#2ed573"); },
                () => { const amt = 2000n * p.lv; p.gold += amt; p.totalGold += amt; log(`Item used: "Santa's Gift"`, "#2ed573"); log(`Santa gave you ${formatNumber(amt)}g!`, "#2ed573"); },
            ];
            outcomes[Math.floor(Math.random() * outcomes.length)]();
            return updateUI();
        }
    },
    {
        id: "candyCane",
        name: "Candy Cane",
        rarity: "Event (Christmas)",
        rarityColor: "#ff4757",
        description: "A festive candy cane. Surprisingly restorative.",
        edible: true,
        info: [
            { label: "HP", value: () => 75n * p.lv },
            { label: "SN", value: () => 75n * p.lv },
        ],
        run: () => {
            const amt = 75n * p.lv;
            p.hp = BigMath.min(p.hp + amt, p.mhp);
            p.sn = BigMath.min(p.sn + amt, p.msn);
            playHealSFX();
            log(`Item used: "Candy Cane"`, "#ff4757");
            log(`Regained ${formatNumber(amt)} HP and ${formatNumber(amt)} SN.`, "#ff4757");
            return updateUI();
        }
    },
    {
        id: "warmCocoa",
        name: "Warm Cocoa",
        rarity: "Event (Christmas)",
        rarityColor: "#8B4513",
        description: "A warm mug of cocoa. Restores mana and soothes the mind.",
        edible: true,
        info: [
            { label: "MP", value: () => 100n * p.lv },
            { label: "SN", value: () => 50n * p.lv },
        ],
        run: () => {
            const mpAmt = 100n * p.lv;
            const snAmt = 50n * p.lv;
            p.mp = BigMath.min(p.mp + mpAmt, p.mmp);
            p.sn = BigMath.min(p.sn + snAmt, p.msn);
            log(`Item used: "Warm Cocoa"`, "#8B4513");
            log(`Regained ${formatNumber(mpAmt)} MP and ${formatNumber(snAmt)} SN.`, "#8B4513");
            return updateUI();
        }
    },
    {
        id: "gingerbreadMan",
        name: "Gingerbread Man",
        rarity: "Event (Christmas)",
        rarityColor: "#cd853f",
        description: "You can't catch him. But you did. Restores a moderate amount of HP.",
        edible: true,
        info: [
            { label: "HP", value: () => 150n * p.lv },
        ],
        run: () => {
            const amt = 150n * p.lv;
            p.hp = BigMath.min(p.hp + amt, p.mhp);
            playHealSFX();
            log(`Item used: "Gingerbread Man"`, "#cd853f");
            log(`Regained ${formatNumber(amt)} HP.`, "#cd853f");
            return updateUI();
        }
    },
    {
        id: "snowglobe",
        name: "Snowglobe",
        rarity: "Event (Christmas)",
        rarityColor: "#70a1ff",
        description: "A snowglobe containing a tiny frozen world. Freezes your next enemy... somehow.",
        edible: true,
        info: [
            { label: "DMG%", value: () => 20n * p.lv },
        ],
        run: () => {
            const amt = 20n * p.lv;
            p.dmgmult += amt;
            log(`Item used: "Snowglobe"`, "#70a1ff");
            log(`The snowglobe shatters! Gained ${formatNumber(amt)}% DMG Multiplier.`, "#70a1ff");
            return updateUI();
        }
    },
    {
        id: "luxChristmasCard",
        name: "Lux's Christmas Card",
        rarity: "??? (Event)",
        rarityColor: "var(--insaneItem)",
        description: "A Christmas card from Lux. The handwriting is surprisingly neat. It reads: 'I hope you enjoy this. Don't read too much into it.'",
        run: () => {
            p.hp = p.mhp;
            p.mp = p.mmp;
            p.sn = p.msn;
            const amt = 500n * p.lv;
            p.mhp += amt; p.mmp += amt; p.msn += amt;
            p.hp = p.mhp; p.mp = p.mmp; p.sn = p.msn;
            playHealSFX();
            LuxLog(`Lux: Merry Christmas. Don't make this weird.`);
            log(`All stats fully restored and +${formatNumber(amt)} to all Max Stats.`, "var(--insaneItem)");
            return updateUI();
        }
    },

    // ============================================================
    // HALLOWEEN ITEMS
    // ============================================================
    {
        id: "trickOrTreatBag",
        name: "Trick or Treat Bag",
        rarity: "Event (Halloween)",
        rarityColor: "#ff6b00",
        description: "A bag full of candy. Could be good. Could be very bad.",
        edible: true,
        run: () => {
            log(`Item used: "Trick or Treat Bag"`, "#ff6b00");
            if (Math.random() < 0.5) {
                const amt = 300n * p.lv;
                p.hp = BigMath.min(p.hp + amt, p.mhp);
                p.sn = BigMath.min(p.sn + amt, p.msn);
                playHealSFX();
                log(`Treat! Regained ${formatNumber(amt)} HP and SN.`, "#ff6b00");
            } else {
                const amt = 100n * p.lv;
                p.hp -= amt;
                p.sn -= amt;
                playHurtSFX();
                log(`Trick! Lost ${formatNumber(amt)} HP and SN.`, "#ff4757");
            }
            return updateUI();
        }
    },
    {
        id: "cursedPumpkin",
        name: "Cursed Pumpkin",
        rarity: "Event (Halloween)",
        rarityColor: "#ff6b00",
        description: "A pumpkin with a sinister grin. Massively boosts damage but drains sanity.",
        edible: true,
        info: [
            { label: "DMG%", value: () => 30n * p.lv },
            { label: "SN", value: () => -(p.sn / 2n) },
        ],
        run: () => {
            const dmgAmt = 30n * p.lv;
            p.dmgmult += dmgAmt;
            p.sn /= 2n;
            log(`Item used: "Cursed Pumpkin"`, "#ff6b00");
            log(`Gained ${formatNumber(dmgAmt)}% DMG Multiplier but Sanity halved.`, "#ff6b00");
            return updateUI();
        }
    },
    {
        id: "witchsBrew",
        name: "Witch's Brew",
        rarity: "Event (Halloween)",
        rarityColor: "#a29bfe",
        description: "A bubbling purple concoction. The effects are... unpredictable.",
        edible: true,
        run: () => {
            log(`Item used: "Witch's Brew"`, "#a29bfe");
            const outcomes = [
                () => { p.manaReduction = BigMath.min(p.manaReduction + 15n, 100n); log(`The brew grants arcane clarity! +15% Mana Reduction.`, "#a29bfe"); },
                () => { const amt = 200n * p.lv; p.dmgmult += amt; log(`The brew surges with power! +${formatNumber(amt)}% DMG Multiplier.`, "#a29bfe"); },
                () => { p.hp = p.mhp; p.mp = p.mmp; p.sn = p.msn; playHealSFX(); log(`The brew fully restores you!`, "#a29bfe"); },
                () => { const amt = 10n * p.lv; p.sp += amt; log(`The brew grants wisdom! +${formatNumber(amt)} SP.`, "#a29bfe"); },
                () => { p.sn = 1n; playHurtSFX(); log(`The brew shatters your mind. Sanity reduced to 1.`, "#ff4757"); },
            ];
            outcomes[Math.floor(Math.random() * outcomes.length)]();
            return updateUI();
        }
    },
    {
        id: "skeletonKey",
        name: "Skeleton Key",
        rarity: "Event (Halloween)",
        rarityColor: "#dfe6e9",
        description: "A key made of bone. Unlocks something... somewhere.",
        info: [
            { label: "SP", value: () => 25n * p.lv },
            { label: "g", value: () => 1000n * p.lv },
        ],
        run: () => {
            const spAmt = 25n * p.lv;
            const goldAmt = 1000n * p.lv;
            p.sp += spAmt;
            p.gold += goldAmt;
            p.totalGold += goldAmt;
            playCoinSFX();
            log(`Item used: "Skeleton Key"`, "#dfe6e9");
            log(`The key opened something! Gained ${formatNumber(spAmt)} SP and ${formatNumber(goldAmt)}g.`, "#dfe6e9");
            return updateUI();
        }
    },
    {
        id: "jackOLantern",
        name: "Jack O' Lantern",
        rarity: "Event (Halloween)",
        rarityColor: "#ff6b00",
        description: "A carved pumpkin that glows with an eerie light. Burns with an unnatural flame.",
        edible: true,
        info: [
            { label: "DMG%", value: () => 15n * p.lv },
            { label: "HP", value: () => 50n * p.lv },
        ],
        run: () => {
            const dmgAmt = 15n * p.lv;
            const hpAmt = 50n * p.lv;
            p.dmgmult += dmgAmt;
            p.mhp += hpAmt;
            p.hp += hpAmt;
            log(`Item used: "Jack O' Lantern"`, "#ff6b00");
            log(`The lantern burns bright! +${formatNumber(dmgAmt)}% DMG and +${formatNumber(hpAmt)} Max HP.`, "#ff6b00");
            return updateUI();
        }
    },
    {
        id: "luxHalloweenMask",
        name: "Lux's Halloween Mask",
        rarity: "??? (Event)",
        rarityColor: "var(--insaneItem)",
        description: "A mask that looks suspiciously like Lux's face. Wearing it feels deeply unsettling. The eyes seem to follow you.",
        run: () => {
            const amt = 1000n * p.lv;
            p.dmgmult += amt;
            p.mhp += amt; p.hp += amt;
            p.msn += amt; p.sn += amt;
            if (Math.random() < 0.5) {
                LuxLog(`Lux: Take that off. Now.`);
            } else {
                LuxLog(`Lux: ...I'm not sure how I feel about this.`);
            }
            log(`Gained ${formatNumber(amt)}% DMG, +${formatNumber(amt)} Max HP, and +${formatNumber(amt)} Max SN.`, "var(--insaneItem)");
            return updateUI();
        }
    },

    // ============================================================
    // NEW YEAR ITEMS
    // ============================================================
    {
        id: "firework",
        name: "Firework",
        rarity: "Event (New Year)",
        rarityColor: "#ffd700",
        description: "A firework that explodes with brilliant light. Somehow translates into combat power.",
        info: [
            { label: "DMG%", value: () => 25n * p.lv },
            { label: "SN", value: () => -(50n * p.lv) },
        ],
        run: () => {
            const dmgAmt = 25n * p.lv;
            const snLoss = 50n * p.lv;
            p.dmgmult += dmgAmt;
            p.sn = BigMath.max(p.sn - snLoss, 1n);
            log(`Item used: "Firework"`, "#ffd700");
            log(`BOOM! +${formatNumber(dmgAmt)}% DMG but lost ${formatNumber(snLoss)} SN from the noise.`, "#ffd700");
            return updateUI();
        }
    },
    {
        id: "champagne",
        name: "Champagne",
        rarity: "Event (New Year)",
        rarityColor: "#ffd700",
        description: "A bottle of fine champagne. Celebratory and restorative.",
        edible: true,
        info: [
            { label: "HP", value: () => 200n * p.lv },
            { label: "MP", value: () => 200n * p.lv },
            { label: "SN", value: () => 200n * p.lv },
        ],
        run: () => {
            const amt = 200n * p.lv;
            p.hp = BigMath.min(p.hp + amt, p.mhp);
            p.mp = BigMath.min(p.mp + amt, p.mmp);
            p.sn = BigMath.min(p.sn + amt, p.msn);
            playHealSFX();
            log(`Item used: "Champagne"`, "#ffd700");
            log(`Cheers! Regained ${formatNumber(amt)} HP, MP, and SN.`, "#ffd700");
            return updateUI();
        }
    },
    {
        id: "countdownClock",
        name: "Countdown Clock",
        rarity: "Event (New Year)",
        rarityColor: "#ffd700",
        description: "A clock counting down to midnight. Time is power.",
        info: [
            { label: "g", value: () => 500n * p.day },
            { label: "EXP", value: () => 500n * p.day },
        ],
        run: () => {
            const amt = 500n * p.day;
            p.gold += amt;
            p.totalGold += amt;
            addExperience(amt);
            playCoinSFX();
            log(`Item used: "Countdown Clock"`, "#ffd700");
            log(`Time rewarded you! Gained ${formatNumber(amt)}g and ${formatNumber(amt)} EXP.`, "#ffd700");
            return updateUI();
        }
    },
    {
        id: "luxNewYearMessage",
        name: "Lux's New Year Message",
        rarity: "??? (Event)",
        rarityColor: "var(--insaneItem)",
        description: "A handwritten note from Lux. It simply reads: 'Another year. You're still here. I'm not sure how I feel about that.'",
        run: () => {
            const amt = 2000n * p.lv;
            p.mhp += amt; p.hp = p.mhp;
            p.mmp += amt; p.mp = p.mmp;
            p.msn += amt; p.sn = p.msn;
            p.dmgmult += amt;
            playHealSFX();
            if (p.kills >= 1000000n) {
                LuxLog(`Lux: Another year of bloodshed. I hope you're proud of yourself.`);
            } else if (p.spares >= 1000n) {
                LuxLog(`Lux: Another year. You've been... surprisingly kind. Don't let it go to your head.`);
            } else {
                LuxLog(`Lux: Another year. You're still here. I'm not sure how I feel about that.`);
            }
            log(`All Max Stats +${formatNumber(amt)} and fully restored.`, "var(--insaneItem)");
            return updateUI();
        }
    },

];
