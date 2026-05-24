patternLibrary.push(
    {
        name: "Strike",
        enemy: "Shadow Imp",
        run: (frame, cx, cy) => {
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
                        this.vx += (Math.random() - 0.5) * 0.15;
                        this.vy += (Math.random() - 0.5) * 0.15;
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
        }
    },
    {
        name: "Shadow Swarm",
        enemy: "Shadow Imp",
        run: (frame, cx, cy) => {
            if (frame % 30 === 0) {
                const side = Math.floor(Math.random() * 4);
                const count = 6;
                for (let i = 0; i < count; i++) {
                    let spawnX, spawnY, vx, vy;
                    switch (side) {
                        case 0: spawnX = Math.random() * cx * 2; spawnY = -50; vx = (Math.random() - 0.5) * 3; vy = 2 + Math.random() * 2; break;
                        case 1: spawnX = Math.random() * cx * 2; spawnY = cy * 2 + 50; vx = (Math.random() - 0.5) * 3; vy = -(2 + Math.random() * 2); break;
                        case 2: spawnX = -50; spawnY = Math.random() * cy * 2; vx = 2 + Math.random() * 2; vy = (Math.random() - 0.5) * 3; break;
                        case 3: spawnX = cx * 2 + 50; spawnY = Math.random() * cy * 2; vx = -(2 + Math.random() * 2); vy = (Math.random() - 0.5) * 3; break;
                    }
                    const bullet = new Bullet(spawnX, spawnY, vx, vy, "#cc44ff");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
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
                    this.color = `rgb(255, ${Math.round(0x44 + 0xbb * t)}, 255)`;
                };
                bullets.push(bullet);
            }
        }
    },
    {
        name: "Imp Frenzy",
        enemy: "Shadow Imp",
        run: (frame, cx, cy) => {
            // Dense chaotic spray that gets worse over time
            if (frame % 10 === 0) {
                const chaos = Math.min(frame / 200, 1);
                const count = Math.floor(3 + chaos * 5);
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 2 + Math.random() * (3 + chaos * 3);
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#cc44ff"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.25;
                        this.vy += (Math.random() - 0.5) * 0.25;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 80, 1);
                        this.color = `rgb(255, 0, ${Math.round(0xff - 0x55 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
            // Teleport burst — imp vanishes and reappears somewhere else
            if (frame % 100 === 0) {
                const spawnX = Math.random() * cx * 2;
                const spawnY = Math.random() * cy * 2;
                const count = 8;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(spawnX, spawnY,
                        Math.cos(angle) * 3,
                        Math.sin(angle) * 3,
                        "#ff44ff"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Dark Poke",
        enemy: "Shadow Imp",
        run: (frame, cx, cy) => {
            // Rapid targeted shots aimed near the player
            if (frame % 25 === 0) {
                const count = 3;
                for (let i = 0; i < count; i++) {
                    const spread = (i - 1) * 0.25;
                    const baseAngle = Math.atan2(player.y - cy, player.x - cx) + spread;
                    const speed = 3.5 + Math.random();
                    const bullet = new Bullet(cx, cy,
                        Math.cos(baseAngle) * speed,
                        Math.sin(baseAngle) * speed,
                        "#aa22ff"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this.vx += (Math.random() - 0.5) * 0.1;
                        this.vy += (Math.random() - 0.5) * 0.1;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 80, 1);
                        this.color = `rgb(${Math.round(0xaa + 0x55 * t)}, 0, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
            // Ring from the shadows every 110 frames
            if (frame % 110 === 0) {
                const count = 14;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 220;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#cc44ff"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Spit",
        enemy: "Armored Beetle",
        run: (frame, cx, cy) => {
            if (frame % 60 === 0) {
                const count = 16;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, "#44bb44");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        this.color = `rgb(${Math.round(0x44 + 0x44 * t)}, ${Math.round(0xbb - 0x55 * t)}, ${Math.round(0x44 - 0x33 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 60 === 30) {
                const count = 16;
                for (let i = 0; i < count; i++) {
                    const angle = ((i / count) * Math.PI * 2) + (Math.PI / count);
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, "#33aa33");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        this.color = `rgb(${Math.round(0x33 + 0x55 * t)}, ${Math.round(0xaa - 0x44 * t)}, ${Math.round(0x33 - 0x22 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Shell Burst",
        enemy: "Armored Beetle",
        run: (frame, cx, cy) => {
            // Slow heavy chunks from above
            if (frame % 45 === 0) {
                const count = 4;
                for (let i = 0; i < count; i++) {
                    const xPos = (cx * 2 / (count + 1)) * (i + 1);
                    const bullet = new Bullet(xPos, -50, (Math.random() - 0.5) * 0.5, 1.8, "#44bb44");
                    bullet.radius = 7;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 150, 1);
                        this.color = `rgb(${Math.round(0x44 + 0x33 * t)}, ${Math.round(0xbb - 0x66 * t)}, 0)`;
                    };
                    bullets.push(bullet);
                }
            }
            // Carapace shards: burst ring every 150 frames
            if (frame % 150 === 0) {
                const count = 20;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 1.2 + Math.random() * 1;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#55cc33"
                    );
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 250, 1);
                        this.color = `rgb(${Math.round(0x55 + 0x33 * t)}, ${Math.round(0xcc - 0x88 * t)}, 0)`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Acid Trail",
        enemy: "Armored Beetle",
        run: (frame, cx, cy) => {
            // Slow sweeping acid stream left to right
            if (frame % 5 === 0) {
                const sweep = Math.sin(frame * 0.03) * cx * 0.8;
                const bullet = new Bullet(cx + sweep, cy * 0.3,
                    Math.cos(frame * 0.03) * 0.5,
                    1.5 + Math.random() * 0.5,
                    "#88ff44"
                );
                bullet.radius = 5;
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 120, 1);
                    this.color = `rgb(${Math.round(0x88 - 0x44 * t)}, 255, 0)`;
                };
                bullets.push(bullet);
            }
            // Acid pool burst every 120 frames
            if (frame % 120 === 0) {
                const count = 12;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * 1.5,
                        Math.sin(angle) * 1.5,
                        "#aaff00"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        this.color = `rgb(${Math.round(0xaa * (1 - t))}, 255, 0)`;
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
            if (frame % 35 === 0) {
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 3.5, Math.sin(angle) * 3.5, "#aa44ff");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        this.color = `rgb(${Math.round(0xaa - 0x44 * t)}, ${Math.round(0x44 + 0x44 * t)}, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 180 === 0) {
                const count = 12;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    bullets.push(new Bullet(cx, cy, Math.cos(angle) * 2, Math.sin(angle) * 2, "#ff44ff"));
                }
            }
        }
    },
    {
        name: "Shadow Volley",
        enemy: "Drow Elf",
        run: (frame, cx, cy) => {
            // Precise aimed shots in tight spread
            if (frame % 40 === 0) {
                const baseAngle = Math.atan2(player.y - cy, player.x - cx);
                const count = 5;
                for (let i = 0; i < count; i++) {
                    const spread = (i - 2) * 0.18;
                    const speed = 4;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(baseAngle + spread) * speed,
                        Math.sin(baseAngle + spread) * speed,
                        "#8800ff"
                    );
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 100, 1);
                        this.color = `rgb(${Math.round(0x88 + 0x77 * t)}, 0, 255)`;
                    };
                    bullets.push(bullet);
                }
            }
            // Dark ritual ring every 160 frames
            if (frame % 160 === 0) {
                const count = 18;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const dist = 200;
                    const bullet = new Bullet(
                        cx + Math.cos(angle) * dist,
                        cy + Math.sin(angle) * dist,
                        -Math.cos(angle) * 2,
                        -Math.sin(angle) * 2,
                        "#aa44ff"
                    );
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Umbral Rain",
        enemy: "Drow Elf",
        run: (frame, cx, cy) => {
            // Dark arrows raining from above in waves
            if (frame % 8 === 0) {
                const xPos = Math.random() * cx * 2;
                const speed = 3 + Math.random() * 2;
                const bullet = new Bullet(xPos, -50,
                    (Math.random() - 0.5) * 0.4,
                    speed,
                    "#aa44ff"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 100, 1);
                    this.color = `rgb(${Math.round(0xaa - 0x55 * t)}, 0, ${Math.round(0xff - 0x55 * t)})`;
                };
                bullets.push(bullet);
            }
            // Spiral of dark magic
            if (frame % 5 === 0) {
                const arms = 3;
                const speed = 2;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.03) + (i * (Math.PI * 2 / arms));
                    bullets.push(new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#6600cc"
                    ));
                }
            }
        }
    },
    {
        name: "Arrow Burst",
        enemy: "Elf",
        run: (frame, cx, cy) => {
            if (frame % 40 === 0) {
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 3, Math.sin(angle) * 3, "#88ff44");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        this.color = `rgb(${Math.round(0x88 + 0x77 * t)}, ${Math.round(0xff - 0x55 * t)}, ${Math.round(0x44 - 0x44 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 200 === 0) {
                const count = 10;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 1 + Math.random() * 3;
                    bullets.push(new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "#ffff88"));
                }
            }
        }
    },
    {
        name: "Nature's Wrath",
        enemy: "Elf",
        run: (frame, cx, cy) => {
            // Leaf spiral — graceful and natural
            if (frame % 5 === 0) {
                const speed = 1 + (Math.sin(frame * 0.04) + 1) / 2 * 3;
                const arms = 4;
                for (let i = 0; i < arms; i++) {
                    const angle = (frame * 0.025) + (i * (Math.PI * 2 / arms));
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#88ff44"
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
                        this.color = `rgb(${Math.round(0x88 + 0x77 * t)}, ${Math.round(0xff - 0x99 * t)}, 0)`;
                    };
                    bullets.push(bullet);
                }
            }
            // Nature burst every 140 frames
            if (frame % 140 === 0) {
                const count = 16;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    bullets.push(new Bullet(cx, cy,
                        Math.cos(angle) * 2.5,
                        Math.sin(angle) * 2.5,
                        "#aaff44"
                    ));
                }
            }
        }
    },
    {
        name: "Forest Rain",
        enemy: "Elf",
        run: (frame, cx, cy) => {
            // Gentle but dense rain of nature arrows
            if (frame % 6 === 0) {
                const xPos = Math.random() * cx * 2;
                const speed = 2 + Math.random() * 1.5;
                const bullet = new Bullet(xPos, -50,
                    (Math.random() - 0.5) * 0.3,
                    speed,
                    "#88ff44"
                );
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 120, 1);
                    this.color = `rgb(${Math.round(0x88 + 0x77 * t)}, ${Math.round(0xff - 0x77 * t)}, 0)`;
                };
                bullets.push(bullet);
            }
            // Aimed shot every 80 frames
            if (frame % 80 === 0) {
                const angle = Math.atan2(player.y - cy, player.x - cx);
                const count = 3;
                for (let i = 0; i < count; i++) {
                    const spread = (i - 1) * 0.2;
                    bullets.push(new Bullet(cx, cy,
                        Math.cos(angle + spread) * 3.5,
                        Math.sin(angle + spread) * 3.5,
                        "#ffff44"
                    ));
                }
            }
        }
    },
    {
        name: "Stone Strike",
        enemy: "Stone Golem",
        run: (frame, cx, cy) => {
            if (frame % 50 === 0) {
                const xPos = Math.random() * cx * 2;
                const bullet = new Bullet(xPos, -50, (Math.random() - 0.5) * 0.3, 1.5, "#aaaaaa");
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 200, 1);
                    const v = Math.round(0xaa - 0x55 * t);
                    this.color = `rgb(${v}, ${v}, ${v + 10})`;
                };
                bullets.push(bullet);
            }
            if (frame % 180 === 0) {
                const count = 12;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    bullets.push(new Bullet(cx, cy, Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, "#888888"));
                }
            }
        }
    },
    {
        name: "Rockslide",
        enemy: "Stone Golem",
        run: (frame, cx, cy) => {
            // Dense column of boulders from above
            if (frame % 30 === 0) {
                const cols = 4;
                for (let i = 0; i < cols; i++) {
                    const xPos = (cx * 2 / (cols + 1)) * (i + 1);
                    const bullet = new Bullet(xPos, -50, (Math.random() - 0.5) * 0.3, 1.8, "#999999");
                    bullet.radius = 6;
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 180, 1);
                        const v = Math.round(0x99 - 0x44 * t);
                        this.color = `rgb(${v}, ${v}, ${v})`;
                    };
                    bullets.push(bullet);
                }
            }
            // Shockwave ring every 160 frames
            if (frame % 160 === 0) {
                const count = 18;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * 1.5,
                        Math.sin(angle) * 1.5,
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
                        const t = Math.min(dist / 250, 1);
                        const v = Math.round(0xaa - 0x55 * t);
                        this.color = `rgb(${v}, ${v}, ${v})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Granite Fist",
        enemy: "Stone Golem",
        run: (frame, cx, cy) => {
            // Slow sweeping wall of stone from one side
            if (frame % 8 === 0) {
                const yPos = Math.random() * cy * 2;
                const bullet = new Bullet(-50, yPos, 1.5, (Math.random() - 0.5) * 0.3, "#aaaaaa");
                bullet.radius = 7;
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 180, 1);
                    const v = Math.round(0xaa - 0x44 * t);
                    this.color = `rgb(${v}, ${v}, ${v})`;
                };
                bullets.push(bullet);
            }
            // Stomp: massive ring every 200 frames
            if (frame % 200 === 0) {
                const count = 24;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * 2,
                        Math.sin(angle) * 2,
                        "#cccccc"
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
                        const v = Math.round(0xcc - 0x77 * t);
                        this.color = `rgb(${v}, ${v}, ${v})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Iron Strike",
        enemy: "Iron Golem",
        run: (frame, cx, cy) => {
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
                        this.color = `rgb(${Math.round(0xaa - 0x55 * t)}, ${Math.round(0xbb - 0x66 * t)}, ${Math.round(0xcc - 0x77 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
            if (frame % 130 === 0) {
                const count = 16;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const bullet = new Bullet(cx, cy, Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, "#99aabb");
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 300, 1);
                        this.color = `rgb(${Math.round(0x99 - 0x44 * t)}, ${Math.round(0xaa - 0x55 * t)}, ${Math.round(0xbb - 0x66 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },
    {
        name: "Steel Barrage",
        enemy: "Iron Golem",
        run: (frame, cx, cy) => {
            // Dense columns of iron bolts — relentless and mechanical
            if (frame % 20 === 0) {
                const cols = 5;
                for (let c = 0; c < cols; c++) {
                    const xPos = (cx * 2 / (cols + 1)) * (c + 1);
                    const speed = 2.5 + Math.random() * 0.5;
                    const bullet = new Bullet(xPos, -50, (Math.random() - 0.5) * 0.3, speed, "#8899aa");
                    bullet._tick = 0;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._tick++;
                        this._baseUpdate();
                        const t = Math.min(this._tick / 120, 1);
                        this.color = `rgb(${Math.round(0x88 - 0x33 * t)}, ${Math.round(0x99 - 0x44 * t)}, ${Math.round(0xaa - 0x55 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
            // Iron slam: two closing rings at different speeds
            if (frame % 160 === 0) {
                [180, 260].forEach((dist, ri) => {
                    const count = 16 + ri * 4;
                    for (let i = 0; i < count; i++) {
                        const angle = (i / count) * Math.PI * 2;
                        const speed = 1.5 + ri * 0.5;
                        const bullet = new Bullet(
                            cx + Math.cos(angle) * dist,
                            cy + Math.sin(angle) * dist,
                            -Math.cos(angle) * speed,
                            -Math.sin(angle) * speed,
                            "#aabbcc"
                        );
                        bullets.push(bullet);
                    }
                });
            }
        }
    },
    {
        name: "Iron Curtain",
        enemy: "Iron Golem",
        run: (frame, cx, cy) => {
            // Sweeping wall of iron from alternating sides
            if (frame % 6 === 0) {
                const fromLeft = Math.floor(frame / 180) % 2 === 0;
                const yPos = Math.random() * cy * 2;
                const speed = 2.5;
                const bullet = new Bullet(
                    fromLeft ? -50 : cx * 2 + 50,
                    yPos,
                    fromLeft ? speed : -speed,
                    (Math.random() - 0.5) * 0.3,
                    "#99aabb"
                );
                bullet.radius = 5;
                bullet._tick = 0;
                bullet._baseUpdate = bullet.update.bind(bullet);
                bullet.update = function () {
                    this._tick++;
                    this._baseUpdate();
                    const t = Math.min(this._tick / 140, 1);
                    this.color = `rgb(${Math.round(0x99 - 0x44 * t)}, ${Math.round(0xaa - 0x55 * t)}, ${Math.round(0xbb - 0x66 * t)})`;
                };
                bullets.push(bullet);
            }
            // Mechanical pulse every 120 frames
            if (frame % 120 === 0) {
                const count = 20;
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    const speed = 2;
                    const bullet = new Bullet(cx, cy,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        "#aabbcc"
                    );
                    bullet._originX = cx;
                    bullet._originY = cy;
                    bullet._baseUpdate = bullet.update.bind(bullet);
                    bullet.update = function () {
                        this._baseUpdate();
                        const dx = this.x - this._originX;
                        const dy = this.y - this._originY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const t = Math.min(dist / 280, 1);
                        this.color = `rgb(${Math.round(0xaa - 0x55 * t)}, ${Math.round(0xbb - 0x66 * t)}, ${Math.round(0xcc - 0x77 * t)})`;
                    };
                    bullets.push(bullet);
                }
            }
        }
    },

);