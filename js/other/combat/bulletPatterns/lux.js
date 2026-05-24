patternLibrary.push(
    {
        name: "Blacksout Spiral",
        run: function (frame, cx, cy) {
            const speed = 1;
            // At 60fps, every 60 frames = 1 second
            // Black for one second, normal for one second, repeating
            const cycleFrame = frame % 120;
            const color = (Date.now() % 2000) < 1000 ? "#000000" : "#3c23a8";
    
            for (let i = 0; i < 50; i++) {
                let angle = (frame * 0.5) + (i * (Math.PI * 2 / 50));
                bullets.push(new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, color));
            }
        }
    },    
    {
        name: "Spiral",
        enemy: "Lux",
        run: function (frame, cx, cy) {
            if (this._direction === undefined) {
                this._direction = 1;
                this._nextFlipFrame = frame + 30; // half second at 60 FPS
            }

            if (frame >= this._nextFlipFrame) {
                this._direction *= -1;
                this._nextFlipFrame = frame + 30; // half second at 60 FPS
            }

            const speed = 10;

            for (let i = 25; i < 50; i += 0.15) {
                let angle = (frame * 0.25 * this._direction) + (i * (Math.PI * 2 / 50));
                let t = 1 - (i / 50);

                let r = Math.floor(60 + (255 - 60) * t);
                let g = Math.floor(35 + (0 - 35) * t);
                let b = Math.floor(168 + (0 - 168) * t);

                let color = `rgb(${r}, ${g}, ${b})`;

                bullets.push(
                    new Bullet(
                        cx,
                        cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        color
                    )
                );
            }
        }
    },
    {
        name: "World Slash",
        enemy: "Lux",
        run: (frame, cx, cy) => {
            function hideBullet(bullet) {
                bullet.x = -99999;
                bullet.y = -99999;
                bullet.radius = 0;
                bullet.color = "rgba(0,0,0,0)";
                bullet.update = function () {};
            }

            function rotatePoint(x, y, angle) {
                return {
                    x: x * Math.cos(angle) - y * Math.sin(angle),
                    y: x * Math.sin(angle) + y * Math.cos(angle)
                };
            }

            function spawnHugeCrescentSlash(startX, startY, targetX, targetY, arenaW, arenaH, angleOffset = 0) {
                const baseAngle = Math.atan2(targetY - startY, targetX - startX) + angleOffset;
                const speed = 7;

                const anchor = {
                    x: startX,
                    y: startY,
                    vx: Math.cos(baseAngle) * speed,
                    vy: Math.sin(baseAngle) * speed
                };

                // large slash vars
                const outerRadius = 260;
                const innerRadius = 180;
                const arcStart = -1.1;
                const arcEnd = 1.1;
                const steps = 80;

                let first = true;

                // outer arc
                for (let i = 0; i <= steps; i++) {
                    const t = i / steps;
                    const a = arcStart + (arcEnd - arcStart) * t;
                    const localX = Math.cos(a) * outerRadius;
                    const localY = Math.sin(a) * outerRadius;
                    const rp = rotatePoint(localX, localY, baseAngle);

                    const bullet = new Bullet(startX + rp.x, startY + rp.y, 0, 0, "#ffffff");
                    bullet.radius = 14;
                    bullet._anchor = anchor;
                    bullet._offsetX = rp.x;
                    bullet._offsetY = rp.y;
                    bullet._leader = first;
                    bullet._tick = 0;

                    bullet.update = function () {
                        this._tick++;

                        if (this._leader) {
                            this._anchor.x += this._anchor.vx;
                            this._anchor.y += this._anchor.vy;
                        }

                        this.x = this._anchor.x + this._offsetX;
                        this.y = this._anchor.y + this._offsetY;

                        const t = Math.min(this._tick / 45, 1);
                        const r = Math.round(255 + (60 - 255) * t);
                        const g = Math.round(255 + (35 - 255) * t);
                        const b = Math.round(255 + (168 - 255) * t);
                        this.color = `rgb(${r},${g},${b})`;

                        if (
                            this.x < -500 || this.x > arenaW + 500 ||
                            this.y < -500 || this.y > arenaH + 500
                        ) {
                            hideBullet(this);
                        }
                    };

                    bullets.push(bullet);
                    first = false;
                }

                // inner arc
                for (let i = steps; i >= 0; i--) {
                    const t = i / steps;
                    const a = arcStart + (arcEnd - arcStart) * t;
                    const localX = Math.cos(a) * innerRadius + 35;
                    const localY = Math.sin(a) * innerRadius;
                    const rp = rotatePoint(localX, localY, baseAngle);

                    const bullet = new Bullet(startX + rp.x, startY + rp.y, 0, 0, "#7a5cff");
                    bullet.radius = 11;
                    bullet._anchor = anchor;
                    bullet._offsetX = rp.x;
                    bullet._offsetY = rp.y;
                    bullet._leader = first;
                    bullet._tick = 0;

                    bullet.update = function () {
                        this._tick++;

                        if (this._leader) {
                            this._anchor.x += this._anchor.vx;
                            this._anchor.y += this._anchor.vy;
                        }

                        this.x = this._anchor.x + this._offsetX;
                        this.y = this._anchor.y + this._offsetY;

                        const t = Math.min(this._tick / 45, 1);
                        const r = Math.round(122 + (60 - 122) * t);
                        const g = Math.round(92 + (35 - 92) * t);
                        const b = Math.round(255 + (168 - 255) * t);
                        this.color = `rgb(${r},${g},${b})`;

                        if (
                            this.x < -500 || this.x > arenaW + 500 ||
                            this.y < -500 || this.y > arenaH + 500
                        ) {
                            hideBullet(this);
                        }
                    };

                    bullets.push(bullet);
                    first = false;
                }
            }

            const arenaW = cx * 2;
            const arenaH = cy * 2;
            const midX = cx;
            const midY = cy;

            if (frame % 1 === 0) {
                const roll = Math.floor(Math.random() * 4);

                if (roll === 0) {
                    // left -> center
                    spawnHugeCrescentSlash(-80, midY, midX, midY, arenaW, arenaH, 0.15);
                } else if (roll === 1) {
                    // right -> center
                    spawnHugeCrescentSlash(arenaW + 80, midY, midX, midY, arenaW, arenaH, -0.15);
                } else if (roll === 2) {
                    // top -> center
                    spawnHugeCrescentSlash(midX, -80, midX, midY, arenaW, arenaH, 0.15);
                } else {
                    // bottom -> center
                    spawnHugeCrescentSlash(midX, arenaH + 80, midX, midY, arenaW, arenaH, -0.15);
                }
            }
        }
    },
    {
        name: "Crescent Slash",
        enemy: "Lux",
        run: (() => {
            function rotatePoint(x, y, angle) {
                return {
                    x: x * Math.cos(angle) - y * Math.sin(angle),
                    y: x * Math.sin(angle) + y * Math.cos(angle)
                };
            }

            function spawnCrescentSlash(cx, cy, angle, speed = 6.5) {
                const anchor = {
                    x: cx,
                    y: cy,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed
                };

                const points = [];

                const outerRadius = 42;
                const innerRadius = 28;
                const arcStart = -0.9;
                const arcEnd = 0.9;
                const steps = 22;

                // Outer arc
                for (let i = 0; i <= steps; i++) {
                    const t = i / steps;
                    const a = arcStart + (arcEnd - arcStart) * t;
                    points.push({
                        x: Math.cos(a) * outerRadius,
                        y: Math.sin(a) * outerRadius,
                        color: "#ffffff",
                        radius: 4
                    });
                }

                // Inner arc, reversed, slightly offset to create the crescent blade shape
                for (let i = steps; i >= 0; i--) {
                    const t = i / steps;
                    const a = arcStart + (arcEnd - arcStart) * t;
                    points.push({
                        x: Math.cos(a) * innerRadius + 8,
                        y: Math.sin(a) * innerRadius,
                        color: "#7a5cff",
                        radius: 3
                    });
                }

                let first = true;

                for (const part of points) {
                    const rp = rotatePoint(part.x, part.y, angle);

                    const bullet = new Bullet(
                        anchor.x + rp.x,
                        anchor.y + rp.y,
                        0,
                        0,
                        part.color
                    );

                    bullet.radius = part.radius;
                    bullet._anchor = anchor;
                    bullet._offsetX = rp.x;
                    bullet._offsetY = rp.y;
                    bullet._leader = first;
                    bullet._tick = 0;

                    bullet.update = function () {
                        this._tick++;

                        if (this._leader) {
                            this._anchor.x += this._anchor.vx;
                            this._anchor.y += this._anchor.vy;
                        }

                        this.x = this._anchor.x + this._offsetX;
                        this.y = this._anchor.y + this._offsetY;

                        // Fade from white into Lux purple
                        const t = Math.min(this._tick / 40, 1);
                        const r = Math.round(255 + (60 - 255) * t);
                        const g = Math.round(255 + (35 - 255) * t);
                        const b = Math.round(255 + (168 - 255) * t);
                        this.color = `rgb(${r},${g},${b})`;

                        if (
                            this.x < -200 || this.x > canvas.width + 200 ||
                            this.y < -200 || this.y > canvas.height + 200
                        ) {
                            this.x = -99999;
                            this.y = -99999;
                            this.radius = 0;
                            this.update = function () {};
                        }
                    };

                    bullets.push(bullet);
                    first = false;
                }
            }

            return (frame, cx, cy) => {
                // Main slash more often
                if (frame % 25 === 0) {
                    const angle = Math.atan2(player.y - cy, player.x - cx);
                    spawnCrescentSlash(cx, cy, angle, 6.5);
                }

                // Double slash more often too
                if (frame % 50 === 0) {
                    const baseAngle = Math.atan2(player.y - cy, player.x - cx);
                    const angle1 = baseAngle + 0.4;
                    const angle2 = baseAngle - 0.4;

                    spawnCrescentSlash(cx, cy, angle1, 6);
                    spawnCrescentSlash(cx, cy, angle2, 6);
                }
            };
        })()
    },
    {
        name: "Cross Wrath Crescents",
        enemy: "Lux",
        run: (() => {
            function rotatePoint(x, y, angle) {
                return {
                    x: x * Math.cos(angle) - y * Math.sin(angle),
                    y: x * Math.sin(angle) + y * Math.cos(angle)
                };
            }

            function spawnSideCrescentSlash(startX, startY, angle, speed = 10) {
                const anchor = {
                    x: startX,
                    y: startY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed
                };

                const points = [];
                const outerRadius = 42;
                const innerRadius = 28;
                const arcStart = -0.9;
                const arcEnd = 0.9;
                const steps = 22;

                // Outer arc
                for (let i = 0; i <= steps; i++) {
                    const t = i / steps;
                    const a = arcStart + (arcEnd - arcStart) * t;
                    points.push({
                        x: Math.cos(a) * outerRadius,
                        y: Math.sin(a) * outerRadius,
                        color: "#ffffff",
                        radius: 4
                    });
                }

                // Inner arc
                for (let i = steps; i >= 0; i--) {
                    const t = i / steps;
                    const a = arcStart + (arcEnd - arcStart) * t;
                    points.push({
                        x: Math.cos(a) * innerRadius + 8,
                        y: Math.sin(a) * innerRadius,
                        color: "#7a5cff",
                        radius: 3
                    });
                }

                let first = true;

                for (const part of points) {
                    const rp = rotatePoint(part.x, part.y, angle);

                    const bullet = new Bullet(
                        anchor.x + rp.x,
                        anchor.y + rp.y,
                        0,
                        0,
                        part.color
                    );

                    bullet.radius = part.radius;
                    bullet._anchor = anchor;
                    bullet._offsetX = rp.x;
                    bullet._offsetY = rp.y;
                    bullet._leader = first;
                    bullet._tick = 0;

                    bullet.update = function () {
                        this._tick++;

                        if (this._leader) {
                            this._anchor.x += this._anchor.vx;
                            this._anchor.y += this._anchor.vy;
                        }

                        this.x = this._anchor.x + this._offsetX;
                        this.y = this._anchor.y + this._offsetY;

                        const t = Math.min(this._tick / 35, 1);
                        const r = Math.round(255 + (60 - 255) * t);
                        const g = Math.round(255 + (35 - 255) * t);
                        const b = Math.round(255 + (168 - 255) * t);
                        this.color = `rgb(${r},${g},${b})`;

                        if (
                            this.x < -250 || this.x > canvas.width + 250 ||
                            this.y < -250 || this.y > canvas.height + 250
                        ) {
                            this.x = -99999;
                            this.y = -99999;
                            this.radius = 0;
                            this.update = function () {};
                        }
                    };

                    bullets.push(bullet);
                    first = false;
                }
            }

            return (frame, cx, cy) => {
                if (frame % 20 !== 0) return;

                const numSlashesPerSide = Math.floor((Math.random() * 4) + 1);

                // Left side -> right
                for (let i = 0; i < numSlashesPerSide; i++) {
                    const slashY = Math.random() * (cy * 2);
                    const angle = ((Math.random() - 0.5) * 0.5); // mostly rightward
                    spawnSideCrescentSlash(-60, slashY, angle, 10 + Math.random() * 2);
                }

                // Right side -> left
                for (let i = 0; i < numSlashesPerSide; i++) {
                    const slashY = Math.random() * (cy * 2);
                    const angle = Math.PI + ((Math.random() - 0.5) * 0.5); // mostly leftward
                    spawnSideCrescentSlash((cx * 2) + 60, slashY, angle, 10 + Math.random() * 2);
                }
            };
        })()
    },

    {
        name: "Wrathful Crescents",
        enemy: "Lux",
        run: (() => {
            function rotatePoint(x, y, angle) {
                return {
                    x: x * Math.cos(angle) - y * Math.sin(angle),
                    y: x * Math.sin(angle) + y * Math.cos(angle)
                };
            }

            function spawnFallingCrescentSlash(startX, startY, angle, speed = 10) {
                const anchor = {
                    x: startX,
                    y: startY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed
                };

                const points = [];
                const outerRadius = 42;
                const innerRadius = 28;
                const arcStart = -0.9;
                const arcEnd = 0.9;
                const steps = 22;

                // Outer arc
                for (let i = 0; i <= steps; i++) {
                    const t = i / steps;
                    const a = arcStart + (arcEnd - arcStart) * t;
                    points.push({
                        x: Math.cos(a) * outerRadius,
                        y: Math.sin(a) * outerRadius,
                        color: "#ffffff",
                        radius: 4
                    });
                }

                // Inner arc
                for (let i = steps; i >= 0; i--) {
                    const t = i / steps;
                    const a = arcStart + (arcEnd - arcStart) * t;
                    points.push({
                        x: Math.cos(a) * innerRadius + 8,
                        y: Math.sin(a) * innerRadius,
                        color: "#7a5cff",
                        radius: 3
                    });
                }

                let first = true;

                for (const part of points) {
                    const rp = rotatePoint(part.x, part.y, angle);

                    const bullet = new Bullet(
                        anchor.x + rp.x,
                        anchor.y + rp.y,
                        0,
                        0,
                        part.color
                    );

                    bullet.radius = part.radius;
                    bullet._anchor = anchor;
                    bullet._offsetX = rp.x;
                    bullet._offsetY = rp.y;
                    bullet._leader = first;
                    bullet._tick = 0;

                    bullet.update = function () {
                        this._tick++;

                        if (this._leader) {
                            this._anchor.x += this._anchor.vx;
                            this._anchor.y += this._anchor.vy;
                        }

                        this.x = this._anchor.x + this._offsetX;
                        this.y = this._anchor.y + this._offsetY;

                        const t = Math.min(this._tick / 35, 1);
                        const r = Math.round(255 + (60 - 255) * t);
                        const g = Math.round(255 + (35 - 255) * t);
                        const b = Math.round(255 + (168 - 255) * t);
                        this.color = `rgb(${r},${g},${b})`;

                        if (
                            this.x < -250 || this.x > canvas.width + 250 ||
                            this.y < -250 || this.y > canvas.height + 250
                        ) {
                            this.x = -99999;
                            this.y = -99999;
                            this.radius = 0;
                            this.update = function () {};
                        }
                    };

                    bullets.push(bullet);
                    first = false;
                }
            }

            return (frame, cx, cy) => {
                if (frame % 20 !== 0) return;

                const numSlashes = Math.floor((Math.random() * 6) + 5);

                for (let i = 0; i < numSlashes; i++) {
                    const slashX = Math.random() * (cx * 2);

                    // Mostly downward, but slightly angled for chaos
                    const baseAngle = (Math.PI / 2) + ((Math.random() - 0.5) * 0.5);

                    // Spawn just above the arena
                    spawnFallingCrescentSlash(slashX, -60, baseAngle, 10 + Math.random() * 2);
                }
            };
        })()
    },
    {
        name: "Chaos",
        enemy: "Lux",
        run: (frame, cx, cy) => {

            // --- Phase 1: Calm, expanding symmetrical ring ---
            if (frame % 90 === 0) { // slower spawn rate
                const ringCount = 16; // fewer bullets per ring
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 1.2; // slower
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff0000");
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

            // --- Phase 2: Sparse spiral ---
            if (frame > 180) { // kicks in later
                const spiralCount = 3; // fewer arms
                for (let i = 0; i < spiralCount; i++) {
                    const angle = (frame * 0.02) + (i * (Math.PI * 2 / spiralCount)); // slower rotation
                    const speed = 1.5 + Math.min(frame / 800, 2); // slower and gentler ramp
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#3c23a8");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 250, 1);
                        const r = Math.round(0x3c + (0xff - 0x3c) * t);
                        const g = Math.round(0x23 + (0x00 - 0x23) * t);
                        const b = Math.round(0xa8 + (0x00 - 0xa8) * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Phase 3: Cross beams, thinner and less frequent ---
            if (frame > 420 && frame % 120 === 0) { // kicks in later, less frequent
                const arms = 4;
                const bulletsPerArm = 10; // thinner beams
                for (let a = 0; a < arms; a++) {
                    const baseAngle = (a / arms) * Math.PI * 2;
                    for (let j = 0; j < bulletsPerArm; j++) {
                        const spread = (j / bulletsPerArm - 0.5) * 0.1; // tighter spread
                        const angle = baseAngle + spread;
                        const speed = 3 + (j / bulletsPerArm) * 3; // slower
                        const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff0000");
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

        }
    },
    {
        name: "Lux (Envy)",
        enemy: "Lux",
        run: (frame, cx, cy) => {
            const spiralCount = 5;
            for (let i = 0; i < spiralCount; i++) {
                const angle = (frame * 0.04) + (i * (Math.PI * 2 / spiralCount));
                const speed = 2.5;
                const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#00ff88");
                bullet._originX = cx;
                bullet._originY = cy;
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const dx = this.x - this._originX;
                    const dy = this.y - this._originY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const t = Math.min(dist / 300, 1);
                    // green gradianting into purple
                    const r = Math.round(0x00 + 0x66 * t);
                    const g = Math.round(0xff - 0xff * t);
                    const b = Math.round(0x88 + 0x77 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
            if (frame > 120) {
                for (let i = 0; i < spiralCount; i++) {
                    const angle = -(frame * 0.04) + (i * (Math.PI * 2 / spiralCount));
                    const speed = 2.5;
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
        name: "Lux (Pride)",
        enemy: "Lux",
        run: (frame, cx, cy) => {
            if (frame % 60 === 0) {
                const ringCount = 32;
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
                        // Brilliant white to a cold imperial gold
                        const r = Math.round(0xff);
                        const g = Math.round(0xff - 0x5a * t);
                        const b = Math.round(0xff - 0xff * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame > 60) {
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.035) + (i * (Math.PI * 2 / arms));
                    const speed = 3;
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

                    // Mirror
                    const mirrorAngle = -(frame * 0.035) + (i * (Math.PI * 2 / arms));
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
        name: "Hailstorm",
        run: (frame, cx, cy) => {
            const speed = 1;
            const color = "#1e92d4";
            if (frame % 1 === 0) {
                bullets.push(new Bullet(Math.random() * canvas.width, -10, 0, speed, color));
                bullets.push(new Bullet(Math.random() * canvas.width, -10, 0, speed, color));
                bullets.push(new Bullet(Math.random() * canvas.width, -10, 0, speed, color));
            }
        }
    },
    {
        name: "Lux's Heartbeat",
        enemy: "Lux",
        run: (frame, cx, cy) => {
            if (frame % 3 !== 0) return;
    
            const speed = 1 + (Math.sin(frame * 0.05) + 1) / 2 * 14;
    
            for (let i = 0; i < 50; i++) {
                const angle = (frame * 0.5) + (i * (Math.PI * 2 / 50));
                const bullet = new Bullet(cx, cy,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    "#3c23a8"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 120, 1);
                    const r = Math.round(0x3c + 0xc3 * t);
                    const g = Math.round(0x23 * (1 - t));
                    const b = Math.round(0xa8 - 0x58 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
    
            // Closing ring on the "downbeat" of the heartbeat
            if (frame % 120 === 0) {
                const count = 24;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 260;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#ff0000"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "A Hell Of Your Own Making",
        enemy: "Lux",
        run: (frame, cx, cy) => {
            const isPulse = frame % 180 === 0 && frame !== 0;
            const color = isPulse ? "#3c23a8" : "#2e0000";
    
            for (let i = 0; i < 26; i++) {
                let angle = (frame * 0.5) + (i * (Math.PI * 2 / 26));
                bullets.push(new Bullet(cx, cy, Math.cos(angle) * 8, Math.sin(angle) * 8, color));
            }
        }
    },    
)