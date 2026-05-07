
        // Lógica de filtragem interna da página
        function filterServices(category, element) {
            // Remove active de todos os botões
            document.querySelectorAll('.tab-trigger').forEach(btn => btn.classList.remove('active'));
            // Adiciona active no clicado
            element.classList.add('active');

            const items = document.querySelectorAll('.service-item');
            
            items.forEach(item => {
                // Animação de saída
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    if (item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                        // Força um pequeno delay para a animação de entrada
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        }

        document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    // Verifica se os elementos existem para não dar erro no console
    if (cursorDot && cursorOutline) {
        
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // 1. Movimento instantâneo do ponto central
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // 2. Movimento suave do contorno (Usando a API de Animação moderna)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { 
                duration: 500, 
                fill: "forwards",
                easing: "ease-out" 
            });
        });

        // 3. Efeito de Hover em botões e links
        const interactiveElements = document.querySelectorAll('a, button, .tab-trigger, .service-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
                cursorOutline.style.backgroundColor = "rgba(255, 215, 0, 0.1)";
                cursorDot.style.transform = "translate(-50%, -50%) scale(0)";
            });
            
            el.addEventListener("mouseleave", () => {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
                cursorOutline.style.backgroundColor = "transparent";
                cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const serviceSwipers = new Swiper(".inner-service-swiper", {
        loop: true,
        speed: 800,
        grabCursor: true,
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // Garante funcionamento dentro das abas
        observer: true,
        observeParents: true
    });
});

/* ==========================================================================
   SISTEMA DE TRADUÇÃO (PT / EN)
   ========================================================================== */
function changeLanguage(lang) {
    // 1. Atualiza o atributo no body para mover o slider CSS
    document.body.setAttribute('data-lang', lang);

    // 2. Atualiza os botões ativos
    const btnPt = document.getElementById('btn-pt');
    const btnEn = document.getElementById('btn-en');

    if (lang === 'pt') {
        btnPt.classList.add('active');
        btnEn.classList.remove('active');
    } else {
        btnEn.classList.add('active');
        btnPt.classList.remove('active');
    }

    // 3. Troca os textos baseando-se nos atributos data-pt e data-en
    const elements = document.querySelectorAll('[data-pt]');
    elements.forEach(el => {
        el.innerHTML = el.getAttribute(`data-${lang}`);
    });

    // 4. Salva a preferência do utilizador
    localStorage.setItem('preferred-lang', lang);
}

// Verifica idioma salvo ao carregar
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('preferred-lang') || 'pt';
    changeLanguage(savedLang);
});