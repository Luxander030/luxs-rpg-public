// The release this build writes saves as. Keep in step with p.v (playerinfo.js),
// version.txt and the version shown in index.html.
// Saves from before 4.2.0 carry an incrementing integer here instead (…8, 9);
// compareSaveVersions() understands both schemes.
const SAVE_VERSION = "4.2.0";
const SAVE_KEY = 'LuxExistsOutsideOfTimeSoDontTryToEscapeHim';  // Any secret string; longer = better security (but this is just obfuscation, not real crypto)

// XOR cipher (reversible encryption with key)
function xorCipher(str, key) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

// checksum (sum of char codes; detects tampering)
function checksum(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum;
}

/* ============================================================
   LEGACY SAVE MIGRATION

   Saves are JSON, so every BigInt leaves as a string and every field added
   after a save was written is simply absent when it comes back. Rather than
   keeping a hand-written migration per version, the loaded save is walked
   against PRISTINE_PLAYER (playerinfo.js) and reconciled field by field:

     - missing fields are filled in from the defaults
     - each value is coerced to the *type of its default*, so "150" becomes
       150n only where the default is a BigInt
     - fields the current build doesn't know about are carried through
       untouched, so a save from a newer build survives a round trip

   This is self-maintaining: anything added to `p` is automatically understood
   by the migrator without touching this file.
   ============================================================ */

// "150" -> 150n, "-100" -> -100n. The old importer used /^\d+$/, which left
// every negative value as a string — and the game can produce them
// (`p.mp = -100n * ...`, `p.manaReduction = -100n`).
function toBigIntOr(value, fallback) {
    if (typeof value === 'bigint') return value;
    if (typeof value === 'number' && Number.isFinite(value)) return BigInt(Math.trunc(value));
    if (typeof value === 'string' && /^-?\d+$/.test(value.trim())) return BigInt(value.trim());
    if (typeof value === 'boolean') return value ? 1n : 0n;
    return fallback;
}

// Reconcile one value against its default. `stats` collects what happened so
// the player can be told.
function coerceToTemplate(value, template, stats, path) {
    // Arrays: keep the saved contents (storage may have been upgraded and is
    // longer than the default), but fall back if it isn't an array at all.
    if (Array.isArray(template)) {
        if (!Array.isArray(value)) { stats.repaired.push(path); return clonePlainData(template); }
        return value;
    }

    if (template !== null && typeof template === 'object') {
        const out = {};
        // Start from the template so every known field exists.
        for (const key of Object.keys(template)) {
            if (value && Object.prototype.hasOwnProperty.call(value, key)) {
                out[key] = coerceToTemplate(value[key], template[key], stats, path ? `${path}.${key}` : key);
            } else {
                out[key] = clonePlainData(template[key]);
                stats.filled.push(path ? `${path}.${key}` : key);
            }
        }
        // Carry through anything the current build doesn't know about.
        if (value && typeof value === 'object') {
            for (const key of Object.keys(value)) {
                if (!(key in out)) {
                    out[key] = value[key];
                    stats.unknown.push(path ? `${path}.${key}` : key);
                }
            }
        }
        return out;
    }

    if (typeof template === 'bigint') {
        const converted = toBigIntOr(value, null);
        if (converted === null) { stats.repaired.push(path); return template; }
        return converted;
    }

    if (typeof template === 'boolean') {
        if (typeof value === 'boolean') return value;
        if (value === 'true' || value === 'false') return value === 'true';
        stats.repaired.push(path);
        return template;
    }

    if (typeof template === 'number') {
        const n = Number(value);
        if (!Number.isFinite(n)) { stats.repaired.push(path); return template; }
        return n;
    }

    // Strings, and nulls used as "unset" (name / class / difficulty). A saved
    // name of "42" stays the string "42" here — the old blanket converter
    // turned it into a BigInt.
    if (value === undefined) { stats.filled.push(path); return clonePlainData(template); }
    if (typeof value === 'bigint') return value.toString();
    return value;
}

