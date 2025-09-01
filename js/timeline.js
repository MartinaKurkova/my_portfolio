const frames = document.querySelectorAll(".timeline__item");

window.addEventListener("scroll", DisplayContent);
DisplayContent();

function DisplayContent() {
  const TriggerBottom = (window.innerHeight / 5) * 4;

  frames.forEach((frame) => {
    const topFrame = frame.getBoundingClientRect().top;

    if (topFrame < TriggerBottom) {
      frame.classList.add("show");
    } else {
      frame.classList.remove("show");
    }
  });
};

// service

const items = document.querySelectorAll(".service__item");

window.addEventListener("scroll", DisplayItem);
DisplayItem();

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
};

// process
const process = document.querySelectorAll(".process__item");

window.addEventListener("scroll", DisplayProcess);
DisplayProcess();

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
};