function renderCombatButtons() {
    const zone = document.getElementById('combat-btns');
    const searchInput = document.getElementById('action-search');
    const query = searchInput ? searchInput.value.toLowerCase() : ""; 
    if (!zone) return; 
    zone.innerHTML = ""; 
    const categories = [
        { label: "Damaging Spells", filter: (s) => s.dmg},
        { label: "Healing Spells", filter: (s) => (s.heal || s.san) && s.mp && s.name !== "Snowgrave" && !s.dmg}
    ];
    categories.forEach(cat => {
        const matchingSkills = p.skills.filter(sid => {
            let s = skillTree[sid];
            return s && cat.filter(s) && s.name.toLowerCase().includes(query);
        });
        if (matchingSkills.length > 0) {
            const header = document.createElement('div');
            header.style = "grid-column: span 2; color: #a4b0be; font-size: 0.75em; margin-top: 10px; border-bottom: 1px solid #2f3542; text-transform: uppercase;";
            header.innerText = cat.label;
            zone.appendChild(header);
            matchingSkills.forEach(sid => {
                let s = skillTree[sid];
                let b = document.createElement('button');
                // Ensure mana calculation uses BigInt
                let currentCost = BigInt(getScaledMana(s.mp || 0));
                b.innerText = `${s.name}${s.mp ? ' (' + formatNumber(currentCost) + ' MP)' : ''}`;
                b.onclick = () => cast(sid);
                const updateTipPos = (e, tip) => {
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
                b.onmouseenter = (e) => {
                    const tip = document.getElementById('tooltip');
                    let html = `<strong>${s.name}</strong><br>`;
                    // Assuming formatNumber handles BigInt
                    if (s.dmg) html += `DMG: <span style="color:var(--hp)">${formatNumber(BigInt(s.dmg))}</span><br>`;
                    if (s.heal) html += `Healing: <span style="color:var(--unlocked)">${formatNumber(BigInt(s.heal))}</span><br>`;
                    if (s.san) html += `Sanity: <span style="color:var(--sanity)">${formatNumber(BigInt(s.san))}</span><br>`;
                    if (s.burn) html += `Burn: <span style="color:var(--gold)">${s.burn} turns</span><br>`;
                    tip.innerHTML = html + `<hr style="border:0;border-top:1px solid #444;margin:5px 0"><small>${s.mp ? 'Cost: ' + formatNumber(currentCost) + ' MP' : 'No Cost'}</small>`;
                    tip.style.display = 'block';
                    updateTipPos(e, tip);
                };
                b.onmousemove = (e) => {
                    updateTipPos(e, document.getElementById('tooltip'));
                };
                b.onmouseleave = () => {
                    document.getElementById('tooltip').style.display = 'none';
                };
                zone.appendChild(b);
            });
        }
    });
    if (zone.innerHTML === "" && query !== "") {
        zone.innerHTML = `<div style="grid-column: span 2; text-align: center; color: #666; margin-top: 10px;">No actions matching "${query}"</div>`;
    }
}

function startCombat() {
    playCombatStartSFX();
    let selectedEnemy = null;
    // debugging override
    if (nextEnemyOverride) {
        selectedEnemy = enemies.find(e => e.name.toLowerCase() === nextEnemyOverride.toLowerCase());
        nextEnemyOverride = null; 
        if (p.kills >= 1000000n) {
            log("You have encountered a very unnatural enemy. Lux has definitely sent them. They are definitely dangerous. Stay safe. You don't know what Lux is playing at.", "#ff0000");
        } else if (selectedEnemy) {
            log("You have encountered an unnatural enemy. Maybe Lux sent them? Stay safe.", "var(--lux)");
        }
    }
    // normal selection (If no override exists)
    if (!selectedEnemy) {
        // filter the pool based on LV and Skills
        let eligiblePool = enemies.filter(e => {
            try {
                return e.canSpawn ? e.canSpawn() : true;
            } catch(err) {
                return true; 
            }
        });
        // fallback if the pool is empty
        if (eligiblePool.length === 0) {
            if (p.kills >= 1000000n) {
                log(`Lux: Enjoy fighting those you have killed.`,"#ff0000")
                eligiblePool = [enemies.find(e => e.name === "Kitsune") || enemies[0]];
            } else {
                eligiblePool = [enemies.find(e => e.name === "Shadow Imp") || enemies[0]];
            }
        }
        // calculate Weights
        let totalWeight = 0;
        eligiblePool.forEach(e => {
            totalWeight += (e.weight ?? 10);
        });
        // weighted Roll
        let roll = Math.random() * totalWeight;
        for (let i = 0; i < eligiblePool.length; i++) {
            roll -= (eligiblePool[i].weight || 10);
            if (roll <= 0) {
                selectedEnemy = eligiblePool[i];
                break;
            }
        }
        // Final safety fallback
        if (!selectedEnemy) selectedEnemy = eligiblePool[0];
    }
    // 3. initialize the encounter
    // clone the template so we don't modify the master 'enemies' array (don't want that to break again)
    enemy = { 
        name: selectedEnemy.name,
        trait: selectedEnemy.trait || "No known traits.",
        specialMsg: selectedEnemy.specialMsg,
        burnImmune: selectedEnemy.burnImmune || false,
        burnResist: selectedEnemy.burnResist || 1,
        burnVuln: selectedEnemy.burnVuln || 1,
        burnReflect: selectedEnemy.burnReflect || 0,
        // Explicitly call the getters to get the BigInt values (broke a couple versions ago for absolutely no reason)
        mhp: BigInt(selectedEnemy.mhp), 
        hp: BigInt(selectedEnemy.mhp), 
        atk: BigInt(selectedEnemy.atk),
        san: BigInt(selectedEnemy.san || 0),
        manaDrain: BigInt(selectedEnemy.manaDrain || 0),
        exp: BigInt(selectedEnemy.exp),
        gold: BigInt(selectedEnemy.gold),
        lifesteal: BigInt(selectedEnemy.lifesteal || 0),
        burn: 0 
    };
    // 4. UI transitions
    document.getElementById('main-controls').classList.add('hidden');
    document.getElementById('combat-view').classList.remove('hidden');
    renderCombatButtons(); 
    updateUI(); 
    log(`Engaged in combat with: ${enemy.name}`, "#ff4757");
    document.getElementById('e-name').innerText = enemy.name;
    playLuxTheme();
    // 5. SPECIAL DIALOGUE CHECK
    if (selectedEnemy.specialMsg) {
        if (enemy.name === "Bob") {
            setTimeout(() => {
                log(selectedEnemy.specialMsg, "#bf2c89");
                LuxLog(`Lux: ...`)
            }, 150);
            setTimeout(() => {
                LuxLog(`Lux: Fuck it. I'm out.`)
                p.flags.bobvisits += 1n
            }, 300);
        } else {
            setTimeout(() => {
                log(selectedEnemy.specialMsg, "#bf2c89");
            }, 150);
        }
    }
}

function playLuxTheme() {
    if (currentBossBGM) {
        currentBossBGM.pause();
        currentBossBGM.src = ""; // Force clear the source
        currentBossBGM = null;
    }

    if (enemy.name === "Lux") {
        let track = "sfx/combat/theme_music/lux/lux_normal.wav"; 
        if (p.kills >= 1000000n && Math.random() < 0.1) {
            track = "sfx/combat/theme_music/lux/Geno/lux_enforcer.mp3"; // "Fundemental Paper Education: Mister Barrel Song Halls of the Enforcer (Fan Song)" by FrostFM
        } else if (p.kills >= 1000000n) {
            track = "sfx/combat/theme_music/lux/Geno/lux_piano.mp3"; // "Cordial Condolences but its only on a piano" by Zalundia
        } else if (Math.random() < 0.1) {
            let solari = Math.random() // random variable name as I did not want to spend 10 minutes coming up with a suitable variable name so I just decided to take the last name of my OC
            if (solari < 0.1) {
                track = "sfx/combat/theme_music/lux/lux_secret1.mp3"; // "Seeing Red" by 'lucidMusic'
            } else if (solari < 0.2) {
                track = "sfx/combat/theme_music/lux/lux_secret2.mp3"; // "Thrill of the Hunt" by 'lucidMusic'
            } else if (solari < 0.3) {
                track = "sfx/combat/theme_music/lux/lux_secret3.mp3"; // "Knife Dance (Extended Synth Metal Mix)" by 'AJDiSpirito' & 'FARADAY CAGE'      
            } else if (solari < 0.4) {
                track = "sfx/combat/theme_music/lux/lux_secret4.mp3"; // to put (possibly "Перемога?" Or maybe another song.)
            } else if (solari < 0.5) {
                track = "sfx/combat/theme_music/lux/lux_secret5.mp3"; // to put (just for fun, maybe add "Megalovania")
            } else if (solari < 0.6) {
                track = "sfx/combat/theme_music/lux/lux_secret6.mp3"; // to put
            } else if (solari < 0.7) {
                track = "sfx/combat/theme_music/lux/lux_secret7.mp3"; // to put
            } else if (solari < 0.8) {
                track = "sfx/combat/theme_music/lux/lux_secret8.mp3"; // to put
            } else if (solari < 0.9) {
                track = "sfx/combat/theme_music/lux/lux_secret9.mp3"; // to put
            } else if (solari < 1) {
                track = "sfx/combat/theme_music/lux/lux_secret10.mp3"; // to put
            } else {
                console.log("Error: 'Math.random' returned a value higher then 1 (somehow). Please contact the creators of the 'Math.random' function to fix this shit.")
                log(`Funfriend: Error: 'Math.random' returned a value higher then 1 (somehow). Please contact the creators of the 'Math.random' function to fix this shit.`, "var(--funfriend)")
                track = "sfx/combat/theme_music/lux/lux_normal.wav";
            }
        }
    }

    currentBossBGM = new Audio(track);
    currentBossBGM.loop = true;
    
    currentBossBGM.play().catch(e => {
        log(`Audio Error: ${e.name} | Path: ${track}`, "#ff0000");
    });
}

function cast(sid) {
    document.body.style.pointerEvents = "none";
    if (!enemy.hp || enemy.hp <= 0n) {
        win();
        updateUI;
        return;
    }
    let s = skillTree[sid];
    // getScaledMana now returns a BigInt
    let scaledCost = getScaledMana(s.mp);
    // 1. Mana Check (BigInt comparison)
    if (s.mp && p.mp < scaledCost) {
        log(`Insufficient Mana! Need ${formatNumber(scaledCost)} MP.`, "#ff4757");
        if (Math.random() < 0.2) {
            if (p.kills >= 1000000n) {
                document.body.style.pointerEvents = "none"; 
                log(`Lux: ...`,"#ff0000")
                setTimeout (() => {
                    log(`Lux: You do not deserve the ability to cast spells.`,"#ff0000")
                    p.mp = -100n * p.lv * p.kills
                    playHeartCrackSFX();
                    document.body.style.pointerEvents = "auto"; 
                }, 3000)
            } else {
                log(`Lux: You absolute buffoon. You're stressing yourself out more and more. Do you really want to burn out your soul? It'll just make it easier to kill you later.`, "var(--lux)");
                document.body.style.pointerEvents = "auto";
            }
        }
        document.body.style.pointerEvents = "auto";
        return; 
    }
    // 2. Deduct Mana (BigInt subtraction)
    if (s.mp) p.mp -= scaledCost;
    updateUI();
    // 3. Damage Logic
    if (s.dmg) { 
        let damage = BigInt(s.dmg);
        enemy.hp -= damage;
        if (sid === 'fireball') {
            playFireballSFX();
        } else if (sid === 'iceshock') {
            playIceshockSFX();
        } else {
            if (s.dmg >= enemy.mhp) {
                playPlayerAtkHitHeavySFX();
            } else {
                playPlayerAtkHitSFX();
            }
        }
        updateUI();
        log(`You strike with ${s.name} for ${formatNumber(damage)} damage.`);
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                if (s.dmg >= enemy.mhp) {
                    log(`Lux: Was that really necessary?`, "#ff0000")
                } else {
                    log(`Lux: You dealt ${formatNumber(damage)} damage. I don't know if I should be happy for you, concerned, or genuinely disgusted.`, "#ff0000")
                }
            } else {
                log(`Lux: You dealt ${formatNumber(damage)} damage. Nice job. Just don't forget...`,"var(--lux)");
                log(`Lux: I can do much, much more.`,"#ff0000");
            }
        }
        if (enemy.hp <= 0n) {
            win();
            updateUI();
            return;
        }
    }
    // 4. Status Effects (Duration can stay as Number)
    if (s.burn) {
        if (enemy.burnImmune) {
            log(`${enemy.name} is immune to burn!`, "var(--gold)");
        } else {
            enemy.burn = Number(s.burn); 
            log(`${enemy.name} is set ablaze for ${s.burn} turns!`, "var(--gold)");
        }
    }
    // 5. Healing / Sanity
    if (s.heal) {
        let healAmt = BigInt(s.heal);
        p.hp = BigMath.min(p.hp + healAmt, p.mhp);
        updateUI();
        const healSFX = new Audio("sfx/player_sfx/player_heal.wav");
        healSFX.currentTime = 0;
        healSFX.play().catch(e => console.log("Audio playback prevented:", e));
    }
    if (s.san) {
        if (s.san < 0n) {
            let sanAmt = BigInt(s.san);
            p.sn += sanAmt
            updateUI();
        } else {
            let sanAmt = BigInt(s.san);
            p.sn = BigMath.min(p.sn + sanAmt, p.msn);
            updateUI();
        }
    }
    // 6. Passive Mana Regen
    if (p.sn > 0n) {
        p.mp = BigMath.min(p.mp + 5n, p.mmp);
        updateUI();
    }
    // 7. Win/Turn Logic
    if (enemy.hp <= 0n) {
        win(); 
        updateUI();
        return;
    } else {
        enemyTurn();
    }
    updateUI();
    setTimeout(() => {
        document.body.style.pointerEvents = "auto";
    }, 500)
}

