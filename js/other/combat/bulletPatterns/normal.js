patternLibrary.push(
    {
        name: "Strike",
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
        name: "Shadow Swarm",
        enemy: "Shadow Imp",
        run: (frame, cx, cy) => {
            // Erratic bursts from random edges — imps dart in from the shadows
            if (frame % 30 === 0) {
                const side = Math.floor(Math.random() * 4);
                const count = 6;
    
                for (let i = 0; i < count; i++) {
                    let spawnX, spawnY, vx, vy;
    
                    switch (side) {
                        case 0: // top
                            spawnX = Math.random() * cx * 2;
                            spawnY = -50;
                            vx = (Math.random() - 0.5) * 3;
                            vy = 2 + Math.random() * 2;
                            break;
                        case 1: // bottom
                            spawnX = Math.random() * cx * 2;
                            spawnY = cy * 2 + 50;
                            vx = (Math.random() - 0.5) * 3;
                            vy = -(2 + Math.random() * 2);
                            break;
                        case 2: // left
                            spawnX = -50;
                            spawnY = Math.random() * cy * 2;
                            vx = 2 + Math.random() * 2;
                            vy = (Math.random() - 0.5) * 3;
                            break;
                        case 3: // right
                            spawnX = cx * 2 + 50;
                            spawnY = Math.random() * cy * 2;
                            vx = -(2 + Math.random() * 2);
                            vy = (Math.random() - 0.5) * 3;
                            break;
                    }
    
                    const bullet = new Bullet(spawnX, spawnY, vx, vy, "#cc44ff");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        // Wobble — imps never fly straight
                        this.vx += (Math.random() - 0.5) * 0.2;
                        this.vy += (Math.random() - 0.5) * 0.2;
                        this._baseUpdate();
    
                        const t = Math.min(this._tick / 100, 1);
                        const r = Math.round(0xcc + 0x33 * t);
                        const g = Math.round(0x44 - 0x44 * t);
                        const b = Math.round(0xff - 0x55 * t);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    };
    
                    bullets.push(bullet);
                }
            }
    
            // Occasional cheap shot directly at the player
            if (frame % 90 === 0) {
                const angle = Math.atan2(player.y - cy, player.x - cx);
                const speed = 4;
                const bullet = new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ff44ff");
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 60, 1);
                    const r = 0xff;
                    const g = Math.round(0x44 + 0xbb * t);
                    const b = 0xff;
                    this.color = `rgb(${r}, ${g}, ${b})`;
                };
                bullets.push(bullet);
            }
        }
    },    
    {
        name: "Spit",
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
        name: "Arrow Burst",
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
        name: "Arrow Burst",
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
        name: "Stone Strike",
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
        name: "Iron Strike",
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
)