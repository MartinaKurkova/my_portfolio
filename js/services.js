const items = document.querySelectorAll(".service__item");

function DisplayItem() {
  const TriggerBottom = (window.innerHeight / 5) * 4;

  items.forEach((item) => {
    const topItem = item.getBoundingClientRect().top;

    if (topItem < TriggerBottom) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
}

// Spustit až po načtení DOM
document.addEventListener("DOMContentLoaded", () => {
  DisplayItem();
  window.addEventListener("scroll", DisplayItem);
});


// process
const process = document.querySelectorAll(".process__item");

function DisplayProcess() {
  const TriggerBottom = (window.innerHeight / 5) * 4;

  process.forEach((process) => {
    const topProcess = process.getBoundingClientRect().top;

    if (topProcess < TriggerBottom) {
      process.classList.add("show");
    } else {
      process.classList.remove("show");
    }
  });
}

// Spustit až po načtení DOM
document.addEventListener("DOMContentLoaded", () => {
  DisplayProcess();
  window.addEventListener("scroll", DisplayProcess);
});