// The save envelope has moved around across versions; accept what we can find.
function extractSavePayload(parsed) {
    // The version can live on the envelope or on the player object, and the two
    // can disagree on a hand-edited save. Prefer the envelope, fall back to p.v.
    const pick = (data, ...candidates) => ({
        data,
        v: candidates.find(v => typeof v === 'number' || (typeof v === 'string' && v)) ?? data?.v
    });
    if (parsed && parsed.payload && parsed.payload.data) return pick(parsed.payload.data, parsed.payload.v, parsed.v);
    if (parsed && parsed.data)                           return pick(parsed.data, parsed.v);
    // Oldest shape: the player object itself, unwrapped.
    if (parsed && (parsed.hp !== undefined || parsed.lv !== undefined)) return pick(parsed, parsed.v);
    return { data: null, v: undefined };
}

// Save versions come in two flavours: the old incrementing integer (9, 10) and
// the release string ("4.2.0"). Returns -1/0/1, or null when it can't tell.
function compareSaveVersions(a, b) {
    const parse = (v) => {
        if (typeof v === 'number' && Number.isFinite(v)) return { legacy: true, parts: [v] };
        if (typeof v === 'string' && /^\d+(\.\d+)*$/.test(v.trim())) {
            return { legacy: false, parts: v.trim().split('.').map(Number) };
        }
        return null;
    };
    const A = parse(a), B = parse(b);
    if (!A || !B) return null;
    // Any integer-scheme version predates every release-numbered one.
    if (A.legacy !== B.legacy) return A.legacy ? -1 : 1;
    const len = Math.max(A.parts.length, B.parts.length);
    for (let i = 0; i < len; i++) {
        const x = A.parts[i] ?? 0, y = B.parts[i] ?? 0;
        if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
}

// Shapes that genuinely changed, rather than fields that were merely added.
// Type-driven coercion can't infer these on its own, so they're handled by hand
// before the template walk. Add to this as the shape of `p` evolves.
function normaliseLegacyShapes(raw) {
    if (!raw || typeof raw !== 'object') return raw;

    // Achievements began life as bare booleans (`usedLuxSandwich: false`) and
    // later became objects. Without this, an earned one arrives as `true`,
    // fails the object merge, and is silently rebuilt as unearned.
    if (raw.achievements && typeof raw.achievements === 'object') {
        for (const [id, value] of Object.entries(raw.achievements)) {
            if (typeof value === 'boolean') {
                raw.achievements[id] = { completed: value };
            } else if (value === 'true' || value === 'false') {
                raw.achievements[id] = { completed: value === 'true' };
            }
        }
    }

    return raw;
}

function migrateSave(loaded, fromVersion) {
    const stats = { filled: [], repaired: [], unknown: [] };
    const player = coerceToTemplate(normaliseLegacyShapes(loaded), PRISTINE_PLAYER, stats, '');
    player.v = SAVE_VERSION;
    return { player, stats, fromVersion };
}

function describeMigration({ stats, fromVersion }) {
    const changed = stats.filled.length + stats.repaired.length;
    const order = compareSaveVersions(fromVersion, SAVE_VERSION);
    const versionMoved = order !== 0;

    // An up-to-date save that needed nothing shouldn't say anything.
    if (!changed && !versionMoved) return null;

    // A save from a build newer than this one: we kept what we understood.
    if (order === 1) {
        return `Funfriend: This save is from a newer version (${fromVersion}). `
             + `Loaded it as best I could — anything I didn't recognise was left alone.`;
    }

    const from = fromVersion === undefined ? 'an unversioned save' : `save version ${fromVersion}`;
    const bits = [];
    if (stats.filled.length)   bits.push(`${stats.filled.length} new field${stats.filled.length === 1 ? '' : 's'} filled in`);
    if (stats.repaired.length) bits.push(`${stats.repaired.length} repaired`);
    const detail = bits.length ? bits.join(', ') : 'nothing needed changing';

    return `Funfriend: Upgraded ${from} to version ${SAVE_VERSION} — ${detail}.`;
}

function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        importSave(text);
        event.target.value = ''; 
    };
    reader.readAsText(file);
}

