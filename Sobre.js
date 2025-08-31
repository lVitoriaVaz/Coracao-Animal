document.addEventListener('DOMContentLoaded', () => {
    // Menu Hambúrguer
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navAuth = document.querySelector('.nav-auth');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navAuth.classList.toggle('active');
        });
    }

    // Animação de contagem para números de impacto
    const impactNumbers = document.querySelectorAll('.impact-number');

    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 10);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target; // Garante que o número final seja exato
            }
            element.textContent = Math.floor(current);
        }, 10);
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Aciona quando 50% do elemento está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, observerOptions);

    impactNumbers.forEach(number => {
        observer.observe(number);
    });
});
