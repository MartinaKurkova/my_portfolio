// Počkat až je stránka plně načtená
window.addEventListener('load', () => {
    initScrollAnimations();
});

function initScrollAnimations() {
    const frames = document.querySelectorAll(".timeline__item");
    const items = document.querySelectorAll(".service__item");
    const processes = document.querySelectorAll(".process__item");
    
    function checkScroll() {
        const triggerBottom = (window.innerHeight / 5) * 4;
        
        // Timeline
        frames.forEach((frame) => {
            const topFrame = frame.getBoundingClientRect().top;
            if (topFrame < triggerBottom) {
                frame.classList.add("show");
            }
        });
        
        // Services
        items.forEach((item) => {
            const topItem = item.getBoundingClientRect().top;
            if (topItem < triggerBottom) {
                item.classList.add("show");
            }
        });
        
        // Process
        processes.forEach((process) => {
            const topProcess = process.getBoundingClientRect().top;
            if (topProcess < triggerBottom) {
                process.classList.add("show");
            }
        });
    }
    
    // Spustit jednou při načtení
    checkScroll();
    
    // Pak při scrollování
    window.addEventListener("scroll", checkScroll, { passive: true });
}