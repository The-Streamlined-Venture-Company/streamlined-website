// Rough Notation hover effects for tagline links
document.addEventListener('DOMContentLoaded', () => {
    // Wait for list animations to complete
    setTimeout(() => {
        const talentLink = document.querySelector('.link-talent');
        const interfacesLink = document.querySelector('.link-interfaces');
        const resourcesLink = document.querySelector('.link-resources');
        
        if (!talentLink || !interfacesLink || !resourcesLink) return;
        
        // Create annotations
        const talentAnnotation = RoughNotation.annotate(talentLink, {
            type: 'underline',
            color: '#0039a6',
            strokeWidth: 2,
            padding: [2, 0],
            animationDuration: 400
        });
        
        const interfacesAnnotation = RoughNotation.annotate(interfacesLink, {
            type: 'box',
            color: '#fe5000',
            strokeWidth: 2,
            padding: [3, 5],
            animationDuration: 400
        });
        
        const resourcesAnnotation = RoughNotation.annotate(resourcesLink, {
            type: 'highlight',
            color: '#ffd700',
            strokeWidth: 1,
            padding: [-2, 2, 2, 2],
            animationDuration: 400
        });
        
        // Add hover effects
        talentLink.addEventListener('mouseenter', () => talentAnnotation.show());
        talentLink.addEventListener('mouseleave', () => talentAnnotation.hide());
        
        interfacesLink.addEventListener('mouseenter', () => interfacesAnnotation.show());
        interfacesLink.addEventListener('mouseleave', () => interfacesAnnotation.hide());
        
        resourcesLink.addEventListener('mouseenter', () => resourcesAnnotation.show());
        resourcesLink.addEventListener('mouseleave', () => resourcesAnnotation.hide());
    }, 3000); // Wait longer for list animations
});