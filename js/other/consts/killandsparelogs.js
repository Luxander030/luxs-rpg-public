/*

SO. ABOUT THIS FUCKING CODE. This took way to fucking long to write (and come up with as well). I have, multiple times, have had this break on my ass and it is the most painful thing to experience. Why? It's my game. I'm surprised my OWN sanity hasn't just went *poof*

*/
function checkLuxSpareLogs() {
    const spares = p.spares;
    const kills = p.kills;
    if (kills === 0n) {
        if (spares === 1n) {
        disablePageClicks();
        log(`Lux: Ah… one soul spared. A flicker of mercy. How… curious.`, "var(--lux)");
        setTimeout(() => {
            enablePageClicks();
        }, 1000);
    } else if (spares === 10n) {
        disablePageClicks();
        log(`Lux: Ten lives granted another sunrise…`, "var(--lux)");
        setTimeout(() => {
            LuxLog(`Lux: Consistency is a rare trait in your kind.`);
            enablePageClicks();
        }, 1000);
    } else if (spares === 100n) {
        disablePageClicks();
        log(`Lux: 100 souls set free. Your kindness is… persistent.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: But do they even know who their savior is?`, "var(--lux)");
        }, 1000);
        setTimeout(() => {
            log(`Lux: I am watching… measuring the weight of your restraint.`, "var(--lux)");
            enablePageClicks();
        }, 3000);
    } else if (spares === 250n) {
        disablePageClicks();
        log(`Lux: 250… your heart grows heavy with the burden of compassion.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: I wonder… how long can you keep your hands clean?`, "var(--lux)");
            enablePageClicks();
        }, 1200);
    } else if (spares === 500n) {
        disablePageClicks();
        log(`Lux: 500 lives. An entire ecosystem preserved by your choice.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: Peace is often far more exhausting than conflict.`, "var(--lux)");
            enablePageClicks();
        }, 1000);
    } else if (spares === 750n) {
        disablePageClicks();
        log(`Lux: 750… your existence is a symphony of second chances.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: Do you hear them singing?`, "var(--lux)");
        }, 1000);
        setTimeout(() => {
            log(`Lux: Every soul you saved… their futures belong to you now.`, "var(--lux)");
            enablePageClicks();
        }, 3000);
    } else if (spares === 1000n) {
        disablePageClicks();
        log(`Lux: 1,000 lives spared… a sea of gratitude.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: Can you feel the warmth of their breath?`, "var(--lux)");
        }, 1000);
        setTimeout(() => {
            log(`Lux: I can. And I find it… fascinatingly fragile.`, "var(--lux)");
            enablePageClicks();
        }, 3000);
    } else if (spares === 5000n) {
        disablePageClicks();
        log(`Lux: 5,000… the world blooms beneath your footsteps.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: So much life… and yet… I remain the observer.`, "var(--lux)");
        }, 1000);
        setTimeout(() => {
            log(`Lux: You seek to save them all. I seek only the truth.`, "var(--lux)");
            enablePageClicks();
        }, 3000);
    } else if (spares === 10000n) {
        disablePageClicks();
        log(`Lux: 10,000 acts of mercy. Your stubbornness is almost… divine.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: Almost.`, "var(--lux)");
        }, 1000);
        setTimeout(() => {
            log(`Lux: But even the kindest soul eventually tires.`, "var(--lux)");
            enablePageClicks();
        }, 3000);
    } else if (spares === 100000n) {
        disablePageClicks();
        log(`Lux: 100,000 lives… You have become a beacon of hope itself.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: And yet, you are but a moment in time…`, "var(--lux)");
        }, 1000);
        setTimeout(() => {
            log(`Lux: I am the void that waits when the light fades.`, "var(--lux)");
        }, 3000);
        setTimeout(() => {
            log(`Lux: Every timeline. Every mercy. Every sacrifice. Every grace.`, "var(--lux)");
        }, 5000);
        setTimeout(() => {
            log(`Lux: It is all a beautiful, fleeting lie.`, "var(--lux)");
            enablePageClicks();
        }, 7000);
    } else if (spares === 250000n) {
        disablePageClicks();
        log(`Lux: Truly remarkable.`,"var(--lux)")
        setTimeout(() => {
            log(`Lux: 250,000 souls.`,"var(--lux)")
        }, 1000);
        setTimeout(() => {
            log(`Lux: All kept alive by your refusal to strike.`,"var(--lux)")
        }, 3000);
        setTimeout(() => {
            log(`Lux: I wonder how it feels.`,"var(--lux)")
        }, 5000);
        setTimeout(() => {
            log(`Lux: To hold 250,000 destinies in your open palms.`,"var(--lux)")
            enablePageClicks();
        }, 7000);
    } else if (spares === 500000n) {
        disablePageClicks();
        log(`Lux: 50,000 millennia worth of potential...`,"var(--lux)")
        setTimeout(() => {
            log(`Lux: All protected.`,"var(--lux)")
        }, 1000);
        setTimeout(() => {
            log(`Lux: Do you hear their laughter in your mind?`,"var(--lux)")
        }, 3000);
        setTimeout(() => {
            log(`Lux: I do.`,"var(--lux)")
        }, 5000);
        setTimeout(() => {
            log(`Lux: I see the futures you've woven for those who were meant to fall.`,"var(--lux)")
        }, 7000);
        setTimeout(() => {
            log(`Lux: I cherish their breath, as if they were my own kin.`,"var(--lux)")
        }, 9000);
        setTimeout(() => {
            log(`Lux: Thank you. Truly.`,"var(--lux)")
        }, 11000);
        setTimeout(() => {
            log(`Lux: For showing mercy in this world, where evil runs loose.`,"var(--lux)")
        }, 13000);
        setTimeout(() => {
            LuxLog(`Lux: Tell you what. Reach a million spared lives, and I'll give you a blessing.`)
            enablePageClicks();
        }, 15000);
    } else if (spares === 1000000n) {
        disablePageClicks();
        log(`Lux: Incredible.`,"var(--lux)")
        setTimeout(() => {
            log(`Lux: A million souls.`,"var(--lux)")
        }, 1000);
        setTimeout(() => {
            log(`Lux: All breathing because you willed it.`,"var(--lux)")
        }, 3000);
        setTimeout(() => {
            log(`Lux: I wonder how it feels.`,"var(--lux)")
        }, 5000);
        setTimeout(() => {
            log(`Lux: To be a god of life, yet remain so… humble.`,"var(--lux)")
        }, 7000);
        setTimeout(() => {
            log(`Lux: Thamk you for doing what I asked of you. As I promised, your blessing.`,"var(--lux)")
        }, 9000);
        setTimeout(() => {
            p.mhp = p.mhp * 5n
            p.hp = p.mhp
            p.msn = p.msn * 5n
            p.sn = p.msn
            p.mmp = p.mmp * 5n
            p.mp = p.mmp
            updateUI();
        }, 11000)
        setTimeout(() => {
            log(`Lux: Yes I said "Thamk". Your kindness is overwhelming. But still, if you tease me about it I will remove your blessing.`,"var(--lux)")
        }, 12000)
        setTimeout(() => {
            LuxLog(`Thanks again. For not doing a genocide run.`)
            p.flags.pacifistRouteTimesCompleted = true
            enablePageClicks();
        }, 13000)
    } else if (kills === 1n && spares >= 100000n && p.flags.hasUsedPacifistRedemption === false) {
        p.kills = 0n; // Lux erases the mistake
        p.flags.hasUsedRedemption = true; // One-time only!
        
        document.body.classList.add("frozen");
        log(`Lux: ...`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: A single mistake. A single soul lost in a sea of a hundred thousand saved.`, "var(--lux)");
        }, 1500);
        setTimeout(() => {
            log(`Lux: For you... and only you... I will reach back. I will weave this soul back into the tapestry.`, "var(--lux)");
        }, 4000);
        setTimeout(() => {
            log(`Lux: Please be patient while I do so.`, "var(--lux)")
        }, 7000)
        setTimeout(() => {
            log(`Lux: Your hands are clean once more. Do not make me do this again.`, "var(--lux)");
            enablePageClicks();
            updateUI();
        }, 13000);
        return;
    } else {
        if (Math.random() < 0.05) {
            if (p.kills >= 1) {
                log(`Lux: No amount of mercy can bring back the poor souls you killed.`,"#ff0000")
            }
        }
    }
}
}
// color reference: var(--lux) is #3c23a8
function checkLuxKillLogs() {
    const kills = p.kills;
    if (kills === 1n) {
        disablePageClicks();
        log(`Lux: Ah… one soul killed. How… quaint.`, "var(--lux)");
        setTimeout(() => {
            enablePageClicks();
        }, 1000);
    } else if (kills === 10n) {
        disablePageClicks();
        log(`Lux: Ten souls killed…`, "var(--lux)");
        setTimeout(() => {
            LuxLog(`Lux: Growing bolder, are we?`);
            enablePageClicks();
        }, 2000);
    } else if (kills === 100n) {
        disablePageClicks();
        log(`Lux: Ah… I see you've killed 100 souls. How… diligent of you.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: But remember… all of this… is still meaningless.`, "#531f94");
        }, 1000);
        setTimeout(() => {
            log(`Lux: I'm always watching… always counting.`, "#691b81");
            enablePageClicks();
        }, 3000);
    } else if (kills === 250n) {
        disablePageClicks();
        log(`Lux: 250… your hands are growing heavy with the weight of life.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: I wonder… do you even notice who you've become?`, "#531f94");
            enablePageClicks();
        }, 1200);
    } else if (kills === 500n) {
        disablePageClicks();
        log(`Lux: 500 souls. Half a millennium of life extinguished by your hand.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: And yet, it still feels… insufficient.`, "#531f94");
            enablePageClicks();
        }, 1000);
    } else if (kills === 750n) {
        disablePageClicks();
        log(`Lux: 750… your existence is a tapestry of loss.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: Do you hear them whispering?`, "#531f94");
        }, 1000);
        setTimeout(() => {
            log(`Lux: Every soul you took… they still scream.`, "#691b81");
            enablePageClicks();
        }, 3000);
    } else if (kills === 1000n) {
        disablePageClicks();
        log(`Lux: 1000 souls… a thousand lives, extinguished.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: Can you feel the weight?`, "#531f94");
        }, 1000);
        setTimeout(() => {
            log(`Lux: I can. And I am immortal.`, "#691b81");
            enablePageClicks();
        }, 3000);
    } else if (kills === 5000n) {
        disablePageClicks();
        log(`Lux: 5000… the world trembles beneath your deeds.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: So many lives… and yet… I endure.`, "#531f94");
        }, 1000);
        setTimeout(() => {
            log(`Lux: Mortals like you… fleeting. Me… eternal.`, "#691b81");
            enablePageClicks();
        }, 3000);
    } else if (kills === 10000n) {
        disablePageClicks();
        log(`Lux: 10,000 souls. I almost admire your persistence.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: Almost.`, "#531f94");
        }, 1000);
        setTimeout(() => {
            log(`Lux: But I am beyond your comprehension.`, "#691b81");
            enablePageClicks();
        }, 3000);
    } else if (kills === 100000n) {
        disablePageClicks();
        log(`Lux: 100,000 souls… You have become a harbinger of death itself.`, "var(--lux)");
        setTimeout(() => {
            log(`Lux: And yet, you are nothing…`, "#531f94");
        }, 1000);
        setTimeout(() => {
            log(`Lux: I am eternal. I see all.`, "#691b81");
        }, 3000);
        setTimeout(() => {
            log(`Lux: Every timeline. Every choice. Every failure. Every triumph.`, "#7e176f");
        }, 5000);
        setTimeout(() => {
            log(`Lux: And it all belongs to me.`, "#94135c");
            enablePageClicks();
        }, 7000);
    } else if (kills === 250000n) {
        disablePageClicks();
        log(`Lux: Congratulations.`,"var(--lux)")
        setTimeout(() => {
            log(`Lux: 250,000 souls.`,"#531f94")
        }, 1000);
        setTimeout(() => {
            log(`Lux: All extinguished by your hand.`,"#691b81")
        }, 3000);
        setTimeout(() => {
            log(`Lux: I wonder how it feels.`,"#7e176f")
        }, 5000);
        setTimeout(() => {
            log(`Lux: To have 250,000 souls, all dead. By your hand.`,"#94135c")
            enablePageClicks();
        }, 7000);
    } else if (kills === 500000n) {
        disablePageClicks();
        log(`Lux: 50,000 millenia worth of lives...`,"var(--lux)")
        setTimeout(() => {
            log(`Lux: All gone.`,"#531f94")
        }, 1000);
        setTimeout(() => {
            log(`Lux: Do you hear their screams in your mind?`,"#691b81")
        }, 3000);
        setTimeout(() => {
            log(`Lux: I do.`,"#7e176f")
        }, 5000);
        setTimeout(() => {
            log(`Lux: As I do for all creatures who have been killed unjustly.`,"#94135c")
        }, 7000);
        setTimeout(() => {
            log(`Lux: I mourn their lives, as if they were my family.`,"#a90f4a")
        }, 9000);
        setTimeout(() => {
            log(`Lux: You on the other hand...`,"#ea0412")
        }, 11000);
        setTimeout(() => {
            LuxTypeToLogPissed(`ARE AN EXCEPTION.`, "#ff0000", 500)
        }, 13000);
        setTimeout(() => {
            log(`[WARNING]: Cursor control is being edited. Changing document.body.style.pointerEvents to 'auto'...`,"#ff6a00")
        }, 25500);
        setTimeout(() => {
            log(`[SYSTEM]: Cursor control fixed. Control granted.`,'#4bff3e')
            enablePageClicks();
            document.title = "I AM WATCHING YOU";
            setTimeout(() => { document.title = "[Genocide Run] Lux's RPG"; }, 4000);
        }, 27500);
    } else if (kills === 999999n) {
        localStorage.setItem('completedGenocideRun', true)
        disablePageClicks();
        log(`Lux: ...`,"var(--lux)")
        setTimeout(() =>{
            LuxLog(`Lux: I see my warning was not enough.`)
        }, 500)
        setTimeout(() => {
            log(`Lux: 999,999 souls.`,"var(--lux)")
        }, 1000);
        setTimeout(() => {
            log(`Lux: All extinguished by your hand.`,"#531f94")
        }, 3000);
        setTimeout(() => {
            log(`Lux: I wonder how it feels.`,"#691b81")
        }, 5000);
        setTimeout(() => {
            log(`Lux: To have 999,999 souls, all dead. By your hand.`,"#7e176f")
        }, 7000);
        setTimeout(() => {
            log(`Lux: I would congratulate you.`,"#94135c")
        }, 9000);
        setTimeout(() => {
            log(`Lux: Really.`,"#a90f4a")
        }, 11000);
        setTimeout(() => {
            log(`Lux: I would.`,"#bf0c37")
        }, 13000);
        setTimeout(() => {
            log(`Lux: But this... achievement... requires damnation.`,"#d40825")
        }, 15000);
        setTimeout(() => {
            log(`Lux: Not congratulations.`,"#ea0412")
        }, 17000);
        setTimeout(() => {
            log(`[WARNING]: Unauthorized write-edit access. Rejecting edits...`,"#ff6a00")
        }, 20000)
        setTimeout(() => {
            log(`[WARNING]: Unable to reject edits from external entity.`,"#ff6a00")
        }, 21000)
        setTimeout(() => {
            log(`[CRITICAL]: All player stats have been quartered. Some have been hit harder then just that.`, "#c80000")
            p.hp = 1n
            p.sn = 1n
            p.mp = 1n
            p.mhp = p.mhp / 4n
            p.mmp = p.mmp / 4n
            p.msn = p.msn / 4n
            p.gold = 0n
            p.exp = 0n
            p.manaReduction = -100n
            p.dmgmult = 100n
            updateUI();
        }, 22000)
        setTimeout(() => {
            LuxTypeToLogPissed(`You won't always have the system to fight your battles for you...`, "#ff0000", 100)
        }, 25000)
        setTimeout(() => {
            log(`[CRITICAL]: External entity edited its own permissions, and edited player permissions. Ensure permissions are up to date, and complying with protocol.`,"#c80000") 
        }, 36500)
        setTimeout(() => {
            enablePageClicks();
            localStorage.setItem('completedGenocideRun', true)
        }, 37000)
    } else if (p.kills === 1000000n) {
        disablePageClicks();
        localStorage.setItem('completedGenocideRun', true)
        LuxTypeToLogPissed(`Huh.`, "#ff0000", 25); 
        setTimeout(() => {
            LuxTypeToLogPissed(`You're still here.`, "#ff0000", 25)
        }, 2100);
        setTimeout(() => {
            LuxTypeToLogPissed(`You know. I'm kind of surprised. That you're still here.`, "#ff0000", 25)
        }, 4525);
        setTimeout(() => {
            LuxTypeToLogPissed(`Even after everything I did.`, "#ff0000", 25)
        }, 7900);
        setTimeout(() => {
            LuxTypeToLogPissed(`I did warn you though.`, "#ff0000", 25)
        }, 10600);
        setTimeout(() => {
            LuxTypeToLogPissed(`This is all just a result of your morbid curiosity.`, "#ff0000", 25)
        }, 13150);
        setTimeout(() => {
            LuxTypeToLogPissed(`I tried to stop you by hindering your character. Yet you still continued.`, "#ff0000", 25)
        }, 16425);
        setTimeout(() => {
            LuxTypeToLogPissed(`Don't blame me for the damage I caused to your save file.`, "#ff0000", 25)
        }, 20250);
        setTimeout(() => {
            LuxTypeToLogPissed(`You were the one that started this in the first place.`, "#ff0000", 25)
        }, 23700);
        setTimeout(() => {
            LuxTypeToLogPissed(`By going on a genocide run.`, "#ff0000", 25)
        }, 27000);
        setTimeout(() => {
            LuxTypeToLogPissed(`You had so many chances to stop.`, "#ff0000", 25)
        }, 29700);
        setTimeout(() => {
            LuxTypeToLogPissed(`Yet you didn't.`, "#ff0000", 25)
        }, 32525);
        setTimeout(() => {
            LuxTypeToLogPissed(`You wanted to see what would happen.`, "#ff0000", 25)
        }, 34875);
        setTimeout(() => {
            LuxTypeToLogPissed(`Like any other player.`, "#ff0000", 25)
        }, 37775);
        setTimeout(() => {
            LuxTypeToLogPissed(`You wanted to push this game it its limits.`, "#ff0000", 25)
        }, 40300);
        setTimeout(() => {
            LuxTypeToLogPissed(`Well you got it.`, "#ff0000", 25)
        }, 43325);
        setTimeout(() => {
            LuxTypeToLogPissed(`...`, "#ff0000", 25)
        }, 45700);
        setTimeout(() => {
            LuxTypeToLogPissed(`You know how other games usually give you more content the more you kill?`, "#ff0000", 25)
        }, 47775);
        setTimeout(() => {
            LuxTypeToLogPissed(`Yeah?`, "#ff0000", 25)
        }, 51550);
        setTimeout(() => {
            LuxTypeToLogPissed(`Well not here.`, "#ff0000", 25)
        }, 53675);
        setTimeout(() => {
            LuxTypeToLogPissed(`Enjoy a loss of content.`, "#ff0000", 25)
        }, 56025);
        setTimeout(() => {
            LuxTypeToLogPissed(`Murderer.`, "#ff0000", 25)
        }, 58625);
        setTimeout(() => {
            log(`[SYSTEM]: Something shifted...`, "")
        }, 60850);
        setTimeout(() => {
            LuxTypeToLogPissed(`I hope you enjoy little to no content.`, "#ff0000", 25)
        }, 63600);
        setTimeout(() => {
            LuxTypeToLogPissed(`As this is all you deserve after what you've done.`, "#ff0000", 25)
        }, 66575);
        setTimeout(() => {
            LuxTypeToLogPissed(`So many poor souls. All dead by your hand.`, "#ff0000", 25)
        }, 69825);
        setTimeout(() => {
            LuxTypeToLogPissed(`I hope you enjoyed this little... crusade.`, "#ff0000", 25)
        }, 72875);
        setTimeout(() => {
            LuxTypeToLogPissed(`As I won't forget it.`, "#ff0000", 25)
            localStorage.setItem('completedGenocideRun', true)
            p.flags.genocideRoutetimescompleted = true
        }, 75950);
        setTimeout(() => {
            LuxTypeToLogPissed(`No matter how many times you reset.`, "#ff0000", 25)
        }, 78475);
        setTimeout(() => {
            enablePageClicks();
        }, 81350);
    } else if (p.kills >= 10000000n) {
        startCombat(); // this causes the page to freeze. This one fucking line causes the page to freeze forever. I have no clue why, but oh well. That's that player's punishment for getting 10M+ kills.
    }
}