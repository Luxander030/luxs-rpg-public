let p = {
    v: "4.2.0", // release version this save was written by; keep in step with
                  // version.txt, index.html and SAVE_VERSION in the save logic
    name: null,
    class: null,
    difficulty: null, // 'easy' | 'normal' | 'hard' | 'nightmarish' — see onboarding.js.
                      // Null (and any legacy save without the field) is read as 'easy'.
    bulletPatternImmortality: false,
    hp: 100n,
    mhp: 100n,
    mp: 50n,
    mmp: 50n,
    sn: 100n,
    msn: 100n,
    gold: 150n,
    gems: 0n,
    totalGold: 150n,
    exp: 0n,
    lv: 1n,
    sp: 0n,
    day: 1n,
    skills: ['strike', 'heal'], // Put heal as when it was just strike players were dying VERY QUICKLY
    manaReduction: 0n,  // Mana Reduction (0 is 0% reduction and base)
    kills: 0n,
    codesUsed: [],
    activeEffects: {
        stunned: 0n,
        burning: 0n,
        poison: 0n
    },
    uniqueEnemyKills: {
        // Normal enemies
        shadowImp: 0n,
        armoredBeetle: 0n,
        drowElf: 0n,
        elf: 0n,
        stoneGolem: 0n,
        ironGolem: 0n,
        // Glass Cannons
        glassCannon1: 0n,
        glassCannon2: 0n,
        glassCannon3: 0n,
        glassCannon4: 0n,
        glassCannon5: 0n,
        glassCannon6: 0n,
        glassCannon7: 0n,
        glassCannon8: 0n,
        glassCannon9: 0n,
        glassCannon10: 0n,
        // Sanity Drain Enemies
        voidStalker: 0n,
        gloomWeaver: 0n,
        nightmareShade: 0n,
        dreadPhantom: 0n,
        abyssalWatcher: 0n,
        // Lifesteal enemies
        bloodBat: 0n,
        vampire: 0n,
        vampireLord: 0n,
        vampireKing: 0n,
        // Elementals
        fireElemental: 0n,
        airElemental: 0n,
        waterElemental: 0n,
        earthElemental: 0n,
        iceElemental: 0n,
        // Mini-bosses
        diamondGolem: 0n,
        ironPlatedDiamondGolem: 0n,
        manaDrainingWisp: 0n,
        // FPE
        missCircle: 0n,
        missBloomie: 0n,
        missThavel: 0n,
        // Bosses
        fieryWillOWisp: 0n,
        willOWisp: 0n,
        duriel: 0n,
        obsidianGolem: 0n,
        gemGolem: 0n,
        // World Bosses
        azmodan: 0n,
        playerMirror: 0n,
        // Sins
        sloth: 0n,
        wrath: 0n,
        pride: 0n,
        lust: 0n,
        envy: 0n,
        gluttony: 0n,
        greed: 0n,
        // Lux
        kitsune: 0n,
        lux: 0n,
        bob: 0n,
        gerald: 0n
    },
    spares: 0n,
    dmgmult: 100n,
    warMasteryLevels: 0n, // War Mastery levels bought; each one makes the next cost 1 SP more
    inventory: { // Anything with "null" is a locked slot
        storage: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        equippedWeapon: "empty",
        slot1: "Apple",
        slot2: "empty",
        slot3: "empty",
        slot4: "empty",
        slot5: "empty",
        slot610Unlocked: false,
        slot6: "null",
        slot7: "null",
        slot8: "null",
        slot9: "null",
        slot10: "null",
        slot1120Unlocked: false,
        slot11: "null",
        slot12: "null",
        slot13: "null",
        slot14: "null",
        slot15: "null",
        slot16: "null",
        slot17: "null",
        slot18: "null",
        slot19: "null",
        slot20: "null",
    },
    achievements: {
        reached100Days: {
            completed: false,
            name: "A third of a year... ish.",
            color: "var(--commonItem)",
            description: "Unk",
            hint: "Just keep pressing explore onwards."
        },
        gotten1Mgold: {
            completed: false,
            name: "CAPITALISM!!!",
            color: "var(--uncommonItem)",
            description: "Get 1M gold. It's not that difficult.",
            hint: "Get 1M gold. It's not that difficult."
        },
        gottenFullManaReduction: {
            completed: false,
            name: "Cheapshot.",
            color: "var(--uncommonItem)",
            description: "Get 100% Mana Reduction",
            hint: "What could you decrease the price of?"
        },
        usedLuxLemon: {
            completed: false,
            name: "You really like sour stuff, don't you?",
            color: "var(--epicItem-gradient)",
            description: "You just had to eat it, didn't you. Eat Lux's homegrown sour lemons.",
            hint: "Enjoy the sourness :3",
        },
        usedLuxTriangle: {
            completed: false,
            name: "It's pointy, is it not?",
            color: "var(--epicItem-gradient)",
            description: "Use Lux's Triangle and get a message from Lux.",
            hint: "Pointy little thing"
        },
        usedLuxSandwich: {
            completed: false,
            name: "Mmm... yummers.",
            color: "var(--legendaryItem-gradient)",
            description: "Use Lux's Sandwich and get healing based on how kind you are.",
            hint: "SaNdWiCh"
        },
        reachedNegativeSanity: {
            completed: false,
            name: "...what?",
            color: "var(--insaneItem-gradient)",
            description: "Somehow reach negative sanity.",
            hint: "...how are you going to get negative sanity?"
        },
        firstBlood: {
            completed: false,
            name: "That's one.",
            color: "var(--commonItem)",
            description: "Kill your first creature.",
            hint: "Something out there isn't going to survive meeting you."
        },
        firstMercy: {
            completed: false,
            name: "You let it go.",
            color: "var(--commonItem)",
            description: "Spare your first creature.",
            hint: "Not everything has to end the same way."
        },
        reachedLv50: {
            completed: false,
            name: "Halfway to something.",
            color: "var(--uncommonItem)",
            description: "Reach LV 50.",
            hint: "Keep winning fights."
        },
        reached500Days: {
            completed: false,
            name: "Get some rest.",
            color: "var(--rareItem)",
            description: "Survive 500 days.",
            hint: "A third of a year clearly wasn't enough for you."
        },
        killed1000: {
            completed: false,
            name: "Four digits.",
            color: "var(--rareItem)",
            description: "Kill 1,000 creatures. Someone is counting.",
            hint: "Keep going. Somebody's watching the number."
        },
        spared1000: {
            completed: false,
            name: "Four digits, kinder.",
            color: "var(--rareItem)",
            description: "Spare 1,000 creatures. Someone is counting this one too.",
            hint: "Keep going. Somebody's watching this number as well."
        },
        filledInventory: {
            completed: false,
            name: "Pack rat.",
            color: "var(--uncommonItem)",
            description: "Fill every unlocked inventory slot at once.",
            hint: "Don't throw anything away."
        },
        richInGems: {
            completed: false,
            name: "Sparkly.",
            color: "var(--epicItem-gradient)",
            description: "Hold 1,000 gems at once.",
            hint: "Gold isn't the only thing worth hoarding."
        },
        masteredTree: {
            completed: false,
            name: "Nothing left to learn.",
            color: "var(--legendaryItem-gradient)",
            description: "Unlock every spell in your class tree.",
            hint: "Study. Then study more."
        },
        survivedNightmarish: {
            completed: false,
            name: "Why would you do this.",
            color: "var(--mythicItem-gradient)",
            description: "Reach Day 50 on Nightmarish difficulty.",
            hint: "There was an easier option and you didn't take it."
        },
        perishedOnce: {
            completed: false,
            name: "Well, that happened.",
            color: "var(--commonItem)",
            description: "Die. It was always going to happen eventually.",
            hint: "You'll get this one without trying."
        },
        armedAndReady: {
            completed: false,
            name: "Pointy end forward.",
            color: "var(--commonItem)",
            description: "Equip a weapon.",
            hint: "You don't have to fight bare-handed, you know."
        },
        openedLootBox: {
            completed: false,
            name: "Just one more.",
            color: "var(--commonItem)",
            description: "Open your first loot box.",
            hint: "Those gems aren't doing anything in your pocket."
        },
        refreshedShop: {
            completed: false,
            name: "Nothing here I like.",
            color: "var(--commonItem)",
            description: "Pay to re-roll the merchant's stock.",
            hint: "Bob has more in the cart. He just needs persuading."
        },
        allSlotsUnlocked: {
            completed: false,
            name: "Everything must come with me.",
            color: "var(--uncommonItem)",
            description: "Unlock all twenty inventory slots.",
            hint: "Bigger bags exist. They aren't free."
        },
        reachedLv100: {
            completed: false,
            name: "Triple digits.",
            color: "var(--rareItem)",
            description: "Reach LV 100.",
            hint: "Fifty wasn't the end of it."
        },
        maxHp1M: {
            completed: false,
            name: "Walking fortress.",
            color: "var(--rareItem)",
            description: "Reach 1,000,000 max Life.",
            hint: "Dragons have hearts. You have gold."
        },
        survivedHard: {
            completed: false,
            name: "It did get harder.",
            color: "var(--rareItem)",
            description: "Reach Day 50 on Hard difficulty.",
            hint: "There was a gentler option and you passed on it."
        },
        reached1000Days: {
            completed: false,
            name: "Almost three years.",
            color: "var(--epicItem-gradient)",
            description: "Survive 1,000 days.",
            hint: "Five hundred clearly wasn't enough for you either."
        },
        dmgmult1000: {
            completed: false,
            name: "Overkill is a strategy.",
            color: "var(--epicItem-gradient)",
            description: "Reach a 1,000% damage multiplier.",
            hint: "Hitting harder is always an option, if you can pay for it."
        },
        gotten1Bgold: {
            completed: false,
            name: "Absurd.",
            color: "var(--legendaryItem-gradient)",
            description: "Earn a total of 1,000,000,000 gold.",
            hint: "A million was apparently a warm-up."
        },
        trueMercy: {
            completed: false,
            name: "Not one.",
            color: "var(--legendaryItem-gradient)",
            description: "Spare 100 creatures without ever killing a single one.",
            hint: "It is possible to get through this without taking anything."
        },
        usedFryingPan: {
            completed: false,
            name: "Why does this work.",
            color: "var(--mythicItem-gradient)",
            description: "Hit something with the Frying Pan. Nobody can explain it.",
            hint: "Kitchenware is not a weapon. Usually."
        }
    },
    flags: {
        storageUnlocked: false,
        hasUsedPacifistRedemption: false,
        pacifistRouteTimesCompleted: false,
        genocideRouteTimesCompleted: false,
        timesTampered: 0n, // BigInt: importSave increments it with 1n
        bobVisits: 0n,
        bobFlags: {
            Visits3: false,
            Visits6: false,
            Visits9: false,
            Visits12: false,
            Visits15: false,
            Visits18: false,
            Visits21: false,
            Visits24: false,
            Visits27: false,
            Visits30: false,
            Visits33: false,
            Visits36: false,
            Visits39: false,
            Visits41: false,
            Visits44: false,
            Visits47: false,
            Visits50: false,
            Visits53: false,
            Visits56: false,
            Visits59: false,
            Visits62: false,
            Visits65: false,
            Visits68: false,
            Visits71: false,
            Visits74: false,
            Visits77: false,
            Visits80: false,
            Visits83: false,
            Visits86: false,
            Visits89: false,
            Visits92: false,
            Visits95: false,
            Visits98: false,
            Visits101: false,
            Visits104: false,
            Visits107: false,
            Visits110: false,
            Visits113: false,
            Visits116: false
        }
    }
};

