const crystal = document.querySelector(".crystal");
const crystalWrapper = document.querySelector(".crystal-wrapper");
const particlesContainer = document.querySelector(".crystal-particles");

const PARTICLE_COUNT = 18;

let particles = [];
let isAwakened = false;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createParticles() {
    particlesContainer.innerHTML = "";

    particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const particle = document.createElement("span");

        particle.className = "crystal-particle";

        const size = random(3, 5.5);

        /*
         * Положение задаём непосредственно
         * через left/top.
         *
         * Это специально сделано без процентов
         * внутри transform, чтобы Safari
         * не путал систему координат.
         */

        const startX = random(10, 84);
        const startY = random(10, 84);

        particle.style.setProperty(
            "--size",
            `${size}px`
        );

        particle.style.setProperty(
            "--start-x",
            `${startX}%`
        );

        particle.style.setProperty(
            "--start-y",
            `${startY}%`
        );

        particle.style.setProperty(
            "--opacity",
            random(0.65, 1).toFixed(2)
        );

        particlesContainer.appendChild(particle);

        particles.push({
            element: particle,

            x: startX,
            y: startY,

            angleX: random(0, Math.PI * 2),
            angleY: random(0, Math.PI * 2),

            speedX: random(0.00025, 0.00055),
            speedY: random(0.0002, 0.0005),

            distanceX: random(3, 9),
            distanceY: random(4, 11)
        });
    }
}

function animateParticles(timestamp) {
    const multiplier = isAwakened ? 3.5 : 1;

    particles.forEach((particle) => {
        const waveX =
            Math.sin(
                timestamp * particle.speedX * multiplier
                + particle.angleX
            );

        const waveY =
            Math.cos(
                timestamp * particle.speedY * multiplier
                + particle.angleY
            );

        const x =
            waveX * particle.distanceX;

        const y =
            waveY * particle.distanceY;

        particle.element.style.transform =
            `translate3d(${x}px, ${y}px, 0)`;
    });

    window.requestAnimationFrame(animateParticles);
}

function createInnerStars() {
    const stars = [
        {
            symbol: "✦",
            left: "27%",
            top: "30%",
            size: "13px",
            duration: "5.5s",
            delay: "-1s"
        },
        {
            symbol: "✧",
            left: "62%",
            top: "43%",
            size: "16px",
            duration: "6.5s",
            delay: "-3s"
        },
        {
            symbol: "✦",
            left: "43%",
            top: "68%",
            size: "11px",
            duration: "5s",
            delay: "-2s"
        }
    ];

    stars.forEach((starData) => {
        const star = document.createElement("span");

        star.className = "crystal-star";

        star.textContent = starData.symbol;

        star.style.left = starData.left;
        star.style.top = starData.top;
        star.style.fontSize = starData.size;

        star.style.animation =
            `innerStarFloat ${starData.duration} ease-in-out infinite`;

        star.style.animationDelay =
            starData.delay;

        particlesContainer.appendChild(star);
    });
}

function awakenCrystal() {
    if (isAwakened) {
        return;
    }

    isAwakened = true;

    crystal.classList.add("is-awakening");

    crystalWrapper.classList.add("is-awakening");
}

function setup() {
    createParticles();
    createInnerStars();

    window.requestAnimationFrame(
        animateParticles
    );

    crystal.addEventListener(
        "pointerdown",
        awakenCrystal
    );
}

setup();