document.addEventListener("DOMContentLoaded", function () {

    // ── Carousel ──
    const slidesContainer = document.querySelector('.slides');
    if (slidesContainer) {
        const slides = slidesContainer.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        let current = 0;

        // Build indicators
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            indicatorsContainer.appendChild(dot);
        });

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            slidesContainer.style.transform = `translateX(-${current * 100}%)`;
            document.querySelectorAll('.carousel-indicators .dot').forEach((d, i) => {
                d.classList.toggle('active', i === current);
            });
        }

        prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

        // Auto-advance
        let timer = setInterval(() => goTo(current + 1), 4000);
        const wrapper = document.querySelector('.slides-wrapper');
        wrapper && wrapper.addEventListener('mouseenter', () => clearInterval(timer));
        wrapper && wrapper.addEventListener('mouseleave', () => {
            timer = setInterval(() => goTo(current + 1), 4000);
        });
    }

    // ── Brand images fade-in on scroll ──
    const fadeImages = document.querySelectorAll('.brand-highlights .image-container img');
    if (fadeImages.length) {
        fadeImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'translateY(30px)';
            img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        fadeImages.forEach(img => observer.observe(img));
    }

});
