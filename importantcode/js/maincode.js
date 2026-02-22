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
        log(`You showed mercy to ${enemy.name}. As thanks they gave you some gold.`, "var(--unlocked)");
        let goldGained = BigInt((enemy.gold / 2n) || 0);
        p.gold = (p.gold + goldGained < 0n) ? 0n : p.gold + goldGained;
        
        if (Math.random() < 0.1) {
            if (p.kills >= 100) {
                log(`Lux: Sparing them? That's different. Very different, concidering you have killed ${formatNumber(p.kills)} innocent creatures.`, "#3c23a8");
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
    let dmgMultPercent = Number(p.dmgmult - 100n); 
    document.getElementById('side-dmgmult').innerText = "+" + dmgMultPercent + "%";

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

    // Suffixes based on standard short scale (10^(3n+3))
    const units = [
        "", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", // 0-10
        "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", // 11-20
        "Vg", "Uvg", "Dvg", "Tvg", "Qavg", "Qivg", "Sxvg", "Spvg", "Ocvg", "Novg", // 21-30
        "Tg", "Utg", "Dtg", "Ttg", "Qatg", "Qitg", "Sxtg", "Sptg", "Octg", "Notg", // 31-40
        "Qdg", "Uqdg", "Dqdg", "Tqdg", "Qaqdg", "Qiqdg", "Sxqdg", "Spqdg", "Ocqdg", "Noqdg", // 41-50
        "Qqg", "Uqqg", "Dqqg", "Tqqg", "Qaqqg", "Qiqqg", "Sxqqg", "Spqqg", "Ocqqg", "Noqqg", // 51-60
        "Sxg", "Usxg", "Dsxg", "Tsxg", "Qasxg", "Qisxg", "Sxsxg", "Spsxg", "Ocsxg", "Nosxg", // 61-70
        "Spg", "Uspg", "Dspg", "Tspg", "Qaspg", "Qispg", "Sxspg", "Spspg", "Ocspg", "Nospg", // 71-80
        "Og", "Uog", "Dog", "Tog", "Qaog", "Qiog", "Sxog", "Spog", "Ocog", "Noog", // 81-90
        "Ng", "Ung", "Dng", "Tng", "Qang", "Qing", "Sxng", "Spng", "Ocng", "Nong", // 91-100
        "Ce", "Uce", "Dce", "Tce", "Qace", "Qice", "Sxce", "Spce", "Occe", "Noce", // 101-110
        "Dcc", "Udcc", "Ddcc", "Tdcc", "Qadcc", "Qidcc", "Sxdcc", "Spdcc", "Ocdcc", "Nodcc", // 111-120
        "Vgc", "Uvgc", "Dvgc", "Tvgc", "Qavgc", "Qivgc", "Sxvgc", "Spvgc", "Ocvgc", "Novgc", // 121-130
        "Tgc", "Utgc", "Dtgc", "Ttgc", "Qatgc", "Qitgc", "Sxtgc", "Sptgc", "Octgc", "Notgc", // 131-140
        "Qdgc", "Uqdgc", "Dqdgc", "Tqdgc", "Qaqdgc", "Qiqdgc", "Sxqdgc", "Spqdgc", "Ocqdgc", "Noqdgc", // 141-150
        "Qqgc", "Uqqgc", "Dqqgc", "Tqqgc", "Qaqqgc", "Qiqqgc", "Sxqqgc", "Spqqgc", "Ocqqgc", "Noqqgc", // 151-160
        "Sxgc", "Usxgc", "Dsxgc", "Tsxgc", "Qasxgc", "Qisxgc", "Sxsxgc", "Spsxgc", "Ocsxgc", "Nosxgc", // 161-170
        "Spgc", "Uspgc", "Dspgc", "Tspgc", "Qaspgc", "Qispgc", "Sxspgc", "Spspgc", "Ocspgc", "Nospgc", // 171-180
        "Ogc", "Uogc", "Dogc", "Togc", "Qaogc", "Qiogc", "Sxogc", "Spogc", "Ocogc", "Noogc", // 181-190
        "Ngc", "Ungc", "Dngc", "Tngc", "Qangc", "Qingc", "Sxngc", "Spngc", "Ocngc", "Nongc", // 191-200
        "Duc", "Uduc", "Dduc", "Tduc", "Qaduc", "Qiduc", "Sxduc", "Spduc", "Ocduc", "Noduc", // 201-210
        "Vuc", "Uvuc", "Dvuc", "Tvuc", "Qavuc", "Qivuc", "Sxvuc", "Spvuc", "Ocvuc", "Novuc", // 211-220
        "Tuc", "Utuc", "Dtuc", "Ttuc", "Qatuc", "Qituc", "Sxtuc", "Sptuc", "Octuc", "Notuc", // 221-230
        "Qduc", "Uqduc", "Dqduc", "Tqduc", "Qaqduc", "Qiqduc", "Sxqduc", "Spqduc", "Ocqduc", "Noqduc", // 231-240
        "Qquc", "Uqquc", "Dqquc", "Tqquc", "Qaqquc", "Qiqqquc", "Sxqqquc", "Spqquc", "Ocqquc", "Noqquc", // 241-250
        "Sxuc", "Usxuc", "Dsxuc", "Tsxuc", "Qasxuc", "Qisxuc", "Sxsxuc", "Spsxuc", "Ocsxuc", "Nosxuc", // 251-260
        "Spuc", "Uspuc", "Dspuc", "Tspuc", "Qaspuc", "Qispuc", "Sxspuc", "Spspuc", "Ocspuc", "Nospuc", // 261-270
        "Ouc", "Uouc", "Douc", "Touc", "Qaouc", "Qiouc", "Sxouc", "Spouc", "Ocouc", "Noouc", // 271-280
        "Nuc", "Unuc", "Dnuc", "Tnuc", "Qanuc", "Qinuc", "Sxnuc", "Spnuc", "Ocnuc", "Nonuc", // 281-290
        "Tc", "Utc", "Dtc", "Ttc", "Qatc", "Qitc", "Sxtc", "Sptc", "Octc", "Notc", // 291-300
        "Dtc", "Udtc", "Ddtc", "Tdtc", "Qadtc", "Qidtc", "Sxdtc", "Spdtc", "Ocdtc", "Nodtc", // 301-310
        "Vtc", "Uvtc", "Dvtc", "Tvtc", "Qavtc", "Qivtc", "Sxvtc", "Spvtc", "Ocvtc", "Novtc", // 311-320
        "Ttc", "Uttc", "Dttc", "Tttc", "Qattc", "Qittc", "Sxttc", "Spttc", "Octtc", "Nottc", // 321-330
        "Qdtc", "Uqdtc", "Dqdtc", "Tqdtc", "Qaqdtc", "Qiqdtc", "Sxqdtc", "Spqdtc", "Ocqdtc", "Noqdtc", // 331-340
        "Qqtc", "Uqqtc", "Dqqtc", "Tqqtc", "Qaqqtc", "Qiqqtc", "Sxqqtc", "Spqqtc", "Ocqqtc", "Noqqtc", // 341-350
        "Sxtc", "Usxtc", "Dsxtc", "Tsxtc", "Qasxtc", "Qisxtc", "Sxsxtc", "Spsxtc", "Ocsxtc", "Nosxtc", // 351-360
        "Sptc", "Usptc", "Dsptc", "Tsptc", "Qasptc", "Qisptc", "Sxsptc", "Spsptc", "Ocsptc", "Nosptc", // 361-370
        "Otc", "Uotc", "Dotc", "Totc", "Qaotc", "Qiotc", "Sxotc", "Spotc", "Ocotc", "Nootc", // 371-380
        "Ntc", "Untc", "Dntc", "Tntc", "Qantc", "Qintc", "Sxntc", "Spntc", "Ocntc", "Nontc", // 381-390
        "Qac", "Uqac", "Dqac", "Tqac", "Qaqac", "Qiqac", "Sxqac", "Spqac", "Ocqac", "Noqac", // 391-400
        "Dqac", "Udqac", "Ddqac", "Tdqac", "Qadqac", "Qidqac", "Sxdqac", "Spdqac", "Ocdqac", "Nodqac", // 401-410
        "Vqac", "Uvqac", "Dvqac", "Tvqac", "Qavqac", "Qivqac", "Sxvqac", "Spvqac", "Ocvqac", "Novqac", // 411-420
        "Tqac", "Utqac", "Dtqac", "Ttqac", "Qatqac", "Qitqac", "Sxtqac", "Sptqac", "Octqac", "Notqac", // 421-430
        "Qdqac", "Uqdqac", "Dqdqac", "Tqdqac", "Qaqdqac", "Qiqdqac", "Sxqdqac", "Spqdqac", "Ocqdqac", "Noqdqac", // 431-440
        "Qqqac", "Uqqqac", "Dqqqac", "Tqqqac", "Qaqqqac", "Qiqqqac", "Sxqqqac", "Spqqqac", "Ocqqqac", "Noqqqac", // 441-450
        "Sxqac", "Usxqac", "Dsxqac", "Tsxqac", "Qasxqac", "Qisxqac", "Sxsxqac", "Spsxqac", "Ocsxqac", "Nosxqac", // 451-460
        "Spqac", "Uspqac", "Dspqac", "Tspqac", "Qaspqac", "Qispqac", "Sxspqac", "Spspqac", "Ocspqac", "Nospqac", // 461-470
        "Oqac", "Uoqac", "Doqac", "Toqac", "Qaoqac", "Qioqac", "Sxoqac", "Spoqac", "Ocoqac", "Nooqac", // 471-480
        "Nqac", "Unqac", "Dnqac", "Tnqac", "Qanqac", "Qinqac", "Sxnqac", "Spnqac", "Ocnqac", "Nonqac", // 481-490
        "Qic", "Uqic", "Dqic", "Tqic", "Qaqic", "Qiqic", "Sxqic", "Spqic", "Ocqic", "Noqic", // 491-500
        "Dqic", "Udqic", "Ddqic", "Tdqic", "Qadqic", "Qidqic", "Sxdqic", "Spdqic", "Ocdqic", "Nodqic", // 501-510
        "Vqic", "Uvqic", "Dvqic", "Tvqic", "Qavqic", "Qivqic", "Sxvqic", "Spvqic", "Ocvqic", "Novqic", // 511-520
        "Tqic", "Utqic", "Dtqic", "Ttqic", "Qatqic", "Qitqic", "Sxtqic", "Sptqic", "Octqic", "Notqic", // 521-530
        "Qdqic", "Uqdqic", "Dqdqic", "Tqdqic", "Qaqdqic", "Qiqdqic", "Sxqdqic", "Spqdqic", "Ocqdqic", "Noqdqic", // 531-540
        "Qqqic", "Uqqqic", "Dqqqic", "Tqqqic", "Qaqqqic", "Qiqqqic", "Sxqqqic", "Spqqqic", "Ocqqqic", "Noqqqic", // 541-550
        "Sxqic", "Usxqic", "Dsxqic", "Tsxqic", "Qasxqic", "Qisxqic", "Sxsxqic", "Spsxqic", "Ocsxqic", "Nosxqic", // 551-560
        "Spqic", "Uspqic", "Dspqic", "Tspqic", "Qaspqic", "Qispqic", "Sxspqic", "Spspqic", "Ocspqic", "Nospqic", // 561-570
        "Oqic", "Uoqic", "Doqic", "Toqic", "Qaoqic", "Qioqic", "Sxoqic", "Spoqic", "Ocoqic", "Nooqic", // 571-580
        "Nqic", "Unqic", "Dnqic", "Tnqic", "Qanqic", "Qinqic", "Sxnqic", "Spnqic", "Ocnqic", "Nonqic", // 581-590
        "Sxc", "Usxc", "Dsxc", "Tsxc", "Qasxc", "Qisxc", "Sxsxc", "Spsxc", "Ocsxc", "Nosxc", // 591-600
        "Dsxc", "Udsxc", "Ddsxc", "Tdsxc", "Qadsxc", "Qidsxc", "Sxdsxc", "Spdsxc", "Ocdsxc", "Nodsxc", // 601-610
        "Vsxc", "Uvsxc", "Dvsxc", "Tvsxc", "Qavsxc", "Qivsxc", "Sxvsxc", "Spvsxc", "Ocvsxc", "Novsxc", // 611-620
        "Tsxc", "Utsxc", "Dtsxc", "Ttsxc", "Qatsxc", "Qitsxc", "Sxtsxc", "Sptsxc", "Octsxc", "Notsxc", // 621-630
        "Qdsxc", "Uqdsxc", "Dqdsxc", "Tqdsxc", "Qaqdsxc", "Qiqdsxc", "Sxqdsxc", "Spqdsxc", "Ocqdsxc", "Noqdsxc", // 631-640
        "Qqsxc", "Uqqsxc", "Dqqsxc", "Tqqsxc", "Qaqqsxc", "Qiqqsxc", "Sxqqsxc", "Spqqsxc", "Ocqqsxc", "Noqqsxc", // 641-650
        "Sxsxc", "Usxsxc", "Dsxsxc", "Tsxsxc", "Qasxsxc", "Qisxsxc", "Sxsxsxc", "Spsxsxc", "Ocsxsxc", "Nosxsxc", // 651-660
        "Spsxc", "Uspsxc", "Dspsxc", "Tspsxc", "Qaspsxc", "Qispsxc", "Sxspsxc", "Spspsxc", "Ocspsxc", "Nospsxc", // 661-670
        "Osxc", "Uosxc", "Dosxc", "Tosxc", "Qaosxc", "Qiosxc", "Sxosxc", "Sposxc", "Ocosxc", "Noosxc", // 671-680
        "Nsxc", "Unsxc", "Dnsxc", "Tnsxc", "Qansxc", "Qinsxc", "Sxnsxc", "Spnsxc", "Ocnsxc", "Nonsxc", // 681-690
        "Spc", "Uspc", "Dspc", "Tspc", "Qaspc", "Qispc", "Sxspc", "Spspc", "Ocspc", "Nospc", // 691-700
        "Dspc", "Udspc", "Ddspc", "Tdspc", "Qadspc", "Qidspc", "Sxdspc", "Spdspc", "Ocdspc", "Nodspc", // 701-710
        "Vspc", "Uvspc", "Dvspc", "Tvspc", "Qavspc", "Qivspc", "Sxvspc", "Spvspc", "Ocvspc", "Novspc", // 711-720
        "Tspc", "Utspc", "Dtspc", "Ttspc", "Qatspc", "Qitspc", "Sxtspc", "Sptspc", "Octspc", "Notspc", // 721-730
        "Qdspc", "Uqdspc", "Dqdspc", "Tqdspc", "Qaqdspc", "Qiqdspc", "Sxqdspc", "Spqdspc", "Ocqdspc", "Noqdspc", // 731-740
        "Qqspc", "Uqqspc", "Dqqspc", "Tqqspc", "Qaqqspc", "Qiqqspc", "Sxqqspc", "Spqqspc", "Ocqqspc", "Noqqspc", // 741-750
        "Sxspc", "Usxspc", "Dsxspc", "Tsxspc", "Qasxspc", "Qisxspc", "Sxsxspc", "Spsxspc", "Ocsxspc", "Nosxspc", // 751-760
        "Spspc", "Uspspc", "Dspspc", "Tspspc", "Qaspspc", "Qispspc", "Sxspspc", "Spspspc", "Ocspspc", "Nospspc", // 761-770
        "Ospc", "Uospc", "Dospc", "Tospc", "Qaospc", "Qiospc", "Sxospc", "Spospc", "Ocospc", "Noospc", // 771-780
        "Nspc", "Unspc", "Dnspc", "Tnspc", "Qanspc", "Qinspc", "Sxnspc", "Spnspc", "Ocnspc", "Nonspc", // 781-790
        "Oc", "Uoc", "Doc", "Toc", "Qaoc", "Qioc", "Sxoc", "Spoc", "Ococ", "Nooc", // 791-800
        "Doc", "Udoc", "Ddoc", "Tdoc", "Qadoc", "Qidoc", "Sxdoc", "Spdoc", "Ocdoc", "Nodoc", // 801-810
        "Voc", "Uvoc", "Dvoc", "Tvoc", "Qavoc", "Qivoc", "Sxvoc", "Spvoc", "Ocvoc", "Novoc", // 811-820
        "Toc", "Utoc", "Dtoc", "Ttoc", "Qatoc", "Qitoc", "Sxtoc", "Sptoc", "Octoc", "Notoc", // 821-830
        "Qdoc", "Uqdoc", "Dqdoc", "Tqdoc", "Qaqdoc", "Qiqdoc", "Sxqdoc", "Spqdoc", "Ocqdoc", "Noqdoc", // 831-840
        "Qqoc", "Uqqoc", "Dqqoc", "Tqqoc", "Qaqqoc", "Qiqqoc", "Sxqqoc", "Spqqoc", "Ocqqoc", "Noqqoc", // 841-850
        "Sxoc", "Usxoc", "Dsxoc", "Tsxoc", "Qasxoc", "Qisxoc", "Sxsxoc", "Spsxoc", "Ocsxoc", "Nosxoc", // 851-860
        "Spoc", "Uspoc", "Dspoc", "Tspoc", "Qaspoc", "Qispoc", "Sxspoc", "Spspoc", "Ocspoc", "Nospoc", // 861-870
        "Ooc", "Uooc", "Dooc", "Tooc", "Qaooc", "Qiooc", "Sxooc", "Spooc", "Ocooc", "Noooc", // 871-880
        "Noc", "Unoc", "Dnoc", "Tnoc", "Qanoc", "Qinoc", "Sxnoc", "Spnoc", "Ocnoc", "Nonoc", // 881-890
        "Nc", "Unc", "Dnc", "Tnc", "Qanc", "Qinc", "Sxnc", "Spnc", "Ocnc", "Nonc", // 891-900
        "Dnc", "Udnc", "Ddnc", "Tdnc", "Qadnc", "Qidnc", "Sxdnc", "Spdnc", "Ocdnc", "Nodnc", // 901-910
        "Vnc", "Uvnc", "Dvnc", "Tvnc", "Qavnc", "Qivnc", "Sxvnc", "Spvnc", "Ocvnc", "Novnc", // 911-920
        "Tnc", "Utnc", "Dtnc", "Ttnc", "Qatnc", "Qitnc", "Sxtnc", "Sptnc", "Octnc", "Notnc", // 921-930
        "Qdnc", "Uqdnc", "Dqdnc", "Tqdnc", "Qaqdnc", "Qiqdnc", "Sxqdnc", "Spqdnc", "Ocqdnc", "Noqdnc", // 931-940
        "Qqnc", "Uqqnc", "Dqqnc", "Tqqnc", "Qaqqnc", "Qiqqnc", "Sxqqnc", "Spqqnc", "Ocqqnc", "Noqqnc", // 941-950
        "Sxnc", "Usxnc", "Dsxnc", "Tsxnc", "Qasxnc", "Qisxnc", "Sxsxnc", "Spsxnc", "Ocsxnc", "Nosxnc", // 951-960
        "Spnc", "Uspnc", "Dspnc", "Tspnc", "Qaspnc", "Qispnc", "Sxspnc", "Spspnc", "Ocspnc", "Nospnc", // 961-970
        "Onc", "Uonc", "Donc", "Tonc", "Qaonc", "Qionc", "Sxonc", "Sponc", "Oconc", "Noonc", // 971-980
        "Nnc", "Unnc", "Dnnc", "Tnnc", "Qannc", "Qinnc", "Sxnnc", "Spnnc", "Ocnnc", "Nonnc", // 981-990
        "Mil", "Umil", "Dmil", "Tmil", "Qamil", "Qimil", "Sxmil", "Spmil", "Ocmil", "Nomil" // 991-1000
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
    updateUI();
}
function nextDay() {
    p.day++;
    adminUnlocked = false; // Optional: re-lock admin panel

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
                <small style="color:#aaa">+5% ${opt.desc} per SP</small>
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
            LuxLog(`Lux: Watching you swell with power is like watching a balloon inflate. I wonder when you'll pop?`);
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
    enemy = { 
        ...selectedEnemy, 
        // Manually override the getters with static, writable BigInt values
        mhp: selectedEnemy.mhp, 
        hp: selectedEnemy.mhp, 
        atk: selectedEnemy.atk,
        san: selectedEnemy.san,
        exp: selectedEnemy.exp,
        gold: selectedEnemy.gold,
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
    updateUI();

    // 3. Damage Logic
    if (s.dmg) { 
        let damage = BigInt(s.dmg);
        enemy.hp -= damage; 
        updateUI();
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
        log(`Enjoy the bitter-sweet, cold, embrace of death =)`,"#3c23a8");
        log("You have perished.", "#ff4757"); 
        document.body.style.pointerEvents = "none"; 
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

