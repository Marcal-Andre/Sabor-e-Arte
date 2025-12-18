document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Menu Responsivo e Fixo ---
    const header = document.getElementById('main-header');
    const nav = header.querySelector('nav');
    const menuToggle = header.querySelector('.menu-toggle');

    // Toggle Menu (Mobile)
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.textContent = nav.classList.contains('active') ? '✖' : '☰';
    });
    
    // Fechar menu ao clicar em um link (Mobile)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });

    // Fixar Header (Ajustar sombra/estilo, se necessário)
    // No CSS, o header já está 'position: fixed', então essa parte é mais para efeitos
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
        }
    });

    // --- 2. Carrossel de Testemunhos ---
    const testimonials = [
        {
            text: "O bolo de casamento foi o ponto alto! Além de lindo, estava incrivelmente saboroso. Profissionalismo impecável do início ao fim.",
            author: "Mariana e Lucas"
        },
        {
            text: "Os doces finos para a nossa festa de aniversário foram um sucesso absoluto. Apresentação impecável e um sabor gourmet inesquecível.",
            author: "Patrícia V."
        },
        {
            text: "O formulário de orçamento é super detalhado, e a resposta foi muito rápida. A torta holandesa fez todos se apaixonarem. Confiança total!",
            author: "Empresa Inovação Ltda."
        }
    ];

    const carousel = document.querySelector('.testimonial-carousel');
    const dots = document.querySelectorAll('.nav-dot');
    let currentIndex = 0;

    // Função para renderizar um testemunho
    const renderTestimonial = (index) => {
        carousel.innerHTML = '';
        const item = document.createElement('div');
        item.className = 'testimonial-item';
        item.innerHTML = `<p>"${testimonials[index].text}"</p><strong>— ${testimonials[index].author}</strong>`;
        carousel.appendChild(item);

        // Atualiza os pontos de navegação
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    };

    // Inicializa o carrossel
    renderTestimonial(currentIndex);

    // Navegação por pontos
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            currentIndex = index;
            renderTestimonial(currentIndex);
        });
    });

    // Troca automática a cada 6 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        renderTestimonial(currentIndex);
    }, 6000);


    // --- 3. Filtro de Cardápio ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;

            // Remove 'active' de todos e adiciona ao clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Filtra os itens
            menuItems.forEach(item => {
                const itemCategory = item.classList.contains(category);
                
                // Simples toggle de display, em uma aplicação real usaria classes CSS para animação.
                if (itemCategory) {
                    item.style.display = 'flex';
                    // No mobile a visualização é em coluna, então usaremos 'flex' ou 'block'
                    if (window.innerWidth <= 768) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'flex';
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

});