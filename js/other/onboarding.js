// ============================================================
// NEW GAME FLOW + DIFFICULTY
//
// Boot order for a fresh browser:
//   start screen (new save | import) -> name -> class -> difficulty
//
// Difficulty controls how fast the *world* scales. Player stats compound
// (mhp/mmp/msn x1.2 per level) while every enemy is linear in p.lv, so on the
// original scaling you outrun the roster permanently. Each preset applies a
// per-level growth factor to enemy HP, damage, drains and rewards, which
// closes that gap by as much or as little as you want.
// ============================================================

const DIFFICULTY_STORAGE_KEY = "luxsRPGdifficulty";

const DIFFICULTY_PRESETS = {
    easy: {
        label: 'Easy',
        growth: 100, // per-level world growth as a percentage. 100 = no growth.
        color: '#2ed573',
        blurb: 'The original scaling. The world stays put while you grow.',
        detail: 'Enemies scale linearly with your level while your stats compound, so you outrun them permanently. By LV 50 you are roughly 150x safer than you were at LV 1.'
    },
    normal: {
        label: 'Normal',
        growth: 111,
        color: '#3742fa',
        blurb: 'The world grows with you. A fight at LV 50 feels like a fight at LV 5.',
        detail: 'Enemy HP, damage and rewards grow 11% per level. Tuned so the danger stays roughly flat through the mid and late game instead of falling away.'
    },
    hard: {
        label: 'Hard',
        growth: 116,
        color: '#ffa200',
        blurb: 'The world grows faster than you do. Levelling is not enough.',
        detail: 'Enemies grow 16% per level. By LV 50 they are about 10x more dangerous relative to your health than at LV 1, so gear and spell choice have to carry you.'
    },
    nightmarish: {
        label: 'Nightmarish',
        growth: 122,
        color: '#ff4757',
        blurb: 'The world laps you. Every level you gain, it gains more.',
        detail: 'Enemies grow 22% per level — faster than your own compounding. By LV 50 they are over 100x more dangerous relative to your health. Survival is the only goal.'
    }
};

const DIFFICULTY_ORDER = ['easy', 'normal', 'hard', 'nightmarish'];

// Fixed-point ceiling (the factor is carried x1,000,000) so a very long
// Nightmarish run can't grow BigInts without bound.
const WORLD_SCALE_CAP = 10n ** 30n;

let worldScaleCache = { key: null, value: 1000000n };

function currentDifficulty() {
    const id = p.difficulty ?? 'easy';
    return DIFFICULTY_PRESETS[id] ? id : 'easy';
}

// World growth factor for the player's current level, carried x1,000,000.
// Memoised, since it's an O(level) loop and startCombat reads it eight times.
function worldScaleMilli() {
    const id = currentDifficulty();
    const preset = DIFFICULTY_PRESETS[id];
    if (preset.growth === 100) return 1000000n;

    const lv = p.lv < 1n ? 1n : p.lv;
    const key = `${id}:${lv}`;
    if (worldScaleCache.key === key) return worldScaleCache.value;

    const growth = BigInt(preset.growth);
    let factor = 1000000n;
    for (let i = 1n; i < lv; i++) {
        factor = (factor * growth) / 100n;
        if (factor > WORLD_SCALE_CAP) { factor = WORLD_SCALE_CAP; break; }
    }

    worldScaleCache = { key, value: factor };
    return factor;
}

// Apply the world factor to one enemy stat. Handles the negative rewards
// (Kitsune pays negative EXP and gold) and never rounds a real stat to zero.
function scaleToWorld(value) {
    const raw = BigInt(value ?? 0);
    if (raw === 0n) return raw;

    const factor = worldScaleMilli();
    if (factor === 1000000n) return raw;

    const scaled = (raw * factor) / 1000000n;
    if (scaled === 0n) return raw > 0n ? 1n : -1n;
    return scaled;
}

