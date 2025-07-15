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
            // Return visit - skip intro
            document.body.classList.add('skip-intro');
            this.addBreathingAnimation();
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
    
    // Simple fade in for sub-pages
    fadeInPage() {
        // Page content will fade in via CSS animations
        document.body.style.opacity = '1';
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