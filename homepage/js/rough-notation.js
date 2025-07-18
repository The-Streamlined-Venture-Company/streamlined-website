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
            // Setup for inline tagline links
            const taglineLinks = document.querySelectorAll('.tagline-link');
            
            taglineLinks.forEach((link, index) => {
                // Different types for each link
                // talent = underline, interfaces = box, resources = highlight
                const types = ['underline', 'box', 'highlight'];
                
                // Define colors - for highlights use contrasting colors
                const annotationColors = {
                    'talent': types[index] === 'highlight' ? '#FFE5CC' : '#ff6c00',
                    'interfaces': types[index] === 'highlight' ? '#CCE0FF' : '#0055ff',
                    'resources': types[index] === 'highlight' ? '#CCFFCC' : '#00a651'
                };
                
                const linkText = link.textContent.toLowerCase();
                const color = annotationColors[linkText] || window.getComputedStyle(link).color;
                
                // Adjust padding based on the specific link and type
                let padding;
                if (types[index] === 'highlight') {
                    // Use negative top padding to force it down [top, right, bottom, left]
                    padding = [-5, 2, 2, 2];
                } else if (types[index] === 'box') {
                    padding = [3, 5];
                } else {
                    padding = [2, 0];
                }
                
                // Create annotation with explicit rtl setting for highlights
                const annotationConfig = {
                    type: types[index],
                    color: color,
                    strokeWidth: types[index] === 'highlight' ? 1 : 2,
                    padding: padding,
                    animationDuration: 800,
                    iterations: 1,
                    multiline: false
                };
                
                // For highlights, try setting rtl to affect positioning
                if (types[index] === 'highlight') {
                    annotationConfig.rtl = false;
                }
                
                const annotation = RoughNotation.annotate(link, annotationConfig);
                
                // Only show on hover
                link.addEventListener('mouseenter', () => {
                    annotation.show();
                });
                
                link.addEventListener('mouseleave', () => {
                    annotation.hide();
                });
            });
            
            console.log('Rough Notation initialized with hover effects');
        }, 2000); // Wait for text animation to complete
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRoughNotation);
    } else {
        initRoughNotation();
    }
})();