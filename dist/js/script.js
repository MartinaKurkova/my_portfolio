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


// error 404
// Zobrazení adresy, kterou uživatel hledal
const path = window.location.pathname;
document.querySelector('.wrong-path').textContent = path



// form
// KONFIGURACE A VÝBĚR PRVKŮ
  const contactForm = document.querySelector('form[action*="web3forms"]');
  const statusMessage = document.getElementById('form-status');
  const submitButton = contactForm.querySelector('.contact-form__button');

  // Funkce pro vyčištění všech předchozích chyb
  const clearErrors = () => {
    document.querySelectorAll('.contact-form__error').forEach(el => el.textContent = "");
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    statusMessage.textContent = "";
    statusMessage.style.color = "inherit";
  };

// HLAVNÍ FUNKCE ODESLÁNÍ
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Zastavíme klasické odeslání
    clearErrors();

    // 1. RUČNÍ KONTROLA VALIDITY
    if (!contactForm.checkValidity()) {
      
      // Kontrola Jména
      const jmeno = document.getElementById('jmeno');
      if (!jmeno.validity.valid) {
        jmeno.classList.add('is-invalid');
        document.getElementById('jmeno-error').textContent = "Prosím, napište své jméno.";
      }

      // Kontrola Emailu
      const email = document.getElementById('email');
      if (!email.validity.valid) {
        email.classList.add('is-invalid');
        document.getElementById('email-error').textContent = "Zadejte platnou e-mailovou adresu.";
      }

      // Kontrola Zprávy
      const message = document.getElementById('message');
      if (!message.validity.valid) {
        message.classList.add('is-invalid');
        // Pokud máte v HTML <div id="message-error">, vypíše se to tam:
        const msgError = document.getElementById('message-error');
        if (msgError) {
          msgError.textContent = "Napište mi, co potřebujete.";
        } else {
          statusMessage.textContent = "Chybí text zprávy.";
        }
      }

    // Kontrola GDPR Checkboxu
    const checkbox = document.getElementById('checkbox');
    const checkboxError = document.getElementById('checkbox-error');

    if (!checkbox.validity.valid) {
        checkbox.classList.add('is-invalid');
        // Teď už nepíšeme do statusMessage, ale do našeho nového divu:
        checkboxError.textContent = "Je nutné potvrdit souhlas se zpracováním údajů.";
    }

      return; // Pokud jsou v datech chyby, nebudeme nic odesílat
    }

    // 2. PROCES ODESÍLÁNÍ (vše je v pořádku)
    statusMessage.textContent = "Zpráva se odesílá...";
    submitButton.disabled = true;
    submitButton.style.opacity = "0.7";

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      if (response.status == 200) {
        // ÚSPĚCH -> Přesměrování na děkovnou stránku
        window.location.href = "/kontakt/dekuji/"; 
      } else {
        // CHYBA SERVERU (např. špatný access_key)
        const resJson = await response.json();
        console.error(resJson);
        statusMessage.textContent = "Chyba: " + (resJson.message || "Zkuste to později.");
        statusMessage.style.color = "red";
      }
    })
    .catch(error => {
      // CHYBA SÍTĚ
      console.error(error);
      statusMessage.textContent = "Chyba spojení. Zkontrolujte internet.";
      statusMessage.style.color = "red";
    })
    .finally(() => {
      // Vždy vrátíme tlačítko do klikatelného stavu (pro případ chyby)
      submitButton.disabled = false;
      submitButton.style.opacity = "1";
    });
  });

  /**
   * UX BONUS: Odstranění chyby během psaní
   */
  contactForm.querySelectorAll('.contact-form__input, .contact-form__textarea, .contact-form__checkbox').forEach(input => {
    input.addEventListener('input', () => {
      if (input.validity.valid) {
        input.classList.remove('is-invalid');
        // Najdeme příslušný chybový div a smažeme text
        const errorDiv = document.getElementById(input.id + '-error');
        if (errorDiv) errorDiv.textContent = "";
      }
    });
  });