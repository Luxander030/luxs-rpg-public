let LuxShopTalkChance = null;
let currentBossBGM = null;
const name_code = "$argon2id$v=19$m=64,t=4,p=4$M2MyM2E4M2M$EAnadMEQIPbUo+c0wa+M3y1hmtcNzTixORueQ8mRHD8";

function log(msg, color = "#e1e1e6") {
    const l = document.getElementById('log');
    // Create and add the new log message
    const newEntry = document.createElement('div');
    newEntry.style.color = color;
    newEntry.innerHTML = `[Day ${formatNumber(p.day)}] ${msg}`;
    l.appendChild(newEntry);
    // If we have more than 1000 messages, remove the first child (removes a lot of lag)
    while (l.children.length > 1000) {
        l.removeChild(l.firstChild);
    }
    // Auto-scroll to the bottom
    l.scrollTop = l.scrollHeight;
}

function classSelection(onComplete) {
    const classes = [
        {
            id: "astralMage",
            name: "Astral Mage",
            image: "images/classes/astral.gif",
            benefits: [
                "Hits harder than any other tree. Prism Blast is roughly 8x the next class's best.",
                "Thirteen spells, so the tree keeps giving you upgrades for a long time.",
            ],
            cons: [
                "Easily the most expensive tree: 114 SP to finish, and single spells cost up to 18.",
                "Also the most expensive to cast, by a wide margin.",
                "No status effects at all. Damage is the whole kit.",
            ],
            color: "#a78bfa"
        },
        {
            id: "stormmancer",
            name: "Stormmancer",
            image: "images/classes/storm.gif",
            benefits: [
                "Stuns enemies, and a stunned enemy skips its whole turn.",
                "Cheap to cast, and the widest tree in the game at fourteen spells.",
                "Thunderbolt sets things on fire as well as stunning them.",
            ],
            cons: [
                "Spells have a chance to backfire on you, rising to 20% on the strongest ones.",
                "Middling damage. You win by denying turns, not by hitting hard.",
                "Stun is resisted about half the time, and enemies go immune for a few turns after.",
            ],
            color: "#60a5fa"
        },
        {
            id: "druid",
            name: "Druid",
            image: "images/classes/druid.gif",
            benefits: [
                "One of the only classes with dedicated healing spells.",
                "Poison Spray stacks poison so heavily it outdamages anything else the tree has.",
                "Restores Sanity as well as health.",
            ],
            cons: [
                "Fire based enemies take less damage from these spells.",
                "The weakest direct damage of any class. The poison does the work.",
                "Both healing spells get weaker the more you have killed, and stop working entirely if you kill enough.",
            ],
            color: "#4ade80"
        },
        {
            id: "flamemancer",
            name: "Flamemancer",
            image: "images/classes/flamemancer.gif",
            benefits: [
                "Applies a lot of burn ticks, and they stack up across a long fight.",
                "The cheapest class to cast, and the second cheapest tree to finish.",
                "Reaches its final spell sooner than most, so it comes online early.",
            ],
            cons: [
                "Relatively weak attack, but stronger than physical attacks.",
                "Burn is the only trick. Anything immune to it shrugs off most of your kit.",
                "The smallest tree apart from Shadow, so it runs out of upgrades.",
            ],
            color: "#fb923c"
        },
        {
            id: "cryomancer",
            name: "Cryomancer",
            image: "images/classes/cryo.gif",
            benefits: [
                "Freezes enemies, and frozen enemies take 50% more damage from everything.",
                "Cheap to cast for most of the tree.",
                "Ends on Snowgrave, which scales with your kill count and can outdamage every other class combined.",
            ],
            cons: [
                "Middling damage until Snowgrave, and Snowgrave costs 20,000 MP and half your Sanity.",
                "Snowgrave is worthless on a low kill count, so the payoff only exists if you have been killing.",
                "Several enemies are immune to freezing, which removes most of the tree's value against them.",
            ],
            color: "#baffff"
        },
        {
            id: "watermancer",
            name: "Watermancer",
            image: "images/classes/watermancer.gif",
            benefits: [
                "Double damage against fire enemies.",
                "By far the cheapest tree to finish, at a third the cost of Astral Mage.",
                "Cheap to cast, so you can keep casting your best spell.",
            ],
            cons: [
                "Weak damage. Only Flamemancer and Druid hit for less.",
                "Not that much variety for spells: nine, in three near-identical lines.",
                "No status effects, and the fire bonus does nothing against the other 90% of the roster.",
            ],
            color: "#38bdf8"
        },
        {
            id: "shadow",
            name: "Shadow",
            image: "images/classes/shadow.gif",
            benefits: [
                "Deals 50% more damage to enemies like Lux or Kitsune.",
                "Siphon Ray heals you for as much as it deals, and Shielding Dark restores Sanity.",
                "Also ends on Snowgrave, which scales with your kill count.",
            ],
            cons: [
                "Deals 30% less damage to demon-like enemies, which includes every Sin and Azmodan.",
                "The smallest tree in the game at eight spells.",
                "Low damage outside its two matchups.",
            ],
            color: "#c084fc"
        },
        // {
        //     id: "blood",
        //     name: "Blood Mage",
        //     image: "images/classes/blood.gif",
        //     benefits: [
        //         "Lifesteal Spells",
        //     ],
        //     cons: [
        //         "Lifesteal enemies have lifesteal increased",
        //     ],
        //     color: "#870000"
        // },
        {
            id: "neutral",
            name: "Neutral",
            image: null,
            benefits: [
                "Every spell is a gamble, and the good rolls are enormous.",
                "The second highest damage ceiling of any class.",
                "The Last Word has a small chance to simply kill whatever it hits, whatever it is.",
                "Most spells can heal or restore Sanity on top of dealing damage.",
            ],
            cons: [
                "Every spell is a gamble, and the bad rolls do nothing at all.",
                "Several spells can damage you, drain your Sanity or leave you on 1 HP.",
                "You cannot plan around it. The tooltip damage is a fresh roll and never matches the cast, so good luck looking at that.",
                "The second most expensive tree to finish, at 83 SP.",
            ],
            color: "#a4b0be"
        },
    ];

    // Build the overlay
    const overlay = document.createElement('div');
    overlay.id = "class-selection-overlay";
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        z-index: 99999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        overflow-y: auto;
        padding: 40px 20px;
        box-sizing: border-box;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
        text-align: center;
        margin-bottom: 30px;
    `;
    header.innerHTML = `
        <h1 style="color: var(--mana); font-size: 2em; margin-bottom: 10px;">Choose Your Class</h1>
        <p style="color: #a4b0be; font-size: 0.95em;">This choice is permanent. Choose wisely.</p>
    `;
    overlay.appendChild(header);

    // Grid
    const grid = document.createElement('div');
    grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
        width: 100%;
        max-width: 1200px;
    `;

    classes.forEach(cls => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: #16161a;
            border: 2px solid ${cls.color};
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        `;
        card.onmouseenter = () => {
            card.style.transform = "translateY(-5px)";
            card.style.boxShadow = `0 0 20px ${cls.color}88`;
        };
        card.onmouseleave = () => {
            card.style.transform = "translateY(0)";
            card.style.boxShadow = "none";
        };

        // Image
        const imgContainer = document.createElement('div');
        imgContainer.style.cssText = `
            width: 120px;
            height: 120px;
            border-radius: 10px;
            overflow: hidden;
            border: 2px solid ${cls.color};
        `;
        if (cls.image) {
            const img = document.createElement('img');
            img.src = cls.image;
            img.alt = cls.name;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
            `;
            imgContainer.appendChild(img);
        } else {
            imgContainer.style.background = "#2f3542";
            imgContainer.style.display = "flex";
            imgContainer.style.alignItems = "center";
            imgContainer.style.justifyContent = "center";
            imgContainer.innerHTML = `<span style="font-size: 2em; color: #a4b0be;">?</span>`;
        }

        // Name
        const name = document.createElement('h3');
        name.style.cssText = `
            color: ${cls.color};
            margin: 0;
            font-size: 1.1em;
        `;
        name.textContent = cls.name;

        // Benefits
        const benefits = document.createElement('div');
        benefits.style.cssText = `
            font-size: 0.8em;
            color: #2ed573;
            text-align: left;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 3px;
        `;
        cls.benefits.forEach(b => {
            const line = document.createElement('div');
            line.innerHTML = `<b>+</b> ${b}`;
            benefits.appendChild(line);
        });

        // Cons
        const cons = document.createElement('div');
        cons.style.cssText = `
            font-size: 0.8em;
            color: #ff4757;
            text-align: left;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 3px;
        `;
        cls.cons.forEach(c => {
            const line = document.createElement('div');
            line.innerHTML = `<b>-</b> ${c}`;
            cons.appendChild(line);
        });

        // Select button
        const btn = document.createElement('button');
        btn.textContent = `Choose ${cls.name}`;
        btn.style.cssText = `
            margin-top: 10px;
            width: 100%;
            background: ${cls.color}22;
            border: 1px solid ${cls.color};
            color: ${cls.color};
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.2s;
        `;
        btn.onmouseenter = () => btn.style.background = `${cls.color}44`;
        btn.onmouseleave = () => btn.style.background = `${cls.color}22`;
        btn.onclick = () => confirmClassSelection(cls, overlay, onComplete);

        card.appendChild(imgContainer);
        card.appendChild(name);
        card.appendChild(benefits);
        card.appendChild(cons);
        card.appendChild(btn);
        grid.appendChild(card);
    });

    overlay.appendChild(grid);
    document.body.appendChild(overlay);
}

