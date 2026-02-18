function typeToLog(text, color, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = color;
    
    // Set the static part (Day tag + Lux name) immediately
    newEntry.innerHTML = `[Day ${p.day}] Lux: `; 
    l.appendChild(newEntry);
    
    let i = 0;
    function type() {
        if (i < text.length) {
            // Append the next character to the existing "Lux: " string
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}
function spareEnemy() {
    if (!enemy) return;

    // Check: Current HP <= (Max HP / 2)
    if (enemy.hp <= (enemy.mhp / 2n)) {
        log(`You showed mercy to ${enemy.name}.`, "var(--unlocked)");
        
        if (Math.random() < 0.1) {
            if (p.kills >= 100) {
                log(`Lux: Sparing them? That's different. Very different, concidering you have killed ${formatNumber(p.kills)} innocent creatures.`, "#3c23a8");
            } else {
                log(`Lux: Sparing them? How... sentimentally human of you.`, "#3c23a8");
            }
        }

        // Leave combat without gaining Gold or EXP
        enemy = null;
        p.sparedenemies += 1n
        exitEvent();
    } else {
        log(`${enemy.name} is still too aggressive to be spared! (Needs < 50% HP)`, "#ff4757");
        
        if (Math.random() < 0.05) {
            log(`Lux: They still want your blood. Don't be naive.`, "#3c23a8");
        }
        
        // Optional: Sparing a hostile enemy costs you a turn
        enemyTurn();
    }
}
function LuxLog(luxlogstring1) {
    let luxcolor = '#3c23a8'
    log(luxlogstring1, luxcolor)
}
function checkLuxKillLogs() {
    const kills = p.kills;

    if (kills === 1n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: Ah… one soul. How…`, "#3c23a8");
        setTimeout(() => {
            LuxLog(`Lux: …quaint.`)
        }, 1000);
        document.body.style.pointerEvents = "auto"; 

    } else if (kills === 10n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: Ten souls…`, "#3c23a8");
        setTimeout(() => {
            LuxLog(`Lux: Growing bolder, are we?`);
        }, 1000);
        document.body.style.pointerEvents = "auto"; 

    } else if (kills === 100n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: Ah… I see you've killed 100 souls. How… diligent of you.`, "#5128a3");
        setTimeout(() => {
            log(`Lux: But remember… all of this… is still meaningless.`, "#7a2a7a");
        }, 1000);
        setTimeout(() => {
            log(`Lux: I'm always watching… always counting.`, "#9a2a5c");
            document.body.style.pointerEvents = "auto"; 
        }, 3000);

    } else if (kills === 250n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: 250… your hands are growing heavy with the weight of life.`, "#5c2b9f");
        setTimeout(() => {
            log(`Lux: I wonder… do you even notice who you've become?`, "#b02a4a");
            document.body.style.pointerEvents = "auto"; 
        }, 1200);

    } else if (kills === 500n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: 500 souls. Half a millennium of life extinguished by your hand.`, "#6a2d9b");
        setTimeout(() => {
            log(`Lux: And yet, it still feels… insufficient.`, "#c22a3a");
            document.body.style.pointerEvents = "auto"; 
        }, 1000);

    } else if (kills === 750n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: 750… your existence is a tapestry of loss.`, "#7a2f96");
        setTimeout(() => {
            log(`Lux: Do you hear them whispering?`, "#d12a2e");
        }, 1000);
        setTimeout(() => {
            log(`Lux: Every soul you took… they still scream.`, "#e22a1f");
            document.body.style.pointerEvents = "auto"; 
        }, 3000);

    } else if (kills === 1000n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: 1000 souls… a thousand lives, extinguished.`, "#8a318f");
        setTimeout(() => {
            log(`Lux: Can you feel the weight?`, "#ff3b1a");
        }, 1000);
        setTimeout(() => {
            log(`Lux: I can. And I am immortal.`, "#ff0000");
            document.body.style.pointerEvents = "auto"; 
        }, 3000);

    } else if (kills === 5000n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: 5000… the world trembles beneath your deeds.`, "#9b3387");
        setTimeout(() => {
            log(`Lux: So many lives… and yet… I endure.`, "#ff0000");
        }, 1000);
        setTimeout(() => {
            log(`Lux: Mortals like you… fleeting. Me… eternal.`, "#ff0000");
            document.body.style.pointerEvents = "auto"; 
        }, 3000);

    } else if (kills === 10000n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: 10,000 souls. I almost admire your persistence.`, "#ad347e");
        setTimeout(() => {
            log(`Lux: Almost.`, "#ff0000");
        }, 1000);
        setTimeout(() => {
            log(`Lux: But I am beyond your comprehension.`, "#ff0000");
            document.body.style.pointerEvents = "auto"; 
        }, 3000);

    } else if (kills === 100000n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: 100,000 souls… You have become a harbinger of death itself.`, "#c03672");
        setTimeout(() => {
            log(`Lux: And yet, you are nothing…`, "#ff0000");
        }, 1000);
        setTimeout(() => {
            log(`Lux: I am eternal. I see all.`, "#ff0000");
        }, 3000);
        setTimeout(() => {
            log(`Lux: Every timeline. Every choice. Every failure. Every triumph.`, "#ff0000");
        }, 5000);
        setTimeout(() => {
            log(`Lux: And it all belongs to me.`, "#ff0000");
            document.body.style.pointerEvents = "auto"; 
        }, 7000);
    } else if (kills === 250000n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: Congratulations.`,"#3c23a8")
        setTimeout(() => {
            log(`Lux: 250,000 souls.`,"#531f94")
        }, 1000);
        setTimeout(() => {
            log(`Lux: All extinguished by your hand.`,"#691b81")
        }, 3000);
        setTimeout(() => {
            log(`Lux: I wonder how it feels.`,"#7e176f")
        }, 5000);
        setTimeout(() => {
            log(`Lux: To have 250,000 souls, all dead. By your hand.`,"#94135c")
            document.body.style.pointerEvents = "auto"; 
        }, 7000);
    } else if (kills === 500000n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: 50,000 millenia worth of lives...`,"#3c23a8")
        setTimeout(() => {
            log(`Lux: All gone.`,"#531f94")
        }, 1000);
        setTimeout(() => {
            log(`Lux: Do you hear their screams in your mind?`,"#691b81")
        }, 3000);
        setTimeout(() => {
            log(`Lux: I do.`,"#7e176f")
        }, 5000);
        setTimeout(() => {
            log(`Lux: As I do for all creatures who have been killed unjustly.`,"#94135c")
        }, 7000);
        setTimeout(() => {
            log(`Lux: I mourn their lives, as if they were my family.`,"#a90f4a")
        }, 9000);
        setTimeout(() => {
            log(`Lux: You on the other hand...`,"#ea0412")
        }, 11000);
        setTimeout(() => {
            typeToLog(`ARE AN EXCEPTION.`, "#ff0000", 500)
        }, 13000);
        setTimeout(() => {
            log(`[WARNING]: Cursor control is being edited. Changing document.body.style.pointerEvents to 'auto'...`,"#ff6a00")
        }, 25500);
        setTimeout(() => {
            log(`[SYSTEM]: Cursor control fixed. Control granted.`,'#4bff3e')
            document.body.style.pointerEvents = "auto"; 
        }, 27500);
    } else if (kills === 1000000n) {
        document.body.style.pointerEvents = "none"; 
        log(`Lux: Congratulations.`,"#3c23a8")
        setTimeout(() => {
            log(`Lux: A million souls.`,"#3c23a8")
        }, 1000);
        setTimeout(() => {
            log(`Lux: All extinguished by your hand.`,"#531f94")
        }, 3000);
        setTimeout(() => {
            log(`Lux: I wonder how it feels.`,"#691b81")
        }, 5000);
        setTimeout(() => {
            log(`Lux: To have a million souls, all dead. By your hand.`,"#7e176f")
        }, 7000);
        setTimeout(() => {
            log(`Lux: I would congratulate you.`,"#94135c")
        }, 9000);
        setTimeout(() => {
            log(`Lux: Really.`,"#a90f4a")
        }, 11000);
        setTimeout(() => {
            log(`Lux: I would.`,"#bf0c37")
        }, 13000);
        setTimeout(() => {
            log(`Lux: But this... achievement... requires damnation.`,"#d40825")
        }, 15000);
        setTimeout(() => {
            log(`Lux: Not congratulations.`,"#ea0412")
        }, 17000);
        setTimeout(() => {
            log(`[WARNING]; Unautorized write-edit access. Rejecting edits...`,"#ff6a00")
        }, 20000)
        setTimeout(() => {
            log(`[WARNING]: Unable to reject edits from external entity.`,"#ff6a00")
        }, 21000)
        setTimeout(() => {
            log(`[SYSTEM]: Setting 'p.hp', 'p.mp', and 'p.sn' to '1n' to stop player information from corrupting.`, "#4bff3e")
            p.hp = 1n
            p.sn = 1n
            p.mp = 1n
            updateUI();
        }, 22000)
        setTimeout(() => {
            typeToLog(`You won't always have the system to fight your battles for you...`, "#ff0000", 100)
        }, 25000)
        setTimeout(() => {
            log(`[CRITICAL]; External entity edited its own permissions, and edited player permissions. Ensure permissions are up to date, and complying with protocol.`,"#c80000") 
        }, 36500)
        setTimeout(() => {
            document.body.style.pointerEvents = "auto"; 
        }, 37000)

    }
}

