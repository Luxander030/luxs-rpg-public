function addEnemyKillCount() {
    if (enemy.name === "Shadow Imp") {
        p.uniqueEnemyKills.shadowImp += 1n
    } else if (enemy.name === "Armored Beetle") {
        p.uniqueEnemyKills.armoredBeetle += 1n
    } else if (enemy.name === "Drow Elf") {
        p.uniqueEnemyKills.drowElf += 1n
    } else if (enemy.name === "Elf") {
        p.uniqueEnemyKills.elf += 1n
    } else if (enemy.name === "Stone Golem") {
        p.uniqueEnemyKills.stoneGolem += 1n
    } else if (enemy.name === "Iron Golem") {
        p.uniqueEnemyKills.ironGolem += 1n
    } else if (enemy.name === "Glass Cannon the I") {
        p.uniqueEnemyKills.glassCannon1 += 1n
    } else if (enemy.name === "Glass Cannon the II") {
        p.uniqueEnemyKills.glassCannon2 += 1n
    } else if (enemy.name === "Glass Cannon the III") {
        p.uniqueEnemyKills.glassCannon3 += 1n
    } else if (enemy.name === "Glass Cannon the IV") {
        p.uniqueEnemyKills.glassCannon4 += 1n
    } else if (enemy.name === "Glass Cannon the V") {
        p.uniqueEnemyKills.glassCannon5 += 1n
    } else if (enemy.name === "Gloom Weaver") {
        p.uniqueEnemyKills.gloomWeaver += 1n
    } else if (enemy.name === "Void Stalker") {
        p.uniqueEnemyKills.voidStalker += 1n
    } else if (enemy.name === "Blood Bat") {
        p.uniqueEnemyKills.bloodBat += 1n
    } else if (enemy.name === "Vampire") {
        p.uniqueEnemyKills.vampire += 1n
    } else if (enemy.name === "Vampire Lord") {
        p.uniqueEnemyKills.vampireLord += 1n
    } else if (enemy.name === "Vampire King") {
        p.uniqueEnemyKills.vampireKing += 1n
    } else if (enemy.name === "Fire Elemental") {
        p.uniqueEnemyKills.fireElemental += 1n
    } else if (enemy.name === "Air Elemental") {
        p.uniqueEnemyKills.airElemental += 1n
    } else if (enemy.name === "Water Elemental") {
        p.uniqueEnemyKills.waterElemental += 1n
    } else if (enemy.name === "Earth Elemental") {
        p.uniqueEnemyKills.earthElemental += 1n
    } else if (enemy.name === "Ice Elemental") {
        p.uniqueEnemyKills.iceElemental += 1n
    } else if (enemy.name === "Diamond Golem") {
        p.uniqueEnemyKills.diamondGolem += 1n
    } else if (enemy.name === "Iron-Plated Diamond Golem") {
        p.uniqueEnemyKills.ironPlatedDiamondGolem += 1n
    } else if (enemy.name === "Mana Draining Wisp") {
        p.uniqueEnemyKills.manaDrainingWisp += 1n
    } else if (enemy.name === "Miss Circle") {
        p.uniqueEnemyKills.missCircle += 1n
    } else if (enemy.name === "Miss Bloomie") {
        p.uniqueEnemyKills.missBloomie += 1n
    } else if (enemy.name === "Miss Thavel") {
        p.uniqueEnemyKills.missThavel += 1n
    } else if (enemy.name === "Obsidian Golem") {
        p.uniqueEnemyKills.obsidianGolem += 1n
    } else if (enemy.name === "Duriel") {
        p.uniqueEnemyKills.duriel += 1n
    } else if (enemy.name === "Will o' Wisp") {
        p.uniqueEnemyKills.willOWisp += 1n
    } else if (enemy.name === "Fiery Will o' Wisp") {
        p.uniqueEnemyKills.fieryWillOWisp += 1n
    } else if (enemy.name === "Azmodan") {
        p.uniqueEnemyKills.azmodan += 1n
    } else if (enemy.name === "The Player's Mirror") {
        p.uniqueEnemyKills.playerMirror += 1n
    } else if (enemy.name === "Kitsune") {
        p.uniqueEnemyKills.kitsune += 1n
    } else if (enemy.name === "Lux") {
        p.uniqueEnemyKills.lux += 1n
    } else if (enemy.name === "Bob") {
        p.uniqueEnemyKills.bob += 1n
    }
}

