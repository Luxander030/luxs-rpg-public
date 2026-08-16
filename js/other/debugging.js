let adminUnlocked = false; 
// const hashed_pass = "$argon2id$v=19$m=262144,t=10,p=4$ODkxNzc4ZTNmNTIzZDcwYTM4OTY3ZWIzNzM1OTEwYzc$SHi1xoiUjJ/m2NRy5uu70MATcv/1ik1QReaAB6M8nZELfvf3HExiean0x6+MFVWbATp9ij6age/1TmUaMYbjbA";
const hashed_pass = "$argon2id$v=19$m=4096,t=1,p=1$ODkxNzc4ZTNmNTIzZDcwYTM4OTY3ZWIzNzM1OTEwYzc$yEnlUm0zD+Tneqa/wFzdTw"; 

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('debugging-panel').classList.contains('hidden')) {
        toggleAdmin();
    }
});

/* ============================================================
   ADMIN CONSOLE AUTOCOMPLETE

   One declarative registry drives the whole thing: command names,
   sub-commands, and argument values. `values` may be an array or a
   function, so lists that only exist at runtime (item ids, enemy
   names) are read lazily and script order doesn't matter.
   ============================================================ */

const ADMIN_EFFECTS = [
    'frozen', 'stunned', 'poison', 'burning',
    'fished', 'vulnerable', 'resistant', 'weakened', 'solari'
];

const SET_OR_ADD = { hint: '<set|add>', values: ['set', 'add'] };

const ADMIN_COMMANDS = [
    { name: '/clearname',   desc: 'Clear the saved player name' },
    { name: '/clearclass',  desc: 'Clear the saved player class' },
    { name: '/effect',      desc: 'Apply a status effect to the current enemy',
                            params: [{ hint: '<effect>', values: () => ADMIN_EFFECTS }, { hint: '<amount>' }] },
    { name: '/test',        desc: 'Apply every status effect to the current enemy' },
    { name: '/give',        desc: 'Spawn an item into your inventory',
                            params: [{ hint: '<item id>', values: () => inventoryItems.map(i => i.id) }] },
    { name: '/achievements', desc: 'Unlock or lock achievements',
                            params: [{ hint: '<unlock|lock>', values: ['unlock', 'lock'] },
                                     { hint: '<name|all>', values: () => ['all', ...Object.keys(p.achievements ?? {})] }] },
    { name: '/spawn',       desc: 'Force the next encounter',
                            params: [{ hint: '<enemy name>', rest: true, values: () => enemies.map(e => e.name) }] },
    { name: '/gold',        desc: 'Set or add gold',          params: [SET_OR_ADD, { hint: '<amount>' }] },
    { name: '/gems',        desc: 'Set or add gems',          params: [SET_OR_ADD, { hint: '<amount>' }] },
    { name: '/sp',          desc: 'Set or add skill points',  params: [SET_OR_ADD, { hint: '<amount>' }] },
    { name: '/exp',         desc: 'Grant EXP',                params: [{ hint: '<amount>' }] },
    { name: '/mhp',         desc: 'Set max and current HP',      params: [{ hint: '<amount>' }] },
    { name: '/mmp',         desc: 'Set max and current mana',    params: [{ hint: '<amount>' }] },
    { name: '/msan',        desc: 'Set max and current sanity',  params: [{ hint: '<amount>' }] },
    { name: '/refillhp',    desc: 'Refill health' },
    { name: '/refillmp',    desc: 'Refill mana' },
    { name: '/refillsanity',desc: 'Refill sanity' },
    { name: '/dmgmult',     desc: 'Set the damage multiplier %',  params: [{ hint: '<percent>' }] },
    { name: '/manared',     desc: 'Set mana reduction %',         params: [{ hint: '<0-100>' }] },
    { name: '/killcount',   desc: 'Set total kills',              params: [{ hint: '<amount>' }] },
    { name: '/sparecount',  desc: 'Set total spares',             params: [{ hint: '<amount>' }] },
    { name: '/bob',         desc: "Set Bob's visit counter",      params: [{ hint: '<amount>' }] },
    { name: '/unlockallinventoryslots', desc: 'Unlock every backpack slot and storage' },
    { name: '/setgenocide',   desc: 'Mark the Genocide route complete' },
    { name: '/setpacifist',   desc: 'Mark the Pacifist route complete' },
    { name: '/cleargenocide', desc: 'Clear the Genocide route record' },
    { name: '/clearpacifist', desc: 'Clear the Pacifist route record' },
    { name: '/clearboth',     desc: 'Clear both route records' }
];

