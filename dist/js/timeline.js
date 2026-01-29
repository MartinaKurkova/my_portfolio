window.addEventListener('load', () => { // ✅ Musí být 'load'
    initScrollAnimations();
});

function initScrollAnimations() {
    const allElements = document.querySelectorAll(".timeline__item");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // ✅ Důležité!
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20% 0px'
    });
    
    allElements.forEach(el => observer.observe(el));
}