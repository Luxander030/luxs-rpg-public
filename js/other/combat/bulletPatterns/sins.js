patternLibrary.push(
    {
        name: "[placeholder]",
        enemy: "Sloth",
    
        getRandomName: function () {
            const names = [
                "[Sloth was too lazy to name this attack]",
                "[placeholder]",
                "[Unnamed due to lack of effort]",
                "[Sloth couldn't be bothered to title this]",
                "[Name pending... probably forever]",
                "[insert effort here]"
            ];
    
            return names[Math.floor(Math.random() * names.length)];
        },
    
        run: function (frame, cx, cy) {
            if (frame % 180 !== 0) return;
    
            const count = 8;
    
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const speed = 0.4;
    
                const bullet = new Bullet(
                    cx,
                    cy,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    "#aaaaaa"
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
    
                    const r = Math.round(0xaa - 0xaa * t);
                    const g = Math.round(0xaa - 0x88 * t);
                    const b = Math.round(0xaa + (0xff - 0xaa) * t);
    
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
    
                bullets.push(bullet);
            }
        }
    },
    {
        name: "Coin Throw",
        enemy: "Greed",
        run: (frame, cx, cy) => {
            // Greedy spiral — starts sparse, gets increasingly dense and fast
            const spiralArms = 3;
            for (let i = 0; i < spiralArms; i++) {
                const angle = (frame * 0.05) + (i * (Math.PI * 2 / spiralArms));
                // Gets faster and more frequent the longer the fight goes — always wanting more
                const speed = 2 + Math.min(frame / 300, 5);
                const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ffd700");
                bullet._originX = cx;
                bullet._originY = cy;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._baseUpdate();
                    const dx = this.x - this._originX;
                    const dy = this.y - this._originY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const t = Math.min(dist / 300, 1);
                    // Gold fading to a deep orange — tarnished greed
                    const r = Math.round(0xff);
                    const g = Math.round(0xd7 - 0x97 * t);
                    const b = Math.round(0x00);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }

            // Occasional gold coin burst — "hoarding"
            if (frame % 120 === 0) {
                const burstCount = 20;
                for (let i = 0; i < burstCount; i++) {
                    const angle = (i / burstCount) * Math.PI * 2;
                    const speed = 1 + Math.random() * 3;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ffd700");
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Food Throw",
        enemy: "Gluttony",
        run: (() => {
            function rotatePoint(x, y, angle) {
                return {
                    x: x * Math.cos(angle) - y * Math.sin(angle),
                    y: x * Math.sin(angle) + y * Math.cos(angle)
                };
            }

            function createFoodAnchor(x, y, angle, speed) {
                return {
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    dead: false
                };
            }

            function spawnFoodShape(anchor, shape, rotation) {
                let first = true;

                for (const part of shape) {
                    const rp = rotatePoint(part.x, part.y, rotation);

                    const bullet = new Bullet(
                        anchor.x + rp.x,
                        anchor.y + rp.y,
                        0,
                        0,
                        part.color
                    );

                    bullet.radius = part.radius || 4;
                    bullet._anchor = anchor;
                    bullet._offsetX = rp.x;
                    bullet._offsetY = rp.y;
                    bullet._leader = first;
                    bullet.dead = false;

                    bullet.update = function () {
                        if (!this._anchor || this._anchor.dead) {
                            this.dead = true;
                            return;
                        }

                        // Only one bullet moves the whole food item
                        if (this._leader) {
                            this._anchor.x += this._anchor.vx;
                            this._anchor.y += this._anchor.vy;

                            if (
                                this._anchor.x < -120 ||
                                this._anchor.x > canvas.width + 120 ||
                                this._anchor.y < -120 ||
                                this._anchor.y > canvas.height + 120
                            ) {
                                this._anchor.dead = true;
                                this.dead = true;
                                return;
                            }
                        }

                        this.x = this._anchor.x + this._offsetX;
                        this.y = this._anchor.y + this._offsetY;
                    };

                    bullets.push(bullet);
                    first = false;
                }
            }

            const bananaShape = [
                { x: -10, y: 6, color: "#6b4f2a", radius: 2 },
                { x: -8, y: 4, color: "#6b4f2a", radius: 2 },
                { x: -7, y: 8, color: "#ffd54a", radius: 3 },
                { x: -5, y: 6, color: "#ffd54a", radius: 3 },
                { x: -3, y: 4, color: "#ffd54a", radius: 3 },
                { x: -1, y: 3, color: "#ffd54a", radius: 3 },
                { x: 1, y: 2, color: "#ffd54a", radius: 3 },
                { x: 3, y: 2, color: "#ffd54a", radius: 3 },
                { x: 5, y: 3, color: "#ffd54a", radius: 3 },
                { x: 7, y: 5, color: "#ffd54a", radius: 3 },
                { x: -5, y: 9, color: "#fff27a", radius: 2 },
                { x: -3, y: 7, color: "#fff27a", radius: 2 },
                { x: -1, y: 6, color: "#fff27a", radius: 2 },
                { x: 1, y: 5, color: "#fff27a", radius: 2 },
                { x: 3, y: 5, color: "#fff27a", radius: 2 },
                { x: 5, y: 6, color: "#fff27a", radius: 2 }
            ];

            const appleShape = [
                { x: 0, y: -8, color: "#6b4f2a", radius: 2 },
                { x: 2, y: -10, color: "#3fa34d", radius: 2 },
                { x: -4, y: -4, color: "#d62828", radius: 3 },
                { x: 0, y: -5, color: "#d62828", radius: 3 },
                { x: 4, y: -4, color: "#d62828", radius: 3 },
                { x: -6, y: 0, color: "#d62828", radius: 3 },
                { x: -2, y: 0, color: "#d62828", radius: 3 },
                { x: 2, y: 0, color: "#d62828", radius: 3 },
                { x: 6, y: 0, color: "#d62828", radius: 3 },
                { x: -4, y: 4, color: "#d62828", radius: 3 },
                { x: 0, y: 5, color: "#d62828", radius: 3 },
                { x: 4, y: 4, color: "#d62828", radius: 3 },
                { x: -2, y: -2, color: "#ff6b6b", radius: 1 }
            ];

            const breadShape = [
                { x: -8, y: -4, color: "#8b5e34", radius: 3 },
                { x: -4, y: -6, color: "#8b5e34", radius: 3 },
                { x: 0, y: -7, color: "#8b5e34", radius: 3 },
                { x: 4, y: -6, color: "#8b5e34", radius: 3 },
                { x: 8, y: -4, color: "#8b5e34", radius: 3 },
                { x: -8, y: 0, color: "#d9a066", radius: 3 },
                { x: -4, y: 0, color: "#f2c27b", radius: 3 },
                { x: 0, y: 0, color: "#f2c27b", radius: 3 },
                { x: 4, y: 0, color: "#f2c27b", radius: 3 },
                { x: 8, y: 0, color: "#d9a066", radius: 3 },
                { x: -6, y: 4, color: "#d9a066", radius: 3 },
                { x: -2, y: 5, color: "#f2c27b", radius: 3 },
                { x: 2, y: 5, color: "#f2c27b", radius: 3 },
                { x: 6, y: 4, color: "#d9a066", radius: 3 }
            ];

            const meatShape = [
                { x: -7, y: 0, color: "#f5e6cc", radius: 3 },
                { x: -10, y: 0, color: "#f5e6cc", radius: 2 },
                { x: -8, y: -3, color: "#f5e6cc", radius: 2 },
                { x: -8, y: 3, color: "#f5e6cc", radius: 2 },
                { x: -2, y: -5, color: "#b22222", radius: 3 },
                { x: 2, y: -6, color: "#b22222", radius: 3 },
                { x: 6, y: -4, color: "#b22222", radius: 3 },
                { x: -1, y: 0, color: "#c62828", radius: 4 },
                { x: 3, y: 0, color: "#c62828", radius: 4 },
                { x: 7, y: 0, color: "#c62828", radius: 3 },
                { x: -2, y: 5, color: "#b22222", radius: 3 },
                { x: 2, y: 6, color: "#b22222", radius: 3 },
                { x: 6, y: 4, color: "#b22222", radius: 3 },
                { x: 1, y: -2, color: "#ff7b7b", radius: 1 }
            ];

            const foodShapes = [bananaShape, appleShape, breadShape, meatShape];

            function fireFoodProjectile(cx, cy, targetX, targetY, shape, speed = 2) {
                const angle = Math.atan2(targetY - cy, targetX - cx);
                const anchor = createFoodAnchor(cx, cy, angle, speed);
                spawnFoodShape(anchor, shape, angle);
            }

            return (frame, cx, cy) => {
                // Main food throw
                if (frame % 5 === 0) {
                    const shape = foodShapes[Math.floor(Math.random() * foodShapes.length)];
                    fireFoodProjectile(cx, cy, player.x, player.y, shape, 2 + Math.random() * 1.2);
                }

                // Binge burst
                if (frame % 90 === 0) {
                    for (let i = 0; i < 16; i++) {
                        const angle = (Math.PI * 2 * i / 16) + (Math.random() - 0.5) * 0.3;
                        const shape = foodShapes[Math.floor(Math.random() * foodShapes.length)];
                        const targetX = cx + Math.cos(angle) * 100;
                        const targetY = cy + Math.sin(angle) * 100;
                        fireFoodProjectile(cx, cy, targetX, targetY, shape, 1.8 + Math.random());
                    }
                }
            };
        })()
    },
    {
        name: "Wrathful Strikes",
        enemy: "Wrath",
        run: (frame, cx, cy) => {
            if (frame % 20 !== 0) return;
            const numBolts = Math.floor((Math.random() * 6) + 5);
            const speed = 12;
            const boltHeight = 100;
            const bulletsPerBolt = 80;
            const zigzagFrequency = 5;
            const zigzagAmount = 25;

            for (let b = 0; b < numBolts; b++) {
                const boltX = Math.random() * (cx * 2);

                const offsets = [];
                for (let i = 0; i < bulletsPerBolt; i++) {
                    const progress = i / bulletsPerBolt;
                    const zigSegment = progress * zigzagFrequency;
                    const zigPhase = zigSegment % 1;
                    const zigDir = Math.floor(zigSegment) % 2 === 0 ? 1 : -1;
                    offsets.push(zigDir * (zigPhase - 0.5) * 2 * zigzagAmount);
                }

                const anchor = { bullet: null };

                for (let i = 0; i < bulletsPerBolt; i++) {
                    const yOffset = (i / bulletsPerBolt) * boltHeight;
                    const myXOffset = offsets[i];
                    const myYOffset = yOffset;
                    const isLeader = i === 0;

                    // Start just inside the cull boundary
                    const bullet = new Bullet(
                        boltX + myXOffset,
                        -50 + yOffset,
                        0, speed,
                        "#ff0000"
                    );

                    bullet._myXOffset = myXOffset;
                    bullet._myYOffset = myYOffset;
                    bullet._boltX = boltX;
                    bullet._anchor = anchor;
                    bullet._baseUpdate = bullet.update.bind(bullet);

                    if (isLeader) anchor.bullet = bullet;

                    bullet.update = function () {
                        this._baseUpdate();

                        if (!isLeader && this._anchor.bullet) {
                            this.x = this._boltX + this._myXOffset;
                            this.y = this._anchor.bullet.y + this._myYOffset;
                        }

                        const t = Math.min(this.y / 500, 1);
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
        name: "Envious Flower",
        enemy: "Envy",
        run: (frame, cx, cy) => {
            if (frame % 3 !== 0) return; // throttle spawn rate

            const spiralCount = 3; // fewer arms
            for (let i = 0; i < spiralCount; i++) {
                const angle = (frame * 0.04) + (i * (Math.PI * 2 / spiralCount));
                const speed = 2;
                const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#00ff88");
                bullet._originX = cx;
                bullet._originY = cy;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._baseUpdate();
                    const dx = this.x - this._originX;
                    const dy = this.y - this._originY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const t = Math.min(dist / 300, 1);
                    const r = Math.round(0x00 + 0x66 * t);
                    const g = Math.round(0xff - 0xff * t);
                    const b = Math.round(0x88 + 0x77 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }

            // Counter-spiral kicks in later and is sparser
            if (frame > 300) {
                if (frame % 6 !== 0) return; // even more throttled
                for (let i = 0; i < spiralCount; i++) {
                    const angle = -(frame * 0.04) + (i * (Math.PI * 2 / spiralCount));
                    const speed = 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#00ff88");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = Math.round(0x00 + 0x66 * t);
                        const g = Math.round(0xff - 0xff * t);
                        const b = Math.round(0x88 + 0x77 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Prideful Wall",
        enemy: "Pride",
        run: (frame, cx, cy) => {
            // Rings every 90 frames — still feels grand but not overwhelming
            if (frame % 90 === 0) {
                const ringCount = 16;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 1.8;
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
                        const r = Math.round(0xff);
                        const g = Math.round(0xff - 0x5a * t);
                        const b = Math.round(0xff - 0xff * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // Single spiral with mirror, but throttled
            if (frame > 120 && frame % 4 !== 0) return;
            if (frame > 120) {
                const arms = 3; // reduced from 4
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.025) + (i * (Math.PI * 2 / arms));
                    const speed = 2.5;
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
                        const r = Math.round(0xff);
                        const g = Math.round(0xff - 0x5a * t);
                        const b = Math.round(0xff - 0xff * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);

                    const mirrorAngle = -(frame * 0.025) + (i * (Math.PI * 2 / arms));
                    const mb = new Bullet(cx, cy, Math.cos(mirrorAngle) * speed, Math.sin(mirrorAngle) * speed, "#ffffff");
                    mb._originX = cx;
                    mb._originY = cy;
                    mb._baseUpdate = mb.update.bind(mb);
                    mb.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = Math.round(0xff);
                        const g = Math.round(0xff - 0x5a * t);
                        const b = Math.round(0xff - 0xff * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(mb);
                }
            }
        }
    },
    {
        name: "Pulling Heartbeat",
        enemy: "Lust",
        run: (frame, cx, cy) => {
            if (frame % 4 !== 0) return; // throttle the heartbeat spiral

            const waveCount = 4; // fewer arms
            for (let i = 0; i < waveCount; i++) {
                const angle = (frame * 0.03) + (i * (Math.PI * 2 / waveCount));
                const pulse = 1 + Math.sin(frame * 0.1) * 0.6;
                const speed = 1.8 * pulse;
                const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff69b4");
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
                    const g = Math.round(0x69 - 0x69 * t);
                    const b = Math.round(0xb4 - 0xb4 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }

            // Inward rings less frequent and spawn closer so there's more time to react
            if (frame % 160 === 0) {
                const ringCount = 14; // fewer bullets in the ring
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const spawnDist = 160; // closer spawn = more warning time
                    const spawnX = cx + Math.cos(angle) * spawnDist;
                    const spawnY = cy + Math.sin(angle) * spawnDist;
                    const speed = 1.2; // slower inward creep
                    const bullet = new Bullet(spawnX, spawnY, -Math.cos(angle) * speed, -Math.sin(angle) * speed, "#ff69b4");
                    bullets.push(bullet);
                }
            }
        }
    },
)