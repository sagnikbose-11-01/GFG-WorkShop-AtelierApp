// static/liquid-cursor.js

const COLORS = [
    "#FF0080", // Pink
    "#7928CA", // Purple
    "#0070F3", // Blue
    "#00DFD8", // Cyan
    "#FF4D4D", // Red
    "#FFD700", // Gold
];

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('liquid-cursor-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points = [];
    let mouse = { x: 0, y: 0, lastX: 0, lastY: 0, moved: false };
    let rafId = null;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.moved = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const addPoint = (x, y) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.5;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        points.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            maxLife: 1,
            radius: Math.random() * 20 + 10, // Random radius between 10 and 30
            color,
        });
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (mouse.moved) {
            const dist = Math.hypot(
                mouse.x - mouse.lastX,
                mouse.y - mouse.lastY
            );

            if (dist > 0) {
                const steps = Math.min(dist, 20);
                for (let i = 0; i < steps; i += 2) {
                    const t = i / steps;
                    const x = mouse.lastX + (mouse.x - mouse.lastX) * t;
                    const y = mouse.lastY + (mouse.y - mouse.lastY) * t;
                    if (Math.random() > 0.5) addPoint(x, y);
                }
            }

            mouse.lastX = mouse.x;
            mouse.lastY = mouse.y;
            mouse.moved = false;
        } else {
            mouse.lastX = mouse.x;
            mouse.lastY = mouse.y;
        }

        for (let i = points.length - 1; i >= 0; i--) {
            const p = points[i];

            p.life -= 0.01;
            p.x += p.vx;
            p.y += p.vy;
            p.radius *= 0.99;

            if (p.life <= 0 || p.radius < 0.5) {
                points.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        rafId = requestAnimationFrame(animate);
    };

    animate();
});