function setDifficulty(id) {
    const chosen = DIFFICULTY_PRESETS[id] ? id : 'easy';
    p.difficulty = chosen;
    worldScaleCache = { key: null, value: 1000000n };
    try {
        localStorage.setItem(DIFFICULTY_STORAGE_KEY, chosen);
    } catch (err) {
        console.warn("Difficulty couldn't be saved:", err);
    }
}

/* ------------------------------------------------------------
   Shared overlay chrome
   ------------------------------------------------------------ */

function buildBootOverlay(id) {
    const overlay = document.createElement('div');
    overlay.id = id;
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.93);
        z-index: 9999999;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 22px; padding: 24px; box-sizing: border-box;
        overflow-y: auto;
        font-family: 'Fira Code', monospace;
    `;
    return overlay;
}

/* ------------------------------------------------------------
   1. Start screen — new save or import
   ------------------------------------------------------------ */

function showStartScreen(onComplete) {
    if (document.getElementById('start-screen-overlay')) return;

    const overlay = buildBootOverlay('start-screen-overlay');

    const title = document.createElement('h1');
    title.textContent = "Lux's RPG";
    title.style.cssText = `color: var(--text); margin: 0; font-size: 2.4rem; letter-spacing: 2px;`;

    const sub = document.createElement('p');
    sub.textContent = 'Survive as long as you can.';
    sub.style.cssText = `color: #a4b0be; margin: 0 0 10px; font-size: 0.95rem;`;

    const row = document.createElement('div');
    row.style.cssText = `display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;`;

    const makeCard = (heading, body, color) => {
        const card = document.createElement('button');
        card.style.cssText = `
            width: 260px; text-align: left;
            background: ${color}18; border: 1px solid ${color};
            color: var(--text); border-radius: 12px;
            padding: 20px; cursor: pointer;
            font-family: 'Fira Code', monospace;
            display: flex; flex-direction: column; gap: 8px;
            transition: 0.2s;
        `;
        card.innerHTML = `
            <span style="color:${color}; font-size:1.05rem; font-weight:bold;">${heading}</span>
            <span style="color:#a4b0be; font-size:0.78rem; line-height:1.5;">${body}</span>
        `;
        card.addEventListener('mouseenter', () => card.style.background = `${color}33`);
        card.addEventListener('mouseleave', () => card.style.background = `${color}18`);
        return card;
    };

    const newBtn = makeCard(
        'Start a New Save',
        'Pick a name, a class and a difficulty, then begin at Day 1.',
        '#2ed573'
    );
    const importBtn = makeCard(
        'Import a .urpg Save',
        'Load a save file exported from this or another computer.',
        'var(--mana)'
    );

    // Hidden picker; the visible card triggers it.
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.urpg';
    fileInput.style.display = 'none';

    const status = document.createElement('div');
    status.style.cssText = `color:#ff4757; font-size:0.8rem; min-height:1.2em; text-align:center;`;

    newBtn.addEventListener('click', () => {
        overlay.remove();
        runNewSaveFlow(onComplete);
    });

    importBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        status.style.color = '#a4b0be';
        status.textContent = 'Reading save…';

        const reader = new FileReader();
        reader.onload = (e) => {
            const ok = importSave(e.target.result, { allowIdentityChange: true });
            event.target.value = '';
            if (ok) {
                overlay.remove();
                // An imported save is a finished character too.
                if (typeof onComplete === 'function') onComplete();
            } else {
                status.style.color = '#ff4757';
                status.textContent = 'That file could not be read. Check the game log for details.';
            }
        };
        reader.readAsText(file);
    });

    row.appendChild(newBtn);
    row.appendChild(importBtn);
    overlay.appendChild(title);
    overlay.appendChild(sub);
    overlay.appendChild(row);
    overlay.appendChild(status);
    overlay.appendChild(fileInput);
    document.body.style.pointerEvents = 'auto';
    document.body.appendChild(overlay);
}

/* ------------------------------------------------------------
   2. The chain: name -> class -> difficulty
   ------------------------------------------------------------ */

function runNewSaveFlow(onComplete) {
    nameSelection(() => {
        classSelection(() => {
            difficultySelection(onComplete);
        });
    });
}

