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
)