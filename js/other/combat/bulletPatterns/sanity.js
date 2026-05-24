patternLibrary.push(
    {
        name: "Nightmare Stalk",
        enemy: "Gloom Weaver",
        run: (frame, cx, cy) => {
            // --- Slow creeping web: threads that drift outward unpredictably ---
            if (frame % 25 === 0) {
                const threads = 8;

                for (let i = 0; i < threads; i++) {
                    const angle = (i / threads) * Math.PI * 2;
                    const speed = 0.8 + Math.random() * 0.6;

                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#440066");
                    bullet._tick = 0;
                    bullet._angle = angle;
                    bullet._speed = speed;
                    bullet._baseUpdate = bullet.update.bind(bullet);

                    bullet.update = function () {
                        this._tick++;

                        // Slowly drift direction — like a web thread caught in wind
                        this._angle += (Math.random() - 0.5) * 0.06;
                        this.vx = Math.cos(this._angle) * this._speed;
                        this.vy = Math.sin(this._angle) * this._speed;

                        this._baseUpdate();

                        // Deep purple to very dark purple, but never full black
                        const t = Math.min(this._tick / 180, 1);
                        const r = Math.round(0x44 + (0x18 - 0x44) * t);
                        const g = 0x00;
                        const b = Math.round(0x66 + (0x28 - 0x66) * t);

                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };

                    bullets.push(bullet);
                }
            }

            // --- Nightmare pulse: sudden ring that expands then fades to dark violet ---
            if (frame % 150 === 0) {
                const ringCount = 16;

                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 2;

                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#9900cc");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);

                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();

                        const t = Math.min(this._tick / 120, 1);
                        const r = Math.round(0x99 + (0x22 - 0x99) * t);
                        const g = 0x00;
                        const b = Math.round(0xcc + (0x44 - 0xcc) * t);

                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };

                    bullets.push(bullet);
                }
            }

            // --- Sanity threads: slow diagonal drifters from corners ---
            if (frame % 60 === 0) {
                const corners = [
                    { x: 0, y: 0, vx: 1.5, vy: 1.5 },
                    { x: cx * 2, y: 0, vx: -1.5, vy: 1.5 },
                    { x: 0, y: cy * 2, vx: 1.5, vy: -1.5 },
                    { x: cx * 2, y: cy * 2, vx: -1.5, vy: -1.5 },
                ];

                for (const corner of corners) {
                    const bullet = new Bullet(corner.x, corner.y, corner.vx, corner.vy, "#660099");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);

                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();

                        const t = Math.min(this._tick / 150, 1);
                        const r = Math.round(0x66 + (0x20 - 0x66) * t);
                        const g = 0x00;
                        const b = Math.round(0x99 + (0x40 - 0x99) * t);

                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };

                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Void Strike",
        enemy: "Void Stalker",
        run: (frame, cx, cy) => {
            // --- Stalking void tendrils: spawns from edges and homes loosely inward ---
            if (frame % 20 === 0) {
                const side = Math.floor(Math.random() * 4);
                let spawnX, spawnY, vx, vy;

                switch (side) {
                    case 0:
                        spawnX = Math.random() * cx * 2;
                        spawnY = -50;
                        vx = (Math.random() - 0.5) * 1;
                        vy = 2 + Math.random();
                        break;
                    case 1:
                        spawnX = Math.random() * cx * 2;
                        spawnY = cy * 2 + 50;
                        vx = (Math.random() - 0.5) * 1;
                        vy = -(2 + Math.random());
                        break;
                    case 2:
                        spawnX = -50;
                        spawnY = Math.random() * cy * 2;
                        vx = 2 + Math.random();
                        vy = (Math.random() - 0.5) * 1;
                        break;
                    case 3:
                        spawnX = cx * 2 + 50;
                        spawnY = Math.random() * cy * 2;
                        vx = -(2 + Math.random());
                        vy = (Math.random() - 0.5) * 1;
                        break;
                }

                const bullet = new Bullet(spawnX, spawnY, vx, vy, "#000033");
                bullet._tick = 0;
                bullet._vx = vx;
                bullet._vy = vy;
                bullet._baseUpdate = bullet.update.bind(bullet);

                bullet.update = function () {
                    this._tick++;

                    // Slowly drift toward center — it's stalking you
                    const dxToCenter = cx - this.x;
                    const dyToCenter = cy - this.y;
                    const dist = Math.sqrt(dxToCenter * dxToCenter + dyToCenter * dyToCenter) || 1;

                    this.vx += (dxToCenter / dist) * 0.04;
                    this.vy += (dyToCenter / dist) * 0.04;

                    this._baseUpdate();

                    // Dark navy to darker indigo, but never invisible
                    const t = Math.min(this._tick / 150, 1);
                    const r = 10;
                    const g = 0;
                    const b = Math.round(0x55 + (0x28 - 0x55) * t);

                    this.color = `rgb(${r}, ${g}, ${b})`;
                };

                bullets.push(bullet);
            }

            // --- Void collapse: ring that spawns far out and slowly closes in ---
            if (frame % 180 === 0) {
                const ringCount = 18;

                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const spawnDist = 220;
                    const spawnX = cx + Math.cos(angle) * spawnDist;
                    const spawnY = cy + Math.sin(angle) * spawnDist;
                    const speed = 1.2;

                    const bullet = new Bullet(
                        spawnX,
                        spawnY,
                        -Math.cos(angle) * speed,
                        -Math.sin(angle) * speed,
                        "#110022"
                    );

                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);

                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();

                        // Flickers, but with a visible minimum
                        const flicker = Math.sin(this._tick * 0.15) * 0.5 + 0.5;
                        const r = Math.round(18 + 18 * flicker);
                        const g = 0;
                        const b = Math.round(50 + 45 * flicker);

                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };

                    bullets.push(bullet);
                }
            }

            // --- Lux reference: single fast dark bullet fired every so often ---
            // "Lux stalks us all" — a reminder that something worse is out there
            if (frame % 200 === 0) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 5;

                const bullet = new Bullet(
                    cx,
                    cy,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    "#1a0033"
                );

                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);

                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();

                    const flicker = Math.sin(this._tick * 0.3) * 0.5 + 0.5;
                    const r = Math.round(16 + 18 * flicker);
                    const g = 0;
                    const b = Math.round(52 + 36 * flicker);

                    this.color = `rgb(${r}, ${g}, ${b})`;
                };

                bullets.push(bullet);
            }
        }
    },
    {
        name: "Waking Terror",
        enemy: "Nightmare Shade",
        run: (frame, cx, cy) => {
            // --- Erratic bursts that appear suddenly from darkness ---
            if (frame % 8 === 0) {
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 2 + Math.random() * 3;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#4a0080"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        // Randomly jerk direction — nightmarish unpredictability
                        if (this._tick % 20 === 0) {
                            const jerk = (Math.random() - 0.5) * 2;
                            this.vx += jerk;
                            this.vy += jerk;
                        }
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        const r = Math.round(0x4a + 0x80 * t);
                        const b = Math.round(0x80 + 0x7f * (1 - t));
                        this.color = `rgb(${r}, 0, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Creeping tendrils from the edges ---
            if (frame % 30 === 0) {
                const side = Math.floor(frame / 30) % 4;
                const count = 5;
                for (let i = 0; i < count; i++) {
                    let x, y, vx, vy;
                    const speed = 1.5 + Math.random();
                    if (side === 0) { x = (cx * 2 / count) * i; y = -50; vx = 0; vy = speed; }
                    else if (side === 1) { x = cx * 2 + 50; y = (cy * 2 / count) * i; vx = -speed; vy = 0; }
                    else if (side === 2) { x = (cx * 2 / count) * i; y = cy * 2 + 50; vx = 0; vy = -speed; }
                    else { x = -50; y = (cy * 2 / count) * i; vx = speed; vy = 0; }

                    const bullet = new Bullet(x, y, vx, vy, "#6600aa");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.1;
                        this.vy += (Math.random() - 0.5) * 0.1;
                        this._baseUpdate();
                    };
                    bullets.push(bullet);
                }
            }

            // --- Sudden scream burst every 140 frames ---
            if (frame % 140 === 0) {
                const count = 16;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 4;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#cc00ff"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 60, 1);
                        this.color = `rgb(${Math.round(0xcc * (1 - t))}, 0, ${Math.round(0xff - 0x80 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    // -----------------------------------------------------------------------
    // Nightmare Shade — Pattern 2: Shadow Fracture
    // -----------------------------------------------------------------------
    {
        name: "Shadow Fracture",
        enemy: "Nightmare Shade",
        run: (frame, cx, cy) => {
            // --- Slow oscillating spiral that suddenly accelerates ---
            if (frame % 6 === 0) {
                const speed = 1 + (Math.sin(frame * 0.04) + 1) / 2 * 5;
                const arms = 3;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.03) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#550099"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        this.color = `rgb(${Math.round(0x55 + 0xaa * t)}, 0, ${Math.round(0x99 + 0x66 * (1 - t))})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Fracture lines: pairs of bullets shooting opposite directions ---
            if (frame % 50 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 3;
                    // Outward
                    bullets.push(new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#9900cc"
                    ));
                    // Inward from edge
                    const dist = 250;
                    bullets.push(new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * speed,
                        -Math.sin(angle) * speed,
                        "#6600aa"
                    ));
                }
            }
        }
    },

    // -----------------------------------------------------------------------
    // Nightmare Shade — Pattern 3: Mind Unravel
    // -----------------------------------------------------------------------
    {
        name: "Mind Unravel",
        enemy: "Nightmare Shade",
        run: (frame, cx, cy) => {
            // --- Dense chaotic spray that gets worse over time ---
            if (frame % 5 === 0) {
                const chaos = Math.min(frame / 300, 1);
                const count = Math.floor(3 + chaos * 7);
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 1 + Math.random() * (2 + chaos * 4);
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#7700bb"
                    );
                    bullet._tick = 0;
                    bullet._chaos = chaos;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.3 * (1 + this._chaos);
                        this.vy += (Math.random() - 0.5) * 0.3 * (1 + this._chaos);
                        this._baseUpdate();
                    };
                    bullets.push(bullet);
                }
            }

            // --- Ring that collapses inward every 120 frames ---
            if (frame % 120 === 0) {
                const count = 20;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 200;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2.5,
                        -Math.sin(angle) * 2.5,
                        "#cc00ff"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },

    // -----------------------------------------------------------------------
    // Dread Phantom — Pattern 1: Hollow Gaze
    // -----------------------------------------------------------------------
    {
        name: "Hollow Gaze",
        enemy: "Dread Phantom",
        run: (frame, cx, cy) => {
            // --- Slow sweeping beam of phantom energy ---
            if (frame % 3 === 0) {
                const beamAngle = frame * 0.02;
                const speed = 3;
                const bullet = new Bullet(cx, cy,
                    Math.cos(beamAngle) * speed,
                    Math.sin(beamAngle) * speed,
                    "#003366"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 100, 1);
                    const b = Math.round(0x66 + 0x99 * t);
                    this.color = `rgb(0, ${Math.round(0x33 * t)}, ${b})`;
                };
                bullets.push(bullet);
            }

            // --- Phantom wisps that drift inward from all sides ---
            if (frame % 20 === 0) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 280;
                const speed = 1 + Math.random() * 1.5;
                const bullet = new Bullet(
                    cx + Math.cos(angle) * dist,
                    cy + Math.sin(angle) * dist,
                    -Math.cos(angle) * speed,
                    -Math.sin(angle) * speed,
                    "#0044aa"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this.vx += (Math.random() - 0.5) * 0.08;
                    this.vy += (Math.random() - 0.5) * 0.08;
                    this._baseUpdate();
                };
                bullets.push(bullet);
            }

            // --- Void pulse every 100 frames ---
            if (frame % 100 === 0) {
                const count = 18;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2.5;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#0055cc"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 80, 1);
                        this.color = `rgb(0, ${Math.round(0x55 * t)}, ${Math.round(0xcc - 0x66 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    // -----------------------------------------------------------------------
    // Dread Phantom — Pattern 2: Mana Siphon
    // -----------------------------------------------------------------------
    {
        name: "Mana Siphon",
        enemy: "Dread Phantom",
        run: (frame, cx, cy) => {
            // --- Spiraling mana drain tendrils ---
            if (frame % 4 === 0) {
                const speed = 1 + (Math.sin(frame * 0.06) + 1) / 2 * 4;
                const arms = 5;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.035) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#0033aa"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        const r = Math.round(0x44 * t);
                        const g = Math.round(0x33 * t);
                        const b = Math.round(0xaa + 0x55 * (1 - t));
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Counter spiral ---
            if (frame > 100 && frame % 4 === 2) {
                const speed = 1 + (Math.sin(frame * 0.06) + 1) / 2 * 3;
                const arms = 5;
                for (let i = 0; i < arms; i++) {
                    const angle = -(frame * 0.035) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#0055ff"
                    );
                    bullets.push(bullet);
                }
            }

            // --- Siphon ring: pulls inward from distance ---
            if (frame % 130 === 0) {
                const count = 22;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 260;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#0066ff"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },

    // -----------------------------------------------------------------------
    // Dread Phantom — Pattern 3: Phantom Veil
    // -----------------------------------------------------------------------
    {
        name: "Phantom Veil",
        enemy: "Dread Phantom",
        run: (frame, cx, cy) => {
            // --- Dense slow curtain from above that drifts ---
            if (frame % 3 === 0) {
                const xPos = Math.random() * cx * 2;
                const speed = 1 + Math.random() * 1.5;
                const bullet = new Bullet(xPos, -50,
                    (Math.random() - 0.5) * 0.5,
                    speed,
                    "#002288"
                );
                bullet.radius = 4 + Math.random() * 2;
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this.vx += (Math.random() - 0.5) * 0.05;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 150, 1);
                    const b = Math.round(0x88 + 0x77 * t);
                    this.color = `rgb(0, ${Math.round(0x22 * t)}, ${b})`;
                };
                bullets.push(bullet);
            }

            // --- Phantom cross that rotates slowly ---
            if (frame % 5 === 0) {
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.015) + (i * (Math.PI / 2));
                    const speed = 2;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#0044cc"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        this.color = `rgb(0, ${Math.round(0x44 * t)}, ${Math.round(0xcc - 0x44 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    // -----------------------------------------------------------------------
    // Abyssal Watcher — Pattern 1: The Stare
    // -----------------------------------------------------------------------
    {
        name: "The Stare",
        enemy: "Abyssal Watcher",
        run: (frame, cx, cy) => {
            // --- Slow methodical rotating ring — it watches, it waits ---
            if (frame % 6 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const angle = (frame * 0.015) + (i * (Math.PI * 2 / count));
                    const speed = 1.5;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#110022"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 200, 1);
                        const r = Math.round(0x11 + 0xcc * t);
                        const b = Math.round(0x22 + 0xdd * t);
                        this.color = `rgb(${r}, 0, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Abyss tendrils: slow inward spiral from all edges ---
            if (frame % 15 === 0) {
                const angle = (frame * 0.1) % (Math.PI * 2);
                const dist = 300;
                const speed = 1.2;
                const bullet = new Bullet(
                    cx + Math.cos(angle) * dist,
                    cy + Math.sin(angle) * dist,
                    -Math.cos(angle) * speed,
                    -Math.sin(angle) * speed,
                    "#220044"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this.vx += (Math.random() - 0.5) * 0.06;
                    this.vy += (Math.random() - 0.5) * 0.06;
                    this._baseUpdate();
                };
                bullets.push(bullet);
            }

            // --- Eye of the abyss: massive sudden burst every 160 frames ---
            if (frame % 160 === 0) {
                const count = 30;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 3;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#6600cc"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        this.color = `rgb(${Math.round(0x66 + 0x99 * t)}, 0, ${Math.round(0xcc - 0x44 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    // -----------------------------------------------------------------------
    // Abyssal Watcher — Pattern 2: Void Convergence
    // -----------------------------------------------------------------------
    {
        name: "Void Convergence",
        enemy: "Abyssal Watcher",
        run: (frame, cx, cy) => {
            // --- Multiple closing rings at different speeds ---
            if (frame % 180 === 0) {
                [200, 260, 320].forEach((dist, ri) => {
                    const count = 16 + ri * 4;
                    for (let i = 0; i < count; i++) {
                        const angle = (i / count) * Math.PI * 2;
                        const speed = 1.5 + ri * 0.5;
                        const bullet = new Bullet(
                            cx + Math.cos(angle) * dist,
                            cy + Math.sin(angle) * dist,
                            -Math.cos(angle) * speed,
                            -Math.sin(angle) * speed,
                            `hsl(${270 + ri * 20}, 100%, ${20 + ri * 10}%)`
                        );
                        bullets.push(bullet);
                    }
                });
            }

            // --- Slow oscillating dual spiral ---
            if (frame % 5 === 0) {
                const speed = 1 + (Math.sin(frame * 0.03) + 1) / 2 * 3;
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.02) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#330066"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        this.color = `rgb(${Math.round(0x33 + 0xcc * t)}, 0, ${Math.round(0x66 + 0x99 * (1 - t))})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Counter spiral after frame 120 ---
            if (frame > 120 && frame % 5 === 2) {
                const speed = 1 + (Math.sin(frame * 0.03) + 1) / 2 * 2.5;
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = -(frame * 0.02) + (i * (Math.PI * 2 / arms));
                    bullets.push(new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#550088"
                    ));
                }
            }
        }
    },

    // -----------------------------------------------------------------------
    // Abyssal Watcher — Pattern 3: Since The Beginning
    // -----------------------------------------------------------------------
    {
        name: "Since The Beginning",
        enemy: "Abyssal Watcher",
        run: (frame, cx, cy) => {
            // --- Dense slow rain from above that gets heavier over time ---
            if (frame % 2 === 0) {
                const density = Math.min(frame / 200, 1);
                if (Math.random() < 0.4 + density * 0.6) {
                    const xPos = Math.random() * cx * 2;
                    const speed = 1 + Math.random() * (1.5 + density * 2);
                    const bullet = new Bullet(xPos, -50,
                        (Math.random() - 0.5) * 0.3,
                        speed,
                        "#110033"
                    );
                    bullet.radius = 3 + Math.random() * 3;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 180, 1);
                        const r = Math.round(0x11 + 0xbb * t);
                        const b = Math.round(0x33 + 0xcc * t);
                        this.color = `rgb(${r}, 0, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Slow rotating 8-pointed star ---
            if (frame % 7 === 0) {
                const points = 8;
                for (let i = 0; i < points; i++) {
                    const angle = (frame * 0.01) + (i * (Math.PI * 2 / points));
                    const speed = 1.8;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#440088"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        this.color = `rgb(${Math.round(0x44 + 0xbb * t)}, 0, ${Math.round(0x88 + 0x77 * (1 - t))})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- The abyss opens: massive converging ring at frame 80 and 240 ---
            if (frame === 80 || frame === 240) {
                const count = 36;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 320;
                    const speed = 2.5;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * speed,
                        -Math.sin(angle) * speed,
                        "#9900ff"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        this.color = `rgb(${Math.round(0x99 + 0x66 * t)}, 0, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    
)