const MAX_SUGGESTIONS = 8;

const consoleInput = document.getElementById('console-input');
let suggestionState = null; // { start, end, items, activeIndex }

function findAdminCommand(name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    return ADMIN_COMMANDS.find(c => c.name.toLowerCase() === lower) || null;
}

function paramValues(param) {
    if (!param || !param.values) return null;
    try {
        return typeof param.values === 'function' ? param.values() : param.values;
    } catch (err) {
        console.warn('Autocomplete value source failed:', err);
        return null;
    }
}

function usageString(cmd) {
    if (!cmd.params || !cmd.params.length) return cmd.name;
    return `${cmd.name} ${cmd.params.map(pm => pm.hint).join(' ')}`;
}

// Split the line into tokens, keeping each token's offset. A line ending in a
// space gets a trailing empty token, which is what makes "/gems " offer set|add.
function tokenizeConsoleInput(raw) {
    const tokens = [];
    const re = /\S+/g;
    let m;
    while ((m = re.exec(raw)) !== null) tokens.push({ text: m[0], start: m.index });
    if (raw.length === 0 || /\s$/.test(raw)) tokens.push({ text: '', start: raw.length });
    return tokens;
}

function buildSuggestions(raw) {
    const tokens = tokenizeConsoleInput(raw);
    const idx = tokens.length - 1;
    const current = tokens[idx];

    // First token — complete the command name itself.
    if (idx === 0) {
        const query = current.text.toLowerCase();
        const items = ADMIN_COMMANDS
            .filter(c => c.name.toLowerCase().startsWith(query))
            .map(c => ({
                value: c.name,
                hint: c.desc,
                // Trailing space only if the command actually takes arguments.
                appendSpace: !!(c.params && c.params.length)
            }));
        return { start: current.start, end: current.start + current.text.length, items };
    }

    const cmd = findAdminCommand(tokens[0].text);
    if (!cmd || !cmd.params) return null;

    let paramIndex = idx - 1;

    // A `rest` param swallows the remainder of the line (enemy names have spaces).
    const restIndex = cmd.params.findIndex(pm => pm.rest);
    let query = current.text;
    let start = current.start;
    if (restIndex !== -1 && paramIndex >= restIndex) {
        paramIndex = restIndex;
        start = tokens[restIndex + 1].start;
        query = raw.slice(start);
    }

    const param = cmd.params[paramIndex];
    if (!param) return null;

    const values = paramValues(param);
    if (!values) {
        // Free-form argument (a number). Nothing to complete, but showing the
        // usage line with the current argument marked is still worth a row.
        return {
            start, end: raw.length,
            items: [{
                value: null,
                disabled: true,
                label: usageString(cmd),
                hint: `argument ${paramIndex + 1}: ${param.hint}`
            }]
        };
    }

    const lower = query.toLowerCase();
    const items = values
        .filter(v => v.toLowerCase().startsWith(lower))
        .map(v => ({
            value: v,
            hint: param.hint,
            appendSpace: paramIndex < cmd.params.length - 1
        }));

    return { start, end: raw.length, items };
}

function removeSuggestions() {
    const existing = document.getElementById('suggestion-dropdown');
    if (existing) existing.remove();
    suggestionState = null;
}

function firstSelectableIndex() {
    if (!suggestionState) return -1;
    return suggestionState.items.findIndex(it => !it.disabled);
}

