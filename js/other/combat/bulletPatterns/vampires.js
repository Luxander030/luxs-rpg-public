patternLibrary.push(
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
)