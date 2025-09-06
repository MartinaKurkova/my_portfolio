function adjustMasonryItems() {
    const items = document.querySelectorAll('.project__gallery-item img');
    items.forEach(img => {
        img.onload = function() {
            const item = img.parentElement;
            const aspectRatio = img.naturalHeight / img.naturalWidth;
            const spans = Math.ceil(aspectRatio * 15) + 5;
            item.style.gridRowEnd = `span ${spans}`;
        };
    });
}