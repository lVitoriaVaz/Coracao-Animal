/**
 * Carrossel de imagens para a página inicial do Coração Anima
 */
document.addEventListener('DOMContentLoaded', () => {
    // Elementos do carrossel
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    const slideWidth = 100; // Em porcentagem
    const totalSlides = slides.length;
    let isMoving = false; // Flag para controlar o estado da transição
    
    // Função para mover o carrossel
    const moveToSlide = (index) => {
        if (isMoving) return; // Se o carrossel estiver em movimento, ignore o clique

        isMoving = true; // Define a flag como verdadeira para indicar que o carrossel está em movimento
        
        // Verificar limites
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        // Mover track
        track.style.transform = `translateX(-${index * slideWidth}%)`;
        
        // Atualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Atualizar índice atual
        currentIndex = index;

        // Resetar a flag isMoving após a duração da transição (0.8 segundos)
        setTimeout(() => {
            isMoving = false;
        }, 800);
    };
    
    // Event listeners para botões
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });
    
    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
        });
    });
    
    // Rotação automática do carrossel
    let autoplayInterval;
    
    const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 4000); // Mudar slide a cada 5 segundos
    };
    
    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };
    
    // Iniciar autoplay
    startAutoplay();
    
    // Parar autoplay quando o mouse está sobre o carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
    
    // Suporte para gestos de swipe em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    const handleSwipe = () => {
        const swipeThreshold = 50; // Mínimo de distância para considerar um swipe
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe para a esquerda - próximo slide
            moveToSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe para a direita - slide anterior
            moveToSlide(currentIndex - 1);
        }
    };
});