function renderSuggestions() {
    const previousActive = suggestionState ? suggestionState.activeIndex : -1;
    removeSuggestions();

    const raw = consoleInput.value;
    if (!raw.trim()) return;

    const result = buildSuggestions(raw);
    if (!result || !result.items.length) return;

    const shown = result.items.slice(0, MAX_SUGGESTIONS);
    const hiddenCount = result.items.length - shown.length;

    suggestionState = {
        start: result.start,
        end: result.end,
        items: shown,
        // Nothing is highlighted by default, so Enter still runs the command.
        // Only an explicit arrow-key press selects a suggestion.
        activeIndex: previousActive >= 0 && previousActive < shown.length ? previousActive : -1
    };

    const dropdown = document.createElement('div');
    dropdown.id = 'suggestion-dropdown';
    dropdown.style.cssText = `
        position: fixed;
        background: var(--panel);
        border: 1px solid var(--mana);
        border-radius: 6px;
        z-index: 10001;
        max-height: 220px;
        overflow-y: auto;
        font-family: 'Fira Code', monospace;
        font-size: 12px;
        box-shadow: 0 6px 24px rgba(0,0,0,0.6);
    `;

    shown.forEach((item, i) => {
        const row = document.createElement('div');
        row.dataset.index = String(i);
        row.style.cssText = `
            padding: 5px 9px;
            display: flex; justify-content: space-between; gap: 12px;
            cursor: ${item.disabled ? 'default' : 'pointer'};
            color: ${item.disabled ? '#888' : 'var(--text)'};
        `;
        const label = document.createElement('span');
        label.textContent = item.label ?? item.value;
        const hint = document.createElement('span');
        hint.textContent = item.hint || '';
        hint.style.cssText = 'color:#777; text-align:right; white-space:nowrap;';
        row.appendChild(label);
        row.appendChild(hint);

        if (!item.disabled) {
            row.addEventListener('mouseenter', () => setActiveSuggestion(i));
            // mousedown default would blur the input before the click lands.
            row.addEventListener('mousedown', (e) => e.preventDefault());
            row.addEventListener('click', () => applySuggestion(i));
        }
        dropdown.appendChild(row);
    });

    if (hiddenCount > 0) {
        const more = document.createElement('div');
        more.textContent = `…and ${hiddenCount} more`;
        more.style.cssText = 'padding:5px 9px; color:#666; font-style:italic;';
        dropdown.appendChild(more);
    }

    const rect = consoleInput.getBoundingClientRect();
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.width = `${rect.width}px`;
    // Flip above the input if there's no room below.
    if (rect.bottom + 220 > window.innerHeight && rect.top > 220) {
        dropdown.style.bottom = `${window.innerHeight - rect.top + 4}px`;
    } else {
        dropdown.style.top = `${rect.bottom + 4}px`;
    }

    document.body.appendChild(dropdown);
    paintActiveSuggestion();
}

function paintActiveSuggestion() {
    const dropdown = document.getElementById('suggestion-dropdown');
    if (!dropdown || !suggestionState) return;
    dropdown.querySelectorAll('[data-index]').forEach(row => {
        const isActive = Number(row.dataset.index) === suggestionState.activeIndex;
        row.style.background = isActive ? 'var(--mana)' : 'transparent';
    });
}

function setActiveSuggestion(i) {
    if (!suggestionState) return;
    suggestionState.activeIndex = i;
    paintActiveSuggestion();
}

function moveActiveSuggestion(delta) {
    if (!suggestionState) return;
    const selectable = suggestionState.items
        .map((it, i) => (it.disabled ? -1 : i))
        .filter(i => i !== -1);
    if (!selectable.length) return;

    const at = selectable.indexOf(suggestionState.activeIndex);
    const next = at === -1
        ? (delta > 0 ? selectable[0] : selectable[selectable.length - 1])
        : selectable[(at + delta + selectable.length) % selectable.length];

    setActiveSuggestion(next);
    const row = document.querySelector(`#suggestion-dropdown [data-index="${next}"]`);
    if (row && row.scrollIntoView) row.scrollIntoView({ block: 'nearest' });
}

