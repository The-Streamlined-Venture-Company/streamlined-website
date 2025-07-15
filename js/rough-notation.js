// Rough Notation integration for navigation hover effects
(function() {
    function initRoughNotation() {
        // Check if RoughNotation is available
        if (typeof RoughNotation === 'undefined') {
            console.error('RoughNotation library not loaded');
            return;
        }
        
        // Wait for initial page animations to complete
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-main a');
            
            navLinks.forEach((link, index) => {
                const h2 = link.querySelector('h2');
                if (!h2) return;
                
                // Colors matching the brand
                const colors = ['#ff6c00', '#0055ff', '#00a651'];
                const types = ['underline', 'circle', 'highlight'];
                
                // Wrap text in span for better annotation targeting
                const text = h2.textContent;
                h2.innerHTML = `<span class="annotation-target">${text}</span>`;
                const target = h2.querySelector('.annotation-target');
                
                // Create annotation
                const annotation = RoughNotation.annotate(target, {
                    type: types[index],
                    color: colors[index],
                    strokeWidth: 2,
                    padding: types[index] === 'highlight' ? [0, 4] : [2, 4],
                    animationDuration: 800,
                    iterations: types[index] === 'circle' ? 2 : 1
                });
                
                // Add hover listeners
                link.addEventListener('mouseenter', () => {
                    annotation.show();
                });
                
                link.addEventListener('mouseleave', () => {
                    annotation.hide();
                });
            });
            
            console.log('Rough Notation initialized successfully');
        }, 1500); // Wait for initial animations
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRoughNotation);
    } else {
        initRoughNotation();
    }
})();