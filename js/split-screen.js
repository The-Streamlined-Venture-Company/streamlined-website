// Split screen interactions for Interfaces page
document.addEventListener('DOMContentLoaded', () => {
    const splitContainer = document.querySelector('.split-container');
    const panels = document.querySelectorAll('.split-panel');
    
    if (!splitContainer || panels.length === 0) return;
    
    // Mouse movement effect
    let isHovering = false;
    
    splitContainer.addEventListener('mouseenter', () => {
        isHovering = true;
        splitContainer.style.cursor = 'pointer';
    });
    
    splitContainer.addEventListener('mouseleave', () => {
        isHovering = false;
        // Reset panels to equal size
        panels.forEach(panel => {
            panel.style.flex = '';
            panel.style.transform = '';
        });
    });
    
    splitContainer.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = splitContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = x / width;
        
        // Subtle expansion based on mouse position
        const leftFlex = 0.5 + (0.5 - percentage) * 0.3;
        const rightFlex = 0.5 + (percentage - 0.5) * 0.3;
        
        panels[0].style.flex = leftFlex;
        panels[1].style.flex = rightFlex;
    });
    
    // Click to focus on a panel
    panels.forEach((panel, index) => {
        panel.addEventListener('click', (e) => {
            // Don't trigger if clicking on links
            if (e.target.tagName === 'A') return;
            
            const isExpanded = panel.classList.contains('expanded');
            
            // Reset all panels
            panels.forEach(p => {
                p.classList.remove('expanded');
                p.style.flex = '';
            });
            
            if (!isExpanded) {
                panel.classList.add('expanded');
                panel.style.flex = '1.8';
                panels[1 - index].style.flex = '0.2';
            }
        });
    });
    
    // Parallax effect on scroll for panels
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const splitSection = document.querySelector('.split-section');
        
        if (!splitSection) return;
        
        const rect = splitSection.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (inView) {
            const parallaxSpeed = 0.1;
            const offset = (rect.top / window.innerHeight) * 100;
            
            panels[0].style.transform = `translateY(${offset * parallaxSpeed}px)`;
            panels[1].style.transform = `translateY(${-offset * parallaxSpeed}px)`;
        }
    });
    
    // Smooth reveal animation for panel content
    const panelContents = document.querySelectorAll('.panel-content');
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger reveal animations for child elements
                const children = entry.target.querySelectorAll('.product-item, .service-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });
    
    panelContents.forEach(content => {
        contentObserver.observe(content);
        
        // Set initial state for items
        const items = content.querySelectorAll('.product-item, .service-item');
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});