// Deep copy for plain data. `p` is only objects, arrays and primitives, so this
// is enough — and unlike structuredClone it has no browser-version dependency,
// which matters because this runs during boot: throwing here kills the page.
// (JSON round-tripping is not an option: BigInt can't be stringified.)
function clonePlainData(value) {
    if (Array.isArray(value)) return value.map(clonePlainData);
    if (value !== null && typeof value === 'object') {
        const out = {};
        for (const key of Object.keys(value)) out[key] = clonePlainData(value[key]);
        return out;
    }
    return value; // primitives, BigInt included, copy by value
}

// A pristine copy of every default, captured before anything can touch `p`.
// The save migrator uses it as the template: it says which fields should exist
// and what type each one is, so an old save can be filled in and type-corrected
// instead of arriving with holes in it. See save_export_and_import_logic.js.
const PRISTINE_PLAYER = clonePlainData(p);


// storage function (put this somewhere else later)
function openStorage() {
    if (enemy) {
        log(`You can't access storage during a fight!`, "#ff4757");
        return;
    }

    if (p.flags.storageUnlocked !== true) {
        log(`You don't have a storage unit yet. Purchase one from the shop!`, "#ff4757");
        return;
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'storage-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); z-index: 1000;
        display: flex; flex-direction: column; align-items: center;
        justify-content: flex-start; padding: 20px; box-sizing: border-box;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
        color: var(--text); font-family: 'Fira Code', monospace;
        font-size: 20px; margin-bottom: 15px; width: 100%;
        max-width: 900px; display: flex;
        justify-content: space-between; align-items: center;
    `;
    header.innerHTML = `
        <span>Storage <span style="color: var(--commonItem); font-size: 14px;">(${p.inventory.storage.filter(s => s !== 'empty').length}/${p.inventory.storage.length} used)</span></span>
        <button id="storage-close-btn" style="
            background: #ff4757; border: none; color: white;
            padding: 6px 14px; border-radius: 6px;
            font-family: 'Fira Code', monospace; cursor: pointer;
        ">Close</button>
    `;

    // Search bar
    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search items...';
    searchBar.style.cssText = `
        width: 100%; max-width: 900px;
        padding: 8px 12px; margin-bottom: 10px;
        background: #1a1a2e; border: 1px solid #2f3542;
        border-radius: 6px; color: var(--text);
        font-family: 'Fira Code', monospace; font-size: 14px;
        box-sizing: border-box; outline: none;
    `;
    searchBar.addEventListener('input', () => renderSlots(searchBar.value.toLowerCase()));

    // Slot grid (scrollable)
    const grid = document.createElement('div');
    grid.style.cssText = `
        display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 8px; overflow-y: auto; max-height: 70vh;
        width: 100%; max-width: 900px;
        padding: 10px; box-sizing: border-box;
        background: var(--panel); border-radius: 8px;
        border: 1px solid #2f3542;
    `;

    function renderSlots(filter = '') {
        grid.innerHTML = '';
        header.querySelector('span span').textContent =
            `(${p.inventory.storage.filter(s => s !== 'empty').length}/${p.inventory.storage.length} used)`;

        p.inventory.storage.forEach((item, index) => {
            // Skip items that don't match the search
            if (filter && (item === 'empty' || !item.toLowerCase().includes(filter))) return;

            const slot = document.createElement('div');
            slot.style.cssText = `
                background: #1a1a2e; border-radius: 6px;
                border: 1px solid #2f3542; padding: 8px;
                display: flex; flex-direction: column;
                align-items: center; gap: 6px;
                min-height: 80px; justify-content: center;
                font-family: 'Fira Code', monospace;
            `;

            if (item !== 'empty') {
                const itemData = inventoryItems.find(i => i.name === item);
                const itemColor = itemData ? itemData.rarityColor : 'var(--text)';

                slot.innerHTML = `
                    <span style="color: ${itemColor}; font-size: 11px; text-align: center; word-break: break-word;">${item}</span>
                    <div style="display: flex; gap: 4px; flex-wrap: wrap; justify-content: center;">
                        <button class="storage-transfer-out" data-index="${index}" style="
                            background: var(--unlocked); border: none; color: #000;
                            padding: 3px 7px; border-radius: 4px; cursor: pointer;
                            font-family: 'Fira Code', monospace; font-size: 10px;
                        ">Transfer</button>
                        <button class="storage-delete" data-index="${index}" style="
                            background: #ff4757; border: none; color: white;
                            padding: 3px 7px; border-radius: 4px; cursor: pointer;
                            font-family: 'Fira Code', monospace; font-size: 10px;
                        ">Delete</button>
                    </div>
                `;

                // Tooltip
                if (itemData) {
                    const tip = document.getElementById('tooltip');

                    const updateTipPos = (e) => {
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

                    slot.onmouseenter = (e) => {
                        const rColor = itemData.rarityColor || "#a4b0be";
                        const rarityName = itemData.rarity || "No Rarity";
                        let html = `<strong>${itemData.name}</strong><br>`;
                        html += `<span style="color:${rColor}; font-size: 0.8em; font-weight: bold;">${rarityName.toUpperCase()}</span>`;
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

                    slot.onmousemove = (e) => updateTipPos(e);

                    slot.onmouseleave = () => {
                        tip.style.display = 'none';
                    };
                }

            } else {
                slot.innerHTML = `
                    <span style="color: #444; font-size: 11px;">Empty</span>
                    <button class="storage-transfer-in" data-index="${index}" style="
                        background: var(--mana); border: none; color: white;
                        padding: 3px 7px; border-radius: 4px; cursor: pointer;
                        font-family: 'Fira Code', monospace; font-size: 10px;
                    ">Store Item</button>
                `;
            }

            grid.appendChild(slot);
        });

        // Transfer OUT (storage -> inventory)
        grid.querySelectorAll('.storage-transfer-out').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                const itemName = p.inventory.storage[index];
                if (tryAddItem(itemName)) {
                    p.inventory.storage[index] = 'empty';
                    log(`Transferred "${itemName}" from storage to inventory.`, "var(--unlocked)");
                    updateInventoryUI();
                    renderSlots(searchBar.value.toLowerCase());
                } else {
                    log(`Inventory is full! Can't transfer "${itemName}".`, "#ff4757");
                }
            });
        });

        // DELETE
        grid.querySelectorAll('.storage-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                const itemName = p.inventory.storage[index];
                p.inventory.storage[index] = 'empty';
                log(`Deleted "${itemName}" from storage.`, "#ff4757");
                renderSlots(searchBar.value.toLowerCase());
            });
        });

        // Transfer IN (inventory -> storage)
        grid.querySelectorAll('.storage-transfer-in').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                openInventoryPicker(index);
            });
        });
    }

    // Inventory picker — lets you choose which inventory item to store
    function openInventoryPicker(storageIndex) {
        const existing = document.getElementById('storage-picker');
        if (existing) existing.remove();

        const picker = document.createElement('div');
        picker.id = 'storage-picker';
        picker.style.cssText = `
            position: fixed; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: var(--panel); border: 1px solid #2f3542;
            border-radius: 8px; padding: 16px; z-index: 1100;
            font-family: 'Fira Code', monospace; color: var(--text);
            min-width: 280px; max-height: 400px;
            display: flex; flex-direction: column; gap: 8px;
        `;

        picker.innerHTML = `<div style="font-size: 14px; margin-bottom: 6px;">Select an item to store:</div>`;

        const slots = ['slot1','slot2','slot3','slot4','slot5',
                        'slot6','slot7','slot8','slot9','slot10',
                        'slot11','slot12','slot13','slot14','slot15',
                        'slot16','slot17','slot18','slot19','slot20'];

        const itemList = document.createElement('div');
        itemList.style.cssText = `overflow-y: auto; max-height: 300px; display: flex; flex-direction: column; gap: 6px;`;

        let hasItems = false;
        slots.forEach(slotKey => {
            const itemName = p.inventory[slotKey];
            if (!itemName || itemName === 'empty' || itemName === 'null') return;
            hasItems = true;

            const itemData = inventoryItems.find(i => i.name === itemName);
            const itemColor = itemData ? itemData.rarityColor : 'var(--text)';

            const btn = document.createElement('button');
            btn.style.cssText = `
                background: #1a1a2e; border: 1px solid #2f3542;
                color: ${itemColor}; padding: 6px 10px;
                border-radius: 4px; cursor: pointer; text-align: left;
                font-family: 'Fira Code', monospace; font-size: 12px;
            `;
            btn.textContent = itemName;
            btn.addEventListener('click', () => {
                p.inventory.storage[storageIndex] = itemName;
                p.inventory[slotKey] = 'empty';
                log(`Stored "${itemName}" into storage.`, "var(--unlocked)");
                updateInventoryUI();
                picker.remove();
                renderSlots(searchBar.value.toLowerCase());
            });
            itemList.appendChild(btn);
        });

        if (!hasItems) {
            picker.innerHTML += `<div style="color: #444; font-size: 12px;">No items in inventory.</div>`;
        } else {
            picker.appendChild(itemList);
        }

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.cssText = `
            background: #ff4757; border: none; color: white;
            padding: 6px 12px; border-radius: 4px; cursor: pointer;
            font-family: 'Fira Code', monospace; font-size: 12px; margin-top: 4px;
        `;
        cancelBtn.addEventListener('click', () => picker.remove());
        picker.appendChild(cancelBtn);

        document.body.appendChild(picker);
    }

    overlay.appendChild(header);
    overlay.appendChild(searchBar);
    overlay.appendChild(grid);
    document.body.appendChild(overlay);

    document.getElementById('storage-close-btn').addEventListener('click', () => {
        document.getElementById('tooltip').style.display = 'none';
        overlay.remove();
        const picker = document.getElementById('storage-picker');
        if (picker) picker.remove();
    });

    renderSlots();
}