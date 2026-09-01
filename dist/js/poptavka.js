document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.poptavka__form');
  const status = document.getElementById('form-status');

  // --- 1) Předvyplnění položky z URL (?plakat=...&velikost=...) ---
  const params = new URLSearchParams(window.location.search);
  const plakat = params.get('plakat');
  const velikost = params.get('velikost');

  if (plakat) {
    document.getElementById('polozky').value = velikost
      ? `${plakat} (${velikost})`
      : plakat;
  }

  // --- 2) Nastavení validace ---
  // Pro každé pole: co kontrolujeme a jakou hlášku zobrazit, když je to špatně
  const fields = [
    {
      input: document.getElementById('jmeno'),
      error: document.getElementById('jmeno-error'),
      validate: (value) => value.trim().length > 0,
      message: 'Vyplňte prosím jméno a příjmení.',
    },
    {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Zadejte prosím platnou e-mailovou adresu.',
    },
    {
      input: document.getElementById('polozky'),
      error: document.getElementById('polozky-error'),
      validate: (value) => value.trim().length > 0,
      message: 'Napište prosím, o co máte zájem.',
    },
  ];

  // Zobrazí/skryje chybu u jednoho pole a vrátí, jestli je pole v pořádku
  function validateField(field) {
    const isValid = field.validate(field.input.value);

    if (isValid) {
      field.input.classList.remove('is-invalid');
      field.error.textContent = '';
    } else {
      field.input.classList.add('is-invalid');
      field.error.textContent = field.message;
    }

    return isValid;
  }

  // Validace za běhu (jakmile uživatel pole opustí)
  fields.forEach((field) => {
    field.input.addEventListener('blur', () => validateField(field));
  });

  // --- 3) Odeslání formuláře ---
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const allValid = fields.every((field) => validateField(field));
    if (!allValid) {
      status.textContent = 'Zkontrolujte prosím vyznačená pole.';
      return;
    }

    status.textContent = 'Odesílám poptávku…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (response.ok) {
        window.location.href = '/obchod/dekuji/';
      } else {
        status.textContent = 'Něco se nepovedlo, zkuste to prosím znovu.';
      }
    } catch (error) {
      status.textContent = 'Něco se nepovedlo, zkuste to prosím znovu.';
    }
  });
});