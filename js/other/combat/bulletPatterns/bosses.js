patternLibrary.push(
    {
        name: "Hellfire",
        enemy: "Azmodan",
        run: (frame, cx, cy) => {
            // --- Phase 1: Hellfire rain — burning columns from above ---
            if (frame % 30 === 0) {
                const columns = 5;
                for (let c = 0; c < columns; c++) {
                    const xPos = (cx * 2 / (columns + 1)) * (c + 1);
                    const bullet = new Bullet(xPos, -50, 0, 5, "#ff4500");
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const t = Math.min(this.y / 500, 1);
                        const r = Math.round(0xff);
                        const g = Math.round(0x45 - 0x45 * t);
                        const b = Math.round(0x00);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Phase 2: Slow rotating brimstone ring ---
            if (frame % 80 === 0) {
                const ringCount = 18;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2 + (frame * 0.01);
                    const speed = 1.8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff4500");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = Math.round(0xff);
                        const g = Math.round(0x45 + (0x22 - 0x45) * t);
                        const b = Math.round(0x00 + 0x11 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Phase 3: Demonic cross beams after 200 frames ---
            if (frame > 200 && frame % 100 === 0) {
                const arms = 8; // full 8-pointed star — demonic
                const bulletsPerArm = 12;
                for (let a = 0; a < arms; a++) {
                    const baseAngle = (a / arms) * Math.PI * 2;
                    for (let j = 0; j < bulletsPerArm; j++) {
                        const spread = (j / bulletsPerArm - 0.5) * 0.12;
                        const angle = baseAngle + spread;
                        const speed = 2 + (j / bulletsPerArm) * 3;
                        const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff4500");
                        bullet._originX = cx;
                        bullet._originY = cy;
                        bullet._baseUpdate = bullet.update.bind(bullet);
                        bullet.update = function () {
                            this._baseUpdate();
                            const dx = this.x - this._originX;
                            const dy = this.y - this._originY;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            const t = Math.min(dist / 300, 1);
                            const r = Math.round(0xff);
                            const g = Math.round(0x45 - 0x45 * t);
                            const b = Math.round(0x00);
                            this.color = `rgb(${r}, ${g}, ${b})`;
                        };
                        bullets.push(bullet);
                    }
                }
            }
        }
    },
    {
        name: "Mirrored",
        enemy: "The Player's Mirror",
        run: (frame, cx, cy) => {
            // --- Phase 1: Mimics the basic spiral — it has watched you ---
            if (frame % 3 !== 0) return;

            const spiralCount = 5;
            for (let i = 0; i < spiralCount; i++) {
                const angle = (frame * 0.04) + (i * (Math.PI * 2 / spiralCount));
                const speed = 2.5;
                const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aaaaaa");
                bullet._originX = cx;
                bullet._originY = cy;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._baseUpdate();
                    const dx = this.x - this._originX;
                    const dy = this.y - this._originY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const t = Math.min(dist / 300, 1);
                    // Starts grey (a reflection) and bleeds into the player's own red
                    const r = Math.round(0xaa + (0xff - 0xaa) * t);
                    const g = Math.round(0xaa - 0xaa * t);
                    const b = Math.round(0xaa - 0xaa * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }

            // --- Phase 2: Mirror spiral — same pattern but inverted ---
            if (frame > 150) {
                for (let i = 0; i < spiralCount; i++) {
                    const angle = -(frame * 0.04) + (i * (Math.PI * 2 / spiralCount));
                    const speed = 2.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aaaaaa");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = Math.round(0xaa + (0xff - 0xaa) * t);
                        const g = Math.round(0xaa - 0xaa * t);
                        const b = Math.round(0xaa - 0xaa * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Phase 3: Perfect ring that closes inward — it knows your patterns ---
            if (frame > 300 && frame % 120 === 0) {
                const ringCount = 16;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const spawnDist = 180;
                    const spawnX = cx + Math.cos(angle) * spawnDist;
                    const spawnY = cy + Math.sin(angle) * spawnDist;
                    const speed = 1.5;
                    const bullet = new Bullet(spawnX, spawnY, -Math.cos(angle) * speed, -Math.sin(angle) * speed, "#ffffff");
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        // Fades from white to red as it closes in — your own demise reflected back
                        const dx = this.x - cx;
                        const dy = this.y - cy;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = 1 - Math.min(dist / spawnDist, 1);
                        const r = Math.round(0xff);
                        const g = Math.round(0xff - 0xff * t);
                        const b = Math.round(0xff - 0xff * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Obsidian Ring",
        enemy: "Obsidian Golem",
        run: (frame, cx, cy) => {
            // --- Heavy, slow, crushing boulders from above ---
            if (frame % 40 === 0) {
                const cols = 4;
                for (let c = 0; c < cols; c++) {
                    const xPos = (cx * 2 / (cols + 1)) * (c + 1);
                    const speed = 2.5; // slow and heavy
                    const bullet = new Bullet(xPos, -50, 0, speed, "#1a1a1a");
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const t = Math.min(this.y / 500, 1);
                        // Dark obsidian to a faint purple sheen
                        const r = Math.round(0x1a + 0x20 * t);
                        const g = Math.round(0x1a + 0x00 * t);
                        const b = Math.round(0x1a + 0x40 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Shockwave ring when it "slams" the ground ---
            if (frame % 120 === 0) {
                const ringCount = 20;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#333333");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = Math.round(0x33 + 0x33 * t);
                        const g = Math.round(0x33 + 0x00 * t);
                        const b = Math.round(0x33 + 0x55 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Prismatic Shard Burst",
        enemy: "Gem Golem",
        run: (frame, cx, cy) => {
            // --- Prismatic shard burst — gems shattering outward ---
            if (frame % 90 === 0) {
                const shardCount = 24;
                for (let i = 0; i < shardCount; i++) {
                    const angle = (i / shardCount) * Math.PI * 2;
                    const speed = 1.5 + Math.random() * 2;
                    // Cycle through gem colors per shard
                    const gemColors = ["#ff4444", "#44ff44", "#4444ff", "#ffff44", "#ff44ff", "#44ffff"];
                    const color = gemColors[i % gemColors.length];
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, color);
                    bullets.push(bullet);
                }
            }

            // --- Slow rotating rainbow spiral ---
            if (frame % 4 === 0) {
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.02) + (i * (Math.PI * 2 / arms));
                    const speed = 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ffffff");
                    bullet._frame = frame;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        // Cycles through hues as it travels — prismatic
                        this._frame++;
                        const hue = (this._frame * 3) % 360;
                        this.color = `hsl(${hue}, 100%, 60%)`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Acidic Spit",
        enemy: "Duriel",
        run: (frame, cx, cy) => {
            // --- Maggot-like wriggling streams from all sides ---
            if (frame % 15 === 0) {
                const sides = 4;
                const spawnPositions = [
                    { x: Math.random() * cx * 2, y: -50, vx: 0, vy: 3 },         // top
                    { x: Math.random() * cx * 2, y: cy * 2 + 50, vx: 0, vy: -3 }, // bottom
                    { x: -50, y: Math.random() * cy * 2, vx: 3, vy: 0 },           // left
                    { x: cx * 2 + 50, y: Math.random() * cy * 2, vx: -3, vy: 0 }, // right
                ];

                const spawn = spawnPositions[Math.floor(frame / 15) % sides];
                const bullet = new Bullet(spawn.x, spawn.y, spawn.vx, spawn.vy, "#c8a850");
                bullet._tick = 0;
                bullet._baseVx = spawn.vx;
                bullet._baseVy = spawn.vy;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    // Wriggle: perpendicular sine wave oscillation
                    const perp = Math.sin(this._tick * 0.3) * 1.5;
                    if (this._baseVx === 0) {
                        this.vx = perp;
                        this.vy = this._baseVy;
                    } else {
                        this.vx = this._baseVx;
                        this.vy = perp;
                    }
                    this._baseUpdate();
                    const t = Math.min(this._tick / 150, 1);
                    // Sickly yellow-brown maggot color
                    const r = Math.round(0xc8 - 0x50 * t);
                    const g = Math.round(0xa8 - 0x60 * t);
                    const b = Math.round(0x50 - 0x30 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }

            // --- Acid spit burst ---
            if (frame % 100 === 0) {
                const count = 14;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 1 + Math.random() * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#88ff00");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        const r = Math.round(0x88 * (1 - t));
                        const g = Math.round(0xff - 0x55 * t);
                        const b = Math.round(0x00);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Wandering Orbs",
        enemy: "Will o' Wisp",
        run: (frame, cx, cy) => {
            // --- Ethereal drifting orbs that float unpredictably ---
            if (frame % 20 === 0) {
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 0.8 + Math.random() * 1.2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aaddff");
                    bullet._tick = 0;
                    bullet._angle = angle;
                    bullet._speed = speed;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        // Slowly drift direction — ghostly wandering
                        this._angle += (Math.random() - 0.5) * 0.15;
                        this.vx = Math.cos(this._angle) * this._speed;
                        this.vy = Math.sin(this._angle) * this._speed;
                        this._baseUpdate();
                        // Flicker between pale blue and white
                        const flicker = Math.sin(this._tick * 0.2) * 0.5 + 0.5;
                        const r = Math.round(0xaa + 0x55 * flicker);
                        const g = Math.round(0xdd + 0x22 * flicker);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Luring pulse ring — drawing you in ---
            if (frame % 150 === 0) {
                const ringCount = 16;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const spawnDist = 200;
                    const spawnX = cx + Math.cos(angle) * spawnDist;
                    const spawnY = cy + Math.sin(angle) * spawnDist;
                    const bullet = new Bullet(spawnX, spawnY, -Math.cos(angle) * 1.2, -Math.sin(angle) * 1.2, "#aaddff");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const flicker = Math.sin(this._tick * 0.3) * 0.5 + 0.5;
                        const r = Math.round(0xaa + 0x55 * flicker);
                        const g = Math.round(0xdd + 0x22 * flicker);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Fiery Wandering Orbs",
        enemy: "Fiery Will O' Wisp",
        run: (frame, cx, cy) => {
            // --- Same wandering orbs as Will o' Wisp but fiery ---
            if (frame % 15 === 0) { // slightly more aggressive than its brother
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 1.2 + Math.random() * 1.8; // faster than regular wisp
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff6600");
                    bullet._tick = 0;
                    bullet._angle = angle;
                    bullet._speed = speed;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        // More erratic drift than the regular wisp
                        this._angle += (Math.random() - 0.5) * 0.25;
                        this.vx = Math.cos(this._angle) * this._speed;
                        this.vy = Math.sin(this._angle) * this._speed;
                        this._baseUpdate();
                        // Flicker between orange and bright yellow — like a real flame
                        const flicker = Math.sin(this._tick * 0.3) * 0.5 + 0.5;
                        const r = Math.round(0xff);
                        const g = Math.round(0x44 + 0xbb * flicker);
                        const b = Math.round(0x00 + 0x22 * flicker);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Flame burst ring ---
            if (frame % 100 === 0) {
                const ringCount = 18;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 2 + Math.random() * 1.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff6600");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const flicker = Math.sin(this._tick * 0.4) * 0.5 + 0.5;
                        const r = Math.round(0xff);
                        const g = Math.round(0x44 + 0xbb * flicker);
                        const b = Math.round(0x00);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
)