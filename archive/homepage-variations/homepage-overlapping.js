// Interactive overlapping cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.overlap-card');
    
    // Rearrange cards on hover
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
});