function confirmClassSelection(cls, overlay, onComplete) {
    const confirm = document.createElement('div');
    confirm.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.97);
        z-index: 100000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    `;
    confirm.innerHTML = `
        <h2 style="color: ${cls.color};">Are you sure?</h2>
        <p style="color: #a4b0be; text-align: center; max-width: 400px;">
            You are about to choose <strong style="color: ${cls.color};">${cls.name}</strong> as your class.
            <br><br>
            <span style="color: #ff4757; font-weight: bold;">This cannot be changed.</span>
        </p>
        <div style="display: flex; gap: 15px;">
            <button id="confirm-class-yes" style="
                background: ${cls.color}22;
                border: 1px solid ${cls.color};
                color: ${cls.color};
                padding: 12px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                font-size: 1em;
            ">Yes, I'm sure</button>
            <button id="confirm-class-no" style="
                background: #2f3542;
                border: 1px solid #57606f;
                color: white;
                padding: 12px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                font-size: 1em;
            ">Go back</button>
        </div>
    `;
    document.body.appendChild(confirm);

    document.getElementById('confirm-class-yes').onclick = () => {
        p.class = cls.id;
        localStorage.setItem("luxsRPGplayerClass", cls.id);
        applyClassStartingSpells(cls.id);
        confirm.remove();
        overlay.remove();
        log(`You have chosen the path of the <strong style="color: ${cls.color};">${cls.name}</strong>.`, cls.color);
        updateUI();
        // Hands off to the difficulty picker during the new-save flow.
        if (typeof onComplete === 'function') onComplete();
    };

    document.getElementById('confirm-class-no').onclick = () => {
        confirm.remove();
    };
}

function applyClassStartingSpells(classId) {
    const startingSpells = {
        astralMage:   ["starbit"],
        stormmancer:  ["multispark"],
        druid:        ["brambleChain"],
        flamemancer:  ["flame"],
        cryomancer:   ["chill"],
        watermancer:  ["soak1"],
        shadow:       ["miraShade"],
        neutral:      ["campfire"],
    };

    const spells = startingSpells[classId] || [];
    spells.forEach(spellId => {
        if (skillTree[spellId]) {
            skillTree[spellId].unlocked = true;
            if (!p.skills.includes(spellId)) {
                p.skills.push(spellId);
            }
        }
    });
}

function nameSelection(onComplete) {
    let filterBypassed = false;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'name-selection-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.85);
        z-index: 9999999;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
    `;

    // Create box
    const box = document.createElement('div');
    box.style.cssText = `
        background: #1a1a1a;
        border: 1px solid #444;
        padding: 32px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        min-width: 300px;
    `;

    // Title
    const title = document.createElement('h2');
    title.textContent = 'What is your name?';
    title.style.cssText = `color: white; margin: 0; font-size: 1.4rem;`;

    // Input
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 32;
    input.placeholder = 'Enter your name...';
    input.style.cssText = `
        background: #2a2a2a;
        border: 1px solid #555;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
        outline: none;
    `;

    // Bypass indicator (hidden by default)
    const bypassIndicator = document.createElement('p');
    bypassIndicator.style.cssText = `color: #2ed573; margin: 0; font-size: 0.85rem; display: none;`;
    bypassIndicator.textContent = '✓ Filter bypassed.';

    // Error message (hidden by default)
    const error = document.createElement('p');
    error.style.cssText = `color: #ff4757; margin: 0; font-size: 0.9rem; display: none;`;
    error.textContent = 'That name is not allowed. Please try a different name.';

    // Confirm button
    const btn = document.createElement('button');
    btn.textContent = 'Confirm';
    btn.style.cssText = `
        background: #2ed573;
        color: #000;
        border: none;
        padding: 8px 24px;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        width: 100%;
    `;
    btn.addEventListener('mouseenter', () => btn.style.background = '#26b560');
    btn.addEventListener('mouseleave', () => btn.style.background = '#2ed573');

    // Confirm logic
    async function confirmName() {
        const name = input.value.trim();

        if (!name) {
            error.textContent = 'Please enter a name.';
            error.style.display = 'block';
            return;
        }

        // Check if the input matches the bypass code
        try {
            await argon2.verify({
                pass: name,
                encoded: name_code
            });
            // Code matched — bypass filter and ask again
            filterBypassed = true;
            bypassIndicator.style.display = 'block';
            error.style.display = 'none';
            input.value = '';
            input.focus();
            return;
        } catch (e) {
            // log(`${e}`)
            // if not the code, continue normally
        }

        if (!filterBypassed) {
            const nameLower = name.toLowerCase();
            const blocked = filteredWords.some(entry => {
                const w = entry.word.toLowerCase();
                if (entry.mode === "strict") {
                    return nameLower === w;
                } else if (entry.mode === "loose") {
                    return nameLower.includes(w);
                }
                return false;
            });

            if (blocked) {
                error.textContent = 'That name is not allowed. Please try a different name.';
                error.style.display = 'block';
                input.value = '';
                input.focus();
                return;
            }
        }

        // Name passed
        p.name = name;
        localStorage.setItem("luxsRPGplayerName", name);
        overlay.remove();
        document.body.style.pointerEvents = 'auto';
        updateUI();
        // Hands off to class selection during the new-save flow. Called bare
        // (e.g. after /clearname) there's no callback and nothing follows.
        if (typeof onComplete === 'function') onComplete();
    }

    btn.addEventListener('click', confirmName);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') confirmName();
    });

    box.appendChild(title);
    box.appendChild(input);
    box.appendChild(bypassIndicator);
    box.appendChild(error);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.style.pointerEvents = 'auto';
    document.body.appendChild(overlay);

    // Focus input immediately
    setTimeout(() => input.focus(), 50);
}

