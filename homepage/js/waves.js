// Animated Waves Background
const canvas = document.getElementById('waves-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Wave class
class Wave {
    constructor(options) {
        this.amplitude = options.amplitude;
        this.wavelength = options.wavelength;
        this.speed = options.speed;
        this.color = options.color;
        this.offset = options.offset;
        this.phase = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x++) {
            const y = Math.sin((x / this.wavelength) + this.phase) * this.amplitude + (canvas.height / 2) + this.offset;
            ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();

        this.phase += this.speed;
    }
}

// Create waves with brand colors
const waves = [
    new Wave({
        amplitude: 50,
        wavelength: 200,
        speed: 0.01,
        color: 'rgba(0, 57, 166, 0.05)', // Talent blue
        offset: 0
    }),
    new Wave({
        amplitude: 60,
        wavelength: 300,
        speed: 0.015,
        color: 'rgba(254, 80, 0, 0.05)', // Interfaces orange
        offset: 50
    }),
    new Wave({
        amplitude: 40,
        wavelength: 250,
        speed: 0.02,
        color: 'rgba(255, 165, 0, 0.05)', // Resources yellow
        offset: -50
    })
];

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    waves.forEach(wave => wave.draw());
    
    requestAnimationFrame(animate);
}

animate();