const SAVE_VERSION = 9;  // Match your p.v
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

function restoreBigInts(obj) {
    for (let key in obj) {
        // If it's a nested object (like p.flags), go deeper
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            restoreBigInts(obj[key]);
        } 
        // If it's a string that looks like a BigInt
        else if (typeof obj[key] === 'string' && /^\d+$/.test(obj[key])) {
            obj[key] = BigInt(obj[key]);
        }
    }
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

function importSave(saveText) {
    try {
        const regex = /NEURAL\s+SEGMENT::DO\s+NOT\s+EDIT::\s*([\s\S]*?)\s*::NEURAL\s+SEGMENT\s+END/;
        const match = saveText.match(regex);
        if (!match || !match[1]) throw new Error("Missing neural tags.");

        const encodedData = match[1].trim().replace(/\s/g, '');
        const decoded = xorCipher(atob(encodedData), SAVE_KEY);
        const parsed = JSON.parse(decoded);

        // Standardize BigInt handling for checksum verification
        const bigIntReplacer = (key, value) => typeof value === 'bigint' ? value.toString() : value;
        const verificationStr = JSON.stringify(parsed.payload, bigIntReplacer);

        if (checksum(verificationStr) !== parsed.checksum) {
            let currentTampered = BigInt(parsed.payload.data.flags.timesTampered || 0n);
            parsed.payload.data.flags.timesTampered = currentTampered + 1n;
            const tamperCount = parsed.payload.data.flags.timesTampered;
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
        let loadedPlayer = parsed.payload.data;
        restoreBigInts(loadedPlayer);
        // Apply to global state
        p = loadedPlayer;
        p.v = SAVE_VERSION;
        const completedGenocideRun = localStorage.getItem('completedGenocideRun');
        if (completedGenocideRun === 'true') {
            triggerGenocideDialogue();
        } else {
            log(`Success! Welcome back to Day ${p.day.toString()}.`, "var(--unlocked)");
        }
        
        updateUI();
        renderTree();

    } catch (err) {
        console.error("Full Import Error:", err);
        log("Error: Could not read file. Check console for details.", "#ff4757");
        log(`${err}`, "#ff4757")
        if (p.flags.timesTampered >= 1) {
            log(`Lux: I see tampering with the world has caused... undesirable consequences.`,"#ff0000")
        }
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

function checkGenocideRun() {
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