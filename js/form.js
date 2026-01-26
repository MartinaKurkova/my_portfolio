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