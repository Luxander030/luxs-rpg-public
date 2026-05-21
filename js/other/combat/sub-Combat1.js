function addEnemyKillCount() {
    if (!enemy?.killKey) return;
    p.uniqueEnemyKills[enemy.killKey] = (p.uniqueEnemyKills[enemy.killKey] || 0n) + 1n;
}

function enemyItemDrop() {
    if (Math.random() >= 0.1) return;
    if (!enemy || typeof enemy.drop !== "function") return;
    const drop = enemy.drop();
    if (!drop) return;
    checkSpaceAndAddItem(drop);
    log(`Collected item "${drop}" from ${enemy.name}`, "var(--gold)");
}

function gemDrop() {
    const gemChances = {
        // Normal enemies
        "Shadow Imp": 0.05, "Armored Beetle": 0.05, "Stone Golem": 0.07, "Iron Golem": 0.07,
        "Gloom Weaver": 0.07, "Void Stalker": 0.07, "Elf": 0.05, "Drow Elf": 0.05,
        "Blood Bat": 0.05, "Vampire": 0.08, "Vampire Lord": 0.10, "Vampire King": 0.12,
        // Glass Cannons
        "Glass Cannon the I": 0.03, "Glass Cannon the II": 0.03,
        "Glass Cannon the III": 0.03, "Glass Cannon the IV": 0.03, 
        "Glass Cannon the V": 0.03, "Glass Cannon the VI": 0.03, 
        "Glass Cannon the VII": 0.03, "Glass Cannon the VIII": 0.03, 
        "Glass Cannon the IX": 0.03, "Glass Cannon the X": 0.03,
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