function enemyItemDrop() {
    if (Math.random() < 0.1) {
        if (enemy.name === "Shadow Imp") {
            log(`Collected item "Black Shard" from Shadow Imp`, "var(--gold)")
            checkSpaceAndAddItem("Black Shard")
        } else if (enemy.name === "Armored Beetle") {
            log(`Collected item "Armored Carapace" from Armored Beetle`)
            checkSpaceAndAddItem("Armored Carapace")
        } else if (enemy.name === "Drow Elf") {
            checkSpaceAndAddItem("Drow Elf Ear")
        } else if (enemy.name === "Elf") {
            checkSpaceAndAddItem("Elf Ear")
        } else if (enemy.name === "Stone Golem") {
            checkSpaceAndAddItem("Rock")
        } else if (enemy.name === "Iron Golem") {
            if (Math.random() < 0.01) {
                checkSpaceAndAddItem("Iron Bar")
            } else {
                checkSpaceAndAddItem("Chunk of Iron")
            }
        } else if (enemy.name === "Glass Cannon the I") {
            checkSpaceAndAddItem("Glass Shard")
        } else if (enemy.name === "Glass Cannon the II") {
            checkSpaceAndAddItem("Glass Shard")
        } else if (enemy.name === "Glass Cannon the III") {
            checkSpaceAndAddItem("Glass Shard")
        } else if (enemy.name === "Glass Cannon the IV") {
            checkSpaceAndAddItem("Glass Shard")
        } else if (enemy.name === "Glass Cannon the V") {
            checkSpaceAndAddItem("Glass Shard")
        } else if (enemy.name === "Gloom Weaver") {
            checkSpaceAndAddItem("Black Shard")
        } else if (enemy.name === "Void Stalker") {
            checkSpaceAndAddItem("Black Shard")
        } else if (enemy.name === "Blood Bat") {
            checkSpaceAndAddItem("Blood Bat Eye")
        } else if (enemy.name === "Vampire") {
            checkSpaceAndAddItem("Vampire Tooth")
        } else if (enemy.name === "Vampire Lord") {
            checkSpaceAndAddItem("Vampire Tooth")
        } else if (enemy.name === "Vampire King") {
            checkSpaceAndAddItem("Vampire Tooth")
        } else if (enemy.name === "Fire Elemental") {
            checkSpaceAndAddItem("Ash")
        } else if (enemy.name === "Air Elemental") {
            // Air would just be insane junk at this fucking point.
        } else if (enemy.name === "Water Elemental") {
            checkSpaceAndAddItem("Bottle O' Water")
        } else if (enemy.name === "Earth Elemental") {
            checkSpaceAndAddItem("Rock")
        } else if (enemy.name === "Ice Elemental") {
            // Ice would also just be useless junk... just with a timer
        } else if (enemy.name === "Diamond Golem") {
            checkSpaceAndAddItem("Diamond")
        } else if (enemy.name === "Iron-Plated Diamond Golem") {
            checkSpaceAndAddItem("Diamond")
        } else if (enemy.name === "Mana Draining Wisp") {
            checkSpaceAndAddItem("The Lovers (6)")
        } else if (enemy.name === "Miss Circle") {
            checkSpaceAndAddItem("Miss Circle's Oreo Pack")
        } else if (enemy.name === "Miss Bloomie") {

        } else if (enemy.name === "Miss Thavel") {
            
        } else if (enemy.name === "Obsidian Golem") {
            checkSpaceAndAddItem("Diamond")
        } else if (enemy.name === "Duriel") {
            checkSpaceAndAddItem("The Devil (15)")
        } else if (enemy.name === "Will o' Wisp") {
            checkSpaceAndAddItem("The Lovers (6)")
        } else if (enemy.name === "Fiery Will o' Wisp") {
            checkSpaceAndAddItem("The Lovers (6)")
        } else if (enemy.name === "Azmodan") {
            checkSpaceAndAddItem("The Devil (15)")
        } else if (enemy.name === "The Player's Mirror") {
            checkSpaceAndAddItem("(Spectral Card) Cryptid")
        } else if (enemy.name === "Kitsune") {
            checkSpaceAndAddItem("(Spectral Card) Soul")
        } else if (enemy.name === "Lux") {
            checkSpaceAndAddItem("(Spectral Card) Black Hole")
        } else if (enemy.name === "Bob") {
            if (Math.random() < 0.5) {
                checkSpaceAndAddItem("Bob's Bread")
            } else {
                checkSpaceAndAddItem("Bob's Cardboard Box")
            }
        }
    }
    // At the end of enemyItemDrop()
    const gemChances = {
        // Normal enemies
        "Shadow Imp": 0.05, "Armored Beetle": 0.05, "Stone Golem": 0.07, "Iron Golem": 0.07,
        "Gloom Weaver": 0.07, "Void Stalker": 0.07, "Elf": 0.05, "Drow Elf": 0.05,
        "Blood Bat": 0.05, "Vampire": 0.08, "Vampire Lord": 0.10, "Vampire King": 0.12,
        // Glass Cannons
        "Glass Cannon the I": 0.03, "Glass Cannon the II": 0.03,
        "Glass Cannon the III": 0.03, "Glass Cannon the IV": 0.03, "Glass Cannon the V": 0.03,
        // Elementals
        "Fire Elemental": 0.10, "Air Elemental": 0.10, "Water Elemental": 0.10,
        "Earth Elemental": 0.10, "Ice Elemental": 0.10,
        // Mini-bosses
        "Diamond Golem": 0.15, "Iron-Plated Diamond Golem": 0.15, "Mana Draining Wisp": 0.15,
        // Teachers
        "Miss Circle": 0.20, "Miss Bloomie": 0.20, "Miss Thavel": 0.20,
        // Bosses
        "Obsidian Golem": 0.25, "Duriel": 0.25, "Will o' Wisp": 0.25,
        "Fiery Will O' Wisp": 0.30, "Azmodan": 0.35,
        // World bosses / special
        "The Player's Mirror": 0.40, "Kitsune": 0.75,
        "Gem Golem": 1.0, // Guarenteed gem from Gem Golem (it's made from gems for fucks sake)
        "Lux": 1.0,   // Guaranteed gem from Lux
        "Bob": 1.0,   // Guaranteed gem from Bob
        "Gerald": 0,  // Gerald gives nothing. He's a rock.
    };

    const gemChance = gemChances[enemy.name] ?? 0.10; // Default 10% for anything not listed
    const gemAmt = enemy.name === "Lux" ? 10n :
                enemy.name === "Bob" ? 5n :
                enemy.name === "Azmodan" || enemy.name === "The Player's Mirror" ? 3n :
                ["Miss Circle", "Miss Bloomie", "Miss Thavel", "Fiery Will O' Wisp"].includes(enemy.name) ? 2n : 1n;
    let gemCurrentChance = Math.random()
    if (gemCurrentChance < gemChance) {
        p.gems = (p.gems ?? 0n) + gemAmt;
        if (gemAmt > 1n) {
            log(`While looting the enemy corpse, you found ${formatNumber(gemAmt)} gems!`, "var(--epicItem)");
        } else {
            log(`While looting the enemy corpse, you found a gem!`, "var(--epicItem)");
        }
    } else if (p.kills % 5n === 0n && gemCurrentChance > gemChance) {
        p.gems = (p.gems ?? 0n) + 1n;
        log(`While looting the enemy corpse, you found a gem!`, "var(--epicItem)");
    }


}