document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const plakat = params.get('plakat');
  const velikost = params.get('velikost');

  if (plakat) {
    document.getElementById('polozky').value = `${plakat} (${velikost})`;
  }
});