// A character can end up half-built — /clearname and /clearclass each remove
// one piece. On the next load, ask only for what's actually missing instead of
// throwing the player back through the whole start screen and losing the rest.
// A missing difficulty is NOT prompted for: it reads as Easy, which is the
// original scaling, so saves predating difficulty carry on untouched.
function resumeOnboarding(onComplete) {
    const steps = [];
    if (!localStorage.getItem("luxsRPGplayerName"))  steps.push(next => nameSelection(next));
    if (!localStorage.getItem("luxsRPGplayerClass")) steps.push(next => classSelection(next));

    let i = 0;
    const next = () => {
        if (i >= steps.length) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }
        steps[i++](next);
    };
    next();
}

/* ------------------------------------------------------------
   3. Difficulty picker
   ------------------------------------------------------------ */

// Preview the world factor at a sample level so the choice is an informed one.
function previewWorldFactor(growth, atLevel) {
    if (growth === 100) return 1;
    return Math.pow(growth / 100, atLevel - 1);
}

function difficultySelection(onComplete) {
    if (document.getElementById('difficulty-overlay')) return;

    const overlay = buildBootOverlay('difficulty-overlay');
    const SAMPLE_LEVEL = 50;
    // Player max HP compounds at 1.2x per level; this is the same sample level.
    const playerGrowthAt50 = Math.pow(1.2, SAMPLE_LEVEL - 1);

    const title = document.createElement('h2');
    title.textContent = 'Choose your difficulty';
    title.style.cssText = `color: var(--text); margin: 0; font-size: 1.7rem;`;

    const sub = document.createElement('p');
    sub.innerHTML = `This sets how fast the <em>world</em> scales as you level.
                     <span style="color:#ff4757">It cannot be changed later.</span>`;
    sub.style.cssText = `color:#a4b0be; margin:0 0 6px; font-size:0.85rem; text-align:center; max-width:620px;`;

    const grid = document.createElement('div');
    grid.style.cssText = `
        display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 14px; width: 100%; max-width: 820px;
    `;

    DIFFICULTY_ORDER.forEach(id => {
        const d = DIFFICULTY_PRESETS[id];
        const worldAt50 = previewWorldFactor(d.growth, SAMPLE_LEVEL);
        // How dangerous the world is at LV 50 relative to LV 1, given that the
        // player's own health has grown by playerGrowthAt50 over the same span.
        const relative = (worldAt50 * SAMPLE_LEVEL) / playerGrowthAt50;
        const verdict = relative < 0.5 ? `${(1 / relative).toFixed(0)}x safer than LV 1`
                      : relative > 2   ? `${relative.toFixed(0)}x deadlier than LV 1`
                                       : 'about the same as LV 1';

        const card = document.createElement('button');
        card.style.cssText = `
            text-align: left; background: ${d.color}14;
            border: 1px solid ${d.color}; color: var(--text);
            border-radius: 12px; padding: 16px; cursor: pointer;
            font-family: 'Fira Code', monospace;
            display: flex; flex-direction: column; gap: 8px; transition: 0.2s;
        `;
        card.innerHTML = `
            <span style="color:${d.color}; font-weight:bold; font-size:1.05rem;">${d.label}</span>
            <span style="font-size:0.8rem; line-height:1.5;">${d.blurb}</span>
            <span style="color:#8d8699; font-size:0.72rem; line-height:1.5;">${d.detail}</span>
            <span style="margin-top:4px; font-size:0.72rem; color:${d.color};">
                World growth: ${d.growth === 100 ? 'none' : `+${d.growth - 100}% per level`}
                &nbsp;·&nbsp; At LV 50: ${verdict}
            </span>
        `;
        card.addEventListener('mouseenter', () => card.style.background = `${d.color}2e`);
        card.addEventListener('mouseleave', () => card.style.background = `${d.color}14`);
        card.addEventListener('click', () => confirmDifficulty(id, overlay, onComplete));
        grid.appendChild(card);
    });

    overlay.appendChild(title);
    overlay.appendChild(sub);
    overlay.appendChild(grid);
    document.body.style.pointerEvents = 'auto';
    document.body.appendChild(overlay);
}

