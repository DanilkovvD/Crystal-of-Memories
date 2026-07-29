document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       Memory collection
    ========================================= */

    const memories = [
        "Сегодня я скучаю по тебе немного сильнее, чем вчера ❤️",
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
    const memoryCard = document.querySelector(".memory-card");
    const memoryMessage = document.querySelector(".memory-message");

    if (!crystalWrapper || !crystal || !memoryCard || !memoryMessage) {
        return;
    }

    /* =========================================
       State
    ========================================= */

    let isAnimating = false;
    let isAwakened = false;
    let lastMemoryIndex = -1;

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
            randomIndex = Math.floor(Math.random() * memories.length);
        } while (randomIndex === lastMemoryIndex);

        lastMemoryIndex = randomIndex;

        return memories[randomIndex];
    }

    /* =========================================
       Memory text
    ========================================= */

    function setMemoryText() {
        memoryMessage.textContent = getRandomMemory();
    }

    /* =========================================
       Restart CSS animations
    ========================================= */

    function restartAwakeningAnimation() {
        crystalWrapper.classList.remove("is-awakening");

        // Force browser reflow so the animation can start again.
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
         * The CSS controls the complete visual sequence:
         *
         * 1. Crystal wakes up
         * 2. Particles accelerate
         * 3. Energy ring appears
         * 4. Memory materializes
         * 5. Glass card reveals itself
         */

        window.setTimeout(() => {
            isAnimating = false;
        }, 4200);
    }

    /* =========================================
       New memory
    ========================================= */

    function showNewMemory() {
        if (isAnimating) {
            return;
        }

        isAnimating = true;

        /*
         * First hide the current card content.
         * The card itself remains in place.
         */
        memoryCard.style.transition =
            "opacity 0.45s ease, transform 0.45s ease";

        memoryCard.style.opacity = "0";
        memoryCard.style.transform =
            "translateY(10px) scale(0.96)";

        window.setTimeout(() => {
            setMemoryText();

            /*
             * Reset inline styles before restarting
             * the main CSS animation.
             */
            memoryCard.style.transition = "";
            memoryCard.style.opacity = "";
            memoryCard.style.transform = "";

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
        if (!isAwakened) {
            awakenCrystal();
            return;
        }

        showNewMemory();
    });

    /* =========================================
       Touch support
    ========================================= */

    crystal.addEventListener(
        "touchend",
        (event) => {
            event.preventDefault();
        },
        { passive: false }
    );

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
});