// Ripple effect pro všechna tlačítka
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.hero__button-cta, .what__button-cta, .small-gallery__button-cta, .about__button-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
});

function createRipple(event, button) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    ripple.addEventListener('animationend', function() {
        ripple.remove();
    });
}