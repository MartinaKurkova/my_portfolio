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
}
