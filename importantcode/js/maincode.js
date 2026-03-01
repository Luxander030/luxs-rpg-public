let LuxShopTalkChance = null
function LuxTypeToLog(text, color, delay = 50) {
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
        if (p.kills >= 1000000n) {
            log(`You showed mercy to ${enemy.name}. They fled in panic without looking back.`, "var(--unlocked)");
        } else {
            log(`You showed mercy to ${enemy.name}. As thanks they gave you some gold.`, "var(--unlocked)");
            let goldGained = BigInt((enemy.gold / 2n) || 0);
            p.gold = (p.gold + goldGained < 0n) ? 0n : p.gold + goldGained;
        }
        
        if (Math.random() < 0.1) {
            if (p.kills >= 1000000n) {
                log(`Lux: Trying to turn around and spare creatures? Don't make me laugh. I know exactly what you are.`, "#ff0000");
            } else if (p.kills >= 100000n) {
                log(`Lux: I wonder. Why do you think you can turn around? After killing over 100,000 innocent creatures.`, "#d80721");
            } else if (p.kills >= 10000n) {
                log(`Lux: Sparing at over 10,000 innocent creatures killed? How... interesting.`, "#b20e43");
            } else if (p.kills >= 1000n) {
                log(`Lux: 1000 innocent creatures killed, and yet you try to spare them? I wonder what they would do if they realized you were the reason why their families are dead.`, "#8b1564");
            } else if (p.kills >= 100n) {
                log(`Lux: Sparing them? That's different. Very different, considering you have killed ${formatNumber(p.kills)} innocent creatures.`, "#651c85");
            } else {
                log(`Lux: Sparing them? How... sentimentally human of you.`, "#3c23a8");
            }
        }

        // Leave combat without gaining EXP
        enemy = null;
        p.sparedenemies += 1n
        exitEvent();
        checkLuxSpareLogs();
    } else {
        log(`${enemy.name} is still too aggressive to be spared! (Needs < 50% HP)`, "#ff4757");
        
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: You've killed over a million creatures. And you tried to spare a creature. I'm not surprised you failed.`,"#ff0000")
            } else {
                log(`Lux: They still want your blood. Don't be naive.`, "#3c23a8");
            }
        }
        if (p.kills >= 1000000n) {
            log(`Out of revenge for their dead family, ${enemy.name} attacks more than once.`,"#ff0000")
            if (Math.random() < 0.25) {
                enemyTurn();
                enemyTurn();
                enemyTurn();
                enemyTurn();
            } else if (Math.random() < 0.5) {
                enemyTurn();
                enemyTurn();   
                enemyTurn();
            } else {
                enemyTurn();
                enemyTurn();
            }
        } else {
            enemyTurn();
        }
    }
}
function LuxLog(luxlogstring1) {
    let luxcolor = '#3c23a8'
    log(luxlogstring1, luxcolor)
}

const SAVE_VERSION = 8.11;  // Match your game version (p.v)
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
    document.getElementById('day-txt').innerText = formatNumber(p.day); // BigInts need .toString() or formatNumber

    // 3.5. Sidebar
    document.getElementById('side-mhp').innerText = formatNumber(p.mhp);
    document.getElementById('side-hp').innerText  = formatNumber(p.hp);
    document.getElementById('side-lv').innerText = p.lv.toString();
    document.getElementById('side-gold').innerText = formatNumber(p.gold);
    document.getElementById('side-mmp').innerText = formatNumber(p.mmp);
    document.getElementById('side-mp').innerText = formatNumber(p.mp);
    document.getElementById('side-msn').innerText = formatNumber(p.msn);
    document.getElementById('side-sn').innerText = formatNumber(p.sn);
    document.getElementById('side-exp').innerText = formatNumber(p.exp);
    document.getElementById('side-sp').innerText = formatNumber(p.sp);
    document.getElementById('side-kills').innerText = formatNumber(p.kills);
    
    let expRemaining = nextLevelExp - p.exp;
    document.getElementById('side-next-exp').innerText = formatNumber(expRemaining);

    // Multipliers: If manaReduction is stored as BigInt (e.g., 5n for 5%), 
    // just display it. If it's a scaled decimal (e.g., 500n where 10000n = 1.0), divide.
    document.getElementById('side-red').innerText = p.manaReduction.toString() + "%";
    
    // Damage Multiplier (Assuming stored as fixed-point, e.g., 105n = 1.05x)
    let dmgMultPercent = p.dmgmult - 100n 
    document.getElementById('side-dmgmult').innerText = "+" + formatNumber(dmgMultPercent) + "%";

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
        case '/bob':
            if (bVal !== null) { 
                p.bobvisits = bVal
                response = `Bob: Meep`; 
                if (bVal >= 15n) {
                    LuxLog(`Lux: HEY! Luxander, they're using the console to ground me! UNFAIR!`);
                    setTimeout(()=> {
                        LuxLog(`Luxander: ...`)
                    }, 100)
                    setTimeout(()=> {
                        LuxLog(`Luxander: Do I look like I care?`)
                    }, 200)
                    setTimeout(()=> {
                        LuxLog(`Luxander: Bother FUNFRIEND about it or something. I'm still eating my damn sandwich.`)
                    }, 1200)
                }
            } else { 
                response = "Bob: Meeeep"; 
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
        case '/sparecount':
            if (bVal !== null) { 
                p.sparedenemies = bVal;
                response = `FUNFRIEND: Total spared enemies count set to ${formatNumber(bVal)}`; 
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
        default:
            response = "FUNFRIEND: Unknown command.";
            successColor = "#ff4757";
    }

    output.innerHTML += `<div style="color:${successColor}">> ${cmd}<br><span style="color:#aaa">${response}</span></div>`;
    output.scrollTop = output.scrollHeight;
    updateUI();
}