const SAVE_VERSION = 8;  // Match your game version (p.v)
const SAVE_KEY = 'LuxExistsOutsideOfTimeSoDontTryToEscapeHim';  // Any secret string; longer = better security (but this is just obfuscation, not real crypto)

// Simple XOR cipher (reversible encryption with key)
function xorCipher(str, key) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

// Simple checksum (sum of char codes; detects tampering)
function checksum(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum;
}

function updateUI() {
    // Helper to calculate percentage safely for BigInt
    // Multiplies by 100n first to maintain precision during BigInt division, 
    // then converts to Number for CSS width.
    const getPercent = (cur, max) => {
        if (max <= 0n) return 0;
        // We multiply by 100n first for precision, 
        // then convert to a Number at the VERY END for the CSS width
        return Number((cur * 100n) / max); 
    };

    // 1. Player Vital Stats
    let hpPerc = getPercent(p.hp, p.mhp);
    let mpPerc = getPercent(p.mp, p.mmp);
    let snPerc = getPercent(p.sn, p.msn);

    // 2. Cap them at 100 and floor at 0 (Ternary is safer than Math.min/max here)
    hpPerc = hpPerc > 100 ? 100 : (hpPerc < 0 ? 0 : hpPerc);
    mpPerc = mpPerc > 100 ? 100 : (mpPerc < 0 ? 0 : mpPerc);
    snPerc = snPerc > 100 ? 100 : (snPerc < 0 ? 0 : snPerc);
    // Player Vital Stats
    document.getElementById('hp-box').classList.toggle('hp-box-full', p.hp >= p.mhp);
    document.getElementById('mp-box').classList.toggle('mp-box-full', p.mp >= p.mmp);
    document.getElementById('sn-box').classList.toggle('sn-box-full', p.sn >= p.msn);

    document.getElementById('hp-val').innerText = `${formatNumber(p.hp)}/${formatNumber(p.mhp)}`;
    document.getElementById('hp-bar').style.width = hpPerc + "%";
    
    document.getElementById('mp-val').innerText = `${formatNumber(p.mp)}/${formatNumber(p.mmp)}`;
    document.getElementById('mp-bar').style.width = mpPerc + "%";

    document.getElementById('sn-val').innerText = `${formatNumber(p.sn)}/${formatNumber(p.msn)}`;
    document.getElementById('sn-bar').style.width = snPerc + "%";

    // 2. LV and EXP Progress Bar
    // Math.pow doesn't work with BigInt. Use a loop or scale it.
    // Example: 1.2^x is roughly (12^x / 10^x). 
    // For simplicity, if Level isn't huge, convert to Number for the exponent math:
    let nextLevelExp = BigInt(Math.floor(100 * Math.pow(1.2, Number(p.lv) - 1)));
    
    document.getElementById('lv-txt').innerText = formatNumber(p.lv);
    document.getElementById('exp-val').innerText = `${formatNumber(p.exp)}/${formatNumber(nextLevelExp)}`;
    document.getElementById('exp-bar').style.width = Math.min(100, getPercent(p.exp, nextLevelExp)) + "%";

    // 3. Currency and Resources
    document.getElementById('gold-txt').innerText = formatNumber(p.gold);
    document.getElementById('sp-txt').innerText = formatNumber(p.sp);
    document.getElementById('day-txt').innerText = p.day.toString(); // BigInts need .toString() or formatNumber

    // 3.5. Sidebar
    document.getElementById('side-mhp').innerText = formatNumber(p.mhp);
    document.getElementById('side-hp').innerText  = formatNumber(p.hp);
    document.getElementById('side-lv').innerText = p.lv.toString();
    document.getElementById('side-gold').innerText = formatNumber(p.gold);
    
    let expRemaining = nextLevelExp - p.exp;
    document.getElementById('side-next-exp').innerText = formatNumber(expRemaining);

    // Multipliers: If manaReduction is stored as BigInt (e.g., 5n for 5%), 
    // just display it. If it's a scaled decimal (e.g., 500n where 10000n = 1.0), divide.
    document.getElementById('side-red').innerText = p.manaReduction.toString() + "%";
    
    // Damage Multiplier (Assuming stored as fixed-point, e.g., 105n = 1.05x)
    let dmgMultPercent = Number(p.dmgmult - 100n); 
    document.getElementById('side-dmgmult').innerText = dmgMultPercent + "%";

    // 4. Enemy Stats
    if (enemy) {
        document.getElementById('e-hp-txt').innerText = `HP: ${formatNumber(enemy.hp)} / ${formatNumber(enemy.mhp)}`;
        document.getElementById('e-hp-bar').style.width = Math.max(0, Math.min(100, getPercent(enemy.hp, enemy.mhp))) + "%";
        document.getElementById('e-name').innerText = enemy.name + (enemy.burn > 0n ? " (Burning)" : "");
        document.getElementById('e-traits').innerText = enemy.trait || "No known traits.";
    }
}


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
    let successColor = "#2ed573";

    switch (command) {
        case '/checkkilllogs':
            log(`/-----------------------/`)
            log(`1 Kill`)
            log(`Lux: Ah… one soul. How…`, "#3c23a8");
            log(`Lux: …quaint.`, "#3c23a8")
            log(`/-----------------------/`)
            log(`10 Kills`)
            log(`Lux: Ten souls…`, "#3c23a8");
            log(`Lux: Growing bolder, are we?`, "#3c23a8");
            log(`/-----------------------/`)
            log(`100 Kills`)
            log(`Lux: Ah… I see you've killed 100 souls. How… diligent of you.`, "#5128a3");
            log(`Lux: But remember… all of this… is still meaningless.`, "#7a2a7a");
            log(`Lux: I'm always watching… always counting.`, "#9a2a5c");
            log(`/-----------------------/`)
            log(`250 Kills`)
            log(`Lux: 250… your hands are growing heavy with the weight of life.`, "#5c2b9f");
            log(`Lux: I wonder… do you even notice who you've become?`, "#b02a4a");
            log(`/-----------------------/`)
            log(`500 Kills`)
            log(`Lux: 500 souls. Half a millennium of life extinguished by your hand.`, "#6a2d9b");
            log(`Lux: And yet, it still feels… insufficient.`, "#c22a3a");
            log(`/-----------------------/`)
            log(`750 Kills`)
            log(`Lux: 750… your existence is a tapestry of loss.`, "#7a2f96");
            log(`Lux: Do you hear them whispering?`, "#d12a2e");
            log(`Lux: Every soul you took… they still scream.`, "#e22a1f");
            log(`/-----------------------/`)
            log(`1000 Kills`)
            log(`Lux: 1000 souls… a thousand lives, extinguished.`, "#8a318f");
            log(`Lux: Can you feel the weight?`, "#ff3b1a");
            log(`Lux: I can. And I am immortal.`, "#ff0000");
            log(`/-----------------------/`)
            log(`5000 Kills`)
            log(`Lux: 5000… the world trembles beneath your deeds.`, "#9b3387");
            log(`Lux: So many lives… and yet… I endure.`, "#ff0000");
            log(`Lux: Mortals like you… fleeting. Me… eternal.`, "#ff0000");
            log(`/-----------------------/`)
            log(`10000 Kills`)
            log(`Lux: 10,000 souls. I almost admire your persistence.`, "#ad347e");
            log(`Lux: Almost.`, "#ff0000");
            log(`Lux: But I am beyond your comprehension.`, "#ff0000");
            log(`/-----------------------/`)
            log(`100000 Kills`)
            log(`Lux: 100,000 souls… You have become a harbinger of death itself.`, "#c03672");
            log(`Lux: And yet, you are nothing…`, "#ff0000");
            log(`Lux: I am eternal. I see all.`, "#ff0000");
            log(`Lux: Every timeline. Every choice. Every failure. Every triumph.`, "#ff0000");
            log(`Lux: And it all belongs to me.`, "#ff0000");
            log(`/-----------------------/`)
            log(`250000 Kills`)
            log(`Lux: Congratulations.`, "#3c23a8");
            log(`Lux: 250,000 souls.`, "#531f94");
            log(`Lux: All extinguished by your hand.`, "#691b81");
            log(`Lux: I wonder how it feels.`, "#7e176f");
            log(`Lux: To have 250,000 souls, all dead. By your hand.`, "#94135c");
            log(`/-----------------------/`)
            log(`500000 Kills`)
            log(`Lux: 50,000 millenia worth of lives...`, "#3c23a8");
            log(`Lux: All gone.`, "#531f94");
            log(`Lux: Do you hear their screams in your mind?`, "#691b81");
            log(`Lux: I do.`, "#7e176f");
            log(`Lux: As I do for all creatures who have been killed unjustly.`, "#94135c");
            log(`Lux: I mourn their lives, as if they were my family.`, "#a90f4a");
            log(`Lux: You on the other hand...`, "#ea0412");
            log(`Lux: ARE AN EXCEPTION.`, "#ff0000");
            log(`System: Control regained.`, "#4bff3e");
            log(`/-----------------------/`)
            log(`1000000 Kills`)
            log(`Lux: Congratulations.`, "#3c23a8");
            log(`Lux: A million souls.`, "#531f94");
            log(`Lux: All extinguished by your hand.`, "#691b81");
            log(`Lux: I wonder how it feels.`, "#7e176f");
            log(`Lux: To have a million souls, all dead. By your hand.`, "#94135c");
            log(`Lux: I would congratulate you.`, "#a90f4a");
            log(`Lux: Really.`, "#bf0c37");
            log(`Lux: I would.`, "#d40825");
            log(`Lux: But this... achievement... requires damnation.`, "#ea0412");
            log(`Lux: Not congratulations.`, "#ff0000");
            log(`System: Warning: Unauthorized health editing. Set Health to '1n' to stabilize health editing. Unable to set health back to full.`, "#4bff3e");
            log(`/-----------------------/`)
            break;

        case '/spawn':
            // args[0] is "/spawn", args.slice(1).join(" ") gets the full enemy name
            let targetName = args.slice(1).join(" ").toLowerCase();
            
            // Search the enemies list for a name match
            let found = enemies.find(e => e.name.toLowerCase() === targetName);
            
            if (found) {
                nextEnemyOverride = found.name; // Store the exact name
                response = `FUNFRIEND: The next entity you encounter will be: ${found.name}`;
            } else {
                response = "FUNFRIEND: Error, entity not found in master database.";
                successColor = "#ff4757";
            }
            break;
        case '/manared':
            if (bVal !== null) { 
                // Store as a whole percentage (e.g. 50n)
                p.manaReduction = bVal > 100n ? 100n : (bVal < 0n ? 0n : bVal);
                response = `FUNFRIEND: Mana efficiency set to ${p.manaReduction}%`; 
            } else { 
                response = "FUNFRIEND: Error, use /manared 0-100"; 
                successColor = "#ff4757"; 
            }
            break;

        case '/dmgmult':
            if (bVal !== null) { 
                // Store as fixed-point (e.g., 150n represents 1.5x)
                p.dmgmult = bVal; 
                response = `FUNFRIEND: Damage Multiplier set to ${bVal}%`; 
            } else {                 
                response = "FUNFRIEND: Error, use /dmgmult #"; 
                successColor = "#ff4757"; 
            }
            break;

        case '/killcount':
            if (bVal !== null) { 
                p.kills = bVal;
                response = `FUNFRIEND: Total kill count set to ${formatNumber(bVal)}`; 
            }
            break;
        case '/refillsanity':
            p.sn = p.msn;
            response = "FUNFRIEND: Mind stabilized to maximum.";
            break;

        case '/refillhp':
            p.hp = p.mhp;
            response = "FUNFRIEND: Vitality restored.";
            break;
        case '/refillmp':
            p.mp = p.mmp;
            response = "FUNFRIEND: Mana pool replenished.";
            break;

        case '/mhp':
            if (bVal !== null) { 
                p.mhp = bVal; 
                p.hp = bVal; 
                response = `FUNFRIEND: Max HP set to ${formatNumber(bVal)}.`; 
            }
            break;
        case '/msan':
            if (bVal !== null) { 
                p.msn = bVal; 
                p.sn = bVal; 
                response = `FUNFRIEND: Max Sanity set to ${formatNumber(bVal)}.`; 
            }
            break;
        case '/mmp':
            if (bVal !== null) { 
                p.mmp = bVal; 
                p.mp = bVal; 
                response = `FUNFRIEND: Max Mana set to ${formatNumber(bVal)}.`; 
            }
            break;
        case '/gold':
            if (bVal !== null) { 
                p.gold = bVal; 
                response = `FUNFRIEND: Total Gold adjusted to ${formatNumber(bVal)}g.`; 
            }
            break;

        case '/exp':
            if (bVal !== null) { 
                // Assuming addExperience is updated to handle BigInt
                addExperience(bVal); 
                response = `FUNFRIEND: Granted ${formatNumber(bVal)} EXP.`; 
            }
            break;

        // ... keep other cases like /spawn the same since they use strings
        default:
            response = "FUNFRIEND: Unknown command.";
            successColor = "#ff4757";
    }

    output.innerHTML += `<div style="color:${successColor}">> ${cmd}<br><span style="color:#aaa">${response}</span></div>`;
    output.scrollTop = output.scrollHeight;
    updateUI();
}


