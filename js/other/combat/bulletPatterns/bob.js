patternLibrary.push(
    {
        name: "Bob's Attack",
        enemy: "Bob",
        run: (frame, cx, cy) => {
            const speed = 4;
            const color = "#3c23a8";
            for (let i = 0; i < 50; i++) {
                let angle = (frame * 0.21) + (i * (Math.PI * 2 / 50));
                bullets.push(new Bullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, color));
            }
        }
    },
)