/* ------------------------------------------------------------
   4. Death
   Previously dying just froze the page: pointerEvents went to "none" and
   nothing ever restored it. The run now ends properly, with the same two
   ways forward the start screen offers.
   ------------------------------------------------------------ */

let deathHandled = false;

function handlePlayerDeath() {
    if (deathHandled) return; // both combat paths can reach this in one turn
    deathHandled = true;

    if (typeof currentBossBGM !== 'undefined' && currentBossBGM) {
        try { currentBossBGM.pause(); } catch (err) { /* already gone */ }
        currentBossBGM = null;
    }

    document.body.style.pointerEvents = "none";
    if (typeof awardAchievement === "function") awardAchievement("perishedOnce");

    if (Math.random() < 0.05) {
        if (p.kills >= 1000000n) {
            log(`Lux: Enjoy the bitter, freezing embrace of death.`, "#ff0000");
        } else {
            log(`Lux: Enjoy the bitter-sweet, cold embrace of death =)`, "var(--lux)");
        }
    } else {
        log(`${p.name}. You have perished.`, "#ff4757");
    }

    const deathSFX1 = new Audio("sfx/player_sfx/player_death/heart_crack.wav");
    triggerShake();
    deathSFX1.currentTime = 0;
    deathSFX1.play().catch(() => {});

    setTimeout(() => {
        const deathSFX2 = new Audio("sfx/player_sfx/player_death/heart_shatter.wav");
        deathSFX2.currentTime = 0;
        deathSFX2.play().catch(() => {});
    }, 1000);

    setTimeout(showDeathScreen, 2200);
}