// opts.allowIdentityChange skips the "class must match this browser" guard.
// Used by the start screen and the death screen, where the whole point is to
// begin a different life; the in-run Settings import keeps the guard.
function importSave(saveText, opts = {}) {
    try {
        const regex = /NEURAL\s+SEGMENT::DO\s+NOT\s+EDIT::\s*([\s\S]*?)\s*::NEURAL\s+SEGMENT\s+END/;
        const match = saveText.match(regex);
        if (!match || !match[1]) throw new Error("Missing neural tags.");

        const encodedData = match[1].trim().replace(/\s/g, '');
        const decoded = xorCipher(atob(encodedData), SAVE_KEY);
        const parsed = JSON.parse(decoded);

        const bigIntReplacer = (key, value) => typeof value === 'bigint' ? value.toString() : value;

        // Envelope shape has moved across versions; find the player object wherever it is.
        const { data: rawPlayer, v: savedVersion } = extractSavePayload(parsed);
        if (!rawPlayer) throw new Error("No player data found in save.");

        // Only verify when there is something to verify against. Saves predating
        // the checksum have none, and accusing their owner of tampering would be
        // both wrong and unrecoverable.
        if (parsed.payload !== undefined && typeof parsed.checksum === 'number') {
            const verificationStr = JSON.stringify(parsed.payload, bigIntReplacer);
            if (checksum(verificationStr) !== parsed.checksum) {
                if (!rawPlayer.flags || typeof rawPlayer.flags !== 'object') rawPlayer.flags = {};
                const currentTampered = toBigIntOr(rawPlayer.flags.timesTampered, 0n);
                rawPlayer.flags.timesTampered = currentTampered + 1n;
                const tamperCount = rawPlayer.flags.timesTampered;

                if (tamperCount >= 15n) {
                    LuxTypeToLogPissed(`THAT'S IT.`, "#ff0000", 25)
                    setTimeout(() => {
                        LuxTypeToLogPissed(`YOU'VE PUSHED ME TOO FAR`, "#ff0000", 25)
                    }, 900)
                    setTimeout(() => {
                        document.title = "FATAL ERROR";
                        document.body.innerHTML = "";
                    }, 3000)
                } else if (tamperCount >= 12n) {
                    log(`Lux: 12 times. 12 times you have tampered with the integrity of this world. Yet I still stand. Disgusted. Have you not seen the pain you have caused on the creatures in this world? Each time you try to edit your save, fail to do something, and cause the checksum in game to trigger, you burn through each creatures soul each time you do so. Have you not seen the pain you have caused with your tampering? It's effectivly torture on them, and they don't even know why it's happening.`,"#ff0000")
                } else if (tamperCount >= 9n) {
                    log("Lux: Over 8 times tampered. Yet I still exist.", "#ff0000");
                } else if (tamperCount >= 6n) {
                    log("Lux: 5 times. You've done it more than 5 times already. Yet I still know.", "#ff0000");
                } else if (tamperCount >= 3n) {
                    log("Lux: I see what you did there. You've done it more than twice.", "#ff0000");
                } else {
                    log("Lux: I see what you did there. You cannot hide your sins.", "#ff0000");
                }
            }
        } else {
            log(`Funfriend: This save has no checksum to verify. Loading it anyway.`, "var(--funfriend)");
        }

        // Reconcile against the current defaults: fill in anything the save
        // predates, and coerce every value to the type its default declares.
        const migration = migrateSave(rawPlayer, savedVersion);
        const loadedPlayer = migration.player;

        // Reject if class doesn't match the one stored in localStorage
        const localClass = localStorage.getItem('luxsRPGplayerClass');
        if (!opts.allowIdentityChange && localClass && loadedPlayer.class !== localClass) {
            log(`Lux: The soul trying to enter this world does not match the one that left it.`, "#ff0000");
            log(`Error: Save file class mismatch. Import rejected.`, "#ff4757");
            playCantSelectSFX();
            return false;
        }

        p = loadedPlayer;
        p.v = SAVE_VERSION;

        // backfill any achievement added since this save was made
        if (typeof syncAchievements === "function") syncAchievements();
        syncLocalStorageFromSave();

        const completedGenocideRun = localStorage.getItem('completedGenocideRun');
        if (completedGenocideRun === 'true') {
            triggerGenocideDialogue();
        } else {
            log(`Success! Welcome back to Day ${formatNumber(p.day)}.`, "var(--unlocked)");
        }
        const summary = describeMigration(migration);
        if (summary) log(summary, "var(--funfriend)");
        if (migration.stats.unknown.length) {
            console.info('Save carried fields this build does not know about:', migration.stats.unknown);
        }

        updateUI();
        renderTree();
        bob();
        return true;
    } catch (err) {
        console.error("Full Import Error:", err);
        log("Error: Could not read file. Check console for details.", "#ff4757");
        log(`${err}`, "#ff4757")
        if (p.flags.timesTampered >= 1) {
            LuxTypeToLogPissed(`I see tampering with this save caused... undesirable consequences.`)
        }
        return false;
    }
}