function checkSpaceAndAddItem(itemToAdd) {
    for (let i = 1; i <= 20; i++) { // change the last number in this if I ever increase inventory size
        if (p.inventory[`slot${i}`] === "empty") {
            tryAddItem(itemToAdd);
            return;
        }
    }
    log(`Unable to pick up ${itemToAdd}`, "var(--gold)")
}

function LuxLog(luxlogstring1) {
    let luxcolor = 'var(--lux)';
    log(luxlogstring1, luxcolor);
};

// A global handler to kill any event it catches
function blockHandler(e) {
    e.stopImmediatePropagation(); // Stops other listeners on the same element
    e.stopPropagation();          // Stops the event from moving down to children
    e.preventDefault();           // Stops default actions like link navigation
}

// Function to freeze the page
function disablePageClicks() {
    const events = ['click', 'mousedown', 'mouseup', 'keydown', 'touchstart'];
    events.forEach(evt => {
        window.addEventListener(evt, blockHandler, true);
    });
    document.body.style.cursor = 'default';
}

// Function to unfreeze the page
function enablePageClicks() {
    const events = ['click', 'mousedown', 'mouseup', 'keydown', 'touchstart'];
    events.forEach(evt => {
        window.removeEventListener(evt, blockHandler, true);
    });
    document.body.style.cursor = 'default';
}

function updateUI() {
    // Helper to calculate percentage safely for BigInt
    // Multiplies by 100n first to maintain precision during BigInt division, then converts to Number for CSS width.
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
    document.getElementById('sn-bar').style.width = snPerc + "%"
    // 2. LV and EXP Progress Bar
    // Math.pow doesn't work with BigInt. Use a loop or scale it. (I hate the fact that any Math. fucntion doesn't work with BigInt; had to make a replacement library)
    // Example: 1.2^x is roughly (12^x / 10^x). 
    // For simplicity, if Level isn't huge, convert to Number for the exponent math:
    let nextLevelExp = 0n;
    try {
        let expRequired = 100 * Math.pow(1.2, Number(p.lv) - 1);
        nextLevelExp = expRequired >= Number.MAX_SAFE_INTEGER ? BigInt(Number.MAX_SAFE_INTEGER) : BigInt(Math.floor(expRequired));
    } catch(e) {
        log(`EXP Error: ${e} | p.lv value: ${p.lv}`, "#ff4757");
    }
    document.getElementById('lv-txt').innerText = formatNumber(p.lv);
    document.getElementById('exp-val').innerText = `${formatNumber(p.exp)}/${formatNumber(nextLevelExp)}`;
    document.getElementById('exp-bar').style.width = Math.min(100, getPercent(p.exp, nextLevelExp)) + "%";
    // 3. Currency and Resources
    document.getElementById('gold-txt').innerText = formatNumber(p.gold);
    document.getElementById('sp-txt').innerText = formatNumber(p.sp);
    document.getElementById('day-txt').innerText = formatNumber(p.day);
    // 3.5. Sidebar (veeery long)
    document.getElementById('side-mhp').innerText = formatNumber(p.mhp);
    document.getElementById('side-hp').innerText  = formatNumber(p.hp);
    document.getElementById('side-lv').innerText = p.lv.toString();
    document.getElementById('side-gold').innerText = formatNumber(p.gold);
    document.getElementById('side-totalgold').innerText = formatNumber(p.totalGold);
    document.getElementById('side-currentgems').innerText = formatNumber(p.gems);
    document.getElementById('side-mmp').innerText = formatNumber(p.mmp);
    document.getElementById('side-mp').innerText = formatNumber(p.mp);
    document.getElementById('side-msn').innerText = formatNumber(p.msn);
    document.getElementById('side-sn').innerText = formatNumber(p.sn);
    document.getElementById('side-exp').innerText = formatNumber(p.exp);
    document.getElementById('side-sp').innerText = formatNumber(p.sp);
    document.getElementById('side-kills').innerText = formatNumber(p.kills);
    document.getElementById('side-spares').innerText = formatNumber(p.spares);
    let expRemaining = nextLevelExp - p.exp;
    document.getElementById('side-next-exp').innerText = formatNumber(expRemaining);
    // Multipliers: If manaReduction is stored as BigInt (e.g., 5n for 5%), 
    // just display it. If it's a scaled decimal (e.g., 500n where 10000n = 1.0), divide.
    document.getElementById('side-red').innerText = p.manaReduction.toString() + "%";
    // Damage Multiplier (Assuming stored as fixed-point, e.g., 105n = 1.05x)
    let dmgMultPercent = p.dmgmult - 100n 
    document.getElementById('side-dmgmult').innerText = "+" + formatNumber(dmgMultPercent) + "%";
    document.getElementById('equipped-weapon').innerText = `Currently equipped weapon: ${(!p.inventory.equippedWeapon || p.inventory.equippedWeapon === "empty") ? "None" : p.inventory.equippedWeapon}`;
    document.getElementById('side-class').innerText = `Class: ${(!p.class || p.class === null) ? "None" : getClassName(p.class)}`;
    const diffEl = document.getElementById('side-difficulty');
    if (diffEl && typeof DIFFICULTY_PRESETS !== 'undefined') {
        const preset = DIFFICULTY_PRESETS[p.difficulty ?? 'easy'] || DIFFICULTY_PRESETS.easy;
        diffEl.innerText = preset.label;
        diffEl.style.color = preset.color;
    }
    // 4. Enemy Stats
    if (enemy) {
        document.getElementById('e-hp-txt').innerText = `HP: ${formatNumber(enemy.hp)} / ${formatNumber(enemy.mhp)}`;
        document.getElementById('e-hp-bar').style.width = Math.max(0, Math.min(100, getPercent(enemy.hp, enemy.mhp))) + "%";
        document.getElementById('e-name-text').innerText = enemy.name;
        renderStatusIcons();
        document.getElementById('e-traits').innerText = enemy.trait || "No known traits.";
    }

    // 5. Keep the shop shelf honest if an EXP gain moved the player's LV, and
    //    the refresh button honest if their gem count moved.
    //    Both no-op instantly unless the shop is actually open.
    refreshShopPrices();
    renderShopRefreshButton();

    // 6. Award anything the player has just qualified for.
    if (typeof checkAchievements === "function") checkAchievements();
}

function showTab(tabName) {
    const stats = document.getElementById('stats-content');
    const inventory = document.getElementById('inventory-content');
    if (tabName === 'stats') {
        stats.style.display = 'block';
        inventory.style.display = 'none';
    } else {
        stats.style.display = 'none';
        inventory.style.display = 'block';
        updateInventoryUI();
    }
}

