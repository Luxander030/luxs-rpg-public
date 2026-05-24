function renderStatusIcons() {
    const zone = document.getElementById('e-status-icons');
    if (!zone) return;
    zone.innerHTML = "";
    if (!enemy) return;
    // Create a self-contained tooltip
    let tip = document.getElementById('status-tooltip');
    if (!tip) {
        tip = document.createElement('div');
        tip.id = 'status-tooltip';
        tip.style = `
            position: fixed;
            background: #1e1e24;
            border: 1px solid #2f3542;
            border-radius: 8px;
            padding: 10px;
            color: white;
            font-size: 0.85em;
            max-width: 200px;
            pointer-events: none;
            display: none;
            z-index: 9999;
        `;
        document.body.appendChild(tip);
    }
    const updateTipPos = (e) => {
        let x = e.clientX + 15;
        let y = e.clientY + 15;
        if (x + 215 > window.innerWidth) x = e.clientX - 215;
        if (y + tip.offsetHeight > window.innerHeight) y = window.innerHeight - tip.offsetHeight - 10;
        tip.style.left = x + 'px';
        tip.style.top = y + 'px';
    };
    statusEffects.forEach(effect => {
        const value = enemy[effect.name.toLowerCase()];
        if (!value || value <= 0n) return;
        const img = document.createElement('img');
        img.src = effect.icon;
        img.style = "width:24px; height:24px; image-rendering:pixelated; cursor:pointer;";
        const turnsLabel = effect.name === "Poison" ? "Stacks" : "Turns";
        img.onmouseenter = (e) => {
            let html = `<strong>${effect.name}</strong><br>`;
            html += `<hr style="border:0;border-top:1px solid #444;margin:5px 0">`;
            html += `<small>${effect.description}</small>`;
            html += `<hr style="border:0;border-top:1px solid #444;margin:5px 0">`;
            html += `<em style="color:#a4b0be;font-size:0.85em;">${effect.flavor}</em>`;
            html += `<hr style="border:0;border-top:1px solid #444;margin:5px 0">`;
            html += `<small>${turnsLabel}: ${formatNumber(value)}</small>`;
            tip.innerHTML = html;
            tip.style.display = 'block';
            updateTipPos(e);
        };
        img.onmousemove = (e) => updateTipPos(e);
        img.onmouseleave = () => {
            tip.style.display = 'none';
        };
        zone.appendChild(img);
    });
}

