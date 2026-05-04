let adminUnlocked = false; 
const hashed_pass = "$argon2id$v=19$m=262144,t=10,p=4$ODkxNzc4ZTNmNTIzZDcwYTM4OTY3ZWIzNzM1OTEwYzc$SHi1xoiUjJ/m2NRy5uu70MATcv/1ik1QReaAB6M8nZELfvf3HExiean0x6+MFVWbATp9ij6age/1TmUaMYbjbA";
// const hashed_pass = "$argon2id$v=19$m=4096,t=1,p=1$ODkxNzc4ZTNmNTIzZDcwYTM4OTY3ZWIzNzM1OTEwYzc$yEnlUm0zD+Tneqa/wFzdTw"; 

// Listen for the "Enter" key on the console input
document.getElementById('console-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const inputField = e.target;
        const commandText = inputField.value.trim();
        if (commandText) {
            handleCommand(commandText);
            inputField.value = ""; // Clear input
        }
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('debugging-panel').classList.contains('hidden')) {
        toggleAdmin();
    }
});

function handleCommand(cmd) {
    const args = cmd.split(" ");
    const command = args[0].toLowerCase();
    // Use a helper to safely try to get a BigInt from the input
    let bVal = 0n;
    try { bVal = BigInt(args[1] || 0); } catch(e) { bVal = null; }
    const output = document.getElementById('console-output');
    let response = "";
    let successColor = "var(--funfriend)";
    switch (command) {
        case '/give':
            const search = args[1]; // The ID or partial text they typed
            if (!search) {
                // If they typed just "/give", show EVERY ID
                const allIds = inventoryItems.map(i => i.id).join(", ");
                response = `Funfriend: Please provide an ID. Available: [${allIds}]`;
                successColor = "var(--rareItem)";
            } else {
                // Try to find a perfect match
                const item = inventoryItems.find(i => i.id === search);
                if (item) {
                    giveItem(search); 
                    response = `Funfriend: Spawned ${item.name}.`;
                } else {
                    // If no match, find IDs that START with what they typed (Self-filtering list)
                    const suggestions = inventoryItems
                        .filter(i => i.id.toLowerCase().startsWith(search.toLowerCase()))
                        .map(i => i.id);
                    if (suggestions.length > 0) {
                        response = `Funfriend: ID "${search}" not found. Did you mean: [${suggestions.join(", ")}]?`;
                    } else {
                        response = `Funfriend: No items found matching "${search}".`;
                    }
                    successColor = "#ff4757";
                }
            }
            break;
        case '/unlockallinventoryslots':
            p.inventory.slot610Unlocked = true
            p.inventory.slot1120Unlocked = true
            p.inventory.slot6 = "empty"
            p.inventory.slot7 = "empty"
            p.inventory.slot8 = "empty"
            p.inventory.slot9 = "empty"
            p.inventory.slot10 = "empty"
            p.inventory.slot11 = "empty"
            p.inventory.slot12 = "empty"
            p.inventory.slot13 = "empty"
            p.inventory.slot14 = "empty"
            p.inventory.slot15 = "empty"
            p.inventory.slot16 = "empty"
            p.inventory.slot17 = "empty"
            p.inventory.slot18 = "empty"
            p.inventory.slot19 = "empty"
            p.inventory.slot20 = "empty"
            response = "Funfriend: All inventory slots unlocked."
            break;
        case '/setgenocide':
            localStorage.setItem('completedGenocideRun', true)
            response = "Funfriend: Genocide Run successfully set to true."
            break;
        case '/setpacifist':
            localStorage.setItem('completedPacifistRun', true)
            response = "Funfriend: Pacifist Run successfully set to true."
            break;
        case '/cleargenocide':
            localStorage.setItem('completedGenocideRun', false)
            response = "Funfriend: Genocide Run successfully cleared."
            break;
        case '/clearpacifist':
            localStorage.setItem('completedPacifistRun', false)
            response = "Funfriend: Pacifist Run successfully cleared."
            break;
        case '/clearboth':
            localStorage.setItem('completedPacifistRun', false)
            localStorage.setItem('completedGenocideRun', false)
            response = "Funfriend: Pacifist & Genocide Run succesfully cleared."
            break;
        case '/bob':
            if (bVal !== null) { 
                p.bobvisits = bVal
                response = `Bob: Meep :3`; 
                if (bVal >= 15n) {
                    log(`Lux: HEY! Luxander, they're using the console to annoy me! UNFAIR!`, "var(--lux)");
                    setTimeout(()=> {
                        log(`Luxander: ...`, "var(--lux)")
                    }, 2000)
                    setTimeout(()=> {
                        log(`Luxander: Do I look like I care?`, "var(--lux)")
                    }, 2500)
                    setTimeout(()=> {
                        log(`Luxander: Bother Funfriend about it or something. I'm still eating my damn sandwich.`, "var(--lux)")
                    }, 3500)
                }
            } else { 
                response = "Bob: Meeeep D="; 
                successColor = "#ff4757"; 
            }
            break;
        case '/spawn':
            // args[0] is "/spawn", args.slice(1).join(" ") gets the full enemy name
            let targetName = args.slice(1).join(" ").toLowerCase();
            
            // Search the enemies list for a name match
            let found = enemies.find(e => e.name.toLowerCase() === targetName);
            
            if (found) {
                nextEnemyOverride = found.name; // Store the exact name
                response = `Funfriend: The next entity encounter is: ${found.name}`;
            } else {
                response = "Funfriend: Error, entity not found in master database.";
                successColor = "#ff4757";
            }
            break;
        case '/manared':
            if (bVal !== null) { 
                // Store as a whole percentage (e.g. 50n)
                p.manaReduction = BigMath.clamp(bVal, 0n, 100n);
                response = `Funfriend: Mana efficiency set to ${p.manaReduction}%`; 
            } else { 
                response = "Funfriend: Error, use /manared 0-100"; 
                successColor = "#ff4757"; 
            }
            break;
        case '/dmgmult':
            if (bVal !== null) { 
                p.dmgmult = bVal; 
                response = `Funfriend: Damage Multiplier set to ${bVal}%`; 
            } else {                 
                response = "Funfriend: Error, use /dmgmult #"; 
                successColor = "#ff4757"; 
            }
            break;
        case '/killcount':
            if (bVal !== null) { 
                p.kills = bVal;
                response = `Funfriend: Total kill count set to ${formatNumber(bVal)}`; 
            }
            break;
        case '/sparecount':
            if (bVal !== null) { 
                p.spares = bVal;
                response = `Funfriend: Total spared enemies count set to ${formatNumber(bVal)}`; 
            }
            break;
        case '/refillsanity':
            p.sn = p.msn;
            response = "Funfriend: Mind stabilized to maximum.";
            break;
        case '/refillhp':
            p.hp = p.mhp;
            response = "Funfriend: Vitality restored.";
            const healSFX = new Audio("sfx/player_sfx/player_heal.wav");
            healSFX.currentTime = 0;
            healSFX.play().catch(e => console.log("Audio playback prevented:", e));
            break;
        case '/refillmp':
            p.mp = p.mmp;
            response = "Funfriend: Mana pool replenished.";
            break;
        case '/mhp':
            if (bVal !== null) { 
                p.mhp = bVal; 
                p.hp = bVal; 
                response = `Funfriend: Max HP set to ${formatNumber(bVal)}.`; 
            }
            break;
        case '/msan':
            if (bVal !== null) { 
                p.msn = bVal; 
                p.sn = bVal; 
                response = `Funfriend: Max Sanity set to ${formatNumber(bVal)}.`; 
            }
            break;
        case '/mmp':
            if (bVal !== null) { 
                p.mmp = bVal; 
                p.mp = bVal; 
                response = `Funfriend: Max Mana set to ${formatNumber(bVal)}.`; 
            }
            break;
        case '/gold':
            // args[0] is "/gold"
            // args[1] is "set" or "add"
            // args[2] is the number
            const subCommand = args[1]?.toLowerCase();
            // Use your helper logic to get the number from the 3rd word (args[2])
            let amount;
            try { 
                amount = BigInt(args[2] || 0); 
            } catch(e) { 
                amount = null; 
            }
            if (amount === null) {
                response = "Please provide a valid number. Usage: /gold <set|add> <amount>";
                break;
            }
            if (subCommand === 'set') {
                p.gold = amount;
                response = `Funfriend: Total Gold set to ${formatNumber(p.gold)}g.`;
            } 
            else if (subCommand === 'add') {
                p.gold += amount;
                p.totalGold += amount;
                response = `Funfriend: Added ${formatNumber(amount)}g. Total is now ${formatNumber(p.gold)}g.`;
            } 
            else {
                response = "Usage: /gold <set|add> <amount>";
            }
            break;
        case '/sp':
            // args[0] is "/sp"
            // args[1] is "set" or "add"
            // args[2] is the number
            const SPsubCommand = args[1]?.toLowerCase();
            // Use your helper logic to get the number from the 3rd word (args[2])
            let SPamount;
            try { 
                SPamount = BigInt(args[2] || 0); 
            } catch(e) { 
                SPamount = null; 
            }
            if (SPamount === null) {
                response = "Please provide a valid number. Usage: /gold <set|add> <amount>";
                break;
            }
            if (SPsubCommand === 'set') {
                p.sp = SPamount;
                response = `Funfriend: Total SP set to ${formatNumber(p.sp)} SP.`;
            } 
            else if (SPsubCommand === 'add') {
                p.sp += SPamount;
                response = `Funfriend: Added ${formatNumber(SPamount)} SP. Total is now ${formatNumber(p.sp)} SP.`;
            } 
            else {
                response = "Usage: /sp <set|add> <amount>";
            }
            break;
        case '/exp':
            if (bVal !== null) { 
                // Assuming addExperience is updated to handle BigInt
                addExperience(bVal); 
                response = `Funfriend: Granted ${formatNumber(bVal)} EXP.`; 
            }
            break;
        default:
            response = "Funfriend: Unknown command.";
            successColor = "#ff4757";
    }
    output.innerHTML += `<div style="color:${successColor}">> ${cmd}<br><span style="color:#aaa">${response}</span></div>`;
    output.scrollTop = output.scrollHeight;
    updateUI();
}

async function toggleAdmin() {
    const panel = document.getElementById('debugging-panel');
    if (!panel.classList.contains('hidden')) {
        panel.classList.add('hidden');
        return;
    }
    if (!adminUnlocked) {
        let attempt = prompt("Password:");
        if (!attempt) return; // Exit if they hit cancel
        log("Funfriend: Verifying...", "#f1c40f");
        try {
            // The library automatically parses m=262144, t=10, etc., from the string
            await argon2.verify({
                pass: attempt,
                encoded: hashed_pass
            });
            adminUnlocked = true;
            log("Funfriend: Access Granted", "#2ed573");
        } catch (e) {
            log("Funfriend: Access Denied.", "#ff4757");
            return; 
        }
    }
    panel.classList.remove('hidden');
    document.getElementById('console-input').focus();
}

function giveItem(id) {
    const item = inventoryItems.find(i => i.id === id);
    if (item) {
        let success = tryAddItem(item.name);
        if (success) {
            log(`Debug: Obtained ${item.name}`, "cyan");
        } else {
            log(`Debug: Inventory is full!`, "red");
        }
    } else {
        log(`Debug: Item ID "${id}" not found`, "red");
    }   
    updateUI();
    return updateInventoryUI();
}