function updateInventoryUI() {
    const invList = document.getElementById('inventory-list');
    if (!invList) return;

    invList.innerHTML = '';

    const slots = [];

    for (let i = 1; i <= 20; i++) {
        let isUnlocked = false;

        if (i <= 5) {
            isUnlocked = true;
        } else if (i >= 6 && i <= 10) {
            isUnlocked = p.inventory.slot610Unlocked;
        } else if (i >= 11 && i <= 20) {
            isUnlocked = p.inventory.slot1120Unlocked;
        }

        slots.push({ id: `slot${i}`, unlocked: isUnlocked });
    }

    const tip = document.getElementById('tooltip');

    slots.forEach(slot => {
        if (slot.unlocked) {
            const itemName = p.inventory[slot.id];
            const slotDiv = document.createElement('div');

            slotDiv.className = 'inventory-slot';
            slotDiv.style = "padding: 10px; margin-bottom: 8px; background: #2f3542; border-radius: 4px; border: 1px solid #57606f; display: flex; justify-content: space-between; align-items: center; cursor: pointer;";

            if (!itemName || itemName === "empty") {
                slotDiv.innerHTML = `<span style="color: #747d8c;">[Empty Slot]</span>`;
            } else {
                const itemData = inventoryItems.find(i => i.name.toLowerCase() === itemName.toLowerCase());

                slotDiv.innerHTML = `
                    <b style="${getRarityStyle(itemData?.rarityColor)}">
                        ${itemName}
                    </b>
                    <button onclick="useItem('${slot.id}')" style="cursor: pointer; padding: 2px 5px;">Use</button>
                `;

                const updateTipPos = (e) => {
                    let x = e.clientX + 15;
                    let y = e.clientY + 15;
                    let tipH = tip.offsetHeight;
                    let winW = window.innerWidth;
                    let winH = window.innerHeight;

                    if (x + 200 > winW) x = e.clientX - 215;
                    if (y + tipH > winH) y = winH - tipH - 10;

                    tip.style.left = x + 'px';
                    tip.style.top = y + 'px';
                };

                slotDiv.onmouseenter = (e) => {
                    if (itemData) {
                        const rColor = itemData.rarityColor || "#a4b0be";
                        const rarityName = itemData.rarity || "No Rarity";

                        let html = `<strong>${itemData.name}</strong><br>`;
                        html += `<span style="${getRarityStyle(rColor)} font-size: 0.8em; font-weight: bold;">${rarityName.toUpperCase()}</span>`;
                        html += `<hr style="border:0;border-top:1px solid #444;margin:5px 0">`;
                        html += `<small>${itemData.description}</small>`;

                        if (itemData.info && itemData.info.length > 0) {
                            html += `<div style="margin-top: 8px;">`;
                            itemData.info.forEach(stat => {
                                const finalValue = typeof stat.value === 'function' ? stat.value() : stat.value;
                                const prefix = finalValue > 0 ? "+" : "";
                                const color = finalValue > 0 ? "#2ed573" : "#ff4757";
                                html += `<div style="color: ${color}; font-size: 0.85em;">
                                            ${prefix}${formatNumber(finalValue)} ${stat.label}
                                        </div>`;
                            });
                            html += `</div>`;
                        }

                        tip.innerHTML = html;
                        tip.style.display = 'block';
                        updateTipPos(e);
                    }
                };

                slotDiv.onmousemove = (e) => updateTipPos(e);
                slotDiv.onmouseleave = () => { tip.style.display = 'none'; };
            }

            invList.appendChild(slotDiv);
        }
    });
}

function getRarityStyle(rarityColor) {
    const color = rarityColor || 'var(--gold)';
    if (color.includes('gradient')) {
        return `display: inline-block; background: ${color}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;`;
    }
    return `color: ${color};`;
}


function useItem(slotId) {
    const itemName = p.inventory[slotId];
    if (!itemName || itemName === "empty") return;
    const itemData = inventoryItems.find(i => i.name.toLowerCase() === itemName.toLowerCase());
    if (itemData && typeof itemData.run === "function") {
        itemData.run();
        p.inventory[slotId] = "empty";
        document.getElementById('tooltip').style.display = 'none';
        playItemUseSFX();
        updateInventoryUI();
    } else {
        console.error("Item data or run function not found for:", itemName);
        log(`Funfriend: Item data or run function not found for: ${itemName}`, "var(--funfriend)")
    }
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
    const basicUnits = ["", "K", "M", "B", "T"];
    if (tier < basicUnits.length) {
        suffix = basicUnits[tier];
    } else if (tier <= 1000) {
        // latin programmatic generation (Tiers 5 to 1000)
        suffix = getLatinAbbreviation(tier - 1);
    } else {
        // letter notation (Tiers > 1000)
        // starts at "aa" for the 1001st tier
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

function handleDailyResources() {
    let manaLossScalingFactor = p.day; 
    let manaRegainedScalingFactor = BigInt(p.lv);
    if (p.sn > 0n) {
        let manaRegained = 100n * manaRegainedScalingFactor;
        p.mp = BigMath.min(p.mp + manaRegained, p.mmp);
        log(`Resting between days restores mana... (${formatNumber(manaRegained)} Mana Regained)`, "var(--mana)");
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: And why would I talk to you?`,"#ff0000")
            } else {
                log(`Lux: Your reliance on rest is a testament to your frailty. Perhaps if you were less lazy, you would have achieved your goal by now.`, "var(--lux)");
            }
        }
    } else {
        let manaLost = 50n * manaLossScalingFactor;
        p.mp = BigMath.max(p.mp - manaLost, 0n);
        if (p.kills >= 1000000n) {
            log(`Lux consumes your essence with much more ferocity... (${formatNumber(manaLost * 2n)} Mana Lost)`,"#ff0000")
        } else {
            log(`Lux consumes your essence... (${formatNumber(manaLost)} Mana Lost)`, "var(--sanity)");
        }
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: And why would I talk to you?`,"#ff0000")
            } else {
                log(`Lux: You let your mind fracture, and now I feast on the shards. Had you kept your wits, we might not have been in this... situation.`, "var(--lux)");
            }
        }
    }
    updateUI();
}

function nextDay() {
    p.day++;
    adminUnlocked = false;
    handleDailyResources();
    // Weighted Event Selection
    let totalWeight = dayEvents.reduce((sum, e) => sum + e.weight, 0);
    let roll = Math.random() * totalWeight;
    for (let event of dayEvents) {
        roll -= event.weight; // subtract first
        if (roll <= 0) { // then check if we hit zero
            event.run();
            return;  // exit immediately so you don't run multiple events; don't want that to happen :/
        }
    }
}

// Every shop cost is a getter that scales off p.lv, but the shelf is rendered
// once and never looked at again. Anything that grants EXP while the shop is
// open — a tarot card, a Knowledge Scroll, a loot box — can level you up and
// silently change every price behind the numbers on screen. Re-read them.
function refreshShopPrices() {
    const shopView = document.getElementById('shop-view');
    if (!shopView || shopView.classList.contains('hidden')) return;

    document.querySelectorAll('#shop-shelf .shop-item').forEach(div => {
        const item = masterShop.find(i => i.id === div.dataset.itemId);
        const costEl = div.querySelector('.shop-cost');
        if (!item || !costEl) return;

        const current = formatNumber(item.cost);
        if (costEl.textContent === current) return;

        costEl.textContent = current;
        // Flash it, so a price moving mid-visit isn't a silent surprise.
        costEl.style.color = 'var(--hp)';
        setTimeout(() => { costEl.style.color = ''; }, 1200);
    });
}

// "Refresh Shop": re-roll the shelf for gems, a limited number of times per visit.
const SHOP_REFRESH_GEM_COST = 2n;
const SHOP_REFRESHES_PER_VISIT = 3;
let shopRefreshesLeft = 0;