function renderCombatButtons() {
    const zone = document.getElementById('combat-btns');
    const searchInput = document.getElementById('action-search');
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    if (!zone) return;
    zone.innerHTML = "";

    const categories = [
        {
            label: "Class Spells",
            filter: (s, sid) => {
                if (s.weaponRequired) return false;
                if (!s.tree) return false;
                // Show spells that belong to the player's class tree
                return s.tree === p.class && (s.dmg || s.heal || s.san);
            }
        },
        {
            label: "General Spells",
            filter: (s, sid) => {
                if (s.weaponRequired) return false;
                return s.tree === "general" && (s.heal || s.san);
            }
        },
        {
            label: "Physical Attacks",
            filter: (s, sid) => {
                if (s.weaponRequired) return false;
                return s.tree === "physical" && s.dmg;
            }
        },
        {
            label: "Weapon Actions",
            filter: (s, sid) => {
                return s.weaponRequired && s.weaponRequired === p.inventory.equippedWeapon;
            }
        }
    ];

    const updateTipPos = (e, tip) => {
        let x = e.clientX + 15;
        let y = e.clientY + 15;
        let tipH = tip.offsetHeight;
        let winW = window.innerWidth;
        let winH = window.innerHeight;
        if (x + 200 > winW) x = e.clientX - 215;
        if (y + tipH > winH) y = winH - tipH - 10;
        tip.style.left = x + 'px';
        tip.style.top = y + 'px';
    };

    categories.forEach(cat => {
        const matchingSkills = p.skills.filter(sid => {
            let s = skillTree[sid];
            return s && cat.filter(s, sid) && s.name.toLowerCase().includes(query);
        });

        if (matchingSkills.length > 0) {
            const header = document.createElement('div');
            header.style = "grid-column: span 2; color: #a4b0be; font-size: 0.75em; margin-top: 10px; border-bottom: 1px solid #2f3542; text-transform: uppercase;";
            header.innerText = cat.label;
            zone.appendChild(header);

            matchingSkills.forEach(sid => {
                let s = skillTree[sid];
                let currentCost = BigInt(getScaledMana(s.mp || 0));

                let b = document.createElement('button');
                b.innerText = `${s.name}${s.mp ? ' (' + formatNumber(currentCost) + ' MP)' : ''}`;
                b.onclick = () => cast(sid);

                // Backfire warning for stormmancer spells
                if (s.backfireChance) {
                    b.style.borderBottom = `2px solid #ff4757`;
                }

                // Fire reduction warning for druid spells
                if (s.fireReduction && enemy && (
                    enemy.name === "Fire Elemental" ||
                    enemy.name === "Fiery Will O' Wisp" ||
                    enemy.name === "Azmodan"
                )) {
                    b.style.opacity = "0.6";
                    b.title = "Reduced damage against fire enemies";
                }

                // Fire bonus highlight for watermancer spells
                if (s.fireBonus && enemy && (
                    enemy.name === "Fire Elemental" ||
                    enemy.name === "Fiery Will O' Wisp" ||
                    enemy.name === "Azmodan"
                )) {
                    b.style.borderBottom = `2px solid #38bdf8`;
                }

                // Shadow bonus highlight
                if (s.luxBonus && enemy && (
                    enemy.name === "Lux" ||
                    enemy.name === "Kitsune"
                )) {
                    b.style.borderBottom = `2px solid #c084fc`;
                }

                b.onmouseenter = (e) => {
                    const tip = document.getElementById('tooltip');
                    let html = `<strong>${s.name}</strong>`;

                    // Class tag
                    if (s.tree && s.tree !== "weapon") {
                        html += ` <span style="font-size:0.75em; color:#a4b0be;">[${getClassName(s.tree)}]</span>`;
                    }
                    html += `<br>`;

                    // Stats
                    if (s.dmg)   html += `DMG: <span style="color:var(--hp)">${formatNumber(BigInt(s.dmg))}</span><br>`;
                    if (s.heal)  html += `Healing: <span style="color:var(--unlocked)">${formatNumber(BigInt(s.heal))}</span><br>`;
                    if (s.san)   html += `Sanity: <span style="color:var(--sanity)">${formatNumber(BigInt(s.san))}</span><br>`;
                    if (s.burn)  html += `Burn: <span style="color:var(--burnDMG)">${s.burn} turns</span><br>`;
                    if (s.freeze) html += `Freeze: <span style="color:var(--freezeDMG)">${s.freeze} turns</span><br>`;
                    if (s.stun)  html += `Stun: <span style="color:#ffd700">${s.stun} turns</span><br>`;
                    if (s.poison) html += `Poison: <span style="color:var(--poisonDMG)">${formatNumber(BigInt(s.poison))}</span><br>`;

                    // Special notes
                    if (s.backfireChance) {
                        html += `<span style="color:#ff4757">⚠ ${(s.backfireChance * 100).toFixed(0)}% chance to backfire</span><br>`;
                    }
                    if (s.fireReduction) {
                        html += `<span style="color:#fb923c">Reduced damage vs fire (🔥) enemies</span><br>`;
                    }
                    if (s.fireBonus) {
                        html += `<span style="color:#38bdf8">Water (💧) Magic has a 2x damage bonus vs fire (🔥) enemies</span><br>`;
                    }
                    if (s.luxBonus) {
                        html += `<span style="color:#c084fc">↑ vs Lux/Kitsune | ↓ vs Demons</span><br>`;
                    }

                    html += `<hr style="border:0;border-top:1px solid #444;margin:5px 0">`;
                    html += `<small>${s.mp ? 'Cost: ' + formatNumber(currentCost) + ' MP' : 'No Cost'}</small>`;

                    tip.innerHTML = html;
                    tip.style.display = 'block';
                    updateTipPos(e, tip);
                };

                b.onmousemove = (e) => updateTipPos(e, document.getElementById('tooltip'));
                b.onmouseleave = () => document.getElementById('tooltip').style.display = 'none';

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
        immortal: selectedEnemy.immortal || false,
        trait: selectedEnemy.trait || "No known traits.",
        specialMsg: selectedEnemy.specialMsg,
        freezeImmune: selectedEnemy.freezeImmune || false,
        burnImmune: selectedEnemy.burnImmune || false,
        burnResist: selectedEnemy.burnResist || 1,
        burnVuln: selectedEnemy.burnVuln || 1,
        burnReflect: selectedEnemy.burnReflect || 0,
        // Explicitly call the getters to get the BigInt values (broke a couple versions ago for absolutely no reason)
        mhp: selectedEnemy.immortal ? 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n : BigInt(selectedEnemy.mhp),
        hp: selectedEnemy.immortal ? 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n : BigInt(selectedEnemy.mhp),
        atk: BigInt(selectedEnemy.atk),
        san: BigInt(selectedEnemy.san || 0),
        manaDrain: BigInt(selectedEnemy.manaDrain || 0),
        exp: BigInt(selectedEnemy.exp),
        gold: BigInt(selectedEnemy.gold),
        lifesteal: BigInt(selectedEnemy.lifesteal || 0),
        slothSin: selectedEnemy.slothSin || 0n,
        prideSin: selectedEnemy.prideSin || 0n,
        wrathSin: selectedEnemy.wrathSin || 0n,
        lustSin: selectedEnemy.lustSin || 0n,
        gluttonySin: selectedEnemy.gluttonySin || 0n,
        greedSin: selectedEnemy.greedSin || 0n,
        envySin: selectedEnemy.envySin || 0n,
        killKey: selectedEnemy.killKey,
        solari: 0n,
        fished: 0n,
        burning: 0n,
        frozen: 0n,
        stunned: 0n,
        stunCooldown: 0n,
        poison: 0n,
        weakened: 0n,
        vulnerable: 0n,
        resistant: 0n
    };
    // 4. UI transitions
    document.getElementById('main-controls').classList.add('hidden');
    document.getElementById('combat-view').classList.remove('hidden');
    renderCombatButtons(); 
    updateUI(); 
    log(`Engaged in combat with: ${enemy.name}`, "#ff4757");
    document.getElementById('e-name-text').innerText = enemy.name;
    if (enemy.name === "Lux") {
        playLuxTheme();
    }
    // 5. SPECIAL DIALOGUE CHECK & OTHER
    if (selectedEnemy.specialMsg) {
        if (enemy.name === "Gerald") {
            LuxLog(`Lux: MY BOY!`)
        }
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
    function removeEdibleItems() {
        const edibleIds = new Set(
            inventoryItems
                .filter(item => item.edible)
                .map(item => item.name) // slots store item names, not IDs
        );
    
        let removed = 0;
    
        // Check named slots (slot1 - slot20)
        for (let i = 1; i <= 20; i++) {
            const key = `slot${i}`;
            if (
                p.inventory[key] !== "null" &&
                p.inventory[key] !== "empty" &&
                edibleIds.has(p.inventory[key])
            ) {
                p.inventory[key] = "empty";
                removed++;
            }
        }
        if (edibleIds.has(p.inventory.equippedWeapon)) {
            p.inventory.equippedWeapon = "empty";
            removed++;
        }        
        if (removed > 0) {
            log(`Gluttony devours your food! ${removed} edible item${removed > 1 ? "s" : ""} consumed before the fight.`, "var(--enemyATK)");
        } else {
            log(`Gluttony searches your inventory... but finds nothing edible.`, "var(--enemyATK)");
        }
    
        updateUI();
    }    
    if (selectedEnemy.gluttonySin) {
        removeEdibleItems();
    }
}

function playLuxTheme() {
    if (currentBossBGM) {
        currentBossBGM.pause();
        currentBossBGM.src = ""; // Force clear the source
        currentBossBGM = null;
    }
    let track = "sfx/combat/theme_music/lux/lux_normal.wav"; 
        if (p.kills >= 1000000n && Math.random() < 0.1) {
            track = "sfx/combat/theme_music/lux/Geno/lux_enforcer.mp3"; // "Fundemental Paper Education: Mister Barrel Song Halls of the Enforcer (Fan Song)" by FrostFM
        } else if (p.kills >= 1000000n) {
            track = "sfx/combat/theme_music/lux/Geno/lux_piano.mp3"; // "Cordial Condolences but its only on a piano" by Zalundia
        } else if (Math.random() < 0.1) {
            let solari = Math.random() // random variable name as I did not want to spend 10 minutes coming up with a suitable variable name so I just decided to take the last name of my OCs
            if (solari < 0.1) {
                track = "sfx/combat/theme_music/lux/lux_secret1.mp3"; // "Seeing Red" by 'lucidMusic'
            } else if (solari < 0.2) {
                track = "sfx/combat/theme_music/lux/lux_secret2.mp3"; // "Thrill of the Hunt" by 'lucidMusic'
            } else if (solari < 0.3) {
                track = "sfx/combat/theme_music/lux/lux_secret3.mp3"; // "Knife Dance (Extended Synth Metal Mix)" by 'AJDiSpirito' & 'FARADAY CAGE'      
            } else if (solari < 0.4) {
                track = "sfx/combat/theme_music/lux/lux_secret4.mp3"; // to put (Idea: "Перемога" by [insert name later])
            } else if (solari < 0.5) {
                track = "sfx/combat/theme_music/lux/lux_secret5.mp3"; // to put (just for fun, maybe add "Megalovania")
            } else if (solari < 0.6) {
                track = "sfx/combat/theme_music/lux/lux_secret6.mp3"; // to put (Idea: Wither Storm theme song [fuck yeah])
            } else if (solari < 0.7) {
                track = "sfx/combat/theme_music/lux/lux_secret7.mp3"; // to put (Idea: Enter Pony by Kalu4ii Plays)
            } else if (solari < 0.8) {
                track = "sfx/combat/theme_music/lux/lux_secret8.mp3"; // to put (Idea: "vendetta!" by MUPP & Sadfriendd)
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

    currentBossBGM = new Audio(track);
    currentBossBGM.loop = true;
    
    currentBossBGM.play().catch(e => {
        log(`Audio Error: ${e.name} | Path: ${track}`, "#ff0000");
    });
}

function cast(sid) {
    document.body.style.pointerEvents = "none";

    if (enemy.immortal && enemy.hp <= 0n) enemy.hp = enemy.mhp;
    if (!enemy.hp || enemy.hp <= 0n) {
        win();
        updateUI();
        return;
    }

    let s = skillTree[sid];
    let scaledCost = getScaledMana(s.mp);

    // 1. Mana Check
    if (s.mp && p.mp < scaledCost) {
        log(`Insufficient Mana! Need ${formatNumber(scaledCost)} MP.`, "#ff4757");
        if (Math.random() < 0.2) {
            if (p.kills >= 1000000n) {
                document.body.style.pointerEvents = "none";
                log(`Lux: ...`, "#ff0000");
                setTimeout(() => {
                    log(`Lux: You do not deserve the ability to cast spells.`, "#ff0000");
                    p.mp = -100n * p.lv * p.kills;
                    playHeartCrackSFX();
                    document.body.style.pointerEvents = "auto";
                }, 3000);
            } else {
                log(`Lux: You absolute buffoon. You're stressing yourself out more and more. Do you really want to burn out your soul? It'll just make it easier to kill you later.`, "var(--lux)");
                document.body.style.pointerEvents = "auto";
            }
        }
        document.body.style.pointerEvents = "auto";
        return;
    }

    // 2. Deduct Mana
    if (s.mp) p.mp -= scaledCost;
    updateUI();

    // 3. Stormmancer Backfire
    if (s.backfireChance && Math.random() < s.backfireChance) {
        const backfireDmg = s.dmg ? (s.dmg / 4n) : (10n * p.lv);
        p.hp -= backfireDmg;
        p.hp = BigMath.max(p.hp, 1n); // Don't kill the player from backfire
        playHurtSFX();
        log(`⚡ The spell backfired! ${p.name} took <span class="hp-warn">${formatNumber(backfireDmg)} damage</span> from the feedback!`, "#ff4757");
        updateUI();
        if (p.hp <= 1n) {
            log(`You barely survived the backfire...`, "#ff4757");
        }
    }

    // 4. Damage Logic
    if (s.dmg) {
        let damage = s.dmg;
        let pretendDamage = s.dmg;

        // Weapon bonuses on Strike
        if (p.inventory.equippedWeapon === "Stone Sword" && s.tree === "physical") {
            damage += 25n * p.lv;
            pretendDamage += 25n * p.lv;
        } else if (p.inventory.equippedWeapon === "Iron Sword" && s.tree === "physical") {
            damage += 50n * p.lv;
            pretendDamage += 50n * p.lv;
        } else if (p.inventory.equippedWeapon === "Diamond Sword" && s.tree === "physical") {
            damage += 100n * p.lv;
            pretendDamage += 100n * p.lv;
        }        

        // Druid fire reduction
        if (s.fireReduction && enemy.fireType) {
            damage = BigInt(Math.floor(Number(damage) * s.fireReduction));
            pretendDamage = BigInt(Math.floor(Number(pretendDamage) * s.fireReduction));
            log(`${enemy.name} (🔥) resists nature magic! Damage reduced.`, "#fb923c");
        }

        // Watermancer fire bonus
        if (s.fireBonus && enemy.fireType) {
            damage = BigInt(Math.floor(Number(damage) * s.fireBonus));
            pretendDamage = BigInt(Math.floor(Number(pretendDamage) * s.fireBonus));
            log(`Water (💧) is super effective against ${enemy.name}! Damage doubled!`, "#38bdf8");
        }

        // Shadow lux bonus
        if (s.luxBonus && (
            enemy.name === "Lux" ||
            enemy.name === "Kitsune"
        )) {
            damage = BigInt(Math.floor(Number(damage) * s.luxBonus));
            pretendDamage = BigInt(Math.floor(Number(pretendDamage) * s.luxBonus));
            log(`Shadow (🌑) magic resonates against ${enemy.name}! Damage boosted!`, "#c084fc");
        }

        // Shadow demon penalty
        if (s.demonPenalty && enemy.demonType) {
            damage = BigInt(Math.floor(Number(damage) * s.demonPenalty));
            pretendDamage = BigInt(Math.floor(Number(pretendDamage) * s.demonPenalty));
            log(`Shadow (🌑) magic is weak against ${enemy.name}! Damage reduced.`, "#c084fc");
        }

        if (enemy.immortal) damage = 0n;

        // Status modifiers
        damage = enemy.frozen > 0n ? (damage * 3n) / 2n : damage;
        pretendDamage = enemy.frozen > 0n ? (pretendDamage * 3n) / 2n : pretendDamage;

        damage = enemy.vulnerable > 0n ? (damage * 2n) : damage;
        pretendDamage = enemy.vulnerable > 0n ? (pretendDamage * 2n) : pretendDamage;
        let critChance = 0.3
        const didCrit = enemy.vulnerable > 0n && Math.random() < critChance;
        if (didCrit) { damage *= 3n; pretendDamage *= 3n; }

        damage = enemy.resistant > 0n ? (damage / 2n) : damage;
        pretendDamage = enemy.resistant > 0n ? (pretendDamage / 2n) : pretendDamage;

        if (s.fryingPan) { damage *= 1000n; pretendDamage *= 1000n; }

        if (enemy.slothSin) damage = 1n;
        if (enemy.prideSin) { if (damage > (enemy.mhp / 20n)) { damage = enemy.mhp / 20n; } }
        if (enemy.lustSin) damage = damage / 2n; 

        enemy.hp -= damage;

        // SFX
        if (sid === 'iceshock' || sid === 'snowgrave' || sid === 'snowgraveShadow' ||
            sid === 'chill' || sid === 'suddenChill' || sid === 'chillSplinter' ||
            sid === 'coldSnap' || sid === 'snowflakeStrike' || sid === 'snowlingBall' ||
            sid === 'spearcicles' || sid === 'frigidBlast' || sid === 'frostPrison') {
            playIceshockSFX();
        } else {
            if (damage >= enemy.mhp || pretendDamage >= enemy.mhp) {
                playPlayerAtkHitHeavySFX();
            } else {
                playPlayerAtkHitSFX();
            }
        }

        updateUI();

        if (enemy.immortal) {
            log(`Your attack does not affect ${enemy.name}. (${formatNumber(pretendDamage)} dmg prevented)`, "var(--playerATK)");
        } else if (enemy.frozen > 0n) {
            log(`${p.name} strikes with ${s.name} for <span class="hp-warn">${formatNumber(damage)} damage</span> against frozen ${enemy.name}!`, "var(--freezeDMG)");
        } else if (didCrit) {
            log(`${p.name} lands a critical hit with ${s.name} for <span class="hp-warn">${formatNumber(damage)} damage</span>!`, "#ffd700");
        } else {
            log(`${p.name} strikes with ${s.name} for <span class="hp-warn">${formatNumber(damage)} damage</span>.`, "var(--playerATK)");
        }

        if (Math.random() < 0.05) {
            if (p.kills >= 1000000n) {
                if (s.dmg >= enemy.mhp) {
                    log(`Lux: Was that really necessary?`, "#ff0000");
                } else {
                    log(`Lux doesn't seem like talking.`, "#ff0000");
                }
            } else {
                log(`Lux: You dealt ${formatNumber(damage)} damage. Nice job. Just don't forget...`, "var(--lux)");
                log(`Lux: I can do much, much more.`, "#ff0000");
            }
        }

        if (enemy.hp <= 0n) {
            win();
            updateUI();
            return;
        }
    }

    // 5. Frying Pan food drop
    if (p.inventory.equippedWeapon === "fryingPan" && skillTree.fryingPan.unlocked) {
        if (Math.random() < 0.1) {
            const fryingPanDropPool = ["Health Vial", "Mana Well", "Clarity Tonic", "Apple", "Abbie's Apple", "Lux's Lemon", "Bottle O' Water", "Lux's Sandwich", "Bob's Bread"];
            const item = fryingPanDropPool[Math.floor(Math.random() * fryingPanDropPool.length)];
            if (checkSpaceAndAddItem(item)) {
                log(`The Frying Pan sizzles... and produced a "${item}"!`, "var(--mythicItem)");
            } else {
                log(`The Frying Pan sizzles... but your inventory is full.`, "var(--mythicItem)");
            }
        }
    }

    // 6. Status Effects

    // Stun (Stormmancer)
    if (s.stun) {
        if (enemy.stunImmune) {
            log(`${enemy.name} is immune to stun!`, "#ffffff");
        } else if (enemy.stunCooldown > 0n) {
            log(`${enemy.name} is resistant to stun!`, "#ffffff");
        } else if (Math.random() < 0.30) {
            enemy.stunned += s.stun;
            log(`${enemy.name} is stunned for ${formatNumber(s.stun)} turns!`, "#ffffff");
        } else {
            log(`${enemy.name} resisted the stun!`, "#ffffff");
        }
    }    
    if (s.poison) {
        if (enemy.poisonImmune) {
            log(`${enemy.name} is immune to poison!`, "var(--poisonDMG)");
        } else {
            enemy.poison += s.poison;
            log(`${enemy.name} is poisoned for ${formatNumber(s.poison)} stacks!`, "var(--poisonDMG)");
        }
    }

    if (s.burn) {
        if (enemy.burnImmune) {
            log(`${enemy.name} is immune to burn!`, "var(--burnDMG)");
        } else {
            enemy.burning += s.burn;
            log(`${enemy.name} is set ablaze for ${formatNumber(s.burn)} turns!`, "var(--burnDMG)");
        }
    }

    if (s.freeze) {
        if (enemy.freezeImmune) {
            log(`${enemy.name} is immune to freezing!`, "var(--freezeDMG)");
        } else {
            log(`${enemy.name} is frozen for ${formatNumber(s.freeze)} turns!`, "var(--freezeDMG)");
            enemy.frozen += s.freeze;
        }
    }

    // 7. Neutral spell special handling
    if (sid === 'campfire') {
        const roll = Math.random();
        if (roll < 0.33) {
            log(`The campfire crackles warmly. Nothing happens.`, "#a4b0be");
        } else if (roll < 0.66) {
            const healAmt = (50n * p.lv);
            p.hp = BigMath.min(p.hp + healAmt, p.mhp);
            playHealSFX();
            log(`The campfire warms your wounds. Healed ${formatNumber(healAmt)} HP.`, "#fb923c");
        } else {
            log(`The campfire roars! Something good is coming...`, "#fb923c");
            p.gold += 100n * p.lv;
            log(`Found ${formatNumber(100n * p.lv)}g in the embers.`, "var(--gold)");
        }
        updateUI();
    }

    if (sid === 'cauterize') {
        const roll = Math.random();
        if (roll < 0.33) {
            const healAmt = (80n * p.lv);
            p.hp = BigMath.min(p.hp + healAmt, p.mhp);
            playHealSFX();
            log(`The cauterization seals your wounds. Healed ${formatNumber(healAmt)} HP.`, "#fb923c");
        } else if (roll < 0.66) {
            const dmg = (30n * p.lv);
            p.hp -= dmg;
            playHurtSFX();
            log(`The cauterization burns too deep! Lost ${formatNumber(dmg)} HP.`, "#ff4757");
        } else {
            const healAmt = (160n * p.lv);
            p.hp = BigMath.min(p.hp + healAmt, p.mhp);
            const sanAmt = (50n * p.lv);
            p.sn = BigMath.min(p.sn + sanAmt, p.msn);
            playHealSFX();
            log(`The cauterization works perfectly! Healed ${formatNumber(healAmt)} HP and ${formatNumber(sanAmt)} SN.`, "#fb923c");
        }
        updateUI();
    }

    if (sid === 'cosmicBlessing') {
        const roll = Math.random();
        if (roll < 0.25) {
            const dmgAmt = (200n * p.lv * p.dmgmult) / 100n;
            enemy.hp -= dmgAmt;
            log(`The cosmos strikes ${enemy.name} for ${formatNumber(dmgAmt)} damage!`, "#a78bfa");
            if (enemy.hp <= 0n) { win(); updateUI(); return; }
        } else if (roll < 0.5) {
            log(`The cosmos is silent. Nothing happens.`, "#a4b0be");
        } else if (roll < 0.75) {
            const dmgAmt = (500n * p.lv * p.dmgmult) / 100n;
            enemy.hp -= dmgAmt;
            log(`A cosmic ray obliterates ${enemy.name} for ${formatNumber(dmgAmt)} damage!`, "#a78bfa");
            if (enemy.hp <= 0n) { win(); updateUI(); return; }
        } else {
            // Full heal
            p.hp = p.mhp;
            p.mp = p.mmp;
            p.sn = p.msn;
            playHealSFX();
            log(`The cosmos blesses you completely! All vitals restored.`, "#a78bfa");
        }
        updateUI();
    }

    // snowgraveShadow — same as snowgrave
    if (sid === 'snowgraveShadow') {
        if (!enemy.freezeImmune) {
            enemy.frozen += s.freeze;
            log(`${enemy.name} is entombed in shadow ice for ${formatNumber(s.freeze)} turns!`, "#c084fc");
        } else {
            log(`${enemy.name} is immune to freezing!`, "var(--freezeDMG)");
        }
    }

    // 8. Healing / Sanity
    if (s.heal) {
        let healAmt = BigInt(s.heal);
        if (healAmt > 0n) {
            p.hp = BigMath.min(p.hp + healAmt, p.mhp);
            playHealSFX();
            log(`${p.name} healed for <span class="hp-warn">${formatNumber(healAmt)} HP</span>`, "var(--playerATK)");
        } else {
            // Negative heal (e.g. noxNocturnalExplosion)
            p.hp += healAmt;
            log(`${p.name} lost <span class="hp-warn">${formatNumber(healAmt)} HP</span> as a cost.`, "#ff4757");
        }
        updateUI();
    }

    if (s.san) {
        let sanAmt = BigInt(s.san);
        if (sanAmt < 0n) {
            p.sn += sanAmt;
            log(`Lost <span class="san-warn">${formatNumber(sanAmt)} Sanity</span>`, "var(--playerATK)");
        } else {
            p.sn = BigMath.min(p.sn + sanAmt, p.msn);
            log(`Regained <span class="san-warn">${formatNumber(sanAmt)} Sanity</span>`, "var(--playerATK)");
        }
        updateUI();
    }

    updateUI();

    setTimeout(() => {
        // 9. Passive Mana Regen
        if (p.sn > 0n) {
            let scaledAmount = 5n * p.mp;
            p.mp = BigMath.min(p.mp + scaledAmount, p.mmp);
            updateUI();
        }

        // 10. Win/Turn Logic
        if (enemy.hp <= 0n) {
            win();
            updateUI();
            return;
        } else {
            enemyTurn();
        }

        document.body.style.pointerEvents = "auto";
    }, 800);
}

function enemyTurn() {
    if (!enemy || enemy.hp <= 0n) return;
    if (enemy.immortal && enemy.hp <= 0n) enemy.hp = enemy.mhp;

    // --- Fish logic ---
    if (enemy.immortal) {
        enemy.fished = 0n;
    } else {
        if (enemy.fished > 0n) {
            let rollChance = Math.random();
            if (rollChance < 0.1) {
                enemy.fished += 2n;
                log(`The fish increases its influence...`, "var(--fish)");
                updateUI();
            } else if (rollChance < 0.2) {
                p.hp = p.hp / 2n;
                log(`The fish deals damage to YOU`, "var(--fish)");
                updateUI();
            } else if (rollChance < 0.3) {
                enemy.hp = enemy.hp / 2n;
                log(`The fish deals damage to the ENEMY`, "var(--fish)");
            } else if (rollChance < 0.4) {
                // Nothing
            } else if (rollChance < 0.5) {
                enemy.stunned += 10n;
                log(`The fish stuns the ENEMY`, "var(--fish)");
                updateUI();
            } else if (rollChance < 0.6) {
                enemy.burning += 10n;
                log(`The fish burns the ENEMY`, "var(--fish)");
                updateUI();
            } else if (rollChance < 0.7) {
                let FishScaledAmount = 100n * p.lv * (enemy.poison || 1n);
                enemy.poison += FishScaledAmount;
                log(`The fish poisons the ENEMY`, "var(--fish)");
                updateUI();
            } else if (rollChance < 0.8) {
                enemy.frozen += 10n;
                log(`The fish freezes the ENEMY`, "var(--fish)");
                updateUI();
            } else if (rollChance < 0.9) {
                let FishGold = 100n * p.totalGold;
                p.gold += FishGold;
                p.totalGold += FishGold;
                log(`The fish gives ${p.name} gold.`, "var(--fish)");
                updateUI();
            } else {
                log(`The fish does nothing... it rests...`, "var(--fish)");
            }
        }
    }

    // --- Poison tick ---
    if (enemy.immortal) {
        enemy.poison = 0n;
    } else {
        if (enemy.poison > 1n) {
            let stacksUsed = enemy.poison / 2n;
            let preTotalPoisonDamage = stacksUsed * p.lv;
            enemy.poison = (enemy.poison - stacksUsed) === 1n ? 0n : enemy.poison - stacksUsed;
            let totalPoisonDamage = (preTotalPoisonDamage * p.dmgmult) / 100n;
            enemy.hp -= totalPoisonDamage;
            log(`${enemy.name} is poisoned! (-${formatNumber(totalPoisonDamage)} HP, -${formatNumber(stacksUsed)} poison stacks)`, "var(--poisonDMG)");
        }
    }

    // --- Burn tick ---
    if (enemy.immortal) {
        enemy.burning = 0n;
    } else {
        if (enemy.burning > 0n) {
            if (enemy.burnImmune) {
                enemy.burning = 0n;
            } else {
                let baseBurnDMG = BigInt(p.lv) * 2n;
                let res = BigInt(Math.floor((enemy.burnResist || 1) * 100));
                let vuln = BigInt(Math.floor((enemy.burnVuln || 1) * 100));
                let finalBurnDMG = (baseBurnDMG * res * vuln * p.dmgmult) / 1000000n;
                if (finalBurnDMG === 0n && baseBurnDMG > 0n) finalBurnDMG = 1n;
                enemy.hp -= finalBurnDMG;
                enemy.burning -= 1n;
                log(`${enemy.name} is burning! (-${finalBurnDMG} HP)`, "var(--burnDMG)");
                if (enemy.burnReflect && enemy.burnReflect > 0) {
                    let reflectDMG = (finalBurnDMG * BigInt(Math.floor(enemy.burnReflect * 100))) / 100n;
                    p.hp -= reflectDMG;
                    log(`${enemy.name} reflects ${formatNumber(reflectDMG)} burn damage back to ${p.name}!`, "var(--burnDMG)");
                }
            }
        }
    }

    if (enemy.immortal && enemy.hp <= 0n) enemy.hp = enemy.mhp;
    if (enemy.hp <= 0n) return win();

    // --- Stun check ---
    if (enemy.stunned >= 1n) {
        log(`${enemy.name} is stunned and cannot attack!`, "#ffd700");
        enemy.stunned -= 1n;
        updateUI();
        document.body.style.pointerEvents = "auto";
        return;
    }

    // --- Lifesteal ---
    if (enemy.lifesteal && BigInt(enemy.lifesteal) > 0n) {
        let heal = BigInt(enemy.lifesteal);
        enemy.hp = BigMath.min(enemy.hp + heal, enemy.mhp);
        log(`${enemy.name} drains your life and heals ${formatNumber(heal)} HP`, "var(--hp)");
    }

    // --- Bullet Hell ---
    const matchedPatterns = (typeof patternLibrary !== "undefined" ? patternLibrary : [])
        .filter(pat => pat.enemy === enemy.name);

    if (matchedPatterns.length > 0) {
        const activePattern = matchedPatterns[Math.floor(Math.random() * matchedPatterns.length)];
        const patternDisplayName = typeof activePattern.getRandomName === "function"
            ? activePattern.getRandomName()
            : activePattern.name;

        log(`${enemy.name} uses ${patternDisplayName}!`, "var(--enemyATK)");
        document.body.style.pointerEvents = "none";

        const overlay = document.createElement("div");
        overlay.id = "bullet-hell-overlay";
        overlay.style.cssText = `
            position: fixed; left: 0; top: 0;
            width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.88);
            z-index: 999999; overflow: hidden; cursor: none;
        `;

        const info = document.createElement("div");
        info.style.cssText = `
            position: absolute; top: 15px; left: 15px;
            pointer-events: none; color: white;
            font-family: 'Courier New', Courier, monospace;
            text-shadow: 2px 2px #000;
        `;
        info.innerHTML = `Pattern: <span>${patternDisplayName}</span>`;

        const timerUI = document.createElement("div");
        timerUI.style.cssText = `
            position: absolute; top: 15px; right: 15px;
            text-align: right; pointer-events: none; color: white;
            font-family: 'Courier New', Courier, monospace;
            text-shadow: 2px 2px #000;
        `;
        timerUI.innerHTML = `TIME: <span id="bullet-hell-time">0.00</span>s`;

        canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = "display: block; width: 100vw; height: 100vh; background: #000;";

        overlay.appendChild(canvas);
        overlay.appendChild(info);
        overlay.appendChild(timerUI);
        document.body.appendChild(overlay);

        ctx = canvas.getContext("2d");
        bullets = [];
        let frame = 0;
        let ended = false;
        const duration = Math.floor(Math.random() * 5001) + 5000;
        const startTime = Date.now();
        let lastHitTime = 0;
        const iFrameDuration = 500;

        player = {
            x: canvas.width / 2,
            y: canvas.height * 0.75,
            size: 15,
            speed: 5,
            hitbox: 4,
            keys: {}
        };

        function drawHeart(x, y, size, color = "#ff0000") {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, y + size / 4);
            ctx.quadraticCurveTo(x, y, x + size / 4, y);
            ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4);
            ctx.quadraticCurveTo(x + size / 2, y, x + size * 3 / 4, y);
            ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4);
            ctx.quadraticCurveTo(x + size, y + size / 2, x + size / 2, y + size * 0.9);
            ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4);
            ctx.fill();
        }

        const keyDownHandler = (e) => { player.keys[e.key.toLowerCase()] = true; };
        const keyUpHandler   = (e) => { player.keys[e.key.toLowerCase()] = false; };
        const resizeHandler  = () => { if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } };

        window.addEventListener("keydown", keyDownHandler);
        window.addEventListener("keyup",   keyUpHandler);
        window.addEventListener("resize",  resizeHandler);

        function updatePlayer() {
            const focus = player.keys["shift"];
            const moveSpeed = focus ? player.speed * 0.25 : player.speed;
            if ((player.keys["w"] || player.keys["arrowup"])    && player.y > 0)                         player.y -= moveSpeed;
            if ((player.keys["s"] || player.keys["arrowdown"])  && player.y < canvas.height - player.size) player.y += moveSpeed;
            if ((player.keys["a"] || player.keys["arrowleft"])  && player.x > 0)                         player.x -= moveSpeed;
            if ((player.keys["d"] || player.keys["arrowright"]) && player.x < canvas.width  - player.size) player.x += moveSpeed;

            const invincible = Date.now() - lastHitTime < iFrameDuration;
            if (!invincible || Math.floor(Date.now() / 50) % 2 === 0) {
                drawHeart(player.x, player.y, player.size, "#ff0000");
            }
            if (focus) {
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(player.x + player.size / 2, player.y + player.size / 2, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function checkCollision(b) {
            const dx = b.x - (player.x + player.size / 2);
            const dy = b.y - (player.y + player.size / 2);
            return Math.sqrt(dx * dx + dy * dy) < (b.radius || 4) + player.hitbox;
        }

        function handlePatternAftermath(playerDied) {
            if (ended) return;
            ended = true;

            window.removeEventListener("keydown", keyDownHandler);
            window.removeEventListener("keyup",   keyUpHandler);
            window.removeEventListener("resize",  resizeHandler);

            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            bullets = [];
            player = null;
            ctx = null;
            canvas = null;

            if (!playerDied) {
                log(`You survived ${activePattern.name}!`, "var(--unlocked)");
            }

            const sDrain = enemy.san || 0n;
            const mDrain = enemy.manaDrain || 0n;

            if (sDrain > 0n && enemy.name === "Gerald") {
                p.sn = p.sn + sDrain;
                log(`Gerald heals for <span class="hp-warn">${formatNumber(BigInt(-enemy.atk))} HP</span> and <span class="san-warn">${formatNumber(sDrain)} Sanity Restore</span>!`, "var(--enemyATK)");
            } else if (sDrain > 0n && mDrain > 0n) {
                p.sn = BigMath.max(p.sn - sDrain, 0n);
                p.mp = BigMath.max(p.mp - mDrain, 0n);
                log(`${enemy.name}'s attack drained <span class="san-warn">${formatNumber(sDrain)} Sanity</span> and <span class="mana-warn">${formatNumber(mDrain)} Mana</span>!`, "var(--enemyATK)");
            } else if (sDrain > 0n) {
                p.sn = BigMath.max(p.sn - sDrain, 0n);
                log(`${enemy.name}'s attack drained <span class="san-warn">${formatNumber(sDrain)} Sanity</span>!`, "var(--enemyATK)");
            } else if (mDrain > 0n) {
                p.mp = BigMath.max(p.mp - mDrain, 0n);
                log(`${enemy.name}'s attack drained <span class="mana-warn">${formatNumber(mDrain)} Mana</span>!`, "var(--enemyATK)");
            }

            enemy.vulnerable = BigMath.max(enemy.vulnerable - 1n, 0n);
            enemy.resistant  = BigMath.max(enemy.resistant  - 1n, 0n);
            enemy.weakened   = BigMath.max(enemy.weakened   - 1n, 0n);
            enemy.fished     = BigMath.max(enemy.fished     - 1n, 0n);
            enemy.solari     = BigMath.max(enemy.solari     - 1n, 0n);

            updateUI();

            if (p.hp <= 0n) {
                if (currentBossBGM) { currentBossBGM.pause(); currentBossBGM = null; }
                document.body.style.pointerEvents = "none";

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

                if (p.kills >= 1000000n) {
                    setTimeout(() => {
                        document.body.innerHTML = `<div style="color:red; font-family:'Fira Code',monospace; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);">Don't bother coming back.</div>`;
                    }, 3000);
                }
            } else {
                document.body.style.pointerEvents = "auto";
            }
        }

        function loopPattern() {
            if (ended || !ctx || !canvas || !player) return;

            const elapsed = Date.now() - startTime;
            const timeEl = document.getElementById("bullet-hell-time");
            if (timeEl) timeEl.textContent = (elapsed / 1000).toFixed(2);

            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            try {
                activePattern.run.call(activePattern, frame, cx, cy);
            } catch (err) {
                console.error("Pattern error:", activePattern.name, err);
                log(`Pattern Error in ${activePattern.name}: ${err.message}`, "#ff0000");
                handlePatternAftermath(false);
                return;
            }

            for (let i = bullets.length - 1; i >= 0; i--) {
                const b = bullets[i];

                if (typeof b.update === "function") { b.update(); }
                else { b.x += b.vx || 0; b.y += b.vy || 0; }

                if (typeof b.draw === "function") { b.draw(); }
                else {
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, b.radius || 4, 0, Math.PI * 2);
                    ctx.fillStyle = b.color || "#fff";
                    ctx.fill();
                }

                if (b.dead || b.radius <= 0 ||
                    b.x < -1000 || b.x > canvas.width  + 1000 ||
                    b.y < -1000 || b.y > canvas.height + 1000) {
                    bullets.splice(i, 1);
                    continue;
                }

                if (checkCollision(b)) {
                    const now = Date.now();
                    if (p.bulletPatternImmortality === true) {
                        console.log(`Funfriend: Debug Bullet Pattern Immortaility Enabled`)
                    } else if (now - lastHitTime >= iFrameDuration) {
                        lastHitTime = now;
                        let enemyDamage = enemy.atk;
                        enemyDamage = enemy.weakened > 0n ? (enemyDamage / 2n) : enemyDamage;
                        p.hp -= enemyDamage;
                        log(`${enemy.name}'s ${patternDisplayName} hits for <span class="hp-warn">${formatNumber(enemyDamage)} HP</span>!`, "var(--enemyATK)");

                        if (enemy.greedSin) {
                            let roll = BigInt(Math.floor(Math.random() * 500)) * p.totalGold;
                            p.gold = BigMath.max(p.gold - roll, 0n);
                            log(`Greed claims ${formatNumber(roll)}g as its own!`, "var(--gold)");
                            if (Math.random() < 0.01) {
                                LuxLog(`Lux: Lmao`)
                            }
                        }

                        playHurtSFX();
                        updateUI();

                        if (p.hp <= 0n) {
                            handlePatternAftermath(true);
                            return;
                        }
                    }
                }
            }

            updatePlayer();
            frame++;

            if (elapsed >= duration) {
                handlePatternAftermath(false);
                return;
            }

            requestAnimationFrame(loopPattern);
        }

        loopPattern();
        return;
    }

    // --- Fallback: normal attack ---
    let enemyDamage = enemy.atk;
    enemyDamage = enemy.weakened > 0n ? (enemyDamage / 2n) : enemyDamage;
    p.hp -= enemyDamage;

    const sDrain = enemy.san || 0n;
    const mDrain = enemy.manaDrain || 0n;

    if (sDrain > 0n && enemy.name === "Gerald") {
        p.sn = p.sn + sDrain;
        log(`Gerald heals for <span class="hp-warn">${formatNumber(BigInt(-enemy.atk))} HP</span> and <span class="san-warn">${formatNumber(sDrain)} Sanity Restore</span>!`, "var(--enemyATK)");
    } else if (sDrain > 0n && mDrain > 0n) {
        p.sn = BigMath.max(p.sn - sDrain, 0n);
        p.mp = BigMath.max(p.mp - mDrain, 0n);
        log(`${enemy.name} strikes for <span class="hp-warn">${formatNumber(enemyDamage)} HP</span>, <span class="san-warn">${formatNumber(sDrain)} Sanity Drain</span> and <span class="mana-warn">${formatNumber(mDrain)} Mana Drain</span>`, "var(--enemyATK)");
    } else if (sDrain > 0n) {
        p.sn = BigMath.max(p.sn - sDrain, 0n);
        log(`${enemy.name} strikes for <span class="hp-warn">${formatNumber(enemyDamage)} HP</span> and <span class="san-warn">${formatNumber(sDrain)} Sanity Drain</span>!`, "var(--enemyATK)");
    } else if (mDrain > 0n) {
        p.mp = BigMath.max(p.mp - mDrain, 0n);
        log(`${enemy.name} strikes for <span class="hp-warn">${formatNumber(enemyDamage)} HP</span> and <span class="mana-warn">${formatNumber(mDrain)} Mana Drain</span>`, "var(--enemyATK)");
    } else {
        log(`${enemy.name} strikes for <span class="hp-warn">${formatNumber(enemyDamage)} HP</span>.`, "var(--enemyATK)");
    }

    enemy.vulnerable = BigMath.max(enemy.vulnerable - 1n, 0n);
    enemy.resistant  = BigMath.max(enemy.resistant  - 1n, 0n);
    enemy.weakened   = BigMath.max(enemy.weakened   - 1n, 0n);
    enemy.fished     = BigMath.max(enemy.fished     - 1n, 0n);
    enemy.solari     = BigMath.max(enemy.solari     - 1n, 0n);

    playHurtSFX();

    if (p.hp <= 0n) {
        if (currentBossBGM) { currentBossBGM.pause(); currentBossBGM = null; }
        document.body.style.pointerEvents = "none";

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

        if (p.kills >= 1000000n) {
            setTimeout(() => {
                document.body.innerHTML = `<div style="color:red; font-family:'Fira Code',monospace; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);">Don't bother coming back.</div>`;
            }, 3000);
        }
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
            // TODO: MAKE THIS SHIT MORE EFFICIENT WITH BIGINT AND HUGE ASS JUMPS
            // note: I give up D:
            p.mhp += (p.mhp * 20n) / 100n || 1n;
            p.mmp += (p.mmp * 20n) / 100n || 1n;
            p.msn += (p.msn * 20n) / 100n || 1n;
        }
        p.hp = p.mhp; p.mp = p.mmp; p.sn = p.msn;
        if (levelsGained === 1n) {
            log(`Leveled up to LV ${p.lv}! (+${levelsGained} level)`, "var(--unlocked)");
        } else {
            log(`Leveled up to LV ${p.lv}! (+${levelsGained} levels)`, "var(--unlocked)");
        }
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

function getExpToLevel(targetLevel) {
    const target = BigInt(targetLevel);

    const getReq = (lv) => {
        let req = 100n;
        for (let i = 1n; i < lv; i++) req = (req * 120n) / 100n;
        return req;
    };

    let total = 0n;
    for (let lv = p.lv; lv < target; lv++) {
        total += getReq(lv);
    }

    // Subtract the EXP you've already accumulated on the current level bar
    total -= p.exp;

    return total < 0n ? 0n : total;
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
    gemDrop();
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
        p.spares += 1n
        exitEvent();
        updateUI();
        checkLuxSpareLogs();
        const gemChances = {
            // Normal enemies
            "Shadow Imp": 0.05, "Armored Beetle": 0.05, "Stone Golem": 0.07, "Iron Golem": 0.07,
            "Gloom Weaver": 0.07, "Void Stalker": 0.07, "Elf": 0.05, "Drow Elf": 0.05,
            "Blood Bat": 0.05, "Vampire": 0.08, "Vampire Lord": 0.10, "Vampire King": 0.12,
            // Glass Cannons
            "Glass Cannon the I": 0.03, "Glass Cannon the II": 0.03,
            "Glass Cannon the III": 0.03, "Glass Cannon the IV": 0.03, "Glass Cannon the V": 0.03,
            // Elementals
            "Fire Elemental": 0.10, "Air Elemental": 0.10, "Water Elemental": 0.10,
            "Earth Elemental": 0.10, "Ice Elemental": 0.10,
            // Mini-bosses
            "Diamond Golem": 0.15, "Iron-Plated Diamond Golem": 0.15, "Mana Draining Wisp": 0.15,
            // Teachers
            "Miss Circle": 0.20, "Miss Bloomie": 0.20, "Miss Thavel": 0.20,
            // Bosses
            "Obsidian Golem": 0.25, "Duriel": 0.25, "Will o' Wisp": 0.25,
            "Fiery Will O' Wisp": 0.30, "Azmodan": 0.35,
            // World bosses / special
            "The Player's Mirror": 0.40, "Kitsune": 0.75,
            "Gem Golem": 1.0, // Guarenteed gem from Gem Golem (it's made from gems for fucks sake)
            "Lux": 1.0,   // Guaranteed gem from Lux
            "Bob": 1.0,   // Guaranteed gem from Bob
            "Gerald": 0,  // Gerald gives nothing. He's a rock.
        };

        const gemChance = gemChances[enemy.name] ?? 0.10; // Default 10% for anything not listed
        const gemAmt = enemy.name === "Lux" ? 10n :
                    enemy.name === "Bob" ? 5n :
                    enemy.name === "Azmodan" || enemy.name === "The Player's Mirror" ? 3n :
                    ["Miss Circle", "Miss Bloomie", "Miss Thavel", "Fiery Will O' Wisp"].includes(enemy.name) ? 2n : 1n;
        let gemCurrentChance = Math.random()
        if (gemCurrentChance < gemChance) {
            p.gems = (p.gems ?? 0n) + gemAmt;
            if (gemAmt > 1n) {
                log(`Because you spared ${enemy.name}, they gave you ${formatNumber(gemAmt)} gems!`, "var(--epicItem)");
            } else {
                log(`Because you spared ${enemy.name}, they gave you a gem!`, "var(--epicItem)");
            }
        } else if (p.spares % 5n === 0n && gemCurrentChance > gemChance) {
            p.gems = (p.gems ?? 0n) + 1n;
            log(`Because you spared ${enemy.name}, they gave you a gem!`, "var(--epicItem)");
        }
        enemy = null;
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