class PortfolioFilter {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery__column');
        this.filterButtons = document.querySelectorAll('.gallery__btn');
        this.init();
    }

    // Event listeners
    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = this.getFilterFromButton(button);
                this.handleFilterClick(button, filter);
            });
        });

        // Show all items
        this.showAllItems();
    }

    // Button filter
    getFilterFromButton(button) {
        const text = button.textContent.trim();
        const filterMap = {
            'Ukázat vše': 'all',
            'Ilustrace': 'illustration', 
            'Volná tvorba': 'free',
            'Kresba': 'drawing',
            'Komiks': 'comics',
            'Pop-up': 'popUp',
            'Grafika': 'graphic',
            'Web': 'web'
        };
        return filterMap[text] || 'all';
    }

    handleFilterClick(clickedButton, filter) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        this.filterSelection(filter);
    }

    filterSelection(category) {
        this.galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('show');
            }, index * 50);
        });

        setTimeout(() => {
            let visibleIndex = 0;
            
            this.galleryItems.forEach(item => {
                if (this.shouldShowItem(item, category)) {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, visibleIndex * 100);
                    visibleIndex++;
                }
            });
        }, 300);
    }

    shouldShowItem(item, category) {
        if (category === 'all') return true;
        return item.classList.contains(category);
    }

    showAllItems() {
        this.galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        });
    }

    setFilter(category) {
        const button = Array.from(this.filterButtons).find(btn => 
            this.getFilterFromButton(btn) === category
        );
        if (button) {
            this.handleFilterClick(button, category);
        }
    }

    getActiveFilter() {
        const activeButton = document.querySelector('.gallery__btn.active');
        return activeButton ? this.getFilterFromButton(activeButton) : 'all';
    }
}

function filterSelection(category) {
    if (window.portfolioFilter) {
        window.portfolioFilter.filterSelection(category);
    }
}

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