function toggleAdmin() {
    const panel = document.getElementById('debugging-panel');
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
        document.getElementById('console-input').focus();
    }
}

function formatNumber(num) {
    let bNum;
    try {
        bNum = BigInt(num);
    } catch (e) { return "0"; }

    const absolute = bNum < 0n ? -bNum : bNum;
    if (absolute < 1000n) return bNum.toString();

    // Suffixes based on standard short scale (10^(3n+3))
const units = [
    "", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", // 0-10
    "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", // 11-20
    "Vg", "Uvg", "Dvg", "Tvg", "Qavg", "Qivg", "Sxvg", "Spvg", "Ocvg", "Novg", // 21-30
    "Tg", "Utg", "Dtg", "Ttg", "Qatg", "Qitg", "Sxtg", "Sptg", "Octg", "Notg", // 31-40
    "Qg", "Uqg", "Dqg", "Tqg", "Qaqg", "Qiqg", "Sxqg", "Spqg", "Ocqg", "Noqg", // 41-50
    "Qig", "Uqig", "Dqig", "Tqig", "Qaqig", "Qiqig", "Sxqig", "Spqig", "Ocqig", "Noqig", // 51-60
    "Sxg", "Usxg", "Dsxg", "Tsxg", "Qasxg", "Qisxg", "Sxsxg", "Spsxg", "Ocsxg", "Nosxg", // 61-70
    "Spg", "Uspg", "Dspg", "Tspg", "Qaspg", "Qispg", "Sxspg", "Spspg", "Ocspg", "Nospg", // 71-80
    "Og", "Uog", "Dog", "Tog", "Qaog", "Qiog", "Sxog", "Spog", "Ocog", "Noog", // 81-90
    "Ng", "Ung", "Dng", "Tng", "Qang", "Qing", "Sxng", "Spng", "Ocng", "Nong", // 91-100
    "Ce", "Uce", "Dce", "Tce", "Qace", "Qice", "Sxce", "Spce", "Occe", "Noce", // 101-110 (Centillions)
    "Dcc", "Udcc", "Ddcc", "Tdcc", "Qadcc", "Qidcc", "Sxdcc", "Spdcc", "Ocdcc", "Nodcc", // 111-120
    "Tcc", "Utcc", "Dtcc", "Ttcc", "Qatcc", "Qitcc", "Sxtcc", "Sptcc", "Octcc", "Notcc", // 121-130
    "Qacc", "Uqacc", "Dqacc", "Tqacc", "Qaqacc", "Qiqacc", "Sxqacc", "Spqacc", "Ocqacc", "Noqacc", // 131-140
    "Qicc", "Uqicc", "Dqicc", "Tqicc", "Qaqicc", "Qiqicc", "Sxqicc", "Spqicc", "Ocqicc", "Noqicc", // 141-150
    "Sxcc", "Usxcc", "Dsxcc", "Tsxcc", "Qasxcc", "Qisxcc", "Sxsxcc", "Spsxcc", "Ocsxcc", "Nosxcc", // 151-160
    "Spcc", "Uspcc", "Dspcc", "Tspcc", "Qaspcc", "Qispcc", "Sxspcc", "Spspcc", "Ocspcc", "Nospcc", // 161-170
    "Occ", "Uocc", "Docc", "Tocc", "Qaocc", "Qiocc", "Sxocc", "Spocc", "Ococc", "Noocc", // 171-180
    "Nocc", "Unocc", "Dnocc", "Tnocc", "Qanocc", "Qinocc", "Sxnocc", "Spnocc", "Ocnocc", "Nonocc", // 181-190
    "Vgc", "Uvgc", "Dvgc", "Tvgc", "Qavgc", "Qivgc", "Sxvgc", "Spvgc", "Ocvgc", "Novgc", // 191-200 (Viginticentillions)
    "Tgc", "Utgc", "Dtgc", "Ttgc", "Qatgc", "Qitgc", "Sxtgc", "Sptgc", "Octgc", "Notgc", // 201-210 (Trigintacentillions)
    "Qgc", "Uqgc", "Dqgc", "Tqgc", "Qaqgc", "Qiqgc", "Sxqgc", "Spqgc", "Ocqgc", "Noqgc", // 211-220 (Quadragintacentillions)
    "Qigc", "Uqigc", "Dqigc", "Tqigc", "Qaqigc", "Qiqigc", "Sxqigc", "Spqigc", "Ocqigc", "Noqigc", // 221-230 (Quinquagintacentillions)
    "Sxgc", "Usxgc", "Dsxgc", "Tsxgc", "Qasxgc", "Qisxgc", "Sxsxgc", "Spsxgc", "Ocsxgc", "Nosxgc", // 231-240 (Sexagintacentillions)
    "Spgc", "Uspgc", "Dspgc", "Tspgc", "Qaspgc", "Qispgc", "Sxspgc", "Spspgc", "Ocspgc", "Nospgc"  // 241-250 (Septuagintacentillions)
];


    const str = absolute.toString();
    const tier = Math.floor((str.length - 1) / 3);

    if (tier >= units.length) return "∞";

    const leadDigits = str.length % 3 || 3;
    const resultStr = str.substring(0, leadDigits) + "." + str.substring(leadDigits, leadDigits + 2);
    
    // parseFloat trims trailing zeros (e.g. 1.00 -> 1)
    const finalNum = parseFloat(resultStr);

    return (bNum < 0n ? "-" : "") + finalNum + units[tier];
}

