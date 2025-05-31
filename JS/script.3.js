const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
let currentIndex = 0;
let interval;

function goToSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
}

// Iniciar carrossel com intervalo maior
function startCarousel() {
    interval = setInterval(nextSlide, 2000); 
}

function stopCarousel() {
    clearInterval(interval);
}

// Começa o carrossel
startCarousel();

// Pausa ao passar o mouse
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopCarousel);
carousel.addEventListener('mouseleave', startCarousel);

