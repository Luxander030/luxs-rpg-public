patternLibrary.push(

    {
        name: "Kitsune (Pulse)",
        enemy: "Kitsune",
        run: (frame, cx, cy) => {
            const speed = 2;
            if (frame % 25 !== 0) return;
            for (let i = 0; i < 50; i++) {
                let angle = (frame * 0.04) + (i * (Math.PI * 2 / 50));
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                const bullet = new Bullet(cx, cy, vx, vy, "#ff0000");
                bullet._originX = cx;
                bullet._originY = cy;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._baseUpdate();
                    const dx = this.x - this._originX;
                    const dy = this.y - this._originY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const t = Math.min(dist / 300, 1);
                    const r = Math.round(0xff + (0x3c - 0xff) * t);
                    const g = Math.round(0x00 + (0x23 - 0x00) * t);
                    const b = Math.round(0x00 + (0xa8 - 0x00) * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
        }
    },

    {
        name: "Kitsune (Spiral)",
        enemy: "Kitsune",
        run: (frame, cx, cy) => {
            const speed = 2;
            if (frame % 1 !== 0) return;
            for (let i = 0; i < 50; i++) {
                let angle = (frame * 0.04) + (i * (Math.PI * 2 / 3));
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                const bullet = new Bullet(cx, cy, vx, vy, "#ff0000");
                bullet._originX = cx;
                bullet._originY = cy;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._baseUpdate();
                    const dx = this.x - this._originX;
                    const dy = this.y - this._originY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const t = Math.min(dist / 300, 1);
                    const r = Math.round(0xff + (0x3c - 0xff) * t);
                    const g = Math.round(0x00 + (0x23 - 0x00) * t);
                    const b = Math.round(0x00 + (0xa8 - 0x00) * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
        }
    },
    {
        name: "Kitsune (Fox Fire)",
        enemy: "Kitsune",
        run: (frame, cx, cy) => {
            // Erratic darting wisps — fox fire doesn't move predictably
            if (frame % 15 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 1.5 + Math.random() * 3;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff0000"
                    );
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        // Fox fire drifts unpredictably
                        if (this._tick % 20 === 0) {
                            this.vx += (Math.random() - 0.5) * 1.5;
                            this.vy += (Math.random() - 0.5) * 1.5;
                        }
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = Math.round(0xff + (0x3c - 0xff) * t);
                        const g = Math.round(0x00 + (0x23 - 0x00) * t);
                        const b = Math.round(0x00 + (0xa8 - 0x00) * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            // Closing ring every 120 frames
            if (frame % 120 === 0 && frame !== 0) {
                const count = 20;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 240;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#ff0000"
                    );
                    bullet._originX = cx + Math.cos(angle) * dist;
                    bullet._originY = cy + Math.sin(angle) * dist;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const dx = this.x - cx;
                        const dy = this.y - cy;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(1 - dist / 240, 1);
                        const r = Math.round(0xff + (0x3c - 0xff) * t);
                        const g = Math.round(0x00 + (0x23 - 0x00) * t);
                        const b = Math.round(0x00 + (0xa8 - 0x00) * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Kitsune (Nine Tails)",
        enemy: "Kitsune",
        run: (frame, cx, cy) => {
            // Nine arms — one for each tail
            if (frame % 4 === 0) {
                const arms = 9;
                const speed = 1 + (Math.sin(frame * 0.04) + 1) / 2 * 3;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.03) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff0000"
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
                        const r = Math.round(0xff + (0x3c - 0xff) * t);
                        const g = Math.round(0x00 + (0x23 - 0x00) * t);
                        const b = Math.round(0x00 + (0xa8 - 0x00) * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            // Counter spiral after frame 150
            if (frame > 150 && frame % 4 === 2) {
                const arms = 9;
                const speed = 1 + (Math.sin(frame * 0.04) + 1) / 2 * 2.5;
                for (let i = 0; i < arms; i++) {
                    const angle = -(frame * 0.03) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff0000"
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
                        const r = Math.round(0xff + (0x3c - 0xff) * t);
                        const g = Math.round(0x00 + (0x23 - 0x00) * t);
                        const b = Math.round(0x00 + (0xa8 - 0x00) * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Kitsune (God's Wrath)",
        enemy: "Kitsune",
        run: (frame, cx, cy) => {
            // Changes quadrant direction every 60 frames (roughly every second at 60fps)
            const quadrant = Math.floor(frame / 60) % 4;
            const quadrantOffset = quadrant * (Math.PI / 2);
    
            // Dense curtain from above
            if (frame % 3 === 0) {
                const xPos = Math.random() * cx * 2;
                const speed = 2 + Math.random() * 2.5;
                const bullet = new Bullet(xPos, -50,
                    (Math.random() - 0.5) * 0.4,
                    speed,
                    "#ff0000"
                );
                bullet._originX = cx;
                bullet._originY = cy;
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 150, 1);
                    const r = Math.round(0xff + (0x3c - 0xff) * t);
                    const g = Math.round(0x00 + (0x23 - 0x00) * t);
                    const b = Math.round(0x00 + (0xa8 - 0x00) * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
    
            // Quadrant burst every 10 frames, direction rotates every second
            if (frame % 10 === 0 && frame !== 0) {
                const count = 26;
                for (let i = 0; i < count; i++) {
                    const angle = quadrantOffset + (i / count) * (Math.PI * 2 / 4);
                    const speed = 3;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#ff0000"
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
                        const r = Math.round(0xff + (0x3c - 0xff) * t);
                        const g = Math.round(0x00 + (0x23 - 0x00) * t);
                        const b = Math.round(0x00 + (0xa8 - 0x00) * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },    
);