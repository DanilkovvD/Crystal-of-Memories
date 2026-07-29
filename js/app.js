document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       Memory collection
    ========================================= */

    const memories = [
        "Если бы расстояние можно было уменьшить одной строчкой кода, я бы уже давно это сделал",
        "Ты - самое лучшие, что происходило со мной",
        "Даже самый обычный день становится немного лучше, если в нём есть ты",
        "Если бы мне пришлось выбирать одно место в мире, я бы выбрал то, где ты рядом",
        "Некоторые люди приходят в жизнь случайно. А потом становятся самым важным",
        "Мне нравится мысль о том, что где-то прямо сейчас есть человек, о котором я думаю. И это ты"
    ];

    /* =========================================
       Elements
    ========================================= */

    const crystalWrapper = document.querySelector(".crystal-wrapper");
    const crystal = document.querySelector(".crystal");
    const crystalParticles = document.querySelector(".crystal-particles");
    const memoryCard = document.querySelector(".memory-card");
    const memoryMessage = document.querySelector(".memory-message");

    if (
        !crystalWrapper ||
        !crystal ||
        !crystalParticles ||
        !memoryCard ||
        !memoryMessage
    ) {
        return;
    }

    /* =========================================
       State
    ========================================= */

    let isAnimating = false;
    let isAwakened = false;
    let lastMemoryIndex = -1;

    /* =========================================
       Crystal particles
    ========================================= */

    function createCrystalParticles() {
        const particleCount = 12;

        crystalParticles.innerHTML = "";

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("span");

            particle.className = "crystal-particle";

            const size = 4 + Math.random() * 4;

            const left = 22 + Math.random() * 56;
            const top = 22 + Math.random() * 56;

            const x1 = -12 + Math.random() * 24;
            const y1 = -10 + Math.random() * 20;

            const x2 = -22 + Math.random() * 44;
            const y2 = -24 + Math.random() * 48;

            const x3 = -18 + Math.random() * 36;
            const y3 = -16 + Math.random() * 32;

            const duration = 4.5 + Math.random() * 3.5;
            const delay = -Math.random() * duration;

            particle.style.setProperty(
                "--size",
                `${size.toFixed(1)}px`
            );

            particle.style.setProperty(
                "--left",
                `${left.toFixed(1)}%`
            );

            particle.style.setProperty(
                "--top",
                `${top.toFixed(1)}%`
            );

            particle.style.setProperty(
                "--x1",
                `${x1.toFixed(1)}px`
            );

            particle.style.setProperty(
                "--y1",
                `${y1.toFixed(1)}px`
            );

            particle.style.setProperty(
                "--x2",
                `${x2.toFixed(1)}px`
            );

            particle.style.setProperty(
                "--y2",
                `${y2.toFixed(1)}px`
            );

            particle.style.setProperty(
                "--x3",
                `${x3.toFixed(1)}px`
            );

            particle.style.setProperty(
                "--y3",
                `${y3.toFixed(1)}px`
            );

            particle.style.setProperty(
                "--duration",
                `${duration.toFixed(2)}s`
            );

            particle.style.setProperty(
                "--delay",
                `${delay.toFixed(2)}s`
            );

            crystalParticles.appendChild(particle);
        }
    }

    /* =========================================
       Memory selection
    ========================================= */

    function getRandomMemory() {
        if (memories.length === 0) {
            return "";
        }

        if (memories.length === 1) {
            lastMemoryIndex = 0;
            return memories[0];
        }

        let randomIndex;

        do {
            randomIndex = Math.floor(
                Math.random() * memories.length
            );
        } while (randomIndex === lastMemoryIndex);

        lastMemoryIndex = randomIndex;

        return memories[randomIndex];
    }

    /* =========================================
       Set memory text
    ========================================= */

    function setMemoryText() {
        memoryMessage.textContent = getRandomMemory();
    }

    /* =========================================
       Restart awakening animation
    ========================================= */

    function restartAwakeningAnimation() {
        crystalWrapper.classList.remove("is-awakening");

        /*
         * Force browser reflow.
         * This allows the same CSS animation
         * to be started again.
         */
        void crystalWrapper.offsetWidth;

        crystalWrapper.classList.add("is-awakening");
    }

    /* =========================================
       First awakening
    ========================================= */

    function awakenCrystal() {
        if (isAnimating) {
            return;
        }

        isAnimating = true;
        isAwakened = true;

        setMemoryText();

        restartAwakeningAnimation();

        /*
         * Keep the animation locked while
         * the complete awakening sequence runs.
         */
        window.setTimeout(() => {
            isAnimating = false;
        }, 4200);
    }

    /* =========================================
       Show another memory
    ========================================= */

    function showNewMemory() {
        if (isAnimating) {
            return;
        }

        isAnimating = true;

        /*
         * Temporarily hide the current card.
         */
        memoryCard.style.transition =
            "opacity 0.45s ease, transform 0.45s ease";

        memoryCard.style.opacity = "0";

        memoryCard.style.transform =
            "translateY(10px) scale(0.96)";

        window.setTimeout(() => {
            /*
             * Choose a new memory.
             */
            setMemoryText();

            /*
             * Reset inline styles.
             */
            memoryCard.style.transition = "";
            memoryCard.style.opacity = "";
            memoryCard.style.transform = "";

            /*
             * Restart the complete awakening sequence.
             */
            restartAwakeningAnimation();

            window.setTimeout(() => {
                isAnimating = false;
            }, 4200);
        }, 500);
    }

    /* =========================================
       Crystal interaction
    ========================================= */

    crystal.addEventListener("click", () => {
        if (isAnimating) {
            return;
        }

        if (!isAwakened) {
            awakenCrystal();
            return;
        }

        showNewMemory();
    });

    /* =========================================
       Accessibility
    ========================================= */

    crystal.setAttribute(
        "aria-label",
        "Открыть воспоминание"
    );

    crystal.setAttribute(
        "role",
        "button"
    );

    /* =========================================
       Initial state
    ========================================= */

    memoryMessage.textContent = "";

    crystalWrapper.classList.remove("is-awakening");

    /*
     * Create particles immediately so they
     * are visible and animated from page load.
     */
    createCrystalParticles();
});