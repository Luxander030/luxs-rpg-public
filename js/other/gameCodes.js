const toggleBtn = document.getElementById('codes-button');
const codesPanel = document.getElementById('codes-panel');
const codeInput = document.getElementById('codes-input');
const submitBtn = document.getElementById('submit-code');

toggleBtn.addEventListener('click', () => {
    const isHidden = codesPanel.classList.toggle('hidden');
    if (!isHidden) {
        codeInput.focus();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        codesPanel.classList.add('hidden');
    }
});

function processCode() {
    const val = codeInput.value.trim();
    if (!val) return;
    if (val === 'luxanderVentingTicket' && !p.codesUsed.includes('luxanderVentingTicket')) {
        p.mhp *= 4n
        p.mmp *= 4n
        p.msn *= 4n
        p.hp = p.mhp
        p.sn = p.msn
        p.mp = p.mmp
        p.sp += 1000n
        p.gold += 1000000000000n
        p.gems += 10000n
        p.codesUsed.push('luxanderVentingTicket')
        LuxLog(`Luxander: You could have gotten this code one of two ways. Looking through 'cheat_codes.js,' or doing something else. If you found it looking through 'cheat_codes.js,' thanks for listening to my ranting. It means a lot.`)
        updateUI();
    } 
    else if (val === 'Lucky' && !p.codesUsed.includes('Lucky')) {
        p.codesUsed.push('Lucky')
        let scaledAmount = ((p.gold * p.lv) / 100n) || 1000n
        p.gold += scaledAmount
        log(`Used code: "Lucky"`, "var(--gold)")
        log(`Gained ${scaledAmount} Gold`, "var(--gold)")
        updateUI();
    } else if (val === 'Version9Release' && !p.codesUsed.includes('Version9Release')) {
        p.codesUsed.push('Version9Release')
        p.mhp *= 2n; p.hp *= 2n;
        p.mmp *= 2n; p.mp *= 2n;
        p.msn *= 2n; p.sn *= 2n;
        p.gold *= 2n; p.sp += 5n; p.gems += 10n
        log(`Welcome to V9! As a bonus, you have been given some gifts.`, "var(--funfriend)")
        updateUI();
    } else if (val === 'help me' && !p.codesUsed.includes('help me')) {
        p.codesUsed.push('help me')
        p.mhp *= 100n; p.hp *= 100n;
        p.mmp *= 100n; p.mp *= 100n;
        p.msn *= 100n; p.sn *= 100n;
        p.gold *= 100n; p.sp += 100n; p.gems += 100n
        log(`Luxander: I need help.`)
        updateUI();
    } else if (val === 'Enter codes...' && !p.codesUsed.includes('Enter codes...')) {
        log(`Funfriend: Why...?`)
        p.codesUsed.push('Enter codes...')
        p.gold += p.gold / 4n
    } else if (val === 'Gluttony\'s pantry' && !p.codesUsed.includes('Gluttnoy\'s pantry')) {
        log(`You managed to steal some food from Gluttony's pantry. Nice.`)
        checkSpareAndAddItem("Lux's Sandwich")
        checkSpareAndAddItem("Lux's Sandwich")
        checkSpareAndAddItem("Lux's Sandwich")
        checkSpareAndAddItem("Lux's Sandwich")
        checkSpareAndAddItem("Lux's Sandwich")
        LuxLog(`Lux: Wait. Hold on. How'd you get those from Gluttony's pantry...? Gluttony I swear to god if you stole my sandwiches-`)
    }
    else {
        log("Funfriend: Unknown code or already used code.", "var(--funfriend)");
    }
    codeInput.value = ''; 
}

submitBtn.addEventListener('click', processCode);
codeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') processCode(); });