function enemyTurn() {
    if (!enemy || enemy.hp <= 0n) return;
    // 1. Burn tick (BigInt math)
    if (enemy.burn > 0) {
        if (enemy.burnImmune) {
            enemy.burn = 0;
        } else {
            // Ensure multipliers are treated as BigInt 'units' (100 = 1.0)
            // 1. Calculate Base (4n at LV 2)
            let baseBurnDMG = BigInt(p.lv) * 2n;
            // 2. Scale all multipliers by 100 (treating 100 as 1.0)
            let res = BigInt(Math.floor((enemy.burnResist || 1) * 100));
            let vuln = BigInt(Math.floor((enemy.burnVuln || 1) * 100));
            let pDmg = p.dmgmult;
            // 3. Divide by (100 * 100 * 100) to reset the scale
            let finalBurnDMG = (baseBurnDMG * res * vuln * pDmg) / 1000000n;
            // 4. Ensure it doesn't drop to 0 if you want a minimum tick
            if (finalBurnDMG === 0n && baseBurnDMG > 0n) finalBurnDMG = 1n;
            enemy.hp -= finalBurnDMG;
            enemy.burn--;
            log(`${enemy.name} is burning! (-${finalBurnDMG} HP)`, "var(--gold)");
            if (enemy.burnReflect && enemy.burnReflect > 0) {
                let reflectMult = BigInt(Math.floor(enemy.burnReflect * 100));
                let reflectDMG = (finalBurnDMG * reflectMult) / 100n;
                p.hp -= reflectDMG;
                log(`${enemy.name} reflects ${formatNumber(reflectDMG)} burn damage back to you!`, "var(--hp)");
            }
        }
    }
    if (enemy.hp <= 0n) return win();
    // 2. Lifesteal (Math.min replacement)
    if (enemy.lifesteal && BigInt(enemy.lifesteal) > 0n) {
        let heal = BigInt(enemy.lifesteal);
        enemy.hp = BigMath.min(enemy.hp + heal, enemy.mhp);
        log(`${enemy.name} drains your life and heals ${formatNumber(heal)} HP`, "var(--hp)");
    }
    // 3. Attack
    p.hp -= enemy.atk;
    // 4. Sanity / Mana Drain
    const sDrain = BigInt(enemy.san || 0);
    const mDrain = BigInt(enemy.manaDrain || 0);
    if (sDrain > 0n && mDrain > 0n) {
        p.sn = BigMath.max(p.sn - sDrain, 0n);
        p.mp = BigMath.max(p.mp - mDrain, 0n);
        log(`${enemy.name} strikes for ${formatNumber(BigInt(enemy.atk))} HP, <span class="san-warn">${formatNumber(sDrain)} Sanity Drain</span> and <span class="mana-warn">${formatNumber(mDrain)} Mana Drain</span>`);
    } else if (sDrain > 0n) {
        p.sn = BigMath.max(p.sn - sDrain, 0n);
        log(`${enemy.name} strikes for ${formatNumber(BigInt(enemy.atk))} HP and <span class="san-warn">${formatNumber(sDrain)} Sanity Drain</span>!`);
    } else if (mDrain > 0n) {
        p.mp = BigMath.max(p.mp - mDrain, 0n);
        log(`${enemy.name} strikes for ${formatNumber(BigInt(enemy.atk))} HP and <span class="mana-warn">${formatNumber(mDrain)} Mana Drain</span>`, "var(--mana)");
    } else {
        log(`${enemy.name} strikes for ${formatNumber(BigInt(enemy.atk))} HP.`);
    }
    const hurtSFX = new Audio("sfx/player_sfx/player_hurt.wav");
    hurtSFX.currentTime = 0;
    hurtSFX.play().catch(e => console.log("Audio playback prevented:", e));
    // 5. Death check
    if (p.hp <= 0n) { 
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: Enjoy the bitter, freezing embrace of death.`,"#ff0000")
                if (p.kills >= 1000000n) {
                    setTimeout(() => {
                        document.body.innerHTML = `<span style="color: red;">Don't bother coming back.</span>`;
                    }, 3000);
                }
            } else {
                log(`Lux: Enjoy the bitter-sweet, cold embrace of death =)`,"var(--lux)");
            }
            document.body.style.pointerEvents = "none";
            currentBossBGM.pause();
            currentBossBGM = null;
        } else {
            log("You have perished.", "#ff4757"); 
            document.body.style.pointerEvents = "none";
            currentBossBGM.pause();
            currentBossBGM = null;
        } 
        const deathSFX1 = new Audio("sfx/player_sfx/player_death/heart_crack.wav");
        triggerShake();
        deathSFX1.currentTime = 0;
        deathSFX1.play().catch(e => console.log("Audio playback prevented:", e));
        setTimeout(()=>{
            const deathSFX2 = new Audio("sfx/player_sfx/player_death/heart_shatter.wav");
            deathSFX2.currentTime = 0;
            deathSFX2.play().catch(e => console.log("Audio playback prevented:", e));
        }, 1000)
    }
    updateUI();
}