// Replace everything this browser stores about the player with what the save
// file says, so an imported character is the character on the next refresh
// too. Deliberately does NOT touch luxsRPGkeybinds: bindings are a device
// preference, not part of a save.
function syncLocalStorageFromSave() {
    const identity = {
        luxsRPGplayerName: p.name || null,
        luxsRPGplayerClass: p.class || null,
        luxsRPGdifficulty: p.difficulty || 'easy',
        // Route records live only in localStorage, but the save carries the
        // matching flags — so an imported save brings its own history with it
        // rather than inheriting the previous character's.
        completedGenocideRun: (p.flags?.genocideRouteTimesCompleted === true || p.kills >= 1000000n)
            ? 'true' : 'false',
        completedPacifistRun: p.flags?.pacifistRouteTimesCompleted === true ? 'true' : 'false'
    };

    for (const [key, value] of Object.entries(identity)) {
        if (value === null) localStorage.removeItem(key);
        else localStorage.setItem(key, value);
    }
}

function download(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
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
    const bigIntReplacer = (key, value) => typeof value === 'bigint' ? value.toString() : value;
    const payloadStr = JSON.stringify({ v: SAVE_VERSION, data: p }, bigIntReplacer);
    const fullSaveObject = {
        payload: { v: SAVE_VERSION, data: p },
        checksum: checksum(payloadStr)
    };
    const wrapped = JSON.stringify(fullSaveObject, bigIntReplacer);
    const encoded = btoa(xorCipher(wrapped, SAVE_KEY));
    const taggedSave = `NEURAL SEGMENT::DO NOT EDIT::${encoded}::NEURAL SEGMENT END`;

    let filename = 'luxs_rpg_save.urpg';
    if (Math.random() < 0.05) {
        if (p.kills >= 1000000n) {
            log(`Lux: Oh you're leaving? Finally. Took you long enough.`, "#ff0000")
            filename = 'leave.urpg';
            download(taggedSave, filename)
            log('Save file exported', 'var(--gold)');
        } else {
            log(`Lux: This world was never yours to keep.`, 'var(--lux)');
            filename = 'luxs_world_not_yours.urpg';
            download(taggedSave, filename);
            log('Save file exported', 'var(--gold)');
        }
    } else if (p.spares >= 1000000n) {
        document.body.style.pointerEvents = "none";
        log(`Lux: Look at you! A million hugs and zero... kills. I've decided to rename your save file to something that reflects your... unique playstyle.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: <i>Aggressively throws confetti at your cursor, and also places something on the save...</i>`, "var(--lux)");
        }, 2000)
        setTimeout(() => {
            const goofyNames = [
                'hugs_and_more_hugs_and_more_hugs_and_more_hugs_and_more_hugs_and_more_hugs_and_more_hugs.urpg',
                'professional_friendship_simulator.urpg',
                'luxs_favorite_pacifist_wimp.urpg',
                'yay_all_mercy.urpg',
                'sandwich_eating_champion.urpg',
                'happiness.urpg',
                'SANDWICH.urpg',
                'sandwich_time.urpg',
                'bob.urpg',
                'cute_sticker.urpg',
                'confetti.urpg'
            ];
            filename = goofyNames[Math.floor(Math.random() * goofyNames.length)];
            log(`Funfriend: Lux has spent the last 20 minutes designing a custom sticker for your save file. Please be nice to him.`, "");
            download(taggedSave, filename);
            log('Save file exported', 'var(--gold)');
        }, 4000)
        setTimeout(() => {
            log(`Lux: Do you like the sticker I made for your save?`, "var(--lux)")
        }, 6000)
        setTimeout(() => {
            document.body.style.pointerEvents = "auto";
        }, 7000)
    } else {
        filename = 'luxs_rpg_save.urpg';
        download(taggedSave, filename);
        log(`Save exported!`,'var(--gold)')
    }
}

