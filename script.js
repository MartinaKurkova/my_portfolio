const hamburgerBtn = document.querySelector(".header__nav-hamburger");
const navList = document.querySelector(".header__nav-list");
const body = document.body; // Pro zabránění scrollování

hamburgerBtn.addEventListener("click", () => {
    const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    
    // Přepínání aria atributů pro accessibility
    hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
    
    // Přepínání tříd
    hamburgerBtn.classList.toggle("is-active");
    navList.classList.toggle("header__nav-list--visible");
    
    // Zabránit scrollování při otevřeném menu
    body.classList.toggle("no-scroll", !isExpanded);
});

// Zavřít menu při kliku na odkaz (volitelné - pro lepší UX)
const navLinks = document.querySelectorAll(".header__nav-link");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("is-active");
        navList.classList.remove("header__nav-list--visible");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        body.classList.remove("no-scroll");
    });
});

// Zavřít menu při stisknutí ESC (accessibility)
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navList.classList.contains("header__nav-list--visible")) {
        hamburgerBtn.classList.remove("is-active");
        navList.classList.remove("header__nav-list--visible");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        body.classList.remove("no-scroll");
        hamburgerBtn.focus(); // Vrátit focus na hamburger
    }
});