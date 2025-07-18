// Page Transition System
class PageTransitions {
    constructor() {
        this.isTransitioning = false;
    }
    
    // Initialize transition handlers
    init() {
        // Add click handlers to all navigation links
        document.querySelectorAll('a[href*=".html"], .logo').forEach(link => {
            link.addEventListener('click', (e) => this.handleLinkClick(e, link));
        });
    }
    
    // Handle link clicks
    handleLinkClick(e, link) {
        const href = link.getAttribute('href') || link.closest('a')?.getAttribute('href');
        
        // Skip if no href, anchor link, or external link
        if (!href || href.startsWith('#') || href.startsWith('http') || this.isTransitioning) {
            return;
        }
        
        e.preventDefault();
        this.isTransitioning = true;
        
        // Determine target page and color
        const targetPage = this.getPageFromHref(href);
        const targetColor = CONFIG.colors[targetPage] || CONFIG.colors.home;
        
        // Create and execute transition
        this.createTransition(targetColor, href);
    }
    
    // Get page name from href
    getPageFromHref(href) {
        if (href.includes('talent')) return 'talent';
        if (href.includes('interfaces')) return 'interfaces';
        if (href.includes('resources')) return 'resources';
        return 'home';
    }
    
    // Create transition effect
    createTransition(targetColor, href) {
        // Create white overlay for clean transition
        const whiteOverlay = document.createElement('div');
        whiteOverlay.className = 'page-transition white-layer';
        whiteOverlay.style.backgroundColor = '#ffffff';
        
        // Create logo
        const logo = document.createElement('img');
        logo.src = this.getLogoPath(href);
        logo.className = 'logo-loader transition';
        
        // Add to page
        document.body.appendChild(whiteOverlay);
        document.body.appendChild(logo);
        
        // Animate sequence
        requestAnimationFrame(() => {
            // Fade to white
            whiteOverlay.classList.add('active');
            
            // Show logo
            setTimeout(() => {
                logo.style.opacity = '1';
            }, 300);
            
            // Fade out current content
            const container = document.querySelector('.container');
            if (container) {
                container.style.transition = `opacity ${CONFIG.transitions.fade}ms ease`;
                container.style.opacity = '0';
            }
        });
        
        // Navigate after transition
        setTimeout(() => {
            window.location.href = href;
        }, 800);
    }
    
    // Get correct logo path based on current location
    getLogoPath(href) {
        const isSubpage = window.location.pathname.includes('/pages/');
        const goingToSubpage = href.includes('/pages/');
        
        if (isSubpage && !goingToSubpage) {
            return '../' + CONFIG.assets.logo;
        } else if (!isSubpage && goingToSubpage) {
            return CONFIG.assets.logo;
        } else if (isSubpage && goingToSubpage) {
            return '../' + CONFIG.assets.logo;
        }
        return CONFIG.assets.logo;
    }
}

// Export
window.PageTransitions = PageTransitions;