// ============================================================
// ACHIEVEMENTS
//
// The definitions live on `p.achievements` (playerinfo.js) so they travel with
// a save. Only *state* differs between players; the display text is refreshed
// from the defaults on load, so editing a name or hint reaches old saves too.
//
// Check functions deliberately live here and NOT on `p` — functions don't
// survive JSON, so anything stored on `p` has to be plain data.
// ============================================================

// Captured at parse time, before anything can mark one complete. Used to
// backfill achievements added after a save was made.
const ACHIEVEMENT_DEFAULTS = clonePlainData(p.achievements);

// Polled from updateUI(). Anything that can't be spotted from player state —
// using a specific item, dying — calls awardAchievement() directly instead.
const ACHIEVEMENT_CHECKS = {
    reached100Days:          () => p.day >= 100n,
    reached500Days:          () => p.day >= 500n,
    gotten1Mgold:            () => p.totalGold >= 1000000n,
    gottenFullManaReduction: () => p.manaReduction >= 100n,
    reachedNegativeSanity:   () => p.sn < 0n,
    firstBlood:              () => p.kills >= 1n,
    firstMercy:              () => p.spares >= 1n,
    reachedLv50:             () => p.lv >= 50n,
    killed1000:              () => p.kills >= 1000n,
    spared1000:              () => p.spares >= 1000n,
    richInGems:              () => (p.gems ?? 0n) >= 1000n,
    survivedNightmarish:     () => p.difficulty === 'nightmarish' && p.day >= 50n,
    survivedHard:            () => p.difficulty === 'hard' && p.day >= 50n,
    reachedLv100:            () => p.lv >= 100n,
    reached1000Days:         () => p.day >= 1000n,
    gotten1Bgold:            () => p.totalGold >= 1000000000n,
    dmgmult1000:             () => p.dmgmult >= 1000n,
    maxHp1M:                 () => p.mhp >= 1000000n,
    trueMercy:               () => p.spares >= 100n && p.kills === 0n,
    armedAndReady:           () => !!p.inventory.equippedWeapon
                                   && p.inventory.equippedWeapon !== 'empty',
    allSlotsUnlocked:        () => p.inventory.slot610Unlocked === true
                                   && p.inventory.slot1120Unlocked === true,

    filledInventory: () => {
        let unlocked = 0, used = 0;
        for (let i = 1; i <= 20; i++) {
            const isUnlocked = i <= 5 ? true
                             : i <= 10 ? p.inventory.slot610Unlocked
                                       : p.inventory.slot1120Unlocked;
            if (!isUnlocked) continue;
            unlocked++;
            if (p.inventory[`slot${i}`] !== 'empty') used++;
        }
        return unlocked > 0 && used === unlocked;
    },

    masteredTree: () => {
        if (!p.class) return false;
        const tree = Object.keys(skillTree).filter(id => skillTree[id].tree === p.class);
        return tree.length > 0 && tree.every(id => p.skills.includes(id));
    }
};

// Make sure `p.achievements` has an entry for every known achievement, keeping
// whatever the player has already earned. Handles saves made before a given
// achievement existed, and refreshes wording on ones that do.
function syncAchievements() {
    if (!p.achievements || typeof p.achievements !== 'object') p.achievements = {};
    for (const [id, def] of Object.entries(ACHIEVEMENT_DEFAULTS)) {
        const earned = p.achievements[id] && p.achievements[id].completed === true;
        p.achievements[id] = { ...def, completed: !!earned };
    }
}

function awardAchievement(id) {
    const a = p.achievements?.[id];
    if (!a || a.completed) return false;

    a.completed = true;
    const solid = solidAchievementColor(a.color);
    log(`Achievement unlocked — <strong style="${getRarityStyle(a.color)}">${a.name}</strong>`, solid);
    if (typeof playSpellMasteryBuySFX === 'function') playSpellMasteryBuySFX();

    // Refresh the panel if it happens to be open.
    if (document.getElementById('achievements-overlay')) renderAchievementCells();
    return true;
}

// Debug setter behind /achievements. Unlike awardAchievement() this can also
// take one back, and stays quiet — the console prints its own confirmation.
// Returns null for an unknown id, otherwise true if the state actually moved.
function setAchievement(id, unlocked) {
    const a = p.achievements?.[id];
    if (!a) return null;
    const changed = a.completed !== unlocked;
    a.completed = unlocked;
    if (document.getElementById('achievements-overlay')) renderAchievementCells();
    return changed;
}

function setAllAchievements(unlocked) {
    let changed = 0;
    for (const id of Object.keys(ACHIEVEMENT_DEFAULTS)) {
        if (setAchievement(id, unlocked)) changed++;
    }
    return changed;
}