function addExperience(amt) {
    const amount = BigInt(amt || 0);
    // 1. ADD the experience to your current total; don't overwrite it. I already had that problem before and it absolutly fucking made me go insane trying to fix this shit.
    p.exp += amount;
    if (p.exp < 0n) p.exp = 0n;
    // 2. Identify current level requirements
    const getReq = (lv) => {
        let req = 100n;
        for (let i = 1n; i < lv; i++) req = (req * 120n) / 100n;
        return req;
    };
    let nextLevelReq = getReq(p.lv);
    let levelsGained = 0n;
    // 3. Subtract the cost of each level one-by-one from p.exp
    // This keeps the "remainder" on the bar
    while (p.exp >= nextLevelReq) {
        p.exp -= nextLevelReq; // "Spend" the EXP on the level-up
        levelsGained++;
        nextLevelReq = getReq(p.lv + levelsGained); // Get the cost for the NEXT one
        if (levelsGained > 1000n) break; // Safety break
    }
    // 4. Apply the jumps
    if (levelsGained > 0n) {
        p.lv += levelsGained;
        p.sp += levelsGained;
        // Bulk Stat Growth
        for (let i = 0; i < Number(levelsGained); i++) { // this is shitting me. With about ~1k jumps, it works instantly. With about ~10k jumps, it just freezes. I fucking hate this.
            p.mhp += (p.mhp * 20n) / 100n || 1n;
            p.mmp += (p.mmp * 20n) / 100n || 1n;
            p.msn += (p.msn * 20n) / 100n || 1n;
        }
        p.hp = p.mhp; p.mp = p.mmp; p.sn = p.msn;
        log(`Leveled up to LV ${p.lv}! (+${levelsGained} levels)`, "var(--unlocked)");
        if (p.kills >= 1000000n) {
            const levelUpSFXD = new Audio("sfx/player_sfx/player_lv_up/player_lv_up_distorted.mp3");
            levelUpSFXD.currentTime = 0;
            levelUpSFXD.play().catch(e => console.log("Audio playback prevented:", e));
        } else {
            const levelUpSFX = new Audio("sfx/player_sfx/player_lv_up/player_lv_up.wav");
            levelUpSFX.currentTime = 0;
            levelUpSFX.play().catch(e => console.log("Audio playback prevented:", e));
        }
    }
    updateUI();
}

