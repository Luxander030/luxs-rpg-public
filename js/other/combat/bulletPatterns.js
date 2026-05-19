const patternLibrary = [
    {
        name: "Lux (Spiral)",
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
        name: "Lux (World Slash)",
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

                // MUCH bigger slash
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
        name: "Lux (Crescent Slash)",
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
        name: "Lux (Cross Wrath Crescents)",
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
        name: "Lux (Wrathful Crescents)",
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
        name: "Lux (Chaos)",
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
            // Mimics the spiral pattern but twisted — wants to be something it's not
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
                    // Envious green twisting into a bitter purple
                    const r = Math.round(0x00 + 0x66 * t);
                    const g = Math.round(0xff - 0xff * t);
                    const b = Math.round(0x88 + 0x77 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }

            // Counter-spiral — envious of the player's own movement, fires the opposite way
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
            // Perfect, symmetrical, and overwhelming — Pride thinks it's flawless
            if (frame % 60 === 0) {
                const ringCount = 32; // large perfect ring
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

            // Mirrored double spiral — "I am simply better"
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
        name: "Kistune",
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
        name: "Kitsune Spiral",
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
        name: "Sloth",
        enemy: "Sloth",
        run: (frame, cx, cy) => {
            // Fires very infrequently, but bullets are nearly impossible to see coming
            if (frame % 180 !== 0) return; // extremely lazy fire rate

            const count = 8;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const speed = 0.4; // agonizingly slow
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
                    // Fades from grey to a dull blue — lifeless
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
        name: "Greed",
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
        name: "Gluttony",
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
        name: "Wrath",
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
        name: "Envy",
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
        name: "Pride",
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
        name: "Lust",
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
    {
        name: "Azmodan",
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
        name: "The Player's Mirror",
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
        name: "Obsidian Golem",
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
        name: "Gem Golem",
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
        name: "Duriel",
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
        name: "Will o' Wisp",
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
        name: "Fiery Will O' Wisp",
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
    {
        name: "Miss Circle",
        enemy: "Miss Circle",
        run: (frame, cx, cy) => {
            // --- Perfect expanding rings — compass drawing circles ---
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

            // --- Compass stab: a single sharp spike aimed outward, rotating slowly ---
            if (frame % 10 === 0) {
                const spikeAngle = frame * 0.03; // slowly rotates like a compass arm
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

            // --- Arc sweep: partial ring that sweeps around like a compass drawing ---
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
        name: "Miss Bloomie",
        enemy: "Miss Bloomie",
        run: (frame, cx, cy) => {
            // --- Box-cutter slashes: fast horizontal/vertical lines of bullets ---
            if (frame % 60 === 0) {
                const slashCount = 12;
                // Alternate between horizontal and vertical slashes
                const isHorizontal = Math.floor(frame / 60) % 2 === 0;
                for (let i = 0; i < slashCount; i++) {
                    const t = i / slashCount;
                    const spawnX = isHorizontal ? (cx * 2 * t) : cx + (Math.random() - 0.5) * 40;
                    const spawnY = isHorizontal ? cy + (Math.random() - 0.5) * 40 : (cy * 2 * t);
                    const vx = isHorizontal ? 0 : (Math.random() - 0.5) * 1.5;
                    const vy = isHorizontal ? (Math.random() - 0.5) * 1.5 : 0;
                    // Staggered speeds to look like a blade dragging across
                    const speed = 2 + (i / slashCount) * 3;
                    const bullet = new Bullet(spawnX, spawnY, vx + (isHorizontal ? 0 : 0), vy + (isHorizontal ? speed * 0.3 : 0), "#ff6688");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        // Hot pink to deep red — like a fresh cut
                        const r = Math.round(0xff);
                        const g = Math.round(0x66 - 0x66 * t);
                        const b = Math.round(0x88 - 0x88 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Snake tongue: two quick forked streams ---
            if (frame % 90 === 0) {
                const forkAngle = 0.18;
                const baseAngle = Math.random() * Math.PI * 2;
                for (let f = -1; f <= 1; f += 2) {
                    const count = 8;
                    for (let i = 0; i < count; i++) {
                        const angle = baseAngle + f * forkAngle;
                        const speed = 2 + i * 0.4; // staggered = stream effect
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
        name: "Miss Thavel",
        enemy: "Miss Thavel",
        run: (frame, cx, cy) => {
            // --- Claw swipes: 3 tight parallel streams fanning outward ---
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
                            // Paper white to a dark wendigo brown
                            const r = Math.round(0xe8 - 0x98 * t);
                            const g = Math.round(0xe8 - 0xc8 * t);
                            const b = Math.round(0xe8 - 0xe0 * t);
                            this.color = `rgb(${r}, ${g}, ${b})`;
                        };
                        bullets.push(bullet);
                    }
                }
            }

            // --- True form: wendigo antler burst — wide jagged spread ---
            if (frame > 200 && frame % 110 === 0) {
                // Two mirrored antler-like fans
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

            // --- Language scatter: random bursts of single bullets like letters thrown ---
            if (frame % 25 === 0) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1 + Math.random() * 3;
                const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aaaaaa");
                bullets.push(bullet);
            }
        }
    },
    {
        name: "Diamond Golem",
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
        name: "Iron-Plated Diamond Golem",
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
        name: "Mana Draining Wisp",
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
    {
        name: "Fire Elemental",
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
        name: "Air Elemental",
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
        name: "Water Elemental",
        name: "Water Elemental",
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
        name: "Earth Elemental",
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
        name: "Ice Elemental",
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
    {
        name: "Blood Bat",
        enemy: "Blood Bat",
        run: (frame, cx, cy) => {
            // --- Erratic swooping dives from above ---
            if (frame % 5 === 0) {
                const xPos = Math.random() * cx * 2;
                const angle = (Math.PI / 2) + (Math.random() - 0.5) * 0.8; // mostly downward with wobble
                const speed = 3 + Math.random() * 2;
                const bullet = new Bullet(xPos, -50,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    "#cc0022"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    // Slight erratic wobble — bats don't fly straight
                    this.vx += (Math.random() - 0.5) * 0.2;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 120, 1);
                    const r = Math.round(0xcc);
                    const g = Math.round(0x00 + 0x11 * t);
                    const b = Math.round(0x22 + 0x11 * t);
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
        }
    },
    {
        name: "Vampire",
        enemy: "Vampire",
        run: (frame, cx, cy) => {
            // --- Hypnotic slow spiral — drawing you in ---
            if (frame % 4 === 0) {
                const arms = 3;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.025) + (i * (Math.PI * 2 / arms));
                    const speed = 1.8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#880022");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        // Deep crimson to near black — like blood drying
                        const r = Math.round(0x88 + 0x44 * (1 - t));
                        const g = 0x00;
                        const b = Math.round(0x22 - 0x22 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Blood drain: inward closing ring ---
            if (frame % 140 === 0) {
                const ringCount = 14;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const spawnDist = 170;
                    const spawnX = cx + Math.cos(angle) * spawnDist;
                    const spawnY = cy + Math.sin(angle) * spawnDist;
                    const bullet = new Bullet(spawnX, spawnY,
                        -Math.cos(angle) * 1.5,
                        -Math.sin(angle) * 1.5,
                        "#cc0033"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Vampire Lord",
        enemy: "Vampire Lord",
        run: (frame, cx, cy) => {
            // --- Faster more aggressive spiral ---
            if (frame % 3 === 0) {
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.04) + (i * (Math.PI * 2 / arms));
                    const speed = 2.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aa0033");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        const r = Math.round(0xaa + 0x55 * (1 - t));
                        const g = 0x00;
                        const b = Math.round(0x33 - 0x33 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Bat swarm: erratic cluster from above ---
            if (frame % 50 === 0) {
                const count = 5;
                for (let i = 0; i < count; i++) {
                    const xPos = cx + (Math.random() - 0.5) * cx * 1.5;
                    const speed = 3 + Math.random() * 2;
                    const angle = (Math.PI / 2) + (Math.random() - 0.5) * 0.6;
                    const bullet = new Bullet(xPos, -50,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#880022"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.2;
                        this._baseUpdate();
                    };
                    bullets.push(bullet);
                }
            }

            // --- Blood nova: large burst ring ---
            if (frame % 120 === 0) {
                const count = 22;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff0033");
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
                        const g = 0x00;
                        const b = Math.round(0x33 - 0x33 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Vampire King",
        enemy: "Vampire King",
        run: (frame, cx, cy) => {
            // --- Royal blood spiral: dual counter-rotating spirals ---
            if (frame % 8 === 0) { // was every 2 frames
                const arms = 3; // was 5
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.035) + (i * (Math.PI * 2 / arms));
                    const speed = 2.8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff0044");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        const r = 0xff;
                        const g = Math.round(0x00 + 0x22 * t);
                        const b = Math.round(0x44 - 0x44 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            if (frame > 150 && frame % 8 === 0) { // was every 2 frames
                const arms = 3; // was 5
                for (let i = 0; i < arms; i++) {
                    const angle = -(frame * 0.035) + (i * (Math.PI * 2 / arms));
                    const speed = 2.8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#cc0033");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        const r = Math.round(0xcc + 0x33 * t);
                        const g = 0x00;
                        const b = Math.round(0x33 - 0x33 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // --- Massive bat swarm ---
            if (frame % 40 === 0) {
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const xPos = Math.random() * cx * 2;
                    const speed = 3.5 + Math.random() * 2.5;
                    const angle = (Math.PI / 2) + (Math.random() - 0.5) * 1.0;
                    const bullet = new Bullet(xPos, -50,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#660011"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.3;
                        this._baseUpdate();
                    };
                    bullets.push(bullet);
                }
            }

            // --- Crown of blood: rotating 8-pointed burst ---
            if (frame % 100 === 0) {
                const points = 8;
                for (let i = 0; i < points; i++) {
                    const baseAngle = (i / points) * Math.PI * 2 + (frame * 0.01);
                    const count = 5;
                    for (let j = 0; j < count; j++) {
                        const spread = (j - 2) * 0.1;
                        const speed = 2 + j * 0.6;
                        const bullet = new Bullet(cx, cy,
                            Math.cos(baseAngle + spread) * speed,
                            Math.sin(baseAngle + spread) * speed,
                            "#ff0044"
                        );
                        bullets.push(bullet);
                    }
                }
            }
        }
    },
    {
        name: "Gloom Weaver",
        enemy: "Gloom Weaver",
        run: (frame, cx, cy) => {
            // --- Slow creeping web: threads that drift outward unpredictably ---
            if (frame % 25 === 0) {
                const threads = 8;

                for (let i = 0; i < threads; i++) {
                    const angle = (i / threads) * Math.PI * 2;
                    const speed = 0.8 + Math.random() * 0.6;

                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#440066");
                    bullet._tick = 0;
                    bullet._angle = angle;
                    bullet._speed = speed;
                    bullet._baseUpdate = bullet.update.bind(bullet);

                    bullet.update = function () {
                        this._tick++;

                        // Slowly drift direction — like a web thread caught in wind
                        this._angle += (Math.random() - 0.5) * 0.06;
                        this.vx = Math.cos(this._angle) * this._speed;
                        this.vy = Math.sin(this._angle) * this._speed;

                        this._baseUpdate();

                        // Deep purple to very dark purple, but never full black
                        const t = Math.min(this._tick / 180, 1);
                        const r = Math.round(0x44 + (0x18 - 0x44) * t);
                        const g = 0x00;
                        const b = Math.round(0x66 + (0x28 - 0x66) * t);

                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };

                    bullets.push(bullet);
                }
            }

            // --- Nightmare pulse: sudden ring that expands then fades to dark violet ---
            if (frame % 150 === 0) {
                const ringCount = 16;

                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 2;

                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#9900cc");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);

                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();

                        const t = Math.min(this._tick / 120, 1);
                        const r = Math.round(0x99 + (0x22 - 0x99) * t);
                        const g = 0x00;
                        const b = Math.round(0xcc + (0x44 - 0xcc) * t);

                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };

                    bullets.push(bullet);
                }
            }

            // --- Sanity threads: slow diagonal drifters from corners ---
            if (frame % 60 === 0) {
                const corners = [
                    { x: 0, y: 0, vx: 1.5, vy: 1.5 },
                    { x: cx * 2, y: 0, vx: -1.5, vy: 1.5 },
                    { x: 0, y: cy * 2, vx: 1.5, vy: -1.5 },
                    { x: cx * 2, y: cy * 2, vx: -1.5, vy: -1.5 },
                ];

                for (const corner of corners) {
                    const bullet = new Bullet(corner.x, corner.y, corner.vx, corner.vy, "#660099");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);

                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();

                        const t = Math.min(this._tick / 150, 1);
                        const r = Math.round(0x66 + (0x20 - 0x66) * t);
                        const g = 0x00;
                        const b = Math.round(0x99 + (0x40 - 0x99) * t);

                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };

                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Void Stalker",
        enemy: "Void Stalker",
        run: (frame, cx, cy) => {
            // --- Stalking void tendrils: spawns from edges and homes loosely inward ---
            if (frame % 20 === 0) {
                const side = Math.floor(Math.random() * 4);
                let spawnX, spawnY, vx, vy;

                switch (side) {
                    case 0:
                        spawnX = Math.random() * cx * 2;
                        spawnY = -50;
                        vx = (Math.random() - 0.5) * 1;
                        vy = 2 + Math.random();
                        break;
                    case 1:
                        spawnX = Math.random() * cx * 2;
                        spawnY = cy * 2 + 50;
                        vx = (Math.random() - 0.5) * 1;
                        vy = -(2 + Math.random());
                        break;
                    case 2:
                        spawnX = -50;
                        spawnY = Math.random() * cy * 2;
                        vx = 2 + Math.random();
                        vy = (Math.random() - 0.5) * 1;
                        break;
                    case 3:
                        spawnX = cx * 2 + 50;
                        spawnY = Math.random() * cy * 2;
                        vx = -(2 + Math.random());
                        vy = (Math.random() - 0.5) * 1;
                        break;
                }

                const bullet = new Bullet(spawnX, spawnY, vx, vy, "#000033");
                bullet._tick = 0;
                bullet._vx = vx;
                bullet._vy = vy;
                bullet._baseUpdate = bullet.update.bind(bullet);

                bullet.update = function () {
                    this._tick++;

                    // Slowly drift toward center — it's stalking you
                    const dxToCenter = cx - this.x;
                    const dyToCenter = cy - this.y;
                    const dist = Math.sqrt(dxToCenter * dxToCenter + dyToCenter * dyToCenter) || 1;

                    this.vx += (dxToCenter / dist) * 0.04;
                    this.vy += (dyToCenter / dist) * 0.04;

                    this._baseUpdate();

                    // Dark navy to darker indigo, but never invisible
                    const t = Math.min(this._tick / 150, 1);
                    const r = 10;
                    const g = 0;
                    const b = Math.round(0x55 + (0x28 - 0x55) * t);

                    this.color = `rgb(${r}, ${g}, ${b})`;
                };

                bullets.push(bullet);
            }

            // --- Void collapse: ring that spawns far out and slowly closes in ---
            if (frame % 180 === 0) {
                const ringCount = 18;

                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const spawnDist = 220;
                    const spawnX = cx + Math.cos(angle) * spawnDist;
                    const spawnY = cy + Math.sin(angle) * spawnDist;
                    const speed = 1.2;

                    const bullet = new Bullet(
                        spawnX,
                        spawnY,
                        -Math.cos(angle) * speed,
                        -Math.sin(angle) * speed,
                        "#110022"
                    );

                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);

                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();

                        // Flickers, but with a visible minimum
                        const flicker = Math.sin(this._tick * 0.15) * 0.5 + 0.5;
                        const r = Math.round(18 + 18 * flicker);
                        const g = 0;
                        const b = Math.round(50 + 45 * flicker);

                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };

                    bullets.push(bullet);
                }
            }

            // --- Lux reference: single fast dark bullet fired every so often ---
            // "Lux stalks us all" — a reminder that something worse is out there
            if (frame % 200 === 0) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 5;

                const bullet = new Bullet(
                    cx,
                    cy,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    "#1a0033"
                );

                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);

                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();

                    const flicker = Math.sin(this._tick * 0.3) * 0.5 + 0.5;
                    const r = Math.round(16 + 18 * flicker);
                    const g = 0;
                    const b = Math.round(52 + 36 * flicker);

                    this.color = `rgb(${r}, ${g}, ${b})`;
                };

                bullets.push(bullet);
            }
        }
    },
    {
        name: "Glass Cannon the I",
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
        name: "Glass Cannon the II",
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
        name: "Glass Cannon the III",
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
        name: "Glass Cannon the IV",
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
        name: "Glass Cannon the V",
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
        name: "Shadow Imp",
        enemy: "Shadow Imp",
        run: (frame, cx, cy) => {
            // Quick erratic darts — imps are small and annoying
            if (frame % 20 === 0) {
                const count = 5;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 2 + Math.random() * 3;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#cc44ff");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        // Slight random wobble — imps are chaotic
                        this.vx += (Math.random() - 0.5) * 0.15;
                        this.vy += (Math.random() - 0.5) * 0.15;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        // Purple to bright magenta
                        const r = Math.round(0xcc + 0x33 * t);
                        const g = Math.round(0x44 - 0x44 * t);
                        const b = Math.round(0xff - 0x55 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Armored Beetle",
        enemy: "Armored Beetle",
        run: (frame, cx, cy) => {
            // Slow heavy ring — still not fast but more bullets
            if (frame % 60 === 0) {
                const count = 16; // was 8
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 1.5; // slightly faster
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#44bb44");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        const r = Math.round(0x44 + 0x44 * t);
                        const g = Math.round(0xbb - 0x55 * t);
                        const b = Math.round(0x44 - 0x33 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // Second offset ring — staggered so gaps from the first ring are covered
            if (frame % 60 === 30) {
                const count = 16;
                for (let i = 0; i < count; i++) {
                    const angle = ((i / count) * Math.PI * 2) + (Math.PI / count); // offset by half a gap
                    const speed = 1.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#33aa33");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        const r = Math.round(0x33 + 0x55 * t);
                        const g = Math.round(0xaa - 0x44 * t);
                        const b = Math.round(0x33 - 0x22 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Drow Elf",
        enemy: "Drow Elf",
        run: (frame, cx, cy) => {
            // Precise dark magic arrows — disciplined and devoted
            if (frame % 35 === 0) {
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 3.5;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#aa44ff");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        // Dark purple to electric violet — dark elf magic
                        const r = Math.round(0xaa - 0x44 * t);
                        const g = Math.round(0x44 + 0x44 * t);
                        const b = Math.round(0xff);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // Devotion burst — fires toward their god
            if (frame % 180 === 0) {
                const ringCount = 12;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff44ff");
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Elf",
        enemy: "Elf",
        run: (frame, cx, cy) => {
            // Light nature arrows — graceful and straightforward
            if (frame % 40 === 0) {
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 3;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#88ff44");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        // Bright green to golden — nature and light
                        const r = Math.round(0x88 + 0x77 * t);
                        const g = Math.round(0xff - 0x55 * t);
                        const b = Math.round(0x44 - 0x44 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 200 === 0) {
                const count = 10;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 1 + Math.random() * 3;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ffff88");
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Stone Golem",
        enemy: "Stone Golem",
        run: (frame, cx, cy) => {
            // Very slow heavy boulders from above
            if (frame % 50 === 0) {
                const xPos = Math.random() * cx * 2;
                const bullet = new Bullet(xPos, -50, (Math.random() - 0.5) * 0.3, 1.5, "#aaaaaa");
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 200, 1);
                    // Grey stone to darker granite
                    const v = Math.round(0xaa - 0x55 * t);
                    this.color = `rgb(${v}, ${v}, ${v + 10})`;
                };
                bullets.push(bullet);
            }

            // Slow ground tremor ring
            if (frame % 180 === 0) {
                const ringCount = 12;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, "#888888");
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Iron Golem",
        enemy: "Iron Golem",
        run: (frame, cx, cy) => {
            // Heavier and more frequent than Stone Golem
            if (frame % 35 === 0) {
                const cols = 3;
                for (let c = 0; c < cols; c++) {
                    const xPos = (cx * 2 / (cols + 1)) * (c + 1);
                    const bullet = new Bullet(xPos, -50, (Math.random() - 0.5) * 0.4, 2, "#aabbcc");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        // Steel blue-grey to dark iron
                        const r = Math.round(0xaa - 0x55 * t);
                        const g = Math.round(0xbb - 0x66 * t);
                        const b = Math.round(0xcc - 0x77 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }

            // Iron slam shockwave — heavier than stone
            if (frame % 130 === 0) {
                const ringCount = 16;
                for (let i = 0; i < ringCount; i++) {
                    const angle = (i / ringCount) * Math.PI * 2;
                    const speed = 1.8;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#99aabb");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        const r = Math.round(0x99 - 0x44 * t);
                        const g = Math.round(0xaa - 0x55 * t);
                        const b = Math.round(0xbb - 0x66 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
];