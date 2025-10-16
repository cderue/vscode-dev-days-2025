// Create hand-drawn doodles
function createDoodles() {
    const container = document.getElementById('doodles');
    const doodles = ['✏️', '📝', '💡', '⚡', '🎨', '✨', '🔧', '🚀'];
    
    for (let i = 0; i < 12; i++) {
        const doodle = document.createElement('div');
        doodle.className = 'doodle';
        doodle.textContent = doodles[Math.floor(Math.random() * doodles.length)];
        doodle.style.left = Math.random() * 100 + '%';
        doodle.style.top = Math.random() * 100 + '%';
        doodle.style.animationDelay = Math.random() * 15 + 's';
        doodle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(doodle);
    }
}

createDoodles();

// Presentation logic
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const slideCounter = document.getElementById('slide-counter');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navControls = document.getElementById('nav-controls');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index, direction = 'next') {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i === index) {
                slide.classList.add('active');
            } else if (direction === 'prev' && i === index + 1) {
                slide.classList.add('prev');
            }
        });
        currentSlide = index;
        updateControls();
    }

    function updateControls() {
        slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }

    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            showSlide(currentSlide + 1, 'next');
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1, 'prev');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevBtn.click();
        }
    });

    // Touch/swipe support
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextBtn.click();
            } else {
                prevBtn.click();
            }
        }
    }

    // Fullscreen toggle
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreenBtn.textContent = '⛶ Exit';
        } else {
            document.exitFullscreen();
            fullscreenBtn.textContent = '⛶ Fullscreen';
        }
    });

    // Navigation toggle functionality
    let navVisible = true;

    navToggleBtn.addEventListener('click', () => {
        navVisible = !navVisible;
        if (navVisible) {
            navControls.style.display = 'flex';
            navToggleBtn.textContent = '👁️ Hide Nav';
        } else {
            navControls.style.display = 'none';
            navToggleBtn.textContent = '👁️ Show Nav';
        }
    });

    // Initialize
    showSlide(0);
});