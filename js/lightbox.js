(function() {
    'use strict';
    
    // Prevent multiple declarations
    if (window.lightboxInitialized) {
        console.log('Lightbox already initialized');
        return;
    }
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox__image');
    const lightboxClose = document.querySelector('.lightbox__close');
    const lightboxCounter = document.querySelector('.lightbox__counter');
    const lightboxPrev = document.querySelector('.lightbox__arrow--prev');
    const lightboxNext = document.querySelector('.lightbox__arrow--next');
    
    // Check if all required elements exist
    if (!lightbox || !lightboxImg) {
        console.log('Lightbox elements not found');
        return;
    }
    
    let images = [];
    let currentIndex = 0;
    
    // Initialize lightbox
    function initLightbox() {
        const projectImages = document.querySelectorAll('.project__image');
        
        if (projectImages.length === 0) {
            console.log('No project images found');
            return;
        }
        
        // Použijeme data-full, pokud existuje, jinak fallback na src
        images = Array.from(projectImages).map(img => 
            img.dataset.full || img.src
        );
        
        // Add click listeners to images
        projectImages.forEach((img, index) => {
            img.addEventListener('click', () => openLightbox(index));
        });
        
        // Add event listeners for controls
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', () => changeImage(-1));
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', () => changeImage(1));
        }
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    changeImage(-1);
                    break;
                case 'ArrowRight':
                    changeImage(1);
                    break;
            }
        });
        
        console.log(`Lightbox initialized with ${images.length} images`);
    }
    
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        updateCounter();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    function changeImage(direction) {
        currentIndex += direction;
        
        if (currentIndex >= images.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        
        lightboxImg.src = images[currentIndex];
        updateCounter();
    }
    
    function updateCounter() {
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
    
    // Mark as initialized
    window.lightboxInitialized = true;
    
})();



// parallax efect
if (window.innerWidth >= 1024) {
  const images = document.querySelectorAll('.project__image');

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;

    images.forEach((img, i) => {
      const rect = img.getBoundingClientRect(); // pozice obrázku vůči viewportu
      const imgMid = rect.top + rect.height / 2; // střed obrázku
      const offset = (imgMid - windowHeight / 2) / windowHeight; // normalizace -1 až +1

      const speed = 30 + i * 10; // max posun v px
      img.style.transform = `translateY(${offset * speed}px)`;
    });
  });
}