function log(msg, color = "#e1e1e6") {
    const l = document.getElementById('log');
    
    // 1. Create and add the new log message
    const newEntry = document.createElement('div');
    newEntry.style.color = color;
    newEntry.innerHTML = `[Day ${p.day}] ${msg}`;
    l.appendChild(newEntry);

    // 2. CRITICAL: Limit the log to 1,000 messages
    // If we have more than 1000 messages, remove the oldest one (the first child)
    while (l.children.length > 1000) {
        l.removeChild(l.firstChild);
    }

    // 3. Auto-scroll to the bottom
    l.scrollTop = l.scrollHeight;
}

function nextDay() {
    // 1. BigInt Increment
    p.day++; 

    // 2. Handling Scaling Factors
    // Convert to BigInt immediately so all math stays in the BigInt domain
    let manaLossScalingFactor = p.day; 
    let manaRegainedScalingFactor = p.lv;

    if (p.sn > 0n) {
        let manaRegained = 100n * manaRegainedScalingFactor;
        
        // Use a manual Math.min logic for BigInt
        p.mp = (p.mp + manaRegained > p.mmp) ? p.mmp : p.mp + manaRegained;
        
        log(`Resting between days restores mana... (${formatNumber(manaRegained)} Mana Regained)`, "var(--mana)");
        if (Math.random() < 0.05) {
            log(`Lux: Maybe don't be lazy, and maybe, just maybe, you'll get what you want.`, "#3c23a8");
        }
    } else {
        let manaLost = 50n * manaLossScalingFactor;
        
        // Use manual Math.max logic for BigInt
        p.mp = (p.mp - manaLost < 0n) ? 0n : p.mp - manaLost;
        
        log(`Lux consumes your essence... (${formatNumber(manaLost)} Mana Lost)`, "var(--sanity)");
        if (Math.random() < 0.05) {
            log(`Lux: Maybe don't be insane, and maybe we wouldn't be in this situation.`, "#3c23a8");
        }
    }
    
    // Math.random() is fine because it returns a Number (0.0 to 1.0)
    let roll = Math.random(); 

    if (roll < 0.15) {
        let springScalingRestore = 50n * p.lv;
        log(`You discovered a Tranquil Spring. (All Stats recovered by ${formatNumber(springScalingRestore)})...`, "#00ffff");
        
        if (Math.random() < 0.05) {
            log(`Lux: Do you really think a little pond will help you?`, "#3c23a8");
        }

        // Apply restoration with BigInt-safe min logic
        p.hp = (p.hp + springScalingRestore > p.mhp) ? p.mhp : p.hp + springScalingRestore;
        p.mp = (p.mp + springScalingRestore > p.mmp) ? p.mmp : p.mp + springScalingRestore;
        p.sn = (p.sn + springScalingRestore > p.msn) ? p.msn : p.sn + springScalingRestore;
        
        updateUI();
    } else if (roll < 0.40) {
        startShop();
        updateUI();
    } else {
        startCombat();
    }
}

