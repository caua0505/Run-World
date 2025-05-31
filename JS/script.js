const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.progress-bar .indicator');
let currentSlide = 0;

// Atualiza o carrossel e os indicadores
function updateCarousel() {
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Intervalo para trocar slides automaticamente
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}, 3000); // Troca a cada 3 segundos



    document.addEventListener("DOMContentLoaded", function () {
        const images = document.querySelectorAll(".brand-images img");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        });

        images.forEach((img) => observer.observe(img));
    });

