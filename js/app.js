const crystal = document.querySelector(".crystal");
const crystalWrapper = document.querySelector(".crystal-wrapper");
const particlesContainer = document.querySelector(".crystal-particles");

const PARTICLE_COUNT = 18;

let isAwakened = false;

/* =========================================
   Random helper
========================================= */

function random(min, max) {
    return Math.random() * (max - min) + min;
}

/* =========================================
   Create moving crystal particles
========================================= */

function createParticles() {
    particlesContainer.innerHTML = "";

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const particle = document.createElement("span");

        particle.className = "crystal-particle";

        const size = random(3, 5.5);

        const left = random(8, 84);
        const top = random(8, 84);

        const moveXStart = `${random(-8, -2)}px`;
        const moveYStart = `${random(4, 10)}px`;

        const moveXMid = `${random(3, 12)}px`;
        const moveYMid = `${random(-10, -3)}px`;

        const moveXEnd = `${random(-10, -3)}px`;
        const moveYEnd = `${random(2, 10)}px`;

        const duration = random(5, 9);
        const delay = random(-8, 0);

        particle.style.setProperty(
            "--size",
            `${size}px`
        );

        particle.style.setProperty(
            "--left",
            `${left}%`
        );

        particle.style.setProperty(
            "--top",
            `${top}%`
        );

        particle.style.setProperty(
            "--move-x-start",
            moveXStart
        );

        particle.style.setProperty(
            "--move-y-start",
            moveYStart
        );

        particle.style.setProperty(
            "--move-x-mid",
            moveXMid
        );

        particle.style.setProperty(
            "--move-y-mid",
            moveYMid
        );

        particle.style.setProperty(
            "--move-x-end",
            moveXEnd
        );

        particle.style.setProperty(
            "--move-y-end",
            moveYEnd
        );

        particle.style.setProperty(
            "--duration",
            `${duration}s`
        );

        particle.style.setProperty(
            "--delay",
            `${delay}s`
        );

        particlesContainer.appendChild(particle);
    }
}

/* =========================================
   Inner crystal stars
========================================= */

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

        star.style.fontSize =
            starData.size;

        star.style.setProperty(
            "--star-duration",
            starData.duration
        );

        star.style.setProperty(
            "--star-delay",
            starData.delay
        );

        particlesContainer.appendChild(star);
    });
}

/* =========================================
   Crystal awakening
========================================= */

function awakenCrystal() {
    if (isAwakened) {
        return;
    }

    isAwakened = true;

    crystal.classList.add(
        "is-awakening"
    );

    crystalWrapper.classList.add(
        "is-awakening"
    );
}

/* =========================================
   Start
========================================= */

function init() {
    createParticles();
    createInnerStars();

    crystal.addEventListener(
        "pointerdown",
        awakenCrystal
    );
}

init();