function startShop() {
    if (Math.random() < 0.05) {
        log(`Lux: Oh look, a wandering merchant. Better stock up on goods =)`, "#3c23a8");
    }
    log("The Wandering Merchant beckons you...", "var(--gold)");
    
    document.getElementById('main-controls').classList.add('hidden');
    document.getElementById('shop-view').classList.remove('hidden');
    const shelf = document.getElementById('shop-shelf'); 
    shelf.innerHTML = "";
    
    // 1. Determine item count (Convert BigInt Level to Number for small logic)
    let currentLv = Number(p.lv); 
    let itemCount;
    if (currentLv <= 5) itemCount = 2;
    else if (currentLv <= 10) itemCount = 3;
    else if (currentLv <= 15) itemCount = 4;
    else if (currentLv <= 20) itemCount = 5;
    else itemCount = 6;

    // 2. Filter out maxed stabilizers
    let availableItems = masterShop.filter(item => {
        // Change: Assuming manaReduction is now stored as a whole number percentage (e.g., 100n = 100%)
        if ((item.id === 'manastabilizer' || item.id === 'manastabilizer2') && p.manaReduction >= 100n) return false;
        return true;
    });

    // 3. Fisher-Yates Shuffle (This stays exactly the same)
    for (let i = availableItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableItems[i], availableItems[j]] = [availableItems[j], availableItems[i]];
    }

    // 4. Slice the list
    let items = availableItems.slice(0, itemCount);
    
    // 5. Render the items
    items.forEach((item, index) => {
        let div = document.createElement('div');
        div.className = "shop-item";
        
        // Use formatNumber for the item cost in the UI
        div.innerHTML = `
            <strong>${item.name}</strong><br>
            ${formatNumber(item.cost)}g<br>
            <button id="shop-btn-${index}" style="margin-top:10px" 
                onclick="buyItem('${item.id}', 'shop-btn-${index}')">Acquire</button>`;
        shelf.appendChild(div);
    });
}

function maybeSoldOut(btn) {
    btn.innerText = Math.random() < 0.05 ? "=)" : "Sold Out";
}

function buyItem(id, btnId) {
    let item = masterShop.find(i => i.id === id);
    if (p.gold >= item.cost) { 
        p.gold -= item.cost; 
        log(item.run(), "var(--unlocked)"); 
        
        let btn = document.getElementById(btnId);
        if (btn) {
            btn.disabled = true;

            // 5% chance to show "=)" instead of "Sold Out"
            btn.innerText = Math.random() < 0.05 ? "=)" : "Sold Out";
        }

        // FIX: Force combat buttons to re-render if the combat view is visible
        const combatView = document.getElementById('combat-view');
        if (combatView && !combatView.classList.contains('hidden')) {
            renderCombatButtons();
        }

        updateUI(); 
    } else {
    if (Math.random() < 0.05) {
        log(`Lux: You're broke. The result of spending gold on stuff you don't need.`,"#3c23a8")
    }
        log("You lack the coin. This world is not for the poor...", "#ff4757");
    }
}

function positionTooltip(e, tip) {
    // Convert to BigInt - Math methods are not compatible with BigInt
    let x = BigInt(e.clientX) + 15n;
    let y = BigInt(e.clientY) + 15n;

    const tipWidth = BigInt(tip.offsetWidth);
    const tipHeight = BigInt(tip.offsetHeight);
    const winWidth = BigInt(window.innerWidth);
    const winHeight = BigInt(window.innerHeight);

    // Check right edge
    if (x + tipWidth > winWidth) {
        x = BigInt(e.clientX) - tipWidth - 15n;
    }

    // Check bottom edge
    if (y + tipHeight > winHeight) {
        y = BigInt(e.clientY) - tipHeight - 15n;
    }

    // Replace Math.max(5, x) with ternary logic
    x = (x < 5n) ? 5n : x;
    y = (y < 5n) ? 5n : y;

    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
}

function renderCombatButtons() {
    const zone = document.getElementById('combat-btns');
    const searchInput = document.getElementById('action-search');
    const query = searchInput ? searchInput.value.toLowerCase() : ""; 
    
    if (!zone) return; 
    zone.innerHTML = ""; 

    const categories = [
        { label: "Damaging Spells", filter: (s) => s.dmg},
        { label: "Healing Spells", filter: (s) => (s.heal || s.san) && s.mp && s.name !== "Snowgrave"},
    ];

    categories.forEach(cat => {
        const matchingSkills = p.skills.filter(sid => {
            let s = skillTree[sid];
            return s && cat.filter(s) && s.name.toLowerCase().includes(query);
        });

        if (matchingSkills.length > 0) {
            const header = document.createElement('div');
            header.style = "grid-column: span 2; color: #a4b0be; font-size: 0.75em; margin-top: 10px; border-bottom: 1px solid #2f3542; text-transform: uppercase;";
            header.innerText = cat.label;
            zone.appendChild(header);

            matchingSkills.forEach(sid => {
                let s = skillTree[sid];
                let b = document.createElement('button');
                
                // Ensure mana calculation uses BigInt
                let currentCost = BigInt(getScaledMana(s.mp || 0));
                
                b.innerText = `${s.name}${s.mp ? ' (' + formatNumber(currentCost) + ' MP)' : ''}`;
                b.onclick = () => cast(sid);

                const updateTipPos = (e, tip) => {
                    let x = BigInt(e.clientX) + 15n;
                    let y = BigInt(e.clientY) + 15n;
                    let tipH = BigInt(tip.offsetHeight);
                    let winW = BigInt(window.innerWidth);
                    let winH = BigInt(window.innerHeight);

                    if (x + 200n > winW) x = BigInt(e.clientX) - 215n;
                    if (y + tipH > winH) y = winH - tipH - 10n;
                    
                    tip.style.left = x + 'px';
                    tip.style.top = y + 'px';
                };

                b.onmouseenter = (e) => {
                    const tip = document.getElementById('tooltip');
                    let html = `<strong>${s.name}</strong><br>`;
                    // Assuming formatNumber handles BigInt
                    if (s.dmg) html += `DMG: <span style="color:var(--hp)">${formatNumber(BigInt(s.dmg))}</span><br>`;
                    if (s.heal) html += `Healing: <span style="color:var(--unlocked)">${formatNumber(BigInt(s.heal))}</span><br>`;
                    if (s.san) html += `Sanity: <span style="color:var(--sanity)">${formatNumber(BigInt(s.san))}</span><br>`;
                    if (s.burn) html += `Burn: <span style="color:var(--gold)">${s.burn} turns</span><br>`;
                    
                    tip.innerHTML = html + `<hr style="border:0;border-top:1px solid #444;margin:5px 0"><small>${s.mp ? 'Cost: ' + formatNumber(currentCost) + ' MP' : 'No Cost'}</small>`;
                    tip.style.display = 'block';
                    updateTipPos(e, tip);
                };

                b.onmousemove = (e) => {
                    updateTipPos(e, document.getElementById('tooltip'));
                };

                b.onmouseleave = () => {
                    document.getElementById('tooltip').style.display = 'none';
                };

                zone.appendChild(b);
            });
        }
    });

    if (zone.innerHTML === "" && query !== "") {
        zone.innerHTML = `<div style="grid-column: span 2; text-align: center; color: #666; margin-top: 10px;">No actions matching "${query}"</div>`;
    }
}

