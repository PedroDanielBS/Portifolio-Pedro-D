
// Inicialização do Swiper
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    // ESSENCIAIS PARA FUNCIONAR COM ABAS:
    observer: true, 
    observeParents: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        addIcons: false,
    },
    breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }, // Mostra 3 cards em telas grandes
    }
});

// Lógica das Abas
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
    
    // Atualiza o Swiper para evitar bugs ao mudar de aba
    window.dispatchEvent(new Event('resize'));
}

// Seleciona os elementos do cursor
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

// Variáveis para armazenar a posição do mouse e do contorno
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Configuração da suavização (quanto menor, mais lento o contorno segue)
const speed = 0.2; 

// Atualiza a posição do mouse real
window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // O ponto central segue o mouse instantaneamente
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
});

// Função de animação para o contorno seguidor
function animateOutline() {
    // Calcula a próxima posição do contorno com base na velocidade de suavização
    const distX = mouseX - outlineX;
    const distY = mouseY - outlineY;
    
    outlineX = outlineX + distX * speed;
    outlineY = outlineY + distY * speed;
    
    // Aplica a nova posição ao contorno
    cursorOutline.style.left = outlineX + "px";
    cursorOutline.style.top = outlineY + "px";
    
    // Chama a função novamente no próximo frame para animação contínua
    requestAnimationFrame(animateOutline);
}

// Inicia a animação
animateOutline();

/* --- LÓGICA DE INTERAÇÃO (HOVER) REFINADA --- */

// Usamos delegação de evento para pegar qualquer elemento que seja link ou botão
document.addEventListener("mouseover", (e) => {
    // Verifica se o elemento ou algum pai dele é clicável
    if (e.target.closest("a, button, .menu-toggle, .work-row, .p-card, input, .nav-item")) {
        document.body.classList.add("cursor-hover");
    }
});

document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, .menu-toggle, .work-row, .p-card, input, .nav-item")) {
        document.body.classList.remove("cursor-hover");
    }
});