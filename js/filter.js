class PortfolioFilter {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery__column');
        this.filterButtons = document.querySelectorAll('.gallery__btn');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.handleFilterClick(button, filter);
            });
        });

        this.showAllItems();
    }

    handleFilterClick(clickedButton, filter) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        this.filterItems(filter);
    }

    filterItems(category) {
        this.galleryItems.forEach(item => {
            // Nejdříve odstraníme show třídu ze všech prvků
            item.classList.remove('show');
            
            // Po krátké pauze přidáme show třídu pouze k relevantním prvkům
            setTimeout(() => {
                if (category === 'all' || this.itemHasCategory(item, category)) {
                    item.style.display = 'block';
                    // Malé zpoždění pro plynulou animaci
                    requestAnimationFrame(() => {
                        item.classList.add('show');
                    });
                } else {
                    item.style.display = 'none';
                }
            }, 300); // Počká na dokončení fade-out animace
        });
    }

    itemHasCategory(item, category) {
        const dataCategories = item.getAttribute('data-categories');
        if (dataCategories) {
            const categoryList = dataCategories.split(',').map(cat => cat.trim());
            return categoryList.includes(category);
        }
        return item.classList.contains(category);
    }

    showAllItems() {
        this.galleryItems.forEach(item => {
            item.style.display = 'block';
            item.classList.add('show');
        });
    }
}

// Inicializace po načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioFilter = new PortfolioFilter();
    console.log('Portfolio filter načten!');
});

// gallery caption
document.querySelectorAll(".gallery__figure").forEach(figure => {
    figure.addEventListener("touchstart", () => {
        figure.classList.add("touched");
    });

    figure.addEventListener("touchend", () => {
        setTimeout(() => {
            figure.classList.remove("touched");
        }, 2000);
    });  
});