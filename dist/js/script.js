const hamburgerBtn = document.querySelector(".header__menu-toggle");
const navList = document.querySelector(".header__nav-list");
const body = document.body;

hamburgerBtn.addEventListener("click", () => {
    const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    
    // Přepínání aria atributů pro accessibility
    hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
    hamburgerBtn.setAttribute("aria-label", !isExpanded ? "Zavřít navigaci" : "Otevřít navigaci");
    
    // Přepínání tříd 
    hamburgerBtn.classList.toggle("is-active");
    navList.classList.toggle("header__nav-list--visible");
    
    // Zabránit scrollování při otevřeném menu
    body.classList.toggle("no-scroll", !isExpanded);
    
    // Focus management - po otevření focus na první odkaz
    if (!isExpanded) {
        const firstNavLink = navList.querySelector(".header__nav-link");
        setTimeout(() => firstNavLink?.focus(), 100);
    }
});

// Zavřít menu při kliku na odkaz
const navLinks = document.querySelectorAll(".header__nav-link");
navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Zavřít menu při kliku mimo navigaci
document.addEventListener("click", (e) => {
    if (!e.target.closest(".header__nav-list") && 
        !e.target.closest(".header__menu-toggle") && 
        navList.classList.contains("header__nav-list--visible")) {
        closeMenu();
    }
});

// Zavřít menu při stisknutí ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navList.classList.contains("header__nav-list--visible")) {
        closeMenu();
        hamburgerBtn.focus(); // Vrátit focus na hamburger
    }
});

// Helper funkce pro zavření menu
function closeMenu() {
    hamburgerBtn.classList.remove("is-active");
    navList.classList.remove("header__nav-list--visible");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Otevřít navigaci");
    body.classList.remove("no-scroll");
}

// Responsive - zavřít menu při změně velikosti okna
window.addEventListener("resize", () => {
    if (window.innerWidth > 860 && navList.classList.contains("header__nav-list--visible")) {
        closeMenu();
    }
});


// active navigation
const currentLocation = location.href;
const menuItem = document.querySelectorAll(".header__nav-link");
const menuLength = menuItem.length;

for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].classList.add("active");
    };
};

// animation
function startTypewriter() {
    const element = document.getElementById('typewriter');
    const text = 'Nožičková';
    let i = 0;
    
    element.textContent = '';
    element.classList.remove('typing-complete');
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                element.classList.add('typing-complete');
            }, 1000);
        }
    }, 200);
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(startTypewriter, 1000);
});