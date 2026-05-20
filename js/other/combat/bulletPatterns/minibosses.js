patternLibrary.push(
    {
        name: "Prismatic Refraction",
        enemy: "Diamond Golem",
        run: (frame, cx, cy) => {
            // --- Prismatic refraction: 6-pointed diamond burst ---
            if (frame % 90 === 0) {
                const points = 6; // diamond has 6 faces
                for (let i = 0; i < points; i++) {
                    const baseAngle = (i / points) * Math.PI * 2;
                    const spread = 0.2;
                    // Each point fires a tight cluster — faceted look
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
                            // Ice blue to deep crystal purple
                            const r = Math.round(0xaa - 0x66 * t);
                            const g = Math.round(0xff - 0xcc * t);
                            const b = Math.round(0xff);
                            this.color = `rgb(${r}, ${g}, ${b})`;
                        };
                        bullets.push(bullet);
                    }
                }
            }

            // --- Slow rotating crystal ring ---
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
        name: "Iron-Plated Diamond Burst",
        enemy: "Iron-Plated Diamond Golem",
        run: (frame, cx, cy) => {
            // --- Heavy iron shockwave rings --- 
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
                        // Iron grey to diamond blue — the two materials showing through
                        const r = Math.round(0x88 - 0x44 * t);
                        const g = Math.round(0x88 - 0x55 * t);
                        const b = Math.round(0x88 + 0x77 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Diamond facet burst underneath the iron plating ---
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

            // --- Iron slam columns from above ---
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
        name: "Mana Drain",
        enemy: "Mana Draining Wisp",
        run: (frame, cx, cy) => {
            // --- Draining tendrils: slow spiraling arms that creep outward ---
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
                        // Flicker like a wisp draining mana
                        const flicker = Math.sin(this._tick * 0.25) * 0.5 + 0.5;
                        const r = Math.round(0x88 - 0x44 * flicker);
                        const g = Math.round(0x44 * flicker);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Mana siphon pulse: inward closing rings (draining toward itself) ---
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

            // --- Void burst: occasional large mana explosion ---
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
)