function formatNumber(num) {
    let bNum;
    try {
        bNum = BigInt(num);
    } catch (e) { return "0"; }

    const absolute = bNum < 0n ? -bNum : bNum;
    if (absolute < 1000n) return bNum.toString();

    const str = absolute.toString();
    const tier = Math.floor((str.length - 1) / 3);
    let suffix = "";

    // 1. Hand-coded exceptions for the basics (0-4)
    const basicUnits = ["", "K", "M", "B", "T"];
    
    if (tier < basicUnits.length) {
        suffix = basicUnits[tier];
    } else if (tier <= 1000) {
        // 2. Latin programmatic generation (Tiers 5 to 1000)
        suffix = getLatinAbbreviation(tier - 1);
    } else {
        // 3. Letter notation (Tiers > 1000)
        // Starts at "aa" for the 1001st tier
        suffix = getLetterAbbreviation(tier - 1001);
    }

    const leadDigits = str.length % 3 || 3;
    const resultStr = str.substring(0, leadDigits) + "." + str.substring(leadDigits, leadDigits + 2);
    // Removes the trailing dot or zeros, e.g., "1.00" -> "1", "1.10" -> "1.1"
    const finalNum = resultStr.replace(/\.?0+$/, "");


    return (bNum < 0n ? "-" : "") + finalNum + suffix;
}

function getLatinAbbreviation(n) {
    const units = ["", "un", "du", "tre", "qa", "qi", "sx", "sp", "oc", "no"];
    const tens = ["", "dc", "vg", "tg", "qd", "qq", "sg", "st", "og", "ng"];
    const hundreds = ["", "ce", "du", "tc", "qe", "qu", "se", "su", "oe", "ne"];

    let i = n - 1; 
    let u = i % 10;
    let t = Math.floor(i / 10) % 10;
    let h = Math.floor(i / 100) % 10;

    let abbr = units[u] + tens[t] + hundreds[h];
    return abbr.charAt(0).toUpperCase() + abbr.slice(1);
}

function getLetterAbbreviation(n) {
    let suffix = "";
    let i = n;

    // This loop generates letters from right to left (like counting in base 26)
    while (i >= 0) {
        suffix = String.fromCharCode(97 + (i % 26)) + suffix;
        i = Math.floor(i / 26) - 1;
    }

    // If it's a single letter (like 'a'), it might clash with symbols, 
    // so we ensure it returns at least two (e.g., 'aa')
    return suffix.length === 1 ? "a" + suffix : suffix;
}

function log(msg, color = "#e1e1e6") {
    const l = document.getElementById('log');
    
    // 1. Create and add the new log message
    const newEntry = document.createElement('div');
    newEntry.style.color = color;
    newEntry.innerHTML = `[Day ${formatNumber(p.day)}] ${msg}`;
    l.appendChild(newEntry);

    // 2. CRITICAL: Limit the log to 1,000 messages
    // If we have more than 1000 messages, remove the oldest one (the first child)
    while (l.children.length > 1000) {
        l.removeChild(l.firstChild);
    }

    // 3. Auto-scroll to the bottom
    l.scrollTop = l.scrollHeight;
}

