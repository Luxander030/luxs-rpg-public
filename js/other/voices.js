function LuxTypeToLogPissed(text, color, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = color;
    // Initialize Lux's voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/Lux/pissed.wav"); // the noise is basically flowey when he's being a menace
    newEntry.innerHTML = `[Day ${p.day}] Lux: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}

function LuxTypeToLog(text, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = "var(--lux)";
    // Initialize Lux's voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/Lux/normal.wav"); // the noise is basically asgore's talking (let's hope I don't add him into that giant chain in `bob.js`)
    newEntry.innerHTML = `[Day ${p.day}] Lux: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}

function FunfriendTypeToLog(text, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = "var(--funfriend)";
    // Initialize voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/funfriend.wav");
    newEntry.innerHTML = `[Day ${p.day}] Funfriend: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}

function RalseiTypeToLog(text, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = "var(--ralsei)";
    // Initialize Lux's voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/ralsei.wav");
    newEntry.innerHTML = `[Day ${p.day}] Ralsei: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}

function BerdlyTypeToLog(text, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = "var(--berdly)";
    // Initialize voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/berdly.wav");
    newEntry.innerHTML = `[Day ${p.day}] Berdly: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}

function SansTypeToLog(text, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = "var(--sans)";
    // Initialize voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/sans.wav");
    newEntry.innerHTML = `[Day ${p.day}] sans: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}

function NoelleTypeToLog(text, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = "var(--noelle)";
    // Initialize voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/noelle.wav");
    newEntry.innerHTML = `[Day ${p.day}] Noelle: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}

function FloweyTypeToLog(text, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = "var(--flowey)";
    // Initialize voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/flowey.wav");
    newEntry.innerHTML = `[Day ${p.day}] Flowey: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}

function PapyrusTypeToLog(text, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = "var(--papyrus)";
    // Initialize voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/papyrus.wav");
    newEntry.innerHTML = `[Day ${p.day}] Papyrus: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}

function SusieTypeToLog(text, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = "var(--susie)";
    // Initialize voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/susie.wav");
    newEntry.innerHTML = `[Day ${p.day}] Susie: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}

function TorielTypeToLog(text, delay = 50) {
    const l = document.getElementById('log');
    const newEntry = document.createElement('div');
    newEntry.style.color = "var(--toriel)";
    // Initialize voice SFX once (thank god for the scratch projects with the undertale voices)
    const voiceSFX = new Audio("sfx/voices/toriel.wav");
    newEntry.innerHTML = `[Day ${p.day}] Toriel: `; 
    l.appendChild(newEntry);
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) !== " ") {
                voiceSFX.currentTime = 0; 
                voiceSFX.play().catch(e => {console.log(e)});
            }
            newEntry.innerHTML += text.charAt(i);
            i++;
            l.scrollTop = l.scrollHeight;
            setTimeout(type, delay);
        }
    }
    type();
}