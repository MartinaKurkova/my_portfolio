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
            if (category === 'all' || this.itemHasCategory(item, category)) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
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