// Called from updateUI(). Cheap: a handful of comparisons, and each check is
// skipped once its achievement is earned.
function checkAchievements() {
    if (!p.achievements) return;
    for (const [id, test] of Object.entries(ACHIEVEMENT_CHECKS)) {
        const a = p.achievements[id];
        if (!a || a.completed) continue;
        try {
            if (test()) awardAchievement(id);
        } catch (err) {
            /* a check that can't run yet (no class picked, etc.) is just not met */
        }
    }
}

// Gradients can't be used as a border colour, so cells fall back to the solid
// token of the same tier. The gradient is still used for the title text.
function solidAchievementColor(color) {
    if (!color) return 'var(--commonItem)';
    return color.replace('-gradient', '');
}

function achievementProgress() {
    const all = Object.keys(ACHIEVEMENT_DEFAULTS);
    const done = all.filter(id => p.achievements?.[id]?.completed).length;
    return { done, total: all.length };
}

/* ------------------------------------------------------------
   UI
   ------------------------------------------------------------ */

function openAchievements() {
    if (document.getElementById('achievements-overlay')) return;
    syncAchievements();

    const overlay = document.createElement('div');
    overlay.id = 'achievements-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.88); z-index: 1000;
        display: flex; flex-direction: column; align-items: center;
        justify-content: flex-start; padding: 20px; box-sizing: border-box;
        font-family: 'Fira Code', monospace; color: var(--text);
    `;

    const header = document.createElement('div');
    header.id = 'achievements-header';
    header.style.cssText = `
        width: 100%; max-width: 900px; display: flex;
        justify-content: space-between; align-items: center;
        font-size: 20px; margin-bottom: 15px;
    `;

    const grid = document.createElement('div');
    grid.id = 'achievements-grid';
    grid.style.cssText = `
        display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        gap: 10px; overflow-y: auto; max-height: 74vh;
        width: 100%; max-width: 900px; padding: 12px; box-sizing: border-box;
        background: var(--panel); border: 1px solid #2f3542; border-radius: 8px;
    `;

    overlay.appendChild(header);
    overlay.appendChild(grid);
    document.body.appendChild(overlay);

    renderAchievementCells();

    document.getElementById('achievements-close-btn').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    const escHandler = (e) => {
        if (e.key !== 'Escape') return;
        window.removeEventListener('keydown', escHandler);
        overlay.remove();
    };
    window.addEventListener('keydown', escHandler);
}

function renderAchievementCells() {
    const grid = document.getElementById('achievements-grid');
    const header = document.getElementById('achievements-header');
    if (!grid || !header) return;

    const { done, total } = achievementProgress();
    header.innerHTML = `
        <span>Achievements
            <span style="color: var(--commonItem); font-size: 14px;">(${done}/${total} unlocked)</span>
        </span>
        <button id="achievements-close-btn" style="
            background: #ff4757; border: none; color: white;
            padding: 6px 14px; border-radius: 6px;
            font-family: 'Fira Code', monospace; cursor: pointer;
        ">Close</button>
    `;

    grid.innerHTML = '';
    for (const id of Object.keys(ACHIEVEMENT_DEFAULTS)) {
        const a = p.achievements[id];
        if (!a) continue;

        const unlocked = a.completed === true;
        const border = unlocked ? solidAchievementColor(a.color) : '#2f3542';

        const cell = document.createElement('div');
        cell.style.cssText = `
            background: #1a1a2e; border-radius: 6px;
            border: 2px solid ${border};
            padding: 12px; display: flex; flex-direction: column; gap: 6px;
            min-height: 92px;
            ${unlocked ? '' : 'opacity: 0.72;'}
        `;

        const title = document.createElement('div');
        title.style.cssText = `font-size: 13px; font-weight: bold; word-break: break-word;`;
        if (unlocked) {
            // getRarityStyle handles the gradient tiers via background-clip.
            title.innerHTML = `<span style="${getRarityStyle(a.color)}">${a.name}</span>`;
        } else {
            title.textContent = '???';
            title.style.color = '#6b6377';
        }

        const body = document.createElement('div');
        body.style.cssText = `font-size: 11px; line-height: 1.5; color: ${unlocked ? 'var(--commonItem)' : '#8d8699'};`;
        // Locked shows the hint; unlocking swaps it for the real description.
        body.textContent = unlocked ? a.description : a.hint;
        if (!unlocked) body.style.fontStyle = 'italic';

        cell.appendChild(title);
        cell.appendChild(body);
        grid.appendChild(cell);
    }
}
