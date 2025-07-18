// Configuration
const CONFIG = {
    // Page colors
    colors: {
        home: '#f5f5f5',
        talent: '#FF6319',
        interfaces: '#0039A6',
        resources: '#00933C'
    },
    
    // Animation timings
    transitions: {
        fade: 500,
        colorFade: 800,
        logoFade: 600,
        pageLoad: 300
    },
    
    // Storage keys
    storage: {
        hasVisited: 'streamlined_has_visited'
    },
    
    // Asset paths
    assets: {
        logo: 'assets/images/logo.gif'
    }
};

// Export for use in other files
window.CONFIG = CONFIG;