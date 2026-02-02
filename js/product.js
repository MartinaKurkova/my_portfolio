/**
 * Univerzální galerie produktu - funguje pro libovolný počet produktů
 * Automaticky načítá obrázky z HTML
 */

let currentImageIndex = 0;
let images = [];

/**
 * Inicializace galerie - načte obrázky z HTML
 */
function initGallery() {
    // Hlavní obrázek
    const mainImg = document.getElementById('mainImg');
    if (mainImg) {
        images.push(mainImg.src);
    }
    
    // Miniaturní obrázky
    const thumbnails = document.querySelectorAll('.product__thumbnail img');
    thumbnails.forEach((thumb, index) => {
        // Pokud miniatura není stejná jako hlavní obrázek, přidáme ji
        if (index > 0 || thumb.src !== mainImg.src) {
            images.push(thumb.src);
        }
    });
}

/**
 * Změna hlavního obrázku při kliknutí na miniaturu
 */
function changeImage(index) {
    currentImageIndex = index;
    const mainImg = document.getElementById('mainImg');
    
    if (mainImg && images[index]) {
        mainImg.src = images[index];
    }
    
    // Aktualizace aktivní miniatury
    const thumbnails = document.querySelectorAll('.product__thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

/**
 * Otevření lightboxu
 */
function openLightbox(index) {
    currentImageIndex = index;
    
    // Vytvoření lightbox elementu, pokud ještě neexistuje
    let lightbox = document.getElementById('productLightbox');
    
    if (!lightbox) {
        lightbox = createLightbox();
        document.body.appendChild(lightbox);
    }
    
    // Nastavení obrázku a zobrazení lightboxu
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg && images[index]) {
        lightboxImg.src = images[index];
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Vytvoření lightbox struktury
 */
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'productLightbox';
    lightbox.className = 'lightbox';
    lightbox.onclick = closeLightbox;
    
    lightbox.innerHTML = `
        <div class="lightbox__content">
            <button class="lightbox__close" onclick="closeLightbox(event)" aria-label="Zavřít">&times;</button>
            <button class="lightbox__nav lightbox__nav--prev" onclick="navigateLightbox(-1, event)" aria-label="Předchozí">‹</button>
            <img id="lightboxImg" src="" alt="Zvětšený obrázek" class="lightbox__image">
            <button class="lightbox__nav lightbox__nav--next" onclick="navigateLightbox(1, event)" aria-label="Další">›</button>
        </div>
    `;
    
    return lightbox;
}

/**
 * Zavření lightboxu
 */
function closeLightbox(event) {
    const lightbox = document.getElementById('productLightbox');
    
    if (event.target.id === 'productLightbox' || 
        event.target.classList.contains('lightbox__close')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Navigace v lightboxu (předchozí/další obrázek)
 */
function navigateLightbox(direction, event) {
    event.stopPropagation();
    
    currentImageIndex += direction;
    
    // Cyklická navigace
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg && images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex];
    }
}

/**
 * Klávesové zkratky pro lightbox
 */
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('productLightbox');
    
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox({target: {id: 'productLightbox'}});
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1, {stopPropagation: () => {}});
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1, {stopPropagation: () => {}});
        }
    }
});

/**
 * Inicializace po načtení stránky
 */
document.addEventListener('DOMContentLoaded', initGallery);