function startShop() {
    LuxShopTalkChance = Math.random()
    if (LuxShopTalkChance < 0.05) {
        if (p.kills >= 1000000n) {
                log(`Lux: You know. After all these times of asking Luxander to try and remove Bob, I feel bad for him. He doesn't deserve to be in this position.`,"#ff0000")
                log("Bob is no longer whistling a tune. He's shaking like a leaf. You wonder why.", "var(--gold)");
            } else {
            log(`Lux: Oh, it's Bob again. I swear I'm going to...`, "var(--lux)");
            setTimeout(() => {
                log(`Lux: ...actually, never mind. Buy your trinkets. I'm going to ask Luxander to change some stuff real quick. I want him to remove Bob.`, "var(--lux)");
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
    shopRefreshesLeft = SHOP_REFRESHES_PER_VISIT; // fresh allowance each visit
    stockShopShelf();
}

// Rolls the shelf and draws it. Split out of startShop() so "Refresh Shop"
// can re-roll without replaying Bob's greeting or resetting the allowance.
function stockShopShelf() {
    const shelf = document.getElementById('shop-shelf');
    shelf.innerHTML = "";
    let currentLv = p.lv
    let spares = p.spares;
    // Geno Scaling: Based on LV (since Pacifists stay LV 1)
    let genoCount = 
        currentLv <= 5n  ? 5  :
        currentLv <= 10n ? 9  :
        currentLv <= 15n ? 13 :
        currentLv <= 20n ? 17 : 20;
    // Pacifist Scaling: Based on Spares (since Genos have 0 spares)
    let pacifistCount = 
        spares <= 100n ? 5  :
        spares <= 150n ? 9  :
        spares <= 200n ? 13 :
        spares <= 250n ? 17 : 20;
    // Pick the higher count so either playstyle works
    let itemCount = Math.max(genoCount, pacifistCount);
    // 2. Filter out items
    let availableItems = masterShop.filter(item => {
        if ((item.id === 'manastabilizer' || item.id === 'manastabilizer2') && p.manaReduction >= 100n) return false;
        if (p.inventory.slot610Unlocked === true && item.id === 'slot610unlocker') return false;
        if (p.inventory.slot1120Unlocked === true && item.id === 'slot1120unlocker') return false;
        if (p.flags.storageUnlocked === true && item.id === 'storageUnit') return false;
        if (p.flags.storageUnlocked === false && item.id === 'storageUnitUpgrade1') return false;
        if (p.flags.storageUnlocked === false && item.id === 'storageUnitUpgrade2') return false;
        if (p.flags.storageUnlocked === false && item.id === 'storageUnitUpgrade3') return false;
        return true;
    });
    let items = [];
    let pool = [...availableItems]; // Copy the pool so we can remove items as we pick them
    while (items.length < itemCount && pool.length > 0) {
        // Calculate total weight of the CURRENT pool
        let totalWeight = pool.reduce((sum, item) => sum + (item.weight || 10), 0);
        
        let roll = Math.random() * totalWeight;
        for (let i = 0; i < pool.length; i++) {
            let itemWeight = pool[i].weight || 10;
            if (roll < itemWeight) {
                // Pick this item
                items.push(pool[i]);
                // Remove from pool so it isn't picked twice
                pool.splice(i, 1);
                break;
            }
            roll -= itemWeight;
        }
    }
    // 5. Render the items
    items.forEach((item, index) => {
        const tip = document.getElementById('tooltip');

        let div = document.createElement('div');
        div.className = "shop-item";
        // Tagged so refreshShopPrices() can re-read this entry's cost getter
        // if the player's LV changes while the shelf is on screen.
        div.dataset.itemId = item.id;

        div.innerHTML = `
            <strong>${item.name}</strong><br>
            <span class="shop-cost">${formatNumber(item.cost)}</span>g<br>
            <button id="shop-btn-${index}" style="margin-top:10px"
                onclick="buyItem('${item.id}', 'shop-btn-${index}')">Acquire</button>`;

        shelf.appendChild(div);

        const itemData = inventoryItems.find(i => i.id === item.id) || masterShop.find(i => i.id === item.id) || item;

        const btn = document.getElementById(`shop-btn-${index}`);

        const updateTipPos = (e) => {
            let x = e.clientX + 15;
            let y = e.clientY + 15;
            let tipH = tip.offsetHeight;
            let winW = window.innerWidth;
            let winH = window.innerHeight;

            if (x + 200 > winW) x = e.clientX - 215;
            if (y + tipH > winH) y = winH - tipH - 10;

            tip.style.left = x + 'px';
            tip.style.top = y + 'px';
        };

        btn.onmouseenter = (e) => {
            const rColor = itemData.rarityColor || "#a4b0be";
            const rarityName = itemData.rarity || "No Rarity";

            let html = `<strong>${itemData.name}</strong><br>`;
            html += `<span style="${getRarityStyle(rColor)} font-size: 0.8em; font-weight: bold;">${rarityName.toUpperCase()}</span>`;
            html += `<hr style="border:0;border-top:1px solid #444;margin:5px 0">`;
            html += `<small>${itemData.description}</small>`;

            if (itemData.info && itemData.info.length > 0) {
                html += `<div style="margin-top: 8px;">`;
                itemData.info.forEach(stat => {
                    const finalValue = typeof stat.value === 'function' ? stat.value() : stat.value;
                    const prefix = finalValue > 0 ? "+" : "";
                    const color = finalValue > 0 ? "#2ed573" : "#ff4757";
                    html += `<div style="color: ${color}; font-size: 0.85em;">
                                ${prefix}${formatNumber(finalValue)} ${stat.label}
                            </div>`;
                });
                html += `</div>`;
            }

            tip.innerHTML = html;
            tip.style.display = 'block';
            updateTipPos(e);
        };


        btn.onmousemove = (e) => updateTipPos(e);
        btn.onmouseleave = () => { tip.style.display = 'none'; };
    });

    renderShopRefreshButton();
}

function renderShopRefreshButton() {
    const shopView = document.getElementById('shop-view');
    if (!shopView || shopView.classList.contains('hidden')) return;

    const btn = document.getElementById('shop-refresh-btn');
    if (!btn) return;

    const gems = p.gems ?? 0n;
    const outOfUses = shopRefreshesLeft <= 0;
    const tooPoor = gems < SHOP_REFRESH_GEM_COST;

    btn.disabled = outOfUses || tooPoor;
    btn.style.opacity = btn.disabled ? '0.5' : '1';
    btn.style.cursor = btn.disabled ? 'not-allowed' : 'pointer';

    if (outOfUses) {
        btn.innerText = `Refresh Shop — none left (you have ${formatNumber(gems)} gems)`;
    } else {
        btn.innerText = `Refresh Shop — ${formatNumber(SHOP_REFRESH_GEM_COST)} gems `
                      + `(${shopRefreshesLeft} left, you have ${formatNumber(gems)})`;
    }
}

function refreshShop() {
    if (shopRefreshesLeft <= 0) {
        log(`Bob has nothing left to dig out of his cart this visit.`, "#ff4757");
        playCantSelectSFX();
        return;
    }

    const gems = p.gems ?? 0n;
    if (gems < SHOP_REFRESH_GEM_COST) {
        log(`Refreshing the shop costs ${formatNumber(SHOP_REFRESH_GEM_COST)} gems. You have ${formatNumber(gems)}.`, "#ff4757");
        playCantSelectSFX();
        return;
    }

    p.gems = gems - SHOP_REFRESH_GEM_COST;
    shopRefreshesLeft--;
    if (typeof awardAchievement === "function") awardAchievement("refreshedShop");

    playShopBuySFX();
    log(`Bob rummages through his cart and lays out new stock. `
      + `(-${formatNumber(SHOP_REFRESH_GEM_COST)} gems, ${shopRefreshesLeft} refresh${shopRefreshesLeft === 1 ? '' : 'es'} left)`,
        "var(--epicItem)");

    if (Math.random() < 0.05) {
        if (p.kills >= 1000000n) {
            log(`Lux: He's only showing you more because he's terrified of what you'll do if he doesn't.`, "#ff0000");
        } else {
            LuxLog(`Lux: Picky, aren't you.`);
        }
    }

    stockShopShelf();
    updateUI();
}

function buyItem(id, btnId) {
    let item = masterShop.find(i => i.id === id);
    if (!item) return;

    // Snapshot the price before anything runs: every cost is a getter that
    // scales off p.lv, and some items (tarot cards, treasure maps) move p.lv
    // or p.gold themselves. The player pays what the shelf said.
    const cost = item.cost;

    if (p.gold < cost) {
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                    log(`Lux: Broke, broke, broke. Do I sound like I care?`,"#ff0000")
                } else {
                    log(`Lux: You're broke. The result of spending gold on stuff you don't need.`,"var(--lux)");
                }
        } else {
            log("You lack the coin. This world is not for the poor...", "#ff4757");
        }
        playCantSelectSFX();
        return;
    }

    // Attempt the purchase BEFORE charging. Anything that needs an inventory
    // slot returns false when there's no room, and then nothing is taken and
    // the item stays on the shelf.
    const result = item.run();
    if (result === false) {
        log(`Your inventory is full. Nothing was bought and no gold was taken.`, "#ff4757");
        playCantSelectSFX();
        return;
    }

    p.gold -= cost;
    if (result) log(result, "var(--unlocked)");

    let btn = document.getElementById(btnId);
    if (btn) {
        btn.disabled = true;
        btn.innerText = Math.random() < 0.05 ? "=)" : "Sold Out";
    }
    const combatView = document.getElementById('combat-view');
    if (combatView && !combatView.classList.contains('hidden')) {
        renderCombatButtons();
    }
    playShopBuySFX();
    updateUI();
}

function tryAddItem(itemName) {
    for (let i = 1; i <= 20; i++) {
        let slotKey = `slot${i}`;
        let isUnlocked = false;
        // Logic for bulk unlock flags
        if (i <= 5) {
            isUnlocked = true; // First 5 always open
        } else if (i <= 10) {
            isUnlocked = p.inventory.slot610Unlocked; // Check 6-10 flag
        } else if (i <= 20) {
            isUnlocked = p.inventory.slot1120Unlocked; // Check 11-20 flag
        }
        // Check if unlocked AND empty (ignores "null")
        if (isUnlocked && p.inventory[slotKey] === "empty") {
            p.inventory[slotKey] = itemName;
            if (typeof updateInventoryUI === "function") updateInventoryUI();
            return true;
        }
    }
    return false;
}


function positionTooltip(e, tip) {
    // Convert to BigInt - Math methods are not compatible with BigInt (annoyingly)
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

// Which tab the spell tree is currently showing. This lives outside renderTree()
// on purpose: renderTree() gets called again after every purchase, and if the
// selection lived inside it, buying a Physical or General skill would snap the
// view back to your class tree mid-shopping.
let activeSkillTree = null;

function openTree() {
    document.getElementById('main-controls').classList.add('hidden');
    document.getElementById('tree-view').classList.remove('hidden');
    activeSkillTree = p.class; // a fresh open always starts on your own class
    renderTree();
}

function renderTree() {
    const container = document.getElementById('tree-nodes');
    container.innerHTML = "";

    // Sync unlocked state from p.skills
    p.skills.forEach(skillId => {
        if (skillTree[skillId]) {
            skillTree[skillId].unlocked = true;
        }
    });

    const weaponSkills = ["charaKnife", "noxNocturnalBeam", "noxNocturnalExplosion", "noxNocturnalSiphon", "fryingPan"];

    const relevantTrees = ["general", "physical", p.class];
    const relevantSkills = Object.keys(skillTree).filter(id => {
        const s = skillTree[id];
        return relevantTrees.includes(s.tree) && !weaponSkills.includes(id);
    });

    const allUnlocked = relevantSkills.every(id => skillTree[id].unlocked === true);

    if (allUnlocked) {
        let controlDiv = document.createElement('div');
        controlDiv.style = "grid-column: span 3; margin-bottom: 15px; text-align: center; color:#aaa; font-size:0.8em;";
        controlDiv.innerHTML = `
            You have <b style="color:var(--exp)">${formatNumber(p.sp)}</b> SP.
            Each button spends up to that much SP on a mastery.
        `;
        container.appendChild(controlDiv);

        const masteryOptions = [
            { name: "Vitality Mastery",   stat: "mhp",           color: "var(--hp)",       desc: "Max HP" },
            { name: "Magic Mastery",       stat: "mmp",           color: "var(--mana)",     desc: "Max Mana" },
            { name: "Clarity Mastery",     stat: "msn",           color: "var(--sanity)",   desc: "Max Sanity" },
            { name: "War Mastery",         stat: "dmgmult",       color: "#ff0000",         desc: "Damage Multiplier" },
            { name: "Efficiency Mastery",  stat: "manaReduction", color: "var(--unlocked)", desc: "Mana Efficiency" }
        ];

        masteryOptions.forEach(opt => {
            if (opt.stat === 'manaReduction' && p.manaReduction >= 100n) {
                let maxDiv = document.createElement('div');
                maxDiv.className = "node purchased";
                maxDiv.style.borderColor = opt.color;
                maxDiv.innerHTML = `
                    <strong>${opt.name}</strong><br>
                    <span style="color:var(--unlocked)">PERFECTED</span><br>
                    <small style="color:#666">100% Efficiency reached.</small>
                `;
                container.appendChild(maxDiv);
                return;
            }

            const nextCost = masteryLevelCost(opt.stat);

            let div = document.createElement('div');
            div.className = "node available";
            div.style.borderColor = opt.color;
            div.style.cursor = "default";

            const escalatingNote = opt.stat === 'dmgmult'
                ? `<br><small style="color:#aaa">${formatNumber(p.warMasteryLevels ?? 0n)} bought &middot; each one costs 1 SP more</small>`
                : '';

            div.innerHTML = `
                <strong>${opt.name}</strong><br>
                Next level: <b style="color:var(--exp)">${formatNumber(nextCost)}</b> SP<br>
                <small style="color:#aaa">+1% ${opt.desc} per level</small>
                ${escalatingNote}
            `;

            const btnRow = document.createElement('div');
            btnRow.style.cssText = `
                display: flex; flex-wrap: wrap; gap: 4px;
                justify-content: center; margin-top: 10px;
            `;

            MASTERY_BUY_OPTIONS.forEach(buyOpt => {
                const budget = buyOpt.budget === 'max' ? p.sp : buyOpt.budget;
                let levels = masteryLevelsAffordable(opt.stat, budget > p.sp ? p.sp : budget);
                if (opt.stat === 'manaReduction') {
                    const roomLeft = 100n - p.manaReduction;
                    if (levels > roomLeft) levels = roomLeft;
                }
                if (levels > MASTERY_MAX_LEVELS_PER_PURCHASE) levels = MASTERY_MAX_LEVELS_PER_PURCHASE;
                const affordable = levels >= 1n;

                const btn = document.createElement('button');
                btn.textContent = buyOpt.label;
                btn.disabled = !affordable;
                btn.title = affordable
                    ? `Spends ${formatNumber(masterySpendFor(opt.stat, levels))} SP for ${formatNumber(levels)} level${levels === 1n ? '' : 's'}`
                    : `Not enough SP — the next level costs ${formatNumber(nextCost)}`;
                btn.style.cssText = `
                    min-width: 38px; padding: 4px 8px;
                    background: ${affordable ? '#1a1a2e' : '#15151c'};
                    border: 1px solid ${affordable ? opt.color : '#2f3542'};
                    color: ${affordable ? 'var(--text)' : '#555'};
                    border-radius: 4px;
                    cursor: ${affordable ? 'pointer' : 'not-allowed'};
                    font-family: 'Fira Code', monospace; font-size: 11px;
                `;
                btn.onclick = () => buyMastery(opt.stat, buyOpt.budget);
                btnRow.appendChild(btn);
            });

            div.appendChild(btnRow);
            container.appendChild(div);
        });

    } else {
        const tabs = [
            { id: p.class,    label: getClassName(p.class) },
            { id: "physical", label: "Physical" },
            { id: "general",  label: "General"  },
        ];

        const tabBar = document.createElement('div');
        tabBar.style.cssText = "grid-column: span 3; display: flex; gap: 8px; margin-bottom: 15px;";

        // Fall back to the class tree only if nothing is selected yet, or if the
        // stored tab is stale (class change, imported save).
        if (!activeSkillTree || !tabs.some(t => t.id === activeSkillTree)) {
            activeSkillTree = p.class;
        }

        tabs.forEach(tab => {
            const btn = document.createElement('button');
            btn.textContent = tab.label;
            btn.style.cssText = `
                flex: 1;
                background: ${activeSkillTree === tab.id ? 'var(--mana)' : '#2f3542'};
                color: white;
                border: none;
                border-radius: 8px;
                padding: 8px;
                cursor: pointer;
                font-weight: bold;
            `;
            btn.onclick = () => {
                activeSkillTree = tab.id;
                renderTabContent(tab.id);
                playMenuButtonClickSFX();
                tabBar.querySelectorAll('button').forEach((b, i) => {
                    b.style.background = tabs[i].id === activeSkillTree ? 'var(--mana)' : '#2f3542';
                });
            };
            tabBar.appendChild(btn);
        });

        container.appendChild(tabBar);

        const contentArea = document.createElement('div');
        contentArea.id = "tree-tab-content";
        contentArea.style.cssText = "grid-column: span 3; display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;";
        container.appendChild(contentArea);

        function renderTabContent(treeId) {
            contentArea.innerHTML = "";

            const treeSkills = Object.keys(skillTree).filter(id =>
                skillTree[id].tree === treeId && !weaponSkills.includes(id)
            );

            treeSkills.forEach(id => {
                const s = skillTree[id];
                const isParentUnlocked = !s.parent || skillTree[s.parent]?.unlocked;

                const div = document.createElement('div');
                div.className = `node ${s.unlocked ? 'purchased' : (isParentUnlocked ? 'available' : '')}`;

                const displayName = Math.random() < 0.05 ? "=)" : s.name;
                const displayCost = Math.random() < 0.05 ? "=)" : (s.unlocked ? 'Known' : s.cost + ' SP');

                // Description — only show if the spell has one
                const descHtml = s.description
                    ? `<br><small style="color:#a4b0be; font-style:italic; display:block; margin-top:4px;">${s.description}</small>`
                    : '';

                // Trait notes
                const backfireNote = s.backfireChance
                    ? `<br><small style="color:#ff4757">⚠ ${(s.backfireChance * 100).toFixed(0)}% backfire chance</small>`
                    : '';
                const fireNote = s.fireReduction
                    ? `<br><small style="color:#fb923c">🔥 Reduced vs fire enemies</small>`
                    : '';
                const waterNote = s.fireBonus
                    ? `<br><small style="color:#38bdf8">💧 2x vs fire enemies</small>`
                    : '';
                const shadowNote = s.luxBonus
                    ? `<br><small style="color:#c084fc">↑ vs Lux/Kitsune | ↓ vs Demons</small>`
                    : '';

                // Parent requirement note — only show if parent is locked
                const parentNote = s.parent && !skillTree[s.parent]?.unlocked
                    ? `<br><small style="color:#666">Requires: ${skillTree[s.parent]?.name || s.parent}</small>`
                    : '';

                div.innerHTML = `
                    <strong>${displayName}</strong><br>
                    ${displayCost}
                    ${descHtml}
                    ${backfireNote}
                    ${fireNote}
                    ${waterNote}
                    ${shadowNote}
                    ${parentNote}
                `;

                if (isParentUnlocked && !s.unlocked) {
                    div.onclick = () => buySkill(id);
                }

                contentArea.appendChild(div);
            });
        }

        renderTabContent(activeSkillTree);
    }
}

// Helper to get a readable class name from the class ID
function getClassName(classId) {
    const names = {
        astralMage:   "Astral Mage",
        stormmancer:  "Stormmancer",
        druid:        "Druid",
        flamemancer:  "Flamemancer",
        cryomancer:   "Cryomancer",
        watermancer:  "Watermancer",
        shadow:       "Shadow",
        neutral:      "Neutral",
    };
    return names[classId] || classId;
}

// The buy buttons on every mastery node. Each value is the SP budget to spend,
// not a level count — with War Mastery escalating, 10 SP is only 4 levels.
const MASTERY_BUY_OPTIONS = [
    { label: '1x',  budget: 1n  },
    { label: '2x',  budget: 2n  },
    { label: '5x',  budget: 5n  },
    { label: '10x', budget: 10n },
    { label: 'Max', budget: 'max' }
];

// War Mastery gets one SP more expensive with every level bought: the 1st costs
// 1 SP, the 2nd costs 2, and so on. Every other mastery stays flat at 1 SP.
function masteryLevelCost(stat) {
    if (stat === 'dmgmult') return (p.warMasteryLevels ?? 0n) + 1n;
    // Efficiency Mastery used to be a flat 1 SP a level, so the whole 100-point
    // track cost 100 SP — one Martyr's Book — and permanently switched the mana
    // system off. The cost now steps up every 10 points, making the full track
    // 550 SP. manaReduction is capped at 100 and moves 1 per level, so its
    // current value *is* the number of levels bought; no extra counter needed.
    if (stat === 'manaReduction') return 1n + (p.manaReduction / 10n);
    return 1n;
}

// Total SP for the next `levels` levels of a mastery.
function masterySpendFor(stat, levels) {
    if (levels < 1n) return 0n;
    if (stat === 'dmgmult') {
        // 1 + 2 + ... over an escalating counter: n*bought + n(n+1)/2
        const bought = p.warMasteryLevels ?? 0n;
        return levels * bought + (levels * (levels + 1n)) / 2n;
    }
    if (stat === 'manaReduction') {
        // Stepped cost, and the track is only 100 levels long, so walk it.
        let total = 0n, at = p.manaReduction;
        for (let i = 0n; i < levels; i++) { total += 1n + (at / 10n); at += 1n; }
        return total;
    }
    return levels;
}

// Most levels `budget` SP can buy. Binary search rather than a loop so that
// "Max" with a huge SP pile stays instant.
function masteryLevelsAffordable(stat, budget) {
    if (budget < 1n) return 0n;
    if (stat === 'manaReduction') {
        // Bounded by the 100% cap, so a plain walk is both exact and cheap.
        let levels = 0n, spent = 0n, at = p.manaReduction;
        const room = 100n - p.manaReduction;
        while (levels < room) {
            const next = 1n + (at / 10n);
            if (spent + next > budget) break;
            spent += next; at += 1n; levels += 1n;
        }
        return levels;
    }
    if (stat !== 'dmgmult') return budget;

    let lo = 0n, hi = budget;
    while (lo < hi) {
        const mid = (lo + hi + 1n) / 2n;
        if (masterySpendFor(stat, mid) <= budget) lo = mid; else hi = mid - 1n;
    }
    return lo;
}

// Applying a level is a loop (1% of the *current* value, floored, minimum 1),
// so a Max click on a huge SP pile could otherwise hang the page.
const MASTERY_MAX_LEVELS_PER_PURCHASE = 100000n;

function buyMastery(stat, budgetInput) {
    let budget = budgetInput === 'max' ? p.sp : BigInt(budgetInput ?? 1n);
    if (budget > p.sp) budget = p.sp;

    let levels = masteryLevelsAffordable(stat, budget);

    // Mana Reduction stops mattering at 100%, so don't let anyone overspend on it.
    if (stat === 'manaReduction') {
        const roomLeft = 100n - p.manaReduction;
        if (levels > roomLeft) levels = roomLeft;
    }

    let capped = false;
    if (levels > MASTERY_MAX_LEVELS_PER_PURCHASE) {
        levels = MASTERY_MAX_LEVELS_PER_PURCHASE;
        capped = true;
    }

    if (levels < 1n) {
        playCantSelectSFX();
        log(`You need ${formatNumber(masteryLevelCost(stat))} SP for the next level of this mastery.`, "#ff4757");
        return;
    }

    const spent = masterySpendFor(stat, levels);
    p.sp -= spent;
    let totalGain = 0n;

    for (let i = 0n; i < levels; i++) {
        let gain = (p[stat] * 1n) / 100n;
        if (gain < 1n) gain = 1n;
        p[stat] += gain;
        totalGain += gain;

        if (stat.startsWith('m') && stat !== 'manaReduction') {
            let currentKey = stat.substring(1);
            p[currentKey] += gain;
        }
    }

    if (stat === 'dmgmult') {
        p.warMasteryLevels = (p.warMasteryLevels ?? 0n) + levels;
    }

    if (stat === 'manaReduction' && p.manaReduction > 100n) p.manaReduction = 100n;

    log(`Mastery Transformed! Spent ${formatNumber(spent)} SP on ${formatNumber(levels)} level${levels === 1n ? '' : 's'} to increase ${stat.toUpperCase()} by ${formatNumber(totalGain)}.`, "var(--unlocked)");
    if (capped) {
        log(`(Capped at ${formatNumber(MASTERY_MAX_LEVELS_PER_PURCHASE)} levels per purchase — click again to keep going.)`, "var(--commonItem)");
    }
    playSpellMasteryBuySFX();

    if (Math.random() < 0.05) {
        if (p.kills >= 1000000n) {
            document.body.style.pointerEvents = "none";
            log(`Lux: More power, more power, and even more power. Honestly I'm kind of surprised you're still going. After all this time...`, "#ff0000");
            setTimeout(() => {
                log(`Lux: And yet I still hold the needle which will cause you to pop.`, "#ff0000");
                document.body.style.pointerEvents = "auto";
            }, 1000);
        } else {
            LuxLog(`Lux: Watching you swell with power is like watching a balloon inflate. I wonder when you'll pop?`);
        }
    }

    renderTree();
    updateUI();
}

function buySkill(id) {
    let s = skillTree[id];
    if (s.unlocked) return;

    const skillCost = BigInt(s.cost);

    if (p.sp >= skillCost) {
        p.sp -= skillCost;
        s.unlocked = true;
        p.skills.push(id);

        log(`Learned ${s.name}!`, "var(--unlocked)");
        playSpellMasteryBuySFX();

        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: More power, more power, and even more power. Honestly I'm kind of surprised you're still going. After all this time...`, "#ff0000");
            } else {
                log(`Lux: Congratulations. You got a new spell. Doesn't really help you anyway. I can still kill you just as easily as before.`, "var(--lux)");
            }
        }

        renderTree();
        updateUI();
    } else {
        log(`You need ${formatNumber(skillCost)} Skill Points to learn this.`, "#ff4757");
        playCantSelectSFX();

        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: Idiot. Idiot. Idiot. Idiot. IDIOT.`, "#ff0000");
            } else {
                log(`Lux: You lack the wisdom that I have. I'm still a god in this world anyway. You're nothing...`, "var(--lux)");
            }
        }
    }
}

function getScaledMana(baseCost) {
    // Convert baseCost to BigInt safely
    const base = BigInt(baseCost || 0);
    if (base === 0n) return 0n;    
    // Cost grows with the SQUARE ROOT of your max mana rather than linearly with
    // it. The old multiplier was floor(mmp / 200), which made casts-per-bar
    // (mmp / cost) a flat 200/base — so every point of max mana you bought was
    // cancelled out by the price rise, and Eldritch Orbs did nothing at all.
    // With sqrt, casts-per-bar is sqrt(mmp * 200)/base: a bigger pool is a real
    // upgrade, just a diminishing one.
    let multiplier = BigMath.sqrt(BigInt(p.mmp) / 200n);
    // Early game (under 200 max mana) the multiplier rounds to 0; spells should
    // still cost their base rather than becoming free.
    if (multiplier < 1n) multiplier = 1n;
    let scaledCost = base * multiplier;
    // Handle reduction percentage
    // Assuming p.manaReduction is a decimal like 0.1 (10%), 
    // we convert to BigInt math: (scaledCost * reduction) / 100
    // If manaReduction is stored as a whole number (e.g. 10), use that.
    let reductionPercent = BigInt(p.manaReduction || 0);
    let reductionAmount = (scaledCost * reductionPercent) / 100n;
    let finalCost = scaledCost - reductionAmount;
    return BigMath.max(finalCost, base);
}

function triggerShake() {
  document.body.classList.add('apply-shake');  
  // Remove class after 0.15 seconds so it can be re-triggered
  setTimeout(() => {
    document.body.classList.remove('apply-shake');
  }, 150);
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
            const elevatorMusic = new Audio("sfx/music/Elevator-music.mp3");
            let waitTime = (Math.random() < 0.001) ? 189000 : 12000;  
            elevatorMusic.loop = true;    
            document.body.style.pointerEvents = "none";
            log(`Lux: Damn it. I'm going to have to ask Luxander later. He's on a break right now.`, "var(--lux)");
            setTimeout(() => {
                log(`Funfriend: Lux has now gone on a break himself. He will be back in a bit. Enjoy the break yourself player. Go make a sandwich or something.`, "var(--funfriend)");
                elevatorMusic.play();   
            }, 1000);
            setTimeout(() => {
                elevatorMusic.pause();
                elevatorMusic.currentTime = 0;
                if (waitTime === 12000) {
                    log(`Lux: Alright I'm back. What did I miss? Oh. You didn't do anything. Thanks for waiting for me I guess.`, "var(--lux)");
                    document.body.style.pointerEvents = "auto";
                } else {
                    log(`Lux: Sorry, I actually finished the whole sandwich. Did you enjoy the music, or get a sandwich? I hope you <i>did</i> get a sandwich, as we're back to playing. Even if you didn't, I got you one.`, "var(--lux)");
                    if (p.inventory.slot1 === "empty" || p.inventory.slot2 === "empty" || p.inventory.slot3 === "empty" || p.inventory.slot4 === "empty" || p.inventory.slot5 === "empty" || p.inventory.slot6 === "empty" || p.inventory.slot7 === "empty" || p.inventory.slot8 === "empty" || p.inventory.slot9 === "empty" || p.inventory.slot10 === "empty" || p.inventory.slot11 === "empty" || p.inventory.slot12 === "empty" || p.inventory.slot13 === "empty" || p.inventory.slot14 === "empty" || p.inventory.slot15 === "empty" || p.inventory.slot16 === "empty" || p.inventory.slot17 === "empty" || p.inventory.slot18 === "empty" || p.inventory.slot19 === "empty" || p.inventory.slot20 === "empty") { // Do. Not. Fucking. Ask. Why. This. Is. Like. This.
                        tryAddItem("Lux's Sandwich")
                    } else {
                        let hpRegained = 150n * p.spares
                        p.hp += hpRegained
                        playHealSFX();
                        updateUI();
                        log(`Funfriend: Item "Lux's Sandwich" recived and eaten. Restored ${hpRegained} HP`, "var(--funfriend)")
                    }
                    document.body.style.pointerEvents = "auto";
                }
                closeUI(); // NOW we switch back to the main game
            }, waitTime);
        }
    } else {
        // Normal exit if Lux doesn't want to talk
        closeUI();
    }
}

function toggleExtrasMenu() {
    const menu = document.getElementById("extras-menu");
    const btn = document.getElementById("extras-button");
    const isHidden = menu.classList.toggle("hidden");
    btn.innerHTML = isHidden ? "Extras ⟁" : "Extras <span style='display:inline-block; transform:rotate(180deg);'>⟁</span>";
}

function closeExtrasMenu() {
    document.getElementById("extras-menu").classList.add("hidden");
    document.getElementById("extras-button").innerHTML = "Extras ⟁";
}
