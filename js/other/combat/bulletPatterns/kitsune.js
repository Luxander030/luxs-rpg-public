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
)