function openTree() {
    document.getElementById('main-controls').classList.add('hidden');
    document.getElementById('tree-view').classList.remove('hidden');
    renderTree();
}
function renderTree() {
    const container = document.getElementById('tree-nodes'); 
    container.innerHTML = "";
    
    if (p.skills.includes('strike')) skillTree.strike.unlocked = true;

    const allUnlocked = Object.keys(skillTree).every(id => skillTree[id].unlocked === true);

    if (allUnlocked) {
        const masteryOptions = [
            { name: "Vitality Mastery", stat: "mhp", color: "var(--hp)" },
            { name: "Magic Mastery", stat: "mmp", color: "var(--mana)" },
            { name: "Clarity Mastery", stat: "msn", color: "var(--sanity)" }
        ];
        masteryOptions.forEach(opt => {
            let div = document.createElement('div');
            div.className = "node available";
            div.style.borderColor = opt.color;

            // FIX: BigInt math for 5% gain (Value * 5n / 100n)
            // BigInt division automatically floors the result.
            let currentValue = BigInt(p[opt.stat]);
            let currentGain = (currentValue * 5n) / 100n; 
            
            div.innerHTML = `
                <strong>${opt.name}</strong><br>
                Cost: 1 SP<br>
                <small style="color:#aaa">+${formatNumber(currentGain)} Max ${opt.stat.slice(1).toUpperCase()}</small>
            `;
            
            div.onclick = () => buyMastery(opt.stat);
            container.appendChild(div);
        });

    } else {
        for (let id in skillTree) {
            let s = skillTree[id];
            let isParentUnlocked = !s.parent || skillTree[s.parent].unlocked;
            let div = document.createElement('div');
            div.className = `node ${s.unlocked ? 'purchased' : (isParentUnlocked ? 'available' : '')}`;
            
            let displayName = Math.random() < 0.05 ? "=)" : s.name;
            // Ensure cost is compared or displayed correctly if it's a BigInt
            let displayCost = Math.random() < 0.05 ? "=)" : (s.unlocked ? 'Known' : s.cost + ' SP');

            div.innerHTML = `<strong>${displayName}</strong><br>${displayCost}`;

            if (isParentUnlocked && !s.unlocked) div.onclick = () => buySkill(id);
            container.appendChild(div);
        }
    }
}

function buyMastery(stat) {
    // Check against 1n if p.sp is a BigInt
    if (p.sp >= 1n) {
        // Calculate 5% gain using BigInt math
        // Multiplication first (stat * 5), then division (100)
        let gain = (BigInt(p[stat]) * 5n) / 100n;
        
        p.sp -= 1n;
        p[stat] += gain;            // Increase Max (e.g., p.mhp)
        
        let currentStat = stat.substring(1); 
        p[currentStat] += gain;     // Increase Current (e.g., p.hp)

        log(`Mastery achieved! Your ${currentStat.toUpperCase()} grew by 5% (+${formatNumber(gain)}).`, "var(--unlocked)");
        
        if (Math.random() < 0.05) {
            log(`Lux: Watching you swell with power is like watching a balloon inflate. I wonder when you'll pop?`, "#3c23a8");
        }

        renderTree();
        updateUI();
    } else {
        log("Insufficient Skill Points for transcendence.", "#ff4757");
    }
}

function buySkill(id) {
    let s = skillTree[id];
    if (s.unlocked) return;

    // Convert s.cost to BigInt for comparison and subtraction
    const skillCost = BigInt(s.cost);

    if (p.sp >= skillCost) { 
        p.sp -= skillCost; 
        s.unlocked = true;
        p.skills.push(id);
        log(`Learned ${s.name}!`, "var(--unlocked)");
        
        if (Math.random() < 0.05) {
            log(`Lux: Congratulations. You got a new spell. Doesn't really help you anyway. I can still delete you =)`,"#3c23a8");
        }
        
        renderTree();
        updateUI();
    } else {
        // formatNumber will handle the BigInt for the display
        log(`You need ${formatNumber(skillCost)} Skill Points to learn this.`, "#ff4757");
        
        if (Math.random() < 0.05) {
            log(`Lux: You lack the wizdom that I have. I'm still a god in this world anyway. You're nothing...`,"#3c23a8");
        }
    }
}
function getScaledMana(baseCost) {
    // Convert baseCost to BigInt safely
    const base = BigInt(baseCost || 0);
    if (base === 0n) return 0n;
    
    // Logic: multiplier = floor((MaxMP / 2) / 100)
    // In BigInt: (p.mmp / 2n) / 100n
    let multiplier = (BigInt(p.mmp) / 2n) / 100n;
    
    // If multiplier is 0 (early game), ensure it is at least 1 
    // so the spell doesn't cost 0 MP unless base is 0.
    if (multiplier < 1n) multiplier = 1n;

    let scaledCost = base * multiplier;
    
    // Handle reduction percentage
    // Assuming p.manaReduction is a decimal like 0.1 (10%), 
    // we convert to BigInt math: (scaledCost * reduction) / 100
    // If manaReduction is stored as a whole number (e.g. 10), use that.
    let reductionPercent = BigInt(p.manaReduction || 0);
    let reductionAmount = (scaledCost * reductionPercent) / 100n;
    
    let finalCost = scaledCost - reductionAmount;
    
    // Math.max(baseCost, finalCost) replacement:
    // This ensures the cost never drops below the base cost 
    // regardless of reduction.
    return finalCost < base ? base : finalCost;
}
    function startCombat() {
    let selectedEnemy = null;

    // Lux Override Check.
    // If a random chance happens, replace enemy
    if (nextEnemyOverride) {
        selectedEnemy = enemies.find(e => e.name.toLowerCase() === nextEnemyOverride.toLowerCase());
        nextEnemyOverride = null; 
        if (selectedEnemy) log("You have encountered an unnatural enemy. Maybe Lux sent them? Stay safe.", "#3c23a8");
    }

    // 2. STANDARD SELECTION (If no override exists)
    if (!selectedEnemy) {
        // Filter the pool based on LV and Skills
        let eligiblePool = enemies.filter(e => {
            try {
                return e.canSpawn ? e.canSpawn() : true;
            } catch(err) {
                return true; 
            }
        });

        // Fallback if the pool is empty
        if (eligiblePool.length === 0) {
            eligiblePool = [enemies.find(e => e.name === "Shadow Imp") || enemies[0]];
        }

        // Calculate Weights
        let totalWeight = 0;
        eligiblePool.forEach(e => {
            totalWeight += (e.weight || 10);
        });

        // Weighted Roll
        let roll = Math.random() * totalWeight;
        for (let i = 0; i < eligiblePool.length; i++) {
            roll -= (eligiblePool[i].weight || 10);
            if (roll <= 0) {
                selectedEnemy = eligiblePool[i];
                break;
            }
        }
        
        // Final safety fallback
        if (!selectedEnemy) selectedEnemy = eligiblePool[0];
    }

    // 3. INITIALIZE THE ENCOUNTER
    // Clone the template so we don't modify the master 'enemies' array
    enemy = { ...selectedEnemy, burn: 0 };

    // 4. UI TRANSITIONS
    document.getElementById('main-controls').classList.add('hidden');
    document.getElementById('combat-view').classList.remove('hidden');
    
    renderCombatButtons(); 
    updateUI(); 
    
    log(`Engaged in combat with: ${enemy.name}`, "#ff4757");
    document.getElementById('e-name').innerText = enemy.name;

    // 5. SPECIAL DIALOGUE CHECK
    if (selectedEnemy.specialMsg) {
        setTimeout(() => {
            log(selectedEnemy.specialMsg, "#bf2c89");
        }, 150);
    }
}