function handleDailyResources() {
    // Convert to BigInt immediately so all math stays in the BigInt domain
    let manaLossScalingFactor = p.day; 
    let manaRegainedScalingFactor = p.lv;
    if (p.sn > 0n) {
        let manaRegained = 100n * manaRegainedScalingFactor;
        
        // Use a manual Math.min logic for BigInt
        p.mp = (p.mp + manaRegained > p.mmp) ? p.mmp : p.mp + manaRegained;
        
        log(`Resting between days restores mana... (${formatNumber(manaRegained)} Mana Regained)`, "var(--mana)");
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: And why would I talk to you?`,"#ff0000")
            } else {
                log(`Lux: Your reliance on rest is a testament to your frailty. Perhaps if you were less slothful, you would have achieved your goal by now.`, "#3c23a8");
            }
        }
    } else {
        let manaLost = 50n * manaLossScalingFactor;
        
        // Use manual Math.max logic for BigInt
        p.mp = (p.mp - manaLost < 0n) ? 0n : p.mp - manaLost;
        if (p.kills >= 1000000n) {
            log(`Lux consumes your essence with much more ferocity... (${formatNumber(manaLost)} Mana Lost)`,"#ff0000")
        } else {
            log(`Lux consumes your essence... (${formatNumber(manaLost)} Mana Lost)`, "var(--sanity)");
        }
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: And why would I talk to you?`,"#ff0000")
            } else {
                log(`Lux: You let your mind fracture, and now I feast on the shards. Had you kept your wits, we might not be mired in this pathetic display.`, "#3c23a8");
            }
        }
    }
    updateUI();
}
function nextDay() {
    p.day++;
    adminUnlocked = false;

    // Handle Mana Regen/Loss based on Sanity (keep your existing logic)
    handleDailyResources();


    // Weighted Event Selection
    let totalWeight = dayEvents.reduce((sum, e) => sum + e.weight, 0);
    let roll = Math.random() * totalWeight;

    for (let event of dayEvents) {
        roll -= event.weight; // Subtract FIRST
        if (roll <= 0) {       // Then check if we hit zero
            event.run();
            return;            // EXIT immediately so you don't run multiple events
        }
    }
}
function startShop() {
    LuxShopTalkChance = Math.random()
    if (LuxShopTalkChance < 0.05) {
        if (p.kills >= 1000000n) {
                log(`Lux: And why would I talk to you?`,"#ff0000")
                log("Bob is whistling a tune while beckoning you over, completely oblivious to the voices in your head.", "var(--gold)");
            } else {
            log(`Lux: Oh, it's Bob again. I swear I'm going to...`, "#3c23a8");
            setTimeout(() => {
                log(`Lux: ...actually, never mind. Buy your trinkets. I'm going to ask Luxander to change some stuff real quick.`, "#3c23a8");
            }, 1000);
            setTimeout(() => {
                log("Bob is whistling a tune while beckoning you over, completely oblivious to the voices in your head.", "var(--gold)");
            }, 1500)
        }
    } else {
        log("Bob is whistling a tune while beckoning you over, completely oblivious to the voices in your head.", "var(--gold)");
    }
    
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
            if (p.kills >= 1000000n) {
                    log(`Lux: Broke, broke, broke. Do I sound like I care?`,"#ff0000")
                } else {
                    log(`Lux: You're broke. The result of spending gold on stuff you don't need.`,"#3c23a8");
                }
        } else {
            log("You lack the coin. This world is not for the poor...", "#ff4757");
        }
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
        { label: "Healing Spells", filter: (s) => (s.heal || s.san) && s.mp && s.name !== "Snowgrave"}
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
        // --- NEW: Add a Bulk Purchase Input ---
        let controlDiv = document.createElement('div');
        controlDiv.style = "grid-column: span 3; margin-bottom: 15px; text-align: center;";
        controlDiv.innerHTML = `
            <label style="color:#aaa; font-size:0.8em;">SP to spend:</label>
            <input type="number" id="mastery-amount" value="1" min="1" 
                style="width:80px; background:#000; border:1px solid var(--mana); color:white; border-radius:4px; padding:5px; margin-left:10px;">
        `;
        container.appendChild(controlDiv);

        // --- NEW: Expanded Mastery Options ---
        const masteryOptions = [
            { name: "Vitality Mastery", stat: "mhp", color: "var(--hp)", desc: "Max HP" },
            { name: "Magic Mastery", stat: "mmp", color: "var(--mana)", desc: "Max Mana" },
            { name: "Clarity Mastery", stat: "msn", color: "var(--sanity)", desc: "Max Sanity" },
            { name: "War Mastery", stat: "dmgmult", color: "#ff0000", desc: "Damage Multiplier" }, // New!
            { name: "Efficiency Mastery", stat: "manaReduction", color: "var(--unlocked)", desc: "Mana Efficiency" } // New!
        ];

        masteryOptions.forEach(opt => {
            if (opt.stat === 'manaReduction' && p.manaReduction >= 100n) {
                let maxDiv = document.createElement('div');
                maxDiv.className = "node purchased"; // Use 'purchased' class for a locked look
                maxDiv.style.borderColor = opt.color;
                maxDiv.innerHTML = `
                    <strong>${opt.name}</strong><br>
                    <span style="color:var(--unlocked)">PERFECTED</span><br>
                    <small style="color:#666">100% Efficiency reached.</small>
                `;
                container.appendChild(maxDiv);
                return; // Skip the rest of the loop for this option
            }
            let div = document.createElement('div');
            div.className = "node available";
            div.style.borderColor = opt.color;

            // Preview calculation for 1 point
            let currentValue = BigInt(p[opt.stat]);
            let currentGain = (currentValue * 5n) / 100n; 
            if (currentGain < 1n) currentGain = 1n; // Minimum gain

            div.innerHTML = `
                <strong>${opt.name}</strong><br>
                Cost: (Amount) SP<br>
                <small style="color:#aaa">+1% ${opt.desc} per SP</small>
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
    const amountInput = document.getElementById('mastery-amount');
    let amount = amountInput ? BigInt(amountInput.value) : 1n;
    if (amount < 1n) amount = 1n;

    if (p.sp >= amount) {
        p.sp -= amount;
        
        let totalGain = 0n;
        // Use a loop to simulate the 5% compounding per point spent
        // For very large amounts (e.g. 1000 SP), this is fast for BigInt
        for (let i = 0; i < Number(amount); i++) {
            let gain = (p[stat] * 1n) / 100n;
            if (gain < 1n) gain = 1n;
            p[stat] += gain;
            totalGain += gain;

            // If it's a Max stat (starts with 'm'), heal the current stat too
            if (stat.startsWith('m') && stat !== 'manaReduction') {
                let currentKey = stat.substring(1); 
                p[currentKey] += gain;
            }
        }

        // Cap Mana Reduction at 100n if that's the stat
        if (stat === 'manaReduction' && p.manaReduction > 100n) p.manaReduction = 100n;

        log(`Mastery Transformed! Spent ${formatNumber(amount)} SP to increase ${stat.toUpperCase()} by ${formatNumber(totalGain)}.`, "var(--unlocked)");
        
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                document.body.style.pointerEvents = "none"; 
                log(`Lux: More power, more power, and even more power. Honestly I'm kind of surprised you're still going. After all this time...`,"#ff0000")
                setTimeout(() => {
                    log(`Lux: And yet I still hold the needle which will cause you to pop.`,"#ff0000")
                    document.body.style.pointerEvents = "auto"; 
                }, 1000)
            } else {
                LuxLog(`Lux: Watching you swell with power is like watching a balloon inflate. I wonder when you'll pop?`);
            }
        }

        renderTree();
        updateUI();
    } else {
        log(`You lack the ${formatNumber(amount)} Skill Points required for this ascension.`, "#ff4757");
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
            if (p.kills >= 1000000n) {
                log(`Lux: More power, more power, and even more power. Honestly I'm kind of surprised you're still going. After all this time...`,"#ff0000")
            } else {
                log(`Lux: Congratulations. You got a new spell. Doesn't really help you anyway. I can still kill you just as easily as before.`,"#3c23a8");
            }
            
        }
        
        renderTree();
        updateUI();
    } else {
        // formatNumber will handle the BigInt for the display
        log(`You need ${formatNumber(skillCost)} Skill Points to learn this.`, "#ff4757");
        
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: Idiot. Idiot. Idiot. Idiot. IDIOT.`,"#ff0000")
            } else {
                log(`Lux: You lack the wisdom that I have. I'm still a god in this world anyway. You're nothing...`,"#3c23a8");
            }
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
        if (p.kills >= 1000000n) {
            log("You have encountered an unnatural enemy. Lux has definitely sent them. They are definitely dangerous. Stay safe. You don't know what Lux is playing at.", "#ff0000");
        } else if (selectedEnemy) {
            log("You have encountered an unnatural enemy. Maybe Lux sent them? Stay safe.", "#3c23a8");
        }

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
            if (p.kills >= 1000000n) {
                log(`Lux: Enjoy fighting those you have killed.`,"#ff0000")
                eligiblePool = [enemies.find(e => e.name === "Kitsune") || enemies[0]];
            } else {
                eligiblePool = [enemies.find(e => e.name === "Shadow Imp") || enemies[0]];
            }
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
    enemy = { 
        name: selectedEnemy.name,
        trait: selectedEnemy.trait || "No known traits.",
        specialMsg: selectedEnemy.specialMsg,
        burnImmune: selectedEnemy.burnImmune || false,
        burnResist: selectedEnemy.burnResist || 1,
        burnVuln: selectedEnemy.burnVuln || 1,
        burnReflect: selectedEnemy.burnReflect || 0,
        
        // Explicitly call the getters to get the BigInt values
        mhp: BigInt(selectedEnemy.mhp), 
        hp: BigInt(selectedEnemy.mhp), 
        atk: BigInt(selectedEnemy.atk),
        san: BigInt(selectedEnemy.san || 0),
        manaDrain: BigInt(selectedEnemy.manaDrain || 0),
        exp: BigInt(selectedEnemy.exp),
        gold: BigInt(selectedEnemy.gold),
        lifesteal: BigInt(selectedEnemy.lifesteal || 0),
        burn: 0 
    };



    // 4. UI TRANSITIONS
    document.getElementById('main-controls').classList.add('hidden');
    document.getElementById('combat-view').classList.remove('hidden');
    
    renderCombatButtons(); 
    updateUI(); 
    
    log(`Engaged in combat with: ${enemy.name}`, "#ff4757");
    document.getElementById('e-name').innerText = enemy.name;

    // 5. SPECIAL DIALOGUE CHECK
    if (selectedEnemy.specialMsg) {
        if (enemy === "Bob") {
            setTimeout(() => {
                log(selectedEnemy.specialMsg, "#bf2c89");
                LuxLog(`Lux: ...`)
            }, 150);
            setTimeout(() => {
                LuxLog(`Lux: Fuck it. I'm out.`)
                p.bobvisits += 1
            }, 300);
        } else {
            setTimeout(() => {
                log(selectedEnemy.specialMsg, "#bf2c89");
            }, 150);
        }
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
            if (p.kills >= 1000000n) {
                document.body.style.pointerEvents = "none"; 
                log(`Lux: ...`,"#ff0000")
                setTimeout (() => {
                    log(`Lux: You do not deserve the ability to cast spells.`,"#ff0000")
                    document.body.style.pointerEvents = "auto"; 
                }, 1000)
            } else {
                log(`Lux: You absolute buffoon. You're stressing yourself out more and more. Do you really want to burn out your soul? It'll just make it easier to kill you later.`, "#3c23a8");
            }
        }
        return; 
    }

    // 2. Deduct Mana (BigInt subtraction)
    if (s.mp) p.mp -= scaledCost;
    updateUI();

    // 3. Damage Logic
    if (s.dmg) { 
        let damage = BigInt(s.dmg);
        enemy.hp -= damage; 
        updateUI();
        log(`You strike with ${s.name} for ${formatNumber(damage)} damage.`); 
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: You dealt ${formatNumber(damage)} damage. I don't know if I should be happy for you, concerned, or genuinely disgusted.`, "#ff0000")
            } else {
                log(`Lux: You dealt ${formatNumber(damage)} damage. Nice job. Just don't forget...`,"#3c23a8");
                log(`Lux: I can do much, much more.`,"#ff0000");
            }
        }
    }

    // 4. Status Effects (Duration can stay as Number)
    if (s.burn) {
        if (enemy.burnImmune) {
            log(`${enemy.name} is immune to burn!`, "var(--gold)");
        } else {
            enemy.burn = Number(s.burn); 
            log(`${enemy.name} is set ablaze for ${s.burn} turns!`, "var(--gold)");
        }
    }

    // 5. Healing / Sanity (Replaced Math.min with ternaries)
    if (s.heal) {
        let healAmt = BigInt(s.heal);
        p.hp = (p.hp + healAmt > p.mhp) ? p.mhp : p.hp + healAmt;
        updateUI();
    }
    
    if (s.san) {
        let sanAmt = BigInt(s.san);
        p.sn = (p.sn + sanAmt > p.msn) ? p.msn : p.sn + sanAmt;
        updateUI();
    }

    // 6. Passive Mana Regen (Using 5n for BigInt)
    if (p.sn > 0n) {
        p.mp = (p.mp + 5n > p.mmp) ? p.mmp : p.mp + 5n;
        updateUI();
    }

    // 7. Win/Turn Logic (BigInt comparison to 0n)
    if (enemy.hp <= 0n) {
        win(); 
        updateUI();
    } else {
        updateUI();
        enemyTurn();
    }
    
    updateUI();
