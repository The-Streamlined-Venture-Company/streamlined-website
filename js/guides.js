// Travel Guides Interaction
class GuidesScroller {
    constructor(container) {
        this.container = container;
        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.velocity = 0;
        this.momentumID = null;
        
        this.init();
    }
    
    init() {
        // Mouse events
        this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.container.addEventListener('mouseleave', this.handleMouseUp.bind(this));
        this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        // Touch events
        this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));
        this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        
        // Prevent default drag behavior on images
        const images = this.container.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('dragstart', e => e.preventDefault());
        });
        
        // Smooth scroll on wheel
        this.container.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    }
    
    handleMouseDown(e) {
        this.isDown = true;
        this.startX = e.pageX - this.container.offsetLeft;
        this.scrollLeft = this.container.scrollLeft;
        this.container.style.cursor = 'grabbing';
        this.cancelMomentum();
    }
    
    handleMouseUp() {
        if (!this.isDown) return;
        this.isDown = false;
        this.container.style.cursor = 'grab';
        this.startMomentum();
    }
    
    handleMouseMove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - this.container.offsetLeft;
        const walk = (x - this.startX) * 1.5; // Scroll speed multiplier
        const newScrollLeft = this.scrollLeft - walk;
        this.velocity = this.container.scrollLeft - newScrollLeft;
        this.container.scrollLeft = newScrollLeft;
    }
    
    handleTouchStart(e) {
        this.startX = e.touches[0].pageX - this.container.offsetLeft;
        this.scrollLeft = this.container.scrollLeft;
        this.isDown = true;
        this.cancelMomentum();
    }
    
    handleTouchEnd() {
        this.isDown = false;
        this.startMomentum();
    }
    
    handleTouchMove(e) {
        if (!this.isDown) return;
        const x = e.touches[0].pageX - this.container.offsetLeft;
        const walk = (x - this.startX) * 1.5;
        const newScrollLeft = this.scrollLeft - walk;
        this.velocity = this.container.scrollLeft - newScrollLeft;
        this.container.scrollLeft = newScrollLeft;
    }
    
    handleWheel(e) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        
        e.preventDefault();
        this.container.scrollLeft += e.deltaY;
    }
    
    startMomentum() {
        this.cancelMomentum();
        
        const deceleration = 0.95;
        const minVelocity = 0.5;
        
        const momentum = () => {
            if (Math.abs(this.velocity) > minVelocity) {
                this.container.scrollLeft += this.velocity;
                this.velocity *= deceleration;
                this.momentumID = requestAnimationFrame(momentum);
            } else {
                this.cancelMomentum();
            }
        };
        
        momentum();
    }
    
    cancelMomentum() {
        if (this.momentumID) {
            cancelAnimationFrame(this.momentumID);
            this.momentumID = null;
        }
        this.velocity = 0;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const guidesScroll = document.querySelector('.guides-scroll');
    if (guidesScroll) {
        new GuidesScroller(guidesScroll);
    }
});