function cast(sid) {
    let s = skillTree[sid];
    // getScaledMana now returns a BigInt
    let scaledCost = getScaledMana(s.mp);

    // 1. Mana Check (BigInt comparison)
    if (s.mp && p.mp < scaledCost) {
        log(`Insufficient Mana! Need ${formatNumber(scaledCost)} MP.`, "#ff4757");
        if (Math.random() < 0.2) {
            log(`Lux: You absolute baffoon. You're stressing yourself out more and more. Do you really want to burn out your soul? It'll just make it more crispy when I eat it later =)`, "#3c23a8");
        }
        return; 
    }

    // 2. Deduct Mana (BigInt subtraction)
    if (s.mp) p.mp -= scaledCost;

    // 3. Damage Logic
    if (s.dmg) { 
        let damage = BigInt(s.dmg);
        enemy.hp -= damage; 
        log(`You strike with ${s.name} for ${formatNumber(damage)} damage.`); 
        if (Math.random() < 0.05) {
            log(`Lux: You dealt ${formatNumber(damage)} damage. Nice job. Just don't forget...`,"#3c23a8");
            log(`Lux: I can do much, much more.`,"#ff0000");
        }
    }

    // 4. Status Effects (Duration can stay as Number)
    if (s.burn) {
        if (enemy.burnImmune) {
            log(`${enemy.name} is immune to burn!`, "var(--gold)");
        } else {
            enemy.burn = s.burn; 
            log(`${enemy.name} is set ablaze for ${s.burn} turns!`, "var(--gold)");
        }
    }

    // 5. Healing / Sanity (Replaced Math.min with ternaries)
    if (s.heal) {
        let healAmt = BigInt(s.heal);
        p.hp = (p.hp + healAmt > p.mhp) ? p.mhp : p.hp + healAmt;
    }
    
    if (s.san) {
        let sanAmt = BigInt(s.san);
        p.sn = (p.sn + sanAmt > p.msn) ? p.msn : p.sn + sanAmt;
    }

    // 6. Passive Mana Regen (Using 5n for BigInt)
    if (p.sn > 0n) {
        p.mp = (p.mp + 5n > p.mmp) ? p.mmp : p.mp + 5n;
    }

    // 7. Win/Turn Logic (BigInt comparison to 0n)
    if (enemy.hp <= 0n) {
        win(); 
    } else {
        enemyTurn();
    }
    
    updateUI();
}
function enemyTurn() {
    // 1. Burn tick (BigInt math)
    if (enemy.burn > 0) {
        if (enemy.burnImmune) {
            enemy.burn = 0;
        } else {
            // Logic: floor(LV * 2) -> LV is BigInt, so just multiply
            let baseBurnDMG = BigInt(p.lv) * 2n;

            // Multipliers (Assume these are regular numbers like 1.5 or 0.5)
            // To keep precision, multiply by (multiplier * 100) then divide by 100n
            let mult = BigInt(Math.floor((enemy.burnResist || 1) * (enemy.burnVuln || 1) * 100));
            let dmgMult = BigInt(Math.floor(p.dmgmult * 100));
            
            let finalBurnDMG = (baseBurnDMG * mult * dmgMult) / 10000n;

            enemy.hp -= finalBurnDMG;
            enemy.burn--;

            log(`${enemy.name} is burning! (-${formatNumber(finalBurnDMG)} HP)`, "var(--gold)");

            if (enemy.burnReflect && enemy.burnReflect > 0) {
                let reflectMult = BigInt(Math.floor(enemy.burnReflect * 100));
                let reflectDMG = (finalBurnDMG * reflectMult) / 100n;
                p.hp -= reflectDMG;
                log(`${enemy.name} reflects ${formatNumber(reflectDMG)} burn damage back to you!`, "var(--hp)");
            }
        }
    }

    if (enemy.hp <= 0n) return win();

    // 2. Lifesteal (Math.min replacement)
    if (enemy.lifesteal && BigInt(enemy.lifesteal) > 0n) {
        let heal = BigInt(enemy.lifesteal);
        enemy.hp = (enemy.hp + heal > enemy.mhp) ? enemy.mhp : enemy.hp + heal;
        log(`${enemy.name} drains your life and heals ${formatNumber(heal)} HP`, "var(--hp)");
    }

    // 3. Attack (BigInt subtraction)
    p.hp -= BigInt(enemy.atk);

    // 4. Sanity / Mana Drain (Math.max replacement)
    const sDrain = BigInt(enemy.san || 0);
    const mDrain = BigInt(enemy.manaDrain || 0);

    if (sDrain > 0n && mDrain > 0n) {
        p.sn = (p.sn - sDrain < 0n) ? 0n : p.sn - sDrain;
        p.mp = (p.mp - mDrain < 0n) ? 0n : p.mp - mDrain;
        log(`${enemy.name} strikes for ${formatNumber(BigInt(enemy.atk))} HP, <span class="san-warn">${formatNumber(sDrain)} Sanity Drain</span> and <span class="mana-warn">${formatNumber(mDrain)} Mana Drain</span>`);
    } else if (sDrain > 0n) {
        p.sn = (p.sn - sDrain < 0n) ? 0n : p.sn - sDrain;
        log(`${enemy.name} strikes for ${formatNumber(BigInt(enemy.atk))} HP and <span class="san-warn">${formatNumber(sDrain)} Sanity Drain</span>!`);
    } else if (mDrain > 0n) {
        p.mp = (p.mp - mDrain < 0n) ? 0n : p.mp - mDrain;
        log(`${enemy.name} strikes for ${formatNumber(BigInt(enemy.atk))} HP and <span class="mana-warn">${formatNumber(mDrain)} Mana Drain</span>`, "var(--mana)");
    } else {
        log(`${enemy.name} strikes for ${formatNumber(BigInt(enemy.atk))} HP.`);
    }

    // 5. Death check
    if (p.hp <= 0n) { 
        log(`Enjoy the bitter-sweet, cold, embrace of death =)`,"#3c23a8");
        log("You have perished.", "#ff4757"); 
        document.body.style.pointerEvents = "none"; 
    }
    updateUI();
}
function addExperience(amt) {
    const amount = BigInt(amt || 0);
    
    // 1. Math.max replacement for BigInt
    p.exp = (p.exp + amount < 0n) ? 0n : p.exp + amount;

    // 2. Logging
    if (amount >= 0n) {
        log(`Gained ${formatNumber(amount)} EXP.`, "lime");
    } else {
        log(`Lux, the ever immortal god, consumes your knowledge... (${formatNumber(amount)} EXP)`, "var(--sanity)");
    }

    // 3. Level-Up Logic
    // Formula: floor(100 * 1.2^(LV-1)) 
    // To do this with BigInt, we use integer math: (Base * 120 / 100)
    const getNextLevelExp = (lv) => {
        let exp = 100n;
        for (let i = 1; i < lv; i++) {
            exp = (exp * 120n) / 100n;
        }
        return exp;
    };

    let nextLevelExp = getNextLevelExp(p.lv);
    let loopCount = 0;

    while (p.exp >= nextLevelExp) {
        p.exp -= nextLevelExp;
        p.lv++;
        p.sp += 1n; // Assuming SP is BigInt

        // Gain 20% (Value * 20 / 100)
        let hpGain = (p.mhp * 20n) / 100n;
        let mpGain = (p.mmp * 20n) / 100n;
        let snGain = (p.msn * 20n) / 100n;

        // Ensure minimum 1n gain (Math.max(1, ...))
        hpGain = hpGain < 1n ? 1n : hpGain;
        mpGain = mpGain < 1n ? 1n : mpGain;
        snGain = snGain < 1n ? 1n : snGain;

        p.mhp += hpGain;
        p.mmp += mpGain;
        p.msn += snGain;

        // Full Refill
        p.hp = p.mhp;
        p.mp = p.mmp;
        p.sn = p.msn;
        
        log(`LEVEL UP! Reached LV ${p.lv}. Stats increased! (+${formatNumber(hpGain)} Max HP, +${formatNumber(mpGain)} Max Mana, +${formatNumber(snGain)} Max Sanity)`, "var(--unlocked)");
        
        if (Math.random() < 0.05) {
            log(`Lux: Oh hey. Another LV. You do know what LV stands for... right? Just so you know, my LV is beyond mortal limits.`,"#3c23a8");
        }

        nextLevelExp = getNextLevelExp(p.lv);

        loopCount++;
        if (loopCount > 1000) {
            log("WARNING:: Experience surge stabilized at current level.", "var(--gold)");
            break;
        }
    }

    updateUI();
    if (!document.getElementById('tree-view').classList.contains('hidden')) {
        renderTree(); 
    }
}