function showDeathScreen() {
    if (document.getElementById('death-overlay')) return;

    // Any bullet-hell canvas still on screen would sit above this.
    const bulletOverlay = document.getElementById('bullet-hell-overlay');
    if (bulletOverlay) bulletOverlay.remove();

    const geno = p.kills >= 1000000n;
    const overlay = buildBootOverlay('death-overlay');
    overlay.style.background = 'rgba(0, 0, 0, 0.97)';
    // The death handler disabled input on <body>; this overlay lives inside it.
    document.body.style.pointerEvents = 'auto';

    const title = document.createElement('h1');
    title.textContent = geno ? "Don't bother coming back." : 'You have perished.';
    title.style.cssText = `color:#ff4757; margin:0; font-size:2.2rem; text-align:center;`;

    const diff = DIFFICULTY_PRESETS[currentDifficulty()];
    const summary = document.createElement('div');
    summary.style.cssText = `
        display:flex; flex-wrap:wrap; gap:18px; justify-content:center;
        color:#a4b0be; font-size:0.82rem; margin-bottom:4px;
    `;
    summary.innerHTML = [
        ['Day', formatNumber(p.day)],
        ['Level', formatNumber(p.lv)],
        ['Kills', formatNumber(p.kills)],
        ['Spares', formatNumber(p.spares)],
        ['Difficulty', `<span style="color:${diff.color}">${diff.label}</span>`]
    ].map(([k, v]) => `<span>${k}: <b style="color:var(--text)">${v}</b></span>`).join('');

    const note = document.createElement('p');
    note.textContent = 'This run is over. Your progress is gone unless you had already exported it.';
    note.style.cssText = `color:#8d8699; font-size:0.8rem; margin:0; text-align:center; max-width:520px;`;

    const row = document.createElement('div');
    row.style.cssText = `display:flex; flex-wrap:wrap; gap:16px; justify-content:center; margin-top:6px;`;

    const makeCard = (heading, body, color) => {
        const card = document.createElement('button');
        card.style.cssText = `
            width:260px; text-align:left;
            background:${color}18; border:1px solid ${color};
            color:var(--text); border-radius:12px; padding:20px; cursor:pointer;
            font-family:'Fira Code', monospace;
            display:flex; flex-direction:column; gap:8px; transition:0.2s;
        `;
        card.innerHTML = `
            <span style="color:${color}; font-size:1.05rem; font-weight:bold;">${heading}</span>
            <span style="color:#a4b0be; font-size:0.78rem; line-height:1.5;">${body}</span>
        `;
        card.addEventListener('mouseenter', () => card.style.background = `${color}33`);
        card.addEventListener('mouseleave', () => card.style.background = `${color}18`);
        return card;
    };

    const freshBtn = makeCard(
        'Start a Fresh Save',
        'Wipe this character and reload. You will pick a name, class and difficulty again.',
        '#2ed573'
    );
    const importBtn = makeCard(
        'Import a .urpg Save',
        'Load a save file and continue from there. It replaces everything stored in this browser.',
        'var(--mana)'
    );

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.urpg';
    fileInput.style.display = 'none';

    const status = document.createElement('div');
    status.style.cssText = `color:#ff4757; font-size:0.8rem; min-height:1.2em; text-align:center;`;

    // Exactly what the Settings "Reset All Progress" button does.
    freshBtn.addEventListener('click', () => resetAllProgress());

    importBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        status.style.color = '#a4b0be';
        status.textContent = 'Reading save…';

        const reader = new FileReader();
        reader.onload = (e) => {
            // allowIdentityChange: you're starting a different life here, so the
            // usual "class must match this browser" guard would only get in the way.
            const ok = importSave(e.target.result, { allowIdentityChange: true });
            event.target.value = '';
            if (ok) {
                // Drop the corpse of the run that just ended: the dead
                // character's enemy and combat view are still on screen.
                deathHandled = false;
                enemy = null;
                ['combat-view', 'shop-view', 'tree-view'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.classList.add('hidden');
                });
                const main = document.getElementById('main-controls');
                if (main) main.classList.remove('hidden');

                overlay.remove();
                document.body.style.pointerEvents = 'auto';
                updateUI();
            } else {
                status.style.color = '#ff4757';
                status.textContent = 'That file could not be read. Check the game log for details.';
            }
        };
        reader.readAsText(file);
    });

    row.appendChild(freshBtn);
    row.appendChild(importBtn);
    overlay.appendChild(title);
    overlay.appendChild(summary);
    overlay.appendChild(note);
    overlay.appendChild(row);
    overlay.appendChild(status);
    overlay.appendChild(fileInput);
    document.body.appendChild(overlay);
}

function confirmDifficulty(id, overlay, onComplete) {
    const d = DIFFICULTY_PRESETS[id];

    const confirm = buildBootOverlay('difficulty-confirm-overlay');
    confirm.style.zIndex = '10000000';
    confirm.innerHTML = `
        <h2 style="color:${d.color}; margin:0;">${d.label}?</h2>
        <p style="color:#a4b0be; text-align:center; max-width:440px; font-size:0.85rem; line-height:1.6;">
            ${d.detail}
            <br><br>
            <span style="color:#ff4757; font-weight:bold;">This cannot be changed for this save.</span>
        </p>
        <div style="display:flex; gap:14px;">
            <button id="difficulty-yes" style="
                background:${d.color}22; border:1px solid ${d.color}; color:${d.color};
                padding:12px 28px; border-radius:8px; cursor:pointer;
                font-family:'Fira Code', monospace; font-weight:bold;">Yes, I'm sure</button>
            <button id="difficulty-no" style="
                background:#2f3542; border:1px solid #57606f; color:white;
                padding:12px 28px; border-radius:8px; cursor:pointer;
                font-family:'Fira Code', monospace; font-weight:bold;">Go back</button>
        </div>
    `;
    document.body.appendChild(confirm);

    document.getElementById('difficulty-yes').onclick = () => {
        setDifficulty(id);
        confirm.remove();
        overlay.remove();
        log(`Difficulty set to <strong style="color:${d.color}">${d.label}</strong>. ${d.blurb}`, d.color);
        if (typeof updateUI === 'function') updateUI();
        if (typeof onComplete === 'function') onComplete();
    };

    document.getElementById('difficulty-no').onclick = () => confirm.remove();
}