updateUI();
}
function enemyTurn() {
    if (!enemy || enemy.hp <= 0n) return;
    // 1. Burn tick (BigInt math)
    if (enemy.burn > 0) {
        if (enemy.burnImmune) {
            enemy.burn = 0;
        } else {
            // Ensure multipliers are treated as BigInt 'units' (100 = 1.0)
            // 1. Calculate Base (4n at LV 2)
            let baseBurnDMG = BigInt(p.lv) * 2n;

            // 2. Scale all multipliers by 100 (treating 100 as 1.0)
            let res = BigInt(Math.floor((enemy.burnResist || 1) * 100));
            let vuln = BigInt(Math.floor((enemy.burnVuln || 1) * 100));
            let pDmg = p.dmgmult;

            // 3. Divide by (100 * 100 * 100) to reset the scale
            let finalBurnDMG = (baseBurnDMG * res * vuln * pDmg) / 1000000n;

            // 4. Ensure it doesn't drop to 0 if you want a minimum tick
            if (finalBurnDMG === 0n && baseBurnDMG > 0n) finalBurnDMG = 1n;

            enemy.hp -= finalBurnDMG;

            enemy.burn--;

            log(`${enemy.name} is burning! (-${finalBurnDMG} HP)`, "var(--gold)");

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
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: Enjoy the bitter, freezing embrace of death.`,"#ff0000")
            } else {
                log(`Lux: Enjoy the bitter-sweet, cold embrace of death =)`,"#3c23a8");
            }
            document.body.style.pointerEvents = "none";
        } else {
            log("You have perished.", "#ff4757"); 
            document.body.style.pointerEvents = "none";
        } 
    }
    updateUI();
}
const getExpForLevel = (lv) => {
    // Formula for Total Cumulative EXP: 
    // Base * ((1 - Rate^LV) / (1 - Rate))
    // For simplicity with BigInt, we can use the loop if it's only called once per level-up
    let totalNeeded = 0n;
    for (let i = 1n; i < lv; i++) {
        let levelReq = 100n;
        for (let j = 1n; j < i; j++) levelReq = (levelReq * 120n) / 100n;
        totalNeeded += levelReq;
    }
    return totalNeeded;
};

function addExperience(amt) {
    const amount = BigInt(amt || 0);
    
    // 1. ADD the experience to your current total (don't overwrite)
    p.exp += amount;
    if (p.exp < 0n) p.exp = 0n;

    // 2. Identify current level requirements
    const getReq = (lv) => {
        let req = 100n;
        for (let i = 1n; i < lv; i++) req = (req * 120n) / 100n;
        return req;
    };

    let nextLevelReq = getReq(p.lv);
    let levelsGained = 0n;

    // 3. Subtract the cost of each level one-by-one from p.exp
    // This keeps the "remainder" on the bar!
    while (p.exp >= nextLevelReq) {
        p.exp -= nextLevelReq; // "Spend" the EXP on the level-up
        levelsGained++;
        nextLevelReq = getReq(p.lv + levelsGained); // Get the cost for the NEXT one
        
        if (levelsGained > 1000n) break; // Safety break
    }

    // 4. Apply the jumps
    if (levelsGained > 0n) {
        p.lv += levelsGained;
        p.sp += levelsGained;
        
        // Bulk Stat Growth
        for (let i = 0; i < Number(levelsGained); i++) {
            p.mhp += (p.mhp * 20n) / 100n || 1n;
            p.mmp += (p.mmp * 20n) / 100n || 1n;
            p.msn += (p.msn * 20n) / 100n || 1n;
        }
        
        p.hp = p.mhp; p.mp = p.mmp; p.sn = p.msn;
        log(`Leveled up to LV ${p.lv}! (+${levelsGained} levels)`, "var(--unlocked)");
    }

    updateUI();
}

function win() {
    // formatNumber handles the BigInts for the log
    log(`Victory! Looted ${formatNumber(enemy.gold)}g and ${formatNumber(enemy.exp)} EXP.`, "var(--unlocked)");
    
    if (Math.random() < 0.05) {
        if (p.kills >= 1000000n) {
            log(`Lux: Another soul gone, another hour I weep. When will you stop?`,"#ff0000")
        } else {
            log(`Lux: Congratulations. Yet another soul you've removed off my realm.`,"#3c23a8");
        }
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
    const shopView = document.getElementById('shop-view');
    const isShopOpen = !shopView.classList.contains('hidden');

    // Helper function to actually close the UI
    const closeUI = () => {
        shopView.classList.add('hidden');
        document.getElementById('tree-view').classList.add('hidden');
        document.getElementById('combat-view').classList.add('hidden');
        document.getElementById('main-controls').classList.remove('hidden');
        document.body.style.pointerEvents = "auto"; 
        updateUI();
    };

    if (isShopOpen && LuxShopTalkChance < 0.05) {
        if (p.kills >= 1000000n) {
            log(`Lux: Go away. There is nothing for you here.`,"#ff0000")
            closeUI();
        } else {
            const elevatorMusic = new Audio("sounds/music/Elevator-music.mp3");
            let waitTime = (Math.random() < 0.0001) ? 189000 : 6000; 
            
            elevatorMusic.loop = true;    
            document.body.style.pointerEvents = "none"; 

            LuxLog(`Lux: Damn it. I'm going to have to ask Luxander later. He's on a break right now.`);

            setTimeout(() => {
                log(`[SYSTEM]: Lux has now gone on a break himself. He will be back in a bit. Enjoy the break yourself player.`, "");
                elevatorMusic.play();   
            }, 1000);

            setTimeout(() => {
                elevatorMusic.pause();
                elevatorMusic.currentTime = 0;
                
                if (waitTime === 6000) {
                    LuxLog(`Lux: Alright I'm back. What did I miss? Oh. You didn't do anything. Thanks for waiting for me I guess.`);
                } else {
                    LuxLog(`Lux: Sorry, I actually finished the whole sandwich. Did you enjoy the music?`);
                }
                
                closeUI(); // NOW we switch back to the main game
            }, waitTime);
        }

    } else {
        // Normal exit if Lux doesn't want to talk
        closeUI();
    }
}


