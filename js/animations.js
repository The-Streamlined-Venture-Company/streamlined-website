// Animation Controller
class AnimationController {
    constructor() {
        this.hasVisited = sessionStorage.getItem(CONFIG.storage.hasVisited);
        this.isHomepage = document.body.classList.contains('page-home');
    }
    
    // Initialize animations
    init() {
        if (this.isHomepage) {
            this.initHomepageAnimations();
        } else {
            this.fadeInPage();
        }
    }
    
    // Homepage specific animations
    initHomepageAnimations() {
        if (!this.hasVisited) {
            // First visit - full intro
            this.playIntroSequence();
            sessionStorage.setItem(CONFIG.storage.hasVisited, 'true');
        } else {
            // Return visit - skip intro with fade
            document.body.classList.add('skip-intro');
            this.fadeInPage();
            setTimeout(() => {
                this.addBreathingAnimation();
            }, 500);
        }
    }
    
    // Play full intro sequence
    playIntroSequence() {
        document.body.classList.add('intro-active');
        
        // Create intro logo
        const introLogo = document.createElement('img');
        introLogo.src = CONFIG.assets.logo;
        introLogo.className = 'logo-loader intro';
        document.body.appendChild(introLogo);
        
        // Add breathing animation after sequence completes
        setTimeout(() => {
            this.addBreathingAnimation();
        }, 10500);
    }
    
    // Add breathing animation to logo
    addBreathingAnimation() {
        const logo = document.querySelector('.hero-content .logo');
        if (logo) {
            logo.classList.add('breathing');
        }
    }
    
    // Fade in for sub-pages with color overlay
    fadeInPage() {
        // Create color overlay that matches the page color
        const pageColor = window.getComputedStyle(document.body).backgroundColor;
        const overlay = document.createElement('div');
        overlay.className = 'color-overlay';
        overlay.style.backgroundColor = pageColor;
        document.body.appendChild(overlay);
        
        // Start fade out after a brief moment
        setTimeout(() => {
            overlay.classList.add('fade-out');
            // Remove after transition
            setTimeout(() => {
                overlay.remove();
            }, 1500);
        }, 200);
    }
    
    // Split text into animated words
    static prepareAnimatedText() {
        const animatedText = document.querySelector('.tagline-animated');
        if (!animatedText) return;
        
        const text = animatedText.textContent;
        const words = text.split(' ').map(word => {
            return `<span class="word">${word}</span>`;
        });
        
        animatedText.innerHTML = words.join(' ');
    }
}

// Export
window.AnimationController = AnimationController;