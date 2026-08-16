// ============================================================
// SETTINGS
// Bullet-hell keybinds, and a full progress reset.
// ============================================================

const KEYBIND_STORAGE_KEY = "luxsRPGkeybinds";

// Two slots per action so the WASD + arrow-key defaults both keep working.
const DEFAULT_KEYBINDS = {
    up:    ["w", "arrowup"],
    down:  ["s", "arrowdown"],
    left:  ["a", "arrowleft"],
    right: ["d", "arrowright"],
    focus: ["shift", null]
};

const KEYBIND_ACTIONS = [
    { id: "up",    label: "Move Up" },
    { id: "down",  label: "Move Down" },
    { id: "left",  label: "Move Left" },
    { id: "right", label: "Move Right" },
    { id: "focus", label: "Slow Down" }
];

// Wiped by "Reset All Progress".
// Deliberately NOT in this list:
//   luxsRPGkeybinds      — a control preference, not progress.
//   completedGenocideRun — route records are permanent. You don't get to
//   completedPacifistRun   refresh your past away; that's the whole point.
const PROGRESS_STORAGE_KEYS = [
    "luxsRPGplayerName",
    "luxsRPGplayerClass",
    "luxsRPGdifficulty"
];

let keybinds = loadKeybinds();
let awaitingKeybind = null; // { action, slot } while listening for a key

function loadKeybinds() {
    // Start from a copy of the defaults so a partial or corrupt stored object
    // can never leave an action unbound.
    const binds = {};
    for (const action of Object.keys(DEFAULT_KEYBINDS)) {
        binds[action] = [...DEFAULT_KEYBINDS[action]];
    }
    try {
        const raw = localStorage.getItem(KEYBIND_STORAGE_KEY);
        if (!raw) return binds;
        const stored = JSON.parse(raw);
        for (const action of Object.keys(binds)) {
            if (Array.isArray(stored[action])) {
                binds[action] = [stored[action][0] ?? null, stored[action][1] ?? null];
            }
        }
    } catch (err) {
        console.warn("Keybinds couldn't be read, falling back to defaults:", err);
    }
    return binds;
}

function saveKeybinds() {
    try {
        localStorage.setItem(KEYBIND_STORAGE_KEY, JSON.stringify(keybinds));
    } catch (err) {
        console.warn("Keybinds couldn't be saved:", err);
        if (typeof log === "function") {
            log(`Funfriend: Couldn't save your keybinds. They'll work until you reload.`, "var(--funfriend)");
        }
    }
}

// Called every frame from the bullet-hell loop. `keys` is player.keys.
function isActionHeld(keys, action) {
    const bound = keybinds[action];
    if (!bound) return false;
    return bound.some(key => key && keys[key]);
}

function prettyKeyName(key) {
    if (!key) return "—";
    const names = {
        " ": "Space",
        arrowup: "↑", arrowdown: "↓", arrowleft: "←", arrowright: "→",
        shift: "Shift", control: "Ctrl", alt: "Alt", meta: "Meta",
        tab: "Tab", enter: "Enter", backspace: "Backspace", capslock: "Caps"
    };
    return names[key] || key.toUpperCase();
}

// Stop the same physical key driving two different actions.
function clearKeyFromOtherSlots(key, keepAction, keepSlot) {
    for (const action of Object.keys(keybinds)) {
        keybinds[action] = keybinds[action].map((bound, slot) => {
            if (action === keepAction && slot === keepSlot) return bound;
            return bound === key ? null : bound;
        });
    }
}

