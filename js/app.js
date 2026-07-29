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

    crystal.addEventListener(
        "pointerdown",
        awakenCrystal
    );
}

init();