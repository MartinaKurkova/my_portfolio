document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.inquiry__form');
  const status = document.getElementById('form-status');

  // --- 1) Předvyplnění položky z URL (?plakat=...&velikost=...) ---
  const params = new URLSearchParams(window.location.search);
  const plakat = params.get('plakat');
  const velikost = params.get('velikost');

  if (plakat) {
    document.getElementById('polozky').value = velikost
      ? `Mám zájem o tisk „${plakat}“, ${velikost}.`
      : `Mám zájem o tisk „${plakat}“.`;
  }

  // --- 2) Nastavení validace ---
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
      input: document.getElementById('telefon'),
      error: document.getElementById('telefon-error'),
      validate: (value) => value.trim().length === 0 || /^[+\d\s]{9,}$/.test(value.trim()),
      message: 'Zadejte prosím platné telefonní číslo, nebo pole nechte prázdné.',
    },
    {
      input: document.getElementById('ulice'),
      error: document.getElementById('ulice-error'),
      validate: (value) => value.trim().length > 0,
      message: 'Vyplňte prosím ulici a číslo popisné.',
    },
    {
      input: document.getElementById('mesto'),
      error: document.getElementById('mesto-error'),
      validate: (value) => value.trim().length > 0,
      message: 'Vyplňte prosím město.',
    },
    {
      input: document.getElementById('psc'),
      error: document.getElementById('psc-error'),
      validate: (value) => /^\d{3}\s?\d{2}$/.test(value.trim()),
      message: 'Zadejte prosím PSČ ve formátu 123 45.',
    },
    {
      input: document.getElementById('polozky'),
      error: document.getElementById('polozky-error'),
      validate: (value) => value.trim().length > 0,
      message: 'Napište prosím, o co máte zájem.',
    },
  ];

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

  fields.forEach((field) => {
    field.input.addEventListener('blur', () => validateField(field));
  });

  // --- 2b) Validace způsobu doručení (radio buttony) ---
  const radioButtons = document.querySelectorAll('input[name="doruceni"]');
  const radioError = document.getElementById('doruceni-error');

  function validateRadioGroup() {
    const isValid = Array.from(radioButtons).some((radio) => radio.checked);
    radioError.textContent = isValid ? '' : 'Vyberte prosím způsob doručení.';
    return isValid;
  }

  radioButtons.forEach((radio) => {
    radio.addEventListener('change', validateRadioGroup);
  });

  // --- 3) Odeslání formuláře ---
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const allFieldsValid = fields.every((field) => validateField(field));
    const radioValid = validateRadioGroup();

    if (!allFieldsValid || !radioValid) {
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

      const result = await response.json();

      if (response.ok && result.success) {
        window.location.href = '/obchod/dekuji/';
      } else {
        status.textContent = 'Něco se nepovedlo, zkuste to prosím znovu.';
      }
    } catch (error) {
      status.textContent = 'Něco se nepovedlo, zkuste to prosím znovu.';
    }
  });
});