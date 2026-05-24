patternLibrary.push(
    {
        name: "Drawing Compass",
        enemy: "Miss Circle",
        run: (frame, cx, cy) => {
            if (frame % 80 === 0) {
                const ringCount = 20;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ffffff");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const v = Math.round(0xff + (0x44 - 0xff) * t);
                        this.color = `rgb(${v}, ${v}, ${v})`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 10 === 0) {
                const spikeAngle = frame * 0.03;
                const speed = 5;
                const bullet = new Bullet(cx, cy, Math.cos(spikeAngle) * speed, Math.sin(spikeAngle) * speed, "#ff0000");
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
                    const g = Math.round(0x00);
                    const b = Math.round(0x00 + 0x88 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }

            if (frame % 120 === 0) {
                const arcCount = 10;
                const arcSpread = Math.PI * 0.6; // 108 degree arc
                const baseAngle = frame * 0.05;
                for (let i = 0; i < arcCount; i++) {
                    const angle = baseAngle + (i / arcCount) * arcSpread;
                    const speed = 3;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#cccccc");
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Perfect Geometry",
        enemy: "Miss Circle",
        run: (frame, cx, cy) => {
            // Concentric rings expanding outward at different speeds
            if (frame % 100 === 0) {
                [1.5, 2.5, 3.5].forEach((speed, ri) => {
                    const count = 16 + ri * 6;
                    for (let i = 0; i < count; i++) {
                        const angle = (i / count) * Math.PI * 2;
                        const bullet = new Bullet(cx, cy,
                            Math.cos(angle) * speed,
                            Math.sin(angle) * speed,
                            "#ffffff"
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
                            const v = Math.round(0xff - 0xbb * t);
                            this.color = `rgb(${v}, ${v}, ${v})`;
                        };
                        bullets.push(bullet);
                    }
                });
            }

            // Rotating compass needle — precise single line of bullets
            if (frame % 6 === 0) {
                const angle = frame * 0.02;
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const speed = 1.5 + i * 0.8;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff0000"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 80, 1);
                        this.color = `rgb(255, 0, ${Math.round(0x88 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }

            // Arc sweep every 150 frames — like a protractor measuring the arena
            if (frame % 150 === 0) {
                const count = 30;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 240;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#cccccc"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Circumference",
        enemy: "Miss Circle",
        run: (frame, cx, cy) => {
            // Bullets that orbit the center before flying outward
            if (frame % 8 === 0) {
                const orbitAngle = frame * 0.05;
                const orbitDist = 80;
                const spawnX = cx + Math.cos(orbitAngle) * orbitDist;
                const spawnY = cy + Math.sin(orbitAngle) * orbitDist;
                const speed = 3;
                const bullet = new Bullet(spawnX, spawnY,
                    Math.cos(orbitAngle) * speed,
                    Math.sin(orbitAngle) * speed,
                    "#ffffff"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 100, 1);
                    const v = Math.round(0xff - 0xcc * t);
                    this.color = `rgb(${v}, ${v}, ${v})`;
                };
                bullets.push(bullet);
            }

            // Counter-orbit in the opposite direction
            if (frame % 8 === 4) {
                const orbitAngle = -(frame * 0.05);
                const orbitDist = 80;
                const spawnX = cx + Math.cos(orbitAngle) * orbitDist;
                const spawnY = cy + Math.sin(orbitAngle) * orbitDist;
                const speed = 3;
                const bullet = new Bullet(spawnX, spawnY,
                    Math.cos(orbitAngle) * speed,
                    Math.sin(orbitAngle) * speed,
                    "#ff0000"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 100, 1);
                    this.color = `rgb(255, 0, ${Math.round(0xaa * (1 - t))})`;
                };
                bullets.push(bullet);
            }

            // Full ring burst every 180 frames
            if (frame % 180 === 0) {
                const count = 36;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2.5;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ffffff"
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
                        const v = Math.round(0xff - 0xdd * t);
                        this.color = `rgb(${v}, ${v}, ${v})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Slash",
        enemy: "Miss Bloomie",
        run: (frame, cx, cy) => {
            if (frame % 60 === 0) {
                const slashCount = 12;
                const isHorizontal = Math.floor(frame / 60) % 2 === 0;
                for (let i = 0; i < slashCount; i++) {
                    const t = i / slashCount;
                    const spawnX = isHorizontal ? (cx * 2 * t) : cx + (Math.random() - 0.5) * 40;
                    const spawnY = isHorizontal ? cy + (Math.random() - 0.5) * 40 : (cy * 2 * t);
                    const vx = isHorizontal ? 0 : (Math.random() - 0.5) * 1.5;
                    const vy = isHorizontal ? (Math.random() - 0.5) * 1.5 : 0;
                    const speed = 2 + (i / slashCount) * 3;
                    const bullet = new Bullet(spawnX, spawnY, vx + (isHorizontal ? 0 : 0), vy + (isHorizontal ? speed * 0.3 : 0), "#ff6688");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        const r = Math.round(0xff);
                        const g = Math.round(0x66 - 0x66 * t);
                        const b = Math.round(0x88 - 0x88 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            if (frame % 90 === 0) {
                const forkAngle = 0.18;
                const baseAngle = Math.random() * Math.PI * 2;
                for (let f = -1; f <= 1; f += 2) {
                    const count = 8;
                    for (let i = 0; i < count; i++) {
                        const angle = baseAngle + f * forkAngle;
                        const speed = 2 + i * 0.4;
                        const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff6688");
                        bullet._tick = 0;
                        bullet._baseUpdate = bullet.update.bind(bullet);
                        bullet.update = function () {
                            this._tick++;
                            this._baseUpdate();
                            const t = Math.min(this._tick / 80, 1);
                            const r = Math.round(0xff);
                            const g = Math.round(0x66 - 0x66 * t);
                            const b = Math.round(0x88 - 0x88 * t);
                            this.color = `rgb(${r}, ${g}, ${b})`;
                        };
                        bullets.push(bullet);
                    }
                }
            }
        }
    },
    {
        name: "Petal Storm",
        enemy: "Miss Bloomie",
        run: (frame, cx, cy) => {
            // Flower petal spiral — rotating arms that bloom outward
            if (frame % 5 === 0) {
                const petals = 6;
                const speed = 1 + (Math.sin(frame * 0.04) + 1) / 2 * 3;
                for (let i = 0; i < petals; i++) {
                    const angle = (frame * 0.03) + (i * (Math.PI * 2 / petals));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff6688"
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
                        const r = 0xff;
                        const g = Math.round(0x66 - 0x44 * t);
                        const b = Math.round(0x88 + 0x77 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // Counter-rotating petals after frame 150
            if (frame > 150 && frame % 5 === 2) {
                const petals = 6;
                const speed = 1 + (Math.sin(frame * 0.04) + 1) / 2 * 2.5;
                for (let i = 0; i < petals; i++) {
                    const angle = -(frame * 0.03) + (i * (Math.PI * 2 / petals));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff88aa"
                    );
                    bullets.push(bullet);
                }
            }

            // Bloom burst every 130 frames
            if (frame % 130 === 0) {
                const count = 24;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2 + Math.random();
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff6688"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 80, 1);
                        this.color = `rgb(255, ${Math.round(0x66 - 0x66 * t)}, ${Math.round(0x88 - 0x88 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Thorn Whip",
        enemy: "Miss Bloomie",
        run: (frame, cx, cy) => {
            // Rapid whip-like streams from alternating sides
            if (frame % 4 === 0) {
                const wave = Math.sin(frame * 0.06) * cy * 0.7;
                const fromLeft = Math.floor(frame / 60) % 2 === 0;
                const speed = 4;
                const bullet = new Bullet(
                    fromLeft ? -50 : cx * 2 + 50,
                    cy + wave,
                    fromLeft ? speed : -speed,
                    Math.cos(frame * 0.06) * 1.5,
                    "#ff6688"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 80, 1);
                    this.color = `rgb(255, ${Math.round(0x66 - 0x44 * t)}, ${Math.round(0x88 - 0x66 * t)})`;
                };
                bullets.push(bullet);
            }

            // Thorn burst: sharp ring every 100 frames
            if (frame % 100 === 0) {
                const count = 18;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 3 + (i % 3) * 0.8;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#cc2244"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 60, 1);
                        this.color = `rgb(${Math.round(0xcc + 0x33 * t)}, ${Math.round(0x22 * (1 - t))}, ${Math.round(0x44 * (1 - t))})`;
                    };
                    bullets.push(bullet);
                }
            }

            // Aimed thorn shot every 80 frames
            if (frame % 80 === 0) {
                const baseAngle = Math.atan2(player.y - cy, player.x - cx);
                const count = 4;
                for (let i = 0; i < count; i++) {
                    const spread = (i - 1.5) * 0.2;
                    const speed = 4;
                    bullets.push(new Bullet(cx, cy,
                        Math.cos(baseAngle + spread) * speed,
                        Math.sin(baseAngle + spread) * speed,
                        "#ff4466"
                    ));
                }
            }
        }
    },
    {
        name: "Claw Swipe",
        enemy: "Miss Thavel",
        run: (frame, cx, cy) => {
            if (frame % 70 === 0) {
                const claws = 3;
                const baseAngle = (Math.random() * Math.PI * 2);
                const spread = 0.25;
                for (let c = 0; c < claws; c++) {
                    const angle = baseAngle + (c - 1) * spread;
                    const count = 10;
                    for (let i = 0; i < count; i++) {
                        const speed = 2 + i * 0.5;
                        const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#e8e8e8");
                        bullet._tick = 0;
                        bullet._baseUpdate = bullet.update.bind(bullet);
                        bullet.update = function () {
                            this._tick++;
                            this._baseUpdate();
                            const t = Math.min(this._tick / 120, 1);
                            const r = Math.round(0xe8 - 0x98 * t);
                            const g = Math.round(0xe8 - 0xc8 * t);
                            const b = Math.round(0xe8 - 0xe0 * t);
                            this.color = `rgb(${r}, ${g}, ${b})`;
                        };
                        bullets.push(bullet);
                    }
                }
            }
            if (frame > 200 && frame % 110 === 0) {
                const fanCount = 8;
                const fanSpread = Math.PI * 0.5;
                for (let side = -1; side <= 1; side += 2) {
                    const baseAngle = side === -1 ? Math.PI * 1.25 : Math.PI * 1.75;
                    for (let i = 0; i < fanCount; i++) {
                        const angle = baseAngle + (i / fanCount - 0.5) * fanSpread;
                        const speed = 1.5 + (i / fanCount) * 3;
                        const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#e8e8e8");
                        bullet._tick = 0;
                        bullet._baseUpdate = bullet.update.bind(bullet);
                        bullet.update = function () {
                            this._tick++;
                            this._baseUpdate();
                            const t = Math.min(this._tick / 120, 1);
                            const r = Math.round(0xe8 - 0x98 * t);
                            const g = Math.round(0xe8 - 0xc8 * t);
                            const b = Math.round(0xe8 - 0xe0 * t);
                            this.color = `rgb(${r}, ${g}, ${b})`;
                        };
                        bullets.push(bullet);
                    }
                }
            }
            if (frame % 25 === 0) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1 + Math.random() * 3;
                const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aaaaaa");
                bullets.push(bullet);
            }
        }
    },
    {
        name: "Polyglot",
        enemy: "Miss Thavel",
        run: (frame, cx, cy) => {
            // Many different streams firing in different styles — she speaks many languages
            // Stream 1: slow sweeping arc
            if (frame % 6 === 0) {
                const angle = Math.sin(frame * 0.03) * Math.PI;
                const bullet = new Bullet(cx, cy,
                    Math.cos(angle) * 2.5,
                    Math.sin(angle) * 2.5,
                    "#e8e8e8"
                );
                bullets.push(bullet);
            }

            // Stream 2: fast targeted bursts
            if (frame % 50 === 0) {
                const baseAngle = Math.atan2(player.y - cy, player.x - cx);
                const count = 5;
                for (let i = 0; i < count; i++) {
                    const spread = (i - 2) * 0.2;
                    const speed = 5;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(baseAngle + spread) * speed,
                        Math.sin(baseAngle + spread) * speed,
                        "#ffffff"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 60, 1);
                        const v = Math.round(0xff - 0xcc * t);
                        this.color = `rgb(${v}, ${v}, ${v})`;
                    };
                    bullets.push(bullet);
                }
            }

            // Stream 3: closing ring every 140 frames
            if (frame % 140 === 0) {
                const count = 20;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 250;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#aaaaaa"
                    );
                    bullets.push(bullet);
                }
            }

            // Stream 4: erratic spray after frame 200
            if (frame > 200 && frame % 15 === 0) {
                const count = 4;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 2 + Math.random() * 3;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#cccccc"
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
        name: "Pain's Language",
        enemy: "Miss Thavel",
        run: (frame, cx, cy) => {
            // Dense curtain of claws from above
            if (frame % 4 === 0) {
                const xPos = Math.random() * cx * 2;
                const speed = 2 + Math.random() * 2;
                const bullet = new Bullet(xPos, -50,
                    (Math.random() - 0.5) * 0.4,
                    speed,
                    "#e8e8e8"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 120, 1);
                    const r = Math.round(0xe8 - 0x98 * t);
                    const g = Math.round(0xe8 - 0xc8 * t);
                    const b = Math.round(0xe8 - 0xe0 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
    
            // Triple claw swipe aimed at player every 60 frames
            if (frame % 60 === 0) {
                const baseAngle = Math.atan2(player.y - cy, player.x - cx);
                const claws = 3;
                const spread = 0.2;
                for (let c = 0; c < claws; c++) {
                    const angle = baseAngle + (c - 1) * spread;
                    const count = 8;
                    for (let i = 0; i < count; i++) {
                        const speed = 2 + i * 0.5;
                        const bullet = new Bullet(cx, cy,
                            Math.cos(angle) * speed,
                            Math.sin(angle) * speed,
                            "#e8e8e8"
                        );
                        bullet._tick = 0;
                        bullet._baseUpdate = bullet.update.bind(bullet);
                        bullet.update = function () {
                            this._tick++;
                            this._baseUpdate();
                            const t = Math.min(this._tick / 100, 1);
                            // Fade from white to dark grey, not invisible
                            const v = Math.round(0xe8 - 0xaa * t);
                            this.color = `rgb(${v}, ${v}, ${v})`;
                        };
                        bullets.push(bullet);
                    }
                }
            }
    
            // Final word: massive burst every 200 frames, skip frame 0
            if (frame % 200 === 0 && frame !== 0) {
                const count = 32;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 3 + (i % 4) * 0.5;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#e8e8e8"
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
                        // Fade from light grey to dark grey, not invisible
                        const v = Math.round(0xe8 - 0xaa * t);
                        this.color = `rgb(${v}, ${v}, ${v})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },    
)