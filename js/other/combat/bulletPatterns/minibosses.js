patternLibrary.push(

    {
        name: "Prismatic Refraction",
        enemy: "Diamond Golem",
        run: (frame, cx, cy) => {
            if (frame % 90 === 0) {
                const points = 6;
                for (let i = 0; i < points; i++) {
                    const baseAngle = (i / points) * Math.PI * 2;
                    const spread = 0.2;
                    for (let j = 0; j < 4; j++) {
                        const angle = baseAngle + (j - 1.5) * spread;
                        const speed = 2 + j * 0.5;
                        const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aaffff");
                        bullet._originX = cx;
                        bullet._originY = cy;
                        bullet._baseUpdate = bullet.update.bind(bullet);
                        bullet.update = function () {
                            this._baseUpdate();
                            const dx = this.x - this._originX;
                            const dy = this.y - this._originY;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            const t = Math.min(dist / 300, 1);
                            const r = Math.round(0xaa - 0x66 * t);
                            const g = Math.round(0xff - 0xcc * t);
                            const b = Math.round(0xff);
                            this.color = `rgb(${r}, ${g}, ${b})`;
                        };
                        bullets.push(bullet);
                    }
                }
            }
            if (frame % 5 === 0) {
                const ringCount = 6;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (frame * 0.015) + (i * (Math.PI * 2 / ringCount));
                    const speed = 1.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aaffff");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = Math.round(0xaa - 0x66 * t);
                        const g = Math.round(0xff - 0xcc * t);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    {
        name: "Crystal Shatter",
        enemy: "Diamond Golem",
        run: (frame, cx, cy) => {
            if (frame % 7 === 0) {
                const speed = 1 + (Math.sin(frame * 0.04) + 1) / 2 * 4;
                const arms = 6;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.02) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#aaffff"
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
                        const r = Math.round(0xaa - 0x66 * t);
                        const g = Math.round(0xff - 0xcc * t);
                        this.color = `rgb(${r}, ${g}, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 160 === 0 && frame !== 0) {
                const count = 30;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 1.5 + Math.random() * 2;
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
                        const r = Math.round(0xff - 0x55 * t);
                        const g = Math.round(0xff - 0xcc * t);
                        this.color = `rgb(${r}, ${g}, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    {
        name: "Faceted Light",
        enemy: "Diamond Golem",
        run: (frame, cx, cy) => {
            if (frame % 120 === 0 && frame !== 0) {
                [180, 250, 320].forEach((dist, ri) => {
                    const count = 12 + ri * 4;
                    for (let i = 0; i < count; i++) {
                        const angle = (i / count) * Math.PI * 2;
                        const speed = 1.5 + ri * 0.5;
                        const bullet = new Bullet(
                            cx + Math.cos(angle) * dist,
                            cy + Math.sin(angle) * dist,
                            -Math.cos(angle) * speed,
                            -Math.sin(angle) * speed,
                            "#aaffff"
                        );
                        bullet._originX = cx + Math.cos(angle) * dist;
                        bullet._originY = cy + Math.sin(angle) * dist;
                        bullet._baseUpdate = bullet.update.bind(bullet);
                        bullet.update = function () {
                            this._baseUpdate();
                            const dx = this.x - cx;
                            const dy = this.y - cy;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            const t = Math.min(1 - dist / 300, 1);
                            const r = Math.round(0xaa - 0x66 * t);
                            const g = Math.round(0xff - 0xcc * t);
                            this.color = `rgb(${r}, ${g}, 255)`;
                        };
                        bullets.push(bullet);
                    }
                });
            }
            if (frame % 5 === 0) {
                const arms = 3;
                const speed = 2;
                for (let i = 0; i < arms; i++) {
                    const angle = -(frame * 0.02) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ccffff"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },

    {
        name: "Iron-Plated Diamond Burst",
        enemy: "Iron-Plated Diamond Golem",
        run: (frame, cx, cy) => {
            if (frame % 100 === 0) {
                const ringCount = 16;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 2.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#888888");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = Math.round(0x88 - 0x44 * t);
                        const g = Math.round(0x88 - 0x55 * t);
                        const b = Math.round(0x88 + 0x77 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 130 === 0) {
                const points = 6;
                for (let i = 0; i < points; i++) {
                    const baseAngle = (i / points) * Math.PI * 2;
                    const spread = 0.2;
                    for (let j = 0; j < 4; j++) {
                        const angle = baseAngle + (j - 1.5) * spread;
                        const speed = 3 + j * 0.5;
                        const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aaffff");
                        bullet._originX = cx;
                        bullet._originY = cy;
                        bullet._baseUpdate = bullet.update.bind(bullet);
                        bullet.update = function () {
                            this._baseUpdate();
                            const dx = this.x - this._originX;
                            const dy = this.y - this._originY;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            const t = Math.min(dist / 300, 1);
                            const r = Math.round(0xaa - 0x66 * t);
                            const g = Math.round(0xff - 0xcc * t);
                            const b = Math.round(0xff);
                            this.color = `rgb(${r}, ${g}, ${b})`;
                        };
                        bullets.push(bullet);
                    }
                }
            }
            if (frame % 50 === 0) {
                const cols = 3;
                for (let c = 0; c < cols; c++) {
                    const xPos = (cx * 2 / (cols + 1)) * (c + 1);
                    const bullet = new Bullet(xPos, -50, 0, 3, "#666666");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        const v = Math.round(0x66 + 0x99 * t);
                        this.color = `rgb(${v - 20}, ${v - 20}, ${v})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    {
        name: "Plated Fortress",
        enemy: "Iron-Plated Diamond Golem",
        run: (frame, cx, cy) => {
            if (frame % 6 === 0) {
                const fromLeft = Math.floor(frame / 120) % 2 === 0;
                const yPos = Math.random() * cy * 2;
                const bullet = new Bullet(
                    fromLeft ? -50 : cx * 2 + 50,
                    yPos,
                    fromLeft ? 3 : -3,
                    (Math.random() - 0.5) * 0.4,
                    "#888888"
                );
                bullet.radius = 5;
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 140, 1);
                    const r = Math.round(0x88 - 0x33 * t);
                    const g = Math.round(0x88 - 0x44 * t);
                    const b = Math.round(0x88 + 0x77 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
            if (frame % 150 === 0 && frame !== 0) {
                const count = 24;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2 + (i % 3) * 0.6;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#aaffff"
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
                        const r = Math.round(0xaa - 0x66 * t);
                        const g = Math.round(0xff - 0xcc * t);
                        this.color = `rgb(${r}, ${g}, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    {
        name: "Diamond Core",
        enemy: "Iron-Plated Diamond Golem",
        run: (frame, cx, cy) => {
            if (frame % 5 === 0) {
                const speed = 1 + (Math.sin(frame * 0.03) + 1) / 2 * 3;
                const arms = 6;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.025) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#aaffff"
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
                        const r = Math.round(0xaa - 0x66 * t);
                        const g = Math.round(0xff - 0xcc * t);
                        this.color = `rgb(${r}, ${g}, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 5 === 2) {
                const speed = 1 + (Math.sin(frame * 0.03) + 1) / 2 * 2.5;
                const arms = 6;
                for (let i = 0; i < arms; i++) {
                    const angle = -(frame * 0.025) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#666666"
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
                        const v = Math.round(0x66 + 0x99 * t);
                        this.color = `rgb(${v - 20}, ${v - 20}, ${v})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    {
        name: "Mana Drain",
        enemy: "Mana Draining Wisp",
        run: (frame, cx, cy) => {
            if (frame % 4 === 0) {
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.025) + (i * (Math.PI * 2 / arms));
                    const speed = 1.2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#8844ff");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const flicker = Math.sin(this._tick * 0.25) * 0.5 + 0.5;
                        const r = Math.round(0x88 - 0x44 * flicker);
                        const g = Math.round(0x44 * flicker);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 130 === 0) {
                const ringCount = 14;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const spawnDist = 180;
                    const spawnX = cx + Math.cos(angle) * spawnDist;
                    const spawnY = cy + Math.sin(angle) * spawnDist;
                    const speed = 1.5;
                    const bullet = new Bullet(spawnX, spawnY, -Math.cos(angle) * speed, -Math.sin(angle) * speed, "#8844ff");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const flicker = Math.sin(this._tick * 0.3) * 0.5 + 0.5;
                        const r = Math.round(0x88 - 0x44 * flicker);
                        const g = Math.round(0x44 * flicker);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 160 === 0) {
                const count = 18;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 1 + Math.random() * 2.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#cc88ff");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        const r = Math.round(0xcc - 0xcc * t);
                        const g = Math.round(0x88 - 0x88 * t);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    {
        name: "Void Flicker",
        enemy: "Mana Draining Wisp",
        run: (frame, cx, cy) => {
            if (frame % 3 === 0) {
                const xPos = Math.random() * cx * 2;
                const speed = 1 + Math.random() * 2;
                const bullet = new Bullet(xPos, -50,
                    (Math.random() - 0.5) * 0.4,
                    speed,
                    "#8844ff"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const flicker = Math.sin(this._tick * 0.3) * 0.5 + 0.5;
                    const r = Math.round(0x88 - 0x44 * flicker);
                    const g = Math.round(0x44 * flicker);
                    this.color = `rgb(${r}, ${g}, 255)`;
                };
                bullets.push(bullet);
            }
            if (frame % 100 === 0 && frame !== 0) {
                const count = 16;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 220;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#cc88ff"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const flicker = Math.sin(this._tick * 0.2) * 0.5 + 0.5;
                        const r = Math.round(0xcc - 0x88 * flicker);
                        const g = Math.round(0x88 - 0x44 * flicker);
                        this.color = `rgb(${r}, ${g}, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

    {
        name: "Siphon Storm",
        enemy: "Mana Draining Wisp",
        run: (frame, cx, cy) => {
            if (frame % 5 === 0) {
                const speed = 1 + (Math.sin(frame * 0.05) + 1) / 2 * 3;
                const arms = 5;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.03) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#8844ff"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const flicker = Math.sin(this._tick * 0.25) * 0.5 + 0.5;
                        const r = Math.round(0x88 - 0x44 * flicker);
                        const g = Math.round(0x44 * flicker);
                        this.color = `rgb(${r}, ${g}, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 5 === 2) {
                const speed = 1 + (Math.sin(frame * 0.05) + 1) / 2 * 2.5;
                const arms = 5;
                for (let i = 0; i < arms; i++) {
                    const angle = -(frame * 0.03) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#cc88ff"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const flicker = Math.sin(this._tick * 0.2) * 0.5 + 0.5;
                        const r = Math.round(0xcc - 0x88 * flicker);
                        const g = Math.round(0x88 - 0x44 * flicker);
                        this.color = `rgb(${r}, ${g}, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 180 === 0 && frame !== 0) {
                const count = 24;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2.5;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ffffff"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 80, 1);
                        const r = Math.round(0xff - 0x77 * t);
                        const g = Math.round(0xff - 0xff * t);
                        this.color = `rgb(${r}, ${g}, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

);