function applySuggestion(i) {
    if (!suggestionState) return;
    const item = suggestionState.items[i];
    if (!item || item.disabled) return;

    const raw = consoleInput.value;
    const before = raw.slice(0, suggestionState.start);
    const after = raw.slice(suggestionState.end);
    const insert = item.value + (item.appendSpace ? ' ' : '');

    consoleInput.value = before + insert + after;
    const caret = (before + insert).length;
    consoleInput.setSelectionRange(caret, caret);
    consoleInput.focus();

    // Re-run so picking "/gems" immediately offers set|add.
    suggestionState = null;
    renderSuggestions();
}

consoleInput.addEventListener('input', renderSuggestions);

consoleInput.addEventListener('keydown', (e) => {
    const listOpen = !!document.getElementById('suggestion-dropdown');

    if (e.key === 'Escape' && listOpen) {
        // Close the dropdown only — don't let the window handler shut the panel.
        e.preventDefault();
        e.stopPropagation();
        removeSuggestions();
        return;
    }

    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && listOpen) {
        e.preventDefault();
        moveActiveSuggestion(e.key === 'ArrowDown' ? 1 : -1);
        return;
    }

    if (e.key === 'Tab' && listOpen) {
        e.preventDefault();
        const target = suggestionState.activeIndex >= 0
            ? suggestionState.activeIndex
            : firstSelectableIndex();
        if (target >= 0) applySuggestion(target);
        return;
    }

    if (e.key === 'Enter') {
        // Enter accepts a suggestion only if one was deliberately arrowed to.
        if (listOpen && suggestionState && suggestionState.activeIndex >= 0) {
            e.preventDefault();
            applySuggestion(suggestionState.activeIndex);
            return;
        }
        const commandText = consoleInput.value.trim();
        removeSuggestions(); // the dropdown used to survive the command running
        if (commandText) {
            handleCommand(commandText);
            consoleInput.value = "";
        }
    }
});

consoleInput.addEventListener('blur', () => {
    // Clicks inside the dropdown preventDefault on mousedown, so focus never
    // actually leaves for those. Anything else means we're done here.
    setTimeout(removeSuggestions, 0);
});

function cmdClearName() {
    localStorage.removeItem("luxsRPGplayerName")
    p.name = null;
    log(`Name cleared. Pick a new one.`, "var(--funfriend)")
    // No callback: this opens the name picker on its own, and stops there.
    nameSelection();
}

function cmdClearClass() {
    localStorage.removeItem("luxsRPGplayerClass")
    p.class = null;
    log(`Class cleared. Pick a new one.`, "var(--funfriend)")
    // No callback: class picker only — difficulty is untouched.
    classSelection();
}

const cmdRegistry = {
    'clearname': cmdClearName
};

