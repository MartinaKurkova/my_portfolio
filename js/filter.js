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
    }

    handleFilterClick(clickedButton, filter) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        this.filterItems(filter);
    }

    filterItems(category) {
        this.galleryItems.forEach(item => {
            const shouldShow = category === 'all' || this.itemHasCategory(item, category);
            
            if (shouldShow) {
                // Zobrazit
                item.style.display = 'block';
                requestAnimationFrame(() => {
                    item.classList.add('show');
                });
            } else {
                // Skrýt - nejdřív animace, pak display
                item.classList.remove('show');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300); 
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
}

// load
window.addEventListener('load', () => {
    window.portfolioFilter = new PortfolioFilter();
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