function openSettings() {
    if (document.getElementById('settings-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'settings-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); z-index: 1000;
        display: flex; flex-direction: column; align-items: center;
        justify-content: flex-start; padding: 20px; box-sizing: border-box;
        overflow-y: auto;
    `;

    const panel = document.createElement('div');
    panel.style.cssText = `
        width: 100%; max-width: 640px;
        font-family: 'Fira Code', monospace; color: var(--text);
        display: flex; flex-direction: column; gap: 16px;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
        display: flex; justify-content: space-between;
        align-items: center; font-size: 20px;
    `;
    header.innerHTML = `
        <span>Settings</span>
        <button id="settings-close-btn" style="
            background: #ff4757; border: none; color: white;
            padding: 6px 14px; border-radius: 6px;
            font-family: 'Fira Code', monospace; cursor: pointer;
        ">Close</button>
    `;
    panel.appendChild(header);

    // ---------- Keybinds ----------
    const bindSection = document.createElement('div');
    bindSection.style.cssText = `
        background: var(--panel); border: 1px solid #2f3542;
        border-radius: 8px; padding: 16px;
        display: flex; flex-direction: column; gap: 10px;
    `;
    bindSection.innerHTML = `
        <div style="font-size: 15px;">Bullet Hell Controls</div>
        <div style="font-size: 11px; color: var(--commonItem); line-height: 1.5;">
            Click a key to rebind it. Two keys per action &mdash; the second is optional.
            Press <b>Escape</b> while listening to cancel, or <b>Backspace</b> to clear the slot.
        </div>
    `;

    const bindRows = document.createElement('div');
    bindRows.style.cssText = `display: flex; flex-direction: column; gap: 6px; margin-top: 4px;`;
    bindSection.appendChild(bindRows);

    const subtleBtnStyle = `
        background: #1a1a2e; border: 1px solid #2f3542; color: var(--text);
        padding: 7px 12px; border-radius: 6px; cursor: pointer;
        font-family: 'Fira Code', monospace; font-size: 12px;
    `;

    const resetBindsBtn = document.createElement('button');
    resetBindsBtn.textContent = 'Restore Default Controls';
    resetBindsBtn.style.cssText = subtleBtnStyle + 'margin-top: 6px;';
    resetBindsBtn.addEventListener('click', () => {
        for (const action of Object.keys(DEFAULT_KEYBINDS)) {
            keybinds[action] = [...DEFAULT_KEYBINDS[action]];
        }
        saveKeybinds();
        renderBindRows();
        if (typeof playMenuButtonClickSFX === "function") playMenuButtonClickSFX();
        if (typeof log === "function") log(`Controls restored to defaults.`, "var(--unlocked)");
    });
    bindSection.appendChild(resetBindsBtn);
    panel.appendChild(bindSection);

    function renderBindRows() {
        bindRows.innerHTML = '';
        KEYBIND_ACTIONS.forEach(action => {
            const row = document.createElement('div');
            row.style.cssText = `
                display: grid; grid-template-columns: 1fr auto auto;
                gap: 8px; align-items: center;
                background: #1a1a2e; border-radius: 6px; padding: 8px 10px;
            `;

            const label = document.createElement('span');
            label.textContent = action.label;
            label.style.cssText = `font-size: 13px;`;
            row.appendChild(label);

            [0, 1].forEach(slot => {
                const key = keybinds[action.id][slot];
                const listening = awaitingKeybind &&
                                  awaitingKeybind.action === action.id &&
                                  awaitingKeybind.slot === slot;

                const btn = document.createElement('button');
                btn.textContent = listening ? 'Press a key…' : prettyKeyName(key);
                btn.style.cssText = `
                    min-width: 104px;
                    background: ${listening ? 'var(--mana)' : '#0a0a0c'};
                    border: 1px solid ${listening ? 'var(--mana)' : '#2f3542'};
                    color: ${key || listening ? 'var(--text)' : '#555'};
                    padding: 6px 10px; border-radius: 4px; cursor: pointer;
                    font-family: 'Fira Code', monospace; font-size: 12px;
                `;
                btn.addEventListener('click', () => {
                    awaitingKeybind = { action: action.id, slot };
                    renderBindRows();
                });
                row.appendChild(btn);
            });

            bindRows.appendChild(row);
        });
    }

    // ---------- Save data ----------
    const saveSection = document.createElement('div');
    saveSection.style.cssText = `
        background: var(--panel); border: 1px solid #2f3542;
        border-radius: 8px; padding: 16px;
        display: flex; flex-direction: column; gap: 10px;
    `;
    saveSection.innerHTML = `
        <div style="font-size: 15px;">Save Data</div>
        <div style="font-size: 11px; color: var(--commonItem); line-height: 1.5;">
            Export this run to a <code>.urpg</code> file you can carry to another
            computer. Importing <b>replaces</b> the run you're playing now, so export
            first if you want to keep it.
        </div>
    `;

    const saveRow = document.createElement('div');
    saveRow.style.cssText = `display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px;`;

    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export .urpg';
    exportBtn.style.cssText = subtleBtnStyle;
    exportBtn.addEventListener('click', () => {
        exportSave();
        if (typeof playSaveSFX === "function") playSaveSFX();
    });

    // Hidden file input, clicked via the visible button. Keeps the id the
    // existing #import-input { display: none } rule already targets.
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.id = 'import-input';
    importInput.accept = '.urpg';
    importInput.style.display = 'none';
    importInput.addEventListener('change', (e) => handleImportFile(e));

    const importBtn = document.createElement('button');
    importBtn.textContent = 'Import .urpg';
    importBtn.style.cssText = subtleBtnStyle;
    importBtn.addEventListener('click', () => importInput.click());

    saveRow.appendChild(exportBtn);
    saveRow.appendChild(importBtn);
    saveRow.appendChild(importInput);
    saveSection.appendChild(saveRow);
    panel.appendChild(saveSection);

    // ---------- Danger zone ----------
    const dangerSection = document.createElement('div');
    dangerSection.style.cssText = `
        background: var(--panel); border: 1px solid #ff4757;
        border-radius: 8px; padding: 16px;
        display: flex; flex-direction: column; gap: 10px;
    `;
    dangerSection.innerHTML = `
        <div style="font-size: 15px; color: #ff4757;">Reset Progress</div>
        <div style="font-size: 12px; color: var(--commonItem); line-height: 1.6;">
            <b style="color:#ff4757">This cannot be undone.</b> It permanently deletes:
            <ul style="margin: 8px 0 8px 18px; padding: 0;">
                <li>Your name, class and difficulty</li>
                <li>Your level, stats, gold, gems, items, spells and kill counts</li>
            </ul>
            Kept regardless of any reset:
            <ul style="margin: 8px 0 8px 18px; padding: 0;">
                <li>Your control bindings above</li>
            </ul>
            You are taken back to the start screen afterwards, where you can begin a new save or import one.
            <br><br>
            <b>If you want to keep this run, export a <code>.urpg</code> save first.</b>
        </div>
    `;

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset All Progress';
    resetBtn.style.cssText = `
        background: #ff4757; border: none; color: white;
        padding: 9px 14px; border-radius: 6px; cursor: pointer;
        font-family: 'Fira Code', monospace; font-size: 13px; font-weight: bold;
    `;
    dangerSection.appendChild(resetBtn);

    const confirmBox = document.createElement('div');
    confirmBox.style.cssText = `display: none; flex-direction: column; gap: 8px;`;
    confirmBox.innerHTML = `
        <div style="font-size: 12px; color: #ff4757;">
            Type <b>RESET</b> below to confirm. There is no way back from this.
        </div>
    `;

    const confirmInput = document.createElement('input');
    confirmInput.type = 'text';
    confirmInput.placeholder = 'RESET';
    confirmInput.setAttribute('aria-label', 'Type RESET to confirm');
    confirmInput.style.cssText = `
        background: #0a0a0c; border: 1px solid #ff4757; color: var(--text);
        padding: 8px 10px; border-radius: 4px; outline: none;
        font-family: 'Fira Code', monospace; font-size: 13px;
    `;

    const confirmRow = document.createElement('div');
    confirmRow.style.cssText = `display: flex; gap: 8px;`;

    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Delete Everything';
    confirmBtn.disabled = true;
    const styleConfirmBtn = () => {
        confirmBtn.style.cssText = `
            background: ${confirmBtn.disabled ? '#3a2126' : '#ff4757'};
            border: none; color: ${confirmBtn.disabled ? '#7a5a60' : 'white'};
            padding: 8px 14px; border-radius: 4px;
            cursor: ${confirmBtn.disabled ? 'not-allowed' : 'pointer'};
            font-family: 'Fira Code', monospace; font-size: 12px; font-weight: bold;
        `;
    };
    styleConfirmBtn();

    const cancelResetBtn = document.createElement('button');
    cancelResetBtn.textContent = 'Cancel';
    cancelResetBtn.style.cssText = subtleBtnStyle;

    confirmRow.appendChild(confirmBtn);
    confirmRow.appendChild(cancelResetBtn);
    confirmBox.appendChild(confirmInput);
    confirmBox.appendChild(confirmRow);
    dangerSection.appendChild(confirmBox);
    panel.appendChild(dangerSection);

    resetBtn.addEventListener('click', () => {
        resetBtn.style.display = 'none';
        confirmBox.style.display = 'flex';
        confirmInput.focus();
    });

    confirmInput.addEventListener('input', () => {
        confirmBtn.disabled = confirmInput.value.trim() !== 'RESET';
        styleConfirmBtn();
    });

    const cancelReset = () => {
        confirmInput.value = '';
        confirmBtn.disabled = true;
        styleConfirmBtn();
        confirmBox.style.display = 'none';
        resetBtn.style.display = 'block';
    };
    cancelResetBtn.addEventListener('click', cancelReset);

    confirmBtn.addEventListener('click', () => {
        if (confirmBtn.disabled) return;
        resetAllProgress();
    });

    // ---------- Wire up ----------
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    renderBindRows();

    const closeSettings = () => {
        window.removeEventListener('keydown', settingsKeyHandler, true);
        awaitingKeybind = null;
        overlay.remove();
    };

    function settingsKeyHandler(e) {
        // While listening for a rebind, swallow the key so it can't reach the game.
        if (awaitingKeybind) {
            e.preventDefault();
            e.stopPropagation();

            const key = e.key.toLowerCase();
            if (key === 'escape') {
                awaitingKeybind = null;
                renderBindRows();
                return;
            }
            if (key === 'backspace') {
                keybinds[awaitingKeybind.action][awaitingKeybind.slot] = null;
            } else {
                clearKeyFromOtherSlots(key, awaitingKeybind.action, awaitingKeybind.slot);
                keybinds[awaitingKeybind.action][awaitingKeybind.slot] = key;
            }
            saveKeybinds();
            awaitingKeybind = null;
            renderBindRows();
            return;
        }

        if (e.key !== 'Escape') return;

        // Escape backs out one step at a time: first the reset confirmation,
        // then the panel itself.
        if (document.activeElement === confirmInput || confirmBox.style.display === 'flex') {
            cancelReset();
            return;
        }
        closeSettings();
    }

    // Capture phase so a rebind press never leaks to other keydown listeners.
    window.addEventListener('keydown', settingsKeyHandler, true);
    document.getElementById('settings-close-btn').addEventListener('click', closeSettings);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSettings(); });
}

function resetAllProgress() {
    PROGRESS_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));

    // Everything else lives in memory on `p`, plus the unlocked flags on
    // skillTree and a handful of module-level UI globals. Reloading rebuilds
    // all of it from source rather than trying to unpick it by hand, and with
    // name/class/difficulty gone the boot check in index.html lands on
    // showStartScreen() — the onboarding UI.
    document.body.style.pointerEvents = "none";
    document.body.innerHTML = `
        <div style="
            position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);
            color: var(--text); font-family: 'Fira Code', monospace;
            text-align: center; font-size: 15px;
        ">Progress erased. Returning to the start screen…</div>
    `;
    setTimeout(() => location.reload(), 900);
}
