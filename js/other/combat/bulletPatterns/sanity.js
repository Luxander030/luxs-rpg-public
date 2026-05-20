patternLibrary.push(
    {
        name: "Nightmare Stalk",
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
        name: "Void Strike",
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
)