function handleCommand(cmd) {
    const args = cmd.split(" ");
    const command = args[0].toLowerCase();
    // Use a helper to safely try to get a BigInt from the input
    let bVal = 0n;
    try { bVal = BigInt(args[1] || 0); } catch(e) { bVal = null; }
    const output = document.getElementById('console-output');
    let response = "";
    let successColor = "var(--funfriend)";

    // let cmd = command.substr(1);
    // if (cmd in cmdRegistry) {
    //     const filtered = Object.keys(cmdRegistry).filter(c => c.startsWith(cmd));

    //     cmdRegistry[cmd]();
    // } else

    switch (command) {
        case '/clearname':
            cmdClearName();
            break;
        case '/clearclass':
            cmdClearClass();
            break;
        case '/effect':
            let effectVal;
            try { effectVal = BigInt(args[2] || 0); } catch(e) { effectVal = null; }
            if (!enemy) {
                response = "Funfriend: No active enemy to apply effect to.";
                successColor = "#ff4757";
                break;
            }
            const effect = args[1]?.toLowerCase();
            // Same list the autocomplete offers, so the two can't drift apart.
            if (!ADMIN_EFFECTS.includes(effect)) {
                response = `Funfriend: Unknown effect. Valid effects: [${ADMIN_EFFECTS.join(', ')}]`;
                successColor = "#ff4757";
                break;
            }
            if (effectVal === null) {
                response = "Funfriend: Please provide a value. Usage: /effect <effect> <amount>";
                successColor = "#ff4757";
                break;
            }
            enemy[effect] += effectVal;
            response = `Funfriend: Applied ${formatNumber(effectVal)} ${effect} to ${enemy.name}.`;
            break;
        case '/test':
            enemy.frozen += 10n
            enemy.stunned += 10n
            enemy.poison += 100n
            enemy.burning += 10n
            enemy.fished += 100n
            enemy.solari += 10n
            enemy.vulnerable += 10n
            enemy.resistant += 10n
            enemy.weakened += 10n
            break;
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
        case '/achievements': {
            const mode = args[1]?.toLowerCase();
            const target = args[2];

            if (mode !== 'unlock' && mode !== 'lock') {
                response = "Usage: /achievements <unlock|lock> <achievement_name|all>";
                successColor = "#ff4757";
                break;
            }
            if (!target) {
                const names = Object.keys(p.achievements ?? {}).join(", ");
                response = `Funfriend: Please name an achievement, or "all". Available: [${names}]`;
                successColor = "var(--rareItem)";
                break;
            }

            const unlocking = mode === 'unlock';

            if (target.toLowerCase() === 'all') {
                const changed = setAllAchievements(unlocking);
                const { done, total } = achievementProgress();
                response = `Funfriend: ${unlocking ? 'Unlocked' : 'Locked'} ${changed} achievement${changed === 1 ? '' : 's'}. Now at ${done}/${total}.`;
                break;
            }

            // Ids are camelCase, so match case-insensitively rather than making
            // whoever's typing get it exactly right.
            const id = Object.keys(p.achievements ?? {})
                .find(k => k.toLowerCase() === target.toLowerCase());

            if (!id) {
                const near = Object.keys(p.achievements ?? {})
                    .filter(k => k.toLowerCase().startsWith(target.toLowerCase()));
                response = near.length
                    ? `Funfriend: No achievement "${target}". Did you mean: [${near.join(", ")}]?`
                    : `Funfriend: No achievement matching "${target}".`;
                successColor = "#ff4757";
                break;
            }

            const changed = setAchievement(id, unlocking);
            const a = p.achievements[id];
            response = changed
                ? `Funfriend: ${unlocking ? 'Unlocked' : 'Locked'} "${a.name}" (${id}).`
                : `Funfriend: "${a.name}" (${id}) was already ${unlocking ? 'unlocked' : 'locked'}.`;
            break;
        }
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
            p.flags.storageUnlocked = true
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
                p.flags.bobVisits = bVal
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
                let temp = amount - p.gold
                p.gold = amount;
                p.totalGold += temp
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
        case '/gems':
            // args[0] is "/gems"
            // args[1] is "set" or "add"
            // args[2] is the number
            const GemsSubCommand = args[1]?.toLowerCase();
            // Use your helper logic to get the number from the 3rd word (args[2])
            let GemsAmount;
            try { 
                GemsAmount = BigInt(args[2] || 0); 
            } catch(e) { 
                GemsAmount = null; 
            }
            if (GemsAmount === null) {
                response = "Please provide a valid number. Usage: /gems <set|add> <amount>";
                break;
            }
            if (GemsSubCommand === 'set') {
                p.gems = GemsAmount;
                response = `Funfriend: Total gems set to ${formatNumber(p.gems)}.`;
            } 
            else if (GemsSubCommand === 'add') {
                p.gems += GemsAmount;
                response = `Funfriend: Added ${formatNumber(GemsAmount)} gems. Total is now ${formatNumber(p.gems)}.`;
            } 
            else {
                response = "Usage: /gems <set|add> <amount>";
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
        removeSuggestions(); // don't leave a dropdown floating over the game
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