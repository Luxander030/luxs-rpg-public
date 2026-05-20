patternLibrary.push(
    {
        name: "Flaming Spire",
        enemy: "Fire Elemental",
        run: (frame, cx, cy) => {
            // --- Flickering flame spiral ---
            if (frame % 3 === 0) {
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.05) + (i * (Math.PI * 2 / arms));
                    const speed = 2 + Math.random() * 1.5; // random = flickering
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff4400");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const flicker = Math.sin(this._tick * 0.4) * 0.5 + 0.5;
                        const r = 0xff;
                        const g = Math.round(0x44 + 0xbb * flicker);
                        const b = 0x00;
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Ember burst ---
            if (frame % 80 === 0) {
                const count = 20;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 0.5 + Math.random() * 3.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff6600");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        // Bright orange cools to dim red like dying embers
                        const r = 0xff;
                        const g = Math.round(0x66 - 0x66 * t);
                        const b = 0x00;
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Eruption: fast columns of fire from below ---
            if (frame % 110 === 0) {
                const cols = 4;
                for (let c = 0; c < cols; c++) {
                    const xPos = (cx * 2 / (cols + 1)) * (c + 1);
                    const speed = 6;
                    const bullet = new Bullet(xPos, cy * 2 + 50, 0, -speed, "#ff2200");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const flicker = Math.sin(this._tick * 0.5) * 0.5 + 0.5;
                        const r = 0xff;
                        const g = Math.round(0x22 + 0xcc * flicker);
                        const b = 0x00;
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Whirlwind",
        enemy: "Air Elemental",
        run: (frame, cx, cy) => {
            // --- Whirlwind: fast thin spiral that changes direction ---
            if (frame % 2 === 0) {
                const arms = 3;
                const dir = Math.floor(frame / 300) % 2 === 0 ? 1 : -1; // reverses direction
                for (let i = 0; i < arms; i++) {
                    const angle = dir * (frame * 0.06) + (i * (Math.PI * 2 / arms));
                    const speed = 3.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ccffff");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        // Pale sky blue fading to near-invisible white — air is hard to see
                        const t = Math.min(this._tick / 100, 1);
                        const r = Math.round(0xcc + 0x33 * t);
                        const g = Math.round(0xff);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Gust: horizontal sweeps across the screen ---
            if (frame % 100 === 0) {
                const rows = 3;
                for (let r = 0; r < rows; r++) {
                    const yPos = (cy * 2 / (rows + 1)) * (r + 1);
                    const dir = r % 2 === 0 ? 1 : -1;
                    const count = 10;
                    for (let i = 0; i < count; i++) {
                        const bullet = new Bullet(
                            dir === 1 ? -50 : cx * 2 + 50,
                            yPos + (Math.random() - 0.5) * 30,
                            dir * (3 + i * 0.3), 0,
                            "#eeffff"
                        );
                        bullets.push(bullet);
                    }
                }
            }
        }
    },
    {
        name: "Splash",
        enemy: "Water Elemental",
        run: (frame, cx, cy) => {
            // --- Wave: slow undulating ring that pulses in and out ---
            if (frame % 70 === 0) {
                const ringCount = 18;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    // Wave-like speed variation across the ring
                    const speed = 1.5 + Math.sin(i * 0.7) * 0.8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#0088ff");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        // Deep ocean blue to seafoam
                        const r = Math.round(0x00 + 0x88 * t);
                        const g = Math.round(0x88 + 0x77 * t);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Current: slow drifting streams from the sides ---
            if (frame % 40 === 0) {
                const yPos = Math.random() * cy * 2;
                const dir = frame % 80 === 0 ? 1 : -1;
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const bullet = new Bullet(
                        dir === 1 ? -50 : cx * 2 + 50,
                        yPos + i * 15,
                        dir * 2, Math.sin(frame * 0.1) * 0.5,
                        "#0066cc"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        // Gently undulate vertically — like water flowing
                        this.vy = Math.sin(this._tick * 0.08) * 1.2;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        const r = Math.round(0x00 + 0x88 * t);
                        const g = Math.round(0x66 + 0x99 * t);
                        const b = Math.round(0xcc + 0x33 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Tremor Strike",
        enemy: "Earth Elemental",
        run: (frame, cx, cy) => {
            // --- Boulder rain: slow heavy drops from above ---
            if (frame % 35 === 0) {
                const xPos = Math.random() * cx * 2;
                const bullet = new Bullet(xPos, -50, (Math.random() - 0.5) * 0.5, 2, "#886633");
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 150, 1);
                    // Brown earth to dark stone grey
                    const r = Math.round(0x88 - 0x33 * t);
                    const g = Math.round(0x66 - 0x33 * t);
                    const b = Math.round(0x33 - 0x11 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }

            // --- Tremor shockwave: slow ground-level ring ---
            if (frame % 120 === 0) {
                const ringCount = 14;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 1.8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#664422");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = Math.round(0x66 + 0x22 * t);
                        const g = Math.round(0x44 - 0x11 * t);
                        const b = Math.round(0x22 - 0x11 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Rock spike: 4-directional slow burst ---
            if (frame % 90 === 0) {
                const spikes = 4;
                for (let i = 0; i < spikes; i++) {
                    const baseAngle = (i / spikes) * Math.PI * 2;
                    const count = 6;
                    for (let j = 0; j < count; j++) {
                        const spread = (j - 2.5) * 0.12;
                        const speed = 1 + j * 0.4;
                        const bullet = new Bullet(cx, cy,
                            Math.cos(baseAngle + spread) * speed,
                            Math.sin(baseAngle + spread) * speed,
                            "#886633"
                        );
                        bullets.push(bullet);
                    }
                }
            }
        }
    },
    {
        name: "Ice Blizzard",
        enemy: "Ice Elemental",
        run: (frame, cx, cy) => {
            // --- Snowflake burst: perfect 6-pointed star ---
            if (frame % 80 === 0) {
                const points = 6;
                for (let i = 0; i < points; i++) {
                    const baseAngle = (i / points) * Math.PI * 2;
                    // Each point fires 3 bullets — center and two side branches
                    const branches = [-0.15, 0, 0.15];
                    for (const spread of branches) {
                        const speed = spread === 0 ? 3 : 2; // center faster than branches
                        const bullet = new Bullet(cx, cy,
                            Math.cos(baseAngle + spread) * speed,
                            Math.sin(baseAngle + spread) * speed,
                            "#aaeeff"
                        );
                        bullet._originX = cx;
                        bullet._originY = cy;
                        bullet._baseUpdate = bullet.update.bind(bullet);
                        bullet.update = function () {
                            this._baseUpdate();
                            const dx = this.x - this._originX;
                            const dy = this.y - this._originY;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            const t = Math.min(dist / 300, 1);
                            // Ice blue to deep frozen white
                            const r = Math.round(0xaa + 0x55 * t);
                            const g = Math.round(0xee + 0x11 * t);
                            const b = Math.round(0xff);
                            this.color = `rgb(${r}, ${g}, ${b})`;
                        };
                        bullets.push(bullet);
                    }
                }
            }

            // --- Frost creep: slow ring that barely moves ---
            if (frame % 5 === 0) {
                const arms = 6;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.01) + (i * (Math.PI * 2 / arms));
                    const speed = 0.8; // very slow — ice creeps
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aaeeff");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 200, 1);
                        const r = Math.round(0xaa + 0x55 * t);
                        const g = Math.round(0xee + 0x11 * t);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Blizzard: fast diagonal rain from top-right ---
            if (frame % 15 === 0) {
                const xPos = Math.random() * cx * 2;
                const bullet = new Bullet(xPos, -50, -1.5, 4, "#ddf5ff");
                bullets.push(bullet);
            }
        }
    },
)