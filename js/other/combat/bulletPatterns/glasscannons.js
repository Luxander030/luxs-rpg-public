patternLibrary.push(
    {
        name: "Strike",
        enemy: "Glass Cannon the I",
        run: (frame, cx, cy) => {
            // Fires one burst then goes quiet for a long time
            if (frame % 300 === 0) {
                const count = 30;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 1 + Math.random() * 4;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ffff00");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 80, 1);
                        const r = 0xff;
                        const g = Math.round(0xff - 0x99 * t);
                        const b = 0x00;
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Strike",
        enemy: "Glass Cannon the II",
        run: (frame, cx, cy) => {
            // Fires twice per cycle
            if (frame % 300 === 0 || frame % 300 === 60) {
                const count = 36;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 1.5 + Math.random() * 4.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ffcc00");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 90, 1);
                        const r = Math.round(0xff - 0xff * t);
                        const g = Math.round(0xcc + 0x33 * t);
                        const b = 0x00;
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Strike",
        enemy: "Glass Cannon the III",
        run: (frame, cx, cy) => {
            // Fires three times per cycle
            if (frame % 300 === 0 || frame % 300 === 50 || frame % 300 === 100) {
                const count = 40;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2 + Math.random() * 5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff8800");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        const r = 0xff;
                        const g = Math.round(0x88 - 0x88 * t);
                        const b = Math.round(0x00 + 0xff * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Strike",
        enemy: "Glass Cannon the IV",
        run: (frame, cx, cy) => {
            if (frame % 40 === 0) {
                const count = 44;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2 + Math.random() * 5.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff4400");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        const r = Math.round(0xff - 0xff * t);
                        const g = Math.round(0x44 + 0xbb * t);
                        const b = Math.round(0x00 + 0xff * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            if (frame % 70 === 0) {
                const angle = Math.random() * Math.PI * 2;
                const bullet = new Bullet(cx, cy, Math.cos(angle) * 8, Math.sin(angle) * 8, "#ffffff");
                bullets.push(bullet);
            }
        }
    },
    {
        name: "Strike",
        enemy: "Glass Cannon the V",
        run: (frame, cx, cy) => {
            if (frame % 30 === 0) {
                const count = 50;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2.5 + Math.random() * 6;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff0000");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        const r = 0xff;
                        const g = 0x00;
                        const b = Math.round(0x00 + 0xff * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // Lux nod every 150 frames
            if (frame % 150 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 1, Math.sin(angle) * 1, "#cc44ff");
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Strike",
        enemy: "Glass Cannon the VI",
        run: (frame, cx, cy) => {
            // Dual rings, offset by half, firing frequently
            if (frame % 25 === 0) {
                const count = 54;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 3 + Math.random() * 6.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff0066");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        const r = 0xff;
                        const g = Math.round(0x00 + 0x44 * t);
                        const b = Math.round(0x66 + 0x99 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            // Offset ring
            if (frame % 25 === 12) {
                const count = 54;
                for (let i = 0; i < count; i++) {
                    const angle = ((i / count) * Math.PI * 2) + (Math.PI / count);
                    const speed = 3 + Math.random() * 6.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#cc0044");
                    bullets.push(bullet);
                }
            }
            // Lux nod
            if (frame % 150 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 1, Math.sin(angle) * 1, "#cc44ff");
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Strike",
        enemy: "Glass Cannon the VII",
        run: (frame, cx, cy) => {
            // Triple ring burst, very fast
            if (frame % 20 === 0) {
                const count = 58;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 3.5 + Math.random() * 7;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aa00ff");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 90, 1);
                        const r = Math.round(0xaa - 0xaa * t);
                        const g = Math.round(0x00 + 0xff * t);
                        const b = Math.round(0xff - 0x55 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            // Second ring offset
            if (frame % 20 === 7) {
                const count = 58;
                for (let i = 0; i < count; i++) {
                    const angle = ((i / count) * Math.PI * 2) + (Math.PI / count);
                    const speed = 3.5 + Math.random() * 7;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#7700cc");
                    bullets.push(bullet);
                }
            }
            // Third ring offset
            if (frame % 20 === 14) {
                const count = 58;
                for (let i = 0; i < count; i++) {
                    const angle = ((i / count) * Math.PI * 2) + (Math.PI / count * 2);
                    const speed = 3.5 + Math.random() * 7;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#5500aa");
                    bullets.push(bullet);
                }
            }
            // Lux nod
            if (frame % 150 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 1, Math.sin(angle) * 1, "#cc44ff");
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Strike",
        enemy: "Glass Cannon the VIII",
        run: (frame, cx, cy) => {
            // Constant dense ring + fast random bullets
            if (frame % 15 === 0) {
                const count = 62;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 4 + Math.random() * 7.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#00ffcc");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 80, 1);
                        const r = Math.round(0x00 + 0xff * t);
                        const g = Math.round(0xff - 0x55 * t);
                        const b = Math.round(0xcc - 0xcc * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            // Random fast singles
            if (frame % 5 === 0) {
                const angle = Math.random() * Math.PI * 2;
                const bullet = new Bullet(cx, cy, Math.cos(angle) * 10, Math.sin(angle) * 10, "#ffffff");
                bullets.push(bullet);
            }
            // Lux nod
            if (frame % 150 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 1, Math.sin(angle) * 1, "#cc44ff");
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Strike",
        enemy: "Glass Cannon the IX",
        run: (frame, cx, cy) => {
            // Extremely dense ring every 10 frames
            if (frame % 10 === 0) {
                const count = 66;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 4.5 + Math.random() * 8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ffaa00");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 70, 1);
                        const r = Math.round(0xff);
                        const g = Math.round(0xaa - 0xaa * t);
                        const b = Math.round(0x00 + 0xff * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            // Spiral on top
            if (frame % 3 === 0) {
                const arms = 3;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.07) + (i * (Math.PI * 2 / arms));
                    const speed = 5 + Math.random() * 3;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff6600");
                    bullets.push(bullet);
                }
            }
            // Lux nod
            if (frame % 150 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 1, Math.sin(angle) * 1, "#cc44ff");
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Strike",
        enemy: "Glass Cannon the X",
        run: (frame, cx, cy) => {
            // Every single frame — pure chaos
            const count = 70;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const speed = 5 + Math.random() * 9;
                const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff0000");
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 60, 1);
                    const r = 0xff;
                    const g = 0x00;
                    const b = Math.round(0x00 + 0xff * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
            // Counter spiral
            if (frame % 2 === 0) {
                const arms = 5;
                for (let i = 0; i < arms; i++) {
                    const angle = -(frame * 0.08) + (i * (Math.PI * 2 / arms));
                    const speed = 6 + Math.random() * 4;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ffffff");
                    bullets.push(bullet);
                }
            }
            // Lux nod — more frequent on X, as a final taunt
            if (frame % 60 === 0) {
                const count = 12;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, "#cc44ff");
                    bullets.push(bullet);
                }
            }
        }
    },
)