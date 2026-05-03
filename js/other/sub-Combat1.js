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
            
        } else if (enemy.name === "Void Stalker") {

        } else if (enemy.name === "Blood Bat") {
        
        } else if (enemy.name === "Vampire") {
            
        } else if (enemy.name === "Vampire Lord") {

        } else if (enemy.name === "Vampire King") {

        } else if (enemy.name === "Fire Elemental") {
        
        } else if (enemy.name === "Air Elemental") {
    
        } else if (enemy.name === "Water Elemental") {
            
        } else if (enemy.name === "Earth Elemental") {
            
        } else if (enemy.name === "Ice Elemental") {
    
        } else if (enemy.name === "Diamond Golem") {
    
        } else if (enemy.name === "Iron-Plated Diamond Golem") {
            
        } else if (enemy.name === "Mana Draining Wisp") {
            
        } else if (enemy.name === "Miss Circle") {
            
        } else if (enemy.name === "Miss Bloomie") {

        } else if (enemy.name === "Miss Thavel") {
            
        } else if (enemy.name === "Obsidian Golem") {
        
        } else if (enemy.name === "Duriel") {
            
        } else if (enemy.name === "Will o' Wisp") {
            
        } else if (enemy.name === "Fiery Will o' Wisp") {
            
        } else if (enemy.name === "Azmodan") {
            
        } else if (enemy.name === "The Player's Mirror") {
    
        } else if (enemy.name === "Kitsune") {
            
        } else if (enemy.name === "Lux") {
            
        } else if (enemy.name === "Bob") {
            
        }
    }
}