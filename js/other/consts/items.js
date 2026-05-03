const inventoryItems = [
    /*
    ###########################################################################################
    ##############################################################################################
    Healing Related Items                                                                       ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "healthVial",
        name: "Health Vial",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A vial filled with a red liquid.",
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
        description: "A vial filled with a mystical, blue liquid.",
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
        description: "A vial filled with a purple liquid. It pulses with a calm lunar light.",
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
        description: "An apple given from our favorite goob which heals for a insane amount of HP.",
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
            log(`Restored ${formatNumber(helperVar)} HP by sacraficing ${formatNumber(helperVar)} Mana`,"var(--hp)")
            return updateUI();
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Coin Related Items                                                                          ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "isaacsCoin",
        name: "Gambler's Coin",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A small, yellow coin, with an image of a slot machine on it. I think this allows you to double you money?",
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
            log(`Item used: "Small Bag of Gold"`,"var(--gold)")
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
        description: "A small bag of gold which gives you a large amount of gold.",
        info: [
            {label: "g", value: () => 150n * p.lv}
        ],
        run: () => {
            let scaledAmount = 150n * p.lv
            p.gold += scaledAmount
            p.totalGold += scaledAmount
            log(`Item used: "Small Bag of Gold"`,"var(--gold)")
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
    Stat Sacrificial Related Items                                                              ######
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
    SP/EXP Related Items                                                                        ######
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
    Other/Unsortable Items                                                                      ######
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
            if (p.flags.bobVisits >= 50) {
                LuxLog(`Lux: Please. Keep Bob away from this. I don't want him to turn one of these into bread.`)
            } else if (p.kills >= 1000000n || p.flags.genocideRouteTimesCompleted === true) {
                LuxLog(`Lux: You want to use this? After commiting a genocide? You really are clueless.`)
                p.hp = p.mhp / 2n
            } else if (p.spares >= 1000000 || p.flags.pacifistRouteTimesCompleted === true) {
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
                LuxLog(`Lux: Oh. Hello. I see you found one of my runic triangles.`)
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
        description: "A perfect, yellow lemon. However it is so fucking sour like HOLY SHIT. Don't use this unless you want to deal with no tounge. Becuase this lemon. Is that fucking sour.",
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
            p.exp += 1n
            LuxLog(`Item used: "unobtainableItem"`)
            LuxLog(`Nothing happened...`)
            return updateUI();
        }
    },
    {
        id: "glitchInTheMatrix",
        name: "MissingNo.'s Core",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "A flickering mass of pixels. It seems to be trying to overwrite your save file... or maybe it's just hungry for variables.",
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
    {
        id: "theFourthWall",
        name: "Piece of the Fourth Wall",
        rarity: "???",
        rarityColor: "var(--insaneItem)",
        description: "A literal chunk of your monitor. You can see the code through the cracks.",
        info: [
            {label: "Reality", value: () => null}
        ],
        run: () => {
            LuxLog(`Lux: Stop that. You're going to break the updateUI() function.`);
            p.hp = p.mhp;
            p.mp = p.mmp;
            p.sn = p.msn;
            // A "glitch" effect for the log
            log(`R_E_S_E_T_T_I_N_G...`, "var(--insaneItem)");
            return updateUI();
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Crossover Items                                                                             ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        id: "circleOreoBox",
        name: "Miss Circle's Oreo Pack",
        rarity: "Legendary (Crossover)",
        rarityColor: "var(--legendaryItem)",
        description: "A pack of Oreos. (Un)surprisingly, the pack is already open and is missing half of the Oreos inside.",
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
            {label: "SP", value: () => p.sp * p.lv}
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
            p.skills.push('charaKnife')
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
            p.skills.push('noxNocturnalBeam', 'noxNocturnalExplosion', 'noxNocturnalSiphon')
            let scaledAmount = p.sn / 4n
            p.sn = BigMath.max(p.sn - scaledAmount, 0n); 
            p.msn = BigMath.max(p.msn - scaledAmount, 0n);
            log(`Equipped "Nox Nocturnal"`, "var(--lux)")
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
        rarity: "Common",
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
        description: "A rock. Literally, just a rock,",
        run: () => {
            log(`Item used: "Rock"`,"var(--gold)")
            log(`Nothing happened.`,"var(--gold)")
            return updateUI();
        }
    },
    {
        id: "chunkOfIron",
        name: "Chunk of Iron",
        rarity: "Common",
        rarityColor: "var(--commonItem)",
        description: "A chunk of raw iron. You could seel it now, or you could probably sell it later for a lot more once you refine it.",
        info: [
            {label: "g", value: () => 50n * p.lv}
        ],
        run: () => {
            let scaledAmount = 50n * p.lv
            p.gold += scaledAmount
            p.totalGold += scaledAmount
            if (p.skills.includes("fireball")) {
                checkSpaceAndAddItem("Iron Bar")
                log(`Refined "Chunk of Iron" into "Iron Bar"`)
                return updateUI();
            } else {
                log(`Item sold: "Chunk of Iron"`,"var(--gold)")
                log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)")
                return updateUI();
            }
        }
    },
    {
        id: "ironBar",
        name: "Iron Bar",
        rarity: "Common",
        rarityColor: "var(--uncommonItem)",
        description: "A chunk of iron refined into an Iron Bar. Worth a lot more then a chunk of iron.",
        info: [
            {label: "g", value: () => 100n * p.lv}
        ],
        run: () => {
            let scaledAmount = 100n * p.lv
            p.gold += scaledAmount
            p.totalGold += scaledAmount
            log(`Item sold: "Iron Bar"`,"var(--gold)")
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)")
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
            let scaledAmount = 1n * p.lv
            p.gold += scaledAmount
            p.totalGold += scaledAmount
            log(`Item sold: "Glass Shard"`,"var(--gold)")
            log(`Collected ${formatNumber(scaledAmount)}g`,"var(--gold)")
            return updateUI();
        }
    },
];
