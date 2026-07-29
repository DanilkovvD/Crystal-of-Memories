const crystal = document.querySelector(".crystal");
const crystalWrapper = document.querySelector(".crystal-wrapper");

let isAwakened = false;

function awakenCrystal() {
    if (isAwakened) {
        return;
    }

    isAwakened = true;

    crystal.classList.add("is-awakening");
    crystalWrapper.classList.add("is-awakening");
}

crystal.addEventListener("click", awakenCrystal);