function win() {
    if (currentBossBGM) { // Before, I made it so that it just ran `.pause()` and that effectivly caused the enemy to become immortal as I could keep attacking them. I once managed to bring them to about -10M HP... because they were immortal. It took me so fucking long to figure out that the problem was that I was trying to use `.pause()` on fucking 'null'
        try {
            currentBossBGM.pause();
            currentBossBGM.currentTime = 0; // Reset track
            currentBossBGM.src = "";        // Clear memory
        } catch (audioErr) {
            console.warn("Audio cleanup failed, but proceeding to win:", audioErr);
        }
        currentBossBGM = null; 
    }
    // formatNumber handles the BigInts for the log
    log(`Victory! Looted ${formatNumber(enemy.gold)}g and ${formatNumber(enemy.exp)} EXP.`, "var(--unlocked)");
    if (Math.random() < 0.05) {
        if (p.kills >= 1000000n) {
            if (Math.random() < 0.1) {
                log(`Lux: Another innocent soul gone, another hour I weep.`,"#ff0000")
            } else if (Math.random() < 0.2) {
                log(`Lux: Do you even see their fear, when you finally find someone to fight?`, "#ff0000")
            } else if (Math.random() < 0.3) {
                log(`Lux: When will you stop this crusade?`, "#ff0000")
            } else if (Math.random() < 0.4) {
                log(`Lux: Another innocent soul gone, another family weeps. Or would if they ever were alive.`, "#ff0000")
            } else if (Math.random() < 0.5) {
                log(`Lux: Another innocent soul gone. Slain by your hand. Do you even feel your hands growing heavy?`, "#ff0000")
            } else if (Math.random() < 0.6) {
                log(`Lux: More blood you've spilled. Another soul to seek asylum in my heaven. Yet... almost none of those said souls have gone to hell.`, "#ff0000")
            } else if (Math.random() < 0.7) {
                log(`Lux: You've killed another ${formatNumber(p.kills-1000000n)} innocent creatures after your punishment with a million. Yet you are still going.`, "#ff0000")
            } else if (Math.random() < 0.8) {
                log(`Lux: A total of ${formatNumber(p.kills)} innocent creatures killed. By your hand. Do you feel your mind get tired after all of this mindless killing?`, "#ff0000")
            } else if (Math.random() < 0.9) {
                log(`Lux: A damage multiplier of ${formatNumber(p.dmgmult)}. That explains how you got ${formatNumber(p.kills)} kills so quickly. But the moral price of getting said kills...`, "#ff0000")
            } else {
                log(`Lux: You've lost your empathy. I'm not surprised.`, "#ff0000")
            }
        } else {
            log(`Lux: Yet another soul you've removed off my realm. Interesting how you're still going. After ${p.kills} kills.`,"var(--lux)");
        }
    }
    // 1. Math.max replacement for Gold
    let goldGained = BigInt(enemy.gold || 0);
    p.gold = p.gold + goldGained
    p.totalGold = BigMath.max(p.totalGold + goldGained, 0n);
    addExperience(enemy.exp); 
    p.kills += 1n;
    addEnemyKillCount();
    enemyItemDrop();
    updateUI();
    checkLuxKillLogs();
    enemy = null;
    exitEvent();
}

