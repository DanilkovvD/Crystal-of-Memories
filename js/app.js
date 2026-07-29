const crystal = document.querySelector(".crystal");
const crystalWrapper = document.querySelector(".crystal-wrapper");
const particlesContainer = document.querySelector(".crystal-particles");

const PARTICLE_COUNT = 16;

let particles = [];
let animationFrame = null;
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

        const size = random(3, 6);
        const x = random(12, 88);
        const y = random(12, 88);

        const particleData = {
            element: particle,

            baseX: x,
            baseY: y,

            offsetX: random(0, Math.PI * 2),
            offsetY: random(0, Math.PI * 2),

            speedX: random(0.00035, 0.0007),
            speedY: random(0.0003, 0.00065),

            amplitudeX: random(4, 12),
            amplitudeY: random(5, 14),

            size,
            opacity: random(0.55, 0.95)
        };

        particle.style.setProperty(
            "--size",
            `${size}px`
        );

        particle.style.setProperty(
            "--opacity",
            particleData.opacity
        );

        particlesContainer.appendChild(particle);

        particles.push(particleData);
    }
}

function animateParticles(timestamp) {
    const speedMultiplier = isAwakened ? 3.2 : 1;

    particles.forEach((particle) => {
        const timeX =
            timestamp * particle.speedX * speedMultiplier
            + particle.offsetX;

        const timeY =
            timestamp * particle.speedY * speedMultiplier
            + particle.offsetY;

        const x =
            particle.baseX
            + Math.sin(timeX) * particle.amplitudeX;

        const y =
            particle.baseY
            + Math.cos(timeY) * particle.amplitudeY;

        particle.element.style.transform =
            `translate3d(${x}%, ${y}%, 0)`;
    });

    animationFrame =
        window.requestAnimationFrame(animateParticles);
}

function createInnerStars() {
    const stars = [
        {
            symbol: "✦",
            left: "29%",
            top: "34%",
            size: "14px"
        },
        {
            symbol: "✧",
            left: "63%",
            top: "45%",
            size: "17px"
        },
        {
            symbol: "✦",
            left: "44%",
            top: "67%",
            size: "11px"
        }
    ];

    stars.forEach((starData, index) => {
        const star = document.createElement("span");

        star.className = "crystal-star";

        star.textContent = starData.symbol;

        star.style.left = starData.left;
        star.style.top = starData.top;
        star.style.fontSize = starData.size;

        star.style.animation =
            `innerStar${index + 1} ${5 + index}s ease-in-out infinite`;

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

createParticles();
createInnerStars();

animationFrame =
    window.requestAnimationFrame(animateParticles);

crystal.addEventListener("pointerdown", awakenCrystal);