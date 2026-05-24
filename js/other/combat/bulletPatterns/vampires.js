patternLibrary.push(
    
    /*
    ###########################################################################################
    ##############################################################################################
    Blood Bat                                                                                  ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        name: "Swoop",
        enemy: "Blood Bat",
        run: (frame, cx, cy) => {
            // --- Erratic swooping dives from above ---
            if (frame % 5 === 0) {
                const xPos = Math.random() * cx * 2;
                const angle = (Math.PI / 2) + (Math.random() - 0.5) * 0.8; // mostly downward with wobble
                const speed = 3 + Math.random() * 2;
                const bullet = new Bullet(xPos, -50,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    "#cc0022"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    // Slight erratic wobble — bats don't fly straight
                    this.vx += (Math.random() - 0.5) * 0.2;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 120, 1);
                    const r = Math.round(0xcc);
                    const g = Math.round(0x00 + 0x11 * t);
                    const b = Math.round(0x22 + 0x11 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
        }
    },
    {
        name: "Echo Flutter",
        enemy: "Blood Bat",
        run: (frame, cx, cy) => {
            // --- Paired mirror swoops from both sides ---
            if (frame % 6 === 0) {
                const yPos = Math.random() * cy * 1.5;
                const speed = 3 + Math.random() * 2;

                // Left to right
                const b1 = new Bullet(-50, yPos, speed, (Math.random() - 0.5) * 1.5, "#cc0022");
                b1._tick = 0;
                b1._baseUpdate = b1.update.bind(b1);
                b1.update = function () {
                    this._tick++;
                    this.vy += (Math.random() - 0.5) * 0.15;
                    this._baseUpdate();
                };
                bullets.push(b1);

                // Right to left
                const b2 = new Bullet(cx * 2 + 50, yPos, -speed, (Math.random() - 0.5) * 1.5, "#aa0011");
                b2._tick = 0;
                b2._baseUpdate = b2.update.bind(b2);
                b2.update = function () {
                    this._tick++;
                    this.vy += (Math.random() - 0.5) * 0.15;
                    this._baseUpdate();
                };
                bullets.push(b2);
            }

            // --- Burst of bats from center every 90 frames ---
            if (frame % 90 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2 + Math.random() * 1.5;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#cc0022"
                    );
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
        }
    },
    {
        name: "Frenzy Dive",
        enemy: "Blood Bat",
        run: (frame, cx, cy) => {
            // --- Dense rain of fast erratic bullets from above ---
            if (frame % 3 === 0) {
                const xPos = Math.random() * cx * 2;
                const speed = 4 + Math.random() * 3;
                const angle = (Math.PI / 2) + (Math.random() - 0.5) * 1.2;
                const bullet = new Bullet(xPos, -50,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    "#ff0033"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    // Increasingly erratic as time goes on
                    const chaos = Math.min(this._tick / 60, 1);
                    this.vx += (Math.random() - 0.5) * 0.4 * chaos;
                    this._baseUpdate();
                };
                bullets.push(bullet);
            }

            // --- Targeted dive every 80 frames aimed near player area ---
            if (frame % 80 === 0) {
                const count = 3;
                for (let i = 0; i < count; i++) {
                    const xPos = cx + (i - 1) * 40;
                    const speed = 5;
                    const bullet = new Bullet(xPos, -50, 0, speed, "#880011");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.3;
                        this._baseUpdate();
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Vampire                                                                                    ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        name: "Vampiric Bite",
        enemy: "Vampire",
        run: (frame, cx, cy) => {
            // --- Hypnotic slow spiral — drawing you in ---
            if (frame % 4 === 0) {
                const arms = 3;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.025) + (i * (Math.PI * 2 / arms));
                    const speed = 1.8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#880022");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        // Deep crimson to near black — like blood drying
                        const r = Math.round(0x88 + 0x44 * (1 - t));
                        const g = 0x00;
                        const b = Math.round(0x22 - 0x22 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Blood drain: inward closing ring ---
            if (frame % 140 === 0) {
                const ringCount = 14;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const spawnDist = 170;
                    const spawnX = cx + Math.cos(angle) * spawnDist;
                    const spawnY = cy + Math.sin(angle) * spawnDist;
                    const bullet = new Bullet(spawnX, spawnY,
                        -Math.cos(angle) * 1.5,
                        -Math.sin(angle) * 1.5,
                        "#cc0033"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Crimson Waltz",
        enemy: "Vampire",
        run: (frame, cx, cy) => {
            // --- Elegant figure-8 pattern of blood droplets ---
            if (frame % 5 === 0) {
                const t = frame * 0.04;
                const offsetX = Math.sin(t) * 120;
                const offsetY = Math.sin(t * 2) * 60;
                const spawnX = cx + offsetX;
                const spawnY = cy + offsetY;

                const count = 4;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2 + t;
                    const speed = 1.5;
                    const bullet = new Bullet(spawnX, spawnY,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#990022"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const fade = Math.min(this._tick / 100, 1);
                        const r = Math.round(0x99 + 0x44 * (1 - fade));
                        this.color = `rgb(${r}, 0, ${Math.round(0x22 * (1 - fade))})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Closing ring of blood every 110 frames ---
            if (frame % 110 === 0) {
                const count = 18;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 220;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#cc0033"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Bloodmist",
        enemy: "Vampire",
        run: (frame, cx, cy) => {
            // --- Dense slow-moving mist of blood droplets ---
            if (frame % 4 === 0) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 250 + Math.random() * 50;
                const spawnX = cx + Math.cos(angle) * dist;
                const spawnY = cy + Math.sin(angle) * dist;
                const speed = 0.8 + Math.random() * 0.6;

                const bullet = new Bullet(spawnX, spawnY,
                    -Math.cos(angle) * speed,
                    -Math.sin(angle) * speed,
                    "#770011"
                );
                bullet.radius = 5 + Math.random() * 3;
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    // Drift slightly
                    this.vx += (Math.random() - 0.5) * 0.05;
                    this.vy += (Math.random() - 0.5) * 0.05;
                    this._baseUpdate();
                };
                bullets.push(bullet);
            }

            // --- Sudden fast burst every 130 frames ---
            if (frame % 130 === 0) {
                const count = 12;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 3.5;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff0044"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 80, 1);
                        this.color = `rgb(${Math.round(0xff - 0x88 * t)}, 0, ${Math.round(0x44 - 0x44 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Vampire Lord                                                                               ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        name: "Drain",
        enemy: "Vampire Lord",
        run: (frame, cx, cy) => {
            // --- Faster more aggressive spiral ---
            if (frame % 3 === 0) {
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.04) + (i * (Math.PI * 2 / arms));
                    const speed = 2.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aa0033");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        const r = Math.round(0xaa + 0x55 * (1 - t));
                        const g = 0x00;
                        const b = Math.round(0x33 - 0x33 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Bat swarm: erratic cluster from above ---
            if (frame % 50 === 0) {
                const count = 5;
                for (let i = 0; i < count; i++) {
                    const xPos = cx + (Math.random() - 0.5) * cx * 1.5;
                    const speed = 3 + Math.random() * 2;
                    const angle = (Math.PI / 2) + (Math.random() - 0.5) * 0.6;
                    const bullet = new Bullet(xPos, -50,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#880022"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.2;
                        this._baseUpdate();
                    };
                    bullets.push(bullet);
                }
            }

            // --- Blood nova: large burst ring ---
            if (frame % 120 === 0) {
                const count = 22;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff0033");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = 0xff;
                        const g = 0x00;
                        const b = Math.round(0x33 - 0x33 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Lord's Embrace",
        enemy: "Vampire Lord",
        run: (frame, cx, cy) => {
            // --- Two closing rings that alternate ---
            if (frame % 120 === 0) {
                const count = 20;
                const dist = frame % 240 === 0 ? 280 : 180;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#cc0044"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        this.color = `rgb(${Math.round(0xcc + 0x33 * t)}, 0, ${Math.round(0x44 - 0x44 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Rotating cross of blood bolts ---
            if (frame % 5 === 0) {
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.03) + (i * (Math.PI / 2));
                    const speed = 2.2;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#aa0033"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        this.color = `rgb(${Math.round(0xaa + 0x55 * (1 - t))}, 0, 0)`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Bat swarm from sides ---
            if (frame % 60 === 0) {
                const count = 4;
                for (let i = 0; i < count; i++) {
                    const fromLeft = i % 2 === 0;
                    const yPos = (cy * 0.3) + (i * cy * 0.4);
                    const speed = 3 + Math.random() * 1.5;
                    const bullet = new Bullet(
                        fromLeft ? -50 : cx * 2 + 50,
                        yPos,
                        fromLeft ? speed : -speed,
                        (Math.random() - 0.5) * 1.5,
                        "#880022"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vy += (Math.random() - 0.5) * 0.2;
                        this._baseUpdate();
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Blood Tide",
        enemy: "Vampire Lord",
        run: (frame, cx, cy) => {
            // --- Waves of bullets sweeping left to right ---
            if (frame % 4 === 0) {
                const wave = Math.sin(frame * 0.05) * cy * 0.6;
                const yPos = cy + wave;
                const speed = 3;
                const bullet = new Bullet(-50, yPos, speed, Math.sin(frame * 0.08) * 1.5, "#cc0033");
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 100, 1);
                    this.color = `rgb(${Math.round(0xcc + 0x33 * (1 - t))}, 0, ${Math.round(0x33 * (1 - t))})`;
                };
                bullets.push(bullet);
            }

            // --- Counter wave right to left ---
            if (frame % 4 === 2) {
                const wave = Math.sin(frame * 0.05 + Math.PI) * cy * 0.6;
                const yPos = cy + wave;
                const speed = 3;
                const bullet = new Bullet(cx * 2 + 50, yPos, -speed, Math.sin(frame * 0.08) * 1.5, "#aa0022");
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                };
                bullets.push(bullet);
            }

            // --- Blood geyser from below every 90 frames ---
            if (frame % 90 === 0) {
                const count = 10;
                for (let i = 0; i < count; i++) {
                    const xPos = (cx * 2 / count) * i;
                    const speed = 4 + Math.random() * 2;
                    const bullet = new Bullet(xPos, cy * 2 + 50, 0, -speed, "#ff0033");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.2;
                        this._baseUpdate();
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    /*
    ###########################################################################################
    ##############################################################################################
    Vampire King                                                                               ######
    ##############################################################################################
    ###########################################################################################
    */

    {
        name: "Call all Units",
        enemy: "Vampire King",
        run: (frame, cx, cy) => {
            // --- Royal blood spiral: dual counter-rotating spirals ---
            if (frame % 8 === 0) { // was every 2 frames
                const arms = 3; // was 5
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.035) + (i * (Math.PI * 2 / arms));
                    const speed = 2.8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff0044");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        const r = 0xff;
                        const g = Math.round(0x00 + 0x22 * t);
                        const b = Math.round(0x44 - 0x44 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            if (frame > 150 && frame % 8 === 0) { // was every 2 frames
                const arms = 3; // was 5
                for (let i = 0; i < arms; i++) {
                    const angle = -(frame * 0.035) + (i * (Math.PI * 2 / arms));
                    const speed = 2.8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#cc0033");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        const r = Math.round(0xcc + 0x33 * t);
                        const g = 0x00;
                        const b = Math.round(0x33 - 0x33 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Massive bat swarm ---
            if (frame % 40 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const xPos = Math.random() * cx * 2;
                    const speed = 3.5 + Math.random() * 2.5;
                    const angle = (Math.PI / 2) + (Math.random() - 0.5) * 1.0;
                    const bullet = new Bullet(xPos, -50,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#660011"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.3;
                        this._baseUpdate();
                    };
                    bullets.push(bullet);
                }
            }

            // --- Crown of blood: rotating 8-pointed burst ---
            if (frame % 100 === 0) {
                const points = 8;
                for (let i = 0; i < points; i++) {
                    const baseAngle = (i / points) * Math.PI * 2 + (frame * 0.01);
                    const count = 5;
                    for (let j = 0; j < count; j++) {
                        const spread = (j - 2) * 0.1;
                        const speed = 2 + j * 0.6;
                        const bullet = new Bullet(cx, cy,
                            Math.cos(baseAngle + spread) * speed,
                            Math.sin(baseAngle + spread) * speed,
                            "#ff0044"
                        );
                        bullets.push(bullet);
                    }
                }
            }
        }
    },
    {
        name: "Royal Decree",
        enemy: "Vampire King",
        run: (frame, cx, cy) => {
            // --- Expanding and contracting rings alternating ---
            if (frame % 150 === 0) {
                const count = 24;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff0044"
                    );
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        this.color = `rgb(255, ${Math.round(0x22 * t)}, ${Math.round(0x44 - 0x44 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }

            if (frame % 150 === 75) {
                const count = 24;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 280;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#cc0033"
                    );
                    bullets.push(bullet);
                }
            }

            // --- Rotating 6-arm spiral ---
            if (frame % 4 === 0) {
                const arms = 6;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.03) + (i * (Math.PI * 2 / arms));
                    const speed = 2.5;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff0055"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 80, 1);
                        this.color = `rgb(255, 0, ${Math.round(0x55 - 0x55 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Massive bat swarm from all directions ---
            if (frame % 70 === 0) {
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const side = Math.floor(Math.random() * 4);
                    let x, y, vx, vy;
                    const speed = 4 + Math.random() * 2;
                    if (side === 0) { x = Math.random() * cx * 2; y = -50; vx = (Math.random() - 0.5); vy = speed; }
                    else if (side === 1) { x = cx * 2 + 50; y = Math.random() * cy * 2; vx = -speed; vy = (Math.random() - 0.5); }
                    else if (side === 2) { x = Math.random() * cx * 2; y = cy * 2 + 50; vx = (Math.random() - 0.5); vy = -speed; }
                    else { x = -50; y = Math.random() * cy * 2; vx = speed; vy = (Math.random() - 0.5); }

                    const bullet = new Bullet(x, y, vx, vy, "#660011");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.3;
                        this.vy += (Math.random() - 0.5) * 0.3;
                        this._baseUpdate();
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Eternal Night",
        enemy: "Vampire King",
        run: (frame, cx, cy) => {
            // --- Slow dense curtain of blood from above ---
            if (frame % 2 === 0) {
                const xPos = Math.random() * cx * 2;
                const speed = 1.5 + Math.random() * 1;
                const bullet = new Bullet(xPos, -50, (Math.random() - 0.5) * 0.5, speed, "#880022");
                bullet.radius = 4 + Math.random() * 3;
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 150, 1);
                    this.color = `rgb(${Math.round(0x88 + 0x77 * t)}, 0, ${Math.round(0x22 * (1 - t))})`;
                };
                bullets.push(bullet);
            }

            // --- Rotating double ring that expands then collapses ---
            if (frame % 200 === 0) {
                const count = 16;
                for (let ring = 0; ring < 2; ring++) {
                    for (let i = 0; i < count; i++) {
                        const angle = (i / count) * Math.PI * 2 + (ring * Math.PI / count);
                        const speed = ring === 0 ? 2 : 1.5;
                        const bullet = new Bullet(cx, cy,
                            Math.cos(angle) * speed,
                            Math.sin(angle) * speed,
                            ring === 0 ? "#ff0044" : "#cc0033"
                        );
                        bullet._originX = cx;
                        bullet._originY = cy;
                        bullet._tick = 0;
                        bullet._maxDist = 180 + ring * 40;
                        bullet._returning = false;
                        bullet._baseUpdate = bullet.update.bind(bullet);
                        bullet.update = function () {
                            this._tick++;
                            const dx = this.x - this._originX;
                            const dy = this.y - this._originY;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (!this._returning && dist >= this._maxDist) {
                                this._returning = true;
                                this.vx = -Math.cos(Math.atan2(dy, dx)) * 2;
                                this.vy = -Math.sin(Math.atan2(dy, dx)) * 2;
                            }
                            if (this._returning && dist < 10) {
                                this.dead = true;
                            }
                            this._baseUpdate();
                        };
                        bullets.push(bullet);
                    }
                }
            }

            // --- Throne of blood: 8 streams from corners ---
            if (frame === 100) {
                const corners = [
                    [-50, -50], [cx * 2 + 50, -50],
                    [-50, cy * 2 + 50], [cx * 2 + 50, cy * 2 + 50]
                ];
                corners.forEach(([sx, sy]) => {
                    const angle = Math.atan2(cy - sy, cx - sx);
                    const count = 5;
                    for (let i = 0; i < count; i++) {
                        const spread = (i - 2) * 0.12;
                        const speed = 2.5 + i * 0.3;
                        const bullet = new Bullet(sx, sy,
                            Math.cos(angle + spread) * speed,
                            Math.sin(angle + spread) * speed,
                            "#ff0033"
                        );
                        bullets.push(bullet);
                    }
                });
            }
        }
    },
)