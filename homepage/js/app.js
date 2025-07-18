// Main Application Entry Point
document.addEventListener('DOMContentLoaded', () => {
    // Prepare animated text if needed
    AnimationController.prepareAnimatedText();
    
    // Initialize animation controller
    const animations = new AnimationController();
    animations.init();
    
    // Initialize page transitions
    const transitions = new PageTransitions();
    transitions.init();
});