function triggerGenocideDialogue() {
    p.kills = 1000000n
    document.body.style.pointerEvents = "none";
    log(`Lux: ${formatNumber(p.day)} days survived. An LV of ${formatNumber(p.lv)}. Yet you still don't know what LV means, do you? Do I need to dumb it down so you understand?`, "#ff0000")
    setTimeout(() => {
        log(`Lux: It's much simpler than you think.`, "#ff0000")
    }, 3000)
    setTimeout(() => {
        log(`Lux: It means Level Of Violence. You weren't increasing your strength. You were disconnecting yourself from empathy each time you did. You allowed yourself to harm others easier.`, "#ff0000")
    }, 6000)
    setTimeout(() => {
        log(`Lux: But at what cost. You are a parasite in this world. You took control of some poor soul, and piloted their body as a vessel.`, "#ff0000")
    }, 9000)
    setTimeout(() => {
        log(`Lux: Now look what you have done to this poor soul. Knowing nothing but violence.`, "#ff0000")
    }, 12000)
    setTimeout(() => {
        log(`Lux: What if they had a family? A wife and kids?`, "#ff0000")
    }, 15000)
    setTimeout(() => {
        log(`Lux: I saw this person from birth to now.`, "#ff0000")
    }, 18000)
    setTimeout(() => {
        log(`Lux: Saw all their ups and downs.`, "#ff0000")
    }, 21000)
    setTimeout(() => {
        log(`Lux: They used to love going out with their family to restaurants.`, "#ff0000")
    }, 24000)
    setTimeout(() => {
        log(`Lux: Sometimes they would go to a steakhouse. Sometimes they would try something new.`, "#ff0000")
    }, 27000)
    setTimeout(() => {
        log(`Lux: But now. All they know is how to hold a knife. A knife that originally was used to share meals with family. But now only represents the one thing they hate. YOU.`, "#ff0000")
    }, 30000)
    setTimeout(() => {
        log(`Lux: They wanted to do something. Maybe ask someone to maim them so they could stop all this mindless killing.`, "#ff0000")
    }, 33000)
    setTimeout(() => {
        log(`Lux: Yet you.`, "#ff0000")
    }, 36000)
    setTimeout(() => {
        log(`Lux: You were the one reason they couldn't. You stopped them without realising. You kept on attacking, forgetting about the way their hands shook with each life you took.`, "#ff0000")
    }, 39000)
    setTimeout(() => {
        LuxTypeToLogPissed(`Are you happy with what you have done? To poor James here?`, "#ff0000", 50)
    }, 44000)
    setTimeout(() => {
        document.body.style.pointerEvents = "auto";
    }, 50000)
}

function goofExportSave() {
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
    
    let filename = 'this_is_your_fault_lux.urpg';
    download(taggedSave, filename)
}