function win() {
    // formatNumber handles the BigInts for the log
    log(`Victory! Looted ${formatNumber(enemy.gold)}g and ${formatNumber(enemy.exp)} EXP.`, "var(--unlocked)");
    
    if (Math.random() < 0.05) {
        log(`Lux: Congratulations. Yet another soul you've removed off my realm. Thanks for doing my job for me =)`,"#3c23a8");
    }
    
    // 1. Math.max replacement for Gold
    // Ensure enemy.gold is treated as BigInt
    let goldGained = BigInt(enemy.gold || 0);
    p.gold = (p.gold + goldGained < 0n) ? 0n : p.gold + goldGained;
    
    // 2. addExperience already handles the BigInt conversion in the fixed version
    addExperience(enemy.exp); 
    
    // 3. Increment kills (use 1n if p.kills is BigInt)
    p.kills = BigInt(p.kills || 0) + 1n;
    
    enemy = null;
    exitEvent();
    updateUI();
    checkLuxKillLogs();
}

    function exitEvent() {
        document.getElementById('shop-view').classList.add('hidden');
        document.getElementById('tree-view').classList.add('hidden');
        document.getElementById('combat-view').classList.add('hidden');
        document.getElementById('main-controls').classList.remove('hidden');
        updateUI();
    }
/* ADMIN FUNCTIONS */
function toggleAdmin() {
    document.getElementById('debugging-panel').classList.toggle('hidden');
}

function adminRefill(t) {
    // This is safe because it just copies one BigInt (mhp) to another (hp)
    if(t === 'hp') p.hp = p.mhp; 
    if(t === 'mp') p.mp = p.mmp; 
    if(t === 'sn') p.sn = p.msn;
    log(`Admin: Refilled ${t.toUpperCase()}`, "var(--mana)"); 
    updateUI();
}

function adminSet(s) {
    // 1. Use BigInt() constructor instead of parseInt()
    let input = prompt(`New ${s.toUpperCase()}:`, p[s]);
    if (input === null) return; // Handle 'Cancel'

    try {
        let v = BigInt(input);
        p[s] = v;

        // 2. Handle the "Current <= Max" logic without Math.min
        if (s.startsWith('m')) {
            let currentKey = s.substring(1); // e.g., 'mhp' -> 'hp'
            // If current value is greater than the new max, cap it
            if (p[currentKey] > v) {
                p[currentKey] = v;
            }
        }
        
        updateUI();
        log(`Admin: Set ${s.toUpperCase()} to ${formatNumber(v)}`, "var(--gold)");
    } catch (err) {
        // BigInt() throws an error if the string isn't a valid integer
        log("Admin Error: Invalid BigInt value entered.", "#ff4757");
    }
}
// Helper to download as file (you already have this; keeping for completeness)
function download(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });  // Changed to text/plain for compatibility
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Fixed export with ciphering
function exportSave() {
    const payload = { v: SAVE_VERSION, data: p };
    const payloadStr = JSON.stringify(payload);
    
    const wrapped = JSON.stringify({
        payload: payload,  // Note: this was 'payload' (object), not 'payloadStr' (string) in your original
        checksum: checksum(payloadStr)
    });
    
    const encoded = btoa(xorCipher(wrapped, SAVE_KEY));
    
    // Random filename with Lux taunt
    let filename = 'luxs_rpg_save.urpg';
    let tauntColor = '#3c23a8';
    if (Math.random() < 0.05) {
        filename = 'luxs_world_not_yours.urpg';
        log(`Lux: This world was never yours to keep.`, tauntColor);
    } else {
        log(`Lux: You may have escaped this timeline, but I exist in each one.`, tauntColor);
    }
    
    download(encoded, filename);
    log('Save file exported', 'var(--gold)');
}


function exportSave() {
    // 1. We need a replacer function because JSON.stringify crashes on BigInt
    // It converts BigInts to strings (e.g., 100n -> "100")
    const bigIntReplacer = (key, value) => 
        typeof value === 'bigint' ? value.toString() : value;

    const payload = { v: SAVE_VERSION, data: p };
    
    // Use the replacer here
    const payloadStr = JSON.stringify(payload, bigIntReplacer);
    
    const wrapped = JSON.stringify({
        payload: payload,
        checksum: checksum(payloadStr)
    }, bigIntReplacer); // And here
    
    const encoded = btoa(xorCipher(wrapped, SAVE_KEY));
    const taggedSave = `NEURAL SEGMENT::DO NOT EDIT::${encoded}::NEURAL SEGMENT END`;
    
    let filename = 'luxs_rpg_save.urpg';
    if (Math.random() < 0.05) {
        filename = 'luxs_world_not_yours.urpg';
        log(`Lux: This world was never yours to keep.`, '#3c23a8');
    } else {
        log(`Lux: You may have escaped this timeline, but I exist in each one.`, '#3c23a8');
    }
    
    download(taggedSave, filename);
    log('Save file exported', 'var(--gold)');
}

// 1. Updated File Handler (Clears the input so it works twice)
function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        importSave(text);
        // CRITICAL: Reset the input value so selecting the same file again triggers this function
        event.target.value = ''; 
    };
    reader.readAsText(file);
}

// 2. Updated Import Save (Handles the tags correctly)
function importSave(saveText) {
    try {
        const regex = /NEURAL\s+SEGMENT::DO\s+NOT\s+EDIT::\s*([\s\S]*?)\s*::NEURAL\s+SEGMENT\s+END/;
        const match = saveText.match(regex);

        if (!match || !match[1]) {
            log("Error: File is missing neural tags.", "#ff4757");
            return;
        }

        const encodedData = match[1].trim().replace(/\s/g, '');
        const decoded = xorCipher(atob(encodedData), SAVE_KEY);
        const parsed = JSON.parse(decoded);

        const saveVersion = parsed.payload.v;
        if (!saveVersion || saveVersion < SAVE_VERSION) {
            log("Error: Invalid or legacy save version.", "#ff4757");
            return;
        }

        // Work on a temp object first
        let loadedPlayer = parsed.payload.data;

        const bigIntStats = [
            'hp', 'mhp', 'mp', 'mmp', 'sn', 'msn',
            'gold', 'exp', 'lv', 'sp', 'kills', 'dmgmult', 'sparedenemies'
        ];

        bigIntStats.forEach(stat => {
            if (loadedPlayer[stat] !== undefined) {
                loadedPlayer[stat] = BigInt(loadedPlayer[stat]);
            }
        });

        // Only now update global state
        p = loadedPlayer;

        // Reset and reapply skill tree
        for (let id in skillTree) {
            skillTree[id].unlocked = false;
        }

        p.skills.forEach(id => {
            if (skillTree[id]) skillTree[id].unlocked = true;
        });

        updateUI();
        renderTree();
        log(`Success! Welcome back to Day ${p.day}, LV ${p.lv}.`, "var(--unlocked)");

    } catch (err) {
        console.error("Full Import Error:", err);
        log("Error: Could not read file. Check console for details.", "#ff4757");
    }
}