function spareEnemy() {
    if (!enemy) return;
    if (enemy.hp <= (enemy.mhp / 2n)) {
        if (p.kills >= 1000000n) {
            log(`You showed mercy to ${enemy.name}. They fled in panic without looking back.`, "var(--hp)");
            const spareSFXD = new Audio("sfx/combat/combat_mercy_distorted.mp3");
            spareSFXD.currentTime = 0;
            spareSFXD.play().catch(e => console.log("Audio playback prevented:", e));
        } else {
            log(`You showed mercy to ${enemy.name}. As thanks for not killing them, they gave you some gold.`, "var(--unlocked)");
            const spareSFX = new Audio("sfx/combat/combat_mercy.wav");
            spareSFX.currentTime = 0;
            spareSFX.play().catch(e => console.log("Audio playback prevented:", e));
            let goldGained = BigInt((enemy.gold / 2n) || 0);
            p.gold = BigMath.max(p.gold + goldGained, 0n);
        }
        
        if (Math.random() < 0.1) {
            if (p.kills >= 1000000n && p.spares >= 10) {
                log(`Lux: Stop it. You aren't fooling anyone. <strong style="color: #910000">Not even yourself</strong>.`,"#ff0000")
            } else if (p.kills >= 1000000n) {
                log(`Lux: Trying to turn around and spare creatures? Don't make me laugh. I know exactly what you are.`, "#ff0000");
            } else if (p.kills >= 100000n) {
                log(`Lux: I wonder. Why do you think you can turn around? After killing over 100,000 innocent creatures.`, "#d80721");
            } else if (p.kills >= 10000n) {
                log(`Lux: Sparing at over 10,000 innocent creatures killed? How... interesting.`, "#b20e43");
            } else if (p.kills >= 1000n) {
                log(`Lux: 1000 innocent creatures killed, and yet you try to spare them? I wonder what they would do if they realized you were the reason why their families are dead.`, "#8b1564");
            } else if (p.kills >= 100n) {
                log(`Lux: Sparing them? That's different. Very different, considering you have killed ${formatNumber(p.kills)} innocent creatures.`, "#651c85");
            } else {
                log(`Lux: Sparing them? How... sentimentally human of you.`, "var(--lux)");
            }
        }

        // Leave combat without gaining EXP
        enemy = null;
        p.spares += 1n
        exitEvent();
        updateUI();
        checkLuxSpareLogs();
    } else {
        log(`${enemy.name} is still too aggressive to be spared! (Needs < 50% HP)`, "#ff4757");
        
        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                log(`Lux: You've killed over a million creatures. And you tried to spare a creature. I'm not surprised you failed.`,"#ff0000")
            } else {
                log(`Lux: They still want your blood. Don't be naive.`, "var(--lux)");
            }
        }
        if (p.kills >= 1000000n) {
            if (Math.random() < 0.25) {
                log(`Out of revenge for their dead family, ${enemy.name} attacks 4 times!`,"#ff0000")
                enemyTurn();
                setTimeout(() =>{
                    enemyTurn();
                }, 500)
                setTimeout(() =>{
                    enemyTurn();
                }, 1000)
                setTimeout(() =>{
                    enemyTurn();
                }, 1500)
            } else if (Math.random() < 0.5) {
                log(`Out of revenge for their dead family, ${enemy.name} attacks 3 times!`,"#ff0000")
                enemyTurn();
                setTimeout(() =>{
                    enemyTurn();
                }, 500)
                setTimeout(() =>{
                    enemyTurn();
                }, 1000)
            } else {
                log(`Out of revenge for their dead family, ${enemy.name} attacks 2 times!`,"#ff0000")
                enemyTurn();
                setTimeout(() =>{
                    enemyTurn();
                }, 500)
            }
        } else {
            enemyTurn();
        }
    }
}