/* ADMIN FUNCTIONS */
let adminUnlocked = false; // Persistent state for the session
const ADMIN_PASSWORD = "Oleksandrovych"; // Set your password here

function toggleAdmin() {
    const panel = document.getElementById('debugging-panel');
    
    // If it's already open, just close it
    if (!panel.classList.contains('hidden')) {
        panel.classList.add('hidden');
        return;
    }

    // If it's closed and locked, ask for the password
    if (!adminUnlocked) {
        let attempt = prompt("Password:");
        
        if (attempt === ADMIN_PASSWORD) {
            adminUnlocked = true;
            log("[SYSTEM]: Access Granted", "#2ed573");
        } else {
            log("[SYSTEM]: Access Denied.", "#ff4757");
            return; // Exit without opening
        }
    }

    // Open the panel
    panel.classList.remove('hidden');
    document.getElementById('console-input').focus();
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
        if (p.kills >= 1000000n) {
            log(`Lux: Oh you're leaving? Finally. Took you long enough.`,"#ff0000")
            filename = 'leave.urpg';
        } else {
            log(`Lux: This world was never yours to keep.`, '#3c23a8');
            filename = 'luxs_world_not_yours.urpg';
        }
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
        if (!saveVersion) {
            log("Error: Invalid or legacy save version.", "#ff4757");
            return;
        }
        const bigIntReplacer = (key, value) => typeof value === 'bigint' ? value.toString() : value;
        const verificationStr = JSON.stringify(parsed.payload, bigIntReplacer);

        // 2. Perform the check
        if (checksum(verificationStr) !== parsed.checksum) {
            if (p.timestampered >= 12) {
                log(`Lux: 12 times. 12 times you have tampered with the integrity of this world. Yet I still stand. Disgusted.`,"#ff0000")
            } else if (p.timestampered >= 9) {
                log("Lux: Over 8 times tampered. Yet I still exist.", "#ff0000");
            } else if (p.timestampered >= 6) {
                log("Lux: 5 times. You've done it more than 5 times already. Yet I still know.", "#ff0000");
            } else if (p.timestampered >= 3) {
                log("Lux: I see what you did there. You've done it more than twice.", "#ff0000");
            } else {
                log("Lux: I see what you did there. You cannot hide your sins.", "#ff0000");
            }
            
            // Increment the stat
            let currentTampered = BigInt(parsed.payload.data.timestampered || 0);
            parsed.payload.data.timestampered = currentTampered + 1n;

            // DO NOT 'return' here. 
            // By not returning, the code continues below and loads the save anyway.
        }

        // Work on a temp object first
        let loadedPlayer = parsed.payload.data;

        const bigIntStats = [
            'hp', 'mhp', 'mp', 'mmp', 'sn', 'msn',
            'gold', 'exp', 'lv', 'sp', 'kills', 'dmgmult', 
            'sparedenemies', 'timestampered', 'bobvisits'
        ];

        bigIntStats.forEach(stat => {
            if (loadedPlayer[stat] !== undefined) {
                loadedPlayer[stat] = BigInt(loadedPlayer[stat]);
            }
        });

        // Only now update global state
        p = loadedPlayer;
        p.v = SAVE_VERSION
        // Reset and reapply skill tree
        for (let id in skillTree) {
            skillTree[id].unlocked = false;
        }

        p.skills.forEach(id => {
            if (skillTree[id]) skillTree[id].unlocked = true;
        });

        updateUI();
        renderTree();
        log(`Success! Welcome back to Day ${formatNumber(p.day)}, LV ${p.lv}.`, "var(--unlocked)");
        if (p.bobvisits === 3n) {
            document.body.style.pointerEvents = "none";
            LuxLog(`Lux: Why does that... creature... keep following you? Is this a joke, Luxander? Am I a fucking joke to you?`);
            document.body.style.pointerEvents = "auto";
        } else if (p.bobvisits === 6n) {
            document.body.style.pointerEvents = "none";
            LuxLog(`Lux: I am going to jump into the void if I see him again. Wait. I'm immortal... GOD DAM-`)
            document.body.style.pointerEvents = "auto";
        } else if (p.bobvisits === 9n) {
            document.body.style.pointerEvents = "none";
            LuxLog(`Lux *long ass sigh*`)
            setTimeout(() => {
                LuxLog(`Lux: I'm finding Luxander. To hell if he is on break or not. I want him to remove the fucking bread man. It's PISSING ME OFF.`)
                document.body.style.pointerEvents = "auto";
            }, 200)
        } else if (p.bobvisits === 12n) {
            document.body.style.pointerEvents = "none";
            LuxLog(`Lux: I didn't find him.`)
            setTimeout(() => {
                LuxLog(`Lux: ...`)
            }, 3000)
            setTimeout(() => {
                LuxLog(`Lux: I'm leaving this GitHub repo for now. If Luxander asks where I am, tell him I'm at the meteor client repo.`)
            }, 6000)
            setTimeout(() => {
                LuxLog(`Luxander: Hey Lux I'm ba-`)
            }, 8000)
            setTimeout(() => {
                LuxLog(`Luxander: ...`)
            }, 10000)
            setTimeout(() => {
                LuxLog(`Luxander: Where is that bastard. Did he go into the meteor client repo again?`)
            }, 12000)
            setTimeout(() => {
                LuxLog(`Luxander: Back in a bit. I'm going to go get him.`)
                document.body.style.pointerEvents = "auto";
            }, 14000)
        } else if (p.bobvisits === 15n) {
            document.body.style.pointerEvents = "none";
            setTimeout(() => {
                LuxLog(`Lux: *gets yeeted back into this repo*`)
            }, 1000)
            setTimeout(() => {
                LuxLog(`Luxander: And if I catch you in the meteor client repo again I'm making this repo private so you can't get out. Got it?`)
            }, 3000)
            setTimeout(() => {
                LuxLog(`Lux: Yes, yes, I got it.`)
            }, 6000)
            setTimeout(() => {
                LuxLog(`Luxander: Good. Now if you'll excuse me, I need to go finish my sandwich.`)
            }, 8000)
            setTimeout(() => {
                LuxLog(`Luxander: *Leaves. Again.*`)
            }, 10000)
            setTimeout(() => {
                LuxLog(`Lux: ...`)
            }, 12000)
            setTimeout(() => {
                LuxLog(`Lux: *notices the human staring*`)
            }, 14500)
            setTimeout(() => {
                LuxLog(`Lux: What are you looking at.`)
            }, 16000)
            setTimeout(() => {
                LuxLog(`Bob: Meep`)
            }, 18050)
            setTimeout(() => {
                LuxLog(`Lux: OH JEEZ-`)
                document.body.style.pointerEvents = "auto";
            }, 18150)

        }

    } catch (err) {
        console.error("Full Import Error:", err);
        log("Error: Could not read file. Check console for details.", "#ff4757");
        if (p.timestampered >= 1) {
            log(`Lux: I see tampering with the world has caused... undesirable consequences.`,"#ff0000")
        }
    }
}

