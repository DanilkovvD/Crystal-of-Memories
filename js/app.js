const crystal = document.querySelector(".crystal");
const crystalWrapper = document.querySelector(".crystal-wrapper");
const particlesContainer = document.querySelector(".crystal-particles");
const PARTICLE_COUNT = 24;
let isAwakened = false;
/* =========================================
   Random helper
========================================= */
function random(min, max) {
    return Math.random() * (max - min) + min;
}
/* =========================================
   Create particles
========================================= */
function createParticles() {
    particlesContainer.innerHTML = "";
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const particle = document.createElement("span");
        particle.className = "crystal-particle";
        /*
         * Каждая частица получает:
         * - собственную позицию;
         * - собственную траекторию;
         * - собственную скорость;
         * - собственную задержку.
         *
         * Движение полностью выполняется CSS,
         * поэтому JavaScript не нагружает iPhone.
         */
        particle.style.setProperty(
            "--size",
            `${random(4, 6)}px`
        );
        particle.style.setProperty(
            "--left",
            `${random(10, 84)}%`
        );
        particle.style.setProperty(
            "--top",
            `${random(10, 84)}%`
        );
        particle.style.setProperty(
            "--x1",
            `${random(-9, -2)}px`
        );
        particle.style.setProperty(
            "--y1",
            `${random(3, 9)}px`
        );
        particle.style.setProperty(
            "--x2",
            `${random(3, 11)}px`
        );
        particle.style.setProperty(
            "--y2",
            `${random(-11, -3)}px`
        );
        particle.style.setProperty(
            "--x3",
            `${random(-10, -3)}px`
        );
        particle.style.setProperty(
            "--y3",
            `${random(3, 10)}px`
        );
        particle.style.setProperty(
            "--duration",
            `${random(5, 8)}s`
        );
        particle.style.setProperty(
            "--delay",
            `${random(-8, 0)}s`
        );
        particlesContainer.appendChild(
            particle
        );
    }
}
/* =========================================
   Inner stars
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
        star.textContent =
            starData.symbol;
        star.style.left =
            starData.left;
        star.style.top =
            starData.top;
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
        particlesContainer.appendChild(
            star
        );
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
   Init
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