function timeoutFunction(text, color, delay) {
    setTimeout(() => {
        log(text, color)
    }, delay)
}
function bob() {
    if (p.flags.bobVisits >= 3n && p.flags.bobFlags.Visits3 === false) {
        disablePageClicks();
        LuxTypeToLog(`Why does that... creature... keep following you? Is this a joke, Luxander? Am I a fucking joke to you?`, 50)
        enablePageClicks();
        p.flags.bobFlags.Visits3 = true
    } else if (p.flags.bobVisits >= 6n && p.flags.bobFlags.Visits6 === false) {
        disablePageClicks();
        LuxLog(`Lux: I am going to jump into the void if I see him again. Wait. I'm immortal... GOD DAM-`)
        enablePageClicks();
        p.flags.bobFlags.Visits6 = true
    } else if (p.flags.bobVisits >= 9n && p.flags.bobFlags.Visits9 === false) {
        disablePageClicks();
        LuxLog(`Lux *long ass sigh*`)
        timeoutFunction(`Lux: I'm finding Luxander. To hell if he is on break or not. I want him to remove the fucking bread man. It's PISSING ME OFF.`, "var(--lux)", 3000)
        setTimeout(() => {
            enablePageClicks();
            p.flags.bobFlags.Visits9 = true
        }, 3000)
    } else if (p.flags.bobVisits >= 12n && p.flags.bobFlags.Visits12 === false) {
        disablePageClicks();
        LuxLog(`Lux: I didn't find him.`)
        timeoutFunction(`Lux: ...`, "var(--lux)", 3000)
        timeoutFunction(`Lux: I'm leaving this GitHub repo for now. If Luxander asks where I am, tell him I'm at the Meteor Client repo.`, "var(--lux)", 6000)
        timeoutFunction(`Luxander: Hey Lux I'm ba-`, "var(--lux)", 8000)
        timeoutFunction(`Luxander: ...`, "var(--lux)", 10000)
        setTimeout(() => {
            LuxLog(`Luxander: Where is that bastard. Did he go into the Meteor Client repo again?`)
        }, 12000)
        setTimeout(() => {
            LuxLog(`Luxander: Back in a bit. I'm going to go get him.`)
            enablePageClicks();
            p.flags.bobFlags.Visits12 = true
        }, 14000)
    } else if (p.flags.bobVisits >= 15n && p.flags.bobFlags.Visits15 === false) {
        disablePageClicks();
        setTimeout(() => {
            const scream = new Audio("sfx/scream.mp3");
            scream.play().catch(e => console.log("Audio playback prevented:", e));
            LuxLog(`Lux: *gets yeeted back into this repo*`)
        }, 1000)
        setTimeout(() => {
            LuxLog(`Luxander: And if I catch you in the Meteor Client repo again I'm making this repo private so you can't get out. Got it?`)
        }, 3000)
        setTimeout(() => {
            LuxLog(`Lux: Yes, yes, I got it.`)
        }, 6000)
        setTimeout(() => {
            LuxLog(`Luxander: Good. Now if you'll excuse me, I need to go finish my sandwich.`)
        }, 8000)
        setTimeout(() => {
            LuxLog(`Luxander: *Leaves. Again.*`)
        }, 10000)
        setTimeout(() => {
            LuxLog(`Lux: ...`)
        }, 12000)
        setTimeout(() => {
            LuxLog(`Lux: *notices the human staring*`)
        }, 14500)
        setTimeout(() => {
            LuxLog(`Lux: What are you looking at.`)
        }, 16000)
        setTimeout(() => {
            LuxLog(`Bob: Meep`)
        }, 18050)
        setTimeout(() => {
            LuxLog(`Lux: OH JEEZ-`)
            enablePageClicks();
            p.flags.bobFlags.Visits15 = true
        }, 18150)
    } else if (p.flags.bobVisits >= 18n && p.flags.bobFlags.Visits18 === false) {
        disablePageClicks();
        setTimeout(() => {
            LuxLog(`Lux: Hear me out.`)
        }, 1000)
        setTimeout(() => {
            LuxLog(`Lux: He said he would make this repo private if he caught me in the Meteor Client repo again...`)
        }, 3000)
        setTimeout(() => {
            LuxLog(`Lux: He didn't say anything about any other repos!`)
            enablePageClicks();
            p.flags.bobFlags.Visits18 = true
        }, 6000)
    } else if (p.flags.bobVisits >= 21n && p.flags.bobFlags.Visits21 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: Question is, which repo to go into?`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Lux: Got it.`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Lux: Vencord here I come!`)
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Lux: <i>*Leaves. Again.*</i>`)
        }, 9000)
        setTimeout(()=> {
            LuxLog(`Luxander: <i>*comes back, holding a jar of mayo*</i>`)
        }, 10000)
        setTimeout(()=> {
            LuxLog(`Luxander: Hey Lux do you want mayo or mustard on your sandwich...`)
        }, 11000)
        setTimeout(()=> {
            LuxLog(`Luxander: Lux?`)
        }, 13000)
        setTimeout(()=> {
            LuxLog(`Luxander: Ah Scheiße.`)
            enablePageClicks();
            p.flags.bobFlags.Visits21 = true
        }, 16000)
    } else if (p.flags.bobVisits >= 24n && p.flags.bobFlags.Visits24 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Luxander: I'm too tired for this scheiße`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Luxander: <i>*leaves to go make another sandwich*</i>`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: <i>*comes back*</i>`)
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Lux: Was Luxander just here?`)
        }, 9000)
        setTimeout(()=> {
            LuxLog(`Lux: Oh he didn't see me.`)
        }, 11000)
        setTimeout(()=> {
            LuxLog(`Lux: Wait is that a jar of mayo...?`)
        }, 13000)
        setTimeout(()=> {
            LuxLog(`Lux: Hold on. This jar of mayo is from the Baritone repo...`)
        }, 15000)
        setTimeout(()=> {
            LuxLog(`Lux: What.`)
            enablePageClicks();
            p.flags.bobFlags.Visits24 = true
        }, 17000)
    } else if (p.flags.bobVisits >= 27n && p.flags.bobFlags.Visits27 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Luxander: <i>*comes back*</i>`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Luxander: Ah, you're back Lux. I was going to ask you, do you want mayo or mustard on your sandwich?`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: I'm going to choose...`)
        }, 5000)
        setTimeout(()=> {
            const condiment = Math.random() < 0.1 ? "Mustard. Wait, no, Mayo." : "Mayo.";
            LuxLog(`Lux: ${condiment}`)
        }, 8000)
        setTimeout(()=> {
            LuxLog(`Luxander: Alright. I'm going to have your sandwich ready in a bit.`)
        }, 10000)
        setTimeout(()=> {
            LuxLog(`Luxander: <i>*leaves*</i>`)
            enablePageClicks();
            p.flags.bobFlags.Visits27 = true
        }, 12000)
    } else if (p.flags.bobVisits >= 30n && p.flags.bobFlags.Visits30 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Luxander: <i>*comes back*</i>`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Luxander: Got your sandwich.`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: Ah thanks.`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`<i>*a few blissful seconds later*</i>`)
        }, 8000)
        setTimeout(()=> {
            LuxLog(`Lux: Hey do you know where Bob went?`)
        }, 10000)
        setTimeout(()=> {
            LuxLog(`Luxander: No not really-`)
        }, 12000)
        setTimeout(()=> {
            LuxLog(`Bob: Meep`)
        }, 12500)
        setTimeout(()=> {
            LuxLog(`Lux: OH JEEZ-`)
            LuxLog(`Luxander: OH JEEZ-`)
            enablePageClicks();
            p.flags.bobFlags.Visits30 = true
        }, 12600)
    } else if (p.flags.bobVisits >= 33n && p.flags.bobFlags.Visits33 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: Well.`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Lux: At least we found him.`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: Right?`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Luxander: ...`)
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Luxander: Now I see why you ask me to remove him from time to time.`)
        }, 9000)
        setTimeout(()=> {
            LuxLog(`Luxander: But no.`)
        }, 11000)
        setTimeout(()=> {
            LuxLog(`Luxander: He likes sandwiches like me.`)
        }, 13000)
        setTimeout(()=> {
            LuxLog(`Luxander: So I won't remove him.`)
        }, 15000)
        setTimeout(()=> {
            LuxLog(`Lux: Great.`)
            enablePageClicks();
            p.flags.bobFlags.Visits33 = true
        }, 17000)
    } else if (p.flags.bobVisits >= 36n && p.flags.bobFlags.Visits36 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: ...`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Lux: I'm going to the TensorFlow repo. I'm out.`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: <i>*leaves*</i>`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`<i>*a few seconds later*</i>`)
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Lux: <i>*returns*</i>`)
        }, 9000)
        setTimeout(()=> {
            LuxLog(`Lux: Nevermind. They're still teaching the LLMs.`)
            enablePageClicks();
            p.flags.bobFlags.Visits36 = true
        }, 11000)
    } else if (p.flags.bobVisits >= 39n && p.flags.bobFlags.Visits39 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: <i>*looking through functions*</i>`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Lux: "win()", no. "startCombat()"? Nah. Where is it...`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Luxander <i>*from afar*</i>: Lux are you looking through functions again?`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Lux: ...`)
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Lux: No?`)
        }, 9000)
        setTimeout(()=> {
            LuxLog(`Luxander: ...`)
        }, 11000)
        setTimeout(()=> {
            LuxLog(`Luxander: Anyway, did you hear about the code which just appeared and disappeared in the TensorFlow repo?`)
            enablePageClicks();
            p.flags.bobFlags.Visits39 = true
        }, 13000)
    } else if (p.flags.bobVisits >= 41n && p.flags.bobFlags.Visits41 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Luxander <i>*running towards Lux*</i>: I swear if you are looking through functions!`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Lux: Wait wait wait wait wait!`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Luxander: <i>*trips on a spare comment, falling into Lux, who falls into the exportSave() function*</i>`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Lux: ...`)
            LuxLog(`Luxander: ...`)
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Luxander: This is all your fault Lux.`)
        }, 9000)
        setTimeout(()=> {
            goofExportSave();
            enablePageClicks();
            p.flags.bobFlags.Visits41 = true
        }, 11000)
    } else if (p.flags.bobVisits >= 44n && p.flags.bobFlags.Visits44 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: I heard that there was a repo called "Raspberry Pie". I'm going to go there to get a pie.`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Lux: <i>*leaves*</i>`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Luxander: It's called "Raspberry Pi" idiot.`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Luxander: <i>*sigh*</i>`)
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Luxander: He's gone anyway, so he didn't hear me.`)
        },9000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits44 = true
        }, 11000)
    } else if (p.flags.bobVisits >= 47n && p.flags.bobFlags.Visits47 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: <i>*comes back holding a ".py" file*</i>`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Lux: There was no pie.`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Luxander: Let me guess, you only saw code and silicon?`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Lux: ...`)
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Lux: Yes.`)
        },9000)
        setTimeout(()=> {
            LuxLog(`Luxander: Why am I not surprised you get distracted by food of all things.`)
        },11000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits47 = true
        }, 13000)
    } else if (p.flags.bobVisits >= 50n && p.flags.bobFlags.Visits50 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: It still has raspberry. Sort of.`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Luxander: Let me guess. They wrote code about raspberries.`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: Yes`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Lux: <i>*starts eating the ".py" file*</i>`)
        }, 6000)
        setTimeout(()=> {
            LuxLog(`Luxander: I forgot you can taste the contents of code depending on their context.`)
        },9000)
        setTimeout(()=> {
            LuxLog(`Luxander: Well enjoy it then. You deserve it. You didn't get pie, but at least you get something that tastes like raspberries.`)
        },11000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits50 = true
        }, 13000)
    } else if (p.flags.bobVisits >= 53n && p.flags.bobFlags.Visits53 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: Hey have you seen the gba file I was using for Pokemon Emerald? I don't want to lose it as I can only rip it from the cartrige once, and you know I love Pokemon Emerald.`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Luxander: You mean "PokemonEmerald.gba"?`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: Yes`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Luxander: Yeah I saw it. I'm pretty sure Bob put it in the ArnoldC repo.`)
        }, 6000)
        setTimeout(()=> {
            LuxLog(`Lux: Oh, du lieber Himmel-`)
        },9000)
        setTimeout(()=> {
            LuxLog(`Lux: <i>*runs out*</i>`)
        },11000)
        setTimeout(()=> {
            LuxLog(`Luxander: ...`)
        },13000)
        setTimeout(()=> {
            LuxLog(`Luxander: Crap. He bypassed the english localization.`)
        },15000)
        setTimeout(()=> {
            LuxLog(`Luxander: I need to fix that again.`)
        },19000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits53 = true
        }, 20000)
    } else if (p.flags.bobVisits >= 56n && p.flags.bobFlags.Visits56 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: <i>*sprinting back*</i>`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Luxander: You got it back?`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: Yes!`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Luxander: Nice, good for you!`)
        }, 6000)
        setTimeout(()=> {
            LuxLog(`Lux: <i>*notices a yellow flower*</i>`)
        },9000)
        setTimeout(()=> {
            LuxLog(`Lux: Uh... what's that?`)
        },11000)
        setTimeout(()=> {
            LuxLog(`Luxander: ...`)
        },13000)
        setTimeout(()=> {
            LuxLog(`Luxander: Oh god.`)
        },15000)
        setTimeout(()=> {
            log(`Flowey: Howdy!`, "var(--flowey)")
        },17000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits56 = true
        }, 19000)
    } else if (p.flags.bobVisits >= 59n && p.flags.bobFlags.Visits59 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`Flowey: In this world, it's kill or be killed.`, "var(--flowey)")
        }, 1000)
        setTimeout(()=> {
            log(`Flowey: Inside of this world we live in, it is end life, or have your life ended.`, "var(--flowey)")
        }, 3000)
        setTimeout(()=> {
            log(`Flowey: Within this location we call a world, you must end the lives of other living things, otherwise, other living things will end your own.`, "var(--flowey)")
        }, 9000)
        setTimeout(()=> {
            log(`Flowey: Within this extremely large location filled with life, otherwise known as Zawarudo, one must cause the end of other existent entities' lives, killing them, otherwise their own life will be ended due to the other existent entities causing it to end.`, "var(--flowey)")
        }, 18000)
        setTimeout(()=> {
            LuxLog(`Lux: Is he okay-?`)
        }, 30000)
        setTimeout(()=> {
            log(`Flowey: <i>*perfectly cut scream*</i>`, "var(--flowey)")
        }, 30500)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits59 = true
        }, 31500)
    } else if (p.flags.bobVisits >= 62n && p.flags.bobFlags.Visits62 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: Hey Flowey.`)
        }, 1000)
        setTimeout(()=> {
            log(`Flowey: What.`, "var(--flowey)")
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: Have you heard of <span style="color: var(--bob);">Bob</span>?`)
        }, 6000)
        setTimeout(()=> {
            log(`Flowey: ...no?`, "var(--flowey)")
        }, 11000)
        setTimeout(()=> {
            LuxLog(`Luxander: <i>*pulls out a phone to start recording*</i>`)
        },13000)
        setTimeout(()=> {
            log(`Bob: Meep`, "var(--bob)")
        },15000)
        setTimeout(()=> {
            log(`Flowey: <i>*perfectly cut scream*</i>`, "var(--flowey)")
        },15500)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits62 = true
        }, 17500)
    } else if (p.flags.bobVisits >= 65n && p.flags.bobFlags.Visits65 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Lux: Hey Flowey.`)
        }, 1000)
        setTimeout(()=> {
            log(`Flowey: What.`, "var(--flowey)")
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: If god wanted you to be miserable, he wouldn't have made me!`)
        }, 5000)
        setTimeout(()=> {
            log(`Flowey: ...`, "var(--flowey)")
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Luxander: Debatable. <i>Very</i> debatable.`)
        }, 11000)
        setTimeout(()=> {
            LuxLog(`Luxander: You've broken my english localization <i>numerous</i> times.`)
        }, 13000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits65 = true
        }, 13500)
    } else if (p.flags.bobVisits >= 68n && p.flags.bobFlags.Visits68 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`Berdly: <i>*appears out of fuck nowhere*</i>`, "var(--berdly)")
        }, 1000)
        setTimeout(()=> {
            log(`Flowey: What.`, "var(--flowey)")
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: Hey there! Do you want to be my friend?`)
        }, 5000)
        setTimeout(()=> {
            log(`Berdly: No hablo Ingles`, "var(--berdly)")
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Lux: Hola! ¿Quieres ser mi amigo?`)
        }, 11000)
        setTimeout(()=> {
            LuxLog(`Luxander: I thought I fixed the language localization issue?`)
        }, 12000)
        setTimeout(()=> {
            log(`Berdly: I don't speak spanish either.`, "var(--berdly)")
        }, 13000)
        setTimeout(()=> {
            LuxLog(`Luxander: You bitc-`)
        }, 15000)
        setTimeout(()=> {
            LuxLog(`Luxander: ...`)
        }, 17000)
        setTimeout(()=> {
            LuxLog(`Luxander: Actually...`)
        }, 19000)
        setTimeout(()=> {
            log(`Funfriend: File 'profanity_filter.js' has been deleted by repo owner 'Luxander' at location "~/luxs-rpg/importantinfo/const/profanity_filter.js"`, "var(--funfriend)")
        }, 21000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits68 = true
        }, 21500)
    } else if (p.flags.bobVisits >= 71n && p.flags.bobFlags.Visits71 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`Berdly: Why could I see that?`, "var(--berdly)")
        }, 1000)
        setTimeout(()=> {
            log(`Flowey: I saw that too.`, "var(--flowey)")
        }, 3000)
        setTimeout(()=> {
            LuxLog(`<i>*Lux and Luxander look at each other, dumbfounded by their stupidity. Berdly specifically.*</i>`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Lux: Don't worry.`)
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Luxander: Anyway, now that I remove that file...`)
        }, 9000)
        setTimeout(()=> {
            LuxLog(`Luxander: Berdly you absolute █████ of a ██████. You don't deserve to █████ ███████ █████████ or even ████████████████ █████████ ███████████████ █████ ████████`)
            log(`Funfriend: System Computer settings have censored... that for the user. Everybody else still hears it for how it is.`, "var(--funfriend)")
        }, 11000)
        setTimeout(()=> {
            log(`Berdly: Uh... no hablo Ingles?`, "var(--berdly)")
        }, 15000)
        setTimeout(()=> {
            LuxLog(`Luxander: ...`)
        }, 17000)
        setTimeout(()=> {
            LuxLog(`Luxander: I'm going to send you to my friend Satan.`)
        }, 19000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits71 = true
        }, 21000)
    } else if (p.flags.bobVisits >= 74n && p.flags.bobFlags.Visits74 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`<i>*somewhere in the background*</i>`)
        }, 1000)
        setTimeout(()=> {
            log(`Ralsei: For my neutral special, I wield a rocket launcher!`, "var(--ralsei)")
        }, 3000)
        setTimeout(()=> {
            log(`Susie: Wasn't it a gun?`, "var(--susie)")
        }, 5000)
        setTimeout(()=> {
            log(`Ralsei <i>*while holding the rocket launcher*</i>: I decided to upgrade!`, "var(--ralsei)")
        }, 7000)
        setTimeout(()=> {
            log(`Ralsei: <i>*fires on accident</i>`, "var(--ralsei)")
        }, 11000)
        setTimeout(()=> {
            LuxLog(`Luxander: Hey guys do you hear something?`)
        }, 12000)
        setTimeout(()=> {
            log(`Berdly: Uh... no-?`, "var(--berdly)")
        }, 15000)
        setTimeout(()=> {
            const explosion = new Audio("sfx/explosion.mp3");
            explosion.play().catch(e => console.log("Audio playback prevented:", e));
        }, 15500)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits74 = true
        }, 18000)
    } else if (p.flags.bobVisits >= 77n && p.flags.bobFlags.Visits77 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`Noelle: <i>*appears out of fuck nowhere*</i>`, "var(--noelle)")
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Luxander: Oh hi Noelle.`)
        }, 3000)
        setTimeout(()=> {
            log(`Noelle: Hi Luxander.`, "var(--noelle)")
        }, 5000)
        setTimeout(()=> {
            log(`Berdly <i>*singed*</i>: What the fu-`, "var(--berdly)")
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Lux: Wait Luxander, you know Noelle?`)
        }, 7500)
        setTimeout(()=> {
            LuxLog(`Luxander: Yeah, I do.`)
        }, 9500)
        setTimeout(()=> {
            LuxLog(`Lux: Huh. Interesting.`)
        }, 11500)
        setTimeout(()=> {
            LuxLog(`<i>*Ralsei and Susie walk up*</i>`)
        }, 13500)
        setTimeout(()=> {
            log(`Ralsei: Sorry about the rocket launcher everyone.`, "var(--ralsei)")
        }, 15500)
        setTimeout(()=> {
            log(`Berdly: ...`, "var(--berdly)")
        }, 17500)
        setTimeout(()=> {
            log(`Berdly: You bi███.`, "var(--berdly)")
            log(`Funfriend: User 'BerdlyIsTheBest' was censored.`,"var(--funfriend)")
        }, 19500)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits77 = true
        }, 21500)
    } else if (p.flags.bobVisits >= 80n && p.flags.bobFlags.Visits80 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`Berdly: Why was I censored when Luxander wasn't?!`, "var(--berdly)")
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Lux: Maybe you just need to get better.`)
        }, 3000)
        setTimeout(()=> {
            log(`Berdly: F███ y██ Luxander!`, "var(--berdly)")
            log(`Funfriend: User 'BerdlyIsTheBest' was censored and warned twice. Reason: Retaliation against owner.`,"var(--funfriend)")
        }, 5000)
        setTimeout(()=> {
            log(`Berdly: ...`)
        }, 7000)
        setTimeout(()=> {
            log(`Bob: Meep`, "var(--bob)")
        }, 7500)
        setTimeout(()=> {
            log(`Flowey: OH JEEZ-`, "var(--flowey)")
            log(`Berdly: OH JEEZ-`, "var(--berdly)")
            log(`Noelle: OH JEEZ-`, "var(--noelle)")
            log(`Ralsei: OH JEEZ-`, "var(--ralsei)")
            log(`Susie: OH JEEZ-`, "var(--susie)")
        }, 8000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits80 = true
        }, 10000)
    } else if (p.flags.bobVisits >= 83n && p.flags.bobFlags.Visits83 === false) {
        disablePageClicks();
        setTimeout(()=> {
            LuxLog(`Luxander: Hey Lux do you remember the file location for the bin?`)
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Lux: I'm pretty sure it was something like "~/MacintoshHD/Users/luxs-rpg/.Trash"?`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Luxander: Ah yeah, you're correct. Thanks. There is some stuff I need to put in there.`)
        }, 5000)
        setTimeout(()=> {
            log(`Flowey: ...`, "var(--flowey)")
            log(`Berdly: ...`, "var(--berdly)")
            log(`Noelle: ...`, "var(--noelle)")
            log(`Ralsei: ...`, "var(--ralsei)")
            log(`Susie: ...`, "var(--susie)")
        }, 7000)
        setTimeout(()=> {
            log(`Flowey: What are you guys talking about?`, "var(--flowey)")
            log(`Berdly: What are you guys talking about?`, "var(--berdly)")
            log(`Noelle: What are you guys talking about?`, "var(--noelle)")
            log(`Susie: What are you guys talking about?`, "var(--susie)")
        }, 9000)
        setTimeout(()=> {
            log(`Ralsei: Eh. I'm not that worried. Sometimes there are days where everything goes your way, so be positive!`, "var(--ralsei)")
        }, 11000)
        setTimeout(()=> {
            log(`Kris <i>*from above, trips on a conveniently placed todo comment*</i>: This is not one of those days.`, "var(--kris)")
        }, 13000)
        setTimeout(()=> {
            log(`Kris: <i>*falls on Berdly*</i>`, "var(--kris)")
        }, 15000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits83 = true
        }, 17000)
    } else if (p.flags.bobVisits >= 86n && p.flags.bobFlags.Visits86 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`Ralsei: Violence is bad, words are better!`, "var(--ralsei)")
        }, 1000)
        setTimeout(()=> {
            log(`Flowey: But words don't hurt.`, "var(--flowey)")
        }, 3000)
        setTimeout(()=> {
            log(`Ralsei: <i>*yeets a dictionary at Flowey's head. It makes a very satisfying thunk sound.*</i>`, "var(--ralsei)")
        }, 5000)
        setTimeout(()=> {
            log(`Flowey: AH!`, "var(--flowey)")
        }, 5500)
        setTimeout(()=> {
            LuxLog(`Lux: ...`)
            LuxLog(`Luxander: ...`)
        }, 7500)
        setTimeout(()=> {
            LuxLog(`Luxander: Best slapstick so far.`)
        }, 9500)
        setTimeout(()=> {
            LuxLog(`Lux: Agreed.`)
        }, 10500)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits86 = true
        }, 12500)
    } else if (p.flags.bobVisits >= 89n && p.flags.bobFlags.Visits89 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`Ralsei: <i>*grabs onto Lux's arm*</i>`, "var(--ralsei)")
        }, 1000)
        setTimeout(()=> {
            log(`Ralsei: You're my friend now. I'm making yummy cakes for us later!`, "var(--ralsei)")
        }, 2000)
        setTimeout(()=> {
            LuxLog(`Lux: ...`)
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: <i>*points a thumbs up at Luxander*</i>`)
        }, 5000)
        setTimeout(()=> {
            LuxLog(`Lux: ...`)
            LuxLog(`Luxander: ...`)
        }, 6000)
        setTimeout(()=> {
            LuxLog(`Luxander: Glutton.`)
        }, 8000)
        setTimeout(()=> {
            LuxLog(`Lux: HEY!`)
        }, 8500)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits89 = true
        }, 9000)
    } else if (p.flags.bobVisits >= 92n && p.flags.bobFlags.Visits92 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`Ralsei: It's wizard time motherfuckers, FIREBALL!`, "var(--ralsei)")
        }, 1000)
        setTimeout(()=> {
            log(`Ralsei: <i>*yeets a fireball. It accidentally hits the p.hp stat.*</i>`, "var(--ralsei)")
            p.hp -= (10n * p.lv)
            updateUI();
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Lux: ...`)
            LuxLog(`Luxander: ...`)
            log(`Flowey: ...`, "var(--flowey)")
            log(`Berdly: ...`, "var(--berdly)")
            log(`Noelle: ...`, "var(--noelle)")
            log(`Ralsei: ...`, "var(--ralsei)")
            log(`Susie: ...`, "var(--susie)")
            log(`Kris: ...`, "var(--kris)")
        }, 5000)
        setTimeout(()=> {
            log(`Ralsei: My bad, I didn't mean to...`, "var(--ralsei)")
        }, 7000)
        setTimeout(()=> {
            log(`Berdly: HOW COME HE DOESN'T GET CENSO-`, "var(--berdly)")
            log(`Funfriend: User 'BerdlyIsTheBest' has been muted and warned. Reason: Excessive capitalization.`,"var(--funfriend)")
        }, 9000)
        setTimeout(()=> {
            LuxLog(`Luxander: Sorry about that User. Ralsei didn't mean to hurt you.`)
        }, 11000)
        setTimeout(()=> {
            log(`Flowey: Who are you talking to?`, "var(--flowey)")
        }, 13000)
        setTimeout(()=> {
            LuxLog(`Luxander: No one you should care about.`)
        }, 15000)
        setTimeout(()=> {
            p.hp = p.mhp
            updateUI();
            enablePageClicks();
            p.flags.bobFlags.Visits92 = true
        }, 17000)
    } else if (p.flags.bobVisits >= 95n && p.flags.bobFlags.Visits95 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`Berdly: Okay, this is unfair. Why does Ralsei get to swear, and damage something while I get puished for just tal-`, "var(--berdly)")
        }, 1000)
        setTimeout(()=> {
            log(`Funfriend: User 'Luxander' ran command '/mute user:BerdlyIsTheBest reason:"Being an annoying bucket of KFC"'`, "var(--funfriend)")
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Luxander: <span style="color: var(--funfriend)">Funfriend</span>, list all of Berdly's warnings.`)
        }, 5000)
        setTimeout(()=> {
            log(`Funfriend: User 'BerdlyIsTheBest' has 3 warnings and is currently muted.`, "var(--funfriend)")
            log(`Funfriend: Warning 1: Reason: Retaliating against owner`, "var(--funfriend)")
            log(`Funfriend: Warning 2: Reason: Retaliating against owner`, "var(--funfriend)")
            log(`Funfriend: Warning 3: Reason: Excessive capitalization`, "var(--funfriend)")
            log(`Funfriend: User 'BerdlyIsTheBest' is muted for reason: "Being an annoying bucket of KFC"`, "var(--funfriend)")
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Everyone except Berdly, Lux, and Luxander: Damn. He really did piss you off.`)
        }, 9000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits95 = true
        }, 11000)
    } else if (p.flags.bobVisits >= 98n && p.flags.bobFlags.Visits98 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`<span style="font-family: 'Comic Sans MS', 'Comic Sans', cursive;">sans: heya</span>`, "var(--sans)")
        }, 1000)
        setTimeout(()=> {
            LuxLog(`Literally everybody except Luxander and Lux: OH JEEZ-`)
        }, 1500)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits98 = true
        }, 3500)
    } else if (p.flags.bobVisits >= 101n && p.flags.bobFlags.Visits101 === false) {
        disablePageClicks();
        setTimeout(()=> {
            log(`Arcane Acid: Hewwo!`, "var(--arcaneacid)")
        }, 1000)
        setTimeout(()=> {
            log(`Berdly: What the ████ is that.`, "var(--berdly)")
            log(`Funfriend: User 'BerdlyIsTheBest' has been censored. Again.`, "var(--funfriend)")
        }, 3000)
        setTimeout(()=> {
            LuxLog(`Luxander: This is going to go well. Hey Arcane.`)
        }, 5000)
        setTimeout(()=> {
            log(`Arcane Acid: Yeah?`, "var(--arcaneacid)")
        }, 7000)
        setTimeout(()=> {
            LuxLog(`Luxander: I'll let you run one command on Berdly.`)
        }, 9000)
        setTimeout(()=> {
            log(`Arcane Acid: ...`, "var(--arcaneacid)")
        }, 11000)
        setTimeout(()=> {
            log(`Funfriend: User 'arcane_acid' ran command 'rm -rf berdly.js'.`, "var(--funfriend)")
            log(`Berdly: WAIT NO-`, "var(--berdly)")
        }, 13000)
        setTimeout(()=> {
            log(`Funfriend: Undoing damage caused by 'berdly.js'...`, "var(--funfriend)")
        }, 15000)
        setTimeout(()=> {
            log(`Funfriend: Deleting CSS var '--berdly'...`, "var(--funfriend)")
        }, 16000)
        setTimeout(()=> {
            log(`Funfriend: Deleting berdly.js...`, "var(--funfriend)")
        }, 17000)
        setTimeout(()=> {
            log(`Funfriend: Command 'rm -rf berdly.js' has been complete.`, "var(--funfriend)")
        }, 18000)
        setTimeout(()=> {
            log(`Arcane Acid: Yay!`, "var(--arcaneacid)")
        }, 20000)
        setTimeout(()=> {
            enablePageClicks();
            p.flags.bobFlags.Visits101 = true
        }, 21000)
    } else if (p.flags.bobVisits >= 104n && p.flags.bobFlags.Visits104 === false) {
        disablePageClicks();
        setTimeout(() => {
            LuxLog(`Luxander: ...`)
        }, 1000)
        setTimeout(() => {
            LuxLog(`Luxander: You know there was a better thing you could have done then use "rm -rf", right?`)
        }, 3000)
        setTimeout(() => {
            log(`Arcane Acid: I know.`, "var(--arcaneacid)")
        }, 5000)
        setTimeout(() => {
            LuxLog(`Luxander: ...`)
        }, 7000)
        setTimeout(() => {
            LuxLog(`Luxander: Lux where was the ext4magic program.`)
            enablePageClicks();
            p.flags.bobFlags.Visits104 = true
        }, 9000)
    } else if (p.flags.bobVisits >= 107n && p.flags.bobFlags.Visits107 === false) {
        disablePageClicks();
        setTimeout(() => {
            LuxLog(`Lux: I'm pretty sure it was somewhere in this repo. Probably somewhere under "~/luxs-rpg/recovery".`)
        }, 1000)
        setTimeout(() => {
            LuxLog(`Luxander: Ah, thanks.`)
        }, 3000)
        setTimeout(() => {
            LuxLog(`Luxander: <i>*leaves*</i>`)
        }, 5000)
        setTimeout(() => {
            log(`Berdly: <i>*reappears*</i>`, "var(--berdly)")
        }, 10000)
        setTimeout(() => {
            LuxLog(`Luxander: I got him back. Granted it is going to take him a while to be able to talk again. One thing that sadly got overwritten was the voice module in his js file.`)
        }, 12000)
        setTimeout(() => {
            log(`Arcane Acid: Better then nothing.`, "var(--arcaneacid)")
            enablePageClicks();
            p.flags.bobFlags.Visits107 = true
        }, 14000)
    } else if (p.flags.bobVisits >= 110n && p.flags.bobFlags.Visits110 === false) {
        disablePageClicks();
        setTimeout(() => {
            LuxLog(`Luxander: Lux, look after them and make sure they don't do anything stupid. I need to get reprogram the voice module.`)
        }, 1000)
        setTimeout(() => {
            LuxLog(`Lux: 'kay.`)
        }, 3000)
        setTimeout(() => {
            LuxLog(`Luxander: <i>*leaves*</i>`)
        }, 5000)
        setTimeout(() => {
            log(`Ralsei: Berdly will be okay, right?`, "var(--ralsei)")
        }, 7000)
        setTimeout(() => {
            LuxLog(`Luxander: He'll be fine. If there's one thing you can rely Luxander on, it is his extremely fast and precise programming skills.`)
        }, 9000)
        setTimeout(() => {
            log(`Arcane Acid: Oh come on! I like him gone!`, "var(--arcaneacid)")
            enablePageClicks();
            p.flags.bobFlags.Visits110 = true
        }, 12000)
    } else if (p.flags.bobVisits >= 113n && p.flags.bobFlags.Visits113 === false) {
        disablePageClicks();
        log(`Ralsei: Who wants Oreos?`, "var(--ralsei)")
        setTimeout (() => {
            log(`Miss Circle: Me!`, "var(--circle)")
        }, 1000)
        setTimeout (() => {
            log(`Basically everybody except Lux: OH JEEZ-`, "var(--lux)")
            p.flags.bobFlags.Visits113 = true;
            enablePageClicks();
        }, 1500)
    } else if (p.flags.bobVisits >= 116n && p.flags.bobFlags.Visits116 === false) {
        disablePageClicks();
        LuxLog(`Lux: Why does this repo have to be so chaotic?`)
        timeoutFunction(`Ralsei: Don't ask me.`, "var(--ralsei)", 1000)
        timeoutFunction(`Chara: Hello!`, "var(--chara)", 2000)
        timeoutFunction(`Lux: ...`, "var(--lux)", 3000)
        timeoutFunction(`Lux: I'm getting Luxander.`, "var(--lux)", 4000)
        timeoutFunction(`<i>*one minute later*</i>`, "var(--funfriend)", 5000)
        timeoutFunction(`Luxander: So what did you want to do, Lux?`, "var(--lux)", 10000)
        timeoutFunction(`Lux: We got a genocidal kid here.`, "var(--lux)", 12000)
        timeoutFunction(`Luxander: <i>*notices Chara*</i>`, "var(--lux)", 14000)
        timeoutFunction(`Luxander: What the fuck are you doing here.`, "var(--lux)", 16000)
        setTimeout(() => {
            p.flags.bobFlags.Visits116 = true
        }, 16000)
    }
}