const menuButton = document.querySelector(".list-button");
const nav = document.querySelector("#page-list");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("is-open");

    const isOpen = nav.classList.contains("is-open");

    if (isOpen) {
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close menu");
    } else {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
    }
})