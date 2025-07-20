document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');
    
    // Trigger animations on load
    setTimeout(() => {
        scrollElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
    
    // Parallax effect on mouse move
    const leftPanel = document.querySelector('.left-panel');
    const cards = document.querySelectorAll('.split-card');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        // Offset the left panel slightly
        if (leftPanel) {
            leftPanel.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        }
        
        // Parallax for card content
        cards.forEach((card, index) => {
            const content = card.querySelector('.card-content');
            const img = card.querySelector('img');
            
            if (content) {
                content.style.transform = `translateX(${x * 20}px)`;
            }
            
            if (img) {
                img.style.transform = `scale(1.1) translate(${x * 5}px, ${y * 5}px)`;
            }
        });
    });
});